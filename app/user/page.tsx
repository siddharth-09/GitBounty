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
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FaGithub, FaTwitter } from "react-icons/fa";


export default function UserProfile() {
  const { data: session } = useSession();
  const [githubUser, setGithubUser] = useState<any>(null);
  useEffect(() => {
  const observer = new MutationObserver(() => {
    const elements = document.querySelectorAll("body, body *");

    elements.forEach((element) => {
      if (element.childNodes.length) {
        element.childNodes.forEach((node) => {
          if (
            node.nodeType === 3 && // Text node
            node.nodeValue &&
            node.nodeValue.includes("Select")
          ) {
            node.nodeValue = node.nodeValue.replace("Select", "Connect");
            observer.disconnect(); // Stop observing after the change
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => observer.disconnect();
}, []);

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
        })
        .catch((err) => {
          console.error("Error fetching GitHub user:", err);
        });
    }
    
  }, [session?.accessToken]);

  if (!session) {
    return (
      <div>
        <SignInPage/>
      </div>
    );
  }

  return (
    <>
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
            <div className="flex justify-center mt-4 space-x-6 items-center">
  <a
    href={githubUser.html_url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 underline handleButton"
  >
    <FaTwitter />
    <span>Twitter</span>
  </a>

  <div>
    <WalletMultiButton />
  </div>

  <a
    href={githubUser.html_url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 underline handleButton"
  >
    <FaGithub />
    <span>GitHub</span>
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
    </>
  );
}
