"use client"
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateIssuePage() {
  const { data: session } = useSession()
  const [repo, setRepo] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [result, setResult] = useState<any>(null)
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [customLabelsInput, setCustomLabelsInput] = useState("")
  const router = useRouter()

  const predefinedLabels = ["bug", "bounty", "enhancement", "documentation"]

  const toggleLabel = (label: string) => {
    setSelectedLabels(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.accessToken) {
      alert("You must be logged in with GitHub to create an issue.")
      return
    }

    // Process custom labels (split by comma, trim whitespace, remove empty strings)
    const customLabels = customLabelsInput
      .split(',')
      .map(label => label.trim())
      .filter(label => label !== "")

    // Combine selected + custom labels (remove duplicates)
    const allLabels = [...new Set([...selectedLabels, ...customLabels])]

    const res = await fetch("/api/create-issue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: session.accessToken,
        repo,
        title,
        body,
        labels: allLabels
      }),
    })

    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create GitHub Issue</h1>

        {!session ? (
          <div className="text-center">
            <p className="mb-4 text-gray-600">Please sign in first to use this feature.</p>
            <button
              onClick={() => router.push('/api/auth/signin')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Sign in with GitHub
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-gray-700">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Repository</label>
              <input
                type="text"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                placeholder="e.g., username/repo"
                className="border rounded-lg w-full p-3 focus:ring focus:ring-blue-200 text-gray-700"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Issue Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter issue title"
                className="border rounded-lg w-full p-3 focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Select Labels</label>
              <div className="grid grid-cols-2 gap-2">
                {predefinedLabels.map((label) => (
                  <label key={label} className="flex items-center space-x-2 border rounded-lg p-2 cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedLabels.includes(label)}
                      onChange={() => toggleLabel(label)}
                      className="accent-blue-600"
                    />
                    <span className="capitalize text-gray-700">{label}</span>
                  </label>
                ))}
              </div>

              <div className="mt-3">
                <label className="block mb-1 font-medium text-gray-700">Custom Labels</label>
                <input
                  type="text"
                  value={customLabelsInput}
                  onChange={(e) => setCustomLabelsInput(e.target.value)}
                  placeholder="Enter comma-separated labels (e.g., feature,urgent,help-wanted)"
                  className="border rounded-lg w-full p-3 focus:ring focus:ring-blue-200"
                />
                <p className="text-sm text-gray-500 mt-1">Separate multiple labels with commas</p>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Issue Body</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Describe the issue..."
                className="border rounded-lg w-full p-3 h-28 resize-none focus:ring focus:ring-blue-200"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg text-lg font-semibold transition"
            >
              Create Issue
            </button>
          </form>
        )}

        {result && (
          <pre className="mt-6 bg-black text-white rounded-lg p-4 text-sm overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}