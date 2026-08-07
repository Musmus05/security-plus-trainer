import type { Question } from '@/content/schemas';

/**
 * Objective 4.9 — Given a scenario, use data sources to support an investigation.
 * All questions are original work based on the published objective; none reconstructs an exam item.
 */
export const QUESTIONS_4_9: Question[] = [
  {
    id: 'q-4-9-001',
    objective: '4.9',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which log most directly records whether a firewall permitted or denied a network flow?',
      fr: 'Quel journal enregistre le plus directement si un pare-feu a autorisé ou refusé un flux réseau ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Firewall log', fr: 'Journal de pare-feu' },
        correct: true,
        explanation: {
          en: 'Firewall logs record the rule decision, addresses, ports, protocol, and time for traffic that reaches the control.',
          fr: 'Les journaux de pare-feu consignent la décision de règle, les adresses, ports, protocole et heure du trafic traité.',
        },
      },
      {
        id: 'b',
        text: { en: 'Endpoint log', fr: 'Journal de terminal' },
        correct: false,
        explanation: {
          en: 'Endpoint telemetry can identify a process that attempted a connection, but it does not record the firewall rule decision.',
          fr: 'La télémétrie de terminal peut identifier le processus qui a tenté une connexion, mais pas la décision de règle du pare-feu.',
        },
      },
      {
        id: 'c',
        text: { en: 'Application log', fr: 'Journal d’application' },
        correct: false,
        explanation: {
          en: 'An application may note a failed request, yet it usually cannot say which network firewall rule allowed or blocked it.',
          fr: 'Une application peut signaler une requête échouée, sans pouvoir habituellement nommer la règle réseau qui l’a autorisée ou bloquée.',
        },
      },
      {
        id: 'd',
        text: { en: 'Vulnerability scan output', fr: 'Résultat de scan de vulnérabilités' },
        correct: false,
        explanation: {
          en: 'A scan describes discovered exposure and configuration weaknesses, not a time-stamped decision for an individual connection.',
          fr: 'Un scan décrit des expositions et faiblesses détectées, non une décision horodatée prise pour une connexion individuelle.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-002',
    objective: '4.9',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the main value of metadata during an investigation?',
      fr: 'Quelle est la valeur principale des métadonnées pendant une investigation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It provides attributes that help correlate and pivot between evidence',
          fr: 'Elles fournissent des attributs pour corréler les éléments et pivoter entre eux',
        },
        correct: true,
        explanation: {
          en: 'A hash, time, sender, recipient, owner, or header can link records and guide the next query without requiring visible content.',
          fr: 'Une valeur de hachage, heure, expéditeur, destinataire, propriétaire ou en-tête relie des traces et guide la recherche suivante.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It automatically proves that the content is malicious',
          fr: 'Elles prouvent automatiquement que le contenu est malveillant',
        },
        correct: false,
        explanation: {
          en: 'Metadata supplies context, not a verdict. A suspicious sender or creation time still requires validation against other evidence.',
          fr: 'Les métadonnées apportent du contexte, non un verdict. Un expéditeur ou une date suspects exigent encore une validation croisée.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It replaces the need to preserve original evidence',
          fr: 'Elles remplacent la nécessité de préserver la preuve originale',
        },
        correct: false,
        explanation: {
          en: 'Metadata can help identify evidence, but integrity and preservation procedures remain necessary for the original artefact.',
          fr: 'Les métadonnées aident à identifier une preuve, mais intégrité et procédures de conservation restent nécessaires pour l’artefact original.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It reports the current patch level of every asset',
          fr: 'Elles signalent le niveau de correctif de chaque actif',
        },
        correct: false,
        explanation: {
          en: 'Patch posture is usually gathered through inventory or vulnerability management. Metadata can describe files or messages but is not an asset-wide patch report.',
          fr: 'Le niveau de correctif provient plutôt de l’inventaire ou de la gestion des vulnérabilités, pas des métadonnées de fichiers ou messages.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-003',
    objective: '4.9',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'Which data source is most appropriate for finding a vendor’s recommended mitigation for a newly disclosed flaw?',
      fr: 'Quelle source convient le mieux pour trouver l’atténuation recommandée par un éditeur pour une faille nouvellement révélée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A vendor security advisory or bulletin',
          fr: 'Un avis ou bulletin de sécurité de l’éditeur',
        },
        correct: true,
        explanation: {
          en: 'A vendor advisory states affected versions, severity context, patches, workarounds, and other guidance for that product.',
          fr: 'Un avis d’éditeur précise versions touchées, contexte de gravité, correctifs, contournements et autres conseils pour ce produit.',
        },
      },
      {
        id: 'b',
        text: { en: 'A firewall log', fr: 'Un journal de pare-feu' },
        correct: false,
        explanation: {
          en: 'Firewall logs show local traffic decisions. They do not publish product-specific remediation guidance for a disclosed vulnerability.',
          fr: 'Les journaux de pare-feu montrent des décisions locales de trafic, pas les conseils de correction propres à une vulnérabilité publiée.',
        },
      },
      {
        id: 'c',
        text: { en: 'A DHCP assignment record', fr: 'Un enregistrement d’attribution DHCP' },
        correct: false,
        explanation: {
          en: 'DHCP records map an address to a device at a time. That is useful for attribution, not for vendor mitigation instructions.',
          fr: 'Les traces DHCP relient une adresse à un appareil à une heure donnée. Elles aident à attribuer, non à obtenir une instruction d’éditeur.',
        },
      },
      {
        id: 'd',
        text: { en: 'An automation execution log', fr: 'Un journal d’exécution d’automatisation' },
        correct: false,
        explanation: {
          en: 'Automation logs describe what a local playbook did. They cannot establish the vendor’s current recommendation for an external flaw.',
          fr: 'Les journaux d’automatisation décrivent un guide local exécuté, sans établir la recommandation actuelle de l’éditeur sur une faille externe.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-004',
    objective: '4.9',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'What should a threat-intelligence indicator such as a domain or file hash be treated as first?',
      fr: 'Comment faut-il d’abord traiter un indicateur de renseignement tel qu’un domaine ou un hachage de fichier ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A lead to validate against local evidence',
          fr: 'Une piste à valider avec les éléments locaux',
        },
        correct: true,
        explanation: {
          en: 'An indicator is useful for searching logs and telemetry, but timestamps, ownership, and local context determine whether it matters.',
          fr: 'Un indicateur sert à chercher dans journaux et télémétrie, mais heure, propriété et contexte local déterminent sa signification.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Conclusive proof of compromise',
          fr: 'Une preuve concluante de compromission',
        },
        correct: false,
        explanation: {
          en: 'Feeds can be stale or broad, and infrastructure can be shared. A match alone does not establish malicious activity in this environment.',
          fr: 'Les flux peuvent être anciens ou larges, et une infrastructure peut être partagée. Une correspondance seule ne démontre pas une activité malveillante locale.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A replacement for endpoint logging',
          fr: 'Un remplacement de la journalisation de terminal',
        },
        correct: false,
        explanation: {
          en: 'Intelligence supplies external context, while endpoint logs record local process and file activity needed to investigate the match.',
          fr: 'Le renseignement apporte un contexte externe, alors que les journaux de terminal consignent l’activité locale nécessaire à vérifier la correspondance.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A mandatory attribution to a named actor',
          fr: 'Une attribution obligatoire à un acteur nommé',
        },
        correct: false,
        explanation: {
          en: 'The same indicator can be reused or misreported. Attribution needs corroborated evidence and is not justified by one feed entry.',
          fr: 'Le même indicateur peut être réutilisé ou mal signalé. Une attribution exige des éléments corroborés, pas une seule entrée de flux.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-005',
    objective: '4.9',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which source best maps an IP address to the device that held it at a particular time?',
      fr: 'Quelle source relie le mieux une adresse IP à l’appareil qui la détenait à une heure précise ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'DHCP assignment records', fr: 'Les enregistrements d’attribution DHCP' },
        correct: true,
        explanation: {
          en: 'DHCP records associate leased addresses with device identifiers and lease times, supporting time-specific network attribution.',
          fr: 'Les traces DHCP associent adresses louées, identifiants d’appareil et heures de bail, ce qui soutient une attribution réseau datée.',
        },
      },
      {
        id: 'b',
        text: { en: 'A vulnerability feed', fr: 'Un flux de vulnérabilités' },
        correct: false,
        explanation: {
          en: 'A vulnerability feed describes externally reported weaknesses and affected products, not local address leases or device ownership.',
          fr: 'Un flux de vulnérabilités décrit faiblesses publiées et produits concernés, non les baux d’adresses locaux ou la propriété d’un appareil.',
        },
      },
      {
        id: 'c',
        text: { en: 'A security assessment report', fr: 'Un rapport d’évaluation de sécurité' },
        correct: false,
        explanation: {
          en: 'An assessment report identifies security gaps at an assessment point. It is not a dynamic record of address assignments.',
          fr: 'Un rapport d’évaluation identifie des lacunes à un instant donné. Ce n’est pas un enregistrement dynamique des attributions d’adresses.',
        },
      },
      {
        id: 'd',
        text: { en: 'A code repository', fr: 'Un dépôt de code' },
        correct: false,
        explanation: {
          en: 'A repository can show source changes and ownership, but it has no authoritative record of DHCP leases on the network.',
          fr: 'Un dépôt peut montrer des modifications de code et leurs auteurs, mais il ne détient pas les baux DHCP faisant autorité.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-006',
    objective: '4.9',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A scan reports an unpatched web server. Which finding would most directly support a conclusion that the weakness was exploited?',
      fr: 'Un scan signale un serveur web non corrigé. Quel constat soutient le plus directement la conclusion que la faiblesse a été exploitée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Endpoint evidence of a suspicious child process spawned by the web service',
          fr: 'Une trace de terminal montrant un processus enfant suspect lancé par le service web',
        },
        correct: true,
        explanation: {
          en: 'A process spawned by the affected service is local evidence of execution and can be correlated with the suspicious request and time.',
          fr: 'Un processus lancé par le service concerné constitue une preuve locale d’exécution, à rapprocher de la requête suspecte et de son heure.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A newer vulnerability bulletin for the product',
          fr: 'Un bulletin de vulnérabilité plus récent pour le produit',
        },
        correct: false,
        explanation: {
          en: 'A bulletin improves knowledge of exposure and remediation, but it does not record an attacker action on this server.',
          fr: 'Un bulletin améliore la connaissance de l’exposition et de la correction, mais il n’enregistre aucune action adverse sur ce serveur.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The asset inventory entry for the server',
          fr: 'L’entrée d’inventaire correspondant au serveur',
        },
        correct: false,
        explanation: {
          en: 'Inventory confirms that an asset and version exist, which supports scope analysis but cannot demonstrate exploitation.',
          fr: 'L’inventaire confirme l’existence d’un actif et de sa version, utile au périmètre mais incapable de démontrer une exploitation.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A low score in an older assessment report',
          fr: 'Un faible score dans un ancien rapport d’évaluation',
        },
        correct: false,
        explanation: {
          en: 'A prior report may establish a known control gap, but it is not time-linked evidence that this weakness was used.',
          fr: 'Un rapport antérieur peut établir une lacune connue, mais ce n’est pas une preuve horodatée que cette faiblesse a été utilisée.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-007',
    objective: '4.9',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'An IDS alert names a possible exploit attempt. Why should the analyst also examine endpoint and application logs?',
      fr: 'Une alerte IDS mentionne une tentative possible d’exploitation. Pourquoi l’analyste doit-il aussi examiner les journaux de terminal et d’application ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'To validate impact and determine whether the detected traffic led to activity on the target',
          fr: 'Pour valider l’impact et savoir si le trafic détecté a provoqué une activité sur la cible',
        },
        correct: true,
        explanation: {
          en: 'An IDS detection is a strong lead but can be a false positive or blocked attempt. Host and application evidence can confirm effect and scope.',
          fr: 'Une détection IDS est une piste forte mais peut être un faux positif ou une tentative bloquée. Les traces hôte et application confirment effet et périmètre.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'To replace the IDS signature with a firewall rule',
          fr: 'Pour remplacer la signature IDS par une règle de pare-feu',
        },
        correct: false,
        explanation: {
          en: 'Log correlation investigates what occurred. Changing a control may be a later containment decision, not the reason to consult these logs.',
          fr: 'La corrélation de journaux sert à enquêter. Modifier un contrôle peut être une décision de confinement ultérieure, pas le motif de consultation.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'To obtain the official vendor patch',
          fr: 'Pour obtenir le correctif officiel de l’éditeur',
        },
        correct: false,
        explanation: {
          en: 'Application and endpoint logs record local activity. Vendor advisories and support channels provide patch guidance, not those logs.',
          fr: 'Les journaux d’application et de terminal consignent l’activité locale. Les avis et canaux de support d’éditeur fournissent les conseils de correction.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'To identify every device currently assigned an IP address',
          fr: 'Pour identifier tous les appareils auxquels une adresse IP est attribuée',
        },
        correct: false,
        explanation: {
          en: 'Address lease history belongs in DHCP records. Endpoint and application logs answer whether the particular target performed suspicious actions.',
          fr: 'L’historique des baux relève des traces DHCP. Les journaux de terminal et d’application répondent aux actions suspectes de la cible précise.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-008',
    objective: '4.9',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'A service account disabled a user at 02:14. What source best distinguishes an automated containment action from an attacker or administrator action?',
      fr: 'Un compte de service a désactivé un utilisateur à 02 h 14. Quelle source distingue le mieux une mesure automatique de confinement d’une action adverse ou administrative ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Automation and orchestration logs',
          fr: 'Les journaux d’automatisation et d’orchestration',
        },
        correct: true,
        explanation: {
          en: 'These records identify the playbook, inputs, invoking identity, steps, and outcome, directly showing whether the automated workflow made the change.',
          fr: 'Ces traces identifient guide, entrées, identité appelante, étapes et résultat, montrant directement si le flux automatique a fait la modification.',
        },
      },
      {
        id: 'b',
        text: { en: 'A threat-intelligence feed', fr: 'Un flux de renseignement sur les menaces' },
        correct: false,
        explanation: {
          en: 'Threat intelligence can contextualize an indicator, but it does not record which local workflow disabled a specific account.',
          fr: 'Le renseignement peut contextualiser un indicateur, mais il ne consigne pas quel flux local a désactivé un compte précis.',
        },
      },
      {
        id: 'c',
        text: { en: 'A vulnerability scan output', fr: 'Un résultat de scan de vulnérabilités' },
        correct: false,
        explanation: {
          en: 'Scan output identifies exposure and configuration issues. It has no event history for account-management actions.',
          fr: 'Le résultat de scan identifie expositions et configurations faibles. Il ne contient aucun historique d’événements de gestion de comptes.',
        },
      },
      {
        id: 'd',
        text: { en: 'A data-breach report', fr: 'Un rapport de violation de données' },
        correct: false,
        explanation: {
          en: 'A breach report may describe notification scope and exposed data, but it is not an audit trail for an account action at a specific time.',
          fr: 'Un rapport de violation peut décrire notification et données exposées, mais ce n’est pas une piste d’audit d’action de compte datée.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-009',
    objective: '4.9',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which statement correctly distinguishes a packet capture from a network flow log?',
      fr: 'Quelle affirmation distingue correctement une capture de paquets d’un journal de flux réseau ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A packet capture can contain packet-level detail, while a flow log usually summarizes a communication',
          fr: 'Une capture peut contenir le détail des paquets, tandis qu’un journal de flux résume habituellement une communication',
        },
        correct: true,
        explanation: {
          en: 'Flow records commonly preserve endpoints, ports, protocol, volume, and time; captures can provide much richer traffic detail when retained.',
          fr: 'Les flux conservent souvent extrémités, ports, protocole, volume et heure ; les captures apportent un détail bien plus riche lorsqu’elles sont conservées.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A flow log always contains the complete application payload',
          fr: 'Un journal de flux contient toujours la charge applicative complète',
        },
        correct: false,
        explanation: {
          en: 'Flow logs are generally summaries rather than full payload records. Their lower volume is useful, but it limits content-level analysis.',
          fr: 'Les journaux de flux sont généralement des résumés, non des enregistrements de charge complète. Leur faible volume limite donc l’analyse du contenu.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A packet capture is produced only by DHCP servers',
          fr: 'Une capture de paquets est produite uniquement par des serveurs DHCP',
        },
        correct: false,
        explanation: {
          en: 'Many network sensors and interfaces can capture packets. DHCP is one protocol and also produces its own lease records.',
          fr: 'De nombreux capteurs et interfaces réseau peuvent capturer des paquets. DHCP est un protocole parmi d’autres et produit aussi ses traces de bail.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A packet capture establishes the business owner of an asset',
          fr: 'Une capture de paquets établit le propriétaire métier d’un actif',
        },
        correct: false,
        explanation: {
          en: 'Traffic evidence can identify communication, not organisational ownership. Asset-management and identity records supply that relationship.',
          fr: 'Une preuve réseau identifie des communications, non une propriété organisationnelle. Inventaire et identités fournissent cette relation.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-010',
    objective: '4.9',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'A team wants to determine whether a suspicious dependency was introduced through an approved software change. Which source is most useful?',
      fr: 'Une équipe veut savoir si une dépendance suspecte a été introduite par un changement logiciel approuvé. Quelle source est la plus utile ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The file or code repository history',
          fr: 'L’historique du dépôt de fichiers ou de code',
        },
        correct: true,
        explanation: {
          en: 'Repository history can show when the dependency changed, the reviewed change, its author, and the expected source version.',
          fr: 'L’historique de dépôt peut montrer date du changement, revue associée, auteur et version source attendue de la dépendance.',
        },
      },
      {
        id: 'b',
        text: { en: 'A DNS query log', fr: 'Un journal de requêtes DNS' },
        correct: false,
        explanation: {
          en: 'DNS data may show where a host looked up a name, but it cannot show whether a library was approved in source control.',
          fr: 'Les données DNS peuvent montrer quel nom un hôte a recherché, sans indiquer si une bibliothèque fut approuvée dans le code.',
        },
      },
      {
        id: 'c',
        text: { en: 'A public breach report', fr: 'Un rapport public de violation' },
        correct: false,
        explanation: {
          en: 'A breach report can provide external incident context, but it does not provide authoritative history for this organisation’s software changes.',
          fr: 'Un rapport de violation fournit un contexte externe, mais pas l’historique faisant autorité des changements logiciels de cette organisation.',
        },
      },
      {
        id: 'd',
        text: { en: 'An IDS alert log', fr: 'Un journal d’alertes IDS' },
        correct: false,
        explanation: {
          en: 'IDS alerts observe network patterns. They cannot establish whether a package addition was reviewed and committed as an approved change.',
          fr: 'Les alertes IDS observent des motifs réseau. Elles ne peuvent établir si un ajout de paquet fut revu et validé comme changement approuvé.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-011',
    objective: '4.9',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Why is an old security assessment report useful but insufficient as evidence for a current incident?',
      fr: 'Pourquoi un ancien rapport d’évaluation de sécurité est-il utile mais insuffisant comme preuve d’un incident actuel ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It can identify prior gaps, but current logs are needed to establish current activity and timing',
          fr: 'Il peut identifier des lacunes antérieures, mais les journaux actuels établissent l’activité et la chronologie présentes',
        },
        correct: true,
        explanation: {
          en: 'Assessment reports provide historical control context. Investigation conclusions require evidence that is tied to the present event and affected systems.',
          fr: 'Les rapports d’évaluation fournissent un contexte historique de contrôle. Une conclusion exige des éléments liés à l’événement actuel et aux systèmes touchés.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It is useless because assessments never identify security weaknesses',
          fr: 'Il est inutile car les évaluations n’identifient jamais de faiblesses',
        },
        correct: false,
        explanation: {
          en: 'Finding weaknesses is a core purpose of an assessment. Its limitation is age and scope, not an inability to identify gaps.',
          fr: 'Identifier les faiblesses est un but central d’une évaluation. Sa limite est l’âge et le périmètre, pas une incapacité à trouver les lacunes.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It automatically changes firewall decisions after publication',
          fr: 'Il modifie automatiquement les décisions de pare-feu après publication',
        },
        correct: false,
        explanation: {
          en: 'Reports describe findings and recommendations. They do not themselves operate a firewall or produce live enforcement actions.',
          fr: 'Les rapports décrivent constats et recommandations. Ils ne pilotent pas eux-mêmes un pare-feu ni ne produisent des actions de filtrage.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It is a replacement for a runbook during containment',
          fr: 'Il remplace un guide opérationnel pendant le confinement',
        },
        correct: false,
        explanation: {
          en: 'A report diagnoses or recommends; a runbook supplies approved steps and escalation. These sources have different purposes during response.',
          fr: 'Un rapport diagnostique ou recommande ; un guide fournit étapes et escalade approuvées. Ces sources n’ont pas la même finalité en réponse.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-012',
    objective: '4.9',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A proxy records a request to a suspicious domain from 10.20.4.18. The analyst needs to identify the device using that address at that moment. What should the analyst review next?',
      fr: 'Un proxy enregistre une requête vers un domaine suspect depuis 10.20.4.18. L’analyste doit identifier l’appareil utilisant cette adresse à cet instant. Que doit-il consulter ensuite ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'DHCP assignment records for the relevant time',
          fr: 'Les enregistrements DHCP pour l’heure concernée',
        },
        correct: true,
        explanation: {
          en: 'DHCP lease data maps the observed address to a device identifier at the relevant time, enabling an accurate endpoint pivot.',
          fr: 'Les baux DHCP relient l’adresse observée à un identifiant d’appareil à l’heure concernée, permettant un pivot exact vers le terminal.',
        },
      },
      {
        id: 'b',
        text: { en: 'The current vulnerability feed', fr: 'Le flux de vulnérabilités actuel' },
        correct: false,
        explanation: {
          en: 'A vulnerability feed can explain a published weakness, but it has no local record of which device leased an address.',
          fr: 'Un flux de vulnérabilités peut expliquer une faiblesse publiée, mais il ne contient aucun bail local reliant adresse et appareil.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A code repository change log',
          fr: 'Un journal de modifications du dépôt de code',
        },
        correct: false,
        explanation: {
          en: 'Source-control history helps investigate software changes, not the time-bound physical or logical device using an IP address.',
          fr: 'L’historique de code aide à enquêter sur les changements logiciels, non sur l’appareil utilisant une adresse IP à un moment précis.',
        },
      },
      {
        id: 'd',
        text: { en: 'A data-breach notification', fr: 'Une notification de violation de données' },
        correct: false,
        explanation: {
          en: 'A notification addresses disclosure obligations and affected data. It does not resolve internal network attribution for a proxy event.',
          fr: 'Une notification traite les obligations de divulgation et données touchées. Elle ne résout pas l’attribution réseau interne d’un événement proxy.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-013',
    objective: '4.9',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A researcher posts alleged employee credentials on a dark-web forum. What is the best initial investigative action?',
      fr: 'Un chercheur publie des identifiants supposés appartenir à des employés sur un forum du web clandestin. Quelle est la meilleure action initiale d’investigation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Preserve the claim and validate it through authorised local identity and authentication evidence',
          fr: 'Conserver la revendication et la valider avec les éléments d’identité et d’authentification locaux autorisés',
        },
        correct: true,
        explanation: {
          en: 'Dark-web claims are unverified context. Preserving the source and checking authorised local records establishes whether the claim is current and relevant.',
          fr: 'Les revendications du web clandestin sont un contexte non vérifié. Les conserver puis vérifier les traces locales autorisées établit leur actualité et pertinence.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Publicly attribute the claim to the forum user immediately',
          fr: 'Attribuer publiquement la revendication à l’utilisateur du forum immédiatement',
        },
        correct: false,
        explanation: {
          en: 'A forum identity and claim are not reliable attribution. Public statements before validation can be inaccurate and create unnecessary legal or operational harm.',
          fr: 'Une identité de forum et une revendication ne constituent pas une attribution fiable. Une déclaration avant validation peut être erronée et dommageable.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Treat every listed account as confirmed compromised without checking logs',
          fr: 'Traiter chaque compte listé comme compromis confirmé sans vérifier les journaux',
        },
        correct: false,
        explanation: {
          en: 'A precautionary reset may be appropriate under policy, but investigation still needs identity and authentication evidence to assess validity and scope.',
          fr: 'Une réinitialisation préventive peut convenir selon la politique, mais l’enquête exige toujours des traces d’identité et d’authentification pour mesurer validité et périmètre.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Use the forum post as a substitute for the incident playbook',
          fr: 'Utiliser la publication comme substitut du guide de réponse aux incidents',
        },
        correct: false,
        explanation: {
          en: 'External reporting supplies a lead, while a runbook or playbook supplies the approved local actions, contacts, and escalation path.',
          fr: 'Un signalement externe fournit une piste, tandis qu’un guide opérationnel donne actions, contacts et escalade approuvés localement.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-014',
    objective: '4.9',
    kind: 'scenario',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'An analyst needs to determine whether a suspicious file executed on a workstation and communicated with a known malicious domain. Which two local data sources are most directly useful? (Select two.)',
      fr: 'Une analyste doit déterminer si un fichier suspect a été exécuté sur un poste et a communiqué avec un domaine malveillant connu. Quelles deux sources locales sont les plus utiles ? (Sélectionne deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Endpoint logs with process and file telemetry',
          fr: 'Des journaux de terminal avec télémétrie de processus et fichiers',
        },
        correct: true,
        explanation: {
          en: 'Endpoint records can show the file hash, execution, process tree, command line, and user context on the workstation.',
          fr: 'Les traces de terminal peuvent montrer hachage, exécution, arbre de processus, ligne de commande et contexte utilisateur sur le poste.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'DNS or proxy logs for the workstation and time',
          fr: 'Des journaux DNS ou proxy pour le poste et l’heure concernés',
        },
        correct: true,
        explanation: {
          en: 'DNS or proxy evidence can connect the workstation to the suspicious domain and establish the time of the attempted communication.',
          fr: 'Les traces DNS ou proxy relient le poste au domaine suspect et établissent l’heure de la tentative de communication.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A vendor advisory for a different product',
          fr: 'Un avis d’éditeur concernant un autre produit',
        },
        correct: false,
        explanation: {
          en: 'An unrelated advisory may be valid external information, but it does not record this file’s execution or the workstation’s domain request.',
          fr: 'Un avis non lié peut être une information externe valide, mais il ne consigne ni l’exécution du fichier ni la requête du poste.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A prior security assessment report',
          fr: 'Un rapport d’évaluation de sécurité antérieur',
        },
        correct: false,
        explanation: {
          en: 'A prior assessment can reveal historical gaps, but it is not a source of present file-execution or communication events.',
          fr: 'Une évaluation antérieure peut révéler des lacunes historiques, mais elle n’est pas une source d’événements actuels d’exécution ou de communication.',
        },
      },
    ],
  },
  {
    id: 'q-4-9-015',
    objective: '4.9',
    kind: 'scenario',
    difficulty: 'medium',
    multiSelect: true,
    prompt: {
      en: 'A critical vulnerability has been announced for a product used by the organisation. Which two sources should the team combine first to determine local exposure and obtain remediation guidance? (Select two.)',
      fr: 'Une vulnérabilité critique vient d’être annoncée pour un produit utilisé par l’organisation. Quelles deux sources l’équipe doit-elle combiner en premier pour déterminer l’exposition locale et obtenir les conseils de correction ? (Sélectionne deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A vulnerability feed or vendor advisory',
          fr: 'Un flux de vulnérabilités ou avis d’éditeur',
        },
        correct: true,
        explanation: {
          en: 'The feed or advisory identifies affected versions, severity, patches, and mitigations, providing the external knowledge needed for triage.',
          fr: 'Le flux ou avis identifie versions touchées, gravité, correctifs et atténuations, apportant la connaissance externe nécessaire au triage.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Asset inventory or vulnerability scan output',
          fr: 'Un inventaire d’actifs ou résultat de scan de vulnérabilités',
        },
        correct: true,
        explanation: {
          en: 'Inventory or scan evidence shows whether relevant products and versions are present locally, which establishes exposure scope for remediation.',
          fr: 'L’inventaire ou le scan montre si les produits et versions concernés sont présents localement, établissant le périmètre d’exposition à corriger.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A dark-web claim about another organisation',
          fr: 'Une revendication du web clandestin concernant une autre organisation',
        },
        correct: false,
        explanation: {
          en: 'Such a claim may create a separate lead, but it neither identifies affected local versions nor provides authoritative remediation guidance.',
          fr: 'Une telle revendication peut créer une piste distincte, mais elle ne nomme ni versions locales touchées ni conseils de correction faisant autorité.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A completed incident playbook execution log',
          fr: 'Un journal d’exécution de guide d’incident terminé',
        },
        correct: false,
        explanation: {
          en: 'Execution logs show what a local workflow previously did. They do not establish current product exposure or the vendor’s recommended fix.',
          fr: 'Les journaux d’exécution montrent ce qu’un flux local a fait auparavant. Ils n’établissent ni l’exposition actuelle ni le correctif recommandé par l’éditeur.',
        },
      },
    ],
  },
];
