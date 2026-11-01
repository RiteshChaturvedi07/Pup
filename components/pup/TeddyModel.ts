export interface TeddyPose {
  bodyRot: number;
  bodyX: number;
  bodyY: number;
  stretch: number;
  headX: number;
  headY: number;
  headRot: number;
  earL: number;
  earR: number;
  tail: number;
  fn: number;
  ff: number;
  bn: number;
  bf: number;
  sit: number;
  eyes: number;
  happy: number;
  tongue: number;
  mouth: number;
  front: number;
}

export interface TeddyTimeState {
  phase: number;
  stride: number;
  time: number;
  wag: number;
  gazeX: number;
  gazeY: number;
  blink: number;
  ear: number;
}

function generateCloudPath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  segments: number,
  puff: number,
  startAngle = -Math.PI / 2,
  tiltDeg = 0
): string {
  const tiltRad = (tiltDeg * Math.PI) / 180;
  const cosTilt = Math.cos(tiltRad);
  const sinTilt = Math.sin(tiltRad);

  const pt = (angle: number, extraR: number) => {
    const x = Math.cos(angle) * (rx + extraR);
    const y = Math.sin(angle) * (ry + (ry / rx) * extraR);
    const rotX = cx + x * cosTilt - y * sinTilt;
    const rotY = cy + x * sinTilt + y * cosTilt;
    return `${rotX.toFixed(1)} ${rotY.toFixed(1)}`;
  };

  let d = '';
  for (let i = 0; i < segments; i++) {
    const a1 = startAngle + (i / segments) * Math.PI * 2;
    const a2 = startAngle + ((i + 1) / segments) * Math.PI * 2;
    const mid = (a1 + a2) / 2;
    d += `${i === 0 ? `M${pt(a1, 0)}` : ''}Q${pt(mid, 2.1 * puff)} ${pt(a2, 0)}`;
  }
  return `${d}Z`;
}

function generateLegPath(width: number, height: number): string {
  const half = width / 2;
  return `M${-half} -14 C${-half} 4 -12 ${height - 18} -12 ${height - 9} C-12 ${height - 2} -7 ${height} 0 ${height} C9 ${height} 13 ${height - 3} 13 ${height - 9} C13 ${height - 18} ${half} 4 ${half} -14`;
}

export const TEDDY_COLORS = {
  fur: '#f2be6b',
  furAccent: '#e4a352',
  cream: '#fbe3b4',
  blush: '#f9b9a6',
  collar: '#a24a1a',
  ink: '#2a170e',
};

export const TEDDY_POINTS = {
  shoulderN: [186, 194] as [number, number],
  shoulderF: [168, 192] as [number, number],
  hipN: [110, 194] as [number, number],
  hipF: [94, 192] as [number, number],
  tailBase: [84, 150] as [number, number],
  headPivot: [212, 100] as [number, number],
  earLPivot: [174, 82] as [number, number],
  earRPivot: [250, 82] as [number, number],
  bodyPivot: [196, 206] as [number, number],
};

