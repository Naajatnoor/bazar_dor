"use client";

import { authClient } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "");
    const image = String(formData.get("image") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        ...(image ? { image } : {}),
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন আপ করা যায়নি!");
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
        router.push("/signin");
      }
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google দিয়ে সাইন ইন করা যায়নি!");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch {
      toast.error("GitHub দিয়ে সাইন ইন করা যায়নি!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-lg sm:p-8">
        <h2 className="mb-2 text-center text-2xl font-bold text-green-700">
          সাইন আপ
        </h2>

        <p className="mb-6 text-center text-sm text-gray-500">
          বাজার দর-এ অ্যাকাউন্ট তৈরি করুন
        </p>

        <form onSubmit={onSubmit}>
          <fieldset className="fieldset w-full">
            <label className="label">নাম</label>
            <input
              name="name"
              type="text"
              className="input w-full focus:border-green-600"
              placeholder="আপনার নাম"
              required
            />

            <label className="label">Image URL (ঐচ্ছিক)</label>
            <input
              name="image"
              type="url"
              className="input w-full focus:border-green-600"
              placeholder="https://example.com/image.jpg"
            />

            <label className="label">ইমেইল</label>
            <input
              name="email"
              type="email"
              className="input w-full focus:border-green-600"
              placeholder="আপনার ইমেইল"
              required
            />

            <label className="label">পাসওয়ার্ড</label>
            <input
              name="password"
              type="password"
              className="input w-full focus:border-green-600"
              placeholder="পাসওয়ার্ড দিন"
              minLength={8}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="btn mt-5 w-full border-none bg-green-700 text-white hover:bg-green-800"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
            </button>
          </fieldset>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn flex-1 border-green-200 bg-white text-green-700 hover:bg-green-50"
          >
            Google দিয়ে সাইন ইন
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            className="btn flex-1 border-green-200 bg-white text-green-700 hover:bg-green-50"
          >
            GitHub দিয়ে সাইন ইন
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;