import {
  DialogWrapper,
  AnimatedTextBlockWrapper,
} from "@/components/DialogWrapper";
import { cn } from "@/utils";
import { useAtom, useAtomValue } from "jotai";
// import { getDefaultStore } from "jotai"; // Not needed since settingsAtom is now derived
import { settingsAtom, settingsSavedAtom } from "@/store/settings";
import { screenAtom } from "@/store/screens";
import { X } from "lucide-react";
import * as React from "react";
import { apiTokenAtom } from "@/store/tokens";

// Button Component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "ghost" | "outline";
    size?: "icon";
  }
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
        {
          "border border-input bg-transparent hover:bg-accent":
            variant === "outline",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "size-10": size === "icon",
        },
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Input Component
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Textarea Component
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

// Switch Component
const Switch = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      role="switch"
      className={cn(
        "peer h-6 w-11 rounded-full bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Switch.displayName = "Switch";

// Label Component
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
});
Label.displayName = "Label";

// Select Component
const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Select.displayName = "Select";

export const Settings: React.FC = () => {
  const currentSettings = useAtomValue(settingsAtom);
  const [settings, setSettings] = React.useState(currentSettings);
  const [, setScreenState] = useAtom(screenAtom);
  const [token, setToken] = useAtom(apiTokenAtom);
  const [, setSettingsSaved] = useAtom(settingsSavedAtom);

  const languages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Italian", value: "it" },
    { label: "Portuguese", value: "pt" },
  ];

  const interruptSensitivities = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const handleClose = () => {
    setScreenState({
      currentScreen: token ? "instructions" : "intro",
    });
  };

  const handleSave = async () => {
    console.log("Current settings before save:", settings);

    // Create a new settings object to ensure we have a fresh reference
    const updatedSettings = {
      ...settings,
      greeting: settings.greeting, // explicitly set the greeting
    };

    // Save to localStorage
    localStorage.setItem("tavus-settings", JSON.stringify(updatedSettings));

    // Note: settingsAtom is now derived from angelProfile + characterCard
    // So we don't need to set it directly - it updates automatically
    // const store = getDefaultStore();
    // store.set(settingsAtom, updatedSettings);

    // Wait a moment to ensure the store is updated
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Check localStorage
    const storedSettings = localStorage.getItem("tavus-settings");

    console.log(
      "Settings in localStorage:",
      JSON.parse(storedSettings || "{}"),
    );

    setSettingsSaved(true);
    handleClose();
  };

  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <div className="relative w-full max-w-2xl">
          <div className="sticky top-0 z-10 pb-6 pt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="absolute right-0 top-8"
            >
              <X className="size-6" />
            </Button>

            <h2 className="text-2xl font-bold text-white">Settings</h2>
          </div>

          <div className="-mr-4 h-[calc(100vh-500px)] overflow-y-auto pr-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={settings.name}
                  onChange={(e) =>
                    setSettings({ ...settings, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="font-mono bg-black/20"
                  style={{ fontFamily: "'Source Code Pro', monospace" }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  id="language"
                  value={settings.language}
                  onChange={(e) =>
                    setSettings({ ...settings, language: e.target.value })
                  }
                  className="font-mono bg-black/20"
                  style={{ fontFamily: "'Source Code Pro', monospace" }}
                >
                  {languages.map((lang) => (
                    <option
                      key={lang.value}
                      value={lang.value}
                      className="font-mono bg-black text-white"
                      style={{ fontFamily: "'Source Code Pro', monospace" }}
                    >
                      {lang.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interruptSensitivity">
                  Interrupt Sensitivity
                </Label>
                <Select
                  id="interruptSensitivity"
                  value={settings.interruptSensitivity}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      interruptSensitivity: e.target.value,
                    })
                  }
                  className="font-mono bg-black/20"
                  style={{ fontFamily: "'Source Code Pro', monospace" }}
                >
                  {interruptSensitivities.map((sensitivity) => (
                    <option
                      key={sensitivity.value}
                      value={sensitivity.value}
                      className="font-mono bg-black text-white"
                      style={{ fontFamily: "'Source Code Pro', monospace" }}
                    >
                      {sensitivity.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="greeting">Custom Greeting</Label>
                <Input
                  id="greeting"
                  value={settings.greeting}
                  onChange={(e) =>
                    setSettings({ ...settings, greeting: e.target.value })
                  }
                  placeholder="Enter custom greeting"
                  className="font-mono bg-black/20"
                  style={{ fontFamily: "'Source Code Pro', monospace" }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Custom Context</Label>
                <Textarea
                  id="context"
                  value={settings.context}
                  onChange={(e) =>
                    setSettings({ ...settings, context: e.target.value })
                  }
                  placeholder="Paste or type custom context"
                  className="font-mono min-h-[100px] bg-black/20"
                  style={{ fontFamily: "'Source Code Pro', monospace" }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="persona">Set Custom Persona ID</Label>
                <Input
                  id="persona"
                  value={settings.persona}
                  onChange={(e) =>
                    setSettings({ ...settings, persona: e.target.value })
                  }
                  placeholder="p2fbd605"
                  className="font-mono bg-black/20"
                  style={{ fontFamily: "'Source Code Pro', monospace" }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="replica">Set Custom Replica ID</Label>
                <Input
                  id="replica"
                  value={settings.replica}
                  onChange={(e) =>
                    setSettings({ ...settings, replica: e.target.value })
                  }
                  placeholder="rfb51183fe"
                  className="font-mono bg-black/20"
                  style={{ fontFamily: "'Source Code Pro', monospace" }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiToken">API Token</Label>
                <Input
                  id="apiToken"
                  type="password"
                  value={token || ""}
                  onChange={(e) => {
                    const newToken = e.target.value;
                    setToken(newToken);
                    localStorage.setItem("tavus-token", newToken);
                  }}
                  placeholder="Enter Tavus API Key"
                  className="font-mono bg-black/20"
                  style={{ fontFamily: "'Source Code Pro', monospace" }}
                />
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 mt-6 border-t border-gray-700 pb-8 pt-6">
            <button
              onClick={handleSave}
              className="relative flex items-center justify-center gap-2 rounded-3xl border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:text-primary hover:shadow-footer-btn"
            >
              Save Changes
            </button>
          </div>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
