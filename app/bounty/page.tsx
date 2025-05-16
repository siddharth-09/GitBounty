'use client';

import Link from 'next/link';
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
  repo:string;
}

export default function BountyPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
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
        setError(err instanceof Error ? err.message : 'Unknown error');
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
  // console.log(pithub)roblems.g

  return (
    <div className="min-h-screen px-6 py-10 text-white font-sans mt-[10%]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-4xl font-bold tracking-wide">Explore Bounties</h1>
          <input
            type="text"
            placeholder="Search for a bounty..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 bg-[#1e1e1e] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6BE8A]"
          />
        </div>

        {isLoading ? (
          <div className="text-center text-gray-400 mt-20">Fetching bounties...</div>
        ) : error ? (
          <div className="text-center text-red-400 mt-20">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(problem => (
              <div
                key={problem.id}
                className="relative border-design rounded-xl p-5 shadow-lg hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                onClick={() => setSelectedProblem(problem)}
              >
                <h3 className="text-xl font-semibold mb-2 text-white">{problem.title}</h3>
                <p className="text-sm text-gray-300 mb-3">{problem.statement}</p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span><img src="/usdc.svg" alt="USDC" className="w-5 h- inline" /> {problem.bounty_amt} </span>
                  <span>{problem.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedProblem && (
          <div className="fixed inset-0 z-50 bg-[linear-gradient(#272727,_#030a02)]  bg-opacity-20 flex items-center justify-center px-4">
            <div className="relative border-design rounded-2xl w-full max-w-lg p-6 text-white shadow-2xl">
              <button
                onClick={() => setSelectedProblem(null)}
                className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-3">{selectedProblem.title}</h2>
              <p className="text-gray-300 mb-2">{selectedProblem.statement}</p>
              <p className="text-gray-400 text-sm mb-4">{selectedProblem.description}</p>
              <div className="text-sm text-gray-400 space-y-2">
                <div><strong>Deadline:</strong> {selectedProblem.deadline}</div>
                <div><strong>GitHub:</strong>{' '}
  


                  <a
  href={`https://github.com/${selectedProblem.userId}/${selectedProblem.repo}/issues`}
  target="_blank"
  className="cursor-pointer text-[#8ae69f] underline hover:opacity-80"
>
  View Repository
</a>

                </div>
              </div>
              <Link href={`github/`}>
              <button className="mt-6 w-full border-design font-semibold py-2 rounded-md hover:opacity-90 transition">
                Register
              </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
