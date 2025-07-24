import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { MobileHeader } from "@/components/ui/mobile-header";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { useAuth } from "@/contexts/AuthContext";
import { mockFarms } from "@/data/mockData";

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const totalAssignedFarms = mockFarms.length;
  const totalCompletedVisits = mockFarms.reduce((sum, farm) => sum + farm.completedVisits, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader 
        title="Home" 
        showSettings 
        onSettingsClick={() => navigate("/settings")}
      />
      
      <div className="p-4 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome, {user.name.split(' ')[0]}!</h2>
          <p className="text-muted-foreground">
            Your assigned region is the {user.region}.
          </p>
        </div>

        {user.status === "pending" && (
          <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 bg-yellow-500 rounded-full opacity-80"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Account Pending Approval</h3>
                <p className="text-sm text-muted-foreground">
                  Your account is currently under review. You will be notified once it's approved.
                </p>
              </div>
            </div>
          </Card>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Assigned Farms
              </h4>
              <p className="text-3xl font-bold text-primary">{totalAssignedFarms}</p>
            </Card>
            
            <Card className="p-4 text-center">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Completed Visits
              </h4>
              <p className="text-3xl font-bold text-primary">{totalCompletedVisits}</p>
            </Card>
          </div>
        </div>

        {user.status === "approved" && (
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigate("/farms")}
                className="w-full p-3 text-left border rounded-lg hover:bg-muted transition-colors"
              >
                <div className="font-medium">View Assigned Farms</div>
                <div className="text-sm text-muted-foreground">
                  See your farm assignments and visit progress
                </div>
              </button>
              
              <button 
                onClick={() => navigate("/my-visits")}
                className="w-full p-3 text-left border rounded-lg hover:bg-muted transition-colors"
              >
                <div className="font-medium">My Visits</div>
                <div className="text-sm text-muted-foreground">
                  Review completed visit reports
                </div>
              </button>
            </div>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;