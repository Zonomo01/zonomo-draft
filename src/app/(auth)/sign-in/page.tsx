"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Poppins } from "next/font/google";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

// ✅ Correct: Font loader at module scope
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "600"],
});

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const origin = searchParams.get("origin");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      toast.success("Signed in successfully");
      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      router.push("/");
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password.");
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password });
  };

  return (
    <div
      className={cn(
        poppins.className,
        "min-h-screen zonomo-gradient p-2 sm:p-4"
      )}
    >
      <div className="min-h-screen flex flex-col lg:items-end lg:justify-around">
        {/* Mobile Branding - Top */}
        <div className="lg:hidden text-center pt-8 pb-12  ">
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8 lg:gap-32">


            {/* Desktop Branding - Left side */}
            <div className="hidden lg:flex flex-col justify-center items-start pr-24 ">
              <div className="max-w-lg text-left">
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

            {/* Right side - Login Form */}
            <div className="w-full lg:w-auto lg:flex-shrink-0 px-4 lg:px-0">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 w-full lg:w-[450px] max-w-md mx-auto lg:mx-0">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl text-white mb-2">
                    Login to your account
                  </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 sm:h-6 sm:w-6" />
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="Email Address"
                        className={cn(
                          "pl-10 sm:pl-12 text-center pr-3 sm:pr-4 py-4 sm:py-6 bg-white/10 border-white/10 text-white placeholder-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base",
                          {
                            "border-red-500 focus:ring-red-500": errors.email,
                          }
                        )}
                      />
                    </div>
                    {errors?.email && (
                      <p className="text-xs sm:text-sm text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 sm:h-6 sm:w-6" />
                      <Input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={cn(
                          "pl-10 sm:pl-12 text-center pr-10 sm:pr-12 py-4 sm:py-6 bg-white/10 border-white/20 text-white placeholder-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base",
                          {
                            "border-red-500 focus:ring-red-500":
                              errors.password,
                          }
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </button>
                    </div>
                    {errors?.password && (
                      <p className="text-xs sm:text-sm text-red-400">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Forgot Password */}
                  <div className="text-right">
                    <Link
                      href="/forgot-password"
                      className="text-xs sm:text-sm text-purple-300 hover:text-white transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 sm:py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] text-sm sm:text-base"
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    )}
                    Login
                  </Button>

                  {/* Divider */}
                  <div className="flex items-center my-6 sm:my-8">
                    <div className="flex-1 border-t border-white/20"></div>
                    <span className="px-3 sm:px-4 text-gray-400 text-xs sm:text-sm">
                      Or continue with
                    </span>
                    <div className="flex-1 border-t border-white/20"></div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="flex gap-3 sm:gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 py-4 sm:py-6 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
                      disabled={isLoading}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 48 48"
                        className="sm:w-[30px] sm:h-[30px]"
                      >
                        <path
                          fill="#4285F4"
                          d="M43.611 20.083H42V20H24v8h11.303C33.891 32.805 29.369 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.841 1.137 7.938 2.993l5.657-5.657C33.527 6.179 28.979 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20c11.046 0 20-8.954 20-20 0-1.341-.138-2.65-.389-3.917z"
                        />
                        <path
                          fill="#34A853"
                          d="M6.306 14.691l6.571 4.819C14.311 15.369 18.842 12 24 12c3.059 0 5.841 1.137 7.938 2.993l5.657-5.657C33.527 6.179 28.979 4 24 4c-7.49 0-13.94 4.134-17.694 10.691z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M24 44c4.799 0 9.24-1.735 12.663-4.607l-5.843-4.773C28.747 36.709 26.462 37.5 24 37.5c-5.352 0-9.885-3.207-11.815-7.802l-6.566 5.064C9.978 40.092 16.499 44 24 44z"
                        />
                        <path
                          fill="#EA4335"
                          d="M43.611 20.083H42V20H24v8h11.303c-1.209 3.257-3.749 5.77-6.843 7.12l.001.001 5.843 4.773C37.434 37.977 40 31.518 40 24c0-1.341-.138-2.65-.389-3.917z"
                        />
                      </svg>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 py-4 sm:py-6 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
                      disabled={isLoading}
                    >
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </Button>
                  </div>

                  {/* Continue as Seller Button */}
                  <Button
                    type="button"
                    onClick={() => router.push("/seller/sign-in")}
                    variant="outline"
                    className="w-full py-4 sm:py-6 bg-transparent border-white/20 text-white hover:bg-white/10 rounded-xl text-sm sm:text-base"
                    disabled={isLoading}
                  >
                    Continue as seller
                  </Button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center mt-6 sm:mt-8">
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Don't have an account?{" "}
                    <Link
                      href="/sign-up"
                      className="text-purple-300 hover:text-white transition-colors font-semibold"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;