
"use client";

import { authClient } from "../../lib/auth-client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
 type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

 type SessionData = {
  user: User;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
};


const ProfilePage = () => {
const { data: session, isPending } = authClient.useSession();
const user = session
  ? (session as SessionData).user
  : undefined;

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleShowForm = () => {
    setName(user?.name ?? "");
    setImage(user?.image ?? "");
    setShow((prev) => !prev);
  };

  const handleUpdateProfile = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      setShow(false);
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-green-50">
        <span className="loading loading-spinner loading-lg text-green-700" />
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-green-50 px-4 py-12">
        <div className="card w-full max-w-md border border-green-100 bg-white shadow-xl">
          <div className="card-body items-center text-center">
            <div className="rounded-full bg-green-100 p-5 text-green-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.7}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.1a7.5 7.5 0 0 1 15 0A17.9 17.9 0 0 1 12 21.75c-2.7 0-5.25-.6-7.5-1.65Z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-green-900">
              লগইন করুন
            </h2>

            <p className="text-sm leading-6 text-gray-500">
              আপনার প্রোফাইল দেখতে এবং তথ্য পরিবর্তন করতে
              প্রথমে লগইন করুন।
            </p>

            <Link
              href="/signin"
              className="btn mt-3 w-full border-green-700 bg-green-700 text-white hover:border-green-800 hover:bg-green-800"
            >
              লগইন করুন
            </Link>

            <Link
              href="/"
              className="mt-2 text-sm font-medium text-green-700 hover:underline"
            >
              ← বাজার দর হোমপেজে ফিরে যান
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const displayName = user.name || "ব্যবহারকারী";

  const avatar =
    user.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName
    )}&background=15803d&color=ffffff&size=256`;

  return (
    <main className="min-h-screen bg-green-50/70 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">

        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          <Link href="/" className="text-green-700 hover:underline">
            হোম
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-600">
            আমার প্রোফাইল
          </span>
        </div>

        {/* Page heading */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-800">
            <span>🥬</span>
            বাজার দর · আপনার অ্যাকাউন্ট
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-green-950 sm:text-4xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            বাজার দর-এর সঙ্গে থাকুন, আপনার ব্যক্তিগত তথ্য
            আপডেট করুন এবং আপনার অ্যাকাউন্ট পরিচালনা করুন।
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.5fr]">

          {/* Profile card */}
          <section className="card h-fit overflow-hidden border border-green-100 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="relative h-32 overflow-hidden bg-gradient-to-r from-green-800 via-green-600 to-lime-500">
              <div className="absolute -right-6 -top-10 h-36 w-36 rounded-full border-[18px] border-white/10" />
              <div className="absolute -bottom-12 left-5 h-28 w-28 rounded-full bg-white/10" />

              <div className="absolute left-5 top-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-50">
                  BAZAR DOR
                </p>
                <p className="mt-1 text-sm text-white/90">
                  আপনার বাজার, আপনার তথ্য
                </p>
              </div>
            </div>

            <div className="card-body items-center px-6 pb-7 pt-0 text-center">
              <div className="-mt-14 rounded-full bg-white p-1.5 shadow-md">
                <div className="avatar">
                  <div className="h-28 w-28 rounded-full ring-2 ring-green-100">
                    <img
                      src={avatar}
                      alt={`${displayName} এর প্রোফাইল`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              <h2 className="mt-2 break-words text-2xl font-bold text-green-950">
                {displayName}
              </h2>

              <p className="break-all text-sm text-gray-500">
                {user.email}
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <span className="badge gap-1 border-green-200 bg-green-50 py-3 text-green-800">
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  সক্রিয় অ্যাকাউন্ট
                </span>

                {
                 user.email && (
                  <span className="badge border-green-200 bg-white py-3 text-green-700">
                    ✓ ইমেইল যাচাইকৃত
                  </span>
                )}
              </div>

              <div className="my-2 h-px w-full bg-green-100" />

              <p className="text-sm leading-6 text-gray-500">
                আপনার অ্যাকাউন্টের তথ্য সঠিক ও আপডেট রাখুন।
              </p>

              <button
                type="button"
                onClick={handleShowForm}
                className="btn mt-3 w-full border-green-700 bg-green-700 text-white hover:border-green-800 hover:bg-green-800"
              >
                {show ? "✕ সম্পাদনা বাতিল করুন" : "✎ প্রোফাইল সম্পাদনা"}
              </button>

              <Link
                href="/"
                className="mt-1 text-sm font-medium text-green-700 hover:underline"
              >
                ← বাজার দর-এ ফিরে যান
              </Link>
            </div>
          </section>

          {/* Personal information */}
          <section className="card border border-green-100 bg-white shadow-sm">
            <div className="card-body p-5 sm:p-8">

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-green-100 p-3 text-green-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.7}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.1a7.5 7.5 0 0 1 15 0A17.9 17.9 0 0 1 12 21.75c-2.7 0-5.25-.6-7.5-1.65Z"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-green-950">
                    {show ? "তথ্য সম্পাদনা করুন" : "ব্যক্তিগত তথ্য"}
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {show
                      ? "নিচের তথ্যগুলো পরিবর্তন করে সংরক্ষণ করুন।"
                      : "আপনার অ্যাকাউন্টের সঙ্গে যুক্ত তথ্য এখানে দেখুন।"}
                  </p>
                </div>
              </div>

              {show ? (
                <form
                  onSubmit={handleUpdateProfile}
                  className="mt-5 space-y-5"
                >
                  <fieldset className="fieldset">
                    <label
                      className="label font-semibold text-gray-700"
                      htmlFor="name"
                    >
                      পুরো নাম
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="input w-full border-green-200 bg-white text-gray-800 outline-none focus:border-green-600 focus:outline-green-600"
                      placeholder="আপনার পুরো নাম লিখুন"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      minLength={1}
                      maxLength={100}
                      required
                    />
                  </fieldset>

                  <fieldset className="fieldset">
                    <label
                      className="label font-semibold text-gray-700"
                      htmlFor="image"
                    >
                      প্রোফাইল ছবির URL
                    </label>

                    <input
                      id="image"
                      name="image"
                      type="url"
                      className="input w-full border-green-200 bg-white text-gray-800 outline-none focus:border-green-600 focus:outline-green-600"
                      placeholder="https://example.com/photo.jpg"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      ছবি পরিবর্তন না করতে চাইলে এই ঘরটি খালি রাখুন।
                    </p>
                  </fieldset>

                  {image.trim() && (
                    <div className="flex items-center gap-4 rounded-xl border border-green-200 bg-green-50/70 p-4">
                      <div className="avatar">
                        <div className="h-20 w-20 rounded-full ring-2 ring-green-200">
                          <img
                            src={image}
                            alt="প্রোফাইল ছবির প্রিভিউ"
                            width={60}
                            height={60}
                           
                          />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-green-900">
                          ছবির প্রিভিউ
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {image}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <button
                      type="submit"
                      disabled={loading || !name.trim()}
                      className="btn flex-1 border-green-700 bg-green-700 text-white hover:border-green-800 hover:bg-green-800 disabled:bg-gray-300"
                    >
                      {loading && (
                        <span className="loading loading-spinner loading-sm" />
                      )}
                      {loading ? "সংরক্ষণ হচ্ছে..." : "✓ পরিবর্তন সংরক্ষণ"}
                    </button>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleShowForm}
                      className="btn border-green-200 bg-white text-green-800 hover:bg-green-50"
                    >
                      বাতিল
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-6 space-y-4">

                  <div className="rounded-xl border border-green-100 bg-green-50/50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      পুরো নাম
                    </p>
                    <p className="mt-2 break-words font-semibold text-gray-800">
                      {user.name || "নাম দেওয়া হয়নি"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-green-100 bg-green-50/50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      ইমেইল ঠিকানা
                    </p>
                    <p className="mt-2 break-all font-semibold text-gray-800">
                      {user.email}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      ইমেইল পরিবর্তনের জন্য আলাদা ব্যবস্থা প্রয়োজন।
                    </p>
                  </div>

                  <div className="rounded-xl border border-green-100 bg-green-50/50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      প্রোফাইল ছবি
                    </p>
                    <p className="mt-2 break-all text-sm text-gray-700">
                      {user.image || "ডিফল্ট ছবি ব্যবহার করা হচ্ছে"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleShowForm}
                    className="btn mt-2 w-full border-green-700 bg-white text-green-800 hover:bg-green-50"
                  >
                    ✎ তথ্য আপডেট করুন
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-green-200 bg-white p-4 sm:p-5">
          <span className="text-2xl">🛒</span>
          <div>
            <h3 className="font-bold text-green-900">
              আপনার নিত্যদিনের বাজার, এক নজরে
            </h3>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              বাজার দর-এর মাধ্যমে নিত্যপ্রয়োজনীয় পণ্যের
              দাম সম্পর্কে জানুন এবং সচেতনভাবে আপনার বাজার পরিকল্পনা করুন।
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
