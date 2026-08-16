const avatar = (seed) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`

export const departments = [
  'Science',
  'Mathematics',
  'Humanities',
  'Languages',
  'Arts',
  'Commerce',
  'Physical Education',
  'Computer Science',
]

export const subjects = [
  { id: 'sub-1', name: 'Mathematics', code: 'MATH', department: 'Mathematics', color: '#7C5CFC' },
  { id: 'sub-2', name: 'Physics', code: 'PHY', department: 'Science', color: '#2DD4BF' },
  { id: 'sub-3', name: 'Chemistry', code: 'CHEM', department: 'Science', color: '#A3E635' },
  { id: 'sub-4', name: 'Biology', code: 'BIO', department: 'Science', color: '#34D399' },
  { id: 'sub-5', name: 'English Literature', code: 'ENG', department: 'Languages', color: '#FB7185' },
  { id: 'sub-6', name: 'History', code: 'HIST', department: 'Humanities', color: '#FBBF24' },
  { id: 'sub-7', name: 'Computer Science', code: 'CS', department: 'Computer Science', color: '#60A5FA' },
  { id: 'sub-8', name: 'Economics', code: 'ECO', department: 'Commerce', color: '#A78BFA' },
  { id: 'sub-9', name: 'Art & Design', code: 'ART', department: 'Arts', color: '#F472B6' },
  { id: 'sub-10', name: 'Physical Education', code: 'PE', department: 'Physical Education', color: '#38BDF8' },
]

export const teachers = [
  { id: 't-1', name: 'Dr. Amara Okonkwo', email: 'amara.okonkwo@eduvista.edu', subject: 'Mathematics', department: 'Mathematics', classes: ['10-A', '10-B', '11-A'], attendance: 98, performance: 4.8, phone: '+1 415 200 1101', avatar: avatar('Amara'), status: 'active', experience: 12 },
  { id: 't-2', name: 'Prof. Marcus Chen', email: 'marcus.chen@eduvista.edu', subject: 'Physics', department: 'Science', classes: ['11-A', '12-A'], attendance: 96, performance: 4.6, phone: '+1 415 200 1102', avatar: avatar('Marcus'), status: 'active', experience: 15 },
  { id: 't-3', name: 'Elena Vasquez', email: 'elena.vasquez@eduvista.edu', subject: 'Chemistry', department: 'Science', classes: ['10-A', '11-B'], attendance: 97, performance: 4.7, phone: '+1 415 200 1103', avatar: avatar('Elena'), status: 'active', experience: 9 },
  { id: 't-4', name: 'James Whitfield', email: 'james.whitfield@eduvista.edu', subject: 'English Literature', department: 'Languages', classes: ['9-A', '10-B', '11-A'], attendance: 95, performance: 4.5, phone: '+1 415 200 1104', avatar: avatar('JamesW'), status: 'active', experience: 11 },
  { id: 't-5', name: 'Priya Nair', email: 'priya.nair@eduvista.edu', subject: 'Computer Science', department: 'Computer Science', classes: ['11-B', '12-A', '12-B'], attendance: 99, performance: 4.9, phone: '+1 415 200 1105', avatar: avatar('Priya'), status: 'active', experience: 8 },
  { id: 't-6', name: 'Omar Hassan', email: 'omar.hassan@eduvista.edu', subject: 'History', department: 'Humanities', classes: ['9-B', '10-A'], attendance: 94, performance: 4.4, phone: '+1 415 200 1106', avatar: avatar('Omar'), status: 'active', experience: 14 },
  { id: 't-7', name: 'Sophie Laurent', email: 'sophie.laurent@eduvista.edu', subject: 'Biology', department: 'Science', classes: ['9-A', '10-B'], attendance: 97, performance: 4.6, phone: '+1 415 200 1107', avatar: avatar('Sophie'), status: 'active', experience: 10 },
  { id: 't-8', name: 'Kenji Tanaka', email: 'kenji.tanaka@eduvista.edu', subject: 'Economics', department: 'Commerce', classes: ['11-A', '12-B'], attendance: 96, performance: 4.5, phone: '+1 415 200 1108', avatar: avatar('Kenji'), status: 'active', experience: 7 },
  { id: 't-9', name: 'Isabella Romano', email: 'isabella.romano@eduvista.edu', subject: 'Art & Design', department: 'Arts', classes: ['9-A', '9-B', '10-A'], attendance: 98, performance: 4.8, phone: '+1 415 200 1109', avatar: avatar('Isabella'), status: 'active', experience: 6 },
  { id: 't-10', name: 'David Mwangi', email: 'david.mwangi@eduvista.edu', subject: 'Physical Education', department: 'Physical Education', classes: ['9-A', '10-A', '11-A', '12-A'], attendance: 99, performance: 4.7, phone: '+1 415 200 1110', avatar: avatar('DavidM'), status: 'active', experience: 13 },
]

const studentSeeds = [
  ['Aisha Rahman', 'F', '10-A', 'Science', 3.92, 96, 'Excellent'],
  ['Liam Okafor', 'M', '10-A', 'Science', 3.45, 88, 'Good'],
  ['Sofia Bergström', 'F', '10-A', 'Mathematics', 3.78, 94, 'Excellent'],
  ['Noah Kim', 'M', '10-B', 'Computer Science', 3.21, 82, 'Good'],
  ['Maya Patel', 'F', '10-B', 'Science', 2.85, 74, 'Needs Attention'],
  ['Ethan Morales', 'M', '10-B', 'Humanities', 3.55, 91, 'Good'],
  ['Zara Al-Farsi', 'F', '11-A', 'Languages', 3.88, 95, 'Excellent'],
  ['Lucas Nguyen', 'M', '11-A', 'Computer Science', 3.67, 89, 'Good'],
  ['Amelia Foster', 'F', '11-A', 'Arts', 3.12, 78, 'Needs Attention'],
  ['Rahim Chowdhury', 'M', '11-B', 'Mathematics', 2.45, 68, 'At Risk'],
  ['Chloe Dubois', 'F', '11-B', 'Science', 3.71, 93, 'Excellent'],
  ['Diego Santos', 'M', '11-B', 'Commerce', 3.33, 85, 'Good'],
  ['Hana Yuki', 'F', '12-A', 'Science', 3.95, 97, 'Excellent'],
  ['Oliver Brooks', 'M', '12-A', 'Mathematics', 3.58, 90, 'Good'],
  ['Fatima El-Sayed', 'F', '12-A', 'Humanities', 3.82, 94, 'Excellent'],
  ['Kai Johansson', 'M', '12-B', 'Computer Science', 2.92, 71, 'Needs Attention'],
  ['Isabella Costa', 'F', '12-B', 'Arts', 3.64, 88, 'Good'],
  ['Mateo Rivera', 'M', '9-A', 'Science', 3.41, 87, 'Good'],
  ['Ananya Sharma', 'F', '9-A', 'Mathematics', 3.89, 96, 'Excellent'],
  ['Jack Thompson', 'M', '9-A', 'Physical Education', 3.15, 80, 'Good'],
  ['Leila Mansouri', 'F', '9-B', 'Languages', 3.73, 92, 'Excellent'],
  ['Ryan Park', 'M', '9-B', 'Computer Science', 2.38, 65, 'At Risk'],
  ['Nina Volkov', 'F', '9-B', 'Arts', 3.52, 89, 'Good'],
  ['Adrian Popescu', 'M', '10-A', 'Commerce', 3.28, 84, 'Good'],
  ['Yara Haddad', 'F', '10-B', 'Science', 3.76, 93, 'Excellent'],
  ['Theo Andersson', 'M', '11-A', 'Mathematics', 3.48, 86, 'Good'],
  ['Mei Lin', 'F', '11-B', 'Computer Science', 3.91, 95, 'Excellent'],
  ['Samuel Wright', 'M', '12-A', 'Humanities', 2.67, 72, 'Needs Attention'],
  ['Camila Rojas', 'F', '12-B', 'Science', 3.69, 91, 'Good'],
  ['Ibrahim Diallo', 'M', '9-A', 'Science', 3.35, 83, 'Good'],
  ['Freya Nielsen', 'F', '10-A', 'Languages', 3.84, 94, 'Excellent'],
  ['Arjun Mehta', 'M', '11-A', 'Science', 3.02, 76, 'Needs Attention'],
]

export const students = studentSeeds.map(([name, gender, className, department, gpa, attendance, status], i) => {
  const id = `STU-${2400 + i}`
  const feeStatus = ['Paid', 'Partial', 'Pending', 'Overdue'][i % 4]
  const assignmentsDone = 12 + (i % 8)
  const assignmentsTotal = 20
  return {
    id,
    name,
    gender,
    class: className,
    department,
    gpa,
    attendance,
    status,
    email: `${name.toLowerCase().replace(/[^a-z]/g, '.')}@student.eduvista.edu`,
    phone: `+1 628 55${String(100 + i).padStart(3, '0')}`,
    avatar: avatar(name.replace(/\s/g, '')),
    dob: `200${7 + (i % 3)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    address: `${100 + i * 3} Campus Lane, Suite ${(i % 8) + 1}`,
    guardian: {
      name: i % 2 === 0 ? `Parent of ${name.split(' ')[0]}` : `${name.split(' ')[1] || 'Parent'} Family`,
      relation: i % 3 === 0 ? 'Father' : i % 3 === 1 ? 'Mother' : 'Guardian',
      phone: `+1 628 66${String(100 + i).padStart(3, '0')}`,
      email: `parent.${name.split(' ')[0].toLowerCase()}@mail.com`,
    },
    assignments: { completed: assignmentsDone, total: assignmentsTotal },
    fees: {
      status: feeStatus,
      due: feeStatus === 'Paid' ? 0 : 200 + (i % 5) * 150,
      paid: 800 + (i % 4) * 100,
      total: 1200,
    },
    enrollmentDate: '2023-08-15',
    trend: status === 'At Risk' || status === 'Needs Attention' ? 'down' : status === 'Excellent' ? 'up' : 'stable',
  }
})

