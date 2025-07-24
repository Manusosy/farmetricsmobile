import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MobileHeader } from "@/components/ui/mobile-header";
import { 
  cropTypes, 
  treeSpecies, 
  soilTypes, 
  farmHealthStatuses, 
  pestObservations, 
  humidityLevels, 
  cooperationStatuses,
  mockFarms 
} from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const FarmDetails = () => {
  const { farmId } = useParams();
  const navigate = useNavigate();
  const [activeVisit, setActiveVisit] = useState("1");
  const [formData, setFormData] = useState({
    cropType: "",
    treeSpecies: "",
    numberOfTrees: "",
    farmHealth: "",
    pestObservation: "",
    soilType: "",
    humidity: "",
    cooperationStatus: "",
    comments: "",
    visitDate: new Date().toISOString().split('T')[0]
  });

  const farm = mockFarms.find(f => f.id === farmId);
  
  if (!farm) {
    return <div>Farm not found</div>;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCapturePolygon = () => {
    toast({
      title: "Polygon Capture",
      description: "Polygon capture feature would be implemented with mapping SDK",
    });
  };

  const handleCaptureMedia = () => {
    toast({
      title: "Media Capture",
      description: "Camera functionality would be implemented with device camera API",
    });
  };

  const handleSaveVisit = () => {
    toast({
      title: "Visit Saved",
      description: `Visit ${activeVisit} data saved successfully`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Farm Visit Details" showBack />
      
      <div className="p-4 space-y-6">
        {/* Farm Info */}
        <Card className="p-4">
          <h3 className="font-semibold mb-2">{farm.name}</h3>
          <p className="text-sm text-muted-foreground">GPS: {farm.gps}</p>
          <p className="text-sm text-muted-foreground">Farmer: {farm.farmer}</p>
        </Card>

        {/* Visit Tabs */}
        <Tabs value={activeVisit} onValueChange={setActiveVisit}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="1">Visit 1</TabsTrigger>
            <TabsTrigger value="2">Visit 2</TabsTrigger>
            <TabsTrigger value="3">Visit 3</TabsTrigger>
            <TabsTrigger value="4">Visit 4</TabsTrigger>
          </TabsList>

          <TabsContent value={activeVisit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Crop Type</label>
                <Select value={formData.cropType} onValueChange={(value) => handleInputChange("cropType", value)}>
                  <SelectTrigger className="form-field">
                    <SelectValue placeholder="Select Crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropTypes.map((crop) => (
                      <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tree Species</label>
                <Select value={formData.treeSpecies} onValueChange={(value) => handleInputChange("treeSpecies", value)}>
                  <SelectTrigger className="form-field">
                    <SelectValue placeholder="Select Species" />
                  </SelectTrigger>
                  <SelectContent>
                    {treeSpecies.map((species) => (
                      <SelectItem key={species} value={species}>{species}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Number of Trees</label>
              <Input
                type="number"
                placeholder="Enter Count"
                value={formData.numberOfTrees}
                onChange={(e) => handleInputChange("numberOfTrees", e.target.value)}
                className="form-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Farm Health Status</label>
              <Select value={formData.farmHealth} onValueChange={(value) => handleInputChange("farmHealth", value)}>
                <SelectTrigger className="form-field">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {farmHealthStatuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pests/Disease Observation</label>
              <Select value={formData.pestObservation} onValueChange={(value) => handleInputChange("pestObservation", value)}>
                <SelectTrigger className="form-field">
                  <SelectValue placeholder="Select Observation" />
                </SelectTrigger>
                <SelectContent>
                  {pestObservations.map((observation) => (
                    <SelectItem key={observation} value={observation}>{observation}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Soil Type</label>
              <Select value={formData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
                <SelectTrigger className="form-field">
                  <SelectValue placeholder="Select Soil Type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Humidity</label>
              <Select value={formData.humidity} onValueChange={(value) => handleInputChange("humidity", value)}>
                <SelectTrigger className="form-field">
                  <SelectValue placeholder="Select Humidity" />
                </SelectTrigger>
                <SelectContent>
                  {humidityLevels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Farmer Cooperation Status</label>
              <Select value={formData.cooperationStatus} onValueChange={(value) => handleInputChange("cooperationStatus", value)}>
                <SelectTrigger className="form-field">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {cooperationStatuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Comments</label>
              <Textarea
                placeholder="Enter Comments"
                value={formData.comments}
                onChange={(e) => handleInputChange("comments", e.target.value)}
                className="form-field min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date of Visit</label>
              <Input
                type="date"
                value={formData.visitDate}
                onChange={(e) => handleInputChange("visitDate", e.target.value)}
                className="form-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={handleCapturePolygon}>
                Capture Polygon
              </Button>
              <Button onClick={handleCaptureMedia} className="bg-primary">
                Capture Media
              </Button>
            </div>

            <Button onClick={handleSaveVisit} className="btn-primary">
              Save Visit Data
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmDetails;