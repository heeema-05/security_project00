/**
 * Website Security Assessment & Guidance Web Tool
 * 
 * This is a university course project for Information Security Management.
 * The tool provides simulated security assessments for educational purposes.
 * 
 * ETHICAL CONSIDERATIONS:
 * - No actual intrusive scanning is performed
 * - All results are simulated using deterministic algorithms
 * - The tool is designed for educational demonstration only
 * - Users are clearly informed via disclaimer that results are informational
 * 
 * ARCHITECTURE:
 * - React functional components with TypeScript
 * - Modular component structure for maintainability
 * - Separation of concerns: data, utils, and presentation
 */

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import DomainInput from "@/components/DomainInput";
import SecurityReport from "@/components/SecurityReport";
import TermsGlossary from "@/components/TermsGlossary";
import Disclaimer from "@/components/Disclaimer";
import LoadingState from "@/components/LoadingState";
import { 
  performSecurityAssessment, 
  isValidDomain, 
  type SecurityReport as SecurityReportType 
} from "@/utils/securityAssessment";
import { useToast } from "@/hooks/use-toast";

type ViewState = 'main' | 'terms';

const Index = () => {
  const [view, setView] = useState<ViewState>('main');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<SecurityReportType | null>(null);
  const { toast } = useToast();

  const handleTestWebsite = useCallback(async (domain: string) => {
    // Validate domain format
    if (!isValidDomain(domain)) {
      toast({
        title: "Invalid Domain",
        description: "Please enter a valid domain (e.g., example.com)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setReport(null);

    // Simulate network delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    try {
      const result = performSecurityAssessment(domain);
      setReport(result);
      
      toast({
        title: "Assessment Complete",
        description: `Security analysis for ${result.domain} is ready.`,
      });
    } catch (error) {
      toast({
        title: "Assessment Failed",
        description: "An error occurred during the security check. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const handleShowTerms = useCallback(() => {
    setView('terms');
  }, []);

  const handleBackToMain = useCallback(() => {
    setView('main');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {view === 'terms' ? (
          <TermsGlossary onBack={handleBackToMain} />
        ) : (
          <div className="space-y-6">
            {/* Domain Input Section */}
            <DomainInput
              onTestWebsite={handleTestWebsite}
              onShowTerms={handleShowTerms}
              isLoading={isLoading}
            />

            {/* Disclaimer */}
            <Disclaimer />

            {/* Loading State */}
            {isLoading && <LoadingState />}

            {/* Security Report */}
            {!isLoading && report && <SecurityReport report={report} />}

            {/* Empty State */}
            {!isLoading && !report && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg mb-2">Enter a domain to begin security assessment</p>
                <p className="text-sm">
                  Example domains: google.com, github.com, example.org
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            University Course Project — Information Security Management
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Semester 1st / 2025–2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
