"use client"
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ViewRepo() {
  const { data: session } = useSession()
  const router = useRouter()
  const username = session?.user
  console.log(username)
  
  // State to store the repos
  const [repos, setRepos] = useState<any[]>([])  // Array to store multiple repos
  
  // Fetch repositories only when session exists
  useEffect(() => {
    if (session?.accessToken) {
      async function repoView() {
        try {
          const res = await fetch(`/api/view-repo?token=${session?.accessToken}`)
          const data = await res.json()

          // Map to extract name and owner login from the response
          const repoDetails = data.map((repo: any) => ({
            name: repo.name,
            owner: repo.owner.login
          }))
          
          setRepos(repoDetails)  // Store extracted data in state
        } catch (error) {
          console.error("Error fetching repos:", error)
        }
      }
      
      repoView()  // Call repoView when the component mounts
    }
  }, [session])  // Re-run when the session changes

  return (
    <>
      {!session ? (
        <div>
          <p>Sign in please</p>
          <button onClick={() => router.push('/api/auth/signin')}>Yooo SignIn</button>
        </div>
      ) : (
        <div>
          {repos.length > 0 ? (
            <ul>
              {repos.map((repo, index) => (
                <li key={index}>
                  <strong>Index {index + 1}: </strong> 
                  <strong>Repo Name:</strong> {repo.name} | <strong>Owner:</strong> {repo.owner}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading repositories...</p>
          )}
        </div>
      )}
    </>
  )
}
