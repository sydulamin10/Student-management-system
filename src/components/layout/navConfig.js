import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  ClipboardCheck,
  FileText,
  FlaskConical,
  Wallet,
  CalendarDays,
  Megaphone,
  MessageSquare,
  Bell,
  Sparkles,
  Settings,
  HeartHandshake,
  BookOpen,
} from 'lucide-react'

export const adminNav = [
  { to: '/app', label: 'Command Center', icon: LayoutDashboard, end: true },
  { to: '/app/students', label: 'Students', icon: Users },
  { to: '/app/teachers', label: 'Teachers', icon: GraduationCap },
  { to: '/app/classes', label: 'Classes', icon: School },
  { to: '/app/attendance', label: 'Attendance', icon: ClipboardCheck },
  { to: '/app/assignments', label: 'Assignments', icon: FileText },
  { to: '/app/exams', label: 'Exams', icon: FlaskConical },
  { to: '/app/fees', label: 'Fees', icon: Wallet },
  { to: '/app/schedule', label: 'Schedule', icon: CalendarDays },
  { to: '/app/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/app/messages', label: 'Messages', icon: MessageSquare },
  { to: '/app/notifications', label: 'Notifications', icon: Bell },
  { to: '/app/edulens', label: 'EduLens AI', icon: Sparkles },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export const teacherNav = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/classes', label: 'My Classes', icon: School },
  { to: '/app/students', label: 'Students', icon: Users },
  { to: '/app/attendance', label: 'Attendance', icon: ClipboardCheck },
  { to: '/app/assignments', label: 'Assignments', icon: FileText },
  { to: '/app/exams', label: 'Exams', icon: FlaskConical },
  { to: '/app/schedule', label: 'Schedule', icon: CalendarDays },
  { to: '/app/messages', label: 'Messages', icon: MessageSquare },
  { to: '/app/edulens', label: 'EduLens AI', icon: Sparkles },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export const studentNav = [
  { to: '/app/student', label: 'My Journey', icon: BookOpen, end: true },
  { to: '/app/schedule', label: 'Schedule', icon: CalendarDays },
  { to: '/app/assignments', label: 'Assignments', icon: FileText },
  { to: '/app/exams', label: 'Exams', icon: FlaskConical },
  { to: '/app/attendance', label: 'Attendance', icon: ClipboardCheck },
  { to: '/app/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/app/messages', label: 'Messages', icon: MessageSquare },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export const parentNav = [
  { to: '/app/parent', label: 'Family Hub', icon: HeartHandshake, end: true },
  { to: '/app/students', label: 'Child Profile', icon: Users },
  { to: '/app/attendance', label: 'Attendance', icon: ClipboardCheck },
  { to: '/app/assignments', label: 'Assignments', icon: FileText },
  { to: '/app/fees', label: 'Fees', icon: Wallet },
  { to: '/app/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/app/messages', label: 'Messages', icon: MessageSquare },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export const mobilePrimary = {
  admin: [
    { to: '/app', label: 'Today', icon: LayoutDashboard, end: true },
    { to: '/app/attendance', label: 'Attend', icon: ClipboardCheck },
    { to: '/app/assignments', label: 'Tasks', icon: FileText },
    { to: '/app/exams', label: 'Exams', icon: FlaskConical },
    { to: '/app/notifications', label: 'Alerts', icon: Bell },
  ],
  teacher: [
    { to: '/app', label: 'Today', icon: LayoutDashboard, end: true },
    { to: '/app/attendance', label: 'Attend', icon: ClipboardCheck },
    { to: '/app/assignments', label: 'Tasks', icon: FileText },
    { to: '/app/classes', label: 'Classes', icon: School },
    { to: '/app/messages', label: 'Inbox', icon: MessageSquare },
  ],
  student: [
    { to: '/app/student', label: 'Today', icon: BookOpen, end: true },
    { to: '/app/attendance', label: 'Attend', icon: ClipboardCheck },
    { to: '/app/assignments', label: 'Tasks', icon: FileText },
    { to: '/app/exams', label: 'Exams', icon: FlaskConical },
    { to: '/app/announcements', label: 'News', icon: Megaphone },
  ],
  parent: [
    { to: '/app/parent', label: 'Home', icon: HeartHandshake, end: true },
    { to: '/app/attendance', label: 'Attend', icon: ClipboardCheck },
    { to: '/app/assignments', label: 'Tasks', icon: FileText },
    { to: '/app/fees', label: 'Fees', icon: Wallet },
    { to: '/app/messages', label: 'Inbox', icon: MessageSquare },
  ],
}

export function getNavForRole(role) {
  if (role === 'teacher') return teacherNav
  if (role === 'student') return studentNav
  if (role === 'parent') return parentNav
  return adminNav
}