export const TEDDY_PATHS = {
  body: generateCloudPath(140, 170, 64, 36, 15, 3.4, 0.95 * Math.PI),
  chest: generateCloudPath(192, 166, 30, 32, 9, 3.2, 0.6 * Math.PI),
  tail: generateCloudPath(70, 126, 17, 16, 9, 3.2),
  tailStem: 'M86 152 C80 146 76 140 74 136',
  haunch: generateCloudPath(110, 204, 30, 24, 10, 3.2, Math.PI),
  haunchPaw:
    'M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z',
  head: generateCloudPath(212, 100, 51, 46, 16, 3.6),
  topknot: generateCloudPath(212, 52, 17, 12, 8, 2.9, Math.PI),
  earL: generateCloudPath(170, 112, 19, 34, 10, 3.2, -Math.PI / 2, 12),
  earR: generateCloudPath(254, 112, 19, 34, 10, 3.2, -Math.PI / 2, -12),
  muzzle:
    'M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z',
  nose: 'M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z',
  mouth:
    'M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2',
  mouthOpen: 'M203 126 Q212 122 221 126 Q219 138 212 139 Q205 138 203 126 Z',
  tongue: 'M207.6 127.4 Q212 136.6 216.4 127.4 Z',
  collar: 'M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z',
  tag: 'M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z',
  ledgePaws:
    'M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z',
  ledgeToes: 'M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5',
  legs: {
    backFar: generateLegPath(28, 228 - 192),
    frontFar: generateLegPath(22, 228 - 192),
    back: generateLegPath(30, 228 - 194),
    front: generateLegPath(24, 228 - 194),
  },
  shadow: { cx: 150, cy: 230, rx: 92, ry: 7 },
  toes: (len: number) => `M-3.5 ${len - 7} v4.5 M3.5 ${len - 7} v4.5`,
};

const BASE_POSE: TeddyPose = {
  bodyRot: 0,
  bodyX: 0,
  bodyY: 0,
  stretch: 1,
  headX: 0,
  headY: 0,
  headRot: 0,
  earL: 0,
  earR: 0,
  tail: 0,
  fn: 0,
  ff: 0,
  bn: 0,
  bf: 0,
  sit: 0,
  eyes: 1,
  happy: 0,
  tongue: 0,
  mouth: 0,
  front: 0,
};

export const TEDDY_POSES: Record<string, TeddyPose> = {
  stand: BASE_POSE,
  walk: { ...BASE_POSE, tail: -6, tongue: 1 },
  sit: { ...BASE_POSE, bodyRot: -24, bodyY: -2, headX: -10, headY: -6, tail: 34, sit: 1, tongue: 1 },
  peek: { ...BASE_POSE, headY: 4, earL: -6, earR: 6, tail: -20, front: 1, tongue: 1 },
  snug: { ...BASE_POSE, headY: 9, headRot: 4, earL: 3, earR: -3, tail: -20, front: 1, tongue: 0 },
  lie: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 12, headY: 40, headRot: 3, fn: -84, ff: -80, sit: 1, tail: 58, tongue: 0 },
  sleep: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 14, headY: 44, headRot: -8, fn: -84, ff: -80, sit: 1, tail: 64, eyes: 0, earL: 4, earR: -4 },
  settle: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 10, headY: 16, fn: -84, ff: -80, sit: 1, tail: 40, tongue: 1 },
  hop: { ...BASE_POSE, bodyRot: -9, stretch: 1.06, headY: -6, fn: -42, ff: -32, bn: 40, bf: 30, earL: -26, earR: 26, tail: -24, tongue: 1 },
  sniff: { ...BASE_POSE, bodyRot: 7, headX: 16, headY: 32, headRot: 9, tail: -14, fn: 6, ff: 4 },
  bow: { ...BASE_POSE, bodyRot: 15, bodyY: 2, headX: 14, headY: 30, fn: -58, ff: -52, tail: -32, happy: 1, tongue: 1 },
  beg: { ...BASE_POSE, bodyRot: -36, bodyY: -6, headX: -18, headY: -18, sit: 1, fn: -70, ff: -64, tail: 30, happy: 1, tongue: 1 },
};

const round2 = (n: number) => Math.round(100 * n) / 100;
const rotateAround = (deg: number, [cx, cy]: [number, number]) => `rotate(${round2(deg)} ${cx} ${cy})`;

