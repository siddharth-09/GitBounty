import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
interface CreateIssueComponentProps {
  userName: string;
}
const CreateIssueComponent = (props: CreateIssueComponentProps) => {
  const [popup, setPopup] = useState(false);
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueDescription, setNewIssueDescription] = useState("");
  const [newIssueAmt, setNewIssueAmt] = useState("");
  const [newIssueStatus, setNewIssueStatus] = useState("open");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [customLabelsInput, setCustomLabelsInput] = useState("");
  const {data:session} = useSession()
  const [repos, setRepos] = useState<any[]>([]) 

  const predefinedLabels = ["bug", "enhancement", "documentation", "question"];
  const repoList = repos

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
          const res = await fetch(`/api/view-repo?token=${session?.accessToken}`)
          const data = await res.json()

          // Map to extract name and owner login from the response
          const repoDetails = data.map((repo: any) => ({
            name: repo.name,
            owner: repo.owner.login
          }))
          
          setRepos(repoDetails)  // Store extracted data in state
        } catch (error) {
          console.error("Error fetching repos:", error)
        }
      }
      
      repoView()  // Call repoView when the component mounts
    }
  }, [session])
  

  const handleCreateIssue = async() => {
    const customLabels = customLabelsInput
      .split(",")
      .map((label) => label.trim())
      .filter((label) => label !== "");

    const allLabels = [...selectedLabels, ...customLabels];
    if(session?.accessToken){

      const issueData = {
        title: newIssueTitle,
        description: newIssueDescription,
        bounty: newIssueAmt,
        status: newIssueStatus,
        repository: selectedRepo,
        labels: allLabels,
      };
      console.log(issueData.repository)
  
      console.log("Issue created:", issueData);
      // Here you would make API call to save issue data
      const res = await fetch("/api/create-issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: session.accessToken,
          repo: selectedRepo,
          title: newIssueTitle,
          body: newIssueDescription,
          labels: allLabels,
          userId:props.userName,
        statement : newIssueDescription,
        bounty_amt: newIssueAmt,
        deadline : '10/10/2005',
        status: newIssueStatus,
        }),
      })
      console.log(res)
      // Reset form
      setNewIssueTitle("");
      setNewIssueDescription("");
      setNewIssueAmt("");
      setNewIssueStatus("open");
      setSelectedRepo("");
      setSelectedLabels([]);
      setCustomLabelsInput("");
      setPopup(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
    <Button
      onClick={() => setPopup(true)}
      className="bg-[#4b2e17] text-white hover:bg-[#5a3c1c] rounded-md px-4 py-2"
    >
      Create New Issue
    </Button>
  
    <Dialog open={popup} onOpenChange={setPopup}>
      <DialogContent className="bg-gray-50 rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#4b2e17]">
            Create New Issue
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Fill in the issue details below.
          </DialogDescription>
        </DialogHeader>
  
        <div className="space-y-4 mt-4">
          <div>
            <Label className="block font-medium text-gray-700">Title</Label>
            <Input
              value={newIssueTitle}
              onChange={(e) => setNewIssueTitle(e.target.value)}
              placeholder="Issue title"
              className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4b2e17]"
            />
          </div>
  
          <div>
            <Label className="block font-medium text-gray-700 mt-2">Description</Label>
            <Input
              value={newIssueDescription}
              onChange={(e) => setNewIssueDescription(e.target.value)}
              placeholder="Optional description"
              className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4b2e17]"
            />
          </div>
  
          <div>
            <Label className="block font-medium text-gray-700 mt-2">Bounty Amount</Label>
            <Input
              value={newIssueAmt}
              onChange={(e) => setNewIssueAmt(e.target.value)}
              placeholder="Optional bounty (ETH)"
              className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4b2e17]"
            />
          </div>
  
          <div>
            <Label className="block font-medium text-gray-700 mt-2">Select Repository</Label>
            <select
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4b2e17]"
            >
              <option value="">Select a repository</option>
              {repoList.map((repo) => (
                <option key={repo} value={repo.name}>
                  {repo.name}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <Label className="block font-medium text-gray-700 mt-2">Labels</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {predefinedLabels.map((label) => (
                <Button
                  key={label}
                  variant={selectedLabels.includes(label) ? "default" : "outline"}
                  onClick={() => toggleLabel(label)}
                  className="text-[#4b2e17] hover:bg-[#5a3c1c] border-[#4b2e17] rounded-lg"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
  
          <div>
            <Label className="block font-medium text-gray-700 mt-2">Custom Labels (comma-separated)</Label>
            <Input
              value={customLabelsInput}
              onChange={(e) => setCustomLabelsInput(e.target.value)}
              placeholder="bug, enhancement"
              className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4b2e17]"
            />
          </div>
  
          <div>
            <Label className="block font-medium text-gray-700 mt-2">Status</Label>
            <select
              value={newIssueStatus}
              onChange={(e) => setNewIssueStatus(e.target.value as "open" | "closed")}
              className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4b2e17]"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
  
          <Button
            className="mt-4 w-full bg-[#4b2e17] text-white hover:bg-[#5a3c1c] rounded-md py-2"
            onClick={handleCreateIssue}
            disabled={!newIssueTitle.trim() || !selectedRepo}
          >
            Create Issue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
  
  );
};

export default CreateIssueComponent;