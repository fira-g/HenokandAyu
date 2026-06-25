import { WEDDING } from "@/constants";
import CTASection from "./CTASection";

export default function HeroSection() {
  return (
    <div className="relative h-[100vh] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80"
        alt="Wedding hero"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Floating ornaments */}
      <span className="absolute top-10 right-8 text-[#ffddaa]/50 text-2xl animate-float">
        ✦
      </span>
      <span className="absolute top-20 left-5 text-[#ffddaa]/40 text-base animate-float [animation-delay:2s]">
        ❀
      </span>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center  text-center px-6">
        <p className="text-[#ffddaa]/80 ornament mb-3">— ✦ —</p>
        <p className="font-sans text-[#ffe8d0]/80 text-[10px] tracking-[4px] uppercase mb-2">
          The Wedding of
        </p>
        <h1 className="text-white text-[48px] font-light leading-[1.15] drop-shadow-lg">
          {WEDDING.groom}
          <br />
          <span className="italic text-[#f5d9a8]">&amp;</span>
          <br />
          {WEDDING.bride}
        </h1>
        <p className="text-[#ffddaa]/80 ornament mt-3 mb-4">— ✦ —</p>
        <p className="font-sans text-[#ffe5c0]/90 text-xs tracking-[3px]">
          {WEDDING.dateLabel.toUpperCase()}
        </p>
        <p className="font-sans text-white italic text-[13px] mt-1">
          {WEDDING.venue} · {WEDDING.city}
        </p>
        <div className="mt-12">
          <CTASection />
        </div>
      </div>
    </div>
  );
}
