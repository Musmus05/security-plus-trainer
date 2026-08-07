import type { Question } from '@/content/schemas';

/** Original practice questions written from objective 5.1 only. */
export const QUESTIONS_5_1: Question[] = [
  {
    id: 'q-5-1-001',
    objective: '5.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which document gives high-level, management-approved direction for security?',
      fr: 'Quel document fournit une direction de sécurité générale approuvée par la direction ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Policy', fr: 'Politique' },
        correct: true,
        explanation: {
          en: 'A policy states the organisation’s required direction and intent. It is broad enough to guide many related standards and procedures.',
          fr: 'Une politique exprime la direction et les attentes obligatoires de l’organisation. Elle est assez large pour guider plusieurs normes et procédures associées.',
        },
      },
      {
        id: 'b',
        text: { en: 'Standard', fr: 'Norme' },
        correct: false,
        explanation: {
          en: 'A standard is mandatory, but it makes policy concrete through specific requirements. It does not normally establish the broad organisational direction.',
          fr: 'Une norme est obligatoire, mais elle concrétise une politique par des exigences précises. Elle ne fixe normalement pas la direction organisationnelle générale.',
        },
      },
      {
        id: 'c',
        text: { en: 'Procedure', fr: 'Procédure' },
        correct: false,
        explanation: {
          en: 'A procedure supplies ordered actions for a task. It supports governance by making work repeatable, but it is not the top-level direction.',
          fr: 'Une procédure fournit des actions ordonnées pour une tâche. Elle rend le travail reproductible, mais elle ne constitue pas une direction de haut niveau.',
        },
      },
      {
        id: 'd',
        text: { en: 'Guideline', fr: 'Ligne directrice' },
        correct: false,
        explanation: {
          en: 'A guideline recommends a useful approach while leaving room for judgment. It is deliberately less binding than a management-approved policy.',
          fr: 'Une ligne directrice recommande une approche utile tout en laissant place au jugement. Elle est volontairement moins contraignante qu’une politique approuvée.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-002',
    objective: '5.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A document requires every administrator to use multifactor authentication. What type of document is it most likely to be?',
      fr: 'Un document impose l’authentification multifacteur à chaque administrateur. De quel type de document s’agit-il probablement ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A standard', fr: 'Une norme' },
        correct: true,
        explanation: {
          en: 'The statement is a specific, mandatory, measurable requirement that implements broader access-control policy. That is the usual role of a standard.',
          fr: 'Cette formulation est une exigence précise, obligatoire et mesurable qui applique une politique générale de contrôle d’accès. C’est le rôle habituel d’une norme.',
        },
      },
      {
        id: 'b',
        text: { en: 'A guideline', fr: 'Une ligne directrice' },
        correct: false,
        explanation: {
          en: 'Guidelines recommend rather than compel. Wording that every administrator is required to use a factor leaves no discretionary choice.',
          fr: 'Les lignes directrices recommandent au lieu d’imposer. Exiger un facteur pour chaque administrateur ne laisse aucun choix discrétionnaire.',
        },
      },
      {
        id: 'c',
        text: { en: 'A procedure', fr: 'Une procédure' },
        correct: false,
        explanation: {
          en: 'A procedure would list the enrollment and use steps for the factor. This statement defines the required outcome, not the workflow.',
          fr: 'Une procédure détaillerait les étapes d’inscription et d’utilisation du facteur. Ici, le texte définit le résultat imposé, pas le déroulement du travail.',
        },
      },
      {
        id: 'd',
        text: { en: 'An audit report', fr: 'Un rapport d’audit' },
        correct: false,
        explanation: {
          en: 'An audit report records observations about controls and compliance. It may reveal this requirement is missing, but it does not normally create it.',
          fr: 'Un rapport d’audit consigne des observations sur les contrôles et la conformité. Il peut révéler l’absence de cette exigence, mais ne la crée pas normalement.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-003',
    objective: '5.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An analyst needs the exact approved steps for disabling a departed employee’s account. Which document should the analyst use?',
      fr: 'Un analyste cherche les étapes approuvées pour désactiver le compte d’un employé parti. Quel document doit-il utiliser ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The account deprovisioning procedure',
          fr: 'La procédure de déprovisionnement du compte',
        },
        correct: true,
        explanation: {
          en: 'A procedure translates requirements into a repeatable sequence of actions. It should tell the analyst what to check, perform, record, and verify.',
          fr: 'Une procédure transforme les exigences en une séquence d’actions reproductibles. Elle indique ce qui doit être vérifié, effectué, consigné et validé.',
        },
      },
      {
        id: 'b',
        text: { en: 'The identity-management policy', fr: 'La politique de gestion des identités' },
        correct: false,
        explanation: {
          en: 'The policy can require timely deprovisioning, but it does not need to contain each operational click or verification step the analyst must take.',
          fr: 'La politique peut exiger un déprovisionnement rapide, mais elle ne contient pas nécessairement chaque action opérationnelle ou validation requise.',
        },
      },
      {
        id: 'c',
        text: { en: 'The authentication standard', fr: 'La norme d’authentification' },
        correct: false,
        explanation: {
          en: 'An authentication standard defines required controls such as multifactor authentication. It is adjacent to identity work but does not describe account removal.',
          fr: 'Une norme d’authentification définit des contrôles exigés, comme le multifacteur. Elle est proche de la gestion d’identité sans décrire la suppression du compte.',
        },
      },
      {
        id: 'd',
        text: { en: 'A security guideline', fr: 'Une ligne directrice de sécurité' },
        correct: false,
        explanation: {
          en: 'Guidelines allow judgment where several reasonable methods exist. Disabling a former employee’s account needs a controlled, repeatable process instead.',
          fr: 'Les lignes directrices laissent du jugement lorsque plusieurs méthodes conviennent. La désactivation d’un ancien employé exige plutôt un processus contrôlé et reproductible.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-004',
    objective: '5.1',
    kind: 'discrimination',
    difficulty: 'easy',
    prompt: {
      en: 'Which statement best describes a security guideline?',
      fr: 'Quel énoncé décrit le mieux une ligne directrice de sécurité ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It recommends a preferred practice while allowing professional judgment',
          fr: 'Elle recommande une pratique privilégiée tout en laissant un jugement professionnel',
        },
        correct: true,
        explanation: {
          en: 'Guidelines help people make consistent decisions without turning every context into a rigid compliance requirement. They are advisory by design.',
          fr: 'Les lignes directrices aident à prendre des décisions cohérentes sans rendre chaque contexte rigide. Elles ont volontairement un caractère consultatif.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It establishes broad mandatory direction for the company',
          fr: 'Elle fixe une direction obligatoire générale pour l’entreprise',
        },
        correct: false,
        explanation: {
          en: 'That is the function of a policy. A guideline may support policy goals, but it does not normally create an enterprise-wide obligation.',
          fr: 'C’est la fonction d’une politique. Une ligne directrice peut soutenir les objectifs d’une politique, mais ne crée normalement pas une obligation générale.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It defines a mandatory technical baseline',
          fr: 'Elle définit une base technique obligatoire',
        },
        correct: false,
        explanation: {
          en: 'A mandatory baseline is a standard because it specifies what must be implemented. A guideline may suggest a baseline but cannot require it.',
          fr: 'Une base obligatoire est une norme, car elle précise ce qui doit être mis en œuvre. Une ligne directrice peut la suggérer mais ne peut pas l’imposer.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It records evidence collected by auditors',
          fr: 'Elle consigne les éléments recueillis par des auditeurs',
        },
        correct: false,
        explanation: {
          en: 'Audit evidence supports assessment and reporting. It is not a document intended to advise workers how they should make future decisions.',
          fr: 'Les éléments d’audit servent à l’évaluation et au rapport. Ils ne sont pas un document destiné à orienter les décisions futures des équipes.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-005',
    objective: '5.1',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A new customer contract requires encryption for stored records, but the current storage standard permits unencrypted archives. What should occur first?',
      fr: 'Un nouveau contrat client exige le chiffrement des dossiers stockés, mais la norme actuelle autorise des archives non chiffrées. Que faut-il faire en premier ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Assess the contractual obligation and revise the governing documents',
          fr: 'Évaluer l’obligation contractuelle et réviser les documents directeurs',
        },
        correct: true,
        explanation: {
          en: 'The contract is an external governance input. The organisation must map it into policy, standards, procedures, ownership, and then implementation.',
          fr: 'Le contrat est une entrée externe de gouvernance. L’organisation doit le traduire en politiques, normes, procédures, responsabilités, puis en mise en œuvre.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Wait for the next internal audit to identify the gap',
          fr: 'Attendre le prochain audit interne pour identifier l’écart',
        },
        correct: false,
        explanation: {
          en: 'The gap is already known from the signed requirement. Waiting for an audit delays the governance response and extends the period of contractual exposure.',
          fr: 'L’écart est déjà connu grâce à l’exigence signée. Attendre un audit retarde la réponse de gouvernance et prolonge l’exposition contractuelle.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Let each storage administrator decide whether encryption is needed',
          fr: 'Laisser chaque administrateur de stockage décider du besoin de chiffrement',
        },
        correct: false,
        explanation: {
          en: 'A contractual obligation requires consistent governance, not a collection of individual choices. Administrators implement approved requirements rather than redefine them.',
          fr: 'Une obligation contractuelle exige une gouvernance cohérente, pas des décisions individuelles. Les administrateurs appliquent les exigences approuvées au lieu de les redéfinir.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Classify the contract as an internal procedure',
          fr: 'Classer le contrat comme une procédure interne',
        },
        correct: false,
        explanation: {
          en: 'A contract is an external commitment between parties. A procedure may later describe implementation steps, but it does not replace the external obligation.',
          fr: 'Un contrat est un engagement externe entre parties. Une procédure peut ensuite décrire les étapes d’application, mais elle ne remplace pas cette obligation.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-006',
    objective: '5.1',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'What is the main purpose of monitoring a security policy after it is published?',
      fr: 'Quel est le principal objectif du suivi d’une politique de sécurité après sa publication ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'To determine whether it remains effective and is being followed',
          fr: 'Déterminer si elle reste efficace et est respectée',
        },
        correct: true,
        explanation: {
          en: 'Monitoring supplies evidence about compliance, outcomes, exceptions, and changed conditions. That evidence tells governance leaders whether revision is needed.',
          fr: 'Le suivi apporte des éléments sur la conformité, les résultats, les exceptions et les conditions modifiées. Ces éléments indiquent si une révision est nécessaire.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'To eliminate the need for a formal policy review',
          fr: 'Éliminer le besoin d’une revue formelle de la politique',
        },
        correct: false,
        explanation: {
          en: 'Monitoring informs review; it does not replace the decision to review and revise a document. A policy can be measured yet still require formal approval changes.',
          fr: 'Le suivi alimente la revue ; il ne remplace pas la décision de relire et réviser un document. Une politique mesurée peut encore nécessiter des changements approuvés.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'To transfer policy ownership to the audit team',
          fr: 'Transférer la propriété de la politique à l’équipe d’audit',
        },
        correct: false,
        explanation: {
          en: 'Auditors may assess evidence independently, but they do not become owners simply by examining it. Ownership and assurance are deliberately separate roles.',
          fr: 'Les auditeurs peuvent évaluer les éléments de façon indépendante, mais ne deviennent pas propriétaires en les examinant. Propriété et assurance sont des rôles distincts.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'To make every exception permanently approved',
          fr: 'Rendre chaque exception approuvée de manière permanente',
        },
        correct: false,
        explanation: {
          en: 'Monitoring often reveals exceptions that require review, compensating controls, or expiry. It should prevent undocumented permanent deviation, not create it.',
          fr: 'Le suivi révèle souvent des exceptions qui exigent revue, contrôles compensatoires ou expiration. Il doit éviter les écarts permanents non documentés, pas les créer.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-007',
    objective: '5.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A team follows a policy exactly, but a new regulation changes the required breach-notification time. Which governance activity addresses this situation?',
      fr: 'Une équipe respecte une politique exactement, mais une nouvelle réglementation change le délai de notification de violation. Quelle activité de gouvernance traite cette situation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Review and revision of the policy and related documents',
          fr: 'Revue et révision de la politique et des documents associés',
        },
        correct: true,
        explanation: {
          en: 'A change in an external obligation is evidence that governance documents may no longer be sufficient. They must be reviewed, revised, approved, and communicated.',
          fr: 'Un changement d’obligation externe montre que les documents de gouvernance peuvent ne plus suffire. Ils doivent être relus, révisés, approuvés et communiqués.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Issuing a one-time verbal reminder to the team',
          fr: 'Donner un rappel verbal unique à l’équipe',
        },
        correct: false,
        explanation: {
          en: 'A verbal reminder neither changes the controlled requirement nor creates durable evidence. The changed rule must be reflected in approved documentation.',
          fr: 'Un rappel verbal ne modifie pas l’exigence contrôlée et ne crée pas de preuve durable. La règle modifiée doit figurer dans une documentation approuvée.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Delegating notification timing to data custodians',
          fr: 'Déléguer le délai de notification aux gardiens de données',
        },
        correct: false,
        explanation: {
          en: 'Custodians operate data according to owner requirements; they do not set legal notification obligations. The rule needs governance-level ownership and revision.',
          fr: 'Les gardiens exploitent les données selon les exigences du propriétaire ; ils ne fixent pas des obligations légales de notification. La règle demande une révision de gouvernance.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Replacing the policy with a nonbinding guideline',
          fr: 'Remplacer la politique par une ligne directrice non contraignante',
        },
        correct: false,
        explanation: {
          en: 'A regulatory deadline requires enforceable direction and supporting procedures. Replacing it with optional advice would weaken rather than satisfy the obligation.',
          fr: 'Un délai réglementaire exige une direction applicable et des procédures de soutien. Le remplacer par un conseil facultatif affaiblirait l’obligation au lieu de la satisfaire.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-008',
    objective: '5.1',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which governance structure most directly combines enterprise-wide policies with local business-unit implementation?',
      fr: 'Quelle structure de gouvernance combine le plus directement des politiques à l’échelle de l’entreprise et une mise en œuvre par les unités métier ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A hybrid or federated structure', fr: 'Une structure hybride ou fédérée' },
        correct: true,
        explanation: {
          en: 'Hybrid governance preserves central guardrails and oversight while assigning local teams responsibility for implementation. It needs explicit decision rights to work well.',
          fr: 'La gouvernance hybride conserve des garde-fous et une supervision centraux tout en confiant l’application aux équipes locales. Elle exige des droits de décision explicites.',
        },
      },
      {
        id: 'b',
        text: { en: 'A fully centralised structure', fr: 'Une structure entièrement centralisée' },
        correct: false,
        explanation: {
          en: 'Centralisation gives the enterprise function primary authority and reduces local autonomy. It can be consistent, but it does not describe the intended shared implementation model.',
          fr: 'La centralisation donne l’autorité principale à une fonction d’entreprise et réduit l’autonomie locale. Elle peut être cohérente sans décrire le modèle partagé recherché.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A fully decentralised structure',
          fr: 'Une structure entièrement décentralisée',
        },
        correct: false,
        explanation: {
          en: 'Decentralisation gives units their own control and may produce local variation. It lacks the central policy and oversight element stated in the question.',
          fr: 'La décentralisation donne aux unités leur propre contrôle et peut créer des variations locales. Elle ne comporte pas l’élément central de politique et supervision décrit.',
        },
      },
      {
        id: 'd',
        text: { en: 'An operational procedure', fr: 'Une procédure opérationnelle' },
        correct: false,
        explanation: {
          en: 'A procedure describes work steps, not the allocation of authority across an organisation. Governance structure concerns decision rights and accountability.',
          fr: 'Une procédure décrit des étapes de travail, pas la répartition de l’autorité dans une organisation. La structure concerne les droits de décision et la responsabilité.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-009',
    objective: '5.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Who normally determines a dataset’s classification and protection requirements?',
      fr: 'Qui détermine normalement la classification et les exigences de protection d’un jeu de données ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'The data owner', fr: 'Le propriétaire de données' },
        correct: true,
        explanation: {
          en: 'The data owner represents the business interest in data and decides its classification, permitted use, retention, and protection needs.',
          fr: 'Le propriétaire de données représente l’intérêt métier des données et décide de leur classification, usage permis, conservation et besoins de protection.',
        },
      },
      {
        id: 'b',
        text: { en: 'The data custodian', fr: 'Le gardien de données' },
        correct: false,
        explanation: {
          en: 'The custodian implements storage, backups, and access handling according to the owner’s decisions. Operational care is different from business authority.',
          fr: 'Le gardien met en œuvre stockage, sauvegardes et gestion des accès selon les décisions du propriétaire. Le soin opérationnel diffère de l’autorité métier.',
        },
      },
      {
        id: 'c',
        text: { en: 'Any user who creates a file', fr: 'Tout utilisateur créant un fichier' },
        correct: false,
        explanation: {
          en: 'Users may suggest a classification or follow handling labels, but they do not automatically receive authority to set enterprise protection requirements.',
          fr: 'Les utilisateurs peuvent suggérer une classification ou suivre des étiquettes, mais ne reçoivent pas automatiquement l’autorité de fixer des protections d’entreprise.',
        },
      },
      {
        id: 'd',
        text: { en: 'The external auditor', fr: 'L’auditeur externe' },
        correct: false,
        explanation: {
          en: 'An external auditor assesses whether responsibilities and controls are appropriate. Independence would be compromised if that auditor set the classification directly.',
          fr: 'Un auditeur externe évalue l’adéquation des responsabilités et contrôles. Son indépendance serait compromise s’il fixait directement la classification.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-010',
    objective: '5.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which task is most appropriate for a data custodian?',
      fr: 'Quelle tâche convient le mieux à un gardien de données ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Operate backups and apply the owner’s access-handling requirements',
          fr: 'Exploiter les sauvegardes et appliquer les exigences d’accès du propriétaire',
        },
        correct: true,
        explanation: {
          en: 'Custodians perform the practical handling of data, including storage and access administration, within requirements defined by the data owner.',
          fr: 'Les gardiens réalisent la gestion pratique des données, notamment stockage et administration des accès, dans les exigences définies par le propriétaire.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Accept the business risk of exposing customer records',
          fr: 'Accepter le risque métier d’exposition des dossiers clients',
        },
        correct: false,
        explanation: {
          en: 'Accepting business risk belongs with accountable business and data ownership. A custodian supplies technical information but does not make that acceptance decision.',
          fr: 'L’acceptation du risque métier relève des responsables métier et données. Un gardien fournit des informations techniques mais ne prend pas cette décision.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Set the enterprise-wide data classification policy',
          fr: 'Fixer la politique de classification des données à l’échelle de l’entreprise',
        },
        correct: false,
        explanation: {
          en: 'Enterprise policy is set through governance leadership and approved authority. A custodian implements policy rather than establishing its organisation-wide direction.',
          fr: 'La politique d’entreprise est fixée par la direction de gouvernance et une autorité approuvée. Un gardien l’applique au lieu d’en établir la direction générale.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Audit the independence of data ownership decisions',
          fr: 'Auditer l’indépendance des décisions de propriété des données',
        },
        correct: false,
        explanation: {
          en: 'Auditing is an assurance activity that should remain independent from daily data operations. A custodian is an operational role, not the independent assessor.',
          fr: 'L’audit est une activité d’assurance qui doit rester indépendante des opérations quotidiennes. Le gardien est un rôle opérationnel, pas un évaluateur indépendant.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-011',
    objective: '5.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A line-of-business application has no named person responsible for its business purpose, risk acceptance, or retirement. Which role is missing?',
      fr: 'Une application métier n’a personne de nommé pour sa finalité, l’acceptation de risque ou son retrait. Quel rôle manque ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'System owner', fr: 'Propriétaire de système' },
        correct: true,
        explanation: {
          en: 'A system owner is accountable for the system’s business purpose, lifecycle, and acceptable risk. Those are exactly the unassigned decisions in the scenario.',
          fr: 'Un propriétaire de système répond de la finalité métier, du cycle de vie et du risque acceptable. Ce sont précisément les décisions non attribuées dans le scénario.',
        },
      },
      {
        id: 'b',
        text: { en: 'Data custodian', fr: 'Gardien de données' },
        correct: false,
        explanation: {
          en: 'A custodian handles data operations such as storage and backup. The problem includes the entire application lifecycle and business accountability, not only data handling.',
          fr: 'Un gardien assure des opérations de données comme stockage et sauvegarde. Le problème concerne tout le cycle de vie de l’application et sa responsabilité métier.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Security awareness trainer',
          fr: 'Formateur de sensibilisation à la sécurité',
        },
        correct: false,
        explanation: {
          en: 'A trainer can help users recognise obligations, but training responsibility does not assign ownership of an application’s purpose or retirement decision.',
          fr: 'Un formateur peut aider les utilisateurs à connaître leurs obligations, mais la formation ne donne pas la propriété de la finalité ou du retrait d’une application.',
        },
      },
      {
        id: 'd',
        text: { en: 'External regulator', fr: 'Régulateur externe' },
        correct: false,
        explanation: {
          en: 'A regulator may impose obligations, yet it cannot serve as the organisation’s internal accountable owner. The missing responsibility must be assigned inside the business.',
          fr: 'Un régulateur peut imposer des obligations, mais ne peut pas être le responsable interne de l’organisation. La responsabilité manquante doit être attribuée dans l’entreprise.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-012',
    objective: '5.1',
    kind: 'scenario',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'A policy exception allows a legacy system to remain in use for six months. Which details should effective governance record? (Select two.)',
      fr: 'Une exception de politique autorise un système ancien pendant six mois. Quels éléments une gouvernance efficace doit-elle consigner ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The business justification and a named approver',
          fr: 'La justification métier et un approbateur nommé',
        },
        correct: true,
        explanation: {
          en: 'An exception needs a documented reason and accountable approval. These show that the deviation was consciously accepted rather than quietly ignored.',
          fr: 'Une exception exige un motif documenté et une approbation responsable. Ces éléments montrent que l’écart a été consciemment accepté plutôt qu’ignoré silencieusement.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'An expiry or review date and compensating controls',
          fr: 'Une date d’expiration ou de revue et des contrôles compensatoires',
        },
        correct: true,
        explanation: {
          en: 'A time limit prevents an exception from becoming permanent by neglect, while compensating controls reduce risk during the approved period.',
          fr: 'Une limite de temps évite qu’une exception devienne permanente par oubli, tandis que les contrôles compensatoires réduisent le risque pendant la période approuvée.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A promise never to revisit the exception',
          fr: 'La promesse de ne jamais revoir l’exception',
        },
        correct: false,
        explanation: {
          en: 'Exceptions must be reviewed because their risk, business need, and available mitigations can change. A promise not to revisit removes the required oversight.',
          fr: 'Les exceptions doivent être revues car leur risque, besoin métier et mesures possibles évoluent. Promettre de ne pas les revoir supprime la supervision nécessaire.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A replacement for every policy in the organisation',
          fr: 'Un remplacement de chaque politique de l’organisation',
        },
        correct: false,
        explanation: {
          en: 'An exception is scoped to a particular requirement, asset, and period. Replacing all policies would be disproportionate and would erase established governance.',
          fr: 'Une exception est limitée à une exigence, un actif et une période. Remplacer toutes les politiques serait disproportionné et effacerait la gouvernance établie.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-013',
    objective: '5.1',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Why should governance define decision rights in a hybrid security model?',
      fr: 'Pourquoi la gouvernance doit-elle définir les droits de décision dans un modèle de sécurité hybride ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'To prevent central and local teams from leaving ownership gaps or making conflicting decisions',
          fr: 'Éviter que les équipes centrales et locales créent des lacunes ou des décisions contradictoires',
        },
        correct: true,
        explanation: {
          en: 'Hybrid models share authority. Explicit decision rights make clear who sets guardrails, who implements them, and who resolves exceptions or conflicts.',
          fr: 'Les modèles hybrides partagent l’autorité. Des droits explicites précisent qui fixe les garde-fous, qui les applique et qui traite exceptions ou conflits.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'To ensure local teams never provide input',
          fr: 'Garantir que les équipes locales ne donnent jamais leur avis',
        },
        correct: false,
        explanation: {
          en: 'Local expertise is a benefit of hybrid governance. Decision rights allocate accountability; they do not silence the operating teams affected by a control.',
          fr: 'L’expertise locale est un atout de la gouvernance hybride. Les droits de décision répartissent la responsabilité ; ils ne réduisent pas les équipes au silence.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'To convert every guideline into a mandatory standard',
          fr: 'Transformer chaque ligne directrice en norme obligatoire',
        },
        correct: false,
        explanation: {
          en: 'Document type depends on the intended level of obligation, not on the organisational structure. Hybrid governance can use policies, standards, procedures, and guidelines.',
          fr: 'Le type de document dépend du niveau d’obligation voulu, pas de la structure. Une gouvernance hybride peut utiliser politiques, normes, procédures et lignes directrices.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'To remove the need for monitoring and revision',
          fr: 'Supprimer le besoin de suivi et de révision',
        },
        correct: false,
        explanation: {
          en: 'Clear ownership improves monitoring, but governance documents and external obligations still change. No structure makes ongoing review unnecessary.',
          fr: 'Une responsabilité claire améliore le suivi, mais documents et obligations externes continuent d’évoluer. Aucune structure ne rend la revue continue inutile.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-014',
    objective: '5.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the key difference between monitoring and enforcement?',
      fr: 'Quelle est la différence essentielle entre suivi et application ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Monitoring observes compliance; enforcement prevents or responds to noncompliance',
          fr: 'Le suivi observe la conformité ; l’application empêche ou traite la non-conformité',
        },
        correct: true,
        explanation: {
          en: 'Monitoring provides evidence about whether rules are followed and effective. Enforcement applies controls, consequences, or restrictions when requirements are not met.',
          fr: 'Le suivi fournit des éléments sur le respect et l’efficacité des règles. L’application met en place contrôles, conséquences ou restrictions si les exigences ne sont pas respectées.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Monitoring is optional advice; enforcement is a procedure',
          fr: 'Le suivi est un conseil facultatif ; l’application est une procédure',
        },
        correct: false,
        explanation: {
          en: 'Both can be required governance activities, and either may be supported by procedures. Their distinction is observing versus making or requiring a response.',
          fr: 'Les deux peuvent être des activités de gouvernance obligatoires et s’appuyer sur des procédures. Leur différence est l’observation face à la réponse imposée.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Monitoring is done only by data owners; enforcement only by custodians',
          fr: 'Le suivi est fait seulement par les propriétaires ; l’application seulement par les gardiens',
        },
        correct: false,
        explanation: {
          en: 'Roles vary by organisation and control. The concepts describe functions, not an exclusive assignment of people to a single governance activity.',
          fr: 'Les rôles varient selon organisation et contrôle. Ces notions décrivent des fonctions, pas une attribution exclusive de personnes à une activité unique.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Monitoring replaces the need for policy revision',
          fr: 'Le suivi remplace le besoin de réviser la politique',
        },
        correct: false,
        explanation: {
          en: 'Monitoring is evidence that may trigger revision. It cannot update approved language, communicate changed duties, or formally retire an obsolete requirement.',
          fr: 'Le suivi est un élément pouvant déclencher une révision. Il ne peut pas modifier un texte approuvé, communiquer des devoirs modifiés ou retirer une exigence obsolète.',
        },
      },
    ],
  },
  {
    id: 'q-5-1-015',
    objective: '5.1',
    kind: 'scenario',
    difficulty: 'medium',
    multiSelect: true,
    prompt: {
      en: 'During a policy review, which two inputs can demonstrate that revision may be necessary? (Select two.)',
      fr: 'Lors d’une revue de politique, quelles deux entrées peuvent montrer qu’une révision est nécessaire ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A new regulation that changes a reporting duty',
          fr: 'Une nouvelle réglementation modifiant une obligation de déclaration',
        },
        correct: true,
        explanation: {
          en: 'External regulatory change can make a previously correct policy incomplete. Governance should assess and translate the new obligation into controlled internal requirements.',
          fr: 'Un changement réglementaire externe peut rendre une politique auparavant correcte incomplète. La gouvernance doit évaluer et traduire l’obligation en exigences internes contrôlées.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Repeated audit findings that a procedure is not achieving the policy outcome',
          fr: 'Des constats d’audit répétés montrant qu’une procédure n’atteint pas le résultat de la politique',
        },
        correct: true,
        explanation: {
          en: 'Repeated findings are evidence that the documented approach may be ineffective or unclear. Review can correct the procedure, standard, or policy that caused the gap.',
          fr: 'Des constats répétés prouvent que l’approche documentée peut être inefficace ou ambiguë. La revue peut corriger la procédure, norme ou politique à l’origine de l’écart.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A preference to avoid recording document versions',
          fr: 'Une préférence pour éviter de consigner les versions des documents',
        },
        correct: false,
        explanation: {
          en: 'Avoiding version records removes evidence of what was approved and when. It is a governance weakness, not evidence that a particular policy is current.',
          fr: 'Éviter l’historique des versions retire la preuve de ce qui a été approuvé et quand. C’est une faiblesse de gouvernance, pas une preuve qu’une politique est à jour.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A decision to ignore all exception requests',
          fr: 'Une décision d’ignorer toutes les demandes d’exception',
        },
        correct: false,
        explanation: {
          en: 'Exception requests are useful monitoring inputs when assessed and recorded. Ignoring them conceals deviation and risk rather than supplying evidence for sound revision.',
          fr: 'Les demandes d’exception sont des entrées utiles de suivi lorsqu’elles sont évaluées et consignées. Les ignorer masque l’écart et le risque au lieu d’alimenter une bonne révision.',
        },
      },
    ],
  },
];
