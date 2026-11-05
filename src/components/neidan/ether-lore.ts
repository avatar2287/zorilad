import type { LoreLang } from "@/components/neidan/lore";

type Part = { kind: "h" | "p"; text: string };
export type EtherBlock = { heading: string; parts: Part[] };
const p = (text: string): Part => ({ kind: "p", text });
const h = (text: string): Part => ({ kind: "h", text });

export const etherChrome = {
  ru: {
    soundOn: "🔊 ASMR: Частота Когерентности (Вкл)",
    soundOff: "🔊 ASMR: Частота Когерентности (Выкл)",
    tabs: ["I. Что происходит внутри", "II. Интеграция и Целостность", "III. Ручные печати и Практики"],
    shopTitle: "ЭФИР • Интеграция • Полная ЦЕЛОСТНОСТЬ",
    shopLead: "Закрытый свиток глубокой нейробиологии, внутренней алхимии и телесных практик",
    buy: "🔒 Полный доступ — $13.99 (Разовый платёж)",
    demo: "Демо-доступ: Открыть сейчас",
    later: "Не сейчас",
    hold: "Зажать печать и запустить цикл дыхания",
    stop: "Остановить",
  },
  en: {
    soundOn: "🔊 ASMR: Coherence Frequency (On)",
    soundOff: "🔊 ASMR: Coherence Frequency (Off)",
    tabs: ["I. What Happens Inside", "II. Integration & Wholeness", "III. Hand Seals & Practices"],
    shopTitle: "ETHER • Integration • Full WHOLENESS",
    shopLead: "The locked scroll of deep neurobiology, inner alchemy, and somatic practices",
    buy: "🔒 Full access — $13.99 (One-Time Unlock)",
    demo: "Demo access: Open now",
    later: "Not now",
    hold: "Hold the seal and start the breath cycle",
    stop: "Stop",
  },
} as const;

export const shopBody: Record<LoreLang, string[]> = {
  ru: [
    "Ты познакомился с тремя сферами своей психики и увидел, как они разрывают твоё внимание в течение дня. Внутри «Эфира» собрана полная практическая система сборки себя в единое целое:",
    "• I. Полная нейробиология «Под капотом» и Шкала Хвостов: Анатомия прорыва печати от лёгкого стресса до 6 хвостов аффекта, а также детальный разбор биохимии всех 5 жизненных сценариев (почему мозг застревает в дофаминовой петле, как возникает паника из-за углекислого газа и что происходит с кортизолом в полночь).",
    "• II. Пошаговый путь Алхимии: Сборка трёх сфер в Состояние Хокаге: Как спуститься к клетке Девятихвостого и превратить страх в заземление. Как обучить внутреннюю Сакуру Ирёниндзюцу (медицине нервной системы и вагальному тормозу). Как вытащить Саске из вечного гендзюцу с помощью телесного якоря.",
    "• III. Интерактивные Ручные Печати и Дыхательные Тренажёры: Наглядные схемы и точная техника складывания 3 ключевых ручных печатей шиноби (Тигр, Овца, Змея) как нейромышечных якорей для мозга + интерактивные анимированные тренажёры вдоха-выдоха со звуковым и тактильным сопровождением.",
  ],
  en: [
    "You've met the three spheres of your psyche and seen how their conflict drains you throughout the day. Inside Aether lies the complete, step-by-step system for integrating yourself into a single, unshakeable whole:",
    "• I. Full \"Under the Hood\" Neurobiology & The Nine-Tails Scale: The exact anatomy of losing control—from early stress to a 6-Tail emotional storm—plus the complete physiological breakdown of all 5 daily overload scenarios (how the dopamine slot machine traps your focus, why hyperventilation triggers panic, and how midnight cortisol loops work).",
    "• II. The Step-by-Step Alchemy Path: Entering the Hokage State: How to step up to the Nine-Tails' cage and turn raw fear into grounded power. How to train your inner Sakura in Medical Ninjutsu (nervous system regulation and the vagal brake). How to pull Sasuke out of eternal genjutsu using physical reality.",
    "• III. Interactive Hand Seals & Breathing Trainers: Visual diagrams and exact finger-by-finger guides for 3 classic shinobi hand seals (Tiger, Ram, Snake) used as neuromuscular anchors for your prefrontal cortex—paired with interactive, animated breathing pacers with haptic and audio guidance.",
  ],
};