export const classes = [
  { id: 'c-1', name: '9-A', grade: 9, students: 28, subjects: 6, attendance: 91, gpa: 3.42, teacher: 'James Whitfield', room: 'A-101' },
  { id: 'c-2', name: '9-B', grade: 9, students: 26, subjects: 6, attendance: 88, gpa: 3.28, teacher: 'Omar Hassan', room: 'A-102' },
  { id: 'c-3', name: '10-A', grade: 10, students: 42, subjects: 5, attendance: 92, gpa: 3.74, teacher: 'Dr. Amara Okonkwo', room: 'B-201' },
  { id: 'c-4', name: '10-B', grade: 10, students: 38, subjects: 5, attendance: 89, gpa: 3.51, teacher: 'Elena Vasquez', room: 'B-202' },
  { id: 'c-5', name: '11-A', grade: 11, students: 35, subjects: 7, attendance: 93, gpa: 3.68, teacher: 'Prof. Marcus Chen', room: 'C-301' },
  { id: 'c-6', name: '11-B', grade: 11, students: 33, subjects: 7, attendance: 87, gpa: 3.39, teacher: 'Priya Nair', room: 'C-302' },
  { id: 'c-7', name: '12-A', grade: 12, students: 30, subjects: 6, attendance: 94, gpa: 3.81, teacher: 'Priya Nair', room: 'D-401' },
  { id: 'c-8', name: '12-B', grade: 12, students: 29, subjects: 6, attendance: 90, gpa: 3.55, teacher: 'Kenji Tanaka', room: 'D-402' },
]

