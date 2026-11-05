import { useEffect, useRef, useState } from "react";
import { ChevronLeft, CircleDot, Compass, Library, ScrollText, Volume2, VolumeX, X } from "lucide-react";
import { TripleSeal } from "@/components/neidan/seal";
import {
  fieldById,
  fields,
  formatDay,
  practiceById,
  practiceOfDay,
  practices,
  scrollById,
  scrolls,
  type Practice,
} from "@/lib/neidan/content";
import { useNeidan, type Tab } from "@/lib/neidan/store";

const press = "transition-transform duration-150 ease-out active:not-disabled:scale-[0.96]";

function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const finish = () => setHydrated(true);
    if (useNeidan.persist.hasHydrated()) finish();
    return useNeidan.persist.onFinishHydration(finish);
  }, []);
  return hydrated;
}

function formatClock(total: number) {
  const safe = Math.max(0, total);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function tone(ctx: AudioContext, frequency: number, when: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(0.05, when + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 1.8);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(when);
  osc.stop(when + 1.9);
}

function playChime(ctx: AudioContext) {
  const now = ctx.currentTime;
  tone(ctx, 392, now);
  tone(ctx, 523.25, now + 0.18);
}

function Orbs() {
  return (
    <div className="relative mx-auto h-56 w-36" aria-hidden>
      <span className="orb orb-high absolute top-0 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full bg-jade blur-md" />
      <span className="orb orb-mid absolute top-16 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-gold blur-md" />
      <span className="orb absolute bottom-2 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-gold-deep blur-md" />
    </div>
  );
}

function BackButton({ onClick, label = "Назад" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${press} -ml-2 inline-flex h-11 items-center gap-1 text-sm text-dim`}
    >
      <ChevronLeft className="h-5 w-5" aria-hidden />
      {label}
    </button>
  );
}

function Gate({ onEnter, ready }: { onEnter: () => void; ready: boolean }) {
  return (
    <div className="relative min-h-dvh">
      <img src="/neidan/gate.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/72 to-ink" />
      <div className="relative mx-auto flex min-h-dvh max-w-md flex-col px-6 safe-top safe-bottom">
        <header className="rise pt-6 text-center">
          <p className="font-han text-sm text-jade">內丹</p>
          <h1 className="mt-2 font-display text-6xl leading-none text-parchment">Нэйдань</h1>
          <p className="mt-3 text-sm text-dim">три поля, одно дыхание</p>
        </header>
        <div className="rise rise-2 flex flex-1 items-center justify-center py-8 text-gold">
          <TripleSeal className="h-56 w-56" />
        </div>
        <div className="rise rise-3 pb-4">
          <button
            type="button"
            onClick={onEnter}
            disabled={!ready}
            className={`${press} h-14 w-full rounded-full bg-gold text-base font-medium text-ink disabled:opacity-80`}
          >
            Войти в путь
          </button>
          <p className="mt-4 text-center text-sm text-dim">Без очков и серий. Только возвращение.</p>
        </div>
      </div>
    </div>
  );
}

function PathScreen() {
  const openSession = useNeidan((state) => state.openSession);
  const openField = useNeidan((state) => state.openField);
  const lastSessionId = useNeidan((state) => state.lastSessionId);
  const today = practiceOfDay();
  const last = lastSessionId ? practiceById(lastSessionId) : null;
  const showReturn = last && last.id !== today.id;

  return (
    <div className="px-5 pt-6 pb-8">
      <p className="text-sm text-dim capitalize">{formatDay()}</p>
      <h1 className="mt-1 font-display text-5xl leading-none">Путь</h1>
      {showReturn ? (
        <button
          type="button"
          onClick={() => openSession(last.id)}
          className={`${press} mt-4 text-left text-sm text-gold`}
        >
          Вернуться к «{last.title}»
        </button>
      ) : null}

      <button
        type="button"
        onClick={() => openSession(today.id)}
        className={`${press} relative mt-6 block w-full overflow-hidden rounded-3xl text-left`}
      >
        <img src="/neidan/path.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/25" />
        <div className="relative flex min-h-48 flex-col justify-end p-5">
          <p className="text-sm text-jade">Практика дня</p>
          <p className="mt-1 font-display text-4xl leading-none">{today.title}</p>
          <p className="mt-2 text-sm text-dim">{today.epithet}</p>
        </div>
      </button>

      <h2 className="mt-10 font-display text-3xl">Три поля</h2>
      <p className="mt-2 text-sm leading-relaxed text-dim">Карта внимания, не лестница достижений.</p>
      <div className="relative mt-4">
        <div className="absolute top-3 bottom-3 left-1.5 w-px bg-line" aria-hidden />
        <ul>
          {fields.map((field) => (
            <li key={field.id}>
              <button
                type="button"
                onClick={() => openField(field.id)}
                className={`${press} flex w-full gap-4 py-3 text-left`}
              >
                <span className="relative z-10 mt-2 h-3 w-3 shrink-0 rounded-full bg-gold" />
                <span>
                  <span className="block font-display text-2xl leading-tight">{field.name}</span>
                  <span className="mt-1 block text-sm text-dim">{field.place}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FieldScreen({ id }: { id: string }) {
  const field = fieldById(id);
  const closeField = useNeidan((state) => state.closeField);
  const openSession = useNeidan((state) => state.openSession);

  return (
    <div className="px-5 pb-10">
      <div className="sticky top-0 z-10 -mx-5 bg-ink px-5">
        <BackButton onClick={closeField} label="Путь" />
      </div>
      <p className="font-han mt-4 text-sm text-jade">{field.han}</p>
      <h1 className="mt-2 font-display text-5xl leading-none">{field.name}</h1>
      <p className="mt-3 text-sm text-gold">{field.treasure}</p>
      <p className="mt-6 font-display text-xl leading-relaxed">{field.text}</p>
      <p className="mt-5 text-sm leading-relaxed text-dim">{field.note}</p>
      <button
        type="button"
        onClick={() => openSession("three-fields", field.note)}
        className={`${press} mt-8 h-14 w-full rounded-full bg-gold text-base font-medium text-ink`}
      >
        Побыть с этим полем
      </button>
    </div>
  );
}

function ScrollScreen() {
  const openReader = useNeidan((state) => state.openReader);
  return (
    <div>
      <div className="relative h-40 overflow-hidden">
        <img src="/neidan/scroll.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <h1 className="absolute bottom-4 left-5 font-display text-5xl leading-none">Свиток</h1>
      </div>
      <ul className="px-5 pb-8">
        {scrolls.map((scroll) => (
          <li key={scroll.id} className="border-b border-line">
            <button
              type="button"
              onClick={() => openReader(scroll.id)}
              className={`${press} w-full py-4 text-left`}
            >
              <span className="block font-display text-2xl leading-tight">{scroll.title}</span>
              <span className="mt-1 block text-sm text-dim">{scroll.epithet}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Reader({ id }: { id: string }) {
  const scroll = scrollById(id);
  const closeReader = useNeidan((state) => state.closeReader);
  return (
    <article className="px-5 pb-12">
      <div className="sticky top-0 z-10 -mx-5 bg-ink px-5">
        <BackButton onClick={closeReader} label="Свитки" />
      </div>
      <p className="mt-4 text-sm text-jade">{scroll.epithet}</p>
      <h1 className="mt-2 font-display text-5xl leading-none">{scroll.title}</h1>
      <div className="mt-8 space-y-5">
        {scroll.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="font-display text-xl leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}

function NowScreen() {
  const openSession = useNeidan((state) => state.openSession);
  return (
    <div className="flex flex-1 flex-col px-5 pt-6 pb-8">
      <p className="text-sm text-jade">Сейчас</p>
      <h1 className="mt-1 font-display text-5xl leading-none">Опора</h1>
      <p className="mt-4 font-display text-xl leading-relaxed">
        Ничего не нужно достигать. Трёх касаний достаточно.
      </p>
      <ol className="mt-8 space-y-5">
        {[
          "Почувствуй, чем тело касается опоры.",
          "Смягчи челюсть, язык и пространство между бровей.",
          "Дай выдоху быть чуть длиннее вдоха. Три раза.",
        ].map((step, index) => (
          <li key={step} className="flex gap-4">
            <span className="font-display text-2xl text-gold">{index + 1}</span>
            <span className="pt-1 text-base leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => openSession("three-breaths")}
        className={`${press} mt-auto h-14 w-full rounded-full bg-gold text-base font-medium text-ink`}
      >
        Минута без задачи
      </button>
    </div>
  );
}

function ArsenalScreen() {
  const openSession = useNeidan((state) => state.openSession);
  return (
    <div className="px-5 pt-6 pb-6">
      <h1 className="font-display text-5xl leading-none">Арсенал</h1>
      <p className="mt-3 text-sm leading-relaxed text-dim">Коротко, мягко, без задержек дыхания.</p>
      <ul className="mt-4">
        {practices.map((practice) => (
          <li key={practice.id} className="border-b border-line">
            <button
              type="button"
              onClick={() => openSession(practice.id)}
              className={`${press} flex w-full items-baseline justify-between gap-4 py-4 text-left`}
            >
              <span>
                <span className="block font-display text-2xl leading-tight">{practice.title}</span>
                <span className="mt-1 block text-sm text-dim">{practice.epithet}</span>
              </span>
              <span className="shrink-0 text-sm text-dim">{practice.defaultMinutes} мин</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function currentPhase(practice: Practice, remaining: number, total: number) {
  const span = Math.max(1, total);
  const ratio = (span - remaining) / span;
  let cursor = 0;
  for (const phase of practice.phases) {
    cursor += phase.share;
    if (ratio <= cursor + 0.001) return phase;
  }
  return practice.phases[practice.phases.length - 1];
}

function PracticeScreen({ id }: { id: string }) {
  const practice = practiceById(id);
  const note = useNeidan((state) => state.sessionNote);
  const closeSession = useNeidan((state) => state.closeSession);
  const rememberSession = useNeidan((state) => state.rememberSession);
  const sound = useNeidan((state) => state.sound);
  const setSound = useNeidan((state) => state.setSound);

  const [minutes, setMinutes] = useState(practice.defaultMinutes);
  const [total, setTotal] = useState(practice.defaultMinutes * 60);
  const [remaining, setRemaining] = useState(practice.defaultMinutes * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const endAt = useRef<number | null>(null);
  const audio = useRef<AudioContext | null>(null);
  const chimed = useRef(false);

  useEffect(() => {
    setMinutes(practice.defaultMinutes);
    setTotal(practice.defaultMinutes * 60);
    setRemaining(practice.defaultMinutes * 60);
    setRunning(false);
    setDone(false);
    endAt.current = null;
    chimed.current = false;
  }, [practice.id, practice.defaultMinutes]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      const end = endAt.current;
      if (!end) return;
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0) {
        setRunning(false);
        setDone(true);
      }
    }, 200);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (!done || chimed.current || !sound) return;
    chimed.current = true;
    const ctx = audio.current;
    if (ctx) playChime(ctx);
  }, [done, sound]);

  function ensureAudio() {
    if (!audio.current) {
      const Ctx = window.AudioContext;
      audio.current = new Ctx();
    }
    return audio.current;
  }

  function begin(nextSeconds = remaining) {
    rememberSession(practice.id);
    setDone(false);
    chimed.current = false;
    setTotal(nextSeconds);
    setRemaining(nextSeconds);
    if (sound) {
      const ctx = ensureAudio();
      void ctx.resume();
    }
    endAt.current = Date.now() + nextSeconds * 1000;
    setRunning(true);
  }

  function chooseMinutes(value: number) {
    if (running) return;
    setMinutes(value);
    setTotal(value * 60);
    setRemaining(value * 60);
    setDone(false);
  }

  const phase = currentPhase(practice, remaining, total);

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <img src="/neidan/sit.jpg" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/80 to-ink" />
      <div className="relative flex min-h-0 flex-1 flex-col px-5 pt-3 safe-top">
        <div className="flex items-center justify-between">
          <button type="button" onClick={closeSession} className={`${press} -ml-2 inline-flex h-11 w-11 items-center justify-center`} aria-label="Закрыть">
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setSound(!sound)}
            className={`${press} inline-flex h-11 w-11 items-center justify-center text-dim`}
            aria-label={sound ? "Выключить звук" : "Включить звук"}
          >
            {sound ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
        </div>
        <p className="mt-2 text-center text-sm text-jade">{practice.seat}</p>
        <h1 className="mt-1 text-center font-display text-4xl leading-none">{practice.title}</h1>
        {note ? <p className="mx-auto mt-3 max-w-xs text-center text-sm leading-relaxed text-dim">{note}</p> : null}
        <div className="mt-4">
          <Orbs />
        </div>
        <p className="text-center font-display text-6xl tabular-nums leading-none">{formatClock(remaining)}</p>
        <div className="mt-4 min-h-24 text-center">
          <p className="font-display text-2xl">{done ? "Можно остаться" : phase?.title}</p>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-dim">
            {done ? "Время вышло. Ничего заканчивать не обязательно." : phase?.body}
          </p>
        </div>
        {!running && !done ? (
          <div className="mt-2 flex justify-center gap-2">
            {practice.minutes.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => chooseMinutes(value)}
                className={`${press} h-11 rounded-full px-4 text-sm ${
                  value === minutes ? "bg-parchment text-ink" : "bg-raised text-dim"
                }`}
              >
                {value} мин
              </button>
            ))}
          </div>
        ) : null}
        <div className="mt-auto pb-6 safe-bottom">
          {done ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => begin(60)}
                className={`${press} h-14 rounded-full bg-raised text-parchment`}
              >
                Ещё минута
              </button>
              <button
                type="button"
                onClick={closeSession}
                className={`${press} h-14 rounded-full bg-gold font-medium text-ink`}
              >
                Закрыть
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => (running ? setRunning(false) : begin())}
              className={`${press} h-14 w-full rounded-full bg-gold text-base font-medium text-ink`}
            >
              {running ? "Пауза" : "Начать"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const tabs: { id: Tab; label: string; icon: typeof Compass }[] = [
  { id: "path", label: "Путь", icon: Compass },
  { id: "scroll", label: "Свиток", icon: ScrollText },
  { id: "now", label: "Сейчас", icon: CircleDot },
  { id: "arsenal", label: "Арсенал", icon: Library },
];

function Shell() {
  const tab = useNeidan((state) => state.tab);
  const setTab = useNeidan((state) => state.setTab);
  const readerId = useNeidan((state) => state.readerId);
  const fieldId = useNeidan((state) => state.fieldId);
  const hideNav = Boolean(readerId || fieldId);

  let body = <PathScreen />;
  if (fieldId) body = <FieldScreen id={fieldId} />;
  else if (readerId) body = <Reader id={readerId} />;
  else if (tab === "scroll") body = <ScrollScreen />;
  else if (tab === "now") body = <NowScreen />;
  else if (tab === "arsenal") body = <ArsenalScreen />;

  return (
    <div className="mx-auto flex h-dvh max-w-md flex-col bg-ink">
      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className={tab === "now" && !hideNav ? "flex min-h-full flex-col" : undefined}>{body}</div>
      </main>
      {hideNav ? null : (
        <nav className="safe-bottom grid shrink-0 grid-cols-4 border-t border-line bg-ink" aria-label="Разделы">
          {tabs.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                aria-current={active ? "page" : undefined}
                className={`${press} flex h-16 flex-col items-center justify-center gap-1 text-xs ${
                  active ? "text-parchment" : "text-dim"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden />
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export function NeiDanApp() {
  const hydrated = useHydrated();
  const entered = useNeidan((state) => state.entered);
  const enter = useNeidan((state) => state.enter);
  const sessionId = useNeidan((state) => state.sessionId);

  if (!hydrated || !entered) {
    return <Gate onEnter={enter} ready={hydrated} />;
  }

  if (sessionId) {
    return (
      <div className="mx-auto h-dvh max-w-md bg-ink">
        <PracticeScreen id={sessionId} />
      </div>
    );
  }

  return <Shell />;
}
