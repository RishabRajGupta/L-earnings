import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { FileText, Book, Award, PiggyBank, Layout } from "lucide-react";

const Dashboard = () => {
  const { isLoggedIn, userInfo } = useAuth();
  const navigate = useNavigate();
  
  // Mock data with rupee values
  const enrolledCoursesCount = 2;
  const completedCoursesCount = 1;
  const totalRefund = 7499;
  const avgTestScore = 85;
  
  const chartData = [
    { name: "Completed", value: completedCoursesCount },
    { name: "In Progress", value: enrolledCoursesCount - completedCoursesCount },
  ];
  
  const COLORS = ["#10b981", "#6366f1"];

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {userInfo?.name || "Student"}!</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate("/my-courses")}>
              <Layout className="mr-2 h-4 w-4" />
              My Courses
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Enrolled Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Book className="h-5 w-5 text-primary mr-2" />
                <div className="text-2xl font-bold">{enrolledCoursesCount}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-primary mr-2" />
                <div className="text-2xl font-bold">{completedCoursesCount}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Test Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-primary mr-2" />
                <div className="text-2xl font-bold">{avgTestScore}%</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Refund
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PiggyBank className="h-5 w-5 text-primary mr-2" />
                <div className="text-2xl font-bold">₹{totalRefund.toFixed(2)}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Completed Final Test</p>
                    <p className="text-sm text-muted-foreground">Web Development Bootcamp</p>
                    <p className="text-sm text-muted-foreground">Score: 85%</p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    2 days ago
                  </div>
                </div>
                
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Book className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Enrolled in Course</p>
                    <p className="text-sm text-muted-foreground">Introduction to React</p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    1 week ago
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <PiggyBank className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Refund Processed</p>
                    <p className="text-sm text-muted-foreground">Web Development Bootcamp</p>
                    <p className="text-sm text-muted-foreground">Amount: ₹149.99</p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    1 week ago
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