export const assignments = [
  { id: 'a-1', title: 'Quadratic Equations Problem Set', subject: 'Mathematics', class: '10-A', deadline: '2026-08-12', submitted: 36, pending: 6, averageScore: 84, status: 'active', teacher: 'Dr. Amara Okonkwo' },
  { id: 'a-2', title: 'Newton\'s Laws Lab Report', subject: 'Physics', class: '11-A', deadline: '2026-08-10', submitted: 28, pending: 7, averageScore: 79, status: 'active', teacher: 'Prof. Marcus Chen' },
  { id: 'a-3', title: 'Organic Compounds Essay', subject: 'Chemistry', class: '10-B', deadline: '2026-08-15', submitted: 22, pending: 16, averageScore: 81, status: 'active', teacher: 'Elena Vasquez' },
  { id: 'a-4', title: 'Shakespeare Sonnet Analysis', subject: 'English Literature', class: '11-A', deadline: '2026-08-09', submitted: 33, pending: 2, averageScore: 88, status: 'grading', teacher: 'James Whitfield' },
  { id: 'a-5', title: 'Binary Search Implementation', subject: 'Computer Science', class: '11-B', deadline: '2026-08-14', submitted: 25, pending: 8, averageScore: 91, status: 'active', teacher: 'Priya Nair' },
  { id: 'a-6', title: 'World War II Timeline', subject: 'History', class: '9-B', deadline: '2026-08-11', submitted: 20, pending: 6, averageScore: 76, status: 'active', teacher: 'Omar Hassan' },
  { id: 'a-7', title: 'Cell Division Diagram', subject: 'Biology', class: '9-A', deadline: '2026-08-16', submitted: 18, pending: 10, averageScore: 82, status: 'active', teacher: 'Sophie Laurent' },
  { id: 'a-8', title: 'Market Equilibrium Case Study', subject: 'Economics', class: '12-B', deadline: '2026-08-13', submitted: 24, pending: 5, averageScore: 85, status: 'active', teacher: 'Kenji Tanaka' },
  { id: 'a-9', title: 'Portfolio Mid-Review', subject: 'Art & Design', class: '10-A', deadline: '2026-08-18', submitted: 30, pending: 12, averageScore: 90, status: 'active', teacher: 'Isabella Romano' },
  { id: 'a-10', title: 'Fitness Log Week 4', subject: 'Physical Education', class: '11-A', deadline: '2026-08-08', submitted: 35, pending: 0, averageScore: 95, status: 'completed', teacher: 'David Mwangi' },
  { id: 'a-11', title: 'Calculus Derivatives Quiz Prep', subject: 'Mathematics', class: '12-A', deadline: '2026-08-20', submitted: 12, pending: 18, averageScore: 0, status: 'active', teacher: 'Dr. Amara Okonkwo' },
  { id: 'a-12', title: 'React Component Challenge', subject: 'Computer Science', class: '12-A', deadline: '2026-08-17', submitted: 19, pending: 11, averageScore: 87, status: 'active', teacher: 'Priya Nair' },
  { id: 'a-13', title: 'Poetry Workshop Draft', subject: 'English Literature', class: '9-A', deadline: '2026-08-19', submitted: 15, pending: 13, averageScore: 0, status: 'active', teacher: 'James Whitfield' },
  { id: 'a-14', title: 'Acid-Base Titration Prep', subject: 'Chemistry', class: '11-B', deadline: '2026-08-12', submitted: 27, pending: 6, averageScore: 83, status: 'active', teacher: 'Elena Vasquez' },
  { id: 'a-15', title: 'Ancient Civilizations Map', subject: 'History', class: '10-A', deadline: '2026-08-21', submitted: 8, pending: 34, averageScore: 0, status: 'active', teacher: 'Omar Hassan' },
  { id: 'a-16', title: 'Photosynthesis Experiment', subject: 'Biology', class: '10-B', deadline: '2026-08-14', submitted: 29, pending: 9, averageScore: 80, status: 'active', teacher: 'Sophie Laurent' },
  { id: 'a-17', title: 'Supply Demand Simulation', subject: 'Economics', class: '11-A', deadline: '2026-08-22', submitted: 10, pending: 25, averageScore: 0, status: 'active', teacher: 'Kenji Tanaka' },
  { id: 'a-18', title: 'Color Theory Study', subject: 'Art & Design', class: '9-B', deadline: '2026-08-15', submitted: 21, pending: 5, averageScore: 86, status: 'active', teacher: 'Isabella Romano' },
  { id: 'a-19', title: 'Data Structures Review', subject: 'Computer Science', class: '12-B', deadline: '2026-08-11', submitted: 26, pending: 3, averageScore: 89, status: 'grading', teacher: 'Priya Nair' },
  { id: 'a-20', title: 'Thermodynamics Worksheet', subject: 'Physics', class: '12-A', deadline: '2026-08-13', submitted: 22, pending: 8, averageScore: 77, status: 'active', teacher: 'Prof. Marcus Chen' },
]

