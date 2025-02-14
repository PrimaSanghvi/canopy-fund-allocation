import React from "react";

function Results({ results }) {
  return (
    <div className="p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Results</h2>
      {results ? (
        <ul className="space-y-2">
          {Object.entries(results).map(([investor, amount]) => (
            <li key={investor} className="text-lg flex justify-between border-b py-2">
              <span className="font-medium">{investor}</span>
              <span className="font-bold text-green-600">${amount}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No results yet. Click "Prorate" to see allocation.</p>
      )}
    </div>
  );
}

export default Results;
