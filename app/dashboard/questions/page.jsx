// export default function QuestionsPage() {
//     return (
//         <div className="p-4 space-y-6">
//             <h1 className="text-2xl font-bold text-gray-800">Your Interview Questions</h1>

//             <p className="text-gray-600">
//                 This page will display all the questions you've encountered during your AI mock interviews.
//                 You can revisit them anytime to review your responses, correct answers, and feedback from the AI.
//             </p>

//             <div className="bg-gray-100 p-4 rounded shadow">
//                 <h2 className="text-lg font-semibold text-gray-700 mb-2">What's Next?</h2>
//                 <ul className="list-disc list-inside text-gray-600 space-y-1">
//                     <li>Complete a mock interview from the dashboard.</li>
//                     <li>Come back here to view and reflect on the questions asked.</li>
//                     <li>Use the feedback to improve your future responses.</li>
//                 </ul>
//             </div>

//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
//                 <p className="text-yellow-700">
//                     Have any questions or facing issues? Feel free to reach out.
//                 </p>
//                 <a
//                     href="https://mail.google.com/mail/?view=cm&fs=1&to=yashgarg1701@gmail.com&su=Query%20about%20Mock%20Interview&body=Hi%20Yash,"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                 >
//                     Ask a Query
//                 </a>
//             </div>
//         </div>
//     );
// }
export default function QuestionsPage() {
    return (
        <div className="p-6 space-y-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800">Ask a Query</h1>

            <p className="text-gray-600">
                If you have any questions, feedback, or concerns related to your mock interviews, feel free to reach out. We're here to help you improve and succeed!
            </p>

            <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=yashgarg1701@gmail.com&su=Query%20about%20Mock%20Interview&body=Hi%20Yash,"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
                Send Email
            </a>
        </div>
    );
}
