import { useEffect, useRef, useState } from "react";
import { chrome, tales, type LoreLang } from "@/components/neidan/lore";
import { LangPill } from "@/components/neidan/water";

type Hearth = {
  fadeIn: () => void;
  fadeDown: () => void;
  stop: () => void;
};

function openHearth(): Hearth {
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx();
  const seconds = 3;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let brown = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    brown = (brown + 0.02 * white) * 0.996;
    data[i] = Math.max(-1, Math.min(1, brown * 3));
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const low = ctx.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.value = 280;
  low.Q.value = 0.7;
  const hum = ctx.createGain();
  hum.gain.value = 0;
  const pops = ctx.createGain();
  pops.gain.value = 0;
  source.connect(low);
  low.connect(hum);
  hum.connect(ctx.destination);
  pops.connect(ctx.destination);
  source.start();

  let alive = true;
  let timer = 0;

  const crack = () => {
    try {
      const now = ctx.currentTime;
      const burst = ctx.createBufferSource();
      burst.buffer = buffer;
      const band = ctx.createBiquadFilter();
      band.type = "bandpass";
      band.frequency.value = 700 + Math.random() * 1400;
      band.Q.value = 0.8;
      const voice = ctx.createGain();
      const end = 0.05 + Math.random() * 0.08;
      voice.gain.setValueAtTime(0.0001, now);
      voice.gain.exponentialRampToValueAtTime(0.2 + Math.random() * 0.15, now + 0.012);
      voice.gain.exponentialRampToValueAtTime(0.0001, now + end);
      burst.connect(band);
      band.connect(voice);
      voice.connect(pops);
      burst.start(now);
      burst.stop(now + end + 0.02);
    } catch {
      /* a missed crackle must not close the screen */
    }
  };

  const schedule = () => {
    if (!alive) return;
    if (Math.random() < 0.72) crack();
    timer = window.setTimeout(schedule, 1600 + Math.random() * 4200);
  };
  schedule();

  const fadeIn = () => {
    void ctx.resume();
    const now = ctx.currentTime;
    hum.gain.cancelScheduledValues(now);
    pops.gain.cancelScheduledValues(now);
    hum.gain.setValueAtTime(hum.gain.value, now);
    pops.gain.setValueAtTime(pops.gain.value, now);
    hum.gain.linearRampToValueAtTime(0.09, now + 2);
    pops.gain.linearRampToValueAtTime(1, now + 2);
  };

  const fadeDown = () => {
    const now = ctx.currentTime;
    hum.gain.cancelScheduledValues(now);
    pops.gain.cancelScheduledValues(now);
    hum.gain.setValueAtTime(Math.max(hum.gain.value, 0.0001), now);
    pops.gain.setValueAtTime(Math.max(pops.gain.value, 0.0001), now);
    hum.gain.linearRampToValueAtTime(0, now + 1.2);
    pops.gain.linearRampToValueAtTime(0, now + 1.2);
  };

  const stop = () => {
    alive = false;
    window.clearTimeout(timer);
    fadeDown();
    window.setTimeout(() => {
      try {
        source.stop();
        void ctx.close();
      } catch {
        /* already closed */
      }
    }, 1400);
  };

  return { fadeIn, fadeDown, stop };
}

function Embers() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motes = Array.from({ length: 48 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: 0.08 + Math.random() * 0.22,
      r: 0.6 + Math.random() * 1.8,
      gold: Math.random() > 0.45,
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
        mote.y -= mote.v * 0.003;
        mote.x += Math.sin(frame * 0.01 + mote.y * 10) * 0.0004;
        if (mote.y < -0.04) {
          mote.y = 1.02;
          mote.x = Math.random();
        }
        ctx.fillStyle = mote.gold ? "rgba(255, 186, 92, 0.55)" : "rgba(220, 72, 42, 0.45)";
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
  return <canvas ref={ref} className="fire-embers" aria-hidden />;
}

export function FireScreen({
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
  const tale = tales.fire[lang];
  const bed = useRef<Hearth | null>(null);
  const [on, setOn] = useState(true);

  useEffect(() => {
    try {
      const hearth = openHearth();
      hearth.fadeIn();
      bed.current = hearth;
      return () => hearth.stop();
    } catch {
      return undefined;
    }
  }, []);

  function toggle() {
    const hearth = bed.current;
    if (!hearth) return;
    if (on) {
      hearth.fadeDown();
      setOn(false);
    } else {
      hearth.fadeIn();
      setOn(true);
    }
  }

  return (
    <div className="fire-screen">
      <div className="fire-falls" aria-hidden>
        <img src="/neidan/fire.jpg?v=5" alt="" />
        <video src="/neidan/fire-loop.mp4?v=3" autoPlay muted loop playsInline />
        <Embers />
      </div>
      <div className="fire-dim" />
      <header className="water-bar">
        <button type="button" className="water-back" onClick={onClose}>
          {text.back}
        </button>
        <div className="bar-tools">
          <LangPill lang={lang} onChange={onLang} />
          <button type="button" className="water-sound" onClick={toggle} aria-pressed={on}>
            {on ? text.fireOn : text.fireOff}
          </button>
        </div>
      </header>
      <div className="water-scroll">
        <h1>{tale.title}</h1>
        <p className="water-lead fire-lead">{tale.lead}</p>
        {tale.sections.map((section) => (
          <article key={section.heading} className="water-card fire-card">
            <h2>{section.heading}</h2>
            {section.parts.map((part, index) =>
              part.kind === "h" ? <h3 key={index}>{part.text}</h3> : <p key={index}>{part.text}</p>,
            )}
          </article>
        ))}
        <div className="fire-nav">
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
