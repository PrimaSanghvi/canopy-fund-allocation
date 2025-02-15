import React, { useState } from "react";
import InputsForm from "./components/InputsForm";
import Results from "./components/Results";

function App() {
  const [allocation, setAllocation] = useState("");
  const [investors, setInvestors] = useState([]);
  const [results, setResults] = useState(null);

  const handleSubmit = async () => {
    console.log("Submitting Prorate request...");
  
    if (!allocation || investors.length === 0) {
      alert("Please enter allocation and add at least one investor.");
      return;
    }
  
    const payload = {
      allocation_amount: parseFloat(allocation),
      investor_amounts: investors.map((inv) => ({
        name: inv.name,
        requested_amount: parseFloat(inv.requested),
        average_amount: parseFloat(inv.average),
      })),
    };
  
    console.log("Payload:", payload);
  
    try {
      const response = await fetch("https://canopy-fund-allocation.onrender.com/api/allocate/", { // Updated to use 127.0.0.1
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data);
      setResults(data);
    } catch (error) {
      console.error("Error fetching allocation:", error);
      alert("Failed to fetch allocation results. Check console for details.");
    }
  };
  

  return (
    <div className="min-h-screen p-10 bg-gray-100 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Allocate Funds</h1>
        <div className="grid grid-cols-2 gap-6">
          <InputsForm
            allocation={allocation}
            setAllocation={setAllocation}
            investors={investors}
            setInvestors={setInvestors}
            onSubmit={handleSubmit}
          />
          <Results results={results} />
        </div>
      </div>
    </div>
  );
}

export default App;