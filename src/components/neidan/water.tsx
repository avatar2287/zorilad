import { useEffect, useRef, useState } from "react";
import { chrome, tales, type LoreLang } from "@/components/neidan/lore";

export function LangPill({ lang, onChange }: { lang: LoreLang; onChange: (lang: LoreLang) => void }) {
  return (
    <div className="lang-pill">
      {(["ru", "en"] as const).map((code) => (
        <button key={code} type="button" data-on={lang === code} onClick={() => onChange(code)}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

type Stream = {
  fadeIn: () => void;
  fadeDown: () => void;
  stop: () => void;
};

function fillBed(data: Float32Array) {
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;
  let b5 = 0;
  let b6 = 0;
  let brown = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    b6 = white * 0.115926;
    brown = (brown + 0.02 * white) * 0.996;
    data[i] = Math.max(-1, Math.min(1, pink * 0.08 + brown * 2.4));
  }
}

function openStream(): Stream {
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx();
  const seconds = 3;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  fillBed(buffer.getChannelData(0));

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const low = ctx.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.value = 900;
  low.Q.value = 0.65;

  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 520;
  band.Q.value = 0.45;

  const gain = ctx.createGain();
  gain.gain.value = 0;

  const birds = ctx.createGain();
  birds.gain.value = 0;
  birds.connect(ctx.destination);

  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.08;
  const depth = ctx.createGain();
  depth.gain.value = 260;
  lfo.connect(depth);
  depth.connect(band.frequency);

  source.connect(low);
  low.connect(band);
  band.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  lfo.start();

  let alive = true;
  let timer = 0;

  const chirp = (soft = false) => {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const voice = ctx.createGain();
      osc.type = "sine";
      const high = Math.random() > 0.45;
      const base = high ? 1900 + Math.random() * 900 : 980 + Math.random() * 420;
      const peak = soft ? 0.018 : 0.04;
      const end = high ? 0.22 : 0.36;
      osc.frequency.setValueAtTime(base, now);
      if (high) {
        osc.frequency.exponentialRampToValueAtTime(base * (1.08 + Math.random() * 0.22), now + 0.07);
        osc.frequency.exponentialRampToValueAtTime(base * 0.94, now + 0.16);
      } else {
        osc.frequency.setValueAtTime(base * 1.18, now + 0.13);
      }
      voice.gain.setValueAtTime(0.0001, now);
      voice.gain.exponentialRampToValueAtTime(peak, now + 0.03);
      voice.gain.exponentialRampToValueAtTime(0.0001, now + end);
      osc.connect(voice);
      voice.connect(birds);
      osc.start(now);
      osc.stop(now + end);
    } catch {
      /* a missed note must not take the screen down */
    }
  };

  const schedule = () => {
    if (!alive) return;
    chirp();
    if (Math.random() < 0.4) window.setTimeout(() => alive && chirp(true), 160 + Math.random() * 280);
    timer = window.setTimeout(schedule, 2600 + Math.random() * 5200);
  };
  schedule();

  const fadeIn = () => {
    void ctx.resume();
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    birds.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    birds.gain.setValueAtTime(birds.gain.value, now);
    gain.gain.linearRampToValueAtTime(0.055, now + 2);
    birds.gain.linearRampToValueAtTime(1, now + 2);
  };

  const fadeDown = () => {
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    birds.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), now);
    birds.gain.setValueAtTime(Math.max(birds.gain.value, 0.0001), now);
    gain.gain.linearRampToValueAtTime(0, now + 1.4);
    birds.gain.linearRampToValueAtTime(0, now + 1.4);
  };

  const stop = () => {
    alive = false;
    window.clearTimeout(timer);
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

function Motes() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const drops = Array.from({ length: 64 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: 0.12 + Math.random() * 0.38,
      r: 0.5 + Math.random() * 1.4,
      a: 0.12 + Math.random() * 0.38,
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
      for (const drop of drops) {
        drop.y += drop.v * 0.0035;
        drop.x += Math.sin(frame * 0.008 + drop.y * 12) * 0.00025;
        if (drop.y > 1.05) {
          drop.y = -0.02;
          drop.x = Math.random();
        }
        ctx.fillStyle = `rgba(198, 226, 246, ${drop.a})`;
        ctx.beginPath();
        ctx.ellipse(drop.x * w, drop.y * h, drop.r * 0.55, drop.r * 2.4, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      frame += 1;
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, []);

  return <canvas ref={ref} className="water-motes" aria-hidden />;
}

export function Prologue({ lang, onLang }: { lang: LoreLang; onLang: (lang: LoreLang) => void }) {
  const text = chrome[lang];
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="info-btn safe-top" onClick={() => setOpen(true)} aria-label="?">
        ?
      </button>
      {open ? (
        <div className="prologue" role="dialog" aria-labelledby="prologue-title">
          <div className="prologue-lang">
            <LangPill lang={lang} onChange={onLang} />
          </div>
          <div className="prologue-card">
            <p className="prologue-note">{text.legal}</p>
            <h2 id="prologue-title">{text.prologueTitle}</h2>
            <p>{text.prologue}</p>
            <button type="button" className="prologue-go" onClick={() => setOpen(false)}>
              {text.begin}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function WaterScreen({
  lang,
  onLang,
  onClose,
  onNext,
}: {
  lang: LoreLang;
  onLang: (lang: LoreLang) => void;
  onClose: () => void;
  onNext: () => void;
}) {
  const text = chrome[lang];
  const tale = tales.water[lang];
  const stream = useRef<Stream | null>(null);
  const [on, setOn] = useState(true);

  useEffect(() => {
    try {
      const bed = openStream();
      bed.fadeIn();
      stream.current = bed;
      return () => bed.stop();
    } catch {
      return undefined;
    }
  }, []);

  function toggle() {
    const bed = stream.current;
    if (!bed) return;
    if (on) {
      bed.fadeDown();
      setOn(false);
    } else {
      bed.fadeIn();
      setOn(true);
    }
  }

  return (
    <div className="water-screen">
      <div className="water-falls" aria-hidden>
        <img src="/neidan/water.jpg?v=5" alt="" />
        <video src="/neidan/water-loop.mp4?v=3" autoPlay muted loop playsInline />
        <div className="water-flow" />
        <div className="water-mist" />
        <Motes />
      </div>
      <div className="water-dim" />
      <header className="water-bar">
        <button type="button" className="water-back" onClick={onClose}>
          {text.back}
        </button>
        <div className="bar-tools">
          <LangPill lang={lang} onChange={onLang} />
          <button type="button" className="water-sound" onClick={toggle} aria-pressed={on}>
            {on ? text.streamOn : text.streamOff}
          </button>
        </div>
      </header>
      <div className="water-scroll">
        <h1>{tale.title}</h1>
        <p className="water-lead">{tale.lead}</p>
        {tale.sections.map((section) => (
          <article key={section.heading} className="water-card">
            <h2>{section.heading}</h2>
            {section.parts.map((part, index) =>
              part.kind === "h" ? <h3 key={index}>{part.text}</h3> : <p key={index}>{part.text}</p>,
            )}
          </article>
        ))}
        <button type="button" className="water-next" onClick={onNext}>
          {tale.next}
        </button>
      </div>
    </div>
  );
}
