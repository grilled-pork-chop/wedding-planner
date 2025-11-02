import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { AnimationPhase, type FormData } from "@/types";
import { WEDDING_CONFIG, getCoupleNames, getVenueText } from "@/constants/wedding.config";
import { AnimationController, playEnvelopeOpen, playSubmission } from "@/utils/animations";
import { submitInvitation } from "@/utils/api";
import FloatingFlowers from "@/components/FloatingFlowers";
import LanguageToggle from "@/components/LanguageToggle";

export default function Invitation() {
  const { t } = useTranslation()
  const [phase, setPhase] = useState<AnimationPhase>(AnimationPhase.IDLE);
  const [cardVisible, setCardVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    guestName: "",
    numberOfGuests: 1,
    email: "",
    dietaryRestrictions: "",
  });

  const controller = useRef<AnimationController | null>(null);

  useEffect(() => {
    controller.current = new AnimationController();
    return () => controller.current?.cleanup();
  }, []);

  const handleOpen = () => {
    if (phase !== AnimationPhase.IDLE || !controller.current) return;
    setPhase(AnimationPhase.OPENING);
    playEnvelopeOpen(controller.current, () => {
      setCardVisible(true);
      setPhase(AnimationPhase.IDLE);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked :
        name === "numberOfGuests" ? parseInt(value, 10) :
          value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phase !== AnimationPhase.IDLE || !controller.current) return;
    setPhase(AnimationPhase.SUBMITTING);

    try {
      await submitInvitation(formData);
      playSubmission(controller.current, () => {
        setPhase(AnimationPhase.COMPLETE);
      });
    } catch (error) {
      setPhase(AnimationPhase.IDLE);
    }
  };

  const isAnimating = phase !== AnimationPhase.IDLE;
  const showThankYou = phase === AnimationPhase.COMPLETE;

  return (
    <div className="main-container">
      <LanguageToggle />
      <FloatingFlowers />

      <div className="envelope-view" id="envelopeView">

        {phase != AnimationPhase.SUBMITTING && (
        <div className="invitation-text">
          <h1>{t("you_are_invited")}</h1>
        </div>
        )}
        <div className="envelope-container">
          <div className="envelope" id="envelope">
            <div className="envelope-body" />
            <div className="envelope-flap" />
            <div
              className="wax-seal"
              id="waxSeal"
              onClick={handleOpen}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              aria-label="Open invitation envelope"
            />
          </div>
        </div>
      </div>

      <div className={`invitation-card ${cardVisible ? "show" : ""}`} id="invitationCard">
        <div className="ornate-border" />
        <div className="card-front">
          <div className="wedding-names">
            <h2>{getCoupleNames(" & ")}</h2>
            <div className="wedding-date">{getVenueText()}</div>
          </div>
          <div className="decorative-divider">❦ ❦ ❦</div>

          <form className="registration-form" onSubmit={handleSubmit}>
            {/* Guest Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="guestName">{t("guest_name")}</label>
              <input
                type="text"
                id="guestName"
                name="guestName"
                className="form-input"
                value={formData.guestName}
                onChange={handleChange}
                disabled={isAnimating}
                required
              />
            </div>

            {/* Number of Guests */}
            <div className="form-group">
              <label className="form-label" htmlFor="numberOfGuests">{t("number_attendees")}</label>
              <select
                id="numberOfGuests"
                name="numberOfGuests"
                className="form-select"
                value={formData.numberOfGuests}
                onChange={handleChange}
                disabled={isAnimating}
                required
              >
                {Array.from({ length: WEDDING_CONFIG.guests.maxPerInvitation }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">{t("email_address")}</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                disabled={isAnimating}
                required={WEDDING_CONFIG.guests.requireEmail}
              />
            </div>

            {/* Dietary Restrictions */}
            {WEDDING_CONFIG.guests.askDietaryRestrictions && (
              <div className="form-group">
                <label className="form-label" htmlFor="dietaryRestrictions">{t("special_notes")}</label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  className="form-textarea"
                  rows={3}
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  disabled={isAnimating}
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="form-group">
              <button type="submit" className="submit-button" disabled={isAnimating}>
                {t("confirm_attendance")}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showThankYou && (
        <div className="invitation-card show thank-you-fade-in">
          <div className="ornate-border" />
          <div className="thank-you-content">
            <h3>{t("thank_you")}</h3>
            <div
              className="thank-you-message"
              dangerouslySetInnerHTML={{ __html: t("thank_you_message") }}
            />
          </div>
        </div>
      )}
    </div>
  );
}