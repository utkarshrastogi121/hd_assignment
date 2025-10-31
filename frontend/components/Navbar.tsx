"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(searchTerm.trim());
    }, 400);

    return () => clearTimeout(delay);
  }, [searchTerm, onSearch]);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        <div className="flex items-center gap-2 w-[400px]">
          <input
            type="text"
            placeholder="Search experiences"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFD643]"
          />
          <button
            onClick={() => onSearch(searchTerm.trim())}
            className="bg-[#FFD643] hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-md transition-all cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}
