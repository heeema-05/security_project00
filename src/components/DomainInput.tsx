import { useState } from "react";
import { Globe, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DomainInputProps {
  onTestWebsite: (domain: string) => void;
  isLoading: boolean;
}

const DomainInput = ({ onTestWebsite, isLoading }: DomainInputProps) => {
  const [domain, setDomain] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) {
      onTestWebsite(domain.trim());
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">
          Enter Website Domain
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="pr-4 h-12 text-base"
            disabled={isLoading}
          />
        </div>
        
        <Button
          type="submit"
          disabled={!domain.trim() || isLoading}
          className="w-full h-11"
        >
          <Search className="h-4 w-4 mr-2" />
          {isLoading ? "Testing..." : "Test Website"}
        </Button>
      </form>
      
      <p className="mt-4 text-xs text-muted-foreground text-center">
        Enter a domain without http:// or www. prefix
      </p>
    </div>
  );
};

export default DomainInput;
