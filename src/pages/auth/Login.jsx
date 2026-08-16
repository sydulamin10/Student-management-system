import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { Button, Input } from '../../components/ui'

export default function Login() {
  const { login, loginGoogle, loginAsDemo } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const user = await login(data.email, data.password)
      toast('Welcome back to EDUVISTA')
      navigate(user.role === 'student' ? '/app/student' : user.role === 'parent' ? '/app/parent' : '/app')
    } catch (err) {
      toast(err.message || 'Login failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  const demo = (role) => {
    loginAsDemo(role)
    toast(`Signed in as demo ${role}`)
    navigate(role === 'student' ? '/app/student' : role === 'parent' ? '/app/parent' : '/app')
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-charcoal lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,92,252,0.4),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(45,212,191,0.25),transparent_40%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/10">
              <Sparkles className="h-5 w-5 text-violet-soft" />
            </div>
            <span className="text-lg font-extrabold tracking-wide">EDUVISTA</span>
          </div>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md font-display text-5xl leading-tight"
            >
              Continue your academic journey.
            </motion.h1>
            <p className="mt-4 max-w-sm text-white/60">
              One intelligent workspace for students, teachers, parents, and campus operations.
            </p>
          </div>
          <p className="text-sm text-white/40">Designed for modern institutions.</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-ivory px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <p className="text-sm font-extrabold tracking-wide text-violet">EDUVISTA</p>
          </div>
          <h2 className="text-3xl font-extrabold text-ink">Welcome back</h2>
          <p className="mt-2 text-sm text-ink-muted">Sign in to your campus workspace.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="admin@eduvista.edu"
              error={errors.email?.message}
              {...register('email', { required: 'Email is required' })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', { required: 'Password is required', minLength: { value: 4, message: 'Min 4 characters' } })}
            />
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs font-semibold text-violet hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full" loading={loading}>
              Sign in
            </Button>
          </form>

          <Button variant="secondary" className="mt-3 w-full" onClick={async () => {
            await loginGoogle()
            toast('Signed in with Google (demo)')
            navigate('/app')
          }}>
            Continue with Google
          </Button>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">Demo access</p>
            <div className="grid grid-cols-2 gap-2">
              {['admin', 'teacher', 'student', 'parent'].map((role) => (
                <Button key={role} variant="ghost" size="sm" className="capitalize" onClick={() => demo(role)}>
                  {role}
                </Button>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-ink-muted">
            New here?{' '}
            <Link to="/register" className="font-semibold text-violet hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
