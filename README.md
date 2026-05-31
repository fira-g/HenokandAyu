# 💍 Wedding Memories — Ayantu & Eyob
### June 27, 2026 · St. Mary's Cathedral, Addis Ababa

A production-ready, luxury mobile-first wedding web app with a full Express/MongoDB/Cloudinary backend.

---

## ✨ Features

**Guest experience**
- Cinematic hero landing page with live countdown
- Love story, event timeline, Bible verse
- CTA buttons → Gallery, Memories, Wishes
- No bottom nav clutter — floating admin button only

**Gallery**
- Local photos from `/public/gallery/` (add your JPGs there)
- Fullscreen lightbox with swipe, keyboard nav, fixed left/right arrows
- Emoji reactions (❤️ 😍 😭 🔥 👏) — persist locally + in MongoDB
- Share button (native share on mobile, clipboard on desktop)

**Wishes**
- Text messages with optional anonymous mode
- In-browser audio recording → uploaded to Cloudinary
- Live feed of approved messages

**Memories (Private uploads)**
- Photo upload → Cloudinary (private, admin-only)
- Caption + name optional

**Admin Dashboard** (floating 🔐 button, JWT-secured)
- Stats overview (uploads, wishes, audio, gallery)
- **Upload tab**: photo grid → tap → fullscreen with download button
- **Wishes tab**: approve/delete, timestamps
- **Audio tab**: play inline + download each recording

**Desktop**
- Wide layout (480px app column, soft linen background)
- Back arrow on all inner pages

---

## 🚀 Quick Start

### 1. Fill environment variables

**`backend/.env`**
```env
PORT=5000
MONGO_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/wedding-memories
JWT_SECRET=long_random_string_here
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=admin@yourwedding.com
ADMIN_PASSWORD=your_secure_password
CLIENT_ORIGIN=http://localhost:5173
```

**`.env` (frontend)**
```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Start backend
```bash
cd backend
npm install
npm run dev        # http://localhost:5000
```

### 3. Create admin account (once)
```bash
curl -X POST http://localhost:5000/api/auth/seed
```
> Disable this endpoint in production by setting `NODE_ENV=production`

### 4. Start frontend
```bash
# project root
npm install
npm run dev        # http://localhost:5173
```

---

## 📸 Adding Wedding Photos

1. Drop `.jpg` files into `/public/gallery/`
2. Update `src/constants/index.js` → `LOCAL_GALLERY`:

```js
export const LOCAL_GALLERY = [
  { id: 'lg1', url: '/gallery/ceremony_01.jpg', category: 'Ceremony', caption: 'Forever begins' },
  { id: 'lg2', url: '/gallery/dance.jpg',       category: 'Special',  caption: 'First dance'    },
  // ...
]
```

Categories: `Ceremony`, `Engagement`, `Family`, `Special`

---

## 🌐 Deployment

| Service    | Platform          | Notes                                    |
|------------|-------------------|------------------------------------------|
| Frontend   | **Vercel**        | Set `VITE_API_URL=https://yourapi.com/api` |
| Backend    | **Railway/Render**| Set all backend env vars in dashboard     |
| Database   | **MongoDB Atlas** | Free M0 tier is fine                      |
| Media      | **Cloudinary**    | Free tier: 25GB storage                   |

**Production checklist:**
- [ ] Set `NODE_ENV=production` (disables /api/auth/seed)
- [ ] Set `CLIENT_ORIGIN` to your Vercel domain
- [ ] Use a strong `JWT_SECRET` (32+ random chars)
- [ ] Enable MongoDB Atlas IP allowlist

---

## 📁 Project Structure

```
wedding-memories/
├── public/gallery/          ← Your wedding .jpg photos go here
├── src/
│   ├── App.jsx              ← Routes
│   ├── services/api.js      ← All API calls
│   ├── store/               ← Zustand (gallery, wishes, uploads, audio, admin)
│   ├── hooks/               ← useCountdown, useAudioRecorder
│   ├── utils/               ← helpers, session.js
│   ├── constants/           ← Wedding data, LOCAL_GALLERY, REACTION_EMOJIS
│   ├── components/
│   │   ├── common/          ← Ornament, SectionTitle, PageHeader, AlertSuccess, BackToHome
│   │   ├── layout/          ← AppShell (floating admin btn, back arrow, wide desktop)
│   │   ├── sections/        ← Hero, Countdown, Story, Quote, Timeline, CTA, Footer
│   │   ├── gallery/         ← GalleryFilter, GalleryGrid, Lightbox (reactions + share)
│   │   ├── wishes/          ← WishForm, AudioRecorder, WishesFeed
│   │   ├── memories/        ← PhotoUploadForm
│   │   └── admin/           ← AdminLogin, AdminDashboard (lightbox + downloads)
│   └── pages/               ← Thin page orchestrators
└── backend/
    ├── server.js
    ├── .env                 ← Fill in your credentials
    ├── config/              ← db.js, cloudinary.js
    ├── models/              ← Admin, Wish, GuestUpload, AudioMessage, GalleryPhoto, Reaction
    ├── controllers/         ← auth, wish, upload, audio, gallery, reaction
    ├── routes/              ← Express routers
    └── middleware/          ← authMiddleware, errorMiddleware
```

---

Made with 💛 for Ayantu & Eyob's special day
