// ==========================================
// CAMPUS LIFE: 9JA UNI SIMULATOR MASTER ENGINE
// Full Story Progression (100L to 400L), Real Mapped Locations,
// Housing & Rent, 6-Stat Needs, and Campus Encounters
// ==========================================

class SoundFX {
  constructor() { this.ctx = null; }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }
  playCash() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.15);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }
  playNotification() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.setValueAtTime(950, now + 0.08);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }
  playAlert() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.3);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }
  playTravel() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.setValueAtTime(380, now + 0.1);
    osc.frequency.setValueAtTime(310, now + 0.2);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }
  playUpNepa() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);
      gain.gain.setValueAtTime(0.18, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.25);
    });
  }
  playHeartbreak() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [392, 349.23, 293.66, 261.63].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + i * 0.18);
      gain.gain.setValueAtTime(0.15, now + i * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.18 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.18);
      osc.stop(now + i * 0.18 + 0.3);
    });
  }
  playBuzzer() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(140, now);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }
}

const sfx = new SoundFX();

// Authentic Nigerian University CBT Exam Questions
const CBT_QUESTIONS = [
  {
    q: "In Nigerian university 5.0 CGPA scale, what minimum score awards an 'A' grade (5.00 points)?",
    options: ["70% and above", "60% - 69%", "50% - 59%", "45% - 49%"],
    answer: 0
  },
  {
    q: "What is the common meaning of the student acronym 'TDB' during university exam weeks?",
    options: ["Till Day Break (Night Reading)", "To Do Better", "Today Don Break", "Teaching Department Board"],
    answer: 0
  },
  {
    q: "Which official document officially binds a 100L student to university rules and code of conduct?",
    options: ["Matriculation Oath Form", "Hostel Bedspace Chit", "SUG Manifesto", "Library Card"],
    answer: 0
  },
  {
    q: "At UNILORIN, what is the covered walkway connecting the park terminal to lecture halls called?",
    options: ["The PS Walkway & Flyover", "Third Mainland Bridge", "Senate Skywalk", "Tanke Bridge"],
    answer: 0
  },
  {
    q: "At UNILAG, which scenic location is famous for afternoon sea breeze and group reading?",
    options: ["Lagoon Front & Senate Grounds", "Akoka Motor Park", "Bariga Border", "DLI Gate"],
    answer: 0
  },
  {
    q: "What is the famous unanimous chant shouted across Nigerian student hostels when power is restored?",
    options: ["'UP NEPAAAAA!'", "'LIGHT HAS COME!'", "'DISCO OYEE!'", "'NO MORE GEN!'"],
    answer: 0
  },
  {
    q: "If you score 38% in a 3-unit prerequisite course, what is the academic result?",
    options: ["F Grade (Carryover course next year)", "Automatic C waiver", "Lecturer gives grace marks", "Exempted from graduation"],
    answer: 0
  },
  {
    q: "What is the mandatory 1-year government scheme for Nigerian university graduates?",
    options: ["NYSC (National Youth Service Corps)", "FRSC Highway Guard", "NDLEA Squad", "NCDC Corps"],
    answer: 0
  }
];

// Real Mapped University Landmarks with Map Coordinates (x%, y%)
const UNIVERSITIES = {
  unilorin: {
    name: "University of Ilorin",
    short: "UNILORIN",
    motto: "Better By Far",
    city: "Ilorin, Kwara State",
    locations: [
      { id: "tanke", name: "Tanke Junction & Oke-Odo", tag: "Off-Campus Hub", icon: "🚕", x: 12, y: 84, desc: "Commercial hub packed with Keke queues, Tanke Amala joints, supermarkets, POS stands, and morning hold-up.", actionLabel: "🍲 Eat Hot Amala (₦1,200)", actionCost: 1200, actionType: "food" },
      { id: "sanrab", name: "Sanrab Hostel Zone", tag: "Student Ghetto", icon: "🏘️", x: 26, y: 88, desc: "Prime off-campus living area. Generators humming, barbers, laundry lines, and late-night indomie aroma.", actionLabel: "🍜 Cook Indomie in Room (₦500)", actionCost: 500, actionType: "food" },
      { id: "main_gate", name: "Main Gate & Security Post", tag: "Screening Point", icon: "🚧", x: 28, y: 72, desc: "Strict Dress Code Marshalls inspecting students' trousers, hairstyles, and ID cards before entry.", actionLabel: "🚶 Check Dress Code", actionType: "check" },
      { id: "school_park", name: "School Park Terminal", tag: "Transit Hub", icon: "🚌", x: 42, y: 64, desc: "Coaster buses loading students to Post Office, Challenge, and Tanke. Intense rush-hour struggle.", actionLabel: "🚍 Rush Coaster Bus", actionType: "travel" },
      { id: "ps_walkway", name: "The Walkway & Flyover", tag: "Campus Catwalk", icon: "🚶", x: 50, y: 50, desc: "The legendary sheltered walkway. Fashion showcase, political flyers, and the long trek between faculties.", actionLabel: "✨ Strut Walkway (+20 Fun)", actionType: "fun" },
      { id: "cbt_centre", name: "Permanent Site CBT Centre", tag: "Exam Arena", icon: "💻", x: 82, y: 28, desc: "Halls 1 to 5. Biometric thumbprint scanners, nervous students praying, and 8 AM test tension.", actionLabel: "📝 Take Mock Test (+0.08 CGPA)", actionType: "study" },
      { id: "faculty_science", name: "Faculty of Science & NLT", tag: "Lecture Halls", icon: "🔬", x: 34, y: 46, desc: "500-capacity New Lecture Theatre. Crowded general courses, lab practicals, and 7 AM seat rushing.", actionLabel: "🧪 Attend Science Practical", actionType: "study" },
      { id: "faculty_eng", name: "Faculty of Engineering & Tech", tag: "Engineering Complex", icon: "⚙️", x: 20, y: 38, desc: "Workshop machines, mechanical draws, late night laboratory reports, and hard calculations.", actionLabel: "📐 Technical CAD Drawing", actionType: "study" },
      { id: "faculty_cis", name: "Faculty of CIS (ICT Centre)", tag: "Tech Sanctum", icon: "🖥️", x: 30, y: 26, desc: "Computer Information Sciences hub. Programmers, tech founders, UI designers, and AC labs.", actionLabel: "💻 Free Campus Wi-Fi & Code", actionType: "fun" },
      { id: "senate", name: "Senate Building Complex", tag: "Admin Power", icon: "🏛️", x: 50, y: 34, desc: "Imposing administrative tower, Vice Chancellor's office, matriculation ground, and bursary.", actionLabel: "🏛️ Matriculation Photo Spot", actionType: "fun" },
      { id: "dam", name: "Unilorin Dam & Biological Gardens", tag: "Scenic Dates", icon: "🌊", x: 82, y: 12, desc: "Cool serene waters, monkeys at the zoo, couple hideouts, and peaceful escape from toxic lecturers.", actionLabel: "🍃 Catch Dam Breeze (+30 Fun)", actionType: "fun" },
      { id: "clinic", name: "University Health Services", tag: "Clinic Bay", icon: "🏥", x: 48, y: 78, desc: "Campus hospital. Sick bay beds, long queues for medical clearance, and paracetamol prescriptions.", actionLabel: "💊 Get Health Clearance", actionType: "health" },
      { id: "village_hostel", name: "Hostel Village (Lagos & Zamfara)", tag: "Campus Dorms", icon: "🏢", x: 82, y: 55, desc: "On-campus male and female hostels. Shouting 'Up NEPA', bucket water queues, and hall fellowship.", actionLabel: "🔋 Check Room Power", actionType: "room" },
      { id: "stadium", name: "Unilorin Sports Complex & Stadium", tag: "SUG Games", icon: "⚽", x: 68, y: 65, desc: "Inter-faculty football matches, marathon races, athletics track, and weekend workout sessions.", actionLabel: "⚽ Play Inter-Faculty Match", actionType: "fun" },
      { id: "library", name: "Unilorin Main Library (PTDF)", tag: "Silent Sanctum", icon: "📚", x: 68, y: 38, desc: "Air-conditioned multi-floor research citadel. Deep study cubicles and zero noise tolerance.", actionLabel: "📚 AC Deep Reading (+0.12 CGPA)", actionType: "study" },
      { id: "chapel_mosque", name: "University Chapel & Central Mosque", tag: "Spiritual Centers", icon: "🕌", x: 62, y: 78, desc: "Friday Jum'ah prayers and Sunday service fellowships. Where students pray for 5.0 CGPA.", actionLabel: "🙏 Pray for First Class", actionType: "faith" }
    ]
  },
  unilag: {
    name: "University of Lagos",
    short: "UNILAG",
    motto: "In Deed and In Truth",
    city: "Akoka, Lagos State",
    locations: [
      { id: "akoka_gate", name: "Akoka Main Gate", tag: "City Border", icon: "🚖", x: 14, y: 82, desc: "Yellow Danfo buses from Yaba, campus cabs, security checks, and street food vendors.", actionLabel: "🚕 Board Campus Cab (₦200)", actionCost: 200, actionType: "travel" },
      { id: "new_hall", name: "New Hall Quadrangle", tag: "Campus Core", icon: "🌆", x: 56, y: 65, desc: "Heartbeat of Unilag nightlife. King Jaja, Moremi hall fashion catwalk, Shawarma and suya spots.", actionLabel: "🌯 Buy Suya & Shawarma (₦1,500)", actionCost: 1500, actionType: "food" },
      { id: "lagoon_front", name: "Lagoon Front & Senate", tag: "Romantic Breeze", icon: "🌊", x: 80, y: 34, desc: "Serene breeze from Lagos lagoon. Lovers on manicured lawns, study groups, iconic photo spot.", actionLabel: "🌊 Chill by Lagoon (+35 Fun)", actionType: "fun" },
      { id: "faculty_law", name: "Faculty of Law & Arts", tag: "Moot Court", icon: "⚖️", desc: "Corporate dress code, students in black & white, intellectual arguments, and faculty library.", x: 24, y: 44, actionLabel: "⚖️ Watch Moot Court Debate", actionType: "study" },
      { id: "cits", name: "CITS Tech Centre & Library", tag: "Tech & Reading", icon: "💻", x: 44, y: 44, desc: "Air-conditioned labs, free Wi-Fi, coding students, and quiet research desks.", actionLabel: "💻 CITS AC Reading (+0.10 CGPA)", actionType: "study" },
      { id: "amphi", name: "Main Auditorium & Amphitheatre", tag: "Event Stage", icon: "🎭", x: 54, y: 34, desc: "SUG election manifestos, comedy shows, campus concerts, fellowship night vigils.", actionLabel: "🎭 Attend Campus Concert", actionType: "fun" },
      { id: "engineering", name: "Faculty of Engineering Labs", tag: "Sleepless Hub", icon: "⚙️", x: 18, y: 28, desc: "Heavy machinery workshops, late-night CAD drawings, and exhausted engineering students.", actionLabel: "⚙️ Workshop Practical", actionType: "study" },
      { id: "health_centre", name: "Unilag Health Centre", tag: "Medical Bay", icon: "🏥", x: 62, y: 52, desc: "Student clinic near Jaja Hall for medical excuses, sick tests, and emergency relief.", actionLabel: "💊 Get Medical Clearance", actionType: "health" },
      { id: "jaja_hall", name: "King Jaja Hall & Aroma", tag: "Male Citadel", icon: "🏰", x: 74, y: 72, desc: "Legendary male hostel. Aroma fast food joint, 'aro' banter, and late night room politics.", actionLabel: "🍛 Eat at Aroma Joint (₦1,200)", actionCost: 1200, actionType: "food" },
      { id: "moremi_hall", name: "Moremi Hall of Residence", tag: "Female Fortress", icon: "🌸", x: 44, y: 78, desc: "Prestige female hostel. Ballers driving luxury cars parked outside waiting for dates.", actionLabel: "🌸 Moremi Catwalk Gist", actionType: "fun" },
      { id: "sport_centre", name: "Unilag Sports Center", tag: "Athletic Arena", icon: "🏀", x: 34, y: 24, desc: "Swimming pool, indoor basketball court, gym, tennis courts, and university games.", actionLabel: "🏀 Shoot Hoops & Swim", actionType: "fun" },
      { id: "dli", name: "DLI Gate & Commercial Hub", tag: "Food & Xerox", icon: "🖨️", x: 28, y: 78, desc: "Photocopy centers, binding shops, chilled Chapman stands, and quick snacks.", actionLabel: "🖨️ Print Handouts (₦400)", actionCost: 400, actionType: "study" },
      { id: "yaba_tech_border", name: "Yaba Tech Border & Commercial Road", tag: "Artisan Hub", icon: "🎨", x: 12, y: 62, desc: "Bustling boundary line filled with computer repairs, art supplies, and affordable food.", actionLabel: "🛠️ Fix Phone Screen", actionType: "hustle" },
      { id: "guest_houses", name: "Unilag Guest Houses & Lagoon View", tag: "VIP Zone", icon: "🏨", x: 84, y: 18, desc: "High-end campus hotel with lagoon buffet, conference halls, and university dignitaries.", actionLabel: "☕ High-End Lagoon Buffet", actionType: "food" },
      { id: "fss", name: "Faculty of Social Sciences (FSS)", tag: "Political Hub", icon: "📊", x: 28, y: 58, desc: "Economics, Sociology, and Mass Comm headquarters. Packed lecture halls and fiery debates.", actionLabel: "📊 Political Debate Session", actionType: "study" },
      { id: "medical_cmul", name: "College of Medicine (CMUL Idi-Araba)", tag: "Medical Campus", icon: "🩺", x: 38, y: 88, desc: "LUTH hospital grounds, white lab coats, anatomy dissection labs, and stethoscope grinders.", actionLabel: "🩺 Hospital Ward Round", actionType: "study" }
    ]
  }
};