export const exams = [
  { id: 'e-1', name: 'Midterm Mathematics', date: '2026-08-11', duration: 90, subjects: ['Mathematics'], classes: ['10-A', '10-B'], students: 80, status: 'upcoming', type: 'Midterm' },
  { id: 'e-2', name: 'Physics Unit Test', date: '2026-08-13', duration: 60, subjects: ['Physics'], classes: ['11-A'], students: 35, status: 'upcoming', type: 'Unit' },
  { id: 'e-3', name: 'Chemistry Practical', date: '2026-08-15', duration: 120, subjects: ['Chemistry'], classes: ['10-A', '11-B'], students: 75, status: 'upcoming', type: 'Practical' },
  { id: 'e-4', name: 'English Literature Essay Exam', date: '2026-08-09', duration: 120, subjects: ['English Literature'], classes: ['11-A'], students: 35, status: 'active', type: 'Essay' },
  { id: 'e-5', name: 'CS Algorithms Assessment', date: '2026-08-18', duration: 90, subjects: ['Computer Science'], classes: ['12-A', '12-B'], students: 59, status: 'upcoming', type: 'Assessment' },
  { id: 'e-6', name: 'History Semester Final', date: '2026-07-28', duration: 150, subjects: ['History'], classes: ['9-B', '10-A'], students: 68, status: 'completed', type: 'Final', avgScore: 78 },
  { id: 'e-7', name: 'Biology Midterm', date: '2026-07-30', duration: 90, subjects: ['Biology'], classes: ['9-A'], students: 28, status: 'completed', type: 'Midterm', avgScore: 82 },
  { id: 'e-8', name: 'Economics Quiz Series', date: '2026-08-20', duration: 45, subjects: ['Economics'], classes: ['11-A', '12-B'], students: 64, status: 'upcoming', type: 'Quiz' },
  { id: 'e-9', name: 'Art Portfolio Defense', date: '2026-08-22', duration: 180, subjects: ['Art & Design'], classes: ['10-A'], students: 42, status: 'upcoming', type: 'Defense' },
  { id: 'e-10', name: 'PE Fitness Assessment', date: '2026-08-08', duration: 60, subjects: ['Physical Education'], classes: ['11-A'], students: 35, status: 'active', type: 'Assessment' },
  { id: 'e-11', name: 'Mathematics Final Prep', date: '2026-07-20', duration: 120, subjects: ['Mathematics'], classes: ['12-A'], students: 30, status: 'completed', type: 'Final', avgScore: 85 },
  { id: 'e-12', name: 'Physics Midterm', date: '2026-07-22', duration: 90, subjects: ['Physics'], classes: ['12-A'], students: 30, status: 'completed', type: 'Midterm', avgScore: 74 },
  { id: 'e-13', name: 'Languages Oral Exam', date: '2026-08-25', duration: 30, subjects: ['English Literature'], classes: ['9-A', '9-B'], students: 54, status: 'upcoming', type: 'Oral' },
  { id: 'e-14', name: 'Chemistry Midterm', date: '2026-07-25', duration: 90, subjects: ['Chemistry'], classes: ['11-B'], students: 33, status: 'completed', type: 'Midterm', avgScore: 80 },
  { id: 'e-15', name: 'Integrated Science Review', date: '2026-08-28', duration: 120, subjects: ['Physics', 'Chemistry', 'Biology'], classes: ['10-A', '10-B'], students: 80, status: 'upcoming', type: 'Review' },
]

export const fees = students.map((s, i) => ({
  id: `fee-${i + 1}`,
  studentId: s.id,
  studentName: s.name,
  class: s.class,
  amount: s.fees.total,
  paid: s.fees.paid,
  due: s.fees.due,
  status: s.fees.status,
  dueDate: '2026-08-31',
  lastPayment: s.fees.status === 'Paid' ? '2026-07-15' : s.fees.status === 'Partial' ? '2026-07-28' : null,
  category: ['Tuition', 'Lab', 'Library', 'Activities'][i % 4],
}))

