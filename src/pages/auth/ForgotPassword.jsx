import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { Button, Input } from '../../components/ui'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await resetPassword(data.email)
      toast(res.message, 'info')
    } catch (err) {
      toast(err.message || 'Unable to send reset email', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="w-full max-w-md rounded-[28px] border border-border bg-surface p-8 shadow-[var(--shadow-soft)]">
        <h1 className="text-3xl font-extrabold text-ink">Reset password</h1>
        <p className="mt-2 text-sm text-ink-muted">We&apos;ll email you a secure reset link.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <Input label="Email" type="email" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
          <Button type="submit" className="w-full" loading={loading}>Send reset link</Button>
        </form>
        <p className="mt-6 text-center text-sm">
          <Link to="/login" className="font-semibold text-violet hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  )
}
