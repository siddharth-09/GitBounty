"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { ToastContainer, toast, Slide } from 'react-toastify';

interface CreateIssueComponentProps {
  userName: string;
}

const CreateIssueComponent = (props: CreateIssueComponentProps) => {
  const [popup, setPopup] = useState(false);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueDescription, setNewIssueDescription] = useState("");
  const [newIssueStatement, setNewIssueStatement] = useState("");
  const [newIssueAmt, setNewIssueAmt] = useState("");
  const [newIssueStatus, setNewIssueStatus] = useState("open");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [customLabelsInput, setCustomLabelsInput] = useState("");
  const { data: session } = useSession();
  const [repos, setRepos] = useState<any[]>([]);

  const predefinedLabels = ["bug", "enhancement", "documentation", "question"];
  const repoList = repos;

  const toggleLabel = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      async function repoView() {
        try {
          const res = await fetch(`/api/view-repo?token=${session?.accessToken}`);
          const data = await res.json();
          const repoDetails = data.map((repo: any) => ({
            name: repo.name,
            owner: repo.owner.login,
          }));
          setRepos(repoDetails);
        } catch (error) {
          console.error("Error fetching repos:", error);
        }
      }
      repoView();
    }
  }, [session]);
  const handleCreateIssue = async () => {
  if (
    !newIssueTitle.trim() ||
    !newIssueDescription.trim() ||
    !newIssueStatement.trim() ||
    !newIssueAmt.trim() ||
    !newIssueStatus.trim() ||
    !selectedRepo.trim()
  ) {
    toast.warn('Please fill in all required fields before creating the issue.!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Slide,
});
    return;
  }

  const customLabels = customLabelsInput
    .split(",")
    .map((label) => label.trim())
    .filter((label) => label !== "");

  const allLabels = [...selectedLabels, ...customLabels];

  if (session?.accessToken) {
   

   try {
  const res = await fetch("/api/create-issue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: session.accessToken,
      repo: selectedRepo,
      title: newIssueTitle,
      body: newIssueDescription,
      labels: allLabels,
      userId: props.userName,
      statement: newIssueStatement,
      bounty_amt: newIssueAmt,
      deadline: "10/10/2005", // make dynamic later
      status: newIssueStatus,
    }),
  });

  if (!res.ok) {
    // Handles HTTP errors (e.g., 400, 500)
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create issue.");
  }

  toast.success("Issue created successfully!",{
    transition: Slide,
  });

  // Reset form fields
  setNewIssueTitle("");
  setNewIssueDescription("");
  setNewIssueAmt("");
  setNewIssueStatus("open");
  setSelectedRepo("");
  setSelectedLabels([]);
  setCustomLabelsInput("");
  setNewIssueStatement("");
  setPopup(false);

} catch (error: any) {
  toast.error(`Error creating issue: ${error.message || "Something went wrong."}`);
}

  }
};


  return (
    <>
      <Button 
        onClick={() => setPopup(true)} 
        className="fixed right-8 bottom-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl px-6 py-3 text-lg font-medium shadow-lg hover:from-cyan-600 hover:to-blue-600 hover:shadow-xl transition-all duration-300"
      >
        Create New Issue
      </Button>

      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 border-design">
          <div className=" bg-opacity-80 backdrop-blur-lg rounded-xl p-6 w-full max-w-2xl">
            <Dialog open={popup} onOpenChange={setPopup}>
              <DialogContent className="bg-transparent p-6 border-design ">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-2xl font-bold text-white">Create New Issue</DialogTitle>
                  <DialogDescription className="text-gray-300">
                    Fill out the issue details below
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label className="block text-gray-300 mb-1">Title</Label>
                    <Input
                      className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                      placeholder="Issue Title"
                      value={newIssueTitle}
                      onChange={(e) => setNewIssueTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="block text-gray-300 mb-1">Statement</Label>
                    <Input
                      className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                      placeholder="Problem statement"
                      value={newIssueStatement}
                      onChange={(e) => setNewIssueStatement(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="block text-gray-300 mb-1">Description</Label>
                    <Input
                      className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                      placeholder="Detailed description"
                      value={newIssueDescription}
                      onChange={(e) => setNewIssueDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="block text-gray-300 mb-1">Bounty Amount</Label>
                    <Input
                      className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                      placeholder="Bounty amount in SOL"
                      value={newIssueAmt}
                      onChange={(e) => setNewIssueAmt(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="block text-gray-300 mb-1">Select Repository</Label>
                    <select
                      value={selectedRepo}
                      onChange={(e) => setSelectedRepo(e.target.value)}
                      className="w-full bg-gray-800 border-gray-700 text-white rounded-md p-2 focus:border-cyan-500 focus:ring-cyan-500"
                    >
                      <option value="" className="bg-gray-800">Select Repository</option>
                      {repoList.map((repo, index) => (
                        <option key={index} value={repo.name} className="bg-gray-800">
                          {repo.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="block text-gray-300 mb-1">Labels</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {predefinedLabels.map((label) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => toggleLabel(label)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedLabels.includes(label) 
                              ? "bg-cyan-600 text-white" 
                              : "bg-gray-700 text-gray-300"
                          } hover:bg-cyan-700 transition-colors`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <Input
                      className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                      placeholder="Add custom labels (comma separated)"
                      value={customLabelsInput}
                      onChange={(e) => setCustomLabelsInput(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="block text-gray-300 mb-1">Status</Label>
                    <select
                      value={newIssueStatus}
                      onChange={(e) => setNewIssueStatus(e.target.value)}
                      className="w-full bg-gray-800 border-gray-700 text-white rounded-md p-2 focus:border-cyan-500 focus:ring-cyan-500"
                    >
                      <option value="open" className="bg-gray-800">OPEN</option>
                      <option value="closed" className="bg-gray-800">CLOSED</option>
                    </select>
                  </div>

                  <Button 
                    onClick={handleCreateIssue} 
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-colors mt-4"
                  >
                    CREATE ISSUE
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Slide}
/>
    </>
  );
};

export default CreateIssueComponent; 