// ==========================================
// 1. Direct Questions (الأسئلة المباشرة - 60s)
// ==========================================
export const DIRECT_QUESTIONS = [
  {
    id: 'dir-1',
    anime: 'Yu-Gi-Oh!',
    question: 'ما اسم باكورا الطيب الأول في يوغي يو؟',
    answer: 'ريو باكورا (Ryo Bakura)',
    points: 300,
  },
  {
    id: 'dir-2',
    anime: 'Yu-Gi-Oh!',
    question: 'كم عدد القطع الألفية وما هي أسماؤها؟',
    answer: '7 قطع (أحجية الألفية، عين الألفية، حلقة الألفية، مفتاح الألفية، ميزان الألفية، عصا الألفية، قلادة الألفية)',
    points: 300,
  },
  {
    id: 'dir-3',
    anime: 'Attack on Titan',
    question: 'ما هي المادة أو العنصر النادر الذي يُستخرج من باطن الأرض داخل الأسوار ويُستخدم كوقود لمعدات المناورة ثلاثية الأبعاد؟',
    answer: 'حجر الجليد المتفجر (Iceburst Stone / الخيزران الجليدي المتفجر)',
    points: 500,
  },
  {
    id: 'dir-4',
    anime: 'Record of Ragnarok',
    question: 'ما كان أول قتال في بطولة راغناروك، بين من ومن، ومن الفائز؟',
    answer: 'ثور (Thor) ضد لوبو (Lu Bu)، والفائز هو ثور.',
    points: 300,
  },
  {
    id: 'dir-5',
    anime: 'Hunter x Hunter',
    question: 'ما هو الاسم الحقيقي للتقنية المتقدمة من النين التي تدمج بين "تين" (Ten) و"رين" (Ren) لزيادة حدة التركيز وقوة الهجوم والدفاع الموضعي؟',
    answer: 'غيو (Gyo) / كين (Ken)',
    points: 300,
  },
  {
    id: 'dir-6',
    anime: 'Hunter x Hunter',
    question: 'ما اسم الصياد مأمور السجن الذي تولى فحص واختبار المترشحين في المرحلة الثالثة (برج الخدع) خلال اختبار الصيادين الـ 287؟',
    answer: 'ليبو (Lippo)',
    points: 400,
  },
  {
    id: 'dir-7',
    anime: 'The Seven Deadly Sins',
    question: 'ما هو الاسم الذي يُطلق على المنظمة النخبوية المكونة من عشرة محاربين أقوياء اختارهم ملك الشياطين شخصياً في أنمي الخطايا السبع المميتة؟',
    answer: 'الوصايا العشر (Ten Commandments)',
    points: 100,
  },
  {
    id: 'dir-8',
    anime: 'Attack on Titan',
    question: 'ما هو اسم عائلة هيستوريا الحقيقي في هجوم العمالقة؟',
    answer: 'عائلة ريس (Reiss)',
    points: 300,
  },
  {
    id: 'dir-9',
    anime: 'Naruto',
    question: 'من هم الجينشوريكي الذين استطاعوا تحقيق السيطرة الكاملة على وحوش البيجو الخاصة بهم واستخدام قواهم بكامل وعيهم (جينشوريكي مثالي) عبر تاريخ أنمي ناروتو؟',
    answer: 'كيلر بي، ياغورا كاراتاتشي، يوغيتو ني، وناروتو أوزوماكي (إضافة إلى ميناتو ناميكازي بعد الإيدو تينسي)',
    points: 350,
  },
];

// ==========================================
// 2. Multiple Choice Questions (اختيار من متعدد)
// ==========================================
export const MCQ_QUESTIONS = [
  {
    id: 'mcq-1',
    anime: 'Attack on Titan',
    question: 'من كان أول ضحية تسقط من فرقة ليفاي الخاصة عند ملاحقة العملاقة الأنثى لهم؟',
    options: ['بيترا رال', 'أولو بوزادو', 'غونتر شولتز', 'إلد جين'],
    correctIndex: 2,
    correctAnswer: 'غونتر شولتز',
    points: 150,
  },
  {
    id: 'mcq-2',
    anime: 'Attack on Titan',
    question: 'ما هو اسم المنطقة المحصورة المخصصة للإلديين في دولة مارلي، والتي نشأ فيها كل من راينر، غابي، وفالكو؟',
    options: ['شيغانشينا', 'ليبيريو', 'تروست', 'أوتوغارد'],
    correctIndex: 1,
    correctAnswer: 'ليبيريو',
    points: 100,
  },
  {
    id: 'mcq-3',
    anime: 'Record of Ragnarok',
    question: 'كم عدد الانتصارات التي يحتاجها أي طرف (البشر أو الآلهة) من أصل 13 جولة لحسم مصير بطولة الراغناروك رسمياً؟',
    options: ['5 انتصارات', '6 انتصارات', '7 انتصارات', '8 انتصارات'],
    correctIndex: 2,
    correctAnswer: '7 انتصارات',
    points: 100,
  },
];

