import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { Button, Input, Select } from '../../components/ui'

export default function Register() {
  const { register: registerUser } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { role: 'student' },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const user = await registerUser(data)
      toast('Account created successfully')
      navigate(user.role === 'student' ? '/app/student' : user.role === 'parent' ? '/app/parent' : '/app')
    } catch (err) {
      toast(err.message || 'Registration failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory bg-grid px-6 py-12">
      <div className="w-full max-w-md rounded-[28px] border border-border bg-surface p-8 shadow-[var(--shadow-soft)]">
        <p className="text-sm font-extrabold tracking-wide text-violet">EDUVISTA</p>
        <h1 className="mt-2 text-3xl font-extrabold text-ink">Create account</h1>
        <p className="mt-1 text-sm text-ink-muted">Join your institution workspace.</p>
        <p className="mt-3 rounded-[14px] border border-violet/20 bg-violet/5 px-3 py-2 text-xs text-ink-secondary">
          Tip: In Firebase Console, enable <strong>Email/Password</strong> under Authentication → Sign-in method.
          Or use demo roles from the login page.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <Input label="Full name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
          <Input label="Password" type="password" error={errors.password?.message} {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })} />
          <Select label="Role" {...register('role')}>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </Select>
          <Button type="submit" className="w-full" loading={loading}>Get started</Button>
        </form>
        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-violet hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
