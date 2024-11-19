'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { chatSession } from '@/utils/GeminiAIModal';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Mic } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam'
import { toast } from 'sonner';

function RecordAnsSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    // Append only the latest result to `userAnswer`
    useEffect(() => {
        if (results.length > 0) {
            const latestResult = results[results.length - 1]?.transcript || '';
            setUserAnswer((prevAns) => prevAns + latestResult);
        }
    }, [results]);

    // Save the answer when recording stops
    useEffect(() => {
        if (!isRecording && userAnswer?.length > 10) {
            updateUserAnswerInDb();
        }
    }, [isRecording]);

    const stopAndStartRec = async () => {
        if (isRecording) {
            stopSpeechToText();
            // if (userAnswer?.length < 2) {
            //     setLoading(false);
            //     toast('Error while saving answer, Please Record Again!!');
            //     return;
            // }
        } else {
            startSpeechToText();
        }
    };

    const updateUserAnswerInDb = async () => {
        console.log(userAnswer);
        setLoading(true);
        // Mock response handling and database insertion commented out for now
        // Uncomment and implement as needed

        const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question
        + ", User Answer:" + userAnswer + ", Depends on question and user answer for give interview question "
        + " please give us rating for answer and feedback as area of improvement if any "
        + "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
        
        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
        console.log(mockJsonResp);
        const JsonFeedbackResp = JSON.parse(mockJsonResp);
        console.log("Data to Insert:", {
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy'),
      });
      
        const resp = await db.insert(UserAnswer).values({
            mockIdRef: interviewData?.mockId || "defaultMockId",
            question: mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: JsonFeedbackResp?.feedback,
            rating: JsonFeedbackResp?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress || 'abc@gmail.com',
            createdAt: moment().format('DD-MM-yyyy'),
        }).then(()=>console.log('db entry done')).catch((error)=>console.log('error on db entry  ',error));;
        if (resp) {
            toast('User answer recorded successfully!!!');
            setUserAnswer('');
            setResults([]);
        }
        setResults([]);
        setUserAnswer('');
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center flex-col">
            <div className="flex flex-col justify-center mt-20 items-center rounded-lg p-5 bg-black">
                <Image
                    src={'/webcam.jpg'}
                    width={200}
                    height={200}
                    className="absolute"
                    alt="Webcam background"
                />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>
            <Button
                variant="outline"
                className="my-10"
                disabled={loading}
                onClick={stopAndStartRec}
            >
                {isRecording ? (
                    <h2 className="text-red-600 flex gap-2">
                        <Mic /> Stop Recording
                    </h2>
                ) : (
                    'Record Answer'
                )}
            </Button>
           
        </div>
    );
}

export default RecordAnsSection;
