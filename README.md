# EDUVISTA

**Everything students need. One intelligent workspace.**

EDUVISTA is a premium academic management platform for administrators, teachers, students, and parents — covering enrollment, attendance, assignments, exams, fees, scheduling, messaging, analytics, and AI-assisted insights.

Built with **React + Vite + Tailwind CSS**, designed Firebase-first with a polished mock-data mode for local demos.

---

## 1. Project setup

```bash
git clone <your-repo-url>
cd "Student Management System"
npm install
```

Copy environment variables:

```bash
cp .env.example .env
```

---

## 2. Installation

```bash
npm install
```

Key dependencies:

- React 19 + Vite 8
- Tailwind CSS 4
- React Router
- Framer Motion
- Recharts
- React Hook Form
- Lucide React
- Firebase

---

## 3. Firebase setup

1. Create a project in [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** → Email/Password and Google.
3. Create a **Firestore** database.
4. Enable **Storage**.
5. (Optional) Enable **Realtime Database** for live messaging presence.
6. Register a Web app and copy the config values into `.env`.
7. Deploy rules:

```bash
firebase deploy --only firestore:rules,storage
```

Use the included:

- `firestore.rules`
- `storage.rules`

---

## 4. Environment variables

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_USE_MOCK_DATA=true
```

- Keep `VITE_USE_MOCK_DATA=true` to run without Firebase credentials.
- Set `VITE_USE_MOCK_DATA=false` after Firebase is configured to use live services.

---

## 5. Firestore collections

| Collection | Purpose |
|---|---|
| `users` | Auth profiles + roles |
| `students` | Student academic records |
| `teachers` | Teacher profiles |
| `parents` | Parent ↔ child links |
| `classes` | Class sections |
| `subjects` | Subject catalog |
| `attendance` | Daily attendance |
| `assignments` | Assignment definitions |
| `submissions` | Student submissions |
| `exams` | Exam schedules |
| `results` | Grades / marks |
| `fees` | Fee invoices & payments |
| `announcements` | Campus notices |
| `messages` | Internal messaging |
| `notifications` | In-app alerts |
| `schedules` | Timetable blocks |
| `ai_insights` | EduLens AI outputs |

Service modules live in `src/services/firebase/`.

---

## 6. Firebase security rules

Rules are role-aware:

- **Admin** — full access
- **Teacher** — classes, students, attendance, assignments, exams
- **Student** — own academic data
- **Parent** — linked child data only

See `firestore.rules` and `storage.rules` for the complete policy.

---

## 7. Running locally

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Demo login

On the login screen, use **Demo access**:

| Role | Experience |
|---|---|
| Admin | Academic Command Center |
| Teacher | Classes, attendance, grading |
| Student | Student portal |
| Parent | Family hub |

Or sign in with:

- `admin@eduvista.edu` + any password (4+ chars)

---

## 8. Production build

```bash
npm run build
npm run preview
```

Output is written to `dist/`.

---

## 9. Deployment

### Firebase Hosting

```bash
npm run build
firebase init hosting
firebase deploy --only hosting
```

### Vercel / Netlify

- Build command: `npm run build`
- Output directory: `dist`
- Add the same `VITE_*` environment variables in the host dashboard

---

## App structure

```
src/
  components/   # UI kit, charts, layout, command palette
  pages/        # Landing, auth, portals, management modules
  context/      # Auth, theme, toast
  services/     # Firebase-ready data services
  firebase/     # App initialization
  data/         # Realistic demo dataset
  hooks/
  animations/
  utils/
```

---

## Features

- Academic Command Center dashboard
- Students / Teachers / Classes
- Attendance marking + heatmap
- Assignments + grading
- Exams + results
- Fees & finance charts
- Weekly timetable
- Announcements
- Messaging inbox
- Notification center
- EduLens AI insights
- Parent & Student portals
- Global ⌘/Ctrl + K command search
- Light / dark mode
- Fully responsive layouts

---

## Design system

EDUVISTA uses a custom visual language:

- **Charcoal / ivory** foundations
- **Electric violet** + **cyan** accents
- Soft lime success states
- 22–28px radii, soft elevation, restrained glass
- Manrope + Instrument Serif typography

---

## License

Private / educational project — adapt as needed for your institution.
