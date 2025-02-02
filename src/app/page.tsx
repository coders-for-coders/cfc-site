"use client";
import Hero from "@/components/hero";
import NavBar from "@/components/navBar";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen gap-4 flex-col bg-slate-950">
      <NavBar />
      <Hero />
    </div>
  );
}
