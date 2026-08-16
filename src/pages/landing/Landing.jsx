import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  GraduationCap,
  LineChart,
  MessageSquare,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import { Badge, Button, Card } from '../../components/ui'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
}

const features = [
  {
    icon: GraduationCap,
    title: 'Unified campus records',
    text: 'Students, classes, attendance, and fees in one living system — never scattered across spreadsheets.',
    accent: 'violet',
  },
  {
    icon: Brain,
    title: 'EduLens intelligence',
    text: 'Surface at-risk students early with trend signals on attendance, GPA, and assignment momentum.',
    accent: 'cyan',
  },
  {
    icon: Users,
    title: 'Role-perfect workspaces',
    text: 'Admins, teachers, students, and parents each get a tailored experience — same truth, different lens.',
    accent: 'lime',
  },
  {
    icon: LineChart,
    title: 'Live academic analytics',
    text: 'Performance, presence, and finance charts that update with campus rhythm — not last month’s PDF.',
    accent: 'amber',
  },
  {
    icon: MessageSquare,
    title: 'Connected communication',
    text: 'Announcements, teacher messages, and guardian alerts stay attached to the student journey.',
    accent: 'rose',
  },
  {
    icon: Shield,
    title: 'Secure by design',
    text: 'Role-based access, audit-friendly activity, and Firebase-backed auth for modern institutions.',
    accent: 'cyan',
  },
]

const roles = [
  {
    role: 'Administrators',
    title: 'Academic Command Center',
    text: 'Campus pulse, fees, exams, and risk signals in one operational view.',
    points: ['Live campus health', 'Fee & exam oversight', 'AI risk insights'],
  },
  {
    role: 'Teachers',
    title: 'Classroom cockpit',
    text: 'Attendance, assignments, and grading flows built for the teaching day.',
    points: ['One-tap attendance', 'Assignment pipelines', 'Class analytics'],
  },
  {
    role: 'Students',
    title: 'Personal academic hub',
    text: 'Schedule, goals, grades, and exams — clarity without the overwhelm.',
    points: ['Today’s schedule', 'Goal progress', 'Grade timeline'],
  },
  {
    role: 'Parents',
    title: 'Guardian window',
    text: 'A calm view of attendance, grades, fees, and teacher messages.',
    points: ['Child snapshot', 'Fee status', 'Teacher updates'],
  },
]

const testimonials = [
  {
    quote:
      'EDUVISTA replaced three tools for us. Our leadership team finally sees the same campus truth in real time.',
    name: 'Nadia Ortega',
    title: 'Principal, Northbridge Academy',
  },
  {
    quote:
      'Parents stopped chasing emails. They open the portal and know exactly where their child stands.',
    name: 'Marcus Chen',
    title: 'Head of Academics',
  },
  {
    quote:
      'The risk signals are the difference. We intervene two weeks earlier than we used to.',
    name: 'Priya Nair',
    title: 'Computer Science Lead',
  },
]

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/mo',
    desc: 'For small schools starting digital.',
    features: ['Up to 300 students', 'Core modules', 'Parent portal', 'Email support'],
    cta: 'Start free trial',
    highlight: false,
  },
  {
    name: 'Campus',
    price: '$149',
    period: '/mo',
    desc: 'The full EDUVISTA command suite.',
    features: [
      'Up to 2,000 students',
      'EduLens AI insights',
      'Advanced analytics',
      'Priority support',
      'Custom roles',
    ],
    cta: 'Get Campus',
    highlight: true,
  },
  {
    name: 'District',
    price: 'Custom',
    period: '',
    desc: 'Multi-campus governance & SSO.',
    features: ['Unlimited students', 'SSO & API', 'Dedicated success', 'Onboarding workshop'],
    cta: 'Talk to us',
    highlight: false,
  },
]