export function computeTeddyTransforms(
  pose: TeddyPose,
  t: TeddyTimeState = { phase: 0, stride: 0, time: 0, wag: 0, gazeX: 0, gazeY: 0, blink: 0, ear: 0 }
) {
  const sinP = Math.sin(t.phase);
  const sinPOpp = Math.sin(t.phase + Math.PI);
  const strideAmp = 20 + 10 * t.stride;
  const bobFactor = (1 - Math.cos(2 * t.phase)) / 2;
  const isWalking = +(t.stride > 0.01);
  const idleBreathe = Math.sin(2.4 * t.time) * (1 - isWalking);

  const bodyY = pose.bodyY - bobFactor * (2.5 + 4 * t.stride) * isWalking + 0.6 * idleBreathe;
  const bodyRot = pose.bodyRot + 1.6 * Math.sin(t.phase) * isWalking;
  const legComp = -pose.bodyRot;

  const wagAmp = 5 + 17 * t.wag;
  const wagFreq = 1.2 + 2.6 * t.wag;
  const tailRot = pose.tail + Math.sin(t.time * wagFreq * Math.PI * 2) * wagAmp;
  const headBob =
    -((1 - Math.cos(2 * t.phase - 0.7)) / 2) * (2 + 3 * t.stride) * isWalking + 0.9 * idleBreathe;

  return {
    body: `translate(${round2(pose.bodyX)} ${round2(bodyY)}) ${rotateAround(bodyRot, TEDDY_POINTS.bodyPivot)} translate(${TEDDY_POINTS.bodyPivot[0]} 0) scale(${round2(pose.stretch)} 1) translate(${-TEDDY_POINTS.bodyPivot[0]} 0)`,
    fn: `translate(${TEDDY_POINTS.shoulderN[0]} ${TEDDY_POINTS.shoulderN[1]}) rotate(${round2(pose.fn + legComp + sinP * strideAmp * isWalking)})`,
    ff: `translate(${TEDDY_POINTS.shoulderF[0]} ${TEDDY_POINTS.shoulderF[1]}) rotate(${round2(pose.ff + legComp + sinPOpp * strideAmp * isWalking)})`,
    bn: `translate(${TEDDY_POINTS.hipN[0]} ${TEDDY_POINTS.hipN[1]}) rotate(${round2(pose.bn + sinPOpp * strideAmp * isWalking)})`,
    bf: `translate(${TEDDY_POINTS.hipF[0]} ${TEDDY_POINTS.hipF[1]}) rotate(${round2(pose.bf + sinP * strideAmp * isWalking)})`,
    tail: rotateAround(tailRot, TEDDY_POINTS.tailBase),
    haunch: `translate(0 ${round2(-0.06 * pose.bodyRot)})`,
    head: `translate(${round2(pose.headX)} ${round2(pose.headY + headBob)}) ${rotateAround(pose.headRot + 1.4 * Math.sin(t.phase) * isWalking, TEDDY_POINTS.headPivot)}`,
    earL: rotateAround(pose.earL + t.ear + 4 * Math.sin(2 * t.phase) * isWalking, TEDDY_POINTS.earLPivot),
    earR: rotateAround(pose.earR - t.ear - 4 * Math.sin(2 * t.phase) * isWalking, TEDDY_POINTS.earRPivot),
    eyes: `translate(${round2(4.6 * t.gazeX)} ${round2(3.4 * t.gazeY)})`,
    blink: `translate(0 ${round2(98 * t.blink * 0.92)}) scale(1 ${round2(1 - 0.92 * t.blink)})`,
    openEyes: round2(Math.max(0, pose.eyes - pose.happy)),
    happyEyes: round2(Math.min(pose.happy, pose.eyes)),
    shutEyes: round2(1 - pose.eyes),
    tongue: round2(pose.tongue * (1 - pose.mouth)),
    mouth: round2(pose.mouth),
    backLegs: round2(1 - pose.sit),
    haunchOpacity: round2(pose.sit * (1 - pose.front)),
    side: round2(1 - pose.front),
    ledge: round2(pose.front),
    shadow: `translate(${round2(0.6 * pose.bodyX)} 0) scale(${round2(1 - 0.05 * bobFactor * isWalking)} 1)`,
    shadowOpacity: round2(0.12 * (1 - pose.front)),
  };
}

