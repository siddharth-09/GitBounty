'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Problem data type
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

// Cursor blob component
const CursorBlob = () => {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      if (blobRef.current) {
        blobRef.current.animate(
          {
            left: `${clientX}px`,
            top: `${clientY}px`,
          },
          {
            duration: 3000,
            fill: 'forwards',
          }
        );
      }
    };

    document.body.addEventListener('pointermove', handlePointerMove);
    return () => {
      document.body.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return <div id="blob" ref={blobRef} className="bg-white h-[500px] aspect-square fixed z-[2] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none bg-gradient-to-r from-teal-500 to-purple-500 animate-blob filter blur-[200px]"></div>;
};

// ProblemCard component for modal view
const ProblemCard = ({ problem, onClose }: { problem: Problem | null, onClose: () => void }) => {
  if (!problem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10" onClick={onClose}>
      <div className="bg-[rgba(40,40,40,0.9)] border border-[#00ffff33] rounded-lg p-6 max-w-2xl w-full shadow-[0_0_10px_#00ffff55] relative" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-3 right-4 bg-[#00ffff] text-black font-bold py-1 px-3 rounded text-sm shadow-[0_0_5px_#00ffff99]">{problem.bounty_amt}</div>
        <button className="absolute top-3 right-3 text-white text-2xl" onClick={onClose}>×</button>
        <h2 className="text-[#00ffff] text-xl mb-4">{problem.title}</h2>
        <p className="mb-2"><strong>Statement:</strong> {problem.statement}</p>
        <p className="mb-2"><strong>Description:</strong></p>
        <div className="bg-[rgba(30,30,30,0.8)] p-4 rounded mb-4 text-gray-300 whitespace-pre-wrap">{problem.description}</div>
        <p className="mb-2"><strong>Deadline:</strong> {problem.deadline}</p>
        <p className="mb-4">
          <strong>GitHub:</strong>{" "}
          <a href={problem.github} target="_blank" rel="noopener noreferrer" className="text-[#00ffff] hover:underline">
            View Repository
          </a>
        </p>
        <button className="bg-[#00ffff] text-black font-bold py-2 px-4 rounded hover:bg-[#00cccc] transition-colors">Subscribe</button>
      </div>
    </div>
  );
};

// Problem detail component
const ProblemDetail = ({ problem }: { problem: Problem }) => {
  return (
    <div className="bg-[rgba(20,20,20,0.8)] border border-[#444] rounded-lg p-6 max-w-2xl w-full mx-auto shadow-[0_0_10px_#00ffff33] relative z-[3]">
      <div className="absolute top-4 right-4 bg-[#00ffff] text-black font-bold py-1 px-3 rounded text-sm shadow-[0_0_5px_#00ffff99]">{problem.bounty_amt}</div>

      <Link href="/" className="inline-block mb-4 text-[#00ffff] hover:text-[#00cccc]">← Back to Board</Link>
      <h1 className="text-[#00ffff] text-2xl mb-4">{problem.title}</h1>

      <div className="mb-4">
        <span><strong>Deadline:</strong> {problem.deadline}</span>
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-[#00ffff] mb-2">Problem Statement</h2>
        <p>{problem.statement}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-[#00ffff] mb-2">Description & Guidelines</h2>
        <pre className="bg-[rgba(30,30,30,0.8)] p-4 rounded text-gray-300 whitespace-pre-wrap overflow-auto">{problem.description}</pre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-[#00ffff] mb-2">GitHub Repository</h2>
        <a href={problem.github} target="_blank" rel="noopener noreferrer" className="text-[#00ffff] hover:underline">
          {problem.github}
        </a>
      </div>

      <button className="bg-[#00ffff] text-black font-bold py-2 px-4 rounded hover:bg-[#00cccc] transition-colors">Subscribe</button>
    </div>
  );
};

// Main page component
export default function BountyPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [problemId, setProblemId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch problems from API
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

  // Filter problems based on search
  const filtered = problems.filter(problem =>
    problem.title.toLowerCase().includes(search.toLowerCase()) ||
    problem.statement.toLowerCase().includes(search.toLowerCase())
  );

  // Find problem by ID when in detail view
  useEffect(() => {
    if (problemId !== null) {
      const problem = problems.find(p => p.id === problemId);
      if (problem) {
        setSelectedProblem(problem);
        setViewMode('detail');
      }
    }
  }, [problemId, problems]);

  // Handle problem selection
  const handleProblemClick = (problem: Problem) => {
    setSelectedProblem(problem);
    setProblemId(problem.id);
    setViewMode('detail');
  };

  // Handle close modal/detail view
  const handleClose = () => {
    setSelectedProblem(null);
    setViewMode('list');
    setProblemId(null);
  };

  return (
    <div className="min-h-screen bg-black text-[#e0e0e0] font-['Orbitron',sans-serif] overflow-hidden relative py-20">
      <CursorBlob />
      
      {/* Hidden Gun Image */}
      <div className="fixed z-2 w-1/2 h-[110%] pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3">
  <Image 
    src="/gun.png" 
    alt="Gun" 
    fill
    sizes="50vw"
    priority
    style={{ objectFit: "contain" }}
  />
</div>
      {/* Content */}
      {viewMode === 'list' ? (
        <div className="container p-8 max-w-3xl mx-auto bg-[rgba(20,20,20,0.6)] border border-[#444] rounded-lg shadow-[0_0_10px_#00ffff33] relative z-[3] my-8">
          <h1 
            className="text-[#00ffff] mb-4 text-center text-2xl uppercase font-bold tracking-wider relative glitch"
            data-text="Complete The Mission :"
          >
            Complete The Mission :
          </h1>

          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 w-full mb-6 bg-[#111] text-[#00ffff] border border-[#00ffff33] rounded text-base focus:outline-none focus:border-[#00ffff] relative z-[3]"
          />

          {isLoading ? (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#00ffff] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
              <p className="mt-2 text-[#00ffff]">Loading missions...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">
              <p>Error: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-[#00ffff] text-black font-bold py-2 px-4 rounded hover:bg-[#00cccc] transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10">
              <p>No missions found matching your search criteria.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 relative z-[3]">
              {filtered.map((problem) => (
                <div 
                  key={problem.id} 
                  onClick={() => handleProblemClick(problem)}
                  className="relative bg-[rgba(40,40,40,0.9)] border border-[#00ffff33] p-4 rounded-md cursor-pointer transition-all hover:bg-[rgba(60,60,60,0.9)] hover:shadow-[0_0_10px_#00ffff55]"
                >
                  <div className="absolute top-3 right-4 bg-[#00ffff] text-black font-bold py-1 px-3 rounded text-sm shadow-[0_0_5px_#00ffff99]">{problem.bounty_amt}</div>
                  <h3 className="m-0 mb-1 text-[#00ffff] text-lg">{problem.title}</h3>
                  <p className="m-0 text-[#aaa] text-sm">{problem.statement}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        selectedProblem && <ProblemDetail problem={selectedProblem} />
      )}

      {/* Modal */}
      {selectedProblem && viewMode === "modal" && (
        <ProblemCard problem={selectedProblem} onClose={handleClose} />
      )}
    </div>
  );
}