export const announcements = [
  { id: 'an-1', title: 'Campus Closed for Independence Day', author: 'Admin Office', date: '2026-08-07', audience: 'All', priority: 'high', type: 'Holiday', content: 'Campus will be closed on August 15 for Independence Day celebrations.' },
  { id: 'an-2', title: 'Midterm Exam Schedule Released', author: 'Academics', date: '2026-08-06', audience: 'Students', priority: 'high', type: 'Exam', content: 'Midterm examinations begin August 11. Please review the full schedule on the Exams page.' },
  { id: 'an-3', title: 'Science Fair Registration Open', author: 'Dr. Amara Okonkwo', date: '2026-08-05', audience: 'Students', priority: 'medium', type: 'Academic', content: 'Register your projects by August 20. Mentorship sessions available every Friday.' },
  { id: 'an-4', title: 'Parent-Teacher Conference', author: 'Admin Office', date: '2026-08-04', audience: 'Parents', priority: 'medium', type: 'General', content: 'Conferences scheduled for August 22–23. Book your slot through the Parent Portal.' },
  { id: 'an-5', title: 'Library Hours Extended', author: 'Library', date: '2026-08-03', audience: 'All', priority: 'low', type: 'General', content: 'During exam week, the library will remain open until 10 PM.' },
  { id: 'an-6', title: 'Emergency Drill Tomorrow', author: 'Safety Office', date: '2026-08-07', audience: 'All', priority: 'urgent', type: 'Emergency', content: 'Fire drill at 10:30 AM. Follow your classroom evacuation plan.' },
  { id: 'an-7', title: 'New Computer Lab Access', author: 'Priya Nair', date: '2026-08-02', audience: 'Students', priority: 'medium', type: 'Academic', content: 'Lab D-210 is now available for CS students after 3 PM with teacher approval.' },
  { id: 'an-8', title: 'Sports Day Volunteers Needed', author: 'David Mwangi', date: '2026-08-01', audience: 'All', priority: 'low', type: 'General', content: 'Sign up at the PE office if you can help with Sports Day on August 30.' },
  { id: 'an-9', title: 'Fee Payment Reminder', author: 'Finance', date: '2026-07-30', audience: 'Parents', priority: 'high', type: 'Academic', content: 'Outstanding fees are due by August 31. Online payment receipts are accepted.' },
  { id: 'an-10', title: 'Art Exhibition Opening', author: 'Isabella Romano', date: '2026-07-29', audience: 'All', priority: 'low', type: 'General', content: 'Student art exhibition opens Friday evening in the gallery hall.' },
  { id: 'an-11', title: 'Counseling Hours Update', author: 'Student Wellness', date: '2026-07-28', audience: 'Students', priority: 'medium', type: 'General', content: 'Walk-in counseling available Mon–Thu 1–4 PM in Wellness Center.' },
  { id: 'an-12', title: 'Bus Route Change — North Line', author: 'Transport', date: '2026-07-27', audience: 'All', priority: 'medium', type: 'General', content: 'North campus bus now stops at Maple & 3rd starting August 1.' },
  { id: 'an-13', title: 'Internship Fair 2026', author: 'Career Services', date: '2026-07-26', audience: 'Students', priority: 'medium', type: 'Academic', content: 'Grade 11–12 students invited to the internship fair on September 5.' },
  { id: 'an-14', title: 'Lab Safety Certification', author: 'Elena Vasquez', date: '2026-07-25', audience: 'Students', priority: 'high', type: 'Academic', content: 'All chemistry students must renew lab safety certification before practicals.' },
  { id: 'an-15', title: 'Scholarship Applications Open', author: 'Admin Office', date: '2026-07-24', audience: 'Students', priority: 'high', type: 'Academic', content: 'Merit and need-based scholarships — apply by September 15.' },
  { id: 'an-16', title: 'Wi-Fi Maintenance Window', author: 'IT', date: '2026-07-23', audience: 'All', priority: 'low', type: 'System', content: 'Campus Wi-Fi will be briefly unavailable Sunday 2–4 AM.' },
  { id: 'an-17', title: 'Debate Club Tryouts', author: 'James Whitfield', date: '2026-07-22', audience: 'Students', priority: 'low', type: 'General', content: 'Tryouts this Thursday after school in Hall B.' },
  { id: 'an-18', title: 'Nutrition Workshop for Athletes', author: 'David Mwangi', date: '2026-07-21', audience: 'Students', priority: 'low', type: 'General', content: 'Optional workshop for PE and sports teams — Friday lunch period.' },
  { id: 'an-19', title: 'Updated Academic Calendar', author: 'Academics', date: '2026-07-20', audience: 'All', priority: 'medium', type: 'Academic', content: 'Revised semester dates and holidays published in Academic Settings.' },
  { id: 'an-20', title: 'Welcome Week for New Families', author: 'Admin Office', date: '2026-07-18', audience: 'Parents', priority: 'medium', type: 'General', content: 'Orientation sessions for newly enrolled families — August 5.' },
]

export const todaysFlow = [
  { time: '08:00', title: 'Morning Assembly', status: 'done' },
  { time: '09:00', title: 'Classes Started', status: 'done' },
  { time: '11:30', title: 'Midterm Exam', status: 'current' },
  { time: '13:00', title: 'Lunch', status: 'upcoming' },
  { time: '15:30', title: 'Sports', status: 'upcoming' },
]

export const campusActivity = [
  { id: 'act-1', type: 'attendance', text: 'Class 10-A attendance marked — 40/42 present', time: '12 min ago', user: 'Dr. Amara Okonkwo' },
  { id: 'act-2', type: 'assignment', text: 'Binary Search Implementation submitted by Mei Lin', time: '28 min ago', user: 'Mei Lin' },
  { id: 'act-3', type: 'exam', text: 'English Literature Essay Exam started', time: '45 min ago', user: 'James Whitfield' },
  { id: 'act-4', type: 'fee', text: 'Fee payment received from Hana Yuki', time: '1h ago', user: 'Finance' },
  { id: 'act-5', type: 'announcement', text: 'Emergency drill notice published', time: '2h ago', user: 'Safety Office' },
  { id: 'act-6', type: 'grade', text: 'Physics Unit grades published for 11-A', time: '3h ago', user: 'Prof. Marcus Chen' },
  { id: 'act-7', type: 'message', text: 'Parent inquiry from Rahim Chowdhury\'s guardian', time: '4h ago', user: 'Messaging' },
  { id: 'act-8', type: 'ai', text: 'EduLens flagged 3 students with declining attendance', time: '5h ago', user: 'EduLens AI' },
]

