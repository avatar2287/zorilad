import { useEffect, useRef, useState } from "react";
import { Prologue, WaterScreen } from "@/components/neidan/water";
import { FireScreen } from "@/components/neidan/fire";
import { WoodScreen } from "@/components/neidan/wood";
import { EarthScreen } from "@/components/neidan/earth";
import { EtherScreen } from "@/components/neidan/ether";

type Lang = "ru" | "en";

const copy = {
  ru: {
    welcome: "Добро пожаловать внутрь себя",
    enter: "Начать путь",
    close: "Свернуть",
    back: "Назад",
    water: "Вода",
    wood: "Дерево",
    fire: "Огонь",
    earth: "Земля",
    metal: "Эфир",
    waterSub: "Сфера Разума (Инь)",
    fireSub: "Первобытный Аффект (Ян)",
    earthSub: "Границы и Тело",
    woodSub: "Нейробиология",
    metalSub: "Интеграция • Полная ЦЕЛОСТНОСТЬ",
    metalOpen: "Интеграция • Полная ЦЕЛОСТНОСТЬ",
    access: "🔒 Полный доступ — $13.99",
    buy: "Открыть доступ",
    later: "Не сейчас",
    bought: "Доступ открыт",
    info: "Zorilad — это метафорическая модель самопознания и психологического синтеза на стыке архетипов и нейробиологии. Не является медицинским диагнозом или заменой психотерапии.",
    waterLine: "Глубина, которая держит, а не топит.",
    woodLine: "Рост без спешки. Мягкое сильнее ломкого.",
    fireLine: "Ясный жар. Не пожар и не пепел.",
    earthLine: "То, на чём можно стоять.",
    metalLine: "Граница. Чистота. Один ясный край.",
  },
  en: {
    welcome: "Welcome inside yourself",
    enter: "Start the path",
    close: "Close",
    back: "Back",
    water: "Water",
    wood: "Wood",
    fire: "Fire",
    earth: "Earth",
    metal: "Ether",
    waterSub: "Sphere of Mind (Yin)",
    fireSub: "Primal Affect (Yang)",
    earthSub: "Boundaries and Body",
    woodSub: "Neurobiology",
    metalSub: "Integration • Full WHOLENESS",
    metalOpen: "Integration • Full WHOLENESS",
    access: "🔒 Full access — $13.99",
    buy: "Unlock",
    later: "Not now",
    bought: "Access unlocked",
    info: "Zorilad is a metaphorical model of self-knowledge and psychological synthesis, between archetypes and neurobiology. It is not a medical diagnosis or a substitute for psychotherapy.",
    waterLine: "A depth that holds, and does not drown.",
    woodLine: "Growth without hurry. The soft outlasts the brittle.",
    fireLine: "A clear heat. Not a wildfire, and not ash.",
    earthLine: "Something you can stand on.",
    metalLine: "A boundary. Clarity. One clean edge.",
  },
} as const;

const scrolls = [
  { id: "water", image: "/neidan/water.jpg?v=5" },
  { id: "wood", image: "/neidan/wood.jpg?v=5" },
  { id: "fire", image: "/neidan/fire.jpg?v=5" },
  { id: "earth", image: "/neidan/earth.jpg?v=5" },
  { id: "metal", image: "/neidan/metal.jpg?v=5" },
] as const;

const places = {
  water: "arc-water",
  wood: "arc-wood",
  fire: "arc-fire",
  earth: "arc-earth",
  metal: "arc-metal",
} as const;