// Items Available for Purchase
const SHOP_ITEMS = [
  { id: "amala_tanke", name: "Amala + Gbegiri & Ewedu (Goat Meat)", category: "food", cost: 1800, hunger: 45, energy: 25, desc: "Hot steaming Amala from Tanke with spicy goat meat." },
  { id: "jollof_chicken", name: "Jollof Rice & Fried Chicken", category: "food", cost: 3200, hunger: 60, energy: 30, desc: "Classic Nigerian party jollof with spicy peppered chicken." },
  { id: "shawarma_sausage", name: "New Hall Double-Sausage Shawarma", category: "food", cost: 2500, hunger: 40, energy: 20, desc: "Late-night creamy campus shawarma wrapped with ketchup and chili." },
  { id: "garri_groundnut", name: "Hostel Garri + Groundnut & Sugar", category: "food", cost: 600, hunger: 30, energy: 15, desc: "Student life-saver. Cold water soaking with crunchy groundnut." },
  { id: "monster_energy", name: "Ice Cold Predator Energy Drink", category: "food", cost: 1000, hunger: 5, energy: 50, desc: "Essential fuel for TDB night reading sessions." },
  { id: "past_questions", name: "10-Year Departmental Past Questions (PQ)", category: "academic", cost: 3500, cgpaBoost: 0.18, desc: "Comprehensive past exam questions and vetted solutions." },
  { id: "oraimo_powerbank", name: "Oraimo 30,000mAh Power Bank", category: "gear", cost: 22000, desc: "Survival powerhouse during hostel blackouts and NEPA strikes." },
  { id: "designer_drip", name: "Campus Catwalk Drip (Native + Loafers)", category: "fashion", cost: 45000, fun: 35, desc: "Turn heads on the walkway. Instant respect from coursemates and lecturers." }
];

// Campus Side Gigs / Hustles
const CAMPUS_JOBS = [
  { id: "assignment_writer", name: "Assignment & Term Paper Writer", payout: 12000, energyCost: 25, desc: "Write assignments and course term papers for rich coursemates." },
  { id: "pos_agent", name: "Hostel POS Cash Agent", payout: 9500, energyCost: 20, desc: "Disburse cash at night when campus ATMs are completely out of cash." },
  { id: "okrika_vendor", name: "Vintage & Thrift (Okrika) Vendor", payout: 16000, energyCost: 25, desc: "Curate streetwear shirts and denim jackets to sell in hostel rooms." },
  { id: "hair_braider", name: "Campus Hair Stylist / Barber", payout: 11000, energyCost: 25, desc: "Style hair or trim clean fades for students preparing for weekend parties." },
  { id: "phone_repair", name: "Screen Guard & Phone Repair Tech", payout: 14000, energyCost: 25, desc: "Fix cracked screens and paste glass screen protectors on campus." },
];

// Passive Campus Businesses & Asset Investments
const CAMPUS_BUSINESSES = [
  {
    id: "pos_kiosk",
    name: "Tanke / New Hall POS Kiosk",
    cost: 65000,
    dailyReturn: 4500,
    icon: "🏧",
    desc: "Own a busy campus POS kiosk with daily cash withdrawals and transfers. Generates steady passive daily returns."
  },
  {
    id: "campus_keke",
    name: "Commercial Campus Keke Napep",
    cost: 350000,
    dailyReturn: 12000,
    icon: "🛺",
    desc: "A yellow campus shuttle trike. Hired driver pays you daily delivery returns every evening."
  },
  {
    id: "lodge_brokerage",
    name: "Off-Campus Lodge & Hostel Agency",
    cost: 150000,
    dailyReturn: 7500,
    icon: "🏢",
    desc: "Broker bedspaces and self-contained apartments in Sanrab and Yaba for incoming freshers. Earn daily commission."
  },
  {
    id: "tech_agency",
    name: "Campus Tech & Final Year Project Studio",
    cost: 850000,
    dailyReturn: 35000,
    icon: "💻",
    desc: "A creative digital hub building websites, graphic designs, and data analysis for campus brands and students."
  }
];

