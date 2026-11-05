import type { LoreLang } from "@/components/neidan/lore";

export type HandId = "ram" | "tiger" | "focus" | "kai";

type Seal = {
  id: HandId;
  title: string;
  purposeLabel: string;
  purpose: string;
  foldLabel: string;
  fold: string;
  effectLabel: string;
  effect: string;
  pairLabel: string;
  pair: string;
};

type Practice = { title: string; lines: string[] };

export const hands: Record<
  LoreLang,
  { intro: string; whyTitle: string; why: string[]; catalog: string; library: string; seals: Seal[]; practices: Practice[] }
> = {
  ru: {
    intro:
      "Складывание ручных печатей (мудр) в реальном мире — это не магия, а прямой соматосенсорный взлом коры головного мозга через периферическую нервную систему.",
    whyTitle: "Почему это работает: Нейробиологический фундамент",
    why: [
      "Сенсомоторный гомункулус Пенфилда: На проекционной карте коры головного мозга кисти рук, пальцы, язык и губы занимают до 30–40% всей моторной и соматосенсорной площади. Плотность механорецепторов на кончиках пальцев колоссальна по сравнению со всем остальным телом.",
      "Гашение Дефолт-системы мозга (DMN): Когда ты проваливаешься в тревожную руминацию, твоя дефолт-система гоняет мысли по кругу. Точное, симметричное складывание сложной геометрии пальцев с акцентом на точки давления мгновенно перетягивает электрическую активность коры в теменные и моторные отделы, обесточивая мыслемешалку.",
      "Формирование плотного нейронного якоря: Регулярное соединение конкретной конфигурации кистей с медленным выдохом и остановкой внутреннего шума прокладывает устойчивый рефлекторный путь. В критический момент на стрессовой встрече достаточно незаметно сложить пальцы под столом — и тело по рефлексу начнёт снижать частоту сердечных сокращений.",
    ],
    catalog: "Каталог прикладных печатей",
    library: "Библиотека практик и соматических протоколов",
    seals: [
      {
        id: "ram",
        title: "1. Печать «БАРАН» (Хицудзи / Сборка центра)",
        purposeLabel: "Главное назначение",
        purpose: "Мгновенный сброс паники, центрирование при рассеянности, выравнивание эмоционального фона.",
        foldLabel: "Биомеханика (Как сложить)",
        fold: "Указательный и средний пальцы обеих рук выпрями строго вертикально вверх и плотно прижми их боковыми поверхностями друг к другу подушечка к подушечке. Безымянные пальцы и мизинцы обеих рук согни и переплети между собой в плотный замок. Большие пальцы слегка прижми сверху к согнутым пальцам. Удерживай печать вертикально на уровне солнечного сплетения или груди. Локти естественно прижми к ребрам.",
        effectLabel: "Физиологический эффект",
        effect: "Симметричная жесткая рамка возвращает проприоцептивное ощущение вертикальной оси тела. Локти, прижатые к корпусу, рефлекторно опускают плечи, снимая спазм с трапеций и выравнивая баланс полушарий.",
        pairLabel: "С чем сочетать",
        pair: "3 цикла Двойного физиологического вздоха (вдох носом → резкий довдох → долгий выдох через сомкнутые губы).",
      },
      {
        id: "tiger",
        title: "2. Печать «ТИГР» (Тора / Зажигание воли)",
        purposeLabel: "Главное назначение",
        purpose: "Выход из сонного болота, прокрастинации, апатии; мобилизация перед сложным звонком или тренировкой.",
        foldLabel: "Биомеханика (Как сложить)",
        fold: "Переплети пальцы обеих рук в плотный замок. Выпрями вертикально вверх указательные пальцы обеих рук и соедини их подушечками. Большие пальцы выпрями и плотно соедини внутренними ребрами подушечек, направляя их вперед или вверх, формируя жесткий направленный клин. Создай ощутимое давление пальцев друг на друга в точках контакта.",
        effectLabel: "Физиологический эффект",
        effect: "Сильное изометрическое давление в замке пальцев стимулирует восходящие сигналы в моторную кору, вызывая мягкий и контролируемый симпатический драйв (выработку готовности к действию без панической тревоги).",
        pairLabel: "С чем сочетать",
        pair: "Практика «Внутренний лифт вверх» (вытягивание внимания от копчика в макушку по струне позвоночника).",
      },
      {
        id: "focus",
        title: "3. Полупечать КОНЦЕНТРАЦИИ (Одиночная печать у лица)",
        purposeLabel: "Главное назначение",
        purpose: "Мгновенный сбор расфокусированного внимания, остановка бегающих глаз, вход в рабочий тоннель.",
        foldLabel: "Биомеханика (Как сложить)",
        fold: "Выполняется одной ведущей рукой (правой или левой). Указательный и средний пальцы выпрями вверх и плотно соедини. Безымянный палец и мизинец согни к ладони и прижми сверху подушечкой большого пальца. Поднеси выпрямленные пальцы вертикально к подбородку или уровню губ на расстоянии 2–3 см (или слегка коснись подбородка).",
        effectLabel: "Физиологический эффект",
        effect: "Приближение руки к лицу и стимуляция рецепторов зоны подбородка активируют ветви тройничного нерва. Это включает врожденный ориентировочный рефлекс: зрительное поле центрируется, зрачки фиксируются на одной задаче, исчезает периферический информационный шум.",
        pairLabel: "С чем сочетать",
        pair: "Фиксация взгляда на одной точке в течение 30 секунд без моргания перед началом сложной задачи.",
      },
      {
        id: "kai",
        title: "4. Печать «ПРОБОЙ ГЕНДЗЮЦУ» (Специфический замок «КАЙ»)",
        purposeLabel: "Главное назначение",
        purpose: "Экстренная остановка ночной мыслемешалки, разрыв навязчивого тревожного сценария, выход из ступора.",
        foldLabel: "Биомеханика (Как сложить)",
        fold: "Ногтем большого пальца с максимальной силой надави прямо в центр чувствительной подушечки указательного пальца (до границы контролируемой боли). Остальные пальцы сожми в плотный кулак. Сделай резкую паузу в движении.",
        effectLabel: "Физиологический эффект",
        effect: "Точечный болевой импульс высокой интенсивности (ноцицептивный сигнал) поступает в таламус быстрее, чем эмоциональная интерпретация из амигдалы. Это физический «кунай в бедро», который сбивает когнитивную галлюцинацию и возвращает сознание в физический факт: «Боль в пальце — факт, катастрофа в голове — иллюзия».",
        pairLabel: "С чем сочетать",
        pair: "",
      },
    ],
    practices: [
      {
        title: "БАЗОВАЯ ПАУЗА («Возврат к себе»)",
        lines: [
          "Когда применять: Накрыла ярость, прочитал токсичную новость, рука сама тянется сорваться в ссоре или написать резкий ответ на эмоциях. Время: 60 секунд.",
          "Что делать: Остановись (убери пальцы от экрана, сделай шаг назад). Опора в пол (почувствуй плотное давление подошв). Калибровка реальности (назови про себя 3 объекта вокруг). Разделение («Что факт, а что прогноз ума?»). Выбор действия («Что Я хочу сделать исходя из расчёта?»).",
          "Как это работает: Разрыв автоматической петли «стимул → реакция» за счёт проприоцептивного сигнала от стоп.",
        ],
      },
      {
        title: "ДЫХАНИЕ 4/6",
        lines: [
          "Когда применять: Сердце колотится после испуга или кофе, накатывает фоновая тревожность, крутятся мысли перед сном, тяжело успокоить тело. Время: 2–3 минуты.",
          "Что делать: Сядь удобно, не напрягая живот. Сделай мягкий, неглубокий вдох через нос на 4 счёта. Сделай плавный, длинный, расслабленный выдох через слегка сомкнутые губы на 6–8 счетов. Дыши тихо и свободно.",
          "Как это работает: Работает дыхательная аритмия: на вдохе симпатический тонус слегка разгоняет пульс, а на длинном выдохе в дело вступает блуждающий нерв (vagus nerve), подавляя частоту сердечных сокращений.",
        ],
      },
      {
        title: "МИКРОКОСМИЧЕСКАЯ ОРБИТА ВНИМАНИЯ (32 цикла)",
        lines: [
          "Вниз (при перегрузе и тревоге): Закрой глаза. На плавном выдохе медленно проведи плотный тёплый шар внимания сверху вниз по передней линии тела: макушка → лоб → челюсти → горло → грудь → живот (нижний Даньтянь) → ноги → стопы. Задержи внимание в стопах.",
          "Физиология: Уводит гиперактивный кровоток и электрический фокус от перегретых лобных зон мозга вниз, заземляя соматосенсорную кору.",
          "Вверх (при вялости и расфокусе): Сядь прямо, расправь грудь. На спокойном вдохе протяни вектор внимания снизу вверх вдоль оси позвоночника: от копчика → через поясницу → межлопаточную зону → шею → прямо в макушку. Слегка потянись макушкой вверх.",
          "Физиология: Выпрямление позвоночника стимулирует симпатический пограничный ствол и активирует ретикулярную формацию ствола мозга — твой встроенный генератор бодрствования.",
        ],
      },
      {
        title: "РАСПАКОВКА ТЕЛА («Снятие зажимов Восьми Врат», 3–5 мин)",
        lines: [
          "Врата Разума: Стисни зубы на 5 секунд, на длинном шумном выдохе полностью урони челюсть и расслабь язык.",
          "Врата Жизни: Подтяни плечи к ушам с макс. напряжением на 7 секунд, на резком выдохе брось их вниз.",
          "Пробитие кома в горле: Сделай спокойный вдох и на длинном выдохе издай вибрирующий звук «М-м-м-м» или широко зевни.",
          "Врата Боли (Освобождение диафрагмы): Полный выдох, задержка дыхания 5 секунд со втягиванием живота под рёбра, плавный вдох.",
          "Как это работает: Предельное изометрическое сокращение задействует сухожильные органы Гольджи, принудительно снимая спазм с мышц-антагонистов. Звуковая вибрация массажирует гортанный блуждающий нерв.",
        ],
      },
      {
        title: "ПРОТОКОЛ «СЭНДЗЮЦУ» («Режим Отшельника / Сенсорная перезагрузка», 5–10 мин)",
        lines: [
          "Что делать: Запечатывание движения (сядь прямо, запрети себе любые микродвижения на 2 минуты). Панорамный слух (воспринимай самый далёкий шум за окном, шорохи и дыхание одновременно). Объём и кожа (почувствуй ткань одежды, прохладу на щеках и пространство вокруг).",
          "Как это работает: Полная остановка моторной коры в комбинации с широким сенсорным сканированием гасит бета-ритмы стресса, переводя мозг в альфа/тета-диапазон (4–12 Гц) для восстановления нейроглии.",
        ],
      },
      {
        title: "ЭКСТРЕННЫЙ СБРОС АДРЕНАЛИНА («Укрощение Зверя», 2–3 мин)",
        lines: [
          "Что делать: Физическая разрядка (интенсивно тряси кистями, руками и ногами 60 секунд). Изометрический упор (толкай стену изо всех сил 10–15 секунд). Громкий выдох через рот. Заземление (стопы в пол + 3 цикла Дыхания 4/6).",
          "Как это работает: Интенсивная встряска и изометрический упор физически сжигают избыток глюкозы и гормонов стресса в мускулатуре, сигнализируя древнему стволу мозга: «Угроза позади, мобилизацию можно свернуть».",
        ],
      },
      {
        title: "ФИЛЬТР ДЕЙСТВИЯ («Выход из петли Идзанами», 2 мин)",
        lines: [
          "Что делать: Отказ от борьбы с мыслями. Задай вопрос: «Может ли эта мысль привести к конкретному физическому действию прямо сейчас, ночью в кровати?». Если Да — выгрузи в заметки. Если Нет — проговори формулу: «Я вижу эту тревогу. Прямо сейчас делать ничего не нужно. Я вернусь к этому завтра в 10:00». Перейди на удлинённый выдох.",
          "Как это работает: Снимает персеверацию дефолт-системы мозга (DMN). Выгрузка мысли или назначение времени отключает сигнал незавершённого действия, снижая кортизол до уровня синтеза мелатонина.",
        ],
      },
    ],
  },
  en: {
    intro:
      "Folding hand seals (mudras) in the real world isn't magic—it's a direct somatosensory hack of the cerebral cortex via your peripheral nervous system.",
    whyTitle: "Why It Works (The Neurobiological Foundation)",
    why: [
      "Penfield's Sensory Homunculus: On the brain's sensory-motor map, your hands, fingers, tongue, and lips take up to 30–40% of the entire motor and somatosensory area. Mechanoreceptor density in your fingertips is astronomical compared to the rest of the body.",
      "Silencing the Default Mode Network (DMN): When you spiral into anxious rumination, your DMN loops the same thoughts on repeat. Precisely and symmetrically folding complex finger geometry while focusing on pressure points instantly shifts cortical electrical activity into the parietal and motor regions, starving the overthinking loop of juice.",
      "Building a Solid Neural Anchor: Consistently pairing a specific finger configuration with a slow exhale and inner quiet builds a rock-solid reflexive pathway. In a high-stress moment during a tense meeting, you can subtly fold your fingers under the table—and your body will reflexively start dropping your heart rate.",
    ],
    catalog: "Applied Seals Catalog",
    library: "Library of Practices & Somatic Protocols",
    seals: [
      {
        id: "ram",
        title: '1. THE "RAM" SEAL (Hitsuji / Centering Core)',
        purposeLabel: "Core Purpose",
        purpose: "Instant panic reset, centering when scattered, emotional baseline leveling.",
        foldLabel: "Biomechanics (How to fold)",
        fold: "Straighten your index and middle fingers on both hands straight up vertically and press their sides pad-to-pad firmly together. Interlace your ring fingers and pinkies tightly into a solid lock. Lightly press your thumbs on top of the folded fingers. Hold the seal vertically at solar plexus or chest level. Tuck your elbows naturally to your ribs.",
        effectLabel: "Physiological Effect",
        effect: "A symmetrical rigid frame restores the proprioceptive sense of your body's vertical axis. Tucked elbows reflexively drop your shoulders, easing tension in your traps and balancing brain hemispheres.",
        pairLabel: "What to Pair With",
        pair: "3 cycles of the Physiological Sigh (nose inhale → sharp top-off inhale → long exhale through pursed lips).",
      },
      {
        id: "tiger",
        title: '2. THE "TIGER" SEAL (Torah / Igniting Will)',
        purposeLabel: "Core Purpose",
        purpose: "Breaking out of brain fog, procrastination, or apathy; mobilization before a tough call or workout.",
        foldLabel: "Biomechanics (How to fold)",
        fold: "Interlace your fingers tightly into a fist lock. Straighten both index fingers vertically and press their pads together. Straighten your thumbs and press their inner pad edges firmly together to form a sharp, directed wedge. Apply noticeable isometric pressure between the touching fingers.",
        effectLabel: "Physiological Effect",
        effect: "Strong isometric pressure in the finger lock stimulates ascending signals to the motor cortex, triggering a clean, controlled sympathetic drive (readiness for action without panic).",
        pairLabel: "What to Pair With",
        pair: 'The "Inner Elevator" practice (pulling focus upward from the tailbone to the crown along the spine).',
      },
      {
        id: "focus",
        title: "3. THE CONCENTRATION HALF-SEAL (Single Seal at the Face)",
        purposeLabel: "Core Purpose",
        purpose: "Instantly gathering scattered attention, stopping darting eyes, locking into a work tunnel.",
        foldLabel: "Biomechanics (How to fold)",
        fold: "Done with one leading hand (left or right). Straighten your index and middle fingers straight up and press them together. Curl your ring finger and pinky into your palm, securing them down with your thumb's pad. Hold the upright fingers 2–3 cm away from your chin or lips (or lightly touch your chin).",
        effectLabel: "Physiological Effect",
        effect: "Bringing your hand close to your face and stimulating the trigeminal nerve branches triggers the innate orienting reflex: your visual field centers, pupils lock onto a single task, and peripheral noise vanishes.",
        pairLabel: "What to Pair With",
        pair: "Staring fixedly at a single point for 30 seconds without blinking before a high-focus task.",
      },
      {
        id: "kai",
        title: '4. THE "GENJUTSU BREAK" SEAL (The "KAI" Lock)',
        purposeLabel: "Core Purpose",
        purpose: "Emergency stop for midnight overthinking, shattering an intrusive anxious loop, snapping out of a mental freeze.",
        foldLabel: "Biomechanics (How to fold)",
        fold: "Press your thumb's nail with maximum force straight into the center of your index finger's sensitive pad (up to the edge of controlled, sharp pain). Curl the rest of your fingers into a tight fist. Freeze the motion abruptly.",
        effectLabel: "Physiological Effect",
        effect: 'A high-intensity localized pain signal (nociceptive input) reaches the thalamus faster than emotional interpretations from the amygdala. It’s a physical "kunai to the thigh"—shattering the cognitive hallucination and slamming your awareness back into physical reality: "Finger pain is a fact, mental disaster is an illusion."',
        pairLabel: "What to Pair With",
        pair: "",
      },
    ],
    practices: [
      {
        title: 'THE BASIC PAUSE ("Return to Self")',
        lines: [
          "When to use: Hit by sudden rage, reading toxic news, or about to snap in an argument. Time: 60 seconds.",
          "What to do: Stop, foot grounding, reality calibration, separation, action choice.",
          "How it works: Breaks automatic stimulus-response loop via proprioceptive feedback.",
        ],
      },
      {
        title: "4/6 BREATHING",
        lines: [
          "When to use: Heart pounding after a scare or caffeine, bedtime anxiety. Time: 2–3 minutes.",
          "What to do: Sit comfortably, soft nose inhale for 4 counts, smooth long relaxed exhale through parted lips for 6–8 counts.",
          "How it works: Engages the vagus nerve via respiratory sinus arrhythmia to slow down heart rate.",
        ],
      },
      {
        title: "MICROCOSMIC ORBIT OF ATTENTION (32 cycles)",
        lines: [
          "Downward (for anxiety/overload): Smooth exhale guiding a dense warm attention ball down crown to soles. Shifts electrical focus away from overheated frontal lobes.",
          "Upward (for fatigue/brain fog): Steady inhale pulling attention vector upward along the spine from tailbone to crown. Stimulates reticular formation.",
        ],
      },
      {
        title: 'UNPACKING THE BODY ("Releasing the Eight Gates Armor", 3-5 min)',
        lines: [
          "Gates of Mind (clench teeth 5s, then drop the jaw).",
          "Gates of Life (shrug shoulders 7s, then drop them).",
          'Throat Lump Buster (hum "M-m-m" or yawn).',
          "Diaphragm Release (exhale, hold 5s, pull the belly up).",
          "How it works: Golgi tendon organs drop chronic spasms; sound vibration massages vagal fibers.",
        ],
      },
      {
        title: 'THE "SENNIN" PROTOCOL ("Hermit Mode / Sensory Reset", 5-10 min)',
        lines: [
          "Seal movement (no micro-movements for 2 mins). Panoramic hearing (wide acoustic field). Volume and skin (fabric, cool air, room space).",
          "How it works: Shuts down motor cortex into synchronized alpha/theta waves to let neuroglia recover.",
        ],
      },
      {
        title: 'EMERGENCY ADRENALINE FLUSH ("Taming the Beast", 2-3 min)',
        lines: [
          "Physical discharge (intensely shake hands and legs for 60s). Isometric push (push against a wall with max effort for 10–15s). Loud exhale. Grounding (feet on the floor plus 4/6 breathing).",
          "How it works: Burns off excess glucose and stress hormones, telling the brain stem the threat is over.",
        ],
      },
      {
        title: 'THE ACTION FILTER ("Breaking the Izanami Loop", 2 min)',
        lines: [
          'Stop fighting thoughts. Action Filter Question ("Can this lead to action right now in bed?"). Notes dump or schedule for tomorrow. Long exhales.',
          "How it works: Halts DMN perseveration and drops cortisol levels for sleep.",
        ],
      },
    ],
  },
};
