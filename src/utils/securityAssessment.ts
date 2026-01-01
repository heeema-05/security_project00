/**
 * Security Assessment Utility
 * 
 * This module provides simulated security checks for educational purposes.
 * 
 * IMPORTANT ETHICAL CONSIDERATIONS:
 * - This tool does NOT perform actual intrusive security scanning
 * - All results are simulated based on deterministic algorithms
 * - No real network requests are made to target domains
 * - This is for educational demonstration only
 * 
 * ASSUMPTIONS:
 * - Domain input is sanitized and validated
 * - Results are generated using hash-based deterministic logic
 * - Common well-known domains receive favorable ratings
 * 
 * LIMITATIONS:
 * - Cannot detect actual security vulnerabilities
 * - Does not verify real SSL/TLS certificate status
 * - Cannot perform real HTTP header inspection
 * - Results are illustrative, not factual
 */

export interface SecurityHeader {
  name: string;
  description: string;
  present: boolean;
  recommendation: string;
}

export interface SecurityReport {
  domain: string;
  timestamp: string;
  ssl: {
    available: boolean;
    certificateStatus: 'Valid' | 'Unknown' | 'Expired';
    expiryDays: number | null;
  };
  headers: SecurityHeader[];
  dns: {
    reachable: boolean;
    responseTime: string;
  };
  overallRisk: 'Low' | 'Medium' | 'High';
  riskScore: number;
  recommendations: string[];
}

/**
 * Generates a deterministic hash from a string
 * Used to create consistent but varied results for different domains
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * List of well-known domains that should receive favorable ratings
 * These are common, trusted websites
 */
const trustedDomains = [
  'google.com', 'github.com', 'microsoft.com', 'apple.com',
  'amazon.com', 'cloudflare.com', 'mozilla.org', 'w3.org',
  'stackoverflow.com', 'wikipedia.org', 'edu', 'gov'
];

/**
 * Checks if a domain is in the trusted list or has trusted TLD
 */
function isTrustedDomain(domain: string): boolean {
  const normalized = domain.toLowerCase().replace(/^www\./, '');
  return trustedDomains.some(trusted => 
    normalized === trusted || 
    normalized.endsWith('.' + trusted) ||
    normalized.endsWith('.edu') ||
    normalized.endsWith('.gov')
  );
}

/**
 * Validates domain format
 */
export function isValidDomain(domain: string): boolean {
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  const cleaned = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
  return domainRegex.test(cleaned);
}

/**
 * Cleans and normalizes domain input
 */
export function cleanDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .split('/')[0]
    .split('?')[0];
}

/**
 * Performs simulated security assessment
 * 
 * RISK RATING LOGIC:
 * - Base score starts at 100
 * - Deductions are made for missing security features:
 *   - No SSL: -30 points
 *   - Expired/Unknown certificate: -20 points
 *   - Each missing security header: -10 points
 *   - DNS unreachable: -15 points
 * 
 * Final Rating:
 * - Score >= 70: Low Risk (good security posture)
 * - Score 40-69: Medium Risk (improvements needed)
 * - Score < 40: High Risk (significant vulnerabilities)
 */
export function performSecurityAssessment(domain: string): SecurityReport {
  const cleanedDomain = cleanDomain(domain);
  const hash = simpleHash(cleanedDomain);
  const isTrusted = isTrustedDomain(cleanedDomain);
  
  // Determine SSL status based on domain characteristics
  // Trusted domains always have SSL; others vary based on hash
  const hasSSL = isTrusted || (hash % 10) > 2;
  
  // Certificate status logic
  let certStatus: 'Valid' | 'Unknown' | 'Expired';
  let expiryDays: number | null = null;
  
  if (!hasSSL) {
    certStatus = 'Unknown';
  } else if (isTrusted) {
    certStatus = 'Valid';
    expiryDays = 90 + (hash % 275); // 90-365 days
  } else {
    const certRoll = hash % 100;
    if (certRoll > 20) {
      certStatus = 'Valid';
      expiryDays = 30 + (hash % 335);
    } else if (certRoll > 5) {
      certStatus = 'Unknown';
    } else {
      certStatus = 'Expired';
    }
  }

  // Security headers assessment
  // Each header has probability based on domain trust level
  const headers: SecurityHeader[] = [
    {
      name: "HSTS (Strict-Transport-Security)",
      description: "Forces browsers to use HTTPS, preventing downgrade attacks",
      present: isTrusted || (hash % 7) > 2,
      recommendation: "Enable HSTS with a minimum max-age of 31536000 seconds"
    },
    {
      name: "Content-Security-Policy",
      description: "Prevents XSS attacks by controlling resource loading",
      present: isTrusted || (hash % 11) > 4,
      recommendation: "Implement a strict CSP that limits script and style sources"
    },
    {
      name: "X-Frame-Options",
      description: "Prevents clickjacking by controlling iframe embedding",
      present: isTrusted || (hash % 5) > 1,
      recommendation: "Set to DENY or SAMEORIGIN to prevent framing attacks"
    },
    {
      name: "X-Content-Type-Options",
      description: "Prevents MIME type sniffing attacks",
      present: isTrusted || (hash % 4) > 0,
      recommendation: "Set to 'nosniff' to prevent MIME type confusion"
    }
  ];

  // DNS status - trusted domains are always reachable
  const dnsReachable = isTrusted || (hash % 20) > 1;
  const responseTime = dnsReachable 
    ? `${50 + (hash % 150)}ms` 
    : 'N/A';

  // Calculate risk score
  let riskScore = 100;
  
  // SSL deductions
  if (!hasSSL) riskScore -= 30;
  if (certStatus === 'Unknown') riskScore -= 10;
  if (certStatus === 'Expired') riskScore -= 20;
  
  // Header deductions (10 points each)
  headers.forEach(header => {
    if (!header.present) riskScore -= 10;
  });
  
  // DNS deduction
  if (!dnsReachable) riskScore -= 15;

  // Ensure score stays in bounds
  riskScore = Math.max(0, Math.min(100, riskScore));

  // Determine overall risk rating
  let overallRisk: 'Low' | 'Medium' | 'High';
  if (riskScore >= 70) {
    overallRisk = 'Low';
  } else if (riskScore >= 40) {
    overallRisk = 'Medium';
  } else {
    overallRisk = 'High';
  }

  // Generate recommendations based on findings
  const recommendations: string[] = [];
  
  if (!hasSSL) {
    recommendations.push("Implement SSL/TLS encryption to secure data in transit");
  }
  if (certStatus === 'Expired') {
    recommendations.push("Renew the SSL/TLS certificate immediately");
  }
  if (certStatus === 'Unknown') {
    recommendations.push("Verify SSL/TLS certificate configuration");
  }
  
  headers.forEach(header => {
    if (!header.present) {
      recommendations.push(header.recommendation);
    }
  });
  
  if (!dnsReachable) {
    recommendations.push("Investigate DNS configuration and ensure proper resolution");
  }
  
  if (recommendations.length === 0) {
    recommendations.push("Continue monitoring and maintain current security controls");
  }

  return {
    domain: cleanedDomain,
    timestamp: new Date().toISOString(),
    ssl: {
      available: hasSSL,
      certificateStatus: certStatus,
      expiryDays
    },
    headers,
    dns: {
      reachable: dnsReachable,
      responseTime
    },
    overallRisk,
    riskScore,
    recommendations
  };
}
