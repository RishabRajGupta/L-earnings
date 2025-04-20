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
          {[
            { icon: Book, title: "Enrolled Courses", value: enrolledCoursesCount },
            { icon: Award, title: "Completed Courses", value: completedCoursesCount },
            { icon: FileText, title: "Average Test Score", value: `${avgTestScore}%` },
            { icon: PiggyBank, title: "Total Refund", value: `₹${totalRefund.toFixed(2)}` }
          ].map((item, index) => (
            <Card key={index} className="glass hover-scale hover-glow animate-scale-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 text-primary mr-2" />
                  <div className="text-2xl font-bold">{item.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 glass hover-glow">
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

          <Card className="lg:col-span-2 glass hover-glow">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: FileText,
                    title: "Completed Final Test",
                    subtitle: "Web Development Bootcamp",
                    detail: "Score: 85%",
                    time: "2 days ago"
                  },
                  {
                    icon: Book,
                    title: "Enrolled in Course",
                    subtitle: "Introduction to React",
                    time: "1 week ago"
                  },
                  {
                    icon: PiggyBank,
                    title: "Refund Processed",
                    subtitle: "Web Development Bootcamp",
                    detail: "Amount: ₹149.99",
                    time: "1 week ago"
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0 transition-all duration-200 hover:bg-white/5 p-4 rounded-lg">
                    <div className="rounded-full bg-primary/10 p-2">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.subtitle}</p>
                      {activity.detail && (
                        <p className="text-sm text-muted-foreground">{activity.detail}</p>
                      )}
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                ))}
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
