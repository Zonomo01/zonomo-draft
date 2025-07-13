'use client'

import { Icons } from '@/components/Icons'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Poppins } from "next/font/google";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { trpc } from '@/trpc/client'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { useRouter } from 'next/navigation'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "600"],
});

const Page = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      toast.success('Signed in successfully as seller')
      router.refresh()
      router.push('/sell')
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        toast.error('Invalid email or password.')
      }
    },
  })

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password })
  }

  return (
    <div
    className={cn(
      poppins.className,
      "min-h-screen zonomo-gradient p-2 sm:p-4"
    )}
  >
     <div className="min-h-screen flex flex-col lg:items-end lg:justify-around">
        {/* Mobile Branding - Top */}
        <div className="lg:hidden text-center pt-8 pb-12">
          <h1 
            className="text-4xl sm:text-6xl font-bold text-white mb-4 tracking-tight" 
            style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.9)" }}
          >
            ZONOMO
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 leading-relaxed font-light px-4">
            Zonomo connects you with a trusted home service partner.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto flex-1 lg:flex lg:items-center lg:justify-center">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8 lg:gap-16">
            {/* Desktop Branding - Left side */}
            <div className="hidden lg:flex flex-col justify-center items-start pr-24 ">
              <div className="max-w-md xl:max-w-lg">
                <h1
                  className="text-6xl xl:text-9xl font-bold text-white mb-6 tracking-tight"
                  style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.9)" }}
                >
                  ZONOMO
                </h1>
                <p className="text-xl xl:text-2xl text-purple-200 leading-relaxed font-light">
                  Zonomo connects you with a trusted home service partner.
                </p>
              </div>
            </div>

        <div className="lg:w-full flex items-center justify-center p-4">
        
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/20 w-full max-w-md">
          <Icons.logo className='h-12 w-12 sm:h-16 sm:w-16 text-purple-500 mx-auto mb-3 sm:mb-4' />
            <div className="text-center mb-8">
              <h2 className="text-2xl  text-white">Create a seller account</h2>
              <Link
                className={buttonVariants({
                  variant: 'link',
                  className: 'gap-1.5 text-purple-300 hover:text-purple-200',
                })}
                href='/seller/sign-up'>
                Already have a seller account? Sign in
              </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-purple-200">Email</Label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className={cn(
                    'w-full p-3 border border-purple-400/30 rounded-xl bg-black/20 text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400',
                    { 'border-red-400 focus:ring-red-400 focus:border-red-400': errors.email }
                  )}
                />
                {errors?.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-purple-200">Password</Label>
                <div className="relative">
                  <Input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className={cn(
                      'w-full p-3 border border-purple-400/30 rounded-xl bg-black/20 text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400',
                      { 'border-red-400 focus:ring-red-400 focus:border-red-400': errors.password }
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-300 hover:text-purple-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors?.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create seller account
              </Button>
            </form>
            <Button
              onClick={() => router.push('/sign-in')}
              variant="outline"
              className="w-full py-3 mt-4 bg-transparent border-purple-400/50 text-purple-300 hover:bg-purple-400/10 hover:text-purple-200 rounded-xl font-semibold transition-all duration-200"
              disabled={isLoading}
            >
              Create customer account instead
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Page
