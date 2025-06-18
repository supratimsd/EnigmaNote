"use client";

import { useCompletion } from "@ai-sdk/react";

import { useEffect } from "react";

export default function Home() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
    api: "/api/suggestMessages", // your backend API route
  });

  useEffect(() => {
    if (completion) {
      console.log("AI Response:", completion);
    }
  }, [completion]);

  return (
    <main className="p-4">
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 rounded w-full"
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask for questions..."
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Thinking..." : "Submit"}
        </button>
      </form>

      <div className="mt-4 whitespace-pre-wrap">
        {completion && <p>{completion}</p>}
      </div>
    </main>
  );
}