export const hood: Record<LoreLang, EtherBlock[]> = {
  ru: [
    {
      heading: "Прогрессия потери контроля по шкале Хвостов Кьюби",
      parts: [
        p("Вот как выглядит прогрессия потери контроля, когда Амигдала перехватывает управление у Неокортекса:"),
        p("• Красные глаза и клыки (Острый стресс): Выброс адреналина. Пульс 120–140 уд/мин. Туннельное зрение, падение эмпатии, мир делится исключительно на «угрозу» и «защиту»."),
        p("• 1–3 хвоста (Адреналиновый шторм): Жевательные мышцы и плечи каменеют, дыхание становится частым и верхним (ключичным). Неокортекс теряет контроль, мышление сводится к чёрно-белым импульсам."),
        p("• 4–6 хвостов (Критический перегрев / Аффект): Метаболический токсикоз, гипервентиляция, падение уровня углекислого газа (CO2), спазм сосудов мозга. Наступает паническая атака, деперсонализация («я не помню, что кричал, тело не моё»). Организм начинает работать на саморазрушение."),
        p("• Союз с Курамой (Мастерство): Высокий тонус вентрального блуждающего нерва в сочетании с сохранённой связью с префронтальной корой. Ты чувствуешь колоссальную волну силы в животе, но голова остаётся холодной, а энергия идёт в точное, выверенное действие."),
      ],
    },
    {
      heading: "Что происходит под капотом: Физиология 5 жизненных сценариев",
      parts: [
        h("Сценарий 1. Утренний экранный паралич («Ловушка на пять минут»)"),
        p("• Дофаминовое обучение: Дофамин сработал не как радость, а как ошибка прогноза награды. Свайп (скучно) → свайп (новости) → внезапно смешной мем! Древняя система обучения зафиксировала: «Неопределённость даёт супер-награду, листай дальше»."),
        p("• Зеркальная система и Бета-ритмы: Твоя зеркальная система эмпатии бессознательно смоделировала чужие страхи и боль с экрана. Мозг застрял в высоких бета-ритмах (13–30 Гц) — режиме тревожного информационного шума."),
        p("• Истощение без движения: Поскольку мозг каждые 7 секунд получал новый стимул, реальная жизнь с её медленными задачами стала казаться мозгу пресной и неподъёмной (упала чувствительность рецепторов к долгой награде). Ты рассеял себя наружу, не сделав ни шага."),
        h("Сценарий 2. Внезапная паника посреди дня («Ловушка ощущений»)"),
        p("• Интероцептивная ловушка: Мозг через интероцепцию уловил естественное ускорение пульса (от духоты, кофе или усталости). Но Амигдала (внутренняя охрана лимбической системы) дала ложноположительный ответ «Возможно, опасность!» и отобрала микрофон у Неокортекса (Amygdala Hijack)."),
        p("• Симпатический шторм (Педаль газа): Мгновенно включилась симпатическая система: выброс адреналина разогнал сердце, сосуды брюшной полости спазмировались (ощущение «всё оборвалось в животе»)."),
        p("• Ошибка гипервентиляции: Из-за испуга человек начал дышать часто и глубоко ртом. Это вымыло из крови углекислый газ (CO2), вызвав ощелачивание крови, сужение сосудов мозга и головокружение. Перепуганный мозг окончательно поверил в катастрофу, замкнув порочный круг: страх → учащение пульса → ещё больший испуг."),
        h("Сценарий 3. Полуночная мыслемешалка («Петля Идзанами»)"),
        p("• Застревание в Бета-ритмах: Вместо того чтобы мозг переключился в восстановительные альфа- или тета-ритмы, он остался в высокочастотном бета-режиме активной обработки информации."),
        p("• Ловушка контроля: Неокортекс пытается «доиграть» прошлую ситуацию, чтобы закрыть гештальт. Но чтобы проверить, думаешь ли ты о проблеме, мозг вынужден снова и снова вызывать её в рабочую память."),
        p("• Фон кортизола: Ось HPA (гипоталамус — гипофиз — надпочечники) продолжает подкапывать кортизол, удерживая тело в фоновом режиме боевой готовности, из-за чего сон становится невозможно поймать."),
        h("Сценарий 4. Взрыв в конфликте («Срыв печати и выход Хвостов»)"),
        p("• Amygdala Hijack (Захват амигдалой): Лимбическая система расценила оскорбление как смертельную угрозу социальному статусу или безопасности. Внутренняя охрана мгновенно вырвала микрофон у Префронтальной коры (Неокортекса). Логика, этика и расчёт отключились, потому что в «бою» критически важна скорость."),
        p("• Шкала Хвостов (Адреналиновый удар): Произошёл мощнейший выброс норадреналина и адреналина. Пульс подскочил до 120–140 ударов, поле зрения сузилось до туннельного (эффект Шарингана). Кровь ушла от желудка к крупным мышцам."),
        p("• Энергетический срыв: Наступил кратковременный аффект. Тело сожгло гигантские запасы гликогена вхолостую, оставив после себя метаболический токсикоз и опустошение."),
        h("Сценарий 5. Синдром «удобного человека» («Каменный панцирь и ком в горле»)"),
        p("• Биологический конфликт (Газ и Тормоз одновременно): На нарушение границ Амигдала мгновенно дала команду «Защищайся!» и выбросила порцию энергии для отпора. Но Неокортекс из страха социального отвержения силой зажал педаль тормоза. Машина ревёт на полном газу, стоя на ручнике."),
        p("• Мышечный панцирь и спазм гортани: Невыраженный импульс не исчезает — он уходит в мускулатуру. Каменеют трапеции, зажимается диафрагма, а мышцы глотки спазмируются, чтобы буквально «удержать» рвущиеся наружу слова (тот самый ком в горле)."),
        p("• Внутреннее выгорание: Удержание этого фасада требует колоссальных затрат АТФ. Вся энергия, выделенная организмом на защиту твоих границ, направляется внутрь против самого тела, оставляя хронические зажимы, спазмы и апатию."),
      ],
    },
  ],
  en: [
    {
      heading: "The Nine-Tails Scale: Progression of Losing Control",
      parts: [
        p("Here is how the progression of losing control unfolds when the Amygdala hijacks the Neocortex:"),
        p("• Red Eyes & Fangs (Acute Stress): Adrenaline surge. Heart rate hits 120–140 BPM. Tunnel vision sets in, empathy drops, and the world splits strictly into \"threat\" and \"defense.\""),
        p("• 1–3 Tails (Adrenaline Storm): Your jaw and shoulders turn to stone; breathing becomes rapid and shallow in the upper chest. The Neocortex loses executive control, reducing thought to black-and-white impulses."),
        p("• 4–6 Tails (Critical Overload / Affect): Metabolic overload, hyperventilation, a sharp drop in blood carbon dioxide (CO2), and cerebral vasoconstriction. A panic attack or depersonalization hits (\"I don't even remember what I was yelling; my body didn't feel like mine\"). The system starts burning itself out from the inside."),
        p("• Alliance with Kurama (Mastery): High ventral vagal tone paired with an unbroken link to your prefrontal cortex. You feel a massive wave of raw power in your gut, yet your head stays ice-cold, channeling that energy into precise, measured action."),
      ],
    },
    {
      heading: "What Happens Under the Hood: Physiology of the 5 Daily Scenarios",
      parts: [
        h("Scenario 1. Morning Screen Paralysis (\"The Five-Minute Trap\")"),
        p("• Dopamine Reward Prediction Error: Dopamine didn't fire as pleasure—it fired as a reward prediction error. Swipe (boring) → swipe (news) → suddenly a hilarious meme! Your ancient learning circuit locked in the rule: \"Uncertainty brings a jackpot reward—keep scrolling.\""),
        p("• Mirror Neurons & High-Beta Waves: Your empathy mirror system unconsciously simulated strangers' fear and pain from the screen. Your brain got stuck in high-beta waves (13–30 Hz)—the frequency of anxious information noise."),
        p("• Exhaustion Without Movement: Because your brain got hit with a fresh stimulus every 7 seconds, real life with its slower tasks now feels flat and impossible to start (your receptors lost sensitivity to long-term rewards). You scattered your attention outward without taking a single step."),
        h("Scenario 2. Sudden Midday Panic (\"The Sensation Trap\")"),
        p("• The Interoceptive Trap: Through interoception, your brain noticed a natural uptick in heart rate (from a stuffy room, coffee, or fatigue). But the Amygdala (your limbic security guard) fired a false-positive \"Possible danger!\" alarm and snatched the microphone from your Neocortex (Amygdala Hijack)."),
        p("• Sympathetic Storm (The Gas Pedal): Your sympathetic system slammed on the gas: a shot of adrenaline raced your heart while abdominal blood vessels clamped down (that \"stomach dropping\" feeling)."),
        p("• The Hyperventilation Mistake: Out of fear, you started breathing fast and deep through your mouth. That blew off too much carbon dioxide (CO2), making your blood alkaline, constricting blood vessels in the brain, and causing dizziness and tingling fingers. Your frightened brain took that dizziness as proof of imminent disaster, locking in the feedback loop: fear → faster pulse → deeper panic."),
        h("Scenario 3. The Midnight Overthinking Loop (\"The Izanami Loop\")"),
        p("• Trapped in Beta Waves: Instead of shifting down into restorative alpha or theta brainwaves, your brain stayed revved up in high-frequency beta mode, actively chewing on data."),
        p("• The Control Trap: Your Neocortex is trying to \"replay and win\" a past conversation to find closure. Yet every time your brain checks whether you've stopped thinking about the problem, it has to pull the memory right back into working memory."),
        p("• The Cortisol Drip: Your HPA axis (hypothalamus–pituitary–adrenal) keeps dripping cortisol into your bloodstream, holding your body in low-grade combat readiness and making sleep impossible to catch."),
        h("Scenario 4. Exploding in an Argument (\"Breaking the Seal & Releasing the Tails\")"),
        p("• Amygdala Hijack: Your limbic system read an insult as a mortal threat to your social standing or safety. Internal security instantly ripped the controls away from your Prefrontal Cortex. Logic, ethics, and long-term calculation shut off because in combat, raw speed is everything."),
        p("• The Tails Surge (Adrenaline Hit): A massive dump of norepinephrine and adrenaline hit your veins. Your pulse spiked to 120–140 BPM, and your vision narrowed into a tunnel (the Sharingan effect). Blood rushed out of your stomach into your large muscles."),
        p("• Energy Crash: A brief emotional storm burned through massive glycogen reserves for nothing, leaving metabolic exhaustion and emptiness in its wake."),
        h("Scenario 5. The \"People-Pleaser\" Syndrome (\"Stone Armor & A Lump in the Throat\")"),
        p("• Biological Conflict (Gas and Brake at Once): When your boundary was crossed, your Amygdala instantly ordered \"Defend yourself!\" and mobilized energy to push back. But out of fear of social rejection, your Neocortex slammed the emergency brake. Your engine is redlining at full throttle with the handbrake pulled."),
        p("• Muscular Armor & Throat Spasm: A suppressed impulse doesn't vanish—it sinks into your muscles. Your traps turn to stone, your diaphragm locks up, and the muscles of your throat spasm to physically hold back the words fighting to get out (that exact lump in your throat)."),
        p("• Internal Burnout: Holding up that polite facade burns through enormous amounts of cellular ATP. All the energy your body generated to protect your boundaries gets turned inward against your own tissues, leaving chronic tension, spasms, and apathy."),
      ],
    },
  ],
};

