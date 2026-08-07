import type { Question } from '@/content/schemas';

/** Original practice questions authored from SY0-701 objective 4.8. */
export const QUESTIONS_4_8: Question[] = [
  {
    id: 'q-4-8-001',
    objective: '4.8',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which incident response phase is primarily concerned with limiting an attack’s spread?',
      fr: 'Quelle phase de réponse aux incidents vise principalement à limiter la propagation d’une attaque ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Containment', fr: 'Le confinement' },
        correct: true,
        explanation: {
          en: 'Containment limits the attacker’s immediate reach, for example by isolating affected systems or blocking an indicator.',
          fr: 'Le confinement limite la portée immédiate de l’attaquant, par exemple en isolant les systèmes touchés ou en bloquant un indicateur.',
        },
      },
      {
        id: 'b',
        text: { en: 'Eradication', fr: 'L’éradication' },
        correct: false,
        explanation: {
          en: 'Eradication removes the attacker’s foothold and the enabling weakness after spread has been limited.',
          fr: 'L’éradication retire l’accès de l’attaquant et la faiblesse ayant permis l’incident après la limitation de la propagation.',
        },
      },
      {
        id: 'c',
        text: { en: 'Recovery', fr: 'La reprise' },
        correct: false,
        explanation: {
          en: 'Recovery restores trustworthy business operation after the threat has been removed; it does not primarily stop spread.',
          fr: 'La reprise rétablit un fonctionnement métier fiable après le retrait de la menace ; elle ne vise pas d’abord à arrêter la propagation.',
        },
      },
      {
        id: 'd',
        text: { en: 'Lessons learned', fr: 'Le retour d’expérience' },
        correct: false,
        explanation: {
          en: 'Lessons learned improves future response after the event. It cannot reduce damage while an attack is actively spreading.',
          fr: 'Le retour d’expérience améliore la réponse future après l’événement. Il ne peut pas réduire les dégâts pendant une propagation active.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-002',
    objective: '4.8',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A team disconnects an infected laptop from the network but has not removed its persistence mechanism. What has it accomplished?',
      fr: 'Une équipe déconnecte du réseau un ordinateur portable infecté sans retirer son mécanisme de persistance. Qu’a-t-elle accompli ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Containment', fr: 'Le confinement' },
        correct: true,
        explanation: {
          en: 'Network isolation reduces the chance of lateral movement, but persistence may remain and requires later eradication.',
          fr: 'L’isolement réseau réduit le risque de mouvement latéral, mais la persistance peut demeurer et exige ensuite une éradication.',
        },
      },
      {
        id: 'b',
        text: { en: 'Eradication', fr: 'L’éradication' },
        correct: false,
        explanation: {
          en: 'Eradication would remove malicious files, accounts, or configuration. The scenario explicitly says persistence remains.',
          fr: 'L’éradication retirerait les fichiers, comptes ou paramètres malveillants. Le scénario précise que la persistance demeure.',
        },
      },
      {
        id: 'c',
        text: { en: 'Recovery', fr: 'La reprise' },
        correct: false,
        explanation: {
          en: 'A disconnected laptop is not restored to trusted service. Recovery follows removal of the threat and validation.',
          fr: 'Un ordinateur déconnecté n’est pas restauré en service fiable. La reprise suit le retrait de la menace et sa validation.',
        },
      },
      {
        id: 'd',
        text: { en: 'Root cause analysis', fr: 'L’analyse de la cause racine' },
        correct: false,
        explanation: {
          en: 'Root cause analysis explains why the compromise became possible. Disconnecting a device is an immediate response action.',
          fr: 'L’analyse de la cause racine explique pourquoi la compromission est devenue possible. Déconnecter l’appareil est une action de réponse immédiate.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-003',
    objective: '4.8',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'Before a ransomware event, executives discuss who can authorise isolation of a revenue-critical server and who contacts legal counsel. Which activity does this support?',
      fr: 'Avant un rançongiciel, des responsables déterminent qui peut autoriser l’isolement d’un serveur critique et qui contacte le conseil juridique. Quelle activité soutiennent-ils ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Incident response preparation',
          fr: 'La préparation de la réponse aux incidents',
        },
        correct: true,
        explanation: {
          en: 'Defining authority, roles, contacts, and escalation paths before an event is core preparation for incident response.',
          fr: 'Définir autorité, rôles, contacts et voies d’escalade avant un événement constitue la préparation centrale de la réponse aux incidents.',
        },
      },
      {
        id: 'b',
        text: { en: 'Threat hunting', fr: 'La traque des menaces' },
        correct: false,
        explanation: {
          en: 'Threat hunting searches telemetry for undiscovered adversary activity. It does not establish decision authority or contact lists.',
          fr: 'La traque des menaces recherche une activité adverse inconnue dans la télémétrie. Elle ne définit ni autorité de décision ni liste de contacts.',
        },
      },
      {
        id: 'c',
        text: { en: 'Digital forensics', fr: 'L’informatique légale' },
        correct: false,
        explanation: {
          en: 'Forensics preserves and examines evidence from an event. The discussion creates a response plan before evidence exists.',
          fr: 'L’informatique légale préserve et examine les preuves d’un événement. La discussion crée un plan de réponse avant toute preuve.',
        },
      },
      {
        id: 'd',
        text: { en: 'Root cause analysis', fr: 'L’analyse de la cause racine' },
        correct: false,
        explanation: {
          en: 'Root cause analysis is conducted after facts are available to identify enabling failures, not to preassign response roles.',
          fr: 'L’analyse de la cause racine intervient après les faits pour identifier les défaillances, non pour attribuer d’avance les rôles de réponse.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-004',
    objective: '4.8',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the principal purpose of an incident response playbook?',
      fr: 'Quelle est la finalité principale d’un guide opératoire de réponse aux incidents ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Provide repeatable steps for a defined type of incident',
          fr: 'Fournir des étapes répétables pour un type d’incident défini',
        },
        correct: true,
        explanation: {
          en: 'A playbook gives responders a focused, documented starting sequence for recurring events such as phishing or ransomware.',
          fr: 'Un guide opératoire donne aux intervenants une séquence initiale ciblée et documentée pour des événements récurrents comme l’hameçonnage.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Replace responder judgment in every situation',
          fr: 'Remplacer le jugement des intervenants dans toute situation',
        },
        correct: false,
        explanation: {
          en: 'Playbooks guide common actions but unusual scope, business impact, and evidence needs still require informed judgment.',
          fr: 'Les guides orientent les actions habituelles, mais un périmètre inhabituel, l’impact métier et les besoins de preuve exigent toujours du jugement.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Store forensic images with integrity protection',
          fr: 'Conserver des images légales avec protection d’intégrité',
        },
        correct: false,
        explanation: {
          en: 'Evidence storage and integrity controls support forensics. A playbook describes how responders should handle a particular event.',
          fr: 'Le stockage et l’intégrité des preuves relèvent de l’informatique légale. Un guide décrit comment répondre à un événement particulier.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Detect every unknown attacker automatically',
          fr: 'Détecter automatiquement tout attaquant inconnu',
        },
        correct: false,
        explanation: {
          en: 'A playbook is procedural documentation, not a detection engine. Unknown activity may instead require threat hunting.',
          fr: 'Un guide opératoire est une documentation procédurale, pas un moteur de détection. Une activité inconnue peut exiger une traque des menaces.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-005',
    objective: '4.8',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which activity most directly verifies that senior leaders understand their decisions and communications during a cyber incident without changing production systems?',
      fr: 'Quelle activité vérifie le plus directement que les responsables comprennent leurs décisions et communications lors d’un cyberincident sans modifier les systèmes de production ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Tabletop exercise', fr: 'Exercice sur table' },
        correct: true,
        explanation: {
          en: 'A tabletop uses a facilitated scenario to rehearse roles, decisions, escalation, and communication with minimal technical disruption.',
          fr: 'Un exercice sur table utilise un scénario animé pour répéter rôles, décisions, escalade et communication avec une perturbation technique minimale.',
        },
      },
      {
        id: 'b',
        text: { en: 'Full interruption test', fr: 'Test d’interruption complète' },
        correct: false,
        explanation: {
          en: 'A full interruption test verifies operational failover under realistic conditions and can disrupt services, exceeding the stated need.',
          fr: 'Un test d’interruption complète vérifie le basculement opérationnel dans des conditions réalistes et peut perturber les services, au-delà du besoin décrit.',
        },
      },
      {
        id: 'c',
        text: { en: 'Digital forensic acquisition', fr: 'Acquisition légale numérique' },
        correct: false,
        explanation: {
          en: 'Forensic acquisition preserves evidence from a system. It does not rehearse executive decisions or incident communications.',
          fr: 'L’acquisition légale préserve la preuve d’un système. Elle ne répète ni les décisions des responsables ni les communications d’incident.',
        },
      },
      {
        id: 'd',
        text: { en: 'Threat hunting engagement', fr: 'Mission de traque des menaces' },
        correct: false,
        explanation: {
          en: 'Threat hunting investigates possible hidden adversary activity in telemetry; it is not primarily a leadership rehearsal.',
          fr: 'La traque des menaces enquête sur une activité adverse cachée dans la télémétrie ; elle n’est pas d’abord une répétition pour responsables.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-006',
    objective: '4.8',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'During an exercise, the recovery team successfully restores data but discovers that the incident paging list is six months out of date. What should happen next?',
      fr: 'Pendant un exercice, l’équipe de reprise restaure les données, mais découvre que la liste d’astreinte date de six mois. Quelle est la prochaine action appropriée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Document the finding and assign an owner to correct the plan',
          fr: 'Documenter le constat et attribuer la correction du plan à un responsable',
        },
        correct: true,
        explanation: {
          en: 'Testing has value when observed gaps are captured, owned, and remediated. An outdated contact list is a preparation deficiency.',
          fr: 'Un test a de la valeur lorsque les lacunes observées sont consignées, attribuées et corrigées. Une liste périmée est une faiblesse de préparation.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Treat the restore as proof that no change is needed',
          fr: 'Considérer la restauration comme preuve qu’aucun changement n’est nécessaire',
        },
        correct: false,
        explanation: {
          en: 'Successful data restoration tests only one capability. A failed notification path can still delay a real incident response.',
          fr: 'Une restauration réussie ne teste qu’une capacité. Une voie de notification défaillante peut toujours retarder la réponse à un incident réel.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Start root cause analysis on the original incident',
          fr: 'Commencer une analyse de cause racine sur l’incident initial',
        },
        correct: false,
        explanation: {
          en: 'The scenario reports an exercise finding, not a newly investigated compromise whose enabling cause must be determined.',
          fr: 'Le scénario rapporte un constat d’exercice, non une nouvelle compromission dont il faudrait déterminer la cause ayant permis l’incident.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Discard the exercise records to avoid confusion',
          fr: 'Détruire les comptes rendus de l’exercice pour éviter la confusion',
        },
        correct: false,
        explanation: {
          en: 'Exercise records support improvement and accountability. Discarding them removes the evidence needed to correct the documented gap.',
          fr: 'Les comptes rendus d’exercice soutiennent l’amélioration et la responsabilité. Les détruire élimine la preuve nécessaire pour corriger la lacune.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-007',
    objective: '4.8',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which question is root cause analysis designed to answer after an incident?',
      fr: 'À quelle question l’analyse de la cause racine est-elle destinée à répondre après un incident ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Which control or process failures made the incident possible?',
          fr: 'Quelles défaillances de contrôle ou de processus ont rendu l’incident possible ?',
        },
        correct: true,
        explanation: {
          en: 'Root cause analysis identifies the underlying technical or process conditions that enabled the incident and guides corrective action.',
          fr: 'L’analyse de la cause racine identifie les conditions techniques ou procédurales sous-jacentes ayant permis l’incident et guide les actions correctives.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Which host should be disconnected first?',
          fr: 'Quel hôte faut-il déconnecter en premier ?',
        },
        correct: false,
        explanation: {
          en: 'Selecting a host for immediate isolation is a containment decision made while limiting an active incident, not retrospective analysis.',
          fr: 'Choisir un hôte à isoler immédiatement est une décision de confinement prise pour limiter un incident actif, non une analyse rétrospective.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Which unknown technique may exist elsewhere right now?',
          fr: 'Quelle technique inconnue peut exister ailleurs en ce moment ?',
        },
        correct: false,
        explanation: {
          en: 'Searching proactively for undiscovered activity is threat hunting. Root cause analysis explains known enabling failures after response.',
          fr: 'Rechercher proactivement une activité inconnue relève de la traque des menaces. L’analyse de cause racine explique les défaillances connues après réponse.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Who received a disk image after collection?',
          fr: 'Qui a reçu une image disque après sa collecte ?',
        },
        correct: false,
        explanation: {
          en: 'That transfer belongs in chain-of-custody documentation. It establishes evidence handling rather than the incident’s underlying cause.',
          fr: 'Ce transfert relève de la chaîne de possession. Il établit la manipulation de la preuve, non la cause sous-jacente de l’incident.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-008',
    objective: '4.8',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What distinguishes threat hunting from ordinary security monitoring?',
      fr: 'Qu’est-ce qui distingue la traque des menaces de la surveillance de sécurité ordinaire ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It proactively investigates a hypothesis for hidden activity',
          fr: 'Elle enquête proactivement sur une hypothèse d’activité cachée',
        },
        correct: true,
        explanation: {
          en: 'Threat hunting starts with a question or hypothesis and searches multiple data sources for activity that alerts may not reveal.',
          fr: 'La traque des menaces part d’une question ou hypothèse et recherche dans plusieurs sources une activité que les alertes peuvent ne pas révéler.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It waits for configured alerts to occur',
          fr: 'Elle attend le déclenchement d’alertes configurées',
        },
        correct: false,
        explanation: {
          en: 'Waiting for configured conditions describes monitoring. Hunting is proactive precisely because it does not wait for an alert.',
          fr: 'Attendre des conditions configurées décrit la surveillance. La traque est proactive précisément parce qu’elle n’attend pas une alerte.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It preserves original media for legal review',
          fr: 'Elle préserve les supports originaux pour une revue juridique',
        },
        correct: false,
        explanation: {
          en: 'Preserving original media is a digital forensics practice. Hunting analyzes telemetry to locate possible adversary behavior.',
          fr: 'Préserver les supports originaux est une pratique d’informatique légale. La traque analyse la télémétrie pour localiser un comportement adverse possible.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It restores affected services after an outage',
          fr: 'Elle restaure les services touchés après une interruption',
        },
        correct: false,
        explanation: {
          en: 'Restoring services is recovery work. Hunting may discover an issue, but it does not itself return services to operation.',
          fr: 'Restaurer les services relève de la reprise. La traque peut découvrir un problème, mais ne remet pas elle-même les services en fonctionnement.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-009',
    objective: '4.8',
    kind: 'scenario',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'An analyst hunts for traces of a newly disclosed adversary technique. Which actions are appropriate? (Select two.)',
      fr: 'Une analyste traque les traces d’une technique adverse récemment divulguée. Quelles actions sont appropriées ? (Sélectionne deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Form a hypothesis and query relevant endpoint and identity telemetry',
          fr: 'Formuler une hypothèse et interroger la télémétrie pertinente des terminaux et identités',
        },
        correct: true,
        explanation: {
          en: 'A hypothesis-guided query across relevant sources is the defining method of threat hunting for potentially hidden behavior.',
          fr: 'Une requête guidée par hypothèse dans les sources pertinentes est la méthode caractéristique de la traque de comportements potentiellement cachés.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Refine detections if the search reveals useful indicators',
          fr: 'Affiner les détections si la recherche révèle des indicateurs utiles',
        },
        correct: true,
        explanation: {
          en: 'Hunt findings can improve future monitoring by producing indicators, patterns, or detection logic that was previously absent.',
          fr: 'Les résultats de traque peuvent améliorer la surveillance future en produisant indicateurs, motifs ou logique de détection auparavant absents.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Wait for the SIEM to alert before examining the technique',
          fr: 'Attendre une alerte du SIEM avant d’examiner la technique',
        },
        correct: false,
        explanation: {
          en: 'Waiting for an alert makes the activity reactive monitoring. Hunting begins before an existing rule necessarily raises an alert.',
          fr: 'Attendre une alerte rend l’activité réactive et relève de la surveillance. La traque commence avant qu’une règle existante ne déclenche nécessairement une alerte.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Declare the investigation complete without recording a negative result',
          fr: 'Déclarer l’enquête terminée sans consigner un résultat négatif',
        },
        correct: false,
        explanation: {
          en: 'A scoped negative result is still useful evidence of what was searched and can guide later detections or prioritisation.',
          fr: 'Un résultat négatif délimité reste une preuve utile de ce qui a été recherché et peut guider détections ou priorités ultérieures.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-010',
    objective: '4.8',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the purpose of a chain of custody record?',
      fr: 'Quelle est la finalité d’un registre de chaîne de possession ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Document evidence handling from collection through transfer and storage',
          fr: 'Documenter la manipulation des preuves de la collecte aux transferts et au stockage',
        },
        correct: true,
        explanation: {
          en: 'Chain of custody shows who handled evidence, when, and how, supporting confidence that it remained controlled and traceable.',
          fr: 'La chaîne de possession montre qui a manipulé la preuve, quand et comment, démontrant qu’elle est restée contrôlée et traçable.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Rank incident severity for executive escalation',
          fr: 'Classer la gravité des incidents pour l’escalade des responsables',
        },
        correct: false,
        explanation: {
          en: 'Severity criteria guide incident response prioritisation. Chain of custody instead documents the handling history of evidence.',
          fr: 'Les critères de gravité guident la priorité de réponse. La chaîne de possession documente au contraire l’historique de manipulation des preuves.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Remove malware from a captured disk image',
          fr: 'Retirer un logiciel malveillant d’une image disque capturée',
        },
        correct: false,
        explanation: {
          en: 'Removing malware is eradication and would change evidence. Forensics normally preserves the original and works from a verified copy.',
          fr: 'Retirer un logiciel malveillant relève de l’éradication et modifierait la preuve. L’informatique légale préserve normalement l’original et travaille sur une copie vérifiée.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Rehearse the incident commander’s communications',
          fr: 'Répéter les communications du responsable d’incident',
        },
        correct: false,
        explanation: {
          en: 'Communication rehearsal is usually a tabletop exercise. A custody record concerns evidence integrity rather than response training.',
          fr: 'La répétition des communications relève généralement d’un exercice sur table. Un registre de possession concerne l’intégrité des preuves, non la formation.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-011',
    objective: '4.8',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Why would an investigator calculate a hash of a forensic disk image?',
      fr: 'Pourquoi une enquêtrice calcule-t-elle la valeur de hachage d’une image disque légale ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'To demonstrate that the acquired image has not changed',
          fr: 'Pour démontrer que l’image acquise n’a pas changé',
        },
        correct: true,
        explanation: {
          en: 'Matching hash values provide integrity evidence that the acquired copy is the same data as when it was collected.',
          fr: 'Des valeurs de hachage identiques fournissent une preuve d’intégrité montrant que la copie acquise contient les mêmes données qu’à la collecte.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'To encrypt the image so analysts cannot read it',
          fr: 'Pour chiffrer l’image afin que les analystes ne puissent pas la lire',
        },
        correct: false,
        explanation: {
          en: 'A hash is a one-way integrity value, not encryption. Encryption protects confidentiality but does not by itself prove unchanged content.',
          fr: 'Un hachage est une valeur d’intégrité à sens unique, pas un chiffrement. Le chiffrement protège la confidentialité sans prouver seul un contenu inchangé.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'To identify the attacker’s geographic location',
          fr: 'Pour identifier la localisation géographique de l’attaquant',
        },
        correct: false,
        explanation: {
          en: 'A disk-image hash describes the image data, not attacker attribution. Location claims require separate evidence and remain uncertain.',
          fr: 'Le hachage d’une image décrit ses données, non l’attribution géographique d’un attaquant. Cette localisation exige des preuves distinctes et reste incertaine.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'To prevent lateral movement from the compromised host',
          fr: 'Pour empêcher le mouvement latéral depuis l’hôte compromis',
        },
        correct: false,
        explanation: {
          en: 'Blocking lateral movement is containment through isolation or access controls. Hashing an image has no active network control effect.',
          fr: 'Empêcher le mouvement latéral relève du confinement par isolement ou contrôle d’accès. Hacher une image n’a aucun effet de contrôle réseau actif.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-012',
    objective: '4.8',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A suspected compromised server contains volatile memory that may reveal malicious processes. Legal review is likely. What should the response team prioritise before rebooting?',
      fr: 'Un serveur suspect contient de la mémoire volatile pouvant révéler des processus malveillants. Une revue juridique est probable. Que faut-il prioriser avant le redémarrage ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Preserve and document relevant volatile evidence',
          fr: 'Préserver et documenter les preuves volatiles pertinentes',
        },
        correct: true,
        explanation: {
          en: 'Rebooting can destroy volatile memory and alter logs. Preserving and documenting evidence supports later forensic defensibility.',
          fr: 'Le redémarrage peut détruire la mémoire volatile et modifier les journaux. Préserver et documenter la preuve soutient sa défendabilité légale.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Reboot immediately to remove all malicious processes',
          fr: 'Redémarrer immédiatement pour retirer tous les processus malveillants',
        },
        correct: false,
        explanation: {
          en: 'A reboot may interrupt processes but destroys volatile evidence and does not ensure persistence or attacker access is removed.',
          fr: 'Un redémarrage peut interrompre des processus, mais détruit des preuves volatiles et ne garantit pas le retrait de la persistance ou de l’accès adverse.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Perform a tabletop exercise with executives',
          fr: 'Organiser un exercice sur table avec les responsables',
        },
        correct: false,
        explanation: {
          en: 'A tabletop prepares decision-makers before incidents. The situation requires immediate evidence preservation during a live investigation.',
          fr: 'Un exercice sur table prépare les décideurs avant les incidents. La situation exige une préservation immédiate de preuve durant une investigation active.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Update the playbook after recovery is complete',
          fr: 'Mettre à jour le guide opératoire après la reprise',
        },
        correct: false,
        explanation: {
          en: 'Playbook improvement may follow lessons learned, but it does not address the urgent risk of losing volatile evidence now.',
          fr: 'L’amélioration du guide peut suivre le retour d’expérience, mais ne traite pas le risque urgent de perdre la preuve volatile maintenant.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-013',
    objective: '4.8',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which activity occurs after containment and eradication to return an organisation to normal, trusted operation?',
      fr: 'Quelle activité intervient après confinement et éradication afin de ramener l’organisation à un fonctionnement normal et fiable ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Recovery', fr: 'La reprise' },
        correct: true,
        explanation: {
          en: 'Recovery restores services, validates their trusted state, and often applies heightened monitoring for signs of recurrence.',
          fr: 'La reprise restaure les services, valide leur état fiable et applique souvent une surveillance renforcée pour détecter une récidive.',
        },
      },
      {
        id: 'b',
        text: { en: 'Preparation', fr: 'La préparation' },
        correct: false,
        explanation: {
          en: 'Preparation builds plans, roles, and tools before an event. It does not restore systems after a confirmed compromise.',
          fr: 'La préparation construit plans, rôles et outils avant un événement. Elle ne restaure pas les systèmes après une compromission confirmée.',
        },
      },
      {
        id: 'c',
        text: { en: 'Threat hunting', fr: 'La traque des menaces' },
        correct: false,
        explanation: {
          en: 'Threat hunting seeks hidden activity and can support investigation, but it is not the phase that returns a service to operation.',
          fr: 'La traque recherche une activité cachée et peut soutenir l’investigation, mais elle ne remet pas un service en fonctionnement.',
        },
      },
      {
        id: 'd',
        text: { en: 'Evidence acquisition', fr: 'L’acquisition de preuves' },
        correct: false,
        explanation: {
          en: 'Evidence acquisition supports forensics and may precede disruptive actions. It does not itself validate restored business services.',
          fr: 'L’acquisition de preuves soutient l’informatique légale et peut précéder des actions perturbatrices. Elle ne valide pas elle-même les services restaurés.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-014',
    objective: '4.8',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'After an incident, a team determines that a valid account was misused because access reviews had not been performed. What should the team do with this finding?',
      fr: 'Après un incident, une équipe détermine qu’un compte valide a été utilisé abusivement car les revues d’accès n’avaient pas été réalisées. Que doit-elle faire de ce constat ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Use it to drive corrective actions in root cause analysis',
          fr: 'L’utiliser pour guider les actions correctives de l’analyse de cause racine',
        },
        correct: true,
        explanation: {
          en: 'The missed access review is an enabling control failure. Root cause analysis turns such findings into prevention or risk-reduction actions.',
          fr: 'La revue d’accès manquée est une défaillance de contrôle ayant permis l’incident. L’analyse de cause racine transforme ce constat en action préventive ou réductrice de risque.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Classify it only as a chain-of-custody transfer',
          fr: 'Le classer uniquement comme transfert de chaîne de possession',
        },
        correct: false,
        explanation: {
          en: 'Chain of custody records who handled evidence. A missed access review is a process weakness, not an evidence-transfer record.',
          fr: 'La chaîne de possession enregistre qui a manipulé la preuve. Une revue d’accès manquée est une faiblesse de processus, non un transfert de preuve.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Ignore it because the account was technically valid',
          fr: 'L’ignorer car le compte était techniquement valide',
        },
        correct: false,
        explanation: {
          en: 'A valid account can still be abused. Ignoring the review failure leaves the same enabling condition in place for recurrence.',
          fr: 'Un compte valide peut tout de même être abusé. Ignorer l’échec de revue laisse en place la condition ayant permis une récidive.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Use it as a substitute for testing the response plan',
          fr: 'L’utiliser comme substitut au test du plan de réponse',
        },
        correct: false,
        explanation: {
          en: 'A root-cause finding identifies an improvement need, but exercises are still required to test roles, procedures, and tools.',
          fr: 'Un constat de cause racine identifie un besoin d’amélioration, mais des exercices restent nécessaires pour tester rôles, procédures et outils.',
        },
      },
    ],
  },
  {
    id: 'q-4-8-015',
    objective: '4.8',
    kind: 'scenario',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'A response team has removed malware from a server. Which actions help establish that recovery is appropriate? (Select two.)',
      fr: 'Une équipe a retiré le logiciel malveillant d’un serveur. Quelles actions aident à établir que la reprise est appropriée ? (Sélectionne deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Validate the restored service with its business owner',
          fr: 'Valider le service restauré avec son propriétaire métier',
        },
        correct: true,
        explanation: {
          en: 'Recovery must establish that the service works as needed by the business, not merely that the malware process is absent.',
          fr: 'La reprise doit établir que le service répond aux besoins métier, pas seulement que le processus malveillant a disparu.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Use heightened monitoring for signs of recurrence',
          fr: 'Utiliser une surveillance renforcée pour détecter une récidive',
        },
        correct: true,
        explanation: {
          en: 'Post-recovery monitoring helps confirm that attacker activity does not return after services are placed back into operation.',
          fr: 'La surveillance après reprise aide à confirmer que l’activité adverse ne revient pas après remise des services en fonctionnement.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Skip validation because eradication always guarantees a clean state',
          fr: 'Éviter la validation car l’éradication garantit toujours un état sain',
        },
        correct: false,
        explanation: {
          en: 'Eradication reduces the threat but cannot guarantee every service dependency or hidden access path has been correctly addressed.',
          fr: 'L’éradication réduit la menace mais ne peut garantir que chaque dépendance de service ou accès caché a été correctement traité.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Begin a tabletop exercise instead of restoring the service',
          fr: 'Commencer un exercice sur table au lieu de restaurer le service',
        },
        correct: false,
        explanation: {
          en: 'A tabletop is a preparation and testing activity. It cannot substitute for actual restoration and validation of a disrupted service.',
          fr: 'Un exercice sur table relève de la préparation et du test. Il ne remplace pas la restauration et la validation réelles d’un service perturbé.',
        },
      },
    ],
  },
];
