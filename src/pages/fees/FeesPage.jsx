import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Banknote,
  CalendarDays,
  CreditCard,
  Receipt,
  Wallet,
} from 'lucide-react'
import { FinanceChart } from '../../components/charts/FinanceChart'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  EmptyState,
  Input,
  Modal,
  Select,
  StatWidget,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
} from '../../components/ui'
import { useToast } from '../../context/ToastContext'
import { fees as demoFees, students } from '../../data/demoData'
import { pageTransition, staggerContainer, staggerItem } from '../../animations/variants'
import { formatCurrency, formatDate } from '../../utils/format'

export default function FeesPage() {
  const { toast } = useToast()
  const [list, setList] = useState(() => [...demoFees])
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState(null)
  const [payAmount, setPayAmount] = useState('')
  const [method, setMethod] = useState('Card')

  const stats = useMemo(() => {
    const collected = list.reduce((sum, f) => sum + f.paid, 0)
    const pending = list
      .filter((f) => f.status === 'Pending' || f.status === 'Partial')
      .reduce((sum, f) => sum + f.due, 0)
    const overdue = list
      .filter((f) => f.status === 'Overdue')
      .reduce((sum, f) => sum + f.due, 0)
    const thisMonth = list
      .filter((f) => f.lastPayment && f.lastPayment.startsWith('2026-07'))
      .reduce((sum, f) => sum + Math.round(f.paid * 0.35), 0)
    return { collected, pending, overdue, thisMonth }
  }, [list])

  const filtered = useMemo(() => {
    if (!statusFilter) return list
    return list.filter((f) => f.status === statusFilter)
  }, [list, statusFilter])

  const openPayment = (fee) => {
    setSelected(fee)
    setPayAmount(fee.due > 0 ? String(fee.due) : String(fee.amount))
    setMethod('Card')
  }

  const studentAvatar = (studentId) =>
    students.find((s) => s.id === studentId)?.avatar

  const recordPayment = () => {
    if (!selected) return
    const amount = Number(payAmount)
    if (!amount || amount <= 0) {
      toast('Enter a valid payment amount', 'error')
      return
    }

    setList((prev) =>
      prev.map((f) => {
        if (f.id !== selected.id) return f
        const paid = Math.min(f.amount, f.paid + amount)
        const due = Math.max(0, f.amount - paid)
        let status = 'Paid'
        if (due > 0 && paid > 0) status = 'Partial'
        if (due === f.amount) status = f.status === 'Overdue' ? 'Overdue' : 'Pending'
        return {
          ...f,
          paid,
          due,
          status: due === 0 ? 'Paid' : status,
          lastPayment: '2026-08-08',
        }
      })
    )
    setSelected(null)
    toast(`Payment of ${formatCurrency(amount)} recorded`, 'success')
  }

  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet">Finance</p>
        <h1 className="mt-1 font-display text-4xl text-ink md:text-5xl">Fees</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Monitor collections, outstanding balances, and student payment history.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <motion.div variants={staggerItem}>
          <StatWidget
            label="Total collected"
            value={stats.collected}
            prefix="$"
            icon={Wallet}
            accent="violet"
            trend={6}
            trendLabel="this term"
            spark={[45, 52, 48, 60, 58, 70, 66]}
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatWidget
            label="Pending"
            value={stats.pending}
            prefix="$"
            icon={Banknote}
            accent="amber"
            trend={-3}
            trendLabel="vs last month"
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatWidget
            label="Overdue"
            value={stats.overdue}
            prefix="$"
            icon={AlertTriangle}
            accent="rose"
            trend={2}
            trendLabel="needs follow-up"
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatWidget
            label="This month"
            value={stats.thisMonth}
            prefix="$"
            icon={CalendarDays}
            accent="cyan"
            spark={[30, 40, 35, 55, 50, 62, 58]}
          />
        </motion.div>
      </motion.div>

      <Card hover={false}>
        <CardHeader
          title="Collections overview"
          subtitle="Collected vs pending by month"
        />
        <FinanceChart />
      </Card>

      <Card hover={false} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-ink">Student payment history</h3>
          <p className="mt-0.5 text-sm text-ink-muted">Click a row to open invoice / payment</p>
        </div>
        <Select
          className="sm:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="Paid">Paid</option>
          <option value="Partial">Partial</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </Select>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No fee records"
          description="Try another status filter."
        />
      ) : (
        <Table>
          <THead>
            <TR>
              <TH>Student</TH>
              <TH>Class</TH>
              <TH>Category</TH>
              <TH>Paid</TH>
              <TH>Due</TH>
              <TH>Status</TH>
              <TH>Due date</TH>
            </TR>
          </THead>
          <TBody>
            {filtered.map((fee) => (
              <TR key={fee.id} onClick={() => openPayment(fee)}>
                <TD>
                  <div className="flex items-center gap-3">
                    <Avatar src={studentAvatar(fee.studentId)} name={fee.studentName} size="sm" />
                    <div>
                      <p className="font-semibold text-ink">{fee.studentName}</p>
                      <p className="text-xs text-ink-muted">{fee.studentId}</p>
                    </div>
                  </div>
                </TD>
                <TD>{fee.class}</TD>
                <TD>{fee.category}</TD>
                <TD>{formatCurrency(fee.paid)}</TD>
                <TD>{formatCurrency(fee.due)}</TD>
                <TD>
                  <Badge tone={fee.status}>{fee.status}</Badge>
                </TD>
                <TD>{formatDate(fee.dueDate)}</TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Invoice / payment"
        subtitle={selected ? `${selected.studentName} · ${selected.category}` : ''}
        size="md"
      >
        {selected && (
          <div className="space-y-5">
            <div className="rounded-[18px] border border-border bg-gradient-to-br from-violet/10 via-surface to-cyan/10 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-ink-muted">Invoice</p>
                  <p className="mt-1 font-display text-3xl text-ink">{selected.id.toUpperCase()}</p>
                  <p className="mt-2 text-sm text-ink-secondary">
                    {selected.studentName} · Class {selected.class}
                  </p>
                </div>
                <Badge tone={selected.status}>{selected.status}</Badge>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase text-ink-muted">Total</p>
                  <p className="mt-1 text-lg font-extrabold text-ink">{formatCurrency(selected.amount)}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase text-ink-muted">Paid</p>
                  <p className="mt-1 text-lg font-extrabold text-ink">{formatCurrency(selected.paid)}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase text-ink-muted">Due</p>
                  <p className="mt-1 text-lg font-extrabold text-ink">{formatCurrency(selected.due)}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Payment amount"
                type="number"
                min={1}
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                icon={CreditCard}
              />
              <Select label="Method" value={method} onChange={(e) => setMethod(e.target.value)}>
                <option>Card</option>
                <option>Bank transfer</option>
                <option>Cash</option>
                <option>Campus wallet</option>
              </Select>
            </div>

            <div className="rounded-[16px] bg-ivory-soft/80 px-4 py-3 text-sm text-ink-secondary">
              Last payment:{' '}
              <span className="font-semibold text-ink">
                {selected.lastPayment ? formatDate(selected.lastPayment) : 'None recorded'}
              </span>
              {' · '}Due by{' '}
              <span className="font-semibold text-ink">{formatDate(selected.dueDate)}</span>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setSelected(null)}>Cancel</Button>
              <Button variant="violet" onClick={recordPayment} disabled={selected.due === 0}>
                <Receipt className="h-4 w-4" />
                Record payment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  )
}
