'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Problem {
  id: number;
  userId: string;
  title: string;
  description: string;
  statement: string;
  bounty_amt: string;
  deadline: string;
  github: string;
}

export default function Bounty() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('/api/bounty');
        if (!response.ok) throw new Error('Failed to fetch problems');
        const { issue } = await response.json();
        setProblems(issue);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        console.error('Error fetching problems:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(search.toLowerCase()) ||
    problem.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleProblemClick = (problem: Problem) => setSelectedProblem(problem);
  const handleCloseModal = () => setSelectedProblem(null);

  if (isLoading) {
    return <div className="text-center text-muted-foreground py-10 text-lg">Loading problems...</div>;
  }

  if (error) {
    return <div className="text-center text-destructive py-10 text-lg">Error: {error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-primary">Bounty Hunting Board</h1>

      <input
        type="text"
        placeholder="Search problems..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-input rounded-md bg-card text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none transition"
      />

      <div className="grid gap-4">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => (
            <button
              key={problem.id}
              onClick={() => handleProblemClick(problem)}
              className="relative text-left p-4 rounded-lg bg-card border border-border hover:shadow-md transition group"
            >
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full shadow">
                USDC {problem.bounty_amt}
              </div>
              <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition">{problem.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{problem.statement.substring(0, 100)}...</p>
            </button>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-8">
            {search ? 'No matching problems found' : 'No problems available'}
          </div>
        )}
      </div>

      {selectedProblem && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-card text-foreground border border-border shadow-xl p-6 space-y-4"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-4 text-muted-foreground hover:text-foreground transition text-xl"
            >
              &times;
            </button>

            <div className="absolute top-3 right-16 bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full shadow">
              USDC {selectedProblem.bounty_amt}
            </div>

            <h2 className="text-2xl font-semibold">{selectedProblem.title}</h2>

            <div className="space-y-3">
              <p><span className="font-semibold">Statement:</span> {selectedProblem.statement}</p>
              <div>
                <p className="font-semibold mb-1">Description:</p>
                <pre className="bg-muted text-foreground p-3 rounded-md whitespace-pre-wrap text-sm">{selectedProblem.description}</pre>
              </div>
              <p><span className="font-semibold">Deadline:</span> {selectedProblem.deadline}</p>
              <p>
                <span className="font-semibold">GitHub:</span>{' '}
                <a
                  href={selectedProblem.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Repository
                </a>
              </p>
            </div>

            <button
              onClick={() => router.push(`/bounty/${selectedProblem.id}`)}
              className="w-full bg-primary text-primary-foreground rounded-md py-2 mt-4 hover:bg-primary/90 transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
