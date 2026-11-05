import { useEffect, useRef, useState } from "react";
import { chrome, tales, type LoreLang } from "@/components/neidan/lore";
import { LangPill } from "@/components/neidan/water";

type Pulse = {
  fadeIn: () => void;
  fadeDown: () => void;
  stop: () => void;
};

function fillBrown(data: Float32Array) {
  let brown = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    brown = (brown + 0.02 * white) * 0.996;
    data[i] = Math.max(-1, Math.min(1, brown * 3.2));
  }
}

function openPulse(): Pulse {
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx();
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
  fillBrown(buffer.getChannelData(0));

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const high = ctx.createBiquadFilter();
  high.type = "highpass";
  high.frequency.value = 65;
  const low = ctx.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.value = 180;
  low.Q.value = 0.7;

  const gain = ctx.createGain();
  gain.gain.value = 0;
  const body = ctx.createGain();
  body.gain.value = 1;

  const beat = ctx.createOscillator();
  beat.frequency.value = 0.9;
  const beatDepth = ctx.createGain();
  beatDepth.gain.value = 0.12;
  beat.connect(beatDepth);
  beatDepth.connect(body.gain);

  source.connect(high);
  high.connect(low);
  low.connect(body);
  body.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  beat.start();

  let alive = true;
  let timer = 0;
  const rustle = () => {
    try {
      const now = ctx.currentTime;
      const burst = ctx.createBufferSource();
      burst.buffer = buffer;
      const band = ctx.createBiquadFilter();
      band.type = "bandpass";
      band.frequency.value = 900 + Math.random() * 700;
      band.Q.value = 0.7;
      const voice = ctx.createGain();
      const end = 0.12 + Math.random() * 0.18;
      voice.gain.setValueAtTime(0.0001, now);
      voice.gain.exponentialRampToValueAtTime(0.04, now + 0.03);
      voice.gain.exponentialRampToValueAtTime(0.0001, now + end);
      burst.connect(band);
      band.connect(voice);
      voice.connect(gain);
      burst.start(now);
      burst.stop(now + end + 0.02);
    } catch {
      /* a missed grain must not close the screen */
    }
  };
  const schedule = () => {
    if (!alive) return;
    if (Math.random() < 0.65) rustle();
    timer = window.setTimeout(schedule, 2400 + Math.random() * 3800);
  };
  schedule();

  const fadeIn = () => {
    void ctx.resume();
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 2);
  };
  const fadeDown = () => {
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), now);
    gain.gain.linearRampToValueAtTime(0, now + 1.4);
  };
  const stop = () => {
    alive = false;
    window.clearTimeout(timer);
    fadeDown();
    window.setTimeout(() => {
      try {
        source.stop();
        beat.stop();
        void ctx.close();
      } catch {
        /* already closed */
      }
    }, 1500);
  };
  return { fadeIn, fadeDown, stop };
}

function Dust() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motes = Array.from({ length: 28 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: 0.03 + Math.random() * 0.06,
      r: 0.6 + Math.random() * 1.4,
      phase: Math.random() * Math.PI * 2,
    }));
    let frame = 0;
    let id = 0;
    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.clearRect(0, 0, w, h);
      for (const mote of motes) {
        mote.y -= mote.v * 0.0012;
        mote.x += Math.sin(frame * 0.006 + mote.phase) * 0.0002;
        if (mote.y < -0.03) {
          mote.y = 1.03;
          mote.x = Math.random();
        }
        ctx.fillStyle = "rgba(226, 176, 96, 0.55)";
        ctx.beginPath();
        ctx.arc(mote.x * w, mote.y * h, mote.r, 0, Math.PI * 2);
        ctx.fill();
      }
      frame += 1;
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, []);
  return <canvas ref={ref} className="earth-dust" aria-hidden />;
}

export function EarthScreen({
  lang,
  onLang,
  onClose,
  onPrev,
  onCenter,
}: {
  lang: LoreLang;
  onLang: (lang: LoreLang) => void;
  onClose: () => void;
  onPrev: () => void;
  onCenter: () => void;
}) {
  const text = chrome[lang];
  const tale = tales.earth[lang];
  const bed = useRef<Pulse | null>(null);
  const [on, setOn] = useState(true);

  useEffect(() => {
    try {
      const pulse = openPulse();
      pulse.fadeIn();
      bed.current = pulse;
      return () => pulse.stop();
    } catch {
      return undefined;
    }
  }, []);

  function toggle() {
    const pulse = bed.current;
    if (!pulse) return;
    if (on) {
      pulse.fadeDown();
      setOn(false);
    } else {
      pulse.fadeIn();
      setOn(true);
    }
  }

  return (
    <div className="earth-screen">
      <div className="earth-falls" aria-hidden>
        <img src="/neidan/earth.jpg?v=5" alt="" />
        <video src="/neidan/earth-loop.mp4?v=3" autoPlay muted loop playsInline />
        <div className="earth-glow" />
        <Dust />
      </div>
      <div className="earth-dim" />
      <header className="water-bar">
        <button type="button" className="water-back" onClick={onClose}>
          {text.back}
        </button>
        <div className="bar-tools">
          <LangPill lang={lang} onChange={onLang} />
          <button type="button" className="water-sound" onClick={toggle} aria-pressed={on}>
            {on ? text.earthOn : text.earthOff}
          </button>
        </div>
      </header>
      <div className="water-scroll">
        <h1>{tale.title}</h1>
        <p className="water-lead earth-lead">{tale.lead}</p>
        {tale.sections.map((section) => (
          <article key={section.heading} className="water-card earth-card">
            <h2>{section.heading}</h2>
            {section.parts.map((part, index) =>
              part.kind === "h" ? <h3 key={index}>{part.text}</h3> : <p key={index}>{part.text}</p>,
            )}
          </article>
        ))}
        <div className="fire-nav earth-nav">
          <button type="button" onClick={onPrev}>
            {tale.prev}
          </button>
          <button type="button" onClick={onCenter}>
            {tale.after}
          </button>
        </div>
      </div>
    </div>
  );
}
