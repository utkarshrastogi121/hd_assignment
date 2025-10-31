"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import api from "@/lib/api";
import Checkout from "@/components/Checkout";
import BookingConfirmed from "@/components/BookingConfirmed";

interface Slot {
  _id?: string;
  time: string;
  available: number;
}

interface Experience {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  location: string;
  about: string;
  availableDates: string[];
  slots: Slot[];
}

export default function ExperienceDetailsPage() {
  const { id } = useParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    email: "",
    promoCode: "",
  });

  useEffect(() => {
    if (!id) return;
    api
      .get(`/experiences/${id}`)
      .then((res) => {
        const data = res.data?.experience || res.data;
        setExperience({
          _id: data._id,
          title: data.title,
          description: data.description || "No description available.",
          image: data.image || "/placeholder.jpg",
          price: data.price || 0,
          location: data.location || "Unknown",
          about: data.about || "No additional details provided.",
          availableDates: data.availableDates || [],
          slots: data.slots || [],
        });
      })
      .catch((err) => console.error("Error fetching experience:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!experience) return <p className="text-center mt-10">Experience not found</p>;

  const subtotal = experience.price * quantity;
  const tax = Math.round(subtotal * 0.06);
  const discountedTotal = Math.max(subtotal - discount, 0);
  const total = discountedTotal + tax;

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;

    if (!showCheckout) {
      setShowCheckout(true);
      return;
    }

    const selectedSlot = experience.slots.find((s) => s.time === selectedTime);
    if (!selectedSlot?._id) {
      alert("Slot information missing");
      return;
    }

    if (!checkoutData.name || !checkoutData.email) {
      alert("Please fill out your name, email and Promo Code.");
      return;
    }

    try {
      const payload = {
        experienceId: experience._id,
        customerName: checkoutData.name,
        customerEmail: checkoutData.email,
        seats: quantity,
        promoCode: checkoutData.promoCode || null,
        pricePaid: total,
        date: selectedDate,
        time: selectedTime,
      };

      const res = await api.post("/bookings", payload);


      if (res.status === 201 || res.status === 200) {
        setBookingConfirmed(true);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Error creating booking");
    }
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <BookingConfirmed />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20 px-6 md:px-20 pb-10 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 transition-all duration-300">
          {!showCheckout ? (
            <>
              <div className="mb-6 rounded-3xl overflow-hidden">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  width={800}
                  height={400}
                  className="object-cover w-full h-[350px]"
                />
              </div>

              <h1 className="text-2xl md:text-3xl font-semibold mb-2 border-l-4 border-[#FFD643] pl-3">
                {experience.title}
              </h1>
              <p className="text-gray-600 mb-5">{experience.description}</p>

              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Choose date</h2>
                <div className="flex gap-3 flex-wrap">
                  {experience.availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`px-4 py-2 border rounded-md text-sm ${
                        selectedDate === date
                          ? "bg-[#FFD643] border-yellow-400"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {new Date(date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-2">Choose time</h2>
                  <div className="flex gap-3 flex-wrap">
                    {experience.slots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={slot.available === 0}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`px-4 py-2 border rounded-md text-sm ${
                          selectedTime === slot.time
                            ? "bg-[#FFD643] border-yellow-400"
                            : "border-gray-300 hover:bg-gray-100"
                        } ${
                          slot.available === 0 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {slot.time}
                        <span className="text-gray-500 text-xs ml-1">
                          {slot.available > 0
                            ? `${slot.available} left`
                            : "Sold out"}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    All times are in IST (GMT +5:30)
                  </p>
                </div>
              )}

              <div className="mt-8 bg-gray-50 p-4 rounded-md border border-gray-200">
                <h2 className="text-lg font-medium mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">
                  {experience.about}
                </p>
              </div>
            </>
          ) : (
            <Checkout
              onPromoApplied={(d) => setDiscount(d)}
              onFormFilled={(data) => setCheckoutData(data)}
            />
          )}
        </div>

        <div className="w-full lg:w-80 h-fit border border-gray-200 bg-white p-5 rounded-xl shadow-sm sticky top-24">
          <div className="flex justify-between text-gray-600 text-sm mb-2">
            <p>Base price</p>
            <p className="font-medium">₹{experience.price}</p>
          </div>

          <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
            <p>Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-2 py-1 border rounded"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-sm text-gray-700">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600 mb-2">
              <p>Discount</p>
              <p>- ₹{discount}</p>
            </div>
          )}

          <div className="flex justify-between text-sm text-gray-700 mb-3">
            <p>Taxes</p>
            <p>₹{tax}</p>
          </div>

          <div className="flex justify-between font-semibold text-lg mb-4">
            <p>Total</p>
            <p>₹{total}</p>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className={`w-full py-2 rounded-md text-white font-medium transition cursor-pointer ${
              selectedDate && selectedTime
                ? "bg-[#FFD643] hover:bg-yellow-500"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {showCheckout ? "Pay and Confirm" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
