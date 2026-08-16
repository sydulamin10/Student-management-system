import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore'
import { db, useMockData } from '../../firebase/config'
import { students as mockStudents } from '../../data/demoData'

let localStudents = [...mockStudents]

export async function getStudents(filters = {}) {
  if (useMockData) {
    let list = [...localStudents]
    if (filters.class) list = list.filter((s) => s.class === filters.class)
    if (filters.department) list = list.filter((s) => s.department === filters.department)
    if (filters.gender) list = list.filter((s) => s.gender === filters.gender)
    if (filters.status) list = list.filter((s) => s.status === filters.status)
    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q)
      )
    }
    if (filters.minAttendance != null) {
      list = list.filter((s) => s.attendance >= filters.minAttendance)
    }
    if (filters.minGpa != null) {
      list = list.filter((s) => s.gpa >= filters.minGpa)
    }
    return list
  }

  const snap = await getDocs(collection(db, 'students'))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getStudentById(id) {
  if (useMockData) {
    return localStudents.find((s) => s.id === id) || null
  }
  const snap = await getDoc(doc(db, 'students', id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function createStudent(data) {
  if (useMockData) {
    const student = {
      ...data,
      id: data.id || `STU-${2500 + localStudents.length}`,
      avatar:
        data.avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`,
    }
    localStudents = [student, ...localStudents]
    return student
  }
  const ref = await addDoc(collection(db, 'students'), data)
  return { id: ref.id, ...data }
}

export async function updateStudent(id, data) {
  if (useMockData) {
    localStudents = localStudents.map((s) => (s.id === id ? { ...s, ...data } : s))
    return localStudents.find((s) => s.id === id)
  }
  await updateDoc(doc(db, 'students', id), data)
  return { id, ...data }
}

export async function deleteStudent(id) {
  if (useMockData) {
    localStudents = localStudents.filter((s) => s.id !== id)
    return true
  }
  await deleteDoc(doc(db, 'students', id))
  return true
}

export async function getStudentsByClass(className) {
  if (useMockData) return localStudents.filter((s) => s.class === className)
  const q = query(collection(db, 'students'), where('class', '==', className))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
