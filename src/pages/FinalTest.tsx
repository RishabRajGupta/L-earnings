import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Award, PiggyBank } from "lucide-react";

// Mock test data
const mockTests = {
  "1": {
    questions: [
      { id: 1, question: "What is Python?", options: [
          "A high-level programming language", "A database management system",
          "An operating system", "A web browser"
        ], correctAnswer: 0 },
      { id: 2, question: "Which of the following is a Python data type?", options: [
          "Integer", "Float", "String", "All of the above"
        ], correctAnswer: 3 },
      { id: 3, question: "How do you create a function in Python?", options: [
          "function myFunction():", "def myFunction():",
          "create myFunction():", "func myFunction():"
        ], correctAnswer: 1 },
      { id: 4, question: "How do you create a comment in Python?", options: [
          "// This is a comment", "/* This is a comment */",
          "# This is a comment", "-- This is a comment"
        ], correctAnswer: 2 },
      { id: 5, question: "Which is NOT a valid Python variable name?", options: [
          "my_var", "_myvar", "1var", "myVar"
        ], correctAnswer: 2 }
    ]
  },
  "2": {
    questions: [
      { id: 1, question: "What does HTML stand for?", options: [
          "Hyper Text Markup Language", "High Tech Machine Learning",
          "Hyperlinks and Text Markup Language", "Home Tool Markup Language"
        ], correctAnswer: 0 },
      { id: 2, question: "Which CSS property changes text color?", options: [
          "font-color", "text-color", "color", "text-style"
        ], correctAnswer: 2 },
      { id: 3, question: "Which JS method removes last array element?", options: [
          "pop()", "push()", "shift()", "unshift()"
        ], correctAnswer: 0 },
      { id: 4, question: "Invalid JS variable declaration?", options: [
          "var x=5;", "let y=10;", "const z=15;", "variable w=20;"
        ], correctAnswer: 3 },
      { id: 5, question: "Correct CSS syntax for bold paragraphs?", options: [
          "p {text-weight:bold;}", "p {font-weight:bold;}",
          "<p style='font-size:bold;'>", "p.all {font-weight:bold;}"
        ], correctAnswer: 1 }
    ]
  }
};

const FinalTest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

  const [testData, setTestData] = React.useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = React.useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [courseTitle, setCourseTitle] = React.useState("");
  const [coursePrice, setCoursePrice] = React.useState(0);
  const [refundAmount, setRefundAmount] = React.useState(0);

  React.useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to take this test",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    const storedStr = localStorage.getItem("enrolledCourses");
    if (!storedStr) {
      toast({
        title: "Not enrolled",
        description: "You are not enrolled in this course",
        variant: "destructive"
      });
      navigate("/courses");
      return;
    }

    try {
      const storedCourses = JSON.parse(storedStr);
      const course = storedCourses.find((c: any) => c.id === id);

      if (!course) {
        toast({
          title: "Not enrolled",
          description: "You are not enrolled in this course",
          variant: "destructive"
        });
        navigate("/courses");
        return;
      }

      if (course.hasTakenTest) {
        toast({
          title: "Already completed",
          description: "You already took this test",
        });
        navigate("/my-courses");
        return;
      }

      setCourseTitle(course.title);
      setCoursePrice(course.price);

      const test = mockTests[id as keyof typeof mockTests];
      if (!test) {
        toast({
          title: "Test unavailable",
          description: "This test does not exist",
          variant: "destructive"
        });
        navigate(`/courses/${id}`);
        return;
      }

      setTestData(test);
      setSelectedAnswers(new Array(test.questions.length).fill(-1));
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not load test",
        variant: "destructive"
      });
      navigate("/courses");
    }
  }, [id, isLoggedIn]);

  const handleAnswer = (qIndex: number, aIndex: number) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[qIndex] = aIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (selectedAnswers.includes(-1)) {
      toast({
        title: "Incomplete",
        description: "Please answer all questions",
        variant: "destructive"
      });
      return;
    }

    let correct = 0;
    testData.questions.forEach((q: any, i: number) => {
      if (selectedAnswers[i] === q.correctAnswer) correct++;
    });

    const scorePercentage = Math.round((correct / testData.questions.length) * 100);
    setScore(scorePercentage);

    const refund = (scorePercentage / 100) * coursePrice;
    setRefundAmount(refund);

    const storedStr = localStorage.getItem("enrolledCourses");
    if (storedStr) {
      const stored = JSON.parse(storedStr);
      const updated = stored.map((c: any) =>
        c.id === id
          ? { ...c, hasTakenTest: true, testScore: scorePercentage, refundAmount: refund }
          : c
      );
      localStorage.setItem("enrolledCourses", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    }

    setIsSubmitted(true);

    toast({
      title: "Submitted",
      description: `Score: ${scorePercentage}% - Refund: ₹${refund.toFixed(2)}`
    });
  };

  if (!testData) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container px-4 md:px-6 py-12 flex justify-center items-center">
          <h1 className="text-2xl font-bold">Loading test…</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container px-4 md:px-6 py-12 flex justify-center">
          <Card className="max-w-3xl w-full glass">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Test Results</CardTitle>
              <p className="text-muted-foreground">{courseTitle}</p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="flex flex-col items-center">
                <div className="relative inline-flex mb-4">
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-4xl font-bold">{score}%</span>
                  </div>
                  {score >= 90 && (
                    <div className="absolute -top-2 -right-2 bg-green-100 dark:bg-green-900 text-green-600 rounded-full p-1">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  )}
                </div>

                <p className="text-xl font-medium">
                  {score >= 90 ? "Excellent!" : score >= 70 ? "Good Job!" : "Keep Learning!"}
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-primary" />
                  Refund  
                </h3>

                <div className="flex justify-between">
                  <span>Course Price:</span>
                  <span>₹{coursePrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-medium text-primary">
                  <span>Refund ({score}%):</span>
                  <span>₹{refundAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Final Cost:</span>
                  <span>₹{(coursePrice - refundAmount).toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-medium flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-primary" />
                  Certificate
                </h3>
                <Button className="w-full" disabled={score < 60}>
                  {score >= 60 ? "Download Certificate" : "Not Eligible"}
                </Button>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full" onClick={() => navigate("/my-courses")}>
                Return to My Courses
              </Button>
            </CardFooter>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  const q = testData.questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Final Test: {courseTitle}</h1>

          <Card className="glass">
            <CardHeader>
              <div className="flex justify-between mb-4">
                <span className="font-semibold">
                  Question {currentQuestion + 1} / {testData.questions.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  {selectedAnswers.filter(a => a !== -1).length} answered
                </span>
              </div>
              <Progress
                value={((currentQuestion + 1) / testData.questions.length) * 100}
                className="h-2"
              />
            </CardHeader>

            <CardContent>
              <h2 className="text-xl font-medium mb-4">{q.question}</h2>

              <RadioGroup
                value={selectedAnswers[currentQuestion].toString()}
                onValueChange={(val) => handleAnswer(currentQuestion, parseInt(val))}
                className="space-y-4"
              >
                {q.options.map((opt: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      id={`q${currentQuestion}-o${index}`}
                      value={index.toString()}
                    />
                    <Label htmlFor={`q${currentQuestion}-o${index}`}>{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </Button>

              {currentQuestion < testData.questions.length - 1 ? (
                <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit}>Submit Test</Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FinalTest;
