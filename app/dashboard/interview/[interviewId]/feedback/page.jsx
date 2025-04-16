'use client'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'


function feedback({params}) {
  const para = useParams();
  console.log("this is params",para);
  const [feedbackList,setFeedbackList] = useState([]);
  const router = useRouter();
  useEffect(()=>{
    GetFeedback();
  },[])
  const GetFeedback = async()=>{
    const result = await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef,para?.interviewId))
    .orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
  }
  return (
    <div className='p-10 '>
      

      {feedbackList?.length==0 ? 
      <h2 className='font-bold text-2xl text-gray-500'>No Interview Feedback found......</h2>
      : <>
      <h2 className='font-bold text-3xl text-green-600'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is an interview feedback</h2>
      <h2 className='text-blue-600 text-lg my-3'>Your overall Rating: <strong>7/10</strong></h2>


      <h2 className='text-sm text-gray-500'>Find below the question with correct answer</h2>

      {
       feedbackList && feedbackList.map((item,index)=>(
        <Collapsible key={index} className='mt-7'>
        <CollapsibleTrigger  className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'
        >{item?.question}<ChevronsUpDown className='h-5 w-5'/></CollapsibleTrigger>
        <CollapsibleContent>
          <div className='flex flex-col gap-2'>
            <h2 className='text-red-500 border rounded-lg p-2'><strong>Rating:</strong>{item?.rating}</h2>
            <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your answer:</strong>{item.userAns}</h2>
            <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct answer:</strong>{item.correctAnswer}</h2>
            <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback:</strong>{item.feedback}</h2>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
        ))
      }
      </>
}
      <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default feedback