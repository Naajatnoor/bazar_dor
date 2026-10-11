"use client";
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

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import toast from "react-hot-toast";

const UserInfo = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
 const user = session
  ? (session as SessionData).user
  : undefined;

  const handleSignout = async () => {
    try {
      const { error } = 
       await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/signin";
      },
    },
  });

      if (error) {
        toast.error(error.message || "লগআউট করা যায়নি!");
        return;
      }

      toast.success("সফলভাবে লগআউট হয়েছে!");
      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন!");
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
        <div className="space-y-2">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton h-3 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div className="dropdown dropdown-end">
          {/* User Avatar and Info */}
          <div
            tabIndex={0}
            role="button"
            className="flex cursor-pointer items-center gap-3 rounded-xl p-2 transition hover:bg-green-50"
          >
            <div className="avatar">
              <div className="w-11 rounded-full ring-2 ring-green-600 ring-offset-2 ring-offset-white">
                <img
                  alt={user.name || "User avatar"}
                  src={
                    user.image ||
                    "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                  }
                />
              </div>
            </div>

            <div className="hidden text-left sm:block">
              <h2 className="max-w-36 truncate text-sm font-semibold text-green-800">
                {user.name}
              </h2>
              <p className="max-w-40 truncate text-xs text-gray-500">
                {user.email}
              </p>
            </div>

            <span className="text-xs text-green-700">▼</span>
          </div>

          {/* Dropdown Menu */}
          <ul
            tabIndex={0}
            className="dropdown-content menu z-[100] mt-3 w-56 rounded-xl border border-green-100 bg-white p-2 text-gray-700 shadow-xl"
          >
            <li className="menu-title">
              <span className="text-green-700">আমার অ্যাকাউন্ট</span>
            </li>

            <li>
              <Link
                href="/profile"
                className="rounded-lg hover:bg-green-50 hover:text-green-700"
              >
                প্রোফাইল দেখুন
              </Link>
            </li>

            <li>
              <button
                type="button"
                onClick={handleSignout}
                className="rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                লগআউট
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="btn btn-ghost text-neutral-700 transition-colors hover:bg-green-50 hover:text-green-700"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="btn border-none bg-green-700 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
