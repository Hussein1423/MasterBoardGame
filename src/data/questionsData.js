// ==========================================
// 1. Direct Questions (الأسئلة المباشرة - 60s)
// ==========================================
export const DIRECT_QUESTIONS = [
  {
    id: "dir-mha-endeavor-realname",
    anime: "My Hero Academia",
    question: "ما اسم إنديفور الحقيقي؟",
    answer: "إنجي تودوروكي (Enji Todoroki)",
    points: 250,
  },
  {
    id: "dir-naruto-chibaku",
    anime: "Naruto",
    question:
      "ما اسم التقنية الأسطورية التي ابتكرها حكيم المسارات الستة قديماً واستُخدمت لختم وتشكيل قمر الجيوبي؟",
    answer: "تشيباكو تينسي (Chibaku Tensei)",
    points: 300,
  },
  {
    id: "dir-mha-deku-hero-name",
    anime: "My Hero Academia",
    question:
      "ما هو اللقب البطولي الذي اختاره إيزوكو ميدوريا لنفسه رسمياً في أكاديمية الأبطال؟",
    answer: "ديكو (Deku)",
    points: 150,
  },
  {
    id: "dir-mha-endeavor-daughter",
    anime: "My Hero Academia",
    question: "ما اسم ابنة إنديفور الوحيدة والشقيقة الكبرى لشوتو تودوروكي؟",
    answer: "فويومي تودوروكي (Fuyumi Todoroki)",
    points: 300,
  },
  {
    id: "dir-aot-pastor-nick",
    anime: "Attack on Titan",
    question:
      "ما اسم رجل الدين والقس المتشدد التابع لكنيسة الجدران الذي كان يعلم بسر وجود العمالقة داخل الأسوار؟",
    answer: "القس نيك (Pastor Nick)",
    points: 350,
  },

  {
    id: "dir-bleach-nemu-promotion",
    anime: "Bleach",
    question:
      "في أي طور أو نموذج من أطوار مشروع 'نيمو' تمت ترقية مايوري كوروتسوتشي ليصبح قائداً للفرقة الثانية عشرة ورئيساً لمعهد أبحاث الشينغامي؟",
    answer: "نيمو الخامس ",
    points: 250,
  },
  {
    id: "dir-bleach-haschwalth-epithet",
    anime: "Bleach",
    question:
      "إلى ماذا يرمز الحرف 'B' الممنوح لجوغرام هاسشفالت (قائد فرسان الشتيرنريتر) من قِبل يوهاباخ؟ وما اسم قدرته؟",
    answer: "الميزان / الموازنة (The Balance)",
    points: 250,
  },
  {
    id: "dir-bleach-first-quincy-letter",
    anime: "Bleach",
    question:
      "من هو أول كوينشي في التاريخ منحه يوهاباخ حرفاً من الحروف الأبجدية (Schrift) ؟",
    answer: "حرف X / ليلي بارو (Lille Barro)",
    points: 300,
  },
];

// ==========================================
// 2. Multiple Choice Questions (اختيار من متعدد)
// ==========================================
export const MCQ_QUESTIONS = [
  {
    id: "mcq-1",
    anime: "Attack on Titan",
    question:
      "من كان أول ضحية تسقط من فرقة ليفاي الخاصة عند ملاحقة العملاقة الأنثى لهم؟",
    options: ["بيترا رال", "أولو بوزادو", "غونتر شولتز", "إلد جين"],
    correctIndex: 2,
    correctAnswer: "غونتر شولتز",
    points: 200,
  },
  {
    id: "mcq-bleach-nemu-version",
    anime: "Bleach",
    question:
      "ما هو رقم إصدار الجسد الاصطناعي الحالي لنيمو (Nemu Kurotsuchi) نائبة القائد مايوري التي ظهرت طوال أحداث الأنمي؟",
    options: ["نيمو 4", "نيمو 5", "نيمو 6", "نيمو 7"],
    correctIndex: 3,
    correctAnswer: "نيمو 7",
    points: 150,
  },
  {
    id: "mcq-bleach-bankai",
    anime: "Bleach",
    question:
      "ما هو اسم المرحلة الثانية والنهائية لإطلاق كامل طاقة الزانباكتو في بليتش؟",
    options: [
      "شيكاي (Shikai)",
      "بانكاي (Bankai)",
      "ريسوراكشن (Resurrección)",
      "فولبرينغ (Fullbring)",
    ],
    correctIndex: 1,
    correctAnswer: "بانكاي (Bankai)",
    points: 100,
  },
  {
    id: "mcq-aot-thunderspears",
    anime: "Attack on Titan",
    question:
      "ما هو السلاح المبتكر ذو الرؤوس المتفجرة الذي طوّره فيلق الاستطلاع لاختراق درع العملاق المدرع وتفجيره من الداخل؟",
    options: [
      "نصال الفولاذ فائق الصلابة",
      "رماح الرعد",
      "مدافع الشلل الحركي",
      "قذائف حجر الجليد المتفجر",
    ],
    correctIndex: 1,
    correctAnswer: "رماح الرعد",
    points: 150,
  },
  {
    id: "mcq-hxh-zetsu",
    anime: "Hunter x Hunter",
    question:
      "ما اسم المهارة الدفاعية الأساسية في النين التي تعتمد على إغلاق مسام الشاكرا/النين بالكامل لإخفاء الهالة والوجود عن الخصوم؟",
    options: ["تين (Ten)", "زيتسو (Zetsu)", "رين (Ren)", "هاتسو (Hatsu)"],
    correctIndex: 1,
    correctAnswer: "زيتسو (Zetsu)",
    points: 100,
  },
  {
    id: "mcq-aot-14th-commander",
    anime: "Attack on Titan",
    question:
      "من هي الشخصية التي تم تعيينها رسمياً كالقائد الرابع عشر (14th Commander) لفيلق الاستطلاع؟",
    options: ["إروين سميث", "هانجي زوي", "أرمين أرليرت", "كيث شاديس"],
    correctIndex: 1,
    correctAnswer: "هانجي زوي",
    points: 150,
  },
];

