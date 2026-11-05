export type LoreLang = "ru" | "en";

export const chrome = {
  ru: {
    legal:
      "Zorilad — это метафорическая модель самопознания и психологического синтеза на стыке архетипов и нейробиологии. Не является медицинским диагнозом или заменой психотерапии.",
    prologueTitle: "Другой ракурс: Путь к внутреннему Хокаге",
    prologue:
      "Когда-то мы смотрели «Наруто» просто как захватывающую историю: следили за сюжетом, сопереживали героям, их одиночеству, боли и битвам на экране. Но я предлагаю взглянуть на эту вселенную под совершенно другим углом — как на карту твоего собственного сознания. Через эти знакомые с детства образы удивительно точно и наглядно раскрываются сложнейшие механизмы нашей психики и нейробиологии. Здесь путь к титулу Хокаге — это не детская мечта персонажа из аниме, а твой реальный внутренний путь становления целостным, пробуждённым и по-настоящему осознанным человеком.",
    begin: "Начать погружение",
    back: "← Назад к стихиям",
    streamOn: "🔊 ASMR: Лес и поток (Вкл)",
    streamOff: "🔊 ASMR: Лес и поток (Выкл)",
    fireOn: "🔊 ASMR: Дыхание огня (Вкл)",
    fireOff: "🔊 ASMR: Дыхание огня (Выкл)",
    woodOn: "🔊 ASMR: Шум леса (Вкл)",
    woodOff: "🔊 ASMR: Шум леса (Выкл)",
    earthOn: "🔊 ASMR: Пульс земли (Вкл)",
    earthOff: "🔊 ASMR: Пульс земли (Выкл)",
  },
  en: {
    legal:
      "Zorilad is a metaphorical model of self-knowledge and psychological synthesis, between archetypes and neurobiology. It is not a medical diagnosis or a substitute for psychotherapy.",
    prologueTitle: "A Different Angle: The Path to Your Inner Hokage",
    prologue:
      "Back in the day, we watched Naruto simply as a gripping story—following the plot, rooting for the characters, and feeling their loneliness, pain, and battles on screen. Now, I invite you to look at this universe from a completely different angle: as a map of your own mind. Through these familiar childhood archetypes, the most complex mechanisms of human psychology and neurobiology suddenly become crystal clear. Here, becoming Hokage isn't an anime character's childhood dream—it's your real-life inner journey toward becoming whole, grounded, and truly self-aware.",
    begin: "Begin the Journey",
    back: "← Back to Elements",
    streamOn: "🔊 ASMR: Forest and Stream (On)",
    streamOff: "🔊 ASMR: Forest and Stream (Off)",
    fireOn: "🔊 ASMR: Fire Breath (On)",
    fireOff: "🔊 ASMR: Fire Breath (Off)",
    woodOn: "🔊 ASMR: Forest Breeze (On)",
    woodOff: "🔊 ASMR: Forest Breeze (Off)",
    earthOn: "🔊 ASMR: Earth Pulse (On)",
    earthOff: "🔊 ASMR: Earth Pulse (Off)",
  },
} as const;

type Part = { kind: "h" | "p"; text: string };
type Tale = { title: string; lead: string; sections: { heading: string; parts: Part[] }[]; next?: string; prev?: string; after?: string };

const p = (text: string): Part => ({ kind: "p", text });
const h = (text: string): Part => ({ kind: "h", text });