// Random Campus Drama Encounters
const CAMPUS_EVENTS = [
  {
    id: "dress_code_marshall",
    uni: "unilorin",
    title: "⚠️ Dress Code Marshall Caught You!",
    desc: "A stern lecturer and security man stop you on the Walkway. They claim your trousers are fitted and hair style violates university dressing ethics. What do you do?",
    options: [
      {
        text: "Apologize politely ('Good morning sir, I'm truly sorry, I will change immediately')",
        outcome: (stats) => {
          stats.energy = Math.max(0, stats.energy - 10);
          return { msg: "The marshall waved you through with a stern warning. Survived, but lost 10 Energy from tension.", type: "neutral" };
        }
      },
      {
        text: "Quote the student handbook and defend your style",
        outcome: (stats) => {
          stats.fun = Math.min(100, stats.fun + 15);
          stats.cgpa = Math.max(0.5, +(stats.cgpa - 0.20).toFixed(2));
          return { msg: "A student crowd gathered and cheered! But the marshall noted your matric number (-0.20 CGPA penalty!).", type: "negative" };
        }
      },
      {
        text: "Make a swift U-turn and take a Keke back to Tanke",
        outcome: (stats) => {
          stats.energy = Math.max(0, stats.energy - 15);
          return { msg: "Escaped the marshall's radar, but missed your early morning seat in NLT.", type: "neutral" };
        }
      }
    ]
  },
  {
    id: "boiling_ring_raid",
    title: "⚡ Surprise Hostel Porter Appliance Raid!",
    desc: "At 10:45 PM, loud knocks echo on your hostel door! Hall porters and security are searching for contraband boiling rings and hotplates.",
    options: [
      {
        text: "Hide the boiling ring inside your roommate's laundry bag",
        outcome: (stats) => {
          if (Math.random() > 0.35) {
            return { msg: "Success! The porters searched and found nothing. Room celebrated with midnight garri!", type: "positive" };
          } else {
            return { msg: "Busted! The porter confiscated the appliance and issued a stern warning notice.", type: "negative" };
          }
        }
      },
      {
        text: "Tip the chief porter ₦2,000 for 'cold pure water'",
        outcome: (stats) => {
          if (game.finances.cash >= 2000) {
            game.finances.cash -= 2000;
            return { msg: "The porter smiled, pocketed the ₦2,000, and shouted 'Room inspected, all clean!'", type: "positive" };
          } else {
            return { msg: "You didn't have enough cash! The appliance was confiscated.", type: "negative" };
          }
        }
      }
    ]
  },
  {
    id: "surprise_test",
    title: "🚨 Surprise 20-Mark Continuous Assessment Test!",
    desc: "You entered the lecture hall and the lecturer locked the main doors! He commands everyone to bring out a blank sheet for an unannounced test.",
    options: [
      {
        text: "Write with confidence based on your class notes",
        outcome: (stats) => {
          const delta = stats.cgpa >= 3.0 ? 0.12 : -0.15;
          stats.cgpa = Math.min(5.0, Math.max(0.5, +(stats.cgpa + delta).toFixed(2)));
          stats.energy = Math.max(0, stats.energy - 15);
          return { msg: delta > 0 ? "Your past reading saved you! Scored 17/20 on the test (+0.12 CGPA 📚)" : "Struggled with the formulas. Scored 5/20 (-0.15 CGPA 📉)", type: delta > 0 ? "positive" : "negative" };
        }
      },
      {
        text: "Whisper and peep answers from the genius student next to you",
        outcome: (stats) => {
          if (Math.random() > 0.4) {
            stats.cgpa = Math.min(5.0, +(stats.cgpa + 0.15).toFixed(2));
            return { msg: "Brilliant copy-and-paste teamwork! Secured 19/20 on the test (+0.15 CGPA 📚)", type: "positive" };
          } else {
            stats.cgpa = Math.max(0.5, +(stats.cgpa - 0.25).toFixed(2));
            return { msg: "Invigilator caught you stretching your neck! Script torn with a 0/20 zero mark (-0.25 CGPA 💀)", type: "negative" };
          }
        }
      }
    ]
  },
  {
    id: "lagoon_front_date",
    uni: "unilag",
    title: "🌊 Evening Breeze at Lagoon Front",
    desc: "Your campus crush invites you to chill at the Lagoon Front as the sunset breeze rolls off the water.",
    options: [
      {
        text: "Buy cold stone ice cream and shawarma to share (₦4,000)",
        outcome: (stats) => {
          if (game.finances.cash >= 4000) {
            game.finances.cash -= 4000;
            stats.fun = 100;
            return { msg: "Romantic evening vibes! Great conversations and memories by the lagoon (+100% Fun 🎉)", type: "positive" };
          } else {
            return { msg: "You didn't have enough cash, so you just walked along the shoreline.", type: "neutral" };
          }
        }
      },
      {
        text: "Discuss course syllabus and prepare together for midterms",
        outcome: (stats) => {
          stats.cgpa = Math.min(5.0, +(stats.cgpa + 0.10).toFixed(2));
          stats.fun = Math.min(100, stats.fun + 20);
          return { msg: "Study date success! Motivated each other and revised key topics (+0.10 CGPA 📚)", type: "positive" };
        }
      }
    ]
  }
];

// Player Housing Tiers
const HOUSING_TIERS = {
  squatter: {
    id: "squatter",
    name: "Hostel Squatter Bunk",
    rentCost: 0,
    roomType: "8 guys in 1 room (Village / New Hall)",
    desc: "Sleeping on a thin mattress on the floor or sharing a bunk with coursemate. Zero privacy.",
    perks: "Free accommodation. High risk of boiling ring raids and missing food."
  },
  school_hostel: {
    id: "school_hostel",
    name: "Official School Hostel Bedspace",
    rentCost: 45000,
    roomType: "4-Man Hostel Room",
    desc: "Balloted hostel room on campus. Close to 8 AM lectures, but water and light fluctuate.",
    perks: "Trek to class in 5 minutes. Shared bathroom and hall porter rules."
  },
  self_contain: {
    id: "self_contain",
    name: "Self-Contained Flat (Sanrab / Yaba)",
    rentCost: 180000,
    roomType: "Personal Room + Kitchen & Bathroom",
    desc: "Private off-campus sanctuary. You control your space, have your own generator and gas cooker.",
    perks: "Private bathroom (+Hygiene boost), host friends anytime, pay NEPA bill share."
  },
  luxury_flat: {
    id: "luxury_flat",
    name: "2-Bedroom Luxury Serviced Flat (Tanke Oke / Lekki)",
    rentCost: 650000,
    roomType: "Luxury Gated Estate Apartment",
    desc: "Prestige living for Nepo babies and top ballers. Solar inverter, 24/7 security, tiled parking.",
    perks: "100% comfort, massive +35 Clout boost, invite crushes for private dinner."
  }
};

// Vehicles & Mobility Tiers
const VEHICLE_TIERS = {
  trek: { id: "trek", name: "Leggedis Benz (Trekking in Sun)", cost: 0, speed: 1, energyCost: 20, clout: 0 },
  keke: { id: "keke", name: "Campus Keke & Shuttles", cost: 500, speed: 2, energyCost: 10, clout: 5 },
  okada: { id: "okada", name: "Commercial Motorcycle (Okada)", cost: 1500, speed: 3, energyCost: 5, clout: 10 },
  corolla: { id: "corolla", name: "Toyota Corolla 'Muscle'", cost: 2800000, speed: 4, energyCost: 0, clout: 35 },
  benz: { id: "benz", name: "Mercedes Benz C300 / Lexus ES350", cost: 8500000, speed: 5, energyCost: 0, clout: 60 }
};

// 8 Full Academic Semesters Curriculum
const STORY_CHAPTERS = {
  "100L_1": {
    year: 1,
    semester: 1,
    title: "100L First Semester: The Jambite Fresher",
    milestoneEvent: "Matriculation Ceremony & GST 111 CBT",
    desc: "Fresher orientation, lecture queues, 8 AM CBT halls, and hostel politics."
  },
  "100L_2": {
    year: 1,
    semester: 2,
    title: "100L Second Semester: The Reality Check",
    milestoneEvent: "Results Portal Release & Departmental Week",
    desc: "First results release, learning how GPA works, and surviving the second lap."
  },
  "200L_1": {
    year: 2,
    semester: 1,
    title: "200L First Semester: Departmental Depths",
    milestoneEvent: "Off-Campus Lodge Lease & Core 3-Unit Courses",
    desc: "Leaving school hostels for Sanrab or Yaba flats, tough prerequisite courses."
  },
  "200L_2": {
    year: 2,
    semester: 2,
    title: "200L Second Semester: Campus Romance & Clout",
    milestoneEvent: "Valentine Gala, Departmental Excursion & Exams",
    desc: "Finding true campus love, handling relationship drama, and building social clout."
  },
  "300L_1": {
    year: 3,
    semester: 1,
    title: "300L First Semester: SUG Campus Politics",
    milestoneEvent: "Student Union Government Elections & Manifesto Night",
    desc: "Running for campus office, printing campaign posters, and senior student power."
  },
  "300L_2": {
    year: 3,
    semester: 2,
    title: "300L Second Semester: 6-Month SIWES Internship",
    milestoneEvent: "Corporate Tech/Banking IT & Logbook Defense",
    desc: "Relocating to Lagos or Ilorin corporate firm, monthly stipends, and workplace tasks."
  },
  "400L_1": {
    year: 4,
    semester: 1,
    title: "400L First Semester: Final Year Project Genesis",
    milestoneEvent: "Project Topic Approval & Supervisor Matching",
    desc: "Writing literature reviews, thesis drafting, and supervisor corrections."
  },
  "400L_2": {
    year: 4,
    semester: 2,
    title: "400L Second Semester: The Grand Finale",
    milestoneEvent: "External Examiner Defense, Sign-Out Day & NYSC",
    desc: "Defending thesis before external examiners, signed white shirts, and receiving NYSC Call-Up letter!"
  }
};

