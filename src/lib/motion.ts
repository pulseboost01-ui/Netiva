/** Shared motion tokens — Signal / Systems luxury language */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutSmooth = [0.65, 0, 0.35, 1] as const;
export const easeSnap = [0.33, 1, 0.68, 1] as const;

export const stagger = 0.06;

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: easeOutExpo },
};
