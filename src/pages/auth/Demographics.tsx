import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MobileHeader } from "@/components/ui/mobile-header";
import { ghanaRegions } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const Demographics = () => {
  const [formData, setFormData] = useState({
    gender: "",
    region: "",
    district: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const selectedRegion = ghanaRegions.find(r => r.name === formData.region);
  const selectedDistrict = selectedRegion?.districts.find(d => d.name === formData.district);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gender || !formData.region || !formData.district || !formData.location) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Combine with previous registration data
    const previousData = JSON.parse(sessionStorage.getItem("registrationData") || "{}");
    const completeData = { ...previousData, ...formData };
    sessionStorage.setItem("registrationData", JSON.stringify(completeData));
    
    setTimeout(() => {
      setLoading(false);
      navigate("/confirmation");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Demographics" showBack />
      
      <div className="p-4 space-y-6">
        <form onSubmit={handleNext} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
              <SelectTrigger className="form-field">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Region</label>
            <Select 
              value={formData.region} 
              onValueChange={(value) => setFormData(prev => ({ 
                ...prev, 
                region: value, 
                district: "", 
                location: "" 
              }))}
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
              onValueChange={(value) => setFormData(prev => ({ 
                ...prev, 
                district: value, 
                location: "" 
              }))}
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
              onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
              disabled={!formData.district}
            >
              <SelectTrigger className="form-field">
                <SelectValue placeholder="Select Location/Community" />
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

          <div className="pt-4">
            <Button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Demographics;