// ─── Wedding Info ────────────────────────────────────────────────────────────
export const WEDDING = {
  bride:     'Ayantu',
  groom:     'Eyob',
  date:      new Date('2026-06-27T16:00:00'),
  dateLabel: 'June 27, 2026',
  venue:     "St. Mary's Cathedral",
  city:      'Addis Ababa',
  quote:     '"Two are better than one… for if they fall, one will lift up the other."',
  verse:     'Ecclesiastes 4:9',
  story:     `What started as a chance encounter at a rainy bookshop in Addis became
the greatest story either of us ever read. Ayantu was reaching for the same book —
Eyob had already claimed it, but gladly gave it up. That was the first of many
gifts they would give each other.`,
}

// ─── Event Timeline ───────────────────────────────────────────────────────────
export const TIMELINE = [
  { time: '2:00 PM', event: 'Guest Arrival',  detail: 'Doors open, music begins',  emoji: '🕑' },
  { time: '4:00 PM', event: 'Ceremony',        detail: "St. Mary's Cathedral",     emoji: '💍' },
  { time: '6:30 PM', event: 'Cocktail Hour',   detail: 'Garden Terrace',            emoji: '🥂' },
  { time: '8:00 PM', event: 'Reception',        detail: 'Grand Ballroom',            emoji: '🎶' },
]

// ─── Local gallery photos (served from /public/gallery/) ─────────────────────
// Replace filenames with your actual wedding photos. 
// Put all .jpg files inside /public/gallery/
export const LOCAL_GALLERY = [
  { id: 'lg1', url: '/gallery/ceremony_1.jpg',   category: 'Ceremony',   caption: 'Forever begins'  },
  { id: 'lg2', url: '/gallery/ceremony_2.jpg',   category: 'Ceremony',   caption: 'I do'            },
  { id: 'lg3', url: '/gallery/engagement_1.jpg', category: 'Engagement', caption: 'The yes'         },
  { id: 'lg4', url: '/gallery/engagement_2.jpg', category: 'Engagement', caption: 'Our story'       },
  { id: 'lg5', url: '/gallery/family_1.jpg',     category: 'Family',     caption: 'Together'        },
  { id: 'lg6', url: '/gallery/special_1.jpg',    category: 'Special',    caption: 'First dance'     },
]

export const GALLERY_CATEGORIES = ['All', 'Ceremony', 'Engagement', 'Family', 'Special']

export const REACTION_EMOJIS = ['❤️', '😍', '😭', '🔥', '👏']

// ─── Routes ───────────────────────────────────────────────────────────────────
export const NAV_ROUTES = [
  { path: '/',          id: 'home',     icon: '🏠', label: 'Home'     },
  { path: '/gallery',   id: 'gallery',  icon: '🖼', label: 'Gallery'  },
  { path: '/wishes',    id: 'wishes',   icon: '💌', label: 'Wishes'   },
  { path: '/memories',  id: 'memories', icon: '📸', label: 'Memories' },
  { path: '/admin',     id: 'admin',    icon: '⚙️', label: 'Admin'    },
]
