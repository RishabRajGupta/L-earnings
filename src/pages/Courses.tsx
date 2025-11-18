import React, { useState } from "react";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  materials?: any[];
}

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [priceRange, setPriceRange] = useState([5000, 10000]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = ["Programming", "Web Development", "Data Science", "Design", "Marketing", "Business"];
  const levels = ["Beginner", "Intermediate", "Advanced"];

  const allCourses: Course[] = [
    // --- your existing courses data unchanged ---
  ];

  const handleEnrollCourse = (course: Course) => {
    try {
      const storedCoursesString = localStorage.getItem('enrolledCourses');
      let storedCourses = [];

      if (storedCoursesString) storedCourses = JSON.parse(storedCoursesString);

      const isAlreadyEnrolled = storedCourses.some(
        (enrolledCourse: any) => enrolledCourse.id === course.id
      );

      if (isAlreadyEnrolled) {
        toast({
          title: "Already Enrolled",
          description: `You're already enrolled in ${course.title}`,
        });
        return;
      }

      const courseToAdd = {
        id: course.id,
        title: course.title,
        price: course.price,
        progress: "0%",
        hasTakenTest: false,
        testScore: null,
        description: course.description,
        materials: course.materials || [],
        category: course.category,
        image: course.image
      };

      storedCourses.push(courseToAdd);
      localStorage.setItem("enrolledCourses", JSON.stringify(storedCourses));
      window.dispatchEvent(new Event("storage"));

      toast({
        title: "Enrollment Successful",
        description: `You've successfully enrolled in ${course.title}`,
      });

      navigate("/my-courses");
    } catch (error) {
      console.error("Enrollment error:", error);
      toast({
        title: "Error",
        description: "Failed to enroll in course",
        variant: "destructive",
      });
    }
  };

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;

    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;

    const matchesPrice =
      course.price >= priceRange[0] && course.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar is global — removed here */}

      <main className="flex-1 container px-4 md:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Explore Courses</h1>
          <p className="text-muted-foreground max-w-3xl">
            Browse our catalog of high-quality courses. With L-earnings, the better you perform, 
            the more of your course fee you'll get back!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* --- Filters sidebar (unchanged) --- */}

          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h2>

              {/* Search, Category, Level, Price — unchanged */}
              {/* ... */}
            </div>
          </div>

          {/* --- Courses grid --- */}
          <div className="lg:col-span-3">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {filteredCourses.map(course => (
                  <Card key={course.id} className="h-full overflow-hidden hover:shadow-md">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover hover:scale-105 transition"
                      />
                    </div>

                    <CardHeader className="p-4 pb-0">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          {course.category}
                        </Badge>
                        <Badge variant="outline" className="bg-muted">
                          {course.level}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mt-2">{course.title}</h3>
                    </CardHeader>

                    <CardContent className="p-4 pt-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                      <p className="text-sm mt-2">Duration: {course.duration}</p>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {course.rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-lg font-bold">
                          ₹{course.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="w-full flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => navigate(`/courses/${course.id}`)}
                        >
                          Details
                        </Button>

                        <Button
                          className="flex-1"
                          onClick={() => handleEnrollCourse(course)}
                        >
                          Enroll
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
