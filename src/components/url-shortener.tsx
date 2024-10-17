"use client"; // Enables client-side rendering for this component

import React, { useState } from "react"; // Import React and useState hook
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Button } from "@/components/ui/button"; // Import custom Button component
import { CopyIcon } from "lucide-react"; // Import CopyIcon from lucide-react
import axios from "axios"; // Import axios for HTTP requests

const TINYURL_API_URL = "https://api.tinyurl.com/create";

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState<string>(""); // State to manage the long URL input
  const [shortUrl, setShortUrl] = useState<string>(""); // State to manage the shortened URL
  const [error, setError] = useState<string>(""); // State to manage error messages

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state
    setShortUrl(""); // Reset shortened URL state

    try {
      const response = await axios.post(
        TINYURL_API_URL,
        {
          url: longUrl,
          domain: "tiny.one" // Customize this as desired; tiny.one is the default
        },
        {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TINYURL_ACCESS_TOKEN}`, // Add your TinyURL token here
            "Content-Type": "application/json",
          },
        }
      );

      setShortUrl(response.data.data.tiny_url); // Update shortened URL based on TinyURL response
    } catch (err) {
      setError("Failed to shorten the URL. Please try again."); // Set error state if the request fails
    }
  };

  // Function to handle copying the shortened URL to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Successfully Copied the Short URL!"); // Alert user that the URL has been copied
  };

  // JSX return statement rendering the URL Shortener UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-400 to-orange-500">
      <div className="max-w-md w-full space-y-4 p-6 rounded-lg bg-background shadow-lg">
        <div className="space-y-2 text-center">
          <u><h1 className="text-3xl font-bold text-pink-800 ">URL Shortener</h1></u>
          <p className="text-muted-foreground font-bold text-blue-800">
            Paste your long URL and get a short, shareable link.
          </p>
        </div>
        {/* Form to input and submit the long URL */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <Input
              type="url"
              placeholder="Paste your long URL here"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="pr-16"
              required
            />
            <Button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 font-bold bg-pink-800 "
            >
              Shorten
            </Button>
          </div>
          {/* Display error message if any */}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {/* Display the shortened URL and copy button */}
          {shortUrl && (
            <div className="flex items-center space-x-2 text-blue-700">
              <div className="flex-1">
                <Input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="cursor-pointer"
                />
              </div>
              <br></br><Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted/50"
                onClick={handleCopy}
              >
                <CopyIcon className="w-5 h-5 font-bold text-blue-700" />
                <span className="sr-only ">Copy</span>
              </Button>
            </div>
          )}
        </form>
      </div>
      <br></br>  <div className="text-center text-blue-900 font-bold">
  <h1 className="text-1xl font-bold bg-blue-50">Developed By : Hareem Jaweid</h1>
  
</div>
    </div>
  );
}
