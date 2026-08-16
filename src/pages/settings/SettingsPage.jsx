import { useState } from 'react'
import { motion } from 'framer-motion'
import { BellRing, Moon, Save, Sun } from 'lucide-react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Select,
  Tabs,
  Textarea,
} from '../../components/ui'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { staggerContainer, staggerItem } from '../../animations/variants'
import { cn } from '../../utils/cn'
import {
  getSavedPushToken,
  requestPushPermission,
} from '../../services/firebase/messaging'

const TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'institution', label: 'Institution' },
  { id: 'users', label: 'Users' },
  { id: 'roles', label: 'Roles & Permissions' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'academic', label: 'Academic Settings' },
  { id: 'fees', label: 'Fee Settings' },
  { id: 'security', label: 'Security' },
  { id: 'appearance', label: 'Appearance' },
]

const ROLE_MATRIX = [
  { key: 'students', label: 'Students' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'grades', label: 'Grades' },
  { key: 'fees', label: 'Fees' },
  { key: 'announcements', label: 'Announcements' },
  { key: 'settings', label: 'Settings' },
]

const ROLES = ['Admin', 'Teacher', 'Counselor', 'Finance']

function Toggle({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-[16px] border border-border px-4 py-3 text-left transition hover:bg-ivory-soft/70"
    >
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        {description && <p className="mt-0.5 text-xs text-ink-muted">{description}</p>}
      </div>
      <span
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition',
          checked ? 'bg-violet' : 'bg-ivory-muted'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition',
            checked ? 'left-[22px]' : 'left-0.5'
          )}
        />
      </span>
    </button>
  )
}

