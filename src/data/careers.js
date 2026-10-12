// Sample open positions, edit freely. Descriptions follow the company profile.
export const careerBranches = ['Kuwait', 'saudi'];

export const careerPositions = [
  {
    id: 'formwork-carpenter',
    branches: ['Kuwait', 'saudi'],
    title: { en: 'Formwork Carpenter', ar: 'نجار شدات' },
    summary: {
      en: 'Erect and operate wall, column and slab formwork, including climbing formwork for high-rise concrete cores.',
      ar: 'تركيب وتشغيل شدات الحوائط والأعمدة والبلاطات، بما فيها الشدات المتسلقة لنوى المباني الشاهقة.',
    },
  },
  {
    id: 'steel-fixer',
    branches: ['Kuwait', 'saudi'],
    title: { en: 'Steel Fixer', ar: 'حداد مسلح' },
    summary: {
      en: 'Cut, bend and fix reinforcement, pre-assembled cages and dense mat reinforcement for rafts, walls and cores.',
      ar: 'قص وثني وتركيب حديد التسليح والأقفاص المجمعة مسبقًا وشبكات التسليح الكثيفة للأساسات والحوائط والنوى.',
    },
  },
  {
    id: 'concrete-foreman',
    branches: ['Kuwait', 'saudi'],
    title: { en: 'Concrete Crew Foreman', ar: 'ملاحظ أطقم خرسانة' },
    summary: {
      en: 'Lead concrete placing crews on large continuous pours with multiple pumps, including temperature control and curing.',
      ar: 'قيادة أطقم صب الخرسانة في الصبات المستمرة الكبيرة بمضخات متعددة، مع التحكم في الحرارة والمعالجة.',
    },
  },
  {
    id: 'site-engineer',
    branches: ['Kuwait', 'saudi'],
    title: { en: 'Site Engineer', ar: 'مهندس موقع' },
    summary: {
      en: 'Follow execution against drawings and specifications, with daily progress tracking and conformity checks.',
      ar: 'متابعة التنفيذ وفق المخططات والمواصفات، مع تتبع التقدم اليومي وفحوصات المطابقة.',
    },
  },
  {
    id: 'safety-officer',
    branches: ['Kuwait', 'saudi'],
    title: { en: 'Safety Officer', ar: 'مسؤول سلامة' },
    summary: {
      en: 'Apply the site safety plan covering excavation, lifting and work at height, and run the daily briefing before work starts.',
      ar: 'تطبيق خطة السلامة بالموقع التي تغطي الحفر والرفع والعمل على الارتفاعات، وإدارة الإحاطة اليومية قبل بدء العمل.',
    },
  },
  {
    id: 'quantity-surveyor',
    branches: ['Kuwait', 'saudi'],
    title: { en: 'Quantity Surveyor', ar: 'مهندس كميات' },
    summary: {
      en: 'Prepare quantity take-off from drawings and specifications, and track executed quantities for the weekly report.',
      ar: 'إعداد حصر الكميات من المخططات والمواصفات، ومتابعة الكميات المنفذة للتقرير الأسبوعي.',
    },
  },
];

export const careerContacts = [
  { key: 'Kuwait', phone: '+966 53 235 7899' },
  { key: 'saudi', phone: '+966 56 774 3453' },
];

export const pickLang = (obj, lang) => obj?.[lang] ?? obj?.en ?? '';