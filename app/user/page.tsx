"use client";
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import RepoIssues from "@/components/RepoIssues";
import SignInPage from "../api/auth/signin/page";

export default function UserProfile() {
  const { data: session } = useSession();
  const [githubUser, setGithubUser] = useState<any>(null);
  useEffect(() => {
    if (session?.accessToken) {
      // Call our API route with token
      fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: session.accessToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          setGithubUser(data);
          console.log("GitHub user data:", data);
        })
        .catch((err) => {
          console.error("Error fetching GitHub user:", err);
        });
    }

  }, [session?.accessToken]);
console.log(githubUser)


  if (!session) {
    return (
      <div>
        <SignInPage/>
      </div>
    );
  }

  return (
    <div className="p-4">
      {githubUser ? (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 space-y-8 font-sans">
          {/* Profile Card */}
          <div className="border-b border-gray-300 pb-6 text-center">
            <Image
              src={githubUser.avatar_url}
              alt="Profile"
              className="rounded-full border-4 border-[#4b2e17]"
              width={100}
              height={100}
            />
            <h1 className="text-3xl text-[#4b2e17] mt-4">
              {githubUser.name ?? githubUser.login}
            </h1>
            <p className="text-[#5e4c3a] mt-2">
              <strong>UserName:</strong> {githubUser.login}
            </p>
            <div className="flex justify-center mt-4 space-x-6">
              <a
                href={githubUser.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                GitHub
              </a>
            </div>
          </div>
          <RepoIssues userName={githubUser.login}/>
          </div>
      ) : (
        <p>Loading GitHub data...</p>
      )}
    </div>
  );
}
