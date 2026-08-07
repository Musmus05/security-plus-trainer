import type { Question } from '@/content/schemas';

/**
 * Objective 5.4 — Summarize elements of effective security compliance.
 *
 * Every question is original and derived from the published objective. It does not reproduce,
 * paraphrase, or reconstruct a real certification examination item — see NOTICE.md.
 */
export const QUESTIONS_5_4: Question[] = [
  {
    id: 'q-5-4-001',
    objective: '5.4',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the primary purpose of compliance monitoring?',
      fr: 'Quelle est la finalité principale de la surveillance de conformité ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'To check whether current practice meets applicable requirements',
          fr: 'Vérifier que la pratique actuelle respecte les exigences applicables',
        },
        correct: true,
        explanation: {
          en: 'Monitoring repeatedly compares the current state with a requirement. Its value is detecting drift or gaps before a report, audit, or incident makes them more costly.',
          fr: 'La surveillance compare régulièrement l’état actuel à une exigence. Elle détecte les dérives ou écarts avant qu’un rapport, un audit ou un incident ne les rende plus coûteux.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'To negotiate the scope of a new vendor contract',
          fr: 'Négocier le périmètre d’un nouveau contrat fournisseur',
        },
        correct: false,
        explanation: {
          en: 'Contract negotiation can establish obligations, but it does not check whether an existing practice meets them. That is a third-party management activity.',
          fr: 'La négociation peut établir des obligations, mais elle ne vérifie pas qu’une pratique existante les respecte. Il s’agit d’une activité de gestion des tiers.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'To restore systems after a security incident',
          fr: 'Restaurer les systèmes après un incident de sécurité',
        },
        correct: false,
        explanation: {
          en: 'Recovery restores service after an incident. Monitoring may reveal a missing control, but it neither performs restoration nor replaces an incident response plan.',
          fr: 'La reprise restaure le service après un incident. La surveillance peut révéler un contrôle manquant, mais elle n’effectue pas la restauration et ne remplace pas un plan de réponse.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'To approve exceptions to a security policy',
          fr: 'Approuver des exceptions à une politique de sécurité',
        },
        correct: false,
        explanation: {
          en: 'An authorised risk owner may approve an exception. Monitoring can identify or track that exception, but approval is a governance decision, not the monitoring function.',
          fr: 'Un responsable habilité peut approuver une exception. La surveillance peut identifier ou suivre cette exception, mais l’approbation est une décision de gouvernance, pas sa fonction.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-002',
    objective: '5.4',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which item makes a compliance report most actionable for management?',
      fr: 'Quel élément rend un rapport de conformité le plus exploitable pour la direction ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Affected scope, accountable owner, due date, and corrective action',
          fr: 'Le périmètre affecté, le responsable, l’échéance et l’action corrective',
        },
        correct: true,
        explanation: {
          en: 'These details connect a finding to responsibility and a decision. Management can see the significance, assign resources, and follow whether the identified gap is being closed.',
          fr: 'Ces détails relient une constatation à une responsabilité et à une décision. La direction peut en comprendre l’importance, attribuer des ressources et suivre la fermeture de l’écart.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A complete export of every source-system log',
          fr: 'Une exportation complète de tous les journaux des systèmes sources',
        },
        correct: false,
        explanation: {
          en: 'Raw logs can be evidence, but they rarely communicate compliance status or ownership clearly to management. They also may expose unnecessary operational or personal information.',
          fr: 'Les journaux bruts peuvent être des preuves, mais ils communiquent rarement clairement l’état et la responsabilité à la direction. Ils peuvent aussi exposer des informations inutiles.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The names of all employees who use the system',
          fr: 'Les noms de tous les employés utilisant le système',
        },
        correct: false,
        explanation: {
          en: 'A user list may be relevant to a specific investigation, but it neither describes the compliance gap nor tells management what action or decision is needed.',
          fr: 'Une liste d’utilisateurs peut servir à une investigation précise, mais elle ne décrit pas l’écart de conformité ni l’action ou la décision attendue de la direction.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A statement that the security team worked hard',
          fr: 'Une déclaration indiquant que l’équipe sécurité a beaucoup travaillé',
        },
        correct: false,
        explanation: {
          en: 'Effort is not compliance evidence. A report must describe measurable status against a requirement and the response to any exception, rather than the team’s level of effort.',
          fr: 'L’effort n’est pas une preuve de conformité. Un rapport doit décrire un état mesurable face à une exigence et la réponse aux exceptions, non le travail fourni.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-003',
    objective: '5.4',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'How does compliance reporting differ from compliance monitoring?',
      fr: 'En quoi le reporting de conformité diffère-t-il de la surveillance de conformité ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Reporting communicates status; monitoring checks whether requirements are being met',
          fr: 'Le reporting communique l’état ; la surveillance vérifie le respect des exigences',
        },
        correct: true,
        explanation: {
          en: 'Monitoring creates or gathers observations about the current condition. Reporting turns those observations into a useful status, trend, and action request for a defined audience.',
          fr: 'La surveillance produit ou collecte des observations sur l’état actuel. Le reporting transforme ces observations en état, tendance et demande d’action utiles à un public défini.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Reporting corrects gaps; monitoring approves policy exceptions',
          fr: 'Le reporting corrige les écarts ; la surveillance approuve les exceptions de politique',
        },
        correct: false,
        explanation: {
          en: 'Correcting a gap is remediation, while approving an exception is a governance decision. Reporting and monitoring can inform both activities without performing either one.',
          fr: 'Corriger un écart relève de la remédiation, tandis qu’approuver une exception est une décision de gouvernance. Reporting et surveillance peuvent éclairer ces activités sans les réaliser.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Reporting is only for regulators; monitoring is only for internal staff',
          fr: 'Le reporting est réservé aux régulateurs ; la surveillance aux équipes internes',
        },
        correct: false,
        explanation: {
          en: 'Both activities can serve internal and external needs. Management, customers, and regulators may receive reports, while internal staff may perform or review monitoring.',
          fr: 'Les deux activités peuvent servir des besoins internes et externes. Direction, clients et régulateurs peuvent recevoir des rapports, tandis que des équipes internes réalisent ou examinent la surveillance.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Reporting is a one-time project; monitoring ends after initial deployment',
          fr: 'Le reporting est un projet unique ; la surveillance cesse après le déploiement initial',
        },
        correct: false,
        explanation: {
          en: 'Requirements and systems change over time, so both reporting and monitoring can recur. A one-time deployment review cannot establish continuing compliance.',
          fr: 'Les exigences et systèmes évoluent, de sorte que reporting et surveillance peuvent être récurrents. Une revue unique de déploiement ne démontre pas une conformité continue.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-004',
    objective: '5.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A quarterly scan finds that 14 in-scope servers lack a mandated logging setting. What should the security team do first to support effective compliance?',
      fr: 'Une analyse trimestrielle révèle que 14 serveurs du périmètre n’ont pas un paramètre de journalisation obligatoire. Que doit faire l’équipe sécurité en premier pour soutenir une conformité efficace ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Record the evidence and open corrective action with an owner and due date',
          fr: 'Consigner les preuves et ouvrir une action corrective avec responsable et échéance',
        },
        correct: true,
        explanation: {
          en: 'The finding must become accountable work supported by evidence. This preserves the monitoring result and provides a path to remediate and later verify the required setting.',
          fr: 'La constatation doit devenir un travail attribué, soutenu par des preuves. Cela préserve le résultat de surveillance et permet de corriger puis vérifier le paramètre requis.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Delete the scan results to avoid distributing sensitive infrastructure data',
          fr: 'Supprimer les résultats de l’analyse afin de ne pas diffuser de données d’infrastructure sensibles',
        },
        correct: false,
        explanation: {
          en: 'Reports should limit distribution appropriately, but deleting evidence prevents remediation and proof. Protect the results with access controls rather than erasing the compliance record.',
          fr: 'Les rapports doivent limiter leur diffusion, mais supprimer les preuves empêche la correction et la démonstration. Il faut protéger les résultats par des contrôles d’accès, non effacer la trace.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Declare the requirement met because most servers passed',
          fr: 'Déclarer l’exigence respectée parce que la plupart des serveurs ont réussi',
        },
        correct: false,
        explanation: {
          en: 'A majority result does not eliminate the known non-compliant systems. The report may show an overall percentage, but the fourteen failures still require a documented decision.',
          fr: 'Un résultat majoritaire n’élimine pas les systèmes non conformes connus. Le rapport peut afficher un pourcentage global, mais les quatorze échecs exigent toujours une décision documentée.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Wait for the next annual audit before taking action',
          fr: 'Attendre le prochain audit annuel avant d’agir',
        },
        correct: false,
        explanation: {
          en: 'Monitoring exists to detect and address gaps between audits. Deferring a known missing logging control leaves the exposure in place and defeats the purpose of continuous monitoring.',
          fr: 'La surveillance sert à détecter et traiter les écarts entre les audits. Reporter un contrôle de journalisation manquant connu laisse l’exposition en place et annule l’intérêt du suivi continu.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-005',
    objective: '5.4',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which is a likely consequence of non-compliance with a customer contract?',
      fr: 'Quelle est une conséquence probable d’une non-conformité à un contrat client ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A contractual remedy, such as withheld payment or service termination',
          fr: 'Un recours contractuel, tel qu’un paiement retenu ou une résiliation de service',
        },
        correct: true,
        explanation: {
          en: 'Contracts can specify remedies when commitments are missed. The exact remedy depends on the agreement, but commercial consequences are distinct from technical remediation.',
          fr: 'Les contrats peuvent prévoir des recours lorsque des engagements ne sont pas respectés. Le recours exact dépend de l’accord, mais les conséquences commerciales diffèrent de la remédiation technique.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Automatic removal of every legal obligation',
          fr: 'La suppression automatique de toute obligation juridique',
        },
        correct: false,
        explanation: {
          en: 'A contract dispute does not erase applicable laws or regulations. Ending a customer relationship may reduce future obligations, but it does not undo obligations that already applied.',
          fr: 'Un litige contractuel n’efface pas les lois ou réglementations applicables. Mettre fin à une relation peut réduire des obligations futures, mais n’annule pas celles qui s’appliquaient déjà.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Guaranteed compromise of the customer’s data',
          fr: 'La compromission garantie des données du client',
        },
        correct: false,
        explanation: {
          en: 'Non-compliance can increase risk without proving a breach occurred. A missing requirement and a confirmed compromise are different findings that need different evidence.',
          fr: 'La non-conformité peut accroître le risque sans prouver qu’une violation a eu lieu. Une exigence manquante et une compromission confirmée sont des constatations distinctes.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Automatic approval of a policy exception',
          fr: 'L’approbation automatique d’une exception de politique',
        },
        correct: false,
        explanation: {
          en: 'An exception requires an authorised decision and defined conditions. A contract failure is evidence of a problem, not permission to disregard additional requirements.',
          fr: 'Une exception exige une décision habilitée et des conditions définies. Un échec contractuel prouve un problème, il ne permet pas d’ignorer d’autres exigences.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-006',
    objective: '5.4',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'A control is checked monthly, but the check omits newly deployed cloud accounts because the asset inventory is stale. What is the best conclusion?',
      fr: 'Un contrôle est vérifié chaque mois, mais il omet les nouveaux comptes cloud car l’inventaire des actifs est périmé. Quelle est la meilleure conclusion ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The monitoring may be frequent but is not reliably measuring the required scope',
          fr: 'La surveillance est peut-être fréquente, mais ne mesure pas fiablement le périmètre requis',
        },
        correct: true,
        explanation: {
          en: 'Frequency cannot compensate for incomplete scope. The organisation needs to correct the inventory or data source and reassess the excluded accounts before claiming a meaningful result.',
          fr: 'La fréquence ne compense pas un périmètre incomplet. Il faut corriger l’inventaire ou la source, puis réévaluer les comptes exclus avant d’affirmer un résultat utile.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The requirement is met because a monthly schedule exists',
          fr: 'L’exigence est respectée puisqu’un calendrier mensuel existe',
        },
        correct: false,
        explanation: {
          en: 'A schedule describes when a check runs, not whether it covers the required population. Missing cloud accounts can contain the very non-compliance the check should detect.',
          fr: 'Un calendrier indique quand une vérification s’exécute, pas si elle couvre la population requise. Les comptes cloud omis peuvent contenir précisément la non-conformité à détecter.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The cloud accounts are exempt from all security requirements',
          fr: 'Les comptes cloud sont exemptés de toute exigence de sécurité',
        },
        correct: false,
        explanation: {
          en: 'Deployment in a new environment does not create an exemption. An exception would need explicit approval, scope, duration, and risk treatment rather than an accidental omission.',
          fr: 'Un déploiement dans un nouvel environnement ne crée pas d’exemption. Une exception demanderait approbation, périmètre, durée et traitement du risque, non une omission accidentelle.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Only an external auditor can discover the omission',
          fr: 'Seul un auditeur externe peut découvrir cette omission',
        },
        correct: false,
        explanation: {
          en: 'Internal control owners and monitoring teams can identify source-data and coverage gaps. An external audit may detect one, but waiting for it is not effective compliance.',
          fr: 'Les responsables de contrôle et équipes internes peuvent identifier les lacunes de source et de couverture. Un audit externe peut les révéler, mais l’attendre n’est pas une conformité efficace.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-007',
    objective: '5.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A manager wants a report listing every employee’s home address to prove that annual training is complete. What should the compliance team recommend?',
      fr: 'Un responsable veut un rapport listant l’adresse personnelle de chaque employé pour prouver que la formation annuelle est terminée. Que doit recommander l’équipe conformité ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Report completion status with only the personal data needed by recipients',
          fr: 'Rapporter l’état d’achèvement avec seulement les données personnelles nécessaires aux destinataires',
        },
        correct: true,
        explanation: {
          en: 'Home addresses do not establish training completion for this audience. Limiting unnecessary personal information supports privacy while preserving the evidence and action needed by management.',
          fr: 'Les adresses personnelles ne démontrent pas l’achèvement de formation pour ce public. Limiter les données inutiles protège la vie privée tout en préservant preuves et actions nécessaires.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Include the addresses because more data always improves compliance evidence',
          fr: 'Inclure les adresses car davantage de données améliore toujours les preuves de conformité',
        },
        correct: false,
        explanation: {
          en: 'More data is not automatically better evidence. Unrelated personal details can create privacy risk and obscure the actual metric, which is training completion.',
          fr: 'Davantage de données n’améliore pas automatiquement une preuve. Des détails personnels sans rapport créent un risque de vie privée et masquent la métrique réelle, l’achèvement de formation.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Stop reporting training completion to avoid any privacy concern',
          fr: 'Cesser de rapporter l’achèvement de formation pour éviter toute préoccupation de vie privée',
        },
        correct: false,
        explanation: {
          en: 'Privacy calls for appropriate, limited handling, not abandonment of legitimate compliance reporting. Completion status can be reported with controlled access and minimal necessary data.',
          fr: 'La vie privée demande un traitement approprié et limité, non l’abandon d’un reporting légitime. L’état d’achèvement peut être rapporté avec accès contrôlé et données minimales.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Encrypt the address list and distribute it to all department heads',
          fr: 'Chiffrer la liste d’adresses et la diffuser à tous les chefs de département',
        },
        correct: false,
        explanation: {
          en: 'Encryption protects data in transit or at rest, but does not make unnecessary broad distribution appropriate. Recipients still need a legitimate need to know.',
          fr: 'Le chiffrement protège les données en transit ou au repos, mais ne rend pas appropriée une diffusion large inutile. Les destinataires doivent toujours avoir besoin d’en connaître.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-008',
    objective: '5.4',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A company learns that a required data-retention process was not followed for a business unit. Which response best addresses the compliance finding?',
      fr: 'Une entreprise apprend qu’un processus obligatoire de conservation des données n’a pas été suivi dans une unité métier. Quelle réponse traite le mieux la constatation de conformité ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Determine the scope, preserve evidence, assign remediation, and verify the correction',
          fr: 'Déterminer le périmètre, préserver les preuves, attribuer la remédiation et vérifier la correction',
        },
        correct: true,
        explanation: {
          en: 'This sequence establishes what failed, makes ownership explicit, corrects the gap, and confirms the remedy works. It supports both accurate reporting and effective risk treatment.',
          fr: 'Cette séquence établit ce qui a échoué, explicite la responsabilité, corrige l’écart et confirme l’efficacité du remède. Elle soutient un reporting exact et un traitement efficace du risque.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Change the report label from non-compliant to pending review',
          fr: 'Changer l’étiquette du rapport de non conforme à en attente de revue',
        },
        correct: false,
        explanation: {
          en: 'Relabelling a known failure does not correct the process or reduce any resulting exposure. Status wording may change after justified validation, not instead of remediation.',
          fr: 'Renommer un échec connu ne corrige pas le processus et ne réduit pas l’exposition. Le statut peut changer après une validation justifiée, jamais à la place d’une remédiation.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Delete older records immediately without checking applicable obligations',
          fr: 'Supprimer immédiatement les anciens enregistrements sans vérifier les obligations applicables',
        },
        correct: false,
        explanation: {
          en: 'Retention problems can involve keeping data too long or deleting it too soon. Immediate deletion without scope and requirement analysis could create a second compliance failure.',
          fr: 'Un problème de conservation peut consister à garder trop longtemps ou à supprimer trop tôt. Une suppression immédiate sans analyse du périmètre et des exigences peut créer un second écart.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Wait for a customer complaint before documenting the issue',
          fr: 'Attendre une plainte client avant de documenter le problème',
        },
        correct: false,
        explanation: {
          en: 'The organisation already has evidence of a requirement failure. Waiting for external discovery increases risk and loses the opportunity for timely, accountable corrective action.',
          fr: 'L’organisation possède déjà la preuve d’un échec d’exigence. Attendre une découverte externe augmente le risque et perd l’occasion d’une action corrective rapide et attribuée.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-009',
    objective: '5.4',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What privacy principle is most relevant when a form requests optional personal details that are not needed to provide the service?',
      fr: 'Quel principe de vie privée est le plus pertinent lorsqu’un formulaire demande des détails personnels facultatifs inutiles pour fournir le service ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Data minimisation', fr: 'La minimisation des données' },
        correct: true,
        explanation: {
          en: 'Data minimisation limits collection to information needed for the stated purpose. Optional, unrelated fields should not be collected merely because they could be useful someday.',
          fr: 'La minimisation limite la collecte aux informations nécessaires à la finalité annoncée. Des champs facultatifs sans rapport ne doivent pas être collectés au cas où ils serviraient plus tard.',
        },
      },
      {
        id: 'b',
        text: { en: 'High availability', fr: 'La haute disponibilité' },
        correct: false,
        explanation: {
          en: 'High availability keeps services accessible during failures. It says nothing about whether the service should collect a particular category of personal information.',
          fr: 'La haute disponibilité maintient les services accessibles pendant des pannes. Elle ne dit rien sur la nécessité de collecter une catégorie donnée d’informations personnelles.',
        },
      },
      {
        id: 'c',
        text: { en: 'Segmentation', fr: 'La segmentation' },
        correct: false,
        explanation: {
          en: 'Segmentation separates networks or assets to reduce exposure. It can protect stored data, but it does not answer whether collecting the data is appropriate in the first place.',
          fr: 'La segmentation sépare réseaux ou actifs pour réduire l’exposition. Elle peut protéger des données stockées, mais ne répond pas à la pertinence de leur collecte initiale.',
        },
      },
      {
        id: 'd',
        text: { en: 'Business continuity', fr: 'La continuité d’activité' },
        correct: false,
        explanation: {
          en: 'Business continuity plans how essential operations continue through disruption. It does not govern the amount of personal information a service is justified in requesting.',
          fr: 'La continuité d’activité planifie le maintien des opérations essentielles pendant une perturbation. Elle ne régit pas la quantité d’informations personnelles qu’un service peut demander.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-010',
    objective: '5.4',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which statement about encryption and privacy compliance is accurate?',
      fr: 'Quelle affirmation sur le chiffrement et la conformité en matière de vie privée est exacte ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Encryption protects confidentiality but does not by itself justify collection or retention',
          fr: 'Le chiffrement protège la confidentialité mais ne justifie pas seul collecte ou conservation',
        },
        correct: true,
        explanation: {
          en: 'Encryption is an important security control for data, yet privacy also considers purpose, minimisation, sharing, and retention. Protected unnecessary data can still create a privacy concern.',
          fr: 'Le chiffrement est un contrôle important, mais la vie privée concerne aussi finalité, minimisation, partage et conservation. Des données inutiles bien protégées peuvent rester problématiques.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Encryption removes the need to limit access to personal data',
          fr: 'Le chiffrement supprime le besoin de limiter l’accès aux données personnelles',
        },
        correct: false,
        explanation: {
          en: 'Encryption keys and authorised applications still permit access, so access control remains necessary. Broad access to decrypted data can violate privacy even when storage is encrypted.',
          fr: 'Les clés et applications autorisées permettent toujours l’accès ; le contrôle d’accès reste donc nécessaire. Un accès large aux données déchiffrées peut violer la vie privée.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Encryption guarantees that a report contains no personal information',
          fr: 'Le chiffrement garantit qu’un rapport ne contient aucune information personnelle',
        },
        correct: false,
        explanation: {
          en: 'Encryption changes how data is protected, not what fields are present. A report can still contain unnecessary personal information after it is decrypted by its recipients.',
          fr: 'Le chiffrement change la protection des données, non les champs présents. Un rapport peut toujours contenir des informations personnelles inutiles une fois déchiffré par ses destinataires.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Encryption is a replacement for compliance monitoring',
          fr: 'Le chiffrement remplace la surveillance de conformité',
        },
        correct: false,
        explanation: {
          en: 'A technical control does not replace checking whether requirements are met. Monitoring can verify encryption use, key practices, access, and other obligations over time.',
          fr: 'Un contrôle technique ne remplace pas la vérification du respect des exigences. La surveillance peut vérifier au fil du temps chiffrement, pratiques de clés, accès et autres obligations.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-011',
    objective: '5.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A customer asks for evidence that an organisation follows a contractual security requirement. Which response is most appropriate?',
      fr: 'Un client demande une preuve qu’une organisation respecte une exigence contractuelle de sécurité. Quelle réponse est la plus appropriée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Provide an approved report or attestation supported by relevant evidence',
          fr: 'Fournir un rapport ou une attestation approuvés, soutenus par des preuves pertinentes',
        },
        correct: true,
        explanation: {
          en: 'A controlled report or attestation can communicate the applicable status while protecting sensitive details. Relevant evidence makes the claim defensible rather than a bare assertion.',
          fr: 'Un rapport ou une attestation contrôlés peuvent communiquer l’état applicable tout en protégeant les détails sensibles. Les preuves pertinentes rendent l’affirmation défendable.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Send administrator passwords so the customer can inspect systems directly',
          fr: 'Envoyer les mots de passe administrateur afin que le client inspecte directement les systèmes',
        },
        correct: false,
        explanation: {
          en: 'Sharing privileged credentials creates a serious security problem and is not normal compliance evidence. Evidence should be disclosed through an authorised, appropriately scoped process.',
          fr: 'Partager des identifiants privilégiés crée un grave problème de sécurité et n’est pas une preuve normale. Les preuves doivent être divulguées par un processus autorisé et proportionné.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Refuse to report because all compliance information is confidential',
          fr: 'Refuser tout rapport car toute information de conformité est confidentielle',
        },
        correct: false,
        explanation: {
          en: 'Some details need protection, but a contractual request may require an approved response. Confidentiality is managed through scope and safeguards, not an automatic refusal.',
          fr: 'Certains détails doivent être protégés, mais une demande contractuelle peut exiger une réponse approuvée. La confidentialité se gère par le périmètre et des garanties, pas par un refus automatique.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Offer an unsupported verbal assurance from an engineer',
          fr: 'Offrir l’assurance verbale non étayée d’un ingénieur',
        },
        correct: false,
        explanation: {
          en: 'An informal assurance lacks traceable evidence and authority. Customers requesting compliance evidence need a controlled statement tied to the relevant requirement and supporting observations.',
          fr: 'Une assurance informelle manque de preuves traçables et d’autorité. Un client demandant des preuves a besoin d’une déclaration contrôlée liée à l’exigence et aux observations.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-012',
    objective: '5.4',
    kind: 'discrimination',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'Which two practices support privacy-conscious compliance reporting? (Select two.)',
      fr: 'Quelles deux pratiques soutiennent un reporting de conformité respectueux de la vie privée ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Limit personal data in the report to what recipients need for their decision',
          fr: 'Limiter les données personnelles du rapport à ce dont les destinataires ont besoin pour décider',
        },
        correct: true,
        explanation: {
          en: 'Need-to-know reporting reduces unnecessary disclosure while preserving the information required for action. A report should not include personal details simply because they are available.',
          fr: 'Un reporting au besoin d’en connaître réduit les divulgations inutiles tout en préservant l’information requise pour agir. Un rapport ne doit pas inclure des détails personnels disponibles par défaut.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Apply appropriate access controls to the detailed supporting evidence',
          fr: 'Appliquer des contrôles d’accès adaptés aux preuves détaillées',
        },
        correct: true,
        explanation: {
          en: 'Detailed evidence may contain sensitive personal or security information. Access controls let authorised reviewers validate the result without broadly distributing the source material.',
          fr: 'Les preuves détaillées peuvent contenir des informations sensibles. Les contrôles d’accès permettent aux réviseurs autorisés de valider le résultat sans diffuser largement la source.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Include every available employee attribute to make reports complete',
          fr: 'Inclure tout attribut disponible des employés afin de rendre les rapports complets',
        },
        correct: false,
        explanation: {
          en: 'Completeness must be measured against the reporting purpose, not every field in a database. Unrelated personal attributes expand exposure without improving the compliance decision.',
          fr: 'L’exhaustivité se mesure à la finalité du rapport, non à chaque champ d’une base. Des attributs personnels sans rapport augmentent l’exposition sans améliorer la décision de conformité.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Publish detailed exceptions publicly to ensure transparency',
          fr: 'Publier publiquement les exceptions détaillées afin d’assurer la transparence',
        },
        correct: false,
        explanation: {
          en: 'Transparency does not require unrestricted disclosure. Detailed exceptions can reveal personal, operational, or security-sensitive information and should reach only appropriate audiences.',
          fr: 'La transparence n’exige pas une divulgation sans limite. Des exceptions détaillées peuvent révéler des informations personnelles, opérationnelles ou sensibles et ne doivent atteindre que le bon public.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-013',
    objective: '5.4',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What does an approved compliance exception represent?',
      fr: 'Que représente une exception de conformité approuvée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A documented decision to accept a defined departure from a requirement',
          fr: 'Une décision documentée d’accepter un écart défini par rapport à une exigence',
        },
        correct: true,
        explanation: {
          en: 'An exception acknowledges that a requirement is not met under stated conditions and assigns accountability. It should be governed by scope, duration, and approved risk treatment.',
          fr: 'Une exception reconnaît qu’une exigence n’est pas respectée dans des conditions définies et attribue une responsabilité. Elle doit préciser périmètre, durée et traitement du risque approuvé.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Proof that the requirement no longer applies to anyone',
          fr: 'La preuve que l’exigence ne s’applique plus à personne',
        },
        correct: false,
        explanation: {
          en: 'An exception normally applies to a defined case, not the entire organisation. Removing a requirement broadly would require a policy or regulatory change, not an exception record.',
          fr: 'Une exception s’applique normalement à un cas défini, non à toute l’organisation. Supprimer largement une exigence demanderait un changement de politique ou réglementaire, pas une exception.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A substitute for monitoring the affected control',
          fr: 'Un substitut à la surveillance du contrôle affecté',
        },
        correct: false,
        explanation: {
          en: 'Exceptions often require closer tracking because risk remains. Monitoring can confirm that scope and expiry conditions are respected while remediation or acceptance remains valid.',
          fr: 'Les exceptions exigent souvent un suivi accru car le risque subsiste. La surveillance confirme le respect du périmètre et de l’expiration pendant que remédiation ou acceptation restent valides.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A guarantee that no consequence can result from non-compliance',
          fr: 'Une garantie qu’aucune conséquence ne peut résulter de la non-conformité',
        },
        correct: false,
        explanation: {
          en: 'Approval documents a business decision; it cannot erase external obligations or prevent a security event. The residual risk and possible consequences still need to be understood.',
          fr: 'L’approbation documente une décision métier ; elle n’efface pas les obligations externes ni ne prévient un incident. Le risque résiduel et les conséquences possibles doivent rester compris.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-014',
    objective: '5.4',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Why should compliance monitoring results identify their scope and collection date?',
      fr: 'Pourquoi les résultats de surveillance de conformité doivent-ils indiquer leur périmètre et leur date de collecte ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'So readers know what the conclusion covers and how current it is',
          fr: 'Pour que les lecteurs sachent ce que couvre la conclusion et son actualité',
        },
        correct: true,
        explanation: {
          en: 'A compliant result for one system group or an old period cannot support a claim about all current operations. Scope and date make the evidence interpretable.',
          fr: 'Un résultat conforme pour un groupe de systèmes ou une période ancienne ne soutient pas une affirmation sur toutes les opérations actuelles. Périmètre et date rendent la preuve interprétable.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'So the monitoring result automatically becomes an external audit',
          fr: 'Pour que le résultat de surveillance devienne automatiquement un audit externe',
        },
        correct: false,
        explanation: {
          en: 'Clear metadata improves evidence quality but does not change who performed the work or make it independent. An external audit has its own scope and assurance process.',
          fr: 'Des métadonnées claires améliorent la qualité des preuves, mais ne changent pas l’auteur du travail ni son indépendance. Un audit externe a son propre périmètre et processus.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'So the team can omit the requirement being measured',
          fr: 'Pour que l’équipe puisse omettre l’exigence mesurée',
        },
        correct: false,
        explanation: {
          en: 'Scope and date do not explain what success means. A useful result also identifies the applicable requirement or criterion used to judge the observed condition.',
          fr: 'Périmètre et date n’expliquent pas ce que signifie le succès. Un résultat utile identifie aussi l’exigence ou le critère appliqué pour juger l’état observé.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'So personal information can be retained indefinitely',
          fr: 'Pour que les informations personnelles puissent être conservées indéfiniment',
        },
        correct: false,
        explanation: {
          en: 'Evidence dates support traceability, but they do not override privacy retention obligations. Personal data in monitoring records still requires an appropriate retention and disposal approach.',
          fr: 'Les dates de preuve soutiennent la traçabilité, mais ne priment pas sur les obligations de conservation liées à la vie privée. Les données personnelles exigent toujours une conservation appropriée.',
        },
      },
    ],
  },
  {
    id: 'q-5-4-015',
    objective: '5.4',
    kind: 'scenario',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'A privacy review finds that a mobile app collects precise location data although the stated service works without it. Which two actions are most appropriate? (Select two.)',
      fr: 'Une revue de vie privée découvre qu’une application mobile collecte la localisation précise alors que le service annoncé fonctionne sans elle. Quelles deux actions sont les plus appropriées ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Stop or limit the unnecessary collection while the purpose is reviewed',
          fr: 'Arrêter ou limiter la collecte inutile pendant la revue de la finalité',
        },
        correct: true,
        explanation: {
          en: 'Data minimisation supports avoiding collection that is not needed for the stated service. Limiting the flow reduces exposure while an appropriate decision is made.',
          fr: 'La minimisation soutient l’évitement d’une collecte inutile au service annoncé. Limiter le flux réduit l’exposition pendant qu’une décision appropriée est prise.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Document the finding and assign corrective action through the compliance process',
          fr: 'Documenter la constatation et attribuer une action corrective via le processus de conformité',
        },
        correct: true,
        explanation: {
          en: 'The gap needs evidence, ownership, and follow-through. Documenting it supports accurate compliance reporting and verification that the app’s collection behaviour has changed.',
          fr: 'L’écart exige preuve, responsable et suivi. Le documenter soutient un reporting exact et la vérification du changement de comportement de collecte de l’application.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Keep collecting it because encryption makes the data private',
          fr: 'Continuer à la collecter car le chiffrement rend les données privées',
        },
        correct: false,
        explanation: {
          en: 'Encryption can protect collected data but does not establish a need to collect it. The privacy issue here is unnecessary collection, not only unauthorised disclosure.',
          fr: 'Le chiffrement peut protéger des données collectées, mais n’établit pas la nécessité de les collecter. Le problème est ici la collecte inutile, pas seulement une divulgation non autorisée.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Add the location field to every compliance report for transparency',
          fr: 'Ajouter le champ de localisation à chaque rapport de conformité par souci de transparence',
        },
        correct: false,
        explanation: {
          en: 'Copying sensitive location data into more reports expands disclosure and does not remediate the collection. Reports should contain only data necessary for their audience and purpose.',
          fr: 'Copier des données de localisation sensibles dans davantage de rapports élargit la divulgation et ne corrige pas la collecte. Les rapports ne doivent contenir que les données nécessaires.',
        },
      },
    ],
  },
];
