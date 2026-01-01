import { Loader2, Shield, Lock, Globe, FileSearch } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const LoadingState = () => {
  return (
    <Card className="border-2 border-dashed">
      <CardContent className="py-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <Shield className="h-6 w-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Analyzing Security Posture
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Running simulated security checks. This may take a few moments...
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2 animate-pulse">
              <Lock className="h-4 w-4" />
              <span className="text-xs">SSL/TLS</span>
            </div>
            <div className="flex items-center gap-2 animate-pulse" style={{ animationDelay: '0.2s' }}>
              <FileSearch className="h-4 w-4" />
              <span className="text-xs">Headers</span>
            </div>
            <div className="flex items-center gap-2 animate-pulse" style={{ animationDelay: '0.4s' }}>
              <Globe className="h-4 w-4" />
              <span className="text-xs">DNS</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;
