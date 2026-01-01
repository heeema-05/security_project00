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
 * - Left sidebar navigation with main content area
 * 
 * STANDARDS ALIGNMENT:
 * - ISO/IEC 27001 (Information Security Management)
 * - NIST Cybersecurity Framework (Identify, Protect, Detect)
 * - OWASP Top 10 (Web Security Awareness)
 */

import { useState, useCallback } from "react";
import AppSidebar, { type ViewType } from "@/components/AppSidebar";
import WebsiteTestView from "@/components/WebsiteTestView";
import SecurityReportSummary from "@/components/SecurityReportSummary";
import TermsGlossary from "@/components/TermsGlossary";
import ExportView from "@/components/ExportView";
import { 
  performSecurityAssessment, 
  isValidDomain, 
  type SecurityReport 
} from "@/utils/securityAssessment";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('test');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<SecurityReport | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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

  const handleViewChange = useCallback((view: ViewType) => {
    setCurrentView(view);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'test':
        return (
          <WebsiteTestView
            onTestWebsite={handleTestWebsite}
            isLoading={isLoading}
            report={report}
          />
        );
      case 'report':
        return report ? <SecurityReportSummary report={report} /> : null;
      case 'terms':
        return <TermsGlossary />;
      case 'export':
        return report ? <ExportView report={report} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Left Sidebar */}
      <AppSidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        hasReport={!!report}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50">
          <div className="px-6 py-4 text-center">
            <p className="text-sm text-muted-foreground">
              University Course Project — Information Security Management
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Semester 1st / 2025–2026
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
