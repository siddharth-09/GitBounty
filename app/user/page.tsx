"use client";

/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import RepoIssues from "@/components/RepoIssues";
import ProfileTable from "@/components/ProfileTable";
import SignInPage from "../api/auth/signin/page";
// Style
import '../user/userStyle.css'
import { Wallet } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";


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
    <div>
      {githubUser ? (
        <>
          {/* Profile Card */}
          <div className="outerProfileCard">

         
          <div className="profileCardContainer">
            <div className="profileImgContainer">

            <Image
              src={githubUser.avatar_url}
              alt="Profile"
              className="profileImg"
              width={100}
              height={100}
              />
              </div>
            <h1 className="text-3xl text-[#4b2e17] mt-4 text-white">
              {githubUser.name ?? githubUser.login}
            </h1>
            <p className="text-[#5e4c3a] mt-2 text-white">
              <strong>UserName:</strong> {githubUser.login}
            </p>
            <div className="flex justify-center mt-4 space-x-6">
            <a
                href={githubUser.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline handleButton"
              >
                Twitter ✨
              </a>
              <WalletMultiButton/>
              <a
                href={githubUser.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline handleButton"
              >
                GitHub ✨
              </a>
            </div>
            <ProfileTable />
             </div>
          </div>
          <RepoIssues userName={githubUser.login}/>
          </>
      ) : (
        <p>Loading GitHub data...</p>
      )}
    </div>
  );
}