// ==========================================
// 3. Character Guessing (خمن الشخصية والتلميحات)
// ==========================================
export const SILHOUETTE_QUESTIONS = [
  {
    id: 'sil-1',
    type: 'silhouette',
    anime: 'Attack on Titan',
    basePoints: 250,
    question: 'من هي هذه الشخصية؟',
    initialHint: 'متدرب متميز احتل رسمياً المركز السابع (7th) في قائمة العشرة الأوائل لدفعة التدريب الـ 104.',
    additionalHints: [
      'كان الصديق الأقرب لجان كريشتاين، وتسبب موته المأساوي في قرار جان بالانضمام لفيلق الاستطلاع.',
      'اكتشف سر راينر وبيرتولدت بالصدفة في تروست، وتُرك ليموت بعد تجريده من عدة المناورة.',
    ],
    correctAnswer: 'ماركو بوت (Marco Bott)',
    avatarConfig: {
      symbol: '🗝️',
      color: '#4CAF50',
      hairStyle: 'شعر أسود مقسم من المنتصف ونمش خفيف على الوجنتين',
    },
  },
  {
    id: 'sil-2',
    type: 'silhouette',
    anime: 'Attack on Titan',
    basePoints: 150,
    question: 'من هي هذه الشخصية؟',
    initialHint: 'هو المحارب الذي ورث "عملاق الفك" مباشرة بعد استعادة مارلي للقوة من يومير.',
    additionalHints: [
      'هو الأخ الأصغر لمارسيل غاليرد، وكان يكره راينر لاعتقاده بأنه لا يستحق درع المحاربين.',
      'أصيب بجروح بالغة في غزو شيغانشينا وضحى بنفسه ليأكله فالكو لإنقاذ راينر.',
    ],
    correctAnswer: 'بوركو غاليرد (Porco Galliard)',
    avatarConfig: {
      symbol: '🦷',
      color: '#FF9800',
      hairStyle: 'شعر أشقر مصفف للخلف وبنية محارب قوية',
    },
  },
  {
    id: 'sil-3',
    type: 'silhouette',
    anime: 'Hunter x Hunter',
    basePoints: 200,
    question: 'من هي هذه الشخصية؟',
    initialHint: 'عضو مؤسس في عصابة الشبح ويحتل المركز الثاني في قوة المصارعة الجسدية بعد أوفوغين.',
    additionalHints: [
      'تعتمد قدرة النين الخاصة به على مضاعفة قوة لكمته مع كل دورة يدورها بذراعه.',
      'يرتدي بدلة رياضية خضراء أو زياً فرعونياً، وهو شريك فيتان الدائم في القتال.',
    ],
    correctAnswer: 'فينكس ماغكوب (Phinks Magcub)',
    avatarConfig: {
      symbol: '🥊',
      color: '#00E5FF',
      hairStyle: 'شعر أشقر قصير مائل للخلف بدون حواجب مع نظرة حادة',
    },
  },
];

// ==========================================
// 4. Speed Challenges (تحديات السرعة والتعداد المدمجة - 30s)
// ==========================================
export const SPEED_CHALLENGES = [
  {
    id: 'chal-1',
    anime: 'Attack on Titan',
    title: 'قادة فيلق الاستطلاع',
    prompt: 'اذكر 3 قادة سابقين لفيلق الاستطلاع قبل تولي أرمين أرليرت القيادة خلال 30 ثانية.',
    points: 250,
  },
  {
    id: 'chal-2',
    anime: 'Hunter x Hunter',
    title: 'مستخدمو العهد والقيد',
    prompt: 'اذكر 4 شخصيات في أنمي هنتر (Hunter × Hunter) ذُكر صراحةً في القصة استخدامهم لمبدأ "العهد والقيد" (Vows & Limitations) خلال 30 ثانية.',
    points: 350,
  },
  {
    id: 'chal-3',
    anime: 'One Piece',
    title: 'الجيل الأسوأ',
    prompt: 'اذكر 5 قراصنة ينتمون إلى "الجيل الأسوأ" (The Worst Generation) في ون بيس خلال 30 ثانية.',
    points: 200,
  },
  {
    id: 'chal-4',
    anime: 'Naruto',
    title: 'مستخدمو المانجيكيو شارينغان',
    prompt: 'اذكر 4 مستخدمين لعين المانجيكيو شارينغان (Mangekyo Sharingan) في عشيرة الأوتشيها خلال 30 ثانية.',
    points: 100,
  },
];

