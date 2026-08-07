import type { Question } from '@/content/schemas';

/**
 * Objective 4.6 — Given a scenario, implement and maintain identity and access management.
 *
 * Every question is original work written from the published objective; none reproduces or
 * reconstructs an examination item. The set tests lifecycle decisions and nearby IAM distinctions.
 */
export const QUESTIONS_4_6: Question[] = [
  {
    id: 'q-4-6-001',
    objective: '4.6',
    kind: 'scenario',
    difficulty: 'easy',
    prompt: {
      en: 'A contractor’s engagement ends today. Which action best reduces the risk of continued access?',
      fr: 'La mission d’un prestataire prend fin aujourd’hui. Quelle action réduit le mieux le risque de maintien d’accès ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Disable the contractor’s accounts and revoke active credentials',
          fr: 'Désactiver les comptes du prestataire et révoquer ses identifiants actifs',
        },
        correct: true,
        explanation: {
          en: 'De-provisioning ends access when the business relationship ends, including access that may be granted through more than one account or token.',
          fr: 'Le déprovisionnement met fin aux accès lorsque la relation professionnelle se termine, y compris les accès accordés par plusieurs comptes ou jetons.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Require the contractor to change passwords',
          fr: 'Exiger que le prestataire change ses mots de passe',
        },
        correct: false,
        explanation: {
          en: 'A password change leaves the accounts usable by the same contractor. The requirement is to end access, not to refresh a credential.',
          fr: 'Un changement de mot de passe laisse les comptes utilisables par le même prestataire. Il faut mettre fin à l’accès, pas renouveler un identifiant.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Move the accounts into a new contractor group',
          fr: 'Déplacer les comptes vers un nouveau groupe de prestataires',
        },
        correct: false,
        explanation: {
          en: 'A different group can alter permissions but does not remove the former contractor’s identity or guarantee that every entitlement has ended.',
          fr: 'Un groupe différent peut modifier des permissions, mais il ne retire pas l’identité de l’ancien prestataire ni ne garantit la fin de tous les droits.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Ask the manager to attest the current permissions next quarter',
          fr: 'Demander au manager d’attester les permissions au prochain trimestre',
        },
        correct: false,
        explanation: {
          en: 'Periodic attestation is useful for review, but it is too late for a known end date that requires immediate de-provisioning.',
          fr: 'Une attestation périodique est utile pour la revue, mais elle est trop tardive lorsqu’une date de fin connue exige un déprovisionnement immédiat.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-002',
    objective: '4.6',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which access model is most appropriate when a policy must consider department, managed-device state, and time of day?',
      fr: 'Quel modèle est le plus approprié lorsqu’une règle doit considérer le département, l’état géré de l’appareil et l’heure ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Attribute-based access control (ABAC)',
          fr: 'Le contrôle d’accès basé sur les attributs (ABAC)',
        },
        correct: true,
        explanation: {
          en: 'ABAC evaluates attributes about the subject, object, action, and environment, so context such as device state and time can affect the decision.',
          fr: 'ABAC évalue des attributs relatifs au sujet, à l’objet, à l’action et à l’environnement ; l’état de l’appareil et l’heure peuvent donc influencer la décision.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Role-based access control (RBAC)',
          fr: 'Le contrôle d’accès basé sur les rôles (RBAC)',
        },
        correct: false,
        explanation: {
          en: 'RBAC maps permissions mainly to job roles. It is useful for a stable duty set but does not inherently evaluate current device state or time.',
          fr: 'RBAC associe surtout les permissions aux rôles de travail. Il convient à des fonctions stables, mais n’évalue pas intrinsèquement l’état actuel de l’appareil ou l’heure.',
        },
      },
      {
        id: 'c',
        text: { en: 'Mandatory access control (MAC)', fr: 'Le contrôle d’accès obligatoire (MAC)' },
        correct: false,
        explanation: {
          en: 'MAC relies on centrally administered labels and clearances. Those classifications are not the flexible environmental attributes described in the scenario.',
          fr: 'MAC repose sur des étiquettes et habilitations administrées centralement. Ces classifications ne sont pas les attributs environnementaux souples décrits dans le scénario.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Discretionary access control (DAC)',
          fr: 'Le contrôle d’accès discrétionnaire (DAC)',
        },
        correct: false,
        explanation: {
          en: 'DAC lets a resource owner grant access to named users. It does not provide a policy engine that continuously evaluates the stated conditions.',
          fr: 'DAC permet au propriétaire d’une ressource d’accorder des accès nommés. Il ne fournit pas un moteur de règles évaluant continuellement les conditions indiquées.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-003',
    objective: '4.6',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the primary purpose of identity proofing?',
      fr: 'Quelle est la finalité principale de la vérification de l’identité ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Establish that an enrolled identity belongs to the claimed person',
          fr: 'Établir qu’une identité enrôlée appartient à la personne qui la revendique',
        },
        correct: true,
        explanation: {
          en: 'Identity proofing establishes confidence in the person during enrolment, before that identity is trusted for account creation or credential issuance.',
          fr: 'La vérification de l’identité établit la confiance dans la personne lors de l’enrôlement, avant que cette identité serve à créer un compte ou délivrer un identifiant.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Check that a login claimant controls a credential',
          fr: 'Vérifier qu’un demandeur de connexion contrôle un identifiant',
        },
        correct: false,
        explanation: {
          en: 'That is authentication. Authentication validates a current claim using a credential, whereas proofing establishes who was enrolled in the first place.',
          fr: 'Cela correspond à l’authentification. Elle valide une demande actuelle avec un identifiant, alors que la vérification établit qui a été enrôlé au départ.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Decide which files an authenticated user may open',
          fr: 'Décider quels fichiers un utilisateur authentifié peut ouvrir',
        },
        correct: false,
        explanation: {
          en: 'Deciding allowed actions is authorization. Proofing occurs before an account is trusted and does not assign resource permissions.',
          fr: 'Décider des actions autorisées relève de l’autorisation. La vérification intervient avant la confiance dans le compte et n’attribue pas de permissions.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Record every action taken after sign-in',
          fr: 'Enregistrer chaque action effectuée après la connexion',
        },
        correct: false,
        explanation: {
          en: 'Logging and accounting provide an activity trail after use. Proofing concerns confidence in identity before normal access begins.',
          fr: 'La journalisation et la traçabilité fournissent une piste après l’usage. La vérification concerne la confiance dans l’identité avant les accès ordinaires.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-004',
    objective: '4.6',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A company accepts signed identity assertions from a partner’s identity provider for the partner’s employees. What is this arrangement?',
      fr: 'Une entreprise accepte des assertions d’identité signées par le fournisseur d’identité d’un partenaire pour les salariés de ce partenaire. Quel est cet arrangement ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Federation', fr: 'La fédération' },
        correct: true,
        explanation: {
          en: 'Federation is a trust relationship in which one domain relies on identity assertions issued by a trusted provider in another domain.',
          fr: 'La fédération est une relation de confiance dans laquelle un domaine s’appuie sur des assertions d’identité émises par un fournisseur approuvé d’un autre domaine.',
        },
      },
      {
        id: 'b',
        text: { en: 'Single sign-on', fr: 'Le single sign-on' },
        correct: false,
        explanation: {
          en: 'SSO describes a user authenticating once for multiple applications. It may result from federation, but the stated arrangement is the inter-domain trust.',
          fr: 'Le SSO décrit une authentification unique pour plusieurs applications. Il peut résulter d’une fédération, mais l’arrangement décrit est la confiance entre domaines.',
        },
      },
      {
        id: 'c',
        text: { en: 'Identity proofing', fr: 'La vérification de l’identité' },
        correct: false,
        explanation: {
          en: 'Proofing validates a person during enrolment. Accepting a partner’s signed assertion is relying on an existing identity provider, not enrolment proofing.',
          fr: 'La vérification valide une personne lors de l’enrôlement. Accepter une assertion signée du partenaire revient à faire confiance à un fournisseur existant, pas à enrôler la personne.',
        },
      },
      {
        id: 'd',
        text: { en: 'Password rotation', fr: 'La rotation des mots de passe' },
        correct: false,
        explanation: {
          en: 'Password rotation changes local secrets over time. It neither creates a trust relationship nor allows the application to consume an external assertion.',
          fr: 'La rotation des mots de passe modifie des secrets locaux au fil du temps. Elle ne crée pas de relation de confiance et ne permet pas de consommer une assertion externe.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-005',
    objective: '4.6',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An identity provider sends a user’s department value, but an application cannot interpret the format and creates a duplicate local account. Which IAM concern is most directly exposed?',
      fr: 'Un fournisseur d’identité envoie la valeur de département d’un utilisateur, mais une application ne comprend pas le format et crée un compte local doublon. Quelle préoccupation IAM est directement révélée ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Interoperability', fr: 'L’interopérabilité' },
        correct: true,
        explanation: {
          en: 'Interoperability requires components to exchange and correctly consume identity data. A format mismatch that creates duplicate identities shows that this failed.',
          fr: 'L’interopérabilité exige que les composants échangent et exploitent correctement les données d’identité. Une incompatibilité de format créant des doublons montre cet échec.',
        },
      },
      {
        id: 'b',
        text: { en: 'Multifactor authentication', fr: 'L’authentification multifacteur' },
        correct: false,
        explanation: {
          en: 'MFA concerns independent evidence at authentication. The failure is in exchanging an attribute between systems, not in the number of login factors.',
          fr: 'Le MFA concerne des preuves indépendantes lors de l’authentification. La défaillance touche l’échange d’un attribut entre systèmes, pas le nombre de facteurs.',
        },
      },
      {
        id: 'c',
        text: { en: 'Attestation', fr: 'L’attestation' },
        correct: false,
        explanation: {
          en: 'Attestation is a review confirming whether access remains appropriate. It could discover a duplicate later, but it does not solve the incompatible data exchange.',
          fr: 'L’attestation est une revue confirmant que l’accès reste approprié. Elle pourrait découvrir un doublon plus tard, mais ne résout pas l’échange de données incompatible.',
        },
      },
      {
        id: 'd',
        text: { en: 'Privileged access management', fr: 'La gestion des accès privilégiés' },
        correct: false,
        explanation: {
          en: 'PAM controls elevated credentials and sessions. The account duplication described affects identity data integration rather than privileged administration.',
          fr: 'Le PAM contrôle les identifiants et sessions élevés. Le doublon décrit concerne l’intégration de données d’identité, non l’administration privilégiée.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-006',
    objective: '4.6',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'A resource owner periodically certifies that each user on an access list still needs access. What is this activity called?',
      fr: 'Un propriétaire de ressource certifie périodiquement que chaque utilisateur d’une liste a encore besoin de l’accès. Comment nomme-t-on cette activité ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Attestation', fr: 'L’attestation' },
        correct: true,
        explanation: {
          en: 'Attestation is formal confirmation that existing accounts or entitlements remain justified. It makes access review an accountable decision rather than a passive report.',
          fr: 'L’attestation est la confirmation formelle que des comptes ou droits existants restent justifiés. Elle transforme la revue en décision responsable plutôt qu’en rapport passif.',
        },
      },
      {
        id: 'b',
        text: { en: 'Provisioning', fr: 'Le provisionnement' },
        correct: false,
        explanation: {
          en: 'Provisioning creates an identity or initial entitlement. The users already have access, so the scenario is reviewing rather than creating it.',
          fr: 'Le provisionnement crée une identité ou un droit initial. Les utilisateurs ont déjà l’accès : le scénario révise donc les droits au lieu de les créer.',
        },
      },
      {
        id: 'c',
        text: { en: 'Federation', fr: 'La fédération' },
        correct: false,
        explanation: {
          en: 'Federation establishes reliance on a remote identity provider. It says nothing about a resource owner reviewing the continued need for local entitlements.',
          fr: 'La fédération établit la confiance envers un fournisseur d’identité distant. Elle ne décrit pas la revue du besoin continu de droits locaux par un propriétaire.',
        },
      },
      {
        id: 'd',
        text: { en: 'Single sign-on', fr: 'Le single sign-on' },
        correct: false,
        explanation: {
          en: 'SSO reduces repeated authentication prompts. It does not ask an owner to confirm that existing authorization remains necessary.',
          fr: 'Le SSO réduit les demandes d’authentification répétées. Il ne demande pas à un propriétaire de confirmer que l’autorisation existante reste nécessaire.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-007',
    objective: '4.6',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which statement correctly separates authentication from authorization?',
      fr: 'Quelle affirmation distingue correctement l’authentification de l’autorisation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Authentication verifies a claimant; authorization decides permitted actions',
          fr: 'L’authentification vérifie le demandeur ; l’autorisation décide des actions permises',
        },
        correct: true,
        explanation: {
          en: 'Authentication establishes confidence that a claimant controls a credential. Authorization then evaluates whether that identity may perform a requested action.',
          fr: 'L’authentification établit la confiance qu’un demandeur contrôle un identifiant. L’autorisation évalue ensuite si cette identité peut effectuer l’action demandée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Authentication assigns job roles; authorization proves enrolment identity',
          fr: 'L’authentification attribue les rôles ; l’autorisation prouve l’identité à l’enrôlement',
        },
        correct: false,
        explanation: {
          en: 'Job roles are an authorization construct, while enrolment proof is identity proofing. Neither function is the normal role of authentication here.',
          fr: 'Les rôles de travail relèvent de l’autorisation, tandis que la preuve à l’enrôlement relève de la vérification d’identité. Aucune de ces fonctions n’est le rôle habituel de l’authentification.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Authentication records activity; authorization rotates passwords',
          fr: 'L’authentification enregistre l’activité ; l’autorisation fait tourner les mots de passe',
        },
        correct: false,
        explanation: {
          en: 'Activity recording is accounting or logging, and password rotation is credential management. They are adjacent controls but not these two definitions.',
          fr: 'L’enregistrement d’activité relève de la traçabilité ou des journaux, et la rotation des mots de passe relève de la gestion des identifiants. Ce ne sont pas ces définitions.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Authentication shares resources; authorization provides one login prompt',
          fr: 'L’authentification partage les ressources ; l’autorisation fournit une invite unique',
        },
        correct: false,
        explanation: {
          en: 'Resource sharing is a permission decision and fewer prompts describe SSO. Reversing those ideas does not define either authentication or authorization.',
          fr: 'Le partage de ressources est une décision de permission et la réduction des invites décrit le SSO. Inverser ces idées ne définit ni l’authentification ni l’autorisation.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-008',
    objective: '4.6',
    kind: 'discrimination',
    difficulty: 'easy',
    prompt: {
      en: 'A VPN requires a password and approval in an authenticator app. Why does this satisfy MFA?',
      fr: 'Un VPN exige un mot de passe et une approbation dans une application d’authentification. Pourquoi cela satisfait-il le MFA ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It uses a knowledge factor and a possession factor',
          fr: 'Il utilise un facteur de connaissance et un facteur de possession',
        },
        correct: true,
        explanation: {
          en: 'The password is something known and the registered authenticator is something possessed. The two pieces of evidence come from different factor categories.',
          fr: 'Le mot de passe est quelque chose que l’on sait et l’authentificateur enregistré est quelque chose que l’on possède. Les preuves viennent de catégories différentes.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It repeats the same knowledge factor twice',
          fr: 'Il répète deux fois le même facteur de connaissance',
        },
        correct: false,
        explanation: {
          en: 'An authenticator-app approval is not another password. It relies on possession of the enrolled device or authenticator, which is a distinct factor category.',
          fr: 'Une approbation d’application n’est pas un autre mot de passe. Elle repose sur la possession de l’appareil ou authentificateur enrôlé, une catégorie distincte.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It grants the user administrator privileges',
          fr: 'Il accorde à l’utilisateur des privilèges administrateur',
        },
        correct: false,
        explanation: {
          en: 'MFA strengthens authentication only. It does not assign authorization, and privileged access should still be granted only when separately justified.',
          fr: 'Le MFA renforce seulement l’authentification. Il n’attribue pas d’autorisation, et l’accès privilégié doit rester justifié séparément.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It lets the VPN trust a partner identity provider',
          fr: 'Il permet au VPN de faire confiance au fournisseur d’identité d’un partenaire',
        },
        correct: false,
        explanation: {
          en: 'Trusting a partner’s provider is federation. The scenario instead identifies two factor categories used to verify one login claimant.',
          fr: 'Faire confiance au fournisseur d’un partenaire correspond à la fédération. Le scénario identifie plutôt deux catégories de facteurs pour vérifier un demandeur.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-009',
    objective: '4.6',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which password practice most directly limits the damage if one service’s password database is exposed?',
      fr: 'Quelle pratique relative aux mots de passe limite le plus directement les dégâts si la base de mots de passe d’un service est exposée ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Use a unique password for each service',
          fr: 'Utiliser un mot de passe unique pour chaque service',
        },
        correct: true,
        explanation: {
          en: 'Unique passwords prevent a compromised password from being replayed automatically at unrelated services where the user might otherwise reuse it.',
          fr: 'Des mots de passe uniques empêchent qu’un mot de passe compromis soit rejoué automatiquement auprès de services distincts où la personne l’aurait réutilisé.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Use the same complex password everywhere',
          fr: 'Utiliser partout le même mot de passe complexe',
        },
        correct: false,
        explanation: {
          en: 'Complexity does not stop credential reuse. One exposed shared password becomes a usable credential at every other service using that same secret.',
          fr: 'La complexité n’empêche pas la réutilisation. Un même secret exposé devient un identifiant utilisable auprès de tous les autres services qui l’emploient.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Assign the password through a finance role',
          fr: 'Attribuer le mot de passe au moyen d’un rôle financier',
        },
        correct: false,
        explanation: {
          en: 'A role governs authorization to resources, not whether a password can be replayed at a separate service after a credential database exposure.',
          fr: 'Un rôle gouverne l’autorisation aux ressources, pas la possibilité de rejouer un mot de passe sur un autre service après l’exposition d’une base.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Replace the password with a second security question',
          fr: 'Remplacer le mot de passe par une deuxième question de sécurité',
        },
        correct: false,
        explanation: {
          en: 'A second knowledge secret is not a distinct factor and can itself be guessed or discovered. It does not solve password reuse across services.',
          fr: 'Un deuxième secret de connaissance n’est pas un facteur distinct et peut être deviné ou découvert. Il ne résout pas la réutilisation entre services.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-010',
    objective: '4.6',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which PAM capability best provides accountable, temporary elevation for a maintenance task?',
      fr: 'Quelle capacité PAM fournit le mieux une élévation temporaire et traçable pour une maintenance ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Just-in-time privileged access with an approval workflow',
          fr: 'Un accès privilégié juste à temps avec un workflow d’approbation',
        },
        correct: true,
        explanation: {
          en: 'Just-in-time access grants elevation for a bounded need, while approval ties it to a justified request instead of a permanently shared credential.',
          fr: 'L’accès juste à temps accorde une élévation pour un besoin limité, tandis que l’approbation la lie à une demande justifiée plutôt qu’à un secret partagé permanent.',
        },
      },
      {
        id: 'b',
        text: { en: 'A longer shared root password', fr: 'Un mot de passe root partagé plus long' },
        correct: false,
        explanation: {
          en: 'A longer shared secret may resist guessing better, but it remains permanent and cannot attribute a privileged session to one administrator.',
          fr: 'Un secret partagé plus long résiste peut-être mieux à la devinette, mais reste permanent et ne peut pas attribuer une session privilégiée à un administrateur précis.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Single sign-on to the administrative console',
          fr: 'Le single sign-on vers la console administrative',
        },
        correct: false,
        explanation: {
          en: 'SSO can reduce login prompts but does not by itself make elevation temporary, approved, or traceable. PAM governs the privileged entitlement.',
          fr: 'Le SSO peut réduire les invites de connexion, mais ne rend pas seul l’élévation temporaire, approuvée ou traçable. Le PAM gouverne le droit privilégié.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A quarterly attestation of the root account',
          fr: 'Une attestation trimestrielle du compte root',
        },
        correct: false,
        explanation: {
          en: 'Attestation can identify whether root access remains justified, but it does not control the immediate shared-password session or issue time-limited elevation.',
          fr: 'L’attestation peut déterminer si un accès root reste justifié, mais ne contrôle pas la session immédiate avec secret partagé ni ne délivre une élévation limitée.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-011',
    objective: '4.6',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An employee moves from payroll to recruiting. Which actions best preserve least privilege? (Select two.)',
      fr: 'Un salarié passe de la paie au recrutement. Quelles actions préservent le mieux le moindre privilège ? (Sélectionnez deux réponses.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: {
          en: 'Remove payroll entitlements that are no longer required',
          fr: 'Retirer les droits de paie qui ne sont plus nécessaires',
        },
        correct: true,
        explanation: {
          en: 'Removing obsolete payroll rights prevents the former role from accumulating on top of the new one and limits access to sensitive financial data.',
          fr: 'Retirer les droits de paie obsolètes empêche que l’ancien rôle s’accumule avec le nouveau et limite l’accès aux données financières sensibles.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Assign the approved recruiting role through the identity process',
          fr: 'Attribuer le rôle de recrutement approuvé au moyen du processus d’identité',
        },
        correct: true,
        explanation: {
          en: 'A role-based assignment gives the worker the capabilities required for the new job and preserves an auditable, reviewable entitlement path.',
          fr: 'Une attribution fondée sur le rôle donne les capacités requises par le nouveau poste et préserve un chemin de droit traçable et révisable.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Keep payroll rights for emergencies',
          fr: 'Conserver les droits de paie pour les urgences',
        },
        correct: false,
        explanation: {
          en: 'Unneeded standing access is the privilege accumulation the transfer process should prevent. Emergency access should use a controlled, separate path.',
          fr: 'Un accès permanent non nécessaire est précisément l’accumulation de privilèges que le transfert doit empêcher. Un accès d’urgence doit suivre un parcours contrôlé séparé.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Make the employee share the payroll manager’s account',
          fr: 'Faire partager au salarié le compte du responsable paie',
        },
        correct: false,
        explanation: {
          en: 'Shared accounts eliminate individual accountability and grant excessive power. They are not a valid substitute for a controlled temporary access process.',
          fr: 'Les comptes partagés suppriment la responsabilité individuelle et accordent une puissance excessive. Ils ne remplacent pas un processus d’accès temporaire contrôlé.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-012',
    objective: '4.6',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'Which statement best describes the security benefit of SSO?',
      fr: 'Quelle affirmation décrit le mieux le bénéfice de sécurité du SSO ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It centralizes authentication so fewer separate credentials must be managed',
          fr: 'Il centralise l’authentification afin de gérer moins d’identifiants distincts',
        },
        correct: true,
        explanation: {
          en: 'SSO can reduce password sprawl and centralize authentication policy. It does not remove the need to authorize each application independently.',
          fr: 'Le SSO peut réduire la prolifération des mots de passe et centraliser la politique d’authentification. Il ne supprime pas l’autorisation propre à chaque application.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It automatically gives every user access to every connected application',
          fr: 'Il donne automatiquement à chaque utilisateur accès à toutes les applications connectées',
        },
        correct: false,
        explanation: {
          en: 'SSO concerns the authentication experience, not universal authorization. Each application should still enforce its own permitted users and actions.',
          fr: 'Le SSO concerne l’expérience d’authentification, non une autorisation universelle. Chaque application doit toujours appliquer ses propres utilisateurs et actions autorisés.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It proves an applicant’s identity before enrolment',
          fr: 'Il prouve l’identité d’un candidat avant l’enrôlement',
        },
        correct: false,
        explanation: {
          en: 'Proof before enrolment is identity proofing. SSO is used after an identity and authentication relationship have already been established.',
          fr: 'La preuve avant l’enrôlement est la vérification d’identité. Le SSO intervient après l’établissement d’une identité et d’une relation d’authentification.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It records privileged administrator sessions',
          fr: 'Il enregistre les sessions d’administrateurs privilégiés',
        },
        correct: false,
        explanation: {
          en: 'Privileged session recording is a PAM capability. SSO may authenticate an administrator but does not itself monitor the elevated session.',
          fr: 'L’enregistrement des sessions privilégiées est une capacité PAM. Le SSO peut authentifier un administrateur, mais ne surveille pas lui-même la session élevée.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-013',
    objective: '4.6',
    kind: 'recall',
    difficulty: 'hard',
    prompt: {
      en: 'A research repository assigns access strictly from centrally managed clearance labels. A data owner cannot make an exception. Which model is in use?',
      fr: 'Un dépôt de recherche attribue l’accès strictement selon des étiquettes d’habilitation gérées centralement. Le propriétaire des données ne peut pas faire d’exception. Quel modèle est employé ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Mandatory access control (MAC)', fr: 'Le contrôle d’accès obligatoire (MAC)' },
        correct: true,
        explanation: {
          en: 'MAC enforces centrally defined labels and clearances, so individual data owners cannot independently override the classification-based policy.',
          fr: 'MAC applique des étiquettes et habilitations définies centralement, de sorte que les propriétaires ne peuvent pas remplacer indépendamment la politique fondée sur la classification.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Discretionary access control (DAC)',
          fr: 'Le contrôle d’accès discrétionnaire (DAC)',
        },
        correct: false,
        explanation: {
          en: 'DAC gives a resource owner discretion to share with others. The explicit lack of owner exceptions is the opposite of discretionary control.',
          fr: 'DAC donne au propriétaire la discrétion de partager avec d’autres. L’absence explicite d’exception du propriétaire est l’opposé d’un contrôle discrétionnaire.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Role-based access control (RBAC)',
          fr: 'Le contrôle d’accès basé sur les rôles (RBAC)',
        },
        correct: false,
        explanation: {
          en: 'RBAC maps permissions to job roles such as analyst or manager. The scenario emphasizes clearance labels, not organizational job duties.',
          fr: 'RBAC associe les permissions à des rôles de travail comme analyste ou manager. Le scénario insiste sur les étiquettes d’habilitation, pas sur les fonctions.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Attribute-based access control (ABAC)',
          fr: 'Le contrôle d’accès basé sur les attributs (ABAC)',
        },
        correct: false,
        explanation: {
          en: 'MAC labels can resemble attributes, but the fixed centrally enforced clearance hierarchy is the defining cue for MAC in this scenario.',
          fr: 'Les étiquettes MAC peuvent ressembler à des attributs, mais la hiérarchie fixe d’habilitation appliquée centralement est l’indice déterminant de MAC ici.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-014',
    objective: '4.6',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A help desk accepts only an emailed request to reset a password, and an attacker who controls the mailbox resets an executive account. What should be improved most directly?',
      fr: 'Le support accepte seulement une demande par courriel pour réinitialiser un mot de passe, et un attaquant qui contrôle la boîte réinitialise un compte de direction. Que faut-il améliorer le plus directement ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The identity verification used by the password-reset process',
          fr: 'La vérification d’identité utilisée par le processus de réinitialisation',
        },
        correct: true,
        explanation: {
          en: 'A reset process must establish sufficient confidence in the claimant. Reliance on the already compromised mailbox provides no independent assurance.',
          fr: 'Un processus de réinitialisation doit établir une confiance suffisante dans le demandeur. S’appuyer sur une boîte déjà compromise ne fournit aucune assurance indépendante.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The user’s RBAC role assignment',
          fr: 'L’attribution de rôle RBAC de l’utilisateur',
        },
        correct: false,
        explanation: {
          en: 'Role assignment governs what an account may do after access succeeds. It does not stop an attacker from taking over the account through a weak reset proof.',
          fr: 'L’attribution de rôle gouverne ce qu’un compte peut faire après l’accès. Elle n’empêche pas un attaquant de prendre le compte par une preuve de réinitialisation faible.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The partner federation trust relationship',
          fr: 'La relation de confiance de fédération avec les partenaires',
        },
        correct: false,
        explanation: {
          en: 'No partner identity provider is involved. The weakness is a local credential recovery path that fails to verify the person requesting the reset.',
          fr: 'Aucun fournisseur d’identité partenaire n’intervient. La faiblesse est un parcours local de récupération qui ne vérifie pas la personne demandant la réinitialisation.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The quarterly entitlement attestation',
          fr: 'L’attestation trimestrielle des droits',
        },
        correct: false,
        explanation: {
          en: 'Attestation reviews whether access is still justified. It would not prevent immediate account takeover through an insecure password reset procedure.',
          fr: 'L’attestation vérifie si l’accès reste justifié. Elle n’empêcherait pas la prise de contrôle immédiate par une procédure de réinitialisation non sécurisée.',
        },
      },
    ],
  },
  {
    id: 'q-4-6-015',
    objective: '4.6',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'Which two controls best address the risk that privileged actions cannot be linked to an individual? (Select two.)',
      fr: 'Quels deux contrôles répondent le mieux au risque que des actions privilégiées ne puissent pas être liées à une personne ? (Sélectionnez deux réponses.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: {
          en: 'Use named administrator accounts instead of a shared account',
          fr: 'Utiliser des comptes administrateur nommés au lieu d’un compte partagé',
        },
        correct: true,
        explanation: {
          en: 'Named accounts preserve individual accountability because logs can associate the privileged action with one authenticated identity rather than a shared secret.',
          fr: 'Les comptes nommés préservent la responsabilité individuelle, car les journaux peuvent associer l’action privilégiée à une identité authentifiée plutôt qu’à un secret partagé.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Record privileged sessions through a PAM tool',
          fr: 'Enregistrer les sessions privilégiées avec un outil PAM',
        },
        correct: true,
        explanation: {
          en: 'PAM session recording supplies evidence of what occurred during elevated work and complements identity attribution for later investigation.',
          fr: 'L’enregistrement de session PAM fournit une preuve de ce qui a eu lieu pendant un travail élevé et complète l’attribution d’identité pour une enquête ultérieure.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Increase password complexity for the shared account',
          fr: 'Augmenter la complexité du mot de passe du compte partagé',
        },
        correct: false,
        explanation: {
          en: 'A stronger shared password may reduce guessing risk, but every user still appears as the same identity and individual actions remain untraceable.',
          fr: 'Un mot de passe partagé plus robuste peut réduire le risque de devinette, mais tous les utilisateurs apparaissent toujours sous la même identité et les actions restent non attribuables.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Use SSO for ordinary employee applications',
          fr: 'Utiliser le SSO pour les applications ordinaires des salariés',
        },
        correct: false,
        explanation: {
          en: 'SSO improves the ordinary sign-in experience but does not evidence privileged activity when administrators use an unaccountable shared elevated account.',
          fr: 'Le SSO améliore la connexion ordinaire, mais ne fournit pas de preuve sur une activité privilégiée lorsque les administrateurs utilisent un compte élevé partagé.',
        },
      },
    ],
  },
];
