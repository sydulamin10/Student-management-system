import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { RoleGate } from './components/auth/RoleGate'
import { AppShell } from './components/layout/AppShell'
import Landing from './pages/landing/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import StudentPortal from './pages/dashboard/StudentPortal'
import ParentPortal from './pages/dashboard/ParentPortal'
import StudentsPage from './pages/students/StudentsPage'
import StudentProfile from './pages/students/StudentProfile'
import TeachersPage from './pages/teachers/TeachersPage'
import ClassesPage from './pages/classes/ClassesPage'
import ClassDetail from './pages/classes/ClassDetail'
import AttendancePage from './pages/attendance/AttendancePage'
import AssignmentsPage from './pages/assignments/AssignmentsPage'
import AssignmentDetail from './pages/assignments/AssignmentDetail'
import ExamsPage from './pages/exams/ExamsPage'
import FeesPage from './pages/fees/FeesPage'
import SchedulePage from './pages/schedule/SchedulePage'
import AnnouncementsPage from './pages/announcements/AnnouncementsPage'
import MessagesPage from './pages/messages/MessagesPage'
import NotificationsPage from './pages/notifications/NotificationsPage'
import EduLensPage from './pages/ai/EduLensPage'
import SettingsPage from './pages/settings/SettingsPage'

function RoleHome() {
  const { user } = useAuth()
  if (user?.role === 'student') return <Navigate to="/app/student" replace />
  if (user?.role === 'parent') return <Navigate to="/app/parent" replace />
  return <AdminDashboard />
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ForgotPassword />} />

              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppShell />
                  </ProtectedRoute>
                }
              >
                <Route index element={<RoleHome />} />
                <Route
                  path="student"
                  element={
                    <RoleGate roles={['student', 'admin']}>
                      <StudentPortal />
                    </RoleGate>
                  }
                />
                <Route
                  path="parent"
                  element={
                    <RoleGate roles={['parent', 'admin']}>
                      <ParentPortal />
                    </RoleGate>
                  }
                />
                <Route path="students" element={<StudentsPage />} />
                <Route path="students/:id" element={<StudentProfile />} />
                <Route path="teachers" element={<TeachersPage />} />
                <Route path="classes" element={<ClassesPage />} />
                <Route path="classes/:id" element={<ClassDetail />} />
                <Route path="attendance" element={<AttendancePage />} />
                <Route path="assignments" element={<AssignmentsPage />} />
                <Route path="assignments/:id" element={<AssignmentDetail />} />
                <Route path="exams" element={<ExamsPage />} />
                <Route path="fees" element={<FeesPage />} />
                <Route path="schedule" element={<SchedulePage />} />
                <Route path="announcements" element={<AnnouncementsPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="edulens" element={<EduLensPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
