import type { Question } from '@/content/schemas';

type Choice = readonly [string, string, boolean];

function question(
  id: string,
  kind: Question['kind'],
  difficulty: Question['difficulty'],
  en: string,
  fr: string,
  choices: readonly Choice[],
  reasonEn: string,
  reasonFr: string,
  multiSelect = false,
): Question {
  const correct = choices
    .filter(([, , isCorrect]) => isCorrect)
    .map(([choice]) => choice)
    .join(' / ');
  return {
    id,
    objective: '5.5',
    kind,
    difficulty,
    prompt: { en, fr },
    ...(multiSelect ? { multiSelect: true } : {}),
    options: choices.map(([choiceEn, choiceFr, isCorrect], index) => ({
      id: ['a', 'b', 'c', 'd'][index] ?? 'a',
      text: { en: choiceEn, fr: choiceFr },
      correct: isCorrect,
      explanation: {
        en: isCorrect
          ? `${choiceEn} is correct because ${reasonEn}`
          : `${choiceEn} is a plausible neighbouring activity, but it does not provide ${correct} in this situation.`,
        fr: isCorrect
          ? `${choiceFr} est correct, car ${reasonFr}`
          : `${choiceFr} est une activité voisine plausible, mais ne fournit pas ${correct} dans cette situation.`,
      },
    })),
  };
}

