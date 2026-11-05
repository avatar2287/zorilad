import { useEffect, useRef, useState } from "react";
import { chrome, tales, type LoreLang } from "@/components/neidan/lore";
import { LangPill } from "@/components/neidan/water";

type Breeze = {
  fadeIn: () => void;
  fadeDown: () => void;
  stop: () => void;
};

function fillPink(data: Float32Array) {
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;
  let b5 = 0;
  let b6 = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
    b6 = white * 0.115926;
  }
}

function openBreeze(): Breeze {
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx();
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
  fillPink(buffer.getChannelData(0));

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 725;
  band.Q.value = 0.55;

  const gain = ctx.createGain();
  gain.gain.value = 0;

  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.07;
  const depth = ctx.createGain();
  depth.gain.value = 475;
  lfo.connect(depth);
  depth.connect(band.frequency);

  source.connect(band);
  band.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  lfo.start();

  const fadeIn = () => {
    void ctx.resume();
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 2);
  };

  const fadeDown = () => {
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), now);
    gain.gain.linearRampToValueAtTime(0, now + 1.4);
  };

  const stop = () => {
    fadeDown();
    window.setTimeout(() => {
      try {
        source.stop();
        lfo.stop();
        void ctx.close();
      } catch {
        /* already closed */
      }
    }, 1500);
  };

  return { fadeIn, fadeDown, stop };
}

function Prana() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motes = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: 0.04 + Math.random() * 0.1,
      r: 0.8 + Math.random() * 2.2,
      gold: Math.random() > 0.5,
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
        mote.y -= mote.v * 0.0016;
        mote.x += Math.sin(frame * 0.008 + mote.phase) * 0.00035;
        if (mote.y < -0.04) {
          mote.y = 1.04;
          mote.x = Math.random();
        }
        ctx.fillStyle = mote.gold ? "rgba(232, 196, 110, 0.55)" : "rgba(120, 220, 150, 0.45)";
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
  return <canvas ref={ref} className="wood-prana" aria-hidden />;
}

export function WoodScreen({
  lang,
  onLang,
  onClose,
  onPrev,
  onNext,
}: {
  lang: LoreLang;
  onLang: (lang: LoreLang) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const text = chrome[lang];
  const tale = tales.wood[lang];
  const bed = useRef<Breeze | null>(null);
  const [on, setOn] = useState(true);

  useEffect(() => {
    try {
      const breeze = openBreeze();
      breeze.fadeIn();
      bed.current = breeze;
      return () => breeze.stop();
    } catch {
      return undefined;
    }
  }, []);

  function toggle() {
    const breeze = bed.current;
    if (!breeze) return;
    if (on) {
      breeze.fadeDown();
      setOn(false);
    } else {
      breeze.fadeIn();
      setOn(true);
    }
  }

  return (
    <div className="wood-screen">
      <div className="wood-falls" aria-hidden>
        <img src="/neidan/wood.jpg?v=5" alt="" />
        <video src="/neidan/wood-loop.mp4?v=3" autoPlay muted loop playsInline />
        <div className="wood-rays" />
        <Prana />
      </div>
      <div className="wood-dim" />
      <header className="water-bar">
        <button type="button" className="water-back" onClick={onClose}>
          {text.back}
        </button>
        <div className="bar-tools">
          <LangPill lang={lang} onChange={onLang} />
          <button type="button" className="water-sound" onClick={toggle} aria-pressed={on}>
            {on ? text.woodOn : text.woodOff}
          </button>
        </div>
      </header>
      <div className="water-scroll">
        <h1>{tale.title}</h1>
        <p className="water-lead wood-lead">{tale.lead}</p>
        {tale.sections.map((section) => (
          <article key={section.heading} className="water-card wood-card">
            <h2>{section.heading}</h2>
            {section.parts.map((part, index) =>
              part.kind === "h" ? <h3 key={index}>{part.text}</h3> : <p key={index}>{part.text}</p>,
            )}
          </article>
        ))}
        <div className="fire-nav wood-nav">
          <button type="button" onClick={onPrev}>
            {tale.prev}
          </button>
          <button type="button" onClick={onNext}>
            {tale.after}
          </button>
        </div>
      </div>
    </div>
  );
}
