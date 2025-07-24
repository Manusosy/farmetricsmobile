import { useState } from "react";
import { RefreshCw, Bell, Globe, Moon, HelpCircle, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MobileHeader } from "@/components/ui/mobile-header";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    syncEnabled: true,
    notificationsEnabled: true,
    language: "English",
    darkMode: false,
    syncFrequency: "24"
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting Updated",
      description: "Your preference has been saved",
    });
  };

  const settingItems = [
    {
      icon: RefreshCw,
      title: "Data Sync",
      subtitle: "Sync every 24 hours",
      type: "switch",
      key: "syncEnabled"
    },
    {
      icon: Bell,
      title: "Notifications",
      subtitle: "Receive updates and alerts",
      type: "switch",
      key: "notificationsEnabled"
    },
    {
      icon: Globe,
      title: "Language",
      subtitle: "English",
      type: "select",
      key: "language",
      options: ["English", "Twi", "Ga", "Ewe"]
    },
    {
      icon: Moon,
      title: "Theme",
      subtitle: "Dark",
      type: "switch",
      key: "darkMode"
    }
  ];

  const infoItems = [
    {
      icon: HelpCircle,
      title: "Help & Support",
      subtitle: "",
      action: () => toast({ title: "Help", description: "Contact support for assistance" })
    },
    {
      icon: Info,
      title: "About",
      subtitle: "",
      action: () => toast({ title: "About", description: "Farmetrics Field Officer App v1.0" })
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Settings" showBack />
      
      <div className="p-4 space-y-6">
        {/* App Settings */}
        <div className="space-y-4">
          {settingItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.key} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {item.type === "switch" ? (
                      <Switch
                        checked={settings[item.key as keyof typeof settings] as boolean}
                        onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
                      />
                    ) : item.type === "select" ? (
                      <Select 
                        value={settings[item.key as keyof typeof settings] as string}
                        onValueChange={(value) => handleSettingChange(item.key, value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {item.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : null}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Info Items */}
        <div className="space-y-4">
          {infoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="p-4">
                <button 
                  onClick={item.action}
                  className="w-full flex items-center gap-3 text-left"
                >
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">{item.title}</div>
                    {item.subtitle && (
                      <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                    )}
                  </div>
                </button>
              </Card>
            );
          })}
        </div>

        {/* App Version */}
        <Card className="p-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>Farmetrics Field Officer App</p>
            <p>Version 1.0.0</p>
            <p className="mt-2">© 2024 Farmetrics. All rights reserved.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;