/** Original practice questions written from the published objective only. */
export const QUESTIONS_5_5: Question[] = [
  question(
    'q-5-5-001',
    'recall',
    'easy',
    'What best describes an attestation?',
    'Quelle description correspond le mieux à une attestation ?',
    [
      [
        'A formal conclusion about an assertion against stated criteria',
        'Une conclusion formelle sur une assertion selon des critères indiqués',
        true,
      ],
      [
        'An informal list of suspected security gaps',
        'Une liste informelle des écarts de sécurité soupçonnés',
        false,
      ],
      [
        'A scan that identifies unpatched hosts',
        'Une analyse qui repère les hôtes non corrigés',
        false,
      ],
      [
        'A remediation plan assigned after an audit',
        'Un plan de correction attribué après un audit',
        false,
      ],
    ],
    'it lets another party rely on a defined claim, criteria, evidence, and conclusion.',
    'elle permet à une autre partie de se fier à une affirmation, des critères, des preuves et une conclusion définis.',
  ),
  question(
    'q-5-5-002',
    'recall',
    'easy',
    'What is the main purpose of an internal audit?',
    'Quelle est la finalité principale d’un audit interne ?',
    [
      [
        'Give the organisation evidence about its own controls',
        'Fournir à l’organisation des éléments sur ses propres contrôles',
        true,
      ],
      [
        'Replace every independent customer review',
        'Remplacer chaque examen indépendant demandé par un client',
        false,
      ],
      [
        'Guarantee that no future incident can occur',
        'Garantir qu’aucun incident futur ne peut survenir',
        false,
      ],
      [
        'Operate controls for their owners',
        'Exploiter les contrôles à la place de leurs propriétaires',
        false,
      ],
    ],
    'it supports internal governance by examining controls and reporting findings management can address.',
    'il soutient la gouvernance interne en examinant les contrôles et en signalant les constats que la direction peut traiter.',
  ),
  question(
    'q-5-5-003',
    'recall',
    'easy',
    'Which item best supports an audit conclusion?',
    'Quel élément soutient le mieux une conclusion d’audit ?',
    [
      [
        'Evidence relevant to the stated criteria and scope',
        'Des preuves pertinentes pour les critères et le périmètre indiqués',
        true,
      ],
      [
        'A security slogan approved by leadership',
        'Un slogan de sécurité approuvé par la direction',
        false,
      ],
      [
        'A promise to correct future findings',
        'Une promesse de corriger les constats futurs',
        false,
      ],
      ['The reviewer’s personal confidence', 'La confiance personnelle du réviseur', false],
    ],
    'relevant evidence connects the observed condition to the requirement and engagement boundary.',
    'des preuves pertinentes relient la condition observée à l’exigence et aux limites de la mission.',
  ),
  question(
    'q-5-5-004',
    'recall',
    'medium',
    'What does an external audit principally add for a customer?',
    'Qu’apporte principalement un audit externe à un client ?',
    [
      [
        'Independence from the organisation being examined',
        'Une indépendance vis-à-vis de l’organisation examinée',
        true,
      ],
      [
        'Authority to repair systems without approval',
        'L’autorité de réparer les systèmes sans approbation',
        false,
      ],
      [
        'A guarantee every control is perfect',
        'Une garantie que chaque contrôle est parfait',
        false,
      ],
      [
        'Automatic certification under every framework',
        'Une certification automatique selon chaque référentiel',
        false,
      ],
    ],
    'a separate party can offer assurance that is not based solely on the provider’s own claim.',
    'une partie distincte peut offrir une assurance qui ne repose pas seulement sur l’affirmation du fournisseur.',
  ),
  question(
    'q-5-5-005',
    'recall',
    'medium',
    'Why does audit scope matter?',
    'Pourquoi le périmètre d’audit est-il important ?',
    [
      [
        'It defines covered systems, period, and criteria',
        'Il définit les systèmes, la période et les critères couverts',
        true,
      ],
      [
        'It assigns technical ownership of controls',
        'Il attribue la propriété technique des contrôles',
        false,
      ],
      ['It removes the need for evidence', 'Il supprime le besoin de preuves', false],
      [
        'It determines every finding’s severity',
        'Il détermine la gravité de chaque constat',
        false,
      ],
    ],
    'a conclusion can only be interpreted within the engagement boundaries that scope establishes.',
    'une conclusion ne peut être interprétée que dans les limites de mission que le périmètre établit.',
  ),
  question(
    'q-5-5-006',
    'discrimination',
    'medium',
    'A team reviews evidence and fixes gaps before an independent customer review. What is that preliminary activity?',
    'Une équipe examine ses preuves et corrige les écarts avant un examen indépendant par un client. Quelle est cette activité préliminaire ?',
    [
      ['A readiness assessment', 'Une évaluation de préparation', true],
      ['The external audit itself', 'L’audit externe lui-même', false],
      ['A formal attestation for the customer', 'Une attestation formelle pour le client', false],
      ['A regulatory enforcement action', 'Une action de mise en application réglementaire', false],
    ],
    'the organisation is preparing controls and evidence, not yet receiving independent validation.',
    'l’organisation prépare les contrôles et les preuves sans encore recevoir de validation indépendante.',
  ),
  question(
    'q-5-5-007',
    'discrimination',
    'medium',
    'Which situation most clearly needs an external audit rather than internal work?',
    'Quelle situation nécessite le plus clairement un audit externe plutôt qu’un travail interne ?',
    [
      [
        'A prospective customer requires independent assurance before sharing data',
        'Un client potentiel exige une assurance indépendante avant de partager des données',
        true,
      ],
      [
        'Management wants to prioritize program improvements',
        'La direction veut prioriser les améliorations du programme',
        false,
      ],
      [
        'A control owner checks whether a procedure was followed',
        'Un propriétaire de contrôle vérifie qu’une procédure a été suivie',
        false,
      ],
      [
        'An administrator gathers logs for access review',
        'Un administrateur rassemble des journaux pour une revue des accès',
        false,
      ],
    ],
    'the customer needs assurance from a party independent of the provider and its control owners.',
    'le client a besoin d’une assurance émise par une partie indépendante du fournisseur et de ses propriétaires de contrôles.',
  ),
  question(
    'q-5-5-008',
    'discrimination',
    'hard',
    'Why is an administrator’s review of their own configuration weaker than separate review?',
    'Pourquoi la revue par un administrateur de sa propre configuration est-elle plus faible qu’un examen distinct ?',
    [
      [
        'Self-review can lack independence from the control',
        'L’autoévaluation peut manquer d’indépendance vis-à-vis du contrôle',
        true,
      ],
      [
        'Administrators cannot understand security controls',
        'Les administrateurs ne peuvent pas comprendre les contrôles de sécurité',
        false,
      ],
      [
        'Only external parties may gather evidence',
        'Seules les parties externes peuvent recueillir des preuves',
        false,
      ],
      [
        'Reviewers automatically repair defects',
        'Les réviseurs corrigent automatiquement les défauts',
        false,
      ],
    ],
    'separation reduces the risk that familiarity or self-interest hides a defect.',
    'la séparation réduit le risque que l’habitude ou l’intérêt personnel masque un défaut.',
  ),
  question(
    'q-5-5-009',
    'discrimination',
    'hard',
    'Why is a penetration test report not automatically an attestation of the whole security program?',
    'Pourquoi un rapport de test d’intrusion n’est-il pas automatiquement une attestation de tout le programme de sécurité ?',
    [
      [
        'It tests technical scope, not every asserted control against criteria',
        'Il teste un périmètre technique, pas chaque contrôle affirmé selon des critères',
        true,
      ],
      [
        'Technical reports cannot support audit evidence',
        'Les rapports techniques ne peuvent soutenir aucune preuve d’audit',
        false,
      ],
      ['An exposed service is never a finding', 'Un service exposé n’est jamais un constat', false],
      [
        'Attestations only address financial systems',
        'Les attestations portent uniquement sur les systèmes financiers',
        false,
      ],
    ],
    'the report may be useful evidence but usually has a narrower purpose than a formal control conclusion.',
    'le rapport peut être une preuve utile, mais sa finalité est habituellement plus étroite qu’une conclusion formelle sur les contrôles.',
  ),
  question(
    'q-5-5-010',
    'discrimination',
    'medium',
    'Which statement correctly compares an assertion and audit evidence?',
    'Quelle affirmation compare correctement une assertion et une preuve d’audit ?',
    [
      [
        'An assertion is a claim; evidence supports a conclusion about it',
        'Une assertion est une affirmation ; les preuves soutiennent une conclusion à son sujet',
        true,
      ],
      [
        'An assertion is evidence collected by external auditors',
        'Une assertion est une preuve recueillie par des auditeurs externes',
        false,
      ],
      ['Evidence replaces stated criteria', 'Les preuves remplacent les critères indiqués', false],
      ['An assertion is a remediation action', 'Une assertion est une action de correction', false],
    ],
    'the organisation makes the claim while the reviewer evaluates that claim with evidence.',
    'l’organisation formule l’affirmation tandis que le réviseur l’évalue à partir de preuves.',
  ),
  question(
    'q-5-5-011',
    'discrimination',
    'hard',
    'An audit finds missed access reviews. What is assigning an owner and due date to fix them?',
    'Un audit trouve des revues d’accès manquées. Comment nomme-t-on l’attribution d’un responsable et d’une échéance pour les corriger ?',
    [
      ['Remediation management', 'La gestion de la remédiation', true],
      ['Attestation', 'L’attestation', false],
      ['Evidence collection', 'La collecte de preuves', false],
      ['Scope definition', 'La définition du périmètre', false],
    ],
    'assigning corrective work responds to a finding after the examination rather than producing the finding.',
    'attribuer un travail correctif répond à un constat après l’examen au lieu de produire le constat.',
  ),
  question(
    'q-5-5-012',
    'scenario',
    'medium',
    'A regulator examines records to determine whether a company met an applicable security obligation. What is this?',
    'Un régulateur examine des dossiers afin de déterminer si une entreprise a respecté une obligation de sécurité applicable. De quel type d’activité s’agit-il ?',
    [
      ['An external audit or assessment', 'Un audit ou une évaluation externe', true],
      ['An internal control self-assessment', 'Une autoévaluation interne des contrôles', false],
      ['A readiness assessment', 'Une évaluation de préparation', false],
      ['A change-management approval', 'Une approbation de gestion du changement', false],
    ],
    'a regulator is outside the organisation and examines evidence against an obligation.',
    'un régulateur est extérieur à l’organisation et examine des preuves selon une obligation.',
  ),
  question(
    'q-5-5-013',
    'scenario',
    'hard',
    'A provider claims its access controls met requirements from January through June. An independent reviewer examines evidence and gives customers a formal conclusion. What is the best description?',
    'Un fournisseur affirme que ses contrôles d’accès ont respecté des exigences de janvier à juin. Un réviseur indépendant examine les preuves et donne aux clients une conclusion formelle. Quelle est la meilleure description ?',
    [
      [
        'An external engagement supporting an attestation',
        'Une mission externe soutenant une attestation',
        true,
      ],
      [
        'A control owner’s informal self-review',
        'Une autoévaluation informelle du propriétaire de contrôle',
        false,
      ],
      [
        'A remediation project without a conclusion',
        'Un projet de correction sans conclusion',
        false,
      ],
      [
        'A vulnerability scan of access servers',
        'Une analyse de vulnérabilités des serveurs d’accès',
        false,
      ],
    ],
    'an independent party evaluates a defined-period assertion and issues a formal conclusion for customer reliance.',
    'une partie indépendante évalue une assertion sur une période définie et émet une conclusion formelle destinée aux clients.',
  ),
  question(
    'q-5-5-014',
    'scenario',
    'medium',
    'A team plans an internal audit of access reviews. Which elements should define the engagement? (Select two.)',
    'Une équipe prépare un audit interne des revues d’accès. Quels éléments doivent définir la mission ? (Sélectionnez deux réponses.)',
    [
      ['The criteria used to judge the reviews', 'Les critères servant à juger les revues', true],
      ['The systems and period covered', 'Les systèmes et la période couverts', true],
      ['A promise that no gaps will be found', 'Une promesse qu’aucun écart ne sera trouvé', false],
      ['Removal of reviewer independence', 'La suppression de l’indépendance du réviseur', false],
    ],
    'criteria and scope establish what is tested and the boundaries of the resulting conclusion.',
    'les critères et le périmètre établissent ce qui est testé et les limites de la conclusion obtenue.',
    true,
  ),
  question(
    'q-5-5-015',
    'scenario',
    'hard',
    'A customer is deciding whether to rely on a provider attestation. Which details should the customer examine? (Select two.)',
    'Un client décide s’il peut se fier à l’attestation d’un fournisseur. Quels détails doit-il examiner ? (Sélectionnez deux réponses.)',
    [
      [
        'The stated criteria and scope or period',
        'Les critères annoncés et le périmètre ou la période',
        true,
      ],
      [
        'Whether relevant evidence supports the conclusion',
        'Si des preuves pertinentes soutiennent la conclusion',
        true,
      ],
      [
        'A promise of perfect security forever',
        'Une promesse de sécurité parfaite pour toujours',
        false,
      ],
      ['Which employee is most confident', 'Quel salarié est le plus confiant', false],
    ],
    'those details show the actual boundaries and basis of the assurance being offered.',
    'ces détails montrent les limites réelles et la base de l’assurance proposée.',
    true,
  ),
];
