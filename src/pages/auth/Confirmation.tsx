import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MobileHeader } from "@/components/ui/mobile-header";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Confirmation = () => {
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem("registrationData");
    if (data) {
      setRegistrationData(JSON.parse(data));
    } else {
      navigate("/register");
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!acceptTerms) {
      toast({
        title: "Error",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const success = await register(registrationData);
      if (success) {
        sessionStorage.removeItem("registrationData");
        toast({
          title: "Registration Successful!",
          description: "Your account has been created and is pending approval",
        });
        navigate("/home");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!registrationData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Confirmation" showBack />
      
      <div className="p-4 space-y-6">
        <Card className="p-4 space-y-4">
          <h3 className="font-medium text-lg">Review Your Information</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">{registrationData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{registrationData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium">{registrationData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gender:</span>
              <span className="font-medium">{registrationData.gender}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Region:</span>
              <span className="font-medium">{registrationData.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">District:</span>
              <span className="font-medium">{registrationData.district}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">{registrationData.location}</span>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="terms" 
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <label htmlFor="terms" className="text-sm leading-relaxed">
              I agree to the terms and conditions and privacy policy. I understand that my account will be reviewed and approved by an administrator before I can begin field work.
            </label>
          </div>

          <Button 
            onClick={handleSubmit}
            className="btn-primary"
            disabled={loading || !acceptTerms}
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;