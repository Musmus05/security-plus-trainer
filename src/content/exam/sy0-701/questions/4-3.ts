import type { Question } from '@/content/schemas';

/** Original practice questions for objective 4.3: vulnerability-management activities. */
export const QUESTIONS_4_3: Question[] = [
  {
    id: 'q-4-3-001',
    objective: '4.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the primary purpose of an authenticated vulnerability scan?',
      fr: 'Quel est le rôle principal d’un scan de vulnérabilités authentifié ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Inspect the host using approved credentials',
          fr: 'Inspecter l’hôte avec des identifiants approuvés',
        },
        correct: true,
        explanation: {
          en: 'Credentials let the scanner inspect installed packages, local configuration, and policy that an external probe cannot reliably observe.',
          fr: 'Les identifiants permettent au scanner d’inspecter paquets, configuration locale et politiques invisibles pour une sonde externe.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Prove that every reported flaw is exploitable',
          fr: 'Prouver que chaque faille signalée est exploitable',
        },
        correct: false,
        explanation: {
          en: 'Proving exploitability is closer to a controlled penetration test. A scan identifies conditions associated with known weaknesses.',
          fr: 'Prouver l’exploitabilité relève plutôt d’un test d’intrusion contrôlé. Un scan identifie des conditions liées à des faiblesses connues.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Prioritize findings by business impact',
          fr: 'Prioriser les constats selon l’impact métier',
        },
        correct: false,
        explanation: {
          en: 'Business impact is added during analysis using asset criticality and exposure. Authentication improves technical visibility, not prioritization.',
          fr: 'L’impact métier est ajouté pendant l’analyse avec criticité et exposition. L’authentification améliore la visibilité technique, pas la priorité.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Apply missing patches automatically',
          fr: 'Appliquer automatiquement les correctifs manquants',
        },
        correct: false,
        explanation: {
          en: 'A scanner reports evidence of missing updates; patch deployment is a separate remediation activity requiring change control.',
          fr: 'Un scanner rapporte la preuve de mises à jour manquantes ; le déploiement de patchs est une correction distincte soumise au changement.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-002',
    objective: '4.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which activity most directly determines whether a scanner finding is a false positive?',
      fr: 'Quelle activité détermine le plus directement si un constat de scanner est un faux positif ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Verify the asset, version, configuration, and exposure',
          fr: 'Vérifier l’actif, la version, la configuration et l’exposition',
        },
        correct: true,
        explanation: {
          en: 'Analysis checks the scanner evidence against the actual environment. That is how a team distinguishes a real condition from a mistaken match.',
          fr: 'L’analyse confronte la preuve du scanner à l’environnement réel. Elle distingue ainsi une condition réelle d’une correspondance erronée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Close the ticket after the next reporting cycle',
          fr: 'Fermer le ticket après le prochain cycle de reporting',
        },
        correct: false,
        explanation: {
          en: 'Reporting summarizes state; it cannot establish technical truth. Closing without verification would hide a possible real vulnerability.',
          fr: 'Le reporting résume un état ; il ne peut pas établir une vérité technique. Fermer sans vérification peut masquer une vraie vulnérabilité.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Apply a compensating control immediately',
          fr: 'Appliquer immédiatement un contrôle compensatoire',
        },
        correct: false,
        explanation: {
          en: 'A compensating control treats confirmed risk when remediation is delayed. It does not determine whether the original scanner match was correct.',
          fr: 'Un contrôle compensatoire traite un risque confirmé si la correction attend. Il ne dit pas si la correspondance du scanner était correcte.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Escalate it solely because its severity score is high',
          fr: 'L’escalader uniquement parce que son score de gravité est élevé',
        },
        correct: false,
        explanation: {
          en: 'Severity can affect urgency after a finding is credible, but it does not prove the scanner identified the right software or setting.',
          fr: 'La gravité peut changer l’urgence après confirmation, mais elle ne prouve pas que le scanner a identifié le bon logiciel ou réglage.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-003',
    objective: '4.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A critical finding affects an internet-facing customer portal and public exploit code is available. What should most increase its remediation priority?',
      fr: 'Un constat critique touche un portail client exposé à Internet et un code d’exploitation public existe. Quel élément augmente le plus sa priorité de correction ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The combination of exposure and exploitability',
          fr: 'La combinaison de l’exposition et de l’exploitabilité',
        },
        correct: true,
        explanation: {
          en: 'Internet reachability provides attack opportunity and public exploit code lowers attacker effort. Together they create urgent practical risk.',
          fr: 'L’accessibilité Internet offre une occasion d’attaque et le code public réduit l’effort adverse. Ensemble, ils créent un risque pratique urgent.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The fact that the scan used credentials',
          fr: 'Le fait que le scan a utilisé des identifiants',
        },
        correct: false,
        explanation: {
          en: 'Credentials may make the finding more precise, but the urgency described comes from reachable attack surface and available exploitation.',
          fr: 'Les identifiants peuvent rendre le constat plus précis, mais l’urgence décrite vient de la surface accessible et de l’exploitation disponible.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The number of pages in the monthly report',
          fr: 'Le nombre de pages du rapport mensuel',
        },
        correct: false,
        explanation: {
          en: 'Report length has no effect on technical or business risk. Reporting should communicate priority rather than manufacture it.',
          fr: 'La longueur du rapport n’a aucun effet sur le risque technique ou métier. Le reporting communique la priorité au lieu de la créer.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The date that the scanner was installed',
          fr: 'La date d’installation du scanner',
        },
        correct: false,
        explanation: {
          en: 'Scanner age may affect tool maintenance, but it does not change the portal’s reachability or the existence of public exploit code.',
          fr: 'L’âge du scanner peut affecter sa maintenance, mais pas l’accessibilité du portail ni l’existence de code d’exploitation public.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-004',
    objective: '4.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which response removes the underlying vulnerability rather than merely reducing exposure?',
      fr: 'Quelle réponse supprime la vulnérabilité sous-jacente au lieu de seulement réduire l’exposition ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Install the vendor patch that corrects the affected component',
          fr: 'Installer le patch d’éditeur qui corrige le composant affecté',
        },
        correct: true,
        explanation: {
          en: 'Applying the correcting patch is remediation because it changes the vulnerable component itself, subject to appropriate testing and validation.',
          fr: 'Appliquer le patch correctif est une remédiation car il modifie le composant vulnérable lui-même, après tests et validation appropriés.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Segment the system from untrusted networks',
          fr: 'Segmenter le système des réseaux non fiables',
        },
        correct: false,
        explanation: {
          en: 'Segmentation can sharply reduce reachable attack paths, but the vulnerable software or configuration remains present on the system.',
          fr: 'La segmentation peut réduire fortement les chemins d’attaque, mais le logiciel ou réglage vulnérable reste présent sur le système.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Document a temporary risk acceptance',
          fr: 'Documenter une acceptation temporaire du risque',
        },
        correct: false,
        explanation: {
          en: 'Risk acceptance records an authorized decision to retain residual risk. It changes accountability, not the technical condition.',
          fr: 'L’acceptation du risque consigne une décision autorisée de conserver le risque résiduel. Elle change la responsabilité, pas la condition technique.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Add additional alerting for the affected server',
          fr: 'Ajouter des alertes supplémentaires pour le serveur affecté',
        },
        correct: false,
        explanation: {
          en: 'Monitoring may improve detection of abuse and is useful as a compensating measure, but it does not remove the weakness.',
          fr: 'La surveillance peut améliorer la détection d’abus et servir de mesure compensatoire, mais elle ne retire pas la faiblesse.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-005',
    objective: '4.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A legacy system has no vendor patch, but it must run for six months. Which two actions best manage the finding? (Select two.)',
      fr: 'Un système hérité ne reçoit plus de patch éditeur mais doit fonctionner six mois. Quelles deux actions gèrent le mieux ce constat ? (Sélectionnez deux réponses.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: {
          en: 'Isolate it with segmentation and strict access rules',
          fr: 'L’isoler par segmentation et règles d’accès strictes',
        },
        correct: true,
        explanation: {
          en: 'Segmentation and tight access control are compensating controls that reduce who can reach an unpatchable system during its remaining life.',
          fr: 'La segmentation et un accès strict sont des contrôles compensatoires qui réduisent qui peut atteindre un système non corrigeable.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Document an approved exception with an end date',
          fr: 'Documenter une exception approuvée avec date de fin',
        },
        correct: true,
        explanation: {
          en: 'An exception records ownership of residual risk and forces review. It should be time-bounded rather than silently becoming permanent.',
          fr: 'Une exception consigne le propriétaire du risque résiduel et impose une revue. Elle doit être limitée dans le temps, pas devenir permanente.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Mark the finding remediated because a patch is unavailable',
          fr: 'Marquer le constat corrigé parce qu’aucun patch n’existe',
        },
        correct: false,
        explanation: {
          en: 'Lack of a patch does not remove the weakness. The finding remains open, mitigated, or formally accepted until the system is retired.',
          fr: 'L’absence de patch ne retire pas la faiblesse. Le constat reste ouvert, atténué ou formellement accepté jusqu’au retrait du système.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Delete its inventory record to remove it from scans',
          fr: 'Supprimer son entrée d’inventaire pour le retirer des scans',
        },
        correct: false,
        explanation: {
          en: 'Removing asset visibility conceals risk and prevents ownership. It makes reporting look better while making the environment less secure.',
          fr: 'Supprimer la visibilité de l’actif cache le risque et empêche la responsabilité. Cela embellit le reporting tout en réduisant la sécurité.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-006',
    objective: '4.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'What distinguishes validation of remediation from the remediation activity itself?',
      fr: 'Qu’est-ce qui distingue la validation de correction de l’activité de correction elle-même ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Validation gathers evidence that the intended secure state now exists',
          fr: 'La validation recueille la preuve que l’état sécurisé attendu existe désormais',
        },
        correct: true,
        explanation: {
          en: 'Remediation changes the environment; validation tests or observes the result afterward. The distinction prevents closing work based on intention alone.',
          fr: 'La correction modifie l’environnement ; la validation teste ou observe le résultat ensuite. Cette distinction évite une clôture fondée sur la seule intention.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Validation chooses the owner and due date for the finding',
          fr: 'La validation choisit le propriétaire et l’échéance du constat',
        },
        correct: false,
        explanation: {
          en: 'Ownership and target dates are part of triage and tracking. They are set before remediation evidence can exist.',
          fr: 'Le propriétaire et l’échéance appartiennent au triage et au suivi. Ils sont définis avant que la preuve de correction puisse exister.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Validation transfers financial loss to an insurer',
          fr: 'La validation transfère une perte financière à un assureur',
        },
        correct: false,
        explanation: {
          en: 'Insurance can be a risk-transfer decision, but it is not technical proof that a patch, configuration change, or control works.',
          fr: 'L’assurance peut être un transfert de risque, mais elle ne prouve pas qu’un patch, réglage ou contrôle fonctionne.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Validation discovers all assets in the enterprise',
          fr: 'La validation découvre tous les actifs de l’entreprise',
        },
        correct: false,
        explanation: {
          en: 'Asset discovery supports identification and scan coverage. Validation is narrower: it checks the outcome for a particular finding.',
          fr: 'La découverte d’actifs soutient l’identification et la couverture de scan. La validation est plus ciblée : elle vérifie un constat précis.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-007',
    objective: '4.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A patch is installed, but a follow-up scan still detects the same flaw. The file version is correct. What should the team check first?',
      fr: 'Un patch est installé, mais un scan de suivi détecte toujours la même faille. La version du fichier est correcte. Que faut-il vérifier d’abord ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Whether the service or application was restarted',
          fr: 'Si le service ou l’application a été redémarré',
        },
        correct: true,
        explanation: {
          en: 'A running process can retain old code in memory despite a patched file on disk. Restarting may be necessary for remediation to take effect.',
          fr: 'Un processus actif peut conserver l’ancien code en mémoire malgré un fichier corrigé. Un redémarrage peut être nécessaire pour activer la correction.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Whether management received the monthly report',
          fr: 'Si la direction a reçu le rapport mensuel',
        },
        correct: false,
        explanation: {
          en: 'Management reporting communicates risk but does not alter a running process. The evidence points to a technical activation issue.',
          fr: 'Le reporting à la direction communique le risque mais ne modifie pas un processus actif. La preuve pointe vers une activation technique.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Whether the finding was assigned to an owner',
          fr: 'Si le constat a été attribué à un propriétaire',
        },
        correct: false,
        explanation: {
          en: 'Assignment supports accountability, but it cannot explain why corrected files are not yet being used by the running service.',
          fr: 'L’attribution aide la responsabilité, mais elle n’explique pas pourquoi le service actif n’utilise pas encore les fichiers corrigés.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Whether the original scan was unauthenticated',
          fr: 'Si le scan initial était non authentifié',
        },
        correct: false,
        explanation: {
          en: 'Scan type can affect evidence quality, but the correct file version and persistent detection first suggest the changed service was not reloaded.',
          fr: 'Le type de scan peut affecter la preuve, mais la bonne version et la détection persistante suggèrent d’abord un service non rechargé.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-008',
    objective: '4.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which item is most useful to management in a vulnerability-management report?',
      fr: 'Quel élément est le plus utile à la direction dans un rapport de gestion des vulnérabilités ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Trends in overdue critical findings and remediation time',
          fr: 'Les tendances des constats critiques en retard et des délais de correction',
        },
        correct: true,
        explanation: {
          en: 'Leadership needs risk posture, exceptions, and progress over time. Trends reveal whether high-priority exposure is being reduced.',
          fr: 'La direction a besoin de posture de risque, d’exceptions et de progression. Les tendances révèlent si les expositions prioritaires diminuent.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Every raw packet captured by the scanner',
          fr: 'Chaque paquet brut capturé par le scanner',
        },
        correct: false,
        explanation: {
          en: 'Raw packets can support engineering investigation but are too detailed to communicate programme risk or remediation performance to management.',
          fr: 'Les paquets bruts peuvent aider une investigation technique mais sont trop détaillés pour communiquer le risque ou la performance à la direction.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The personal passwords used for authenticated scans',
          fr: 'Les mots de passe personnels utilisés pour les scans authentifiés',
        },
        correct: false,
        explanation: {
          en: 'Credentials must be protected and should not be reported. Scan accounts should be controlled service credentials, not personal passwords.',
          fr: 'Les identifiants doivent être protégés et ne doivent pas figurer au reporting. Les comptes de scan sont des comptes de service contrôlés.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A list of every false-positive signature ever seen',
          fr: 'La liste de toutes les signatures de faux positifs déjà vues',
        },
        correct: false,
        explanation: {
          en: 'False-positive patterns can help tool tuning, but an exhaustive signature list does not summarize current business risk for management.',
          fr: 'Les faux positifs peuvent aider au réglage de l’outil, mais une liste exhaustive ne résume pas le risque métier actuel.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-009',
    objective: '4.3',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Why should a mitigated vulnerability remain distinguishable from a remediated vulnerability in reporting?',
      fr: 'Pourquoi un constat atténué doit-il rester distinct d’un constat corrigé dans le reporting ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Mitigation reduces risk while the underlying weakness can still exist',
          fr: 'L’atténuation réduit le risque alors que la faiblesse sous-jacente peut subsister',
        },
        correct: true,
        explanation: {
          en: 'A firewall rule or segmentation can reduce exposure without changing vulnerable software. Reporting must preserve that residual risk and follow-up need.',
          fr: 'Une règle de pare-feu ou la segmentation réduit l’exposition sans modifier le logiciel vulnérable. Le reporting doit conserver ce risque résiduel.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Mitigated findings do not need an owner',
          fr: 'Les constats atténués n’ont pas besoin de propriétaire',
        },
        correct: false,
        explanation: {
          en: 'Residual risk requires particularly clear ownership. Without an owner, a temporary control can outlive review and become invisible.',
          fr: 'Le risque résiduel exige une responsabilité très claire. Sans propriétaire, un contrôle temporaire peut échapper aux revues et devenir invisible.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Remediated findings can never be validated',
          fr: 'Les constats corrigés ne peuvent jamais être validés',
        },
        correct: false,
        explanation: {
          en: 'Validation is essential after remediation; it is the evidence that allows a finding to be reported as fixed rather than merely changed.',
          fr: 'La validation est essentielle après correction ; elle permet de signaler un constat comme résolu plutôt que seulement modifié.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Mitigation always has a higher severity score',
          fr: 'L’atténuation a toujours un score de gravité plus élevé',
        },
        correct: false,
        explanation: {
          en: 'Severity describes vulnerability characteristics, not the response label. Mitigation may be used at any severity when direct remediation is delayed.',
          fr: 'La gravité décrit des caractéristiques de vulnérabilité, pas le libellé de réponse. Une atténuation peut être employée à toute gravité.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-010',
    objective: '4.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A team applies a web-server update during a maintenance window. Which two actions are validation rather than implementation? (Select two.)',
      fr: 'Une équipe applique une mise à jour de serveur web pendant une fenêtre de maintenance. Quelles deux actions sont de la validation plutôt que de l’implémentation ? (Sélectionnez deux réponses.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: {
          en: 'Rerun the relevant scan against the updated server',
          fr: 'Relancer le scan pertinent contre le serveur mis à jour',
        },
        correct: true,
        explanation: {
          en: 'A follow-up scan checks whether the prior evidence is gone. It supplies evidence about the post-change state rather than making the change.',
          fr: 'Un scan de suivi vérifie que la preuve initiale a disparu. Il renseigne sur l’état après changement au lieu de faire le changement.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Confirm the application works after its required restart',
          fr: 'Confirmer que l’application fonctionne après son redémarrage requis',
        },
        correct: true,
        explanation: {
          en: 'Functional testing after the restart verifies both security activation and service availability. It is evidence that the intended outcome holds.',
          fr: 'Un test fonctionnel après redémarrage vérifie activation de sécurité et disponibilité. Il prouve que le résultat attendu tient.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Install the vendor update package',
          fr: 'Installer le paquet de mise à jour de l’éditeur',
        },
        correct: false,
        explanation: {
          en: 'Installing the package changes the environment and is the remediation action. It does not demonstrate that the result is effective.',
          fr: 'Installer le paquet modifie l’environnement et constitue la correction. Cela ne démontre pas que le résultat est efficace.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Schedule the maintenance window with the service owner',
          fr: 'Planifier la fenêtre de maintenance avec le propriétaire du service',
        },
        correct: false,
        explanation: {
          en: 'Scheduling is change-management preparation. It limits disruption but occurs before there is any result to validate.',
          fr: 'La planification est une préparation de gestion du changement. Elle limite la perturbation mais précède tout résultat à valider.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-011',
    objective: '4.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which source most directly helps a team raise priority for a vulnerability being actively exploited in the wild?',
      fr: 'Quelle source aide le plus directement une équipe à augmenter la priorité d’une vulnérabilité activement exploitée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Threat intelligence and current vendor advisories',
          fr: 'Le renseignement sur les menaces et les avis actuels des éditeurs',
        },
        correct: true,
        explanation: {
          en: 'Threat intelligence and advisories can indicate active exploitation, affected products, or attacker behavior that changes practical urgency.',
          fr: 'Le renseignement et les avis peuvent indiquer exploitation active, produits affectés ou comportement adverse, ce qui change l’urgence pratique.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The asset disposal log from five years ago',
          fr: 'Le journal de destruction d’actifs datant de cinq ans',
        },
        correct: false,
        explanation: {
          en: 'Historical disposal records may help confirm an asset no longer exists, but they do not describe current exploitation activity.',
          fr: 'Un ancien journal de destruction peut confirmer qu’un actif n’existe plus, mais il ne décrit pas une exploitation actuelle.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A completed remediation validation record',
          fr: 'Un enregistrement de validation de correction terminé',
        },
        correct: false,
        explanation: {
          en: 'Validation records establish the outcome of a past change. They are not an intelligence source for a newly exploited weakness.',
          fr: 'Les enregistrements de validation établissent le résultat d’un changement passé. Ils ne sont pas une source sur une faille nouvellement exploitée.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The meeting agenda for a change advisory board',
          fr: 'L’ordre du jour du comité consultatif de changement',
        },
        correct: false,
        explanation: {
          en: 'A change board can approve work, but its agenda is not evidence that attackers are exploiting a specific vulnerability.',
          fr: 'Un comité de changement peut approuver des travaux, mais son ordre du jour ne prouve pas une exploitation par des attaquants.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-012',
    objective: '4.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A scanner detects a vulnerable package on an IP address that is absent from the asset inventory. What should happen first?',
      fr: 'Un scanner détecte un paquet vulnérable sur une adresse IP absente de l’inventaire des actifs. Que faut-il faire en premier ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Identify the asset, owner, and role before selecting a response',
          fr: 'Identifier l’actif, son propriétaire et son rôle avant de choisir une réponse',
        },
        correct: true,
        explanation: {
          en: 'Asset context establishes whether the system exists, who can act, and what business impact or exposure affects the priority decision.',
          fr: 'Le contexte d’actif établit si le système existe, qui peut agir et quel impact ou exposition influence la priorité.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Classify it as remediated because it is untracked',
          fr: 'Le classer comme corrigé parce qu’il n’est pas suivi',
        },
        correct: false,
        explanation: {
          en: 'An untracked asset is a coverage and ownership problem, not evidence that the vulnerable package was removed or made safe.',
          fr: 'Un actif non suivi est un problème de couverture et de responsabilité, pas une preuve que le paquet vulnérable a disparu.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Send the IP address directly to executives as the final report',
          fr: 'Envoyer l’adresse IP directement aux dirigeants comme rapport final',
        },
        correct: false,
        explanation: {
          en: 'Executives need actionable risk trends and exceptions. The technical team first needs identity and context to produce meaningful reporting.',
          fr: 'Les dirigeants ont besoin de tendances et exceptions exploitables. L’équipe technique doit d’abord obtenir identité et contexte.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Ignore it because only inventoried assets are in scope',
          fr: 'L’ignorer car seuls les actifs inventoriés sont dans le périmètre',
        },
        correct: false,
        explanation: {
          en: 'Unknown assets can be especially risky because they lack ownership and standard controls. Discovery should improve the inventory, not bypass it.',
          fr: 'Les actifs inconnus peuvent être plus risqués car ils manquent de propriétaire et de contrôles standards. La découverte doit enrichir l’inventaire.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-013',
    objective: '4.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the main value of tracking a due date and owner for each vulnerability finding?',
      fr: 'Quelle est la valeur principale d’une échéance et d’un propriétaire pour chaque constat de vulnérabilité ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It creates accountability and supports escalation of overdue risk',
          fr: 'Cela crée une responsabilité et permet l’escalade du risque en retard',
        },
        correct: true,
        explanation: {
          en: 'A named owner can coordinate response, while a due date makes delayed exposure visible for follow-up and risk decisions.',
          fr: 'Un propriétaire nommé peut coordonner la réponse et une échéance rend l’exposition retardée visible pour suivi et décision de risque.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It proves the vulnerability can be exploited',
          fr: 'Cela prouve que la vulnérabilité peut être exploitée',
        },
        correct: false,
        explanation: {
          en: 'Assignment is a workflow control, not exploit evidence. Exploitability is determined from technical analysis and relevant intelligence.',
          fr: 'L’attribution est un contrôle de flux, pas une preuve d’exploitabilité. Celle-ci provient d’analyse technique et de renseignement pertinent.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It replaces the need to validate a patch',
          fr: 'Cela remplace le besoin de valider un patch',
        },
        correct: false,
        explanation: {
          en: 'A ticket can be owned and on time while the change fails. Validation is still required to establish the secure state.',
          fr: 'Un ticket peut être attribué et dans les délais alors que le changement échoue. La validation reste nécessaire pour établir l’état sécurisé.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It makes an unauthenticated scan into an authenticated scan',
          fr: 'Cela transforme un scan non authentifié en scan authentifié',
        },
        correct: false,
        explanation: {
          en: 'Scan authentication depends on controlled credentials and access, not on governance fields in a finding record.',
          fr: 'L’authentification du scan dépend d’identifiants contrôlés et d’accès, pas de champs de gouvernance dans un constat.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-014',
    objective: '4.3',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'A company buys cyber insurance after discovering a vulnerable public service. Which statement is correct?',
      fr: 'Une entreprise souscrit une assurance cyber après avoir découvert un service public vulnérable. Quelle affirmation est correcte ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Insurance can transfer some financial risk but does not remediate the service',
          fr: 'L’assurance peut transférer une part du risque financier mais ne corrige pas le service',
        },
        correct: true,
        explanation: {
          en: 'Insurance may shift financial consequences under a policy, but the vulnerable service remains technically exposed until it is fixed or mitigated.',
          fr: 'L’assurance peut déplacer des conséquences financières selon le contrat, mais le service reste exposé jusqu’à correction ou atténuation.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Insurance validates that the vulnerability is no longer present',
          fr: 'L’assurance valide que la vulnérabilité n’est plus présente',
        },
        correct: false,
        explanation: {
          en: 'Validation requires technical evidence from testing, inspection, or a follow-up scan. A financial contract supplies none of that evidence.',
          fr: 'La validation exige une preuve technique par test, inspection ou scan de suivi. Un contrat financier ne fournit aucune de ces preuves.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Insurance converts the finding into a false positive',
          fr: 'L’assurance transforme le constat en faux positif',
        },
        correct: false,
        explanation: {
          en: 'A false positive is a finding shown to be incorrect. Buying insurance does not change software, configuration, or scanner evidence.',
          fr: 'Un faux positif est un constat démontré incorrect. Souscrire une assurance ne modifie ni logiciel, ni configuration, ni preuve du scanner.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Insurance eliminates the need for reporting to management',
          fr: 'L’assurance élimine le besoin de reporting à la direction',
        },
        correct: false,
        explanation: {
          en: 'Management still needs to know exposure, mitigation, exceptions, and residual risk. Financial transfer is only one response consideration.',
          fr: 'La direction doit toujours connaître exposition, atténuation, exceptions et risque résiduel. Le transfert financier est une seule considération.',
        },
      },
    ],
  },
  {
    id: 'q-4-3-015',
    objective: '4.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A dashboard shows fewer open vulnerabilities this month, but the validated-closure rate also fell sharply. What is the best interpretation?',
      fr: 'Un tableau de bord montre moins de vulnérabilités ouvertes ce mois-ci, mais le taux de clôture validée a fortement baissé. Quelle interprétation est la meilleure ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The lower count may reflect tickets closed without evidence of effective treatment',
          fr: 'La baisse peut refléter des tickets fermés sans preuve de traitement efficace',
        },
        correct: true,
        explanation: {
          en: 'A count alone is not proof of reduced risk. Falling validated closure suggests the process may be recording completion without post-change evidence.',
          fr: 'Un total seul ne prouve pas une baisse du risque. Une clôture validée en baisse suggère une fin de ticket sans preuve après changement.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The programme has certainly eliminated all critical exposure',
          fr: 'Le programme a certainement éliminé toute exposition critique',
        },
        correct: false,
        explanation: {
          en: 'The data does not support certainty. A declining validation metric is specifically a warning that the apparent improvement may be unreliable.',
          fr: 'Les données ne permettent pas cette certitude. Une métrique de validation en baisse avertit justement que l’amélioration apparente est incertaine.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Authenticated scans are no longer necessary',
          fr: 'Les scans authentifiés ne sont plus nécessaires',
        },
        correct: false,
        explanation: {
          en: 'The dashboard says nothing about the appropriate scan method. Credentialed checks may be essential to validate many host-level findings.',
          fr: 'Le tableau ne dit rien du mode de scan approprié. Des vérifications authentifiées peuvent être essentielles pour valider des constats hôte.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Severity and asset criticality should be removed from reports',
          fr: 'La gravité et la criticité d’actif doivent être retirées des rapports',
        },
        correct: false,
        explanation: {
          en: 'Severity and criticality help readers understand the importance of remaining work. The problem is weak closure evidence, not too much context.',
          fr: 'Gravité et criticité aident à comprendre l’importance du travail restant. Le problème est une preuve de clôture faible, pas trop de contexte.',
        },
      },
    ],
  },
];
