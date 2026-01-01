import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              SecureCheck
            </h1>
            <p className="text-sm text-muted-foreground">
              Website Security Assessment & Guidance Tool
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
