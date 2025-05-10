import { NextResponse } from 'next/server'
import { Octokit } from 'octokit'

// Accept token via query param
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Token is required.' }, { status: 400 })
  }

  try {
    const octokit = new Octokit({
      auth: token,
    })

    // Fetch authenticated user's repositories with pagination
    const response = await octokit.paginate(octokit.rest.repos.listForAuthenticatedUser, {
      per_page: 100,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error('GitHub API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    )
  }
}
