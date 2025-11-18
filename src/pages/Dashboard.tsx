import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { FileText, Book, Award, PiggyBank, Layout } from "lucide-react";

const Dashboard = () => {
  const { isLoggedIn, userInfo } = useAuth();
  const navigate = useNavigate();

  const [enrolledCoursesCount, setEnrolledCoursesCount] = React.useState(0);
  const [completedCoursesCount, setCompletedCoursesCount] = React.useState(0);
  const [totalRefund, setTotalRefund] = React.useState(0);
  const [avgTestScore, setAvgTestScore] = React.useState(0);
  const [recentActivity, setRecentActivity] = React.useState([]);

  const [chartData, setChartData] = React.useState([
    { name: "Completed", value: 0 },
    { name: "In Progress", value: 0 },
  ]);

  const COLORS = ["#10b981", "#6366f1"];

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    loadDashboardData();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isLoggedIn, navigate]);

  const handleStorageChange = () => {
    loadDashboardData();
  };

  const loadDashboardData = () => {
    try {
      const storedCoursesString = localStorage.getItem("enrolledCourses");

      if (storedCoursesString) {
        const storedCourses = JSON.parse(storedCoursesString);

        const enrolled = storedCourses.length;
        const completed = storedCourses.filter((course: any) => course.hasTakenTest).length;

        let totalRefundAmount = 0;
        let totalScoreSum = 0;
        let testsTaken = 0;

        storedCourses.forEach((course: any) => {
          if (course.hasTakenTest && course.testScore !== null) {
            const coursePrice = course.price || 0;
            const refundAmount = (course.testScore / 100) * coursePrice;
            totalRefundAmount += refundAmount;

            totalScoreSum += course.testScore;
            testsTaken++;
          }
        });

        const avgScore = testsTaken > 0 ? Math.round(totalScoreSum / testsTaken) : 0;

        setEnrolledCoursesCount(enrolled);
        setCompletedCoursesCount(completed);
        setTotalRefund(totalRefundAmount);
        setAvgTestScore(avgScore);

        setChartData([
          { name: "Completed", value: completed },
          { name: "In Progress", value: enrolled - completed },
        ]);

        const testCompletions = storedCourses
          .filter((course: any) => course.hasTakenTest)
          .map((course: any) => ({
            icon: FileText,
            title: "Completed Final Test",
            subtitle: course.title,
            detail: `Score: ${course.testScore}%`,
            time: "Recently",
          }));

        const enrollments = storedCourses.map((course: any) => ({
          icon: Book,
          title: "Enrolled in Course",
          subtitle: course.title,
          time: "Recently",
        }));

        const refunds = storedCourses
          .filter((course: any) => course.hasTakenTest)
          .map((course: any) => ({
            icon: PiggyBank,
            title: "Refund Processed",
            subtitle: course.title,
            detail: `Amount: ₹${((course.testScore / 100) * (course.price || 0)).toFixed(2)}`,
            time: "Recently",
          }));

        setRecentActivity([...testCompletions, ...enrollments, ...refunds].slice(0, 5));
      } else {
        setEnrolledCoursesCount(0);
        setCompletedCoursesCount(0);
        setTotalRefund(0);
        setAvgTestScore(0);
        setChartData([
          { name: "Completed", value: 0 },
          { name: "In Progress", value: 0 },
        ]);
        setRecentActivity([]);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar removed because it's global now */}

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {userInfo?.name || "Student"}!</p>
          </div>

          <Button onClick={() => navigate("/my-courses")} className="mt-4 md:mt-0">
            <Layout className="mr-2 h-4 w-4" />
            My Courses
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Book, title: "Enrolled Courses", value: enrolledCoursesCount },
            { icon: Award, title: "Completed Courses", value: completedCoursesCount },
            { icon: FileText, title: "Average Test Score", value: `${avgTestScore}%` },
            { icon: PiggyBank, title: "Total Refund", value: `₹${totalRefund.toFixed(2)}` },
          ].map((item, index) => (
            <Card key={index} className="glass hover-scale hover-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">{item.title}</CardTitle>
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
          {/* Progress chart */}
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
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent activity */}
          <Card className="lg:col-span-2 glass hover-glow">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0 hover:bg-white/5 p-4 rounded-lg"
                    >
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
                      <div className="ml-auto text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No recent activity</p>
                    <Button variant="outline" onClick={() => navigate("/courses")} className="mt-4">
                      Browse Courses
                    </Button>
                  </div>
                )}
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
