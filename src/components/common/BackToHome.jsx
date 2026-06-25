import { useNavigate } from "react-router-dom";
import { WEDDING } from "../../constants";

/**
 * Subtle "back to home" footer link used at bottom of inner pages
 */
export default function BackToHome() {
  const navigate = useNavigate();
  return (
    <div className="text-center py-8 px-6">
      <button
        onClick={() => navigate("/")}
        className="font-sans text-xs tracking-[3px] uppercase text-gold-400 hover:text-gold-600 transition-colors"
      >
        ← Back to Home
      </button>
      <p className="font-sans text-[10px] text-gold-300 mt-2 tracking-widest">
        {WEDDING.groom} &amp; {WEDDING.bride} · June 27, 2026
      </p>
    </div>
  );
}
