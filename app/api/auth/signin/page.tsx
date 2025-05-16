// app/signin/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const handleGitHubSignIn = async () => {
    setLoading(true);
    await signIn("github",{callbackUrl:'/user'});
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  to-[#0c0c3d] text-white px-4">
      <div className="max-w-md w-full rounded-3xl shadow-2xl p-10 border border-gray-800 backdrop-blur-sm bg-opacity-80">
        <h1 className="text-4xl font-orbitron font-bold text-cyan-400 text-center mb-6">
          Git Bounty
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Sign in to start hunting bounties 🚀
        </p>

        <button
          onClick={handleGitHubSignIn}
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full py-3 text-lg rounded-full border-2 border-gray-700 bg-[#0d1117] hover:border-cyan-400 hover:bg-[#161b22] transition-all font-bold"
        >
          <FaGithub className="text-2xl" />
          {loading ? "Signing in..." : "Sign in with GitHub"}
        </button>

        <p className="text-xs text-gray-500 mt-6 text-center">
          By signing in, you agree to our <span className="underline cursor-pointer hover:text-cyan-400">Terms</span> and <span className="underline cursor-pointer hover:text-cyan-400">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
