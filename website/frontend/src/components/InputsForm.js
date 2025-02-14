import React from "react";

function InputsForm({ allocation, setAllocation, investors, setInvestors, onSubmit }) {
  const addInvestor = () => {
    setInvestors([...investors, { name: "", requested: "", average: "" }]);
  };

  const removeInvestor = (index) => {
    setInvestors(investors.filter((_, i) => i !== index));
  };

  const updateInvestor = (index, key, value) => {
    const updatedInvestors = [...investors];
    updatedInvestors[index][key] = value;
    setInvestors(updatedInvestors);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Inputs</h2>
      
      {/* Allocation Input */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">Total Available Allocation</label>
        <div className="flex items-center bg-white border rounded-lg px-3 py-2">
          <span className="text-gray-500">$</span>
          <input
            type="number"
            className="w-full p-2 outline-none"
            value={allocation}
            onChange={(e) => setAllocation(e.target.value)}
            placeholder="Allocation"
          />
        </div>
      </div>

      {/* Investor Breakdown */}
      <h2 className="text-lg font-semibold mb-2">Investor Breakdown</h2>
      {investors.map((investor, index) => (
        <div key={index} className="flex space-x-3 mt-2 items-center">
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 w-1/4">
            <span className="text-gray-500">💼</span>
            <input
              type="text"
              className="w-full p-2 outline-none"
              placeholder="Name"
              value={investor.name}
              onChange={(e) => updateInvestor(index, "name", e.target.value)}
            />
          </div>
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 w-1/4">
            <span className="text-gray-500">$</span>
            <input
              type="number"
              className="w-full p-2 outline-none"
              placeholder="Requested Amount"
              value={investor.requested}
              onChange={(e) => updateInvestor(index, "requested", e.target.value)}
            />
          </div>
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 w-1/4">
            <span className="text-gray-500">$</span>
            <input
              type="number"
              className="w-full p-2 outline-none"
              placeholder="Average Amount"
              value={investor.average}
              onChange={(e) => updateInvestor(index, "average", e.target.value)}
            />
          </div>
          <button
            onClick={() => removeInvestor(index)}
            className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm"
          >
            🗑
          </button>
        </div>
      ))}

      {/* Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={addInvestor}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-blue-700"
        >
          + Add Investor
        </button>

        <button
          onClick={onSubmit}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-purple-700"
        >
          Prorate
        </button>
      </div>
    </div>
  );
}

export default InputsForm
