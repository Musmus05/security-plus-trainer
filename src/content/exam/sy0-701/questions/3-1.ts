import type { Question } from '@/content/schemas';

/**
 * Objective 3.1 — Compare and contrast security implications of different architecture models.
 *
 * Every question is original and written from the published objective. None reproduces,
 * paraphrases, or reconstructs a real exam item — see NOTICE.md.
 */
export const QUESTIONS_3_1: Question[] = [
  {
    id: 'q-3-1-001',
    objective: '3.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the primary purpose of a cloud responsibility matrix?',
      fr: 'Quel est le but principal d’une matrice des responsabilités dans le nuage ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'To assign security duties between the provider and customer',
          fr: 'Répartir les tâches de sécurité entre le fournisseur et le client',
        },
        correct: true,
        explanation: {
          en: 'The matrix makes ownership explicit for each security task, preventing an important control from being assumed to belong to the other party.',
          fr: 'La matrice rend explicite le responsable de chaque tâche afin qu’un contrôle important ne soit pas supposé à tort relever de l’autre partie.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'To calculate how quickly cloud capacity can scale',
          fr: 'Calculer la vitesse de montée en charge du nuage',
        },
        correct: false,
        explanation: {
          en: 'Scaling calculations concern workload capacity and performance. They do not establish whether the provider or customer owns a security control.',
          fr: 'Les calculs de montée en charge concernent capacité et performances. Ils ne déterminent pas si un contrôle revient au fournisseur ou au client.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'To guarantee that a third party accepts every business risk',
          fr: 'Garantir qu’un tiers accepte tous les risques métier',
        },
        correct: false,
        explanation: {
          en: 'Duties can be allocated and some financial risk transferred, but the customer cannot contract away every operational and security consequence.',
          fr: 'Les tâches peuvent être réparties et certains risques financiers transférés, mais le client ne peut pas céder toutes les conséquences opérationnelles et de sécurité.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'To document the physical layout of the provider data centre',
          fr: 'Documenter le plan physique du centre de données du fournisseur',
        },
        correct: false,
        explanation: {
          en: 'A physical diagram records location and connectivity. A responsibility matrix instead records which party performs and answers for each duty.',
          fr: 'Un schéma physique décrit emplacement et connexions. La matrice indique plutôt quelle partie exécute chaque tâche et en répond.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-002',
    objective: '3.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An organisation keeps regulated records on-premises but processes customer requests in a public cloud. Accounts are removed locally yet remain active in the cloud. Which hybrid consideration needs the most attention?',
      fr: 'Une organisation conserve ses dossiers réglementés sur site, mais traite les demandes clients dans un nuage public. Les comptes supprimés localement restent actifs dans le nuage. Quelle considération hybride exige le plus d’attention ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Consistent identity lifecycle across both environments',
          fr: 'Un cycle de vie des identités cohérent dans les deux environnements',
        },
        correct: true,
        explanation: {
          en: 'The security gap is inconsistent deprovisioning. Hybrid identity processes must remove or disable access on both sides of the boundary.',
          fr: 'La faille vient d’une suppression incohérente. Le processus d’identité hybride doit retirer ou désactiver les accès des deux côtés de la frontière.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Additional compute capacity in the local data centre',
          fr: 'Davantage de capacité de calcul dans le centre de données local',
        },
        correct: false,
        explanation: {
          en: 'Nothing indicates exhausted processing capacity. More local compute would not revoke a cloud account that survived the employee lifecycle process.',
          fr: 'Rien ne signale un manque de traitement. Ajouter du calcul local ne révoquerait pas un compte du nuage oublié par le processus de départ.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Physical isolation of the public cloud tenant',
          fr: 'L’isolement physique du locataire dans le nuage public',
        },
        correct: false,
        explanation: {
          en: 'Tenant isolation does not correct an authorised but stale identity. The account must be governed consistently, regardless of underlying hardware.',
          fr: 'L’isolement du locataire ne corrige pas une identité autorisée mais périmée. Le compte doit être gouverné de façon cohérente, quel que soit le matériel.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A faster recovery image for the local records server',
          fr: 'Une image de reprise plus rapide pour le serveur de dossiers local',
        },
        correct: false,
        explanation: {
          en: 'Recovery images address restoration after failure. This scenario concerns lingering access, not the time required to restore a server.',
          fr: 'Les images de reprise servent à restaurer après une panne. Le scénario porte sur un accès persistant, pas sur le délai de restauration d’un serveur.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-003',
    objective: '3.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which security trade-off is most characteristic of infrastructure as code?',
      fr: 'Quel compromis de sécurité caractérise le mieux l’infrastructure en tant que code ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Reviewed deployments are repeatable, but a template flaw can be reproduced widely',
          fr: 'Les déploiements relus sont reproductibles, mais une faille du modèle peut être largement répliquée',
        },
        correct: true,
        explanation: {
          en: 'IaC makes intended state reviewable and consistent. The same automation also expands the blast radius of an insecure rule embedded in a template.',
          fr: 'L’IaC rend l’état attendu révisable et cohérent. La même automatisation élargit aussi l’impact d’une règle non sûre inscrite dans un modèle.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Every host is unique, so configuration drift cannot occur',
          fr: 'Chaque hôte est unique, donc aucun écart de configuration ne peut survenir',
        },
        correct: false,
        explanation: {
          en: 'IaC seeks consistency rather than uniqueness, and unmanaged manual changes can still create drift between the declared and actual states.',
          fr: 'L’IaC recherche la cohérence plutôt que l’unicité, et des changements manuels non gérés peuvent toujours créer un écart avec l’état déclaré.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The provider secures all application code because deployment is automated',
          fr: 'Le fournisseur sécurise tout le code applicatif puisque le déploiement est automatisé',
        },
        correct: false,
        explanation: {
          en: 'Automation changes how infrastructure is created, not who owns application security. Code and template review remain organisational responsibilities.',
          fr: 'L’automatisation change la création de l’infrastructure, pas la responsabilité applicative. La revue du code et des modèles reste à l’organisation.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Physical cabling prevents unauthorised changes to the templates',
          fr: 'Le câblage physique empêche les modifications non autorisées des modèles',
        },
        correct: false,
        explanation: {
          en: 'Template integrity is protected through repository access, review, and deployment controls. Physical cabling is unrelated to modification of source files.',
          fr: 'L’intégrité des modèles dépend des accès au dépôt, des revues et du déploiement. Le câblage ne contrôle pas la modification des fichiers sources.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-004',
    objective: '3.1',
    kind: 'scenario',
    difficulty: 'easy',
    prompt: {
      en: 'A team adopts serverless functions so it no longer maintains operating systems. Which item still belongs to the team?',
      fr: 'Une équipe adopte des fonctions sans serveur afin de ne plus maintenir les systèmes d’exploitation. Quel élément lui revient toujours ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Securing function permissions, secrets, and application code',
          fr: 'Sécuriser les autorisations des fonctions, les secrets et le code applicatif',
        },
        correct: true,
        explanation: {
          en: 'The provider manages the underlying runtime and servers, but customer code, identities, permissions, secrets, and data remain customer concerns.',
          fr: 'Le fournisseur gère la plateforme et les serveurs sous-jacents, mais code, identités, autorisations, secrets et données restent au client.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Replacing failed disks in the provider facility',
          fr: 'Remplacer les disques défaillants dans les locaux du fournisseur',
        },
        correct: false,
        explanation: {
          en: 'Physical disk replacement belongs to the provider in a serverless service. It is precisely one of the infrastructure tasks abstracted from the customer.',
          fr: 'Le remplacement physique des disques revient au fournisseur du service sans serveur. Cette tâche d’infrastructure est justement masquée au client.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Patching the provider hypervisor',
          fr: 'Appliquer les correctifs à l’hyperviseur du fournisseur',
        },
        correct: false,
        explanation: {
          en: 'The provider owns its virtualization layer. The customer should understand that boundary, but cannot normally administer the provider hypervisor.',
          fr: 'Le fournisseur possède sa couche de virtualisation. Le client doit connaître cette frontière, mais ne peut normalement pas administrer cet hyperviseur.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Supplying backup power to the provider data centre',
          fr: 'Fournir l’alimentation de secours au centre de données du fournisseur',
        },
        correct: false,
        explanation: {
          en: 'Facility power is an infrastructure responsibility of the provider. The customer instead evaluates whether the service commitment meets business needs.',
          fr: 'L’alimentation des locaux relève de l’infrastructure du fournisseur. Le client évalue plutôt si les engagements du service couvrent ses besoins métier.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-005',
    objective: '3.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Compared with a monolithic application, what security challenge is increased by microservices?',
      fr: 'Par rapport à une application monolithique, quel défi de sécurité augmente avec les microservices ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Authenticating and monitoring many service-to-service API calls',
          fr: 'Authentifier et surveiller de nombreux appels API entre services',
        },
        correct: true,
        explanation: {
          en: 'Splitting the application creates more independently addressed services and trust relationships, so internal API identity and visibility become central concerns.',
          fr: 'Découper l’application crée davantage de services adressables et de relations de confiance ; identité des API et visibilité internes deviennent centrales.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Maintaining a single, indivisible deployment boundary',
          fr: 'Maintenir une frontière de déploiement unique et indivisible',
        },
        correct: false,
        explanation: {
          en: 'That is characteristic of a monolith. Microservices intentionally create separate deployment and fault boundaries for individual services.',
          fr: 'Cette propriété caractérise le monolithe. Les microservices créent volontairement des frontières de déploiement et de panne distinctes.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Providing a separate physical server for every function',
          fr: 'Fournir un serveur physique distinct pour chaque fonction',
        },
        correct: false,
        explanation: {
          en: 'A microservice is a software boundary, not a requirement for dedicated hardware. Multiple services commonly share virtualized or container infrastructure.',
          fr: 'Un microservice est une frontière logicielle, pas une exigence de matériel dédié. Plusieurs services partagent souvent une infrastructure virtualisée ou conteneurisée.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Removing the need to inventory software dependencies',
          fr: 'Supprimer le besoin d’inventorier les dépendances logicielles',
        },
        correct: false,
        explanation: {
          en: 'Independent services can introduce more runtimes and libraries. Dependency inventory becomes more important, not less, as the service count grows.',
          fr: 'Des services indépendants peuvent multiplier moteurs et bibliothèques. Leur inventaire devient plus important, pas moins, quand le nombre de services augmente.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-006',
    objective: '3.1',
    kind: 'discrimination',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'Which statements correctly compare network isolation approaches? (Select all that apply.)',
      fr: 'Quels énoncés comparent correctement les méthodes d’isolement réseau ? (Sélectionne toutes les réponses correctes.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Logical segmentation separates trust zones while allowing shared infrastructure',
          fr: 'La segmentation logique sépare les zones de confiance tout en partageant l’infrastructure',
        },
        correct: true,
        explanation: {
          en: 'Policy-enforced logical boundaries can contain traffic on common equipment, making segmentation flexible but dependent on correct configuration.',
          fr: 'Des frontières logiques appliquées par des règles contiennent les flux sur du matériel commun, avec une souplesse qui dépend de la bonne configuration.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'An air-gapped system still needs controlled methods for updates and data transfer',
          fr: 'Un système coupé des réseaux exige encore des méthodes contrôlées de mise à jour et de transfert',
        },
        correct: true,
        explanation: {
          en: 'Removing direct network paths does not remove operational exchange. Removable media and maintenance workflows can still carry threats across the gap.',
          fr: 'Supprimer les liaisons directes ne supprime pas les échanges opérationnels. Supports amovibles et maintenance peuvent encore transporter une menace.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Physical isolation is normally cheaper and more flexible than segmentation',
          fr: 'L’isolement physique est normalement moins cher et plus souple que la segmentation',
        },
        correct: false,
        explanation: {
          en: 'Dedicated hardware can create a stronger boundary, but it generally costs more and is less flexible than policies on shared infrastructure.',
          fr: 'Du matériel dédié peut former une frontière plus forte, mais coûte généralement plus cher et reste moins souple que des règles sur une infrastructure partagée.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'SDN eliminates the need to protect network management access',
          fr: 'Le SDN supprime le besoin de protéger les accès de gestion du réseau',
        },
        correct: false,
        explanation: {
          en: 'SDN concentrates programmable control in its management plane. That makes administrative access and controller resilience more critical, not unnecessary.',
          fr: 'Le SDN concentre le contrôle programmable dans son plan de gestion. Les accès administratifs et la résilience du contrôleur deviennent donc plus critiques.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-007',
    objective: '3.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'What best distinguishes a decentralized architecture from a centralized one?',
      fr: 'Qu’est-ce qui distingue le mieux une architecture décentralisée d’une architecture centralisée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It distributes control, reducing dependence on one centre but complicating consistent governance',
          fr: 'Elle distribue le contrôle, réduit la dépendance à un centre, mais complique la gouvernance cohérente',
        },
        correct: true,
        explanation: {
          en: 'Decentralization can avoid a single control point, while policy distribution, asset inventory, and coordinated response become harder to maintain.',
          fr: 'La décentralisation peut éviter un point de contrôle unique, mais complique la diffusion des règles, l’inventaire et la réponse coordonnée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It guarantees identical policy enforcement at every node',
          fr: 'Elle garantit une application identique des règles sur chaque nœud',
        },
        correct: false,
        explanation: {
          en: 'Consistent enforcement is generally easier with centralized control. Distributed authority increases the work needed to keep every node aligned.',
          fr: 'Une application cohérente est généralement plus facile avec un contrôle central. Une autorité distribuée demande davantage de travail pour aligner chaque nœud.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It requires every component to operate on separate physical hardware',
          fr: 'Elle impose à chaque composant de fonctionner sur du matériel physique distinct',
        },
        correct: false,
        explanation: {
          en: 'Decentralization concerns where authority or processing resides, not whether components share physical hosts or use virtualization.',
          fr: 'La décentralisation concerne la localisation de l’autorité ou du traitement, pas le partage d’hôtes physiques ni la virtualisation.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It moves every customer security duty to a cloud provider',
          fr: 'Elle transfère toutes les tâches de sécurité du client à un fournisseur du nuage',
        },
        correct: false,
        explanation: {
          en: 'Centralization is independent of cloud responsibility. A distributed design can be on-premises, and cloud customers still retain assigned duties.',
          fr: 'La centralisation est indépendante des responsabilités du nuage. Un modèle distribué peut être sur site, et le client conserve ses tâches attribuées.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-008',
    objective: '3.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which statement most accurately compares containers with virtual machines?',
      fr: 'Quel énoncé compare le plus justement les conteneurs aux machines virtuelles ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Containers usually share a host kernel; each virtual machine has a guest operating system',
          fr: 'Les conteneurs partagent généralement le noyau hôte ; chaque machine virtuelle possède un système invité',
        },
        correct: true,
        explanation: {
          en: 'This architectural boundary explains the lower container overhead and why kernel and orchestration security are especially important for containers.',
          fr: 'Cette frontière explique le faible coût des conteneurs et pourquoi la sécurité du noyau et de l’orchestration y est particulièrement importante.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Containers always provide stronger isolation because they start faster',
          fr: 'Les conteneurs isolent toujours mieux parce qu’ils démarrent plus vite',
        },
        correct: false,
        explanation: {
          en: 'Startup speed and isolation strength are different properties. Sharing the host kernel commonly gives containers a thinner boundary than a guest OS.',
          fr: 'Vitesse de démarrage et force d’isolement sont distinctes. Le partage du noyau donne souvent au conteneur une frontière plus mince qu’un système invité.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Virtual machines do not require guest operating system patches',
          fr: 'Les machines virtuelles n’exigent aucun correctif du système invité',
        },
        correct: false,
        explanation: {
          en: 'Every guest operating system remains software that must be maintained. Virtualization does not transfer all guest patching to the hypervisor.',
          fr: 'Chaque système invité reste un logiciel à maintenir. La virtualisation ne transfère pas tous ses correctifs à l’hyperviseur.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Virtualization removes risk from shared physical resources',
          fr: 'La virtualisation supprime les risques liés aux ressources physiques partagées',
        },
        correct: false,
        explanation: {
          en: 'Virtual machines still share a hypervisor and physical host. Hypervisor compromise and resource contention can therefore affect multiple guests.',
          fr: 'Les machines virtuelles partagent encore hyperviseur et hôte physique. Compromission de l’hyperviseur et concurrence de ressources peuvent affecter plusieurs invités.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-009',
    objective: '3.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which architecture is specifically designed to provide predictable responses within timing constraints?',
      fr: 'Quelle architecture est spécialement conçue pour fournir des réponses prévisibles sous des contraintes de temps ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A real-time operating system (RTOS)',
          fr: 'Un système d’exploitation temps réel (RTOS)',
        },
        correct: true,
        explanation: {
          en: 'An RTOS prioritizes deterministic timing. Security mechanisms must therefore be evaluated for whether they disrupt required response deadlines.',
          fr: 'Un RTOS privilégie un temps déterministe. Les contrôles de sécurité doivent donc être évalués selon leur effet sur les délais de réponse requis.',
        },
      },
      {
        id: 'b',
        text: { en: 'A high-availability cluster', fr: 'Une grappe à haute disponibilité' },
        correct: false,
        explanation: {
          en: 'High availability keeps a service operating through component failure. It does not by itself guarantee deterministic completion within a timing deadline.',
          fr: 'La haute disponibilité maintient le service malgré une panne de composant. Elle ne garantit pas à elle seule une exécution déterministe dans un délai précis.',
        },
      },
      {
        id: 'c',
        text: { en: 'A decentralized cloud tenant', fr: 'Un locataire décentralisé dans le nuage' },
        correct: false,
        explanation: {
          en: 'Distributing control can affect resilience and governance, but decentralization is not an operating-system design for deterministic response time.',
          fr: 'Distribuer le contrôle peut modifier résilience et gouvernance, mais la décentralisation ne conçoit pas un système pour un délai de réponse déterministe.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'An infrastructure-as-code repository',
          fr: 'Un dépôt d’infrastructure en tant que code',
        },
        correct: false,
        explanation: {
          en: 'IaC provides repeatable infrastructure definitions and deployment. It does not schedule runtime tasks to meet strict timing constraints.',
          fr: 'L’IaC fournit des définitions et déploiements reproductibles. Elle ne planifie pas les tâches en exécution pour respecter des contraintes temporelles strictes.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-010',
    objective: '3.1',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A factory uses a vendor-locked SCADA controller that cannot be patched until the next certified shutdown. What is the best architectural response in the meantime?',
      fr: 'Une usine emploie un contrôleur SCADA verrouillé par le fournisseur, impossible à corriger avant le prochain arrêt certifié. Quelle réponse architecturale convient le mieux entre-temps ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Segment it, restrict management paths, and monitor it with compensating controls',
          fr: 'Le segmenter, restreindre ses voies de gestion et le surveiller avec des contrôles compensatoires',
        },
        correct: true,
        explanation: {
          en: 'When direct remediation is temporarily impossible, reducing reachable paths and watching permitted activity lowers exposure without unsafe operational change.',
          fr: 'Quand la correction directe est temporairement impossible, réduire les chemins accessibles et surveiller les activités autorisées limite l’exposition sans changement dangereux.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Install the unapproved patch immediately to maximize responsiveness',
          fr: 'Installer immédiatement le correctif non approuvé pour maximiser la réactivité',
        },
        correct: false,
        explanation: {
          en: 'Ignoring the certified shutdown can create safety and availability consequences. Responsiveness does not override the operational constraints of control systems.',
          fr: 'Ignorer l’arrêt certifié peut nuire à la sûreté et à la disponibilité. La réactivité ne prime pas sur les contraintes des systèmes de contrôle.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Move the controller into a general user network for easier maintenance',
          fr: 'Déplacer le contrôleur vers le réseau utilisateur général pour faciliter la maintenance',
        },
        correct: false,
        explanation: {
          en: 'A general user network adds exposure and unrelated traffic. Easier access is the opposite of the restricted path needed for an unpatched controller.',
          fr: 'Un réseau utilisateur ajoute exposition et flux sans rapport. Un accès plus facile contredit la voie restreinte nécessaire à un contrôleur non corrigé.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Rely on high availability because redundancy removes the vulnerability',
          fr: 'S’appuyer sur la haute disponibilité puisque la redondance supprime la vulnérabilité',
        },
        correct: false,
        explanation: {
          en: 'Redundancy can keep the process available, but duplicated vulnerable controllers remain vulnerable. Availability does not remediate the security flaw.',
          fr: 'La redondance peut maintenir le procédé, mais des contrôleurs vulnérables dupliqués le restent. La disponibilité ne corrige pas la faille de sécurité.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-011',
    objective: '3.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Why does high availability not replace backups?',
      fr: 'Pourquoi la haute disponibilité ne remplace-t-elle pas les sauvegardes ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Redundant systems can replicate corruption while backups can preserve an earlier state',
          fr: 'Les systèmes redondants peuvent répliquer une corruption, tandis que les sauvegardes préservent un état antérieur',
        },
        correct: true,
        explanation: {
          en: 'High availability addresses continued service after component failure. A recoverable historical copy addresses destructive or corrupted changes to data.',
          fr: 'La haute disponibilité maintient le service après une panne de composant. Une copie historique récupérable traite les modifications destructrices ou corrompues.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Backups automatically provide lower latency than redundant systems',
          fr: 'Les sauvegardes fournissent automatiquement une latence inférieure aux systèmes redondants',
        },
        correct: false,
        explanation: {
          en: 'A backup is normally restored after an event and is not a live low-latency service path. Latency is not the distinction between these controls.',
          fr: 'Une sauvegarde est généralement restaurée après un événement et ne constitue pas un chemin actif à faible latence. La latence ne distingue pas ces contrôles.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'High availability prevents every malicious change from reaching data',
          fr: 'La haute disponibilité empêche toute modification malveillante d’atteindre les données',
        },
        correct: false,
        explanation: {
          en: 'Availability mechanisms may replicate a malicious change to every node. They keep components operating but do not validate every data modification.',
          fr: 'Les mécanismes de disponibilité peuvent répliquer une modification malveillante sur tous les nœuds. Ils maintiennent le service sans valider chaque changement.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Backups remove the need for redundant power and network paths',
          fr: 'Les sauvegardes suppriment le besoin de chemins réseau et électriques redondants',
        },
        correct: false,
        explanation: {
          en: 'Backups support restoration but do not keep a live service running through a power or path failure. Those availability dependencies still require treatment.',
          fr: 'Les sauvegardes servent la restauration, mais ne maintiennent pas un service actif pendant une panne électrique ou réseau. Ces dépendances restent à traiter.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-012',
    objective: '3.1',
    kind: 'discrimination',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'A controller is built into a medical device for one dedicated function, and its operating system must respond within a fixed deadline. Which classifications apply? (Select all that apply.)',
      fr: 'Un contrôleur est intégré à un appareil médical pour une seule fonction dédiée, et son système d’exploitation doit répondre dans un délai fixe. Quelles classifications s’appliquent ? (Sélectionne toutes les réponses correctes.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Embedded system, because computing is built into a device for a dedicated purpose',
          fr: 'Système embarqué, car le calcul est intégré à un appareil pour une fonction dédiée',
        },
        correct: true,
        explanation: {
          en: 'A narrow function integrated into a larger physical device is the defining embedded-system characteristic, regardless of whether it also has connectivity.',
          fr: 'Une fonction précise intégrée à un appareil physique définit un système embarqué, que celui-ci dispose ou non d’une connexion réseau.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'RTOS-based system, because deterministic timing is a stated requirement',
          fr: 'Système fondé sur un RTOS, car un délai déterministe est explicitement exigé',
        },
        correct: true,
        explanation: {
          en: 'The fixed response deadline is the clue for real-time operation. Security controls must preserve that deterministic timing requirement.',
          fr: 'Le délai de réponse fixe indique un fonctionnement temps réel. Les contrôles de sécurité doivent préserver cette exigence temporelle déterministe.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'IoT system, because every dedicated device is necessarily network-connected',
          fr: 'Système IoT, car tout appareil dédié est nécessairement connecté au réseau',
        },
        correct: false,
        explanation: {
          en: 'A dedicated embedded function does not prove network connectivity. IoT classification requires the connected-device characteristic, which the stem does not provide.',
          fr: 'Une fonction embarquée dédiée ne prouve aucune connexion réseau. La catégorie IoT exige cette caractéristique, absente de l’énoncé.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'ICS/SCADA system, because every device with a response deadline controls industry',
          fr: 'Système ICS ou SCADA, car tout appareil soumis à un délai contrôle un procédé industriel',
        },
        correct: false,
        explanation: {
          en: 'ICS and SCADA monitor or control industrial processes. A medical device with deterministic timing is not automatically part of an industrial control architecture.',
          fr: 'ICS et SCADA surveillent ou commandent des procédés industriels. Le délai déterministe d’un appareil médical ne le transforme pas en contrôle industriel.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-013',
    objective: '3.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An online service reacts quickly to each request but cannot add enough capacity during seasonal demand. Which consideration is deficient?',
      fr: 'Un service en ligne répond rapidement à chaque requête, mais ne peut pas ajouter assez de capacité lors des pics saisonniers. Quelle considération est insuffisante ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Scalability', fr: 'L’évolutivité' },
        correct: true,
        explanation: {
          en: 'The design cannot expand capacity as demand grows, which is a scalability problem even though individual responses remain fast.',
          fr: 'La conception ne peut pas accroître sa capacité avec la demande : le problème relève donc de l’évolutivité malgré des réponses individuelles rapides.',
        },
      },
      {
        id: 'b',
        text: { en: 'Responsiveness', fr: 'La réactivité' },
        correct: false,
        explanation: {
          en: 'Responsiveness is explicitly healthy because each request receives a quick reaction. The missing property is capacity growth, not reaction speed.',
          fr: 'La réactivité est explicitement bonne puisque chaque requête obtient une réponse rapide. Il manque la croissance de capacité, pas la vitesse de réaction.',
        },
      },
      {
        id: 'c',
        text: { en: 'Risk transference', fr: 'Le transfert du risque' },
        correct: false,
        explanation: {
          en: 'No contract or financial allocation of loss is described. Transferring consequences would not itself create the additional processing capacity needed.',
          fr: 'Aucun contrat ni partage financier des pertes n’est décrit. Transférer les conséquences ne créerait pas la capacité de traitement supplémentaire requise.',
        },
      },
      {
        id: 'd',
        text: { en: 'Physical isolation', fr: 'L’isolement physique' },
        correct: false,
        explanation: {
          en: 'Physical separation concerns trust boundaries and shared components. It does not describe whether a service can expand to meet increased demand.',
          fr: 'La séparation physique concerne les frontières de confiance et composants partagés. Elle ne décrit pas la capacité du service à suivre une demande croissante.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-014',
    objective: '3.1',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'Which statement correctly distinguishes patch availability from inability to patch?',
      fr: 'Quel énoncé distingue correctement disponibilité des correctifs et impossibilité de les appliquer ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Availability asks whether a maintained fix exists; inability describes a constraint that prevents applying it',
          fr: 'La disponibilité demande si une correction maintenue existe ; l’impossibilité décrit une contrainte qui empêche de l’appliquer',
        },
        correct: true,
        explanation: {
          en: 'A vendor may not publish a fix, or an organisation may be unable to install an existing fix safely. Those are neighbouring but distinct conditions.',
          fr: 'Un fournisseur peut ne publier aucune correction, ou une organisation peut ne pas pouvoir installer sans danger une correction existante. Ces situations sont distinctes.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'They are two names for the same high-availability control',
          fr: 'Ce sont deux noms du même contrôle de haute disponibilité',
        },
        correct: false,
        explanation: {
          en: 'High availability concerns service continuity. Patch availability and operational inability concern whether vulnerability remediation exists and can be deployed.',
          fr: 'La haute disponibilité concerne la continuité du service. Les deux notions de correctif portent sur l’existence et le déploiement possible d’une correction.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Patch availability means every published patch has already been installed',
          fr: 'La disponibilité signifie que chaque correctif publié est déjà installé',
        },
        correct: false,
        explanation: {
          en: 'The existence of a vendor fix does not prove deployment. Testing, compatibility, maintenance windows, or operational constraints may delay installation.',
          fr: 'L’existence d’une correction fournisseur ne prouve pas son déploiement. Tests, compatibilité, maintenance ou contraintes opérationnelles peuvent le retarder.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Inability to patch means the device has no network connection',
          fr: 'L’impossibilité de corriger signifie que l’appareil ne possède aucune connexion réseau',
        },
        correct: false,
        explanation: {
          en: 'An offline device can receive controlled updates, while a connected device may be unpatchable because of vendor, safety, or compatibility constraints.',
          fr: 'Un appareil hors ligne peut recevoir des mises à jour contrôlées, tandis qu’un appareil connecté peut rester incorrigible pour des raisons de fournisseur ou de sûreté.',
        },
      },
    ],
  },
  {
    id: 'q-3-1-015',
    objective: '3.1',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'When comparing an on-premises deployment with a provider-hosted one, which pair of considerations most directly covers processing resources and facility energy requirements?',
      fr: 'Lors de la comparaison entre un déploiement sur site et un hébergement fournisseur, quelle paire de considérations couvre directement les ressources de traitement et les besoins énergétiques des locaux ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Compute and power', fr: 'La capacité de calcul et l’alimentation électrique' },
        correct: true,
        explanation: {
          en: 'Compute measures processing capacity for workloads and controls, while power covers primary supply, backup energy, cooling, and related site dependencies.',
          fr: 'La capacité de calcul mesure les ressources de traitement ; l’alimentation couvre source principale, secours, refroidissement et dépendances du site.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Responsiveness and risk transference',
          fr: 'La réactivité et le transfert du risque',
        },
        correct: false,
        explanation: {
          en: 'Responsiveness measures reaction speed and risk transference reallocates consequences. Neither directly inventories processors or facility energy needs.',
          fr: 'La réactivité mesure la vitesse de réponse et le transfert répartit les conséquences. Aucun des deux ne recense directement processeurs ou besoins énergétiques.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Patch availability and logical segmentation',
          fr: 'La disponibilité des correctifs et la segmentation logique',
        },
        correct: false,
        explanation: {
          en: 'Those address software remediation and network trust boundaries. They do not directly express processing capacity or the power engineering of a site.',
          fr: 'Ces notions traitent la correction logicielle et les frontières réseau. Elles n’expriment directement ni capacité de traitement ni ingénierie électrique du site.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Ease of recovery and centralization',
          fr: 'La facilité de reprise et la centralisation',
        },
        correct: false,
        explanation: {
          en: 'Recovery concerns restoration effort and centralization concerns control placement. They are relevant trade-offs but not the named resource considerations.',
          fr: 'La reprise concerne l’effort de restauration et la centralisation le placement du contrôle. Ces compromis ne nomment pas les ressources demandées.',
        },
      },
    ],
  },
];
