import type { Question } from '@/content/schemas';

/**
 * Objective 5.6 — Given a scenario, implement security awareness practices.
 *
 * Every question is original and written solely from the published objective. The set tests the
 * learner’s ability to connect recognition, usable reporting, monitoring, and programme feedback.
 */
export const QUESTIONS_5_6: Question[] = [
  {
    id: 'q-5-6-001',
    objective: '5.6',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the primary purpose of a phishing-awareness programme?',
      fr: 'Quelle est la finalité première d’un programme de sensibilisation au hameçonnage ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Help users recognise and safely report deceptive requests',
          fr: 'Aider les utilisateurs à reconnaître et signaler sans risque les demandes trompeuses',
        },
        correct: true,
        explanation: {
          en: 'Awareness gives users recognisable cues and a safe reporting action. It does not ask them to investigate an attacker or prove malicious intent before reporting.',
          fr: 'La sensibilisation donne des signaux reconnaissables et une action de signalement sûre. Elle ne demande pas aux utilisateurs d’enquêter ni de prouver une intention malveillante.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Replace email filtering with user judgement',
          fr: 'Remplacer le filtrage de courriel par le jugement des utilisateurs',
        },
        correct: false,
        explanation: {
          en: 'User awareness complements technical filtering. Filters can miss a new or targeted message, while training alone cannot reliably stop every malicious delivery.',
          fr: 'La sensibilisation complète le filtrage technique. Les filtres peuvent manquer un message nouveau ou ciblé, et la formation seule ne bloque pas chaque livraison malveillante.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Ensure every suspicious message is malware',
          fr: 'Garantir que chaque message suspect contient un logiciel malveillant',
        },
        correct: false,
        explanation: {
          en: 'A deceptive request may seek payment, credentials, or information without carrying malware. Users report suspicious signals because certainty is not required.',
          fr: 'Une demande trompeuse peut chercher un paiement, des identifiants ou des informations sans porter de logiciel malveillant. Les utilisateurs signalent un doute, sans devoir être certains.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Give employees authority to disable affected accounts',
          fr: 'Donner aux employés le pouvoir de désactiver les comptes touchés',
        },
        correct: false,
        explanation: {
          en: 'Account containment is a controlled response task for authorised teams. The employee should use the reporting route, which permits a timely and auditable investigation.',
          fr: 'Le confinement d’un compte est une tâche de réponse contrôlée, confiée à des équipes autorisées. L’employé doit utiliser la voie de signalement pour une enquête rapide et traçable.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-002',
    objective: '5.6',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An employee receives repeated MFA approval prompts but did not attempt to sign in. What should the employee do?',
      fr: 'Un employé reçoit des invites répétées d’approbation MFA sans avoir tenté de se connecter. Que doit-il faire ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Deny the prompts and report the unexpected activity',
          fr: 'Refuser les invites et signaler l’activité inattendue',
        },
        correct: true,
        explanation: {
          en: 'Unrequested prompts can indicate an attempt to use the employee’s credentials. Denying them prevents accidental approval, and reporting lets the security team investigate the pattern.',
          fr: 'Des invites non sollicitées peuvent indiquer une tentative d’utiliser les identifiants de l’employé. Les refuser évite une approbation accidentelle et le signalement permet une enquête.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Approve one prompt to stop the notifications',
          fr: 'Approuver une invite pour arrêter les notifications',
        },
        correct: false,
        explanation: {
          en: 'Approving an authentication request may grant access to whoever initiated it. The inconvenience of prompts is not evidence that the request is legitimate.',
          fr: 'Approuver une demande d’authentification peut accorder l’accès à la personne qui l’a initiée. La gêne causée par les invites ne prouve pas leur légitimité.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Ignore the prompts until the next training cycle',
          fr: 'Ignorer les invites jusqu’au prochain cycle de formation',
        },
        correct: false,
        explanation: {
          en: 'This is an active anomalous event, not a future training topic. Ignoring it leaves a possible credential attack unreported and gives the attacker more opportunities.',
          fr: 'C’est un événement anormal actif, pas un sujet pour une formation future. L’ignorer laisse une possible attaque d’identifiants sans signalement et offre plus de tentatives.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Forward the prompts to a personal email account',
          fr: 'Transférer les invites vers une adresse personnelle',
        },
        correct: false,
        explanation: {
          en: 'Personal email is not an approved incident channel and may expose business information. The organisation’s reporting route preserves context and reaches the right responders.',
          fr: 'Une adresse personnelle n’est pas un canal d’incident approuvé et peut exposer des informations de l’entreprise. La voie interne conserve le contexte et atteint les bons intervenants.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-003',
    objective: '5.6',
    kind: 'discrimination',
    difficulty: 'easy',
    prompt: {
      en: 'Which activity is an example of just-in-time user guidance rather than broad annual training?',
      fr: 'Quelle activité est un exemple de consigne utilisateur juste à temps plutôt que de formation annuelle générale ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A report-phishing button with a short instruction beside it',
          fr: 'Un bouton de signalement du hameçonnage accompagné d’une brève instruction',
        },
        correct: true,
        explanation: {
          en: 'The guidance appears exactly where the user needs to make a decision, reducing uncertainty at the moment a suspicious message is encountered.',
          fr: 'La consigne apparaît exactement là où l’utilisateur doit décider, ce qui réduit l’incertitude lorsqu’un message suspect est rencontré.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A yearly course covering the security policy',
          fr: 'Un cours annuel couvrant la politique de sécurité',
        },
        correct: false,
        explanation: {
          en: 'An annual course may establish shared knowledge, but it is not available as a targeted instruction at the moment the user is handling a suspicious message.',
          fr: 'Un cours annuel peut établir des connaissances communes, mais il n’est pas une instruction ciblée disponible au moment où la personne traite un message suspect.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A quarterly review of SIEM correlation rules',
          fr: 'Une revue trimestrielle des règles de corrélation SIEM',
        },
        correct: false,
        explanation: {
          en: 'SIEM tuning is a monitoring activity performed by security staff. It does not guide a general user through an immediate reporting or verification decision.',
          fr: 'Le réglage du SIEM est une activité de surveillance menée par la sécurité. Il ne guide pas un utilisateur général dans une décision immédiate de vérification ou de signalement.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A post-incident forensic examination',
          fr: 'Un examen forensique après incident',
        },
        correct: false,
        explanation: {
          en: 'Forensics investigates an incident after or during response. It neither teaches a user in advance nor offers a usable instruction at the risky moment.',
          fr: 'La forensic enquête pendant ou après un incident. Elle n’enseigne pas l’utilisateur à l’avance et ne fournit pas d’instruction utilisable au moment risqué.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-004',
    objective: '5.6',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A finance employee receives an email from a known supplier requesting new bank details. What awareness practice most directly reduces the risk?',
      fr: 'Un employé des finances reçoit un courriel d’un fournisseur connu demandant de nouvelles coordonnées bancaires. Quelle pratique réduit le plus directement le risque ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Verify the change through a previously known contact method',
          fr: 'Vérifier le changement par un moyen de contact déjà connu',
        },
        correct: true,
        explanation: {
          en: 'A supplier mailbox can be compromised, so replying to the same message is not independent verification. A known phone number or established contact path tests the request safely.',
          fr: 'La boîte d’un fournisseur peut être compromise, donc répondre au même message ne constitue pas une vérification indépendante. Un numéro connu ou un contact établi permet de valider sûrement.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Trust the request because the sender is in the address book',
          fr: 'Faire confiance car l’expéditeur figure dans le carnet d’adresses',
        },
        correct: false,
        explanation: {
          en: 'A familiar address can belong to a compromised account or be imitated. The sensitive change, rather than the apparent familiarity of the sender, determines the need to verify.',
          fr: 'Une adresse familière peut appartenir à un compte compromis ou être imitée. C’est le changement sensible, et non la familiarité apparente de l’expéditeur, qui impose une vérification.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Open the attachment to check the invoice number',
          fr: 'Ouvrir la pièce jointe pour vérifier le numéro de facture',
        },
        correct: false,
        explanation: {
          en: 'Opening supplied content does not independently validate bank details and can add a file-based risk. The relevant control is validating through a separate trusted channel.',
          fr: 'Ouvrir le contenu fourni ne valide pas indépendamment les coordonnées bancaires et peut ajouter un risque de fichier. Le contrôle pertinent est la validation par un canal fiable distinct.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Delete the supplier’s account from the payment system',
          fr: 'Supprimer le compte du fournisseur du système de paiement',
        },
        correct: false,
        explanation: {
          en: 'Deleting the account is an excessive operational response to an unverified request and may disrupt legitimate payments. Verification identifies whether a response or escalation is needed.',
          fr: 'Supprimer le compte est une réponse opérationnelle excessive à une demande non vérifiée et peut perturber des paiements légitimes. La vérification détermine si une réponse est nécessaire.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-005',
    objective: '5.6',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'What distinguishes reporting from monitoring in a security-awareness practice?',
      fr: 'Quelle distinction sépare le signalement de la surveillance dans une pratique de sensibilisation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Reporting raises a user-observed concern; monitoring detects and evaluates patterns',
          fr: 'Le signalement remonte un doute observé ; la surveillance détecte et évalue des tendances',
        },
        correct: true,
        explanation: {
          en: 'A report supplies a human observation through an approved route. Monitoring aggregates events and reports to identify patterns, verify controls, and guide investigation.',
          fr: 'Un signalement fournit une observation humaine par une voie approuvée. La surveillance agrège événements et rapports afin d’identifier des tendances et guider l’enquête.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Reporting is only for confirmed incidents; monitoring handles uncertainty',
          fr: 'Le signalement est réservé aux incidents confirmés ; la surveillance gère l’incertitude',
        },
        correct: false,
        explanation: {
          en: 'Users should report suspicious activity without proving an incident. Requiring confirmation delays escalation precisely when early reporting can limit the impact.',
          fr: 'Les utilisateurs doivent signaler une activité suspecte sans prouver un incident. Exiger une confirmation retarde l’escalade alors qu’un signalement précoce peut limiter l’impact.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Reporting blocks malicious traffic; monitoring trains employees',
          fr: 'Le signalement bloque le trafic malveillant ; la surveillance forme les employés',
        },
        correct: false,
        explanation: {
          en: 'Traffic blocking is a technical enforcement control, while employee training is an awareness activity. Reporting and monitoring supply information; neither definition matches these functions.',
          fr: 'Le blocage de trafic est un contrôle technique, tandis que la formation est une activité de sensibilisation. Signalement et surveillance fournissent des informations, pas ces fonctions.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Reporting is performed by SIEM tools; monitoring by end users',
          fr: 'Le signalement est réalisé par les SIEM ; la surveillance par les utilisateurs',
        },
        correct: false,
        explanation: {
          en: 'This reverses the common roles. Users and staff submit reports, while monitoring tools and security teams observe, correlate, and investigate relevant activity.',
          fr: 'Cela inverse les rôles habituels. Les utilisateurs et équipes soumettent des rapports, tandis que les outils et la sécurité observent, corrèlent et enquêtent sur les activités pertinentes.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-006',
    objective: '5.6',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A company’s phishing simulation produces many failures among payroll staff, who routinely receive documents from outside parties. What is the best next step?',
      fr: 'Une simulation de hameçonnage produit de nombreux échecs chez la paie, qui reçoit habituellement des documents externes. Quelle est la meilleure étape suivante ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Provide role-based examples and a clear verification workflow',
          fr: 'Fournir des exemples par rôle et un flux clair de vérification',
        },
        correct: true,
        explanation: {
          en: 'Payroll faces a distinct pattern of legitimate-looking requests. Targeted examples and a usable workflow improve the actual decision they must make rather than merely repeating generic warnings.',
          fr: 'La paie rencontre un schéma particulier de demandes apparemment légitimes. Des exemples ciblés et un flux utilisable améliorent la décision réelle au lieu de répéter des avertissements généraux.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Publish the names of employees who failed the simulation',
          fr: 'Publier les noms des employés ayant échoué à la simulation',
        },
        correct: false,
        explanation: {
          en: 'Public shaming discourages reporting and does not address the confusing workflow. The simulation should identify learning and process improvements, not create a punishment leaderboard.',
          fr: 'L’humiliation publique décourage le signalement et ne corrige pas le flux confus. La simulation doit révéler des améliorations de formation et de processus, non créer un classement punitif.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Remove all external email access for payroll',
          fr: 'Retirer tout accès au courriel externe pour la paie',
        },
        correct: false,
        explanation: {
          en: 'Payroll may require external documents to conduct business. Removing all access is a broad operational restriction, while the evidence points to a need for tailored awareness and verification.',
          fr: 'La paie peut avoir besoin de documents externes pour travailler. Supprimer tout accès est une restriction large, tandis que l’observation montre un besoin de sensibilisation et vérification adaptées.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Stop collecting simulation results',
          fr: 'Cesser de recueillir les résultats de simulation',
        },
        correct: false,
        explanation: {
          en: 'The results reveal where guidance and training need improvement. Eliminating the measurement removes useful feedback without reducing the underlying risk to payroll workflows.',
          fr: 'Les résultats révèlent où les consignes et la formation doivent être améliorées. Supprimer la mesure retire un retour utile sans réduire le risque du flux de paie.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-007',
    objective: '5.6',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which detail makes a user report more useful to an investigating team?',
      fr: 'Quel détail rend un signalement utilisateur plus utile à une équipe d’enquête ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'What was observed, when it happened, and what action was taken',
          fr: 'Ce qui a été observé, le moment et les actions déjà réalisées',
        },
        correct: true,
        explanation: {
          en: 'These details give the team context for triage and correlation without requiring the reporter to perform technical investigation. They also establish the immediate scope of the concern.',
          fr: 'Ces détails donnent le contexte nécessaire au triage et à la corrélation sans demander une enquête technique au déclarant. Ils établissent aussi la portée immédiate du problème.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A guarantee that the activity is malicious',
          fr: 'Une garantie que l’activité est malveillante',
        },
        correct: false,
        explanation: {
          en: 'Users cannot normally establish malicious intent, and waiting for certainty delays useful reporting. A reasonable suspicion with accurate observations is sufficient for triage.',
          fr: 'Les utilisateurs ne peuvent généralement pas établir une intention malveillante, et attendre la certitude retarde un signalement utile. Un doute raisonnable avec des observations exactes suffit.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The user’s personal assessment of the attacker’s identity',
          fr: 'L’évaluation personnelle de l’identité de l’attaquant',
        },
        correct: false,
        explanation: {
          en: 'Attribution requires evidence and specialised analysis. A user’s useful role is preserving and reporting observable facts, not naming an attacker from a suspicious message.',
          fr: 'L’attribution exige des preuves et une analyse spécialisée. Le rôle utile de l’utilisateur est de préserver et signaler des faits observables, non de nommer un attaquant.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A copy sent through an unapproved personal channel',
          fr: 'Une copie envoyée par un canal personnel non approuvé',
        },
        correct: false,
        explanation: {
          en: 'An unapproved channel can lose context, leak business data, and delay triage. The designated route is designed to get the report to responders safely and consistently.',
          fr: 'Un canal non approuvé peut perdre le contexte, divulguer des données et retarder le triage. La voie désignée a été conçue pour atteindre les intervenants de façon sûre et cohérente.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-008',
    objective: '5.6',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Why can an increase in phishing reports be a positive awareness metric?',
      fr: 'Pourquoi une hausse des signalements de hameçonnage peut-elle être une mesure positive de sensibilisation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It can show that users recognise suspicious messages and know the reporting route',
          fr: 'Elle peut montrer que les utilisateurs reconnaissent les messages suspects et connaissent la voie de signalement',
        },
        correct: true,
        explanation: {
          en: 'More reports require interpretation, but they may indicate greater recognition and confidence in the process. The number alone must be combined with other measures before drawing conclusions.',
          fr: 'Plus de rapports exige une interprétation, mais peut indiquer une meilleure reconnaissance et confiance dans le processus. Le nombre doit être combiné à d’autres mesures avant toute conclusion.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It proves the email filter has stopped working',
          fr: 'Elle prouve que le filtre de courriel ne fonctionne plus',
        },
        correct: false,
        explanation: {
          en: 'A report increase has several possible causes, including campaigns, improved awareness, or a genuine attack. It does not by itself diagnose a failure in a separate technical control.',
          fr: 'Une hausse peut avoir plusieurs causes, dont une campagne, une meilleure sensibilisation ou une vraie attaque. Elle ne diagnostique pas seule la panne d’un contrôle technique distinct.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It means every reported message is a confirmed compromise',
          fr: 'Elle signifie que chaque message signalé est une compromission confirmée',
        },
        correct: false,
        explanation: {
          en: 'Reports are leads for triage, not confirmed incidents. A healthy reporting culture permits users to raise a concern before technical evidence establishes what occurred.',
          fr: 'Les rapports sont des éléments à trier, non des incidents confirmés. Une culture saine permet de signaler une préoccupation avant que des preuves techniques établissent les faits.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It removes the need to review the reporting process',
          fr: 'Elle supprime le besoin de revoir le processus de signalement',
        },
        correct: false,
        explanation: {
          en: 'Metrics are feedback for continual improvement. A higher volume may expose slow triage, confusing categories, or a reporting channel that needs additional capacity.',
          fr: 'Les mesures servent à l’amélioration continue. Un volume plus élevé peut révéler un triage lent, des catégories confuses ou un canal qui exige plus de capacité.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-009',
    objective: '5.6',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A user sees an unfamiliar device listed on their account page. Which awareness guidance is most appropriate?',
      fr: 'Un utilisateur voit un appareil inconnu sur la page de son compte. Quelle consigne de sensibilisation est la plus appropriée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Use the approved account-security process and report the anomaly',
          fr: 'Utiliser le processus approuvé de sécurité du compte et signaler l’anomalie',
        },
        correct: true,
        explanation: {
          en: 'An unfamiliar device differs from expected account activity and deserves prompt escalation. The approved process can secure the account while preserving information for investigation.',
          fr: 'Un appareil inconnu diffère de l’activité attendue et mérite une escalade rapide. Le processus approuvé peut sécuriser le compte tout en préservant des informations pour l’enquête.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Remove the device and say nothing if access returns',
          fr: 'Supprimer l’appareil sans rien dire si l’accès revient',
        },
        correct: false,
        explanation: {
          en: 'Removing an entry may be part of an authorised recovery process, but failing to report loses an opportunity to investigate possible unauthorised access or related activity.',
          fr: 'Supprimer une entrée peut appartenir à un processus de récupération autorisé, mais ne rien signaler fait perdre l’enquête sur un possible accès non autorisé ou une activité liée.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Ask a colleague to test the account with their credentials',
          fr: 'Demander à un collègue de tester le compte avec ses identifiants',
        },
        correct: false,
        explanation: {
          en: 'Sharing or using another person’s credentials damages accountability and may spread risk. It is not a safe method for confirming an anomalous device entry.',
          fr: 'Partager ou utiliser les identifiants d’une autre personne nuit à la traçabilité et peut propager le risque. Ce n’est pas une méthode sûre pour confirmer un appareil anormal.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Wait for the annual access review to remove it',
          fr: 'Attendre la revue annuelle des accès pour le supprimer',
        },
        correct: false,
        explanation: {
          en: 'Annual reviews validate continuing access over time; they are not an incident response path. An unexpected device can require action well before a scheduled review.',
          fr: 'Les revues annuelles valident les accès dans le temps, ce ne sont pas une voie de réponse aux incidents. Un appareil inattendu peut exiger une action bien avant une revue planifiée.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-010',
    objective: '5.6',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which programme-design choice best demonstrates development of a security-awareness practice?',
      fr: 'Quel choix de conception démontre le mieux le développement d’une pratique de sensibilisation à la sécurité ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Define target behaviour, audience, delivery method, reporting route, and success measures',
          fr: 'Définir le comportement visé, le public, la diffusion, la voie de signalement et les mesures de succès',
        },
        correct: true,
        explanation: {
          en: 'Development establishes what the practice will change, how it reaches people, and how improvement will be evaluated. These decisions create a deliberate programme rather than an isolated presentation.',
          fr: 'Le développement établit ce que la pratique doit changer, comment elle atteint les personnes et comment son amélioration sera évaluée. Ces décisions créent un programme délibéré, non une présentation isolée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Send a course once and retain only completion records',
          fr: 'Envoyer un cours une fois et ne conserver que les réalisations',
        },
        correct: false,
        explanation: {
          en: 'Completion records show administration, not a designed feedback loop or usable reporting process. A programme also needs relevant content, delivery decisions, and measures beyond attendance.',
          fr: 'Les réalisations prouvent l’administration, pas une boucle de retour ni un processus de signalement utilisable. Un programme a aussi besoin de contenu pertinent, de diffusion et de mesures au-delà de l’assiduité.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Wait for an incident before choosing the audience',
          fr: 'Attendre un incident avant de choisir le public',
        },
        correct: false,
        explanation: {
          en: 'A programme can use risk and role information proactively to select audiences. Waiting for harm leaves known behaviours and high-risk workflows unsupported until after an incident.',
          fr: 'Un programme peut utiliser le risque et les rôles de façon proactive pour sélectionner les publics. Attendre un dommage laisse des comportements et flux à haut risque sans soutien.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Delegate all awareness decisions to the email-filter vendor',
          fr: 'Déléguer toutes les décisions de sensibilisation au fournisseur de filtrage',
        },
        correct: false,
        explanation: {
          en: 'A vendor may supply technical filtering or material, but the organisation must align awareness content and reporting with its own people, risks, policies, and workflows.',
          fr: 'Un fournisseur peut offrir du filtrage ou du contenu, mais l’organisation doit aligner la sensibilisation et le signalement sur ses propres personnes, risques, politiques et flux.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-011',
    objective: '5.6',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What does execution of an awareness practice include after content has been developed?',
      fr: 'Que comprend l’exécution d’une pratique de sensibilisation après le développement du contenu ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Delivering the practice, enabling participation, and using feedback to improve it',
          fr: 'Diffuser la pratique, permettre la participation et utiliser les retours pour l’améliorer',
        },
        correct: true,
        explanation: {
          en: 'Execution turns a plan into an operating activity: people receive it, can ask questions, and the organisation uses observations and measures to refine later cycles.',
          fr: 'L’exécution transforme un plan en activité opérationnelle : les personnes le reçoivent, peuvent poser des questions et l’organisation utilise les observations pour améliorer les cycles suivants.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Writing the official exam objectives',
          fr: 'Rédiger les objectifs officiels de l’examen',
        },
        correct: false,
        explanation: {
          en: 'Exam objectives define an external certification outline, not an organisation’s awareness delivery. Executing awareness concerns internal behaviours, learning, reporting, and feedback.',
          fr: 'Les objectifs d’examen définissent un plan de certification externe, pas la diffusion d’une sensibilisation interne. Son exécution concerne comportements, apprentissage, signalement et retours.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Performing malware reverse engineering on reports',
          fr: 'Effectuer de la rétro-ingénierie de logiciel malveillant sur les rapports',
        },
        correct: false,
        explanation: {
          en: 'Reverse engineering is specialised incident analysis. Awareness execution may route reports to responders, but it does not make that technical investigation a general training activity.',
          fr: 'La rétro-ingénierie est une analyse spécialisée d’incident. L’exécution peut acheminer des rapports, mais elle ne transforme pas cette enquête technique en activité générale de formation.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Replacing risk management with training attendance',
          fr: 'Remplacer la gestion des risques par la participation à la formation',
        },
        correct: false,
        explanation: {
          en: 'Training is one control within a broader security programme. Attendance does not identify, analyse, accept, transfer, or mitigate organisational risk by itself.',
          fr: 'La formation est un contrôle dans un programme de sécurité plus large. La participation ne permet pas à elle seule d’identifier, analyser, accepter, transférer ou réduire le risque.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-012',
    objective: '5.6',
    kind: 'scenario',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'Which two features make a phishing-reporting process more likely to support fast investigation? (Select two.)',
      fr: 'Quelles deux caractéristiques rendent un processus de signalement du hameçonnage plus propice à une enquête rapide ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A clearly published route that reaches a monitored security queue',
          fr: 'Une voie clairement publiée qui atteint une file de sécurité surveillée',
        },
        correct: true,
        explanation: {
          en: 'People report faster when the route is obvious, and the report is useful only if someone monitors the destination. This connects user action to timely triage.',
          fr: 'Les personnes signalent plus vite lorsque la voie est évidente, et le rapport n’est utile que si quelqu’un surveille sa destination. Cela relie l’action au triage rapide.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A mechanism that preserves the suspicious message and relevant context',
          fr: 'Un mécanisme qui préserve le message suspect et son contexte pertinent',
        },
        correct: true,
        explanation: {
          en: 'Preserved context such as the original message lets investigators identify related delivery and indicators without relying on a user’s incomplete recollection or unsafe interaction.',
          fr: 'Le contexte préservé, comme le message initial, permet d’identifier des livraisons liées et des indicateurs sans dépendre d’un souvenir incomplet ou d’une interaction risquée.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A requirement that users prove malicious intent before reporting',
          fr: 'Une exigence que les utilisateurs prouvent l’intention malveillante avant de signaler',
        },
        correct: false,
        explanation: {
          en: 'Proof is an investigation outcome, not a prerequisite for reporting. This requirement would delay the very early warning that the reporting process is intended to provide.',
          fr: 'La preuve est le résultat d’une enquête, pas une condition préalable au signalement. Cette exigence retarderait l’alerte précoce que le processus cherche à fournir.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A rule to forward reports to personal email for backup',
          fr: 'Une règle de transfert des rapports vers une adresse personnelle en secours',
        },
        correct: false,
        explanation: {
          en: 'Personal channels can leak data and split the evidence trail. An approved monitored route is safer and avoids creating parallel, untracked copies of suspicious content.',
          fr: 'Les canaux personnels peuvent divulguer des données et fragmenter la piste de preuve. Une voie approuvée et surveillée est plus sûre et évite des copies parallèles non suivies.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-013',
    objective: '5.6',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A user receives a phone call from someone claiming to be IT and asking for a one-time code. What should awareness training emphasise?',
      fr: 'Un utilisateur reçoit un appel d’une personne se disant du service informatique et demandant un code à usage unique. Que doit souligner la sensibilisation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Do not share the code; verify the request through an independent IT channel',
          fr: 'Ne pas partager le code ; vérifier la demande via un canal informatique indépendant',
        },
        correct: true,
        explanation: {
          en: 'A one-time code can complete an attacker’s authentication attempt. A caller’s claim is not verification, so the user should use a known help-desk route instead.',
          fr: 'Un code à usage unique peut achever une tentative d’authentification d’un attaquant. La déclaration de l’appelant ne suffit pas, donc l’utilisateur doit employer une voie connue du support.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Share the code if the caller knows the user’s department',
          fr: 'Partager le code si l’appelant connaît le service de l’utilisateur',
        },
        correct: false,
        explanation: {
          en: 'Department information is often public or easily gathered and does not establish identity. The code remains a security factor and must not be supplied to an unverified caller.',
          fr: 'Le nom du service est souvent public ou facile à obtenir et n’établit pas une identité. Le code reste un facteur de sécurité et ne doit pas être donné à un appelant non vérifié.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Install remote-support software requested by the caller',
          fr: 'Installer le logiciel de support distant demandé par l’appelant',
        },
        correct: false,
        explanation: {
          en: 'Installing software at an unverified caller’s request may grant remote access or introduce malware. Legitimate support follows approved tools and verifiable processes.',
          fr: 'Installer un logiciel à la demande d’un appelant non vérifié peut accorder un accès distant ou introduire un logiciel malveillant. Le support légitime suit des outils et processus approuvés.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Call back using the phone number provided by the caller',
          fr: 'Rappeler en utilisant le numéro fourni par l’appelant',
        },
        correct: false,
        explanation: {
          en: 'The supplied number can lead back to the attacker. Independent verification requires a number or support route obtained from a trusted, previously known source.',
          fr: 'Le numéro fourni peut ramener à l’attaquant. Une vérification indépendante exige un numéro ou une voie de support issu d’une source fiable déjà connue.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-014',
    objective: '5.6',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'After a new collaboration tool is deployed, reports show users approving unexpected shared-document requests. What should the awareness programme do?',
      fr: 'Après le déploiement d’un nouvel outil collaboratif, les rapports montrent des approbations inattendues de documents partagés. Que doit faire le programme de sensibilisation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Issue targeted guidance using examples from the new workflow and reinforce reporting',
          fr: 'Diffuser des consignes ciblées avec des exemples du nouveau flux et renforcer le signalement',
        },
        correct: true,
        explanation: {
          en: 'Awareness material must follow current business tools and observed behaviours. Specific examples help users recognise the new request pattern and use the established reporting process.',
          fr: 'Le contenu doit suivre les outils actuels et les comportements observés. Des exemples précis aident à reconnaître le nouveau schéma et à utiliser le processus de signalement établi.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Continue the old campaign because annual content should not change',
          fr: 'Continuer l’ancienne campagne car le contenu annuel ne doit pas changer',
        },
        correct: false,
        explanation: {
          en: 'Static material can become irrelevant after a workflow change. The observed reports are feedback that the programme should update its examples and emphasis.',
          fr: 'Un contenu fixe peut devenir non pertinent après un changement de flux. Les rapports observés constituent un retour indiquant que le programme doit actualiser ses exemples et son accent.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Tell users to approve every request from internal colleagues',
          fr: 'Dire aux utilisateurs d’approuver chaque demande provenant de collègues internes',
        },
        correct: false,
        explanation: {
          en: 'Internal accounts can be compromised and an unexpected request still needs verification. Blanket approval reduces the protection awareness is meant to provide.',
          fr: 'Des comptes internes peuvent être compromis et une demande inattendue exige toujours une vérification. L’approbation générale réduit la protection recherchée par la sensibilisation.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Stop monitoring reports to avoid alarming users',
          fr: 'Cesser de surveiller les rapports pour ne pas alarmer les utilisateurs',
        },
        correct: false,
        explanation: {
          en: 'Monitoring reveals whether new guidance is needed and whether the problem persists. Suppressing it hides useful feedback and does nothing to help users make safer choices.',
          fr: 'La surveillance révèle si de nouvelles consignes sont nécessaires et si le problème persiste. La supprimer masque un retour utile sans aider les utilisateurs à choisir plus sûrement.',
        },
      },
    ],
  },
  {
    id: 'q-5-6-015',
    objective: '5.6',
    kind: 'discrimination',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'Which two statements correctly describe a mature security-awareness practice? (Select two.)',
      fr: 'Quelles deux affirmations décrivent correctement une pratique mature de sensibilisation à la sécurité ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It uses reporting and monitoring feedback to refine guidance and training',
          fr: 'Elle utilise les retours de signalement et de surveillance pour affiner consignes et formation',
        },
        correct: true,
        explanation: {
          en: 'A mature practice is iterative: reports, exercises, and monitored trends reveal where people or processes need clearer, more relevant support in the next cycle.',
          fr: 'Une pratique mature est itérative : rapports, exercices et tendances surveillées révèlent où personnes ou processus ont besoin d’un soutien plus clair au cycle suivant.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It tailors content when different roles face different risky decisions',
          fr: 'Elle adapte le contenu lorsque différents rôles font face à des décisions risquées différentes',
        },
        correct: true,
        explanation: {
          en: 'Role-specific risk changes the useful example and response. Tailoring lets finance, developers, and reception staff practise decisions that actually arise in their own work.',
          fr: 'Le risque par rôle change l’exemple et la réponse utiles. L’adaptation permet aux finances, développeurs et accueil de pratiquer des décisions qui surviennent réellement dans leur travail.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It treats course completion as proof that users will never be deceived',
          fr: 'Elle traite la fin de cours comme preuve que les utilisateurs ne seront jamais trompés',
        },
        correct: false,
        explanation: {
          en: 'Completion shows that content was assigned or viewed, not that a future social-engineering attempt will fail. Monitoring and practice remain necessary after training.',
          fr: 'La fin de cours montre que le contenu a été attribué ou consulté, non qu’une future tentative d’ingénierie sociale échouera. Surveillance et exercices restent nécessaires.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It requires users to investigate suspicious content before reporting it',
          fr: 'Elle exige des utilisateurs qu’ils enquêtent sur le contenu suspect avant de le signaler',
        },
        correct: false,
        explanation: {
          en: 'Investigation can expose a user to the content and delays escalation. The awareness response is to recognise the concern, preserve useful context, and use the approved route.',
          fr: 'Enquêter peut exposer l’utilisateur au contenu et retarde l’escalade. La réponse attendue consiste à reconnaître le doute, préserver le contexte utile et employer la voie approuvée.',
        },
      },
    ],
  },
];