// Master Game State Manager
class GameState {
  constructor() {
    this.profile = {
      name: "Tunde",
      gender: "male",
      university: "unilorin", // unilorin or unilag
      spawnClass: "trench",   // nepo, trench, scholar
      department: "Computer Science",
      level: "100L",
      avatar: { skin: "caramel", hair: "fade", outfit: "street", accessory: "shades" }
    };

    // 6-Need Stat Engine
    this.stats = {
      energy: 85,    // 0 - 100
      hunger: 70,    // 0 - 100
      hygiene: 80,   // 0 - 100
      fun: 65,       // 0 - 100
      health: 95,    // 0 - 100
      cgpa: 3.45     // 0.00 - 5.00
    };

    this.finances = {
      cash: 12000,
      debt: 0,
      rentDueInDays: 30
    };

    this.housing = "squatter";
    this.vehicle = "trek";
    this.inventory = ["Student ID Card", "Bic Pen"];
    this.roomFurniture = [];

    this.time = {
      day: 1,
      hour: 8,
      minute: 0,
      semesterWeek: 1,
      level: "100L",
      semester: 1
    };

    this.businesses = [];
    this.academics = {
      caScore: 24,
      completedSemesters: [],
      siwesFirm: null,
      siwesWeeks: 0,
      projectTopic: null,
      projectProgress: 0,
      sugOffice: null,
      dinnerAwards: []
    };

    this.powerGrid = { hasLight: true, generatorRunning: false, generatorFuelHours: 0 };
    this.asuuStrike = { active: false, weeksRemaining: 0 };
    this.relationship = { status: "single", partnerName: "Zainab", loyalty: 50 };
    this.dms = {};

    this.currentLocationId = "tanke";
    this.activityLog = [];
    this.activeEvent = null;

    this.chitterFeed = [
      { author: "@tanke_insider", time: "5m ago", text: "Hold-up from Tipper garage to Tanke junction is wicked today. Enter bike if you have 8 AM test! 😭" },
      { author: "@unilorin_crushes", time: "18m ago", text: "Who was that guy in black senator at CBT Centre Hall 2? Your perfume almost made me forget my matric number! 👀🔥" },
      { author: "@unilag_slayers", time: "42m ago", text: "Lagoon Front evening breeze with cold stone ice cream cures all 4-unit course depression. 🌊🍦" },
      { author: "@campus_gist9ja", time: "1h ago", text: "Hostel porter caught 14 boiling rings during midnight search in Block D. Be careful out there! ⚡💀" }
    ];

    this.chats = this.getDefaultChats();
    this.loadGame();
  }

  getDefaultChats() {
    return [
      {
        id: "mummy",
        name: "Mummy ❤️",
        avatar: "👩🏾‍🦱",
        tag: "Family",
        unread: true,
        messages: [
          { sender: "them", text: "My dear child, hope you have settled in your hostel? Have you eaten today? Remember whose child you are! Praying for your First Class. Sending you ₦5,000 for soup ingredients.", time: "07:15" }
        ],
        availableReplies: [
          {
            label: "Thank you mummy! Claim ₦5k alert & prayer 🙏",
            replyText: "Thank you so much Mummy! ₦5,000 alert received. Eating now, God bless you ma! ❤️",
            response: "Amen! Read hard, pray every day, and don't keep bad friends. Mummy loves you!",
            effect: (g) => {
              g.finances.cash += 5000;
              g.stats.fun = Math.min(100, g.stats.fun + 15);
              g.addLog("Mummy sent ₦5,000 soup allowance! (+₦5,000, +15 Fun)", "positive");
            }
          },
          {
            label: "Plead for extra handout money (Handouts cost ₦10,000!)",
            replyText: "Mummy everything is very expensive here o! Handouts and practical manuals alone cost over ₦10,000 🙏",
            response: "Ehya! I will ask your uncle to send you another ₦5,000. Just focus on your exams and pass well!",
            effect: (g) => {
              g.finances.cash += 10000;
              g.stats.fun = Math.min(100, g.stats.fun + 20);
              g.addLog("Mummy took pity and sent ₦10,000! (+₦10,000, +20 Fun)", "positive");
            }
          }
        ]
      },
      {
        id: "courserep",
        name: "Segun (Course Rep) 📢",
        avatar: "🧢",
        tag: "Academic",
        unread: true,
        messages: [
          { sender: "them", text: "URGENT GENERAL ANNOUNCEMENT: Dr. Adeleke just arrived at the lecture theatre! Attendance sheet is already circulating. If you're not in class in 15 minutes, consider this course carried over! 🚨", time: "07:45" }
        ],
        availableReplies: [
          {
            label: "Sprint to class immediately! (-15 Energy, +0.10 CGPA)",
            replyText: "Rep abeg hold on, I'm sprinting from hostel right now! 🏃‍♂️",
            response: "Better hurry up, he is about to lock the doors and tear extra sheets!",
            effect: (g) => {
              g.stats.energy = Math.max(0, g.stats.energy - 15);
              g.stats.cgpa = Math.min(5.0, +(g.stats.cgpa + 0.10).toFixed(2));
              g.addLog("Made it to Dr. Adeleke's lecture just in time! Signed attendance (+0.10 CGPA).", "positive");
            }
          },
          {
            label: "Beg rep to sign attendance for you (-₦1k tip, +Rest)",
            replyText: "Segun my guy, abeg help me write my matric number on that sheet! I will buy you cold minerals later 🙏",
            response: "You owe me big time o. Signed it for you, don't let him catch us!",
            effect: (g) => {
              if (g.finances.cash >= 1000) g.finances.cash -= 1000;
              g.stats.energy = Math.min(100, g.stats.energy + 10);
              g.addLog("Course rep covered your attendance! Saved by connection (+10 Energy).", "positive");
            }
          }
        ]
      },
      {
        id: "roommate",
        name: "Emeka (Roommate) 🔌",
        avatar: "🩳",
        tag: "Hostel",
        unread: true,
        messages: [
          { sender: "them", text: "Bros! You dey room?! I left my boiling ring plugged inside bucket to cook indomie, and chief porter is doing surprise inspection on our floor right now! HELP ME UNPLUG AM! 😱⚡", time: "08:10" }
        ],
        availableReplies: [
          {
            label: "Dash into room and unplug safely (-10 Energy, Avoid Fine)",
            replyText: "Say no more! Just dashed into the room, unplugged it, and hid it under the mattress. We are safe! 🫡",
            response: "Guy you be true brother! When I return, indomie with 2 eggs is on me! 🍜🥚",
            effect: (g) => {
              g.stats.energy = Math.max(0, g.stats.energy - 10);
              g.stats.fun = Math.min(100, g.stats.fun + 15);
              g.addLog("Saved the room from porter raid! Boiling ring safely hidden (+15 Fun).", "positive");
            }
          },
          {
            label: "Guy I'm far away at the CBT centre, I can't make it! 💀",
            replyText: "Omo I dey queue for CBT thumbprint o, I can't leave! Pray for mercy bro 😭",
            response: "Ah! Chief porter has kicked our door open... my boiling ring is gone. Penalty fine is ₦5,000! 😭💔",
            effect: (g) => {
              g.stats.fun = Math.max(0, g.stats.fun - 15);
              g.addLog("Porter seized room appliance! Roommate is mourning his ₦5,000 fine.", "negative");
            }
          }
        ]
      },
      {
        id: "crush",
        name: "Zainab (Campus Crush) ✨",
        avatar: "💅",
        tag: "Social",
        unread: false,
        messages: [
          { sender: "them", text: "Hey! Did you finish yesterday's assignment? Are you going to PTDF Library tonight or should we grab ice cream at Tanke? 👀", time: "Yesterday" }
        ],
        availableReplies: [
          {
            label: "Let's read together at PTDF Library! (+0.08 CGPA, +20 Fun)",
            replyText: "Yes! Let's go to PTDF Library, I can explain questions 3 and 4 to you! 📚✨",
            response: "Aww you're the best! Saving you a seat by the AC vent right now 🥰",
            effect: (g) => {
              g.stats.cgpa = Math.min(5.0, +(g.stats.cgpa + 0.08).toFixed(2));
              g.stats.fun = Math.min(100, g.stats.fun + 20);
              g.addLog("Romantic study date at the library! CGPA & Fun boosted.", "positive");
            }
          },
          {
            label: "Ice cream and suya date on me! (-₦3,500, +45 Fun)",
            replyText: "Forget calculus for an hour, let's get Cold Stone and suya! 🍦🔥",
            response: "Say less! Meeting you there in 20 minutes! 💃",
            effect: (g) => {
              if (g.finances.cash >= 3500) g.finances.cash -= 3500;
              g.stats.fun = Math.min(100, g.stats.fun + 45);
              g.addLog("Epic date chill! Mood fully recharged (+45 Fun).", "positive");
            }
          }
        ]
      },
      {
        id: "caretaker",
        name: "Baba Sanrab (Hostel Caretaker) 💡",
        avatar: "👴🏾",
        tag: "Hostel Bills",
        unread: false,
        messages: [
          { sender: "them", text: "Good day student. NEPA bill and diesel token for the compound generator is due. Each room must bring ₦2,500 today or generator will not enter key tonight.", time: "Yesterday" }
        ],
        availableReplies: [
          {
            label: "Pay ₦2,500 electricity contribution (-₦2,500, Hostel Power On)",
            replyText: "Good day sir, sent ₦2,500 PalmPay transfer now. Please turn on generator on time!",
            response: "Received. Generator will run from 7 PM to 12 AM tonight. Well done.",
            effect: (g) => {
              if (g.finances.cash >= 2500) g.finances.cash -= 2500;
              g.stats.fun = Math.min(100, g.stats.fun + 10);
              g.addLog("Paid hostel generator token. Night light guaranteed! 💡", "positive");
            }
          }
        ]
      }
    ];
  }

