import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  CircleUser,
  Droplets,
  Eye,
  Feather,
  Flower2,
  Hand,
  Layers,
  Lock,
  Moon,
  Mountain,
  NotebookPen,
  Unlock,
  Users,
  Volume2,
  VolumeX,
  type LucideIcon,
} from "lucide-react";
import {
  artFor,
  atlas,
  atlasGroups,
  currentScroll,
  isUnlocked,
  kaiCards,
  scrollById,
  scrolls,
  type AtlasItem,
} from "@/lib/aurlis/content";
import { useAurlis, type Tab, type View } from "@/lib/aurlis/store";

const press = "transition-transform duration-150 ease-out active:not-disabled:scale-[0.96]";
const goldBtn = `${press} flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gold text-base font-semibold text-ink disabled:opacity-60`;

function useHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const finish = () => setReady(true);
    if (useAurlis.persist.hasHydrated()) finish();
    return useAurlis.persist.onFinishHydration(finish);
  }, []);
  return ready;
}

function formatWhen(at: number) {
  return new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(at);
}

function formatClock(total: number) {
  const safe = Math.max(0, total);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function playChime(ctx: AudioContext) {
  const tone = (frequency: number, when: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(0.045, when + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + 1.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(when);
    osc.stop(when + 1.7);
  };
  tone(392, ctx.currentTime);
  tone(523.25, ctx.currentTime + 0.16);
}

function Sigil({ className = "h-24 w-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M78 62a20 20 0 1 1-12-24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M60 16v88" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="60" cy="14" r="3" fill="currentColor" />
    </svg>
  );
}

function Back({ onClick, light = false }: { onClick: () => void; light?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${press} inline-flex h-11 items-center gap-1 text-sm ${light ? "text-mist" : "text-bronze"}`}
    >
      <ChevronLeft className="h-5 w-5" aria-hidden />
      Назад
    </button>
  );
}

function Gate({ onEnter, ready }: { onEnter: () => void; ready: boolean }) {
  return (
    <div className="relative min-h-dvh">
      <img src="/aurlis/home.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-night/45 via-night/35 to-night/80" />
      <div className="relative mx-auto flex min-h-dvh max-w-md flex-col items-center px-6 safe-top safe-bottom">
        <div className="mt-16 text-gold">
          <Sigil />
        </div>
        <h1 className="mt-6 font-display text-5xl tracking-widest text-parchment">AURLIS</h1>
        <p className="mt-2 text-sm tracking-widest text-mist">путь к себе</p>
        <p className="mt-auto max-w-xs text-center font-display text-2xl leading-snug text-parchment">
          Не стать идеальным.
          <br />
          Стать целым.
        </p>
        <button type="button" className={`${goldBtn} mt-8`} disabled={!ready} onClick={onEnter}>
          Начать путь
        </button>
        <div className="h-6" />
      </div>
    </div>
  );
}

function Home() {
  const completed = useAurlis((state) => state.completed);
  const setView = useAurlis((state) => state.setView);
  const setTab = useAurlis((state) => state.setTab);
  const current = currentScroll(completed);
  const side: { label: string; icon: LucideIcon; go: () => void }[] = [
    { label: "Путь", icon: Mountain, go: () => setView({ kind: "map" }) },
    { label: "Практики", icon: BookOpen, go: () => setTab("arsenal") },
    { label: "Дневник", icon: NotebookPen, go: () => setView({ kind: "journal" }) },
    { label: "Боксовые", icon: Hand, go: () => setView({ kind: "body" }) },
    { label: "Сообщество", icon: Users, go: () => setView({ kind: "letter" }) },
  ];

  return (
    <div className="relative min-h-full">
      <img src="/aurlis/home.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-night/20 via-night/10 to-night/80" />
      <div className="relative flex min-h-full flex-col safe-top">
        <h1 className="pt-4 text-center font-display text-4xl tracking-widest text-parchment">AURLIS</h1>
        <div className="relative mt-2 min-h-72 flex-1">
          <div className="absolute top-2 left-3 z-10 flex flex-col gap-3">
            {side.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} type="button" onClick={item.go} className={`${press} flex w-14 flex-col items-center gap-1`}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/90 text-ink">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-center text-xs leading-none text-parchment">{item.label}</span>
                </button>
              );
            })}
          </div>
          <img
            src="/aurlis/sphere.jpg"
            alt=""
            className="breathe absolute top-6 right-2 h-52 w-52 rounded-full object-cover ring-1 ring-gold/50"
          />
        </div>
        <div className="px-4 pb-3">
          <button
            type="button"
            onClick={() => setView({ kind: "scroll", id: current.id })}
            className={`${press} flex w-full items-center gap-3 rounded-3xl border border-gold/40 bg-night/55 p-3 text-left backdrop-blur-sm`}
          >
            <img src={artFor(current)} alt="" className="h-16 w-16 rounded-2xl object-cover" />
            <span className="min-w-0">
              <span className="block text-xs text-mist">Текущий свиток</span>
              <span className="block truncate font-display text-2xl leading-tight text-parchment">
                {current.no}. {current.name}
              </span>
              <span className="block text-sm text-mist">{current.epithet}</span>
            </span>
          </button>
          <button type="button" className={`${goldBtn} mt-3`} onClick={() => setView({ kind: "scroll", id: current.id })}>
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
}

function MapScreen() {
  const completed = useAurlis((state) => state.completed);
  const setView = useAurlis((state) => state.setView);
  const done = completed.length;

  return (
    <div className="min-h-full bg-cream text-ink">
      <div className="relative h-36 overflow-hidden">
        <img src="/aurlis/kai-mountain.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream to-transparent" />
      </div>
      <div className="px-5 pb-8">
        <button type="button" onClick={() => setView({ kind: "tabs" })} className={`${press} -ml-2 text-sm text-bronze`}>
          К ядру
        </button>
        <h1 className="mt-2 font-display text-4xl">Карта пути</h1>
        <p className="mt-1 text-sm text-bronze">
          {scrolls.length} свитков · целостность · пройдено {done}
        </p>
        <ol className="relative mt-6">
          <div className="absolute top-3 bottom-3 left-4 w-px bg-line" aria-hidden />
          {scrolls.map((scroll) => {
            const open = isUnlocked(scroll.id, completed);
            const finished = completed.includes(scroll.id);
            return (
              <li key={scroll.id}>
                <button
                  type="button"
                  disabled={!open}
                  onClick={() => setView({ kind: "scroll", id: scroll.id })}
                  className={`${press} flex w-full items-center gap-4 py-3 text-left disabled:opacity-70`}
                >
                  <span
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                      finished ? "border-gold-deep bg-gold text-ink" : open ? "border-gold bg-cream-2 text-gold-deep" : "border-line bg-cream-2 text-bronze"
                    }`}
                  >
                    {finished ? scroll.no : open ? scroll.no : <Lock className="h-3.5 w-3.5" aria-hidden />}
                  </span>
                  <span>
                    <span className="block font-display text-2xl leading-tight">{scroll.stage}</span>
                    <span className="block text-sm text-bronze">
                      {scroll.name} · {open ? scroll.epithet : "откроется после предыдущего"}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function ScrollScreen({ id }: { id: string }) {
  const scroll = scrollById(id);
  const completed = useAurlis((state) => state.completed);
  const completeScroll = useAurlis((state) => state.completeScroll);
  const setView = useAurlis((state) => state.setView);
  const [pane, setPane] = useState<"history" | "archetype" | "practice">("history");
  const open = isUnlocked(scroll.id, completed);
  const text = pane === "history" ? scroll.history : pane === "archetype" ? scroll.archetype : scroll.practice;

  if (!open) {
    return (
      <div className="min-h-full bg-cream px-5 pt-4 text-ink">
        <Back onClick={() => setView({ kind: "map" })} />
        <p className="mt-8 text-sm text-bronze">Этот свиток ещё закрыт.</p>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-night text-parchment">
      <div className="relative h-64">
        <img src={artFor(scroll)} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-night/30" />
        <div className="absolute top-2 left-3">
          <Back light onClick={() => setView({ kind: "map" })} />
        </div>
        <div className="absolute right-0 bottom-4 left-0 px-5">
          <p className="text-sm text-mist">Свиток {scroll.no}</p>
          <h1 className="font-display text-5xl leading-none">{scroll.name}</h1>
          <p className="mt-1 text-sm text-gold">{scroll.epithet}</p>
        </div>
      </div>
      <div className="px-5 pb-8">
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              ["history", "История"],
              ["archetype", "Архетип"],
              ["practice", "Практика"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setPane(key)}
              className={`${press} h-11 rounded-full text-sm ${pane === key ? "bg-cream text-ink" : "bg-ink text-mist"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          {text.map((paragraph) => (
            <p key={paragraph.slice(0, 28)} className="font-display text-xl leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        {pane === "practice" ? (
          <button type="button" className={`${press} mt-6 text-sm text-gold`} onClick={() => setView({ kind: "seal", id: scroll.id })}>
            Открыть печать
          </button>
        ) : null}
        <button
          type="button"
          className={`${goldBtn} mt-8`}
          onClick={() => {
            completeScroll(scroll.id, `${scroll.no}. ${scroll.name}`);
            setView({ kind: "map" });
          }}
        >
          Дальше
        </button>
      </div>
    </div>
  );
}

const sealModes = [
  {
    id: "body",
    label: "Тело",
    text: "Почувствуй стопы и вес. Напряжение — весть, не враг. На выдохе отпусти одно место: челюсть или плечи.",
  },
  {
    id: "sound",
    label: "Звук",
    text: "Услышь комнату. Дальний звук, потом собственный выдох. Между ними ничего не добавляй.",
  },
  {
    id: "breath",
    label: "Дыхание",
    text: "Вдох обычный. Выдох чуть длиннее, без усилия. Живот может опуститься сам.",
  },
  {
    id: "sight",
    label: "Визуал",
    text: "Смотри на кольцо света мягкими глазами. Не ищи картину внутри лба. Свет уже в комнате.",
  },
] as const;

function SealScreen({ id }: { id: string }) {
  const scroll = scrollById(id);
  const setView = useAurlis((state) => state.setView);
  const sound = useAurlis((state) => state.sound);
  const setSound = useAurlis((state) => state.setSound);
  const addTrace = useAurlis((state) => state.addTrace);
  const [mode, setMode] = useState<(typeof sealModes)[number]["id"]>("breath");
  const [seconds, setSeconds] = useState(60);
  const [left, setLeft] = useState(60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const endAt = useRef<number | null>(null);
  const audio = useRef<AudioContext | null>(null);
  const chimed = useRef(false);
  const line = sealModes.find((item) => item.id === mode) ?? sealModes[2];

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      const end = endAt.current;
      if (!end) return;
      const next = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setLeft(next);
      if (next <= 0) {
        setRunning(false);
        setDone(true);
      }
    }, 200);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (!done || chimed.current || !sound || !audio.current) return;
    chimed.current = true;
    playChime(audio.current);
  }, [done, sound]);

  function begin(total = left) {
    if (sound) {
      if (!audio.current) audio.current = new AudioContext();
      void audio.current.resume();
    }
    chimed.current = false;
    setDone(false);
    setLeft(total);
    endAt.current = Date.now() + total * 1000;
    setRunning(true);
    addTrace(`Печать · ${scroll.name}`);
  }

  return (
    <div className="relative min-h-full bg-night">
      <img src="/aurlis/seal.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/75 to-night" />
      <div className="relative flex min-h-full flex-col px-5 pt-3 pb-8 safe-top">
        <div className="flex items-center justify-between">
          <Back light onClick={() => setView({ kind: "scroll", id: scroll.id })} />
          <button
            type="button"
            aria-label={sound ? "Выключить звук" : "Включить звук"}
            onClick={() => setSound(!sound)}
            className={`${press} flex h-11 w-11 items-center justify-center text-mist`}
          >
            {sound ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-mist">Печать</p>
        <h1 className="text-center font-display text-4xl">{scroll.name}</h1>
        <p className="text-center text-sm text-gold">{scroll.epithet}</p>
        <div className="mt-5 grid grid-cols-4 gap-2">
          {sealModes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              className={`${press} h-10 rounded-full text-xs ${mode === item.id ? "bg-cream text-ink" : "bg-ink/80 text-mist"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-xs text-center font-display text-xl leading-relaxed">{line.text}</p>
        <p className="mt-6 text-center font-display text-6xl tabular-nums">{formatClock(left)}</p>
        {!running && !done ? (
          <div className="mt-4 flex justify-center gap-2">
            {[60, 180].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setSeconds(value);
                  setLeft(value);
                  setDone(false);
                }}
                className={`${press} h-11 rounded-full px-4 text-sm ${seconds === value ? "bg-parchment text-ink" : "bg-ink text-mist"}`}
              >
                {value / 60} мин
              </button>
            ))}
          </div>
        ) : null}
        <button type="button" className={`${goldBtn} mt-auto`} onClick={() => (running ? setRunning(false) : begin())}>
          {done ? "Ещё раз" : running ? "Пауза" : "Начать"}
        </button>
      </div>
    </div>
  );
}

function KaiHome() {
  const setView = useAurlis((state) => state.setView);
  return (
    <div className="relative min-h-full bg-cream text-ink">
      <img src="/aurlis/kai-path.jpg" alt="" className="absolute inset-0 h-56 w-full object-cover" />
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-cream/20 to-cream" />
      <div className="relative px-4 pt-8 safe-top">
        <h1 className="text-center font-display text-5xl tracking-widest">Кай</h1>
        <p className="text-center text-sm text-bronze">Быстрый контур возвращения</p>
        <ul className="mt-6 space-y-3 pb-6">
          {kaiCards.map((card) => (
            <li key={card.id}>
              <button
                type="button"
                onClick={() => setView({ kind: "kai", id: card.id })}
                className={`${press} flex w-full items-center gap-4 rounded-3xl border border-line bg-cream-2 p-3 text-left`}
              >
                <img src={card.image} alt="" className="h-20 w-24 rounded-2xl object-cover" />
                <span>
                  <span className="block font-display text-3xl leading-none">{card.title}</span>
                  <span className="mt-2 block text-sm leading-snug text-bronze">
                    {card.lines[0]}
                    <br />
                    {card.lines[1]}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function KaiFocus({ id }: { id: string }) {
  const card = kaiCards.find((item) => item.id === id) ?? kaiCards[0];
  const setView = useAurlis((state) => state.setView);
  const addTrace = useAurlis((state) => state.addTrace);
  const sound = useAurlis((state) => state.sound);
  const [left, setLeft] = useState(60);
  const [running, setRunning] = useState(false);
  const endAt = useRef<number | null>(null);
  const audio = useRef<AudioContext | null>(null);
  const noted = useRef(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      const end = endAt.current;
      if (!end) return;
      const next = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setLeft(next);
      if (next <= 0) {
        setRunning(false);
        if (sound && audio.current) playChime(audio.current);
      }
    }, 200);
    return () => window.clearInterval(timer);
  }, [running, sound]);

  return (
    <div className="min-h-full bg-cream text-ink">
      <div className="relative h-52">
        <img src={card.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream to-transparent" />
        <div className="absolute top-2 left-3">
          <Back onClick={() => setView({ kind: "tabs" })} />
        </div>
      </div>
      <div className="px-5 pb-8">
        <h1 className="font-display text-5xl">{card.title}</h1>
        <p className="mt-2 font-display text-2xl text-bronze">
          {card.lines[0]} {card.lines[1]}
        </p>
        <ol className="mt-6 space-y-4">
          {card.steps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="font-display text-2xl text-gold-deep">{index + 1}</span>
              <span className="pt-1 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center font-display text-5xl tabular-nums">{formatClock(left)}</p>
        <button
          type="button"
          className={`${goldBtn} mt-4`}
          onClick={() => {
            if (running) {
              setRunning(false);
              return;
            }
            if (!noted.current) {
              noted.current = true;
              addTrace(`Кай · ${card.title}`);
            }
            if (sound) {
              if (!audio.current) audio.current = new AudioContext();
              void audio.current.resume();
            }
            const total = left > 0 ? left : 60;
            setLeft(total);
            endAt.current = Date.now() + total * 1000;
            setRunning(true);
          }}
        >
          {running ? "Пауза" : left === 0 ? "Ещё минута" : "Минута здесь"}
        </button>
      </div>
    </div>
  );
}

const keyIcons: Record<string, LucideIcon> = {
  shadow: Moon,
  clarity: Eye,
  hold: Mountain,
  honest: Feather,
  free: Unlock,
  parts: Layers,
  "seal-body": Hand,
  "seal-voice": Droplets,
  "seal-light": Flower2,
  "state-tight": Lock,
  "state-fog": Eye,
  "state-raw": Flower2,
};

function ArsenalHome() {
  const [group, setGroup] = useState<AtlasItem["group"]>("keys");
  const completed = useAurlis((state) => state.completed);
  const setView = useAurlis((state) => state.setView);
  const items = atlas.filter((item) => item.group === group);

  return (
    <div className="min-h-full bg-cream px-5 pt-6 pb-6 text-ink safe-top">
      <h1 className="text-center font-display text-5xl">Арсенал</h1>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {atlasGroups.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setGroup(item.id)}
            className={`${press} h-11 rounded-full text-sm ${group === item.id ? "bg-ink text-cream" : "bg-cream-2 text-bronze"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid grid-cols-3 gap-4">
        {items.map((item) => {
          const needsScroll = scrolls[item.needs];
          const locked = item.needs > 0 && !(needsScroll && completed.includes(needsScroll.id));
          const Icon = locked ? Lock : (keyIcons[item.id] ?? Flower2);
          return (
            <li key={item.id}>
              <button
                type="button"
                disabled={locked}
                onClick={() => setView({ kind: "key", id: item.id })}
                className={`${press} flex w-full flex-col items-center gap-2 text-center disabled:opacity-50`}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-night text-gold">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="text-xs leading-tight">{item.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function KeyScreen({ id }: { id: string }) {
  const item = atlas.find((entry) => entry.id === id) ?? atlas[0];
  const setView = useAurlis((state) => state.setView);
  const addTrace = useAurlis((state) => state.addTrace);
  return (
    <div className="min-h-full bg-cream px-5 pt-3 pb-10 text-ink">
      <Back onClick={() => setView({ kind: "tabs" })} />
      <p className="mt-4 text-sm text-bronze">{item.epithet}</p>
      <h1 className="mt-1 font-display text-5xl leading-none">{item.title}</h1>
      <p className="mt-6 font-display text-xl leading-relaxed">{item.body}</p>
      <button
        type="button"
        className={`${goldBtn} mt-10`}
        onClick={() => {
          addTrace(item.title);
          setView({ kind: "kai", id: "ground" });
        }}
      >
        Минута опоры
      </button>
    </div>
  );
}

function JournalScreen() {
  const journal = useAurlis((state) => state.journal);
  const addJournal = useAurlis((state) => state.addJournal);
  const setView = useAurlis((state) => state.setView);
  const [text, setText] = useState("");

  return (
    <div className="min-h-full bg-cream px-5 pt-3 pb-8 text-ink">
      <Back onClick={() => setView({ kind: "tabs" })} />
      <h1 className="mt-3 font-display text-5xl">Дневник</h1>
      <p className="mt-2 text-sm text-bronze">Одна честная строка лучше длинного отчёта.</p>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={4}
        placeholder="На самом деле сейчас…"
        className="mt-4 w-full resize-none rounded-3xl border border-line bg-cream-2 px-4 py-3 text-base text-ink outline-none"
      />
      <button
        type="button"
        className={`${goldBtn} mt-3`}
        disabled={!text.trim()}
        onClick={() => {
          addJournal(text.trim());
          setText("");
        }}
      >
        Оставить
      </button>
      <ul className="mt-6 space-y-3">
        {journal.length === 0 ? <li className="text-sm text-bronze">Пока пусто. Это тоже место.</li> : null}
        {journal.map((note) => (
          <li key={note.id} className="rounded-3xl border border-line bg-cream-2 px-4 py-3">
            <p className="text-xs text-bronze">{formatWhen(note.at)}</p>
            <p className="mt-1 leading-relaxed">{note.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BodyScreen() {
  const setView = useAurlis((state) => state.setView);
  const steps = [
    ["Стойка", "Стопы на ширине таза. Колени мягкие. Это не бой — встреча с тем, что уже в теле."],
    ["Руки", "Сожми кулаки на вдохе и открой на выдохе. Три раза. Сила может быть без удара."],
    ["Челюсть", "Зверь часто живёт здесь. Разжми. Если хочется звука — тихий выдох, не крик."],
  ];
  return (
    <div className="min-h-full bg-cream px-5 pt-3 pb-8 text-ink">
      <Back onClick={() => setView({ kind: "tabs" })} />
      <h1 className="mt-3 font-display text-5xl">Боксовые</h1>
      <p className="mt-2 text-sm text-bronze">Короткий телесный контур. Без противника снаружи.</p>
      <ol className="mt-6 space-y-5">
        {steps.map(([title, body]) => (
          <li key={title}>
            <h2 className="font-display text-3xl">{title}</h2>
            <p className="mt-1 leading-relaxed">{body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function LetterScreen() {
  const letter = useAurlis((state) => state.letter);
  const setLetter = useAurlis((state) => state.setLetter);
  const setView = useAurlis((state) => state.setView);
  const [text, setText] = useState(letter);

  return (
    <div className="min-h-full bg-cream px-5 pt-3 pb-8 text-ink">
      <Back onClick={() => setView({ kind: "tabs" })} />
      <h1 className="mt-3 font-display text-5xl">Письмо себе</h1>
      <p className="mt-2 text-sm leading-relaxed text-bronze">
        Здесь нет ленты чужих голосов. Сообщество пути начинается с одного честного адресата — тебя.
      </p>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={6}
        placeholder="Я хочу, чтобы ты помнил…"
        className="mt-4 w-full resize-none rounded-3xl border border-line bg-cream-2 px-4 py-3 text-base text-ink outline-none"
      />
      <button type="button" className={`${goldBtn} mt-3`} onClick={() => setLetter(text.trim())}>
        Сохранить письмо
      </button>
    </div>
  );
}

function EventsScreen() {
  const traces = useAurlis((state) => state.traces);
  return (
    <div className="min-h-full bg-cream px-5 pt-6 pb-6 text-ink safe-top">
      <h1 className="font-display text-5xl">События</h1>
      <p className="mt-2 text-sm text-bronze">Следы возвращения. Без счёта дней и без серии.</p>
      <ul className="mt-6 space-y-3">
        {traces.length === 0 ? (
          <li className="rounded-3xl border border-line bg-cream-2 px-4 py-4 text-sm leading-relaxed text-bronze">
            Когда откроешь свиток, печать или Кай, здесь останется тихая отметка.
          </li>
        ) : null}
        {traces.map((trace) => (
          <li key={trace.id} className="border-b border-line py-3">
            <p className="text-xs text-bronze">{formatWhen(trace.at)}</p>
            <p className="mt-1 font-display text-2xl">{trace.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProfileScreen() {
  const name = useAurlis((state) => state.name);
  const intention = useAurlis((state) => state.intention);
  const sound = useAurlis((state) => state.sound);
  const completed = useAurlis((state) => state.completed);
  const setName = useAurlis((state) => state.setName);
  const setIntention = useAurlis((state) => state.setIntention);
  const setSound = useAurlis((state) => state.setSound);
  const resetPath = useAurlis((state) => state.resetPath);
  const [armed, setArmed] = useState(false);

  return (
    <div className="min-h-full bg-cream px-5 pt-6 pb-8 text-ink safe-top">
      <h1 className="font-display text-5xl">{name.trim() || "Путник"}</h1>
      <p className="mt-1 text-sm text-bronze">
        Пройдено свитков: {completed.length} из {scrolls.length}
      </p>
      <label className="mt-6 block text-sm text-bronze">
        Как к тебе обращаться
        <input
          value={name}
          onChange={(event) => setName(event.target.value.slice(0, 40))}
          className="mt-2 h-12 w-full rounded-full border border-line bg-cream-2 px-4 text-base text-ink outline-none"
        />
      </label>
      <label className="mt-4 block text-sm text-bronze">
        Намерение пути
        <input
          value={intention}
          onChange={(event) => setIntention(event.target.value.slice(0, 80))}
          placeholder="Стать целым, не идеальным"
          className="mt-2 h-12 w-full rounded-full border border-line bg-cream-2 px-4 text-base text-ink outline-none"
        />
      </label>
      <button type="button" className={`${press} mt-6 text-left text-base`} onClick={() => setSound(!sound)}>
        Звук печати: {sound ? "включён" : "выключен"}
      </button>
      <button
        type="button"
        className={`${press} mt-8 text-sm text-bronze`}
        onClick={() => {
          if (!armed) {
            setArmed(true);
            return;
          }
          resetPath();
          setArmed(false);
        }}
      >
        {armed ? "Нажми ещё раз, чтобы начать карту заново" : "Начать карту заново"}
      </button>
    </div>
  );
}

const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: "path", label: "Путь", icon: Mountain },
  { id: "kai", label: "Кай", icon: Flower2 },
  { id: "arsenal", label: "Арсенал", icon: Layers },
  { id: "events", label: "События", icon: CalendarDays },
  { id: "profile", label: "Профиль", icon: CircleUser },
];

function BottomNav() {
  const tab = useAurlis((state) => state.tab);
  const setTab = useAurlis((state) => state.setTab);
  return (
    <nav className="safe-bottom absolute inset-x-3 bottom-2 z-20 grid grid-cols-5 rounded-full border border-line bg-cream/95 px-1 py-1 text-ink shadow-lg" aria-label="Разделы">
      {tabs.map((item) => {
        const Icon = item.id === "kai" ? null : item.icon;
        const active = tab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => setTab(item.id)}
            className={`${press} flex h-14 flex-col items-center justify-center gap-0.5 text-xs ${active ? "text-gold-deep" : "text-bronze"}`}
          >
            {item.id === "kai" ? (
              <Sigil className={`h-5 w-5 ${active ? "text-gold-deep" : "text-bronze"}`} />
            ) : Icon ? (
              <Icon className="h-5 w-5" aria-hidden />
            ) : null}
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

function screenFor(view: View, tab: Tab) {
  if (view.kind === "map") return <MapScreen />;
  if (view.kind === "scroll") return <ScrollScreen id={view.id} />;
  if (view.kind === "seal") return <SealScreen id={view.id} />;
  if (view.kind === "kai") return <KaiFocus id={view.id} />;
  if (view.kind === "key") return <KeyScreen id={view.id} />;
  if (view.kind === "journal") return <JournalScreen />;
  if (view.kind === "body") return <BodyScreen />;
  if (view.kind === "letter") return <LetterScreen />;
  if (tab === "kai") return <KaiHome />;
  if (tab === "arsenal") return <ArsenalHome />;
  if (tab === "events") return <EventsScreen />;
  if (tab === "profile") return <ProfileScreen />;
  return <Home />;
}

export function AurlisApp() {
  const hydrated = useHydrated();
  const entered = useAurlis((state) => state.entered);
  const enter = useAurlis((state) => state.enter);
  const tab = useAurlis((state) => state.tab);
  const view = useAurlis((state) => state.view);
  const hideNav = view.kind === "scroll" || view.kind === "seal" || view.kind === "kai";

  if (!hydrated || !entered) {
    return <Gate onEnter={enter} ready={hydrated} />;
  }

  return (
    <div className="relative mx-auto h-dvh w-full max-w-md overflow-hidden bg-night">
      <div className={`h-full overflow-y-auto ${hideNav ? "" : "pb-24"}`}>{screenFor(view, tab)}</div>
      {hideNav ? null : <BottomNav />}
    </div>
  );
}
