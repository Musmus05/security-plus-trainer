import type { Question } from '@/content/schemas';

/**
 * Objective 1.3 — Explain the importance of change management processes and the impact to security.
 *
 * Every question is **original**, written from the published objective. None reproduces,
 * paraphrases, or reconstructs any real exam item — see NOTICE.md.
 *
 * This objective is tested almost entirely as "which step was skipped", so most stems describe a
 * change that went wrong and the distractors are the neighbouring steps of the same process. The
 * two purely technical traps — allow list polarity and the unrestarted patch — each get a question
 * of their own because they are the ones learners reliably invert.
 */
export const QUESTIONS_1_3: Question[] = [
  {
    id: 'q-1-3-001',
    objective: '1.3',
    kind: 'scenario',
    difficulty: 'easy',
    prompt: {
      en: 'A database upgrade corrupts a table. The team spends the night rebuilding the server by hand because nobody documented how to return to the previous version. Which element of change management was missing?',
      fr: 'Une mise à niveau de base de données corrompt une table. L’équipe passe la nuit à reconstruire le serveur à la main, faute de procédure documentée pour revenir à la version précédente. Quel élément de la gestion du changement manquait ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'The backout plan', fr: 'Le plan de retour arrière (backout plan)' },
        correct: true,
        explanation: {
          en: 'The backout plan is the written procedure for undoing a change, prepared before it runs. Its absence is exactly why the night was spent improvising.',
          fr: 'Le plan de retour arrière est la procédure écrite pour défaire un changement, préparée avant son exécution. Son absence est précisément ce qui a imposé l’improvisation nocturne.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The maintenance window',
          fr: 'La fenêtre de maintenance (maintenance window)',
        },
        correct: false,
        explanation: {
          en: 'A maintenance window says when the change may run. The team clearly had one — they were working at night. It says nothing about how to undo the change.',
          fr: 'Une fenêtre de maintenance indique quand le changement peut être exécuté. L’équipe en avait manifestement une, puisqu’elle travaillait de nuit. Elle ne dit rien sur la façon de défaire le changement.',
        },
      },
      {
        id: 'c',
        text: { en: 'The approval process', fr: 'Le processus d’approbation (approval process)' },
        correct: false,
        explanation: {
          en: 'Nothing suggests the change was unapproved. Approval decides whether a change happens, not what to do when it goes wrong.',
          fr: 'Rien n’indique que le changement n’était pas approuvé. L’approbation décide si un changement a lieu, pas quoi faire quand il tourne mal.',
        },
      },
      {
        id: 'd',
        text: { en: 'The stakeholder list', fr: 'La liste des parties prenantes (stakeholders)' },
        correct: false,
        explanation: {
          en: 'A stakeholder list determines who must be informed. Knowing who to notify would not have shortened the rebuild by a minute.',
          fr: 'Une liste de parties prenantes détermine qui doit être informé. Savoir qui prévenir n’aurait pas raccourci la reconstruction d’une minute.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-002',
    objective: '1.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which statement correctly describes an allow list?',
      fr: 'Quel énoncé décrit correctement une liste d’autorisation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Everything is denied unless it appears on the list',
          fr: 'Tout est refusé sauf ce qui figure sur la liste',
        },
        correct: true,
        explanation: {
          en: 'An allow list is deny-by-default. That is what makes it the safer of the two and also what makes it break anything nobody anticipated.',
          fr: 'Une liste d’autorisation refuse par défaut. C’est ce qui en fait la plus sûre des deux, et aussi ce qui lui fait casser tout ce qui n’avait pas été prévu.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Everything is permitted unless it appears on the list',
          fr: 'Tout est autorisé sauf ce qui figure sur la liste',
        },
        correct: false,
        explanation: {
          en: 'That describes a deny list. The inversion is the single most common error on this objective, so read the polarity of the default, not the name.',
          fr: 'Cela décrit une liste de blocage. L’inversion est l’erreur la plus fréquente de cet objectif : lis la polarité du comportement par défaut, pas le nom.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It is more flexible than a deny list',
          fr: 'Elle est plus souple qu’une liste de blocage',
        },
        correct: false,
        explanation: {
          en: 'The opposite. An allow list is deliberately rigid; that rigidity is the security benefit and the operational cost at the same time.',
          fr: 'C’est l’inverse. Une liste d’autorisation est délibérément rigide ; cette rigidité est à la fois le bénéfice de sécurité et le coût opérationnel.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It blocks only known threats',
          fr: 'Elle ne bloque que les menaces connues',
        },
        correct: false,
        explanation: {
          en: 'Blocking only what is known is the weakness of a deny list — an unknown threat is not on it, so it passes. An allow list blocks the unknown by construction.',
          fr: 'Ne bloquer que le connu est la faiblesse de la liste de blocage : une menace inconnue n’y figure pas, donc elle passe. Une liste d’autorisation bloque l’inconnu par construction.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-003',
    objective: '1.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A critical patch is deployed successfully to a web server. The next vulnerability scan still reports the same finding, and the file version on disk is correct. What should be checked first?',
      fr: 'Un correctif critique est déployé avec succès sur un serveur web. Le scan de vulnérabilités suivant remonte pourtant le même constat, et la version du fichier sur disque est correcte. Que faut-il vérifier en premier ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Whether the service was restarted',
          fr: 'Si le service a été redémarré',
        },
        correct: true,
        explanation: {
          en: 'The running process still holds the old code in memory. The disk is patched, the running service is not, and the scanner is reading behaviour rather than file versions.',
          fr: 'Le processus en cours conserve l’ancien code en mémoire. Le disque est corrigé, le service actif ne l’est pas, et le scanner observe le comportement plutôt que les versions de fichiers.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Whether the scanner signature is out of date',
          fr: 'Si la signature du scanner est obsolète',
        },
        correct: false,
        explanation: {
          en: 'Possible but far less likely, and it is the second hypothesis, not the first. Blaming the tool before checking your own change is how a real vulnerability stays open.',
          fr: 'Possible mais bien moins probable, et c’est la seconde hypothèse, pas la première. Accuser l’outil avant de vérifier son propre changement est le meilleur moyen de laisser une vraie vulnérabilité ouverte.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Whether the change was approved',
          fr: 'Si le changement était approuvé',
        },
        correct: false,
        explanation: {
          en: 'Approval is a governance question. It has no bearing on whether the patched code is actually executing.',
          fr: 'L’approbation est une question de gouvernance. Elle n’a aucune incidence sur le fait que le code corrigé s’exécute réellement.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Whether the backout plan was executed',
          fr: 'Si le plan de retour arrière a été exécuté',
        },
        correct: false,
        explanation: {
          en: 'A rollback would have restored the old file version, and the stem says the disk version is correct. So no rollback happened.',
          fr: 'Un retour arrière aurait restauré l’ancienne version du fichier, or l’énoncé indique que la version sur disque est correcte. Aucun retour arrière n’a donc eu lieu.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-004',
    objective: '1.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the role of a change advisory board?',
      fr: 'Quel est le rôle d’un comité consultatif de changement (CAB) ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'To review and approve or reject proposed changes',
          fr: 'Examiner puis approuver ou rejeter les changements proposés',
        },
        correct: true,
        explanation: {
          en: 'The board is the formal approval step. It weighs the impact analysis, the tests and the backout plan, then decides.',
          fr: 'Le comité est l’étape formelle d’approbation. Il pèse l’analyse d’impact, les tests et le plan de retour arrière, puis décide.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'To carry out approved changes in production',
          fr: 'Réaliser en production les changements approuvés',
        },
        correct: false,
        explanation: {
          en: 'The board decides; it does not execute. Separating the decision from the hands that perform it is part of the control.',
          fr: 'Le comité décide, il n’exécute pas. Séparer la décision des mains qui l’appliquent fait partie du contrôle.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'To write the standard operating procedures',
          fr: 'Rédiger les procédures normalisées',
        },
        correct: false,
        explanation: {
          en: 'Procedures are written by the teams who own the systems. The board may require one to exist, but authoring it is not its function.',
          fr: 'Les procédures sont rédigées par les équipes qui exploitent les systèmes. Le comité peut en exiger une, mais la rédiger n’est pas sa fonction.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'To test changes before deployment',
          fr: 'Tester les changements avant déploiement',
        },
        correct: false,
        explanation: {
          en: 'The board reads the test results; it does not produce them. Its input is evidence somebody else generated.',
          fr: 'Le comité lit les résultats de test, il ne les produit pas. Son intrant est une preuve générée par d’autres.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-005',
    objective: '1.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An engineer applies an approved firewall change, and while logged in also removes three rules that "looked obsolete". What has gone wrong?',
      fr: 'Un ingénieur applique un changement de pare-feu approuvé et, tant qu’il est connecté, supprime aussi trois règles qui « semblaient obsolètes ». Qu’est-ce qui a dérapé ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The change exceeded its restricted activities',
          fr: 'Le changement a dépassé son périmètre d’activités autorisées',
        },
        correct: true,
        explanation: {
          en: 'Approval covers a defined scope. Anything done outside it is an unapproved change that no impact analysis examined and no backout plan covers.',
          fr: 'L’approbation couvre un périmètre défini. Tout ce qui est fait en dehors est un changement non approuvé, qu’aucune analyse d’impact n’a examiné et qu’aucun plan de retour arrière ne couvre.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The maintenance window was exceeded',
          fr: 'La fenêtre de maintenance a été dépassée',
        },
        correct: false,
        explanation: {
          en: 'Nothing in the stem concerns time. The problem is what was touched, not how long it took.',
          fr: 'Rien dans l’énoncé ne concerne le temps. Le problème est ce qui a été touché, pas la durée.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Ownership was not assigned',
          fr: 'La propriété du changement n’était pas attribuée',
        },
        correct: false,
        explanation: {
          en: 'There is an identifiable engineer performing the work. The failure is one of discipline within the scope, not of accountability for it.',
          fr: 'Un ingénieur identifiable exécute le travail. La défaillance porte sur la discipline dans le périmètre, pas sur la responsabilité de celui-ci.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The stakeholders were not notified',
          fr: 'Les parties prenantes n’ont pas été prévenues',
        },
        correct: false,
        explanation: {
          en: 'They may well not have been, but that is a consequence. The root problem is that unapproved work happened at all.',
          fr: 'Elles ne l’ont peut-être pas été, mais c’est une conséquence. Le problème de fond est que du travail non approuvé a eu lieu.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-006',
    objective: '1.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'What distinguishes a backout plan from a backup?',
      fr: 'Qu’est-ce qui distingue un plan de retour arrière d’une sauvegarde ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A backout plan is a procedure; a backup is data',
          fr: 'Le plan de retour arrière est une procédure ; la sauvegarde est une donnée',
        },
        correct: true,
        explanation: {
          en: 'The plan describes the steps to return to the previous state, and it may use a backup as one of those steps. Having the data without the procedure is why rollbacks take all night.',
          fr: 'Le plan décrit les étapes pour revenir à l’état précédent, et il peut s’appuyer sur une sauvegarde comme l’une de ces étapes. Avoir la donnée sans la procédure, c’est pourquoi les retours arrière durent toute la nuit.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A backout plan is written after the change; a backup before',
          fr: 'Le plan de retour arrière s’écrit après le changement ; la sauvegarde avant',
        },
        correct: false,
        explanation: {
          en: 'Both come before. A plan written after the change has failed is not a plan, it is an incident being improvised.',
          fr: 'Les deux précèdent le changement. Un plan rédigé après l’échec du changement n’est pas un plan, c’est un incident que l’on improvise.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A backout plan applies only to code changes',
          fr: 'Le plan de retour arrière ne concerne que les changements de code',
        },
        correct: false,
        explanation: {
          en: 'Any change needs one — configuration, network, hardware. The scope of a backout plan is the scope of the change it undoes.',
          fr: 'Tout changement en exige un — configuration, réseau, matériel. Le périmètre d’un plan de retour arrière est celui du changement qu’il défait.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'They are two names for the same artefact',
          fr: 'Ce sont deux noms pour le même artefact',
        },
        correct: false,
        explanation: {
          en: 'They are not. A team can hold a perfect backup and still have no idea in what order to restore services, which is precisely the gap the plan fills.',
          fr: 'Non. Une équipe peut disposer d’une sauvegarde parfaite et n’avoir aucune idée de l’ordre de restauration des services : c’est exactement le vide que comble le plan.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-007',
    objective: '1.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'During an incident, the response team follows the network diagram and cannot find a segment that was decommissioned eight months ago. Which change management practice was neglected?',
      fr: 'Pendant un incident, l’équipe de réponse suit le schéma réseau et ne retrouve pas un segment démantelé il y a huit mois. Quelle pratique de gestion du changement a été négligée ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Updating diagrams', fr: 'La mise à jour des schémas' },
        correct: true,
        explanation: {
          en: 'Documentation has to move with the infrastructure. A stale diagram costs time in exactly the situation where time matters most.',
          fr: 'La documentation doit suivre l’infrastructure. Un schéma périmé coûte du temps précisément dans la situation où le temps compte le plus.',
        },
      },
      {
        id: 'b',
        text: { en: 'Impact analysis', fr: 'L’analyse d’impact' },
        correct: false,
        explanation: {
          en: 'Impact analysis is performed before a change to predict what breaks. The failure here is that a completed change was never written down.',
          fr: 'L’analyse d’impact se fait avant un changement pour prévoir ce qui casse. Ici la défaillance est qu’un changement achevé n’a jamais été consigné.',
        },
      },
      {
        id: 'c',
        text: { en: 'Version control', fr: 'Le contrôle de version' },
        correct: false,
        explanation: {
          en: 'Version control would help for text-based configuration, and it is a defensible second answer. But the artefact named in the stem is the diagram, and keeping it current is its own listed practice.',
          fr: 'Le contrôle de version aiderait pour une configuration textuelle, et c’est une seconde réponse défendable. Mais l’artefact nommé dans l’énoncé est le schéma, et le tenir à jour constitue une pratique listée à part entière.',
        },
      },
      {
        id: 'd',
        text: { en: 'The maintenance window', fr: 'La fenêtre de maintenance' },
        correct: false,
        explanation: {
          en: 'When the decommissioning happened is irrelevant. What matters is that the record of it was never updated.',
          fr: 'Le moment du démantèlement est sans importance. Ce qui compte est que sa trace documentaire n’a jamais été mise à jour.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-008',
    objective: '1.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which change management step identifies what will break if a change is deployed?',
      fr: 'Quelle étape de la gestion du changement identifie ce qui cassera si un changement est déployé ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Impact analysis', fr: 'L’analyse d’impact (impact analysis)' },
        correct: true,
        explanation: {
          en: 'Impact analysis maps dependencies and predicts consequences, both of the change succeeding and of it failing. It is the input the approval decision rests on.',
          fr: 'L’analyse d’impact cartographie les dépendances et prévoit les conséquences, à la fois du succès et de l’échec du changement. C’est l’intrant sur lequel repose la décision d’approbation.',
        },
      },
      {
        id: 'b',
        text: { en: 'Test results', fr: 'Les résultats de test (test results)' },
        correct: false,
        explanation: {
          en: 'Tests demonstrate that the change works in an environment you control. They rarely surface a dependency living in a system nobody thought to test.',
          fr: 'Les tests démontrent que le changement fonctionne dans un environnement maîtrisé. Ils révèlent rarement une dépendance située dans un système auquel personne n’a pensé.',
        },
      },
      {
        id: 'c',
        text: { en: 'The backout plan', fr: 'Le plan de retour arrière (backout plan)' },
        correct: false,
        explanation: {
          en: 'The backout plan handles the aftermath of a failure. It answers "how do we undo this", not "what will this break".',
          fr: 'Le plan de retour arrière traite les suites d’un échec. Il répond à « comment défaire », pas à « qu’est-ce que cela va casser ».',
        },
      },
      {
        id: 'd',
        text: { en: 'Ownership', fr: 'La propriété (ownership)' },
        correct: false,
        explanation: {
          en: 'Ownership names who is accountable. It is a governance attribute, not an analytical activity.',
          fr: 'La propriété désigne qui est responsable. C’est un attribut de gouvernance, pas une activité d’analyse.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-009',
    objective: '1.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A manufacturing line runs a control application whose vendor closed in 2016. A newly published vulnerability affects it. What is the appropriate response?',
      fr: 'Une ligne de production fait tourner une application de pilotage dont l’éditeur a fermé en 2016. Une vulnérabilité récemment publiée l’affecte. Quelle est la réponse appropriée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Isolate the system and add compensating controls',
          fr: 'Isoler le système et ajouter des contrôles compensatoires',
        },
        correct: true,
        explanation: {
          en: 'A legacy application that cannot be patched is managed by reducing what can reach it: segmentation, strict filtering, tighter monitoring. That is the compensating control pattern from objective 1.1.',
          fr: 'Une application héritée non corrigeable se gère en réduisant ce qui peut l’atteindre : segmentation, filtrage strict, surveillance renforcée. C’est le schéma des contrôles compensatoires vu en 1.1.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Apply the vendor patch during the next maintenance window',
          fr: 'Appliquer le correctif de l’éditeur à la prochaine fenêtre de maintenance',
        },
        correct: false,
        explanation: {
          en: 'There is no vendor and therefore no patch. That is what makes the application legacy rather than merely out of date.',
          fr: 'Il n’y a plus d’éditeur, donc pas de correctif. C’est précisément ce qui rend l’application héritée plutôt que simplement en retard de version.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Shut the system down immediately',
          fr: 'Arrêter le système immédiatement',
        },
        correct: false,
        explanation: {
          en: 'Stopping a production line trades a possible compromise for a certain business loss. Security decisions weigh both; this one ignores the second.',
          fr: 'Arrêter une ligne de production échange une compromission possible contre une perte métier certaine. Une décision de sécurité pèse les deux ; celle-ci ignore la seconde.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Add the vulnerability to a deny list',
          fr: 'Ajouter la vulnérabilité à une liste de blocage',
        },
        correct: false,
        explanation: {
          en: 'Deny lists filter traffic, files or applications — not vulnerabilities. A vulnerability is a property of the software, and there is nothing to enumerate.',
          fr: 'Les listes de blocage filtrent du trafic, des fichiers ou des applications, pas des vulnérabilités. Une vulnérabilité est une propriété du logiciel : il n’y a rien à énumérer.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-010',
    objective: '1.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Beyond rollback, what does putting firewall rules under version control give a security team?',
      fr: 'Au-delà du retour arrière, qu’apporte à une équipe sécurité le fait de versionner les règles de pare-feu ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'An attributed history of exactly what changed and who changed it',
          fr: 'Un historique attribué de ce qui a changé exactement, et par qui',
        },
        correct: true,
        explanation: {
          en: 'Each commit is a diff bound to an author. That supports investigation and accountability, which is where version control meets the accounting leg of AAA.',
          fr: 'Chaque validation est un différentiel lié à un auteur. Cela soutient l’investigation et l’imputabilité : c’est là que le contrôle de version rejoint le volet traçabilité d’AAA.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Automatic detection of insecure rules',
          fr: 'La détection automatique des règles non sécurisées',
        },
        correct: false,
        explanation: {
          en: 'Version control stores history; it does not judge content. Analysing rules for weakness is a separate tool built on top of it.',
          fr: 'Le contrôle de version stocke un historique, il ne juge pas le contenu. Analyser la faiblesse des règles relève d’un outil distinct, construit par-dessus.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Encryption of the rule set at rest',
          fr: 'Le chiffrement du jeu de règles au repos',
        },
        correct: false,
        explanation: {
          en: 'A repository is not a confidentiality control. Versioned files are as readable as any other, to anyone with access.',
          fr: 'Un dépôt n’est pas un contrôle de confidentialité. Des fichiers versionnés sont aussi lisibles que n’importe quels autres, pour qui y a accès.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Guaranteed availability of the firewall',
          fr: 'La garantie de disponibilité du pare-feu',
        },
        correct: false,
        explanation: {
          en: 'History says nothing about uptime. Availability comes from redundancy and capacity, which version control does not provide.',
          fr: 'Un historique ne dit rien de la disponibilité. Celle-ci vient de la redondance et de la capacité, que le contrôle de version n’apporte pas.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-011',
    objective: '1.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the purpose of a standard operating procedure in change management?',
      fr: 'À quoi sert une procédure normalisée dans la gestion du changement ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'To make a recurring change repeatable by anyone qualified',
          fr: 'Rendre un changement récurrent reproductible par toute personne qualifiée',
        },
        correct: true,
        explanation: {
          en: 'Written method means the outcome does not depend on which engineer is on shift. It also makes deviations visible, because there is something to deviate from.',
          fr: 'Une méthode écrite fait que le résultat ne dépend pas de l’ingénieur de garde. Elle rend aussi les écarts visibles, puisqu’il existe une référence à laquelle déroger.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'To record the approval decision',
          fr: 'Consigner la décision d’approbation',
        },
        correct: false,
        explanation: {
          en: 'Approval is recorded by the change record itself. A procedure describes how the work is done, not whether it was permitted.',
          fr: 'L’approbation est consignée par l’enregistrement du changement lui-même. Une procédure décrit comment le travail est fait, pas s’il était permis.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'To list the affected stakeholders',
          fr: 'Lister les parties prenantes affectées',
        },
        correct: false,
        explanation: {
          en: 'Stakeholders vary from one change to the next; a standard procedure is written to be reused. The two would go stale at different rates.',
          fr: 'Les parties prenantes varient d’un changement à l’autre, alors qu’une procédure normalisée est écrite pour être réutilisée. Les deux vieilliraient à des rythmes différents.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'To replace the need for testing',
          fr: 'Éviter d’avoir à tester',
        },
        correct: false,
        explanation: {
          en: 'A repeatable procedure repeats whatever it describes, including a mistake. It reduces variance, it does not provide evidence.',
          fr: 'Une procédure reproductible reproduit ce qu’elle décrit, y compris une erreur. Elle réduit la variabilité, elle ne fournit pas de preuve.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-012',
    objective: '1.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A security patch for an actively exploited flaw is released on a Tuesday. The change advisory board next meets in nine days. What should happen?',
      fr: 'Un correctif de sécurité pour une faille activement exploitée sort un mardi. Le comité de changement se réunit dans neuf jours. Que doit-il se passer ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Use the emergency change path and review it afterwards',
          fr: 'Emprunter la voie de changement d’urgence et la faire réexaminer après coup',
        },
        correct: true,
        explanation: {
          en: 'Emergency change exists exactly for this: reduced approval now, full review later. The record is still created; only the order changes.',
          fr: 'Le changement d’urgence existe précisément pour cela : approbation réduite maintenant, revue complète ensuite. L’enregistrement est tout de même créé ; seul l’ordre change.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Wait for the scheduled board meeting',
          fr: 'Attendre la réunion prévue du comité',
        },
        correct: false,
        explanation: {
          en: 'Nine days of exposure to an actively exploited flaw is a governance process defeating its own purpose. Change management manages risk, it does not outrank it.',
          fr: 'Neuf jours d’exposition à une faille activement exploitée, c’est un processus de gouvernance qui contredit sa propre finalité. La gestion du changement gère le risque, elle ne prime pas sur lui.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Apply it without any record, since it is urgent',
          fr: 'L’appliquer sans aucun enregistrement, puisque c’est urgent',
        },
        correct: false,
        explanation: {
          en: 'Urgency compresses approval; it does not remove documentation. An unrecorded change is exactly the kind that nobody can explain six months later.',
          fr: 'L’urgence comprime l’approbation, elle ne supprime pas la documentation. Un changement non enregistré est exactement celui que personne ne saura expliquer six mois plus tard.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Add the vulnerable service to an allow list',
          fr: 'Ajouter le service vulnérable à une liste d’autorisation',
        },
        correct: false,
        explanation: {
          en: 'That permits it more broadly, which is the wrong direction entirely. Allow-listing a vulnerable service increases exposure rather than reducing it.',
          fr: 'Cela l’autorise plus largement, ce qui va exactement dans le mauvais sens. Autoriser un service vulnérable augmente l’exposition au lieu de la réduire.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-013',
    objective: '1.3',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Why does assigning a single owner to a change matter for security?',
      fr: 'Pourquoi attribuer un propriétaire unique à un changement importe-t-il pour la sécurité ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Somebody is accountable for the whole change, including the rollback',
          fr: 'Quelqu’un répond de l’ensemble du changement, retour arrière compris',
        },
        correct: true,
        explanation: {
          en: 'Shared responsibility for a change is no responsibility. A named owner means there is someone who cannot say the failed step was another team’s.',
          fr: 'Une responsabilité partagée sur un changement est une responsabilité nulle. Un propriétaire nommé, c’est quelqu’un qui ne peut pas dire que l’étape ratée relevait d’une autre équipe.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It means only one person can perform the change',
          fr: 'Cela signifie qu’une seule personne peut exécuter le changement',
        },
        correct: false,
        explanation: {
          en: 'Ownership is accountability, not exclusivity. Several engineers may do the work; one answers for the outcome.',
          fr: 'La propriété est une responsabilité, pas une exclusivité. Plusieurs ingénieurs peuvent réaliser le travail ; une seule personne répond du résultat.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It removes the need for approval',
          fr: 'Cela dispense d’approbation',
        },
        correct: false,
        explanation: {
          en: 'The two are separate steps and neither replaces the other. An owner proposes and answers for it; the board still decides.',
          fr: 'Ce sont deux étapes distinctes et aucune ne remplace l’autre. Un propriétaire propose et en répond ; le comité décide toujours.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It guarantees the change will succeed',
          fr: 'Cela garantit que le changement réussira',
        },
        correct: false,
        explanation: {
          en: 'No process step guarantees success. Ownership guarantees that failure is attributable and therefore learnable from.',
          fr: 'Aucune étape de processus ne garantit le succès. La propriété garantit qu’un échec est attribuable, et donc qu’on peut en tirer une leçon.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-014',
    objective: '1.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An organisation changes its authentication flow. Six weeks later the help desk is still following the old script, and users are being told to do something that no longer works. What was missed?',
      fr: 'Une organisation modifie son flux d’authentification. Six semaines plus tard, le support suit toujours l’ancien script et indique aux utilisateurs une manipulation qui ne fonctionne plus. Qu’a-t-on oublié ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Updating policies and procedures',
          fr: 'La mise à jour des politiques et procédures',
        },
        correct: true,
        explanation: {
          en: 'A technical change that leaves written procedures wrong has created invisible debt. The procedure keeps being followed by people who were not part of the change.',
          fr: 'Un changement technique qui laisse des procédures écrites erronées crée une dette invisible. La procédure continue d’être suivie par des gens qui n’ont pas participé au changement.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The backout plan',
          fr: 'Le plan de retour arrière',
        },
        correct: false,
        explanation: {
          en: 'The change itself worked; nothing needs undoing. The failure is in the documentation that surrounds it.',
          fr: 'Le changement lui-même a fonctionné ; il n’y a rien à défaire. La défaillance est dans la documentation qui l’entoure.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Version control',
          fr: 'Le contrôle de version',
        },
        correct: false,
        explanation: {
          en: 'Version control tracks what changed in files. It does not push a corrected script into the hands of a help desk agent.',
          fr: 'Le contrôle de version suit ce qui change dans des fichiers. Il ne met pas un script corrigé entre les mains d’un agent de support.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The maintenance window',
          fr: 'La fenêtre de maintenance',
        },
        correct: false,
        explanation: {
          en: 'The problem appeared six weeks after the change and concerns written guidance. Scheduling has no bearing on it.',
          fr: 'Le problème apparaît six semaines après le changement et porte sur une consigne écrite. La planification n’y est pour rien.',
        },
      },
    ],
  },

  {
    id: 'q-1-3-015',
    objective: '1.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A team plans a change that requires taking an internal API offline for twenty minutes. Which steps of the process address that downtime? (Select all that apply.)',
      fr: 'Une équipe planifie un changement nécessitant l’arrêt d’une API interne pendant vingt minutes. Quelles étapes du processus traitent cette interruption ? (Sélectionne toutes les réponses correctes.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: {
          en: 'Identifying stakeholders so the affected teams are warned',
          fr: 'Identifier les parties prenantes pour prévenir les équipes affectées',
        },
        correct: true,
        explanation: {
          en: 'Downtime that surprises a dependent team becomes their incident. Knowing who consumes the API is what turns an outage into a scheduled interruption.',
          fr: 'Une interruption qui surprend une équipe dépendante devient son incident. Savoir qui consomme l’API transforme une panne en interruption planifiée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Agreeing a maintenance window at a low-traffic time',
          fr: 'Convenir d’une fenêtre de maintenance à une heure creuse',
        },
        correct: true,
        explanation: {
          en: 'The window exists precisely to place unavoidable downtime where it costs least. Twenty minutes at 3 a.m. and at noon are not the same twenty minutes.',
          fr: 'La fenêtre existe précisément pour placer une interruption inévitable là où elle coûte le moins. Vingt minutes à 3 h du matin et à midi ne sont pas les mêmes vingt minutes.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Putting the API on an allow list',
          fr: 'Placer l’API sur une liste d’autorisation',
        },
        correct: false,
        explanation: {
          en: 'Allow lists govern what is permitted, not what is available. An offline service is equally unreachable whether or not it is permitted.',
          fr: 'Les listes d’autorisation régissent ce qui est permis, pas ce qui est disponible. Un service arrêté est tout aussi inatteignable, qu’il soit autorisé ou non.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Writing the standard operating procedure after the change',
          fr: 'Rédiger la procédure normalisée après le changement',
        },
        correct: false,
        explanation: {
          en: 'A procedure written afterwards guides nothing during the change. Documentation that follows the work cannot shorten the downtime the work causes.',
          fr: 'Une procédure rédigée après coup ne guide rien pendant le changement. Une documentation qui suit le travail ne peut pas raccourcir l’interruption qu’il provoque.',
        },
      },
    ],
  },
];
