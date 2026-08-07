import type { Question } from '@/content/schemas';

/**
 * Objective 1.2 — Summarize fundamental security concepts.
 *
 * Every question is **original**, written from the published objective. None reproduces,
 * paraphrases, or reconstructs any real exam item — see NOTICE.md.
 *
 * The objective's seven topics are mostly definitional, so the marks are lost at the boundaries:
 * which triad property a scenario actually breaks, integrity versus non-repudiation, and which Zero
 * Trust component decides rather than enforces. The distractors are those neighbours.
 */
export const QUESTIONS_1_2: Question[] = [
  {
    id: 'q-1-2-001',
    objective: '1.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'Ransomware encrypts a file server. The attacker did not copy any data before encrypting it. Which element of the CIA triad has been violated?',
      fr: 'Un rançongiciel chiffre un serveur de fichiers. L’attaquant n’a copié aucune donnée avant de chiffrer. Quel élément de la triade CIA a été violé ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Availability', fr: 'Disponibilité (availability)' },
        correct: true,
        explanation: {
          en: 'The data still exists and nobody read it, but the organisation cannot reach it. Loss of access is exactly what availability means.',
          fr: 'Les données existent toujours et personne ne les a lues, mais l’organisation ne peut plus y accéder. La perte d’accès est précisément ce que recouvre la disponibilité.',
        },
      },
      {
        id: 'b',
        text: { en: 'Confidentiality', fr: 'Confidentialité (confidentiality)' },
        correct: false,
        explanation: {
          en: 'Confidentiality falls only if somebody unauthorised reads the data. The question states nothing was copied — in a double-extortion attack it would also fall, which is why the detail matters.',
          fr: 'La confidentialité ne tombe que si un non-autorisé lit les données. L’énoncé précise que rien n’a été copié ; dans une attaque à double extorsion elle tomberait aussi, d’où l’importance du détail.',
        },
      },
      {
        id: 'c',
        text: { en: 'Integrity', fr: 'Intégrité (integrity)' },
        correct: false,
        explanation: {
          en: 'Encryption is a reversible transformation, not a corruption of meaning. Integrity is about undetected alteration of the content, not about it being locked away.',
          fr: 'Le chiffrement est une transformation réversible, pas une corruption du contenu. L’intégrité concerne l’altération non détectée de la donnée, pas le fait qu’elle soit rendue inaccessible.',
        },
      },
      {
        id: 'd',
        text: { en: 'Non-repudiation', fr: 'Non-répudiation (non-repudiation)' },
        correct: false,
        explanation: {
          en: 'Non-repudiation is not part of the CIA triad at all — it is a separate property about proving authorship, and nothing here concerns who signed what.',
          fr: 'La non-répudiation ne fait pas partie de la triade CIA : c’est une propriété distincte qui concerne la preuve d’auteur, et rien ici ne porte sur qui a signé quoi.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-002',
    objective: '1.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A file is distributed with a SHA-256 hash published alongside it. Which property does the hash alone provide?',
      fr: 'Un fichier est distribué avec une empreinte SHA-256 publiée à côté. Quelle propriété l’empreinte seule apporte-t-elle ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Integrity only', fr: 'L’intégrité seulement' },
        correct: true,
        explanation: {
          en: 'A hash proves the bytes have not changed. It proves nothing about who produced them — anyone able to alter the file could publish a new hash beside it.',
          fr: 'Une empreinte prouve que les octets n’ont pas changé. Elle ne prouve rien sur leur auteur : quiconque peut modifier le fichier peut aussi publier une nouvelle empreinte à côté.',
        },
      },
      {
        id: 'b',
        text: { en: 'Integrity and non-repudiation', fr: 'L’intégrité et la non-répudiation' },
        correct: false,
        explanation: {
          en: 'This is the classic confusion. Non-repudiation needs something only the author holds — a private key. Adding a digital signature would give both; a bare hash does not.',
          fr: 'C’est la confusion classique. La non-répudiation exige quelque chose que seul l’auteur détient — une clé privée. Une signature numérique donnerait les deux ; une simple empreinte non.',
        },
      },
      {
        id: 'c',
        text: { en: 'Confidentiality', fr: 'La confidentialité' },
        correct: false,
        explanation: {
          en: 'Hashing does not conceal anything. The file is distributed in the clear; the hash sits next to it and is itself public.',
          fr: 'Le hachage ne dissimule rien. Le fichier est distribué en clair et l’empreinte, placée à côté, est elle-même publique.',
        },
      },
      {
        id: 'd',
        text: { en: 'Availability', fr: 'La disponibilité' },
        correct: false,
        explanation: {
          en: 'A hash has no bearing on whether the file can be reached. Availability is about access, which distribution and redundancy address.',
          fr: 'Une empreinte n’a aucun effet sur la possibilité d’atteindre le fichier. La disponibilité concerne l’accès, que traitent la distribution et la redondance.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-003',
    objective: '1.2',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'In a Zero Trust architecture, which component makes the allow-or-deny decision?',
      fr: 'Dans une architecture Zero Trust, quel composant prend la décision d’autoriser ou de refuser ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'The Policy Engine', fr: 'Le moteur de politique (Policy Engine)' },
        correct: true,
        explanation: {
          en: 'The Policy Engine evaluates the request against policy and produces the verdict. It is the reasoning part of the control plane.',
          fr: 'Le moteur de politique évalue la demande au regard de la politique et produit le verdict. C’est la partie qui raisonne, dans le plan de contrôle.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The Policy Enforcement Point',
          fr: 'Le point d’application de la politique (Policy Enforcement Point)',
        },
        correct: false,
        explanation: {
          en: 'The enforcement point sits in the data plane and applies a decision it did not make. Mistaking it for the engine is the single most common error on this objective: one thinks, the other obeys.',
          fr: 'Le point d’application est dans le plan de données et applique une décision qu’il n’a pas prise. Le confondre avec le moteur est l’erreur la plus fréquente de cet objectif : l’un réfléchit, l’autre obéit.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The Policy Administrator',
          fr: 'L’administrateur de politique (Policy Administrator)',
        },
        correct: false,
        explanation: {
          en: 'The administrator relays the verdict and establishes or tears down the session. It carries the decision rather than reaching it.',
          fr: 'L’administrateur transmet le verdict et établit ou coupe la session. Il porte la décision, il ne la prend pas.',
        },
      },
      {
        id: 'd',
        text: { en: 'The subject', fr: 'Le sujet (subject)' },
        correct: false,
        explanation: {
          en: 'The subject is whatever requests access — a user or a service. Letting the requester decide would defeat the entire model.',
          fr: 'Le sujet est ce qui demande l’accès — un utilisateur ou un service. Laisser le demandeur décider viderait tout le modèle de son sens.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-004',
    objective: '1.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which physical control is designed specifically to stop a vehicle?',
      fr: 'Quel contrôle physique est conçu spécifiquement pour arrêter un véhicule ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A bollard', fr: 'Une borne (bollard)' },
        correct: true,
        explanation: {
          en: 'A bollard is a short reinforced post placed to stop a vehicle reaching a building. Pedestrians walk straight between them, which is the point.',
          fr: 'Une borne est un plot renforcé placé pour empêcher un véhicule d’atteindre un bâtiment. Les piétons passent librement entre elles, et c’est voulu.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'An access control vestibule',
          fr: 'Un sas d’accès (access control vestibule)',
        },
        correct: false,
        explanation: {
          en: 'A vestibule controls people, one at a time, to prevent tailgating. No vehicle is involved.',
          fr: 'Un sas contrôle le passage des personnes, une à la fois, pour empêcher le talonnage. Aucun véhicule n’est concerné.',
        },
      },
      {
        id: 'c',
        text: { en: 'A pressure sensor', fr: 'Un capteur de pression (pressure sensor)' },
        correct: false,
        explanation: {
          en: 'A pressure sensor detects weight on a surface. It reports that something arrived; it stops nothing.',
          fr: 'Un capteur de pression détecte un poids sur une surface. Il signale une présence, il n’arrête rien.',
        },
      },
      {
        id: 'd',
        text: { en: 'Lighting', fr: 'L’éclairage (lighting)' },
        correct: false,
        explanation: {
          en: 'Lighting deters and makes detection possible, but it is not a barrier to anything.',
          fr: 'L’éclairage dissuade et rend la détection possible, mais il ne constitue une barrière pour rien.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-005',
    objective: '1.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A security team plants a fake customer record containing an email address that belongs to nobody. Months later that address receives marketing mail. What was planted, and what does the mail prove?',
      fr: 'Une équipe sécurité insère une fiche client fictive contenant une adresse e-mail qui n’appartient à personne. Des mois plus tard, cette adresse reçoit du courrier commercial. Qu’a-t-on inséré, et que prouve ce courrier ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A honeytoken — the database leaked',
          fr: 'Un jeton piège (honeytoken) — la base a fuité',
        },
        correct: true,
        explanation: {
          en: 'A honeytoken is fictitious data whose use anywhere proves it escaped. Nobody could mail that address without having obtained the record.',
          fr: 'Un jeton piège est une donnée fictive dont l’usage, où qu’il soit, prouve qu’elle est sortie. Personne ne pouvait écrire à cette adresse sans avoir obtenu la fiche.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A honeyfile — somebody opened it',
          fr: 'Un fichier piège (honeyfile) — quelqu’un l’a ouvert',
        },
        correct: false,
        explanation: {
          en: 'A honeyfile is a tempting file that alerts when opened on your own system. Here the signal came from outside, months later, which a file-open alert cannot produce.',
          fr: 'Un fichier piège est un fichier appâtant qui alerte à son ouverture, sur ton propre système. Ici le signal vient de l’extérieur, des mois après : une alerte d’ouverture ne peut pas produire cela.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A honeypot — an attacker probed it',
          fr: 'Un pot de miel (honeypot) — un attaquant l’a sondé',
        },
        correct: false,
        explanation: {
          en: 'A honeypot is a decoy system exposed to be attacked. A row in a customer table is data, not a system.',
          fr: 'Un pot de miel est un système leurre exposé pour être attaqué. Une ligne dans une table clients est une donnée, pas un système.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A honeynet — the network was breached',
          fr: 'Un réseau de miel (honeynet) — le réseau a été compromis',
        },
        correct: false,
        explanation: {
          en: 'A honeynet is an entire network of decoy systems. Nothing in the scenario involves a network of anything.',
          fr: 'Un réseau de miel est un réseau entier de systèmes leurres. Rien dans le scénario ne fait intervenir un réseau.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-006',
    objective: '1.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which stage of AAA answers the question "what did this account actually do?"',
      fr: 'Quelle étape du triptyque AAA répond à la question « qu’a réellement fait ce compte ? »',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Accounting', fr: 'Traçabilité (accounting)' },
        correct: true,
        explanation: {
          en: 'Accounting records what was done: logs, session recording, resource usage. It is the retrospective leg of AAA.',
          fr: 'La traçabilité enregistre ce qui a été fait : journaux, enregistrement de session, consommation de ressources. C’est le volet rétrospectif d’AAA.',
        },
      },
      {
        id: 'b',
        text: { en: 'Authentication', fr: 'Authentification (authentication)' },
        correct: false,
        explanation: {
          en: 'Authentication establishes identity at the door. It says who arrived, not what they went on to do.',
          fr: 'L’authentification établit l’identité à la porte. Elle dit qui est arrivé, pas ce qu’il a fait ensuite.',
        },
      },
      {
        id: 'c',
        text: { en: 'Authorization', fr: 'Autorisation (authorization)' },
        correct: false,
        explanation: {
          en: 'Authorization decides what is permitted. What was permitted and what was actually done are different questions, and only logs answer the second.',
          fr: 'L’autorisation décide ce qui est permis. Ce qui était permis et ce qui a été fait sont deux questions distinctes ; seuls les journaux répondent à la seconde.',
        },
      },
      {
        id: 'd',
        text: { en: 'Attestation', fr: 'Attestation (attestation)' },
        correct: false,
        explanation: {
          en: 'Attestation is the periodic review confirming that access rights are still appropriate. It belongs to objective 4.6 and is not part of AAA.',
          fr: 'L’attestation est la revue périodique confirmant que les droits d’accès restent appropriés. Elle relève de l’objectif 4.6 et ne fait pas partie d’AAA.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-007',
    objective: '1.2',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'An organisation compares its current controls against the ISO 27001 control set and produces a prioritised list of what is missing. What has it performed?',
      fr: 'Une organisation compare ses contrôles actuels au référentiel ISO 27001 et produit une liste priorisée de ce qui manque. Qu’a-t-elle réalisé ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A gap analysis', fr: 'Une analyse d’écart (gap analysis)' },
        correct: true,
        explanation: {
          en: 'A gap analysis measures the distance between the current posture and a target standard, and its output is exactly that list of gaps.',
          fr: 'Une analyse d’écart mesure la distance entre la posture actuelle et un référentiel cible, et sa sortie est exactement cette liste d’écarts.',
        },
      },
      {
        id: 'b',
        text: { en: 'An audit', fr: 'Un audit (audit)' },
        correct: false,
        explanation: {
          en: 'An audit verifies and formally attests compliance, usually by an independent party. Measuring your own distance to a target is not the same activity.',
          fr: 'Un audit vérifie et atteste formellement la conformité, généralement par une partie indépendante. Mesurer soi-même sa distance à une cible n’est pas la même activité.',
        },
      },
      {
        id: 'c',
        text: { en: 'A risk assessment', fr: 'Une évaluation des risques (risk assessment)' },
        correct: false,
        explanation: {
          en: 'A risk assessment weights findings by likelihood and impact. A gap analysis lists what is absent without necessarily modelling how likely its absence is to hurt.',
          fr: 'Une évaluation des risques pondère les constats par probabilité et impact. Une analyse d’écart liste ce qui manque sans nécessairement modéliser la probabilité que ce manque nuise.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A penetration test',
          fr: 'Un test d’intrusion (penetration test)',
        },
        correct: false,
        explanation: {
          en: 'A penetration test attempts real exploitation to find what an attacker could achieve. Nothing here is being attacked; documents are being compared.',
          fr: 'Un test d’intrusion tente une exploitation réelle pour découvrir ce qu’un attaquant obtiendrait. Ici rien n’est attaqué : on compare des documents.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-008',
    objective: '1.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which Zero Trust concept means that being inside the corporate network grants no privilege by itself?',
      fr: 'Quel concept de Zero Trust signifie que se trouver dans le réseau de l’entreprise ne confère en soi aucun privilège ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Eliminating implicit trust zones',
          fr: 'L’élimination des zones de confiance implicite',
        },
        correct: true,
        explanation: {
          en: 'An implicit trust zone is any region where location alone confers trust. Removing them is the founding idea of Zero Trust.',
          fr: 'Une zone de confiance implicite est toute région où l’emplacement seul confère la confiance. Les supprimer est l’idée fondatrice de Zero Trust.',
        },
      },
      {
        id: 'b',
        text: { en: 'Adaptive identity', fr: 'L’identité adaptative (adaptive identity)' },
        correct: false,
        explanation: {
          en: 'Adaptive identity varies the strength of the check by context — an unusual location may demand more proof. It adjusts trust rather than denying that location confers any.',
          fr: 'L’identité adaptative fait varier l’exigence selon le contexte — un lieu inhabituel peut demander plus de preuves. Elle module la confiance, elle ne nie pas que l’emplacement en confère.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Threat scope reduction',
          fr: 'La réduction du périmètre de menace (threat scope reduction)',
        },
        correct: false,
        explanation: {
          en: 'Threat scope reduction narrows what any one compromised account can reach. That limits blast radius; it is not the statement about network location.',
          fr: 'La réduction du périmètre de menace restreint ce qu’un compte compromis peut atteindre. Cela limite l’étendue des dégâts ; ce n’est pas l’énoncé sur l’emplacement réseau.',
        },
      },
      {
        id: 'd',
        text: { en: 'Accounting', fr: 'La traçabilité (accounting)' },
        correct: false,
        explanation: {
          en: 'Accounting records activity after the fact. It belongs to AAA and says nothing about where trust comes from.',
          fr: 'La traçabilité enregistre l’activité après coup. Elle relève d’AAA et ne dit rien de l’origine de la confiance.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-009',
    objective: '1.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A printer needs to join the corporate network. It has no user and cannot type a password. Which approach fits?',
      fr: 'Une imprimante doit rejoindre le réseau de l’entreprise. Elle n’a pas d’utilisateur et ne peut pas saisir de mot de passe. Quelle approche convient ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Authenticate the system with a certificate, via 802.1X',
          fr: 'Authentifier le système par certificat, via 802.1X',
        },
        correct: true,
        explanation: {
          en: 'Authenticating systems is a distinct strand of AAA. A device proves itself with a credential it holds — a certificate — rather than with something typed.',
          fr: 'L’authentification des systèmes est un volet distinct d’AAA. Un équipement se prouve par un justificatif qu’il détient — un certificat — plutôt que par une saisie.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Give the printer a shared user account',
          fr: 'Donner à l’imprimante un compte utilisateur partagé',
        },
        correct: false,
        explanation: {
          en: 'A shared account destroys accountability: nothing it does can be attributed, which breaks the accounting leg of AAA and any non-repudiation.',
          fr: 'Un compte partagé détruit l’imputabilité : rien de ce qu’il fait ne peut être attribué, ce qui casse le volet traçabilité d’AAA et toute non-répudiation.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Exempt the printer from authentication',
          fr: 'Exempter l’imprimante d’authentification',
        },
        correct: false,
        explanation: {
          en: 'That recreates an implicit trust zone — exactly what Zero Trust removes. Printers are a well-known foothold precisely because they are exempted.',
          fr: 'Cela recrée une zone de confiance implicite, précisément ce que Zero Trust supprime. Les imprimantes sont un point d’entrée connu justement parce qu’on les exempte.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Require multifactor authentication on the printer',
          fr: 'Exiger une authentification multifacteur sur l’imprimante',
        },
        correct: false,
        explanation: {
          en: 'MFA factors assume a human: something you know, have, or are. A device has no second factor to present and nobody to present it.',
          fr: 'Les facteurs de MFA supposent un humain : ce que l’on sait, possède ou est. Un équipement n’a pas de second facteur à présenter, ni personne pour le présenter.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-010',
    objective: '1.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which sensor detects an intruder by their body heat?',
      fr: 'Quel capteur détecte un intrus par la chaleur de son corps ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Infrared', fr: 'Infrarouge (infrared)' },
        correct: true,
        explanation: {
          en: 'Infrared sensors read emitted heat, which is why they work in darkness and why a warm body stands out against a cool room.',
          fr: 'Les capteurs infrarouges lisent la chaleur émise, ce qui explique qu’ils fonctionnent dans l’obscurité et qu’un corps chaud se détache d’une pièce fraîche.',
        },
      },
      {
        id: 'b',
        text: { en: 'Microwave', fr: 'Micro-ondes (microwave)' },
        correct: false,
        explanation: {
          en: 'Microwave sensors emit a wave and measure its reflection, so they detect movement regardless of temperature — a warm object standing still is invisible to them.',
          fr: 'Les capteurs micro-ondes émettent une onde et mesurent son reflet : ils détectent le mouvement indépendamment de la température — un objet chaud immobile leur est invisible.',
        },
      },
      {
        id: 'c',
        text: { en: 'Ultrasonic', fr: 'Ultrasonique (ultrasonic)' },
        correct: false,
        explanation: {
          en: 'Ultrasonic sensors use sound waves to detect movement. Like microwave, they respond to motion rather than to heat.',
          fr: 'Les capteurs ultrasoniques utilisent des ondes sonores pour détecter le mouvement. Comme les micro-ondes, ils réagissent au mouvement et non à la chaleur.',
        },
      },
      {
        id: 'd',
        text: { en: 'Pressure', fr: 'Pression (pressure)' },
        correct: false,
        explanation: {
          en: 'Pressure sensors respond to weight on a surface — a floor mat or a fence line. A person hovering above the sensor triggers nothing.',
          fr: 'Les capteurs de pression réagissent au poids exercé sur une surface — un tapis ou une ligne de clôture. Une personne qui ne pose pas le pied dessus ne déclenche rien.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-011',
    objective: '1.2',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which pair of properties does a digital signature provide that a hash alone does not?',
      fr: 'Quel couple de propriétés une signature numérique apporte-t-elle qu’une empreinte seule n’apporte pas ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Integrity and non-repudiation',
          fr: 'L’intégrité et la non-répudiation',
        },
        correct: true,
        explanation: {
          en: 'The signature covers a hash, so integrity is preserved, and it is produced with a private key only the signer holds, which is what adds non-repudiation.',
          fr: 'La signature porte sur une empreinte, donc l’intégrité est préservée, et elle est produite avec une clé privée que seul le signataire détient : c’est ce qui ajoute la non-répudiation.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Confidentiality and integrity',
          fr: 'La confidentialité et l’intégrité',
        },
        correct: false,
        explanation: {
          en: 'Signing does not conceal the message. A signed document is still readable by anyone; encryption is what would add confidentiality.',
          fr: 'Signer ne dissimule pas le message. Un document signé reste lisible par tous ; c’est le chiffrement qui ajouterait la confidentialité.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Availability and integrity',
          fr: 'La disponibilité et l’intégrité',
        },
        correct: false,
        explanation: {
          en: 'A signature has no effect on whether the data can be reached. Availability is addressed by redundancy and capacity, not by cryptography.',
          fr: 'Une signature n’a aucun effet sur la possibilité d’atteindre la donnée. La disponibilité relève de la redondance et de la capacité, pas de la cryptographie.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Authentication and availability',
          fr: 'L’authentification et la disponibilité',
        },
        correct: false,
        explanation: {
          en: 'The first half is defensible — a signature does authenticate the origin — but availability is unrelated, so the pair is wrong.',
          fr: 'La première moitié se défend — une signature authentifie bien l’origine — mais la disponibilité n’a rien à voir, donc le couple est faux.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-012',
    objective: '1.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An employee holds the door open for somebody carrying boxes, who turns out to have no badge. Which control was designed to prevent exactly this?',
      fr: 'Un employé tient la porte à une personne chargée de cartons, qui s’avère ne pas avoir de badge. Quel contrôle est conçu pour empêcher précisément cela ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'An access control vestibule',
          fr: 'Un sas d’accès (access control vestibule)',
        },
        correct: true,
        explanation: {
          en: 'A vestibule admits one person at a time between two interlocking doors, so a second person physically cannot follow through on one badge.',
          fr: 'Un sas admet une personne à la fois entre deux portes verrouillées alternativement : une seconde personne ne peut physiquement pas suivre avec un seul badge.',
        },
      },
      {
        id: 'b',
        text: { en: 'A badge reader', fr: 'Un lecteur de badge (badge reader)' },
        correct: false,
        explanation: {
          en: 'The reader worked perfectly — a valid badge opened the door. It cannot know how many people walked through afterwards, which is the whole gap.',
          fr: 'Le lecteur a parfaitement fonctionné : un badge valide a ouvert la porte. Il ne peut pas savoir combien de personnes sont passées ensuite, et c’est tout le problème.',
        },
      },
      {
        id: 'c',
        text: { en: 'Video surveillance', fr: 'La vidéosurveillance (video surveillance)' },
        correct: false,
        explanation: {
          en: 'Cameras would record the entry, which helps afterwards. The question asks what prevents it, and a recording prevents nothing at the door.',
          fr: 'Les caméras enregistreraient l’entrée, ce qui aide après coup. La question porte sur la prévention, et un enregistrement n’empêche rien à la porte.',
        },
      },
      {
        id: 'd',
        text: { en: 'Fencing', fr: 'Une clôture (fencing)' },
        correct: false,
        explanation: {
          en: 'Fencing controls the perimeter of a site. This incident happens at an interior door, well inside any fence.',
          fr: 'Une clôture contrôle le périmètre d’un site. Cet incident se produit à une porte intérieure, bien à l’intérieur de toute clôture.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-013',
    objective: '1.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'What distinguishes a honeypot from a honeynet?',
      fr: 'Qu’est-ce qui distingue un pot de miel d’un réseau de miel ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A honeypot is a single decoy system; a honeynet is a network of them',
          fr: 'Le pot de miel est un système leurre unique ; le réseau de miel en est un réseau entier',
        },
        correct: true,
        explanation: {
          en: 'Scale is the distinction. A honeynet lets an intruder move laterally between decoys, which reveals far more about their technique than one machine can.',
          fr: 'La distinction est l’échelle. Un réseau de miel laisse un intrus se déplacer latéralement entre les leurres, ce qui révèle bien plus sur sa technique qu’une seule machine.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A honeypot is a file; a honeynet is a system',
          fr: 'Le pot de miel est un fichier ; le réseau de miel est un système',
        },
        correct: false,
        explanation: {
          en: 'The file-level decoy is a honeyfile. A honeypot is already a system, so both halves of this statement are wrong.',
          fr: 'Le leurre au niveau fichier est le fichier piège (honeyfile). Un pot de miel est déjà un système : les deux moitiés de l’énoncé sont fausses.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A honeypot detects; a honeynet prevents',
          fr: 'Le pot de miel détecte ; le réseau de miel prévient',
        },
        correct: false,
        explanation: {
          en: 'Neither prevents anything. Deception technology exists to reveal an intrusion and consume the attacker’s time, not to block them.',
          fr: 'Aucun des deux ne prévient quoi que ce soit. Les technologies de leurre servent à révéler une intrusion et consommer le temps de l’attaquant, pas à le bloquer.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A honeypot holds real data; a honeynet holds fake data',
          fr: 'Le pot de miel contient de vraies données ; le réseau de miel des données factices',
        },
        correct: false,
        explanation: {
          en: 'Both are entirely fake. Putting real data in a decoy would turn a detection tool into a breach waiting to happen.',
          fr: 'Les deux sont entièrement factices. Mettre de vraies données dans un leurre transformerait un outil de détection en compromission programmée.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-014',
    objective: '1.2',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A user signs in successfully with MFA but receives "access denied" when opening a finance report. Which statement describes the situation?',
      fr: 'Un utilisateur se connecte avec succès en MFA mais reçoit « accès refusé » en ouvrant un rapport financier. Quel énoncé décrit la situation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Authentication succeeded, authorization failed',
          fr: 'L’authentification a réussi, l’autorisation a échoué',
        },
        correct: true,
        explanation: {
          en: 'Identity was established at the door; the separate decision about what this identity may reach came back negative. The two are independent steps.',
          fr: 'L’identité a été établie à la porte ; la décision distincte sur ce que cette identité peut atteindre est revenue négative. Ce sont deux étapes indépendantes.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Authentication failed',
          fr: 'L’authentification a échoué',
        },
        correct: false,
        explanation: {
          en: 'The sign-in succeeded, MFA included. A failed authentication would have stopped the user before any report could be requested.',
          fr: 'La connexion a réussi, MFA comprise. Une authentification échouée aurait arrêté l’utilisateur avant même de pouvoir demander un rapport.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Accounting failed',
          fr: 'La traçabilité a échoué',
        },
        correct: false,
        explanation: {
          en: 'Accounting records what happened; it does not grant or refuse anything. A logging failure would be invisible to the user.',
          fr: 'La traçabilité enregistre ce qui s’est passé ; elle n’accorde ni ne refuse rien. Une panne de journalisation serait invisible pour l’utilisateur.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Non-repudiation was violated',
          fr: 'La non-répudiation a été violée',
        },
        correct: false,
        explanation: {
          en: 'Non-repudiation concerns whether an action can later be denied by its author. Nothing here is being disputed.',
          fr: 'La non-répudiation concerne la possibilité pour un auteur de nier son action. Rien ici n’est contesté.',
        },
      },
    ],
  },

  {
    id: 'q-1-2-015',
    objective: '1.2',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A hospital discovers that patient records were both copied by an attacker and left unusable by the same attack. Which properties were affected?',
      fr: 'Un hôpital découvre que des dossiers patients ont été à la fois copiés par un attaquant et rendus inutilisables par la même attaque. Quelles propriétés ont été touchées ?',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: { en: 'Confidentiality', fr: 'La confidentialité' },
        correct: true,
        explanation: {
          en: 'The records were copied by somebody unauthorised, which is the definition of a confidentiality breach regardless of what happened next.',
          fr: 'Les dossiers ont été copiés par un non-autorisé, ce qui est la définition d’une atteinte à la confidentialité, indépendamment de la suite.',
        },
      },
      {
        id: 'b',
        text: { en: 'Availability', fr: 'La disponibilité' },
        correct: true,
        explanation: {
          en: 'The hospital can no longer use the records. Loss of legitimate access is an availability failure, and in a hospital it is the one with immediate consequences.',
          fr: 'L’hôpital ne peut plus utiliser les dossiers. La perte d’accès légitime est une atteinte à la disponibilité, et dans un hôpital c’est celle aux conséquences immédiates.',
        },
      },
      {
        id: 'c',
        text: { en: 'Non-repudiation', fr: 'La non-répudiation' },
        correct: false,
        explanation: {
          en: 'Non-repudiation is not part of the triad and concerns proving authorship of an action. No disputed signature appears in this scenario.',
          fr: 'La non-répudiation ne fait pas partie de la triade et concerne la preuve d’auteur d’une action. Aucune signature contestée n’apparaît dans ce scénario.',
        },
      },
      {
        id: 'd',
        text: { en: 'Gap analysis', fr: 'L’analyse d’écart' },
        correct: false,
        explanation: {
          en: 'A gap analysis is an activity, not a security property. It might well follow this incident, but it cannot be "affected" by it.',
          fr: 'Une analyse d’écart est une activité, pas une propriété de sécurité. Elle pourrait suivre cet incident, mais elle ne peut pas être « touchée » par lui.',
        },
      },
    ],
  },
];
