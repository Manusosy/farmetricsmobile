import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { MobileHeader } from "@/components/ui/mobile-header";
import { ghanaRegions } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const AddFarmer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    contactInfo: "",
    profilePhoto: "",
    region: "",
    district: "",
    location: "",
    numberOfFarms: "1"
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.gender || !formData.contactInfo) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Farmer Added",
        description: "New farmer has been added successfully and is awaiting approval",
      });
      setLoading(false);
      navigate("/farms");
    }, 1000);
  };

  const selectedRegion = ghanaRegions.find(r => r.name === formData.region);
  const selectedDistrict = selectedRegion?.districts.find(d => d.name === formData.district);

  const stepTitles = [
    "Personal Information",
    "Location Details", 
    "Farm Information",
    "Review & Submit"
  ];

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Add New Farmer" showBack />
      
      <div className="p-4 space-y-6">
        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full ${
                step === currentStep 
                  ? "bg-primary" 
                  : step < currentStep 
                  ? "bg-green-500" 
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <h2 className="text-xl font-semibold text-center">{stepTitles[currentStep - 1]}</h2>

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="form-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger className="form-field">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contact Info</label>
              <Input
                placeholder="Enter contact number"
                value={formData.contactInfo}
                onChange={(e) => handleInputChange("contactInfo", e.target.value)}
                className="form-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Profile Photo</label>
              <div className="form-field h-20 flex items-center justify-center border-2 border-dashed cursor-pointer">
                <span className="text-muted-foreground">Upload photo</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Location Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Region</label>
              <Select 
                value={formData.region} 
                onValueChange={(value) => handleInputChange("region", value)}
              >
                <SelectTrigger className="form-field">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  {ghanaRegions.map((region) => (
                    <SelectItem key={region.name} value={region.name}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">District</label>
              <Select 
                value={formData.district} 
                onValueChange={(value) => handleInputChange("district", value)}
                disabled={!formData.region}
              >
                <SelectTrigger className="form-field">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {selectedRegion?.districts.map((district) => (
                    <SelectItem key={district.name} value={district.name}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location/Community</label>
              <Select 
                value={formData.location} 
                onValueChange={(value) => handleInputChange("location", value)}
                disabled={!formData.district}
              >
                <SelectTrigger className="form-field">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {selectedDistrict?.locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 3: Farm Information */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Number of Farms</label>
              <Select 
                value={formData.numberOfFarms} 
                onValueChange={(value) => handleInputChange("numberOfFarms", value)}
              >
                <SelectTrigger className="form-field">
                  <SelectValue placeholder="Select number of farms" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} Farm{num > 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card className="p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Farm details can be added after the farmer is approved and assigned to your region.
              </p>
            </Card>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <Card className="p-4 space-y-4">
            <h3 className="font-medium">Review Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span>{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gender:</span>
                <span>{formData.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contact:</span>
                <span>{formData.contactInfo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Region:</span>
                <span>{formData.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">District:</span>
                <span>{formData.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span>{formData.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Farms:</span>
                <span>{formData.numberOfFarms}</span>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={handleBack}>
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>
          <Button onClick={handleNext} disabled={loading} className="bg-primary">
            {loading ? "Submitting..." : currentStep === 4 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddFarmer;