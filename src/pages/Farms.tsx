import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileHeader } from "@/components/ui/mobile-header";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { mockFarms } from "@/data/mockData";
import { cn } from "@/lib/utils";

const Farms = () => {
  const navigate = useNavigate();
  const [selectedFarm, setSelectedFarm] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background pb-24">
      <MobileHeader title="Assigned Farms" showBack />
      
      <div className="p-4 space-y-4">
        {mockFarms.map((farm) => (
          <Card 
            key={farm.id} 
            className={cn(
              "p-4 cursor-pointer transition-colors",
              selectedFarm === farm.id ? "ring-2 ring-primary" : ""
            )}
            onClick={() => setSelectedFarm(farm.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{farm.name}</h3>
                  <p className="text-sm text-muted-foreground">GPS: {farm.gps}</p>
                  <p className="text-xs text-muted-foreground">Farmer: {farm.farmer}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <div className="status-dot status-active"></div>
                  <span className="text-xs font-medium">Active</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {farm.completedVisits}/{farm.assignedVisits} visits
                </p>
              </div>
            </div>
            
            {selectedFarm === farm.id && (
              <div className="mt-4 pt-4 border-t space-y-2">
                <Button 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/farms/${farm.id}`);
                  }}
                >
                  View Farm Details
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-28 right-4 z-40">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => navigate("/add-farmer")}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Farms;