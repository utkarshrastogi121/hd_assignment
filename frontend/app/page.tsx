"use client";
import { useEffect, useState } from "react";
import api from "../lib/api";
import { Experience } from "../types/types";
import ExperienceCard from "../components/ExperienceCard";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filtered, setFiltered] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api
      .get("/experiences")
      .then((res) => {
        setExperiences(res.data);
        setFiltered(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFiltered(experiences);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = experiences.filter(
      (exp) =>
        exp.title.toLowerCase().includes(lowerQuery) ||
        exp.description.toLowerCase().includes(lowerQuery) ||
        exp.location.toLowerCase().includes(lowerQuery)
    );
    setFiltered(results);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar onSearch={handleSearch} />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h1 className="text-3xl font-semibold mb-10 text-gray-800 tracking-tight">
          Explore Experiences
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-500 text-lg">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-500 text-lg">No experiences found</p>
          </div>
        ) : (
          <div
            className="
              grid 
              gap-y-8 
              gap-x-8
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              xl:grid-cols-4
              place-items-center
            "
          >
            {filtered.map((exp) => (
              <ExperienceCard
                key={exp._id}
                image={(exp as any).image || "/placeholder.jpg"}
                title={exp.title}
                location={exp.location}
                description={exp.description}
                price={exp.price.toString()}
                onViewDetails={() => router.push(`/experiences/${exp._id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
