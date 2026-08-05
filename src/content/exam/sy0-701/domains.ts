import type { Domain, DomainId, Objective, ObjectiveId } from '@/content/schemas';

/**
 * The SY0-701 exam outline.
 *
 * Transcribed from *CompTIA Security+ SY0-701 Certification Exam Objectives, Version 5.0*
 * (© 2023 CompTIA, Inc.). Three rules govern this file:
 *
 * 1. **English titles are verbatim.** They are the exam's own index — every other Security+
 *    resource refers to "4.6" by that exact sentence, and paraphrasing it makes the objective
 *    unfindable. Trailing full stops included, because the document has them.
 * 2. **French titles are working translations**, displayed *alongside* the English rather than
 *    instead of it. See docs/adr/0004-french-as-comprehension-aid.md.
 * 3. **`topics` are the official top-level sub-bullets**, in English, unabridged. They are the
 *    syllabus a lesson is held to: a lesson that covers six of eight topics has a hole, and the
 *    content gate can name it.
 */
export const DOMAINS: readonly Domain[] = [
  {
    id: 1,
    number: '1.0',
    name: { en: 'General Security Concepts', fr: 'Concepts généraux de sécurité' },
    weight: 0.12,
    objectives: [
      {
        id: '1.1',
        domain: 1,
        title: {
          en: 'Compare and contrast various types of security controls.',
          fr: 'Comparer les différents types de contrôles de sécurité.',
        },
        topics: ['Categories', 'Control types'],
      },
      {
        id: '1.2',
        domain: 1,
        title: {
          en: 'Summarize fundamental security concepts.',
          fr: 'Résumer les concepts fondamentaux de la sécurité.',
        },
        topics: [
          'Confidentiality, Integrity, and Availability (CIA)',
          'Non-repudiation',
          'Authentication, Authorization, and Accounting (AAA)',
          'Gap analysis',
          'Zero Trust',
          'Physical security',
          'Deception and disruption technology',
        ],
      },
      {
        id: '1.3',
        domain: 1,
        title: {
          en: 'Explain the importance of change management processes and the impact to security.',
          fr: 'Expliquer l’importance des processus de gestion du changement et leur impact sur la sécurité.',
        },
        topics: [
          'Business processes impacting security operation',
          'Technical implications',
          'Documentation',
          'Version control',
        ],
      },
      {
        id: '1.4',
        domain: 1,
        title: {
          en: 'Explain the importance of using appropriate cryptographic solutions.',
          fr: 'Expliquer l’importance d’utiliser des solutions cryptographiques adaptées.',
        },
        topics: [
          'Public key infrastructure (PKI)',
          'Encryption',
          'Tools',
          'Obfuscation',
          'Hashing',
          'Salting',
          'Digital signatures',
          'Key stretching',
          'Blockchain',
          'Open public ledger',
          'Certificates',
        ],
      },
    ],
  },

  {
    id: 2,
    number: '2.0',
    name: {
      en: 'Threats, Vulnerabilities, and Mitigations',
      fr: 'Menaces, vulnérabilités et mesures d’atténuation',
    },
    weight: 0.22,
    objectives: [
      {
        id: '2.1',
        domain: 2,
        title: {
          en: 'Compare and contrast common threat actors and motivations.',
          fr: 'Comparer les principaux acteurs de la menace et leurs motivations.',
        },
        topics: ['Threat actors', 'Attributes of actors', 'Motivations'],
      },
      {
        id: '2.2',
        domain: 2,
        title: {
          en: 'Explain common threat vectors and attack surfaces.',
          fr: 'Expliquer les vecteurs de menace et surfaces d’attaque courants.',
        },
        topics: [
          'Message-based',
          'Image-based',
          'File-based',
          'Voice call',
          'Removable device',
          'Vulnerable software',
          'Unsupported systems and applications',
          'Unsecure networks',
          'Open service ports',
          'Default credentials',
          'Supply chain',
          'Human vectors/social engineering',
        ],
      },
      {
        id: '2.3',
        domain: 2,
        title: {
          en: 'Explain various types of vulnerabilities.',
          fr: 'Expliquer les différents types de vulnérabilités.',
        },
        topics: [
          'Application',
          'Operating system (OS)-based',
          'Web-based',
          'Hardware',
          'Virtualization',
          'Cloud-specific',
          'Supply chain',
          'Cryptographic',
          'Misconfiguration',
          'Mobile device',
          'Zero-day',
        ],
      },
      {
        id: '2.4',
        domain: 2,
        title: {
          en: 'Given a scenario, analyze indicators of malicious activity.',
          fr: 'Dans un scénario donné, analyser les indicateurs d’activité malveillante.',
        },
        topics: [
          'Malware attacks',
          'Physical attacks',
          'Network attacks',
          'Application attacks',
          'Cryptographic attacks',
          'Password attacks',
          'Indicators',
        ],
      },
      {
        id: '2.5',
        domain: 2,
        title: {
          en: 'Explain the purpose of mitigation techniques used to secure the enterprise.',
          fr: 'Expliquer la finalité des techniques d’atténuation utilisées pour sécuriser l’entreprise.',
        },
        topics: [
          'Segmentation',
          'Access control',
          'Application allow list',
          'Isolation',
          'Patching',
          'Encryption',
          'Monitoring',
          'Least privilege',
          'Configuration enforcement',
          'Decommissioning',
          'Hardening techniques',
        ],
      },
    ],
  },

  {
    id: 3,
    number: '3.0',
    name: { en: 'Security Architecture', fr: 'Architecture de sécurité' },
    weight: 0.18,
    objectives: [
      {
        id: '3.1',
        domain: 3,
        title: {
          en: 'Compare and contrast security implications of different architecture models.',
          fr: 'Comparer les implications de sécurité des différents modèles d’architecture.',
        },
        topics: ['Architecture and infrastructure concepts', 'Considerations'],
      },
      {
        id: '3.2',
        domain: 3,
        title: {
          en: 'Given a scenario, apply security principles to secure enterprise infrastructure.',
          fr: 'Dans un scénario donné, appliquer les principes de sécurité pour sécuriser l’infrastructure d’entreprise.',
        },
        topics: [
          'Infrastructure considerations',
          'Secure communication/access',
          'Selection of effective controls',
        ],
      },
      {
        id: '3.3',
        domain: 3,
        title: {
          en: 'Compare and contrast concepts and strategies to protect data.',
          fr: 'Comparer les concepts et stratégies de protection des données.',
        },
        topics: [
          'Data types',
          'Data classifications',
          'General data considerations',
          'Methods to secure data',
        ],
      },
      {
        id: '3.4',
        domain: 3,
        title: {
          en: 'Explain the importance of resilience and recovery in security architecture.',
          fr: 'Expliquer l’importance de la résilience et de la reprise dans l’architecture de sécurité.',
        },
        topics: [
          'High availability',
          'Site considerations',
          'Platform diversity',
          'Multi-cloud systems',
          'Continuity of operations',
          'Capacity planning',
          'Testing',
          'Backups',
          'Power',
        ],
      },
    ],
  },

  {
    id: 4,
    number: '4.0',
    name: { en: 'Security Operations', fr: 'Opérations de sécurité' },
    weight: 0.28,
    objectives: [
      {
        id: '4.1',
        domain: 4,
        title: {
          en: 'Given a scenario, apply common security techniques to computing resources.',
          fr: 'Dans un scénario donné, appliquer les techniques de sécurité courantes aux ressources informatiques.',
        },
        topics: [
          'Secure baselines',
          'Hardening targets',
          'Wireless devices',
          'Mobile solutions',
          'Wireless security settings',
          'Application security',
          'Sandboxing',
          'Monitoring',
        ],
      },
      {
        id: '4.2',
        domain: 4,
        title: {
          en: 'Explain the security implications of proper hardware, software, and data asset management.',
          fr: 'Expliquer les implications de sécurité d’une bonne gestion des actifs matériels, logiciels et de données.',
        },
        topics: [
          'Acquisition/procurement process',
          'Assignment/accounting',
          'Monitoring/asset tracking',
          'Disposal/decommissioning',
        ],
      },
      {
        id: '4.3',
        domain: 4,
        title: {
          en: 'Explain various activities associated with vulnerability management.',
          fr: 'Expliquer les différentes activités liées à la gestion des vulnérabilités.',
        },
        topics: [
          'Identification methods',
          'Analysis',
          'Vulnerability response and remediation',
          'Validation of remediation',
          'Reporting',
        ],
      },
      {
        id: '4.4',
        domain: 4,
        title: {
          en: 'Explain security alerting and monitoring concepts and tools.',
          fr: 'Expliquer les concepts et outils d’alerte et de surveillance de sécurité.',
        },
        topics: ['Monitoring computing resources', 'Activities', 'Tools'],
      },
      {
        id: '4.5',
        domain: 4,
        title: {
          en: 'Given a scenario, modify enterprise capabilities to enhance security.',
          fr: 'Dans un scénario donné, modifier les capacités de l’entreprise pour renforcer la sécurité.',
        },
        topics: [
          'Firewall',
          'IDS/IPS',
          'Web filter',
          'Operating system security',
          'Implementation of secure protocols',
          'DNS filtering',
          'Email security',
          'File integrity monitoring',
          'DLP',
          'Network access control (NAC)',
          'Endpoint detection and response (EDR)/extended detection and response (XDR)',
          'User behavior analytics',
        ],
      },
      {
        id: '4.6',
        domain: 4,
        title: {
          en: 'Given a scenario, implement and maintain identity and access management.',
          fr: 'Dans un scénario donné, mettre en œuvre et maintenir la gestion des identités et des accès.',
        },
        topics: [
          'Provisioning/de-provisioning user accounts',
          'Permission assignments and implications',
          'Identity proofing',
          'Federation',
          'Single sign-on (SSO)',
          'Interoperability',
          'Attestation',
          'Access controls',
          'Multifactor authentication',
          'Password concepts',
          'Privileged access management tools',
        ],
      },
      {
        id: '4.7',
        domain: 4,
        title: {
          en: 'Explain the importance of automation and orchestration related to secure operations.',
          fr: 'Expliquer l’importance de l’automatisation et de l’orchestration dans les opérations de sécurité.',
        },
        topics: ['Use cases of automation and scripting', 'Benefits', 'Other considerations'],
      },
      {
        id: '4.8',
        domain: 4,
        title: {
          en: 'Explain appropriate incident response activities.',
          fr: 'Expliquer les activités appropriées de réponse aux incidents.',
        },
        topics: [
          'Process',
          'Training',
          'Testing',
          'Root cause analysis',
          'Threat hunting',
          'Digital forensics',
        ],
      },
      {
        id: '4.9',
        domain: 4,
        title: {
          en: 'Given a scenario, use data sources to support an investigation.',
          fr: 'Dans un scénario donné, exploiter les sources de données pour appuyer une investigation.',
        },
        topics: ['Log data', 'Data sources'],
      },
    ],
  },

  {
    id: 5,
    number: '5.0',
    name: {
      en: 'Security Program Management and Oversight',
      fr: 'Gestion et supervision du programme de sécurité',
    },
    weight: 0.2,
    objectives: [
      {
        id: '5.1',
        domain: 5,
        title: {
          en: 'Summarize elements of effective security governance.',
          fr: 'Résumer les éléments d’une gouvernance de sécurité efficace.',
        },
        topics: [
          'Guidelines',
          'Policies',
          'Standards',
          'Procedures',
          'External considerations',
          'Monitoring and revision',
          'Types of governance structures',
          'Roles and responsibilities for systems and data',
        ],
      },
      {
        id: '5.2',
        domain: 5,
        title: {
          en: 'Explain elements of the risk management process.',
          fr: 'Expliquer les éléments du processus de gestion des risques.',
        },
        topics: [
          'Risk identification',
          'Risk assessment',
          'Risk analysis',
          'Risk register',
          'Risk tolerance',
          'Risk appetite',
          'Risk management strategies',
          'Risk reporting',
          'Business impact analysis',
        ],
      },
      {
        id: '5.3',
        domain: 5,
        title: {
          en: 'Explain the processes associated with third-party risk assessment and management.',
          fr: 'Expliquer les processus d’évaluation et de gestion du risque tiers.',
        },
        topics: [
          'Vendor assessment',
          'Vendor selection',
          'Agreement types',
          'Vendor monitoring',
          'Questionnaires',
          'Rules of engagement',
        ],
      },
      {
        id: '5.4',
        domain: 5,
        title: {
          en: 'Summarize elements of effective security compliance.',
          fr: 'Résumer les éléments d’une conformité de sécurité efficace.',
        },
        topics: [
          'Compliance reporting',
          'Consequences of non-compliance',
          'Compliance monitoring',
          'Privacy',
        ],
      },
      {
        id: '5.5',
        domain: 5,
        title: {
          en: 'Explain types and purposes of audits and assessments.',
          fr: 'Expliquer les types et finalités des audits et évaluations.',
        },
        topics: ['Attestation', 'Internal', 'External'],
      },
      {
        id: '5.6',
        domain: 5,
        title: {
          en: 'Given a scenario, implement security awareness practices.',
          fr: 'Dans un scénario donné, mettre en œuvre des pratiques de sensibilisation à la sécurité.',
        },
        topics: [
          'Phishing',
          'Anomalous behavior recognition',
          'User guidance and training',
          'Reporting and monitoring',
          'Development',
          'Execution',
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------- lookups */

export const ALL_OBJECTIVES: readonly Objective[] = DOMAINS.flatMap((domain) => domain.objectives);

const BY_ID = new Map(ALL_OBJECTIVES.map((objective) => [objective.id, objective]));

export function findObjective(id: string): Objective | undefined {
  return BY_ID.get(id);
}

export function findDomain(id: DomainId): Domain | undefined {
  return DOMAINS.find((domain) => domain.id === id);
}

/** The domain an objective belongs to, derived from its id rather than stored twice. */
export function domainOf(objectiveId: ObjectiveId): DomainId | undefined {
  return findObjective(objectiveId)?.domain;
}
