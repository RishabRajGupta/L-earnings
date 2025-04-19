import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Award } from "lucide-react";

// Mock data - In a real app, this would come from your backend
const mockEnrolledCourses = [
  {
    id: 1,
    title: "Introduction to React",
    progress: "80%",
    hasTakenTest: false,
    description: "Learn the foundations of React",
    materials: [
      { 
        title: "React Basics", 
        content: "React is a JavaScript library for building user interfaces. It allows developers to create large web applications that can change data, without reloading the page." 
      },
      { 
        title: "Components and Props", 
        content: "Components let you split the UI into independent, reusable pieces. They accept arbitrary inputs (called 'props') and return React elements describing what should appear on the screen." 
      },
      { 
        title: "State and Lifecycle", 
        content: "State allows React components to change their output over time in response to user actions, network responses, and anything else." 
      }
    ]
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    progress: "60%",
    hasTakenTest: false,
    description: "Master advanced JavaScript techniques",
    materials: [
      { 
        title: "Closures and Scope", 
        content: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment)." 
      },
      { 
        title: "Promises and Async/Await", 
        content: "Promises provide a cleaner way to handle asynchronous operations compared to callbacks. Async/await is syntactic sugar built on top of promises." 
      },
      { 
        title: "Prototypal Inheritance", 
        content: "JavaScript objects have a link to a prototype object. When trying to access a property that does not exist in an object, JavaScript tries to find it in the prototype chain." 
      }
    ]
  }
];

const MyCourses = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Get the selected course data
  const courseData = selectedCourse !== null 
    ? mockEnrolledCourses.find(course => course.id === selectedCourse) 
    : null;

  // If a course is selected, show its details and materials
  if (selectedCourse !== null && courseData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => setSelectedCourse(null)} 
            className="mb-4"
          >
            Back to My Courses
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
          <p className="text-muted-foreground mb-6">{courseData.description}</p>
          
          <div className="space-y-6">
            {courseData.materials.map((material, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {material.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{material.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 flex flex-col items-center">
            <Card className="w-full max-w-md text-center">
              <CardHeader>
                <CardTitle>Ready for the Final Test?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete the test to measure your understanding. Your performance will determine your refund amount - score 90% and get a 90% refund!
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  onClick={() => navigate(`/courses/${courseData.id}/test`)}
                  className="w-full max-w-xs"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Take Final Test
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Otherwise show the list of enrolled courses
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Enrolled Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEnrolledCourses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Progress: {course.progress}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  onClick={() => setSelectedCourse(course.id)}
                  className="w-full"
                  variant="outline"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Course Materials
                </Button>
                <Button
                  onClick={() => navigate(`/courses/${course.id}/test`)}
                  className="w-full"
                  variant={course.hasTakenTest ? "secondary" : "default"}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {course.hasTakenTest ? "Retake Final Test" : "Take Final Test"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyCourses;