// ==========================================
// 5. Lucky Buffs & Traps (صناديق الحظ والأفخاخ)
// ==========================================
export const LUCKY_BUFFS = [
  {
    id: 'buff-advance-1',
    name: 'دفعة شينوبي خاطفة (+1 خانة)',
    description: 'تحصل على دفعة سرعة فورية وتتقدم خانة واحدة للأمام!',
    type: 'ADVANCE',
    tiles: 1,
    icon: '⚡',
  },
  {
    id: 'buff-advance-2',
    name: 'مناورة هوائية سريعة (+2 خانة)',
    description: 'تستخدم عتاد المناورة وتتقدم خانتين إضافيتين للأمام!',
    type: 'ADVANCE',
    tiles: 2,
    icon: '🚀',
  },
  {
    id: 'buff-advance-3',
    name: 'قفزة الكنز الأسطوري (+3 خانات)',
    description: 'رياح السفينة تدفعك بقوة لتتقدم 3 خانات كاملة للأمام!',
    type: 'ADVANCE',
    tiles: 3,
    icon: '🌟',
  },
  {
    id: 'buff-shield',
    name: 'درع السوسانو الحامي (Shield)',
    description: 'يُحفظ في حقيبتك ليمتص الفخ القادم تلقائياً ويحميك من أي عقوبة!',
    type: 'SHIELD',
    icon: '🛡️',
  },
  {
    id: 'buff-double',
    name: 'جرعة الطاقة المضاعفة (2x Points)',
    description: 'تضاعف نقاط سؤالك القادم بنسبة 100% في حال الإجابة الصحيحة!',
    type: 'DOUBLE_POINTS',
    icon: '🔥',
  },
  {
    id: 'buff-time',
    name: 'ساعة الرمل السحرية (+30 ثانية)',
    description: 'تمنحك +30 ثانية إضافية في عداد وقت السؤال أو التحدي القادم!',
    type: 'BONUS_TIME',
    icon: '⏳',
  },
  {
    id: 'buff-deflect',
    name: 'مرآة العواكس النادرة (Question Deflection)',
    description: 'تسمح لك بتحويل سؤالك القادم لأحد الخصوم! إذا أخطأ يخسر نقطة، وإذا أصاب تربح أنت نقطة!',
    type: 'DEFLECTION',
    icon: '🪞',
  },
];

export const TRAP_PENALTIES = [
  {
    id: 'trap-points-1',
    name: 'سرقة التشاكرا (-100 نقطة)',
    description: 'فقدت جزءاً من طاقتك وخسرت 100 نقطة من رصيدك!',
    type: 'DEDUCT_POINTS',
    points: 100,
    icon: '🩸',
  },
  {
    id: 'trap-points-2',
    name: 'لعنة العمالقة (-200 نقطة)',
    description: 'هجوم مباغت يخصم 200 نقطة من رصيدك الإجمالي!',
    type: 'DEDUCT_POINTS',
    points: 200,
    icon: '💔',
  },
  {
    id: 'trap-back-2',
    name: 'رياح معاكسة (تراجع خانتين)',
    description: 'تعرضت لدوامة بحرية وتراجعت خانتين إلى الخلف!',
    type: 'MOVE_BACK',
    tiles: 2,
    icon: '↩️',
  },
  {
    id: 'trap-freeze',
    name: 'تجميد جليدي (Freeze Turn)',
    description: 'تم تجميدك في مكانك! سيتم تخطي دورك القادم في الجولة!',
    type: 'FREEZE',
    icon: '🧊',
  },
  {
    id: 'trap-half-time',
    name: 'ضغط الأدرينالين (نصف الوقت 30s)',
    description: 'يتناقص وقت سؤالك القادم إلى النصف (30 ثانية بدلاً من 60 ثانية)!',
    type: 'HALF_TIME',
    icon: '⚠️',
  },
];

// ==========================================
// 6. Avatars
// ==========================================
export const AVATARS = [
  {
    id: 'naruto',
    name: 'ناروتو أوزوماكي',
    anime: 'Naruto',
    symbol: '🍥',
    color: '#FF6B00',
    tagline: 'طريق النينجا الخاص بي!',
  },
  {
    id: 'luffy',
    name: 'مونكي دي لوفي',
    anime: 'One Piece',
    symbol: '🍖',
    color: '#E53935',
    tagline: 'سأصبح ملك القراصنة!',
  },
  {
    id: 'eren',
    name: 'إيرين ييغر',
    anime: 'Attack on Titan',
    symbol: '🗝️',
    color: '#00897B',
    tagline: 'سأقاتل من أجل الحرية!',
  },
  {
    id: 'zoro',
    name: 'رورونوا زورو',
    anime: 'One Piece',
    symbol: '⚔️',
    color: '#43A047',
    tagline: 'لن أهزم مجدداً أبداً!',
  },
  {
    id: 'gojo',
    name: 'غوجو ساتورو',
    anime: 'Jujutsu Kaisen',
    symbol: '🤞',
    color: '#00ACC1',
    tagline: 'لا تقلق، أنا الأقوى.',
  },
  {
    id: 'killua',
    name: 'كيلوا زولديك',
    anime: 'Hunter x Hunter',
    symbol: '⚡',
    color: '#8E24AA',
    tagline: 'سأحمي أصدقائي مهما كلف الأمر.',
  },
  {
    id: 'tanjiro',
    name: 'تانجيرو كامادو',
    anime: 'Demon Slayer',
    symbol: '🌊',
    color: '#1E88E5',
    tagline: 'لن أستسلم أبداً!',
  },
  {
    id: 'goku',
    name: 'سون غوكو',
    anime: 'Dragon Ball',
    symbol: '🐉',
    color: '#FB8C00',
    tagline: 'دعنا نقاتل بكل ما أوتينا من قوة!',
  },
];
