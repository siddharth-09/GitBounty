"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function UserProfile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [githubUser, setGithubUser] = useState<any>(null);

  const issuesData = [
    {
      id: 1,
      title: "Fix bounty board alignment issue",
      status: "open",
    },
    {
      id: 2,
      title: "Add animation to bounty reveal",
      status: "closed",
    },
    // Add more issues as needed
  ];

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
        <p>SignIn Please</p>
        <button onClick={() => router.push("/api/auth/signin")}>
          Yooo SignIN
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <p>Welcome, {session.user?.name}</p>
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

          {/* Issues Section */}
          <div>
            <h2 className="text-2xl text-gray-800 font-semibold mb-4">
              Created Repo Issues
            </h2>
            {issuesData.length === 0 ? (
              <p className="text-gray-600">No issues created.</p>
            ) : (
              <ul className="space-y-3">
                {issuesData.map((issue) => (
                  <li
                    key={issue.id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:-translate-y-1 transform transition border"
                  >
                    <span className="text-gray-800">{issue.title}</span>
                    <span
                      className={`font-bold ${
                        issue.status === "open"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      [{issue.status}]
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Floating Create Issue Button */}
          <button className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-800 text-white px-5 py-3 rounded-lg shadow-lg transition">
            Create Issue
          </button>
        </div>
      ) : (
        <p>Loading GitHub data...</p>
      )}
    </div>
  );
}
