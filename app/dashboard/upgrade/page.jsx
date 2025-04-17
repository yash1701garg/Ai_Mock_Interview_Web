// export default function UpgradePage() {
//     return (
//       <div className="p-4">
//         <h1 className="text-xl font-bold">Upgrade Plan</h1>
//         <p>Details about premium features and pricing.</p>
//       </div>
//     );
//   }
  
'use client'

import { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { Button } from '@/components/ui/button'

export default function UpgradePage() {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const fetchQuestions = async () => {
            const result = await db.select().from(UserAnswer).orderBy(UserAnswer.id)
            setQuestions(result)
        }

        fetchQuestions()
    }, [])

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Previous Interview Questions and Answers</h1>
            <p className="text-gray-600">
                Explore your previous interviews and upgrade to unlock more features!
            </p>

            {questions.length === 0 ? (
                <p className="text-gray-500">No previous interview questions found.</p>
            ) : (
                <div className="space-y-4">
                    {questions.map((item, index) => (
                        <div
                            key={index}
                            className="border p-4 rounded-lg shadow-sm bg-white"
                        >
                            <h2 className="font-semibold text-gray-800">
                                Question {index + 1}: {item.question}
                            </h2>
                            <p className="text-sm text-gray-500">
                                <strong>Your Answer:</strong> {item?.correctAnswer}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
