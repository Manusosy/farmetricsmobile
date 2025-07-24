import { ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  showSettings?: boolean;
  onSettingsClick?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  showBack = false,
  showSettings = false,
  onSettingsClick
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 bg-card border-b">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      </div>
      
      {showSettings && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onSettingsClick}
          className="p-2"
        >
          <Settings className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};