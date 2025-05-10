// app/api/create-issue/route.ts
/* eslint-disable  @typescript-eslint/no-explicit-any */


import { NextResponse } from "next/server"
import { createClient } from '@/utils/supabase/client'

// ⏩ Function 1 — Create GitHub Issue
async function createGithubIssue({ token, repo, userId, title, body, labels }: {
  token: string,
  repo: string,
  userId: string,
  title: string,
  body: string,
  labels: string[]
}) {
  const response = await fetch(`https://api.github.com/repos/${userId}/${repo}/issues`, {
    method: "POST",
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body, labels }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "GitHub API error")
  }

  return data
}

// ⏩ Function 2 — Store Issue in Supabase
async function storeIssueInSupabase({ userId, title, body, statement, bounty_amt}: {
  userId: string,
  title: string,
  body: string,
  statement: string,
  bounty_amt : string
}) {
  const supabase = await createClient()

  const { error } = await supabase.from('issue').insert([
    {
      userId: userId,
      title: title,
      description: body,
      bounty_amt : bounty_amt,
      statement: statement,
    },
  ])

  if (error) {
    throw new Error(error.message || "Supabase insert error")
  }
}

// 🌟 Main POST handler
export async function POST(request: Request) {
  try {
    const { token, repo, title, body, labels, userId, statement, bounty_amt, deadline, status } = await request.json()

    // Validation
    if (!token || !repo || !title || !userId || !statement || !bounty_amt || !deadline || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // 1️⃣ Create GitHub issue
    const githubIssue = await createGithubIssue({ token, repo, userId, title, body, labels })

    // 2️⃣ Store in Supabase
    await storeIssueInSupabase({ userId, title, body, statement,bounty_amt })

    // ✅ Success response
    return NextResponse.json({ message: 'Issue created and stored successfully', githubIssue })

  } catch (error: any) {
    console.error("Error:", error.message)
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 })
  }
}