  getUnreadChatCount() {
    if (!this.chats) return 0;
    return this.chats.filter(c => c.unread).length;
  }

  sendChatReply(chatId, replyIndex) {
    const chat = this.chats.find(c => c.id === chatId);
    if (!chat || !chat.availableReplies || !chat.availableReplies[replyIndex]) return null;

    const chosen = chat.availableReplies[replyIndex];
    const nowTime = this.formatTime();

    // 1. Add player message
    chat.messages.push({
      sender: "you",
      text: chosen.replyText,
      time: nowTime
    });

    // 2. Execute effects on game engine
    if (typeof chosen.effect === "function") {
      chosen.effect(this);
    }

    // 3. Contact replies back
    chat.messages.push({
      sender: "them",
      text: chosen.response,
      time: nowTime
    });

    // Clear available replies for this thread
    chat.availableReplies = chosen.nextReplies || [];
    chat.unread = false;
    this.saveGame();
    return chosen;
  }

  initFromSpawn(spawnData) {
    this.profile = {
      name: spawnData.name || "Student",
      gender: spawnData.gender || "male",
      hair: spawnData.hair || "fade",
      drip: spawnData.drip || "streetwear",
      avatarEmoji: spawnData.avatarEmoji || (spawnData.gender === "female" ? "👩🏾" : "👨🏾"),
      university: spawnData.university || "unilorin",
      spawnClass: spawnData.spawnClass || "trench",
      department: spawnData.department || "Computer Science",
      level: "100L",
      avatar: spawnData.avatar || { skin: "caramel", hair: "fade", outfit: "street", accessory: "shades" }
    };

    if (this.profile.spawnClass === "nepo") {
      this.stats = { energy: 100, hunger: 90, hygiene: 100, fun: 80, health: 100, cgpa: 3.20 };
      this.finances = { cash: 850000, debt: 0, rentDueInDays: 60 };
      this.housing = "luxury_flat";
      this.vehicle = "corolla";
      this.currentLocationId = this.profile.university === "unilorin" ? "tanke" : "new_hall";
      this.inventory = ["iPhone 16 Pro Max", "Designer Sunglasses", "Perfume Oil"];
      this.roomFurniture = ["Air Conditioner", "Solar Inverter", "PlayStation 5"];
    } else if (this.profile.spawnClass === "scholar") {
      this.stats = { energy: 85, hunger: 65, hygiene: 85, fun: 45, health: 95, cgpa: 4.88 };
      this.finances = { cash: 35000, debt: 0, rentDueInDays: 30 };
      this.housing = "school_hostel";
      this.vehicle = "trek";
      this.currentLocationId = this.profile.university === "unilorin" ? "ps_walkway" : "cits";
      this.inventory = ["Nokia Torch Phone", "10-Year Past Questions", "Reading Glasses"];
      this.roomFurniture = ["Rechargeable Reading Lamp", "Book Shelf"];
    } else {
      // Trench Grinder
      this.stats = { energy: 90, hunger: 50, hygiene: 70, fun: 40, health: 90, cgpa: 3.10 };
      this.finances = { cash: 4500, debt: 0, rentDueInDays: 14 };
      this.housing = "squatter";
      this.vehicle = "trek";
      this.currentLocationId = this.profile.university === "unilorin" ? "sanrab" : "new_hall";
      this.inventory = ["Cracked Android Phone", "Boiling Ring", "Plastic Bucket"];
      this.roomFurniture = ["Foam Mattress on Floor"];
    }

    this.time = { day: 1, hour: 7, minute: 30, semesterWeek: 1, level: "100L", semester: 1 };
    this.businesses = [];
    this.dms = {};
    this.academics = {
      caScore: 24,
      completedSemesters: [],
      siwesFirm: null,
      siwesWeeks: 0,
      projectTopic: null,
      projectProgress: 0,
      sugOffice: null,
      dinnerAwards: []
    };
    this.activityLog = [{ text: `Admitted into ${UNIVERSITIES[this.profile.university].name}! 100L Fresher journey begins.`, type: "positive" }];
    this.chats = this.getDefaultChats();
    this.saveGame();
  }

  saveGame() {
    try {
      const data = {
        profile: this.profile,
        stats: this.stats,
        finances: this.finances,
        housing: this.housing,
        vehicle: this.vehicle,
        inventory: this.inventory,
        roomFurniture: this.roomFurniture,
        time: this.time,
        businesses: this.businesses,
        dms: this.dms,
        academics: this.academics,
        currentLocationId: this.currentLocationId,
        activityLog: this.activityLog.slice(0, 20),
        chats: this.chats,
        powerGrid: this.powerGrid,
        asuuStrike: this.asuuStrike,
        relationship: this.relationship
      };
      localStorage.setItem("campus_life_save", JSON.stringify(data));
      if (window.cloudSync) {
        window.cloudSync.saveToCloud();
      }
    } catch (e) {}
  }

  loadGame() {
    try {
      const saved = localStorage.getItem("campus_life_save");
      if (saved) {
        const parsed = JSON.parse(saved);
        this.profile = parsed.profile || this.profile;
        this.stats = parsed.stats || this.stats;
        this.finances = parsed.finances || this.finances;
        this.housing = parsed.housing || this.housing;
        this.vehicle = parsed.vehicle || this.vehicle;
        this.inventory = parsed.inventory || this.inventory;
        this.roomFurniture = parsed.roomFurniture || this.roomFurniture;
        this.time = parsed.time || this.time;
        if (!this.time.semester) this.time.semester = 1;
        this.businesses = parsed.businesses || [];
        this.dms = parsed.dms || {};
        this.academics = parsed.academics || {
          caScore: 24,
          completedSemesters: [],
          siwesFirm: null,
          siwesWeeks: 0,
          projectTopic: null,
          projectProgress: 0,
          sugOffice: null,
          dinnerAwards: []
        };
        this.currentLocationId = parsed.currentLocationId || this.currentLocationId;
        this.activityLog = parsed.activityLog || this.activityLog;
        this.chats = parsed.chats || this.getDefaultChats();
        this.powerGrid = parsed.powerGrid || { hasLight: true, generatorRunning: false, generatorFuelHours: 0 };
        this.asuuStrike = parsed.asuuStrike || { active: false, weeksRemaining: 0 };
        this.relationship = parsed.relationship || { status: "single", partnerName: "Zainab", loyalty: 50 };
        return true;
      }
    } catch (e) {}
    return false;
  }

  advanceTime(minutes) {
    this.time.minute += minutes;
    while (this.time.minute >= 60) {
      this.time.minute -= 60;
      this.time.hour += 1;
      
      // Hourly subtle needs decay
      this.stats.hunger = Math.max(0, this.stats.hunger - 3);
      this.stats.energy = Math.max(0, this.stats.energy - 2);
      this.stats.hygiene = Math.max(0, this.stats.hygiene - 2);
      this.stats.fun = Math.max(0, this.stats.fun - 2);

      // Generator countdown if running
      if (this.powerGrid.generatorFuelHours > 0) {
        this.powerGrid.generatorFuelHours -= 1;
        if (this.powerGrid.generatorFuelHours === 0) {
          this.powerGrid.generatorRunning = false;
        }
      }

      // Darkness penalties if no light
      if (!this.powerGrid.hasLight && !this.powerGrid.generatorRunning && (this.time.hour >= 19 || this.time.hour <= 5)) {
        this.stats.fun = Math.max(0, this.stats.fun - 3);
      }

      // Random NEPA Outage Chance during evening hours (19:00 - 23:00)
      if (this.powerGrid.hasLight && (this.time.hour >= 19 && this.time.hour <= 23) && Math.random() < 0.08) {
        this.triggerNepaBlackout();
      } else if (!this.powerGrid.hasLight && Math.random() < 0.20) {
        this.triggerUpNepa();
      }

      // Health drops if starving or exhausted
      if (this.stats.hunger === 0 || this.stats.energy === 0) {
        this.stats.health = Math.max(0, this.stats.health - 5);
      }
    }

    if (this.time.hour >= 24) {
      this.time.hour -= 24;
      this.time.day += 1;
      this.finances.rentDueInDays = Math.max(0, this.finances.rentDueInDays - 1);

      // Passive Campus Business Dividends Payout
      if (this.businesses && this.businesses.length > 0) {
        let dailyPayout = 0;
        this.businesses.forEach(b => {
          dailyPayout += b.dailyReturn || 0;
        });
        if (dailyPayout > 0) {
          this.finances.cash += dailyPayout;
          this.addLog(`💼 Daily business dividends paid! Earned ${this.formatMoney(dailyPayout)} from your campus business assets.`, "positive");
        }
      }

      if (this.time.day % 7 === 0) {
        this.time.semesterWeek += 1;
        this.checkSemesterMilestones();
      }
    }

    this.saveGame();
    this.rollRandomEventChance();
  }

