'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MOCKINTERVIEW } from '@/utils/schema';
import {v4 as uuidv4} from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
  
function AddNewInterview() {
    const [openDailog,setOpenDailogue] = useState(false);
    const [jobPosition,setJobPositon] = useState();
    const [jobDesc,setJobDesc] = useState();
    const [jobExperience,setJobExperience] = useState();
    const [loading,setLoading] = useState(false);
    const [jsonResponse,setJsonResponse] = useState([]);
    const {user} = useUser();

    const onSubmit = async (event) => {

            setLoading(true);
            event.preventDefault();
            console.log(jobPosition,jobDesc,jobExperience);
            const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format.`;
            const result = await chatSession.sendMessage(inputPrompt);
            const MockJsonResp = (result.response.text()).replace('```json','').replace('```','');
            console.log(JSON.parse(MockJsonResp));
            setJsonResponse(MockJsonResp);
            if(MockJsonResp){
             const resp = await db.insert(MOCKINTERVIEW).values({
              mockId:uuidv4(),
              jsonMockResp:MockJsonResp,
              jobPositon:jobPosition,
              jobDesc:jobDesc,
              jobExperience:jobExperience,
              createdBy:user?.primaryEmailAddress?.emailAddress,
              createdAt:moment().format('DD-MM-yyyy')
            }).returning({mockId:MOCKINTERVIEW.mockId})

            console.log('Inserted ID is : ',resp);
            if(resp) {
              setOpenDailogue(false);
            }
          }else{
            console.log('error');
          }
            setLoading(false);
  }
  
  return (
    <div>
        <div className='p-10 bordder rounded-lg bg-secondary
        hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={()=>setOpenDailogue(true)}
        >
            <h2 className='text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDailog}>
         
          <DialogContent className='max-w-2xl'>
            <DialogHeader>
              <DialogTitle className='text-2xl'>Tell us more about your job interview</DialogTitle>
              <DialogDescription>
                <form onSubmit={onSubmit}>
                <div>
                    <h2>Add Deatils about your job position/role,Job description and years of experience</h2>
                    <div className='mt-7 my-3'>
                        <label>Enter Job Role/Position</label>
                        <Input placeholder='Ex. Full Stack Developer' required
                        onChange={(event)=>setJobPositon(event.target.value)}
                        />
                    </div>
                    <div className='my-3'>
                        <label>Enter Job Description/Tech Stack (in short)</label>
                        <Input placeholder='Ex. React, Angular, Nodejs, MySQL' required
                        onChange={(event)=>setJobDesc(event.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        <label>Year of experience</label>
                        <Input placeholder='Ex. 5' type='number' max="20" required
                        onChange={(event)=>setJobExperience(event.target.value)}
                        />
                    </div>

                </div>
                <div className='flex gap-5 justify-end'>
                    <Button type="button" variant="ghost" onClick={()=>setOpenDailogue(false)}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                      {loading ?
                       <>
                       <LoaderCircle className='animate-spin'/>'Generating from Ai'
                       </>  :  'Start Interview'
                    }
                     </Button>
                </div>
             </form>
              </DialogDescription>

            </DialogHeader>
          </DialogContent>
       </Dialog>

    </div>
  )
}

export default AddNewInterview