// ==========================================
// 3. Character Guessing (خمن الشخصية والتلميحات)
// ==========================================
export const SILHOUETTE_QUESTIONS = [
  {
    id: "sil-2",
    type: "silhouette",
    anime: "Attack on Titan",
    basePoints: 150,
    question: "من هي هذه الشخصية؟",
    initialHint:
      'هو المحارب الذي ورث "عملاق الفك" مباشرة بعد استعادة مارلي للقوة من يومير.',
    additionalHints: [
      "هو الأخ الأصغر لمارسيل غاليرد، وكان يكره راينر لاعتقاده بأنه لا يستحق درع المحاربين.",
      "أصيب بجروح بالغة في غزو شيغانشينا وضحى بنفسه ليأكله فالكو لإنقاذ راينر.",
    ],
    characterName: "بوركو غاليرد (Porco Galliard)",
    correctAnswer: "بوركو غاليرد (Porco Galliard)",
    avatarConfig: {
      symbol: "🦷",
      color: "#FF9800",
      hairStyle: "شعر أشقر مصفف للخلف وبنية محارب قوية",
    },
  },
  {
    id: "sil-aot-mike",
    type: "silhouette",
    anime: "Attack on Titan",
    basePoints: 500,
    question: "من هي هذه الشخصية؟",
    initialHint:
      "يُصنف رسمياً كثاني أقوى جندي بشري داخل الأسوار بعد القائد ليفاي أكرمان.",
    additionalHints: [
      "شغل منصب النائب الأول والمساعد الأقرب للقائد إروين سميث ويمتلك حاسة شم خارقة لتمييز العمالقة.",
      "هو أول جندي بشري يلتقي بالعملاق القرد (زيك) ويتحدث إليه مباشرة قبل نهايته المأساوية.",
    ],
    characterName: "مايكي زاكارياس (Mike Zacharias)",
    correctAnswer: "مايكي زاكارياس (Mike Zacharias)",
    avatarConfig: {
      symbol: "👃",
      color: "#8D6E63",
      hairStyle: "شعر أشقر مقسم مع لحية شقراء خفيفة وبنية جسدية ضخمة",
    },
  },
  {
    id: "sil-hxh-peggy",
    type: "silhouette",
    anime: "Hunter x Hunter",
    basePoints: 500,
    question: "من هي هذه الشخصية؟",
    initialHint:
      "أول نملة كيميرا تجرأت على التحدث إلى الملك ميرويم فور ولادته العنيفة وخروجه من بطن أمه.",
    additionalHints: [
      "قائد سرب بارز في العش تميز بشغفه الشديد بالقراءة وكان مسؤولاً عن جمع الكتب ونقل المعرفة والعلوم للنمل.",
      "قُتل بضربة ذيل خاطفة ومباشرة من الملك ميرويم بمجرد أن ركض وتدخل لمحاولة علاج الملكة المصابة.",
    ],
    characterName: "بيغي (Peggy)",
    correctAnswer: "بيغي (Peggy)",
    avatarConfig: {
      symbol: "📖",
      color: "#546E7A",
      hairStyle: "مظهر يشبه طائر البطريق يرتدي نظارات طبية وقبعة صغيرة",
    },
  },
  {
    id: "sil-mha-mirko",
    type: "silhouette",
    anime: "My Hero Academia",
    basePoints: 400,
    question: "من هي هذه الشخصية؟",
    initialHint:
      "احتُل من قِبلها المركز الخامس (No. 5) في الترتيب الرسمي للائحة أبطال اليابان المحترفين.",
    additionalHints: [
      "اقتُحمت بواسطتها خطوط الدفاع الأمامية لمستشفى جاكو بمفردها فور كشف الهوية السرية للطبيب غاراكي.",
      "رُغم استنزاف دمائها وتكالب النومو الخارقين عليها، وُجّهت ركلة ساحقة بكل قوة إلى كبسولة التعديل البيولوجي فحُطّم زجاجها، مما أفسد اكتمال دمج جسد شيغاراكي بنسبة 100% وأُوقظ قبل أوانه.",
    ],
    characterName: "ميروكو (Mirko / Rumi Usagiyama)",
    correctAnswer: "ميروكو (Mirko / Rumi Usagiyama)",
    avatarConfig: {
      symbol: "🐰",
      color: "#D81B60",
      hairStyle:
        "شعر أبيض طويل ممتد مع أذني أرنب وبشرة سمراء بنية وبنية عضلية قوية",
    },
  },
  {
    id: "sil-mha-twice",
    type: "silhouette",
    anime: "My Hero Academia",
    basePoints: 400,
    question: "من هي هذه الشخصية؟",
    initialHint:
      "أُدخل أوفر هول (Overhaul) إلى المستودع السري لعصبة الأشرار بواسطته، مما مهد لبدء التحالف بين الطرفين.",
    additionalHints: [
      "صودق البطل الخفي هوكس (Hawks) من قِبله واعتُبر صديقاً مقرباً ومخلصاً للجبهة، دون إدراك لكونه جاسوساً متخفياً لصالح الأبطال.",
      "استُخدمت ميزته المسماة 'المضاعفة' (Double) لصنع جيوش لا نهائية من النسخ، قبل أن تُنهى حياته في مواجهة مأساوية من الخلف.",
    ],
    characterName: "توايس (Twice / Jin Bubaigawara)",
    correctAnswer: "توايس (Twice / Jin Bubaigawara)",
    avatarConfig: {
      symbol: "🎭",
      color: "#212121",
      hairStyle: "قناع أسود ورمادي كامل يغطي الوجه مع خطوط بيضاء مميزة للعينين",
    },
  },
];

