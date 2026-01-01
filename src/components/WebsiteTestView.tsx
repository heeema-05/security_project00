/**
 * Website Test View Component
 * 
 * Main view for testing website security.
 * Contains domain input, loading state, and security results.
 */

import DomainInput from "@/components/DomainInput";
import SecurityReport from "@/components/SecurityReport";
import Disclaimer from "@/components/Disclaimer";
import LoadingState from "@/components/LoadingState";
import type { SecurityReport as SecurityReportType } from "@/utils/securityAssessment";

interface WebsiteTestViewProps {
  onTestWebsite: (domain: string) => void;
  isLoading: boolean;
  report: SecurityReportType | null;
}

const WebsiteTestView = ({ onTestWebsite, isLoading, report }: WebsiteTestViewProps) => {
  return (
    <div className="space-y-6">
      {/* Domain Input Section */}
      <DomainInput
        onTestWebsite={onTestWebsite}
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
  );
};

export default WebsiteTestView;
