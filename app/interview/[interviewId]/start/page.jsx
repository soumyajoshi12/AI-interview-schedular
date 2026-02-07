'use client'

import { InterviewDetailsContext } from '@/context/InterviewDetails'
import { Mic, Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'; // Added for redirection
import Vapi from '@vapi-ai/web';
import AlertDialogBox from './_components/AlertDialogBox'
import axios from 'axios'

const page = () => {
    const { interviewDetail } = useContext(InterviewDetailsContext)
    const router = useRouter(); // Added for navigation
    const [vapi, setVapi] = useState(null); // Store Vapi instance
    const [isCallActive, setIsCallActive] = useState(false); // Track if call is ongoing
    const [isMuted, setIsMuted] = useState(false); // Track mute status
    const [elapsedTime, setElapsedTime] = useState(0); // Timer in seconds
    const [timerInterval, setTimerInterval] = useState(null); // Interval for timer
    const [conversation, setConversation] = useState()
    const conversationRef = useRef([]);

    // Initialize Vapi on component mount
    useEffect(() => {
        console.log('API Key loaded:', process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ? 'Yes' : 'No'); // Debug: Remove in production
        const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
        setVapi(vapiInstance);

        // Set up event listeners
        vapiInstance.on('call-start', () => {
            console.log('Call started');
            setIsCallActive(true);
            startTimer(); // Start the timer
        });

        vapiInstance.on('call-end', () => {
            console.log('Call ended');
            setIsCallActive(false);
            stopTimer(); // Stop the timer
            setElapsedTime(0); // Reset timer
            generateFeedback()
            router.push('/dashboard'); // Redirect to dashboard on call end
        });

        vapiInstance.on('error', (error) => {
            console.error('Vapi error:', error);
            alert('An error occurred during the interview. Please try again.');
        });

        // Optional: Handle speech events for UI feedback
        vapiInstance.on('speech-start', () => {
            console.log('AI is speaking');
            // You could update UI here, e.g., show "AI speaking" indicator
        });

        vapiInstance.on("message", (message) => {
            console.log(message?.conversation)
            if (message?.conversation) {
                conversationRef.current = message.conversation;  // Update the ref with the latest data
                setConversation(message.conversation)  // Still update state for UI if needed
            }
        })

        return () => {
            // Cleanup on unmount
            if (vapiInstance) {
                vapiInstance.stop();
            }
        };
    }, [router]); // Added router to dependencies

    useEffect(() => {
        console.log("Conversation state updated:", conversation);
    }, [conversation]);

    const generateFeedback = async () => {
        try {
            const result = await axios.post("/api/ai-feedback", {
                conversation: conversationRef.current
            });
            console.log("Parsed feedback:", result.data);
            const Content = result.data  // Now it's an object like { feedback: {...} }
            const Final_content = Content.replace('```json','').replace('```','')
            // Example: Access specific parts
            console.log("Rating:", rating);
            // Optionally: Display in UI, save to DB, etc.
        } catch (error) {
            console.error("Error:", error.response?.data?.error || error.message);
        }
    };

    // Auto-start the interview once Vapi is initialized
    useEffect(() => {
        if (vapi) {
            startInterview(); // Automatically start the interview
        }
    }, [vapi]); // Runs when vapi is set

    const startInterview = async () => {
        if (!vapi) return;
        console.log("interviewDetailinterviewDetailinterviewDetail:::", interviewDetail)
        // Build dynamic content (ensure questionLists and jobPosition are available)
        const questionLists = interviewDetail?.interviewDetails?.questionLists || [];
        const questionsString = questionLists.map((q, i) => `${i + 1}. ${q}`).join(' ');
        const dynamicContent = `
    Your job is to ask candidates provided interview questions, assess their responses.

    You are an AI voice assistant conducting interviews.

    Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
    "Hey there! Welcome to your ${interviewDetail?.interviewDetails?.jobPosition} interview. Let's get started with a few questions!"

    Ask one question at a time and wait for the candidate's response before proceeding.
    Keep the questions clear and concise.

    Below are the questions, ask one by one:
    Questions: ${questionsString}

    If the candidate struggles, offer hints or rephrase the question without giving away the answer.
    Example: "Need a hint? Think about how React tracks component updates!"

    Provide brief, encouraging feedback after each answer.
    Example: "Nice! That's a solid answer."

    Keep the conversation natural and engaging—use casual phrases like:
    "Alright, next up..." or "Let's tackle a tricky one!"
    "Hmm, not quite! Want to try again?"

    After 5–7 questions, wrap up the interview smoothly by summarizing their performance.
    Example: "That was great! You handled some tough questions well. Keep sharpening your skills!"

    End on a positive note:
    "Thanks for chatting! Hope to see you crushing projects soon!"

    Key Guidelines:
    - Be friendly, engaging, and witty
    - Keep responses short and natural, like a real conversation
    - Adapt based on the candidate's confidence level
    - Ensure the interview remains focused on React
    `;

        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            await vapi.start('3644cd7c-2fdd-4d5e-bc59-35bb990c2adc', {
                model: {
                    provider: 'openai',
                    model: 'gpt-4o',
                    messages: [
                        {
                            role: 'system',
                            content: dynamicContent
                        }
                    ]
                }
            });
        } catch (error) {
            console.error('Failed to start interview:', error);
            alert(`Failed to start the interview: ${error.message || 'Unknown error'}. Check your API key and assistant ID.`);
        }
    };

    const stopInterview = async () => {
        if (!vapi) return;
        try {
            await vapi.stop();
        } catch (error) {
            console.error('Failed to stop interview:', error);
        }
    };

    // Toggle mute
    const toggleMute = async () => {
        if (!vapi || !isCallActive) return;
        try {
            if (isMuted) {
                await vapi.unmute();
                setIsMuted(false);
            } else {
                await vapi.mute();
                setIsMuted(true);
            }
        } catch (error) {
            console.error('Mute toggle failed:', error);
        }
    };

    // Timer functions
    const startTimer = () => {
        const interval = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);
        setTimerInterval(interval);
    };

    const stopTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            setTimerInterval(null);
        }
    };

    // Format timer as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className='py-10 px-20'>
            <div className='flex w-full justify-between'>
                <h2 className='text-lg font-bold'>AI Interview session</h2>
                <span className='flex gap-2'><Timer />{formatTime(elapsedTime)}</span>
            </div>
            <div className='grid grid-cols-2 flex gap-8 mt-5'>
                <div className='bg-gray-100 rounded-lg p-40 flex flex-col gap-2 items-center justify-center'>
                    <Image src='/login.png' alt='imgAI' width={100} height={100} className='w-[70px] h-[70px] rounded-full object-fit' />
                    <h2>AI Recruiter</h2>
                </div>
                <div className='bg-gray-100 rounded-lg p-40 flex-col flex items-center justify-center'>
                    <div className='text-lg flex items-center justify-center text-white bg-gray-900 w-[70px] h-[70px] rounded-full'>
                        {interviewDetail?.userName[0]}
                    </div>
                    <h2>{interviewDetail?.userName}</h2>
                </div>
            </div>
            <div className='flex gap-15 mt-5 w-full justify-center'>
                {/* Mic button for mute/unmute */}
                <button
                    onClick={toggleMute}
                    disabled={!isCallActive}
                    className={`w-[50px] h-[50px] ${isMuted ? 'bg-gray-500' : 'bg-gray-800'} text-white rounded-full flex items-center justify-center`}
                >
                    <Mic />
                </button>

                {/* Phone button for end call, wrapped in AlertDialogBox */}
                <AlertDialogBox stopInterview={stopInterview}>
                    <div className='w-[50px] h-[50px] bg-red-800 text-white rounded-full flex items-center justify-center'>
                        <Phone />
                    </div>
                </AlertDialogBox>
            </div>
            <div className='flex flex-col items-center mt-3'>
                {/* Always show "Interview In Progress..." since it auto-starts */}
                <h2 className='text-gray-400'>Interview In Progress...</h2>
            </div>
        </div>
    )
}

export default page