
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

// Mock data - In a real app, this would come from your backend
const mockEnrolledCourses = [
  {
    id: 1,
    title: "Introduction to React",
    progress: "80%",
    hasTakenTest: false
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    progress: "60%",
    hasTakenTest: false
  }
];

const MyCourses = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

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
              <CardFooter>
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
