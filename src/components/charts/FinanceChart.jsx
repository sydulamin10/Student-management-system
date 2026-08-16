import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useChartReady } from '../../hooks/useChartReady'

const data = [
  { month: 'Mar', collected: 42000, pending: 12000 },
  { month: 'Apr', collected: 48000, pending: 9000 },
  { month: 'May', collected: 51000, pending: 11000 },
  { month: 'Jun', collected: 47000, pending: 14000 },
  { month: 'Jul', collected: 53000, pending: 8000 },
  { month: 'Aug', collected: 39000, pending: 16000 },
]

export function FinanceChart() {
  const ready = useChartReady()

  return (
    <div className="h-72 w-full min-h-[18rem]">
      {ready ? (
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,31,0.06)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#8a8a96', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8a8a96', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: '1px solid rgba(26,26,31,0.08)',
                background: 'var(--color-surface)',
              }}
            />
            <Bar dataKey="collected" fill="#7C5CFC" radius={[10, 10, 0, 0]} />
            <Bar dataKey="pending" fill="#2DD4BF" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full w-full animate-pulse rounded-[18px] bg-ivory-muted/60" />
      )}
    </div>
  )
}