function LangToggle({ lang, onChange }: { lang: Lang; onChange: (lang: Lang) => void }) {
  return (
    <div className="absolute top-0 right-0 z-20 px-5 safe-top">
      <div className="lang-pill">
        {(["ru", "en"] as const).map((code) => (
          <button key={code} type="button" data-on={lang === code} onClick={() => onChange(code)}>
            {code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

function InfoMark({ lang }: { lang: Lang }) {
  const text = copy[lang];
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="info-btn safe-top" onClick={() => setOpen(true)} aria-label="?">
        ?
      </button>
      {open ? (
        <div className="sheet" role="dialog">
          <button type="button" className="sheet-scrim" aria-label={text.back} onClick={() => setOpen(false)} />
          <div className="sheet-card">
            <p className="text-sm leading-relaxed text-paper">{text.info}</p>
            <button type="button" className="sheet-ok" onClick={() => setOpen(false)}>
              {text.back}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Gate({
  lang,
  onLang,
  onEnter,
}: {
  lang: Lang;
  onLang: (lang: Lang) => void;
  onEnter: () => void;
}) {
  const text = copy[lang];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const stop = () => {
      if (video.currentTime >= 9.8) video.pause();
    };
    video.playbackRate = 1;
    video.addEventListener("timeupdate", stop);
    void video.play();
    return () => video.removeEventListener("timeupdate", stop);
  }, []);

  return (
    <div className="relative h-dvh overflow-hidden bg-night text-moon">
      <img src="/neidan/gate.jpg?v=35" alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      <video
        ref={videoRef}
        src="/neidan/gate.mp4?v=38"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="gate-fade pointer-events-none absolute inset-x-0 bottom-0" />
      <div className="flow-ice" />
      <div className="flow-fire" />
      <div className="impact-fog" />
      <InfoMark lang={lang} />
      <LangToggle lang={lang} onChange={onLang} />
      <h1 className="pointer-events-none absolute top-[4%] left-1/2 z-20 w-full -translate-x-1/2 text-center">
        <span className="zorilad-wrap">
          <span className="zorilad inline-block text-5xl">ZORILAD</span>
        </span>
      </h1>
      <div className="gate-dock absolute inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md px-6 pt-16 pb-10 safe-bottom">
        <p className="glow-text mb-4 text-center font-display text-xl leading-snug tracking-wide text-paper">
          {text.welcome}
        </p>
        <button type="button" onClick={onEnter} className="enter-btn">
          {text.enter}
        </button>
      </div>
    </div>
  );
}

function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random(),
    }));
    let frame = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = (moving: boolean) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const ratio = window.devicePixelRatio || 1;
      if (canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
      }
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      for (const star of stars) {
        const prev = star.z + 0.018;
        if (moving) star.z -= 0.007;
        if (star.z <= 0.04) {
          star.x = Math.random() * 2 - 1;
          star.y = Math.random() * 2 - 1;
          star.z = 1;
        }
        const project = (z: number) => {
          const depth = 0.16 / z;
          return [cx + star.x * depth * width, cy + star.y * depth * height] as const;
        };
        const [px, py] = project(star.z);
        const [ox, oy] = project(Math.min(1, prev));
        const alpha = 0.2 + (1 - star.z) * 0.75;
        ctx.strokeStyle = `rgba(214, 224, 240, ${alpha})`;
        ctx.lineWidth = Math.max(0.6, (1 - star.z) * 1.8);
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    };

    paint(false);
    if (reduce) return;
    const loop = () => {
      paint(true);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />;
}

function Rift({ id }: { id: (typeof scrolls)[number]["id"] }) {
  const common = { fill: "none", strokeLinecap: "round" as const, strokeWidth: 1.4 };
  if (id === "water") {
    return (
      <svg viewBox="0 0 40 96" className="rift-svg rift-water">
        <path {...common} d="M6 28c8 4 14-6 26 0" />
        <path {...common} d="M4 46c10 8 14-8 30 2" />
        <path {...common} d="M8 66c8-6 16 10 24-2" />
      </svg>
    );
  }
  if (id === "wood") {
    return (
      <svg viewBox="0 0 40 96" className="rift-svg rift-wood">
        <path {...common} d="M20 86V18" />
        <path {...common} d="M20 40c-8-2-12-10-14-16" />
        <path {...common} d="M20 48c8-1 12-8 14-14" />
        <path {...common} d="M20 62c-6 0-10-6-12-10" />
      </svg>
    );
  }
  if (id === "fire") {
    return (
      <svg viewBox="0 0 40 96" className="rift-svg rift-fire">
        <path {...common} d="M20 10c2 16-6 20 0 34s-2 18 0 42" />
        <path {...common} d="M14 40c4 6 8 4 10 12" />
        <path {...common} d="M26 48c-4 6-6 8-4 16" />
      </svg>
    );
  }
  if (id === "earth") {
    return (
      <svg viewBox="0 0 40 96" className="rift-svg rift-earth">
        <path {...common} d="M20 16l8 14-8 8-8-8z" />
        <path {...common} d="M12 48l8 10 8-10-8-6z" />
        <path {...common} d="M20 58v22" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 96" className="rift-svg rift-metal">
      <path {...common} d="M12 14v68" />
      <path {...common} d="M20 10v76" />
      <path {...common} d="M28 18v60" />
    </svg>
  );
}

function Home({ lang, onLang, play }: { lang: Lang; onLang: (lang: Lang) => void; play: boolean }) {
  const text = copy[lang];
  const [focus, setFocus] = useState<(typeof scrolls)[number]["id"] | null>(null);
  const [page, setPage] = useState<"water" | "fire" | "wood" | "earth" | "ether" | null>(null);
  const [owned, setOwned] = useState(false);
  const [pay, setPay] = useState(false);
  const order = ["water", "fire", "earth", "wood", "metal"] as const;
  const sub = {
    water: text.waterSub,
    fire: text.fireSub,
    earth: text.earthSub,
    wood: text.woodSub,
    metal: owned ? text.metalOpen : text.metalSub,
  };

  useEffect(() => {
    setOwned(window.localStorage.getItem("zorilad-ether") === "1");
  }, []);

  return (
    <div className={`relative h-dvh overflow-hidden bg-[#05070b] text-moon ${focus ? "is-choosing" : ""}`}>
      <Prologue lang={lang} onLang={onLang} />
      <LangToggle lang={lang} onChange={onLang} />
      <div className="five">
        {order.map((id) => {
          const scroll = scrolls.find((item) => item.id === id)!;
          const chosen = focus === id;
          return (
            <button
              key={id}
              type="button"
              data-element={id}
              onClick={() => {
                if (id === "water") {
                  setPage("water");
                  return;
                }
                if (id === "fire") {
                  setPage("fire");
                  return;
                }
                if (id === "wood") {
                  setPage("wood");
                  return;
                }
                if (id === "earth") {
                  setPage("earth");
                  return;
                }
                if (id === "metal") {
                  setPage("ether");
                  return;
                }
                if (!focus) setFocus(id);
              }}
              className={`cell cell-${id} ${chosen ? "is-focus" : ""}`}
            >
              <span className={`cell-live live-${id}`}>
                <img src={scroll.image} alt="" />
                {play ? (
                  <video
                    src={`/neidan/${id}-loop.mp4?v=3`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onPlaying={(event) => event.currentTarget.classList.add("is-on")}
                  />
                ) : null}
              </span>
              <span className={`cell-sheen sheen-${id}`} />
              <span className={`cell-veil veil-${id}`} />
              <span className={`plaque plaque-${id}`}>
                <span className="plaque-title">{text[id]}</span>
                <span className="plaque-sub">{sub[id]}</span>
                {id === "metal" ? <span className="plaque-price">{text.access}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
      {page === "water" ? (
        <WaterScreen lang={lang} onLang={onLang} onClose={() => setPage(null)} onNext={() => setPage("fire")} />
      ) : null}
      {page === "fire" ? (
        <FireScreen
          lang={lang}
          onLang={onLang}
          onClose={() => setPage(null)}
          onPrev={() => setPage("water")}
          onNext={() => setPage("wood")}
        />
      ) : null}
      {page === "wood" ? (
        <WoodScreen
          lang={lang}
          onLang={onLang}
          onClose={() => setPage(null)}
          onPrev={() => setPage("fire")}
          onNext={() => setPage("earth")}
        />
      ) : null}
      {page === "earth" ? (
        <EarthScreen
          lang={lang}
          onLang={onLang}
          onClose={() => setPage(null)}
          onPrev={() => setPage("wood")}
          onCenter={() => setPage("ether")}
        />
      ) : null}
      {page === "ether" ? (
        <EtherScreen
          lang={lang}
          onLang={onLang}
          owned={owned}
          onUnlock={() => {
            window.localStorage.setItem("zorilad-ether", "1");
            setOwned(true);
          }}
          onClose={() => setPage(null)}
        />
      ) : null}
      {focus && focus !== "water" ? (
        <div className={`glass glass-${focus}`}>
          <h2 className="font-display text-3xl leading-none">{text[focus]}</h2>
          <p className="mt-3 text-sm leading-relaxed text-paper/90">
            {
              {
                water: text.waterLine,
                wood: text.woodLine,
                fire: text.fireLine,
                earth: text.earthLine,
                metal: text.metalLine,
              }[focus]
            }
          </p>
          <button type="button" className="glass-back" onClick={() => setFocus(null)}>
            {text.back}
          </button>
        </div>
      ) : null}
      {pay ? (
        <div className="sheet" role="dialog">
          <button type="button" className="sheet-scrim" aria-label={text.later} onClick={() => setPay(false)} />
          <div className="sheet-card">
            <h2 className="font-display text-2xl leading-none">{text.metal}</h2>
            <p className="mt-3 text-sm leading-relaxed text-paper">{text.access}</p>
            <button
              type="button"
              className="sheet-ok"
              onClick={() => {
                window.localStorage.setItem("zorilad-ether", "1");
                setOwned(true);
                setPay(false);
              }}
            >
              {text.buy}
            </button>
            <button type="button" className="glass-back mt-3" onClick={() => setPay(false)}>
              {text.later}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ScrollView({ id, lang, onClose }: { id: string; lang: Lang; onClose: () => void }) {
  const scroll = scrolls.find((item) => item.id === id) ?? scrolls[0];
  const text = copy[lang];
  return (
    <div className="unfurl fixed inset-0 z-30 overflow-hidden bg-night text-paper">
      <img src={scroll.image} alt="" className="scroll-bg absolute inset-0 h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/80 via-night/15 to-transparent" />
      <div className="relative z-10 mx-auto flex h-dvh max-w-md flex-col px-6 safe-top safe-bottom">
        <button type="button" onClick={onClose} className="mt-2 self-start text-sm text-moon">
          {text.close}
        </button>
        <div className="mt-auto pb-10">
          <h2 className="font-display text-6xl leading-none">{text[scroll.id]}</h2>
        </div>
      </div>
    </div>
  );
}

export function NeiDanShell() {
  const [entered, setEntered] = useState(false);
  const [lang, setLang] = useState<Lang>("ru");

  useEffect(() => {
    const saved = window.localStorage.getItem("zorilad-lang");
    if (saved === "en" || saved === "ru") setLang(saved);
  }, []);

  function choose(next: Lang) {
    setLang(next);
    window.localStorage.setItem("zorilad-lang", next);
  }

  return (
    <div className="relative h-dvh overflow-hidden bg-night">
      {entered ? (
        <Home lang={lang} onLang={choose} play />
      ) : (
        <Gate lang={lang} onLang={choose} onEnter={() => setEntered(true)} />
      )}
    </div>
  );
}
