// ─── Wedding Info ────────────────────────────────────────────────────────────
export const WEDDING = {
  bride: "Ayantu",
  groom: "Henok",
  date: new Date("2026-06-28T16:00:00"),
  dateLabel: "June 28, 2026",
  venue: "Ajip Full Gospel Church",
  city: "Jimma, Ethiopia",
  quote:
    '"Two are better than one… for if they fall, one will lift up the other."',
  verse: "Ecclesiastes 4:9",
  story: `This life journey started with a simple "Hi" on social media.
When Henok first saw Ayantu's profile, he sent a message, but there was no reply. He didn't give up. After several attempts, Ayantu finally responded, and what began as a simple conversation soon turned into hours of talking, sharing, and getting to know one another.
As we spent more time together and eventually met in person, we realized we had found something special. What started with a message became a friendship, then a love story, and now a lifetime together.`,
};

// ─── Event Timeline ───────────────────────────────────────────────────────────
export const TIMELINE = [
  {
    time: "4:00 LT",
    event: "Ceremony & wedding vows",
    detail: "Ajip Full Gospel Church",
    emoji: "💍",
  },
  {
    time: "7:00 LT",
    event: "Lunch",
    detail: "Aramaic Hotel",
    emoji: "🍽",
  },
  {
    time: "8:00 PM",
    event: "Worship & Thanksgiving",
    detail: "Aramaic Hotel",
    emoji: "✝️",
  },
];

// ─── Local gallery photos (served from /public/gallery/) ─────────────────────
// Replace filenames with your actual wedding photos.
// Put all .jpg files inside /public/gallery/
export const LOCAL_GALLERY = [
  {
    id: "lg1",
    url: "/gallery/m1.jpg",
    category: "Him",
    caption: "Forever begins",
  },
  {
    id: "lg2",
    url: "/gallery/m2.jpg",
    category: "Him",
    caption: "Forever begins",
  },
  {
    id: "lg3",
    url: "/gallery/m3.jpg",
    category: "Him",
    caption: "Forever begins",
  },

  {
    id: "lg4",
    url: "/gallery/f1.jpg",
    category: "Her",
    caption: "Forever begins",
  },
  {
    id: "lg5",
    url: "/gallery/f2.jpg",
    category: "Her",
    caption: "Forever begins",
  },
  {
    id: "lg6",
    url: "/gallery/f4.jpg",
    category: "Her",
    caption: "Forever begins",
  },
  {
    id: "f3",
    url: "/gallery/f3.jpg",
    category: "Her",
    caption: "Forever begins",
  },
  {
    id: "lg7",
    url: "/gallery/b1.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg8",
    url: "/gallery/b2.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg9",
    url: "/gallery/b3.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg10",
    url: "/gallery/b4.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg11",
    url: "/gallery/b5.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg12",
    url: "/gallery/b6.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg13",
    url: "/gallery/b7.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg14",
    url: "/gallery/b8.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg15",
    url: "/gallery/b9.jpg",
    category: "Together",
    caption: "Forever begins",
  },
];

export const GALLERY_CATEGORIES = ["All", "Him", "Her", "Together"];

export const REACTION_EMOJIS = ["❤️", "😍", "😭", "🔥", "👏"];

// ─── Routes ───────────────────────────────────────────────────────────────────
export const NAV_ROUTES = [
  { path: "/", id: "home", icon: "🏠", label: "Home" },
  { path: "/gallery", id: "gallery", icon: "🖼", label: "Gallery" },
  { path: "/wishes", id: "wishes", icon: "💌", label: "Wishes" },
  { path: "/memories", id: "memories", icon: "📸", label: "Memories" },
  { path: "/admin", id: "admin", icon: "⚙️", label: "Admin" },
];
