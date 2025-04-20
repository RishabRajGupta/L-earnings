
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockEnrolledCourses = [
  {
    id: 1,
    title: "Introduction to React",
    price: 4999,
    progress: "80%",
    hasTakenTest: false,
    testScore: null,
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
    price: 7499,
    progress: "60%",
    hasTakenTest: false,
    testScore: null,
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
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = React.useState<number | null>(null);
  const [enrolledCourses, setEnrolledCourses] = React.useState([]);

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    
    // Load enrolled courses from localStorage
    loadEnrolledCourses();
    
    // Set up a storage event listener to handle updates from other tabs
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isLoggedIn, navigate]);

  const handleStorageChange = (e) => {
    if (e.key === 'enrolledCourses') {
      loadEnrolledCourses();
    }
  };
  
  const loadEnrolledCourses = () => {
    try {
      // Get stored courses
      const storedCourses = localStorage.getItem('enrolledCourses');
      let courses = [];
      
      if (storedCourses) {
        const parsedCourses = JSON.parse(storedCourses);
        
        // Map the stored courses to include the additional fields
        courses = parsedCourses.map((course) => {
          // Check if this course exists in our mock data
          const mockCourse = mockEnrolledCourses.find(mc => mc.id === course.id);
          
          if (mockCourse) {
            // If it exists in mock data, use that but preserve test results
            return {
              ...mockCourse,
              hasTakenTest: course.hasTakenTest || false,
              testScore: course.testScore || null
            };
          } else {
            // If it's a new course, ensure it has all necessary fields
            return {
              ...course,
              hasTakenTest: course.hasTakenTest || false,
              testScore: course.testScore || null,
              progress: course.progress || "0%",
              materials: course.materials || [
                { 
                  title: "Course Introduction", 
                  content: "Welcome to the course! This is an introduction to the main concepts you'll be learning." 
                },
                { 
                  title: "Getting Started", 
                  content: "In this section, we'll set up your learning environment and prepare for the course material." 
                }
              ]
            };
          }
        });
      } else {
        // Default to empty array if nothing is stored
        courses = [];
      }
      
      setEnrolledCourses(courses);
    } catch (error) {
      console.error("Error loading enrolled courses:", error);
      toast({
        title: "Error",
        description: "Failed to load your enrolled courses",
        variant: "destructive"
      });
    }
  };

  const courseData = selectedCourse !== null 
    ? enrolledCourses.find(course => course.id === selectedCourse) 
    : null;

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
                {courseData.hasTakenTest ? (
                  <div className="text-center">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="font-medium">Your Test Score: {courseData.testScore}%</span>
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={() => navigate(`/courses/${courseData.id}/test`)}
                    className="w-full max-w-xs"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Take Final Test
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Enrolled Courses</h1>
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No courses enrolled yet</h2>
            <p className="text-muted-foreground mb-6">Browse our catalog and enroll in a course to get started</p>
            <Button onClick={() => navigate("/courses")}>Browse Courses</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="flex flex-col glass hover-scale hover-glow">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Progress: {course.progress}
                    </p>
                    {course.hasTakenTest && course.testScore !== null && (
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <p className="text-sm font-medium">Test Score: {course.testScore}%</p>
                      </div>
                    )}
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
                  {course.hasTakenTest ? (
                    <div className="w-full text-center p-2 bg-muted rounded-md">
                      <div className="flex items-center justify-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span>Final Score: {course.testScore}%</span>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => navigate(`/courses/${course.id}/test`)}
                      className="w-full"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Take Final Test
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyCourses;
