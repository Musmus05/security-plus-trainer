import type { Question } from '@/content/schemas';

/**
 * Objective 4.5 — Given a scenario, modify enterprise capabilities to enhance security.
 *
 * Every question is original and derived from the published objective. The stems distinguish the
 * control point of closely related enterprise capabilities rather than reproducing any exam item.
 */
export const QUESTIONS_4_5: Question[] = [
  {
    id: 'q-4-5-001',
    objective: '4.5',
    kind: 'scenario',
    difficulty: 'easy',
    prompt: {
      en: 'A database server should accept connections only from the application subnet. Which change most directly enforces this requirement?',
      fr: 'Un serveur de base de données ne doit accepter des connexions que depuis le sous-réseau applicatif. Quelle modification applique le plus directement cette exigence ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Add a firewall rule allowing only the application subnet',
          fr: 'Ajouter une règle de pare-feu autorisant seulement le sous-réseau applicatif',
        },
        correct: true,
        explanation: {
          en: 'A firewall rule can restrict connections by source and destination. It enforces the stated network boundary before unwanted sources reach the database service.',
          fr: 'Une règle de pare-feu peut restreindre les connexions selon leur source et leur destination. Elle applique la frontière réseau demandée avant que des sources non voulues atteignent le service.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Create a DLP policy for database exports',
          fr: 'Créer une politique DLP pour les exportations de la base',
        },
        correct: false,
        explanation: {
          en: 'DLP governs sensitive data handling and movement. It could protect an export, but it does not restrict which subnet may establish a database connection.',
          fr: 'La DLP régit le traitement et le déplacement des données sensibles. Elle peut protéger un export, mais ne limite pas le sous-réseau autorisé à ouvrir une connexion.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Enable user behavior analytics for database users',
          fr: 'Activer l’analyse du comportement utilisateur pour les usagers de la base',
        },
        correct: false,
        explanation: {
          en: 'User behavior analytics highlights unusual patterns for review. It does not provide a deterministic network rule that rejects a connection from an unapproved source.',
          fr: 'L’analyse du comportement utilisateur met en évidence des schémas inhabituels à vérifier. Elle ne fournit pas une règle réseau déterministe qui refuse une source non approuvée.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Baseline the database files with FIM',
          fr: 'Établir une référence FIM pour les fichiers de la base',
        },
        correct: false,
        explanation: {
          en: 'File integrity monitoring alerts when protected files change. It neither evaluates a connecting host’s subnet nor blocks the connection before it is made.',
          fr: 'La surveillance de l’intégrité des fichiers alerte quand des fichiers protégés changent. Elle n’évalue pas le sous-réseau de l’hôte et ne bloque pas la connexion.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-002',
    objective: '4.5',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which capability is designed to block malicious traffic inline rather than only alerting on it?',
      fr: 'Quelle capacité est conçue pour bloquer un trafic malveillant en ligne plutôt que seulement alerter ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Intrusion prevention system (IPS)',
          fr: 'Système de prévention d’intrusion (IPS)',
        },
        correct: true,
        explanation: {
          en: 'An IPS is deployed inline so it can enforce a blocking decision on matching malicious traffic. Its prevention role distinguishes it from an alert-only IDS.',
          fr: 'Un IPS est déployé en ligne afin d’appliquer une décision de blocage sur un trafic malveillant correspondant. Son rôle de prévention le distingue d’un IDS seulement alertant.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Intrusion detection system (IDS)',
          fr: 'Système de détection d’intrusion (IDS)',
        },
        correct: false,
        explanation: {
          en: 'An IDS observes suspicious activity and generates an alert for review. Detection can trigger a response, but it does not itself stop the packet inline.',
          fr: 'Un IDS observe une activité suspecte et produit une alerte pour analyse. La détection peut déclencher une réponse, mais elle n’arrête pas elle-même le paquet en ligne.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'File integrity monitoring (FIM)',
          fr: 'Surveillance de l’intégrité des fichiers (FIM)',
        },
        correct: false,
        explanation: {
          en: 'FIM compares protected files with a trusted baseline after or during changes. It is not positioned to inspect and block network traffic traversing a link.',
          fr: 'La FIM compare des fichiers protégés à une référence fiable lors des changements. Elle n’est pas placée pour inspecter et bloquer un trafic réseau qui traverse un lien.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'User behavior analytics (UBA)',
          fr: 'Analyse du comportement utilisateur (UBA)',
        },
        correct: false,
        explanation: {
          en: 'UBA identifies deviations in user activity patterns and helps prioritise investigation. A behavioural score is not an inline traffic enforcement mechanism.',
          fr: 'L’UBA identifie des écarts dans les habitudes utilisateur et aide à prioriser l’investigation. Un score comportemental n’est pas un mécanisme d’application du trafic en ligne.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-003',
    objective: '4.5',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A company wants to prevent employee browsers from resolving a known command-and-control domain. Which capability is the closest control point?',
      fr: 'Une entreprise veut empêcher les navigateurs employés de résoudre un domaine de commande et contrôle connu. Quelle capacité se trouve au point de contrôle le plus proche ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'DNS filtering', fr: 'Filtrage DNS' },
        correct: true,
        explanation: {
          en: 'DNS filtering can refuse the lookup for the malicious name, preventing normal name-based connection attempts. It acts at the resolution step named in the scenario.',
          fr: 'Le filtrage DNS peut refuser la recherche du nom malveillant et empêcher les tentatives normales fondées sur ce nom. Il agit à l’étape de résolution citée dans le scénario.',
        },
      },
      {
        id: 'b',
        text: { en: 'Web filtering by URL category', fr: 'Filtrage web par catégorie d’URL' },
        correct: false,
        explanation: {
          en: 'A web filter can block web destinations and categories, but the requested action is to stop name resolution itself. DNS filtering is the more direct control point.',
          fr: 'Un filtre web peut bloquer des destinations et catégories web, mais l’action demandée est d’arrêter la résolution de nom. Le filtrage DNS est le point de contrôle direct.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Email attachment quarantine',
          fr: 'Mise en quarantaine des pièces jointes de messagerie',
        },
        correct: false,
        explanation: {
          en: 'Attachment quarantine reduces malicious content delivered through email. It does not decide whether a browser can resolve a domain after a user has reached the web.',
          fr: 'La quarantaine des pièces jointes réduit le contenu malveillant livré par messagerie. Elle ne décide pas si un navigateur peut résoudre un domaine après accès au web.',
        },
      },
      {
        id: 'd',
        text: { en: 'NAC posture validation', fr: 'Validation de posture par NAC' },
        correct: false,
        explanation: {
          en: 'NAC evaluates whether a device may join the network or receive a certain level of access. It is not a policy engine for individual DNS lookups.',
          fr: 'Le NAC évalue si un appareil peut rejoindre le réseau ou recevoir un niveau d’accès. Ce n’est pas un moteur de politique pour chaque recherche DNS.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-004',
    objective: '4.5',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A supported server exposes a remote administration service that nobody uses. A security review finds repeated password attacks against it. What is the best operating system security change?',
      fr: 'Un serveur pris en charge expose un service d’administration distante que personne n’utilise. Une revue relève des attaques répétées par mot de passe. Quelle modification de sécurité du système d’exploitation est la meilleure ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Disable or remove the unnecessary remote service',
          fr: 'Désactiver ou supprimer le service distant inutile',
        },
        correct: true,
        explanation: {
          en: 'Removing an unnecessary service reduces the attack surface and eliminates this login path. It is a host-hardening action that directly addresses the exposed service.',
          fr: 'Retirer un service inutile réduit la surface d’attaque et élimine ce chemin de connexion. C’est une action de durcissement qui traite directement le service exposé.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Add a UBA alert for unusual logins',
          fr: 'Ajouter une alerte UBA pour les connexions inhabituelles',
        },
        correct: false,
        explanation: {
          en: 'UBA may help identify unusual login patterns, but the service remains exposed and attackable. Disabling an unused service removes the unnecessary capability instead.',
          fr: 'L’UBA peut aider à repérer des connexions inhabituelles, mais le service reste exposé et attaquable. Désactiver un service inutilisé retire plutôt la capacité inutile.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Create a DLP rule for administrator documents',
          fr: 'Créer une règle DLP pour les documents administrateur',
        },
        correct: false,
        explanation: {
          en: 'DLP applies data-handling policy to sensitive content. It has no effect on an unused remote administration daemon accepting password attempts from the network.',
          fr: 'La DLP applique une politique de traitement aux contenus sensibles. Elle n’a aucun effet sur un service distant inutilisé qui accepte des tentatives de mot de passe.',
        },
      },
      {
        id: 'd',
        text: { en: 'Update the FIM baseline', fr: 'Mettre à jour la référence FIM' },
        correct: false,
        explanation: {
          en: 'Updating a FIM baseline acknowledges expected file changes; it does not reduce an exposed network service. Doing so here could also hide an unauthorised change.',
          fr: 'Mettre à jour une référence FIM reconnaît des changements de fichiers attendus ; cela ne réduit pas un service réseau exposé. Ici, cela pourrait aussi masquer un changement non autorisé.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-005',
    objective: '4.5',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which modification most directly protects administrator credentials while they travel across an untrusted network?',
      fr: 'Quelle modification protège le plus directement des identifiants administrateur pendant leur transit sur un réseau non fiable ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Replace a cleartext administration protocol with an encrypted authenticated protocol',
          fr: 'Remplacer un protocole d’administration en clair par un protocole chiffré et authentifié',
        },
        correct: true,
        explanation: {
          en: 'A secure protocol protects credentials in transit from observation and tampering. This changes the communication method rather than only protecting a stored copy of the data.',
          fr: 'Un protocole sécurisé protège les identifiants en transit contre l’observation et l’altération. Il change la méthode de communication au lieu de protéger seulement une copie stockée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Enable disk encryption on the administrator workstation',
          fr: 'Activer le chiffrement du disque du poste administrateur',
        },
        correct: false,
        explanation: {
          en: 'Disk encryption protects data at rest if the workstation is lost or stolen. It does not encrypt credentials travelling in a remote administration session.',
          fr: 'Le chiffrement de disque protège les données au repos si le poste est perdu ou volé. Il ne chiffre pas les identifiants qui voyagent dans une session distante.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Block a category in the web filter',
          fr: 'Bloquer une catégorie dans le filtre web',
        },
        correct: false,
        explanation: {
          en: 'A web filter applies browsing policy to destinations and categories. It does not add confidentiality or authentication to a remote management protocol.',
          fr: 'Un filtre web applique une politique de navigation aux destinations et catégories. Il n’ajoute ni confidentialité ni authentification à un protocole de gestion distante.',
        },
      },
      {
        id: 'd',
        text: { en: 'Deploy FIM on the managed server', fr: 'Déployer la FIM sur le serveur géré' },
        correct: false,
        explanation: {
          en: 'FIM can detect unexpected changes to protected server files. It does not protect credentials while network packets carrying a session are in transit.',
          fr: 'La FIM peut détecter des changements inattendus de fichiers serveur protégés. Elle ne protège pas les identifiants pendant le transit des paquets de session.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-006',
    objective: '4.5',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A finance employee receives messages that appear to be from the chief financial officer, but the sending domain is forged. Which email security capability best addresses the described problem?',
      fr: 'Un employé financier reçoit des messages semblant provenir du directeur financier, mais le domaine expéditeur est falsifié. Quelle capacité de sécurité de messagerie traite le mieux le problème décrit ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Sender authentication and anti-spoofing enforcement',
          fr: 'Authentification de l’expéditeur et application anti-usurpation',
        },
        correct: true,
        explanation: {
          en: 'The evidence is a forged sender domain, so controls that validate and enforce sender identity are most direct. Attachment scanning would address a different email risk.',
          fr: 'La preuve est un domaine expéditeur falsifié ; des contrôles qui valident et appliquent l’identité de l’expéditeur sont donc les plus directs. L’analyse de pièce jointe traite un autre risque.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A DNS block for the employee mailbox',
          fr: 'Un blocage DNS pour la boîte aux lettres employé',
        },
        correct: false,
        explanation: {
          en: 'DNS filtering can prevent resolution of malicious names, but it does not establish whether a received email sender is authorised to use a domain.',
          fr: 'Le filtrage DNS peut empêcher la résolution de noms malveillants, mais il n’établit pas si un expéditeur de message est autorisé à utiliser un domaine.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'FIM alerts on mail-server binaries',
          fr: 'Des alertes FIM sur les binaires du serveur de messagerie',
        },
        correct: false,
        explanation: {
          en: 'FIM could reveal unauthorised changes on a mail server, but the scenario presents sender impersonation. It does not validate the claimed sender domain.',
          fr: 'La FIM pourrait révéler des changements non autorisés sur un serveur de messagerie, mais le scénario présente une usurpation d’expéditeur. Elle ne valide pas le domaine revendiqué.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'NAC quarantine for the recipient workstation',
          fr: 'Mise en quarantaine NAC du poste destinataire',
        },
        correct: false,
        explanation: {
          en: 'NAC controls device admission and network access based on identity or posture. Quarantining the recipient does not determine whether an external sender was forged.',
          fr: 'Le NAC contrôle l’admission des appareils et leur accès réseau selon identité ou posture. Mettre le destinataire en quarantaine ne détermine pas si l’expéditeur externe est falsifié.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-007',
    objective: '4.5',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the primary purpose of file integrity monitoring (FIM)?',
      fr: 'Quelle est la finalité principale de la surveillance de l’intégrité des fichiers (FIM) ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Alert when protected files differ from their trusted baseline',
          fr: 'Alerter lorsque des fichiers protégés diffèrent de leur référence fiable',
        },
        correct: true,
        explanation: {
          en: 'FIM compares selected files with a known-good baseline and reports unexpected changes. That supports detection and investigation of unauthorised modification.',
          fr: 'La FIM compare des fichiers sélectionnés à une référence connue comme sûre et signale les changements inattendus. Elle soutient la détection et l’investigation de modifications non autorisées.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Block any user from changing a protected file',
          fr: 'Empêcher tout utilisateur de changer un fichier protégé',
        },
        correct: false,
        explanation: {
          en: 'FIM observes and reports changes; access permissions are what prevent users from writing a file. A legitimate patch may also change a monitored file.',
          fr: 'La FIM observe et signale les changements ; les autorisations d’accès empêchent les utilisateurs d’écrire un fichier. Un correctif légitime peut aussi modifier un fichier surveillé.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Classify sensitive data before external transmission',
          fr: 'Classifier des données sensibles avant une transmission externe',
        },
        correct: false,
        explanation: {
          en: 'Data classification and outbound handling are DLP functions. FIM focuses on the integrity of selected files, not the sensitivity of their contents in transit.',
          fr: 'La classification des données et leur traitement sortant sont des fonctions DLP. La FIM se concentre sur l’intégrité de fichiers sélectionnés, pas sur la sensibilité de leur contenu en transit.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Correlate alerts from cloud, identity, and endpoint sources',
          fr: 'Corréler les alertes provenant du cloud, de l’identité et des postes',
        },
        correct: false,
        explanation: {
          en: 'Correlation across multiple security layers describes XDR. FIM is one possible telemetry source, but it does not provide that broad correlation by itself.',
          fr: 'La corrélation entre plusieurs couches de sécurité décrit XDR. La FIM peut être une source de télémétrie, mais elle ne fournit pas seule cette corrélation étendue.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-008',
    objective: '4.5',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'Which scenario is the most direct use of data loss prevention (DLP)?',
      fr: 'Quel scénario représente l’usage le plus direct de la prévention des pertes de données (DLP) ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Preventing a document with regulated identifiers from being emailed externally',
          fr: 'Empêcher qu’un document avec des identifiants réglementés soit envoyé par courriel à l’extérieur',
        },
        correct: true,
        explanation: {
          en: 'DLP identifies sensitive content and applies policy to its movement or use. Stopping an external transmission of regulated data is a core DLP outcome.',
          fr: 'La DLP identifie un contenu sensible et applique une politique à son mouvement ou usage. Arrêter la transmission externe de données réglementées est un résultat central de la DLP.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Blocking a network exploit signature before a server receives it',
          fr: 'Bloquer une signature d’exploitation réseau avant qu’un serveur la reçoive',
        },
        correct: false,
        explanation: {
          en: 'Inline blocking of a network attack pattern is an IPS function. DLP evaluates sensitive data handling, not exploit signatures in transit.',
          fr: 'Le blocage en ligne d’un schéma d’attaque réseau est une fonction IPS. La DLP évalue le traitement de données sensibles, pas les signatures d’exploitation en transit.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Refusing a laptop that lacks required security posture',
          fr: 'Refuser un ordinateur portable sans posture de sécurité requise',
        },
        correct: false,
        explanation: {
          en: 'Checking a device before it receives network access is NAC. DLP may control a file on that laptop, but it does not perform device admission.',
          fr: 'Vérifier un appareil avant de lui donner accès au réseau relève du NAC. La DLP peut contrôler un fichier sur cet appareil, mais elle ne réalise pas son admission.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Alerting when a critical configuration file changes',
          fr: 'Alerter quand un fichier de configuration critique change',
        },
        correct: false,
        explanation: {
          en: 'Unexpected modification of a protected file is monitored by FIM. DLP is concerned with confidentiality and permitted movement of data rather than file baselines.',
          fr: 'Une modification inattendue d’un fichier protégé est surveillée par la FIM. La DLP concerne la confidentialité et le mouvement autorisé des données, pas les références de fichiers.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-009',
    objective: '4.5',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'Which capability can check a device’s identity and security posture before granting it normal network access?',
      fr: 'Quelle capacité peut vérifier l’identité et la posture de sécurité d’un appareil avant de lui accorder un accès réseau normal ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Network access control (NAC)', fr: 'Contrôle d’accès réseau (NAC)' },
        correct: true,
        explanation: {
          en: 'NAC makes an admission decision and can place devices into normal, restricted, quarantine, or denied access based on identity and posture checks.',
          fr: 'Le NAC prend une décision d’admission et peut placer les appareils en accès normal, restreint, quarantiné ou refusé selon des vérifications d’identité et de posture.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Endpoint detection and response (EDR)',
          fr: 'Détection et réponse aux points de terminaison (EDR)',
        },
        correct: false,
        explanation: {
          en: 'EDR investigates and responds to suspicious activity on endpoints after telemetry is collected. It is not primarily the gate that decides initial network admission.',
          fr: 'L’EDR enquête et répond à une activité suspecte sur les postes après collecte de télémétrie. Ce n’est pas principalement le portail qui décide l’admission réseau initiale.',
        },
      },
      {
        id: 'c',
        text: { en: 'DNS filtering', fr: 'Filtrage DNS' },
        correct: false,
        explanation: {
          en: 'DNS filtering decides whether a name lookup is allowed. It does not assess device posture or decide whether a device is eligible to join the network.',
          fr: 'Le filtrage DNS décide si une recherche de nom est autorisée. Il n’évalue pas la posture de l’appareil ni son droit à rejoindre le réseau.',
        },
      },
      {
        id: 'd',
        text: { en: 'Email security gateway', fr: 'Passerelle de sécurité de messagerie' },
        correct: false,
        explanation: {
          en: 'An email security gateway filters and authenticates mail traffic. It does not assess a device before that device receives general network connectivity.',
          fr: 'Une passerelle de sécurité de messagerie filtre et authentifie le trafic courriel. Elle n’évalue pas un appareil avant que celui-ci reçoive une connectivité réseau générale.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-010',
    objective: '4.5',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'An analyst wants one investigation view that correlates endpoint, email, identity, and cloud signals. Which capability best fits the requested scope?',
      fr: 'Un analyste veut une vue d’investigation unique corrélant les signaux des postes, de la messagerie, de l’identité et du cloud. Quelle capacité correspond le mieux à cette étendue ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Extended detection and response (XDR)',
          fr: 'Détection et réponse étendue (XDR)',
        },
        correct: true,
        explanation: {
          en: 'XDR extends correlation beyond endpoint telemetry to multiple security layers such as email, identity, network, and cloud. That breadth is explicit in the requirement.',
          fr: 'XDR étend la corrélation au-delà de la télémétrie des postes vers plusieurs couches, telles que messagerie, identité, réseau et cloud. Cette étendue est explicitement demandée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Endpoint detection and response (EDR)',
          fr: 'Détection et réponse aux points de terminaison (EDR)',
        },
        correct: false,
        explanation: {
          en: 'EDR is centred on endpoint telemetry, investigation, and response. It may integrate elsewhere, but the requested multi-layer correlation is the defining XDR distinction.',
          fr: 'L’EDR est centré sur la télémétrie, l’investigation et la réponse des postes. Il peut s’intégrer ailleurs, mais la corrélation multicouche demandée distingue XDR.',
        },
      },
      {
        id: 'c',
        text: { en: 'Network access control (NAC)', fr: 'Contrôle d’accès réseau (NAC)' },
        correct: false,
        explanation: {
          en: 'NAC makes access decisions for devices based on identity or posture. It is valuable before admission, but it is not a cross-domain investigation platform.',
          fr: 'Le NAC prend des décisions d’accès pour les appareils selon identité ou posture. Il est utile avant admission, mais ce n’est pas une plateforme d’investigation interdomaines.',
        },
      },
      {
        id: 'd',
        text: { en: 'A web filter', fr: 'Un filtre web' },
        correct: false,
        explanation: {
          en: 'A web filter enforces browsing policy for web destinations and requests. Its logs can be useful evidence, but it does not provide the requested broad correlation.',
          fr: 'Un filtre web applique une politique de navigation aux destinations et requêtes web. Ses journaux peuvent aider, mais il ne fournit pas la corrélation étendue demandée.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-011',
    objective: '4.5',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A user downloads an unusually large volume of sensitive reports at 2 a.m. from a location never previously used. Which capability is most suited to flag this as a meaningful deviation?',
      fr: 'Un utilisateur télécharge un volume inhabituellement grand de rapports sensibles à 2 h depuis un lieu jamais utilisé auparavant. Quelle capacité convient le mieux pour signaler cet écart significatif ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'User behavior analytics (UBA)',
          fr: 'Analyse du comportement utilisateur (UBA)',
        },
        correct: true,
        explanation: {
          en: 'UBA compares activity with normal patterns and can combine unusual time, location, and volume into a review signal. It is designed for this behavioural context.',
          fr: 'L’UBA compare l’activité aux habitudes normales et peut combiner heure, lieu et volume inhabituels en signal de vérification. Elle est conçue pour ce contexte comportemental.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'File integrity monitoring (FIM)',
          fr: 'Surveillance de l’intégrité des fichiers (FIM)',
        },
        correct: false,
        explanation: {
          en: 'FIM reveals that protected files changed from a baseline. The scenario concerns an unusual pattern of access and downloading, not unexpected modification of system files.',
          fr: 'La FIM révèle que des fichiers protégés ont changé par rapport à une référence. Le scénario concerne un accès et téléchargement inhabituels, pas des fichiers système modifiés.',
        },
      },
      {
        id: 'c',
        text: { en: 'A firewall deny rule', fr: 'Une règle de refus de pare-feu' },
        correct: false,
        explanation: {
          en: 'A firewall can block defined network paths, but the evidence concerns a user’s deviation from normal behaviour. A static connection rule cannot establish normality.',
          fr: 'Un pare-feu peut bloquer des chemins réseau définis, mais la preuve concerne un écart de comportement utilisateur. Une règle de connexion statique ne peut établir la normalité.',
        },
      },
      {
        id: 'd',
        text: { en: 'DNS filtering', fr: 'Filtrage DNS' },
        correct: false,
        explanation: {
          en: 'DNS filtering controls domain-name resolution. It does not analyse a user’s historic location, access time, or download volume to identify an anomalous pattern.',
          fr: 'Le filtrage DNS contrôle la résolution des noms de domaine. Il n’analyse pas l’historique de lieu, d’heure ou de volume pour identifier un schéma anormal.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-012',
    objective: '4.5',
    kind: 'scenario',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'A company must reduce exposure to a known phishing domain. Select TWO modifications that can directly prevent ordinary users from reaching it by name.',
      fr: 'Une entreprise doit réduire l’exposition à un domaine d’hameçonnage connu. Sélectionnez DEUX modifications qui peuvent empêcher directement les utilisateurs ordinaires de l’atteindre par son nom.',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Add the domain to DNS filtering', fr: 'Ajouter le domaine au filtrage DNS' },
        correct: true,
        explanation: {
          en: 'DNS filtering can refuse resolution of the named phishing domain. Users relying on normal name resolution cannot establish the usual connection to that destination.',
          fr: 'Le filtrage DNS peut refuser la résolution du domaine d’hameçonnage nommé. Les utilisateurs dépendant de la résolution normale ne peuvent pas établir la connexion habituelle.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Block the domain or URL in the web filter',
          fr: 'Bloquer le domaine ou l’URL dans le filtre web',
        },
        correct: true,
        explanation: {
          en: 'A web filter can enforce a deny policy for a known web domain or URL. It provides a second relevant control point for browser-based access to the destination.',
          fr: 'Un filtre web peut appliquer une politique de refus pour un domaine ou une URL web connue. Il fournit un second point de contrôle pertinent pour l’accès par navigateur.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Create a FIM baseline for browser binaries',
          fr: 'Créer une référence FIM pour les binaires du navigateur',
        },
        correct: false,
        explanation: {
          en: 'FIM would alert if browser binaries change unexpectedly. It does not make a policy decision about whether users may resolve or browse to a known phishing domain.',
          fr: 'La FIM alerterait si les binaires du navigateur changeaient de façon inattendue. Elle ne décide pas si les utilisateurs peuvent résoudre ou visiter un domaine d’hameçonnage connu.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Enable UBA for employees who browse the domain',
          fr: 'Activer l’UBA pour les employés qui visitent le domaine',
        },
        correct: false,
        explanation: {
          en: 'UBA may identify unusual browsing as a pattern for review, but it is not a direct name-based prevention control. The domain remains reachable without a blocking policy.',
          fr: 'L’UBA peut identifier une navigation inhabituelle comme schéma à vérifier, mais ce n’est pas un contrôle direct de prévention par nom. Le domaine reste accessible sans politique de blocage.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-013',
    objective: '4.5',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'A team wants to stop unmanaged devices at the moment they attempt to join the corporate network, while allowing compliant devices limited or normal access. What should it modify?',
      fr: 'Une équipe veut arrêter les appareils non gérés au moment où ils tentent de rejoindre le réseau d’entreprise, tout en donnant un accès limité ou normal aux appareils conformes. Que doit-elle modifier ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'NAC admission and posture policy',
          fr: 'La politique d’admission et de posture NAC',
        },
        correct: true,
        explanation: {
          en: 'NAC evaluates device identity and posture during admission, then assigns appropriate access or quarantine. That is precisely the timing and graduated access described.',
          fr: 'Le NAC évalue l’identité et la posture lors de l’admission, puis attribue accès approprié ou quarantaine. Cela correspond exactement au moment et à l’accès gradué décrits.',
        },
      },
      {
        id: 'b',
        text: { en: 'An EDR containment policy', fr: 'Une politique de confinement EDR' },
        correct: false,
        explanation: {
          en: 'EDR containment responds to suspicious activity observed on an endpoint. It is valuable after telemetry suggests compromise, not as the normal gate for joining a network.',
          fr: 'Le confinement EDR répond à une activité suspecte observée sur un poste. Il est utile après une télémétrie de compromission, pas comme portail normal de jonction réseau.',
        },
      },
      {
        id: 'c',
        text: { en: 'A DLP external-sharing policy', fr: 'Une politique DLP de partage externe' },
        correct: false,
        explanation: {
          en: 'A DLP policy restricts sensitive data movement, such as external sharing. It does not validate whether an unmanaged device may receive a network connection.',
          fr: 'Une politique DLP restreint le mouvement de données sensibles, comme le partage externe. Elle ne valide pas si un appareil non géré peut obtenir une connexion réseau.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'An email anti-spoofing policy',
          fr: 'Une politique anti-usurpation de messagerie',
        },
        correct: false,
        explanation: {
          en: 'Anti-spoofing policy validates and handles sender identity in email. It has no role in assigning an unmanaged laptop to a network access segment.',
          fr: 'La politique anti-usurpation valide et traite l’identité expéditeur dans la messagerie. Elle ne joue aucun rôle pour attribuer un ordinateur non géré à un segment réseau.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-014',
    objective: '4.5',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A managed endpoint starts a suspicious process, modifies persistence settings, and contacts unfamiliar external hosts. The team needs endpoint telemetry to investigate and contain the device. Which capability is best?',
      fr: 'Un poste géré lance un processus suspect, modifie des paramètres de persistance et contacte des hôtes externes inconnus. L’équipe a besoin de télémétrie de poste pour enquêter et contenir l’appareil. Quelle capacité est la meilleure ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Endpoint detection and response (EDR)',
          fr: 'Détection et réponse aux points de terminaison (EDR)',
        },
        correct: true,
        explanation: {
          en: 'EDR collects endpoint activity for investigation and can support containment or response. The stated process, persistence, and host signals are endpoint-centred evidence.',
          fr: 'L’EDR collecte l’activité des postes pour investigation et peut soutenir le confinement ou la réponse. Les processus, persistance et hôtes cités sont des preuves centrées sur le poste.',
        },
      },
      {
        id: 'b',
        text: { en: 'Web filtering', fr: 'Filtrage web' },
        correct: false,
        explanation: {
          en: 'Web filtering can block risky destinations or categories, including a command destination. It does not provide the required endpoint process and persistence investigation.',
          fr: 'Le filtrage web peut bloquer des destinations ou catégories risquées, y compris une destination de commande. Il ne fournit pas l’investigation demandée sur processus et persistance.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'File integrity monitoring only',
          fr: 'Surveillance de l’intégrité des fichiers seule',
        },
        correct: false,
        explanation: {
          en: 'FIM may alert about some changed files or settings, but it lacks the broad endpoint telemetry and response workflow needed to investigate and contain this device.',
          fr: 'La FIM peut alerter sur certains fichiers ou paramètres modifiés, mais elle manque de télémétrie et de réponse globales nécessaires pour enquêter et contenir cet appareil.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Sender authentication for email',
          fr: 'Authentification de l’expéditeur de messagerie',
        },
        correct: false,
        explanation: {
          en: 'Email sender authentication reduces spoofed messages before delivery. The scenario starts with malicious behaviour already occurring on a managed endpoint.',
          fr: 'L’authentification d’expéditeur réduit les messages falsifiés avant leur livraison. Le scénario commence par un comportement malveillant déjà actif sur un poste géré.',
        },
      },
    ],
  },
  {
    id: 'q-4-5-015',
    objective: '4.5',
    kind: 'discrimination',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'A change-management team wants controls that address unexpected modification of sensitive system files and unauthorised external transmission of sensitive records. Select TWO capabilities.',
      fr: 'Une équipe de gestion du changement veut des contrôles traitant la modification inattendue de fichiers système sensibles et la transmission externe non autorisée d’enregistrements sensibles. Sélectionnez DEUX capacités.',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'File integrity monitoring (FIM)',
          fr: 'Surveillance de l’intégrité des fichiers (FIM)',
        },
        correct: true,
        explanation: {
          en: 'FIM establishes a trusted baseline and alerts when important system files differ unexpectedly. It directly addresses detection of unauthorised modification to those files.',
          fr: 'La FIM établit une référence fiable et alerte lorsque des fichiers système importants diffèrent de manière inattendue. Elle traite directement la détection de modifications non autorisées.',
        },
      },
      {
        id: 'b',
        text: { en: 'Data loss prevention (DLP)', fr: 'Prévention des pertes de données (DLP)' },
        correct: true,
        explanation: {
          en: 'DLP identifies sensitive records and can apply policy to external transmission. It directly addresses the data-movement portion rather than merely observing a network connection.',
          fr: 'La DLP identifie les enregistrements sensibles et peut appliquer une politique à leur transmission externe. Elle traite directement le mouvement de données au lieu d’observer une connexion.',
        },
      },
      {
        id: 'c',
        text: { en: 'Network access control (NAC)', fr: 'Contrôle d’accès réseau (NAC)' },
        correct: false,
        explanation: {
          en: 'NAC decides whether a device may join a network and what access it receives. It does not compare system files with a baseline or inspect sensitive records leaving the organisation.',
          fr: 'Le NAC décide si un appareil peut rejoindre un réseau et quel accès il reçoit. Il ne compare pas les fichiers système à une référence et n’inspecte pas des enregistrements sensibles sortants.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'User behavior analytics (UBA)',
          fr: 'Analyse du comportement utilisateur (UBA)',
        },
        correct: false,
        explanation: {
          en: 'UBA can prioritise an unusual user pattern for review, but it neither establishes file integrity nor applies a data policy that blocks external transmission.',
          fr: 'L’UBA peut prioriser un schéma utilisateur inhabituel pour analyse, mais elle n’établit pas l’intégrité de fichier et n’applique pas de politique bloquant la transmission externe.',
        },
      },
    ],
  },
];
