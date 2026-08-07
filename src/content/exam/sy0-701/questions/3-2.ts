import type { Question } from '@/content/schemas';

/**
 * Objective 3.2 — Given a scenario, apply security principles to secure enterprise infrastructure.
 *
 * Every question is original and derived only from the published objective. None reproduces,
 * paraphrases, or reconstructs a real exam item — see NOTICE.md.
 */
export const QUESTIONS_3_2: Question[] = [
  {
    id: 'q-3-2-001',
    objective: '3.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A public ordering application must continue accepting HTTPS, but malicious HTTP requests targeting the application must be blocked. Which control is the most precise choice?',
      fr: 'Une application publique de commande doit continuer à accepter HTTPS, mais les requêtes HTTP malveillantes visant l’application doivent être bloquées. Quel contrôle constitue le choix le plus précis ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A web application firewall', fr: 'Un pare-feu d’application web' },
        correct: true,
        explanation: {
          en: 'A WAF examines HTTP/S requests for application-layer attacks while allowing legitimate web traffic to reach the application.',
          fr: 'Un WAF examine les requêtes HTTP/S pour détecter les attaques applicatives tout en laissant le trafic web légitime atteindre l’application.',
        },
      },
      {
        id: 'b',
        text: { en: 'A Layer 4 firewall rule', fr: 'Une règle de pare-feu de couche 4' },
        correct: false,
        explanation: {
          en: 'A Layer 4 rule can allow or deny TCP 443, but it does not interpret the malicious HTTP request carried inside that permitted connection.',
          fr: 'Une règle de couche 4 peut autoriser ou refuser TCP 443, mais elle n’interprète pas la requête HTTP malveillante transportée dans la connexion permise.',
        },
      },
      {
        id: 'c',
        text: { en: 'A passive network IDS', fr: 'Un IDS réseau passif' },
        correct: false,
        explanation: {
          en: 'A passive IDS can detect and alert on suspicious requests, but it is not positioned to block the request before the application receives it.',
          fr: 'Un IDS passif peut détecter et signaler les requêtes suspectes, mais il n’est pas placé pour les bloquer avant leur arrivée à l’application.',
        },
      },
      {
        id: 'd',
        text: { en: 'A load balancer', fr: 'Un répartiteur de charge' },
        correct: false,
        explanation: {
          en: 'A load balancer distributes requests among service instances; distribution alone does not identify or block attacks against application logic.',
          fr: 'Un répartiteur distribue les requêtes entre les instances du service ; cette distribution seule n’identifie ni ne bloque les attaques contre la logique applicative.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-002',
    objective: '3.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'What is the security trade-off between fail-open and fail-closed behavior?',
      fr: 'Quel compromis de sécurité distingue le comportement d’ouverture et de fermeture en cas de panne ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Fail-open favors connectivity; fail-closed favors continued enforcement',
          fr: 'L’ouverture favorise la connectivité ; la fermeture favorise le maintien du contrôle',
        },
        correct: true,
        explanation: {
          en: 'Fail-open permits traffic when the control fails, preserving availability. Fail-closed blocks traffic, preserving the security boundary at the cost of service.',
          fr: 'L’ouverture laisse passer le trafic quand le contrôle tombe en panne et préserve la disponibilité. La fermeture bloque le trafic et maintient la frontière au prix du service.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Fail-open inspects applications; fail-closed inspects ports',
          fr: 'L’ouverture inspecte les applications ; la fermeture inspecte les ports',
        },
        correct: false,
        explanation: {
          en: 'Application and port inspection describe firewall layers, not failure behavior. Either kind of inspection could be configured to fail open or closed.',
          fr: 'L’inspection des applications ou des ports décrit les couches du pare-feu, pas son comportement en panne. Chacune peut employer une ouverture ou une fermeture.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Fail-open is passive; fail-closed is always active',
          fr: 'L’ouverture est passive ; la fermeture est toujours active',
        },
        correct: false,
        explanation: {
          en: 'Active and passive describe whether a control acts on traffic. Failure mode instead describes what happens after that control stops operating.',
          fr: 'Actif et passif indiquent si un contrôle agit sur le trafic. Le mode de panne décrit plutôt ce qui arrive lorsque ce contrôle cesse de fonctionner.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Fail-open encrypts traffic; fail-closed authenticates it',
          fr: 'L’ouverture chiffre le trafic ; la fermeture l’authentifie',
        },
        correct: false,
        explanation: {
          en: 'Encryption and authentication are security functions unrelated to the choice of permitting or stopping traffic after an enforcement device fails.',
          fr: 'Le chiffrement et l’authentification sont des fonctions sans rapport avec le choix de laisser passer ou d’arrêter le trafic après une panne.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-003',
    objective: '3.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which statement correctly distinguishes an active security device from a passive one?',
      fr: 'Quelle affirmation distingue correctement un dispositif de sécurité actif d’un dispositif passif ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'An active device can take action on traffic; a passive device observes and reports',
          fr: 'Un dispositif actif peut agir sur le trafic ; un dispositif passif observe et signale',
        },
        correct: true,
        explanation: {
          en: 'The distinction concerns behavior: prevention or another action is active, while collection and alerting without direct intervention are passive.',
          fr: 'La distinction porte sur le comportement : prévenir ou entreprendre une action est actif, tandis que collecter et alerter sans intervenir est passif.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'An active device is always wireless; a passive device is always wired',
          fr: 'Un dispositif actif est toujours sans fil ; un dispositif passif est toujours filaire',
        },
        correct: false,
        explanation: {
          en: 'The transmission medium does not define active or passive behavior. Wired and wireless controls can both observe traffic or act upon it.',
          fr: 'Le support de transmission ne définit pas le comportement actif ou passif. Des contrôles filaires ou sans fil peuvent observer le trafic ou agir sur lui.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'An active device operates at Layer 7; a passive device operates at Layer 4',
          fr: 'Un dispositif actif fonctionne en couche 7 ; un dispositif passif en couche 4',
        },
        correct: false,
        explanation: {
          en: 'Inspection layer and response behavior are separate properties. A passive sensor may inspect application data, and an active control may enforce Layer 4 rules.',
          fr: 'La couche d’inspection et le comportement sont des propriétés distinctes. Un capteur passif peut inspecter des données applicatives et un contrôle actif appliquer des règles de couche 4.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'An active device must be cloud-based; a passive device must be on-premises',
          fr: 'Un dispositif actif doit être dans le nuage ; un dispositif passif doit être sur site',
        },
        correct: false,
        explanation: {
          en: 'Hosting location does not determine whether a control takes action. Active and passive functions can be delivered in either deployment model.',
          fr: 'Le lieu d’hébergement ne détermine pas si un contrôle entreprend une action. Des fonctions actives et passives existent dans les deux modèles de déploiement.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-004',
    objective: '3.2',
    kind: 'discrimination',
    difficulty: 'easy',
    prompt: {
      en: 'Which property most directly separates a network IPS from a network IDS?',
      fr: 'Quelle propriété distingue le plus directement un IPS réseau d’un IDS réseau ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The IPS can block suspicious traffic inline',
          fr: 'L’IPS peut bloquer le trafic suspect en ligne',
        },
        correct: true,
        explanation: {
          en: 'An IPS is an active enforcement control, normally inline so it can stop traffic. An IDS primarily detects, records, and alerts.',
          fr: 'Un IPS est un contrôle actif, normalement en ligne afin de pouvoir arrêter le trafic. Un IDS détecte, enregistre et alerte principalement.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The IPS can read IP addresses, while the IDS cannot',
          fr: 'L’IPS peut lire les adresses IP, contrairement à l’IDS',
        },
        correct: false,
        explanation: {
          en: 'Both systems can inspect network addressing information. Their defining difference is prevention versus detection, not access to packet headers.',
          fr: 'Les deux systèmes peuvent inspecter les informations d’adressage. Leur différence essentielle est la prévention contre la détection, pas l’accès aux en-têtes.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The IDS distributes traffic among servers, while the IPS does not',
          fr: 'L’IDS distribue le trafic entre les serveurs, contrairement à l’IPS',
        },
        correct: false,
        explanation: {
          en: 'Traffic distribution is the primary role of a load balancer. It does not define either an intrusion detection system or an intrusion prevention system.',
          fr: 'La distribution du trafic est le rôle principal d’un répartiteur de charge. Elle ne définit ni un système de détection ni un système de prévention.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The IDS authenticates switch ports, while the IPS does not',
          fr: 'L’IDS authentifie les ports de commutateur, contrairement à l’IPS',
        },
        correct: false,
        explanation: {
          en: 'Port authentication is provided by mechanisms such as 802.1X. An IDS may observe the resulting traffic, but it does not grant port access.',
          fr: 'L’authentification des ports relève de mécanismes comme 802.1X. Un IDS peut observer le trafic qui en résulte, mais il n’accorde pas cet accès.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-005',
    objective: '3.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'Administrators currently connect directly from their laptops to servers in a restricted zone. The security team wants one hardened, strongly authenticated, fully logged administrative route. What should it deploy?',
      fr: 'Des administrateurs se connectent directement depuis leurs portables aux serveurs d’une zone restreinte. L’équipe de sécurité veut une seule route administrative renforcée, fortement authentifiée et entièrement journalisée. Que doit-elle déployer ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A jump server', fr: 'Un serveur de rebond' },
        correct: true,
        explanation: {
          en: 'A jump server centralizes privileged entry into the restricted zone, providing a focused point for hardening, authentication, and session logging.',
          fr: 'Un serveur de rebond centralise l’entrée privilégiée dans la zone restreinte et fournit un point précis pour le renforcement, l’authentification et la journalisation.',
        },
      },
      {
        id: 'b',
        text: { en: 'A load balancer', fr: 'Un répartiteur de charge' },
        correct: false,
        explanation: {
          en: 'A load balancer spreads service requests across back ends. It does not create a controlled administrative route or centralize privileged sessions.',
          fr: 'Un répartiteur distribue les demandes de service entre les serveurs. Il ne crée pas une route administrative contrôlée et ne centralise pas les sessions privilégiées.',
        },
      },
      {
        id: 'c',
        text: { en: 'A passive IDS sensor', fr: 'Un capteur IDS passif' },
        correct: false,
        explanation: {
          en: 'An IDS can observe and alert on administrative traffic, but it neither forces administrators through one route nor terminates their sessions.',
          fr: 'Un IDS peut observer et signaler le trafic administratif, mais il ne force pas les administrateurs à suivre une route unique et ne termine pas leurs sessions.',
        },
      },
      {
        id: 'd',
        text: { en: 'A port mirror', fr: 'Un port miroir' },
        correct: false,
        explanation: {
          en: 'A port mirror copies switch traffic to a monitoring tool. It improves visibility but provides no authenticated administrative access path.',
          fr: 'Un port miroir copie le trafic du commutateur vers un outil de surveillance. Il améliore la visibilité, mais ne fournit aucun chemin administratif authentifié.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-006',
    objective: '3.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the primary infrastructure role of a load balancer?',
      fr: 'Quel est le rôle principal d’un répartiteur de charge dans l’infrastructure ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Distribute requests across multiple service instances',
          fr: 'Distribuer les requêtes entre plusieurs instances du service',
        },
        correct: true,
        explanation: {
          en: 'A load balancer selects among available back ends, helping capacity and availability by preventing all requests from relying on one instance.',
          fr: 'Un répartiteur choisit parmi les serveurs disponibles et améliore capacité et disponibilité en évitant que toutes les requêtes dépendent d’une seule instance.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Authenticate endpoints before opening a switch port',
          fr: 'Authentifier les terminaux avant d’ouvrir un port de commutateur',
        },
        correct: false,
        explanation: {
          en: 'That is the purpose of port-based access control such as 802.1X. A load balancer handles requests after network access already exists.',
          fr: 'C’est le rôle d’un contrôle d’accès fondé sur le port comme 802.1X. Le répartiteur traite des requêtes après que l’accès réseau existe déjà.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Provide an audited route for privileged administration',
          fr: 'Fournir une route auditée pour l’administration privilégiée',
        },
        correct: false,
        explanation: {
          en: 'A jump server is designed to centralize privileged administration. A load balancer distributes ordinary service demand rather than administrative trust.',
          fr: 'Un serveur de rebond centralise l’administration privilégiée. Un répartiteur distribue la demande de service plutôt que la confiance administrative.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Inspect web requests for application attacks',
          fr: 'Inspecter les requêtes web pour détecter les attaques applicatives',
        },
        correct: false,
        explanation: {
          en: 'That specialized inspection is the role of a WAF. Some products combine functions, but inspection is not what defines load balancing.',
          fr: 'Cette inspection spécialisée relève d’un WAF. Certains produits combinent les fonctions, mais l’inspection ne définit pas la répartition de charge.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-007',
    objective: '3.2',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'In an IEEE 802.1X exchange, which component controls whether the network port is opened?',
      fr: 'Dans un échange IEEE 802.1X, quel composant contrôle l’ouverture du port réseau ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The authenticator, such as a switch or access point',
          fr: 'L’authentificateur, comme un commutateur ou un point d’accès',
        },
        correct: true,
        explanation: {
          en: 'The authenticator controls the port and relays authentication information between the supplicant and the authentication server before granting access.',
          fr: 'L’authentificateur contrôle le port et relaie les informations entre le demandeur et le serveur d’authentification avant d’accorder l’accès.',
        },
      },
      {
        id: 'b',
        text: { en: 'The supplicant', fr: 'Le demandeur' },
        correct: false,
        explanation: {
          en: 'The supplicant is the endpoint requesting access and presenting credentials. It cannot grant itself access to the controlled switch port.',
          fr: 'Le demandeur est le terminal qui sollicite l’accès et présente ses justificatifs. Il ne peut pas s’accorder lui-même l’accès au port contrôlé.',
        },
      },
      {
        id: 'c',
        text: { en: 'The web application firewall', fr: 'Le pare-feu d’application web' },
        correct: false,
        explanation: {
          en: 'A WAF filters HTTP/S requests after network connectivity exists. It does not participate in deciding whether an endpoint may use a switch port.',
          fr: 'Un WAF filtre les requêtes HTTP/S après l’établissement de la connectivité. Il ne décide pas si un terminal peut utiliser un port de commutateur.',
        },
      },
      {
        id: 'd',
        text: { en: 'The network tap', fr: 'La dérivation réseau' },
        correct: false,
        explanation: {
          en: 'A network tap copies traffic for observation and does not enforce access decisions. It cannot open or close an authenticated switch port.',
          fr: 'Une dérivation réseau copie le trafic pour observation et n’applique pas de décision d’accès. Elle ne peut ni ouvrir ni fermer un port authentifié.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-008',
    objective: '3.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Why can a Layer 7 control distinguish traffic that a Layer 4 rule treats identically?',
      fr: 'Pourquoi un contrôle de couche 7 peut-il distinguer des trafics qu’une règle de couche 4 traite de façon identique ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It can interpret application requests and content beyond addresses and ports',
          fr: 'Il peut interpréter les requêtes et le contenu applicatifs au-delà des adresses et des ports',
        },
        correct: true,
        explanation: {
          en: 'Layer 7 inspection understands application semantics, allowing two connections on the same destination port to receive different policy decisions.',
          fr: 'L’inspection de couche 7 comprend la sémantique applicative et permet d’appliquer des décisions différentes à deux connexions utilisant le même port.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It always uses stronger encryption than a Layer 4 control',
          fr: 'Il emploie toujours un chiffrement plus fort qu’un contrôle de couche 4',
        },
        correct: false,
        explanation: {
          en: 'Layer numbers describe what information is inspected, not mandatory encryption strength. Either control may handle encrypted or unencrypted traffic.',
          fr: 'Les numéros de couche décrivent les informations inspectées, pas une force de chiffrement obligatoire. Les deux contrôles peuvent traiter du trafic chiffré ou non.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It is passive, while every Layer 4 control is active',
          fr: 'Il est passif, tandis que tout contrôle de couche 4 est actif',
        },
        correct: false,
        explanation: {
          en: 'Inspection depth does not determine response behavior. Layer 7 and Layer 4 technologies can each be deployed for passive observation or active enforcement.',
          fr: 'La profondeur d’inspection ne détermine pas le comportement. Des technologies de couches 7 et 4 peuvent servir à l’observation passive ou au contrôle actif.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It authenticates the physical switch port before traffic begins',
          fr: 'Il authentifie le port physique du commutateur avant le début du trafic',
        },
        correct: false,
        explanation: {
          en: 'Port authentication is a network access function such as 802.1X. Layer 7 inspection evaluates application traffic after connectivity has been established.',
          fr: 'L’authentification du port est une fonction d’accès réseau comme 802.1X. L’inspection de couche 7 évalue le trafic après l’établissement de la connectivité.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-009',
    objective: '3.2',
    kind: 'recall',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'Which two statements correctly describe firewall categories? (Select two.)',
      fr: 'Quelles sont les deux affirmations qui décrivent correctement les catégories de pare-feu ? (Sélectionne deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'UTM emphasizes several security functions consolidated in one offering',
          fr: 'UTM met l’accent sur plusieurs fonctions de sécurité regroupées dans une même offre',
        },
        correct: true,
        explanation: {
          en: 'Unified threat management is defined by consolidation, commonly combining firewalling with functions such as filtering, malware defense, or intrusion prevention.',
          fr: 'La gestion unifiée des menaces se définit par le regroupement, souvent du pare-feu avec le filtrage, la défense contre les logiciels malveillants ou la prévention d’intrusion.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'NGFW emphasizes application awareness and advanced inspection',
          fr: 'NGFW met l’accent sur la connaissance des applications et l’inspection avancée',
        },
        correct: true,
        explanation: {
          en: 'A next-generation firewall extends conventional enforcement with application-aware policy and deeper inspection rather than relying only on addresses and ports.',
          fr: 'Un pare-feu de nouvelle génération étend le contrôle classique par une politique consciente des applications et une inspection dépassant les adresses et les ports.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A WAF is primarily designed to authenticate devices joining a wired LAN',
          fr: 'Un WAF sert principalement à authentifier les équipements qui rejoignent un réseau filaire',
        },
        correct: false,
        explanation: {
          en: 'A WAF protects web applications by inspecting HTTP/S. Port-based admission of devices is instead handled by access controls such as 802.1X.',
          fr: 'Un WAF protège les applications web en inspectant HTTP/S. L’admission des équipements sur un port relève plutôt de contrôles comme 802.1X.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A Layer 4 firewall identifies malicious application logic inside every HTTPS request',
          fr: 'Un pare-feu de couche 4 identifie la logique applicative malveillante dans chaque requête HTTPS',
        },
        correct: false,
        explanation: {
          en: 'Layer 4 filtering is based mainly on transport and connection information. Understanding HTTP request logic requires application-layer visibility.',
          fr: 'Le filtrage de couche 4 repose surtout sur le transport et l’état des connexions. Comprendre la logique d’une requête HTTP exige une visibilité applicative.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-010',
    objective: '3.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A traveling employee needs protected network access to several internal applications from an untrusted hotel network. Which solution best supplies the secure channel?',
      fr: 'Une personne en déplacement doit accéder de façon protégée à plusieurs applications internes depuis le réseau non fiable d’un hôtel. Quelle solution fournit le mieux le canal sécurisé ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A remote-access VPN', fr: 'Un VPN d’accès distant' },
        correct: true,
        explanation: {
          en: 'A remote-access VPN creates a protected connection from the individual endpoint into enterprise resources across the untrusted hotel network.',
          fr: 'Un VPN d’accès distant crée une connexion protégée entre le terminal individuel et les ressources de l’entreprise à travers le réseau non fiable.',
        },
      },
      {
        id: 'b',
        text: { en: 'A site-to-site VPN', fr: 'Un VPN de site à site' },
        correct: false,
        explanation: {
          en: 'A site-to-site VPN normally connects two networks through gateways. The scenario concerns one roaming endpoint rather than a managed branch network.',
          fr: 'Un VPN de site à site relie normalement deux réseaux par des passerelles. Le scénario porte sur un terminal itinérant, pas sur le réseau géré d’un site.',
        },
      },
      {
        id: 'c',
        text: { en: 'A network tap', fr: 'Une dérivation réseau' },
        correct: false,
        explanation: {
          en: 'A tap copies traffic for monitoring and provides no confidentiality or authenticated remote access across an untrusted network.',
          fr: 'Une dérivation copie le trafic pour la surveillance et ne fournit ni confidentialité ni accès distant authentifié sur un réseau non fiable.',
        },
      },
      {
        id: 'd',
        text: { en: 'A load balancer', fr: 'Un répartiteur de charge' },
        correct: false,
        explanation: {
          en: 'A load balancer distributes requests once they reach a service. It does not protect the employee’s traffic across the hotel network.',
          fr: 'Un répartiteur distribue les requêtes lorsqu’elles atteignent le service. Il ne protège pas le trafic de la personne sur le réseau de l’hôtel.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-011',
    objective: '3.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which distinction between TLS and IPsec is most useful when selecting a tunnel?',
      fr: 'Quelle distinction entre TLS et IPsec est la plus utile lors du choix d’un tunnel ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'TLS commonly protects application sessions; IPsec protects IP packets at the network layer',
          fr: 'TLS protège couramment des sessions applicatives ; IPsec protège les paquets IP au niveau réseau',
        },
        correct: true,
        explanation: {
          en: 'This layer distinction explains why TLS suits many application-specific connections while IPsec commonly supports broader remote-network or site-to-site tunnels.',
          fr: 'Cette distinction de couche explique pourquoi TLS convient à des connexions applicatives, tandis qu’IPsec sert souvent des tunnels réseau ou de site à site plus larges.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'TLS is always unencrypted; IPsec is always encrypted',
          fr: 'TLS est toujours non chiffré ; IPsec est toujours chiffré',
        },
        correct: false,
        explanation: {
          en: 'TLS is specifically used to provide protected communications, including encryption. Calling it unencrypted reverses its central security purpose.',
          fr: 'TLS sert précisément à fournir des communications protégées, y compris par chiffrement. Le qualifier de non chiffré inverse sa fonction centrale.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'TLS authenticates switch ports; IPsec distributes server traffic',
          fr: 'TLS authentifie les ports de commutateur ; IPsec distribue le trafic des serveurs',
        },
        correct: false,
        explanation: {
          en: 'Switch-port authentication belongs to 802.1X, and server distribution belongs to load balancing. Neither function states the difference between these tunnel protocols.',
          fr: 'L’authentification des ports relève de 802.1X et la distribution des serveurs de la répartition de charge. Aucune ne distingue ces protocoles de tunnel.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'TLS requires fail-open behavior; IPsec requires fail-closed behavior',
          fr: 'TLS exige l’ouverture en cas de panne ; IPsec exige la fermeture',
        },
        correct: false,
        explanation: {
          en: 'Failure behavior is an architectural configuration choice, not a defining requirement imposed respectively by TLS and IPsec.',
          fr: 'Le comportement en cas de panne est un choix de configuration architecturale, pas une exigence qui serait imposée respectivement par TLS et IPsec.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-012',
    objective: '3.2',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'A company’s main requirement is consistent cloud-delivered security policy for users, branches, and applications in many locations. Why is SASE a better fit than SD-WAN alone?',
      fr: 'Une entreprise exige avant tout une politique de sécurité cohérente fournie depuis le nuage pour des utilisateurs, sites et applications très dispersés. Pourquoi SASE convient-il mieux que le seul SD-WAN ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'SASE combines wide-area access with cloud-oriented security services',
          fr: 'SASE combine l’accès étendu avec des services de sécurité orientés nuage',
        },
        correct: true,
        explanation: {
          en: 'SASE addresses both distributed connectivity and consistent security enforcement, while SD-WAN alone primarily manages and selects wide-area paths.',
          fr: 'SASE traite la connectivité distribuée et l’application cohérente de la sécurité, tandis que le seul SD-WAN gère surtout la sélection des chemins étendus.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'SASE guarantees that every security device will fail closed',
          fr: 'SASE garantit que chaque équipement de sécurité se fermera en cas de panne',
        },
        correct: false,
        explanation: {
          en: 'SASE is an architecture for delivering access and security services. It does not dictate one universal failure mode for every component.',
          fr: 'SASE est une architecture de fourniture de services d’accès et de sécurité. Il n’impose pas un mode de panne universel à chaque composant.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'SASE replaces endpoint identity with physical port authentication',
          fr: 'SASE remplace l’identité du terminal par l’authentification du port physique',
        },
        correct: false,
        explanation: {
          en: 'Distributed access still depends heavily on user and device identity. Physical port authentication is an adjacent local-access control, not a replacement.',
          fr: 'L’accès distribué dépend toujours fortement de l’identité de la personne et du terminal. L’authentification du port est un contrôle local voisin, pas un remplacement.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'SASE is a dedicated web application firewall for branch servers',
          fr: 'SASE est un pare-feu d’application web dédié aux serveurs de site',
        },
        correct: false,
        explanation: {
          en: 'A WAF has the narrower job of inspecting web application requests. SASE is a broader architecture joining access networking with multiple security capabilities.',
          fr: 'Un WAF a pour rôle plus étroit d’inspecter les requêtes web. SASE est une architecture plus large qui unit réseau d’accès et capacités de sécurité.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-013',
    objective: '3.2',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'An organization has separate user and database VLANs, but any user workstation can connect directly to every database port. Which change most directly creates meaningful security zones?',
      fr: 'Une organisation possède des VLAN distincts pour les utilisateurs et les bases de données, mais tout poste peut joindre directement chaque port de base de données. Quel changement crée le plus directement de véritables zones de sécurité ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Filter inter-zone traffic so only required application flows reach the databases',
          fr: 'Filtrer le trafic entre zones pour que seuls les flux applicatifs nécessaires atteignent les bases',
        },
        correct: true,
        explanation: {
          en: 'Zones become security boundaries when policy controls the flows between them. Restricting database access also limits workstation-driven lateral movement.',
          fr: 'Les zones deviennent des frontières de sécurité lorsqu’une politique contrôle leurs flux. Restreindre l’accès aux bases limite aussi les déplacements latéraux depuis les postes.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Rename the database VLAN to “restricted”',
          fr: 'Renommer le VLAN des bases « restreint »',
        },
        correct: false,
        explanation: {
          en: 'A label documents intent but enforces no boundary. With unrestricted routing, the same attack paths remain available under the new name.',
          fr: 'Une étiquette documente une intention sans appliquer de frontière. Avec un routage sans restriction, les mêmes chemins d’attaque restent disponibles.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Install a load balancer in the user VLAN',
          fr: 'Installer un répartiteur de charge dans le VLAN utilisateur',
        },
        correct: false,
        explanation: {
          en: 'A load balancer distributes requests and does not, by its primary role, restrict which user systems may reach database services across the boundary.',
          fr: 'Un répartiteur distribue les requêtes et ne limite pas, par son rôle principal, les postes autorisés à joindre les services de base à travers la frontière.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Mirror the database traffic to a passive sensor',
          fr: 'Copier le trafic des bases vers un capteur passif',
        },
        correct: false,
        explanation: {
          en: 'A passive sensor improves detection but leaves direct connectivity intact. Observation is useful defense in depth, not the missing segmentation boundary.',
          fr: 'Un capteur passif améliore la détection, mais laisse la connectivité directe intacte. L’observation complète la défense sans créer la frontière manquante.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-014',
    objective: '3.2',
    kind: 'discrimination',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'A plant needs intrusion visibility on a critical network link, but monitoring equipment must not become an outage point. Which two design choices best meet both requirements? (Select two.)',
      fr: 'Une usine veut détecter les intrusions sur une liaison critique, mais l’équipement de surveillance ne doit pas devenir un point de panne. Quels sont les deux choix de conception les plus adaptés ? (Sélectionne deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Use a passive IDS for detection and alerting',
          fr: 'Employer un IDS passif pour la détection et les alertes',
        },
        correct: true,
        explanation: {
          en: 'A passive IDS provides the required visibility without actively blocking production packets, reducing the operational effect of a mistaken detection.',
          fr: 'Un IDS passif fournit la visibilité demandée sans bloquer activement les paquets de production, ce qui réduit l’effet opérationnel d’une mauvaise détection.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Feed the IDS from a network tap or port mirror',
          fr: 'Alimenter l’IDS depuis une dérivation réseau ou un port miroir',
        },
        correct: true,
        explanation: {
          en: 'A tap or mirror gives the IDS a copy of relevant traffic while keeping the monitoring appliance itself outside the production path.',
          fr: 'Une dérivation ou un miroir donne à l’IDS une copie du trafic utile tout en gardant l’équipement de surveillance hors du chemin de production.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Place a fail-closed IPS inline on the critical link',
          fr: 'Placer un IPS à fermeture en ligne sur la liaison critique',
        },
        correct: false,
        explanation: {
          en: 'That choice adds prevention, but a fail-closed inline appliance can stop the critical link when it fails, contradicting the availability requirement.',
          fr: 'Ce choix ajoute la prévention, mais un équipement en ligne à fermeture peut arrêter la liaison critique lors d’une panne, contrairement à l’exigence de disponibilité.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Send all traffic through a jump server',
          fr: 'Faire passer tout le trafic par un serveur de rebond',
        },
        correct: false,
        explanation: {
          en: 'A jump server controls administrative sessions, not arbitrary production traffic. Making all plant traffic depend on it would also introduce an unsuitable bottleneck.',
          fr: 'Un serveur de rebond contrôle les sessions administratives, pas tout trafic de production. En faire dépendre l’usine créerait aussi un goulot inadapté.',
        },
      },
    ],
  },
  {
    id: 'q-3-2-015',
    objective: '3.2',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A company adds an IPS at its main internet gateway, but a separately managed cloud connection still reaches the same internal application without crossing the IPS. What should the architect address first?',
      fr: 'Une entreprise ajoute un IPS à sa passerelle Internet principale, mais une connexion au nuage gérée séparément atteint encore la même application interne sans traverser l’IPS. Que doit traiter l’architecte en premier ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The alternate connectivity path and resulting attack surface',
          fr: 'Le chemin de connectivité alternatif et la surface d’attaque qui en résulte',
        },
        correct: true,
        explanation: {
          en: 'The IPS cannot inspect traffic that bypasses its placement. The architect must remove, restrict, or equivalently protect the alternate route to close the blind spot.',
          fr: 'L’IPS ne peut pas inspecter le trafic qui contourne son emplacement. Il faut supprimer, restreindre ou protéger de façon équivalente la route alternative.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The number of back-end servers behind a load balancer',
          fr: 'Le nombre de serveurs derrière un répartiteur de charge',
        },
        correct: false,
        explanation: {
          en: 'Changing server capacity does not make the cloud path cross the IPS. The weakness is inspection coverage, not request distribution among back ends.',
          fr: 'Modifier la capacité des serveurs ne fait pas traverser l’IPS au chemin du nuage. La faiblesse concerne la couverture d’inspection, pas la distribution des requêtes.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The EAP method used on employee switch ports',
          fr: 'La méthode EAP utilisée sur les ports des employés',
        },
        correct: false,
        explanation: {
          en: 'EAP supports endpoint authentication for network access. It does not correct a separate external route that bypasses the gateway inspection device.',
          fr: 'EAP soutient l’authentification des terminaux pour l’accès réseau. Il ne corrige pas une route externe distincte qui contourne le dispositif d’inspection.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The choice between TLS and IPsec for administrator access',
          fr: 'Le choix entre TLS et IPsec pour l’accès des administrateurs',
        },
        correct: false,
        explanation: {
          en: 'A secure administration tunnel protects management traffic, but it does not force application traffic on the separate cloud connection through the IPS.',
          fr: 'Un tunnel d’administration protège le trafic de gestion, mais ne force pas le trafic applicatif de la connexion au nuage à traverser l’IPS.',
        },
      },
    ],
  },
];
