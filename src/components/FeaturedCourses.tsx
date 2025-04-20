
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  level: string;
  image: string;
  rating: number;
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
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
          <h3 className="text-xl font-bold leading-tight mt-2">{course.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
          </div>
          <div className="text-lg font-bold">₹{course.price.toFixed(2)}</div>
        </CardFooter>
      </Card>
    </Link>
  );
};

const FeaturedCourses: React.FC = () => {
  // Sample course data with updated prices
  const courses: Course[] = [
    {
      id: "1",
      title: "Python Programming Fundamentals",
      description: "Learn the basics of Python programming language and build your first applications.",
      price: 5999.99,
      category: "Programming",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=600",
      rating: 4.8
    },
    {
      id: "2",
      title: "Web Development Bootcamp",
      description: "Master HTML, CSS, and JavaScript to create modern and responsive websites.",
      price: 8999.99,
      category: "Web Development",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600",
      rating: 4.9
    },
    {
      id: "3",
      title: "Data Science with R",
      description: "Analyze data, create visualizations, and build predictive models using R.",
      price: 7599.99,
      category: "Data Science",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600",
      rating: 4.7
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Featured Courses
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Discover Top Courses
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Explore our most popular courses and start your learning journey today.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link to="/courses">
            <Badge className="px-6 py-3 text-lg cursor-pointer" variant="outline">
              View All Courses
            </Badge>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
