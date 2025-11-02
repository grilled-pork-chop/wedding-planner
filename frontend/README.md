# Wedding Invitation

Animated wedding invitation with envelope opening effect, confetti, and bilingual support (French/Vietnamese).

## 🚀 Quick Start

```bash
pnpm install
pnpm run dev
```

## ⚙️ Customize

Edit `src/constants/wedding.config.ts`:

```typescript
export const WEDDING_CONFIG = {
  bride: "Marie",           // ← Change names
  groom: "Minh",
  
  date: {
    day: 15,
    month: "Juin",
    year: 2026,             // ← Change date
  },
  
  venue: {
    name: "Château de Versailles",  // ← Change venue
  },
}
```

## 📁 Structure

```
src/
├── components/Invitation.tsx    # Main component
├── constants/
│   ├── wedding.config.ts        # ← EDIT THIS
│   ├── translations.ts          # Translations
│   └── timings.ts               # Animation timings
├── utils/
│   ├── animations.ts            # Animation logic
│   └── api.ts                   # Form submission
└── styles/invitation.css        # Styles
```

## Deploy

Build for production:

```bash
pnpm run build
```
