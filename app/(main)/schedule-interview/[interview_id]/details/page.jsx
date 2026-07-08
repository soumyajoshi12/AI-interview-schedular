"use client";

import { supabase } from "@/app/services/supabaseClient";
import { useUser } from "@/context/UserDetailContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Briefcase,
  Calendar,
  Clock,
  User,
  Mail,
  Star,
  FileText,
  CheckCircle,
} from "lucide-react";

const InterviewDetails = () => {
  const { user } = useUser();
  const { interview_id } = useParams();

  const [interview, setInterview] = useState(null);

  const GetInterviewList = async () => {
    const { data, error } = await supabase
      .from("Interviews")
      .select(
        `
        jobPosition,
        jobDescription,
        type,
        questionList,
        duration,
        interview_id,
        created_at,
        interview-feedback(
          userEmail,
          userName,
          feedback
        )
      `
      )
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id);

    if (data?.length) {
      setInterview(data[0]);
    }
  };

  useEffect(() => {
    if (user) GetInterviewList();
  }, [user]);

  if (!interview) {
    return (
      <div className="flex justify-center items-center h-60">
        Loading...
      </div>
    );
  }

  const candidate = interview["interview-feedback"];
  const feedback = candidate?.feedback;

  const ratings = feedback?.feedback?.rating || {};

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border p-8">

        {/* Header */}

        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {interview.jobPosition}
          </h1>

          <div className="flex flex-wrap gap-6 mt-4 text-gray-600">

            <div className="flex items-center gap-2">
              <Clock size={18} />
              {interview.duration}
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {moment(interview.created_at).format("DD MMM YYYY")}
            </div>

            <div className="flex items-center gap-2">
              <Briefcase size={18} />
              {JSON.parse(interview.type || "[]").join(", ")}
            </div>

            <div className="flex items-center gap-2">
              <FileText size={18} />
              {interview.questionList?.length || 0} Questions
            </div>

          </div>
        </div>

        {/* Job Description */}

        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-2">
            Job Description
          </h2>

          <p className="text-gray-600 leading-7">
            {interview.jobDescription}
          </p>
        </div>

        {/* Candidate */}

        <div className="mb-8 border rounded-xl p-5 bg-gray-50">

          <h2 className="font-semibold text-lg mb-4">
            Candidate Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="flex items-center gap-2">
              <User size={18} />
              {candidate?.userName}
            </div>

            <div className="flex items-center gap-2">
              <Mail size={18} />
              {candidate?.userEmail}
            </div>

          </div>

        </div>

        {/* Recommendation */}

        <div className="mb-8">

          <h2 className="font-semibold text-lg mb-3">
            Recommendation
          </h2>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              feedback?.feedback?.recommendation === "Recommended"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <CheckCircle className="inline mr-2" size={16} />
            {feedback?.feedback?.recommendation}
          </span>

          <p className="mt-4 text-gray-600">
            {feedback?.feedback?.recommendationMsg}
          </p>

        </div>

        {/* Ratings */}

        <div className="mb-8">

          <h2 className="font-semibold text-lg mb-5">
            Ratings
          </h2>

          <div className="space-y-5">

            {Object.entries(ratings).map(([key, value]) => (
              <div key={key}>

                <div className="flex justify-between mb-2">

                  <span className="capitalize font-medium">
                    {key}
                  </span>

                  <span className="font-semibold">
                    {value}/10
                  </span>

                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{
                      width: `${value * 10}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Summary */}

        <div>

          <h2 className="font-semibold text-lg mb-3">
            Interview Summary
          </h2>

          <div className="bg-blue-50 border rounded-xl p-5">

            <p className="text-gray-700 leading-7">
              {feedback?.feedback?.summary}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default InterviewDetails;