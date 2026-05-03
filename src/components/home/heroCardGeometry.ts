export type CardPose = {
  left: number;
  top: number;
  width: number;
  rotate: number;
  scale: number;
};

export type CardDef = {
  z: number;
  stack: CardPose;
  grid: CardPose;
};

/** Stack → mini grid inside the hero flight stage (% of stage box). Order matches featured.slice(0,3). */
export const HERO_CARD_LAYOUT: CardDef[] = [
  {
    z: 30,
    stack: { left: 12, top: 4, width: 80, rotate: -10, scale: 0.96 },
    grid: { left: 0, top: 0, width: 49, rotate: 0, scale: 1 },
  },
  {
    z: 20,
    stack: { left: 3, top: 22, width: 76, rotate: 8, scale: 0.92 },
    grid: { left: 51, top: 0, width: 49, rotate: 0, scale: 1 },
  },
  {
    z: 10,
    stack: { left: 0, top: 36, width: 72, rotate: -5, scale: 0.88 },
    grid: { left: 0, top: 56, width: 49, rotate: 0, scale: 1 },
  },
];

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

export function poseAt(morphT: number, layout: CardDef): CardPose {
  const t = Math.min(1, Math.max(0, morphT));
  return {
    left: lerp(layout.stack.left, layout.grid.left, t),
    top: lerp(layout.stack.top, layout.grid.top, t),
    width: lerp(layout.stack.width, layout.grid.width, t),
    rotate: lerp(layout.stack.rotate, layout.grid.rotate, t),
    scale: lerp(layout.stack.scale, layout.grid.scale, t),
  };
}

/** Image slice only (flight cards match tile image box). */
export function rectImageInStage(
  stage: DOMRectReadOnly,
  pose: CardPose,
  imageAspectRatio: number,
): { left: number; top: number; width: number; height: number } {
  const w = (pose.width / 100) * stage.width;
  const h = w / imageAspectRatio;
  const left = stage.left + (pose.left / 100) * stage.width;
  const top = stage.top + (pose.top / 100) * stage.height;
  return { left, top, width: w, height: h };
}

export function lerpRect(
  a: { left: number; top: number; width: number; height: number },
  b: { left: number; top: number; width: number; height: number },
  t: number,
) {
  const u = smoothstep(Math.min(1, Math.max(0, t)));
  return {
    left: lerp(a.left, b.left, u),
    top: lerp(a.top, b.top, u),
    width: lerp(a.width, b.width, u),
    height: lerp(a.height, b.height, u),
  };
}
