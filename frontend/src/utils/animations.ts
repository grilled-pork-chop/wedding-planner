import { TIMINGS } from "@/constants/timings";

/**
 * Manages animation scheduling and cleanup
 */
export class AnimationController {
  private timeouts: number[] = [];

  schedule(callback: () => void, delay: number): void {
    const id = window.setTimeout(callback, delay);
    this.timeouts.push(id);
  }

  cleanup(): void {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
  }

  shakeBody(): void {
    document.body.style.animation = "shake 0.1s ease-in-out";
    this.schedule(() => {
      document.body.style.animation = "";
    }, 100);
  }

  createParticleTrail(envelope: HTMLElement): void {
    const trail = document.createElement("div");
    trail.className = "particle-trail";
    document.body.appendChild(trail);

    const particleTypes = ["trail-petal", "trail-sparkle", "trail-leaf"];
    const colors = ["#D4AF37", "#9CAF88", "#FFF8F0"];

    const rect = envelope.getBoundingClientRect();
    trail.style.left = `${rect.left + rect.width / 2}px`;
    trail.style.top = `${rect.top + rect.height / 2}px`;

    for (let i = 0; i < 20; i++) {
      this.schedule(() => {
        const p = document.createElement("div");
        const type = particleTypes[Math.floor(Math.random() * 3)];
        p.className = `trail-particle ${type}`;
        p.style.left = `${(Math.random() - 0.5) * 40}px`;
        p.style.top = `${(Math.random() - 0.5) * 40}px`;
        if (type === "trail-sparkle") {
          p.style.background = colors[Math.floor(Math.random() * 3)];
        }
        trail.appendChild(p);
        this.schedule(() => p.remove(), TIMINGS.PARTICLE_LIFETIME);
      }, i * TIMINGS.PARTICLE_SPAWN);
    }

    this.schedule(() => trail.remove(), 3000);
  }

  createConfettiBurst(): void {
    const burst = document.createElement("div");
    burst.className = "confetti-burst";
    document.body.appendChild(burst);

    const types = ["confetti-petal", "confetti-gold", "confetti-heart"];

    for (let i = 0; i < 40; i++) {
      this.schedule(() => {
        const p = document.createElement("div");
        p.className = `confetti-particle ${
          types[Math.floor(Math.random() * 3)]
        }`;
        const angle = (Math.PI * 2 * i) / 40;
        const velocity = 100 + Math.random() * 150;
        const gravity = 0.5;
        let x = 0,
          y = 0,
          vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity,
          rotation = 0;
        const rotationSpeed = (Math.random() - 0.5) * 20;

        burst.appendChild(p);

        const animate = (): void => {
          x += vx * 0.016;
          y += vy * 0.016;
          vy += gravity;
          rotation += rotationSpeed;
          p.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
          p.style.opacity = `${Math.max(0, 1 - y / 300)}`;
          if (y < 400 && parseFloat(p.style.opacity) > 0) {
            requestAnimationFrame(animate);
          } else p.remove();
        };

        requestAnimationFrame(animate);
      }, i * TIMINGS.CONFETTI_SPAWN);
    }

    this.schedule(() => burst.remove(), 5000);
  }
}

/**
 * Plays the envelope opening animation
 */
export function playEnvelopeOpen(
  controller: AnimationController,
  onComplete: () => void
): void {
  const wax = document.getElementById("waxSeal");
  const envelope = document.getElementById("envelope");
  const envelopeView = document.getElementById("envelopeView");

  wax?.classList.add("cracking");

  controller.schedule(() => {
    envelope?.classList.add("opening");
    controller.schedule(() => {
      if (envelopeView) {
        envelopeView.style.opacity = "0.3";
        envelopeView.style.transform = "scale(0.8)";
      }
      onComplete();
    }, TIMINGS.ENVELOPE_OPEN);
  }, TIMINGS.WAX_CRACK);
}

/**
 * Plays the submission animation sequence
 */
export function playSubmission(
  controller: AnimationController,
  onComplete: () => void
): void {
  const card = document.getElementById("invitationCard");
  const envelope = document.getElementById("envelope");
  const envelopeView = document.getElementById("envelopeView");
  const mainContainer = document.querySelector(".main-container");

  // Phase 1: Stamp wax seal
  const seal = document.createElement("div");
  seal.className = "wax-seal-stamp";
  const shimmer = document.createElement("div");
  shimmer.className = "shimmer-highlight";
  seal.appendChild(shimmer);
  card?.appendChild(seal);

  controller.schedule(() => {
    seal.classList.add("stamping");
    card?.classList.add("stamping");
    controller.shakeBody();
  }, TIMINGS.SEAL_STAMP);

  // Phase 2: Return to envelope
  controller.schedule(() => {
    if (envelopeView && envelope) {
      envelopeView.style.opacity = "1";
      envelopeView.style.transform = "scale(1)";
      envelope.classList.add("return-to-envelope");
    }
    controller.schedule(() => {
      card?.classList.add("slide-into-envelope");
      seal.style.opacity = "0";
    }, TIMINGS.SLIDE_DELAY);
  }, TIMINGS.SEAL_ANIMATION);

  // Phase 3: Close flap
  controller.schedule(() => {
    const flap = document.querySelector(".envelope-flap");
    flap?.classList.add("closing");
    controller.schedule(() => {
      const newSeal = document.createElement("div");
      newSeal.className = "new-wax-seal";
      envelope?.appendChild(newSeal);
      controller.schedule(() => {
        newSeal.classList.add("appearing");
        envelope?.classList.add("sealed");
      }, TIMINGS.SEAL_APPEAR);
    }, TIMINGS.FLAP_CLOSE_DURATION);
  }, TIMINGS.FLAP_CLOSE_START);

  // Phase 4: Fly away
  controller.schedule(() => {
    envelope?.classList.add("flying");
    if (envelope) controller.createParticleTrail(envelope);
    controller.schedule(() => {
      if (envelopeView && card) {
        envelopeView.style.display = "none";
        card.style.display = "none";
      }
    }, TIMINGS.FLY_DURATION);
  }, TIMINGS.FLY_START);

  // Phase 5: Confetti + thank you
  controller.schedule(() => {
    mainContainer?.classList.add("brightened");
    controller.createConfettiBurst();
    onComplete();
  }, TIMINGS.CONFETTI_START);
}