export const tales: Record<"water" | "fire" | "wood" | "earth", Record<LoreLang, Tale>> = {
  water: {
    ru: {
      title: "ВОДА • Сфера Разума (Инь)",
      lead: "Гипербдительный интеллект и зеркальный лабиринт ума",
      next: "Следующая стихия: Огонь →",
      sections: [
        {
          heading: "Вступление: Битва трёх сфер",
          parts: [
            p("Общепринято считать, что у нас главный только мозг и он — центр принятия решений. Но не все учения разделяют это мнение, и некоторые предполагают, что у каждого внутри разворачивается настоящая битва трёх составляющих психоэмоциональных сфер, которые отчаянно пытаются перехватить штурвал управления над твоей жизнью."),
            p("Если вглядеться в полумрак своего сознания в обычный день недели, когда звенит будильник, когда идёшь на работу или едешь в душном автобусе, ты увидишь эту знакомую троицу. Это точнейшие архетипы твоей собственной разорванной психики, бьющиеся за выживание в теле, которому тяжело выдерживать их междоусобицы."),
            p("Когда-то мы смотрели «Наруто» просто как захватывающую историю: следили за сюжетом, сопереживали героям, их одиночеству, боли и битвам на экране. Но я предлагаю взглянуть на эту вселенную под совершенно другим углом — как на карту твоего собственного сознания. Через эти знакомые с детства образы удивительно точно и наглядно раскрываются сложнейшие механизмы нашей психики и нейробиологии. Здесь путь к титулу Хокаге — это не детская мечта персонажа из аниме, а твой реальный внутренний путь становления целостным, пробуждённым и по-настоящему осознанным человеком."),
          ],
        },
        {
          heading: "Верхняя сфера разума: Саске (Лунный полюс — Инь)",
          parts: [
            p("В верхней сфере разума сидит Саске (Лунный полюс — Инь). Это гипербдительный интеллект. Архетип Индры — холодный расчёт и логика. Тот, кто однажды пережил боль потери или предательства и поклялся больше никогда не быть застигнутым врасплох. У него вечно активированный Шаринган — режим гипервосприятия. Когда-то эмоциональная травма впрыснула в его систему такую дозу норадреналина, что мозг научился считывать микромимику, интонации и скрытые угрозы за долю секунды до возможного удара."),
            p("Он сканирует лица коллег, паузы, насмешки, чужие успехи. Он убеждён: если хоть на миг расслабить хватку и опустить меч, случится катастрофа. Это он не даёт тебе уснуть в полночь, запирая сознание в зеркальном лабиринте обдумывания старых обид и мрачных ситуаций. Его суперсила — бритвенно-острый анализ, но его проклятие — ловушка клана Учиха: избыточный Инь отрезает человека от физического тела, погружая в паранойю, изоляцию и бесконечное перепроживание ситуации, которая случилась в прошлом."),
          ],
        },
        {
          heading: "Узнать себя: Сценарии перегрузки Разума",
          parts: [
            p("Прежде чем чинить механизм, нужно увидеть, как именно эта расколотая троица управляет тобой в течение обычного дня."),
            h("Сценарий 1. Утренний экранный паралич («Ловушка на пять минут»)"),
            p("• Как это выглядит в жизни: Ты проснулся, заварил кофе и решил: «Сяду на пять минут, гляну новости, пока просыпаюсь». Через час ты всё ещё сидишь в телефоне. За этот час ты увидел жуткую аварию, кадры войны, человека со слезами о болезни, смешного кота, чужой идеальный отпуск на Бали, токсичный скандал и тревожный финансовый прогноз. Твоё тело не сдвинулось ни на сантиметр. Но когда ты наконец откладываешь телефон, ты чувствуешь себя полностью выжатым, а любая реальная работа кажется мучительно серой, медленной и неподъёмной."),
            p("• Роли внутри тебя:"),
            p("— Наруто попал на крючок дофаминового механизма."),
            p("— Саске через экран впитал десятки чужих угроз."),
            p("— Сакура сравнила твою реальность с чужим успехом и ушла в подавленность."),
            h("Сценарий 3. Полуночная мыслемешалка («Петля Идзанами»)"),
            p("• Как это выглядит в жизни: Неприятный разговор закончился ещё в три часа дня. На часах полночь. Ты лежишь в темноте, тебе завтра рано вставать, но в голове крутится бесконечный второй сезон этого диалога: «Надо было ответить иначе… А почему он вообще так сказал? А что, если теперь обо мне подумают…». Ты злишься, ворочаешься и приказываешь себе: «Всё, хватит, не думай об этом!» — и через десять секунд ловишь себя на том, что разбираешь ту же фразу по десятому кругу."),
            p("• Роли внутри тебя: Саске запер твой разум в зеркальном лабиринте, сжигая ресурсы вхолостую."),
          ],
        },
      ],
    },
    en: {
      title: "WATER • Sphere of Mind (Yin)",
      lead: "Hyper-vigilant intellect and the mirror maze of the mind",
      next: "Next Element: Fire →",
      sections: [
        {
          heading: "Introduction: The Battle of Three Spheres",
          parts: [
            p("We're taught to believe the brain is solely in charge—the single command center making all our decisions. Yet many traditions see it differently: deep inside each of us, a constant tug-of-war is raging between three psycho-emotional centers, each desperately fighting to grab the steering wheel of your life."),
            p("If you peer into the half-light of your own awareness on an ordinary weekday—when the alarm goes off, when you're walking to work or riding a crowded bus—you'll spot this familiar trio. They are razor-accurate archetypes of your own fractured psyche, fighting for survival inside a body that can barely handle their civil war."),
            p("Back in the day, we watched Naruto simply as a gripping story—following the plot, rooting for the characters, and feeling their loneliness, pain, and battles on screen. Now, I invite you to look at this universe from a completely different angle: as a map of your own mind. Through these familiar childhood archetypes, the most complex mechanisms of human psychology and neurobiology suddenly become crystal clear. Here, becoming Hokage isn't an anime character's childhood dream—it's your real-life inner journey toward becoming whole, grounded, and truly self-aware."),
          ],
        },
        {
          heading: "The Upper Sphere of Mind: Sasuke (The Lunar Pole — Yin)",
          parts: [
            p("Sitting in the upper sphere of your mind is Sasuke (the Lunar Pole — Yin). He is your hyper-vigilant intellect. The archetype of Indra—cold calculation and pure logic. The part of you that once lived through the pain of loss or betrayal and swore never to be caught off guard again. His Sharingan is permanently switched on—a state of constant hyper-perception. At some point, an emotional trauma flooded his system with such a surge of norepinephrine that your brain learned to read micro-expressions, shifts in tone, and hidden threats a split second before a blow can land."),
            p("He scans coworkers' faces, awkward pauses, subtle mockery, and other people's success. He is convinced that if he loosens his grip or lowers his blade for even a second, disaster will strike. He is the one keeping you awake at midnight, locking your awareness in a hall of mirrors, replaying old grudges and dark scenarios. His superpower is razor-sharp analysis, but his curse is the Uchiha clan trap: excessive Yin cuts you off from your physical body, pulling you into paranoia, isolation, and an endless mental replay of the past."),
          ],
        },
        {
          heading: "Recognize Yourself: Mind Overload Scenarios",
          parts: [
            p("Before you can fix the mechanism, you need to see how this fractured trio actually runs your life on a typical day."),
            h('Scenario 1. Morning Screen Paralysis ("The Five-Minute Trap")'),
            p('• How it looks in real life: You wake up, make coffee, and tell yourself: "I\'ll just sit down for five minutes and check the feed while I wake up." An hour later, you\'re still glued to your phone. In that single hour, you\'ve scrolled past a brutal car crash, war footage, someone crying about an illness, a funny cat, a stranger\'s picture-perfect Bali vacation, a toxic drama, and a grim financial forecast. Your physical body hasn\'t moved an inch. Yet when you finally put the phone down, you feel completely drained—and real-world work feels painfully dull, slow, and impossible to start.'),
            p("• The roles inside you:"),
            p("— Naruto got hooked by the dopamine slot machine."),
            p("— Sasuke absorbed dozens of strangers' threats through the screen."),
            p("— Sakura compared your reality to someone else's highlight reel and sank into adequacy anxiety."),
            h('Scenario 3. The Midnight Overthinking Loop ("The Izanami Loop")'),
            p('• How it looks in real life: An unpleasant conversation ended back at 3:00 PM. Now it\'s midnight. You\'re lying in the dark, you have to wake up early tomorrow, yet your head is running an endless Season 2 of that argument: "I should\'ve said this instead... Why did they even put it like that? What if everyone thinks..." You get frustrated, toss and turn, and order yourself: "Stop it, quit thinking about it!"—and ten seconds later, you catch yourself dissecting the exact same sentence for the tenth time.'),
            p("• The roles inside you: Sasuke has locked your mind inside a mirror maze, burning through your energy reserves in neutral gear."),
          ],
        },
      ],
    },
  },
  fire: {
    ru: {
      title: "ОГОНЬ • Первобытный Аффект (Ян)",
      lead: "Запертый зверь, подавленная ярость и животная жизненная сила",
      prev: "← Предыдущая стихия: Вода",
      after: "Следующая стихия: Дерево →",
      sections: [
        {
          heading: "Нижняя сфера: Наруто и запертый Девятихвостый",
          parts: [
            p("А в нижней сфере — на самом дне живота, там, где сплетаются все те ситуации и диалоги, которые так хочется забыть — сидит Наруто. Запертый за решёткой. Это твой первобытный аффект, твоё израненное детскими обидами и травмами неуслышанное Я. В нём запечатан Девятихвостый — концентрированная ярость, слепой страх и животная жизненная сила."),
            p("Когда социальная маска Сакуры трещит по швам, а холодный расчёт Саске не справляется с объёмом внешней триггерной информации, решётка срывается с петель и ядовитая чакра вырывается наружу: паническая атака, вспышка бессмысленной агрессии на близкого, парализующий ужас, после которого в теле остаётся лишь пепел и выжженные рецепторы."),
          ],
        },
        {
          heading: "Почему страх и гнев всегда бьют в живот?",
          parts: [
            p("Печать Девятихвостого в каноне расположена прямо на пупке — в области нижнего Даньтяня. Анатомически здесь находится энтеральная нервная система («брюшной мозг») и солнечное сплетение."),
            p("Когда Амигдала объявляет тревогу, по симпатическим нервам в живот летит приказ: «Свернуть пищеварение! Всю кровь — в крупные мышцы для боя!». Сосуды брюшной полости резко спазмируются. Именно этот сосудистый сброс ты ощущаешь как «внутри всё оборвалось», «засосало под ложечкой» или «огненная волна поднялась от живота к горлу»."),
          ],
        },
        {
          heading: "Узнать себя: Сценарии прорыва Печати",
          parts: [
            h("Сценарий 2. Внезапная паника посреди дня («Ловушка ощущений»)"),
            p("• Как это выглядит в жизни: Ты просто идёшь по торговому центру, едешь в транспорте или сидишь на встрече. Вдруг чувствуешь: сердце резко толкнулось в грудь и забилось быстрее. Внутри всё холодеет и опускается. Первая мысль: «Почему оно так колотится? Что со мной?». Ты начинаешь напряжённо прислушиваться к пульсу. От страха сердце разгоняется ещё сильнее, ладони потеют, ноги становятся ватными. Ты пытаешься судорожно набрать побольше воздуха, но от глубоких вдохов начинает кружиться голова и немеют пальцы. В голове стучит одно: «Это конец, сейчас случится катастрофа»."),
            p("• Роли внутри тебя: В подвале у Наруто дрогнула печать (вегетативный сбой), а Саске перепутал обычный физиологический сигнал с приговором смерти."),
            h("Сценарий 4. Взрыв в конфликте («Срыв печати и выход Хвостов»)"),
            p("• Как это выглядит в жизни: Близкий человек или коллега бросает резкую, несправедливую фразу. В долю секунды внутри поднимается обжигающая волна от живота к горлу. Мир сужается до лица обидчика. Ты не выбираешь выражения — из тебя вырываются самые больные, разрушительные слова: «Всё! Никогда больше!». А через час, когда буря утихает, ты сидишь в тишине, чувствуешь дикое физическое истощение и думаешь: «Зачем я вообще это сказал? Это же был не я»."),
            p("• Роли внутри тебя: Произошёл прорыв печати Девятихвостого — древняя система выживания захватила управление."),
          ],
        },
      ],
    },
    en: {
      title: "FIRE • Primal Affect (Yang)",
      lead: "The caged beast, suppressed rage, and raw life force",
      prev: "← Previous Element: Water",
      after: "Next Element: Wood →",
      sections: [
        {
          heading: "The Lower Sphere: Naruto and the Caged Nine-Tails",
          parts: [
            p("Down in the lower sphere—deep in the pit of your stomach, where all the moments and conversations you wish you could forget are tangled together—sits Naruto. Locked behind bars. He is your raw, primal affect—your wounded, unheard inner child carrying old hurts and traumas. Sealed inside him is the Nine-Tails: concentrated rage, blind terror, and untamed animal vitality."),
            p("When Sakura's polite social mask cracks under pressure, and Sasuke's cold logic can no longer process the flood of external triggers, the cage door gets blown off its hinges. Toxic chakra erupts to the surface: a full-blown panic attack, a sudden outburst of senseless anger at someone you love, or paralyzing dread—leaving nothing behind in your body but ashes and fried receptors."),
          ],
        },
        {
          heading: "Why Do Fear and Anger Always Hit You in the Gut?",
          parts: [
            p('In the canon lore, the Nine-Tails\' seal sits right over the navel—the Lower Dantian. Anatomically, this is the home of your enteric nervous system (your "second brain" in the gut) and the solar plexus.'),
            p('The moment your Amygdala sounds the alarm, an emergency order shoots down your sympathetic nerves straight to your gut: "Shut down digestion! Reroute all blood to the major muscle groups for combat!" The blood vessels in your abdomen clamp down instantly. That sudden vascular drop is the exact physical sensation you know as "my stomach just dropped," "a pit in my gut," or "a wave of heat rising from my belly to my throat."'),
          ],
        },
        {
          heading: "Recognize Yourself: When the Seal Breaks",
          parts: [
            h('Scenario 2. Sudden Midday Panic ("The Sensation Trap")'),
            p('• How it looks in real life: You\'re just walking through a mall, riding in traffic, or sitting in a meeting. Out of nowhere, your heart thuds hard against your ribs and starts racing. Everything inside you goes cold and drops. Your first thought is: "Why is it beating like that? What\'s wrong with me?" You start tensely monitoring your own pulse. That fear makes your heart race even faster; your palms sweat and your legs turn to jelly. You desperately try to gulp down deeper breaths, but over-breathing only makes you dizzy and leaves your fingers tingling. One thought hammers in your skull: "This is it—something terrible is about to happen."'),
            p("• The roles inside you: Down in Naruto's basement, the seal just flickered (an autonomic glitch)—and Sasuke mistook a harmless bodily fluctuation for a death sentence."),
            h('Scenario 4. Exploding in an Argument ("Breaking the Seal & Releasing the Tails")'),
            p('• How it looks in real life: A partner, family member, or coworker throws a sharp, unfair remark at you. In a split second, a scorching wave surges from your gut straight up to your throat. The entire world narrows down to the other person\'s face. You stop filtering your words—the most cutting, destructive phrases tear right out of your mouth: "That\'s it! We\'re done!" An hour later, once the storm clears, you\'re sitting in silence, physically wiped out, thinking: "Why did I even say that? That wasn\'t me."'),
            p("• The roles inside you: The Nine-Tails broke through the seal—your ancient survival system hijacked the controls."),
          ],
        },
      ],
    },
  },
  wood: {
    ru: {
      title: "ДЕРЕВО • Физиология и Нейробиология",
      lead: "Как устроена связь твоего ума, тела и нервной системы",
      prev: "← Предыдущая стихия: Огонь",
      after: "Следующая стихия: Земля →",
      sections: [
        {
          heading: "Что такое Чакра?",
          parts: [
            p("В древнем каноне шиноби чакра не возникает из пустоты и не является магией. На языке нейробиологии это высшая форма единства ума и тела — нейровегетативная когерентность, возникающая только тогда, когда сливаются воедино две половины твоего существа:"),
            p("• Физическая энергия (Ян — Соматический фундамент): Это ресурс триллионов твоих клеток. Запасы АТФ в митохондриях, уровень гликогена, насыщенность тканей кислородом, свободный тонус мышц и способность мозга слышать сигналы внутренних органов (интероцепция)."),
            p("• Духовная энергия (Инь — Кортикальный вектор): Это сила твоего Неокортекса (префронтальной коры). Способность удерживать фокус внимания, тормозить первые автоматические импульсы и направлять волю в одну точку, несмотря на шум и помехи."),
          ],
        },
        {
          heading: "Три уровня мозга в борьбе за доминирование",
          parts: [
            p("Чтобы понять, почему в стрессе мгновенно отключается логика, нейробиология использует рабочую модель трёх уровней управления:"),
            p("• Рептильный мозг (ствол мозга и базальные ганглии): Древнейший автопилот. Отвечает за базовое выживание, пульс, дыхание и мгновенные животные реакции: бей, беги, замри."),
            p("• Лимбическая система (средний уровень — «животный разум»): Центр эмоций, памяти и социальных связей. Здесь сидят Амигдалы (миндалевидные тела) — твоя внутренняя служба безопасности. Охране не нужны стопроцентные доказательства опасности, ей достаточно ответа «Возможно», потому что эволюционно выгоднее десять раз испугаться тени, чем один раз пропустить реального хищника."),
            p("• Неокортекс / Префронтальная кора (DLPFC — «Внутренний Мудрец»): Эволюционно самая новая кора. Она планирует, сравнивает варианты, тормозит животные порывы и рассчитывает последствия."),
          ],
        },
        {
          heading: "Газ и Тормоз: Солнце (Ян) и Луна (Инь) вегетативной системы",
          parts: [
            p("Твоя автономная нервная система управляет внутренними органами без твоего сознательного участия, балансируя между двумя режимами:"),
            p("• Симпатическая система (Педаль Газа / Ян):"),
            p("Экстренная мобилизация: опасность, конфликт, спорт, охота. Выброс адреналина (разгон сердца) и норадреналина (сужение внимания на угрозе). Гипоталамус → Гипофиз → Кора надпочечников → Кортизол. Колотится сердце, потеют ладони, каменеют плечи, сохнет во рту, скручивает живот."),
            p("• Парасимпатическая система (Педаль Тормоза / Инь):"),
            p("Восстановление ресурсов (rest and digest), пищеварение, сон, заживление. Блуждающий нерв (Vagus): главный путь парасимпатики, идущий к сердцу, лёгким и животу; нейромедиаторы ацетилхолин и ГАМК. Ровный пульс, тёплые руки, мягкий живот, глубокое спокойное дыхание."),
            p("Адреналин и кортизол — не враги и не «яд». Это великолепная система спасения жизни. Слом современного человека заключается в том, что педаль газа нажимается десятки раз за день (на каждый пуш в мессенджере, каждый рилс в инстаграм или тикток, тревожную новость), а физического сброса и нажатия на тормоз не происходит. Ось стресса работает на износ."),
          ],
        },
      ],
    },
    en: {
      title: "WOOD • Physiology & Neurobiology",
      lead: "How your mind, body, and nervous system are wired together",
      prev: "← Previous Element: Fire",
      after: "Next Element: Earth →",
      sections: [
        {
          heading: "What Is Chakra, Really?",
          parts: [
            p("In ancient shinobi lore, chakra doesn't appear out of thin air, and it isn't magic. In the language of neurobiology, it is the highest form of mind-body unity—neuro-autonomic coherence—which only ignites when the two halves of your being merge into one:"),
            p("• Physical Energy (Yang — The Somatic Foundation): This is the raw fuel of your trillions of cells. Your mitochondrial ATP reserves, glycogen levels, tissue oxygenation, unblocked muscle tone, and your brain's ability to clearly read signals from your internal organs (interoception)."),
            p("• Spiritual Energy (Yin — The Cortical Vector): This is the executive power of your Neocortex (prefrontal cortex). Your capacity to hold laser focus, override knee-jerk impulses, and direct your will toward a single point despite all the noise and distractions."),
          ],
        },
        {
          heading: "Three Brain Levels Fighting for Dominance",
          parts: [
            p("To understand why logic vanishes the second you're stressed, neuroscience uses a practical three-tier model of control:"),
            p("• The Reptilian Brain (Brainstem & Basal Ganglia): Your oldest survival autopilot. It runs basic life support—heart rate, breathing, and instant primal reflexes: fight, flight, or freeze."),
            p('• The Limbic System (Middle Tier — "The Emotional Brain"): The hub of emotions, memory, and social bonding. Right here sit your Amygdalae—your internal security detail. Your security guards don\'t wait for 100% proof of danger; a simple "Maybe" is enough to pull the trigger, because evolutionarily it\'s much safer to jump at ten shadows than to miss one real predator.'),
            p('• The Neocortex / Prefrontal Cortex (DLPFC — "The Inner Sage"): Evolutionarily the newest layer of the brain. It plans ahead, weighs options, puts the brakes on animal impulses, and calculates long-term consequences.'),
          ],
        },
        {
          heading: "The Gas and the Brake: Sun (Yang) and Moon (Yin) of Your Nervous System",
          parts: [
            p("Your autonomic nervous system runs your internal organs behind the scenes without your conscious effort, constantly balancing between two modes:"),
            p("• The Sympathetic Nervous System (The Gas Pedal / Yang):"),
            p("Emergency mobilization: danger, conflict, competition, the hunt. A surge of adrenaline (racing heart) and norepinephrine (tunnel vision locked onto the threat). Hypothalamus → Pituitary → Adrenal Cortex → Cortisol. Pounding heart, sweaty palms, rock-hard shoulders, dry mouth, knotted stomach."),
            p("• The Parasympathetic Nervous System (The Brake Pedal / Yin):"),
            p("Deep recovery (rest and digest), digestion, sleep, cellular repair. The Vagus Nerve: the master highway of the parasympathetic system running down to your heart, lungs, and gut, powered by acetylcholine and GABA. Steady pulse, warm hands, soft belly, slow and effortless breathing."),
            p('Adrenaline and cortisol aren\'t the enemy, and they aren\'t "poison." They are a brilliant life-saving system. The breakdown of the modern human happens because you slam the gas pedal dozens of times a day—at every messenger ping, every Instagram reel or TikTok, every alarming headline—without ever physically burning off the fuel or pressing the brake. Your stress axis is running itself into the ground.'),
          ],
        },
      ],
    },
  },
  earth: {
    ru: {
      title: "ЗЕМЛЯ • Границы и Тело",
      lead: "Социальный контур, мышечный панцирь и подавленный голос",
      prev: "← Предыдущая стихия: Дерево",
      after: "Перейти к центру: Эфир ✦",
      sections: [
        {
          heading: "Средняя сфера: Сакура (Социальный контур и Граница тела)",
          parts: [
            p("В средней сфере замерла Сакура (Социальный контур и Граница тела). Это твоя выученная маска «правильного человека». Она безупречно вызубрила все правила деревни: как вежливо отвечать, когда на тебя давят, как улыбаться сквозь зубы, как быть удобным, продуктивным и предсказуемым. Она прочитала десятки книг по психологии и искренне старается «держать лицо»."),
            p("Но посмотри на её каменные плечи и сжатые челюсти. За этим гладким фасадом прячется глубокое внутреннее расщепление — та самая дикая, яростная, живая часть тебя, которую с детства заставляли заткнуться ради социального одобрения. Внутренняя Сакура колотит кулаками изнутри, когда ты молча проглатываешь грубость, взваливаешь на себя чужую работу или предаёшь себя ради того, чтобы угодить другим. На удержание этой маски уходит колоссальный объём сил: тело каменеет, превращаясь в сплошной мышечный панцирь, а в горле застревает невысказанный крик."),
          ],
        },
        {
          heading: "Узнать себя: Когда маска врастает в тело",
          parts: [
            h("Сценарий 5. Синдром «удобного человека» («Каменный панцирь и ком в горле»)"),
            p("• Как это выглядит в жизни: Тебя просят сделать то, чего ты категорически не хочешь, или нарушают твои границы. Внутри всё сжимается от протеста, но ты выдавливаешь вежливую улыбку: «Да, конечно, всё нормально». В эту же секунду плечи наливаются свинцом, челюсти сводит, а в горле встаёт плотный, удушающий ком. Ты берёшь на себя чужую задачу или проглатываешь обиду, но внутри закипает глухая злость — уже не только на другого человека, но и на самого себя за малодушие. К вечеру раскалывается голова, шея не поворачивается, а сил не остаётся даже на простые дела."),
            p("• Роли внутри тебя: Сакура намертво зацементировала социальную маску «хорошего человека», заперев живой протест Наруто внутри собственного тела, а Саске тут же начал оправдывать эту капитуляцию «разумными» доводами («не время для конфликта», «проще согласиться»)."),
          ],
        },
        {
          heading: "Жизнь в расколе трёх сфер",
          parts: [
            p("Обычный человек проживает так всю жизнь. Интеллект презирает эмоции. Социальная маска пытается заглушить животный инстинкт. А инстинкт, запертый в клетке, регулярно напоминает о себе, зачастую в те моменты, когда ничего не предвещало беды..."),
            p("Путь к целостности — это не поиск благостного покоя в позе лотоса и не аффирмации об успешном успехе. Это честный путь внутрь себя, где придётся придумать, как подружить эти три противоположные силы внутри себя."),
          ],
        },
      ],
    },
    en: {
      title: "EARTH • Boundaries & Body",
      lead: "The social mask, muscular armor, and the unspoken voice",
      prev: "← Previous Element: Wood",
      after: "Enter the Center: Aether ✦",
      sections: [
        {
          heading: "The Middle Sphere: Sakura (Social Contour & Body Boundary)",
          parts: [
            p('Frozen in the middle sphere is Sakura (your Social Contour and Body Boundary). She is your learned mask of the "good, proper person." She has memorized every rule of the village by heart: how to answer politely when someone pushes you around, how to smile through clenched teeth, how to stay convenient, productive, and predictable. She has read dozens of self-help books and genuinely tries to "keep it together."'),
            p("But look at her stone-hard shoulders and clenched jaw. Behind that smooth facade hides a deep internal split—that wild, fierce, intensely alive part of you that was told to shut up since childhood in exchange for social approval. Inner Sakura pounds her fists from the inside every time you silently swallow disrespect, take on someone else's workload, or betray yourself just to keep the peace. Holding up that mask drains a massive amount of energy: your body turns to stone, locking into a full-body muscular armor, while an unspoken scream gets lodged in your throat."),
          ],
        },
        {
          heading: "Recognize Yourself: When the Mask Fuses with the Body",
          parts: [
            h('Scenario 5. The "People-Pleaser" Syndrome ("Stone Armor & A Lump in the Throat")'),
            p('• How it looks in real life: Someone asks you to do something you dead-set don\'t want to do, or crosses your line. Everything inside you clenches in protest, yet you force out a polite smile: "Yeah, sure, no problem at all." That very second, your shoulders fill with lead, your jaw locks up, and a tight, suffocating lump forms in your throat. You take on the extra burden or swallow the insult, while a dull rage starts simmering inside—aimed not just at the other person, but at yourself for caving in. By evening, your head is splitting, your neck is stiff, and you have zero energy left even for basic things.'),
            p('• The roles inside you: Sakura cemented the "nice person" social mask in place, trapping Naruto\'s living protest inside your own tissues, while Sasuke immediately stepped in to rationalize the surrender with "logical" excuses ("now isn\'t the time for a fight," "it\'s easier to just say yes").'),
          ],
        },
        {
          heading: "Living in the Split of Three Spheres",
          parts: [
            p("The average person lives their entire life this way. The intellect despises emotions. The social mask tries to suffocate primal instinct. And the instinct, locked inside its cage, regularly makes its presence known—often at the exact moments when nothing seemed wrong on the surface..."),
            p("The path to wholeness isn't about chasing blissful peace in a lotus pose or repeating toxic-positivity affirmations about success. It is an honest journey inward, where you have to learn how to unite these three opposing forces inside yourself."),
          ],
        },
      ],
    },
  },
};
