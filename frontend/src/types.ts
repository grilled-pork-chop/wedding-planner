
export interface FormData {
  guestName: string;
  numberOfGuests: number;
  email: string;
  dietaryRestrictions: string;
}

export type Language = "fr" | "vi";

export enum AnimationPhase {
  IDLE = "idle",
  OPENING = "opening",
  SUBMITTING = "submitting",
  COMPLETE = "complete",
}