'use client';
/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './page.css';

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
//yoo



const ProblemDetail = ({ problem }: { problem: Problem }) => {
  return (
    <div className="problem-detail-card">
  <div className="problem-info">
    <div className="info-row">
      <span className="icon">📋</span>
      <span className="label">Title :</span>
      <span className="value">{problem.title}</span>
    </div>
    <div className="info-row">
      <span className="icon">📋</span>
      <span className="label">Statement :</span>
      <span className="value">{problem.statement}</span>
    </div>
    <div className="info-row">
      <span className="icon">⏰</span>
      <span className="label">Deadline :</span>
      <span className="value">{problem.deadline}</span>
    </div>
    <div className="info-row">
      <span className="icon">🐙</span>
      <span className="label">GitHub :</span>
      <a href={problem.github} target="_blank" rel="noopener noreferrer" className="github-link">
        View Repository
      </a>
    </div>
    <div className="info-row description-row">
      <span className="label">Description</span>
      <p className="description-text">{problem.description}</p>
    </div>
  </div>

  <button className="register-button">Register</button>
</div>

  );
};

export default function BountyPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [search, setSearch] = useState("");
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

  const handleClose = () => {
    setSelectedProblem(null);
    setViewMode('list');
    setProblemId(null);
  };

return (
  <div className="page-container">
    <div className="container">
      <div className="TitleAndSearch">
  <h1 className="heading">
    {viewMode === 'detail' ? 'Mission' : 'Bounties'}
  </h1>

  {viewMode === 'detail' && (
    <button className="back-button" onClick={() => setViewMode('list')}>
      Back to Bounty List
    </button>
  )}

  {viewMode !== 'detail' && (
    <div className="InputContainer">
      <input
        type="text"
        placeholder="Search problems..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
        id="input"
      />
      <label className="labelforsearch" htmlFor="input">
        <svg className="searchIcon" viewBox="0 0 512 512">
          <path d="..."></path>
        </svg>
      </label>
    </div>
  )}
</div>

      {viewMode === 'detail' && selectedProblem ? (
  <>
    
    <ProblemDetail problem={selectedProblem} />
  </>
)  : isLoading ? (
        <div className="loader">Loading missions...</div>
      ) : error ? (
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()} className="try-again-btn">
            Try Again
          </button>
        </div>
      ) : (
        <div className="table-wrapper">
          <div className="table-header">
            <div>Issues Created</div>
            <div>Tags</div>
            <div>Bounty</div>
            <div>Due</div>
          </div>

          {filtered.map((problem) => (
            <div
              key={problem.id}
              className="table-row"
              onClick={() => handleProblemClick(problem)}
            >
              <div className="issue">
                <h3 className="card-title">{problem.title}</h3>
                <p className="card-statement">{problem.statement}</p>
              </div>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">Web3</span>
              </div>
              <div className="bounty">{problem.bounty_amt} 🪙</div>
              <div className="due">⏱ 2 Days</div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}
