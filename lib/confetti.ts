'use client';

export function triggerConfetti() {
  if (typeof window === 'undefined') return;
  import('canvas-confetti').then((confetti) => {
    confetti.default({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#1E40AF', '#15803D', '#D97706', '#FAFAFA'],
    });
  });
}
