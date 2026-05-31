import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdminStore } from "@/store";

/**
 * Root layout — no bottom nav.
 * - Mobile: full width, max 430px centered
 * - Desktop: wide layout with soft background texture
 * - Floating admin button (bottom-right, all pages except /admin)
 * - Back arrow on inner pages
 */
export default function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const isAdmin = location.pathname === "/admin";
  const isAuth = useAdminStore((s) => s.isAuthenticated);

  return (
    /* Full-page desktop canvas */
    <div
      className="min-h-screen w-full bg-[#f7f3ee]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, #f5ede0 0%, transparent 60%), radial-gradient(circle at 80% 80%, #e8d8c4 0%, transparent 60%)",
      }}
    >
      {/* Centered app column */}
      <div
        className="relative mx-auto bg-cream min-h-screen flex flex-col"
        style={{ maxWidth: 480, boxShadow: "0 0 80px rgba(100,60,20,0.12)" }}
      >
        {/* Back button on inner pages */}
        {!isHome && (
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 z-40 w-9 h-9 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center text-gold-600 hover:bg-white transition-all active:scale-90"
            style={{ fontSize: 18 }}
            aria-label="Back"
          >
            ←
          </button>
        )}

        <main className="flex-1 pb-6">
          <Outlet />
        </main>

        {/* ── Floating Admin Button ── */}
        {!isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            title={isAuth ? "Admin Dashboard" : "Admin Login"}
            className="fixed z-50 flex items-center gap-2 shadow-xl transition-all duration-300 active:scale-95 hover:scale-105"
            style={{
              bottom: 28,
              right: "max(24px, calc(50vw - 240px + 16px))", // stays inside the card on desktop
              background: "linear-gradient(135deg, #3d2b1f 0%, #5c3d26 100%)",
              borderRadius: 50,
              padding: "11px 20px 11px 14px",
              boxShadow: "0 8px 32px rgba(60,30,10,0.35)",
            }}
          >
            <span style={{ fontSize: 18 }}>{isAuth ? "⚙️" : "🔐"}</span>
            <span className="font-sans text-[11px] tracking-[2px] text-gold-200 uppercase">
              {isAuth ? "Dashboard" : "Admin"}
            </span>
            {isAuth && (
              <span
                className="w-2 h-2 rounded-full bg-green-400 ml-1"
                title="Logged in"
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
