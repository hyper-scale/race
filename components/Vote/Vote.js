import { useState } from "react";
export default function Vote({ applicationId, voteCount, onVote }) {
  return (
    <div className="flex flex-row shadow-md rounded-lg">
      <div className="flex border border-gray-300 bg-gray-100 rounded-l-lg py-2 px-4">
        <label className="font-semibold font-bold text-indigo-500">{voteCount}</label>
      </div>
      <button
        className="rounded-r-lg text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 p-2"
        onClick={() => onVote(applicationId)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21V3M12 3L5 10M12 3L19 10" stroke="currentColor" strokeWidth="2"></path>
        </svg>
      </button>
    </div>
  );
}
