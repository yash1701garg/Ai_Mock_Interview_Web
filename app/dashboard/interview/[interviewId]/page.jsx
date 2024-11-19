'use client'
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MOCKINTERVIEW } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';

function Interview({params}) {
    const [interviewData,setInterviewData] = useState();
    const [webCamEnabled,setWebCamEnabled] = useState(false)
    useEffect(()=>{
        console.log("Interview ID : "+params.interviewId);
        GetInterviewDetails();
    },[]);
    const GetInterviewDetails = async()=>{
        const result = await db.select().from(MOCKINTERVIEW)
                              .where(eq(MOCKINTERVIEW.mockId,params.interviewId))
        console.log(result[0]);
        setInterviewData(result[0]);
    }
  return (
    <div className='my-6 flex  flex-col '>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10  '>
      
      <div className='flex flex-col my-5 gap-5'>
          <div className='flex flex-col p-5 rounded-lg border gap-5'>
            <h2 className='text-lg'><strong>Job Role/Job Position : </strong>{interviewData?.jobPositon}</h2>
            <h2 className='text-lg'><strong>Job Description : </strong>{interviewData?.jobDesc}</h2>
            <h2><strong>Years of Experience : </strong>{interviewData?.jobExperience}</h2>
          </div>
          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
           <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
            <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INTERVIEW_INFORMATION}</h2>
          </div>
        </div>
        <div>
        {/* <Webcam/> */}
        {webCamEnabled ? <Webcam
        onUserMedia={()=>setWebCamEnabled(true)}
        onUserMediaError={()=>setWebCamEnabled(false)}
        style={{
            height:300,
            width:300
        }}
        mirrored={true}
        /> :
        <>
        <WebcamIcon className='h-72 my-7 w-full p-20 bg-secondary rounded-lg border'/>
        <div className='ml-48'><Button variant="ghost" className='' onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button></div>
        </>
        }
       
        </div>
      </div>
     <div className='flex items-end justify-end'>
     <Link href={'/dashboard/interview/'+params.interviewId+'/start'}><Button>Start Interview</Button></Link>
     </div>
    </div>
  )
}

export default Interview