import { useEffect, useState } from "react";
import {
  useAdminStore,
  useUploadsStore,
  useWishesStore,
  useAudioStore,
  useGalleryStore,
} from "@/store";

// ── Small helpers ─────────────────────────────────────────────────────────────
function TabBtn({ active, onClick, label, count }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 font-sans text-xs tracking-widest uppercase px-4 py-2.5 rounded-xl border transition-all
        ${
          active
            ? "bg-espresso text-gold-200 border-espresso shadow-md"
            : "bg-transparent text-gold-600 border-gold-200 hover:bg-gold-50"
        }`}
    >
      {label}
      {count > 0 && (
        <span
          className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium
          ${active ? "bg-gold-400/40 text-gold-100" : "bg-gold-100 text-gold-500"}`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// ── Fullscreen image lightbox for uploads ─────────────────────────────────────
function UploadLightbox({ upload, onClose, onPrev, onNext, hasPrev, hasNext }) {
  if (!upload) return null;

  const handleDownload = async () => {
    try {
      const res = await fetch(upload.imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `upload-${upload.uploaderName || "guest"}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(upload.imageUrl, "_blank");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ background: "rgba(10,5,2,0.97)" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
        <div>
          <p className="font-sans text-gold-300 text-sm font-medium">
            {upload.uploaderName}
          </p>
          {upload.caption && (
            <p className="font-sans text-white/40 text-xs mt-0.5 italic">
              {upload.caption}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition"
          style={{ fontSize: 18 }}
        >
          ✕
        </button>
      </div>

      {/* Image */}
      <div className="flex-1 relative flex items-center justify-center min-h-0 px-2">
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-2 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/25 transition active:scale-90"
            style={{ fontSize: 22 }}
          >
            ‹
          </button>
        )}
        <img
          src={upload.imageUrl}
          alt={upload.caption || "Upload"}
          className="max-w-full rounded-2xl object-contain shadow-2xl"
          style={{ maxHeight: "calc(100dvh - 180px)" }}
        />
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-2 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/25 transition active:scale-90"
            style={{ fontSize: 22 }}
          >
            ›
          </button>
        )}
      </div>

      {/* Bottom actions */}
      <div className="flex items-center justify-center gap-3 px-4 py-4 flex-shrink-0">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-gold-gradient text-white font-sans text-xs tracking-widest uppercase px-6 py-3 rounded-full shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
        >
          <span>⬇</span> Download
        </button>
        <span className="font-sans text-white/25 text-[10px]">
          {new Date(upload.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

// ── Main dashboard ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const logout = useAdminStore((s) => s.logout);
  const {
    uploads,
    fetchAllAdmin: fetchUploads,
    deleteUpload,
    approveUpload,
    loading: uLoad,
  } = useUploadsStore();
  const {
    wishes,
    fetchAllAdmin: fetchWishes,
    deleteWish,
    approveWish,
    loading: wLoad,
  } = useWishesStore();
  const {
    messages,
    fetchAllAdmin: fetchAudio,
    deleteMessage,
    loading: aLoad,
  } = useAudioStore();
  const { photos, fetchPhotos } = useGalleryStore();

  const [tab, setTab] = useState("wishes");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    fetchWishes();
    fetchUploads();
    fetchAudio();
    fetchPhotos("All");
  }, []);

  const stats = [
    { icon: "📸", label: "Uploads", count: uploads.length },
    { icon: "💌", label: "Wishes", count: wishes.length },
    { icon: "🎤", label: "Audio", count: messages.length },
  ];

  // Only uploads with images
  const imageUploads = uploads.filter((u) => u.imageUrl);

  const handleDownloadAudio = async (msg) => {
    try {
      const res = await fetch(msg.audioUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audio-${msg.senderName || "guest"}.webm`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(msg.audioUrl, "_blank");
    }
  };

  return (
    <>
      {/* Upload fullscreen lightbox */}
      {lightboxIdx !== null && imageUploads[lightboxIdx] && (
        <UploadLightbox
          upload={imageUploads[lightboxIdx]}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((i) => i - 1)}
          onNext={() => setLightboxIdx((i) => i + 1)}
          hasPrev={lightboxIdx > 0}
          hasNext={lightboxIdx < imageUploads.length - 1}
        />
      )}

      <div className="px-5 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {stats.map((s) => (
            <div
              key={s.label}
              onClick={() =>
                s.label !== "Gallery" && setTab(s.label.toLowerCase())
              }
              className="bg-white rounded-2xl p-3 text-center shadow-[0_2px_12px_rgba(150,100,60,0.07)] cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xl font-light text-espresso">{s.count}</div>
              <div className="font-sans text-[9px] text-gold-500 tracking-widest uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          <TabBtn
            active={tab === "wishes"}
            onClick={() => setTab("wishes")}
            label="Wishes"
            count={wishes.filter((w) => !w.approved).length}
          />
          <TabBtn
            active={tab === "uploads"}
            onClick={() => setTab("uploads")}
            label="Uploads"
            count={uploads.filter((u) => !u.approved).length}
          />
          <TabBtn
            active={tab === "audio"}
            onClick={() => setTab("audio")}
            label="Audio"
            count={messages.length}
          />
        </div>

        {/* ── WISHES ── */}
        {tab === "wishes" && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl text-espresso">All Wishes</h3>
              <span className="font-sans text-xs text-gold-500">
                {wishes.length} total
              </span>
            </div>
            {wLoad && <SkeletonList />}
            <div className="flex flex-col gap-3">
              {wishes.map((w) => (
                <div
                  key={w._id}
                  className="card py-4 border-l-[3px] border-gold-300"
                >
                  <p className="italic text-gold-800 text-sm leading-relaxed mb-3">
                    "{w.message}"
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-sans text-xs text-gold-500 font-medium">
                        — {w.senderName}
                      </p>
                      <p className="font-sans text-[10px] text-gold-400 mt-0.5">
                        {new Date(w.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      {!w.approved && (
                        <button
                          onClick={() => approveWish(w._id)}
                          className="font-sans text-[10px] bg-green-50 text-green-600 border border-green-200 rounded-full px-3 py-1 hover:bg-green-100 transition"
                        >
                          ✓ Approve
                        </button>
                      )}
                      {w.approved && (
                        <span className="font-sans text-[10px] bg-green-50 text-green-500 border border-green-100 rounded-full px-3 py-1">
                          ✓
                        </span>
                      )}
                      <button
                        onClick={() => deleteWish(w._id)}
                        className="font-sans text-[10px] bg-red-50 text-red-500 border border-red-200 rounded-full px-3 py-1 hover:bg-red-100 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {!wLoad && wishes.length === 0 && (
                <EmptyState label="No wishes yet" />
              )}
            </div>
          </section>
        )}

        {/* ── UPLOADS ── */}
        {tab === "uploads" && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl text-espresso">Guest Uploads</h3>
              <span className="font-sans text-xs text-gold-500">
                {uploads.length} total
              </span>
            </div>
            {uLoad && <SkeletonList />}

            {/* Photo grid — tappable */}
            {imageUploads.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {imageUploads.map((u, i) => (
                  <div
                    key={u._id}
                    onClick={() => setLightboxIdx(i)}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={u.imageUrl}
                      alt={u.caption}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                      <span className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        ⛶
                      </span>
                    </div>
                    {!u.approved && (
                      <span
                        className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400"
                        title="Pending approval"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Upload cards */}
            <div className="flex flex-col gap-3">
              {uploads.map((u, i) => (
                <div key={u._id} className="card py-4 flex gap-3 items-start">
                  {u.imageUrl && (
                    <img
                      src={u.imageUrl}
                      alt=""
                      onClick={() =>
                        setLightboxIdx(
                          imageUploads.findIndex((x) => x._id === u._id),
                        )
                      }
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm text-espresso font-medium">
                      {u.uploaderName}
                    </p>
                    <p className="font-sans text-xs text-gold-500 mt-0.5 line-clamp-2">
                      {u.caption || "No caption"}
                    </p>
                    <p className="font-sans text-[10px] text-gold-400 mt-1">
                      {new Date(u.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {!u.approved ? (
                        <button
                          onClick={() => approveUpload(u._id)}
                          className="font-sans text-[10px] bg-green-50 text-green-600 border border-green-200 rounded-full px-3 py-1 hover:bg-green-100 transition"
                        >
                          ✓ Approve
                        </button>
                      ) : (
                        <span className="font-sans text-[10px] bg-green-50 text-green-500 border border-green-100 rounded-full px-3 py-1">
                          ✓ Approved
                        </span>
                      )}
                      <button
                        onClick={() => deleteUpload(u._id)}
                        className="font-sans text-[10px] bg-red-50 text-red-500 border border-red-200 rounded-full px-3 py-1 hover:bg-red-100 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {!uLoad && uploads.length === 0 && (
                <EmptyState label="No uploads yet" />
              )}
            </div>
          </section>
        )}

        {/* ── AUDIO ── */}
        {tab === "audio" && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl text-espresso">Audio Messages</h3>
              <span className="font-sans text-xs text-gold-500">
                {messages.length} total
              </span>
            </div>
            {aLoad && <SkeletonList />}
            <div className="flex flex-col gap-3">
              {messages.map((m) => (
                <div key={m._id} className="card py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-gold-100 flex items-center justify-center text-lg flex-shrink-0">
                        🎤
                      </div>
                      <div>
                        <p className="font-sans text-sm text-espresso font-medium">
                          {m.senderName}
                        </p>
                        <p className="font-sans text-[10px] text-gold-400">
                          {new Date(m.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    {/* Download + Delete */}
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleDownloadAudio(m)}
                        className="font-sans text-[10px] bg-gold-50 text-gold-600 border border-gold-200 rounded-full px-3 py-1 hover:bg-gold-100 transition"
                      >
                        ⬇ Save
                      </button>
                      <button
                        onClick={() => deleteMessage(m._id)}
                        className="font-sans text-[10px] bg-red-50 text-red-500 border border-red-200 rounded-full px-3 py-1 hover:bg-red-100 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <audio
                    controls
                    src={m.audioUrl}
                    className="w-full"
                    style={{ height: 36 }}
                  />
                </div>
              ))}
              {!aLoad && messages.length === 0 && (
                <EmptyState label="No audio messages yet" />
              )}
            </div>
          </section>
        )}

        {/* Sign out */}
        <button className="btn-outline w-full mt-8" onClick={logout}>
          Sign Out
        </button>
      </div>
    </>
  );
}

function SkeletonList() {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="shimmer rounded-2xl h-24" />
      ))}
    </div>
  );
}

function EmptyState({ label }) {
  return (
    <div className="text-center py-10">
      <p className="text-3xl mb-2">✨</p>
      <p className="font-sans text-gold-400 text-sm">{label}</p>
    </div>
  );
}
