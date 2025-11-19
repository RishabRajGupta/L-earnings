import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, MapPin, Clock, PiggyBank } from "lucide-react";

// ✅ YOUR API ENDPOINTS
const GET_PROFILE_URL =
  "https://29awwpy12k.execute-api.us-east-1.amazonaws.com/newStage/profile";
const SAVE_PROFILE_URL =
  "https://3l0qi6u7nc.execute-api.us-east-1.amazonaws.com/newStage2/profile";

const Profile = () => {
  const { isLoggedIn, userInfo } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // ⚠ CRUCIAL — unique stable ID for DynamoDB
  const userId = userInfo?.sub || userInfo?.email;

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // ----------------------------------------------------------------
  // ✅ FETCH PROFILE (GET from API Gateway → Lambda → DynamoDB)
  // ----------------------------------------------------------------
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!userId) return;

    fetch(`${GET_PROFILE_URL}?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          bio: data.bio || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("GET profile error:", err);
        setLoading(false);
      });
  }, [isLoggedIn, navigate, userId]);

  // ----------------------------------------------------------------
  // ✅ SAVE PROFILE (POST to API Gateway → Lambda → DynamoDB)
  // ----------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = { userId, ...formData };

    try {
      const res = await fetch(SAVE_PROFILE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      toast({
        title: "Profile Saved",
        description: "Your profile has been updated.",
      });

      setIsEditing(false);
    } catch (error) {
      console.error("SAVE profile error:", error);
      toast({
        title: "Error",
        description: "Could not save profile.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar removed — global */}

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDEBAR */}
          <div>
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-14 w-14 text-primary" />
                  </div>
                </div>
                <CardTitle>{formData.name || "No Name"}</CardTitle>
                <CardDescription>{formData.email || "No Email"}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formData.phone || "No phone"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formData.address || "No address"}</span>
                </div>
              </CardContent>

              <Separator />

              <CardContent className="pt-4 space-y-4">
                <h3 className="text-sm font-semibold">Learning Stats</h3>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Courses Enrolled: 0</span>
                </div>

                <div className="flex items-center gap-3">
                  <PiggyBank className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Refund Earned: ₹0</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE — EDIT FORM */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* GRID FIELDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        name="name"
                        value={formData.name}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label>Phone</Label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label>Address</Label>
                      <Input
                        name="address"
                        value={formData.address}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Bio</Label>
                    <Input
                      name="bio"
                      value={formData.bio}
                      disabled={!isEditing}
                      onChange={handleInputChange}
                    />
                  </div>

                  {isEditing ? (
                    <div className="flex justify-end gap-2 mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  ) : (
                    <CardFooter className="flex justify-end">
                      <Button onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    </CardFooter>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
