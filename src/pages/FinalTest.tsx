
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Award, PiggyBank } from "lucide-react";

// Mock data - In a real app, this would come from your backend
const mockTest = {
  questions: [
    {
      id: 1,
      question: "What is React?",
      options: [
        "A JavaScript library for building user interfaces",
        "A programming language",
        "A database management system",
        "An operating system"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "What hook is used for side effects in React?",
      options: [
        "useState",
        "useEffect",
        "useContext",
        "useReducer"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "Which of the following is NOT a JavaScript data type?",
      options: [
        "String",
        "Boolean",
        "Integer",
        "Object"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Creative Style System",
        "Cascading Style Sheets",
        "Colorful Style Sheets"
      ],
      correctAnswer: 2
    },
    {
      id: 5,
      question: "Which of these is a valid way to create a component in React?",
      options: [
        "class MyComponent { render() { return <div>Hello</div> } }",
        "const MyComponent = () => <div>Hello</div>",
        "function MyComponent() { return <div>Hello</div> }",
        "Both B and C"
      ],
      correctAnswer: 3
    }
  ]
};

// Mock course data
const mockCourses = {
  "1": { price: 99.99, title: "Introduction to React" },
  "2": { price: 149.99, title: "Advanced JavaScript Concepts" }
};

const FinalTest = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [answers, setAnswers] = React.useState<Record<number, number>>({});
  const [testCompleted, setTestCompleted] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [refundAmount, setRefundAmount] = React.useState(0);

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const courseTitle = id && mockCourses[id as keyof typeof mockCourses]?.title || "Course";
  const coursePrice = id && mockCourses[id as keyof typeof mockCourses]?.price || 0;

  const handleSubmit = () => {
    const totalQuestions = mockTest.questions.length;
    const correctAnswers = mockTest.questions.reduce((acc, question) => {
      return answers[question.id] === question.correctAnswer ? acc + 1 : acc;
    }, 0);
    
    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
    const calculatedRefund = (scorePercentage / 100) * coursePrice;
    
    setScore(scorePercentage);
    setRefundAmount(calculatedRefund);
    setTestCompleted(true);
  };

  // Test summary screen
  if (testCompleted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Test Completed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-4">
                  {score >= 90 ? (
                    <Award className="h-16 w-16 text-primary" />
                  ) : (
                    <CheckCircle className="h-16 w-16 text-primary" />
                  )}
                </div>
                
                <h2 className="text-4xl font-bold mb-2">{score}%</h2>
                <p className="text-muted-foreground mb-6">Your final score</p>
                
                <div className="w-full max-w-md mb-4">
                  <Progress value={score} className="h-4" />
                </div>
                
                <div className="bg-muted p-6 rounded-lg w-full max-w-md text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <PiggyBank className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Your Refund</h3>
                  </div>
                  <p className="text-3xl font-bold">${refundAmount.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    {score}% of your course fee (${coursePrice.toFixed(2)})
                  </p>
                  {score >= 90 && (
                    <p className="mt-2 text-sm font-medium text-primary">
                      Congratulations! You've earned a significant refund!
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => navigate(`/my-courses`)}>
                Back to My Courses
              </Button>
              <Button onClick={() => navigate(`/courses/${id}`)}>
                Course Details
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Test questions screen
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>{courseTitle}: Final Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {mockTest.questions.map((question, index) => (
              <div key={question.id} className="space-y-4">
                <h3 className="font-medium">
                  {index + 1}. {question.question}
                </h3>
                <RadioGroup
                  value={answers[question.id]?.toString()}
                  onValueChange={(value) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: parseInt(value)
                    }))
                  }
                >
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={optionIndex.toString()} id={`q${question.id}-${optionIndex}`} />
                      <Label htmlFor={`q${question.id}-${optionIndex}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}

            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">
                <strong>Remember:</strong> Your test score determines your refund. Score 90% or higher to get up to 90% of your course fee back!
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={Object.keys(answers).length !== mockTest.questions.length}
            >
              Submit Test
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default FinalTest;