  getCurrentCourseCode() {
    const lvl = this.time.level;
    const sem = this.time.semester || 1;
    if (lvl === "100L") return sem === 1 ? "GST 111 (Logic & Campus Culture)" : "GST 112 (Communication & Study Skills)";
    if (lvl === "200L") return sem === 1 ? "CSC 201 (Algorithms & Programming)" : "CSC 204 (Data Structures & Systems)";
    if (lvl === "300L") return sem === 1 ? "CSC 301 (Operating Systems & Software)" : "SIWES 300 (6-Month Industrial Attachment)";
    if (lvl === "400L") return sem === 1 ? "CSC 401 (Cloud Architecture & Database)" : "CSC 499 (Final Year Project Defense)";
    return "GST 111";
  }

  buyBusiness(bizId) {
    const biz = CAMPUS_BUSINESSES.find(b => b.id === bizId);
    if (!biz) return false;
    if (this.businesses.some(b => b.id === bizId)) {
      this.addLog(`You already own ${biz.name}!`, "neutral");
      return false;
    }
    if (this.finances.cash < biz.cost) {
      this.addLog(`Insufficient capital for ${biz.name}! Need ${this.formatMoney(biz.cost)}.`, "negative");
      sfx.playAlert();
      return false;
    }
    this.finances.cash -= biz.cost;
    this.businesses.push({ id: biz.id, name: biz.name, dailyReturn: biz.dailyReturn, icon: biz.icon });
    this.addLog(`🎉 Acquired ${biz.name}! You will earn ${this.formatMoney(biz.dailyReturn)} passive dividends every single morning.`, "positive");
    sfx.playCash();
    this.saveGame();
    return true;
  }

  checkSemesterMilestones() {
    const lvl = this.time.level;
    const sem = this.time.semester || 1;
    const wk = this.time.semesterWeek;

    // 1. ASUU Warning Strike Risk at Week 7 (except SIWES)
    if (wk === 7 && !(lvl === "300L" && sem === 2) && !this.asuuStrike.active && Math.random() < 0.40) {
      this.triggerAsuuStrike();
      return;
    }

    // 2. Week 4 Milestones
    if (wk === 4) {
      if (lvl === "100L" && sem === 1) {
        this.triggerMatriculationEvent();
      } else if (lvl === "200L" && sem === 2) {
        this.triggerRomanceMilestone();
      } else if (lvl === "300L" && sem === 1) {
        this.triggerSugElectionEvent();
      } else if (lvl === "400L" && sem === 1) {
        this.triggerProjectTopicApproval();
      }
    }

    // 3. Week 6: Continuous Assessment (C.A.) Test (30% Continuous Assessment)
    if (wk === 6 && !(lvl === "300L" && sem === 2)) {
      this.triggerCaTest();
    }

    // 4. Week 10: Departmental Dinner Gala (400L Final Year)
    if (wk === 10 && lvl === "400L" && sem === 2) {
      this.triggerDepartmentalDinner();
    }

    // 5. Week 15: Semester Examinations & Academic Transitions
    if (wk >= 15) {
      if (lvl === "300L" && sem === 2) {
        this.triggerSiwesDefense();
      } else if (lvl === "400L" && sem === 2) {
        this.triggerFinalProjectDefense();
      } else {
        this.triggerSemesterExamWeek();
      }
    }
  }

  triggerMatriculationEvent() {
    this.activeEvent = {
      title: "🎓 Official Matriculation Day!",
      desc: "It is official matriculation week! Hundreds of freshers in academic gowns fill the University Auditorium. Your family arrived with coolers of fried rice and chicken. What do you do?",
      options: [
        {
          text: "Rent gown for ₦2,500, take pictures at Senate Building & collect ₦15,000 family upkeep (+₦12,500 net, +35 Fun)",
          outcome: (stats) => {
            if (this.finances.cash >= 2500) this.finances.cash -= 2500;
            this.finances.cash += 15000;
            stats.fun = Math.min(100, stats.fun + 35);
            stats.cgpa = Math.min(5.0, +(stats.cgpa + 0.05).toFixed(2));
            return { msg: "Official matriculation oath signed! Matric number now active on portal. Family gave ₦15k celebration money!", type: "positive" };
          }
        },
        {
          text: "Attend ceremony, listen strictly to the Vice Chancellor's matriculation speech (+0.10 CGPA)",
          outcome: (stats) => {
            stats.cgpa = Math.min(5.0, +(stats.cgpa + 0.10).toFixed(2));
            stats.energy = Math.max(0, stats.energy - 10);
            return { msg: "Understood academic rules and exam ethics from the Vice Chancellor. Headstart on studies!", type: "positive" };
          }
        }
      ]
    };
    sfx.playNotification();
  }

  triggerRomanceMilestone() {
    this.activeEvent = {
      title: "❤️ Campus Valentine Gala & Dinner Date",
      desc: "Valentine week on campus! Red flowers and teddy bears everywhere at Tanke / Lagoon Front. Your campus interest proposes an evening dinner. How do you roll?",
      options: [
        {
          text: "Book a romantic table at Cold Stone & Buka lounge (-₦6,000, +50 Fun, 100% Loyalty)",
          outcome: (stats) => {
            if (this.finances.cash >= 6000) this.finances.cash -= 6000;
            stats.fun = 100;
            this.relationship.loyalty = 100;
            return { msg: "Incredible evening date! Campus relationship is now solid and official ❤️", type: "positive" };
          }
        },
        {
          text: "Solo campus baller: Go for late-night gaming & shawarma chill alone (-₦2,500, +30 Fun)",
          outcome: (stats) => {
            if (this.finances.cash >= 2500) this.finances.cash -= 2500;
            stats.fun = Math.min(100, stats.fun + 30);
            return { msg: "Enjoyed solo freedom and peace of mind with big shawarma and FIFA games!", type: "positive" };
          }
        }
      ]
    };
    sfx.playNotification();
  }

  triggerSugElectionEvent() {
    this.activeEvent = {
      title: "🗳️ Student Union Government (SUG) Elections!",
      desc: "Campus election fever has taken over! Campaign trucks and loud speakers are blasting at the Student Union Building. Where do you stand?",
      options: [
        {
          text: "Run for SUG Director of Socials! Print posters & campaign grills (-₦20,000, +45 Clout, Elected!)",
          outcome: (stats) => {
            if (this.finances.cash >= 20000) this.finances.cash -= 20000;
            stats.fun = Math.min(100, stats.fun + 40);
            this.academics.sugOffice = "SUG Director of Socials";
            return { msg: "🎉 VICTORY! Elected as SUG Director of Socials! You are now a major campus political heavyweight.", type: "special" };
          }
        },
        {
          text: "Run for Departmental Course Rep (Gain lecturer direct access, +0.10 CGPA)",
          outcome: (stats) => {
            this.academics.sugOffice = "Departmental Course Rep";
            stats.cgpa = Math.min(5.0, +(stats.cgpa + 0.10).toFixed(2));
            return { msg: "Elected as Course Representative! You manage test timetables and lecturer assignments.", type: "positive" };
          }
        },
        {
          text: "Vote in elections and collect free campaign jollof rice (+40 Hunger, +15 Fun)",
          outcome: (stats) => {
            stats.hunger = Math.min(100, stats.hunger + 40);
            stats.fun = Math.min(100, stats.fun + 15);
            return { msg: "Cast your vote peacefully and ate sweet campaign jollof rice at the Quadrangle!", type: "positive" };
          }
        }
      ]
    };
    sfx.playNotification();
  }

  triggerProjectTopicApproval() {
    const topics = [
      "AI-Driven Mobile Biometric Attendance & Grade Prediction System",
      "Decentralized Student Micro-Finance & PalmPay Wallet Security",
      "Smart Solar Inverter Power Management for Nigerian Universities",
      "Predictive Disease Diagnosis System for University Teaching Hospital"
    ];
    const assignedTopic = topics[Math.floor(Math.random() * topics.length)];
    this.academics.projectTopic = assignedTopic;
    this.academics.projectProgress = 25;

    this.activeEvent = {
      title: "🔬 400L Final Year Project Topic Approved!",
      desc: `Departmental Project Committee approved your research topic:\n\n"${assignedTopic}"\n\nYou have been assigned to strict supervisor Dr. Adeleke. Chapter 1 proposal draft must begin immediately!`,
      options: [
        {
          text: "Head to campus library to pull IEEE journals & literature papers (+20% Project Progress, -15 Energy)",
          outcome: (stats) => {
            stats.energy = Math.max(0, stats.energy - 15);
            this.academics.projectProgress = Math.min(100, this.academics.projectProgress + 20);
            stats.cgpa = Math.min(5.0, +(stats.cgpa + 0.05).toFixed(2));
            return { msg: "Completed literature review and Chapter 1 draft! Supervisor Dr. Adeleke praised your speed.", type: "positive" };
          }
        },
        {
          text: "Pay a senior tech scholar to assist with software system architecture (-₦15,000, +35% Project)",
          outcome: (stats) => {
            if (this.finances.cash >= 15000) this.finances.cash -= 15000;
            this.academics.projectProgress = Math.min(100, this.academics.projectProgress + 35);
            return { msg: "System architecture and backend database successfully modeled! Project progress at 60%.", type: "positive" };
          }
        }
      ]
    };
    sfx.playNotification();
  }

