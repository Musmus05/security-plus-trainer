import type { Question } from '@/content/schemas';

/**
 * Objective 4.7 — Explain the importance of automation and orchestration related to secure operations.
 *
 * Every question is original work written from the published objective. It does not reproduce,
 * paraphrase, or reconstruct any real exam item.
 */
export const QUESTIONS_4_7: Question[] = [
  {
    id: 'q-4-7-001',
    objective: '4.7',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the primary purpose of automation in secure operations?',
      fr: 'Quel est le but principal de l’automatisation dans les opérations de sécurité ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Perform a defined, repeatable task with minimal manual effort',
          fr: 'Exécuter une tâche définie et répétable avec un effort manuel minimal',
        },
        correct: true,
        explanation: {
          en: 'Automation runs a defined sequence consistently, freeing people from repeating routine work while retaining process controls and review.',
          fr: 'L’automatisation exécute une séquence définie de manière cohérente, évitant de répéter le travail courant tout en conservant contrôles et revue.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Replace all security analysts during incident response',
          fr: 'Remplacer tous les analystes de sécurité pendant une réponse à incident',
        },
        correct: false,
        explanation: {
          en: 'Automation can enrich or route an alert, but analysts still interpret ambiguous evidence, approve exceptions, and lead unfamiliar investigations.',
          fr: 'L’automatisation peut enrichir ou acheminer une alerte, mais les analystes interprètent encore les preuves ambiguës et les exceptions.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Guarantee that every operational action is safe',
          fr: 'Garantir que chaque action opérationnelle est sûre',
        },
        correct: false,
        explanation: {
          en: 'A script follows its instructions; it cannot guarantee that the instructions, inputs, target scope, or business decision were correct.',
          fr: 'Un script suit ses instructions ; il ne peut garantir que les instructions, entrées, portée ou décisions métier étaient correctes.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Eliminate the need to log administrative actions',
          fr: 'Éliminer la nécessité de journaliser les actions administratives',
        },
        correct: false,
        explanation: {
          en: 'Automated actions need logging at least as much as manual actions, because a team must be able to verify what the process did.',
          fr: 'Les actions automatisées nécessitent au moins autant de journaux que les actions manuelles afin de vérifier ce que le processus a fait.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-002',
    objective: '4.7',
    kind: 'discrimination',
    difficulty: 'easy',
    prompt: {
      en: 'Which example is orchestration rather than a single automated task?',
      fr: 'Quel exemple relève de l’orchestration plutôt que d’une seule tâche automatisée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A workflow enriches an alert, opens a case, notifies an analyst, and records the outcome',
          fr: 'Un flux enrichit une alerte, ouvre un dossier, prévient un analyste et consigne le résultat',
        },
        correct: true,
        explanation: {
          en: 'This coordinates multiple actions and systems in a defined order, which is orchestration rather than one isolated automated action.',
          fr: 'Cela coordonne plusieurs actions et systèmes dans un ordre défini : il s’agit d’orchestration, pas d’une action automatisée isolée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A nightly job checks certificate expiration dates',
          fr: 'Une tâche nocturne vérifie les dates d’expiration des certificats',
        },
        correct: false,
        explanation: {
          en: 'The job performs one repeatable check on a schedule. It is automation, but it does not coordinate a broader multi-step workflow.',
          fr: 'Cette tâche réalise un contrôle répétable selon un calendrier. C’est de l’automatisation, sans coordination d’un flux plus large.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'An analyst reviews a suspicious login manually',
          fr: 'Un analyste examine manuellement une connexion suspecte',
        },
        correct: false,
        explanation: {
          en: 'A person performing a review may use tools, but manual analysis alone is neither automation nor orchestration of automated tasks.',
          fr: 'Une personne peut utiliser des outils pendant sa revue, mais l’analyse manuelle seule n’est ni automatisation ni orchestration.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A firewall denies traffic that matches one configured rule',
          fr: 'Un pare-feu refuse le trafic correspondant à une règle configurée',
        },
        correct: false,
        explanation: {
          en: 'A firewall rule enforces a control, but the rule by itself does not coordinate separate automated actions across a workflow.',
          fr: 'Une règle de pare-feu applique un contrôle, mais elle ne coordonne pas à elle seule des actions automatisées distinctes.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-003',
    objective: '4.7',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A security team manually copies the same endpoint alert details into a case system hundreds of times each week. What is the best improvement?',
      fr: 'Une équipe de sécurité recopie manuellement les mêmes détails d’alerte de terminal dans un système de dossiers des centaines de fois par semaine. Quelle amélioration est la meilleure ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Automate creation of the case from the alert data and log the result',
          fr: 'Automatiser la création du dossier depuis les données d’alerte et journaliser le résultat',
        },
        correct: true,
        explanation: {
          en: 'The task is frequent, structured, and repeatable. Automation reduces transcription errors while preserving a record of each created case.',
          fr: 'La tâche est fréquente, structurée et répétable. L’automatisation réduit les erreurs de recopie tout en préservant une trace de chaque dossier.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Give every analyst unrestricted administrator access to the case system',
          fr: 'Donner à chaque analyste un accès administrateur sans restriction au système de dossiers',
        },
        correct: false,
        explanation: {
          en: 'Broad access does not remove copying work and violates least privilege by granting more authority than routine case entry requires.',
          fr: 'Un accès étendu ne supprime pas la recopie et viole le moindre privilège en donnant plus de droits que la saisie courante exige.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Disable the endpoint alerts after the first duplicate',
          fr: 'Désactiver les alertes de terminal après le premier doublon',
        },
        correct: false,
        explanation: {
          en: 'Duplicate data entry is inefficient, but disabling detection discards security visibility instead of improving the repetitive operational step.',
          fr: 'La saisie en double est inefficace, mais désactiver la détection retire de la visibilité au lieu d’améliorer l’étape répétitive.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Require a second person to retype every alert detail',
          fr: 'Exiger qu’une seconde personne retape chaque détail de l’alerte',
        },
        correct: false,
        explanation: {
          en: 'A second manual transcription adds cost and another opportunity for mismatch; it does not provide the consistency of structured automation.',
          fr: 'Une seconde transcription manuelle ajoute du coût et une nouvelle occasion d’écart ; elle ne fournit pas la cohérence de l’automatisation.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-004',
    objective: '4.7',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which benefit of automation most directly reduces skipped steps in a recurring process?',
      fr: 'Quel bénéfice de l’automatisation réduit le plus directement les étapes oubliées dans un processus récurrent ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Consistency', fr: 'La cohérence' },
        correct: true,
        explanation: {
          en: 'A defined workflow performs the same intended sequence each time, reducing variation that causes manual operators to skip a step.',
          fr: 'Un flux défini exécute chaque fois la même séquence prévue, ce qui réduit les variations faisant oublier une étape aux opérateurs.',
        },
      },
      {
        id: 'b',
        text: { en: 'Non-repudiation', fr: 'La non-répudiation' },
        correct: false,
        explanation: {
          en: 'Non-repudiation supports proof that an action or message is attributable; it does not make a repeating sequence execute consistently.',
          fr: 'La non-répudiation aide à prouver qu’une action est attribuable ; elle ne rend pas une séquence répétée cohérente.',
        },
      },
      {
        id: 'c',
        text: { en: 'Segmentation', fr: 'La segmentation' },
        correct: false,
        explanation: {
          en: 'Segmentation separates systems or networks to limit exposure. It is a security architecture control, not a benefit of workflow execution.',
          fr: 'La segmentation sépare des systèmes ou réseaux pour limiter l’exposition. Ce n’est pas un bénéfice lié à l’exécution d’un flux.',
        },
      },
      {
        id: 'd',
        text: { en: 'Data retention', fr: 'La conservation des données' },
        correct: false,
        explanation: {
          en: 'Retaining data supports investigation and compliance, but it does not by itself prevent an operator from omitting a recurring process step.',
          fr: 'Conserver des données aide les enquêtes et la conformité, mais cela n’empêche pas à lui seul l’oubli d’une étape récurrente.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-005',
    objective: '4.7',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Why can automation improve a small security team’s ability to operate at scale?',
      fr: 'Pourquoi l’automatisation peut-elle améliorer la capacité d’une petite équipe de sécurité à opérer à grande échelle ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It can apply the same approved task to many in-scope assets',
          fr: 'Elle peut appliquer la même tâche approuvée à de nombreux actifs inclus dans la portée',
        },
        correct: true,
        explanation: {
          en: 'Once scope and safeguards are defined, a system can repeat a task across many selected assets faster than people can perform each copy.',
          fr: 'Une fois la portée et les garde-fous définis, un système répète la tâche sur de nombreux actifs plus vite que des personnes.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It makes asset inventory unnecessary',
          fr: 'Elle rend l’inventaire des actifs inutile',
        },
        correct: false,
        explanation: {
          en: 'Automation needs accurate targets. Without an inventory, a team cannot reliably know which assets should receive the check or change.',
          fr: 'L’automatisation a besoin de cibles exactes. Sans inventaire, l’équipe ne sait pas de façon fiable quels actifs doivent recevoir le contrôle.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It permits one script to bypass all approval requirements',
          fr: 'Elle permet à un script de contourner toutes les exigences d’approbation',
        },
        correct: false,
        explanation: {
          en: 'Automation may execute an approved workflow, but it does not remove approval, especially for exceptional or irreversible actions.',
          fr: 'L’automatisation peut exécuter un flux approuvé, mais elle ne supprime pas les approbations, surtout pour les actions irréversibles.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It ensures every asset has identical business requirements',
          fr: 'Elle garantit que chaque actif possède les mêmes exigences métier',
        },
        correct: false,
        explanation: {
          en: 'Assets can have different owners, dependencies, and maintenance constraints. Automation scales a task; it does not erase those differences.',
          fr: 'Les actifs peuvent avoir des propriétaires, dépendances et contraintes différents. L’automatisation étend une tâche sans effacer ces différences.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-006',
    objective: '4.7',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'An automated deprovisioning workflow needs to disable accounts after approved terminations. Which permission design is most secure?',
      fr: 'Un flux automatisé de suppression doit désactiver des comptes après des départs approuvés. Quelle conception des droits est la plus sûre ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A dedicated service identity with permission only to disable approved accounts',
          fr: 'Une identité de service dédiée ayant seulement le droit de désactiver les comptes approuvés',
        },
        correct: true,
        explanation: {
          en: 'A dedicated identity makes activity attributable, and narrowly scoped rights enforce least privilege for the exact automated task.',
          fr: 'Une identité dédiée rend l’activité attribuable, et des droits restreints appliquent le moindre privilège à la tâche automatisée précise.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A shared domain administrator account embedded in the workflow',
          fr: 'Un compte administrateur de domaine partagé intégré au flux',
        },
        correct: false,
        explanation: {
          en: 'A shared administrator identity has excessive authority and weak attribution. Compromise of the workflow would expose far more than account disabling.',
          fr: 'Une identité administrateur partagée possède trop de droits et une faible attribution. Sa compromission exposerait bien plus que la désactivation de comptes.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Each departing employee’s own credentials',
          fr: 'Les propres identifiants de chaque employé quittant l’organisation',
        },
        correct: false,
        explanation: {
          en: 'Those credentials are the target of the workflow and may no longer be valid. They cannot safely authorize a process to disable themselves.',
          fr: 'Ces identifiants sont la cible du flux et peuvent ne plus être valides. Ils ne peuvent pas autoriser sûrement leur propre désactivation.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Anonymous access so no credentials can be stolen',
          fr: 'Un accès anonyme afin qu’aucun identifiant ne puisse être volé',
        },
        correct: false,
        explanation: {
          en: 'A sensitive account-management action requires authenticated, attributable authority. Anonymous access removes the control instead of securing it.',
          fr: 'Une action sensible de gestion des comptes exige une autorité authentifiée et attribuable. L’accès anonyme retire ce contrôle au lieu de le sécuriser.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-007',
    objective: '4.7',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A patch workflow cannot contact one selected server but marks the overall deployment successful. What capability is missing?',
      fr: 'Un flux de correctif ne peut joindre un serveur sélectionné mais marque le déploiement global comme réussi. Quelle capacité manque-t-il ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Error handling that records and escalates a failed action',
          fr: 'Une gestion des erreurs qui consigne et remonte une action échouée',
        },
        correct: true,
        explanation: {
          en: 'The workflow must surface a failed host and report an accurate result. Treating an unreachable target as success creates dangerous false assurance.',
          fr: 'Le flux doit signaler l’hôte en échec et fournir un résultat exact. Traiter une cible injoignable comme un succès crée une fausse assurance dangereuse.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A longer password expiration period',
          fr: 'Une période d’expiration de mot de passe plus longue',
        },
        correct: false,
        explanation: {
          en: 'Password lifetime does not determine whether the workflow can reach a server or accurately report a failed deployment action.',
          fr: 'La durée des mots de passe ne détermine pas si le flux peut joindre un serveur ou signaler correctement l’échec du déploiement.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A firewall allow rule for every possible destination',
          fr: 'Une règle de pare-feu autorisant toute destination possible',
        },
        correct: false,
        explanation: {
          en: 'Opening every destination is excessive and may not address the cause. The stated failure is inaccurate handling, not proof of a firewall block.',
          fr: 'Ouvrir toutes les destinations est excessif et peut ne pas résoudre la cause. Le problème décrit est le traitement inexact, pas une preuve de blocage.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A manual re-entry of the successful servers',
          fr: 'Une nouvelle saisie manuelle des serveurs réussis',
        },
        correct: false,
        explanation: {
          en: 'Retyping successful targets does not detect or explain the failed one. The workflow needs a reliable failure state and operator notification.',
          fr: 'Retaper les cibles réussies ne détecte ni n’explique celle qui a échoué. Le flux a besoin d’un état d’échec fiable et d’une notification.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-008',
    objective: '4.7',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which trigger is event-driven rather than scheduled?',
      fr: 'Quel déclencheur est fondé sur un événement plutôt que sur un calendrier ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A workflow starts when the identity system reports an approved termination',
          fr: 'Un flux démarre lorsque le système d’identité signale un départ approuvé',
        },
        correct: true,
        explanation: {
          en: 'The defined termination event starts the workflow. Its timing depends on the event occurring, not on a clock or calendar interval.',
          fr: 'L’événement de départ défini lance le flux. Son heure dépend de l’arrivée de cet événement, et non d’une horloge ou d’un intervalle.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A job scans for expired certificates every Sunday at midnight',
          fr: 'Une tâche recherche les certificats expirés chaque dimanche à minuit',
        },
        correct: false,
        explanation: {
          en: 'The job starts at a fixed calendar time. It is useful automation, but it is scheduled rather than triggered by an observed event.',
          fr: 'La tâche démarre à une heure fixe du calendrier. C’est une automatisation utile, mais planifiée et non déclenchée par un événement observé.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'An analyst starts a script after reviewing a dashboard',
          fr: 'Un analyste lance un script après avoir examiné un tableau de bord',
        },
        correct: false,
        explanation: {
          en: 'The analyst’s manual decision starts the script. The dashboard may show information, but no defined system event automatically triggers the task.',
          fr: 'La décision manuelle de l’analyste lance le script. Aucun événement système défini ne déclenche automatiquement la tâche.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A change runs during the monthly maintenance window',
          fr: 'Un changement est exécuté durant la fenêtre de maintenance mensuelle',
        },
        correct: false,
        explanation: {
          en: 'A maintenance window is a planned time constraint. It does not mean that an operational event caused the workflow to begin.',
          fr: 'Une fenêtre de maintenance est une contrainte horaire planifiée. Elle ne signifie pas qu’un événement opérationnel a lancé le flux.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-009',
    objective: '4.7',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'What should an automated security workflow record to support an audit trail?',
      fr: 'Que doit consigner un flux automatisé de sécurité afin de soutenir une piste d’audit ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Its trigger, actions, results, and the identity that ran it',
          fr: 'Son déclencheur, ses actions, ses résultats et l’identité qui l’a exécuté',
        },
        correct: true,
        explanation: {
          en: 'These records show why the workflow ran, what it did, whether it succeeded, and which accountable identity performed the activity.',
          fr: 'Ces éléments montrent pourquoi le flux a démarré, ce qu’il a fait, son succès éventuel et quelle identité attribuable a agi.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Only the final success message',
          fr: 'Uniquement le message final de réussite',
        },
        correct: false,
        explanation: {
          en: 'A final message cannot show the trigger, intermediate actions, or partial failures. It gives too little evidence for investigation or review.',
          fr: 'Un message final ne montre ni le déclencheur, ni les actions intermédiaires, ni les échecs partiels. La preuve est insuffisante.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Only the source code of the workflow',
          fr: 'Uniquement le code source du flux',
        },
        correct: false,
        explanation: {
          en: 'Source code explains intended behavior, not what happened in a particular execution. Operational logs are required to show actual activity.',
          fr: 'Le code source explique le comportement prévu, pas ce qui est arrivé pendant une exécution donnée. Les journaux montrent l’activité réelle.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The personal workstation name of every analyst',
          fr: 'Le nom du poste personnel de chaque analyste',
        },
        correct: false,
        explanation: {
          en: 'A workflow log needs the relevant service or operator identity and action evidence. Collecting every analyst workstation is not the necessary record.',
          fr: 'Le journal du flux exige l’identité pertinente et les preuves d’action. Collecter chaque poste d’analyste n’est pas l’enregistrement requis.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-010',
    objective: '4.7',
    kind: 'scenario',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'A team is revising a script that changes security-group membership. Which practices should occur before broad production use? (Select two.)',
      fr: 'Une équipe révise un script qui modifie les appartenances à des groupes de sécurité. Quelles pratiques doivent avoir lieu avant une utilisation étendue en production ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Test the revised script in a suitable nonproduction environment',
          fr: 'Tester le script révisé dans un environnement hors production adapté',
        },
        correct: true,
        explanation: {
          en: 'Testing reveals bad logic, assumptions, and effects on a safe scope before the script can change access for many production users.',
          fr: 'Les tests révèlent la mauvaise logique, les hypothèses et effets dans une portée sûre avant de modifier l’accès de nombreux utilisateurs.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Review and version the change so the prior behavior is recoverable',
          fr: 'Examiner et versionner le changement afin de pouvoir retrouver le comportement antérieur',
        },
        correct: true,
        explanation: {
          en: 'Review catches unsafe changes, while version history makes the exact change attributable and supports rollback to the previous behavior.',
          fr: 'La revue détecte les changements dangereux, et l’historique versionné rend le changement attribuable tout en facilitant le retour arrière.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Embed a domain administrator password to avoid access failures',
          fr: 'Intégrer un mot de passe administrateur de domaine afin d’éviter les échecs d’accès',
        },
        correct: false,
        explanation: {
          en: 'Embedding powerful credentials exposes a secret and violates least privilege. A dedicated identity with narrowly scoped rights is safer.',
          fr: 'Intégrer des identifiants puissants expose un secret et viole le moindre privilège. Une identité dédiée aux droits étroits est plus sûre.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Remove all execution logging to improve performance',
          fr: 'Supprimer tous les journaux d’exécution pour améliorer les performances',
        },
        correct: false,
        explanation: {
          en: 'Logging is needed to verify scope, results, and failures. Removing it may marginally reduce work but destroys necessary accountability.',
          fr: 'Les journaux servent à vérifier portée, résultats et échecs. Les supprimer détruit la traçabilité nécessaire pour un gain marginal.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-011',
    objective: '4.7',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A containment workflow can isolate an endpoint automatically when three high-confidence indicators agree. A business-critical server appears in the alert. What should the workflow do?',
      fr: 'Un flux de confinement peut isoler automatiquement un terminal lorsque trois indicateurs très fiables concordent. Un serveur critique apparaît dans l’alerte. Que doit faire le flux ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Require an appropriate human approval or exception step before isolation',
          fr: 'Exiger une approbation humaine appropriée ou une étape d’exception avant l’isolement',
        },
        correct: true,
        explanation: {
          en: 'Isolation may be technically justified but can interrupt a critical service. A workflow can automate evidence and routing while escalating this exception.',
          fr: 'L’isolement peut être techniquement justifié mais interrompre un service critique. Le flux peut automatiser les preuves et escalader cette exception.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Isolate every server immediately because automation cannot be wrong',
          fr: 'Isoler immédiatement chaque serveur car l’automatisation ne peut pas se tromper',
        },
        correct: false,
        explanation: {
          en: 'Automation can act on faulty indicators or outdated context. Critical business impact is exactly why a controlled exception path is valuable.',
          fr: 'L’automatisation peut agir sur des indicateurs erronés ou un contexte périmé. L’impact métier critique justifie précisément une voie d’exception contrôlée.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Delete the alert so the workflow does not need to decide',
          fr: 'Supprimer l’alerte afin que le flux n’ait pas à décider',
        },
        correct: false,
        explanation: {
          en: 'Deleting an alert removes evidence and visibility. The correct response is to preserve context and route the exceptional decision appropriately.',
          fr: 'Supprimer une alerte retire des preuves et de la visibilité. Il faut conserver le contexte et acheminer correctement la décision exceptionnelle.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Give the workflow global administrator rights for future cases',
          fr: 'Donner au flux des droits administrateur globaux pour les cas futurs',
        },
        correct: false,
        explanation: {
          en: 'More privilege does not solve the business decision and increases the impact if the workflow is misconfigured or compromised.',
          fr: 'Davantage de privilèges ne résout pas la décision métier et augmente l’impact si le flux est mal configuré ou compromis.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-012',
    objective: '4.7',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which practice best protects a secret needed by an automated workflow?',
      fr: 'Quelle pratique protège le mieux un secret nécessaire à un flux automatisé ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Use protected secret storage with restricted access and rotation',
          fr: 'Utiliser un stockage de secrets protégé avec accès restreint et rotation',
        },
        correct: true,
        explanation: {
          en: 'Protected storage limits who can retrieve the secret, supports controlled use, and allows rotation without placing the value in code.',
          fr: 'Un stockage protégé limite qui récupère le secret, permet un usage contrôlé et la rotation sans placer la valeur dans le code.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Put the secret in a comment so operators can find it quickly',
          fr: 'Placer le secret dans un commentaire pour que les opérateurs le trouvent vite',
        },
        correct: false,
        explanation: {
          en: 'Comments are commonly readable in source control and deployment packages. Hiding a secret in a comment is disclosure, not protection.',
          fr: 'Les commentaires sont souvent lisibles dans le contrôle de version et les paquets. Y cacher un secret constitue une divulgation, pas une protection.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Share one powerful credential among all automation workflows',
          fr: 'Partager un identifiant puissant entre tous les flux automatisés',
        },
        correct: false,
        explanation: {
          en: 'A shared powerful credential defeats attribution and least privilege. Compromise of one workflow would endanger every system using that secret.',
          fr: 'Un identifiant puissant partagé détruit l’attribution et le moindre privilège. La compromission d’un flux mettrait en danger tous les systèmes concernés.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Disable audit logging for the account that retrieves the secret',
          fr: 'Désactiver les journaux d’audit du compte récupérant le secret',
        },
        correct: false,
        explanation: {
          en: 'Secret access is sensitive and should be attributable. Disabling its audit trail makes misuse harder to detect and investigate.',
          fr: 'L’accès aux secrets est sensible et doit être attribuable. Désactiver sa piste d’audit rend les abus plus difficiles à détecter et enquêter.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-013',
    objective: '4.7',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Why should a team monitor the automation workflow itself, not only the systems it targets?',
      fr: 'Pourquoi une équipe doit-elle surveiller le flux d’automatisation lui-même, et pas seulement les systèmes ciblés ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'To verify that it started, completed, used the intended scope, and reported errors',
          fr: 'Pour vérifier qu’il a démarré, fini, employé la portée prévue et signalé les erreurs',
        },
        correct: true,
        explanation: {
          en: 'Target health cannot prove that the workflow actually ran or acted on every intended asset. Workflow telemetry exposes execution failures and scope errors.',
          fr: 'La santé des cibles ne prouve pas que le flux a tourné ni agi sur chaque actif prévu. Sa télémétrie révèle erreurs d’exécution et de portée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'To remove the need for monitoring targeted systems',
          fr: 'Pour supprimer le besoin de surveiller les systèmes ciblés',
        },
        correct: false,
        explanation: {
          en: 'Workflow monitoring and target monitoring answer different questions. Verifying the process does not replace observing security outcomes on the targets.',
          fr: 'La surveillance du flux et des cibles répond à des questions différentes. Vérifier le processus ne remplace pas l’observation des résultats.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'To allow scripts to change their own permissions automatically',
          fr: 'Pour permettre aux scripts de modifier automatiquement leurs propres droits',
        },
        correct: false,
        explanation: {
          en: 'Self-escalating permissions violate least privilege and can turn a workflow fault into a major compromise. Monitoring does not justify escalation.',
          fr: 'Des droits qui s’élèvent eux-mêmes violent le moindre privilège et peuvent transformer une erreur en compromission majeure.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'To prevent a person from reviewing failed actions',
          fr: 'Pour empêcher une personne d’examiner les actions échouées',
        },
        correct: false,
        explanation: {
          en: 'Visible workflow failures are intended to prompt review and remediation. Preventing review preserves the failure rather than making operations secure.',
          fr: 'Les échecs visibles du flux doivent déclencher revue et correction. Empêcher la revue maintient l’échec au lieu de sécuriser les opérations.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-014',
    objective: '4.7',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'In secure operations, what is a playbook primarily used for?',
      fr: 'Dans les opérations de sécurité, à quoi sert principalement un playbook ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Documenting and coordinating a repeatable response workflow',
          fr: 'Documenter et coordonner un flux de réponse répétable',
        },
        correct: true,
        explanation: {
          en: 'A playbook defines how a recurring situation is handled, including steps, decisions, escalation points, and where automation can participate.',
          fr: 'Un playbook définit le traitement d’une situation récurrente, avec étapes, décisions, escalades et endroits où l’automatisation peut participer.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Replacing every policy with a technical command',
          fr: 'Remplacer chaque politique par une commande technique',
        },
        correct: false,
        explanation: {
          en: 'Policies state organizational requirements, while a playbook guides a specific operational response. A procedure does not replace governance.',
          fr: 'Les politiques expriment les exigences organisationnelles, tandis qu’un playbook guide une réponse opérationnelle précise. Il ne remplace pas la gouvernance.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Storing all employee passwords for emergency use',
          fr: 'Stocker tous les mots de passe des employés pour les urgences',
        },
        correct: false,
        explanation: {
          en: 'A playbook describes actions and decisions. Collecting employee passwords is a risky credential practice unrelated to workflow documentation.',
          fr: 'Un playbook décrit actions et décisions. Collecter les mots de passe des employés est une pratique risquée sans rapport avec cette documentation.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Proving that a system cannot be compromised',
          fr: 'Prouver qu’un système ne peut pas être compromis',
        },
        correct: false,
        explanation: {
          en: 'No operational document proves immunity from compromise. A playbook improves preparedness and consistency when security events occur.',
          fr: 'Aucun document opérationnel ne prouve une immunité contre la compromission. Un playbook améliore préparation et cohérence lors des événements.',
        },
      },
    ],
  },
  {
    id: 'q-4-7-015',
    objective: '4.7',
    kind: 'discrimination',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'Before enabling an automated account-disable action at scale, which two safeguards are most important? (Select two.)',
      fr: 'Avant d’activer à grande échelle une action automatisée de désactivation de comptes, quels sont les deux garde-fous les plus importants ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Validate the account identity and approved request before acting',
          fr: 'Valider l’identité du compte et la demande approuvée avant d’agir',
        },
        correct: true,
        explanation: {
          en: 'Input validation prevents the workflow from disabling the wrong account because of malformed, stale, or unauthorized request data.',
          fr: 'La validation des entrées évite de désactiver le mauvais compte à cause de données mal formées, périmées ou non autorisées.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Use a rollback or exception process and report failures visibly',
          fr: 'Employer un processus de retour arrière ou d’exception et signaler clairement les échecs',
        },
        correct: true,
        explanation: {
          en: 'Account changes can have unintended effects. A controlled recovery path and visible failure reporting let people correct an unsafe or incomplete action.',
          fr: 'Les changements de comptes peuvent avoir des effets inattendus. Une récupération contrôlée et le signalement des échecs permettent la correction.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Grant the workflow unrestricted rights to every identity system',
          fr: 'Accorder au flux des droits illimités sur chaque système d’identité',
        },
        correct: false,
        explanation: {
          en: 'Unrestricted rights enlarge the blast radius of a defect or compromise. The process needs only the narrow authority required for approved targets.',
          fr: 'Des droits illimités agrandissent l’impact d’un défaut ou d’une compromission. Le processus doit seulement posséder l’autorité étroite nécessaire.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Suppress logging so disabled accounts cannot be enumerated',
          fr: 'Supprimer les journaux afin que les comptes désactivés ne puissent pas être énumérés',
        },
        correct: false,
        explanation: {
          en: 'Suppressing logs removes evidence needed to verify action and investigate mistakes. Protecting logs is appropriate; eliminating them is not.',
          fr: 'Supprimer les journaux retire les preuves nécessaires pour vérifier l’action et enquêter sur les erreurs. Il faut les protéger, pas les éliminer.',
        },
      },
    ],
  },
];
