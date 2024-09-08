import React, { useState } from "react";

export default function 
PostURL() {
  const [redirectURL, setRedirectURL] = useState(""); // Input from user
  const [shortURL, setShortURL] = useState(""); // Short URL result
  const [error, setError] = useState(null); // Error state for handling issues
  const [loading, setLoading] = useState(false); // Loading state during POST request

  const handleInputChange = (e) => {
    setRedirectURL(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    setLoading(true);
    setError(null); // Reset error before submission

    try {
      const res = await fetch("/api/createShortURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ redirectURL }), // Send the URL to the server
      });
      console.log(res)


      if (res.ok) {
        const result = await res.json();
        console.log("Result", result)
        // setShortURL(`localhost:3000/${result.id}`)
        console.log(result.id);
        setShortURL(result.id); // Assuming response has the short URL in `shortURL`
      } else {
        setError("Failed to create short URL");
      }
    } catch (err) {
      setError("An error occurred while creating the short URL");
    } finally {
      setLoading(false); // Stop loading when request is done
    }
  };

  return (
    
 
    <div  className="flex flex-col items-center justify-start h-[25vh]">
        <div > <h1 className="text-5xl font-bold mb-5" >Create Short URL</h1>
        </div>
     
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="url"
          placeholder="Enter the redirect URL"
          value={redirectURL}
          onChange={handleInputChange}
          required
          className="p-2 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Short URL"}
        </button>
      </form>
        
        {shortURL && (
        <div className="mt-5">
          <p className="text-lg">Your short URL is:</p>
          <a href={`${shortURL}`} className="text-blue-500 underline">
            {shortURL}
          </a>
        </div>
      )}
  </div>
     
      
   
    
  );
}
