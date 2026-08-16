import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useChartReady } from '../../hooks/useChartReady'

export function PerformanceChart({ data }) {
  const ready = useChartReady([data])

  return (
    <div className="h-72 w-full min-h-[18rem]">
      {ready ? (
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gpaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C5CFC" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#7C5CFC" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="attFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2DD4BF" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#2DD4BF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,31,0.06)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: '#8a8a96', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8a8a96', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: '1px solid rgba(26,26,31,0.08)',
                boxShadow: '0 8px 24px rgba(26,26,31,0.08)',
                background: 'var(--color-surface)',
              }}
            />
            <Legend />
            <Area type="monotone" dataKey="gpa" name="GPA ×25" stroke="#7C5CFC" fill="url(#gpaFill)" strokeWidth={2.5} />
            <Area type="monotone" dataKey="attendance" name="Attendance" stroke="#2DD4BF" fill="url(#attFill)" strokeWidth={2} />
            <Area type="monotone" dataKey="assignments" name="Assignments" stroke="#A3E635" fill="transparent" strokeWidth={2} />
            <Area type="monotone" dataKey="exams" name="Exams" stroke="#FB7185" fill="transparent" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full w-full animate-pulse rounded-[18px] bg-ivory-muted/60" />
      )}
    </div>
  )
}