// ==========================================
// 4. Speed Challenges (تحديات السرعة والتعداد المدمجة - 30s)
// ==========================================
export const SPEED_CHALLENGES = [
  {
    id: "chal-4",
    anime: "Naruto",
    title: "مستخدمو المانجيكيو شارينغان",
    prompt:
      "اذكر 4 مستخدمين لعين المانجيكيو شارينغان (Mangekyo Sharingan) في عشيرة الأوتشيها خلال 30 ثانية.",
    answer:
      "إيتاتشي أوتشيها، ساسكي أوتشيها، مادارا أوتشيها، إيزونا أوتشيها، أوبيتو أوتشيها، شيسوي أوتشيها، فوغاكو أوتشيها، إندرا أوتسوتسوكي.",
    points: 100,
    timeLimit: 30,
  },

  {
    id: "chal-sins-members",
    anime: "The Seven Deadly Sins",
    title: "أعضاء الخطايا وخطاياهم",
    prompt:
      "اذكر 5 من أعضاء فرقة الخطايا مع ذكر الخطيئة المنسوبة لكل شخصية منهم خلال 30 ثانية.",
    answer:
      "ميليوداس (خطيئة الغضب)، بان (خطيئة الجشع)، كينغ (خطيئة الكسل)، ديان (خطيئة الحسد)، غوثر (خطيئة الشهوة)، ميرلين (خطيئة الشراهة)، إسكانور (خطيئة الكبرياء).",
    points: 250,
    timeLimit: 35,
  },
  {
    id: "chal-mha-fire-users",
    anime: "My Hero Academia",
    title: "مستخدمو عنصر النار",
    prompt:
      "اذكر 4 شخصيات تستخدم قدرات أو ميزات تعتمد على النار أو اللهب في My Hero Academia خلال 30 ثانية.",
    answer:
      "إنديفور (إنجي تودوروكي)، شوتو تودوروكي، دابي (تويا تودوروكي)، باكوغو كاتسوكي (انفجارات تعتمد على إشعال العرق)، إيغنيوم، مانيت (والد ديكو لديه تنفس ناري).",
    points: 200,
    timeLimit: 30,
  },

  {
    id: "chal-naruto-ice-users",
    anime: "Naruto",
    title: "مستخدمو عنصر الجليد",
    prompt:
      "اذكر شخصيتين (2) استخدمتا أسلوب الجليد (Hyōton) في عالم ناروتو خلال 30 ثانية.",
    answer:
      "هاكو (عشيرة يوكي)، كاجويا أوتسوتسوكي، كاكاشي هاتاكي (في روايات شيندن)، فوبوكي كاكوي، روكا روروكي، ناداري روغا.",
    points: 250,
    timeLimit: 30,
  },

  {
    id: "chal-anime-org-leaders",
    anime: "أنميات متعددة",
    title: "قادة ورؤساء المنظمات",
    prompt:
      "اذكر 5 رؤساء أو قادة لمنظمات سرية أو إجرامية من 5 أنميات مختلفة خلال 20 ثانية.",
    answer:
      "1. باين / ناغاتو (منظمة الأكاتسوكي - Naruto)\n2. كورولو لوسيلفر (عصابة غينيه ريودان - Hunter x Hunter)\n3. تومورا شيغاراكي / أول فور ون (عصبة الأشرار - My Hero Academia)\n4. يوهاباخ (فرسان الواندنريتش / الشتيرنريتر - Bleach)\n5. كينباتشي دوتو / كينتوكي أو دون كيشوت دوفلامينغو (عائلة دون كيشوت - One Piece)\n(أمثلة أخرى مقبولة: ماكوتو شيشيو، كاي تشيساكي / أوفرهول).",
    points: 250,
    timeLimit: 20,
  },
];