export const aiInsights = [
  {
    id: 'ai-1',
    type: 'risk',
    title: 'Attendance decline detected',
    student: 'Rahim Chowdhury',
    studentId: 'STU-2409',
    severity: 'high',
    insight: "Rahim's attendance has dropped 12% over the last 30 days and his Mathematics score decreased by 8%. Consider scheduling an academic check-in.",
    actions: ['Schedule check-in', 'Notify guardian', 'Assign tutor'],
  },
  {
    id: 'ai-2',
    type: 'risk',
    title: 'Assignment backlog',
    student: 'Ryan Park',
    studentId: 'STU-2421',
    severity: 'high',
    insight: 'Ryan has 6 overdue assignments across Computer Science and English. Completion rate fell from 78% to 41% this month.',
    actions: ['Review workload', 'Message teacher', 'Set recovery plan'],
  },
  {
    id: 'ai-3',
    type: 'opportunity',
    title: 'Ready for enrichment',
    student: 'Hana Yuki',
    studentId: 'STU-2412',
    severity: 'low',
    insight: 'Hana maintains a 3.95 GPA with 97% attendance. She is a strong candidate for the advanced research mentorship program.',
    actions: ['Nominate for mentorship', 'Share opportunities'],
  },
  {
    id: 'ai-4',
    type: 'trend',
    title: 'Class-level attendance dip',
    student: 'Class 11-B',
    studentId: null,
    severity: 'medium',
    insight: '11-B attendance is 6 points below campus average this week, concentrated on Monday morning periods.',
    actions: ['Review schedule', 'Talk to class teacher'],
  },
  {
    id: 'ai-5',
    type: 'performance',
    title: 'Subject performance gap',
    student: 'Maya Patel',
    studentId: 'STU-2404',
    severity: 'medium',
    insight: 'Maya\'s Science scores are 15% below her Humanities average. Targeted Physics tutoring may close the gap.',
    actions: ['Recommend tutoring', 'Notify parent'],
  },
  {
    id: 'ai-6',
    type: 'opportunity',
    title: 'Consistent improver',
    student: 'Diego Santos',
    studentId: 'STU-2411',
    severity: 'low',
    insight: 'Diego improved GPA by 0.4 this semester with strong assignment completion. Positive reinforcement recommended.',
    actions: ['Send recognition', 'Share with parent'],
  },
]

export const notifications = [
  { id: 'n-1', type: 'attendance', title: 'Attendance reminder', message: '3 classes have not submitted today\'s attendance.', time: '10m ago', read: false },
  { id: 'n-2', type: 'assignment', title: 'Assignment due soon', message: 'Newton\'s Laws Lab Report is due tomorrow.', time: '32m ago', read: false },
  { id: 'n-3', type: 'exam', title: 'Exam starting', message: 'English Literature Essay Exam is in progress.', time: '1h ago', read: false },
  { id: 'n-4', type: 'payment', title: 'Payment received', message: 'Tuition payment confirmed for Hana Yuki.', time: '2h ago', read: true },
  { id: 'n-5', type: 'announcement', title: 'New announcement', message: 'Emergency drill scheduled for tomorrow.', time: '3h ago', read: true },
  { id: 'n-6', type: 'system', title: 'Weekly report ready', message: 'Campus performance summary is available.', time: '1d ago', read: true },
  { id: 'n-7', type: 'assignment', title: 'Submissions pending', message: '14 students still need to submit Chemistry essay.', time: '1d ago', read: false },
  { id: 'n-8', type: 'payment', title: 'Overdue fees', message: '8 student accounts are overdue this month.', time: '2d ago', read: true },
]

export const messages = [
  {
    id: 'm-1',
    participants: ['Admin', 'Dr. Amara Okonkwo'],
    avatar: avatar('Amara'),
    online: true,
    unread: 2,
    starred: true,
    preview: 'Can we review the midterm seating plan?',
    updatedAt: '2026-08-08T10:20:00',
    thread: [
      { from: 'Dr. Amara Okonkwo', text: 'Hi — can we review the midterm seating plan for 10-A?', time: '09:40' },
      { from: 'Admin', text: 'Absolutely. I\'ll share the draft before lunch.', time: '09:55' },
      { from: 'Dr. Amara Okonkwo', text: 'Can we review the midterm seating plan?', time: '10:20' },
    ],
  },
  {
    id: 'm-2',
    participants: ['Admin', 'Parent of Rahim'],
    avatar: avatar('RahimParent'),
    online: false,
    unread: 1,
    starred: false,
    preview: 'Concerned about recent attendance alerts.',
    updatedAt: '2026-08-08T09:10:00',
    thread: [
      { from: 'Parent of Rahim', text: 'I received an alert about Rahim\'s attendance. Can we schedule a call?', time: '09:10' },
    ],
  },
  {
    id: 'm-3',
    participants: ['Admin', 'Priya Nair'],
    avatar: avatar('Priya'),
    online: true,
    unread: 0,
    starred: true,
    preview: 'Lab booking confirmed for Friday.',
    updatedAt: '2026-08-07T16:40:00',
    thread: [
      { from: 'Priya Nair', text: 'Requesting Lab D-210 for the algorithms assessment.', time: '15:00' },
      { from: 'Admin', text: 'Approved. Lab booking confirmed for Friday.', time: '16:40' },
    ],
  },
  {
    id: 'm-4',
    participants: ['Admin', 'Finance Team'],
    avatar: avatar('Finance'),
    online: false,
    unread: 0,
    starred: false,
    preview: 'August fee reconciliation attached.',
    updatedAt: '2026-08-07T14:00:00',
    thread: [
      { from: 'Finance Team', text: 'August fee reconciliation attached.', time: '14:00' },
    ],
  },
  {
    id: 'm-5',
    participants: ['Admin', 'James Whitfield'],
    avatar: avatar('JamesW'),
    online: false,
    unread: 0,
    starred: false,
    preview: 'Essay exam invigilation coverage looks good.',
    updatedAt: '2026-08-06T11:30:00',
    thread: [
      { from: 'Admin', text: 'Do you need an extra invigilator for the essay exam?', time: '10:00' },
      { from: 'James Whitfield', text: 'Essay exam invigilation coverage looks good.', time: '11:30' },
    ],
  },
]

