// ==========================================
// 1. Direct Questions (الأسئلة المباشرة - 60s)
// ==========================================
export const DIRECT_QUESTIONS = [
 
 
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
    timeLimit: 30,
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
