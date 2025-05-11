"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import "../components/CreateIssueComponent.css"

interface CreateIssueComponentProps {
  userName: string;
}

const CreateIssueComponent = (props: CreateIssueComponentProps) => {
  const [popup, setPopup] = useState(false);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueDescription, setNewIssueDescription] = useState("");
  const [newIssueStatement, setNewIssueSnewIssueStatement] = useState("");
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
    const customLabels = customLabelsInput
      .split(",")
      .map((label) => label.trim())
      .filter((label) => label !== "");

    const allLabels = [...selectedLabels, ...customLabels];

    if (session?.accessToken) {
      const issueData = {
        title: newIssueTitle,
        description: newIssueDescription,
        bounty: newIssueAmt,
        status: newIssueStatus,
        repository: selectedRepo,
        labels: allLabels,
        statement: newIssueStatement,
      };

      console.log("Issue created:", issueData);

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
          deadline: '10/10/2005',
          status: newIssueStatus,
        }),
      });

      console.log(res);

      setNewIssueTitle("");
      setNewIssueDescription("");
      setNewIssueAmt("");
      setNewIssueStatus("open");
      setSelectedRepo("");
      setSelectedLabels([]);
      setCustomLabelsInput("");
      setNewIssueSnewIssueStatement("")
      setPopup(false);
    }
  };

  return (
  <>
  <Button onClick={() => setPopup(true)} className="create-button">
    Create New Issue
  </Button>

  {popup && (
    <div className="modal-overlay">
      <div className="modal-content">
        <Dialog open={popup} onOpenChange={setPopup}>
          <DialogContent className="dialog-box">
            <DialogHeader>
              <DialogTitle>Create New Issue</DialogTitle>
              <DialogDescription>Fill out the issue details below</DialogDescription>
            </DialogHeader>

            <Label className="label">Title</Label>
            <Input
            className="inputComponent"
              placeholder="Issue Title"
              value={newIssueTitle}
              onChange={(e) => setNewIssueTitle(e.target.value)}
            />

            
            <Label className=" label statement" >Statement</Label>
            <Input
            className="inputComponent"
              placeholder="Statement"
              value={newIssueStatement}
              onChange={(e) => setNewIssueSnewIssueStatement(e.target.value)}
              
            />

            <Label className="label">Description</Label>
            <Input className="inputComponent"
              placeholder="optional description"
              value={newIssueDescription}
              onChange={(e) => setNewIssueDescription(e.target.value)}
            />



            <Label className="label">Bounty Amount</Label>
            <Input
            className="inputComponent"
              placeholder="optional bounty (SOL)"
              value={newIssueAmt}
              onChange={(e) => setNewIssueAmt(e.target.value)}
            />

            <Label className="label">Select Repository</Label>
            <select
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e.target.value)}
              className="select-box"
            >
              <option value="">Select Repository</option>
              {repoList.map((repo, index) => (
                <option key={index} value={repo.name}>
                  {repo.name}
                </option>
              ))}
            </select>

            <Label className="label">Labels</Label>
            <div className="label-container">
              {predefinedLabels.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleLabel(label)}
                  className={`label-chip ${selectedLabels.includes(label) ? "active" : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <Label className="label">Custom Labels (Comma-separated)</Label>
            <Input
            className="inputComponent"
              placeholder="Bug, Enhancement"
              value={customLabelsInput}
              onChange={(e) => setCustomLabelsInput(e.target.value)}
            />

            <Label className="label">Status</Label>
            <select
              value={newIssueStatus}
              onChange={(e) => setNewIssueStatus(e.target.value)}
              className="select-box"
            >
              <option value="open">OPEN</option>
              <option value="closed">CLOSED</option>
            </select>

            <Button onClick={handleCreateIssue} className="submit-button">
              CREATE ISSUE
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )}
</>


  );
};

export default CreateIssueComponent;