export const schedule = {
  Monday: [
    { time: '08:00–08:45', subject: 'Mathematics', teacher: 'Dr. Amara Okonkwo', room: 'B-201', class: '10-A', color: '#7C5CFC' },
    { time: '09:00–09:45', subject: 'Physics', teacher: 'Prof. Marcus Chen', room: 'C-301', class: '11-A', color: '#2DD4BF' },
    { time: '10:00–10:45', subject: 'English Literature', teacher: 'James Whitfield', room: 'A-101', class: '9-A', color: '#FB7185' },
    { time: '11:00–11:45', subject: 'Computer Science', teacher: 'Priya Nair', room: 'D-210', class: '12-A', color: '#60A5FA' },
    { time: '13:00–13:45', subject: 'Chemistry', teacher: 'Elena Vasquez', room: 'B-202', class: '10-B', color: '#A3E635' },
    { time: '14:00–14:45', subject: 'History', teacher: 'Omar Hassan', room: 'A-102', class: '9-B', color: '#FBBF24' },
  ],
  Tuesday: [
    { time: '08:00–08:45', subject: 'Biology', teacher: 'Sophie Laurent', room: 'Lab-2', class: '9-A', color: '#34D399' },
    { time: '09:00–09:45', subject: 'Mathematics', teacher: 'Dr. Amara Okonkwo', room: 'B-201', class: '10-B', color: '#7C5CFC' },
    { time: '10:00–10:45', subject: 'Economics', teacher: 'Kenji Tanaka', room: 'D-402', class: '12-B', color: '#A78BFA' },
    { time: '11:00–11:45', subject: 'Art & Design', teacher: 'Isabella Romano', room: 'Studio', class: '10-A', color: '#F472B6' },
    { time: '13:00–13:45', subject: 'Physical Education', teacher: 'David Mwangi', room: 'Gym', class: '11-A', color: '#38BDF8' },
    { time: '14:00–14:45', subject: 'Computer Science', teacher: 'Priya Nair', room: 'D-210', class: '11-B', color: '#60A5FA' },
  ],
  Wednesday: [
    { time: '08:00–08:45', subject: 'Physics', teacher: 'Prof. Marcus Chen', room: 'C-301', class: '12-A', color: '#2DD4BF' },
    { time: '09:00–09:45', subject: 'Chemistry', teacher: 'Elena Vasquez', room: 'Lab-1', class: '11-B', color: '#A3E635' },
    { time: '10:00–10:45', subject: 'Mathematics', teacher: 'Dr. Amara Okonkwo', room: 'B-201', class: '11-A', color: '#7C5CFC' },
    { time: '11:00–11:45', subject: 'English Literature', teacher: 'James Whitfield', room: 'A-101', class: '10-B', color: '#FB7185' },
    { time: '13:00–13:45', subject: 'History', teacher: 'Omar Hassan', room: 'B-201', class: '10-A', color: '#FBBF24' },
    { time: '14:00–14:45', subject: 'Biology', teacher: 'Sophie Laurent', room: 'Lab-2', class: '10-B', color: '#34D399' },
  ],
  Thursday: [
    { time: '08:00–08:45', subject: 'Computer Science', teacher: 'Priya Nair', room: 'D-210', class: '12-B', color: '#60A5FA' },
    { time: '09:00–09:45', subject: 'Economics', teacher: 'Kenji Tanaka', room: 'C-301', class: '11-A', color: '#A78BFA' },
    { time: '10:00–10:45', subject: 'Art & Design', teacher: 'Isabella Romano', room: 'Studio', class: '9-B', color: '#F472B6' },
    { time: '11:00–11:45', subject: 'Mathematics', teacher: 'Dr. Amara Okonkwo', room: 'B-201', class: '12-A', color: '#7C5CFC' },
    { time: '13:00–13:45', subject: 'Physics', teacher: 'Prof. Marcus Chen', room: 'C-301', class: '11-A', color: '#2DD4BF' },
    { time: '14:00–14:45', subject: 'Physical Education', teacher: 'David Mwangi', room: 'Gym', class: '10-A', color: '#38BDF8' },
  ],
  Friday: [
    { time: '08:00–08:45', subject: 'English Literature', teacher: 'James Whitfield', room: 'A-101', class: '11-A', color: '#FB7185' },
    { time: '09:00–09:45', subject: 'Chemistry', teacher: 'Elena Vasquez', room: 'B-202', class: '10-A', color: '#A3E635' },
    { time: '10:00–10:45', subject: 'Biology', teacher: 'Sophie Laurent', room: 'Lab-2', class: '9-A', color: '#34D399' },
    { time: '11:00–11:45', subject: 'History', teacher: 'Omar Hassan', room: 'A-102', class: '9-B', color: '#FBBF24' },
    { time: '13:00–13:45', subject: 'Computer Science', teacher: 'Priya Nair', room: 'D-210', class: '12-A', color: '#60A5FA' },
    { time: '14:00–14:45', subject: 'Art & Design', teacher: 'Isabella Romano', room: 'Studio', class: '9-A', color: '#F472B6' },
  ],
  Saturday: [
    { time: '09:00–09:45', subject: 'Mathematics Club', teacher: 'Dr. Amara Okonkwo', room: 'B-201', class: 'Open', color: '#7C5CFC' },
    { time: '10:00–10:45', subject: 'Robotics Lab', teacher: 'Priya Nair', room: 'D-210', class: 'Open', color: '#60A5FA' },
    { time: '11:00–11:45', subject: 'Sports Practice', teacher: 'David Mwangi', room: 'Gym', class: 'Open', color: '#38BDF8' },
  ],
}

