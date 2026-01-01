import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="bg-accent/50 border border-accent-foreground/20 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-accent-foreground flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-accent-foreground">
            Educational Tool Disclaimer
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            This tool provides informational results only and does not guarantee website security. 
            Results are simulated for educational purposes and should not be used as a basis for 
            security decisions. Always consult professional security auditors for actual assessments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
