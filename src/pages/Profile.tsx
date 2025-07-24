import { useNavigate } from "react-router-dom";
import { Settings, MapPin, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MobileHeader } from "@/components/ui/mobile-header";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-24">
      <MobileHeader title="Profile" showBack />
      
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.role}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Assigned Region: {user.region}
              </p>
            </div>
          </div>
        </Card>

        {/* Account Details */}
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">Account Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Status</div>
                <div className={`text-sm capitalize ${
                  user.status === 'pending' ? 'text-yellow-600' : 
                  user.status === 'approved' ? 'text-green-600' : 
                  'text-red-600'
                }`}>
                  {user.status}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Region</div>
                <div className="text-sm text-muted-foreground">{user.region}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="font-medium">District</div>
                <div className="text-sm text-muted-foreground">{user.district}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium">{user.phone}</span>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">Settings</h3>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start p-3 h-auto"
            onClick={() => navigate("/settings")}
          >
            <Settings className="h-5 w-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">App Settings</div>
              <div className="text-sm text-muted-foreground">
                Notifications, sync, and preferences
              </div>
            </div>
          </Button>
        </Card>

        {/* Logout */}
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;