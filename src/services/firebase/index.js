export * from './auth'
export * from './students'
export * from './messaging'
export { useMockData, isFirebaseConfigured } from '../../firebase/config'

import {
  teachers,
  classes,
  assignments,
  exams,
  fees,
  announcements,
  notifications,
  messages,
  aiInsights,
  schedule,
  campusActivity,
  campusStats,
  subjects,
  todaysFlow,
  performanceSeries,
  attendanceHeatmap,
} from '../../data/demoData'

const delay = (ms = 280) => new Promise((r) => setTimeout(r, ms))

export async function fetchTeachers() {
  await delay()
  return teachers
}

export async function fetchClasses() {
  await delay()
  return classes
}

export async function fetchAssignments() {
  await delay()
  return assignments
}

export async function fetchExams() {
  await delay()
  return exams
}

export async function fetchFees() {
  await delay()
  return fees
}

export async function fetchAnnouncements() {
  await delay(150)
  return announcements
}

export async function fetchNotifications() {
  await delay(120)
  return notifications
}

export async function fetchMessages() {
  await delay()
  return messages
}

export async function fetchAiInsights() {
  await delay(350)
  return aiInsights
}

export async function fetchSchedule() {
  await delay()
  return schedule
}

export async function fetchCampusActivity() {
  await delay(200)
  return campusActivity
}

export async function fetchCampusStats() {
  await delay(200)
  return campusStats
}

export async function fetchSubjects() {
  return subjects
}

export async function fetchTodaysFlow() {
  return todaysFlow
}

export async function fetchPerformanceSeries(range = 'month') {
  await delay()
  return performanceSeries[range] || performanceSeries.month
}

export async function fetchAttendanceHeatmap() {
  await delay()
  return attendanceHeatmap
}
