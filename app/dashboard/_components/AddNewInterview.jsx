"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader } from 'lucide-react';
import { chatSession } from '@/utils/GeminiAIModal';
import { v4 as uuidv4 } from 'uuid';
import { json } from 'drizzle-orm/gel-core';
import moment from 'moment';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db'; // Ensure this is correctly configured

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobpDesc, setjobpDesc] = useState('');
  const [jobpExperience, setjobpExperience] = useState('');
  const [jobpPosition, setjobpPosition] = useState('');
  const [loading, setLoading] = useState(false);
  const [JsonResponse, setJsonResponse] = useState();
  const { user } = useUser();

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    // Construct a clear and specific prompt
    const Inpuprompt = `
      Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers based on the following details:
      - Job Position: ${jobpPosition}
      - Job Description: ${jobpDesc}
      - Years of Experience: ${jobpExperience}
      Provide the response in a JSON format with an array of 10 objects, where each object contains "question" and "answer" fields.
    `;

    try {
      const result = await chatSession.sendMessage(Inpuprompt);
      const responseText = await result.response.text();

      console.log("Raw Response:", responseText); // Log the raw response

      // Parse the response
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(
          responseText.replace('```json', '').replace('```', '')
        );
        console.log("Parsed Response (JSON):", parsedResponse);
      } catch (jsonError) {
        console.warn("Response is not valid JSON. Raw response:", responseText);
        parsedResponse = responseText; // Fallback to plain text
      }

      // Extract and log questions with their respective answers
      if (Array.isArray(parsedResponse)) {
        console.log("Interview Questions and Answers:");
        parsedResponse.forEach((item, index) => {
          console.log(`${index + 1}. Question: ${item.question}`);
          console.log(`   Answer: ${item.answer}`);
        });
      } else {
        console.warn("Response is not in the expected format:", parsedResponse);
      }

      // Assign parsedResponse to MockJsonResp
      const MockJsonResp = parsedResponse;

      // Save the response to the state
      setJsonResponse(MockJsonResp);

      // Insert into the database if MockJsonResp is valid
      if (MockJsonResp) {
       // Check how you're inserting the JSON data
// Inside your onSubmit function
const resp = await db.insert(MockInterview).values({
    mockId: uuidv4(),
    jsonMockResp: typeof MockJsonResp === 'string' 
      ? MockJsonResp 
      : JSON.stringify(MockJsonResp),
    jobpPosition: jobpPosition || '',
    jobpDesc: jobpDesc || '',
    jobpExperience: parseInt(jobpExperience, 10) || 0,
    createdBy: user?.primaryEmailAddress?.emailAddress || 'anonymous',
    createdAt: moment().format('YYYY-MM-DD'),
  }).returning({ mockId: MockInterview.mockId });
        console.log("Inserted ID:", resp); // Log the inserted response
      } else {
        console.log("ERROR: No response from AI model.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-6 border rounded-lg bg-secondary hover:scale-105 transition-all duration-300 focus-within:scale-105"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-md text-center">+Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-4xl p-6">
          <DialogHeader>
            <DialogTitle>Start a New Interview</DialogTitle>
            <DialogDescription>
              Add details about your job position/role, job description, and years of experience.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-6">
              {/* Job Role */}
              <div className="mt-6">
                <label className="block mb-2">Job Role</label>
                <input
                  placeholder="E.G. Software Engineer"
                  required
                  className="border rounded-md p-2 w-full my-2"
                  onChange={(event) => setjobpPosition(event.target.value)}
                />
              </div>

              {/* Job Description */}
              <div className="mt-6">
                <label className="block mb-2">Job Description</label>
                <textarea
                  placeholder="e.g. Responsible for developing and maintaining web applications"
                  className="border rounded-md p-2 w-full my-2"
                  rows="3"
                  onChange={(event) => setjobpDesc(event.target.value)}
                  required
                />
              </div>

              {/* Years of Experience */}
              <div className="mt-6">
                <label className="block mb-2">Years of Experience</label>
                <input
                  type="number"
                  placeholder="e.g. 3"
                  className="border rounded-md p-2 w-full my-2"
                  onChange={(event) => setjobpExperience(event.target.value)}
                  required
                  max="50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-6 mt-6">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" />
                    Generating from AI...
                  </>
                ) : (
                  "Start Interview"
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;