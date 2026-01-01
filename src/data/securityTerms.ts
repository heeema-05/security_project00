/**
 * Curated list of cybersecurity scientific terms
 * Categories: Governance, Cryptography, Network Security, Web Security, Risk Management
 * 
 * These terms are educational and aligned with Information Security Management principles.
 */

export interface SecurityTerm {
  term: string;
  definition: string;
  category: 'Governance' | 'Cryptography' | 'Network Security' | 'Web Security' | 'Risk Management';
}

export const securityTerms: SecurityTerm[] = [
  // Governance (6 terms)
  {
    term: "Information Security Policy",
    definition: "A formal document that outlines an organization's approach to managing and protecting information assets, including rules, guidelines, and responsibilities.",
    category: "Governance"
  },
  {
    term: "Compliance",
    definition: "The process of adhering to laws, regulations, standards, and internal policies related to information security and data protection.",
    category: "Governance"
  },
  {
    term: "Security Audit",
    definition: "A systematic evaluation of an organization's security posture, policies, and controls to identify vulnerabilities and ensure compliance.",
    category: "Governance"
  },
  {
    term: "Incident Response Plan",
    definition: "A documented set of procedures for detecting, responding to, and recovering from security incidents or data breaches.",
    category: "Governance"
  },
  {
    term: "Access Control",
    definition: "Security mechanisms that regulate who or what can view or use resources in a computing environment, based on policies and permissions.",
    category: "Governance"
  },
  {
    term: "Security Awareness Training",
    definition: "Educational programs designed to teach employees about security threats, best practices, and their role in protecting organizational assets.",
    category: "Governance"
  },

  // Cryptography (6 terms)
  {
    term: "Encryption",
    definition: "The process of converting plaintext data into an unreadable format (ciphertext) using mathematical algorithms to protect confidentiality.",
    category: "Cryptography"
  },
  {
    term: "SSL/TLS",
    definition: "Secure Sockets Layer / Transport Layer Security - cryptographic protocols that provide secure communication over computer networks.",
    category: "Cryptography"
  },
  {
    term: "Public Key Infrastructure (PKI)",
    definition: "A framework for managing digital certificates and public-key encryption, enabling secure electronic transfer of information.",
    category: "Cryptography"
  },
  {
    term: "Digital Certificate",
    definition: "An electronic document that uses a digital signature to bind a public key with an identity, verified by a Certificate Authority.",
    category: "Cryptography"
  },
  {
    term: "Hash Function",
    definition: "A mathematical algorithm that converts data of any size into a fixed-size output (hash), used for data integrity verification.",
    category: "Cryptography"
  },
  {
    term: "Symmetric Encryption",
    definition: "A type of encryption where the same key is used for both encrypting and decrypting data, requiring secure key exchange.",
    category: "Cryptography"
  },

  // Network Security (6 terms)
  {
    term: "Firewall",
    definition: "A network security device that monitors and controls incoming and outgoing traffic based on predetermined security rules.",
    category: "Network Security"
  },
  {
    term: "Intrusion Detection System (IDS)",
    definition: "A security tool that monitors network traffic for suspicious activity and known threats, alerting administrators to potential attacks.",
    category: "Network Security"
  },
  {
    term: "VPN (Virtual Private Network)",
    definition: "A technology that creates a secure, encrypted connection over a less secure network, protecting data in transit.",
    category: "Network Security"
  },
  {
    term: "DNS Security",
    definition: "Measures and protocols designed to protect the Domain Name System from attacks like DNS spoofing, hijacking, and cache poisoning.",
    category: "Network Security"
  },
  {
    term: "DDoS Attack",
    definition: "Distributed Denial of Service - an attack that overwhelms a target with traffic from multiple sources, disrupting normal service.",
    category: "Network Security"
  },
  {
    term: "Network Segmentation",
    definition: "Dividing a network into smaller segments to improve security, limit the spread of attacks, and control traffic flow.",
    category: "Network Security"
  },

  // Web Security (6 terms)
  {
    term: "Cross-Site Scripting (XSS)",
    definition: "A web vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.",
    category: "Web Security"
  },
  {
    term: "SQL Injection",
    definition: "An attack technique that exploits vulnerabilities in database-driven applications by injecting malicious SQL code.",
    category: "Web Security"
  },
  {
    term: "HTTPS",
    definition: "Hypertext Transfer Protocol Secure - an extension of HTTP that uses TLS encryption for secure communication on the web.",
    category: "Web Security"
  },
  {
    term: "Content Security Policy (CSP)",
    definition: "An HTTP security header that helps prevent XSS and other code injection attacks by specifying allowed content sources.",
    category: "Web Security"
  },
  {
    term: "CORS",
    definition: "Cross-Origin Resource Sharing - a security mechanism that controls how web pages can request resources from different domains.",
    category: "Web Security"
  },
  {
    term: "HTTP Security Headers",
    definition: "Response headers that provide security instructions to browsers, including HSTS, X-Frame-Options, and X-Content-Type-Options.",
    category: "Web Security"
  },

  // Risk Management (6 terms)
  {
    term: "Risk Assessment",
    definition: "The systematic process of identifying, analyzing, and evaluating potential security threats and their impact on an organization.",
    category: "Risk Management"
  },
  {
    term: "Vulnerability",
    definition: "A weakness in a system, application, or process that could be exploited by a threat actor to gain unauthorized access.",
    category: "Risk Management"
  },
  {
    term: "Threat",
    definition: "Any potential danger that could exploit a vulnerability to breach security and cause harm to an organization or system.",
    category: "Risk Management"
  },
  {
    term: "Risk Mitigation",
    definition: "Strategies and actions taken to reduce the likelihood or impact of identified security risks to acceptable levels.",
    category: "Risk Management"
  },
  {
    term: "Business Continuity",
    definition: "Planning and procedures that ensure critical business functions can continue during and after a disaster or security incident.",
    category: "Risk Management"
  },
  {
    term: "Security Controls",
    definition: "Safeguards or countermeasures implemented to reduce security risks, categorized as administrative, technical, or physical.",
    category: "Risk Management"
  }
];

export const categories = ['Governance', 'Cryptography', 'Network Security', 'Web Security', 'Risk Management'] as const;
