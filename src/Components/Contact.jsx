
export default function CTASection() {
  
  return (
   <section className="bg-black py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex flex-col items-center justify-center text-center min-h-[400px]">
          
          {/* Arc Background */}
          <div className="absolute inset-0 flex justify-center items-end pointer-events-none">
            <div className="w-[1200px] h-[600px] rounded-t-full border border-indigo-500/20 relative overflow-hidden">
              
              {/* Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-indigo-700/30 to-indigo-500/60" />

              {/* Grid Effect */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                  maskImage:
                    "radial-gradient(circle at center bottom, black 55%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(circle at center bottom, black 55%, transparent 100%)",
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Your next role is
              <br />
              already looking for you
            </h2>

            <p className="mt-4 text-sm md:text-base text-gray-400">
              Build a profile in three minutes. The matches start arriving
              tomorrow morning.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
                Create a free account
              </button>

              <button className="border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition">
                View pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}