// ==========================================
// 5. Strategic Lucky Buffs (صناديق الحظ التكتيكية)
// ==========================================
export const LUCKY_BUFFS = [
  {
    id: "buff-advance-1",
    name: "دفعة شينوبي خاطفة (+1 خانة)",
    description: "تحصل على دفعة سرعة فورية وتتقدم خانة واحدة للأمام!",
    type: "ADVANCE",
    tiles: 1,
    icon: "⚡",
  },
  {
    id: "buff-advance-3",
    name: "قفزة الكنز الأسطوري (+3 خانات)",
    description: "رياح السفينة تدفعك بقوة لتتقدم 3 خانات كاملة للأمام!",
    type: "ADVANCE",
    tiles: 3,
    icon: "🌟",
  },
  {
    id: "buff-shield",
    name: "درع السوسانو الحامي (Shield)",
    description:
      "يُحفظ في حقيبتك ليمتص الفخ القادم تلقائياً ويحميك من أي عقوبة أو هجوم من الخصم!",
    type: "SHIELD",
    icon: "🛡️",
  },
  {
    id: "buff-double",
    name: "جرعة الطاقة المضاعفة (2x Double Points)",
    description:
      "تضاعف نقاط سؤالك القادم بنسبة 100% في حال الإجابة الصحيحة فقط!",
    type: "DOUBLE_POINTS",
    icon: "🔥",
  },
  {
    id: "buff-time",
    name: "ساعة الرمل السحرية (+30 ثانية)",
    description: "تمنحك +30 ثانية إضافية في عداد وقت السؤال أو التحدي القادم!",
    type: "BONUS_TIME",
    icon: "⏳",
  },
  {
    id: "buff-deflect",
    name: "مرآة العواكس النادرة (Question Deflection)",
    description:
      "تحوّل سؤالك الحالي للخصم! إذا أجاب بشكل صحيح تكسب أنت نصف نقاط السؤال ولا يكسب هو شيئاً، وإذا أخطأ يخسر هو نصف نقاط السؤال ولا تكسب أنت شيئاً.",
    type: "DEFLECTION",
    icon: "🪞",
  },
  {
    id: "buff-time-drain",
    name: "لعنة استنزاف الوقت (-20s للخصم)",
    description:
      "تخصم 20 ثانية كاملة من عداد وقت السؤال أو التحدي القادم للخصم!",
    type: "OPPONENT_TIME_DRAIN",
    icon: "⌛",
  },
  {
    id: "buff-free-hint",
    name: "عين البصيرة (تلميح مجاني)",
    description:
      "تسمح لك بكشف تلميح إضافي واحد في أسئلة التخمين مجاناً دون خصم 50% من النقاط! (تنبيه: كشف التلميح الأخير بعد ذلك يلغي نقاط السؤال تماماً لتصبح 0 نقطة).",
    type: "FREE_HINT",
    icon: "👁️",
  },
  // {
  //   id: "buff-reroll",
  //   name: "لفافة إعادة التدوير (Reroll)",
  //   description:
  //     "تمنحك حق إعادة تدوير النرد فوراً إذا لم تعجبك النتيجة الأولى قبل التحرك!",
  //   type: "REROLL",
  //   icon: "🎲",
  // },
];

