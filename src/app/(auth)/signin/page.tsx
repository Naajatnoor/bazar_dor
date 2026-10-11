"use client";

import { authClient, signIn } from "../../../lib/auth-client";
import toast from "react-hot-toast";

const SignInPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    console.log(user);

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Sign In successfull!");
  
    }

    if (error) {
      toast.error("Something went error!");
      
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });

  };

  const handleGithubSignIn = async () => {
 await signIn.social({
      provider: "github",
    });
  }

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <h2 className="text-2xl font-bold text-green-700">সাইন ইন</h2>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset   rounded-box w-md">
          <label className="label">ইমেইল</label>
          <input
            name="email"
            type="email"
            className="input w-md"
            placeholder="Email"
          />

          <label className="label">পাসওয়ার্ড</label>
         <input
  type="password"
  name="password"
  placeholder="Password"
  autoComplete="current-password"
  className="input w-full"
/>

          <button type="submit" className="btn text-white bg-green-700 mt-4 ">
            সাইন ইন করুন
          </button>
        </fieldset>
       </form>
<div className="flex items-center gap-3 my-5"> 
      <button onClick={handleGoogleSignIn} className="btn text-green-700 ">Sign In With Google</button>
      <button onClick={handleGithubSignIn} className="btn  text-green-700 ">Sign In With Github</button>
    </div>
    </div>
  );
};

export default SignInPage;