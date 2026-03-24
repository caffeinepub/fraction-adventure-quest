let audioContext: AudioContext | null = null;
let bgOscillators: OscillatorNode[] = [];
let bgPlaying = false;
let bgLoopTimeout: ReturnType<typeof setTimeout> | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

function playNote(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.4,
): void {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);
  gainNode.gain.setValueAtTime(gain, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

export function playCorrectSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    playNote(ctx, 523.25, now, 0.12, "sine", 0.35);
    playNote(ctx, 659.25, now + 0.1, 0.12, "sine", 0.35);
    playNote(ctx, 783.99, now + 0.2, 0.25, "sine", 0.4);
  } catch (_e) {
    // Audio not available
  }
}

export function playWrongSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  } catch (_e) {
    // Audio not available
  }
}

export function playLevelComplete(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      playNote(ctx, freq, now + i * 0.15, 0.2, "sine", 0.38);
    });
    playNote(ctx, 1046.5, now + 0.7, 0.4, "sine", 0.4);
  } catch (_e) {
    // Audio not available
  }
}

function scheduleBgLoop(ctx: AudioContext, gain: GainNode): void {
  if (!bgPlaying) return;
  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  osc1.type = "triangle";
  osc2.type = "triangle";
  osc1.frequency.setValueAtTime(130.81, now);
  osc2.frequency.setValueAtTime(164.81, now);
  osc1.connect(gain);
  osc2.connect(gain);
  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 4);
  osc2.stop(now + 4);
  bgOscillators = [osc1, osc2];
  bgLoopTimeout = setTimeout(() => scheduleBgLoop(ctx, gain), 4000);
}

export function startBackgroundMusic(): void {
  if (bgPlaying) return;
  try {
    const ctx = getAudioContext();
    bgPlaying = true;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.connect(ctx.destination);
    scheduleBgLoop(ctx, gain);
  } catch (_e) {
    bgPlaying = false;
  }
}

export function stopBackgroundMusic(): void {
  bgPlaying = false;
  if (bgLoopTimeout) {
    clearTimeout(bgLoopTimeout);
    bgLoopTimeout = null;
  }
  for (const o of bgOscillators) {
    try {
      o.stop();
    } catch (_e) {
      // already stopped
    }
  }
  bgOscillators = [];
}
