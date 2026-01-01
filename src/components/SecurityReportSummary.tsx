/**
 * Security Report Summary Component
 * 
 * Provides a consolidated security posture summary aligned with:
 * - ISO/IEC 27001 (Information Security Management)
 * - NIST Cybersecurity Framework
 * - OWASP Top 10 awareness
 * 
 * Sections:
 * 1. Overall Security Rating
 * 2. Key Findings
 * 3. Identified Risks (non-technical)
 * 4. Recommended Security Controls (Administrative & Technical)
 */

import { 
  Shield, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  FileText,
  Lightbulb,
  Lock,
  Users,
  Settings,
  TrendingUp,
  AlertOctagon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { SecurityReport } from "@/utils/securityAssessment";

interface SecurityReportSummaryProps {
  report: SecurityReport;
}

const SecurityReportSummary = ({ report }: SecurityReportSummaryProps) => {
  // Determine rating label based on score (0-100 scale per requirements)
  const getRatingLabel = (score: number): { label: string; description: string } => {
    if (score >= 80) return { label: 'Strong', description: 'Low Risk - Excellent security posture' };
    if (score >= 50) return { label: 'Moderate', description: 'Medium Risk - Improvements recommended' };
    return { label: 'Weak', description: 'High Risk - Immediate action required' };
  };

  const rating = getRatingLabel(report.riskScore);

  // Generate key findings based on assessment
  const keyFindings = [
    {
      category: 'Encryption',
      status: report.ssl.available,
      finding: report.ssl.available 
        ? 'SSL/TLS encryption is active, protecting data in transit'
        : 'No SSL/TLS encryption detected - data may be transmitted insecurely'
    },
    {
      category: 'Certificate',
      status: report.ssl.certificateStatus === 'Valid',
      finding: report.ssl.certificateStatus === 'Valid'
        ? `Certificate is valid with ${report.ssl.expiryDays} days until expiry`
        : report.ssl.certificateStatus === 'Expired'
          ? 'SSL certificate has expired - browsers will show security warnings'
          : 'Certificate status could not be verified'
    },
    {
      category: 'Security Headers',
      status: report.headers.filter(h => h.present).length >= 3,
      finding: `${report.headers.filter(h => h.present).length} of ${report.headers.length} recommended security headers are configured`
    },
    {
      category: 'DNS',
      status: report.dns.reachable,
      finding: report.dns.reachable 
        ? `DNS resolution successful (${report.dns.responseTime})`
        : 'DNS resolution failed - website may be unreachable'
    }
  ];

  // Generate identified risks (non-technical language per requirements)
  const identifiedRisks = [];
  
  if (!report.ssl.available) {
    identifiedRisks.push({
      severity: 'High',
      risk: 'User data could be intercepted',
      impact: 'Sensitive information like passwords or personal data could be read by attackers during transmission'
    });
  }
  
  if (report.ssl.certificateStatus === 'Expired') {
    identifiedRisks.push({
      severity: 'High', 
      risk: 'Website trust is compromised',
      impact: 'Visitors will see browser warnings and may leave the site, damaging reputation and user trust'
    });
  }
  
  const missingHeaders = report.headers.filter(h => !h.present);
  if (missingHeaders.some(h => h.name.includes('Content-Security-Policy'))) {
    identifiedRisks.push({
      severity: 'Medium',
      risk: 'Vulnerable to script injection attacks',
      impact: 'Malicious code could be injected into the website, potentially stealing user data or defacing content'
    });
  }
  
  if (missingHeaders.some(h => h.name.includes('X-Frame-Options'))) {
    identifiedRisks.push({
      severity: 'Medium',
      risk: 'Susceptible to clickjacking',
      impact: 'Users could be tricked into clicking hidden buttons or links, leading to unintended actions'
    });
  }
  
  if (!report.dns.reachable) {
    identifiedRisks.push({
      severity: 'High',
      risk: 'Website availability issues',
      impact: 'Users cannot access the website, resulting in lost business and poor user experience'
    });
  }

  if (identifiedRisks.length === 0) {
    identifiedRisks.push({
      severity: 'Low',
      risk: 'No critical risks identified',
      impact: 'Current security controls appear adequate. Continue monitoring and maintaining security posture.'
    });
  }

  // Administrative and Technical Controls (aligned with ISO/NIST per requirements)
  const administrativeControls = [
    'Establish an Information Security Policy aligned with ISO/IEC 27001 requirements',
    'Implement regular security awareness training for all personnel',
    'Define incident response procedures and communication protocols',
    'Conduct periodic security audits and management reviews',
    'Maintain documentation of security controls and configurations',
    'Establish vendor and third-party security assessment processes'
  ];

  const technicalControls = [
    ...report.recommendations,
    ...(report.ssl.available ? [] : ['Deploy SSL/TLS certificates from a trusted Certificate Authority']),
    'Implement Web Application Firewall (WAF) for additional protection',
    'Enable security logging and monitoring (SIEM integration recommended)',
    'Configure automated security scanning in CI/CD pipelines',
    'Implement Content Security Policy with strict directives'
  ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 8); // Remove duplicates, limit to 8

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'Medium': return 'bg-accent text-accent-foreground border-accent-foreground/30';
      case 'Low': return 'bg-primary/10 text-primary border-primary/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Section 1: Overall Security Rating */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Security Assessment Summary</CardTitle>
              <CardDescription className="mt-1">
                Assessment for <span className="font-semibold text-foreground">{report.domain}</span> • {new Date(report.timestamp).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Security Score</span>
                  <span className="text-2xl font-bold">{report.riskScore}/100</span>
                </div>
                <Progress value={report.riskScore} className="h-3" />
              </div>
              <p className="text-sm text-muted-foreground">
                Score calculated based on SSL/TLS status, security headers presence, 
                certificate validity, and DNS reachability following NIST CSF guidelines.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border-2 ${
              report.riskScore >= 80 ? 'border-primary/40 bg-primary/5' :
              report.riskScore >= 50 ? 'border-accent-foreground/40 bg-accent/50' :
              'border-destructive/40 bg-destructive/5'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                {report.riskScore >= 80 ? (
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                ) : report.riskScore >= 50 ? (
                  <AlertTriangle className="h-8 w-8 text-accent-foreground" />
                ) : (
                  <XCircle className="h-8 w-8 text-destructive" />
                )}
                <div>
                  <p className="text-xl font-bold">{rating.label}</p>
                  <p className="text-sm text-muted-foreground">{rating.description}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Key Findings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Key Findings
          </CardTitle>
          <CardDescription>
            Summary of security assessment results based on OWASP and ISO 27001 guidelines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {keyFindings.map((finding, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border"
              >
                {finding.status ? (
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <Badge variant="outline" className="mb-2">
                    {finding.category}
                  </Badge>
                  <p className="text-sm">{finding.finding}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Identified Risks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-destructive" />
            Identified Risks
          </CardTitle>
          <CardDescription>
            Potential security concerns explained in non-technical terms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {identifiedRisks.map((risk, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${getRiskColor(risk.severity)}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getRiskColor(risk.severity)}>
                    {risk.severity} Severity
                  </Badge>
                </div>
                <p className="font-medium mb-1">{risk.risk}</p>
                <p className="text-sm opacity-80">{risk.impact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Recommended Security Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Administrative Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              Administrative Controls
            </CardTitle>
            <CardDescription>
              Governance and policy recommendations (ISO 27001)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {administrativeControls.map((control, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{control}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Technical Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5 text-primary" />
              Technical Controls
            </CardTitle>
            <CardDescription>
              Implementation recommendations (NIST CSF)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {technicalControls.map((control, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Lock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{control}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Standards Reference */}
      <Card className="bg-muted/30">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Lightbulb className="h-3 w-3" />
              Assessment methodology aligned with:
            </span>
            <Badge variant="outline" className="text-xs">ISO/IEC 27001</Badge>
            <Badge variant="outline" className="text-xs">NIST CSF</Badge>
            <Badge variant="outline" className="text-xs">OWASP Top 10</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityReportSummary;
