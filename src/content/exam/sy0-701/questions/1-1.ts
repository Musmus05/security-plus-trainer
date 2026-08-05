import type { Question } from '@/content/schemas';

/**
 * Objective 1.1 — Compare and contrast various types of security controls.
 *
 * Every question here is **original**, written from the published objective. None reproduces,
 * paraphrases, or reconstructs any real exam item — see NOTICE.md, and CompTIA's Authorized
 * Materials Use Policy, which makes using recalled exam content grounds for revoking a
 * certification.
 *
 * The objective has two topics — Categories and Control types — and the exam tests the *boundary*
 * between them far more than the definitions. So most of these are discrimination or scenario
 * questions, and the distractors are the near-neighbours a learner actually confuses:
 * compensating/corrective, deterrent/preventive, directive/managerial.
 */
export const QUESTIONS_1_1: Question[] = [
  {
    id: 'q-1-1-001',
    objective: '1.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which control category covers policies, hiring practices and security awareness training?',
      fr: 'Quelle catégorie de contrôles regroupe les politiques, les pratiques de recrutement et la sensibilisation à la sécurité ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Managerial', fr: 'Managériale (managerial)' },
        correct: true,
        explanation: {
          en: 'Managerial controls — also called administrative — govern how people and processes behave. They direct decisions rather than enforcing anything mechanically.',
          fr: 'Les contrôles managériaux (aussi appelés administratifs) régissent le comportement des personnes et des processus. Ils orientent les décisions plutôt que d’imposer quoi que ce soit mécaniquement.',
        },
      },
      {
        id: 'b',
        text: { en: 'Technical', fr: 'Technique (technical)' },
        correct: false,
        explanation: {
          en: 'Technical controls are implemented in hardware, software or firmware — a firewall rule, an ACL, disk encryption. A written policy is not enforced by a system.',
          fr: 'Les contrôles techniques sont mis en œuvre dans le matériel, le logiciel ou le firmware — une règle de pare-feu, une ACL, le chiffrement de disque. Une politique écrite n’est pas appliquée par un système.',
        },
      },
      {
        id: 'c',
        text: { en: 'Operational', fr: 'Opérationnelle (operational)' },
        correct: false,
        explanation: {
          en: 'Operational controls are the day-to-day activities people carry out — guard patrols, log review, backup rotation. Training *content* is managerial; running the training session is operational.',
          fr: 'Les contrôles opérationnels sont les activités quotidiennes exécutées par des personnes — rondes de gardiennage, revue de journaux, rotation des sauvegardes. Le *contenu* de la formation est managérial ; animer la session est opérationnel.',
        },
      },
      {
        id: 'd',
        text: { en: 'Physical', fr: 'Physique (physical)' },
        correct: false,
        explanation: {
          en: 'Physical controls act on the tangible world — fences, locks, bollards, lighting. Nothing in this list is a physical barrier.',
          fr: 'Les contrôles physiques agissent sur le monde tangible — clôtures, serrures, bornes, éclairage. Rien dans cette liste n’est une barrière physique.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-002',
    objective: '1.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A legacy application cannot support multifactor authentication. The security team places it behind a jump host that requires MFA and records every session. Which control type best describes the jump host in this arrangement?',
      fr: 'Une application héritée ne peut pas prendre en charge l’authentification multifacteur. L’équipe sécurité la place derrière un hôte de rebond qui exige la MFA et enregistre chaque session. Quel type de contrôle décrit le mieux cet hôte de rebond dans ce montage ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Compensating', fr: 'Compensatoire (compensating)' },
        correct: true,
        explanation: {
          en: 'The required control cannot be implemented where it belongs, so an alternative is put in place to achieve comparable risk reduction. That is precisely a compensating control.',
          fr: 'Le contrôle requis ne peut pas être mis en place là où il devrait l’être ; un dispositif alternatif est donc installé pour obtenir une réduction du risque comparable. C’est exactement un contrôle compensatoire.',
        },
      },
      {
        id: 'b',
        text: { en: 'Corrective', fr: 'Correctif (corrective)' },
        correct: false,
        explanation: {
          en: 'Corrective controls act *after* an incident to limit or undo damage — restoring a backup, quarantining a host. Nothing has gone wrong here; the control is standing in for a missing one.',
          fr: 'Les contrôles correctifs agissent *après* un incident pour limiter ou réparer les dégâts — restaurer une sauvegarde, mettre un hôte en quarantaine. Ici rien ne s’est produit : le contrôle remplace un contrôle manquant.',
        },
      },
      {
        id: 'c',
        text: { en: 'Detective', fr: 'Détectif (detective)' },
        correct: false,
        explanation: {
          en: 'Session recording alone would be detective. But the jump host also *enforces* MFA, and the reason it exists is to substitute for a control the application cannot provide — that substitution is what names it.',
          fr: 'L’enregistrement des sessions seul serait détectif. Mais l’hôte de rebond *impose* aussi la MFA, et sa raison d’être est de se substituer à un contrôle que l’application ne peut pas fournir — c’est cette substitution qui le nomme.',
        },
      },
      {
        id: 'd',
        text: { en: 'Directive', fr: 'Directif (directive)' },
        correct: false,
        explanation: {
          en: 'Directive controls tell people what to do — an acceptable use policy, a sign, a procedure. A jump host enforces rather than instructs.',
          fr: 'Les contrôles directifs indiquent aux personnes ce qu’elles doivent faire — une charte d’utilisation, un panneau, une procédure. Un hôte de rebond impose, il n’instruit pas.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-003',
    objective: '1.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A company installs prominent signs reading "Area under video surveillance" at every entrance, alongside cameras that are actually recording. Which control type do the signs themselves represent?',
      fr: 'Une entreprise installe à chaque entrée des panneaux bien visibles indiquant « Zone sous vidéosurveillance », en plus de caméras qui enregistrent réellement. Quel type de contrôle représentent les panneaux eux-mêmes ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Deterrent', fr: 'Dissuasif (deterrent)' },
        correct: true,
        explanation: {
          en: 'A deterrent discourages an attempt by making the consequences visible. The sign stops nobody physically; it changes the intruder’s mind before they try.',
          fr: 'Un contrôle dissuasif décourage la tentative en rendant les conséquences visibles. Le panneau n’arrête personne physiquement ; il fait changer d’avis avant la tentative.',
        },
      },
      {
        id: 'b',
        text: { en: 'Preventive', fr: 'Préventif (preventive)' },
        correct: false,
        explanation: {
          en: 'A preventive control physically or logically blocks the action — a locked door, a firewall deny rule. A determined intruder can walk straight past a sign, which is exactly the distinction being tested.',
          fr: 'Un contrôle préventif bloque l’action physiquement ou logiquement — une porte verrouillée, une règle de refus sur un pare-feu. Un intrus déterminé passe devant un panneau sans obstacle : c’est précisément la distinction testée ici.',
        },
      },
      {
        id: 'c',
        text: { en: 'Detective', fr: 'Détectif (detective)' },
        correct: false,
        explanation: {
          en: 'The *cameras* are detective — they record what happened. The sign records nothing; note that one scenario can contain controls of several types at once.',
          fr: 'Ce sont les *caméras* qui sont détectives : elles enregistrent ce qui s’est passé. Le panneau n’enregistre rien ; remarque qu’un même scénario peut contenir des contrôles de plusieurs types à la fois.',
        },
      },
      {
        id: 'd',
        text: { en: 'Compensating', fr: 'Compensatoire (compensating)' },
        correct: false,
        explanation: {
          en: 'Nothing here is standing in for a control that could not be implemented. A compensating control always has a specific control it substitutes for.',
          fr: 'Rien ici ne remplace un contrôle qui n’aurait pas pu être mis en place. Un contrôle compensatoire a toujours un contrôle précis auquel il se substitue.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-004',
    objective: '1.1',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Ransomware encrypts a file server. The team isolates the host, then restores the data from the previous night’s backup. Which control type does the restore represent?',
      fr: 'Un rançongiciel chiffre un serveur de fichiers. L’équipe isole l’hôte, puis restaure les données depuis la sauvegarde de la nuit précédente. Quel type de contrôle représente la restauration ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Corrective', fr: 'Correctif (corrective)' },
        correct: true,
        explanation: {
          en: 'Corrective controls act after an incident to restore the expected state. The backup existed beforehand, but *restoring* from it is the corrective act.',
          fr: 'Les contrôles correctifs agissent après un incident pour rétablir l’état attendu. La sauvegarde existait avant, mais c’est la *restauration* qui constitue l’acte correctif.',
        },
      },
      {
        id: 'b',
        text: { en: 'Preventive', fr: 'Préventif (preventive)' },
        correct: false,
        explanation: {
          en: 'Taking the backup in advance is arguably preventive against data *loss*, but the question asks about the restore, which happens after the damage is done. Watch which action the question names.',
          fr: 'Effectuer la sauvegarde à l’avance peut se défendre comme préventif contre la *perte* de données, mais la question porte sur la restauration, qui intervient après les dégâts. Repère bien quelle action la question désigne.',
        },
      },
      {
        id: 'c',
        text: { en: 'Detective', fr: 'Détectif (detective)' },
        correct: false,
        explanation: {
          en: 'Detection is what told the team the server was encrypted. Restoring is the response to that finding, not the finding itself.',
          fr: 'C’est la détection qui a signalé à l’équipe que le serveur était chiffré. La restauration est la réponse à ce constat, pas le constat lui-même.',
        },
      },
      {
        id: 'd',
        text: { en: 'Compensating', fr: 'Compensatoire (compensating)' },
        correct: false,
        explanation: {
          en: 'A compensating control substitutes for a control that could not be implemented. A restore is not a substitute for anything — it is the recovery step itself.',
          fr: 'Un contrôle compensatoire se substitue à un contrôle qui n’a pas pu être mis en place. Une restauration ne remplace rien : c’est l’étape de reprise elle-même.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-005',
    objective: '1.1',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'An organisation publishes an acceptable use policy that all staff must sign, stating which systems may be accessed and how. Considering category and type together, how is this best classified?',
      fr: 'Une organisation publie une charte d’utilisation que tout le personnel doit signer, précisant quels systèmes peuvent être consultés et comment. En considérant ensemble la catégorie et le type, quel est le meilleur classement ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Managerial category, directive type',
          fr: 'Catégorie managériale, type directif',
        },
        correct: true,
        explanation: {
          en: 'Category and type are two independent axes. A policy is managerial because it governs people and process; it is directive because it instructs rather than enforces.',
          fr: 'La catégorie et le type sont deux axes indépendants. Une charte est managériale parce qu’elle régit les personnes et les processus ; elle est directive parce qu’elle instruit au lieu d’imposer.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Technical category, preventive type',
          fr: 'Catégorie technique, type préventif',
        },
        correct: false,
        explanation: {
          en: 'A signed document is enforced by nothing technical. If it were implemented as an access control list, *that* would be technical and preventive — the policy behind it would still be managerial.',
          fr: 'Un document signé n’est appliqué par aucun moyen technique. S’il était implémenté sous forme de liste de contrôle d’accès, *celle-ci* serait technique et préventive — la charte derrière resterait managériale.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Operational category, deterrent type',
          fr: 'Catégorie opérationnelle, type dissuasif',
        },
        correct: false,
        explanation: {
          en: 'Operational controls are recurring activities carried out by people. Writing and approving a policy is a management act; a deterrent works by threatening consequences rather than by stating rules.',
          fr: 'Les contrôles opérationnels sont des activités récurrentes menées par des personnes. Rédiger et approuver une charte est un acte de gestion ; un contrôle dissuasif fonctionne en menaçant de conséquences, pas en énonçant des règles.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Managerial category, compensating type',
          fr: 'Catégorie managériale, type compensatoire',
        },
        correct: false,
        explanation: {
          en: 'The category is right, the type is not. Nothing indicates this policy stands in for a control that could not be implemented.',
          fr: 'La catégorie est juste, le type non. Rien n’indique que cette charte remplace un contrôle qui n’aurait pas pu être mis en place.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-006',
    objective: '1.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A data centre entrance has bollards outside, a vestibule with two interlocking doors, and a badge reader. Which control category do all three share?',
      fr: 'L’entrée d’un centre de données comporte des bornes à l’extérieur, un sas à deux portes verrouillées alternativement, et un lecteur de badge. Quelle catégorie de contrôles ces trois éléments partagent-ils ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Physical', fr: 'Physique (physical)' },
        correct: true,
        explanation: {
          en: 'All three act on the tangible world to control who and what reaches the space. The badge reader has a technical component, but its purpose here is physical access.',
          fr: 'Les trois agissent sur le monde tangible pour contrôler qui et quoi atteint l’espace. Le lecteur de badge a une composante technique, mais sa finalité ici est l’accès physique.',
        },
      },
      {
        id: 'b',
        text: { en: 'Technical', fr: 'Technique (technical)' },
        correct: false,
        explanation: {
          en: 'A bollard is a concrete post; no firmware is involved. Only one of the three has any technical element at all.',
          fr: 'Une borne est un plot en béton ; aucun firmware n’intervient. Un seul des trois éléments comporte une composante technique.',
        },
      },
      {
        id: 'c',
        text: { en: 'Operational', fr: 'Opérationnelle (operational)' },
        correct: false,
        explanation: {
          en: 'Operational controls are activities people perform. A guard patrolling the entrance would be operational; the entrance itself is not.',
          fr: 'Les contrôles opérationnels sont des activités menées par des personnes. Un agent qui patrouille à l’entrée serait opérationnel ; l’entrée elle-même ne l’est pas.',
        },
      },
      {
        id: 'd',
        text: { en: 'Managerial', fr: 'Managériale (managerial)' },
        correct: false,
        explanation: {
          en: 'The policy requiring badges is managerial. The reader that enforces it, and the doors and bollards, are not.',
          fr: 'La politique qui exige le badge est managériale. Le lecteur qui l’applique, les portes et les bornes ne le sont pas.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-007',
    objective: '1.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A SIEM raises an alert when a user account authenticates from two countries within five minutes. It takes no action beyond alerting. Which control type is this?',
      fr: 'Un SIEM lève une alerte lorsqu’un compte utilisateur s’authentifie depuis deux pays en moins de cinq minutes. Il n’entreprend aucune action au-delà de l’alerte. De quel type de contrôle s’agit-il ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Detective', fr: 'Détectif (detective)' },
        correct: true,
        explanation: {
          en: 'It identifies that something has happened and reports it. Detection does not stop the event — the give-away here is "takes no action beyond alerting".',
          fr: 'Il identifie qu’un événement s’est produit et le signale. La détection n’arrête pas l’événement — l’indice est ici « n’entreprend aucune action au-delà de l’alerte ».',
        },
      },
      {
        id: 'b',
        text: { en: 'Preventive', fr: 'Préventif (preventive)' },
        correct: false,
        explanation: {
          en: 'Nothing is blocked. Had the system disabled the account automatically, that action would be preventive — or corrective, depending on whether the damage had already occurred.',
          fr: 'Rien n’est bloqué. Si le système avait désactivé le compte automatiquement, cette action serait préventive — ou corrective, selon que les dégâts avaient déjà eu lieu.',
        },
      },
      {
        id: 'c',
        text: { en: 'Deterrent', fr: 'Dissuasif (deterrent)' },
        correct: false,
        explanation: {
          en: 'A deterrent must be visible to the would-be attacker to change their mind. An attacker does not see your SIEM rules.',
          fr: 'Un contrôle dissuasif doit être visible de l’attaquant potentiel pour le faire changer d’avis. Un attaquant ne voit pas tes règles de SIEM.',
        },
      },
      {
        id: 'd',
        text: { en: 'Directive', fr: 'Directif (directive)' },
        correct: false,
        explanation: {
          en: 'Directive controls instruct people. A SIEM rule instructs a machine, and the alert reports rather than directs.',
          fr: 'Les contrôles directifs instruisent des personnes. Une règle de SIEM instruit une machine, et l’alerte signale plutôt qu’elle ne dirige.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-008',
    objective: '1.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which two axes does CompTIA use to classify a security control?',
      fr: 'Quels sont les deux axes utilisés par CompTIA pour classer un contrôle de sécurité ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Category and type', fr: 'Catégorie et type' },
        correct: true,
        explanation: {
          en: 'Category is *where* the control lives (technical, managerial, operational, physical); type is *what it does* (preventive, deterrent, detective, corrective, compensating, directive). Every control has both.',
          fr: 'La catégorie indique *où* vit le contrôle (technique, managériale, opérationnelle, physique) ; le type indique *ce qu’il fait* (préventif, dissuasif, détectif, correctif, compensatoire, directif). Chaque contrôle a les deux.',
        },
      },
      {
        id: 'b',
        text: { en: 'Severity and scope', fr: 'Gravité et portée' },
        correct: false,
        explanation: {
          en: 'Severity and scope describe risks and findings, not the classification of a control.',
          fr: 'La gravité et la portée décrivent des risques et des constats, pas la classification d’un contrôle.',
        },
      },
      {
        id: 'c',
        text: { en: 'Cost and effectiveness', fr: 'Coût et efficacité' },
        correct: false,
        explanation: {
          en: 'Both matter when *selecting* a control, and appear in risk management. Neither is part of how a control is classified.',
          fr: 'Les deux comptent pour *sélectionner* un contrôle et apparaissent en gestion des risques. Aucun ne fait partie de la classification d’un contrôle.',
        },
      },
      {
        id: 'd',
        text: { en: 'Confidentiality and integrity', fr: 'Confidentialité et intégrité' },
        correct: false,
        explanation: {
          en: 'These are two legs of the CIA triad — properties a control protects, covered by objective 1.2, not axes of classification.',
          fr: 'Ce sont deux piliers de la triade CIA — des propriétés qu’un contrôle protège, traitées par l’objectif 1.2, et non des axes de classification.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-009',
    objective: '1.1',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'An auditor finds that a payment system stores card data unencrypted, and the vendor cannot add encryption. The organisation moves the system to an isolated network segment with strict egress filtering and daily log review. Which two descriptions apply to this response?',
      fr: 'Un auditeur constate qu’un système de paiement stocke des données de carte non chiffrées et que l’éditeur ne peut pas ajouter le chiffrement. L’organisation déplace le système vers un segment réseau isolé, avec filtrage de sortie strict et revue quotidienne des journaux. Quelles deux descriptions s’appliquent à cette réponse ?',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: {
          en: 'It is a compensating control',
          fr: 'C’est un contrôle compensatoire',
        },
        correct: true,
        explanation: {
          en: 'The required control — encryption at rest — cannot be implemented, so alternatives are deployed to reduce the risk comparably. That is the definition.',
          fr: 'Le contrôle requis — le chiffrement au repos — ne peut pas être mis en place, donc des dispositifs alternatifs sont déployés pour réduire le risque de façon comparable. C’est la définition même.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It combines technical and operational categories',
          fr: 'Elle combine les catégories technique et opérationnelle',
        },
        correct: true,
        explanation: {
          en: 'Segmentation and egress filtering are technical; a daily human log review is operational. Real responses routinely span categories.',
          fr: 'La segmentation et le filtrage de sortie sont techniques ; une revue humaine quotidienne des journaux est opérationnelle. Les réponses réelles couvrent couramment plusieurs catégories.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It removes the need to document the exception',
          fr: 'Elle supprime la nécessité de documenter l’exception',
        },
        correct: false,
        explanation: {
          en: 'The opposite. A compensating control is precisely the case that must be documented and approved, because the original requirement remains unmet.',
          fr: 'C’est l’inverse. Un contrôle compensatoire est précisément le cas qui doit être documenté et approuvé, puisque l’exigence d’origine reste non satisfaite.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It is a corrective control, because it follows an audit finding',
          fr: 'C’est un contrôle correctif, puisqu’elle suit un constat d’audit',
        },
        correct: false,
        explanation: {
          en: 'A finding is not an incident. Corrective controls restore state after something has gone wrong; here nothing has been breached, and a missing capability is being worked around.',
          fr: 'Un constat n’est pas un incident. Les contrôles correctifs rétablissent un état après un problème survenu ; ici rien n’a été compromis, on contourne une capacité manquante.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-010',
    objective: '1.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which control type is a mandatory security awareness module that staff must complete before their account is enabled?',
      fr: 'Quel type de contrôle représente un module obligatoire de sensibilisation à la sécurité que le personnel doit suivre avant l’activation de son compte ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Preventive', fr: 'Préventif (preventive)' },
        correct: true,
        explanation: {
          en: 'The training aims to stop mistakes before they happen, and the gate on account activation enforces it. Awareness training is the standard example of a preventive control that is *not* technical.',
          fr: 'La formation vise à empêcher les erreurs avant qu’elles ne surviennent, et le blocage de l’activation du compte l’impose. La sensibilisation est l’exemple classique d’un contrôle préventif qui n’est *pas* technique.',
        },
      },
      {
        id: 'b',
        text: { en: 'Detective', fr: 'Détectif (detective)' },
        correct: false,
        explanation: {
          en: 'Training detects nothing. A phishing simulation that measures who clicks would be detective.',
          fr: 'Une formation ne détecte rien. Une simulation de hameçonnage qui mesure qui clique serait détective.',
        },
      },
      {
        id: 'c',
        text: { en: 'Corrective', fr: 'Correctif (corrective)' },
        correct: false,
        explanation: {
          en: 'Nothing is being repaired. Remedial training assigned *after* someone fails a phishing test would be corrective — note how the timing changes the answer.',
          fr: 'Rien n’est réparé. Une formation de rattrapage imposée *après* un échec à un test de hameçonnage serait corrective — remarque comment le moment change la réponse.',
        },
      },
      {
        id: 'd',
        text: { en: 'Compensating', fr: 'Compensatoire (compensating)' },
        correct: false,
        explanation: {
          en: 'Nothing indicates the training substitutes for a control that could not be implemented.',
          fr: 'Rien n’indique que la formation remplace un contrôle qui n’aurait pas pu être mis en place.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-011',
    objective: '1.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which control type is defined by instructing or guiding behaviour without enforcing it?',
      fr: 'Quel type de contrôle se définit par le fait d’instruire ou d’orienter un comportement sans l’imposer ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Directive', fr: 'Directif (directive)' },
        correct: true,
        explanation: {
          en: 'Directive controls tell people what is expected — a procedure, a standard, a warning notice. Compliance depends on the person.',
          fr: 'Les contrôles directifs indiquent ce qui est attendu — une procédure, une norme, un avertissement. Le respect dépend de la personne.',
        },
      },
      {
        id: 'b',
        text: { en: 'Deterrent', fr: 'Dissuasif (deterrent)' },
        correct: false,
        explanation: {
          en: 'Close, and the most-confused neighbour. A deterrent discourages by threatening a consequence; a directive simply states the expectation. "Trespassers will be prosecuted" deters; "Visitors must sign in" directs.',
          fr: 'Proche, et c’est le voisin le plus confondu. Le dissuasif décourage en menaçant d’une conséquence ; le directif énonce simplement l’attente. « Toute intrusion sera poursuivie » dissuade ; « Les visiteurs doivent s’enregistrer » dirige.',
        },
      },
      {
        id: 'c',
        text: { en: 'Preventive', fr: 'Préventif (preventive)' },
        correct: false,
        explanation: {
          en: 'A preventive control removes the possibility rather than describing the expectation.',
          fr: 'Un contrôle préventif supprime la possibilité au lieu de décrire l’attente.',
        },
      },
      {
        id: 'd',
        text: { en: 'Detective', fr: 'Détectif (detective)' },
        correct: false,
        explanation: {
          en: 'Detective controls observe after the fact and issue no instructions.',
          fr: 'Les contrôles détectifs observent après coup et ne donnent aucune instruction.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-012',
    objective: '1.1',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'After a laptop theft, an organisation enables full-disk encryption on every laptop and adds a monthly report of devices missing the agent. Which pairing of types is correct?',
      fr: 'Après le vol d’un portable, une organisation active le chiffrement intégral du disque sur tous les portables et ajoute un rapport mensuel des appareils dépourvus de l’agent. Quelle association de types est correcte ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Encryption is preventive; the report is detective',
          fr: 'Le chiffrement est préventif ; le rapport est détectif',
        },
        correct: true,
        explanation: {
          en: 'Encryption removes the possibility of reading data from a stolen disk. The report finds gaps in coverage — it identifies a condition rather than blocking anything.',
          fr: 'Le chiffrement supprime la possibilité de lire les données d’un disque volé. Le rapport repère les manques de couverture : il identifie une situation plutôt que de bloquer quoi que ce soit.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Both are corrective, since both follow the theft',
          fr: 'Les deux sont correctifs, puisqu’ils suivent le vol',
        },
        correct: false,
        explanation: {
          en: 'A control is classified by what it does, not by what prompted it. Neither of these restores anything lost in the theft — they reduce the impact of the *next* one.',
          fr: 'Un contrôle se classe par ce qu’il fait, pas par ce qui l’a déclenché. Aucun des deux ne restaure ce qui a été perdu dans le vol : ils réduisent l’impact du *prochain*.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Encryption is compensating; the report is corrective',
          fr: 'Le chiffrement est compensatoire ; le rapport est correctif',
        },
        correct: false,
        explanation: {
          en: 'Encryption is the intended control here, not a substitute for one, and a report repairs nothing.',
          fr: 'Le chiffrement est ici le contrôle voulu, pas un substitut, et un rapport ne répare rien.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Encryption is deterrent; the report is preventive',
          fr: 'Le chiffrement est dissuasif ; le rapport est préventif',
        },
        correct: false,
        explanation: {
          en: 'Both are backwards. A thief cannot see that a disk is encrypted, so it deters nobody, and a report blocks nothing.',
          fr: 'Les deux sont inversés. Un voleur ne peut pas voir qu’un disque est chiffré, donc cela ne dissuade personne, et un rapport ne bloque rien.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-013',
    objective: '1.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which of these is an operational control rather than a managerial one?',
      fr: 'Lequel de ces éléments est un contrôle opérationnel plutôt que managérial ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A technician reviewing firewall logs every morning',
          fr: 'Un technicien qui examine les journaux du pare-feu chaque matin',
        },
        correct: true,
        explanation: {
          en: 'Operational controls are the recurring activities people actually perform. The review *is* the control.',
          fr: 'Les contrôles opérationnels sont les activités récurrentes réellement exécutées par des personnes. La revue *est* le contrôle.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A policy requiring firewall logs to be reviewed daily',
          fr: 'Une politique exigeant une revue quotidienne des journaux du pare-feu',
        },
        correct: false,
        explanation: {
          en: 'The requirement is managerial; carrying it out is operational. This pair is the cleanest way to see the boundary — same subject, different control.',
          fr: 'L’exigence est managériale ; son exécution est opérationnelle. Ce couple est la façon la plus nette de voir la frontière : même sujet, contrôle différent.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'An annual risk assessment approved by the board',
          fr: 'Une évaluation annuelle des risques approuvée par le conseil',
        },
        correct: false,
        explanation: {
          en: 'Governance activity, and therefore managerial.',
          fr: 'Activité de gouvernance, donc managériale.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A background check requirement for new hires',
          fr: 'Une exigence de vérification des antécédents pour les nouveaux employés',
        },
        correct: false,
        explanation: {
          en: 'The requirement is managerial. The HR team actually running each check is the operational part.',
          fr: 'L’exigence est managériale. C’est l’équipe RH qui effectue réellement chaque vérification qui constitue la part opérationnelle.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-014',
    objective: '1.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A retail chain wants to reduce shoplifting at the door rather than catch thieves afterwards. Which control best matches that goal?',
      fr: 'Une chaîne de magasins veut réduire le vol à l’étalage dès la porte plutôt que d’attraper les voleurs après coup. Quel contrôle correspond le mieux à cet objectif ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A visible security guard at the entrance',
          fr: 'Un agent de sécurité visible à l’entrée',
        },
        correct: true,
        explanation: {
          en: 'A visible guard deters — the goal is to change the decision before the attempt. Note that the same guard also detects and can respond; visibility is what makes the deterrent effect the primary one.',
          fr: 'Un agent visible dissuade — l’objectif est de modifier la décision avant la tentative. Le même agent détecte aussi et peut intervenir ; c’est la visibilité qui rend l’effet dissuasif primordial.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Higher-resolution cameras in the aisles',
          fr: 'Des caméras à plus haute résolution dans les rayons',
        },
        correct: false,
        explanation: {
          en: 'Better footage helps identify a thief afterwards — detective, and useful, but explicitly not what the question asks for.',
          fr: 'De meilleures images aident à identifier un voleur après coup — détectif, et utile, mais explicitement pas ce que demande la question.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A stricter procedure for reporting losses',
          fr: 'Une procédure plus stricte de déclaration des pertes',
        },
        correct: false,
        explanation: {
          en: 'This improves the record of what was stolen. It changes nothing at the door.',
          fr: 'Cela améliore le suivi de ce qui a été volé. Cela ne change rien à la porte.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Monthly stock reconciliation',
          fr: 'Un rapprochement mensuel des stocks',
        },
        correct: false,
        explanation: {
          en: 'Detective, and slow — it reveals losses weeks after they happen.',
          fr: 'Détectif, et lent : il révèle les pertes des semaines après leur survenue.',
        },
      },
    ],
  },

  {
    id: 'q-1-1-015',
    objective: '1.1',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'What distinguishes a compensating control from a corrective one?',
      fr: 'Qu’est-ce qui distingue un contrôle compensatoire d’un contrôle correctif ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A compensating control substitutes for a control that cannot be implemented; a corrective control restores state after an incident',
          fr: 'Le compensatoire se substitue à un contrôle impossible à mettre en place ; le correctif rétablit l’état après un incident',
        },
        correct: true,
        explanation: {
          en: 'The distinction is *what triggered it*. Compensating answers "we cannot do the required thing"; corrective answers "something has gone wrong". This pair is the single most-confused one in the objective.',
          fr: 'La distinction porte sur *ce qui l’a déclenché*. Le compensatoire répond à « on ne peut pas faire ce qui est exigé » ; le correctif répond à « quelque chose s’est produit ». C’est le couple le plus confondu de cet objectif.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A compensating control is always technical; a corrective control is always operational',
          fr: 'Le compensatoire est toujours technique ; le correctif est toujours opérationnel',
        },
        correct: false,
        explanation: {
          en: 'Type and category are independent axes. Either type can appear in any category — a compensating control can be a manual procedure.',
          fr: 'Le type et la catégorie sont des axes indépendants. Chaque type peut apparaître dans n’importe quelle catégorie — un contrôle compensatoire peut être une procédure manuelle.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A compensating control is temporary; a corrective control is permanent',
          fr: 'Le compensatoire est temporaire ; le correctif est permanent',
        },
        correct: false,
        explanation: {
          en: 'Compensating controls are often long-lived, sometimes for the whole life of a legacy system. Duration is not the distinction.',
          fr: 'Les contrôles compensatoires durent souvent longtemps, parfois toute la vie d’un système hérité. La durée n’est pas le critère.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A compensating control requires management approval; a corrective control does not',
          fr: 'Le compensatoire exige une approbation de la direction ; le correctif non',
        },
        correct: false,
        explanation: {
          en: 'Compensating controls usually *do* need documented approval, but so does much corrective action, and approval is a process requirement rather than what defines either type.',
          fr: 'Les contrôles compensatoires exigent généralement une approbation documentée, mais beaucoup d’actions correctives aussi ; et l’approbation est une exigence de processus, pas ce qui définit l’un ou l’autre type.',
        },
      },
    ],
  },
];
