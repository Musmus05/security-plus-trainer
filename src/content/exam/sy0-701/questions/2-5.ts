import type { Question } from '@/content/schemas';

/**
 * Objective 2.5 — Explain the purpose of mitigation techniques used to secure the enterprise.
 *
 * Every question is **original**, written from the published objective. None reproduces,
 * paraphrases, or reconstructs any real exam item — see NOTICE.md.
 *
 * Every distractor here is a real, useful control applied to the wrong defect. That is deliberate:
 * this objective is the mirror of 2.3, and the failure it punishes is reaching for a good control
 * rather than the matching one. Encryption appears as a wrong answer more than once, because it is
 * the control learners reach for when the problem is authorised-but-unwanted access.
 */
export const QUESTIONS_2_5: Question[] = [
  {
    id: 'q-2-5-001',
    objective: '2.5',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'SQL injection against a web application exfiltrates a customer table. The database was already encrypted at rest. Why did that not help, and what would?',
      fr: 'Une injection SQL contre une application web exfiltre une table clients. La base était déjà chiffrée au repos. Pourquoi cela n’a-t-il pas aidé, et qu’est-ce qui aurait aidé ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The query was legitimate, so it received decrypted data; input validation was needed',
          fr: 'La requête était légitime, donc elle a reçu des données déchiffrées ; il fallait valider les entrées',
        },
        correct: true,
        explanation: {
          en: 'Encryption at rest protects against someone reading the files directly. An injected query travels the application’s own authorised path, and the database decrypts for it as it would for anything else.',
          fr: 'Le chiffrement au repos protège contre la lecture directe des fichiers. Une requête injectée emprunte le chemin autorisé de l’application, et la base déchiffre pour elle comme pour n’importe quoi d’autre.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The encryption key was too short; a longer key would have prevented it',
          fr: 'La clé était trop courte ; une clé plus longue l’aurait empêché',
        },
        correct: false,
        explanation: {
          en: 'No key was attacked. Key length is irrelevant when the system decrypts voluntarily for an authorised request.',
          fr: 'Aucune clé n’a été attaquée. La longueur de clé est sans objet quand le système déchiffre volontairement pour une requête autorisée.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Encryption in transit was missing',
          fr: 'Le chiffrement en transit manquait',
        },
        correct: false,
        explanation: {
          en: 'Transit encryption would protect the data from an observer on the wire. It does nothing about the application handing the data over on request.',
          fr: 'Le chiffrement en transit protégerait la donnée d’un observateur sur le réseau. Il n’empêche pas l’application de remettre la donnée sur demande.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Monitoring would have stopped the query',
          fr: 'La surveillance aurait arrêté la requête',
        },
        correct: false,
        explanation: {
          en: 'Monitoring is detective. It would have told you afterwards, which matters, but it stops nothing at the moment of the request.',
          fr: 'La surveillance est détective. Elle aurait informé après coup, ce qui compte, mais elle n’arrête rien au moment de la requête.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-002',
    objective: '2.5',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'What is the difference between segmentation and isolation?',
      fr: 'Quelle est la différence entre segmentation et isolation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Segmentation limits communication between zones; isolation removes it',
          fr: 'La segmentation limite la communication entre zones ; l’isolation la supprime',
        },
        correct: true,
        explanation: {
          en: 'Segmented zones still talk, under rules. An isolated system does not, which is why isolation is the answer for a legacy machine and segmentation for a corporate network.',
          fr: 'Des zones segmentées communiquent encore, sous conditions. Un système isolé ne communique plus, d’où l’isolation pour une machine héritée et la segmentation pour un réseau d’entreprise.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Segmentation is physical; isolation is logical',
          fr: 'La segmentation est physique ; l’isolation est logique',
        },
        correct: false,
        explanation: {
          en: 'Both can be either. A VLAN segments logically and an air gap isolates physically, and the reverse exists too.',
          fr: 'Les deux peuvent être l’un ou l’autre. Un VLAN segmente logiquement et une coupure physique isole matériellement, et l’inverse existe aussi.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Segmentation applies to users; isolation to systems',
          fr: 'La segmentation s’applique aux utilisateurs ; l’isolation aux systèmes',
        },
        correct: false,
        explanation: {
          en: 'Both apply to network reachability. Restricting what users may do is access control and least privilege, which are separate techniques.',
          fr: 'Les deux portent sur l’atteignabilité réseau. Restreindre ce que peuvent faire les utilisateurs relève du contrôle d’accès et du moindre privilège, techniques distinctes.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'They are the same technique at different scales',
          fr: 'C’est la même technique à des échelles différentes',
        },
        correct: false,
        explanation: {
          en: 'Scale is not the difference; permitted communication is. An isolated zone of fifty machines is still isolated.',
          fr: 'La différence n’est pas l’échelle mais la communication autorisée. Une zone isolée de cinquante machines reste isolée.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-003',
    objective: '2.5',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'Ransomware compromises one workstation and reaches file servers in three other departments within an hour. Which mitigation would most have limited the damage?',
      fr: 'Un rançongiciel compromet un poste et atteint les serveurs de fichiers de trois autres services en une heure. Quelle atténuation aurait le plus limité les dégâts ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Segmentation', fr: 'La segmentation' },
        correct: true,
        explanation: {
          en: 'The damage came from lateral reach, not from the initial infection. Segmentation is the control that stops one compromised host from touching three departments.',
          fr: 'Le dommage vient de la portée latérale, pas de l’infection initiale. La segmentation est le contrôle qui empêche un poste compromis d’atteindre trois services.',
        },
      },
      {
        id: 'b',
        text: { en: 'Encryption at rest', fr: 'Le chiffrement au repos' },
        correct: false,
        explanation: {
          en: 'Ransomware encrypts data that is already decrypted for authorised use. Encrypting it first changes nothing about being able to encrypt it again.',
          fr: 'Un rançongiciel chiffre des données déjà déchiffrées pour un usage autorisé. Les chiffrer au préalable ne change rien à la possibilité de les rechiffrer.',
        },
      },
      {
        id: 'c',
        text: { en: 'Monitoring', fr: 'La surveillance' },
        correct: false,
        explanation: {
          en: 'Monitoring would have shortened the response time, which is worth having. It would not have prevented the spread that had already happened when it alerted.',
          fr: 'La surveillance aurait raccourci le délai de réaction, ce qui est appréciable. Elle n’aurait pas empêché une propagation déjà survenue au moment de l’alerte.',
        },
      },
      {
        id: 'd',
        text: { en: 'Patching', fr: 'L’application de correctifs' },
        correct: false,
        explanation: {
          en: 'It may have prevented the initial infection if a known vulnerability was used. The question asks what limits the damage once inside, which is a containment question.',
          fr: 'Cela aurait pu empêcher l’infection initiale si une vulnérabilité connue avait servi. La question porte sur la limitation des dégâts une fois à l’intérieur : un problème de confinement.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-004',
    objective: '2.5',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A hardening baseline is applied to servers, and within weeks several have drifted back to insecure settings. Which technique addresses this?',
      fr: 'Une configuration de durcissement est appliquée à des serveurs, et en quelques semaines plusieurs sont revenus à des réglages non sécurisés. Quelle technique répond à cela ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Configuration enforcement', fr: 'L’application de configuration' },
        correct: true,
        explanation: {
          en: 'Enforcement reapplies the intended state continuously, so drift is corrected rather than merely discovered. A baseline applied once is a snapshot, not a control.',
          fr: 'L’application réimpose l’état voulu en continu : la dérive est corrigée et non simplement constatée. Une configuration appliquée une fois est un instantané, pas un contrôle.',
        },
      },
      {
        id: 'b',
        text: { en: 'Patching', fr: 'L’application de correctifs' },
        correct: false,
        explanation: {
          en: 'Patching changes software versions. Nothing here is out of date; settings are changing back.',
          fr: 'Les correctifs modifient des versions logicielles. Rien ici n’est obsolète : ce sont les réglages qui reviennent en arrière.',
        },
      },
      {
        id: 'c',
        text: { en: 'Monitoring', fr: 'La surveillance' },
        correct: false,
        explanation: {
          en: 'Monitoring would report the drift, which is genuinely useful, and somebody would still have to fix it every time. Enforcement removes that loop.',
          fr: 'La surveillance signalerait la dérive, ce qui est réellement utile, et quelqu’un devrait tout de même la corriger à chaque fois. L’application supprime cette boucle.',
        },
      },
      {
        id: 'd',
        text: { en: 'Least privilege', fr: 'Le moindre privilège' },
        correct: false,
        explanation: {
          en: 'It would reduce who can change the settings, which helps at the margin. It does not restore a setting that has already changed.',
          fr: 'Il réduirait le nombre de personnes pouvant modifier les réglages, ce qui aide à la marge. Il ne restaure pas un réglage déjà modifié.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-005',
    objective: '2.5',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An industrial control system runs software whose vendor no longer exists. It cannot be replaced this year. Which mitigation applies?',
      fr: 'Un système de contrôle industriel exécute un logiciel dont l’éditeur n’existe plus. Il ne peut pas être remplacé cette année. Quelle atténuation s’applique ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Isolation, with compensating controls around it',
          fr: 'L’isolation, avec des contrôles compensatoires autour',
        },
        correct: true,
        explanation: {
          en: 'With no patch possible, the only lever left is reducing what can reach it. Isolation plus tighter monitoring and filtering is the standard treatment for unpatchable systems.',
          fr: 'Aucun correctif n’étant possible, le seul levier restant est de réduire ce qui peut l’atteindre. Isolation, surveillance renforcée et filtrage sont le traitement standard des systèmes non corrigeables.',
        },
      },
      {
        id: 'b',
        text: { en: 'Patching', fr: 'L’application de correctifs' },
        correct: false,
        explanation: {
          en: 'There is no vendor and therefore no patch. This is the answer the scenario is written to exclude.',
          fr: 'Il n’y a plus d’éditeur, donc pas de correctif. C’est la réponse que le scénario est écrit pour exclure.',
        },
      },
      {
        id: 'c',
        text: { en: 'Decommissioning', fr: 'Le démantèlement' },
        correct: false,
        explanation: {
          en: 'The permanent answer, and the stem rules it out for this year. Mitigation has to work under the constraint given.',
          fr: 'La réponse définitive, et l’énoncé l’exclut pour cette année. L’atténuation doit fonctionner sous la contrainte donnée.',
        },
      },
      {
        id: 'd',
        text: { en: 'Encryption', fr: 'Le chiffrement' },
        correct: false,
        explanation: {
          en: 'Encryption protects data confidentiality. It does nothing about a vulnerable service accepting a connection and executing something.',
          fr: 'Le chiffrement protège la confidentialité des données. Il n’empêche pas un service vulnérable d’accepter une connexion et d’exécuter quelque chose.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-006',
    objective: '2.5',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What does monitoring contribute as a mitigation technique?',
      fr: 'Qu’apporte la surveillance en tant que technique d’atténuation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Detection and reconstruction after the fact',
          fr: 'La détection et la reconstitution après coup',
        },
        correct: true,
        explanation: {
          en: 'It is a detective control in the sense of objective 1.1. Its value is shortening how long an intrusion goes unnoticed, not stopping it.',
          fr: 'C’est un contrôle détectif au sens de l’objectif 1.1. Sa valeur est de raccourcir la durée pendant laquelle une intrusion passe inaperçue, pas de l’arrêter.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Prevention of unauthorised access',
          fr: 'La prévention des accès non autorisés',
        },
        correct: false,
        explanation: {
          en: 'Watching a door does not lock it. Prevention comes from access control, least privilege and segmentation.',
          fr: 'Regarder une porte ne la verrouille pas. La prévention vient du contrôle d’accès, du moindre privilège et de la segmentation.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Automatic correction of misconfiguration',
          fr: 'La correction automatique des mauvaises configurations',
        },
        correct: false,
        explanation: {
          en: 'That is configuration enforcement. Monitoring reports the drift and leaves the fixing to something else.',
          fr: 'C’est l’application de configuration. La surveillance signale la dérive et laisse la correction à autre chose.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Reduction of the attack surface',
          fr: 'La réduction de la surface d’attaque',
        },
        correct: false,
        explanation: {
          en: 'Monitoring adds visibility without removing a single path. Disabling ports and removing software are what reduce surface.',
          fr: 'La surveillance ajoute de la visibilité sans supprimer un seul chemin. Ce sont la désactivation de ports et le retrait de logiciels qui réduisent la surface.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-007',
    objective: '2.5',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'Users keep installing unapproved software, some of which turns out to be malicious. Which mitigation directly addresses this?',
      fr: 'Des utilisateurs installent régulièrement des logiciels non approuvés, dont certains s’avèrent malveillants. Quelle atténuation traite directement ce problème ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'An application allow list', fr: 'Une liste d’autorisation d’applications' },
        correct: true,
        explanation: {
          en: 'Only approved software executes, so an unapproved installer simply does not run. Deny-by-default is what makes it work against software nobody has catalogued.',
          fr: 'Seuls les logiciels approuvés s’exécutent : un installeur non approuvé ne démarre tout simplement pas. Le refus par défaut est ce qui la rend efficace contre des logiciels non répertoriés.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Antivirus with an updated signature database',
          fr: 'Un antivirus à la base de signatures à jour',
        },
        correct: false,
        explanation: {
          en: 'It catches known malware and misses the rest, including anything merely unapproved. Allow-listing does not need to recognise the software to refuse it.',
          fr: 'Il attrape les malwares connus et laisse passer le reste, y compris tout ce qui est simplement non approuvé. La liste d’autorisation n’a pas besoin de reconnaître le logiciel pour le refuser.',
        },
      },
      {
        id: 'c',
        text: { en: 'Encryption', fr: 'Le chiffrement' },
        correct: false,
        explanation: {
          en: 'Encryption has no bearing on which programs are allowed to execute. It protects data, not execution.',
          fr: 'Le chiffrement n’a aucun effet sur les programmes autorisés à s’exécuter. Il protège des données, pas une exécution.',
        },
      },
      {
        id: 'd',
        text: { en: 'Segmentation', fr: 'La segmentation' },
        correct: false,
        explanation: {
          en: 'It would contain the consequences, which is valuable. The stem asks what stops the installation, not what limits its blast radius.',
          fr: 'Elle contiendrait les conséquences, ce qui a de la valeur. L’énoncé demande ce qui empêche l’installation, pas ce qui en limite la portée.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-008',
    objective: '2.5',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Why is least privilege effective against threats as different as stolen credentials, insider misuse and zero-day exploitation?',
      fr: 'Pourquoi le moindre privilège est-il efficace contre des menaces aussi différentes que le vol d’identifiants, l’abus interne et l’exploitation d’un jour zéro ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It bounds the consequences without needing to know how the access was obtained',
          fr: 'Il borne les conséquences sans avoir besoin de savoir comment l’accès a été obtenu',
        },
        correct: true,
        explanation: {
          en: 'Each of those threats ends with somebody acting under an identity. Limiting what that identity can reach constrains all three, which is why it is so often the right answer.',
          fr: 'Chacune de ces menaces se termine par quelqu’un agissant sous une identité. Limiter ce que cette identité peut atteindre les contraint toutes les trois, d’où sa fréquence comme bonne réponse.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It prevents the initial compromise in all three cases',
          fr: 'Il empêche la compromission initiale dans les trois cas',
        },
        correct: false,
        explanation: {
          en: 'It prevents none of them. The credential is still stolen and the exploit still lands; what changes is how far either gets.',
          fr: 'Il n’en empêche aucune. L’identifiant est tout de même volé et l’exploitation aboutit tout de même ; ce qui change est la portée atteinte.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It detects abnormal behaviour by privileged accounts',
          fr: 'Il détecte les comportements anormaux des comptes privilégiés',
        },
        correct: false,
        explanation: {
          en: 'Detection is monitoring. Least privilege is preventive, and it works silently — nothing reports that an attack was contained.',
          fr: 'La détection relève de la surveillance. Le moindre privilège est préventif et agit silencieusement : rien ne signale qu’une attaque a été contenue.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It removes the need for access control',
          fr: 'Il rend le contrôle d’accès inutile',
        },
        correct: false,
        explanation: {
          en: 'It is a principle applied through access control, not a replacement for it. Without a mechanism to enforce it, it is only an intention.',
          fr: 'C’est un principe mis en œuvre par le contrôle d’accès, pas un substitut. Sans mécanisme pour l’appliquer, ce n’est qu’une intention.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-009',
    objective: '2.5',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An asset review finds a server that stopped serving its application two years ago but is still powered, on the network, and holding old data. What should happen?',
      fr: 'Une revue d’inventaire découvre un serveur qui n’héberge plus son application depuis deux ans, mais reste alimenté, connecté au réseau et porteur d’anciennes données. Que faut-il faire ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Decommission it properly', fr: 'Le démanteler correctement' },
        correct: true,
        explanation: {
          en: 'It is pure attack surface with no benefit, and almost certainly the least monitored host on the network. Decommissioning is the only technique that removes a risk permanently.',
          fr: 'C’est de la surface d’attaque pure sans bénéfice, et presque certainement l’hôte le moins surveillé du réseau. Le démantèlement est la seule technique qui supprime définitivement un risque.',
        },
      },
      {
        id: 'b',
        text: { en: 'Power it off and leave it racked', fr: 'L’éteindre et le laisser en baie' },
        correct: false,
        explanation: {
          en: 'Off is not decommissioned. Its accounts, DNS entries and firewall rules survive, and switching it on later brings back two years of missing patches.',
          fr: 'Éteint n’est pas démantelé. Ses comptes, entrées DNS et règles de pare-feu survivent, et le rallumer plus tard ramène deux ans de correctifs manquants.',
        },
      },
      {
        id: 'c',
        text: { en: 'Apply the outstanding patches', fr: 'Appliquer les correctifs en attente' },
        correct: false,
        explanation: {
          en: 'Maintaining a machine nobody needs spends effort to keep a risk alive. The right move is to remove the machine, not to secure it.',
          fr: 'Maintenir une machine dont personne n’a besoin dépense de l’effort pour garder un risque en vie. Le bon geste est de retirer la machine, pas de la sécuriser.',
        },
      },
      {
        id: 'd',
        text: { en: 'Encrypt the old data', fr: 'Chiffrer les anciennes données' },
        correct: false,
        explanation: {
          en: 'It protects one asset on a host that should not exist, and leaves the host itself as a foothold. Treating the symptom rather than the cause.',
          fr: 'Cela protège un actif sur un hôte qui ne devrait pas exister et laisse l’hôte lui-même comme point d’appui. C’est traiter le symptôme plutôt que la cause.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-010',
    objective: '2.5',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which hardening measure directly reduces the attack surface?',
      fr: 'Quelle mesure de durcissement réduit directement la surface d’attaque ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Disabling unused ports and protocols',
          fr: 'Désactiver les ports et protocoles inutilisés',
        },
        correct: true,
        explanation: {
          en: 'Each listening port is a reachable path, so removing one removes a path. This is the same distinction the attack surface section of 2.2 makes.',
          fr: 'Chaque port à l’écoute est un chemin atteignable : en supprimer un supprime un chemin. C’est la distinction que fait la partie surface d’attaque de 2.2.',
        },
      },
      {
        id: 'b',
        text: { en: 'Installing endpoint protection', fr: 'Installer une protection des postes' },
        correct: false,
        explanation: {
          en: 'It adds a guard on the paths that remain, and it is itself more software running. Useful, but not a reduction.',
          fr: 'Elle ajoute un garde sur les chemins restants, et constitue elle-même du logiciel supplémentaire. Utile, mais pas une réduction.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Enabling full-disk encryption',
          fr: 'Activer le chiffrement de disque entier',
        },
        correct: false,
        explanation: {
          en: 'It protects data at rest and removes no path. A running system with an open port is exactly as reachable encrypted as not.',
          fr: 'Il protège la donnée au repos et ne supprime aucun chemin. Un système démarré avec un port ouvert est aussi atteignable chiffré que non chiffré.',
        },
      },
      {
        id: 'd',
        text: { en: 'Turning on host-based logging', fr: 'Activer la journalisation locale' },
        correct: false,
        explanation: {
          en: 'Logging adds visibility, which is detective. Nothing about it closes a way in.',
          fr: 'La journalisation ajoute de la visibilité, ce qui est détectif. Rien là-dedans ne ferme une voie d’entrée.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-011',
    objective: '2.5',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which problem does patching NOT solve?',
      fr: 'Quel problème les correctifs ne résolvent-ils PAS ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A service left publicly accessible by an administrator',
          fr: 'Un service laissé publiquement accessible par un administrateur',
        },
        correct: true,
        explanation: {
          en: 'The software is working as designed, so there is nothing to patch. Misconfiguration is answered by hardening and configuration enforcement.',
          fr: 'Le logiciel fonctionne comme prévu : il n’y a rien à corriger. La mauvaise configuration se traite par le durcissement et l’application de configuration.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A published vulnerability in a web framework',
          fr: 'Une vulnérabilité publiée dans un cadriciel web',
        },
        correct: false,
        explanation: {
          en: 'This is exactly what patching is for: a known defect with a fix available.',
          fr: 'C’est précisément l’objet des correctifs : un défaut connu pour lequel une correction existe.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A kernel flaw allowing privilege escalation',
          fr: 'Une faille du noyau permettant une élévation de privilèges',
        },
        correct: false,
        explanation: {
          en: 'A code defect with a vendor fix — squarely a patching case, once the restart from 1.3 is remembered.',
          fr: 'Un défaut de code avec une correction éditeur : cas typique de correctif, à condition de ne pas oublier le redémarrage vu en 1.3.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'An outdated library in a shipped application',
          fr: 'Une bibliothèque obsolète dans une application livrée',
        },
        correct: false,
        explanation: {
          en: 'Updating the dependency is patching. That it lives inside your own build changes who applies it, not the technique.',
          fr: 'Mettre à jour la dépendance est un correctif. Qu’elle se trouve dans ta propre compilation change qui l’applique, pas la technique.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-012',
    objective: '2.5',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A consultant’s laptop containing client files is stolen from a car while powered off. Which mitigation protected the data?',
      fr: 'Le portable d’un consultant contenant des fichiers clients est volé dans une voiture, éteint. Quelle atténuation a protégé les données ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Full-disk encryption', fr: 'Le chiffrement de disque entier' },
        correct: true,
        explanation: {
          en: 'Powered off is the exact condition where disk encryption works: the key is not in memory, so the disk is unreadable without the credential.',
          fr: 'Éteint est précisément la condition où le chiffrement de disque agit : la clé n’est pas en mémoire, donc le disque est illisible sans l’identifiant.',
        },
      },
      {
        id: 'b',
        text: { en: 'Segmentation', fr: 'La segmentation' },
        correct: false,
        explanation: {
          en: 'Segmentation governs network reachability. A stolen laptop is off your network entirely.',
          fr: 'La segmentation régit l’atteignabilité réseau. Un portable volé est entièrement hors de ton réseau.',
        },
      },
      {
        id: 'c',
        text: { en: 'A host-based firewall', fr: 'Un pare-feu local' },
        correct: false,
        explanation: {
          en: 'A firewall filters connections. The thief has the physical disk and does not need to connect to anything.',
          fr: 'Un pare-feu filtre des connexions. Le voleur détient le disque physique et n’a besoin de se connecter à rien.',
        },
      },
      {
        id: 'd',
        text: { en: 'Monitoring', fr: 'La surveillance' },
        correct: false,
        explanation: {
          en: 'Monitoring is detective, and there is nothing left to observe once the machine is gone.',
          fr: 'La surveillance est détective, et il n’y a plus rien à observer une fois la machine partie.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-013',
    objective: '2.5',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Why is encryption so often the wrong answer on this objective despite almost always being good practice?',
      fr: 'Pourquoi le chiffrement est-il si souvent la mauvaise réponse dans cet objectif, alors qu’il constitue presque toujours une bonne pratique ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It does not help when access is authorised but unwanted',
          fr: 'Il n’aide pas quand l’accès est autorisé mais indésirable',
        },
        correct: true,
        explanation: {
          en: 'Anything travelling a legitimate path receives decrypted data — an injected query, a compromised account, ransomware running as the user. Those are most of the scenarios here.',
          fr: 'Tout ce qui emprunte un chemin légitime reçoit des données déchiffrées : une requête injectée, un compte compromis, un rançongiciel s’exécutant sous l’utilisateur. C’est le cas de la plupart des scénarios.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It is too slow for enterprise use',
          fr: 'Il est trop lent pour un usage en entreprise',
        },
        correct: false,
        explanation: {
          en: 'Performance is a non-issue with modern hardware acceleration, and it would be an implementation objection rather than a reason it fits the wrong problems.',
          fr: 'La performance n’est pas un problème avec l’accélération matérielle actuelle, et ce serait une objection de mise en œuvre, pas une raison d’inadéquation au problème.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It only works on data in transit',
          fr: 'Il ne fonctionne que sur les données en transit',
        },
        correct: false,
        explanation: {
          en: 'It works at rest too, and full-disk encryption on a stolen laptop is exactly where it is the right answer.',
          fr: 'Il fonctionne aussi au repos, et le chiffrement de disque entier sur un portable volé est précisément le cas où il constitue la bonne réponse.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It prevents monitoring',
          fr: 'Il empêche la surveillance',
        },
        correct: false,
        explanation: {
          en: 'A real operational tension in some inspection scenarios, and not the reason encryption is a distractor here. The reason is the authorised path.',
          fr: 'Une tension opérationnelle réelle dans certains scénarios d’inspection, mais ce n’est pas la raison pour laquelle le chiffrement est un distracteur ici. La raison est le chemin autorisé.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-014',
    objective: '2.5',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What does decommissioning a system involve, beyond powering it down?',
      fr: 'Que suppose le démantèlement d’un système, au-delà de son extinction ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Removing access, wiping data, and deleting its DNS and firewall entries',
          fr: 'Retirer les accès, effacer les données, supprimer ses entrées DNS et de pare-feu',
        },
        correct: true,
        explanation: {
          en: 'Every trace that could let it be reached or restarted has to go. A machine merely switched off keeps its accounts, its records and its rules.',
          fr: 'Toute trace permettant de l’atteindre ou de le rallumer doit disparaître. Une machine simplement éteinte conserve ses comptes, ses enregistrements et ses règles.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Applying a final round of patches',
          fr: 'Appliquer une dernière série de correctifs',
        },
        correct: false,
        explanation: {
          en: 'Patching something you are removing spends effort on an asset that will not exist. The point is to end its lifecycle, not extend it.',
          fr: 'Corriger ce que l’on retire dépense de l’effort sur un actif qui n’existera plus. Le but est de clore son cycle de vie, pas de le prolonger.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Moving it to an isolated network segment',
          fr: 'Le déplacer dans un segment réseau isolé',
        },
        correct: false,
        explanation: {
          en: 'That is isolation, which keeps the system alive under constraint. Decommissioning ends it.',
          fr: 'C’est l’isolation, qui maintient le système en vie sous contrainte. Le démantèlement y met fin.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Encrypting its disks before storage',
          fr: 'Chiffrer ses disques avant stockage',
        },
        correct: false,
        explanation: {
          en: 'A reasonable step in a wider process and not the substance of it. The data should be destroyed, not preserved in a protected form.',
          fr: 'Une étape raisonnable dans un processus plus large, mais pas sa substance. Les données doivent être détruites, pas conservées sous forme protégée.',
        },
      },
    ],
  },

  {
    id: 'q-2-5-015',
    objective: '2.5',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A stolen service account credential is used to read every share in the company. Which mitigations would have limited this? (Select all that apply.)',
      fr: 'Un identifiant de compte de service volé sert à lire tous les partages de l’entreprise. Quelles atténuations auraient limité cela ? (Sélectionne toutes les réponses correctes.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: { en: 'Least privilege', fr: 'Le moindre privilège' },
        correct: true,
        explanation: {
          en: 'A service account that can read every share was over-privileged before it was stolen. Scoping it to what the service needs bounds the loss directly.',
          fr: 'Un compte de service capable de lire tous les partages était surdoté avant même d’être volé. Le limiter au strict nécessaire borne directement la perte.',
        },
      },
      {
        id: 'b',
        text: { en: 'Segmentation', fr: 'La segmentation' },
        correct: true,
        explanation: {
          en: 'Even a broadly privileged account can only use shares it can reach. Segmentation reduces the reachable set independently of the permissions.',
          fr: 'Même un compte très privilégié ne peut utiliser que les partages qu’il peut atteindre. La segmentation réduit l’ensemble atteignable indépendamment des permissions.',
        },
      },
      {
        id: 'c',
        text: { en: 'Encryption at rest', fr: 'Le chiffrement au repos' },
        correct: false,
        explanation: {
          en: 'The account is authorised to read, so the file server decrypts for it. This is the objective’s recurring trap.',
          fr: 'Le compte est autorisé à lire, donc le serveur de fichiers déchiffre pour lui. C’est le piège récurrent de cet objectif.',
        },
      },
      {
        id: 'd',
        text: { en: 'Monitoring', fr: 'La surveillance' },
        correct: false,
        explanation: {
          en: 'It would have shortened the discovery time, which matters a great deal in practice. The question asks what limits the access, and monitoring limits nothing.',
          fr: 'Elle aurait raccourci le délai de découverte, ce qui compte beaucoup en pratique. La question porte sur ce qui limite l’accès, et la surveillance ne limite rien.',
        },
      },
    ],
  },
];
