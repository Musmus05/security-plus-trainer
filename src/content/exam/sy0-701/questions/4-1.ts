import type { Question } from '@/content/schemas';

/** Original practice questions for objective 4.1, based only on the published outline. */
export const QUESTIONS_4_1: Question[] = [
  {
    id: 'q-4-1-001',
    objective: '4.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the primary purpose of a secure baseline?',
      fr: 'Quelle est la finalité première d’une configuration de référence sécurisée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Define an approved starting configuration for a class of assets',
          fr: 'Définir une configuration initiale approuvée pour une catégorie d’actifs',
        },
        correct: true,
        explanation: {
          en: 'A secure baseline documents the expected starting state for similar assets. It makes consistent deployment and later comparison possible.',
          fr: 'Une configuration de référence documente l’état initial attendu pour des actifs similaires. Elle permet un déploiement cohérent et une comparaison ultérieure.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Continuously detect suspicious activity on every asset',
          fr: 'Détecter continuellement une activité suspecte sur chaque actif',
        },
        correct: false,
        explanation: {
          en: 'Continuous detection is the purpose of monitoring. A baseline defines what normal configuration should be before monitoring evaluates deviations.',
          fr: 'La détection continue est la fonction de la surveillance. Une référence définit la configuration normale avant que la surveillance n’évalue les écarts.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Recover data after a failed software deployment',
          fr: 'Récupérer des données après un déploiement logiciel défaillant',
        },
        correct: false,
        explanation: {
          en: 'Recovery uses backups and recovery procedures. A baseline can help rebuild an asset, but it is not the mechanism that restores lost data.',
          fr: 'La récupération utilise des sauvegardes et des procédures de reprise. Une référence peut aider à reconstruire un actif, mais elle ne restaure pas les données perdues.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Authorize a user to access a protected application',
          fr: 'Autoriser un utilisateur à accéder à une application protégée',
        },
        correct: false,
        explanation: {
          en: 'Authorization decides what an authenticated identity may do. A secure baseline instead describes the approved configuration of the computing resource.',
          fr: 'L’autorisation décide ce qu’une identité authentifiée peut faire. Une référence sécurisée décrit plutôt la configuration approuvée de la ressource informatique.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-002',
    objective: '4.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A newly installed web server has an FTP service enabled even though the application never uses it. What is the best hardening action?',
      fr: 'Un nouveau serveur web a un service FTP activé, alors que l’application ne l’utilise jamais. Quelle action de renforcement convient le mieux ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Disable the unused FTP service', fr: 'Désactiver le service FTP inutilisé' },
        correct: true,
        explanation: {
          en: 'An unused network service adds attack surface without providing business value. Disabling it applies least functionality directly to the server.',
          fr: 'Un service réseau inutilisé ajoute une surface d’attaque sans valeur métier. Le désactiver applique directement la fonctionnalité minimale au serveur.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Place the web application in a sandbox',
          fr: 'Placer l’application web dans un bac à sable',
        },
        correct: false,
        explanation: {
          en: 'Sandboxing isolates untrusted execution. It does not remove an unnecessary listening service from the server, which is the exposure named here.',
          fr: 'Le bac à sable isole une exécution non fiable. Il ne retire pas un service d’écoute superflu du serveur, qui est l’exposition nommée ici.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Create a separate guest wireless network',
          fr: 'Créer un réseau sans fil invité distinct',
        },
        correct: false,
        explanation: {
          en: 'Guest segmentation protects visitors from internal resources. It has no effect on an unnecessary service listening on this web server.',
          fr: 'La segmentation des invités protège les visiteurs des ressources internes. Elle n’a aucun effet sur un service superflu à l’écoute sur ce serveur web.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Wipe the server remotely after deployment',
          fr: 'Effacer le serveur à distance après le déploiement',
        },
        correct: false,
        explanation: {
          en: 'Remote wipe addresses loss or retirement of a managed device. It is not an operational way to reduce one unnecessary server service.',
          fr: 'L’effacement à distance traite la perte ou le retrait d’un appareil géré. Ce n’est pas une méthode opérationnelle pour réduire un seul service serveur superflu.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-003',
    objective: '4.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which wireless setting provides the strongest direct protection against unauthorized network access?',
      fr: 'Quel réglage sans fil offre la protection directe la plus forte contre un accès réseau non autorisé ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Use WPA3 with strong authentication',
          fr: 'Utiliser WPA3 avec une authentification robuste',
        },
        correct: true,
        explanation: {
          en: 'WPA3 with strong authentication protects association to the wireless network. It directly controls who can join and protects the wireless connection.',
          fr: 'WPA3 avec une authentification robuste protège l’association au réseau sans fil. Il contrôle directement qui peut le rejoindre et protège la connexion radio.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Hide the SSID from normal broadcast',
          fr: 'Masquer le SSID de la diffusion normale',
        },
        correct: false,
        explanation: {
          en: 'Hiding an SSID is obscurity, not access control. The network can still be discovered and it does not authenticate a person attempting to connect.',
          fr: 'Masquer un SSID relève de l’obscurité, pas du contrôle d’accès. Le réseau reste détectable et cela n’authentifie pas une personne qui tente de se connecter.',
        },
      },
      {
        id: 'c',
        text: { en: 'Use a descriptive network name', fr: 'Utiliser un nom de réseau descriptif' },
        correct: false,
        explanation: {
          en: 'A network name helps users identify a network but supplies no encryption or authentication. It cannot prevent an unauthorized device from attempting access.',
          fr: 'Un nom de réseau aide les utilisateurs à identifier un réseau, mais ne fournit ni chiffrement ni authentification. Il ne peut pas empêcher une tentative d’accès non autorisée.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Move the access point to a higher shelf',
          fr: 'Déplacer le point d’accès sur une étagère plus haute',
        },
        correct: false,
        explanation: {
          en: 'Placement can affect coverage, but it is not a wireless authentication control. It does not establish who is permitted to use the network.',
          fr: 'L’emplacement peut modifier la couverture, mais ce n’est pas un contrôle d’authentification sans fil. Il ne détermine pas qui est autorisé à utiliser le réseau.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-004',
    objective: '4.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'Visitors need internet access in a company lobby but must not reach internal systems. Which solution best meets this requirement?',
      fr: 'Des visiteurs ont besoin d’un accès Internet dans le hall de l’entreprise, sans pouvoir atteindre les systèmes internes. Quelle solution répond le mieux à ce besoin ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Provide a segmented guest wireless network',
          fr: 'Fournir un réseau sans fil invité segmenté',
        },
        correct: true,
        explanation: {
          en: 'A segmented guest network can provide internet access while separating visitor traffic from internal resources. That directly addresses both requirements in the scenario.',
          fr: 'Un réseau invité segmenté peut fournir Internet tout en séparant le trafic visiteur des ressources internes. Il répond directement aux deux exigences du scénario.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Give visitors the employee wireless passphrase',
          fr: 'Donner aux visiteurs la phrase secrète du réseau employé',
        },
        correct: false,
        explanation: {
          en: 'Sharing the employee network credential grants visitors the same network path as employees. It removes the separation the requirement explicitly calls for.',
          fr: 'Partager l’identifiant du réseau employé donne aux visiteurs le même chemin réseau que les employés. Cela supprime la séparation explicitement requise.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Disable wireless encryption for easier access',
          fr: 'Désactiver le chiffrement sans fil pour simplifier l’accès',
        },
        correct: false,
        explanation: {
          en: 'Removing encryption makes radio traffic easier to intercept and does not separate guests from internal systems. Convenience would increase exposure on both counts.',
          fr: 'Retirer le chiffrement rend le trafic radio plus facile à intercepter et ne sépare pas les invités des systèmes internes. La commodité augmenterait l’exposition sur les deux plans.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Enable WPS for each visitor device',
          fr: 'Activer WPS pour chaque appareil visiteur',
        },
        correct: false,
        explanation: {
          en: 'WPS is an enrolment convenience feature, not a network segmentation mechanism. Enabling it would not create the required barrier to internal resources.',
          fr: 'WPS est une fonction pratique d’inscription, pas un mécanisme de segmentation réseau. Son activation ne créerait pas la barrière exigée vers les ressources internes.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-005',
    objective: '4.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the main security benefit of mobile device encryption?',
      fr: 'Quel est le principal bénéfice de sécurité du chiffrement d’un appareil mobile ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It protects stored data if the device is lost or stolen',
          fr: 'Il protège les données stockées si l’appareil est perdu ou volé',
        },
        correct: true,
        explanation: {
          en: 'Encryption protects data at rest by making stored content unreadable without the needed keys or authentication. It is especially valuable for portable devices.',
          fr: 'Le chiffrement protège les données au repos en rendant le contenu stocké illisible sans les clés ou l’authentification nécessaires. Il est particulièrement utile sur un appareil portable.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It prevents every malicious mobile application from running',
          fr: 'Il empêche toute application mobile malveillante de fonctionner',
        },
        correct: false,
        explanation: {
          en: 'Encryption protects stored data; it does not judge application behaviour. Application controls, allow lists, and monitoring address which software may run.',
          fr: 'Le chiffrement protège les données stockées ; il ne juge pas le comportement des applications. Les contrôles applicatifs, listes d’autorisation et la surveillance traitent les logiciels exécutables.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It separates personal and business applications',
          fr: 'Il sépare les applications personnelles et professionnelles',
        },
        correct: false,
        explanation: {
          en: 'A work container or profile creates that separation. Device encryption may protect both sets of data together, but it does not impose a boundary between them.',
          fr: 'Un conteneur ou profil professionnel crée cette séparation. Le chiffrement peut protéger les deux ensembles de données, mais il n’impose pas de frontière entre eux.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It remotely removes corporate data from a retired phone',
          fr: 'Il retire à distance les données professionnelles d’un téléphone retiré du service',
        },
        correct: false,
        explanation: {
          en: 'Remote wipe or selective wipe removes managed data. Encryption remains a protection for data stored on the device, not a command to erase it.',
          fr: 'L’effacement à distance ou sélectif retire les données gérées. Le chiffrement reste une protection des données stockées, pas une commande pour les effacer.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-006',
    objective: '4.1',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'An employee-owned phone is lost. The company needs to remove its email and documents but should preserve the employee’s personal photos. What is the best response?',
      fr: 'Un téléphone appartenant à un employé est perdu. L’entreprise doit retirer ses courriels et documents, tout en préservant les photos personnelles. Quelle est la meilleure réponse ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Perform a selective wipe of the managed work container',
          fr: 'Effectuer un effacement sélectif du conteneur professionnel géré',
        },
        correct: true,
        explanation: {
          en: 'A selective wipe removes corporate data from the managed area while preserving personal content. It fits the ownership model and the stated privacy requirement.',
          fr: 'Un effacement sélectif retire les données de l’entreprise de la zone gérée tout en préservant le contenu personnel. Il correspond au modèle de propriété et à l’exigence de confidentialité.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Perform a full device wipe immediately',
          fr: 'Effectuer immédiatement un effacement complet de l’appareil',
        },
        correct: false,
        explanation: {
          en: 'A full wipe may protect company data, but it also destroys the personal photos the scenario says should be preserved. It is disproportionate for this BYOD case.',
          fr: 'Un effacement complet peut protéger les données de l’entreprise, mais détruit aussi les photos que le scénario demande de préserver. Il est disproportionné dans ce cas BYOD.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Disable the employee’s office wireless account',
          fr: 'Désactiver le compte sans fil professionnel de l’employé',
        },
        correct: false,
        explanation: {
          en: 'Disabling wireless access limits future network association, but it does not remove already stored email or documents from the missing phone.',
          fr: 'Désactiver l’accès sans fil limite une association réseau future, mais ne retire pas les courriels ou documents déjà stockés sur le téléphone perdu.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Rebuild the phone from the mobile baseline',
          fr: 'Reconstruire le téléphone depuis la référence mobile',
        },
        correct: false,
        explanation: {
          en: 'Rebuilding is useful for a device returned to management, not for a lost employee-owned device. It cannot remove data from a phone that is unavailable.',
          fr: 'Reconstruire est utile pour un appareil revenu en gestion, pas pour un téléphone personnel perdu. Cela ne peut pas retirer les données d’un téléphone indisponible.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-007',
    objective: '4.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which statement best distinguishes sandboxing from application allow listing?',
      fr: 'Quel énoncé distingue le mieux le bac à sable de la liste d’autorisation d’applications ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Sandboxing isolates uncertain execution; allow listing permits only approved software',
          fr: 'Le bac à sable isole une exécution incertaine ; la liste d’autorisation ne permet que les logiciels approuvés',
        },
        correct: true,
        explanation: {
          en: 'A sandbox constrains behaviour of something that must be run or inspected. An allow list uses a deny-by-default policy to stop unapproved programs from starting.',
          fr: 'Un bac à sable contraint le comportement d’un élément à exécuter ou inspecter. Une liste d’autorisation applique un refus par défaut pour empêcher les programmes non approuvés de démarrer.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Sandboxing encrypts data; allow listing creates backups',
          fr: 'Le bac à sable chiffre les données ; la liste d’autorisation crée des sauvegardes',
        },
        correct: false,
        explanation: {
          en: 'Neither statement describes these controls. Encryption protects confidentiality and backups support recovery, while both named controls concern execution risk.',
          fr: 'Aucune de ces affirmations ne décrit ces contrôles. Le chiffrement protège la confidentialité et les sauvegardes soutiennent la reprise, alors que les deux contrôles portent sur le risque d’exécution.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Sandboxing hides a wireless network; allow listing authenticates users',
          fr: 'Le bac à sable masque un réseau sans fil ; la liste d’autorisation authentifie les utilisateurs',
        },
        correct: false,
        explanation: {
          en: 'Wireless visibility and user authentication are different layers. Sandboxing and application allow listing both operate on code or applications, not wireless association.',
          fr: 'La visibilité sans fil et l’authentification des utilisateurs relèvent de couches différentes. Le bac à sable et la liste d’autorisation opèrent sur du code ou des applications.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Sandboxing detects drift; allow listing patches an operating system',
          fr: 'Le bac à sable détecte la dérive ; la liste d’autorisation corrige un système d’exploitation',
        },
        correct: false,
        explanation: {
          en: 'Configuration monitoring detects drift, and patch management updates systems. The two controls in the question address whether and how software executes.',
          fr: 'La surveillance de configuration détecte la dérive, et la gestion des correctifs met à jour les systèmes. Les deux contrôles de la question traitent de l’exécution logicielle.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-008',
    objective: '4.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A security analyst must open a suspicious attachment to observe its behaviour without exposing ordinary employee workstations. Which technique is most appropriate?',
      fr: 'Un analyste doit ouvrir une pièce jointe suspecte pour observer son comportement sans exposer les postes ordinaires des employés. Quelle technique est la plus appropriée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Execute the attachment in a sandbox',
          fr: 'Exécuter la pièce jointe dans un bac à sable',
        },
        correct: true,
        explanation: {
          en: 'A sandbox supplies an isolated environment for executing untrusted content. It allows observation while reducing the attachment’s access to normal endpoints and data.',
          fr: 'Un bac à sable fournit un environnement isolé pour exécuter un contenu non fiable. Il permet l’observation tout en réduisant l’accès aux postes et données ordinaires.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Add the attachment to an application allow list',
          fr: 'Ajouter la pièce jointe à une liste d’autorisation d’applications',
        },
        correct: false,
        explanation: {
          en: 'Allow listing would explicitly permit the uncertain item to run, which is the opposite of a cautious analysis approach. It does not provide isolation.',
          fr: 'Une liste d’autorisation permettrait explicitement l’exécution de l’élément incertain, contraire à une analyse prudente. Elle ne fournit pas d’isolement.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Disable the office guest network',
          fr: 'Désactiver le réseau invité du bureau',
        },
        correct: false,
        explanation: {
          en: 'A guest network concerns separation of visitor connectivity. It does not control where a suspicious email attachment executes or what it can reach.',
          fr: 'Un réseau invité concerne la séparation de la connectivité des visiteurs. Il ne contrôle ni le lieu d’exécution d’une pièce jointe suspecte ni ce qu’elle peut atteindre.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Restore a workstation from its secure baseline',
          fr: 'Restaurer un poste depuis sa configuration de référence sécurisée',
        },
        correct: false,
        explanation: {
          en: 'A baseline can rebuild a workstation after an incident, but the analyst needs a safe place to execute the attachment now, before exposing a workstation.',
          fr: 'Une référence peut reconstruire un poste après incident, mais l’analyste a besoin maintenant d’un endroit sûr pour exécuter la pièce jointe, avant d’exposer un poste.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-009',
    objective: '4.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is configuration drift?',
      fr: 'Qu’est-ce que la dérive de configuration ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A resource moving away from its approved baseline',
          fr: 'Une ressource qui s’écarte de sa référence approuvée',
        },
        correct: true,
        explanation: {
          en: 'Configuration drift occurs when settings, software, or services no longer match the approved expected state. It may be intentional or unauthorized.',
          fr: 'La dérive de configuration survient lorsque réglages, logiciels ou services ne correspondent plus à l’état approuvé attendu. Elle peut être volontaire ou non autorisée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A wireless signal becoming weaker with distance',
          fr: 'Un signal sans fil qui devient plus faible avec la distance',
        },
        correct: false,
        explanation: {
          en: 'Radio attenuation is a coverage issue. Configuration drift concerns changes in the configuration state of a computing resource, not signal strength.',
          fr: 'L’atténuation radio est un problème de couverture. La dérive de configuration concerne les changements d’état d’une ressource informatique, pas la force du signal.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'An approved migration from one data center to another',
          fr: 'Une migration approuvée d’un centre de données vers un autre',
        },
        correct: false,
        explanation: {
          en: 'A documented and approved migration may alter the baseline deliberately. Drift describes an uncontrolled or unrecorded departure from the expected configuration.',
          fr: 'Une migration documentée et approuvée peut modifier délibérément la référence. La dérive décrit un écart non contrôlé ou non consigné par rapport à la configuration attendue.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A remote wipe command waiting for a phone to reconnect',
          fr: 'Une commande d’effacement à distance en attente de reconnexion du téléphone',
        },
        correct: false,
        explanation: {
          en: 'That is a limitation of remote management delivery. It says nothing about whether the phone’s configuration continues to match its approved policy.',
          fr: 'C’est une limite de livraison de la gestion à distance. Cela ne dit rien sur la conformité continue de la configuration du téléphone à sa politique approuvée.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-010',
    objective: '4.1',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A weekly report shows that a required endpoint security service has been disabled on several workstations. Which capability most directly identifies this issue?',
      fr: 'Un rapport hebdomadaire montre qu’un service de sécurité de point de terminaison obligatoire est désactivé sur plusieurs postes. Quelle capacité identifie le plus directement ce problème ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Configuration monitoring against the secure baseline',
          fr: 'La surveillance de configuration par rapport à la référence sécurisée',
        },
        correct: true,
        explanation: {
          en: 'The baseline defines that the service must be enabled, and configuration monitoring compares actual workstations with that expected state to find deviation.',
          fr: 'La référence exige que le service soit activé, et la surveillance de configuration compare les postes réels à cet état attendu pour trouver l’écart.',
        },
      },
      {
        id: 'b',
        text: { en: 'A guest wireless network', fr: 'Un réseau sans fil invité' },
        correct: false,
        explanation: {
          en: 'Guest wireless segmentation separates visitor traffic from internal systems. It does not inspect services running on managed workstations.',
          fr: 'La segmentation sans fil invitée sépare le trafic visiteur des systèmes internes. Elle n’inspecte pas les services exécutés sur des postes gérés.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Remote wipe for corporate phones',
          fr: 'L’effacement à distance des téléphones professionnels',
        },
        correct: false,
        explanation: {
          en: 'Remote wipe removes data from a missing mobile device. It cannot report that a security service on a workstation was disabled.',
          fr: 'L’effacement à distance retire les données d’un appareil mobile manquant. Il ne peut pas signaler la désactivation d’un service de sécurité sur un poste.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Sandbox analysis of email attachments',
          fr: 'L’analyse en bac à sable des pièces jointes',
        },
        correct: false,
        explanation: {
          en: 'Sandbox analysis observes untrusted files or code. The problem is a deviation in installed endpoint configuration, not an attachment awaiting analysis.',
          fr: 'L’analyse en bac à sable observe fichiers ou code non fiables. Le problème est un écart de configuration de point de terminaison, pas une pièce jointe à analyser.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-011',
    objective: '4.1',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which actions best harden a wireless access point? (Select two.)',
      fr: 'Quelles actions renforcent le mieux un point d’accès sans fil ? (Sélectionnez deux réponses.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: {
          en: 'Change the default administrative credentials',
          fr: 'Modifier les identifiants administratifs par défaut',
        },
        correct: true,
        explanation: {
          en: 'Default credentials are widely known or easily guessed. Replacing them limits unauthorized administration of the device that controls wireless access.',
          fr: 'Les identifiants par défaut sont largement connus ou faciles à deviner. Les remplacer limite l’administration non autorisée de l’appareil qui contrôle l’accès sans fil.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Keep access point firmware current',
          fr: 'Maintenir à jour le micrologiciel du point d’accès',
        },
        correct: true,
        explanation: {
          en: 'Current firmware addresses known weaknesses in the access point itself. It is a direct hardening measure for the device and its management functions.',
          fr: 'Un micrologiciel à jour traite les faiblesses connues du point d’accès lui-même. C’est une mesure de renforcement directe pour l’appareil et ses fonctions de gestion.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Publish the administrative password in the lobby',
          fr: 'Publier le mot de passe administratif dans le hall',
        },
        correct: false,
        explanation: {
          en: 'Publishing an administrative password allows anyone nearby to attempt privileged device access. It eliminates the protection that strong administrative credentials provide.',
          fr: 'Publier un mot de passe administratif permet à toute personne proche de tenter un accès privilégié à l’appareil. Cela annule la protection fournie par des identifiants robustes.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Use the employee network for every guest device',
          fr: 'Utiliser le réseau employé pour chaque appareil invité',
        },
        correct: false,
        explanation: {
          en: 'Putting guests on the employee network expands internal exposure. A hardened wireless deployment separates guest access rather than combining the two populations.',
          fr: 'Placer les invités sur le réseau employé accroît l’exposition interne. Un déploiement sans fil renforcé sépare les accès invités au lieu de mélanger les populations.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-012',
    objective: '4.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A business application runs under an account that can modify every database in the company, although it needs only one database. What should be changed first?',
      fr: 'Une application métier s’exécute sous un compte pouvant modifier toutes les bases de données de l’entreprise, alors qu’elle n’en nécessite qu’une. Que faut-il changer en premier ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Restrict the application service account to the required database privileges',
          fr: 'Restreindre le compte de service de l’application aux privilèges requis sur la base nécessaire',
        },
        correct: true,
        explanation: {
          en: 'Restricting the service account applies least privilege to the application. It reduces the impact if the application or its credentials are compromised.',
          fr: 'Restreindre le compte de service applique le moindre privilège à l’application. Cela réduit l’impact si l’application ou ses identifiants sont compromis.',
        },
      },
      {
        id: 'b',
        text: { en: 'Hide the wireless network name', fr: 'Masquer le nom du réseau sans fil' },
        correct: false,
        explanation: {
          en: 'SSID hiding concerns wireless discoverability and does not change database permissions. The exposure in the scenario is excessive application authorization.',
          fr: 'Le masquage du SSID concerne la découvrabilité sans fil et ne modifie pas les permissions de base de données. L’exposition est une autorisation applicative excessive.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Place every employee phone in a work container',
          fr: 'Placer chaque téléphone employé dans un conteneur professionnel',
        },
        correct: false,
        explanation: {
          en: 'Work containers separate mobile business and personal data. They do not limit the privileges held by a service account on a database server.',
          fr: 'Les conteneurs professionnels séparent les données mobiles personnelles et métier. Ils ne limitent pas les privilèges d’un compte de service sur un serveur de base de données.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Execute the database in a file-analysis sandbox',
          fr: 'Exécuter la base de données dans un bac à sable d’analyse de fichiers',
        },
        correct: false,
        explanation: {
          en: 'Sandboxing suspicious content does not correct excessive permissions in a production application. The appropriate application security control is least privilege.',
          fr: 'Le bac à sable de contenu suspect ne corrige pas des permissions excessives dans une application de production. Le contrôle adapté est le moindre privilège applicatif.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-013',
    objective: '4.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Why is an application allow list considered a deny-by-default control?',
      fr: 'Pourquoi une liste d’autorisation d’applications est-elle un contrôle de refus par défaut ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Software is blocked unless it is explicitly approved',
          fr: 'Un logiciel est bloqué sauf s’il est explicitement approuvé',
        },
        correct: true,
        explanation: {
          en: 'Allow listing permits only identified trusted software. Unknown programs do not run merely because they have not yet been classified as malicious.',
          fr: 'La liste d’autorisation ne permet que les logiciels de confiance identifiés. Les programmes inconnus ne s’exécutent pas simplement parce qu’ils ne sont pas encore classés malveillants.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Every program runs until monitoring raises an alert',
          fr: 'Chaque programme s’exécute jusqu’à ce que la surveillance déclenche une alerte',
        },
        correct: false,
        explanation: {
          en: 'That approach allows execution first and reacts later. Allow listing prevents execution of unapproved software before monitoring would have a behaviour to observe.',
          fr: 'Cette approche autorise d’abord l’exécution et réagit ensuite. La liste d’autorisation empêche le logiciel non approuvé de démarrer avant toute observation comportementale.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Only known malicious applications are blocked',
          fr: 'Seules les applications malveillantes connues sont bloquées',
        },
        correct: false,
        explanation: {
          en: 'Blocking only known malicious programs describes a deny list. An allow list has the opposite default: anything not approved is blocked.',
          fr: 'Bloquer seulement les programmes malveillants connus décrit une liste de blocage. La liste d’autorisation a le défaut inverse : tout élément non approuvé est bloqué.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The device is wiped when an unknown application appears',
          fr: 'L’appareil est effacé lorsqu’une application inconnue apparaît',
        },
        correct: false,
        explanation: {
          en: 'An allow list normally prevents the application from launching; it is not a destructive remote-wipe policy. Wiping addresses loss or retirement, not routine application control.',
          fr: 'Une liste d’autorisation empêche normalement l’application de démarrer ; ce n’est pas une politique destructive d’effacement à distance. L’effacement traite perte ou retrait, pas le contrôle courant.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-014',
    objective: '4.1',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which controls are appropriate parts of a mobile device management policy? (Select two.)',
      fr: 'Quels contrôles constituent des éléments appropriés d’une politique de gestion des appareils mobiles ? (Sélectionnez deux réponses.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: {
          en: 'Require a screen lock and device encryption',
          fr: 'Exiger un verrouillage d’écran et le chiffrement de l’appareil',
        },
        correct: true,
        explanation: {
          en: 'MDM can require lock and encryption settings to protect data on portable devices. Those requirements reduce exposure after loss, theft, or casual physical access.',
          fr: 'La gestion mobile peut exiger verrouillage et chiffrement pour protéger les données des appareils portables. Ces exigences réduisent l’exposition après perte, vol ou accès physique occasionnel.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Allow a selective wipe of managed corporate data',
          fr: 'Permettre un effacement sélectif des données professionnelles gérées',
        },
        correct: true,
        explanation: {
          en: 'Selective wipe lets an organisation remove its managed material, especially useful on employee-owned devices. It preserves personal data while reducing corporate-data exposure.',
          fr: 'L’effacement sélectif permet à l’organisation de retirer ses contenus gérés, particulièrement sur les appareils personnels. Il préserve les données privées tout en réduisant l’exposition métier.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Disable all server-side application service accounts',
          fr: 'Désactiver tous les comptes de service applicatifs côté serveur',
        },
        correct: false,
        explanation: {
          en: 'Server service-account permissions are an application and server-hardening concern. They are not a mobile device policy setting and could break business applications.',
          fr: 'Les permissions des comptes de service serveur relèvent du renforcement applicatif et serveur. Ce n’est pas un réglage de politique mobile et cela pourrait casser des applications métier.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Broadcast the employee wireless password to guests',
          fr: 'Diffuser aux invités le mot de passe sans fil des employés',
        },
        correct: false,
        explanation: {
          en: 'Sharing employee wireless credentials with guests defeats network separation. It is neither a mobile-management control nor a sound wireless-security setting.',
          fr: 'Partager les identifiants sans fil employés avec les invités détruit la séparation réseau. Ce n’est ni un contrôle de gestion mobile ni un réglage de sécurité sans fil correct.',
        },
      },
    ],
  },
  {
    id: 'q-4-1-015',
    objective: '4.1',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'After a baseline update, a team finds that an older business application requires one disabled component. What is the best next step?',
      fr: 'Après une mise à jour de référence, une équipe constate qu’une ancienne application métier exige un composant désactivé. Quelle est la meilleure étape suivante ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Document and review a narrowly scoped exception before enabling the component',
          fr: 'Documenter et réexaminer une exception strictement limitée avant d’activer le composant',
        },
        correct: true,
        explanation: {
          en: 'A justified exception may be necessary, but it must be understood and controlled. Review preserves the baseline as the standard while recording the added risk.',
          fr: 'Une exception justifiée peut être nécessaire, mais doit être comprise et contrôlée. La revue conserve la référence comme norme tout en consignant le risque ajouté.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Enable the component on every system using that baseline',
          fr: 'Activer le composant sur chaque système utilisant cette référence',
        },
        correct: false,
        explanation: {
          en: 'A single legacy application does not justify expanding attack surface across all systems. The exception should be restricted to the asset and need involved.',
          fr: 'Une seule application ancienne ne justifie pas d’élargir la surface d’attaque de tous les systèmes. L’exception doit être limitée à l’actif et au besoin concernés.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Ignore the application requirement because baselines cannot change',
          fr: 'Ignorer le besoin de l’application car les références ne peuvent pas changer',
        },
        correct: false,
        explanation: {
          en: 'Baselines are controlled standards, not immutable rules. A business need may require a reviewed exception or a future baseline revision after risk is assessed.',
          fr: 'Les références sont des normes contrôlées, pas des règles immuables. Un besoin métier peut exiger une exception revue ou une future révision après évaluation du risque.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Open the application on the guest wireless network',
          fr: 'Ouvrir l’application sur le réseau sans fil invité',
        },
        correct: false,
        explanation: {
          en: 'Guest network placement does not supply the missing component or manage a baseline exception. It changes network exposure rather than resolving the configuration requirement.',
          fr: 'Le placement sur un réseau invité ne fournit pas le composant manquant et ne gère pas une exception de référence. Il modifie l’exposition réseau sans résoudre le besoin de configuration.',
        },
      },
    ],
  },
];
