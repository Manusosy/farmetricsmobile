import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MobileHeader } from "@/components/ui/mobile-header";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { mockVisits } from "@/data/mockData";

const MyVisits = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVisits = mockVisits.filter(visit =>
    visit.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.date.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <MobileHeader title="My Visits" showBack />
      
      <div className="p-4 space-y-4">
        <div>
          <Input
            placeholder="Search by farm name or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-field"
          />
        </div>

        {filteredVisits.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">No visits found</h3>
              <p className="text-sm">No visits match your search criteria.</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredVisits.map((visit) => (
              <Card 
                key={visit.id} 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/visits/${visit.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{visit.farmName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{visit.date}</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Visit:</span>
                        <span>#{visit.visitNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Crop:</span>
                        <span>{visit.cropType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Trees:</span>
                        <span>{visit.numberOfTrees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Health:</span>
                        <span className={`font-medium ${
                          visit.farmHealth === 'Good' ? 'text-green-600' : 
                          visit.farmHealth === 'Fair' ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}>
                          {visit.farmHealth}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                {visit.notes && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {visit.notes}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default MyVisits;