import React from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Copy, Share } from "lucide-react";

const InterviewCard = ({ interview }) => {
    const url = `${process.env.NEXT_PUBLIC_INTERVIEW_URL}/${interview?.interview_id}`
    const copyLink = () => {
        navigator.clipboard.writeText(url)
    }

    const onSend = () => {
        const subject = encodeURIComponent("AI Recruiter Interview Link");
        const body = encodeURIComponent(`Interview Link: ${url}`);

        window.location.href = `mailto:soumyaj2003@gmail.com?subject=${subject}&body=${body}`;

        console.log("sent")
    };

    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold">
                    {interview?.jobPosition?.charAt(0) || "I"}
                </div>

                <p className="text-sm text-gray-500">
                    {interview?.created_at
                        ? moment(interview.created_at).format("DD MMM YYYY")
                        : "No date"}
                </p>
            </div>

            {/* Details */}
            <div className="mt-4 space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">
                    {interview?.jobPosition}
                </h2>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Duration:</span>{" "}
                    {interview?.duration || "N/A"}
                </p>


            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={copyLink}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                </Button>

                <Button className="flex-1" onClick={onSend}>
                    <Share className="mr-2 h-4 w-4" />
                    Send
                </Button>
            </div>
        </div>
    );
};

export default InterviewCard;