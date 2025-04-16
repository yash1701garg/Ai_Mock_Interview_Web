export default function HowItWorksPage() {
    return (
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-blue-600">How It Works</h1>
  
        <ol className="list-decimal list-inside space-y-4 text-gray-800">
          <li>
            <strong>Login or Sign Up:</strong> Start by signing up or logging in using your credentials. We use Clerk for secure authentication.
          </li>
  
          <li>
            <strong>Access Your Dashboard:</strong> After logging in, you’ll land on the dashboard where you can start a new mock interview.
          </li>
  
          <li>
            <strong>Generate AI Interview:</strong> Click the “Start Interview” button. Our AI will generate personalized questions based on your profile or job role.
          </li>
  
          <li>
            <strong>Answer Using Microphone:</strong> Speak your answers aloud. The app will capture your voice in real-time using your device’s mic.
          </li>
  
          <li>
            <strong>Get Instant Feedback:</strong> The AI evaluates your response and provides immediate feedback along with the correct model answer for improvement.
          </li>
  
          <li>
            <strong>Repeat & Improve:</strong> Practice as many times as you like to build confidence and enhance your communication skills.
          </li>
        </ol>
  
      </div>
    );
  }
  