export const performanceSeries = {
  week: [
    { label: 'Mon', gpa: 3.52, attendance: 91, assignments: 78, exams: 80 },
    { label: 'Tue', gpa: 3.55, attendance: 93, assignments: 80, exams: 82 },
    { label: 'Wed', gpa: 3.48, attendance: 89, assignments: 76, exams: 79 },
    { label: 'Thu', gpa: 3.61, attendance: 94, assignments: 84, exams: 85 },
    { label: 'Fri', gpa: 3.58, attendance: 92, assignments: 82, exams: 83 },
    { label: 'Sat', gpa: 3.6, attendance: 88, assignments: 75, exams: 81 },
  ],
  month: [
    { label: 'W1', gpa: 3.45, attendance: 90, assignments: 74, exams: 78 },
    { label: 'W2', gpa: 3.52, attendance: 91, assignments: 79, exams: 80 },
    { label: 'W3', gpa: 3.58, attendance: 93, assignments: 83, exams: 84 },
    { label: 'W4', gpa: 3.62, attendance: 92, assignments: 85, exams: 86 },
  ],
  semester: [
    { label: 'Aug', gpa: 3.4, attendance: 88, assignments: 72, exams: 76 },
    { label: 'Sep', gpa: 3.48, attendance: 90, assignments: 76, exams: 79 },
    { label: 'Oct', gpa: 3.55, attendance: 91, assignments: 80, exams: 82 },
    { label: 'Nov', gpa: 3.6, attendance: 93, assignments: 84, exams: 85 },
    { label: 'Dec', gpa: 3.58, attendance: 89, assignments: 81, exams: 83 },
    { label: 'Jan', gpa: 3.65, attendance: 94, assignments: 86, exams: 87 },
  ],
  year: [
    { label: 'Q1', gpa: 3.42, attendance: 89, assignments: 74, exams: 77 },
    { label: 'Q2', gpa: 3.51, attendance: 91, assignments: 79, exams: 81 },
    { label: 'Q3', gpa: 3.59, attendance: 92, assignments: 84, exams: 85 },
    { label: 'Q4', gpa: 3.64, attendance: 93, assignments: 87, exams: 88 },
  ],
}

export const attendanceHeatmap = Array.from({ length: 28 }, (_, i) => ({
  day: i + 1,
  value: 70 + Math.round(Math.sin(i / 2.2) * 12 + (i % 5) * 2),
}))

export const demoUsers = {
  admin: {
    id: 'u-admin',
    name: 'Alex Rivera',
    email: 'admin@eduvista.edu',
    role: 'admin',
    avatar: avatar('AlexRivera'),
    title: 'Campus Administrator',
  },
  teacher: {
    id: 'u-teacher',
    name: 'Dr. Amara Okonkwo',
    email: 'amara.okonkwo@eduvista.edu',
    role: 'teacher',
    avatar: avatar('Amara'),
    title: 'Mathematics Lead',
    teacherId: 't-1',
  },
  student: {
    id: 'u-student',
    name: 'Aisha Rahman',
    email: 'aisha.rahman@student.eduvista.edu',
    role: 'student',
    avatar: avatar('AishaRahman'),
    title: 'Student · 10-A',
    studentId: 'STU-2400',
  },
  parent: {
    id: 'u-parent',
    name: 'Parent of Aisha',
    email: 'parent.aisha@mail.com',
    role: 'parent',
    avatar: avatar('ParentAisha'),
    title: 'Parent Guardian',
    childId: 'STU-2400',
  },
}

export const campusStats = {
  totalStudents: students.length,
  activeStudents: students.filter((s) => s.status !== 'At Risk').length,
  activeTeachers: teachers.length,
  attendanceToday: 91.4,
  averageGPA: 3.48,
  pendingFees: fees.filter((f) => f.status !== 'Paid').reduce((sum, f) => sum + f.due, 0),
  upcomingExams: exams.filter((e) => e.status === 'upcoming').length,
  assignmentCompletion: 78,
  atRisk: students.filter((s) => s.status === 'At Risk').length,
}
