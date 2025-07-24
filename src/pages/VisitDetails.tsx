import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { MobileHeader } from "@/components/ui/mobile-header";
import { mockVisits } from "@/data/mockData";

const VisitDetails = () => {
  const { visitId } = useParams();
  const visit = mockVisits.find(v => v.id === visitId) || mockVisits[0]; // Fallback to first visit for demo

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Visit Details" showBack />
      
      <div className="p-4 space-y-6">
        {/* Visit Information */}
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">Visit Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Visit Date</span>
              <span className="font-medium">{visit.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Farm Name</span>
              <span className="font-medium">{visit.farmName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Visit Number</span>
              <span className="font-medium">Visit #{visit.visitNumber}</span>
            </div>
          </div>
        </Card>

        {/* Crop Details */}
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">Crop Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Crop Type</span>
              <span className="font-medium">{visit.cropType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tree Species</span>
              <span className="font-medium">{visit.treeSpecies}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Number of Trees</span>
              <span className="font-medium">{visit.numberOfTrees}</span>
            </div>
          </div>
        </Card>

        {/* Farm Health */}
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">Farm Health</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Overall Health</span>
              <span className="font-medium">{visit.farmHealth}</span>
            </div>
            <div className="border-t pt-3">
              <span className="text-muted-foreground">Notes</span>
              <p className="mt-1 text-foreground">{visit.notes}</p>
            </div>
          </div>
        </Card>

        {/* Images */}
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">Images</h3>
          <div className="grid grid-cols-2 gap-4">
            {visit.images.map((image, index) => (
              <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <span className="text-sm text-green-800">Farm Image {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Farm Polygon */}
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">Farm Polygon</h3>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
              <span className="text-sm text-green-800">Farm Boundary Map</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VisitDetails;