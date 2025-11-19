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
import { User, Phone, MapPin, Calendar, Clock, PiggyBank } from "lucide-react";

const GET_PROFILE_URL =
  "https://29awwpy12k.execute-api.us-east-1.amazonaws.com/newStage/profile";

const SAVE_PROFILE_URL =
  "https://3l0qi6u7nc.execute-api.us-east-1.amazonaws.com/newStage2/profile";

const Profile = () => {
  const { isLoggedIn, userInfo } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // ✔ Cognito userId (sub is unique)
  const userId = userInfo?.sub;

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // ------------------------------
  // 🔹 GET PROFILE FROM API
  // ------------------------------
  React.useEffect(() => {
    if (!isLoggedIn) return navigate("/login");

    fetch(`${GET_PROFILE_URL}?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name || userInfo?.name || "",
          email: data.email || userInfo?.email || "",
          phone: data.phone || "",
          address: data.address || "",
          bio: data.bio || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile load error:", err);
        setLoading(false);
      });
  }, [isLoggedIn, navigate, userId, userInfo]);

  // ------------------------------
  // 🔹 SAVE PROFILE TO API
  // ------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      userId,
      ...formData,
    };

    const res = await fetch(SAVE_PROFILE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    await res.json();

    toast({
      title: "Profile Updated",
      description: "Your profile was saved successfully.",
    });

    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* -------- LEFT PANEL -------- */}
          <div>
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-14 w-14 text-primary" />
                  </div>
                </div>
                <CardTitle>{formData.name}</CardTitle>
                <CardDescription>{formData.email}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formData.phone || "No phone"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {formData.address || "No address"}
                  </span>
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

          {/* -------- RIGHT PANEL - FORM -------- */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        name="name"
                        disabled={!isEditing}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input
                        name="email"
                        type="email"
                        disabled={!isEditing}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div>
                      <Label>Phone</Label>
                      <Input
                        name="phone"
                        disabled={!isEditing}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div>
                      <Label>Address</Label>
                      <Input
                        name="address"
                        disabled={!isEditing}
                        value={formData.address}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Bio</Label>
                    <Input
                      name="bio"
                      disabled={!isEditing}
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {isEditing ? (
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save</Button>
                    </div>
                  ) : (
                    <CardFooter className="flex justify-end">
                      <Button onClick={() => setIsEditing(true)}>
                        Edit
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
