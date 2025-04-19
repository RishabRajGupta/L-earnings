
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
    }
  ]
};

const FinalTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [answers, setAnswers] = React.useState<Record<number, number>>({});

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = () => {
    const totalQuestions = mockTest.questions.length;
    const correctAnswers = mockTest.questions.reduce((acc, question) => {
      return answers[question.id] === question.correctAnswer ? acc + 1 : acc;
    }, 0);
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    toast({
      title: "Test Completed!",
      description: `Your score: ${score}%. ${score >= 90 ? "Congratulations! You'll get a refund!" : "Keep studying to improve your score!"}`,
    });

    navigate("/my-courses");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Final Test</CardTitle>
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
