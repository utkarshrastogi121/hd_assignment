import Image from "next/image";

interface ExperienceCardProps {
  image: string;
  title: string;
  location: string;
  description: string;
  price: string;
  onViewDetails: () => void;
}

export default function ExperienceCard({
  image,
  title,
  location,
  description,
  price,
  onViewDetails,
}: ExperienceCardProps) {
  return (
    <div className="w-[250px] bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="relative w-full h-40">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 text-base leading-tight">
            {title}
          </h3>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
            {location}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-snug line-clamp-2">
          {description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-900 font-medium">
            From{" "}
            <span className="text-lg font-bold text-gray-900">₹{price}</span>
          </span>
          <button
            onClick={onViewDetails}
            className="bg-[#FFD643] hover:bg-[#ffcc00] text-sm text-black font-semibold px-4 py-1.5 rounded-md transition cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
