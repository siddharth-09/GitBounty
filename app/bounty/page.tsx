'use client';
import React, { useState, useEffect } from 'react';

interface Problem {
  id: number;
  userId: string;
  title: string;
  statement: string;
  description: string;
  github: string;
  deadline: string;
  bounty_amt: string;
}

const ProblemDetail = ({ problem }: { problem: Problem }) => {
  return (
    <div className="backdrop-blur-[35px] bg-[#696969]/40 border-[3px] border-blueviolet rounded-[15px] p-6 w-[314px] min-h-[170px] text-white shadow-lg">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">📋</span>
          <span className="font-semibold">Title:</span>
          <span>{problem.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">📋</span>
          <span className="font-semibold">Statement:</span>
          <span>{problem.statement}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">⏰</span>
          <span className="font-semibold">Deadline:</span>
          <span>{problem.deadline}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">🐙</span>
          <span className="font-semibold">GitHub:</span>
          <a href={problem.github} target="_blank" rel="noopener noreferrer" className="underline text-blue-300">
            View Repository
          </a>
        </div>
        <div>
          <span className="font-semibold block mb-1">Description:</span>
          <p className="text-sm text-gray-100">{problem.description}</p>
        </div>
      </div>
      <button className="mt-4 w-full bg-blueviolet hover:bg-indigo-600 transition text-white py-2 px-4 rounded-md">
        Register
      </button>
    </div>
  );
};

export default function BountyPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [problemId, setProblemId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('/api/bounty');
        if (!response.ok) throw new Error('Failed to fetch problems');
        const { issue } = await response.json();
        setProblems(issue);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filtered = problems.filter(problem =>
    problem.title.toLowerCase().includes(search.toLowerCase()) ||
    problem.statement.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (problemId !== null) {
      const problem = problems.find(p => p.id === problemId);
      if (problem) {
        setSelectedProblem(problem);
        setViewMode('detail');
      }
    }
  }, [problemId, problems]);

  const handleProblemClick = (problem: Problem) => {
    setSelectedProblem(problem);
    setProblemId(problem.id);
    setViewMode('detail');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1f1f] to-[#3a3a3a] text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">
            {viewMode === 'detail' ? 'Mission' : 'Bounties'}
          </h1>

          {viewMode === 'detail' ? (
            <button
              className="bg-blueviolet px-4 py-2 rounded-md text-white hover:bg-indigo-600"
              onClick={() => setViewMode('list')}
            >
              Back to Bounty List
            </button>
          ) : (
            <div className="relative">
              <input
                type="text"
                placeholder="Search problems..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-2.5 text-white">🔍</span>
            </div>
          )}
        </div>

        {viewMode === 'detail' && selectedProblem ? (
          <ProblemDetail problem={selectedProblem} />
        ) : isLoading ? (
          <div className="text-center mt-10">Loading missions...</div>
        ) : error ? (
          <div className="text-center mt-10">
            <p className="text-red-400 mb-2">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((problem) => (
                <div
                  key={problem.id}
                  className="cursor-pointer bg-[#2e2e2e] hover:bg-[#3c3c3c] p-5 rounded-xl border border-gray-700 transition"
                  onClick={() => handleProblemClick(problem)}
                >
                  <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                  <p className="text-sm text-gray-300 mb-3">{problem.statement}</p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                    <span className="bg-gray-700 px-2 py-1 rounded">React</span>
                    <span className="bg-gray-700 px-2 py-1 rounded">Web3</span>
                  </div>
                  <div className="flex justify-between mt-3 text-sm">
                    <span className="text-yellow-400">{problem.bounty_amt} 🪙</span>
                    <span className="text-pink-400">⏱ 2 Days</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
