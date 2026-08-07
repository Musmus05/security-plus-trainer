import type { Question } from '@/content/schemas';

/**
 * Objective 3.3 — Compare and contrast concepts and strategies to protect data.
 *
 * Every question is **original**, written from the published objective. None reproduces,
 * paraphrases, or reconstructs any real exam item — see NOTICE.md.
 *
 * The bank follows the decision sequence in the lesson: identify what the data represents, apply
 * the handling classification, locate its state and jurisdiction, then select the method whose
 * defining property matches the requirement. Distractors solve adjacent data-protection problems.
 */
export const QUESTIONS_3_3: Question[] = [
  {
    id: 'q-3-3-001',
    objective: '3.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which property most specifically makes information a trade secret?',
      fr: 'Quelle propriété caractérise le plus précisément une information comme secret commercial ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Its business advantage depends on it remaining secret',
          fr: 'Son avantage commercial dépend du maintien de son secret',
        },
        correct: true,
        explanation: {
          en: 'A trade secret has commercial value because competitors do not know it. Losing secrecy can therefore destroy the advantage that defines this data type.',
          fr: 'Un secret commercial possède une valeur parce que les concurrents ne le connaissent pas. Sa divulgation peut donc supprimer précisément cet avantage.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A regulation specifies how organisations must handle it',
          fr: 'Une réglementation précise comment les organisations doivent la traiter',
        },
        correct: false,
        explanation: {
          en: 'An external handling obligation identifies regulated data. A trade secret may also be regulated, but regulation is not what makes the information a trade secret.',
          fr: 'Une obligation extérieure de traitement caractérise une donnée réglementée. Un secret commercial peut aussi être réglementé, mais ce critère ne le définit pas.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It is a creation owned by a person or organisation',
          fr: 'Il s’agit d’une création appartenant à une personne ou une organisation',
        },
        correct: false,
        explanation: {
          en: 'Ownership of a creation points to intellectual property, which remains intellectual property even after publication. A trade secret specifically relies on secrecy.',
          fr: 'La propriété d’une création correspond à la propriété intellectuelle, qui subsiste même après publication. Le secret commercial dépend précisément de la confidentialité.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The organisation cannot operate for long without it',
          fr: 'L’organisation ne peut pas fonctionner longtemps sans elle',
        },
        correct: false,
        explanation: {
          en: 'Operational dependence makes data critical under a classification scheme. Criticality concerns business impact and does not establish that the content is a trade secret.',
          fr: 'La dépendance opérationnelle rend une donnée critique dans une classification. La criticité mesure l’impact métier et ne prouve pas un secret commercial.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-002',
    objective: '3.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A clinic labels appointment records confidential, while national law also imposes retention and disclosure rules on them. Which description identifies the data type rather than the internal classification?',
      fr: 'Une clinique classe les dossiers de rendez-vous comme confidentiels, tandis que la loi nationale leur impose aussi des règles de conservation et de divulgation. Quelle description désigne le type de données plutôt que la classification interne ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Regulated', fr: 'Réglementées (regulated)' },
        correct: true,
        explanation: {
          en: 'The legal requirements are external rules governing handling, which makes the records regulated data. Confidential is the clinic’s separate internal handling label.',
          fr: 'Les exigences légales sont des règles extérieures de traitement, ce qui rend les dossiers réglementés. « Confidentiel » reste leur étiquette interne distincte.',
        },
      },
      {
        id: 'b',
        text: { en: 'Confidential', fr: 'Confidentielles (confidential)' },
        correct: false,
        explanation: {
          en: 'Confidential states how the clinic intends to limit access. The question asks for the type created by the law, not the organisation’s classification label.',
          fr: '« Confidentiel » indique comment la clinique veut limiter les accès. La question demande le type créé par la loi, pas l’étiquette de classification interne.',
        },
      },
      {
        id: 'c',
        text: { en: 'Critical', fr: 'Critiques (critical)' },
        correct: false,
        explanation: {
          en: 'Critical describes strong operational dependence on data availability or accuracy. The stem gives legal handling duties, not evidence that operations stop without the records.',
          fr: '« Critique » décrit une forte dépendance à la disponibilité ou à l’exactitude. L’énoncé donne des obligations légales, pas un arrêt des opérations.',
        },
      },
      {
        id: 'd',
        text: { en: 'Private', fr: 'Privées (private)' },
        correct: false,
        explanation: {
          en: 'Private can be an appropriate classification for personal information, but it does not capture the explicit external legal obligations highlighted in this scenario.',
          fr: '« Privé » peut convenir à une information personnelle, mais ne traduit pas les obligations légales extérieures explicitement mises en avant dans ce scénario.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-003',
    objective: '3.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A sensor file can be interpreted only by the vendor application, but its format and contents are publicly documented. Which statement is best?',
      fr: 'Un fichier de capteur ne peut être interprété que par l’application du fournisseur, mais son format et son contenu sont documentés publiquement. Quelle affirmation convient le mieux ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It is non-human-readable but can still be public',
          fr: 'Il est non lisible directement par l’humain, tout en pouvant être public',
        },
        correct: true,
        explanation: {
          en: 'Readability describes who or what can interpret the representation. It does not set confidentiality, so software-dependent data may still be approved for public release.',
          fr: 'La lisibilité décrit qui ou quoi peut interpréter la représentation. Elle ne fixe pas la confidentialité : une donnée lue par logiciel peut rester publique.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It is encrypted because a person cannot read it directly',
          fr: 'Il est chiffré puisqu’une personne ne peut pas le lire directement',
        },
        correct: false,
        explanation: {
          en: 'A specialised encoding or binary structure is not necessarily encryption. Encryption requires a cryptographic transformation and key, neither of which appears in the stem.',
          fr: 'Un encodage spécialisé ou une structure binaire ne constitue pas forcément un chiffrement. Celui-ci exige une transformation cryptographique et une clé, absentes ici.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It is confidential because only one application understands it',
          fr: 'Il est confidentiel puisqu’une seule application le comprend',
        },
        correct: false,
        explanation: {
          en: 'Difficulty of interpretation is not an access decision. The public documentation explicitly contradicts the claim that the representation alone makes the data confidential.',
          fr: 'La difficulté d’interprétation ne constitue pas une décision d’accès. La documentation publique contredit explicitement une classification confidentielle fondée sur le format.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It is critical because software is required to interpret it',
          fr: 'Il est critique puisqu’un logiciel est nécessaire pour l’interpréter',
        },
        correct: false,
        explanation: {
          en: 'Criticality comes from operational impact if data is unavailable or wrong. Requiring an application to parse a file says nothing about that business dependence.',
          fr: 'La criticité vient de l’impact opérationnel si la donnée manque ou devient fausse. Le besoin d’un logiciel de lecture ne démontre aucune dépendance métier.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-004',
    objective: '3.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the primary purpose of a data classification label?',
      fr: 'Quelle est la finalité principale d’une étiquette de classification des données ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'To communicate the handling requirements assigned by policy',
          fr: 'Communiquer les règles de traitement attribuées par la politique',
        },
        correct: true,
        explanation: {
          en: 'Classification translates business and security decisions into handling expectations such as access, sharing, storage, retention, and disposal requirements.',
          fr: 'La classification traduit les décisions métier et de sécurité en règles d’accès, de partage, de stockage, de conservation et de destruction.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'To identify the file format used to encode the data',
          fr: 'Identifier le format de fichier utilisé pour encoder les données',
        },
        correct: false,
        explanation: {
          en: 'File format helps software interpret a representation, but it does not state the organisation’s handling decision. Classification is policy metadata, not encoding metadata.',
          fr: 'Le format aide un logiciel à interpréter une représentation, mais ne donne pas la décision de traitement. La classification relève de la politique, pas de l’encodage.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'To prove which legal jurisdiction owns the data',
          fr: 'Prouver quelle juridiction juridique possède les données',
        },
        correct: false,
        explanation: {
          en: 'Jurisdiction is addressed by data sovereignty and location. A classification may reflect legal duties, but the label itself does not prove legal ownership or authority.',
          fr: 'La juridiction relève de la souveraineté et du lieu. Une classification peut refléter la loi, mais son étiquette ne prouve ni propriété ni autorité juridique.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'To determine whether the data is currently moving on a network',
          fr: 'Déterminer si les données circulent actuellement sur un réseau',
        },
        correct: false,
        explanation: {
          en: 'Movement identifies data in transit, one of the data states. Classification remains attached to the information as it moves between rest, transit, and use.',
          fr: 'Le déplacement caractérise les données en transit, qui est un état. La classification reste attachée à l’information lorsqu’elle change d’état.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-005',
    objective: '3.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'An organisation publishes its DNS zone information, but an error in it would make every public service unreachable. Which classification best captures the operational concern?',
      fr: 'Une organisation publie les informations de sa zone DNS, mais une erreur les concernant rendrait tous les services publics inaccessibles. Quelle classification traduit le mieux le risque opérationnel ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Critical', fr: 'Critique (critical)' },
        correct: true,
        explanation: {
          en: 'The organisation strongly depends on the accuracy and availability of the records. Data can be public for confidentiality purposes and still be critical to operations.',
          fr: 'L’organisation dépend fortement de l’exactitude et de la disponibilité de ces enregistrements. Une donnée publique peut néanmoins rester critique pour les opérations.',
        },
      },
      {
        id: 'b',
        text: { en: 'Confidential', fr: 'Confidentielle (confidential)' },
        correct: false,
        explanation: {
          en: 'The information is intentionally published, so limiting readership is not the central issue. Confidentiality does not express the severe availability and integrity impact.',
          fr: 'L’information est publiée volontairement, donc limiter sa lecture ne constitue pas le problème central. « Confidentiel » ne traduit pas l’impact sur disponibilité et intégrité.',
        },
      },
      {
        id: 'c',
        text: { en: 'Private', fr: 'Privée (private)' },
        correct: false,
        explanation: {
          en: 'Private usually indicates personal or otherwise non-public information. The DNS records are public, and the scenario emphasises operational dependence instead.',
          fr: '« Privé » désigne généralement une information personnelle ou non publique. Les enregistrements DNS sont publics et le scénario insiste sur la dépendance opérationnelle.',
        },
      },
      {
        id: 'd',
        text: { en: 'Restricted', fr: 'Restreinte (restricted)' },
        correct: false,
        explanation: {
          en: 'Restricted implies narrowly limited handling or access, which conflicts with deliberate publication. Tight confidentiality would not address the stated risk of incorrect records.',
          fr: '« Restreint » implique un traitement ou accès très limité, contraire à une publication volontaire. Une forte confidentialité ne corrigerait pas le risque d’erreur indiqué.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-006',
    objective: '3.3',
    kind: 'scenario',
    difficulty: 'easy',
    prompt: {
      en: 'A powered-off laptop is stolen from a locked cabinet. Which data state and protection method most directly address disclosure from its internal drive?',
      fr: 'Un ordinateur portable éteint est volé dans une armoire verrouillée. Quel état des données et quelle méthode de protection répondent le plus directement au risque de divulgation depuis son disque interne ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Data at rest protected by encryption',
          fr: 'Données au repos protégées par chiffrement',
        },
        correct: true,
        explanation: {
          en: 'The files are stored on persistent media and are not being processed, so they are at rest. Storage encryption makes the stolen drive unreadable without the key.',
          fr: 'Les fichiers sont stockés sur un support persistant sans être traités : ils sont au repos. Le chiffrement rend le disque volé illisible sans la clé.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Data in transit protected by hashing',
          fr: 'Données en transit protégées par hachage',
        },
        correct: false,
        explanation: {
          en: 'Nothing is moving between systems, so the data is not in transit. Hashing can help detect change but does not provide confidentiality for the stored files.',
          fr: 'Aucune donnée ne circule entre systèmes, donc elle n’est pas en transit. Le hachage détecte une modification, mais ne rend pas les fichiers stockés confidentiels.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Data in use protected by masking',
          fr: 'Données en cours d’utilisation protégées par masquage',
        },
        correct: false,
        explanation: {
          en: 'A powered-off device is not actively processing or displaying the files. Masking selected fields also would not protect every byte copied from the stolen drive.',
          fr: 'Un appareil éteint ne traite ni affiche activement les fichiers. Le masquage de certains champs ne protégerait pas tous les octets copiés depuis le disque volé.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Data at rest protected by network segmentation',
          fr: 'Données au repos protégées par segmentation réseau',
        },
        correct: false,
        explanation: {
          en: 'The state is correct, but segmentation limits network reachability. It cannot make a drive unreadable after an attacker has physically removed it from the network.',
          fr: 'L’état est correct, mais la segmentation limite les chemins réseau. Elle ne rend pas illisible un disque que le voleur a physiquement retiré du réseau.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-007',
    objective: '3.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An analyst opens an encrypted report and reads a decrypted page in the application. What state is the page content in at that moment?',
      fr: 'Une analyste ouvre un rapport chiffré et lit une page déchiffrée dans l’application. Dans quel état se trouve le contenu de la page à cet instant ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Data in use', fr: 'Données en cours d’utilisation (data in use)' },
        correct: true,
        explanation: {
          en: 'The application is actively processing and displaying the readable content, which is data in use. Storage encryption no longer hides that page from the active session.',
          fr: 'L’application traite et affiche activement le contenu lisible : les données sont en cours d’utilisation. Le chiffrement du stockage ne les cache plus à la session.',
        },
      },
      {
        id: 'b',
        text: { en: 'Data at rest', fr: 'Données au repos (data at rest)' },
        correct: false,
        explanation: {
          en: 'The encrypted file on disk is at rest, but the question asks about the decrypted page being displayed. That active representation has moved into use.',
          fr: 'Le fichier chiffré sur disque est au repos, mais la question porte sur la page déchiffrée et affichée. Cette représentation est maintenant utilisée.',
        },
      },
      {
        id: 'c',
        text: { en: 'Data in transit', fr: 'Données en transit (data in transit)' },
        correct: false,
        explanation: {
          en: 'Transit concerns movement between systems or services. Display inside the active application is processing and use, even if a network transfer occurred earlier.',
          fr: 'Le transit concerne le déplacement entre systèmes ou services. L’affichage dans l’application active relève du traitement, même si un transfert a précédé.',
        },
      },
      {
        id: 'd',
        text: { en: 'Data sovereignty', fr: 'Souveraineté des données (data sovereignty)' },
        correct: false,
        explanation: {
          en: 'Data sovereignty is a jurisdictional consideration, not a lifecycle state. It may matter where the application runs, but it does not describe active processing.',
          fr: 'La souveraineté est une considération juridique, pas un état du cycle de vie. Elle peut dépendre du lieu, mais ne décrit pas le traitement actif.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-008',
    objective: '3.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which statement correctly distinguishes geolocation from a geographic restriction?',
      fr: 'Quelle affirmation distingue correctement la géolocalisation d’une restriction géographique ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Geolocation identifies position; a geographic restriction enforces a rule based on position',
          fr: 'La géolocalisation identifie une position ; la restriction applique une règle fondée sur cette position',
        },
        correct: true,
        explanation: {
          en: 'Location evidence and policy enforcement are separate functions. A service can know where a request originates without blocking or permitting anything because of that fact.',
          fr: 'La preuve de position et l’application d’une politique sont deux fonctions distinctes. Un service peut connaître un lieu sans rien autoriser ni bloquer pour ce motif.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Geolocation applies law; a geographic restriction measures distance',
          fr: 'La géolocalisation applique la loi ; la restriction géographique mesure une distance',
        },
        correct: false,
        explanation: {
          en: 'Legal authority is the concern of data sovereignty. Geolocation provides position information, while the restriction makes an allow or deny decision from that information.',
          fr: 'L’autorité juridique relève de la souveraineté des données. La géolocalisation fournit la position, puis la restriction en tire une décision d’autorisation ou de refus.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Geolocation protects stored data; a geographic restriction protects data in transit',
          fr: 'La géolocalisation protège les données au repos ; la restriction protège les données en transit',
        },
        correct: false,
        explanation: {
          en: 'Neither concept maps to only one data state. Location can be observed and restricted for storage, processing, or access regardless of the current lifecycle state.',
          fr: 'Aucun concept ne correspond à un seul état. Le lieu peut être observé et restreint pour stockage, traitement ou accès, quel que soit le cycle de vie.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Geolocation classifies data; a geographic restriction changes its type',
          fr: 'La géolocalisation classe les données ; la restriction géographique change leur type',
        },
        correct: false,
        explanation: {
          en: 'Position does not determine whether data is confidential, regulated, or financial. Types and classifications remain conceptually separate from location enforcement.',
          fr: 'La position ne détermine pas si une donnée est confidentielle, réglementée ou financière. Types et classifications restent distincts des règles géographiques.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-009',
    objective: '3.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What does data sovereignty primarily describe?',
      fr: 'Que décrit principalement la souveraineté des données ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The legal authority of the jurisdiction where data is stored or processed',
          fr: 'L’autorité juridique du territoire où les données sont stockées ou traitées',
        },
        correct: true,
        explanation: {
          en: 'Data sovereignty connects storage or processing location to the laws and legal authority of that jurisdiction, which can constrain architecture and provider choices.',
          fr: 'La souveraineté relie le lieu de stockage ou traitement aux lois et à l’autorité de ce territoire, ce qui peut contraindre architecture et fournisseur.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The accuracy with which a device can report its coordinates',
          fr: 'La précision avec laquelle un appareil peut indiquer ses coordonnées',
        },
        correct: false,
        explanation: {
          en: 'Coordinate accuracy is a geolocation concern. It may support a sovereignty decision, but it does not define the legal authority that applies to the data.',
          fr: 'La précision des coordonnées relève de la géolocalisation. Elle peut appuyer une décision de souveraineté, mais ne définit pas l’autorité juridique applicable.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The employee who is accountable for approving access',
          fr: 'La personne responsable de l’approbation des accès',
        },
        correct: false,
        explanation: {
          en: 'Accountability for access is an ownership and governance concern. Data sovereignty is about jurisdiction, regardless of which employee administers permissions.',
          fr: 'La responsabilité des accès relève de la propriété et de la gouvernance. La souveraineté concerne la juridiction, quelle que soit la personne qui administre les droits.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The redundancy needed to keep a dataset available',
          fr: 'La redondance nécessaire pour maintenir un jeu de données disponible',
        },
        correct: false,
        explanation: {
          en: 'Redundancy addresses availability and resilience. Replicas can actually complicate sovereignty by placing extra copies under additional jurisdictions rather than resolving it.',
          fr: 'La redondance traite disponibilité et résilience. Les répliques peuvent même compliquer la souveraineté en plaçant des copies dans plusieurs juridictions.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-010',
    objective: '3.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which method is designed to detect whether data has changed without preserving a recoverable original?',
      fr: 'Quelle méthode est conçue pour détecter une modification des données sans conserver un original récupérable ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Hashing', fr: 'Le hachage (hashing)' },
        correct: true,
        explanation: {
          en: 'Hashing produces a one-way representation that can be recomputed and compared. A mismatch shows that the input changed without requiring recovery of the input.',
          fr: 'Le hachage produit une empreinte à sens unique que l’on peut recalculer et comparer. Une différence révèle un changement sans récupérer le contenu initial.',
        },
      },
      {
        id: 'b',
        text: { en: 'Encryption', fr: 'Le chiffrement (encryption)' },
        correct: false,
        explanation: {
          en: 'Encryption is intentionally reversible with the proper key and primarily provides confidentiality. That recoverability conflicts with the defining requirement in the question.',
          fr: 'Le chiffrement est volontairement réversible avec la bonne clé et vise surtout la confidentialité. Cette récupération contredit le besoin distinctif de la question.',
        },
      },
      {
        id: 'c',
        text: { en: 'Tokenization', fr: 'La tokenisation (tokenization)' },
        correct: false,
        explanation: {
          en: 'Tokenization replaces a value and keeps an authorised mapping in a vault. Its purpose is reducing exposure, not demonstrating that arbitrary content remained unchanged.',
          fr: 'La tokenisation substitue une valeur et garde une correspondance autorisée dans un coffre. Elle réduit l’exposition, mais ne démontre pas l’intégrité générale du contenu.',
        },
      },
      {
        id: 'd',
        text: { en: 'Masking', fr: 'Le masquage (masking)' },
        correct: false,
        explanation: {
          en: 'Masking hides selected parts of a value for display or use. It does not create a stable comparison value that proves whether the underlying data changed.',
          fr: 'Le masquage cache certaines parties pour affichage ou usage. Il ne produit pas une valeur de comparaison stable prouvant une modification des données sous-jacentes.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-011',
    objective: '3.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A development database needs realistic customer identifiers that have no useful mathematical relationship to the originals. A separate authorised service must be able to map them back. Which method fits?',
      fr: 'Une base de développement a besoin d’identifiants clients réalistes sans relation mathématique exploitable avec les originaux. Un service autorisé séparé doit pouvoir retrouver la correspondance. Quelle méthode convient ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Tokenization', fr: 'La tokenisation (tokenization)' },
        correct: true,
        explanation: {
          en: 'Tokenization replaces sensitive values with unrelated substitutes and stores the mapping in a controlled vault. The development database never needs the originals.',
          fr: 'La tokenisation remplace les valeurs sensibles par des substituts sans relation et conserve la correspondance dans un coffre contrôlé. Le développement ignore les originaux.',
        },
      },
      {
        id: 'b',
        text: { en: 'Encryption', fr: 'Le chiffrement (encryption)' },
        correct: false,
        explanation: {
          en: 'Ciphertext has a cryptographic relationship to plaintext and becomes the original with the key. The scenario specifically asks for unrelated substitutes mapped separately.',
          fr: 'Le texte chiffré conserve une relation cryptographique avec le clair et redevient l’original avec la clé. Le scénario exige des substituts reliés séparément.',
        },
      },
      {
        id: 'c',
        text: { en: 'Masking', fr: 'Le masquage (masking)' },
        correct: false,
        explanation: {
          en: 'Masking is useful when characters or fields should be hidden or substituted, but the stated controlled reverse mapping through a separate service is the tokenization pattern.',
          fr: 'Le masquage convient pour cacher ou substituer des caractères, mais la correspondance inverse via un service séparé constitue précisément le modèle de tokenisation.',
        },
      },
      {
        id: 'd',
        text: { en: 'Obfuscation', fr: 'L’obscurcissement (obfuscation)' },
        correct: false,
        explanation: {
          en: 'Obfuscation makes meaning harder to understand but keeps it derivable with enough analysis. It does not create controlled, unrelated identifiers backed by a mapping vault.',
          fr: 'L’obscurcissement rend le sens plus difficile à comprendre, mais encore dérivable par analyse. Il ne crée pas de substituts sans relation gérés par un coffre.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-012',
    objective: '3.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A support interface displays a payment number as `**** **** **** 3817`; the hidden digits are simply unavailable to that interface. Which method is being applied at the display layer?',
      fr: 'Une interface de support affiche un numéro de paiement sous la forme `**** **** **** 3817` ; les chiffres cachés sont simplement indisponibles à ce niveau. Quelle méthode est appliquée à l’affichage ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Masking', fr: 'Le masquage (masking)' },
        correct: true,
        explanation: {
          en: 'Masking replaces selected characters with placeholders while preserving only the portion needed for the task. The visible last digits are the characteristic clue.',
          fr: 'Le masquage remplace certains caractères par des symboles tout en gardant la portion nécessaire. Les derniers chiffres visibles constituent l’indice caractéristique.',
        },
      },
      {
        id: 'b',
        text: { en: 'Tokenization', fr: 'La tokenisation (tokenization)' },
        correct: false,
        explanation: {
          en: 'Tokenization would replace the sensitive value with a separate token and retain a controlled mapping. A partially hidden display of the same value instead indicates masking.',
          fr: 'La tokenisation remplacerait la valeur par un jeton distinct avec correspondance contrôlée. Un affichage partiellement caché de la même valeur indique plutôt un masquage.',
        },
      },
      {
        id: 'c',
        text: { en: 'Hashing', fr: 'Le hachage (hashing)' },
        correct: false,
        explanation: {
          en: 'A hash is a one-way representation intended for comparison, not a selectively revealed version of the original. It would not normally preserve chosen trailing digits.',
          fr: 'Une empreinte est une représentation à sens unique destinée à la comparaison, pas une version partiellement révélée. Elle ne conserve normalement pas des chiffres choisis.',
        },
      },
      {
        id: 'd',
        text: { en: 'Segmentation', fr: 'La segmentation (segmentation)' },
        correct: false,
        explanation: {
          en: 'Segmentation separates networks, systems, or datasets to reduce reachability. It does not replace individual characters in a value presented by an application.',
          fr: 'La segmentation sépare réseaux, systèmes ou jeux de données pour limiter les chemins. Elle ne remplace pas les caractères d’une valeur affichée par une application.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-013',
    objective: '3.3',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'A vendor transforms client-side code so names and control flow are difficult to follow, while accepting that a determined analyst can eventually understand it. Which method matches that limited promise?',
      fr: 'Un fournisseur transforme le code côté client afin de rendre les noms et le flux de contrôle difficiles à suivre, tout en admettant qu’une analyste déterminée pourra finir par le comprendre. Quelle méthode correspond à cette promesse limitée ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Obfuscation', fr: 'L’obscurcissement (obfuscation)' },
        correct: true,
        explanation: {
          en: 'Obfuscation increases the effort needed to understand code or data without claiming cryptographic secrecy. Eventual recovery by analysis fits its limitation exactly.',
          fr: 'L’obscurcissement augmente l’effort nécessaire pour comprendre le code sans promettre de secret cryptographique. Une analyse finalement réussie correspond à sa limite.',
        },
      },
      {
        id: 'b',
        text: { en: 'Encryption', fr: 'Le chiffrement (encryption)' },
        correct: false,
        explanation: {
          en: 'Sound encryption is meant to make content unreadable without the key, not merely inconvenient to analyse. Executable client code also must remain usable by the client.',
          fr: 'Un chiffrement robuste vise à rendre le contenu illisible sans clé, pas seulement pénible à analyser. Le code client doit en outre rester exécutable par le terminal.',
        },
      },
      {
        id: 'c',
        text: { en: 'Hashing', fr: 'Le hachage (hashing)' },
        correct: false,
        explanation: {
          en: 'Hashing would replace the code with a one-way representation that cannot execute as the original program. It supports comparison, not difficult-but-functional code.',
          fr: 'Le hachage remplacerait le code par une empreinte incapable de s’exécuter comme le programme initial. Il sert à comparer, pas à produire un code fonctionnel mais difficile.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Permission restrictions',
          fr: 'Les restrictions d’autorisation (permission restrictions)',
        },
        correct: false,
        explanation: {
          en: 'Permissions limit which identities may obtain or change an object. Once client code is delivered to an authorised device, permissions do not make its logic harder to inspect.',
          fr: 'Les autorisations limitent les identités pouvant obtenir ou modifier un objet. Une fois le code livré au terminal autorisé, elles ne compliquent pas l’analyse de sa logique.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-014',
    objective: '3.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'An archive file must remain confidential while stored, must be recoverable later, and must provide evidence if its contents change. Which two methods directly satisfy these requirements? (Select all that apply.)',
      fr: 'Un fichier d’archive doit rester confidentiel pendant son stockage, être récupérable plus tard et fournir une preuve si son contenu change. Quelles sont les deux méthodes qui répondent directement à ces exigences ? (Sélectionne toutes les réponses correctes.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: { en: 'Encrypt the file', fr: 'Chiffrer le fichier' },
        correct: true,
        explanation: {
          en: 'Encryption provides confidentiality at rest while preserving authorised recovery with the key. That directly meets the secrecy and later-recovery requirements.',
          fr: 'Le chiffrement protège la confidentialité au repos tout en permettant une récupération autorisée avec la clé. Il satisfait les exigences de secret et de restitution.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Record and later compare its hash',
          fr: 'Enregistrer puis comparer son empreinte',
        },
        correct: true,
        explanation: {
          en: 'A stored reference hash can be compared with a newly computed hash. A mismatch provides evidence that the archive content changed after the reference was created.',
          fr: 'Une empreinte de référence peut être comparée à une empreinte recalculée. Une différence prouve que le contenu a changé depuis la création de la référence.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Mask selected characters in the file',
          fr: 'Masquer certains caractères du fichier',
        },
        correct: false,
        explanation: {
          en: 'Masking selected fields does not protect the complete archive and may remove information needed for recovery. It also does not provide evidence of later modification.',
          fr: 'Le masquage de certains champs ne protège pas toute l’archive et peut retirer des informations à récupérer. Il ne prouve pas non plus une modification ultérieure.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Tokenize the identifiers inside the archive',
          fr: 'Tokeniser les identifiants contenus dans l’archive',
        },
        correct: false,
        explanation: {
          en: 'Tokenization can reduce exposure of selected structured values through a vault. It neither protects the complete file nor supplies the requested integrity evidence.',
          fr: 'La tokenisation peut réduire l’exposition de valeurs structurées via un coffre. Elle ne protège ni tout le fichier ni la preuve d’intégrité demandée.',
        },
      },
    ],
  },

  {
    id: 'q-3-3-015',
    objective: '3.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A payroll service has two explicit requirements: its database may be stored only in France, and only members of the payroll role may read salary records. Which two methods directly enforce those requirements? (Select all that apply.)',
      fr: 'Un service de paie a deux exigences explicites : sa base ne peut être stockée qu’en France, et seuls les membres du rôle paie peuvent lire les salaires. Quelles sont les deux méthodes qui appliquent directement ces exigences ? (Sélectionne toutes les réponses correctes.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: { en: 'Geographic restrictions', fr: 'Les restrictions géographiques' },
        correct: true,
        explanation: {
          en: 'A geographic restriction can prevent deployment or storage outside approved locations. It directly enforces the stated France-only placement requirement.',
          fr: 'Une restriction géographique peut empêcher tout déploiement ou stockage hors des lieux approuvés. Elle applique directement l’exigence de stockage en France.',
        },
      },
      {
        id: 'b',
        text: { en: 'Permission restrictions', fr: 'Les restrictions d’autorisation' },
        correct: true,
        explanation: {
          en: 'Role-based permission restrictions can allow salary reads only to identities assigned to payroll. This directly expresses who may perform the requested action.',
          fr: 'Des autorisations fondées sur les rôles peuvent réserver la lecture aux identités affectées à la paie. Elles expriment directement qui peut effectuer l’action.',
        },
      },
      {
        id: 'c',
        text: { en: 'Segmentation', fr: 'La segmentation' },
        correct: false,
        explanation: {
          en: 'Segmentation can reduce network paths to the service, but it neither proves storage remains in France nor identifies which reached users belong to the payroll role.',
          fr: 'La segmentation réduit les chemins réseau, mais ne prouve ni que le stockage reste en France ni que les usagers arrivés au service appartiennent au rôle paie.',
        },
      },
      {
        id: 'd',
        text: { en: 'Hashing', fr: 'Le hachage' },
        correct: false,
        explanation: {
          en: 'Hashing can help detect record changes, an adjacent integrity concern. It does not enforce a storage country or grant read access according to role membership.',
          fr: 'Le hachage peut détecter des modifications, ce qui traite un risque d’intégrité voisin. Il n’impose ni pays de stockage ni lecture selon le rôle.',
        },
      },
    ],
  },
];
