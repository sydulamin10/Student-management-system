import { cn } from '../../utils/cn'

export function AttendanceHeatmap({ data }) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {data.map((d) => {
        const intensity =
          d.value >= 95 ? 'bg-lime' : d.value >= 88 ? 'bg-cyan' : d.value >= 80 ? 'bg-violet/70' : 'bg-rose/70'
        return (
          <div
            key={d.day}
            title={`Day ${d.day}: ${d.value}%`}
            className={cn(
              'aspect-square rounded-[10px] transition hover:scale-105',
              intensity,
              d.value < 80 ? 'opacity-80' : 'opacity-90'
            )}
          />
        )
      })}
    </div>
  )
}
