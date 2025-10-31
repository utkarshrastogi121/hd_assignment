"use client";
import { useState } from "react";
import api from "@/lib/api";

interface CheckoutFormProps {
  onPromoApplied?: (discount: number) => void;
  onFormFilled?: (data: { name: string; email: string; promoCode: string }) => void;
}

export default function CheckoutForm({ onPromoApplied, onFormFilled }: CheckoutFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePromoApply = async () => {
    if (!promoCode.trim()) {
      setPromoMessage("Please enter a promo code");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/promo/validate", { code: promoCode.trim() });
      if (res.data.valid) {
        setPromoMessage("Promo applied!");
        onPromoApplied?.(res.data.discount);
      } else {
        setPromoMessage("Invalid promo code");
        onPromoApplied?.(0);
      }
    } catch {
      setPromoMessage("Error validating promo");
    } finally {
      setLoading(false);
    }
  };

  const updateParent = () => {
    onFormFilled?.({ name, email, promoCode });
  };

  return (
    <div
      className="border border-gray-200 p-5 rounded-xl shadow-sm bg-white w-full"
      onChange={updateParent}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Full name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              updateParent();
            }}
            className="p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              updateParent();
            }}
            className="p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Promo code"
          value={promoCode}
          onChange={(e) => {
            setPromoCode(e.target.value);
            updateParent();
          }}
          className="flex-1 p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handlePromoApply}
          disabled={loading}
          className={`px-4 py-2 rounded-md font-medium text-white transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      </div>

      {promoMessage && <p className="text-sm text-gray-600 mb-3">{promoMessage}</p>}

      <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
        <input
          id="terms"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="w-4 h-4 cursor-pointer accent-yellow-400"
        />
        <label htmlFor="terms" className="cursor-pointer">
          I agree to the <span className="underline">terms and safety policy</span>
        </label>
      </div>
    </div>
  );
}
