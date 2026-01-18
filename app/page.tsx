"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-400 via-white to-orange-400 relative overflow-hidden px-4 py-8">

      {/* Các khối màu trang trí nền rực rỡ hơn */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-300 rounded-full blur-[100px] opacity-70 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-300 rounded-full blur-[100px] opacity-70 animate-bounce-slow"></div>
      <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-blue-200 rounded-full blur-[90px] opacity-60"></div>

      {/* Container chính với hiệu ứng Glassmorphism mạnh hơn */}
      <div className="relative z-10 w-full max-w-[480px] bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.1)] border border-white/50 flex flex-col items-center">

        {/* Tiêu đề - Thiết kế Gradient cao cấp */}
        <h1 className="text-4xl md:text-[42px] font-[900] text-transparent bg-clip-text bg-gradient-to-r from-[#F36F21] via-[#ff8c42] to-[#F36F21] mb-3 mt-4 text-center tracking-tighter leading-none animate-gradient-x">
          Get more opportunities
        </h1>
        <p className="text-[#475467] mb-8 text-center text-sm font-medium">Join the FPT University community today</p>

        {/* Nút Sign Up with Google */}
        <Button
          variant="outline"
          className="w-full h-12 flex items-center justify-center gap-3 border-[#d0d5dd] bg-white/50 text-[#344054] font-semibold hover:bg-white mb-6 rounded-xl transition-all duration-300 shadow-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign Up with Google
        </Button>

        {/* Divider */}
        <div className="relative w-full mb-8 flex items-center">
          <div className="flex-grow border-t border-[#eaecf0]"></div>
          <span className="mx-4 text-[13px] font-semibold text-[#667085] bg-transparent px-2">Or sign up with email</span>
          <div className="flex-grow border-t border-[#eaecf0]"></div>
        </div>

        {/* Form Đăng ký */}
        <form className="w-full space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullname" className="text-sm font-semibold text-[#344054]">Full name</Label>
            <Input
              id="fullname"
              placeholder="Enter your full name"
              className="h-12 border-[#d0d5dd] rounded-xl focus-visible:ring-[#F36F21] focus-visible:border-[#F36F21] transition-all bg-white/70"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-[#344054]">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              className="h-12 border-[#d0d5dd] rounded-xl focus-visible:ring-[#F36F21] focus-visible:border-[#F36F21] transition-all bg-white/70"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-[#344054]">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              className="h-12 border-[#d0d5dd] rounded-xl focus-visible:ring-[#F36F21] focus-visible:border-[#F36F21] transition-all bg-white/70"
            />
          </div>

          {/* Nút Continue màu Cam FPT nổi bật */}
          <Button
            type="submit"
            className="w-full h-12 bg-[#F36F21] hover:bg-[#d95d16] text-white font-bold rounded-xl mt-4 shadow-xl shadow-orange-200 transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-[0px]"
          >
            Continue
          </Button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-[#475467]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#F36F21] font-bold hover:underline transition-all">
            Login
          </Link>
        </div>

        {/* Terms and Privacy */}
        <div className="mt-8 text-center text-[11px] leading-5 text-[#667085] max-w-[340px]">
          By clicking 'Continue', you acknowledge that you have read and accept the{" "}
          <Link href="#" className="underline hover:text-[#F36F21]">Terms of Service</Link> and{" "}
          <Link href="#" className="underline hover:text-[#F36F21]">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
}