export const alchemy: Record<LoreLang, EtherBlock[]> = {
  ru: [
    {
      heading: "Шаг 1. Перед клеткой Девятихвостого (Возвращение Силы)",
      parts: [
        p("Первый шаг внутрь себя начинается перед дверью, где хранится вся собранная за жизнь боль и которая заперта на три замка. Ты перестаёшь спасаться логикой Саске, которая уводила в разные «просветления» и концепции, лишь бы не открывать эту дверь. Большинство практик учат «подниматься к свету». Тебе нужно сделать прямо противоположное — спуститься в самые тёмные дебри своего разума. Туда, где стоит ком в горле, где спазмирован желудок, где клокочет невыраженная злость."),
        p("Ты подходишь к клетке. Лис рычит так, что дрожит всё тело. По венам хлещет чистый адреналин, сердце колотится на пределе, мысли вопят: «Это конец!», приукрашая всё разными эмоциональными тонами — от животного страха до панической тревоги, когда кажется, что вот-вот потеряешь сознание."),
        p("В этот момент обычный человек глотает успокоительное, открывает бесконечную ленту коротких видео или тянется к вредным привычкам и стимуляторам, чтобы сбежать от зверя. Но ты остаёшься. Ты упираешься стопами в холодный каменный пол и делаешь длинный неспешный выдох..."),
        p("Наруто внутри тебя впервые за долгие годы садится напротив чудовища и признаёт: «Я вижу тебя. Ты — это моя ярость, которую мне запрещали проявлять. Ты — мой первобытный ужас, который некому было утешить. Ты — не зло. Ты просто колоссальное количество энергии, которую я запер в себе»."),
        p("Когда ты выдерживаешь жар этой стихии, не пытаясь её подавить и не выплёскивая на окружающий мир, происходит алхимический сдвиг. Решётка растворяется. Лис больше не чудовище снаружи — он становится твоим корневым заземлением. Ты возвращаешь себе своё право на силу."),
      ],
    },
    {
      heading: "Шаг 2. Преображённая Сакура (Ирёниндзюцу и Вагальный тормоз)",
      parts: [
        p("Но одного первобытного огня мало. Без тонкого управления он просто сожжёт тебя дотла. И здесь на сцену выходит преображённая Сакура."),
        p("Ей больше не нужно быть девочкой на подтанцовке у чужих ожиданий. Она оставляет учебники и идёт к легендарному наставнику — Цунаде. Она учится древнейшему из искусств — Ирёниндзюцу, медицине нервной системы."),
        p("Сакура понимает: тело помнит всё. Каждый раз, когда ты предавал себя, тело каменело, диафрагма зажималась и дыхание сбивалось. Она больше не прячет свою Внутреннюю Сакуру — она соединяется с ней. Та дикая ярость, что годами колотила внутри, теперь превращается в сокрушительный удар по иллюзиям."),
        p("Она учится ставить границы. Её чакра больше не расплёскивается на жалость к себе и попытки заслужить любовь. Она собирает рассеянное внимание капля за каплей и запечатывает его в центр лба. Это то, что на языке физиологии называется непоколебимым вагальным тормозом."),
        p("Когда мир снаружи начинает требовать: «Будь удобным, соответствуй, терпи», — Сакура внутри тебя спокойно выходит вперёд, смотрит в глаза манипулятору и ломает чужой сценарий, словно каменную плиту. Больше никаких истерик. Только плотная, укоренённая в костях уверенность, которая знает цену каждой капле своей энергии."),
      ],
    },
    {
      heading: "Шаг 3. Освобождение Саске (Выход из вечного гендзюцу)",
      parts: [
        p("И вот тогда наступает черёд финальной битвы — за освобождение Саске."),
        p("Интеллект освободить труднее всего, потому что он искренне считает себя хозяином замка. Саске застрял в технике вечного гендзюцу. Он пойман в петлю иллюзий: прошлое проецируется на будущее, в каждом событии чудится предательство, в каждом молчании — отвержение. Его Шаринган вращается так быстро, что сжигает глазные нервы, заставляя мозг бредить наяву."),
        p("Ты ловишь своего внутреннего аналитика за руку прямо посреди ночной ментальной жвачки. Ты видишь, как он чертит на внутренних экранах схемы катастроф: «Они подумают, что я слаб... Я останусь ни с чем... Всё повторится... А что скажут другие, если я дам слабину». И ты не споришь с ним логически. Спорить с Саске на его поле — верный способ остаться в гендзюцу навсегда."),
        p("Вместо этого ты используешь тело как резкий телесный якорь пробуждения. Физическая реальность пробивает ментальный туман:"),
        p("• Ты чувствуешь, как воздух входит в ноздри — прохладный на вдохе, тёплый на выдохе."),
        p("• Ты чувствуешь вес своего тела."),
        p("• Ты возвращаешься в реальность и осознаёшь, что нет опасности — это всё иллюзии ума."),
        p("• Факт: я сижу в комнате, здесь безопасно."),
        p("• Иллюзия: весь мир ополчился против меня."),
        p("Саске внутри вздрагивает. Кровавый узор его глаз замедляет бешеный бег. Меч опускается в ножны. Он понимает: война давно окончена. Больше не нужно продолжать битву против призраков прошлого. Твой блестящий, острый как бритва ум наконец-то может стать тем, чем был задуман природой: инструментом созидания, а не инквизитором собственной души."),
      ],
    },
    {
      heading: "Точка Абсолютного Баланса: Состояние Хокаге",
      parts: [
        p("В этот миг три стихии схлопываются в точку абсолютного баланса."),
        p("• Огненный, неукротимый ресурс нижнего даньтяня — Наруто."),
        p("• Исцеляющая, непоколебимая средняя сфера — Сакура."),
        p("• Ясная, незамутнённая страхом верхняя сфера — Саске."),
        p("Они больше не враги, оспаривающие право на жизнь. Они стоят спиной к спине в центре твоего существа."),
        p("Ты выходишь на улицу. Вокруг шумит город: клаксоны машин, тревожные заголовки на экранах, люди с потухшими или безумными глазами, бегущие по своим замкнутым кругам. Но внутри тебя больше нет расщепления."),
        p("• Когда приходит шторм, внутри тепло и устойчивость: «Мы выстоим»."),
        p("• Сердце держит ясную границу: «Это не моё, я не впускаю этот яд»."),
        p("• А ум спокойно скользит по поверхности реальности, выбирая точный, выверенный шаг."),
        p("Это и есть состояние Хокаге. Не святость, не отрыв от земли, не отречение от страстей. А способность оставаться целым среди океана социальных эмоций и ветров суеты, глубоко дыша животом и зная точно, кто ты такой на самом деле."),
      ],
    },
  ],
  en: [
    {
      heading: "Step 1. Facing the Nine-Tails' Cage (Reclaiming Your Power)",
      parts: [
        p("The first step inward begins right in front of the door where all the pain collected over your lifetime is locked behind three heavy seals. You stop using Sasuke's logic to escape into abstract \"enlightenment\" concepts just to avoid opening that door. Most practices tell you to \"rise toward the light.\" You need to do the exact opposite—descend into the darkest depths of your own psyche. Down to the lump in your throat, the knotted stomach, and the simmering, unspoken anger."),
        p("You step up to the cage. The Fox roars so loud your whole body trembles. Pure adrenaline courses through your veins, your heart hammers at its limit, and your thoughts scream: \"This is the end!\"—coloring everything from primal terror to dizzying panic."),
        p("In that moment, the average person reaches for a quick distraction, opens an endless feed of short videos, or numbs out with bad habits just to run away from the beast. But you stay. You plant your feet firmly on the cold stone floor and take a long, unhurried exhale..."),
        p("For the first time in years, the Naruto inside you sits down across from the beast and acknowledges it: \"I see you. You are the rage I was never allowed to show. You are the primal terror no one was there to comfort. You aren't evil. You are simply a massive reservoir of life energy that I locked away inside myself.\""),
        p("When you hold steady through the heat of that element—without suppressing it and without lashing it out at the world around you—an alchemical shift happens. The iron bars dissolve. The Fox is no longer a monster on the outside; it becomes your root grounding. You reclaim your right to your own strength."),
      ],
    },
    {
      heading: "Step 2. Sakura Transformed (Medical Ninjutsu & The Vagal Brake)",
      parts: [
        p("Raw primal fire alone isn't enough. Without fine control, it will simply burn you to ashes. And that is where the transformed Sakura steps onto the stage."),
        p("She no longer needs to be a backup dancer for other people's expectations. She closes her theory books and goes to the legendary master—Tsunade. She learns the oldest art of all: Medical Ninjutsu, the medicine of the nervous system."),
        p("Sakura understands: the body remembers everything. Every time you betrayed yourself, your muscles turned to stone, your diaphragm locked up, and your breath grew shallow. She no longer hides her Inner Sakura—she merges with her. That wild fierceness that spent years pounding from the inside now turns into a shattering strike against illusions."),
        p("She learns to hold boundaries. Her chakra no longer leaks away into self-pity or trying to earn approval. Drop by drop, she gathers her scattered attention and seals it right in the center of her forehead. In physiology, this is known as an unshakeable vagal brake."),
        p("When the outside world demands: \"Be convenient, fit in, put up with it\"—the Sakura inside you calmly steps forward, looks the manipulator in the eye, and shatters their script like a stone slab. No more outbursts. Only dense, bone-deep certainty that knows the exact value of every drop of your energy."),
      ],
    },
    {
      heading: "Step 3. Freeing Sasuke (Breaking Out of Eternal Genjutsu)",
      parts: [
        p("And then comes the final battle—freeing Sasuke."),
        p("The intellect is the hardest part to liberate because it genuinely believes it owns the castle. Sasuke is trapped in an eternal genjutsu. He is caught in an illusion loop: the past is projected onto the future, betrayal is suspected in every event, rejection is read into every silence. His Sharingan spins so fast it scorches his optic nerves, making your brain hallucinate waking nightmares."),
        p("You catch your inner analyst by the wrist right in the middle of his midnight mental rumination. You watch him sketching disaster blueprints on your inner screens: \"They'll think I'm weak... I'll end up with nothing... It'll happen all over again... What will people say if I let my guard down?\" And you don't argue with him using logic. Debating Sasuke on his home turf is a guaranteed way to stay trapped in genjutsu forever."),
        p("Instead, you use your physical body as a sharp anchor of awakening. Physical reality pierces straight through the mental fog:"),
        p("• You feel the air entering your nostrils—cool on the inhale, warm on the exhale."),
        p("• You feel the physical weight of your body pressing down."),
        p("• You return to reality and realize there is no danger here—it is only an illusion of the mind."),
        p("• Fact: I am sitting in a room, and I am safe right now."),
        p("• Illusion: The entire world is out to get me."),
        p("Inside you, Sasuke flinches. The crimson pattern of his eyes slows its frantic spin. The sword slides back into its scabbard. He finally understands: the war ended a long time ago. There is no need to keep fighting ghosts from the past. Your brilliant, razor-sharp mind can finally become what nature designed it to be: an instrument of creation, not the inquisitor of your own soul."),
      ],
    },
    {
      heading: "The Point of Absolute Balance: The Hokage State",
      parts: [
        p("In that exact moment, the three elements collapse into a single point of absolute balance."),
        p("• The fiery, untamed resource of the lower dantian — Naruto."),
        p("• The healing, unshakeable middle sphere — Sakura."),
        p("• The clear, fear-free upper sphere — Sasuke."),
        p("They are no longer enemies fighting for survival. They stand back-to-back at the very center of your being."),
        p("You step outside. Around you, the city roars: car horns, alarming headlines on glowing screens, people with glazed or frantic eyes running in their closed loops. Yet inside you, the split is gone."),
        p("• When a storm hits, your core stays warm and steady: \"We will stand firm.\""),
        p("• Your heart holds a crystal-clear boundary: \"This isn't mine, and I don't let this poison in.\""),
        p("• And your mind glides calmly across the surface of reality, choosing the exact, measured next step."),
        p("This is the Hokage state. Not sainthood, not floating above the earth, not renouncing human passions—but the ability to remain whole in the middle of an ocean of social emotions and restless winds, breathing deeply into your belly and knowing exactly who you truly are."),
      ],
    },
  ],
};

