import { 
  Shield, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Globe,
  Clock,
  FileWarning,
  Lightbulb
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SecurityReport as SecurityReportType } from "@/utils/securityAssessment";

interface SecurityReportProps {
  report: SecurityReportType;
}

const SecurityReport = ({ report }: SecurityReportProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Medium':
        return 'bg-accent text-accent-foreground border-accent-foreground/20';
      case 'High':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low':
        return <CheckCircle2 className="h-6 w-6" />;
      case 'Medium':
        return <AlertTriangle className="h-6 w-6" />;
      case 'High':
        return <XCircle className="h-6 w-6" />;
      default:
        return <Shield className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with domain and risk score */}
      <Card className="border-2">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-xl">{report.domain}</CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  {new Date(report.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getRiskColor(report.overallRisk)}`}>
              {getRiskIcon(report.overallRisk)}
              <div className="text-right">
                <p className="text-sm font-medium">Risk Level</p>
                <p className="text-lg font-bold">{report.overallRisk}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Security Score:</span>
            <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  report.riskScore >= 70 ? 'bg-primary' :
                  report.riskScore >= 40 ? 'bg-accent-foreground' : 'bg-destructive'
                }`}
                style={{ width: `${report.riskScore}%` }}
              />
            </div>
            <span className="text-sm font-semibold">{report.riskScore}/100</span>
          </div>
        </CardContent>
      </Card>

      {/* SSL/TLS Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            {report.ssl.available ? (
              <Lock className="h-5 w-5 text-primary" />
            ) : (
              <Unlock className="h-5 w-5 text-destructive" />
            )}
            SSL/TLS Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Encryption</p>
              <div className="flex items-center gap-2">
                {report.ssl.available ? (
                  <Badge variant="default" className="bg-primary">Available</Badge>
                ) : (
                  <Badge variant="destructive">Not Available</Badge>
                )}
              </div>
            </div>
            
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Certificate</p>
              <Badge 
                variant={
                  report.ssl.certificateStatus === 'Valid' ? 'default' :
                  report.ssl.certificateStatus === 'Expired' ? 'destructive' : 'secondary'
                }
                className={report.ssl.certificateStatus === 'Valid' ? 'bg-primary' : ''}
              >
                {report.ssl.certificateStatus}
              </Badge>
            </div>
            
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Expiry</p>
              <p className="text-sm font-medium">
                {report.ssl.expiryDays 
                  ? `${report.ssl.expiryDays} days` 
                  : 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HTTP Security Headers */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileWarning className="h-5 w-5 text-primary" />
            HTTP Security Headers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {report.headers.map((header, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
              >
                {header.present ? (
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <p className="font-medium text-sm">{header.name}</p>
                    <Badge 
                      variant={header.present ? "default" : "destructive"}
                      className={`text-xs w-fit ${header.present ? 'bg-primary' : ''}`}
                    >
                      {header.present ? 'Present' : 'Missing'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {header.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* DNS Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            DNS Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Resolution</p>
              <Badge 
                variant={report.dns.reachable ? "default" : "destructive"}
                className={report.dns.reachable ? 'bg-primary' : ''}
              >
                {report.dns.reachable ? 'Reachable' : 'Unreachable'}
              </Badge>
            </div>
            
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Response Time</p>
              <p className="text-sm font-medium">{report.dns.responseTime}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {report.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityReport;
