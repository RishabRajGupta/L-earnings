
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
}

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);

  // Sample categories
  const categories = ["Programming", "Web Development", "Data Science", "Design", "Marketing", "Business"];
  const levels = ["Beginner", "Intermediate", "Advanced"];

  // Sample course data
  const allCourses: Course[] = [
    {
      id: "1",
      title: "Python Programming Fundamentals",
      description: "Learn the basics of Python programming language and build your first applications.",
      price: 99.99,
      category: "Programming",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=600",
      rating: 4.8,
      duration: "6 weeks"
    },
    {
      id: "2",
      title: "Web Development Bootcamp",
      description: "Master HTML, CSS, and JavaScript to create modern and responsive websites.",
      price: 149.99,
      category: "Web Development",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600",
      rating: 4.9,
      duration: "10 weeks"
    },
    {
      id: "3",
      title: "Data Science with R",
      description: "Analyze data, create visualizations, and build predictive models using R.",
      price: 129.99,
      category: "Data Science",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600",
      rating: 4.7,
      duration: "8 weeks"
    },
    {
      id: "4",
      title: "UI/UX Design Principles",
      description: "Learn the fundamentals of user interface and user experience design.",
      price: 89.99,
      category: "Design",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
      rating: 4.5,
      duration: "4 weeks"
    },
    {
      id: "5",
      title: "Digital Marketing Strategy",
      description: "Develop comprehensive digital marketing strategies for business growth.",
      price: 119.99,
      category: "Marketing",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=600",
      rating: 4.6,
      duration: "6 weeks"
    },
    {
      id: "6",
      title: "Machine Learning Fundamentals",
      description: "Introduction to machine learning algorithms and their applications.",
      price: 149.99,
      category: "Data Science",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      rating: 4.9,
      duration: "12 weeks"
    },
  ];

  // Filter courses based on search and filters
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Explore Courses</h1>
          <p className="text-muted-foreground max-w-3xl">
            Browse our catalog of high-quality courses. Remember, with L-earnings, the better you perform, 
            the more of your course fee you'll get back!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search courses..." 
                      className="pl-8" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      {levels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range</label>
                  <div className="pt-4 px-2">
                    <Slider 
                      defaultValue={[0, 200]} 
                      max={200} 
                      step={5} 
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedLevel("all");
                    setPriceRange([0, 200]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Course listings */}
          <div className="lg:col-span-3">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Link key={course.id} to={`/courses/${course.id}`}>
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
                        <p className="text-sm mt-2">Duration: {course.duration}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
                        </div>
                        <div className="text-lg font-bold">${course.price.toFixed(2)}</div>
                      </CardFooter>
                    </Card>
                  </Link>
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
