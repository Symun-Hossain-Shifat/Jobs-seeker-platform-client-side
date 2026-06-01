'use client'
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { FaEnvelope, FaGoogle, FaLock } from "react-icons/fa";
import { IoCheckboxOutline } from "react-icons/io5";

function Signinpage() {

   const Handlesignin = async (e) => {
    e.preventDefault()
    const FormData = e.target
   
    const email = FormData.Email.value
  
    const password = FormData.Password.value 
    console.log( email ,  password)
    const { data, error } = await authClient.signIn.email({
    email: email ,
    password: password , // required
    rememberMe: false,
    callbackURL: "/",
});
  if(data){
    alert('Login Successfull !')
  }else if (error){
    alert(`Login Failed . ${error}`)
  }
    }


  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4 py-10">
      <div className="w-full max-w-md bg-[#111111] border border-gray-800 shadow-2xl rounded-2xl p-6 sm:p-8">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2">
            Sign in to access your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={ Handlesignin } className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>

            <div className="flex items-center border border-gray-700 rounded-lg px-3 py-3 bg-[#1A1A1A] focus-within:border-cyan-500 transition">
              <FaEnvelope className="text-gray-500 mr-3" />

              <input
                name="Email"
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none bg-transparent text-white placeholder:text-gray-500 text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>

            <div className="flex items-center border border-gray-700 rounded-lg px-3 py-3 bg-[#1A1A1A] focus-within:border-cyan-500 transition">
              <FaLock className="text-gray-500 mr-3" />

              <input
                name="Password"
                type="password"
                placeholder="Enter your password"
                className="w-full outline-none bg-transparent text-white placeholder:text-gray-500 text-sm"
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <IoCheckboxOutline className="text-lg" />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-medium transition duration-300"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="text-center text-gray-500 text-sm relative">
            <span className="bg-[#111111] px-3 relative z-10">
              Or continue with
            </span>

            <div className="absolute top-1/2 left-0 w-full border-t border-gray-700"></div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full border border-gray-700 bg-[#1A1A1A] py-3 rounded-lg flex items-center justify-center gap-2 text-gray-300 hover:bg-[#222222] transition"
          >
            <FaGoogle className="text-red-500" />
            <span className="text-sm">Continue with Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-cyan-400 font-medium hover:text-cyan-300 transition"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Signinpage;