export default function SettingsPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const { theme, isDark, toggleTheme, setTheme } = useTheme()
  const [tab, setTab] = useState('profile')
  const [pushBusy, setPushBusy] = useState(false)
  const [pushToken, setPushToken] = useState(() => getSavedPushToken())

  const [profile, setProfile] = useState({
    name: user?.name || 'Alex Rivera',
    email: user?.email || 'admin@eduvista.edu',
    title: user?.title || 'Campus Administrator',
    phone: '+1 415 200 1000',
    bio: 'Leading campus operations, academic quality, and family engagement at EDUVISTA.',
  })

  const [institution, setInstitution] = useState({
    name: 'EDUVISTA Academy',
    code: 'EVA-01',
    address: '1200 Scholar Way, San Francisco, CA',
    timezone: 'America/Los_Angeles',
    semester: 'Fall 2026',
    website: 'https://eduvista.edu',
  })

  const [notifPrefs, setNotifPrefs] = useState({
    email: true,
    push: true,
    attendance: true,
    fees: true,
    exams: true,
    digests: false,
  })

  const [academic, setAcademic] = useState({
    gradingScale: '4.0',
    passMark: '60',
    attendanceThreshold: '75',
    lateGraceMinutes: '10',
    termStart: '2026-08-15',
    termEnd: '2026-12-18',
  })

  const [feeSettings, setFeeSettings] = useState({
    currency: 'USD',
    lateFeePercent: '2.5',
    dueDay: '31',
    onlinePayments: true,
    receipts: true,
    installmentPlans: true,
  })

  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionTimeout: '60',
    passwordRotation: '90',
    loginAlerts: true,
  })

  const [permissions, setPermissions] = useState(() => {
    const base = {}
    ROLES.forEach((role) => {
      base[role] = {}
      ROLE_MATRIX.forEach((m) => {
        base[role][m.key] =
          role === 'Admin' ||
          (role === 'Teacher' && ['students', 'attendance', 'grades', 'announcements'].includes(m.key)) ||
          (role === 'Counselor' && ['students', 'attendance'].includes(m.key)) ||
          (role === 'Finance' && ['fees', 'students'].includes(m.key))
      })
    })
    return base
  })

  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Teacher')
  const [appearanceExtras, setAppearanceExtras] = useState({
    compactNav: false,
    motion: true,
  })

  const save = (section) => {
    toast(`${section} settings saved`, 'success')
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-8"
    >
      <motion.div variants={staggerItem}>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-violet">
          Configuration
        </p>
        <h1 className="mt-1 font-display text-3xl text-ink md:text-4xl">Settings</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Manage profile, institution, access, and campus preferences.
        </p>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
      </motion.div>

      <motion.div variants={staggerItem}>
        {tab === 'profile' && (
          <Card className="space-y-5">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar src={user?.avatar} name={profile.name} size="xl" />
              <div>
                <h2 className="text-lg font-bold text-ink">{profile.name}</h2>
                <p className="text-sm text-ink-muted">{profile.title}</p>
                <Badge tone="violet" className="mt-2">
                  {user?.role || 'admin'}
                </Badge>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Full name"
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              />
              <Input
                label="Email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              />
              <Input
                label="Title"
                value={profile.title}
                onChange={(e) => setProfile((p) => ({ ...p, title: e.target.value }))}
              />
              <Input
                label="Phone"
                value={profile.phone}
                onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
              />
            </div>
            <Textarea
              label="Bio"
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            />
            <div className="flex justify-end">
              <Button variant="violet" onClick={() => save('Profile')}>
                <Save className="h-4 w-4" />
                Save profile
              </Button>
            </div>
          </Card>
        )}

        {tab === 'institution' && (
          <Card className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-ink">Institution</h2>
              <p className="text-sm text-ink-muted">Campus identity and academic calendar defaults.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Institution name"
                value={institution.name}
                onChange={(e) => setInstitution((p) => ({ ...p, name: e.target.value }))}
              />
              <Input
                label="Campus code"
                value={institution.code}
                onChange={(e) => setInstitution((p) => ({ ...p, code: e.target.value }))}
              />
              <Input
                label="Address"
                className="md:col-span-2"
                value={institution.address}
                onChange={(e) => setInstitution((p) => ({ ...p, address: e.target.value }))}
              />
              <Select
                label="Timezone"
                value={institution.timezone}
                onChange={(e) => setInstitution((p) => ({ ...p, timezone: e.target.value }))}
              >
                <option value="America/Los_Angeles">Pacific (LA)</option>
                <option value="America/New_York">Eastern (NY)</option>
                <option value="Europe/London">London</option>
                <option value="Asia/Dhaka">Dhaka</option>
              </Select>
              <Input
                label="Current semester"
                value={institution.semester}
                onChange={(e) => setInstitution((p) => ({ ...p, semester: e.target.value }))}
              />
              <Input
                label="Website"
                value={institution.website}
                onChange={(e) => setInstitution((p) => ({ ...p, website: e.target.value }))}
              />
            </div>
            <div className="flex justify-end">
              <Button variant="violet" onClick={() => save('Institution')}>
                <Save className="h-4 w-4" />
                Save institution
              </Button>
            </div>
          </Card>
        )}

        {tab === 'users' && (
          <Card className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-ink">Users</h2>
              <p className="text-sm text-ink-muted">Invite staff and manage access roles.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_180px_auto]">
              <Input
                label="Invite email"
                type="email"
                placeholder="colleague@eduvista.edu"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <Select
                label="Role"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Select>
              <div className="flex items-end">
                <Button
                  variant="violet"
                  className="w-full"
                  onClick={() => {
                    if (!inviteEmail.includes('@')) {
                      toast('Enter a valid email', 'error')
                      return
                    }
                    toast(`Invite sent to ${inviteEmail} as ${inviteRole}`, 'success')
                    setInviteEmail('')
                  }}
                >
                  Send invite
                </Button>
              </div>
            </div>
            <div className="divide-y divide-border rounded-[18px] border border-border">
              {[
                { name: 'Alex Rivera', role: 'Admin', status: 'Active' },
                { name: 'Dr. Amara Okonkwo', role: 'Teacher', status: 'Active' },
                { name: 'Priya Nair', role: 'Teacher', status: 'Active' },
                { name: 'Finance Desk', role: 'Finance', status: 'Pending' },
              ].map((u) => (
                <div
                  key={u.name}
                  className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{u.name}</p>
                      <p className="text-xs text-ink-muted">{u.role}</p>
                    </div>
                  </div>
                  <Badge tone={u.status === 'Active' ? 'lime' : 'amber'}>{u.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === 'roles' && (
          <Card className="space-y-5 overflow-x-auto">
            <div>
              <h2 className="text-lg font-bold text-ink">Roles & Permissions</h2>
              <p className="text-sm text-ink-muted">
                Toggle module access per role. Changes apply after save.
              </p>
            </div>
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-[0.08em] text-ink-muted">
                  <th className="pb-3 pr-4 font-semibold">Module</th>
                  {ROLES.map((r) => (
                    <th key={r} className="pb-3 px-2 font-semibold">
                      {r}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROLE_MATRIX.map((mod) => (
                  <tr key={mod.key} className="border-b border-border/70">
                    <td className="py-3 pr-4 font-semibold text-ink">{mod.label}</td>
                    {ROLES.map((role) => (
                      <td key={role} className="px-2 py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-violet"
                          checked={permissions[role][mod.key]}
                          onChange={(e) =>
                            setPermissions((prev) => ({
                              ...prev,
                              [role]: { ...prev[role], [mod.key]: e.target.checked },
                            }))
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <Button variant="violet" onClick={() => save('Roles & permissions')}>
                <Save className="h-4 w-4" />
                Save permissions
              </Button>
            </div>
          </Card>
        )}

        {tab === 'notifications' && (
          <Card className="space-y-3">
            <div className="mb-2">
              <h2 className="text-lg font-bold text-ink">Notification preferences</h2>
              <p className="text-sm text-ink-muted">Choose how campus alerts reach you.</p>
            </div>
            <Toggle
              label="Email notifications"
              description="Receive alerts in your inbox"
              checked={notifPrefs.email}
              onChange={(v) => setNotifPrefs((p) => ({ ...p, email: v }))}
            />
            <Toggle
              label="Push notifications"
              description="Firebase Cloud Messaging web push"
              checked={notifPrefs.push}
              onChange={async (v) => {
                setNotifPrefs((p) => ({ ...p, push: v }))
                if (!v) return
                setPushBusy(true)
                try {
                  const result = await requestPushPermission(user?.id)
                  if (result.token) {
                    setPushToken(result.token)
                    toast('Browser push enabled')
                  } else {
                    setNotifPrefs((p) => ({ ...p, push: false }))
                    toast(result.reason || 'Unable to enable push', 'error')
                  }
                } catch (err) {
                  setNotifPrefs((p) => ({ ...p, push: false }))
                  toast(err.message || 'Push setup failed', 'error')
                } finally {
                  setPushBusy(false)
                }
              }}
            />
            <div className="rounded-[16px] border border-border bg-ivory-soft/50 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <BellRing className="h-4 w-4 text-violet" />
                    FCM device token
                  </p>
                  <p className="mt-1 break-all font-mono text-[11px] text-ink-muted">
                    {pushToken || 'Not registered yet — enable push above'}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  loading={pushBusy}
                  onClick={async () => {
                    setPushBusy(true)
                    try {
                      const result = await requestPushPermission(user?.id)
                      if (result.token) {
                        setPushToken(result.token)
                        setNotifPrefs((p) => ({ ...p, push: true }))
                        toast('Push token refreshed')
                      } else {
                        toast(result.reason || 'Unable to refresh token', 'error')
                      }
                    } catch (err) {
                      toast(err.message || 'Push setup failed', 'error')
                    } finally {
                      setPushBusy(false)
                    }
                  }}
                >
                  Enable
                </Button>
              </div>
            </div>
            <Toggle
              label="Attendance alerts"
              description="Missing or late class marks"
              checked={notifPrefs.attendance}
              onChange={(v) => setNotifPrefs((p) => ({ ...p, attendance: v }))}
            />
            <Toggle
              label="Fee alerts"
              description="Payments, overdue, receipts"
              checked={notifPrefs.fees}
              onChange={(v) => setNotifPrefs((p) => ({ ...p, fees: v }))}
            />
            <Toggle
              label="Exam reminders"
              description="Upcoming exams and schedule changes"
              checked={notifPrefs.exams}
              onChange={(v) => setNotifPrefs((p) => ({ ...p, exams: v }))}
            />
            <Toggle
              label="Weekly digest"
              description="Sunday summary of campus activity"
              checked={notifPrefs.digests}
              onChange={(v) => setNotifPrefs((p) => ({ ...p, digests: v }))}
            />
            <div className="flex justify-end pt-2">
              <Button variant="violet" onClick={() => save('Notification')}>
                <Save className="h-4 w-4" />
                Save preferences
              </Button>
            </div>
          </Card>
        )}

        {tab === 'academic' && (
          <Card className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-ink">Academic settings</h2>
              <p className="text-sm text-ink-muted">Grading, attendance policy, and term dates.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Select
                label="Grading scale"
                value={academic.gradingScale}
                onChange={(e) => setAcademic((p) => ({ ...p, gradingScale: e.target.value }))}
              >
                <option value="4.0">4.0 GPA</option>
                <option value="5.0">5.0 Weighted</option>
                <option value="100">Percentage (100)</option>
              </Select>
              <Input
                label="Pass mark (%)"
                type="number"
                value={academic.passMark}
                onChange={(e) => setAcademic((p) => ({ ...p, passMark: e.target.value }))}
              />
              <Input
                label="Attendance threshold (%)"
                type="number"
                value={academic.attendanceThreshold}
                onChange={(e) =>
                  setAcademic((p) => ({ ...p, attendanceThreshold: e.target.value }))
                }
              />
              <Input
                label="Late grace (minutes)"
                type="number"
                value={academic.lateGraceMinutes}
                onChange={(e) =>
                  setAcademic((p) => ({ ...p, lateGraceMinutes: e.target.value }))
                }
              />
              <Input
                label="Term start"
                type="date"
                value={academic.termStart}
                onChange={(e) => setAcademic((p) => ({ ...p, termStart: e.target.value }))}
              />
              <Input
                label="Term end"
                type="date"
                value={academic.termEnd}
                onChange={(e) => setAcademic((p) => ({ ...p, termEnd: e.target.value }))}
              />
            </div>
            <div className="flex justify-end">
              <Button variant="violet" onClick={() => save('Academic')}>
                <Save className="h-4 w-4" />
                Save academic settings
              </Button>
            </div>
          </Card>
        )}

        {tab === 'fees' && (
          <Card className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-ink">Fee settings</h2>
              <p className="text-sm text-ink-muted">Billing rules and payment options.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Select
                label="Currency"
                value={feeSettings.currency}
                onChange={(e) => setFeeSettings((p) => ({ ...p, currency: e.target.value }))}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="BDT">BDT</option>
              </Select>
              <Input
                label="Late fee (%)"
                type="number"
                step="0.1"
                value={feeSettings.lateFeePercent}
                onChange={(e) =>
                  setFeeSettings((p) => ({ ...p, lateFeePercent: e.target.value }))
                }
              />
              <Input
                label="Monthly due day"
                type="number"
                min="1"
                max="28"
                value={feeSettings.dueDay}
                onChange={(e) => setFeeSettings((p) => ({ ...p, dueDay: e.target.value }))}
              />
            </div>
            <div className="space-y-3">
              <Toggle
                label="Online payments"
                description="Accept card and bank transfers"
                checked={feeSettings.onlinePayments}
                onChange={(v) => setFeeSettings((p) => ({ ...p, onlinePayments: v }))}
              />
              <Toggle
                label="Automatic receipts"
                description="Email PDF receipts on payment"
                checked={feeSettings.receipts}
                onChange={(v) => setFeeSettings((p) => ({ ...p, receipts: v }))}
              />
              <Toggle
                label="Installment plans"
                description="Allow split tuition schedules"
                checked={feeSettings.installmentPlans}
                onChange={(v) => setFeeSettings((p) => ({ ...p, installmentPlans: v }))}
              />
            </div>
            <div className="flex justify-end">
              <Button variant="violet" onClick={() => save('Fee')}>
                <Save className="h-4 w-4" />
                Save fee settings
              </Button>
            </div>
          </Card>
        )}

        {tab === 'security' && (
          <Card className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-ink">Security</h2>
              <p className="text-sm text-ink-muted">Protect accounts and campus sessions.</p>
            </div>
            <div className="space-y-3">
              <Toggle
                label="Two-factor authentication"
                description="Require OTP on sign-in"
                checked={security.twoFactor}
                onChange={(v) => setSecurity((p) => ({ ...p, twoFactor: v }))}
              />
              <Toggle
                label="Login alerts"
                description="Email when a new device signs in"
                checked={security.loginAlerts}
                onChange={(v) => setSecurity((p) => ({ ...p, loginAlerts: v }))}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Select
                label="Session timeout (minutes)"
                value={security.sessionTimeout}
                onChange={(e) => setSecurity((p) => ({ ...p, sessionTimeout: e.target.value }))}
              >
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="120">120</option>
                <option value="240">240</option>
              </Select>
              <Select
                label="Password rotation (days)"
                value={security.passwordRotation}
                onChange={(e) =>
                  setSecurity((p) => ({ ...p, passwordRotation: e.target.value }))
                }
              >
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="90">90</option>
                <option value="180">180</option>
              </Select>
            </div>
            <div className="flex justify-end">
              <Button variant="violet" onClick={() => save('Security')}>
                <Save className="h-4 w-4" />
                Save security settings
              </Button>
            </div>
          </Card>
        )}

        {tab === 'appearance' && (
          <Card className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-ink">Appearance</h2>
              <p className="text-sm text-ink-muted">
                Theme and interface density for your workspace.
              </p>
            </div>

            <div className="rounded-[18px] border border-border bg-ivory-soft/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Color mode
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant={!isDark ? 'violet' : 'secondary'}
                  onClick={() => setTheme('light')}
                >
                  <Sun className="h-4 w-4" />
                  Light
                </Button>
                <Button
                  variant={isDark ? 'violet' : 'secondary'}
                  onClick={() => setTheme('dark')}
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </Button>
                <Button variant="ghost" onClick={toggleTheme}>
                  Toggle ({theme})
                </Button>
              </div>
            </div>

            <Toggle
              label="Compact navigation"
              description="Reduce sidebar spacing on large screens"
              checked={appearanceExtras.compactNav}
              onChange={(v) => setAppearanceExtras((p) => ({ ...p, compactNav: v }))}
            />
            <Toggle
              label="Motion accents"
              description="Keep entrance animations enabled"
              checked={appearanceExtras.motion}
              onChange={(v) => setAppearanceExtras((p) => ({ ...p, motion: v }))}
            />

            <div className="flex justify-end">
              <Button variant="violet" onClick={() => save('Appearance')}>
                <Save className="h-4 w-4" />
                Save appearance
              </Button>
            </div>
          </Card>
        )}
      </motion.div>
    </motion.div>
  )
}
