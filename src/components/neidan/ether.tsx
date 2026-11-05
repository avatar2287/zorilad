import { useEffect, useRef, useState } from "react";
import type { LoreLang } from "@/components/neidan/lore";
import { LangPill } from "@/components/neidan/water";
import { alchemy, etherChrome, hood, shopBody } from "@/components/neidan/ether-lore";
import { hands } from "@/components/neidan/hands";

type Tone = { fadeIn: () => void; fadeDown: () => void; stop: () => void };

function openTone(): Tone {
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx();
  const master = ctx.createGain();
  master.gain.value = 0;
  const warm = ctx.createBiquadFilter();
  warm.type = "lowpass";
  warm.frequency.value = 900;
  warm.connect(master);
  master.connect(ctx.destination);

  const low = ctx.createOscillator();
  low.type = "sine";
  low.frequency.value = 136.1;
  const lowGain = ctx.createGain();
  lowGain.gain.value = 0.22;
  const high = ctx.createOscillator();
  high.type = "sine";
  high.frequency.value = 204;
  const highGain = ctx.createGain();
  highGain.gain.value = 0.1;
  low.connect(lowGain);
  high.connect(highGain);
  lowGain.connect(warm);
  highGain.connect(warm);

  const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let brown = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    brown = (brown + 0.02 * white) * 0.996;
    data[i] = brown * 2;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  const hush = ctx.createBiquadFilter();
  hush.type = "lowpass";
  hush.frequency.value = 420;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.08;
  noise.connect(hush);
  hush.connect(noiseGain);
  noiseGain.connect(warm);

  low.start();
  high.start();
  noise.start();

  const fadeIn = () => {
    void ctx.resume();
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0.18, now + 2);
  };
  const fadeDown = () => {
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
    master.gain.linearRampToValueAtTime(0, now + 1.2);
  };
  const stop = () => {
    fadeDown();
    window.setTimeout(() => {
      try {
        low.stop();
        high.stop();
        noise.stop();
        void ctx.close();
      } catch {
        /* already closed */
      }
    }, 1400);
  };
  return { fadeIn, fadeDown, stop };
}

function Crystal() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let id = 0;
    const dust = Array.from({ length: 40 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 0.15 + Math.random() * 0.75,
      s: 0.002 + Math.random() * 0.004,
      gold: Math.random(),
    }));
    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5;
      const cy = h * 0.28;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(frame * 0.004);
      ctx.strokeStyle = "rgba(220, 206, 160, 0.75)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const ang = (Math.PI * 2 * i) / 6;
        const x = Math.cos(ang) * 54;
        const y = Math.sin(ang) * 78;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -78);
      ctx.lineTo(0, 78);
      ctx.moveTo(-54, 0);
      ctx.lineTo(54, 0);
      ctx.strokeStyle = "rgba(170, 196, 255, 0.45)";
      ctx.stroke();
      ctx.restore();
      for (const mote of dust) {
        mote.a += mote.s;
        const x = cx + Math.cos(mote.a) * mote.r * w * 0.45;
        const y = cy + Math.sin(mote.a * 0.8) * mote.r * h * 0.22;
        ctx.fillStyle = mote.gold > 0.66 ? "rgba(228, 196, 120, 0.7)" : mote.gold > 0.33 ? "rgba(186, 206, 255, 0.55)" : "rgba(220, 226, 236, 0.45)";
        ctx.beginPath();
        ctx.arc(x, y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
      frame += 1;
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, []);
  return <canvas ref={ref} className="ether-crystal" aria-hidden />;
}

function Hands({ lang }: { lang: LoreLang }) {
  const copy = hands[lang];
  return (
    <>
      <article className="ether-card">
        <h2>{lang === "ru" ? "Введение" : "Introduction"}</h2>
        <p>{copy.intro}</p>
        <h3>{copy.whyTitle}</h3>
        {copy.why.map((line) => (
          <p key={line}>• {line}</p>
        ))}
      </article>
      <p className="ether-kicker">{copy.catalog}</p>
      {copy.seals.map((seal) => (
        <article key={seal.id} className="ether-card">
          <img className="seal-photo" src={`/neidan/seal-${seal.id}.jpg`} alt="" />
          <h2>{seal.title}</h2>
          <h3>{seal.purposeLabel}</h3>
          <p>{seal.purpose}</p>
          <h3>{seal.foldLabel}</h3>
          <p>{seal.fold}</p>
          <h3>{seal.effectLabel}</h3>
          <p>{seal.effect}</p>
          {seal.pair ? (
            <>
              <h3>{seal.pairLabel}</h3>
              <p>{seal.pair}</p>
            </>
          ) : null}
        </article>
      ))}
      <p className="ether-kicker">{copy.library}</p>
      {copy.practices.map((item) => (
        <article key={item.title} className="ether-card">
          <h2>{item.title}</h2>
          {item.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </article>
      ))}
    </>
  );
}

export function EtherScreen({
  lang,
  onLang,
  owned,
  onUnlock,
  onClose,
}: {
  lang: LoreLang;
  onLang: (lang: LoreLang) => void;
  owned: boolean;
  onUnlock: () => void;
  onClose: () => void;
}) {
  const text = etherChrome[lang];
  const tone = useRef<Tone | null>(null);
  const [on, setOn] = useState(true);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    try {
      const bed = openTone();
      bed.fadeIn();
      tone.current = bed;
      return () => bed.stop();
    } catch {
      return undefined;
    }
  }, []);

  function toggle() {
    const bed = tone.current;
    if (!bed) return;
    if (on) {
      bed.fadeDown();
      setOn(false);
    } else {
      bed.fadeIn();
      setOn(true);
    }
  }

  const blocks = tab === 0 ? hood[lang] : alchemy[lang];

  return (
    <div className="ether-screen">
      <div className="ether-sky" aria-hidden>
        <div className="ether-ring ether-ring-a" />
        <div className="ether-ring ether-ring-b" />
        <Crystal />
      </div>
      <header className="water-bar">
        <button type="button" className="water-back" onClick={onClose}>
          {lang === "ru" ? "← Назад к стихиям" : "← Back to Elements"}
        </button>
        <div className="bar-tools">
          <LangPill lang={lang} onChange={onLang} />
          <button type="button" className="water-sound" onClick={toggle} aria-pressed={on}>
            {on ? text.soundOn : text.soundOff}
          </button>
        </div>
      </header>
      <div className="water-scroll">
        {owned ? (
          <>
            <div className="ether-tabs">
              {text.tabs.map((label, index) => (
                <button key={label} type="button" data-on={tab === index} onClick={() => setTab(index)}>
                  {label}
                </button>
              ))}
            </div>
            {tab < 2
              ? blocks.map((block) => (
                  <article key={block.heading} className="ether-card">
                    <h2>{block.heading}</h2>
                    {block.parts.map((part, index) =>
                      part.kind === "h" ? <h3 key={index}>{part.text}</h3> : <p key={index}>{part.text}</p>,
                    )}
                  </article>
                ))
              : <Hands lang={lang} />}
          </>
        ) : (
          <article className="ether-card ether-shop">
            <h1>{text.shopTitle}</h1>
            <p className="water-lead ether-lead">{text.shopLead}</p>
            <p>{shopBody[lang][0]}</p>
            {shopBody[lang].slice(1).map((line, index) => (
              <p key={line} className={`shop-point shop-point-${index}`}>
                {line}
              </p>
            ))}
            <button type="button" className="ether-buy" onClick={onUnlock}>
              {text.buy}
            </button>
          </article>
        )}
      </div>
    </div>
  );
}