export type SealId = "tiger" | "ram" | "snake";
export type BreathPhase = { label: string; seconds: number };

export type Seal = {
  id: SealId;
  title: string;
  aim: string;
  how: string;
  steps: string[];
  note: string;
  phases: BreathPhase[];
  cycles: number;
};

export const seals: Record<LoreLang, Seal[]> = {
  ru: [
    {
      id: "tiger",
      title: "1. Печать «Тигр» (Тора) — Укрощение Кьюби и сброс паники",
      aim: "Экстренное переключение из симпатического шторма (паника, вспышка гнева, колотящееся сердце) в корневое заземление.",
      how: "Как сложить печать руками",
      steps: [
        "Переплети согнутые безымянные пальцы и мизинцы обеих рук внутрь ладоней.",
        "Переплети средние пальцы.",
        "Выпрями и плотно прижми друг к другу оба указательных и оба больших пальца — так, чтобы они смотрели вертикально вверх, словно остриё. Держи печать на уровне солнечного сплетения.",
      ],
      note: "Цикл 6 повторений: «Глубокий вдох носом в живот (4 сек) → Медленный, длинный выдох через чуть сжатые губы (8 сек)».",
      phases: [
        { label: "Глубокий вдох носом в живот", seconds: 4 },
        { label: "Медленный, длинный выдох", seconds: 8 },
      ],
      cycles: 6,
    },
    {
      id: "ram",
      title: "2. Печать «Овца» (Хицудзи) — Вагальный тормоз и Границы Сакуры",
      aim: "Снятие мышечного панциря, кома в горле и возврат собственной энергии в центр лба перед сложным разговором или давлением.",
      how: "Как сложить печать руками",
      steps: [
        "Соедини руки перед грудью: согни безымянные пальцы и мизинцы.",
        "Выпрями и соедини вертикально вверх указательный и средний пальцы обеих рук (левые пальцы мягко ложатся поверх основания правых).",
        "Большие пальцы прижми сбоку, направив вверх. Опусти плечи вниз и почувствуй плотный контакт подушечек пальцев.",
      ],
      note: "Цикл 6 повторений: «Плавный вдох в грудь и живот (5 сек) → Фокус внимания в центре лба на паузе (2 сек) → Мягкий выдох с расслаблением плеч и челюсти (7 сек)».",
      phases: [
        { label: "Плавный вдох в грудь и живот", seconds: 5 },
        { label: "Фокус в центре лба", seconds: 2 },
        { label: "Мягкий выдох, плечи и челюсть", seconds: 7 },
      ],
      cycles: 6,
    },
    {
      id: "snake",
      title: "3. Печать «Змея» (Ми) — Выход из Гендзюцу и Ночной Покой",
      aim: "Остановка полуночной мыслемешалки (петли Идзанами), перевод мозга из тревожных Бета-ритмов в глубокие Альфа/Тета-волны через телесный якорь.",
      how: "Как сложить печать руками",
      steps: [
        "Переплети все пальцы обеих рук в плотный замок перед собой.",
        "Сожми замок ладоней чуть плотнее на 3 секунды, чтобы мозг мгновенно почувствовал физическое тело, а затем мягко расслабь кисти, не расцепляя пальцев.",
      ],
      note: "«Прохладный вдох носом (4 сек) → Пауза тишины (4 сек) → Тёплый выдох (4 сек) → Покой в теле (4 сек)».",
      phases: [
        { label: "Прохладный вдох носом", seconds: 4 },
        { label: "Пауза тишины", seconds: 4 },
        { label: "Тёплый выдох", seconds: 4 },
        { label: "Покой в теле", seconds: 4 },
      ],
      cycles: 4,
    },
  ],
  en: [
    {
      id: "tiger",
      title: "1. The Tiger Seal (Tora) — Taming the Nine-Tails & Panic Reset",
      aim: "Emergency shift from a sympathetic storm (panic, anger spike, racing heart) into root grounding.",
      how: "How to fold the seal with your hands",
      steps: [
        "Interlace your ring fingers and pinkies together, curling them inward.",
        "Interlace your middle fingers right over them.",
        "Extend both index fingers and both thumbs straight up and press them firmly together side-by-side at solar plexus level.",
      ],
      note: "6 rounds: deep belly inhale through the nose (4 sec) → slow long exhale through slightly pursed lips (8 sec).",
      phases: [
        { label: "Deep belly inhale", seconds: 4 },
        { label: "Slow, long exhale", seconds: 8 },
      ],
      cycles: 6,
    },
    {
      id: "ram",
      title: "2. The Ram Seal (Hitsuji) — Vagal Brake & Sakura's Boundaries",
      aim: "Releasing muscular armor and throat tension while sealing your focus before a tough conversation or boundary test.",
      how: "How to fold the seal with your hands",
      steps: [
        "Bring your hands together in front of your chest, curling your ring and pinky fingers inward.",
        "Extend both index and middle fingers straight up together, with the left hand resting lightly over the base of the right.",
        "Press your thumbs upright along the sides, drop your shoulders down away from your ears, and feel the firm pressure of your fingertips.",
      ],
      note: "6 rounds: smooth inhale into chest and belly (5 sec) → focus at the center of the forehead (2 sec) → soft exhale, releasing shoulders and jaw (7 sec).",
      phases: [
        { label: "Smooth inhale, chest and belly", seconds: 5 },
        { label: "Focus at the forehead", seconds: 2 },
        { label: "Soft exhale, shoulders and jaw", seconds: 7 },
      ],
      cycles: 6,
    },
    {
      id: "snake",
      title: "3. The Snake Seal (Mi) — Breaking Genjutsu & Midnight Stillness",
      aim: "Stopping the midnight overthinking loop (Izanami) and shifting your brain from anxious Beta waves into restorative Alpha/Theta stillness.",
      how: "How to fold the seal with your hands",
      steps: [
        "Interlace all fingers of both hands into a firm clasp in front of your chest.",
        "Gently squeeze your clasped hands together for 3 seconds so your brain locks onto the physical sensation of your body, then soften your grip while keeping your fingers intertwined.",
      ],
      note: "Cool inhale through the nose (4 sec) → silence (4 sec) → warm exhale (4 sec) → stillness in the body (4 sec).",
      phases: [
        { label: "Cool inhale", seconds: 4 },
        { label: "Silence", seconds: 4 },
        { label: "Warm exhale", seconds: 4 },
        { label: "Stillness in the body", seconds: 4 },
      ],
      cycles: 4,
    },
  ],
};
