// 🎯 CUSTOMIZE YOUR WEDDING DETAILS HERE
// This is the ONLY file you need to edit to personalize your invitation!

export const WEDDING_CONFIG = {
  bride: "Marie",
  groom: "Minh",

  date: {
    day: 15,
    month: "Juin",
    year: 2026,
  },

  venue: {
    name: "Château de Versailles",
    address: "Place d'Armes, 78000 Versailles, France",
    city: "Versailles",
    country: "France",
  },

  guests: {
    maxPerInvitation: 5,
    requireEmail: true,
    askDietaryRestrictions: false,
  },

  languages: {
    default: "fr" as const,
    available: ["fr", "vi"] as const,
  },
} as const;

export function getFormattedDate(): string {
  const { day, month, year } = WEDDING_CONFIG.date;
  return `${day} ${month} ${year}`;
}

export function getCoupleNames(separator: string = " & "): string {
  const { bride, groom } = WEDDING_CONFIG;
  return `${bride}${separator}${groom}`;
}

export function getVenueText(): string {
  return `${getFormattedDate()} • ${WEDDING_CONFIG.venue.name}`;
}