  triggerCaTest() {
    const code = this.getCurrentCourseCode().split(" ")[0];
    this.activeEvent = {
      title: `📝 Week 6 Continuous Assessment (C.A.) Test: ${code}`,
      desc: `Lecturer walked into the theatre and shouted: 'TEAR A SHEET OF PAPER OR LOG INTO YOUR PHONES!' Continuous assessment test of 30 marks is underway. How prepared are you?`,
      options: [
        {
          text: "Write with deep preparation from past lecture notes (+26/30 C.A. Score, +0.08 CGPA)",
          outcome: (stats) => {
            this.academics.caScore = 26;
            stats.cgpa = Math.min(5.0, +(stats.cgpa + 0.08).toFixed(2));
            stats.energy = Math.max(0, stats.energy - 15);
            return { msg: `Aced the ${code} C.A. test! Scored 26/30 continuous assessment points. (+0.08 CGPA)`, type: "positive" };
          }
        },
        {
          text: "Form study alliance with the front-row scholars (+22/30 C.A. Score, +10 Fun)",
          outcome: (stats) => {
            this.academics.caScore = 22;
            stats.fun = Math.min(100, stats.fun + 10);
            stats.cgpa = Math.min(5.0, +(stats.cgpa + 0.04).toFixed(2));
            return { msg: `Submitted good scripts alongside study group. Scored 22/30 on C.A.!`, type: "positive" };
          }
        }
      ]
    };
    sfx.playNotification();
  }

  triggerDepartmentalDinner() {
    this.activeEvent = {
      title: "🏆 400L Final Year Departmental Dinner & Awards Gala!",
      desc: "The red carpet is laid at the Grand Ball Hall! Coursemates are dressed in sharp tuxedos and elegant dinner gowns. You step in to loud cheers and cameras flashing.",
      options: [
        {
          text: "Step up to the podium and receive 'Student of the Year Award' (+50 Clout, 100% Fun, 100% Health)",
          outcome: (stats) => {
            stats.fun = 100;
            stats.health = 100;
            this.academics.dinnerAwards.push("Student of the Year Plaque 🏆");
            return { msg: "🏆 Standing ovation! Voted 'Most Outstanding Student of the Class'. Golden award plaque received!", type: "special" };
          }
        }
      ]
    };
    sfx.playNotification();
  }

  triggerSiwesDefense() {
    this.activeEvent = {
      title: "🏢 300L 6-Month SIWES Internship Completed!",
      desc: "Your 6 months of corporate industrial training in the tech industry has concluded. The Departmental SIWES Coordinator inspects your weekly logbook and asks technical defense questions.",
      options: [
        {
          text: "Defend your industry technical logbook with live code demo (+100% Logbook Approval, 'A' Grade in SIWES)",
          outcome: (stats) => {
            stats.cgpa = Math.min(5.0, +(stats.cgpa + 0.20).toFixed(2));
            this.finances.cash += 50000;
            this.resolveExamScore(3);
            return { msg: "SIWES Defense Aced with 'A' Grade (6 Credit Units)! Received ₦50,000 final IT allowance. Moving to 400L!", type: "special" };
          }
        }
      ]
    };
    sfx.playNotification();
  }

  triggerFinalProjectDefense() {
    this.activeEvent = {
      title: "🎓 400L Final Year External Examiner Project Defense!",
      desc: "The climax of your university career! The External Examiner from University of Ibadan sits across the panel table with your bound hardcover thesis. Defend your findings!",
      options: [
        {
          text: "Deliver a masterclass presentation defending your research methodology & results",
          outcome: (stats) => {
            stats.cgpa = Math.min(5.0, +(stats.cgpa + 0.25).toFixed(2));
            this.academics.projectProgress = 100;
            this.triggerGraduationCeremony();
            return { msg: "External Examiner nodded in approval: 'Outstanding research work! Recommended for immediate graduation.'", type: "special" };
          }
        }
      ]
    };
    sfx.playNotification();
  }

  triggerNepaBlackout() {
    this.powerGrid.hasLight = false;
    this.addLog("💡 NEPA Took Light! Total darkness in the hostel.", "negative");
    if (window.UI) window.UI.showNepaModal(false);
  }

  triggerUpNepa() {
    this.powerGrid.hasLight = true;
    sfx.playUpNepa();
    this.stats.fun = Math.min(100, this.stats.fun + 20);
    this.addLog("⚡ UP NEPAAAAA! Electric power restored to all hostels! (+20 Fun)", "positive");
    if (window.UI) window.UI.showNepaModal(true);
  }

  triggerAsuuStrike() {
    this.asuuStrike.active = true;
    this.asuuStrike.weeksRemaining = 3;
    this.addLog("🚨 BREAKING: ASUU Declares 3-Week Warning Strike! Campus lectures suspended.", "special");
    if (window.UI) window.UI.showAsuuModal();
  }

  resolveAsuuPath(choice) {
    this.asuuStrike.active = false;
    if (choice === "tech") {
      this.finances.cash += 25000;
      this.stats.cgpa = Math.min(5.0, +(this.stats.cgpa + 0.05).toFixed(2));
      this.addLog("Completed intensive Tech Coding & Design Bootcamp! Landed freelance gigs (+₦25,000, +0.05 CGPA).", "positive");
    } else if (choice === "home") {
      this.stats.hunger = 100;
      this.stats.health = 100;
      this.finances.cash += 15000;
      this.addLog("Returned home to parents! Ate free home-cooked meals & uncle gave ₦15,000 pocket money.", "positive");
    } else if (choice === "business") {
      this.finances.cash += 45000;
      this.stats.energy = Math.max(0, this.stats.energy - 30);
      this.addLog("Ran full-time POS & Okrika business during strike! Made ₦45,000 profit! 💼", "positive");
    } else {
      this.stats.energy = 100;
      this.stats.fun = 100;
      this.addLog("Slept all day and watched movies throughout the strike. Energy 100%! 🍿", "neutral");
    }
    sfx.playNotification();
    this.saveGame();
    if (window.UI) window.UI.renderAll();
  }

  triggerSemesterExamWeek() {
    const course = this.getCurrentCourseCode();
    if (window.UI) {
      window.UI.startCbtExam(course, (score) => {
        this.resolveExamScore(score);
      });
    } else {
      this.resolveExamScore(2);
    }
  }

  resolveExamScore(score) {
    let delta = 0;
    if (score === 3) {
      delta = 0.22;
      this.addLog(`🏆 CBT Exam Aced! Perfect 3/3 on the portal. CGPA boosted (+0.22)!`, "positive");
    } else if (score === 2) {
      delta = 0.10;
      this.addLog(`📝 Exam Passed! Scored 2/3 on the computer. CGPA improved (+0.10).`, "positive");
    } else if (score === 1) {
      delta = -0.05;
      this.addLog(`⚠️ Average Performance. Scored 1/3. CGPA slipped (-0.05).`, "neutral");
    } else {
      delta = -0.25;
      this.addLog(`💀 CBT Exam Disaster! 0/3 score recorded. Carryover warning (-0.25 CGPA)!`, "negative");
    }

    this.stats.cgpa = Math.min(5.0, Math.max(0.5, +(this.stats.cgpa + delta).toFixed(2)));

    // Progress across all 8 Semesters
    const lvl = this.time.level;
    const sem = this.time.semester || 1;

    if (lvl === "100L" && sem === 1) {
      this.time.semester = 2;
      this.addLog("🎓 100L First Semester Complete! Welcome to 100L Second Semester (Rain/Omega).", "special");
    } else if (lvl === "100L" && sem === 2) {
      this.time.level = "200L";
      this.profile.level = "200L";
      this.time.semester = 1;
      this.addLog("🏆 First Year Conquered! Jambite is now an experienced 200L Stalwart.", "special");
    } else if (lvl === "200L" && sem === 1) {
      this.time.semester = 2;
      this.addLog("🔥 200L First Semester Cleared! Welcome to 200L Second Semester.", "special");
    } else if (lvl === "200L" && sem === 2) {
      this.time.level = "300L";
      this.profile.level = "300L";
      this.time.semester = 1;
      this.addLog("🚀 Welcome to 300 Level! SUG Politics & Senior Student status unlocked.", "special");
    } else if (lvl === "300L" && sem === 1) {
      this.time.semester = 2;
      this.addLog("🏢 Welcome to 300L Second Semester: 6-Month SIWES Industrial Attachment (IT)! Time to experience real-world corporate life.", "special");
    } else if (lvl === "300L" && sem === 2) {
      this.time.level = "400L";
      this.profile.level = "400L";
      this.time.semester = 1;
      this.addLog("🏆 Welcome to 400 Level (FINAL YEAR)! Final Year Project research begins.", "special");
    } else if (lvl === "400L" && sem === 1) {
      this.time.semester = 2;
      this.addLog("⚡ FINAL SEMESTER IN NIGERIAN UNIVERSITY! Chapter 4-5 defense and sign-out countdown begins.", "special");
    } else if (lvl === "400L" && sem === 2) {
      this.triggerGraduationCeremony();
      return;
    }

    this.time.semesterWeek = 1;
    this.saveGame();
  }

