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
    const holdLastFrame = () => {
      if (video.currentTime >= 9.8) video.pause();
    };
    video.addEventListener("timeupdate", holdLastFrame);
    void video.play().catch(() => { /* Keep the first frame when autoplay is unavailable. */ });
    return () => video.removeEventListener("timeupdate", holdLastFrame);
  }, []);

  return (
    <div className="relative h-dvh overflow-hidden bg-night text-moon">
      <video
        ref={videoRef}
        poster="/neidan/gate-first.jpg"
        src="/neidan/gate.mp4?v=38"
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

function Home({ lang, onLang, play, ownerReview = false }: { lang: Lang; onLang: (lang: Lang) => void; play: boolean; ownerReview?: boolean }) {
  const text = copy[lang];
  const [focus, setFocus] = useState<(typeof scrolls)[number]["id"] | null>(null);
  const [page, setPage] = useState<"water" | "fire" | "wood" | "earth" | "ether" | null>(null);
  // Never trust legacy localStorage demo/purchase flags.
  const owned = ownerReview;
  const order = ["water", "fire", "earth", "wood", "metal"] as const;
  const sub = {
    water: text.waterSub,
    fire: text.fireSub,
    earth: text.earthSub,
    wood: text.woodSub,
    metal: owned ? text.metalOpen : text.metalSub,
  };


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
                {play && page === null ? (
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
                {id === "metal" ? <span className="plaque-price">{owned ? text.bought : (lang === "ru" ? "🔒 Полный доступ" : "🔒 Full access")}</span> : null}
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

    </div>
  );
}

export function NeiDanShell({ ownerReview = false }: { ownerReview?: boolean } = {}) {
  const [entered, setEntered] = useState(false);
  const [lang, setLang] = useState<Lang>("ru");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("zorilad-lang");
      if (saved === "en" || saved === "ru") setLang(saved);
    } catch { /* Default language remains usable. */ }
  }, []);

  function choose(next: Lang) {
    setLang(next);
    try { window.localStorage.setItem("zorilad-lang", next); } catch { /* Session-only preference. */ }
  }

  return (
    <div className="relative h-dvh overflow-hidden bg-night">
      {entered ? (
        <Home lang={lang} onLang={choose} play ownerReview={ownerReview} />
      ) : (
        <Gate lang={lang} onLang={choose} onEnter={() => setEntered(true)} />
      )}
    </div>
  );
}
