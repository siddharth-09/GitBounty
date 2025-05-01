// app/api/create-issue/route.ts

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { token, repo, title, body, labels } = await request.json()

    if (!token || !repo || !title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, labels }),   // ✅ labels included
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.message || "GitHub API error" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating issue:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