const faqs = [
  {
    q: 'Can we import existing student records?',
    a: 'Yes. CSV and structured imports map to students, classes, guardians, and fee profiles. Our onboarding team can assist with larger migrations.',
  },
  {
    q: 'Is EDUVISTA suitable for K–12 and colleges?',
    a: 'The platform is modular. Grade levels, subjects, and role experiences adapt to secondary schools and higher-ed departments alike.',
  },
  {
    q: 'How does EduLens work?',
    a: 'EduLens watches attendance, GPA trends, and assignment completion to flag risk and opportunity — always with human-readable recommendations.',
  },
  {
    q: 'Do parents need separate accounts?',
    a: 'Parents receive guardian access linked to their child. They see attendance, grades, fees, and messages — nothing more than they need.',
  },
]

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-5xl perspective-[1200px]"
    >
      <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-violet/25 via-cyan/15 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-charcoal shadow-[var(--shadow-lift)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-lime/80" />
          <span className="ml-3 text-xs font-semibold text-white/40">Campus Command · Live</span>
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-12 md:p-6">
          <div className="relative overflow-hidden rounded-[22px] bg-charcoal-soft p-5 md:col-span-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,92,252,0.35),transparent_45%),radial-gradient(circle_at_90%_10%,rgba(45,212,191,0.22),transparent_40%)]" />
            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-cyan">Campus Pulse</p>
              <p className="mt-2 font-display text-3xl text-white">91.4% present today</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ['Students', '32'],
                  ['GPA', '3.48'],
                  ['At risk', '2'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[16px] bg-white/5 px-3 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45">{label}</p>
                    <p className="mt-1 text-xl font-extrabold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3 md:col-span-5">
            {[
              { label: 'Attendance', w: '91%', tone: 'bg-cyan' },
              { label: 'Assignments', w: '78%', tone: 'bg-violet' },
              { label: 'Fees collected', w: '84%', tone: 'bg-lime' },
            ].map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.1 }}
                className="rounded-[18px] border border-white/10 bg-white/5 p-4"
              >
                <div className="mb-2 flex justify-between text-xs font-semibold text-white/70">
                  <span>{row.label}</span>
                  <span>{row.w}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className={`h-full rounded-full ${row.tone}`}
                    initial={{ width: 0 }}
                    animate={{ width: row.w }}
                    transition={{ delay: 0.7 + i * 0.12, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex h-28 items-end gap-1.5 rounded-[22px] border border-white/10 bg-white/[0.03] p-4 md:col-span-12">
            {[40, 55, 48, 72, 68, 80, 76, 88, 82, 94, 90, 96].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-t from-violet to-cyan"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.8 + i * 0.04, type: 'spring', stiffness: 220, damping: 22 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-bold text-ink">{item.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-ink-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm leading-relaxed text-ink-secondary">{item.a}</p>
      </motion.div>
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(0)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 80])

  return (
    <div className="min-h-screen overflow-x-hidden bg-ivory text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-ivory/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-charcoal text-ivory">
              <Sparkles className="h-4 w-4 text-cyan" />
            </span>
            <span className="text-sm font-extrabold tracking-[0.14em]">EDUVISTA</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-ink-secondary md:flex">
            <a href="#features" className="hover:text-ink">
              Features
            </a>
            <a href="#roles" className="hover:text-ink">
              Roles
            </a>
            <a href="#pricing" className="hover:text-ink">
              Pricing
            </a>
            <a href="#faq" className="hover:text-ink">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden h-10 items-center rounded-[14px] px-3 text-sm font-semibold text-ink-secondary hover:text-ink sm:inline-flex"
            >
              Sign in
            </Link>
            <Button size="sm" variant="violet" onClick={() => navigate('/register')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero — brand first, one composition */}
      <section className="relative min-h-[100svh] overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,92,252,0.18),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(45,212,191,0.14),transparent_40%),linear-gradient(180deg,#faf9f7_0%,#f3f1ec_55%,#e8e5de_100%)]" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-noise opacity-50" />

        <motion.div style={{ y: heroY }} className="relative mx-auto flex max-w-6xl flex-col px-5 pb-16 pt-14 md:pt-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p
              variants={fadeUp}
              className="mb-5 text-xs font-extrabold tracking-[0.28em] text-violet"
            >
              EDUVISTA
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.6rem,7vw,4.75rem)] leading-[1.05] tracking-tight text-charcoal"
            >
              Your campus. One intelligent system.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-secondary md:text-lg"
            >
              The academic command layer for modern institutions — attendance, grades, fees, and insight in a single premium workspace.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                variant="primary"
                className="min-w-[160px]"
                onClick={() => navigate('/login')}
              >
                Explore Platform
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="min-w-[160px]"
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>

          <div className="mt-14 md:mt-20">
            <DashboardPreview />
          </div>
        </motion.div>
      </section>

      {/* Why EDUVISTA */}
      <section className="relative py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid items-end gap-10 md:grid-cols-2"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan">Why EDUVISTA</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-charcoal md:text-5xl">
                Built for the rhythm of a real campus.
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-ink-secondary md:text-lg">
              Most school software is a filing cabinet. EDUVISTA is a living system — charcoal-sharp for operators, ivory-calm for families, and intelligent enough to catch what spreadsheets miss.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="mt-14 grid gap-5 md:grid-cols-3"
          >
            {[
              { icon: Zap, title: 'Operational clarity', text: 'Know what’s happening across classrooms before the day ends.' },
              { icon: BookOpen, title: 'Academic integrity', text: 'Grades, exams, and assignments stay auditable and connected.' },
              { icon: BarChart3, title: 'Decision speed', text: 'Dashboards that answer “how are we doing?” in seconds.' },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="rounded-[28px] border border-border bg-surface p-7 shadow-[var(--shadow-soft)]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[14px] bg-charcoal text-cyan">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-charcoal py-24 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan">
              Features
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 font-display text-4xl md:text-5xl">
              Everything your campus needs — nothing it doesn’t.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger}
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="rounded-[22px] border border-white/10 bg-white/[0.04] p-6 transition hover:bg-white/[0.07]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[12px] bg-white/10 text-cyan">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{f.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Academic Intelligence */}
      <section className="py-24 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet">
              Academic Intelligence
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              EduLens sees patterns before they become problems.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-ink-secondary">
              Declining attendance. Assignment backlogs. Sudden GPA dips. EDUVISTA turns quiet signals into clear next steps for counselors, teachers, and guardians.
            </motion.p>
            <motion.ul variants={fadeUp} className="mt-8 space-y-3">
              {[
                'Risk scoring tied to real academic events',
                'Opportunity flags for high performers',
                'Actionable recommendations, not black-box scores',
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm font-semibold text-ink">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-lime/30 text-charcoal">
                    <Check className="h-3 w-3" />
                  </span>
                  {line}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-violet/20 to-cyan/15 blur-xl" />
            <Card hover={false} className="relative space-y-4 border-border bg-surface">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">EduLens</p>
                  <p className="text-lg font-extrabold text-ink">Today’s insights</p>
                </div>
                <Badge tone="rose">3 high</Badge>
              </div>
              {[
                { title: 'Attendance decline', student: 'Rahim Chowdhury', tone: 'rose' },
                { title: 'Assignment backlog', student: 'Ryan Park', tone: 'amber' },
                { title: 'Ready for enrichment', student: 'Hana Yuki', tone: 'lime' },
              ].map((row) => (
                <div
                  key={row.title}
                  className="flex items-center justify-between rounded-[16px] border border-border bg-ivory-soft/60 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-bold text-ink">{row.title}</p>
                    <p className="text-xs text-ink-muted">{row.student}</p>
                  </div>
                  <Badge tone={row.tone}>{row.tone === 'lime' ? 'Opportunity' : 'Risk'}</Badge>
                </div>
              ))}
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Role-based */}
      <section id="roles" className="bg-ivory-soft py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan">
              Role-based experience
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 font-display text-4xl md:text-5xl">
              One system. Four distinct journeys.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-12 grid gap-4 md:grid-cols-2"
          >
            {roles.map((r) => (
              <motion.div
                key={r.role}
                variants={fadeUp}
                className="rounded-[28px] border border-border bg-surface p-7 shadow-[var(--shadow-soft)]"
              >
                <Badge tone="violet">{r.role}</Badge>
                <h3 className="mt-4 text-xl font-extrabold text-ink">{r.title}</h3>
                <p className="mt-2 text-sm text-ink-secondary">{r.text}</p>
                <ul className="mt-5 space-y-2">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <Check className="h-4 w-4 text-cyan" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Analytics */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid items-center gap-12 lg:grid-cols-2"
          >
            <motion.div variants={fadeUp} className="order-2 lg:order-1">
              <div className="rounded-[28px] border border-border bg-charcoal p-6 text-white shadow-[var(--shadow-lift)] md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan">Performance</p>
                <p className="mt-2 text-2xl font-extrabold">Semester momentum</p>
                <div className="mt-8 flex h-40 items-end gap-2">
                  {[45, 58, 52, 70, 66, 82, 78, 90].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-[10px] bg-gradient-to-t from-violet-deep to-cyan"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
                    />
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  {[
                    ['GPA', '3.62'],
                    ['Presence', '93%'],
                    ['Completion', '85%'],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-[14px] bg-white/5 py-3">
                      <p className="text-[10px] font-bold uppercase text-white/45">{k}</p>
                      <p className="text-lg font-extrabold">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="order-1 lg:order-2">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet">Analytics</p>
              <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
                Charts that feel like the campus itself.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-secondary">
                From weekly attendance heatmaps to semester GPA curves — leadership, teachers, and counselors share a visual language that updates with every marked period.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-charcoal py-24 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-extrabold uppercase tracking-[0.18em] text-lime">
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 max-w-xl font-display text-4xl md:text-5xl">
              Trusted by campuses that refuse to run on chaos.
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-12 grid gap-5 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.blockquote
                key={t.name}
                variants={fadeUp}
                className="flex flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.04] p-7"
              >
                <p className="text-base leading-relaxed text-white/80">“{t.quote}”</p>
                <footer className="mt-8">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-white/45">{t.title}</p>
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.p variants={fadeUp} className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan">
              Pricing
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 font-display text-4xl md:text-5xl">
              Clear plans. Serious capability.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-14 grid gap-5 lg:grid-cols-3"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`flex flex-col rounded-[28px] border p-7 ${
                  plan.highlight
                    ? 'border-violet bg-charcoal text-white shadow-[var(--shadow-glow)]'
                    : 'border-border bg-surface shadow-[var(--shadow-soft)]'
                }`}
              >
                <p className={`text-sm font-bold ${plan.highlight ? 'text-cyan' : 'text-violet'}`}>
                  {plan.name}
                </p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="font-display text-5xl">{plan.price}</span>
                  <span className={`mb-2 text-sm ${plan.highlight ? 'text-white/50' : 'text-ink-muted'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mt-2 text-sm ${plan.highlight ? 'text-white/60' : 'text-ink-secondary'}`}>
                  {plan.desc}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-semibold">
                      <Check className={`h-4 w-4 ${plan.highlight ? 'text-lime' : 'text-cyan'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlight ? 'soft' : 'primary'}
                  className={`mt-8 w-full ${plan.highlight ? 'bg-white text-charcoal hover:bg-ivory' : ''}`}
                  onClick={() => navigate('/register')}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-ivory-soft py-24 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center"
          >
            <motion.p variants={fadeUp} className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet">
              FAQ
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 font-display text-4xl md:text-5xl">
              Questions, answered.
            </motion.h2>
          </motion.div>
          <Card hover={false} className="mt-10 divide-y-0 p-2 md:p-4">
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(124,92,252,0.35),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(45,212,191,0.22),transparent_35%)]" />
        <div className="absolute inset-0 bg-noise opacity-40" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="relative mx-auto max-w-3xl px-5 text-center text-white"
        >
          <motion.p variants={fadeUp} className="text-xs font-extrabold tracking-[0.28em] text-cyan">
            EDUVISTA
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 font-display text-4xl leading-tight md:text-6xl">
            Ready to run a calmer campus?
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-lg text-base text-white/60">
            Explore the platform or create an account — your academic command center is a few clicks away.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="bg-white text-charcoal hover:bg-ivory"
              onClick={() => navigate('/login')}
            >
              Explore Platform
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <footer className="border-t border-border bg-ivory py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet" />
            <span className="text-sm font-extrabold tracking-[0.14em]">EDUVISTA</span>
          </div>
          <p className="text-xs text-ink-muted">© {new Date().getFullYear()} EDUVISTA. Premium student management.</p>
          <div className="flex gap-4 text-xs font-semibold text-ink-secondary">
            <Link to="/login" className="hover:text-ink">
              Sign in
            </Link>
            <Link to="/register" className="hover:text-ink">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
