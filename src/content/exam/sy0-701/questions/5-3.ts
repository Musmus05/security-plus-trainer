import type { Question } from '@/content/schemas';

/**
 * Objective 5.3 — Explain the processes associated with third-party risk assessment and management.
 *
 * Every question is original work based solely on the published objective. The distractors are
 * neighbouring third-party processes so that a correct choice depends on purpose and timing.
 */
export const QUESTIONS_5_3: Question[] = [
  {
    id: 'q-5-3-001',
    objective: '5.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the main purpose of a vendor assessment?',
      fr: 'Quel est le but principal d’une évaluation de fournisseur ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Identify the risks and control gaps created by a proposed vendor relationship',
          fr: 'Identifier les risques et écarts de contrôle créés par une relation fournisseur envisagée',
        },
        correct: true,
        explanation: {
          en: 'An assessment examines the service, data, access, and controls to expose risks before they become an unmanaged dependency.',
          fr: 'Une évaluation examine le service, les données, les accès et les contrôles afin de révéler les risques avant qu’ils deviennent une dépendance non gérée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Measure whether the vendor meets monthly uptime targets',
          fr: 'Mesurer si le fournisseur atteint ses objectifs mensuels de disponibilité',
        },
        correct: false,
        explanation: {
          en: 'Measuring an established service level is ongoing vendor monitoring. Assessment establishes the initial understanding of risk before or during onboarding.',
          fr: 'Mesurer un niveau de service établi relève de la surveillance continue. L’évaluation établit la compréhension initiale du risque avant ou pendant l’intégration.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Define the exact deliverables for a consulting project',
          fr: 'Définir les livrables exacts d’un projet de conseil',
        },
        correct: false,
        explanation: {
          en: 'A statement of work defines deliverables and scope. It may use assessment results, but it does not itself analyse a vendor’s security risk.',
          fr: 'Un énoncé des travaux définit les livrables et le périmètre. Il peut utiliser les résultats d’évaluation, mais il n’analyse pas lui-même le risque de sécurité.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Authorize a penetration tester to attack production systems',
          fr: 'Autoriser un testeur d’intrusion à attaquer des systèmes de production',
        },
        correct: false,
        explanation: {
          en: 'Rules of engagement authorise and bound a particular assessment activity. A vendor assessment is broader due diligence about the relationship.',
          fr: 'Les règles d’engagement autorisent et limitent une activité d’évaluation particulière. Une évaluation de fournisseur est une vérification préalable plus large de la relation.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-002',
    objective: '5.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which agreement most directly defines a measurable service availability target?',
      fr: 'Quel accord définit le plus directement un objectif mesurable de disponibilité du service ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Service level agreement (SLA)', fr: 'Accord de niveau de service (SLA)' },
        correct: true,
        explanation: {
          en: 'An SLA states measurable expectations such as availability, response time, or resolution time and identifies how service performance is evaluated.',
          fr: 'Un SLA énonce des attentes mesurables, telles que disponibilité, délai de réponse ou délai de résolution, et indique comment la performance est évaluée.',
        },
      },
      {
        id: 'b',
        text: { en: 'Non-disclosure agreement (NDA)', fr: 'Accord de confidentialité (NDA)' },
        correct: false,
        explanation: {
          en: 'An NDA restricts disclosure of confidential information. It does not define an uptime threshold or the measurement of an operating service.',
          fr: 'Un NDA limite la divulgation d’informations confidentielles. Il ne définit ni seuil de disponibilité ni mesure d’un service en exploitation.',
        },
      },
      {
        id: 'c',
        text: { en: 'Statement of work (SOW)', fr: 'Énoncé des travaux (SOW)' },
        correct: false,
        explanation: {
          en: 'An SOW describes a specific work scope, deliverables, and schedule. It can mention quality, but an SLA is the agreement designed for service levels.',
          fr: 'Un SOW décrit un périmètre de travail, des livrables et un calendrier. Il peut évoquer la qualité, mais le SLA est conçu pour les niveaux de service.',
        },
      },
      {
        id: 'd',
        text: { en: 'Memorandum of understanding (MOU)', fr: 'Protocole d’accord (MOU)' },
        correct: false,
        explanation: {
          en: 'An MOU records a shared understanding between parties. It is not normally the detailed instrument for measuring continuing service availability.',
          fr: 'Un MOU consigne une compréhension commune entre parties. Ce n’est pas normalement l’instrument détaillé qui mesure une disponibilité continue.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-003',
    objective: '5.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A payroll provider will process employee bank details and needs an API connection to the HR system. What should the security team do before approving the relationship?',
      fr: 'Un prestataire de paie traitera des coordonnées bancaires et nécessite une connexion API au système RH. Que doit faire l’équipe sécurité avant d’approuver la relation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Perform a vendor assessment focused on the data, access, and controls involved',
          fr: 'Réaliser une évaluation du fournisseur centrée sur les données, accès et contrôles concernés',
        },
        correct: true,
        explanation: {
          en: 'Sensitive data and a system connection create a material relationship risk. Assessment determines the exposure and required controls before approval.',
          fr: 'Des données sensibles et une connexion système créent un risque relationnel important. L’évaluation détermine l’exposition et les contrôles requis avant l’approbation.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Wait until the first annual vendor review',
          fr: 'Attendre la première revue annuelle du fournisseur',
        },
        correct: false,
        explanation: {
          en: 'Annual review is a monitoring activity after onboarding. It cannot replace the initial due diligence needed before bank details are shared.',
          fr: 'La revue annuelle est une activité de surveillance après intégration. Elle ne peut remplacer la vérification préalable avant le partage de coordonnées bancaires.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Use rules of engagement to approve the API connection',
          fr: 'Utiliser des règles d’engagement pour approuver la connexion API',
        },
        correct: false,
        explanation: {
          en: 'Rules of engagement define boundaries for authorised testing. They do not evaluate whether a provider should receive data or system access.',
          fr: 'Les règles d’engagement définissent les limites d’un test autorisé. Elles n’évaluent pas si un prestataire doit recevoir des données ou un accès système.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Select the lowest-cost payroll provider',
          fr: 'Sélectionner le prestataire de paie au coût le plus bas',
        },
        correct: false,
        explanation: {
          en: 'Cost is one selection criterion, but choosing on price alone ignores the risks created by sensitive information and privileged integration.',
          fr: 'Le coût est un critère de sélection, mais choisir uniquement selon le prix ignore les risques des informations sensibles et de l’intégration privilégiée.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-004',
    objective: '5.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the purpose of a vendor security questionnaire?',
      fr: 'Quel est le rôle d’un questionnaire de sécurité fournisseur ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Collect comparable information about a vendor’s relevant security practices',
          fr: 'Recueillir des informations comparables sur les pratiques de sécurité pertinentes du fournisseur',
        },
        correct: true,
        explanation: {
          en: 'Questionnaires structure information gathering about controls, data handling, and response capabilities so reviewers can compare vendors and identify follow-up.',
          fr: 'Les questionnaires structurent la collecte sur les contrôles, données et capacités de réponse afin de comparer les fournisseurs et d’identifier les suivis nécessaires.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Prove automatically that every stated control operates effectively',
          fr: 'Prouver automatiquement que chaque contrôle déclaré fonctionne efficacement',
        },
        correct: false,
        explanation: {
          en: 'A questionnaire records the vendor’s response. Supporting evidence or verification may be needed because a response alone does not establish operating effectiveness.',
          fr: 'Un questionnaire consigne la réponse du fournisseur. Des éléments à l’appui ou une vérification peuvent être nécessaires, car une réponse seule ne prouve pas l’efficacité.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Set the financial penalties for a service outage',
          fr: 'Fixer les pénalités financières lors d’une interruption de service',
        },
        correct: false,
        explanation: {
          en: 'Financial remedies and service expectations belong in an agreement. A questionnaire gathers assessment information rather than creating contractual obligations.',
          fr: 'Les recours financiers et attentes de service relèvent d’un accord. Un questionnaire collecte des informations d’évaluation, sans créer d’obligation contractuelle.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Define emergency stop conditions for a security test',
          fr: 'Définir les conditions d’arrêt d’urgence pour un test de sécurité',
        },
        correct: false,
        explanation: {
          en: 'Emergency stops and testing boundaries belong in rules of engagement. A vendor questionnaire is not authorisation to conduct intrusive technical activity.',
          fr: 'Les arrêts d’urgence et limites de test relèvent des règles d’engagement. Un questionnaire fournisseur n’autorise pas une activité technique intrusive.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-005',
    objective: '5.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A contract needs to describe a consultant’s specific deliverables, project dates, and responsibilities. Which agreement is the best fit?',
      fr: 'Un contrat doit décrire les livrables précis, dates de projet et responsabilités d’un consultant. Quel accord convient le mieux ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Statement of work (SOW)', fr: 'Énoncé des travaux (SOW)' },
        correct: true,
        explanation: {
          en: 'An SOW defines a particular engagement: the scope of work, expected deliverables, schedule, and responsibilities for that work.',
          fr: 'Un SOW définit une mission précise : périmètre du travail, livrables attendus, calendrier et responsabilités associées à ce travail.',
        },
      },
      {
        id: 'b',
        text: { en: 'Service level agreement (SLA)', fr: 'Accord de niveau de service (SLA)' },
        correct: false,
        explanation: {
          en: 'An SLA measures continuing service outcomes such as availability. It does not primarily describe the scope and deliverables of a distinct project.',
          fr: 'Un SLA mesure des résultats continus comme la disponibilité. Il ne décrit pas principalement le périmètre et les livrables d’un projet distinct.',
        },
      },
      {
        id: 'c',
        text: { en: 'Non-disclosure agreement (NDA)', fr: 'Accord de confidentialité (NDA)' },
        correct: false,
        explanation: {
          en: 'An NDA controls confidential-information disclosure. It can accompany the work but does not establish which work the consultant must deliver.',
          fr: 'Un NDA contrôle la divulgation d’informations confidentielles. Il peut accompagner le travail, mais ne définit pas les livrables du consultant.',
        },
      },
      {
        id: 'd',
        text: { en: 'Rules of engagement', fr: 'Règles d’engagement' },
        correct: false,
        explanation: {
          en: 'Rules of engagement limit an authorised assessment activity, often a security test. They are not the general project definition for consulting deliverables.',
          fr: 'Les règles d’engagement limitent une activité d’évaluation autorisée, souvent un test de sécurité. Elles ne définissent pas un projet de conseil général.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-006',
    objective: '5.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A critical managed-service provider adds a subcontractor that will now access production logs. The provider passed assessment last year. What is the most appropriate next action?',
      fr: 'Un prestataire critique de services gérés ajoute un sous-traitant qui accédera désormais aux journaux de production. Le prestataire a réussi son évaluation l’an dernier. Quelle action est la plus appropriée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Reassess and monitor the changed relationship, including the subcontractor exposure',
          fr: 'Réévaluer et surveiller la relation modifiée, y compris l’exposition liée au sous-traitant',
        },
        correct: true,
        explanation: {
          en: 'A material change in who can access production information changes the risk profile. Ongoing monitoring and reassessment should address that new exposure.',
          fr: 'Un changement important de personnes pouvant accéder aux informations de production modifie le profil de risque. La surveillance et réévaluation doivent traiter cette nouvelle exposition.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Reuse the prior approval because the vendor name has not changed',
          fr: 'Réutiliser l’approbation antérieure, car le nom du fournisseur n’a pas changé',
        },
        correct: false,
        explanation: {
          en: 'Approval was based on an earlier relationship. A new subcontractor and new access can alter controls, data handling, and accountability.',
          fr: 'L’approbation reposait sur une relation antérieure. Un nouveau sous-traitant et de nouveaux accès peuvent modifier les contrôles, données et responsabilités.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Issue a questionnaire only after a security incident occurs',
          fr: 'Émettre un questionnaire seulement après un incident de sécurité',
        },
        correct: false,
        explanation: {
          en: 'Questionnaires support proactive assessment and follow-up. Waiting for an incident leaves a known, material relationship change unexamined.',
          fr: 'Les questionnaires soutiennent une évaluation proactive et le suivi. Attendre un incident laisse sans examen un changement relationnel important déjà connu.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Write rules of engagement for normal log access',
          fr: 'Rédiger des règles d’engagement pour l’accès normal aux journaux',
        },
        correct: false,
        explanation: {
          en: 'Rules of engagement are for bounded testing activity. Normal operational access should be governed by assessment findings, agreements, and access controls.',
          fr: 'Les règles d’engagement concernent une activité de test limitée. L’accès opérationnel normal relève des conclusions d’évaluation, accords et contrôles d’accès.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-007',
    objective: '5.3',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which statement best distinguishes vendor selection from vendor assessment?',
      fr: 'Quelle affirmation distingue le mieux la sélection du fournisseur de son évaluation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Assessment identifies risks; selection chooses a candidate against defined requirements',
          fr: 'L’évaluation identifie les risques ; la sélection choisit un candidat selon des exigences définies',
        },
        correct: true,
        explanation: {
          en: 'Assessment supplies risk information about candidates and their gaps. Selection uses that information with business requirements to choose an acceptable vendor.',
          fr: 'L’évaluation fournit des informations de risque sur les candidats et leurs écarts. La sélection utilise ces informations et les exigences métier pour choisir un fournisseur acceptable.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Assessment happens only after a contract is signed; selection happens only at termination',
          fr: 'L’évaluation intervient uniquement après signature ; la sélection uniquement à la fin de relation',
        },
        correct: false,
        explanation: {
          en: 'Assessment normally informs selection and can recur as risk changes. Termination is a separate lifecycle activity, not the definition of selection.',
          fr: 'L’évaluation informe normalement la sélection et peut se répéter si le risque change. La fin de relation est une activité distincte, pas la définition de la sélection.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Assessment defines test boundaries; selection defines data confidentiality',
          fr: 'L’évaluation définit les limites de test ; la sélection définit la confidentialité des données',
        },
        correct: false,
        explanation: {
          en: 'Test boundaries are rules of engagement, while confidentiality obligations belong in agreements. Neither statement describes the assessment-versus-selection distinction.',
          fr: 'Les limites de test relèvent des règles d’engagement, tandis que les obligations de confidentialité relèvent des accords. Cela ne distingue pas évaluation et sélection.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Assessment sets uptime penalties; selection gathers security answers',
          fr: 'L’évaluation fixe les pénalités de disponibilité ; la sélection collecte des réponses de sécurité',
        },
        correct: false,
        explanation: {
          en: 'Uptime remedies are contractual and security answers are commonly collected through questionnaires. These activities can inform decisions but do not define the two processes.',
          fr: 'Les recours de disponibilité sont contractuels et les réponses de sécurité proviennent souvent de questionnaires. Ces activités peuvent éclairer la décision sans définir les processus.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-008',
    objective: '5.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the primary purpose of rules of engagement for a vendor-hosted security test?',
      fr: 'Quel est le but premier des règles d’engagement pour un test de sécurité hébergé par un fournisseur ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Define and authorise the permitted scope, timing, and methods of the test',
          fr: 'Définir et autoriser le périmètre, calendrier et méthodes permis pour le test',
        },
        correct: true,
        explanation: {
          en: 'Rules of engagement provide explicit permission and safe boundaries. They clarify targets, techniques, contacts, reporting, and when testing must stop.',
          fr: 'Les règles d’engagement donnent une autorisation explicite et des limites sûres. Elles précisent cibles, techniques, contacts, signalement et conditions d’arrêt.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Establish whether the provider is the best commercial choice',
          fr: 'Établir si le prestataire représente le meilleur choix commercial',
        },
        correct: false,
        explanation: {
          en: 'Commercial choice is made through vendor selection using assessment information and business requirements. Test rules do not compare competing providers.',
          fr: 'Le choix commercial résulte de la sélection fournisseur utilisant évaluation et exigences métier. Les règles de test ne comparent pas des prestataires concurrents.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Require the provider to keep information confidential',
          fr: 'Exiger que le prestataire conserve les informations confidentielles',
        },
        correct: false,
        explanation: {
          en: 'Confidentiality requirements belong in an NDA or appropriate contract terms. Test rules can address data handling but do not replace that continuing obligation.',
          fr: 'Les exigences de confidentialité relèvent d’un NDA ou de clauses contractuelles adaptées. Les règles peuvent traiter les données du test, sans remplacer cette obligation.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Set the monthly availability measurement target',
          fr: 'Fixer l’objectif mensuel de mesure de disponibilité',
        },
        correct: false,
        explanation: {
          en: 'A service-level agreement defines measurable availability expectations. Rules of engagement are about a limited security activity, not operating service performance.',
          fr: 'Un SLA définit des attentes mesurables de disponibilité. Les règles d’engagement concernent une activité de sécurité limitée, pas la performance du service.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-009',
    objective: '5.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A vendor reports 99.5% monthly availability, but the organisation expected 99.9%. Which artefact should the team review first to determine whether the vendor missed an obligation?',
      fr: 'Un fournisseur annonce 99,5 % de disponibilité mensuelle, alors que l’organisation attendait 99,9 %. Quel artefact faut-il examiner d’abord pour déterminer s’il a manqué une obligation ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'The service level agreement', fr: 'L’accord de niveau de service' },
        correct: true,
        explanation: {
          en: 'The SLA documents measurable service commitments, including how availability is calculated. It determines whether 99.9% was a contractual obligation.',
          fr: 'Le SLA documente les engagements mesurables de service, dont le calcul de disponibilité. Il détermine si 99,9 % était une obligation contractuelle.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The vendor’s original questionnaire',
          fr: 'Le questionnaire initial du fournisseur',
        },
        correct: false,
        explanation: {
          en: 'A questionnaire may describe controls and capabilities, but it is not normally the agreement that sets a binding monthly availability measurement.',
          fr: 'Un questionnaire peut décrire contrôles et capacités, mais il n’est pas normalement l’accord qui fixe une mesure mensuelle obligatoire de disponibilité.',
        },
      },
      {
        id: 'c',
        text: { en: 'The rules of engagement', fr: 'Les règles d’engagement' },
        correct: false,
        explanation: {
          en: 'Rules of engagement govern authorised testing activities. They do not define routine service performance thresholds or remedies for missed uptime.',
          fr: 'Les règles d’engagement régissent des activités de test autorisées. Elles ne fixent pas les seuils de service courants ni les recours liés à la disponibilité.',
        },
      },
      {
        id: 'd',
        text: { en: 'The statement of work', fr: 'L’énoncé des travaux' },
        correct: false,
        explanation: {
          en: 'An SOW defines the work and deliverables of a project. The specific continuing availability commitment is most directly addressed by an SLA.',
          fr: 'Un SOW définit les travaux et livrables d’un projet. L’engagement continu de disponibilité relève le plus directement d’un SLA.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-010',
    objective: '5.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Why should a vendor questionnaire be tailored to the service being considered?',
      fr: 'Pourquoi un questionnaire fournisseur doit-il être adapté au service envisagé ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It focuses review on the data, access, and controls that create risk in that relationship',
          fr: 'Il concentre la revue sur données, accès et contrôles qui créent le risque dans cette relation',
        },
        correct: true,
        explanation: {
          en: 'Relevant questions expose relationship-specific risks. A provider handling sensitive data needs different scrutiny from a supplier with no system or data access.',
          fr: 'Des questions pertinentes révèlent les risques propres à la relation. Un prestataire traitant des données sensibles exige un examen différent d’un fournisseur sans accès système ou données.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It removes the need to verify high-risk vendor claims',
          fr: 'Il élimine le besoin de vérifier les déclarations du fournisseur à risque élevé',
        },
        correct: false,
        explanation: {
          en: 'Tailoring improves information gathering but does not transform self-reported answers into verified evidence. Material claims can still need independent support.',
          fr: 'L’adaptation améliore la collecte, mais ne transforme pas des réponses déclaratives en preuves vérifiées. Les affirmations importantes peuvent toujours exiger un appui indépendant.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It automatically creates the contract between the parties',
          fr: 'Il crée automatiquement le contrat entre les parties',
        },
        correct: false,
        explanation: {
          en: 'Questionnaires are due-diligence tools, whereas agreements create obligations. Even a thorough questionnaire does not establish binding terms or remedies.',
          fr: 'Les questionnaires sont des outils de vérification préalable, alors que les accords créent des obligations. Même complet, un questionnaire ne fixe pas de clauses obligatoires.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It makes annual monitoring unnecessary after selection',
          fr: 'Il rend la surveillance annuelle inutile après la sélection',
        },
        correct: false,
        explanation: {
          en: 'Risk can change through new access, subcontractors, incidents, or service changes. An initial questionnaire cannot replace monitoring over the relationship.',
          fr: 'Le risque peut changer avec de nouveaux accès, sous-traitants, incidents ou services. Un questionnaire initial ne remplace pas la surveillance pendant la relation.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-011',
    objective: '5.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'An organisation wants an external firm to test a customer portal. A test could trigger fraud controls and accidentally affect real orders. What should be agreed before testing begins?',
      fr: 'Une organisation veut qu’une société externe teste un portail client. Le test pourrait déclencher les contrôles anti-fraude et affecter accidentellement de vraies commandes. De quoi faut-il convenir avant le début du test ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Rules of engagement that specify scope, contacts, permitted actions, and stop conditions',
          fr: 'Des règles d’engagement précisant périmètre, contacts, actions permises et conditions d’arrêt',
        },
        correct: true,
        explanation: {
          en: 'The proposed testing has operational risk. Rules of engagement establish permission and safeguards so testing can be coordinated and stopped safely.',
          fr: 'Le test proposé présente un risque opérationnel. Les règles d’engagement établissent permission et garde-fous afin de coordonner et arrêter le test en sécurité.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A vendor selection scorecard comparing several firms',
          fr: 'Une grille de sélection comparant plusieurs sociétés',
        },
        correct: false,
        explanation: {
          en: 'Selection may already be complete. The immediate need is to control an authorised test, not compare providers against procurement criteria.',
          fr: 'La sélection peut déjà être terminée. Le besoin immédiat est de contrôler un test autorisé, non de comparer des prestataires selon des critères achats.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A service level agreement for portal availability',
          fr: 'Un accord de niveau de service pour la disponibilité du portail',
        },
        correct: false,
        explanation: {
          en: 'Availability requirements are useful operational terms, but they do not authorise testing or define which techniques are safe during the test.',
          fr: 'Les exigences de disponibilité sont utiles, mais elles n’autorisent pas le test ni ne définissent les techniques sûres pendant celui-ci.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A standard vendor questionnaire with no test-specific details',
          fr: 'Un questionnaire fournisseur standard sans détails propres au test',
        },
        correct: false,
        explanation: {
          en: 'A questionnaire collects security information; it does not coordinate risky active testing. The scenario requires explicit, test-specific boundaries.',
          fr: 'Un questionnaire collecte des informations de sécurité ; il ne coordonne pas un test actif risqué. Le scénario exige des limites explicites propres au test.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-012',
    objective: '5.3',
    kind: 'discrimination',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'Which activities are examples of ongoing vendor monitoring? (Select two.)',
      fr: 'Quelles activités sont des exemples de surveillance continue du fournisseur ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Reviewing whether a critical vendor still meets its agreed SLA metrics',
          fr: 'Vérifier qu’un fournisseur critique respecte toujours les mesures de SLA convenues',
        },
        correct: true,
        explanation: {
          en: 'Reviewing performance against agreed service commitments is recurring oversight. It identifies deterioration after the vendor has entered the relationship.',
          fr: 'Vérifier la performance face aux engagements de service est une supervision récurrente. Cela identifie une dégradation après l’entrée du fournisseur dans la relation.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Reassessing a provider after it moves sensitive data to a new region',
          fr: 'Réévaluer un prestataire après déplacement de données sensibles vers une nouvelle région',
        },
        correct: true,
        explanation: {
          en: 'A material service change can alter regulatory, data-handling, and resilience risk. Reassessment after that change is appropriate monitoring.',
          fr: 'Un changement de service important peut modifier les risques réglementaires, de données et de résilience. Une réévaluation après ce changement constitue une surveillance adaptée.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Choosing a preferred bidder before any contract exists',
          fr: 'Choisir un soumissionnaire préféré avant tout contrat',
        },
        correct: false,
        explanation: {
          en: 'Choosing among candidates is vendor selection. Monitoring occurs during an established relationship to confirm continued compliance and manage change.',
          fr: 'Choisir parmi des candidats relève de la sélection. La surveillance intervient dans une relation établie pour confirmer le maintien des exigences et gérer les changements.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Setting the scope for a one-time penetration test',
          fr: 'Fixer le périmètre d’un test d’intrusion ponctuel',
        },
        correct: false,
        explanation: {
          en: 'Setting active-test scope is rules of engagement. It governs a particular activity rather than routinely overseeing the vendor’s continuing risk.',
          fr: 'Fixer le périmètre d’un test actif relève des règles d’engagement. Cela gouverne une activité précise plutôt que le risque permanent du fournisseur.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-013',
    objective: '5.3',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'Which agreement is primarily intended to limit disclosure of confidential information shared with a prospective vendor?',
      fr: 'Quel accord vise principalement à limiter la divulgation d’informations confidentielles partagées avec un fournisseur potentiel ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Non-disclosure agreement (NDA)', fr: 'Accord de confidentialité (NDA)' },
        correct: true,
        explanation: {
          en: 'An NDA establishes confidentiality obligations for information exchanged between parties, including information shared while evaluating a proposed relationship.',
          fr: 'Un NDA établit des obligations de confidentialité pour les informations échangées entre parties, y compris durant l’évaluation d’une relation envisagée.',
        },
      },
      {
        id: 'b',
        text: { en: 'Service level agreement (SLA)', fr: 'Accord de niveau de service (SLA)' },
        correct: false,
        explanation: {
          en: 'An SLA defines measurable expectations for a delivered service. Confidentiality can be important, but it is not the SLA’s primary purpose.',
          fr: 'Un SLA définit des attentes mesurables pour un service fourni. La confidentialité peut compter, mais ce n’est pas sa finalité première.',
        },
      },
      {
        id: 'c',
        text: { en: 'Statement of work (SOW)', fr: 'Énoncé des travaux (SOW)' },
        correct: false,
        explanation: {
          en: 'An SOW describes specific work, deliverables, and responsibilities. It can accompany an NDA but does not primarily restrict information disclosure.',
          fr: 'Un SOW décrit travaux, livrables et responsabilités précis. Il peut accompagner un NDA, mais ne limite pas principalement la divulgation.',
        },
      },
      {
        id: 'd',
        text: { en: 'Rules of engagement', fr: 'Règles d’engagement' },
        correct: false,
        explanation: {
          en: 'Rules of engagement control an authorised test’s scope and conduct. They are not the general confidentiality agreement for exchanged business information.',
          fr: 'Les règles d’engagement contrôlent le périmètre et la conduite d’un test autorisé. Elles ne sont pas l’accord général de confidentialité des informations métier.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-014',
    objective: '5.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A cloud vendor’s questionnaire states that administrators use multifactor authentication. The service will store regulated customer data. What should the assessor do with this answer?',
      fr: 'Le questionnaire d’un fournisseur cloud indique que les administrateurs utilisent l’authentification multifacteur. Le service stockera des données clients réglementées. Que doit faire l’évaluateur de cette réponse ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Treat it as an assessment input and seek appropriate supporting assurance',
          fr: 'La traiter comme un élément d’évaluation et demander une assurance justificative adaptée',
        },
        correct: true,
        explanation: {
          en: 'The questionnaire answer is valuable input, but the risk level warrants evidence or verification appropriate to the relationship before relying on the claim.',
          fr: 'La réponse est un élément utile, mais le niveau de risque justifie une preuve ou vérification adaptée avant de s’appuyer sur cette déclaration.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Treat the answer as automatic proof that all vendor controls are effective',
          fr: 'La considérer comme preuve automatique que tous les contrôles sont efficaces',
        },
        correct: false,
        explanation: {
          en: 'One self-reported control statement neither verifies its operation nor proves the effectiveness of other controls needed to protect regulated data.',
          fr: 'Une déclaration d’autoévaluation ne vérifie ni son fonctionnement ni l’efficacité des autres contrôles nécessaires aux données réglementées.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Use the answer as the rules of engagement for a penetration test',
          fr: 'Utiliser la réponse comme règles d’engagement d’un test d’intrusion',
        },
        correct: false,
        explanation: {
          en: 'A questionnaire response contains no testing permission, target scope, methods, contacts, or stop conditions. Those must be separately agreed.',
          fr: 'Une réponse de questionnaire ne contient ni permission de test, ni périmètre, méthodes, contacts ou conditions d’arrêt. Ces éléments doivent être convenus séparément.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Postpone all assessment until after the vendor is selected',
          fr: 'Reporter toute évaluation après la sélection du fournisseur',
        },
        correct: false,
        explanation: {
          en: 'The answer should inform due diligence before a decision. Deferring assessment can turn known risk gaps into expensive late discoveries.',
          fr: 'La réponse doit éclairer la vérification préalable avant la décision. Reporter l’évaluation peut transformer des écarts connus en découvertes tardives coûteuses.',
        },
      },
    ],
  },
  {
    id: 'q-5-3-015',
    objective: '5.3',
    kind: 'scenario',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'Before allowing a security firm to test a vendor-hosted production application, which items should appear in rules of engagement? (Select two.)',
      fr: 'Avant d’autoriser une société de sécurité à tester une application de production hébergée par un fournisseur, quels éléments doivent figurer dans les règles d’engagement ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The approved targets and testing techniques',
          fr: 'Les cibles et techniques de test approuvées',
        },
        correct: true,
        explanation: {
          en: 'Clear scope prevents accidental testing of unapproved systems and makes it possible to distinguish permitted testing from unauthorised activity.',
          fr: 'Un périmètre clair évite le test accidentel de systèmes non approuvés et permet de distinguer un test permis d’une activité non autorisée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Points of contact and conditions for stopping the test',
          fr: 'Les contacts et conditions d’arrêt du test',
        },
        correct: true,
        explanation: {
          en: 'Contacts and stop conditions allow rapid coordination when testing threatens operations or creates an unexpected outcome, protecting both the vendor and organisation.',
          fr: 'Les contacts et conditions d’arrêt permettent une coordination rapide lorsque le test menace les opérations ou produit un effet imprévu, protégeant les deux parties.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A final decision to select the vendor over all competitors',
          fr: 'La décision finale de sélectionner ce fournisseur plutôt que ses concurrents',
        },
        correct: false,
        explanation: {
          en: 'Vendor selection is a procurement and risk decision that can precede a test. It is not a boundary or authorisation requirement for test execution.',
          fr: 'La sélection fournisseur est une décision achats et risque pouvant précéder le test. Ce n’est pas une limite ni une exigence d’autorisation pour exécuter le test.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The vendor’s standard monthly availability percentage',
          fr: 'Le pourcentage mensuel standard de disponibilité du fournisseur',
        },
        correct: false,
        explanation: {
          en: 'Availability commitments belong in an SLA and measure service performance. They do not establish what a tester may do or when to stop.',
          fr: 'Les engagements de disponibilité relèvent d’un SLA et mesurent le service. Ils ne fixent pas ce qu’un testeur peut faire ni quand il doit s’arrêter.',
        },
      },
    ],
  },
];
