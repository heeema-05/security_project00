/**
 * Export View Component
 * 
 * Allows users to preview and export the security assessment report as PDF.
 * Provides a summary before export and handles the download process.
 */

import { Download, FileText, Calendar, Shield, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { generateSecurityReportPDF } from "@/utils/pdfExport";
import type { SecurityReport } from "@/utils/securityAssessment";

interface ExportViewProps {
  report: SecurityReport;
}

const ExportView = ({ report }: ExportViewProps) => {
  const { toast } = useToast();

  const handleExport = () => {
    try {
      generateSecurityReportPDF(report);
      toast({
        title: "PDF Generated",
        description: `Security report for ${report.domain} has been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "An error occurred while generating the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const ratingLabel = report.riskScore >= 80 ? 'Strong (Low Risk)' :
                      report.riskScore >= 50 ? 'Moderate (Medium Risk)' :
                      'Weak (High Risk)';

  const getRiskIcon = () => {
    if (report.riskScore >= 80) return <CheckCircle2 className="h-5 w-5 text-primary" />;
    if (report.riskScore >= 50) return <AlertTriangle className="h-5 w-5 text-accent-foreground" />;
    return <XCircle className="h-5 w-5 text-destructive" />;
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Download className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Export Security Report</h2>
        <p className="text-muted-foreground mt-2">
          Download a comprehensive PDF report of your security assessment
        </p>
      </div>

      {/* Report Preview Card */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Report Preview
          </CardTitle>
          <CardDescription>
            The exported PDF will contain the following information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Domain & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Domain</p>
              <p className="font-semibold">{report.domain}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Assessment Date
              </p>
              <p className="font-semibold text-sm">
                {new Date(report.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Score & Rating */}
          <div className="p-4 bg-muted/30 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Security Score</p>
                <p className="text-2xl font-bold">{report.riskScore}/100</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getRiskIcon()}
              <Badge variant="outline" className="text-sm">
                {ratingLabel}
              </Badge>
            </div>
          </div>

          {/* PDF Contents List */}
          <div className="border-t border-border pt-4">
            <p className="text-sm font-medium mb-3">PDF Contents:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Assessment overview and scoring
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                SSL/TLS configuration details
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                HTTP security headers analysis
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                DNS status information
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Risk interpretation and methodology
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Technical controls (NIST CSF aligned)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Administrative controls (ISO 27001 aligned)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Disclaimer statement
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Export Button */}
      <Button 
        size="lg" 
        className="w-full gap-2"
        onClick={handleExport}
      >
        <Download className="h-5 w-5" />
        Download PDF Report
      </Button>

      {/* Note */}
      <p className="text-xs text-muted-foreground text-center">
        The PDF is generated entirely in your browser. No data is sent to any server.
      </p>
    </div>
  );
};

export default ExportView;
