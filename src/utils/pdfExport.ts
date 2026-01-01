/**
 * PDF Export Utility
 * 
 * Generates comprehensive security assessment PDF reports.
 * Uses jsPDF for client-side PDF generation (no backend required).
 * 
 * PDF Contents:
 * - Tested website/domain
 * - Date of assessment
 * - Security score and risk level
 * - Detailed findings table
 * - Risk interpretation
 * - Recommended controls and improvements
 * - Disclaimer statement
 * 
 * ETHICAL CONSIDERATIONS:
 * - Report clearly states results are simulated for educational purposes
 * - Disclaimer is prominently displayed
 * - No false claims about actual security status
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { SecurityReport } from './securityAssessment';

/**
 * Generates and downloads a PDF security assessment report
 */
export function generateSecurityReportPDF(report: SecurityReport): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  // Helper functions
  const addTitle = (text: string, size: number = 16) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'bold');
    doc.text(text, margin, yPos);
    yPos += size * 0.5 + 4;
  };

  const addText = (text: string, size: number = 10) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
    doc.text(lines, margin, yPos);
    yPos += lines.length * size * 0.4 + 4;
  };

  const addSectionHeader = (text: string) => {
    yPos += 6;
    doc.setFillColor(0, 128, 100);
    doc.rect(margin, yPos - 5, pageWidth - margin * 2, 8, 'F');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(text, margin + 4, yPos);
    doc.setTextColor(0, 0, 0);
    yPos += 10;
  };

  const checkPageBreak = (requiredSpace: number = 40) => {
    if (yPos + requiredSpace > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage();
      yPos = 20;
    }
  };

  // === HEADER ===
  doc.setFillColor(0, 100, 80);
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Security Assessment Report', pageWidth / 2, 18, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Website Security Assessment & Guidance Tool', pageWidth / 2, 28, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text('University Course Project — Information Security Management', pageWidth / 2, 38, { align: 'center' });
  
  doc.setTextColor(0, 0, 0);
  yPos = 55;

  // === ASSESSMENT OVERVIEW ===
  addSectionHeader('Assessment Overview');
  
  const ratingLabel = report.riskScore >= 80 ? 'Strong (Low Risk)' :
                      report.riskScore >= 50 ? 'Moderate (Medium Risk)' :
                      'Weak (High Risk)';

  const overviewData = [
    ['Domain Tested', report.domain],
    ['Assessment Date', new Date(report.timestamp).toLocaleString()],
    ['Security Score', `${report.riskScore}/100`],
    ['Risk Level', ratingLabel],
  ];

  autoTable(doc, {
    startY: yPos,
    head: [],
    body: overviewData,
    theme: 'striped',
    styles: { fontSize: 10, cellPadding: 4 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as any).lastAutoTable.finalY + 10;

  // === DETAILED FINDINGS ===
  checkPageBreak(60);
  addSectionHeader('Detailed Findings');

  // SSL/TLS Findings
  addTitle('SSL/TLS Configuration', 11);
  
  const sslData = [
    ['SSL/TLS Encryption', report.ssl.available ? '✓ Available' : '✗ Not Available'],
    ['Certificate Status', report.ssl.certificateStatus],
    ['Certificate Expiry', report.ssl.expiryDays ? `${report.ssl.expiryDays} days` : 'N/A'],
  ];

  autoTable(doc, {
    startY: yPos,
    body: sslData,
    theme: 'grid',
    styles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 } },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as any).lastAutoTable.finalY + 8;

  // HTTP Security Headers
  checkPageBreak(60);
  addTitle('HTTP Security Headers', 11);

  const headerData = report.headers.map(h => [
    h.name,
    h.present ? '✓ Present' : '✗ Missing',
    h.description
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Header', 'Status', 'Purpose']],
    body: headerData,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 100, 80] },
    columnStyles: { 0: { cellWidth: 55 }, 1: { cellWidth: 25 } },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as any).lastAutoTable.finalY + 8;

  // DNS Status
  checkPageBreak(30);
  addTitle('DNS Configuration', 11);
  
  const dnsData = [
    ['DNS Resolution', report.dns.reachable ? '✓ Reachable' : '✗ Unreachable'],
    ['Response Time', report.dns.responseTime],
  ];

  autoTable(doc, {
    startY: yPos,
    body: dnsData,
    theme: 'grid',
    styles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 } },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as any).lastAutoTable.finalY + 10;

  // === RISK INTERPRETATION ===
  checkPageBreak(50);
  addSectionHeader('Risk Interpretation');

  let riskInterpretation = '';
  if (report.riskScore >= 80) {
    riskInterpretation = 'The assessed website demonstrates a STRONG security posture with minimal identified risks. ' +
      'Core security controls are in place, and the site appears to follow security best practices. ' +
      'Regular monitoring and periodic reassessment are recommended to maintain this level of security.';
  } else if (report.riskScore >= 50) {
    riskInterpretation = 'The assessed website shows a MODERATE security posture with some areas requiring attention. ' +
      'While basic security measures are present, there are gaps that could potentially be exploited. ' +
      'Implementing the recommended controls would significantly improve the security posture.';
  } else {
    riskInterpretation = 'The assessed website has a WEAK security posture with significant risks identified. ' +
      'Critical security controls appear to be missing or misconfigured. ' +
      'Immediate action is recommended to address the identified vulnerabilities and reduce exposure to attacks.';
  }

  addText(riskInterpretation);

  // Scoring Methodology
  yPos += 4;
  addTitle('Scoring Methodology', 10);
  addText(
    'The security score is calculated based on: SSL/TLS availability (-30 if missing), ' +
    'certificate validity (-10 to -20 for issues), presence of security headers (-10 each if missing), ' +
    'and DNS reachability (-15 if unreachable). This methodology aligns with NIST Cybersecurity Framework ' +
    'principles and ISO/IEC 27001 control objectives.'
  );

  // === RECOMMENDED CONTROLS ===
  checkPageBreak(80);
  addSectionHeader('Recommended Security Controls');

  // Technical Recommendations
  addTitle('Technical Controls (NIST CSF)', 11);
  
  const techRecommendations = report.recommendations.map((rec, i) => [`${i + 1}`, rec]);
  
  autoTable(doc, {
    startY: yPos,
    head: [['#', 'Recommendation']],
    body: techRecommendations,
    theme: 'striped',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [0, 100, 80] },
    columnStyles: { 0: { cellWidth: 10, halign: 'center' } },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as any).lastAutoTable.finalY + 8;

  // Administrative Recommendations
  checkPageBreak(60);
  addTitle('Administrative Controls (ISO 27001)', 11);

  const adminRecommendations = [
    ['1', 'Establish and maintain an Information Security Policy'],
    ['2', 'Implement security awareness training for personnel'],
    ['3', 'Define incident response procedures'],
    ['4', 'Conduct periodic security audits and reviews'],
    ['5', 'Document security controls and configurations'],
    ['6', 'Establish vendor security assessment processes'],
  ];

  autoTable(doc, {
    startY: yPos,
    head: [['#', 'Recommendation']],
    body: adminRecommendations,
    theme: 'striped',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [0, 100, 80] },
    columnStyles: { 0: { cellWidth: 10, halign: 'center' } },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as any).lastAutoTable.finalY + 10;

  // === DISCLAIMER ===
  checkPageBreak(50);
  addSectionHeader('Disclaimer');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  const disclaimerText = 
    'This tool provides informational results only and does not guarantee website security. ' +
    'Only publicly accessible, non-intrusive checks are simulated. ' +
    'This is an educational tool developed for a university course project and should not be used ' +
    'as the sole basis for security decisions. Results are generated using simulated data and ' +
    'deterministic algorithms for demonstration purposes. For actual security assessments, ' +
    'please consult with qualified cybersecurity professionals.';
  
  const disclaimerLines = doc.splitTextToSize(disclaimerText, pageWidth - margin * 2);
  doc.text(disclaimerLines, margin, yPos);
  yPos += disclaimerLines.length * 4 + 10;

  // === FOOTER ===
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    doc.text(
      'SecureCheck — Website Security Assessment Tool',
      margin,
      doc.internal.pageSize.getHeight() - 10
    );
    doc.text(
      new Date().toLocaleDateString(),
      pageWidth - margin,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'right' }
    );
  }

  // Save the PDF
  const filename = `security-report-${report.domain.replace(/\./g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}