// ==========================================
// 6. Trap Penalties (أفخاخ وعقوبات الشينوبي)
// ==========================================
export const TRAP_PENALTIES = [
  {
    id: "trap-points-100",
    name: "سرقة التشاكرا (-100 نقطة)",
    description: "فقدت جزءاً من طاقتك وخسرت 100 نقطة من رصيدك الإجمالي!",
    type: "DEDUCT_POINTS",
    points: 100,
    icon: "🩸",
  },
  {
    id: "trap-points-200",
    name: "لعنة العمالقة (-200 نقطة)",
    description: "هجوم مباغت يخصم 200 نقطة كاملة من رصيدك!",
    type: "DEDUCT_POINTS",
    points: 200,
    icon: "💔",
  },
  {
    id: "trap-freeze",
    name: "تجميد جليدي (Freeze Turn)",
    description: "تم تجميدك في مكانك! سيتم تخطي دورك القادم في الجولة!",
    type: "FREEZE",
    icon: "🧊",
  },
  {
    id: "trap-half-time",
    name: "ضغط الأدرينالين (نصف الوقت 30s)",
    description:
      "يتناقص وقت سؤالك القادم إلى النصف (30 ثانية بدلاً من 60 ثانية)!",
    type: "HALF_TIME",
    icon: "⚠️",
  },
  {
    id: "trap-skip-question",
    name: "ضباب النسيان (تفويت السؤال)",
    description:
      "عند وقوفك على خانة سؤال قادمة، يتم تخطي السؤال تماماً دون أن يظهر وكأنك في منطقة آمنة!",
    type: "SKIP_QUESTION",
    icon: "🌫️",
  },
  {
    id: "trap-high-dice",
    name: "نرد الأرقام العليا (4 - 6 فقط)",
    description:
      "تقييد النرد في دورك القادم ليقتصر التحريك على الأرقام [4, 5, 6] فقط، مما يجعلك تقفز وتفوت خانات الأسئلة وفرص كسب النقاط!",
    type: "HIGH_DICE",
    icon: "🎯",
  },
  // {
  //   id: "trap-silent-advance",
  //   name: "خطوات شبحية (+2 بدون تفعيل)",
  //   description:
  //     "تتقدم خطوتين للأمام فوراً ولكن دون تفعيل تأثير الخانة التي تقف عليها!",
  //   type: "SILENT_ADVANCE",
  //   tiles: 2,
  //   icon: "👻",
  // },
];

// ==========================================
// 7. Avatars
// ==========================================
export const AVATARS = [
  {
    id: "naruto",
    name: "ناروتو أوزوماكي",
    anime: "Naruto",
    symbol: "🍥",
    color: "#FF6B00",
    tagline: "طريق النينجا الخاص بي!",
  },
  {
    id: "luffy",
    name: "مونكي دي لوفي",
    anime: "One Piece",
    symbol: "🍖",
    color: "#E53935",
    tagline: "سأصبح ملك القراصنة!",
  },
  {
    id: "eren",
    name: "إيرين ييغر",
    anime: "Attack on Titan",
    symbol: "🗝️",
    color: "#00897B",
    tagline: "سأقاتل من أجل الحرية!",
  },
  {
    id: "zoro",
    name: "رورونوا زورو",
    anime: "One Piece",
    symbol: "⚔️",
    color: "#43A047",
    tagline: "لن أهزم مجدداً أبداً!",
  },
  {
    id: "gojo",
    name: "غوجو ساتورو",
    anime: "Jujutsu Kaisen",
    symbol: "🤞",
    color: "#00ACC1",
    tagline: "لا تقلق، أنا الأقوى.",
  },
  {
    id: "killua",
    name: "كيلوا زولديك",
    anime: "Hunter x Hunter",
    symbol: "⚡",
    color: "#8E24AA",
    tagline: "سأحمي أصدقائي مهما كلف الأمر.",
  },
  {
    id: "tanjiro",
    name: "تانجيرو كامادو",
    anime: "Demon Slayer",
    symbol: "🌊",
    color: "#1E88E5",
    tagline: "لن أستسلم أبداً!",
  },
  {
    id: "goku",
    name: "سون غوكو",
    anime: "Dragon Ball",
    symbol: "🐉",
    color: "#FB8C00",
    tagline: "دعنا نقاتل بكل ما أوتينا من قوة!",
  },
];
