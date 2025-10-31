"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function BookingConfirmed() {
  const router = useRouter();

  const refId = "HUF56&SO";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <div className="border-4 border-green-500 rounded-full p-2 mb-4">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Booking Confirmed
      </h1>
      <p className="text-gray-600 mb-6">Ref ID: {refId}</p>

      <button
        onClick={() => router.push("/")}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm transition cursor-pointer"
      >
        Back to Home
      </button>
    </div>
  );
}
