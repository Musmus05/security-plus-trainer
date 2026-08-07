import type { Question } from '@/content/schemas';

/**
 * Objective 4.2 — Explain the security implications of proper hardware, software, and data asset management.
 *
 * Every question is original work based on the published objective. It tests the lifecycle link
 * between acquiring an asset, recording responsibility, tracking its state, and retiring it safely.
 */
export const QUESTIONS_4_2: Question[] = [
  {
    id: 'q-4-2-001',
    objective: '4.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the main security value of an accurate asset inventory?',
      fr: 'Quelle est la principale valeur de sécurité d’un inventaire d’actifs exact ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It identifies assets that must be protected and managed',
          fr: 'Il identifie les actifs à protéger et à gérer',
        },
        correct: true,
        explanation: {
          en: 'An accurate inventory establishes the population for patching, monitoring, audits, and incident response. A team cannot consistently secure an asset it does not know exists.',
          fr: 'Un inventaire exact établit la population à corriger, surveiller, auditer et investiguer. Une équipe ne peut pas sécuriser durablement un actif dont elle ignore l’existence.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It automatically blocks malicious network traffic',
          fr: 'Il bloque automatiquement le trafic réseau malveillant',
        },
        correct: false,
        explanation: {
          en: 'An inventory records what exists; it does not inspect or block traffic. A firewall or intrusion prevention control can enforce network policy using separate mechanisms.',
          fr: 'Un inventaire consigne ce qui existe ; il ne contrôle ni ne bloque le trafic. Un pare-feu ou une prévention d’intrusion applique la politique réseau par d’autres mécanismes.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It grants employees access to assigned systems',
          fr: 'Il accorde aux employés l’accès aux systèmes attribués',
        },
        correct: false,
        explanation: {
          en: 'Assignment records responsibility for an asset, while access control grants permissions. Knowing a user has a laptop does not authorize that user on every system.',
          fr: 'L’attribution consigne la responsabilité d’un actif, tandis que le contrôle d’accès accorde des permissions. Savoir qu’un utilisateur a un portable ne l’autorise pas sur tous les systèmes.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It guarantees that every asset is free of vulnerabilities',
          fr: 'Il garantit que chaque actif est exempt de vulnérabilités',
        },
        correct: false,
        explanation: {
          en: 'Inventory accuracy helps identify which assets need remediation, but it neither discovers every flaw nor applies fixes. Vulnerability management remains a separate ongoing activity.',
          fr: 'La précision de l’inventaire aide à repérer les actifs à corriger, mais ne découvre pas chaque faille et n’applique aucun correctif. La gestion des vulnérabilités reste une activité distincte.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-002',
    objective: '4.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which record most directly establishes accountability for a laptop issued to an employee?',
      fr: 'Quel enregistrement établit le plus directement la responsabilité pour un ordinateur portable remis à un employé ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'An asset assignment linking the device to its custodian',
          fr: 'Une attribution d’actif liant l’appareil à son détenteur',
        },
        correct: true,
        explanation: {
          en: 'Assignment connects a particular asset to the person or team responsible for it. That relationship supports recovery, investigation, and lifecycle decisions.',
          fr: 'L’attribution relie un actif précis à la personne ou à l’équipe qui en répond. Cette relation facilite récupération, investigation et décisions de cycle de vie.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A network allow rule for the laptop',
          fr: 'Une règle réseau autorisant le portable',
        },
        correct: false,
        explanation: {
          en: 'A network rule permits traffic under defined conditions. It does not identify who received the physical device or who is accountable for its safekeeping.',
          fr: 'Une règle réseau autorise du trafic sous certaines conditions. Elle n’identifie ni le destinataire de l’appareil physique ni la personne responsable de sa garde.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A successful endpoint scan result',
          fr: 'Un résultat positif d’analyse du terminal',
        },
        correct: false,
        explanation: {
          en: 'A scan can show that an endpoint is visible or compliant at a moment in time. It is not the administrative record that assigns custody.',
          fr: 'Une analyse peut montrer qu’un terminal est visible ou conforme à un instant donné. Ce n’est pas le registre administratif qui attribue la garde.',
        },
      },
      {
        id: 'd',
        text: { en: 'A data retention schedule', fr: 'Un calendrier de conservation des données' },
        correct: false,
        explanation: {
          en: 'A retention schedule governs how long data is retained. It does not record the current custodian of a hardware asset issued to an employee.',
          fr: 'Un calendrier de conservation définit la durée de conservation des données. Il ne consigne pas le détenteur actuel d’un actif matériel remis à un employé.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-003',
    objective: '4.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A critical flaw is announced in a database client. The security team needs to find every affected installation and notify the responsible teams. Which asset-management information is most useful?',
      fr: 'Une faille critique est annoncée dans un client de base de données. L’équipe sécurité doit trouver chaque installation touchée et prévenir les équipes responsables. Quelle information de gestion des actifs est la plus utile ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Software inventory records with deployment and owner details',
          fr: 'Des registres logiciels avec détails de déploiement et de propriétaire',
        },
        correct: true,
        explanation: {
          en: 'Software records identify where the affected client is deployed and who owns each instance. This lets remediation be targeted instead of guessed.',
          fr: 'Les registres logiciels indiquent où le client touché est déployé et qui possède chaque instance. La remédiation peut alors être ciblée plutôt que devinée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The physical badge log for the data centre',
          fr: 'Le journal des badges du centre de données',
        },
        correct: false,
        explanation: {
          en: 'Badge logs can support a physical-access investigation, but they do not reveal which endpoints or users have a vulnerable database client installed.',
          fr: 'Les journaux de badges peuvent aider une enquête d’accès physique, mais ils ne révèlent pas quels terminaux ou utilisateurs ont le client vulnérable installé.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The list of employees who completed awareness training',
          fr: 'La liste des employés ayant suivi la sensibilisation',
        },
        correct: false,
        explanation: {
          en: 'Training records measure participation in awareness activities. They do not map a particular software product and version to affected systems.',
          fr: 'Les registres de formation mesurent la participation aux activités de sensibilisation. Ils ne relient pas un produit et une version logiciels à des systèmes touchés.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A list of approved procurement suppliers',
          fr: 'Une liste de fournisseurs approuvés',
        },
        correct: false,
        explanation: {
          en: 'Approved suppliers matter when acquiring products, but the immediate problem is locating existing installations. Supplier approval does not identify their deployments.',
          fr: 'Les fournisseurs approuvés importent lors de l’acquisition, mais le problème immédiat est de localiser les installations existantes. Leur approbation n’identifie pas les déploiements.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-004',
    objective: '4.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which lifecycle stage addresses the secure withdrawal of a server that is no longer needed?',
      fr: 'Quelle étape du cycle de vie traite le retrait sécurisé d’un serveur qui n’est plus nécessaire ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Disposal and decommissioning',
          fr: 'La mise au rebut et la mise hors service',
        },
        correct: true,
        explanation: {
          en: 'Decommissioning removes the server from active service, while disposal handles its final treatment. Together they address remaining data, access, and records.',
          fr: 'La mise hors service retire le serveur du service actif, tandis que la mise au rebut traite son devenir final. Ensemble, elles gèrent données, accès et registres restants.',
        },
      },
      {
        id: 'b',
        text: { en: 'Acquisition and procurement', fr: 'L’acquisition et l’approvisionnement' },
        correct: false,
        explanation: {
          en: 'Acquisition decides how an asset enters the organisation. A server already in use has reached the opposite end of its lifecycle.',
          fr: 'L’acquisition décide comment un actif entre dans l’organisation. Un serveur déjà utilisé se trouve à l’extrémité opposée de son cycle de vie.',
        },
      },
      {
        id: 'c',
        text: { en: 'Assignment and accounting', fr: 'L’attribution et la comptabilisation' },
        correct: false,
        explanation: {
          en: 'Assignment and accounting establish responsibility and facts about an active asset. They do not by themselves remove services or handle retained data.',
          fr: 'L’attribution et la comptabilisation établissent responsabilité et faits sur un actif actif. Elles ne retirent pas seules les services ni ne traitent les données conservées.',
        },
      },
      {
        id: 'd',
        text: { en: 'Asset monitoring and tracking', fr: 'La surveillance et le suivi des actifs' },
        correct: false,
        explanation: {
          en: 'Tracking can reveal that a server exists or has changed state, but the controlled withdrawal itself belongs to decommissioning and disposal.',
          fr: 'Le suivi peut révéler qu’un serveur existe ou a changé d’état, mais le retrait contrôlé relève de la mise hors service et de la mise au rebut.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-005',
    objective: '4.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'How does asset assignment differ from authorization?',
      fr: 'En quoi l’attribution d’un actif diffère-t-elle de l’autorisation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Assignment establishes accountability; authorization grants permitted actions',
          fr: 'L’attribution établit la responsabilité ; l’autorisation accorde les actions permises',
        },
        correct: true,
        explanation: {
          en: 'An assigned custodian answers for the asset, while authorization controls what identities may do with systems or data. The two controls solve related but different problems.',
          fr: 'Un détenteur attribué répond de l’actif, tandis que l’autorisation contrôle ce que les identités peuvent faire avec systèmes ou données. Les deux contrôles résolvent des problèmes liés mais distincts.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Assignment encrypts an asset; authorization tracks its location',
          fr: 'L’attribution chiffre un actif ; l’autorisation suit son emplacement',
        },
        correct: false,
        explanation: {
          en: 'Encryption protects confidentiality, and asset tracking records location or state. Neither function is the meaning of assignment or authorization.',
          fr: 'Le chiffrement protège la confidentialité, et le suivi d’actif consigne emplacement ou état. Aucune de ces fonctions ne définit attribution ou autorisation.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Assignment approves a purchase; authorization approves disposal',
          fr: 'L’attribution approuve un achat ; l’autorisation approuve la mise au rebut',
        },
        correct: false,
        explanation: {
          en: 'Procurement approval and disposal approval are lifecycle governance decisions. Assignment and authorization occur after or alongside those decisions for different purposes.',
          fr: 'Les approbations d’achat et de rebut sont des décisions de gouvernance du cycle de vie. Attribution et autorisation interviennent après ou à côté, avec d’autres finalités.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Assignment is for data only; authorization is for hardware only',
          fr: 'L’attribution concerne seulement les données ; l’autorisation seulement le matériel',
        },
        correct: false,
        explanation: {
          en: 'Both ideas can apply broadly: assets include hardware, software, and data, while authorization governs access to many kinds of resources.',
          fr: 'Les deux notions ont un champ large : les actifs incluent matériel, logiciel et données, tandis que l’autorisation régit l’accès à de nombreux types de ressources.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-006',
    objective: '4.2',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A network discovery finds an active workstation that is absent from the asset inventory. What should the security team do first?',
      fr: 'Une découverte réseau détecte un poste actif absent de l’inventaire des actifs. Que doit faire l’équipe sécurité en premier ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Investigate the unknown asset and establish its owner or remove it from service',
          fr: 'Enquêter sur l’actif inconnu, établir son propriétaire ou le retirer du service',
        },
        correct: true,
        explanation: {
          en: 'An unrecorded active workstation may be unauthorized or simply unmanaged. Its identity, purpose, and owner must be verified before it can be brought under control.',
          fr: 'Un poste actif non enregistré peut être non autorisé ou simplement non géré. Son identité, son usage et son propriétaire doivent être vérifiés avant toute mise sous contrôle.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Add the workstation directly to the inventory without review',
          fr: 'Ajouter directement le poste à l’inventaire sans vérification',
        },
        correct: false,
        explanation: {
          en: 'Adding an unknown device without verification can legitimize an unauthorized asset. Inventory data should be accurate, not merely complete-looking.',
          fr: 'Ajouter un appareil inconnu sans vérification peut légitimer un actif non autorisé. Les données d’inventaire doivent être exactes, pas seulement paraître complètes.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Delete all inactive inventory records',
          fr: 'Supprimer tous les enregistrements d’inventaire inactifs',
        },
        correct: false,
        explanation: {
          en: 'Deleting unrelated records neither identifies the discovered workstation nor proves that inactive assets were properly decommissioned.',
          fr: 'Supprimer des enregistrements sans rapport n’identifie pas le poste découvert et ne prouve pas non plus que les actifs inactifs ont été correctement retirés.',
        },
      },
      {
        id: 'd',
        text: { en: 'Purchase a replacement workstation', fr: 'Acheter un poste de remplacement' },
        correct: false,
        explanation: {
          en: 'Procurement does not resolve an unidentified device already connected to the environment. The immediate issue is asset tracking and accountability.',
          fr: 'L’approvisionnement ne résout pas un appareil non identifié déjà connecté à l’environnement. Le problème immédiat est le suivi de l’actif et sa responsabilité.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-007',
    objective: '4.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Why should a planned software purchase include a support and update path?',
      fr: 'Pourquoi un achat logiciel prévu doit-il inclure un chemin de support et de mise à jour ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'To avoid acquiring software that cannot be maintained securely',
          fr: 'Pour éviter d’acquérir un logiciel impossible à maintenir de manière sûre',
        },
        correct: true,
        explanation: {
          en: 'Software without an update path can become exposed when flaws are found. Procurement is the earliest point to avoid adding that unmanaged risk.',
          fr: 'Un logiciel sans chemin de mise à jour peut rester exposé lorsqu’une faille est découverte. L’approvisionnement est le premier moment pour éviter ce risque non géré.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'To ensure that every user receives administrator rights',
          fr: 'Pour garantir que chaque utilisateur reçoit des droits administrateur',
        },
        correct: false,
        explanation: {
          en: 'Supportability concerns the vendor and maintenance lifecycle, not broad privileges. Administrator rights should remain limited according to least privilege.',
          fr: 'La prise en charge concerne l’éditeur et le cycle de maintenance, non des privilèges étendus. Les droits administrateur doivent rester limités selon le moindre privilège.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'To replace the need to record the software in inventory',
          fr: 'Pour remplacer l’enregistrement du logiciel dans l’inventaire',
        },
        correct: false,
        explanation: {
          en: 'A support path and inventory answer different questions. The first concerns maintainability; the second identifies deployments, owners, and current lifecycle state.',
          fr: 'Un chemin de support et un inventaire répondent à des questions différentes. Le premier concerne la maintenance ; le second identifie déploiements, propriétaires et état de cycle de vie.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'To make the software immune to configuration errors',
          fr: 'Pour rendre le logiciel insensible aux erreurs de configuration',
        },
        correct: false,
        explanation: {
          en: 'Vendor support and updates can address known defects, but they do not prevent an organisation from configuring the product insecurely.',
          fr: 'Le support et les mises à jour de l’éditeur peuvent traiter des défauts connus, mais ils n’empêchent pas une organisation de configurer le produit de façon non sûre.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-008',
    objective: '4.2',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which fact distinguishes asset tracking from a static inventory record?',
      fr: 'Quel fait distingue le suivi des actifs d’un enregistrement d’inventaire statique ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Tracking validates an asset’s current presence, location, or state over time',
          fr: 'Le suivi valide au fil du temps la présence, l’emplacement ou l’état actuel d’un actif',
        },
        correct: true,
        explanation: {
          en: 'A static record is a declared fact, whereas tracking checks whether that fact remains true. This detects assets that moved, disappeared, or appeared outside the process.',
          fr: 'Un registre statique déclare un fait, tandis que le suivi vérifie qu’il reste vrai. Il détecte les actifs déplacés, disparus ou apparus hors processus.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Tracking assigns an asset’s purchase budget',
          fr: 'Le suivi attribue le budget d’achat d’un actif',
        },
        correct: false,
        explanation: {
          en: 'Budget allocation is a procurement or financial activity. Tracking concerns the existence, location, state, or custody of an asset after it is acquired.',
          fr: 'L’attribution de budget est une activité financière ou d’approvisionnement. Le suivi concerne existence, emplacement, état ou garde après l’acquisition.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Tracking authorizes a new data classification',
          fr: 'Le suivi autorise une nouvelle classification de données',
        },
        correct: false,
        explanation: {
          en: 'Data classification describes sensitivity and handling requirements. Asset tracking can locate data repositories but does not approve their classification.',
          fr: 'La classification des données décrit sensibilité et règles de traitement. Le suivi peut localiser des dépôts, mais n’approuve pas leur classification.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Tracking replaces the need for physical security',
          fr: 'Le suivi remplace le besoin de sécurité physique',
        },
        correct: false,
        explanation: {
          en: 'Knowing where an asset should be does not stop theft or tampering. Physical controls still protect locations and equipment from unauthorized access.',
          fr: 'Savoir où un actif devrait être n’empêche ni le vol ni l’altération. Les contrôles physiques protègent toujours lieux et équipements contre les accès non autorisés.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-009',
    objective: '4.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An employee leaves the company and returns an assigned phone. Before the phone is sent to a recycler, which action is most important?',
      fr: 'Un employé quitte l’entreprise et rend un téléphone attribué. Avant l’envoi du téléphone à un recycleur, quelle action est la plus importante ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Follow the disposal process to protect organisational data and access',
          fr: 'Suivre le processus de mise au rebut pour protéger données et accès de l’organisation',
        },
        correct: true,
        explanation: {
          en: 'A returned phone may contain data, credentials, configurations, or trusted access. Disposal must address those before ownership of the device changes.',
          fr: 'Un téléphone rendu peut contenir données, identifiants, configurations ou accès de confiance. La mise au rebut doit les traiter avant le changement de propriétaire de l’appareil.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Assign the phone to the recycler as its new custodian',
          fr: 'Attribuer le téléphone au recycleur comme nouveau détenteur',
        },
        correct: false,
        explanation: {
          en: 'A recycler may receive the device only after the organisation completes its secure retirement process. Assignment alone does not protect residual data or access.',
          fr: 'Un recycleur peut recevoir l’appareil seulement après la fin du retrait sécurisé par l’organisation. L’attribution seule ne protège ni les données résiduelles ni les accès.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Keep the phone in the active inventory indefinitely',
          fr: 'Conserver indéfiniment le téléphone dans l’inventaire actif',
        },
        correct: false,
        explanation: {
          en: 'The record should reflect the device’s real retired or disposal state. Keeping it falsely active can mislead audits, monitoring, and incident response.',
          fr: 'Le registre doit refléter l’état réel de retrait ou de rebut de l’appareil. Le laisser faussement actif peut induire en erreur audits, surveillance et réponse aux incidents.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Approve a new purchase for the departed employee',
          fr: 'Approuver un nouvel achat pour l’employé parti',
        },
        correct: false,
        explanation: {
          en: 'A new procurement request does not secure the returned phone. The immediate lifecycle obligation is to decommission and dispose of the existing asset safely.',
          fr: 'Une nouvelle demande d’achat ne sécurise pas le téléphone rendu. L’obligation immédiate est de mettre hors service puis de mettre au rebut l’actif existant en sécurité.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-010',
    objective: '4.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Why is deleting a retired server from the asset inventory alone insufficient?',
      fr: 'Pourquoi supprimer seulement un serveur retiré de l’inventaire des actifs est-il insuffisant ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The server may still retain data, credentials, or network access',
          fr: 'Le serveur peut encore conserver données, identifiants ou accès réseau',
        },
        correct: true,
        explanation: {
          en: 'Removing a record changes documentation, not the server itself. Secure decommissioning and disposal address residual data and any access that could remain active.',
          fr: 'Retirer un enregistrement modifie la documentation, pas le serveur lui-même. La mise hors service et le rebut sécurisés traitent données résiduelles et accès potentiellement actifs.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Inventory records are required to grant administrator privileges',
          fr: 'Les registres d’inventaire sont nécessaires pour accorder des privilèges administrateur',
        },
        correct: false,
        explanation: {
          en: 'Administrative privileges are granted by identity and access controls. Inventory data supports management and accountability but is not the privilege-granting mechanism.',
          fr: 'Les privilèges administrateur sont accordés par les contrôles d’identité et d’accès. L’inventaire aide gestion et responsabilité, mais n’est pas le mécanisme d’autorisation.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A deleted record automatically invalidates software licences',
          fr: 'Un enregistrement supprimé invalide automatiquement les licences logicielles',
        },
        correct: false,
        explanation: {
          en: 'Licence reconciliation is an explicit lifecycle task, not an automatic consequence of removing inventory text. Licences and subscriptions can persist separately.',
          fr: 'Le rapprochement des licences est une tâche explicite du cycle de vie, non une conséquence automatique de la suppression d’un texte d’inventaire. Licences et abonnements peuvent persister.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The server must remain listed as active after disposal',
          fr: 'Le serveur doit rester indiqué comme actif après sa mise au rebut',
        },
        correct: false,
        explanation: {
          en: 'The record should be updated to an accurate retired or disposed state. The problem is deleting evidence of the asset before completing its secure retirement.',
          fr: 'Le registre doit être mis à jour vers un état exact de retrait ou de rebut. Le problème est d’effacer la trace de l’actif avant la fin de son retrait sécurisé.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-011',
    objective: '4.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which of the following is a data asset-management concern?',
      fr: 'Lequel des éléments suivants est une préoccupation de gestion des actifs de données ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Knowing which system and owner are responsible for a dataset',
          fr: 'Savoir quel système et quel propriétaire sont responsables d’un jeu de données',
        },
        correct: true,
        explanation: {
          en: 'Data assets require accountable ownership and a known location just as hardware does. Those facts support appropriate handling, response, and lifecycle decisions.',
          fr: 'Les actifs de données exigent un propriétaire responsable et un emplacement connu, comme le matériel. Ces faits soutiennent traitement, réponse et décisions de cycle de vie appropriés.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Knowing the serial number printed on a server chassis',
          fr: 'Connaître le numéro de série imprimé sur le châssis d’un serveur',
        },
        correct: false,
        explanation: {
          en: 'A chassis serial number identifies hardware, which can host a dataset but does not identify the dataset, its owner, or its handling requirements.',
          fr: 'Un numéro de série de châssis identifie du matériel, qui peut héberger un jeu de données mais n’identifie ni ce jeu, ni son propriétaire, ni ses règles de traitement.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Selecting the low-traffic time for a maintenance window',
          fr: 'Choisir l’heure creuse pour une fenêtre de maintenance',
        },
        correct: false,
        explanation: {
          en: 'A maintenance window schedules operational changes to reduce disruption. It does not establish responsibility or lifecycle facts for a particular dataset.',
          fr: 'Une fenêtre de maintenance planifie des changements opérationnels pour limiter les perturbations. Elle n’établit pas responsabilité ou faits de cycle de vie pour un jeu de données.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Assigning a firewall rule to a network segment',
          fr: 'Attribuer une règle de pare-feu à un segment réseau',
        },
        correct: false,
        explanation: {
          en: 'Firewall policy governs network traffic between zones. It may protect a data system, but it does not manage the data asset’s ownership or inventory.',
          fr: 'La politique de pare-feu régit le trafic réseau entre zones. Elle peut protéger un système de données, mais ne gère ni propriété ni inventaire de l’actif de données.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-012',
    objective: '4.2',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A team is acquiring a cloud service that will store customer records. Which procurement actions best support later security management? (Select all that apply.)',
      fr: 'Une équipe acquiert un service cloud qui stockera des dossiers clients. Quelles actions d’approvisionnement soutiennent le mieux la gestion de sécurité ultérieure ? (Sélectionnez toutes les réponses correctes.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: {
          en: 'Record the service, responsible owner, and approved purpose',
          fr: 'Consigner le service, le propriétaire responsable et l’usage approuvé',
        },
        correct: true,
        explanation: {
          en: 'A recorded service with an owner and purpose can be monitored, reviewed, and retired deliberately. Those facts prevent an unmanaged data service from becoming invisible.',
          fr: 'Un service enregistré avec propriétaire et usage peut être surveillé, révisé et retiré délibérément. Ces faits empêchent un service de données non géré de devenir invisible.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Confirm that the service has a support and lifecycle path',
          fr: 'Confirmer que le service possède un chemin de support et de cycle de vie',
        },
        correct: true,
        explanation: {
          en: 'Supportability and a defined lifecycle help the organisation manage changes and eventual retirement. Acquiring an unsupported service creates predictable operational risk.',
          fr: 'La prise en charge et un cycle de vie défini aident l’organisation à gérer changements et retrait final. Acquérir un service non pris en charge crée un risque opérationnel prévisible.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Give every employee administrative access to the service',
          fr: 'Donner à chaque employé un accès administrateur au service',
        },
        correct: false,
        explanation: {
          en: 'Broad administrative access conflicts with least privilege and is unrelated to recording or supporting the acquired asset. Access should be limited to legitimate roles.',
          fr: 'Un accès administratif étendu contredit le moindre privilège et ne concerne ni enregistrement ni support de l’actif acquis. L’accès doit être limité aux rôles légitimes.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Remove the service from inventory as soon as it is purchased',
          fr: 'Retirer le service de l’inventaire dès son achat',
        },
        correct: false,
        explanation: {
          en: 'A newly acquired active service should enter the asset record, not leave it. Removing it defeats tracking, accountability, and later decommissioning.',
          fr: 'Un service actif nouvellement acquis doit entrer dans le registre des actifs, pas en sortir. Le retirer détruit suivi, responsabilité et mise hors service ultérieure.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-013',
    objective: '4.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which scenario is primarily an asset-tracking failure rather than a procurement failure?',
      fr: 'Quel scénario est principalement une défaillance de suivi des actifs plutôt qu’une défaillance d’approvisionnement ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A listed laptop was transferred between offices, but its recorded location was never updated',
          fr: 'Un portable inscrit a été transféré entre bureaux, mais son emplacement enregistré n’a jamais été mis à jour',
        },
        correct: true,
        explanation: {
          en: 'The laptop was already known and acquired; the failure is that its current location no longer matches the record. That is a tracking accuracy problem.',
          fr: 'Le portable était déjà connu et acquis ; la défaillance est que son emplacement actuel ne correspond plus au registre. C’est un problème d’exactitude du suivi.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A department buys unapproved software outside the normal process',
          fr: 'Un service achète un logiciel non approuvé hors du processus normal',
        },
        correct: false,
        explanation: {
          en: 'Buying outside the approved process bypasses acquisition and procurement controls. Tracking may later discover it, but the primary failure occurred before acquisition was governed.',
          fr: 'Acheter hors processus approuvé contourne les contrôles d’acquisition et d’approvisionnement. Le suivi peut le découvrir ensuite, mais la défaillance principale est antérieure.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A retired drive is sent away with company data still present',
          fr: 'Un disque retiré est envoyé alors que des données de l’entreprise y sont encore présentes',
        },
        correct: false,
        explanation: {
          en: 'This is a disposal and decommissioning failure. The asset’s final handling did not protect residual organisational data before it left control.',
          fr: 'Il s’agit d’une défaillance de mise au rebut et de mise hors service. Le traitement final de l’actif n’a pas protégé les données résiduelles avant sa sortie.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A new server is deployed with no named owner',
          fr: 'Un nouveau serveur est déployé sans propriétaire nommé',
        },
        correct: false,
        explanation: {
          en: 'A missing owner is an assignment and accounting failure. The asset may be visible, but no accountable party has been formally associated with it.',
          fr: 'L’absence de propriétaire est une défaillance d’attribution et de comptabilisation. L’actif peut être visible, mais aucune partie responsable ne lui est formellement associée.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-014',
    objective: '4.2',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'What should happen to an asset record when an application is formally decommissioned?',
      fr: 'Que doit-il arriver au registre d’un actif lorsqu’une application est formellement mise hors service ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Its lifecycle status should be updated to reflect retirement',
          fr: 'Son état de cycle de vie doit être mis à jour pour refléter son retrait',
        },
        correct: true,
        explanation: {
          en: 'An accurate record distinguishes retired assets from active ones, preventing stale monitoring expectations and giving audits and responders correct context.',
          fr: 'Un registre exact distingue les actifs retirés des actifs actifs, évitant des attentes de surveillance périmées et donnant aux audits et enquêteurs le bon contexte.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Its owner should gain permanent administrator rights',
          fr: 'Son propriétaire doit obtenir des droits administrateur permanents',
        },
        correct: false,
        explanation: {
          en: 'Decommissioning should reduce unnecessary access, not grant more. Ownership establishes accountability and does not imply permanent elevated privileges.',
          fr: 'La mise hors service doit réduire les accès inutiles, pas en accorder davantage. La propriété établit responsabilité et n’implique pas des privilèges élevés permanents.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Its procurement request should become the active inventory record',
          fr: 'Sa demande d’achat doit devenir le registre d’inventaire actif',
        },
        correct: false,
        explanation: {
          en: 'A purchase request describes intended acquisition, not the current lifecycle state. The asset record should retain accurate operational facts about the retired application.',
          fr: 'Une demande d’achat décrit une acquisition envisagée, pas l’état actuel du cycle de vie. Le registre doit conserver des faits opérationnels exacts sur l’application retirée.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It should be kept active to ensure the application receives patches',
          fr: 'Il doit rester actif afin que l’application reçoive des correctifs',
        },
        correct: false,
        explanation: {
          en: 'A formally retired application is no longer an active deployment to patch. Keeping a false active status confuses asset management and remediation scope.',
          fr: 'Une application formellement retirée n’est plus un déploiement actif à corriger. Conserver un faux état actif embrouille gestion des actifs et périmètre de remédiation.',
        },
      },
    ],
  },
  {
    id: 'q-4-2-015',
    objective: '4.2',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'During an audit, an organisation finds several paid software subscriptions that have no current owner, no confirmed business purpose, and no usage evidence. Which actions best address the security implications? (Select all that apply.)',
      fr: 'Pendant un audit, une organisation trouve plusieurs abonnements logiciels payants sans propriétaire actuel, sans usage métier confirmé et sans preuve d’utilisation. Quelles actions répondent le mieux aux implications de sécurité ? (Sélectionnez toutes les réponses correctes.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: {
          en: 'Establish accountability and confirm whether each subscription is still needed',
          fr: 'Établir la responsabilité et confirmer si chaque abonnement est encore nécessaire',
        },
        correct: true,
        explanation: {
          en: 'A named owner and valid purpose make a software asset manageable. If neither exists, the organisation cannot reliably assess its access, data, or lifecycle risk.',
          fr: 'Un propriétaire nommé et un usage valide rendent un actif logiciel gérable. Sans eux, l’organisation ne peut pas évaluer fiablement ses risques d’accès, de données ou de cycle de vie.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Decommission subscriptions that are no longer required and update their records',
          fr: 'Mettre hors service les abonnements inutiles et mettre à jour leurs registres',
        },
        correct: true,
        explanation: {
          en: 'Unneeded subscriptions can preserve access or data paths. Controlled retirement closes those paths and leaves an accurate record of the asset’s final state.',
          fr: 'Des abonnements inutiles peuvent conserver des chemins d’accès ou de données. Un retrait contrôlé ferme ces chemins et laisse un registre exact de l’état final de l’actif.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Grant every department access so that usage increases',
          fr: 'Accorder l’accès à tous les services afin d’augmenter l’utilisation',
        },
        correct: false,
        explanation: {
          en: 'Increasing access to justify an unmanaged subscription expands exposure. Security requires a legitimate purpose and least-privilege access, not artificial adoption.',
          fr: 'Augmenter les accès pour justifier un abonnement non géré élargit l’exposition. La sécurité exige usage légitime et accès au moindre privilège, non une adoption artificielle.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Remove the subscriptions from all audit records immediately',
          fr: 'Retirer immédiatement les abonnements de tous les registres d’audit',
        },
        correct: false,
        explanation: {
          en: 'Deleting evidence prevents accountability and does not retire the services. Records should be updated after a controlled decision, not erased to hide uncertainty.',
          fr: 'Effacer les preuves empêche la responsabilité et ne retire pas les services. Les registres doivent être mis à jour après une décision contrôlée, non effacés pour cacher l’incertitude.',
        },
      },
    ],
  },
];
