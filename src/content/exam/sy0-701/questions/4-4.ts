import type { Question } from '@/content/schemas';

/**
 * Objective 4.4 — Explain security alerting and monitoring concepts and tools.
 *
 * Every question is original and written from the published objective. None reproduces,
 * paraphrases, or reconstructs any real exam item — see NOTICE.md.
 */
export const QUESTIONS_4_4: Question[] = [
  {
    id: 'q-4-4-001',
    objective: '4.4',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What distinguishes an SNMP trap from SNMP polling?',
      fr: 'Qu’est-ce qui distingue un piège SNMP de l’interrogation SNMP ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A device sends a trap when an event occurs',
          fr: 'Un équipement envoie un piège lorsqu’un événement survient',
        },
        correct: true,
        explanation: {
          en: 'A trap is an unsolicited message from the managed device. Polling is the management system requesting information on its own schedule.',
          fr: 'Un piège est un message non sollicité de l’équipement géré. L’interrogation consiste au contraire à demander des informations selon un calendrier.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A manager requests a trap at a fixed interval',
          fr: 'Un gestionnaire demande un piège à intervalle fixe',
        },
        correct: false,
        explanation: {
          en: 'That describes polling, not a trap. With polling, the monitoring system initiates the exchange and asks for a device value or state.',
          fr: 'Cela décrit une interrogation, pas un piège. Avec l’interrogation, le système de surveillance initie l’échange et demande une valeur ou un état.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A trap contains the full packet payload for analysis',
          fr: 'Un piège contient le contenu complet des paquets à analyser',
        },
        correct: false,
        explanation: {
          en: 'Packet payload inspection is the role of a protocol analyzer. An SNMP trap is a management notification, not a packet-capture mechanism.',
          fr: 'L’inspection du contenu des paquets relève d’un analyseur de protocole. Un piège SNMP est une notification de gestion, pas un mécanisme de capture.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A trap identifies vulnerable software versions',
          fr: 'Un piège identifie les versions logicielles vulnérables',
        },
        correct: false,
        explanation: {
          en: 'A vulnerability scanner checks for known weaknesses and configuration findings. A trap reports an event a network device chooses to announce.',
          fr: 'Un scanner de vulnérabilités vérifie des faiblesses et constats connus. Un piège signale un événement qu’un équipement réseau choisit d’annoncer.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-002',
    objective: '4.4',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A team needs to identify the source, destination, ports, protocol, and byte count of unusual outbound connections across the network. Which source is the best fit?',
      fr: 'Une équipe doit identifier source, destination, ports, protocole et volume d’octets de connexions sortantes inhabituelles sur le réseau. Quelle source convient le mieux ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'NetFlow records', fr: 'Des enregistrements NetFlow' },
        correct: true,
        explanation: {
          en: 'NetFlow provides conversation metadata, including endpoints, protocol details, and volume. It is designed for broad visibility into traffic patterns.',
          fr: 'NetFlow fournit des métadonnées de conversation, dont extrémités, protocole et volume. Il est conçu pour une large visibilité des tendances de trafic.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Real user monitoring data',
          fr: 'Des données de surveillance des utilisateurs réels',
        },
        correct: false,
        explanation: {
          en: 'Real user monitoring describes user experience in an application. It does not normally provide network-wide records of all communicating endpoints and ports.',
          fr: 'La surveillance des utilisateurs réels décrit leur expérience dans une application. Elle ne fournit normalement pas les enregistrements réseau de toutes les extrémités et tous les ports.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A vulnerability scanner report',
          fr: 'Un rapport de scanner de vulnérabilités',
        },
        correct: false,
        explanation: {
          en: 'A vulnerability scanner reports potential weaknesses in targets. It does not observe the current volume and direction of ordinary network conversations.',
          fr: 'Un scanner de vulnérabilités signale des faiblesses potentielles des cibles. Il n’observe pas le volume et la direction actuels des conversations réseau ordinaires.',
        },
      },
      {
        id: 'd',
        text: { en: 'An SNMP trap', fr: 'Un piège SNMP' },
        correct: false,
        explanation: {
          en: 'An SNMP trap can announce a device event such as an interface state change. It is not a complete record of every traffic conversation.',
          fr: 'Un piège SNMP peut annoncer un événement comme le changement d’état d’une interface. Ce n’est pas un enregistrement complet de chaque conversation réseau.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-003',
    objective: '4.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An online service must detect a failed checkout journey every five minutes, including overnight when no customer is using it. What should the team implement?',
      fr: 'Un service en ligne doit détecter toutes les cinq minutes un parcours de paiement défaillant, y compris la nuit lorsqu’aucun client ne l’utilise. Que doit mettre en œuvre l’équipe ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Synthetic monitoring of the checkout transaction',
          fr: 'Une surveillance synthétique de la transaction de paiement',
        },
        correct: true,
        explanation: {
          en: 'Synthetic monitoring runs a deliberate test on a schedule, so it can detect a failure even when real users are absent from the service.',
          fr: 'La surveillance synthétique exécute un test délibéré selon un calendrier et peut donc détecter une panne même sans utilisateur réel sur le service.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Real user monitoring of checkout sessions',
          fr: 'Une surveillance des utilisateurs réels des sessions de paiement',
        },
        correct: false,
        explanation: {
          en: 'Real user monitoring observes actual activity, which is valuable for experience analysis. It cannot exercise a checkout when nobody is attempting one.',
          fr: 'La surveillance des utilisateurs réels observe l’activité effective, utile pour l’expérience. Elle ne peut pas exercer un paiement lorsque personne ne tente de le faire.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A protocol analyzer on the payment network',
          fr: 'Un analyseur de protocole sur le réseau de paiement',
        },
        correct: false,
        explanation: {
          en: 'A protocol analyzer can inspect traffic in detail, but it does not create a scheduled checkout request. The requirement is an active functional test.',
          fr: 'Un analyseur de protocole peut inspecter le trafic en détail, mais il ne crée pas une requête de paiement planifiée. Le besoin est un test fonctionnel actif.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A weekly vulnerability scan',
          fr: 'Une analyse hebdomadaire des vulnérabilités',
        },
        correct: false,
        explanation: {
          en: 'Vulnerability scanning looks for weaknesses, not whether a business transaction currently completes. A weekly schedule also misses the stated five-minute requirement.',
          fr: 'L’analyse de vulnérabilités cherche des faiblesses, pas la réussite actuelle d’une transaction métier. Un rythme hebdomadaire ne satisfait pas non plus le délai de cinq minutes.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-004',
    objective: '4.4',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'What is the primary benefit of aggregating logs from endpoints, applications, and network devices into one protected location?',
      fr: 'Quel est le principal avantage de l’agrégation des journaux de terminaux, applications et équipements réseau dans un emplacement protégé ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Events can be compared across sources during an investigation',
          fr: 'Les événements peuvent être comparés entre sources pendant une enquête',
        },
        correct: true,
        explanation: {
          en: 'Central aggregation provides a common place and timeline for related evidence. It lets analysts connect activity that would otherwise remain isolated on separate assets.',
          fr: 'L’agrégation centrale fournit un lieu et une chronologie communs aux preuves liées. Elle permet aux analystes de relier des activités autrement isolées sur des actifs séparés.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Every collected event is automatically malicious',
          fr: 'Chaque événement collecté devient automatiquement malveillant',
        },
        correct: false,
        explanation: {
          en: 'Collection preserves and centralises evidence; it does not assign malicious intent. Correlation rules and human triage are needed to interpret activity.',
          fr: 'La collecte conserve et centralise des preuves ; elle n’attribue pas une intention malveillante. Des règles de corrélation et un triage humain sont nécessaires.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Endpoints no longer need local security controls',
          fr: 'Les terminaux n’ont plus besoin de contrôles locaux',
        },
        correct: false,
        explanation: {
          en: 'Central logs improve visibility but do not prevent malware or enforce endpoint policy. Local controls still protect the system where the activity occurs.',
          fr: 'Les journaux centraux améliorent la visibilité mais ne préviennent pas les malwares et n’appliquent pas les politiques de terminal. Des contrôles locaux restent nécessaires.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Archived records no longer require retention decisions',
          fr: 'Les enregistrements archivés ne nécessitent plus de décisions de conservation',
        },
        correct: false,
        explanation: {
          en: 'Aggregation does not determine how long evidence must be retained. Retention and archiving policies remain necessary after logs have been collected centrally.',
          fr: 'L’agrégation ne détermine pas la durée de conservation des preuves. Des politiques de conservation et d’archivage restent nécessaires après la collecte centrale.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-005',
    objective: '4.4',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which tool is designed to identify potential known weaknesses and configuration findings on a target?',
      fr: 'Quel outil est conçu pour identifier des faiblesses connues potentielles et des constats de configuration sur une cible ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Vulnerability scanner', fr: 'Scanner de vulnérabilités' },
        correct: true,
        explanation: {
          en: 'A vulnerability scanner evaluates targets against known checks and reports potential findings. Its results need validation and remediation prioritisation.',
          fr: 'Un scanner de vulnérabilités évalue les cibles selon des contrôles connus et signale des constats potentiels. Ses résultats demandent validation et priorisation.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Data loss prevention system',
          fr: 'Système de prévention des pertes de données',
        },
        correct: false,
        explanation: {
          en: 'DLP focuses on detecting or controlling sensitive data movement. It does not primarily enumerate missing patches or insecure target configuration.',
          fr: 'La DLP vise la détection ou le contrôle des déplacements de données sensibles. Elle n’énumère pas principalement les correctifs manquants ou configurations non sûres.',
        },
      },
      {
        id: 'c',
        text: { en: 'SIEM platform', fr: 'Plateforme SIEM' },
        correct: false,
        explanation: {
          en: 'A SIEM aggregates and correlates events from sources. It may receive scanner results, but it is not itself the mechanism performing the vulnerability checks.',
          fr: 'Un SIEM agrège et corrèle des événements provenant de sources. Il peut recevoir des résultats de scan, mais n’exécute pas lui-même les contrôles de vulnérabilité.',
        },
      },
      {
        id: 'd',
        text: { en: 'SNMP polling service', fr: 'Service d’interrogation SNMP' },
        correct: false,
        explanation: {
          en: 'SNMP polling retrieves managed-device status and counters. It is useful for device health monitoring rather than evaluating software weaknesses on a target.',
          fr: 'L’interrogation SNMP récupère état et compteurs d’équipements gérés. Elle sert à surveiller leur santé, non à évaluer des faiblesses logicielles d’une cible.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-006',
    objective: '4.4',
    kind: 'scenario',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'A company suspects confidential design files are leaving through email and a sanctioned cloud-storage service. Which controls directly address this concern? (Select two.)',
      fr: 'Une entreprise soupçonne que des fichiers de conception confidentiels quittent l’organisation par courriel et un service de stockage infonuagique autorisé. Quels contrôles répondent directement à cette préoccupation ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Data loss prevention policies for the monitored channels',
          fr: 'Des politiques de prévention des pertes de données pour les canaux surveillés',
        },
        correct: true,
        explanation: {
          en: 'DLP can identify sensitive content in approved channels and alert or enforce policy. The fact that a channel is authorised does not make every transfer permitted.',
          fr: 'La DLP peut identifier du contenu sensible dans des canaux autorisés et alerter ou appliquer une politique. Un canal autorisé ne rend pas chaque transfert permis.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'SIEM correlation of email, cloud, and identity events',
          fr: 'Une corrélation SIEM des événements de courriel, nuage et identité',
        },
        correct: true,
        explanation: {
          en: 'A SIEM can correlate events from several sources to investigate the suspected activity. It adds context around who transferred data and from where.',
          fr: 'Un SIEM peut corréler des événements de plusieurs sources pour enquêter sur l’activité suspecte. Il ajoute du contexte sur l’auteur et l’origine des transferts.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Synthetic monitoring of the cloud login page',
          fr: 'Une surveillance synthétique de la page de connexion nuagique',
        },
        correct: false,
        explanation: {
          en: 'Synthetic monitoring verifies service availability or a defined journey. It does not identify confidential file contents or investigate their movement through a channel.',
          fr: 'La surveillance synthétique vérifie la disponibilité ou un parcours défini. Elle n’identifie pas le contenu confidentiel ni n’enquête sur son déplacement dans un canal.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'SNMP traps from the email gateway',
          fr: 'Des pièges SNMP provenant de la passerelle de courriel',
        },
        correct: false,
        explanation: {
          en: 'SNMP traps can notify about device conditions, but they do not inspect data classification or correlate user activity across a cloud-storage service.',
          fr: 'Les pièges SNMP peuvent notifier des conditions d’équipement, mais n’inspectent pas la classification des données ni ne corrèlent l’activité utilisateur avec le stockage nuagique.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-007',
    objective: '4.4',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'An analyst must determine the malformed field inside a suspicious application request. Which tool gives the needed level of evidence?',
      fr: 'Un analyste doit déterminer le champ malformé dans une requête applicative suspecte. Quel outil fournit le niveau de preuve nécessaire ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Protocol analyzer', fr: 'Analyseur de protocole' },
        correct: true,
        explanation: {
          en: 'A protocol analyzer captures and decodes packet and protocol detail, allowing the analyst to inspect the request fields rather than just its summary metadata.',
          fr: 'Un analyseur de protocole capture et décode les détails des paquets et protocoles, permettant d’inspecter les champs de requête plutôt que de simples métadonnées.',
        },
      },
      {
        id: 'b',
        text: { en: 'NetFlow collector', fr: 'Collecteur NetFlow' },
        correct: false,
        explanation: {
          en: 'NetFlow describes that endpoints communicated and how much traffic moved. It normally lacks the application request field needed to inspect malformed content.',
          fr: 'NetFlow décrit les extrémités qui ont communiqué et le volume transféré. Il ne contient normalement pas le champ de requête nécessaire pour inspecter un contenu malformé.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Real user monitoring dashboard',
          fr: 'Tableau de bord de surveillance des utilisateurs réels',
        },
        correct: false,
        explanation: {
          en: 'Real user monitoring can show affected journeys and latency, but it does not generally expose the exact protocol field within a suspect request.',
          fr: 'La surveillance des utilisateurs réels peut montrer parcours affectés et latence, mais elle n’expose généralement pas le champ de protocole exact d’une requête suspecte.',
        },
      },
      {
        id: 'd',
        text: { en: 'SCAP content feed', fr: 'Flux de contenu SCAP' },
        correct: false,
        explanation: {
          en: 'SCAP supports standardised security and configuration assessment. It is not a live capture source for decoding the contents of a network request.',
          fr: 'SCAP aide à standardiser l’évaluation de sécurité et de configuration. Ce n’est pas une source de capture en direct pour décoder le contenu d’une requête réseau.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-008',
    objective: '4.4',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'What is the main purpose of archiving security logs?',
      fr: 'Quel est le principal objectif de l’archivage des journaux de sécurité ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Retain evidence for later investigation, audit, or policy needs',
          fr: 'Conserver des preuves pour enquête, audit ou besoins de politique ultérieurs',
        },
        correct: true,
        explanation: {
          en: 'Archiving preserves records beyond their immediate operational use so they remain available when an investigation, review, or retention requirement arises later.',
          fr: 'L’archivage préserve des enregistrements au-delà de leur usage opérationnel immédiat afin qu’ils restent disponibles pour enquête, revue ou obligation ultérieure.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Generate immediate notifications for analysts',
          fr: 'Générer des notifications immédiates aux analystes',
        },
        correct: false,
        explanation: {
          en: 'Immediate notification is alerting. Archived data may be valuable later, but placing data in an archive does not by itself notify anyone now.',
          fr: 'La notification immédiate relève de l’alerte. Les données archivées peuvent être utiles plus tard, mais leur placement en archive ne notifie personne immédiatement.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Remove the need to protect log integrity',
          fr: 'Supprimer le besoin de protéger l’intégrité des journaux',
        },
        correct: false,
        explanation: {
          en: 'Older evidence still needs integrity protection because investigators must be able to trust it. Archiving changes location or tier, not the need for safeguards.',
          fr: 'Les preuves anciennes doivent toujours être protégées, car les enquêteurs doivent pouvoir leur faire confiance. L’archivage change de niveau ou d’emplacement, pas ce besoin.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Test whether a web journey is available',
          fr: 'Tester si un parcours web est disponible',
        },
        correct: false,
        explanation: {
          en: 'Testing an application journey is synthetic monitoring. Archiving is retention of already-produced records rather than an active availability test.',
          fr: 'Tester un parcours applicatif relève de la surveillance synthétique. L’archivage est la conservation de traces existantes, pas un test actif de disponibilité.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-009',
    objective: '4.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A SOC receives separate authentication, endpoint-antimalware, and firewall events. It needs one alert when the three events indicate the same attack sequence. What capability is most appropriate?',
      fr: 'Un SOC reçoit séparément des événements d’authentification, d’antimalware de terminal et de pare-feu. Il lui faut une seule alerte lorsque les trois événements indiquent la même séquence d’attaque. Quelle capacité est la plus adaptée ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'SIEM event correlation', fr: 'Corrélation d’événements par un SIEM' },
        correct: true,
        explanation: {
          en: 'A SIEM can aggregate events from diverse sources and correlate them by time, identity, host, or other context to create an actionable detection.',
          fr: 'Un SIEM peut agréger des événements de sources diverses et les corréler par heure, identité, hôte ou contexte afin de créer une détection exploitable.',
        },
      },
      {
        id: 'b',
        text: { en: 'An SNMP trap from the firewall', fr: 'Un piège SNMP du pare-feu' },
        correct: false,
        explanation: {
          en: 'A firewall trap could announce one device event, but it cannot combine that event with authentication and endpoint evidence from different systems.',
          fr: 'Un piège du pare-feu peut annoncer un événement d’équipement, mais ne peut pas le combiner avec des preuves d’authentification et de terminal.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A vulnerability scan of the endpoints',
          fr: 'Une analyse de vulnérabilités des terminaux',
        },
        correct: false,
        explanation: {
          en: 'A scan may find weaknesses but does not correlate the observed events into an attack sequence. The requirement concerns investigation context, not exposure discovery.',
          fr: 'Un scan peut trouver des faiblesses mais ne corrèle pas les événements observés en séquence d’attaque. Le besoin porte sur le contexte d’enquête, pas la découverte d’exposition.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Synthetic monitoring of the firewall portal',
          fr: 'Une surveillance synthétique du portail du pare-feu',
        },
        correct: false,
        explanation: {
          en: 'A synthetic check tests a known service journey. It does not analyse security evidence from three independent telemetry sources.',
          fr: 'Un contrôle synthétique teste un parcours de service connu. Il n’analyse pas des preuves de sécurité issues de trois sources de télémétrie indépendantes.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-010',
    objective: '4.4',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which statement correctly describes a vulnerability scanner finding?',
      fr: 'Quelle affirmation décrit correctement un constat de scanner de vulnérabilités ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It identifies a condition that should be validated and prioritised',
          fr: 'Il identifie une condition qui doit être validée et priorisée',
        },
        correct: true,
        explanation: {
          en: 'Scanner output identifies potential weaknesses or configuration issues. Teams should validate the finding and use risk context to decide remediation priority.',
          fr: 'La sortie du scanner identifie des faiblesses ou problèmes de configuration potentiels. Les équipes doivent valider le constat puis le prioriser selon le risque.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It proves that an attacker exploited the target',
          fr: 'Il prouve qu’un attaquant a exploité la cible',
        },
        correct: false,
        explanation: {
          en: 'A finding indicates exposure, not attacker use. Evidence of exploitation requires other investigation sources such as logs, alerts, endpoint evidence, or packet analysis.',
          fr: 'Un constat indique une exposition, non l’usage par un attaquant. La preuve d’exploitation exige d’autres sources comme journaux, alertes, preuves de terminal ou analyse de paquets.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It replaces patching and configuration management',
          fr: 'Il remplace la gestion des correctifs et de configuration',
        },
        correct: false,
        explanation: {
          en: 'Scanning discovers or verifies issues; patching and configuration management are the activities that correct them. Discovery alone does not reduce the weakness.',
          fr: 'Le scan découvre ou vérifie des problèmes ; la gestion des correctifs et de configuration les corrige. La découverte seule ne réduit pas la faiblesse.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It is a method for preserving logs for audit',
          fr: 'Il est une méthode de conservation des journaux pour audit',
        },
        correct: false,
        explanation: {
          en: 'Log retention and archiving preserve evidence over time. Vulnerability scanning is an active assessment of a target’s current state.',
          fr: 'La conservation et l’archivage des journaux préservent des preuves dans le temps. Le scan de vulnérabilités est une évaluation active de l’état actuel d’une cible.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-011',
    objective: '4.4',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'Users report that an API is slow only in one region. The service’s own health check is green. Which monitoring source best measures the experience of the affected users?',
      fr: 'Des utilisateurs signalent qu’une API est lente dans une seule région. Le contrôle de santé du service est au vert. Quelle source de surveillance mesure le mieux l’expérience des utilisateurs affectés ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Real user monitoring', fr: 'Surveillance des utilisateurs réels' },
        correct: true,
        explanation: {
          en: 'Real user monitoring captures actual sessions and performance as experienced by users, making it well suited to a geographically specific complaint.',
          fr: 'La surveillance des utilisateurs réels capture sessions et performance réellement vécues, ce qui convient à une plainte géographiquement spécifique.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A single synthetic check from the service region',
          fr: 'Un unique contrôle synthétique depuis la région du service',
        },
        correct: false,
        explanation: {
          en: 'A synthetic check can be useful, but one check near the service may not represent the affected users’ route. The question asks for their actual experience.',
          fr: 'Un contrôle synthétique peut être utile, mais un seul contrôle proche du service ne représente pas forcément le chemin des utilisateurs affectés. La question vise leur expérience réelle.',
        },
      },
      {
        id: 'c',
        text: { en: 'An SNMP trap from the API server', fr: 'Un piège SNMP du serveur d’API' },
        correct: false,
        explanation: {
          en: 'An SNMP trap reports a server or device event, such as a state change. It does not measure latency seen by users through a regional path.',
          fr: 'Un piège SNMP signale un événement de serveur ou d’équipement, tel qu’un changement d’état. Il ne mesure pas la latence vue par les utilisateurs sur un chemin régional.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A DLP policy on the API responses',
          fr: 'Une politique DLP sur les réponses d’API',
        },
        correct: false,
        explanation: {
          en: 'DLP governs sensitive data handling and movement. It does not measure API response time or explain a regional application-performance complaint.',
          fr: 'La DLP régit le traitement et le déplacement des données sensibles. Elle ne mesure pas le temps de réponse d’une API ni une plainte régionale de performance.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-012',
    objective: '4.4',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is SCAP primarily used to support?',
      fr: 'À quoi sert principalement SCAP ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Standardised automated security and configuration assessment',
          fr: 'Une évaluation automatisée et standardisée de sécurité et de configuration',
        },
        correct: true,
        explanation: {
          en: 'SCAP supplies standardised content and formats that support automated security and configuration assessment, helping tools express checks consistently.',
          fr: 'SCAP fournit du contenu et des formats standardisés qui soutiennent l’évaluation automatisée de sécurité et de configuration, avec des contrôles cohérents.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Capturing full network packets for decoding',
          fr: 'Capturer des paquets réseau complets pour les décoder',
        },
        correct: false,
        explanation: {
          en: 'Packet capture and decoding are functions of a protocol analyzer. SCAP concerns standardised assessment content and related automation formats.',
          fr: 'La capture et le décodage de paquets sont des fonctions d’analyseur de protocole. SCAP concerne le contenu d’évaluation standardisé et les formats d’automatisation.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Sending unsolicited interface failure messages',
          fr: 'Envoyer des messages non sollicités de panne d’interface',
        },
        correct: false,
        explanation: {
          en: 'Unsolicited interface notifications are an SNMP-trap use case. SCAP does not act as a device event notification protocol.',
          fr: 'Les notifications non sollicitées de panne d’interface relèvent des pièges SNMP. SCAP n’agit pas comme protocole de notification d’événements d’équipement.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Blocking sensitive attachments in email',
          fr: 'Bloquer des pièces jointes sensibles dans les courriels',
        },
        correct: false,
        explanation: {
          en: 'Blocking sensitive data movement is a DLP capability. SCAP may assess configuration, but it does not enforce content-handling policy in email.',
          fr: 'Bloquer le déplacement de données sensibles est une capacité DLP. SCAP peut évaluer une configuration, mais n’applique pas de politique de contenu dans le courriel.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-013',
    objective: '4.4',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Why is alert triage necessary after a monitoring rule fires?',
      fr: 'Pourquoi le triage d’alerte est-il nécessaire après le déclenchement d’une règle de surveillance ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The signal must be assessed for context, confidence, and impact',
          fr: 'Le signal doit être évalué selon son contexte, sa confiance et son impact',
        },
        correct: true,
        explanation: {
          en: 'An alert indicates that a defined condition occurred, not automatically that a confirmed incident exists. Triage determines whether and how the team should respond.',
          fr: 'Une alerte indique qu’une condition définie a eu lieu, pas automatiquement qu’un incident est confirmé. Le triage détermine si et comment l’équipe doit répondre.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Triage converts flow metadata into packet payload',
          fr: 'Le triage transforme les métadonnées de flux en contenu de paquets',
        },
        correct: false,
        explanation: {
          en: 'Triage evaluates evidence; it cannot reconstruct packet contents absent from NetFlow. Packet detail requires an appropriate capture or protocol-analysis source.',
          fr: 'Le triage évalue les preuves ; il ne peut pas recréer un contenu de paquet absent de NetFlow. Le détail exige une capture ou analyse de protocole adaptée.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Triage removes the need to retain evidence',
          fr: 'Le triage supprime le besoin de conserver les preuves',
        },
        correct: false,
        explanation: {
          en: 'Triage may decide an alert is benign, but organisations still need retention practices for operational and audit purposes. Assessment does not erase retention obligations.',
          fr: 'Le triage peut conclure qu’une alerte est bénigne, mais des pratiques de conservation restent nécessaires pour opérations et audit. L’évaluation n’efface pas ces obligations.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Triage makes every rule less sensitive',
          fr: 'Le triage rend chaque règle moins sensible',
        },
        correct: false,
        explanation: {
          en: 'Triage handles a particular signal. Rule tuning may follow repeated analysis, but reducing every threshold would conceal activity instead of evaluating it.',
          fr: 'Le triage traite un signal particulier. Le réglage peut suivre des analyses répétées, mais réduire chaque seuil masquerait l’activité au lieu de l’évaluer.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-014',
    objective: '4.4',
    kind: 'scenario',
    difficulty: 'medium',
    multiSelect: true,
    prompt: {
      en: 'A network operations team needs visibility into both a router interface going down and an unusually large data transfer from a server. Which sources should it use? (Select two.)',
      fr: 'Une équipe d’exploitation réseau doit voir à la fois la chute d’une interface de routeur et un transfert de données anormalement volumineux depuis un serveur. Quelles sources doit-elle utiliser ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'SNMP traps for the interface state change',
          fr: 'Des pièges SNMP pour le changement d’état de l’interface',
        },
        correct: true,
        explanation: {
          en: 'An SNMP trap lets the router send an immediate state notification. It fits the discrete device event of an interface moving down.',
          fr: 'Un piège SNMP permet au routeur d’envoyer une notification immédiate d’état. Il convient à l’événement discret d’une interface qui tombe.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'NetFlow for the transfer metadata and volume',
          fr: 'NetFlow pour les métadonnées et le volume du transfert',
        },
        correct: true,
        explanation: {
          en: 'NetFlow identifies communicating endpoints and the amount of traffic moved, making it appropriate for finding and scoping an unusually large transfer.',
          fr: 'NetFlow identifie les extrémités en communication et la quantité transférée, ce qui convient pour détecter et circonscrire un transfert anormalement volumineux.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Synthetic monitoring for the router interface failure',
          fr: 'Une surveillance synthétique pour la panne d’interface du routeur',
        },
        correct: false,
        explanation: {
          en: 'Synthetic monitoring tests a selected service journey. A router can directly announce its interface event, which is more precise than inferring it from a test.',
          fr: 'La surveillance synthétique teste un parcours de service choisi. Le routeur peut annoncer directement son événement d’interface, plus précisément qu’un test indirect.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'DLP for the router interface state',
          fr: 'La DLP pour l’état de l’interface du routeur',
        },
        correct: false,
        explanation: {
          en: 'DLP focuses on sensitive data handling and movement. It does not monitor whether a network interface is administratively or operationally up.',
          fr: 'La DLP vise le traitement et le déplacement de données sensibles. Elle ne surveille pas l’état administratif ou opérationnel d’une interface réseau.',
        },
      },
    ],
  },
  {
    id: 'q-4-4-015',
    objective: '4.4',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'Which activity communicates accumulated monitoring results and trends to stakeholders rather than notifying them of an immediate condition?',
      fr: 'Quelle activité communique aux parties prenantes les résultats et tendances accumulés de surveillance au lieu de les notifier d’une condition immédiate ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Reporting', fr: 'Rapport' },
        correct: true,
        explanation: {
          en: 'Reporting packages trends, status, and results for an audience. It supports oversight and decisions rather than the immediate operational notification of alerting.',
          fr: 'Le rapport présente tendances, état et résultats à un public. Il soutient supervision et décision plutôt que la notification opérationnelle immédiate d’une alerte.',
        },
      },
      {
        id: 'b',
        text: { en: 'Alerting', fr: 'Alerte' },
        correct: false,
        explanation: {
          en: 'Alerting notifies a defined current condition or threshold so it can be investigated. It is not primarily the periodic communication of accumulated trends.',
          fr: 'L’alerte notifie une condition ou un seuil actuel afin qu’il soit examiné. Elle ne sert pas principalement à communiquer périodiquement des tendances accumulées.',
        },
      },
      {
        id: 'c',
        text: { en: 'Log aggregation', fr: 'Agrégation des journaux' },
        correct: false,
        explanation: {
          en: 'Log aggregation brings records together for use by other activities. It does not by itself organise those records into stakeholder-facing findings and trends.',
          fr: 'L’agrégation des journaux rassemble des traces pour d’autres activités. Elle ne les organise pas, à elle seule, en constats et tendances destinés aux parties prenantes.',
        },
      },
      {
        id: 'd',
        text: { en: 'Remediation', fr: 'Remédiation' },
        correct: false,
        explanation: {
          en: 'Remediation corrects a confirmed issue after investigation. It may be reported later, but it is an action, not the communication activity described.',
          fr: 'La remédiation corrige un problème confirmé après enquête. Elle peut être rapportée ensuite, mais c’est une action et non l’activité de communication décrite.',
        },
      },
    ],
  },
];
