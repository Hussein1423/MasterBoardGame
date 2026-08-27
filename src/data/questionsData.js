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
  {
    id: 'dir-fate-1',
    anime: 'Fate/Zero',
    question: 'ما هي الفئة (Class) التي تم استدعاء الروح البطولية جلجامش (Gilgamesh) تحتها في حرب الكأس المقدسة الرابعة؟',
    answer: 'فئة الرامي / آرتشر (Archer)',
    points: 150,
  },
  {
    id: 'dir-fate-2',
    anime: 'Fate/Zero',
    question: 'في حرب الكأس المقدسة الرابعة، كان القاتل المتسلسل ريونوسوكي أوريو (Ryuunosuke Uryuu) سيداً (Master) لأي خادم من فئات الخدم السبعة؟',
    answer: 'فئة الساحر / كاستر (Caster) — (جيل دي راي)',
    points: 250,
  },
  {
    id: 'dir-ragnarok-1',
    anime: 'Record of Ragnarok',
    question: 'في الجولة الرابعة من بطولة راغناروك، ما هو السلاح الإلهي (Volundr) الحقيقي لـ "جاك السفاح" الذي اندمجت معه الفالكي ريندغريز/هلوك (Hlökk)؟',
    answer: 'قفازاته (التي تحول أي جماد يلمسه إلى سلاح إلهي)',
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
  {
    id: 'mcq-ds-1',
    anime: 'Demon Slayer',
    question: 'ما هو السبب الرئيسي الذي حوّل لون شعر زينيتسو من الأسود إلى الأصفر والبرتقالي؟',
    options: [
      'تأثير جانبي لشرب دواء عشبي سام',
      'إصابته بضربة صاعقة برق أثناء اختبائه فوق شجرة',
      'شرط وقيد لاكتساب قوة تنفس الرعد',
      'تعرضه لهجوم شيطان في طفولته',
    ],
    correctIndex: 1,
    correctAnswer: 'إصابته بضربة صاعقة برق أثناء اختبائه فوق شجرة',
    points: 200,
  },
  {
    id: 'mcq-aot-1',
    anime: 'Attack on Titan',
    question: 'ما هو الاسم الكودي الذي أطلقه إرين ييغر على نفسه أثناء تسلله كمريض مصاب داخل المستشفى في دولة مارلي؟',
    options: ['توم', 'كروغر', 'إلد', 'أودو'],
    correctIndex: 1,
    correctAnswer: 'كروغر',
    points: 150,
  },
  {
    id: 'mcq-hxh-1',
    anime: 'Hunter x Hunter',
    question: 'ما هو اسم الخادمة المتدربة لدى عائلة زولديك التي تحرس الطريق المؤدي إلى قصر جبل كوكولو وتصد الدخلاء بعصاها؟',
    options: ['كانيرا (Kanira)', 'كاناريا (Canary)', 'كانورا (Kanora)', 'كينارا (Kinara)'],
    correctIndex: 1,
    correctAnswer: 'كاناريا (Canary)',
    points: 200,
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
    characterName: 'ماركو بوت (Marco Bott)',
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
    characterName: 'بوركو غاليرد (Porco Galliard)',
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
    characterName: 'فينكس ماغكوب (Phinks Magcub)',
    correctAnswer: 'فينكس ماغكوب (Phinks Magcub)',
    avatarConfig: {
      symbol: '🥊',
      color: '#00E5FF',
      hairStyle: 'شعر أشقر قصير مائل للخلف بدون حواجب مع نظرة حادة',
    },
  },
  {
    id: 'sil-ragnarok-1',
    type: 'silhouette',
    anime: 'Record of Ragnarok',
    basePoints: 300,
    question: 'من هي هذه الشخصية؟',
    initialHint: 'هو الكيان الذي أجرى تجارب بيولوجية مظلمة وزرع خلايا "هاجون" (Hajun) خلسة داخل جسد التنين الأسطوري زيروفوكو وهو صغير.',
    additionalHints: [
      'يمتلك أسلوب قتال فريداً يجمع بين الاهتزازات التدميرية بيده اليمنى والدفاع المطلق بدرع صد بيده اليسرى متوارثاً من هاديس.',
      'إله سوداوي يرتدي زياً كهنوتياً أسود، عُرف بلقب "كاهن الشراهة وسيد الذباب"، وواجه نيكولا تيسلا في الجولة الثامنة.',
    ],
    characterName: 'بلزباب / بعلزبول (Beelzebub)',
    correctAnswer: 'بلزباب / بعلزبول (Beelzebub)',
    avatarConfig: {
      symbol: '🪰',
      color: '#7C4DFF',
      hairStyle: 'شعر أسود فوضوي منسدل، عيون سوداء غائرة، ورداء كهنوتي داكن',
    },
  },
  {
    id: 'sil-yugioh-1',
    type: 'silhouette',
    anime: 'Yu-Gi-Oh!',
    basePoints: 400,
    question: 'من هي هذه الشخصية؟',
    initialHint: 'مبارز تظاهر بالتحالف مع كايبا كورب واستخدم بطاقة الوحش الطقسي "Dokurorider" في بطولة مملكة المبارزين.',
    additionalHints: [
      'تبارز ضد جوي ويلر على منصة مجهزة بأسلحة حقيقية وربط معصميه بأغلال كهربائية تُصعق مع كل خسارة لنقاط الحياة.',
      'يُعرف بلقب "قاطع الطرق" (Bandit)، ويرتدي دائماً عصبة رأس برسمة العلم الأمريكي وسترة جلدية سوداء.',
    ],
    characterName: 'بانديت كيث (Bandit Keith)',
    correctAnswer: 'بانديت كيث (Bandit Keith)',
    avatarConfig: {
      symbol: '🇺🇸',
      color: '#D50000',
      hairStyle: 'عصبة رأس بالعلم الأمريكي، شعر أشقر طويل، وسترة جلدية سوداء',
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
  {
    id: 'chal-naruto-jonin',
    anime: 'Naruto',
    title: 'رتبة جونين في كونوها',
    prompt: 'اذكر 7 شخصيات من قرية كونوها كانوا يحملون رتبة جونين (Jōnin) رسمياً قبل اندلاع حرب النينجا العظمى الرابعة خلال 30 ثانية.',
    points: 400,
    timeLimit: 30,
  },
  {
    id: 'chal-sins-members',
    anime: 'The Seven Deadly Sins',
    title: 'أعضاء الخطايا وخطاياهم',
    prompt: 'اذكر 5 من أعضاء فرقة الخطايا مع ذكر الخطيئة المنسوبة لكل شخصية منهم خلال 30 ثانية.',
    points: 250,
    timeLimit: 30,
  },
  {
    id: 'chal-ragnarok-humans',
    anime: 'Record of Ragnarok',
    title: 'محاربو جانب البشرية',
    prompt: 'اذكر 6 من المحاربين الذين يمثلون جانب البشرية في بطولة راغناروك خلال 30 ثانية.',
    points: 300,
    timeLimit: 30,
  },
  {
    id: 'chal-zoldyck-family',
    anime: 'Hunter x Hunter',
    title: 'أفراد عائلة الزولديك',
    prompt: 'اذكر 6 من أفراد عائلة الزولديك (Zoldyck Family) للقتلة المأجورين خلال 30 ثانية.',
    points: 300,
    timeLimit: 30,
  },
  {
    id: 'chal-aot-104',
    anime: 'Attack on Titan',
    title: 'خريجو الدفعة 104',
    prompt: 'اذكر 8 من خريجي فرقة متدربي الدفعة 104 في هجوم العمالقة خلال 30 ثانية.',
    points: 350,
    timeLimit: 30,
  },
  {
    id: 'chal-fate-classes',
    anime: 'Fate/Zero',
    title: 'فئات الخدم في حرب الكأس',
    prompt: 'اذكر 5 من فئات الخدم (Servant Classes) السبعة المشاركة في حرب الكأس المقدسة في Fate/Zero خلال 25 ثانية.',
    points: 300,
    timeLimit: 30,
  },
];

// ==========================================
// 5. Strategic Lucky Buffs (صناديق الحظ التكتيكية - بدون نقاط مجانية)
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
    name: 'جرعة الطاقة المضاعفة (2x Double Points)',
    description: 'تضاعف نقاط سؤالك القادم بنسبة 100% في حال الإجابة الصحيحة فقط!',
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
    description: 'تسمح لك بتحويل سؤالك القادم لأحد الخصوم! إذا أخطأ يخسر نصف النقاط وتربحها كاملة، وإذا أصاب يربح هو النقاط!',
    type: 'DEFLECTION',
    icon: '🪞',
  },
];

// ==========================================
// 6. Trap Penalties (أفخاخ وعقوبات الشينوبي)
// ==========================================
export const TRAP_PENALTIES = [
  {
    id: 'trap-points-100',
    name: 'سرقة التشاكرا (-100 نقطة)',
    description: 'فقدت جزءاً من طاقتك وخسرت 100 نقطة من رصيدك الإجمالي!',
    type: 'DEDUCT_POINTS',
    points: 100,
    icon: '🩸',
  },
  {
    id: 'trap-points-200',
    name: 'لعنة العمالقة (-200 نقطة)',
    description: 'هجوم مباغت يخصم 200 نقطة كاملة من رصيدك!',
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
// 7. Avatars
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
