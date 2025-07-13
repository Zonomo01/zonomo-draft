"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
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
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "600"],
});

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This email is already in use. Sign in instead?");
        return;
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }

      toast.error("Something went wrong. Please try again.");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}.`);
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password });
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

            {/* Right side - Signup Form */}
            <div className="w-full lg:w-auto lg:flex-shrink-0 px-4 lg:px-0">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 w-full lg:w-[450px] max-w-md mx-auto lg:mx-0">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl text-white mb-2">
                   Create your Account 
                  </h2>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Email Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </div>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="Email Address"
                        className={cn(
                          "pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border-purple-400/30 text-black placeholder-purple-300 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-sm sm:text-base",
                          {
                            "border-red-400 focus:border-red-400 focus:ring-red-400/20":
                              errors.email,
                          }
                        )}
                      />
                    </div>
                    {errors?.email && (
                      <p className="text-xs sm:text-sm text-red-400 ml-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <Input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={cn(
                          "pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border-purple-400/30 text-black placeholder-purple-300 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-sm sm:text-base",
                          {
                            "border-red-400 focus:border-red-400 focus:ring-red-400/20":
                              errors.password,
                          }
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 hover:text-purple-200" />
                        ) : (
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 hover:text-purple-200" />
                        )}
                      </button>
                    </div>
                    {errors?.password && (
                      <p className="text-xs sm:text-sm text-red-400 ml-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <Link
                      href="/forgot-password"
                      className="text-xs sm:text-sm text-purple-300 hover:text-purple-200 transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Signup Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    )}
                    Sign Up
                  </Button>

                  {/* Divider */}
                  <div className="relative my-5 sm:my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-purple-400/20" />
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                      <span className="px-4 bg-black/30 text-purple-300">
                        Or continue with
                      </span>
                    </div>
                  </div>
                </form>

                {/* Seller Account Button */}
                <div className="mt-5 sm:mt-6">
                  <Button
                    onClick={() => router.push("/seller/sign-up")}
                    variant="outline"
                    className="w-full py-2.5 sm:py-3 bg-transparent border-purple-400/50 text-purple-300 hover:bg-purple-400/10 hover:text-purple-200 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
                    disabled={isLoading}
                  >
                    Create seller account instead
                  </Button>
                </div>

                {/* Login Link */}
                <div className="text-center mt-6 sm:mt-8">
                  <p className="text-purple-300 text-sm sm:text-base">
                    Already have an account?{" "}
                    <Link
                      href="/sign-in"
                      className="text-purple-200 hover:text-white font-semibold transition-colors"
                    >
                      Sign in here
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