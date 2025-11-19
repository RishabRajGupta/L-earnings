import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Clock, 
  Calendar, 
  BarChart3, 
  Star, 
  Award, 
  Check, 
  PiggyBank, 
  Landmark
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  level: string;
  image: string;
  rating: number;
  duration: string;
  lessons: number;
  students: number;
  instructor: {
    name: string;
    title: string;
    image: string;
  };
  objectives: string[];
  prerequisites: string[];
  syllabus: {
    title: string;
    lessons: { title: string; duration: string }[];
  }[];
}

// ---------------------------
//  STATIC COURSE DATA
// ---------------------------

const coursesData: Record<string, Course> = {
  "1": {
    id: "1",
    title: "Python Programming Fundamentals",
    description: "Learn the foundations of Python programming in this comprehensive course. You'll start with the basics and progress to building complete applications. Python is one of the most versatile and in-demand programming languages in the world, used for everything from web development to data science and machine learning.",
    price: 5999.99,
    category: "Programming",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=1200",
    rating: 4.8,
    duration: "6 weeks",
    lessons: 42,
    students: 1845,
    instructor: {
      name: "Dr. Alan Torres",
      title: "Senior Software Engineer & Educator",
      image: "https://i.pravatar.cc/150?img=3"
    },
    objectives: [
      "Understand Python syntax and basic programming concepts",
      "Work with Python data structures like lists, dictionaries, and tuples",
      "Create functions and use object-oriented programming principles",
      "Build real-world applications with Python",
      "Implement error handling and debugging techniques"
    ],
    prerequisites: [
      "No prior programming experience required",
      "Basic computer skills",
      "Computer with internet connection"
    ],
    syllabus: [
      {
        title: "Python Basics",
        lessons: [
          { title: "Introduction to Python", duration: "30 min" },
          { title: "Setting Up Your Environment", duration: "45 min" },
          { title: "Variables and Data Types", duration: "1 hr" },
          { title: "Basic Operations", duration: "1 hr" }
        ]
      },
      {
        title: "Control Structures",
        lessons: [
          { title: "Conditional Statements", duration: "1 hr" },
          { title: "Loops and Iterations", duration: "1.5 hrs" },
          { title: "Practice Exercises", duration: "2 hrs" }
        ]
      },
      {
        title: "Data Structures",
        lessons: [
          { title: "Lists and Arrays", duration: "1 hr" },
          { title: "Dictionaries", duration: "1 hr" },
          { title: "Sets and Tuples", duration: "1 hr" },
          { title: "Advanced Operations", duration: "1.5 hrs" }
        ]
      }
    ]
  },
  "2": {
    id: "2",
    title: "Web Development Bootcamp",
    description: "Master HTML, CSS, and JavaScript to create modern and responsive websites.",
    price: 8999.99,
    category: "Web Development",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200",
    rating: 4.9,
    duration: "10 weeks",
    lessons: 78,
    students: 2450,
    instructor: {
      name: "Sarah Johnson",
      title: "Full-Stack Developer",
      image: "https://i.pravatar.cc/150?img=5"
    },
    objectives: [
      "Build responsive websites with HTML5 and CSS3",
      "Create interactive web applications with JavaScript",
      "Implement modern frameworks like React",
      "Deploy websites to production servers",
      "Optimize websites for performance and SEO"
    ],
    prerequisites: [
      "Basic understanding of HTML and CSS",
      "Familiarity with basic programming concepts",
      "Computer with internet connection"
    ],
    syllabus: [
      {
        title: "HTML & CSS Foundations",
        lessons: [
          { title: "Modern HTML5 Structure", duration: "1 hr" },
          { title: "CSS Layout Systems", duration: "2 hrs" },
          { title: "Responsive Design Principles", duration: "1.5 hrs" }
        ]
      },
      {
        title: "JavaScript Essentials",
        lessons: [
          { title: "JavaScript Syntax", duration: "1 hr" },
          { title: "DOM Manipulation", duration: "2 hrs" },
          { title: "Event Handling", duration: "1.5 hrs" }
        ]
      },
      {
        title: "Frontend Frameworks",
        lessons: [
          { title: "Introduction to React", duration: "2 hrs" },
          { title: "Component-Based Architecture", duration: "1.5 hrs" },
          { title: "State Management", duration: "2 hrs" }
        ]
      }
    ]
  }
};

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = coursesData[id as string];
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();

  const [isEnrolled, setIsEnrolled] = React.useState(false);

  // Load enrollment state
  React.useEffect(() => {
    if (isLoggedIn && id) {
      const stored = localStorage.getItem("enrolledCourses");
      if (stored) {
        try {
          const arr = JSON.parse(stored);
          setIsEnrolled(arr.some((c: any) => c.id === id));
        } catch (e) {
          console.error("Failed parsing local storage:", e);
        }
      }
    }
  }, [isLoggedIn, id]);

  // Enroll handler
  const handleEnroll = () => {
    if (!isLoggedIn) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to enroll.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (isEnrolled) {
      navigate("/my-courses");
      return;
    }

    try {
      const stored = localStorage.getItem("enrolledCourses");
      const courses = stored ? JSON.parse(stored) : [];

      if (!courses.some((c: any) => c.id === id)) {
        courses.push({
          id,
          title: course.title,
          description: course.description,
          price: course.price,
          image: course.image,
          category: course.category,
          hasTakenTest: false,
          testScore: null,
          progress: "0%",
        });

        localStorage.setItem("enrolledCourses", JSON.stringify(courses));
        setIsEnrolled(true);

        toast({
          title: "Enrollment Successful!",
          description: `You're now enrolled in ${course.title}.`,
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Enrollment Failed",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  // Course not found
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container px-4 md:px-6 py-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
            <p className="mb-6">This course does not exist.</p>
            <Button asChild>
              <a href="/courses">Browse Courses</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* NO NAVBAR HERE — Navbar is global */}

      {/* Top section */}
      <div className="bg-muted py-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main course header */}
            <div className="lg:col-span-2">

              <div className="space-y-2">
                <Badge className="bg-primary/10 text-primary">{course.category}</Badge>
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <p className="text-muted-foreground">{course.description}</p>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating.toFixed(1)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>{course.duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <span>{course.level}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={course.instructor.image}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{course.instructor.name}</p>
                  <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                </div>
              </div>

            </div>

            {/* Sidebar card */}
            <div>
              <Card>
                <CardContent className="p-6">
                  
                  <div className="relative aspect-video w-full mb-4 rounded-lg overflow-hidden">
                    <img src={course.image} className="w-full h-full object-cover" />
                  </div>

                  <p className="text-3xl font-bold mb-2">₹{course.price.toFixed(2)}</p>

                  <div className="mt-2 flex items-center gap-2 text-primary">
                    <PiggyBank className="h-5 w-5" />
                    <p className="font-medium">Performance-based refund available</p>
                  </div>

                  <Button className="w-full mt-4" onClick={handleEnroll}>
                    {isEnrolled ? "Go to My Course" : "Enroll Now"}
                  </Button>

                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>

      {/* Tabs Area */}
      <main className="flex-1 container px-4 md:px-6 py-12">
        {/* Your full tabs logic remains unchanged */}
        {/* --------------- */}
        {/*   TABS SECTION */}
        {/* --------------- */}
        {/** (The rest of your Tabs component stays exactly the same) */}
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