  triggerGraduationCeremony() {
    let grade = "Third Class";
    if (this.stats.cgpa >= 4.5) grade = "First Class Honours (Distinction 🏆)";
    else if (this.stats.cgpa >= 3.5) grade = "Second Class Upper (2:1)";
    else if (this.stats.cgpa >= 2.4) grade = "Second Class Lower (2:2)";

    const deploymentStates = [
      "Lagos State (Orientation Camp: Iyana Ipaja)",
      "FCT Abuja (Orientation Camp: Kubwa)",
      "Oyo State (Orientation Camp: Iseyin)",
      "Plateau State (Orientation Camp: Mangu)",
      "Rivers State (Orientation Camp: Nonwa Gbam)",
      "Kano State (Orientation Camp: Kusalla)"
    ];
    const postedState = deploymentStates[Math.floor(Math.random() * deploymentStates.length)];

    if (window.UI) {
      window.UI.showSignOutModal({
        name: this.profile.name,
        uni: UNIVERSITIES[this.profile.university].name,
        dept: this.profile.department,
        degreeClass: grade,
        state: postedState
      });
    }

    sfx.playCash();
  }

  getTimePhase() {
    const h = this.time.hour;
    if (h >= 6 && h < 12) return { phase: "morning", label: "Morning" };
    if (h >= 12 && h < 17) return { phase: "afternoon", label: "Afternoon" };
    if (h >= 17 && h < 21) return { phase: "evening", label: "Evening" };
    return { phase: "night", label: "Night" };
  }

  addLog(text, type = "neutral") {
    this.activityLog.unshift({ text, type, time: this.formatTime() });
    if (this.activityLog.length > 30) this.activityLog.pop();
    this.saveGame();
  }

  formatTime() {
    const h = String(this.time.hour).padStart(2, "0");
    const m = String(this.time.minute).padStart(2, "0");
    return `${h}:${m}`;
  }

  formatMoney(num) {
    return "₦" + Number(num).toLocaleString();
  }

  rollRandomEventChance() {
    if (Math.random() < 0.28 && !this.activeEvent) {
      const eligible = CAMPUS_EVENTS.filter(e => !e.uni || e.uni === this.profile.university);
      const chosen = eligible[Math.floor(Math.random() * eligible.length)];
      this.activeEvent = chosen;
      sfx.playAlert();
    }
  }

  // Room & House Actions
  takeShower() {
    this.stats.hygiene = 100;
    this.stats.energy = Math.min(100, this.stats.energy + 10);
    this.advanceTime(25);
    this.addLog("Took a refreshing shower with cold water. Hygiene restored to 100% 🚿", "positive");
    sfx.playNotification();
  }

  sleepInRoom() {
    this.stats.energy = 100;
    this.stats.hunger = Math.max(0, this.stats.hunger - 20);
    this.time.hour = 7;
    this.time.minute = 0;
    this.time.day += 1;
    this.addLog("Slept peacefully on your bed. Woke up fresh at 7:00 AM (Energy 100% ⚡)", "positive");
    sfx.playNotification();
    this.saveGame();
  }

  cookConcoctionRice() {
    if (this.finances.cash < 800) {
      this.addLog("Not enough cash for rice, maggi, and pepper (Need ₦800)", "negative");
      return;
    }
    this.finances.cash -= 800;
    this.stats.hunger = Math.min(100, this.stats.hunger + 55);
    this.advanceTime(45);
    this.addLog("Cooked hot concoction rice in hostel pot. Hunger satisfied (+55 🍔)", "positive");
    sfx.playNotification();
  }

  // Campus Core Actions
  attendLecture() {
    if (this.stats.energy < 20) {
      this.addLog("Too weak to attend lecture! You fell asleep on the hostel bunk.", "negative");
      sfx.playAlert();
      return;
    }
    this.stats.energy -= 20;
    this.stats.hunger = Math.max(0, this.stats.hunger - 15);
    this.stats.hygiene = Math.max(0, this.stats.hygiene - 10);
    this.stats.cgpa = Math.min(5.0, +(this.stats.cgpa + 0.08).toFixed(2));
    this.advanceTime(120);
    this.addLog("Attended 2-hour lecture. Marked attendance and took class notes (+0.08 CGPA 📚)", "positive");
    sfx.playNotification();
  }

  readNightClass() {
    if (this.stats.energy < 35) {
      this.addLog("Not enough energy for TDB night reading! Take a nap first.", "negative");
      sfx.playAlert();
      return;
    }
    this.stats.energy -= 35;
    this.stats.hunger = Math.max(0, this.stats.hunger - 20);
    this.stats.hygiene = Math.max(0, this.stats.hygiene - 15);
    this.stats.cgpa = Math.min(5.0, +(this.stats.cgpa + 0.22).toFixed(2));
    this.advanceTime(300);
    this.addLog("Read TDB overnight at campus lecture hall. Solved past questions (+0.22 CGPA 📚)", "positive");
    sfx.playNotification();
  }

  visitClinic() {
    this.stats.health = 100;
    this.finances.cash = Math.max(0, this.finances.cash - 1500);
    this.advanceTime(90);
    this.addLog("Visited university clinic. Received treatment & rest. Health restored to 100% 💊", "positive");
    sfx.playNotification();
  }

  partyNight() {
    if (this.finances.cash < 8000) {
      this.addLog("Need at least ₦8,000 for club entry, drinks, and late-night cab!", "negative");
      sfx.playAlert();
      return;
    }
    this.finances.cash -= 8000;
    this.stats.energy = Math.max(0, this.stats.energy - 35);
    this.stats.fun = 100;
    this.advanceTime(240);
    this.addLog("Partied all night with campus ballers! Fun 100% 🎉", "positive");
    sfx.playCash();
  }

  // Travel between Locations
  travelTo(locationId) {
    const uni = UNIVERSITIES[this.profile.university];
    const loc = uni.locations.find(l => l.id === locationId);
    if (!loc) return;

    const v = VEHICLE_TIERS[this.vehicle] || VEHICLE_TIERS.trek;
    this.stats.energy = Math.max(0, this.stats.energy - v.energyCost);
    this.currentLocationId = locationId;
    this.advanceTime(20);
    this.addLog(`Arrived at ${loc.name} via ${v.name}.`, "positive");
    sfx.playNotification();
    this.saveGame();
  }

  // Housing Upgrade
  upgradeHousing(tierKey) {
    const tier = HOUSING_TIERS[tierKey];
    if (!tier) return;
    if (this.finances.cash < tier.rentCost) {
      this.addLog(`Insufficient funds for ${tier.name}! (Need ${this.formatMoney(tier.rentCost)})`, "negative");
      sfx.playAlert();
      return;
    }
    this.finances.cash -= tier.rentCost;
    this.housing = tierKey;
    this.finances.rentDueInDays = 60;
    this.addLog(`Moved into ${tier.name}! Your campus comfort has reached a new level.`, "special");
    sfx.playCash();
    this.saveGame();
  }

  buyShopItem(item) {
    if (this.finances.cash < item.cost) {
      this.addLog(`Insufficient funds for ${item.name}! (Cost: ${this.formatMoney(item.cost)})`, "negative");
      sfx.playAlert();
      return false;
    }

    this.finances.cash -= item.cost;
    if (item.hunger) this.stats.hunger = Math.min(100, this.stats.hunger + item.hunger);
    if (item.energy) this.stats.energy = Math.min(100, this.stats.energy + item.energy);
    if (item.hygiene) this.stats.hygiene = Math.min(100, this.stats.hygiene + item.hygiene);
    if (item.fun) this.stats.fun = Math.min(100, this.stats.fun + item.fun);
    if (item.cgpaBoost) this.stats.cgpa = Math.min(5.0, +(this.stats.cgpa + item.cgpaBoost).toFixed(2));

    if (item.category !== "food") {
      this.inventory.push(item.name);
    }

    this.addLog(`Purchased ${item.name} for ${this.formatMoney(item.cost)}.`, "positive");
    sfx.playCash();
    this.saveGame();
    return true;
  }

  doCampusHustle(job) {
    if (this.stats.energy < job.energyCost) {
      this.addLog(`Too exhausted to work ${job.name}! Need ${job.energyCost} Energy ⚡.`, "negative");
      sfx.playAlert();
      return;
    }

    this.stats.energy -= job.energyCost;
    this.advanceTime(90);

    let earned = job.payout;
    if (job.id === "crypto_futures") {
      earned = Math.floor(Math.random() * (job.payoutMax - job.payoutMin + 1)) + job.payoutMin;
    }

    this.finances.cash = Math.max(0, this.finances.cash + earned);
    if (earned >= 0) {
      this.addLog(`Worked ${job.name} and earned ${this.formatMoney(earned)}!`, "positive");
      sfx.playCash();
    } else {
      this.addLog(`Crypto trade liquidated! Lost ${this.formatMoney(Math.abs(earned))}. 📉`, "negative");
      sfx.playAlert();
    }
    this.saveGame();
  }

  postChitterTweet(tweetText) {
    if (!tweetText.trim()) return;
    this.stats.fun = Math.min(100, this.stats.fun + 8);
    this.chitterFeed.unshift({
      author: `@${this.profile.name.toLowerCase()}_${this.profile.university}`,
      time: "Just now",
      text: tweetText
    });
    this.addLog("Posted a viral take on Chitter! Gained fun and engagement 🔥", "positive");
    sfx.playNotification();
    if (window.cloudSync) {
      window.cloudSync.postLiveTweet(tweetText);
    }
    this.saveGame();
  }
}

// Global Game Engine Instance
window.game = new GameState();
window.HOUSING_TIERS = HOUSING_TIERS;
window.VEHICLE_TIERS = VEHICLE_TIERS;
window.STORY_CHAPTERS = STORY_CHAPTERS;
