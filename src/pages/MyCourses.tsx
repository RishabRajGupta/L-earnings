import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatBot from '@/components/ChatBot';

// Course materials mock data
const courseMaterials = {
  "1": [
    { 
      title: "Python Basics", 
      content: "Python is a high-level, interpreted programming language known for its readability and versatility." 
    },
    { 
      title: "Control Flow", 
      content: "Learn about if statements, loops, and conditional expressions." 
    },
    { 
      title: "Functions and Modules", 
      content: "Discover how to write reusable code blocks with functions and modules." 
    }
  ],
  "2": [
    { 
      title: "HTML Fundamentals", 
      content: "HTML provides the structure for web pages. Learn about tags and attributes." 
    },
    { 
      title: "CSS Styling", 
      content: "CSS allows you to style your HTML elements." 
    },
    { 
      title: "JavaScript Basics", 
      content: "JavaScript adds interactivity to websites." 
    }
  ],
  "3": [
    { 
      title: "R Introduction", 
      content: "R is a programming language designed for statistical computing and graphics." 
    },
    { 
      title: "Data Manipulation", 
      content: "Clean, transform, and analyze data using R packages." 
    },
    { 
      title: "Data Visualization", 
      content: "Create compelling visualizations with ggplot2." 
    }
  ],
  "4": [
    { 
      title: "Design Principles", 
      content: "Understand the fundamental design principles of UI/UX." 
    },
    { 
      title: "User Research", 
      content: "Learn techniques for gathering user feedback and creating personas." 
    },
    { 
      title: "Prototyping", 
      content: "Explore tools and methods for creating wireframes and prototypes." 
    }
  ],
  "5": [
    { 
      title: "Marketing Fundamentals", 
      content: "Learn core marketing concepts including target audience and positioning." 
    },
    { 
      title: "Social Media Marketing", 
      content: "Leverage social media platforms for brand building and engagement." 
    },
    { 
      title: "Analytics and Optimization", 
      content: "Measure campaign performance and optimize results." 
    }
  ],
  "6": [
    { 
      title: "Introduction to ML", 
      content: "Understand core machine learning concepts and model evaluation." 
    },
    { 
      title: "Classification Algorithms", 
      content: "Explore decision trees, random forests, and support vector machines." 
    },
    { 
      title: "Neural Networks", 
      content: "Learn about artificial neural networks and deep learning." 
    }
  ]
};

const MyCourses = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    loadEnrolledCourses();

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isLoggedIn, navigate]);

  const handleStorageChange = (e) => {
    if (e.key === 'enrolledCourses') {
      loadEnrolledCourses();
    }
  };

  const loadEnrolledCourses = () => {
    try {
      const storedCourses = localStorage.getItem('enrolledCourses');
      let courses = [];

      if (storedCourses) {
        const parsedCourses = JSON.parse(storedCourses);

        courses = parsedCourses.map((course) => {
          const materials = courseMaterials[course.id] || [
            { title: "Course Introduction", content: "Welcome to the course!" },
            { title: "Getting Started", content: "Prepare for the course material." }
          ];

          return {
            ...course,
            materials,
            hasTakenTest: course.hasTakenTest || false,
            testScore: course.testScore || null,
            progress: course.progress || "0%"
          };
        });
      }

      setEnrolledCourses(courses);
    } catch (error) {
      console.error("Error loading courses:", error);
      toast({
        title: "Error",
        description: "Failed to load your courses.",
        variant: "destructive",
      });
    }
  };

  const courseData =
    selectedCourse !== null
      ? enrolledCourses.find((course) => course.id === selectedCourse)
      : null;

  /* ------------------------------
      VIEWING A SPECIFIC COURSE
  ------------------------------ */
  if (selectedCourse !== null && courseData) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Navbar removed because it's global */}

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
                  Score well to earn your refund.
                </p>
              </CardContent>

              <CardFooter className="flex justify-center">
                {courseData.hasTakenTest ? (
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span>Your Score: {courseData.testScore}%</span>
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

        <ChatBot />
        <Footer />
      </div>
    );
  }

  /* ------------------------------
          MAIN COURSE LIST
  ------------------------------ */
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar removed because it's global */}

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Enrolled Courses</h1>

        {enrolledCourses.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No courses enrolled yet</h2>
            <p className="text-muted-foreground mb-6">
              Browse our catalog and enroll in a course.
            </p>
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
                  <p className="text-sm text-muted-foreground">
                    Progress: {course.progress}
                  </p>

                  {course.hasTakenTest && (
                    <div className="flex items-center gap-2 mt-2">
                      <Award className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">
                        Score: {course.testScore}%
                      </p>
                    </div>
                  )}
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
                    <div className="w-full p-2 text-center bg-muted rounded-md">
                      <Award className="h-4 w-4 text-primary inline-block mr-1" />
                      Final Score: {course.testScore}%
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

      <ChatBot />
      <Footer />
    </div>
  );
};

export default MyCourses;
