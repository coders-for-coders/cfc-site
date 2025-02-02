"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function Hero() {
  return (
    <div className="p-10 sm:p-10 m-5 rounded-3xl bg-slate-950 text-white flex items-center justify-center overflow-hidden shadow-2xl">
      <div className="w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center text-center md:text-left z-10">
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-8xl font-extrabold uppercase leading-tight tracking-tight">
              Where <span className="text-purple-500">Coders</span> Unite &
              Thrive
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-gray-400 text-balance">
              Join a vibrant community of developers sharing knowledge, building
              projects, and growing together.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
              {/* <a
                href="#get-started"
                className="rounded-xl p-4 grow text-center border border-purple-500 bg-purple-500 text-white font-bold uppercase text-sm tracking-widest hover:bg-slate-800 transition-all duration-300 hover:shadow-[8px_8px_0px_rgba(168,85,247,10)] hover:translate-y-[-2px]"
              >
                Get Started
              </a> */}
              <Button
                onClick={() => {
                  toast({
                    title: "Coming Soon!",
                    description: "We are working on it!",
                    variant: "default",
                    duration: 10000,
                    className: "bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl p-8 border-2 border-purple-400 shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom-2",
                  });
                }}
                className="rounded-xl p-8 grow text-center border border-purple-500 bg-purple-500 text-white font-bold uppercase text-sm tracking-widest hover:bg-slate-950 transition-all duration-300 hover:shadow-[8px_8px_0px_rgba(168,85,247,10)] hover:translate-y-[-2px]"
              >
                Get Started
              </Button>
              <Button
                onClick={() => {
                  window.location.href = "/about";
                }}
                className="rounded-xl p-8 grow text-center border border-purple-500 text-purple-500 font-bold uppercase text-sm tracking-widest bg-slate-950 hover:bg-purple-500 shadow-[8px_8px_0px_rgba(168,85,247,10)] hover:shadow-[2px_2px_0px_rgba(168,85,247,10)] hover:translate-x-[2px] hover:translate-y-[2px] hover:text-white transition-all duration-300"
              >
                Join Discord
              </Button>
            </div>
          </div>

          <div className="relative flex items-center sm:m-10">
            {/* <div className="absolute -top-8 md:-top-16 -left-8 sm:w-40 sm:h-40 lg:w-72 lg:h-72 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full opacity-30 blur-2xl max-sm:hidden"></div> */}
            <div className="relative z-10 bg-black/40 backdrop-blur-xl p-6 sm:p-8 -right-1/2 -translate-x-1/2 grow text-center shadow-[10px_10px_0px_rgba(168,85,247,10)] rounded-2xl text-nowrap border border-purple-500">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Community. Knowledge. Growth.
              </h2>
              <p className="mt-2 text-sm sm:text-base font-light text-gray-300">
                A platform built by developers, for developers.
              </p>
            </div>
            {/* <div className="absolute -bottom-8 md:-bottom-16 -right-8 sm:w-40 sm:h-40 lg:w-72 lg:h-72 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full opacity-30 blur-2xl max-sm:hidden"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
