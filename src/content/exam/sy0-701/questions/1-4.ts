import type { Question } from '@/content/schemas';

/**
 * Objective 1.4 — Explain the importance of using appropriate cryptographic solutions.
 *
 * Every question is **original**, written from the published objective. None reproduces,
 * paraphrases, or reconstructs any real exam item — see NOTICE.md.
 *
 * Eleven official topics, and none of them require doing cryptography — they require choosing it.
 * So almost every stem here presents a requirement and asks which primitive satisfies it. The
 * recurring axis is reversibility (encryption / hashing / tokenization), and the recurring trap is
 * a control that is real but solves the neighbouring problem: salt against stretching, TPM against
 * HSM, CRL against OCSP.
 */
export const QUESTIONS_1_4: Question[] = [
  {
    id: 'q-1-4-001',
    objective: '1.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A test environment needs realistic card numbers, but no value in it may be mathematically derivable from a real one, even by someone holding every key the company owns. Which technique fits?',
      fr: 'Un environnement de test a besoin de numéros de carte réalistes, mais aucune valeur ne doit être mathématiquement dérivable d’un vrai numéro, même pour qui détiendrait toutes les clés de l’entreprise. Quelle technique convient ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Tokenization', fr: 'La tokenisation (tokenization)' },
        correct: true,
        explanation: {
          en: 'A token is an arbitrary substitute with no mathematical link to the original. Only the vault can map it back, so holding every encryption key gets an attacker nowhere.',
          fr: 'Un jeton est un substitut arbitraire sans lien mathématique avec l’original. Seul le coffre de jetons permet de revenir en arrière : détenir toutes les clés de chiffrement ne mène nulle part.',
        },
      },
      {
        id: 'b',
        text: { en: 'Symmetric encryption', fr: 'Le chiffrement symétrique' },
        correct: false,
        explanation: {
          en: 'Encryption preserves a mathematical relationship by design — that is what makes decryption possible. The stem rules out exactly that property.',
          fr: 'Le chiffrement conserve par construction une relation mathématique : c’est ce qui rend le déchiffrement possible. L’énoncé exclut précisément cette propriété.',
        },
      },
      {
        id: 'c',
        text: { en: 'Hashing', fr: 'Le hachage' },
        correct: false,
        explanation: {
          en: 'A hash is one-way, so nothing could ever be mapped back for the test to be meaningful. It also would not look like a card number.',
          fr: 'Une empreinte est à sens unique : rien ne pourrait jamais être retrouvé, ce qui priverait le test de sens. Elle ne ressemblerait pas non plus à un numéro de carte.',
        },
      },
      {
        id: 'd',
        text: { en: 'Steganography', fr: 'La stéganographie' },
        correct: false,
        explanation: {
          en: 'Steganography hides data inside another file. It conceals the existence of data; it does not substitute one value for another.',
          fr: 'La stéganographie cache une donnée dans un autre fichier. Elle dissimule l’existence de la donnée, elle ne substitue pas une valeur à une autre.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-002',
    objective: '1.4',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'What problem does salting a password hash solve?',
      fr: 'Quel problème le salage d’une empreinte de mot de passe résout-il ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Identical passwords no longer produce identical digests, defeating precomputed tables',
          fr: 'Des mots de passe identiques ne produisent plus la même empreinte, ce qui neutralise les tables précalculées',
        },
        correct: true,
        explanation: {
          en: 'A unique random value per password means an attacker cannot precompute anything useful in advance. Rainbow tables become worthless.',
          fr: 'Une valeur aléatoire unique par mot de passe empêche l’attaquant de précalculer quoi que ce soit d’utile à l’avance. Les tables arc-en-ciel deviennent inutiles.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Each guess becomes computationally slow',
          fr: 'Chaque tentative devient lente à calculer',
        },
        correct: false,
        explanation: {
          en: 'That is key stretching, not salting. Salt costs an attacker nothing per guess — it only removes the ability to reuse work across accounts.',
          fr: 'C’est l’étirement de clé, pas le salage. Le sel ne coûte rien par tentative : il supprime seulement la possibilité de réutiliser un calcul d’un compte à l’autre.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The password can be recovered if the user forgets it',
          fr: 'Le mot de passe peut être retrouvé si l’utilisateur l’oublie',
        },
        correct: false,
        explanation: {
          en: 'Hashing is one-way with or without salt. A system that can recover your password is not hashing it.',
          fr: 'Le hachage est à sens unique, avec ou sans sel. Un système capable de retrouver ton mot de passe ne le hache pas.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The digest is encrypted at rest',
          fr: 'L’empreinte est chiffrée au repos',
        },
        correct: false,
        explanation: {
          en: 'Salt is concatenated before hashing and is usually stored in the clear beside the digest. It is not a confidentiality control.',
          fr: 'Le sel est concaténé avant hachage et stocké généralement en clair à côté de l’empreinte. Ce n’est pas un contrôle de confidentialité.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-003',
    objective: '1.4',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A laptop with full-disk encryption is stolen from a café table while the owner was logged in and the screen unlocked. What does the encryption protect?',
      fr: 'Un portable avec chiffrement de disque entier est volé sur la table d’un café alors que son propriétaire était connecté et l’écran déverrouillé. Que protège le chiffrement ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Nothing, until the machine is powered off',
          fr: 'Rien, tant que la machine n’est pas éteinte',
        },
        correct: true,
        explanation: {
          en: 'A running, unlocked system decrypts transparently for any authorised process. The key is in memory, so the thief inherits a fully readable disk.',
          fr: 'Un système démarré et déverrouillé déchiffre de façon transparente pour tout processus autorisé. La clé est en mémoire : le voleur hérite d’un disque parfaitement lisible.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'All files on the disk, at all times',
          fr: 'Tous les fichiers du disque, en permanence',
        },
        correct: false,
        explanation: {
          en: 'This is the belief the scenario is built to break. Full-disk encryption protects data at rest, and a running machine is not at rest.',
          fr: 'C’est la croyance que le scénario cherche à casser. Le chiffrement de disque entier protège la donnée au repos, et une machine allumée n’est pas au repos.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Only the operating system files',
          fr: 'Seulement les fichiers du système d’exploitation',
        },
        correct: false,
        explanation: {
          en: 'Full-disk encryption covers the whole volume, not a subset. The scope is not what makes this scenario a loss.',
          fr: 'Le chiffrement de disque entier couvre tout le volume, pas un sous-ensemble. Ce n’est pas le périmètre qui rend ce scénario perdant.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Data in transit over the network',
          fr: 'Les données en transit sur le réseau',
        },
        correct: false,
        explanation: {
          en: 'Disk encryption never touches the network. Data in transit is the job of TLS or IPsec.',
          fr: 'Le chiffrement de disque ne touche jamais au réseau. Les données en transit relèvent de TLS ou d’IPsec.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-004',
    objective: '1.4',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A company needs a device to hold the private keys for thousands of TLS certificates and perform signing operations at high volume for the whole data centre. Which tool?',
      fr: 'Une entreprise a besoin d’un équipement pour héberger les clés privées de milliers de certificats TLS et réaliser des opérations de signature en volume pour tout le centre de données. Quel outil ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'An HSM', fr: 'Un HSM' },
        correct: true,
        explanation: {
          en: 'A hardware security module is a dedicated appliance built for shared keys and heavy cryptographic throughput across an infrastructure.',
          fr: 'Un module matériel de sécurité est un équipement dédié, conçu pour des clés partagées et un fort débit cryptographique à l’échelle d’une infrastructure.',
        },
      },
      {
        id: 'b',
        text: { en: 'A TPM', fr: 'Un TPM' },
        correct: false,
        explanation: {
          en: 'A TPM is soldered to one motherboard and serves that single host. It cannot be a shared resource for a data centre, which is the whole distinction.',
          fr: 'Un TPM est soudé à une carte mère et sert cet hôte unique. Il ne peut pas être une ressource partagée pour un centre de données, et c’est toute la distinction.',
        },
      },
      {
        id: 'c',
        text: { en: 'A secure enclave', fr: 'Une enclave sécurisée' },
        correct: false,
        explanation: {
          en: 'A secure enclave is an isolated region inside a processor, protecting that processor’s workload. It is per-machine, like a TPM.',
          fr: 'Une enclave sécurisée est une zone isolée dans un processeur, qui protège la charge de ce processeur. Elle est par machine, comme un TPM.',
        },
      },
      {
        id: 'd',
        text: { en: 'Key escrow', fr: 'Un séquestre de clés' },
        correct: false,
        explanation: {
          en: 'Key escrow is an arrangement for a third party to hold a copy of a key. It is a policy, not a device that performs operations.',
          fr: 'Le séquestre de clés est un dispositif où un tiers conserve une copie d’une clé. C’est une politique, pas un équipement qui exécute des opérations.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-005',
    objective: '1.4',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'To send a confidential message to a recipient using asymmetric cryptography, which key do you encrypt with?',
      fr: 'Pour envoyer un message confidentiel à un destinataire en cryptographie asymétrique, avec quelle clé chiffre-t-on ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: "The recipient's public key",
          fr: 'La clé publique du destinataire',
        },
        correct: true,
        explanation: {
          en: 'Only the matching private key can undo it, and only the recipient holds that. Public key in, private key out gives confidentiality.',
          fr: 'Seule la clé privée correspondante peut défaire l’opération, et seul le destinataire la détient. Clé publique à l’aller, clé privée au retour : c’est la confidentialité.',
        },
      },
      {
        id: 'b',
        text: {
          en: "The recipient's private key",
          fr: 'La clé privée du destinataire',
        },
        correct: false,
        explanation: {
          en: 'You do not have it — that is the point of a private key. If you did, so could anyone else who obtained it.',
          fr: 'Tu ne l’as pas : c’est tout l’intérêt d’une clé privée. Si tu l’avais, n’importe qui d’autre l’ayant obtenue l’aurait aussi.',
        },
      },
      {
        id: 'c',
        text: { en: 'Your own private key', fr: 'Ta propre clé privée' },
        correct: false,
        explanation: {
          en: 'That is signing, not encrypting for confidentiality. Anyone with your public key could read it, which is the opposite of what you wanted.',
          fr: 'C’est signer, pas chiffrer pour la confidentialité. Quiconque a ta clé publique pourrait le lire, soit l’inverse du but recherché.',
        },
      },
      {
        id: 'd',
        text: { en: 'Your own public key', fr: 'Ta propre clé publique' },
        correct: false,
        explanation: {
          en: 'Then only you could decrypt it, since only you hold the matching private key. The recipient would receive something unreadable.',
          fr: 'Alors toi seul pourrais le déchiffrer, puisque toi seul détiens la clé privée correspondante. Le destinataire recevrait quelque chose d’illisible.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-006',
    objective: '1.4',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'What is the practical drawback of OCSP compared with a certificate revocation list?',
      fr: 'Quel est l’inconvénient pratique d’OCSP par rapport à une liste de révocation de certificats ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The authority learns which sites the client is visiting',
          fr: 'L’autorité apprend quels sites le client visite',
        },
        correct: true,
        explanation: {
          en: 'Querying about one certificate at a time tells the responder exactly where the user is going. It is a privacy cost, which is why OCSP stapling exists.',
          fr: 'Interroger un certificat à la fois indique au répondeur exactement où va l’utilisateur. C’est un coût de vie privée, et c’est la raison d’être de l’agrafage OCSP.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The client must download a very large file',
          fr: 'Le client doit télécharger un fichier très volumineux',
        },
        correct: false,
        explanation: {
          en: 'That is the CRL drawback, and it is precisely what OCSP was designed to avoid by asking about one certificate.',
          fr: 'C’est l’inconvénient de la CRL, et c’est précisément ce qu’OCSP évite en n’interrogeant qu’un seul certificat.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It cannot detect a revoked certificate',
          fr: 'Il ne détecte pas un certificat révoqué',
        },
        correct: false,
        explanation: {
          en: 'Detecting revocation is its entire function, and it does so more freshly than a periodically published list.',
          fr: 'Détecter une révocation est sa fonction même, et il le fait de façon plus fraîche qu’une liste publiée périodiquement.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It requires a self-signed certificate',
          fr: 'Il exige un certificat auto-signé',
        },
        correct: false,
        explanation: {
          en: 'The two are unrelated. OCSP checks the status of certificates issued by an authority; self-signing means there is no authority to ask.',
          fr: 'Les deux sont sans rapport. OCSP vérifie le statut de certificats émis par une autorité ; l’auto-signature signifie qu’il n’y a aucune autorité à interroger.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-007',
    objective: '1.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A login system stores properly salted password hashes, yet an attacker with the stolen database is still cracking weak passwords at millions of guesses per second. What should be added?',
      fr: 'Un système d’authentification stocke des empreintes de mot de passe correctement salées, et pourtant un attaquant en possession de la base volée casse les mots de passe faibles à des millions de tentatives par seconde. Que faut-il ajouter ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Key stretching', fr: 'L’étirement de clé (key stretching)' },
        correct: true,
        explanation: {
          en: 'Salt removes reuse across accounts but costs an attacker nothing per attempt. Stretching applies the function thousands of times, making each guess expensive.',
          fr: 'Le sel supprime la réutilisation entre comptes mais ne coûte rien par tentative. L’étirement applique la fonction des milliers de fois, ce qui rend chaque essai coûteux.',
        },
      },
      {
        id: 'b',
        text: { en: 'A longer salt', fr: 'Un sel plus long' },
        correct: false,
        explanation: {
          en: 'Salt length affects precomputation, which is already defeated. A longer salt does not slow a single guess by a measurable amount.',
          fr: 'La longueur du sel joue sur le précalcul, déjà neutralisé. Un sel plus long ne ralentit pas une tentative isolée de façon mesurable.',
        },
      },
      {
        id: 'c',
        text: { en: 'Encrypting the digests', fr: 'Chiffrer les empreintes' },
        correct: false,
        explanation: {
          en: 'It would help only while the key stays secret, and an attacker who exfiltrated the database will usually reach the key too. It treats the symptom.',
          fr: 'Cela n’aiderait que tant que la clé reste secrète, et un attaquant capable d’exfiltrer la base atteint généralement aussi la clé. C’est traiter le symptôme.',
        },
      },
      {
        id: 'd',
        text: { en: 'A different hash function', fr: 'Une autre fonction de hachage' },
        correct: false,
        explanation: {
          en: 'Swapping one fast hash for another fast hash changes nothing. What matters is deliberate slowness, which is what stretching provides.',
          fr: 'Remplacer une fonction rapide par une autre fonction rapide ne change rien. Ce qui compte est la lenteur délibérée, apportée par l’étirement.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-008',
    objective: '1.4',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What does a certificate signing request contain?',
      fr: 'Que contient une demande de signature de certificat (CSR) ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The applicant’s public key and identifying details',
          fr: 'La clé publique du demandeur et ses informations d’identité',
        },
        correct: true,
        explanation: {
          en: 'The authority needs the public key it will vouch for and the identity it will bind to it. Those are exactly the two things a CSR carries.',
          fr: 'L’autorité a besoin de la clé publique dont elle se portera garante et de l’identité qu’elle y liera. Ce sont exactement les deux éléments que porte une CSR.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The applicant’s private key',
          fr: 'La clé privée du demandeur',
        },
        correct: false,
        explanation: {
          en: 'A private key never leaves its owner. Sending it to an authority would destroy the property that makes the pair worth anything.',
          fr: 'Une clé privée ne quitte jamais son propriétaire. L’envoyer à une autorité détruirait la propriété qui donne sa valeur à la paire.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The authority’s root certificate',
          fr: 'Le certificat racine de l’autorité',
        },
        correct: false,
        explanation: {
          en: 'The root certificate is already in the client’s trust store. Sending it back to the authority that issued it would serve no purpose.',
          fr: 'Le certificat racine est déjà dans le magasin de confiance du client. Le renvoyer à l’autorité qui l’a émis ne servirait à rien.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A list of revoked certificates',
          fr: 'Une liste de certificats révoqués',
        },
        correct: false,
        explanation: {
          en: 'That is a CRL, published by the authority. It travels in the opposite direction and at a different stage of the lifecycle.',
          fr: 'C’est une CRL, publiée par l’autorité. Elle circule dans le sens inverse et à une autre étape du cycle de vie.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-009',
    objective: '1.4',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Why does TLS use both asymmetric and symmetric cryptography rather than one of them?',
      fr: 'Pourquoi TLS utilise-t-il à la fois la cryptographie asymétrique et symétrique plutôt qu’une seule des deux ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Asymmetric solves key delivery; symmetric is fast enough for the data',
          fr: 'L’asymétrique résout la livraison de la clé ; le symétrique est assez rapide pour les données',
        },
        correct: true,
        explanation: {
          en: 'Each covers the other’s weakness. Asymmetric agrees on a session key without a pre-shared secret, then symmetric carries the traffic at usable speed.',
          fr: 'Chacun couvre la faiblesse de l’autre. L’asymétrique permet de convenir d’une clé de session sans secret préalable, puis le symétrique transporte le trafic à une vitesse utilisable.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Two algorithms are always stronger than one',
          fr: 'Deux algorithmes sont toujours plus solides qu’un seul',
        },
        correct: false,
        explanation: {
          en: 'Stacking is not the reason, and it is not generally true. The combination exists to solve two different problems, not to double a strength.',
          fr: 'L’empilement n’est pas la raison, et ce n’est pas vrai en général. La combinaison existe pour résoudre deux problèmes distincts, pas pour doubler une robustesse.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Symmetric cryptography cannot encrypt large files',
          fr: 'La cryptographie symétrique ne peut pas chiffrer de gros fichiers',
        },
        correct: false,
        explanation: {
          en: 'The reverse: symmetric is the one that handles volume well. That is precisely why it is chosen for the bulk of the traffic.',
          fr: 'C’est l’inverse : le symétrique est celui qui absorbe bien le volume. C’est précisément pour cela qu’il est choisi pour le gros du trafic.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Asymmetric cryptography provides no confidentiality',
          fr: 'La cryptographie asymétrique n’apporte pas de confidentialité',
        },
        correct: false,
        explanation: {
          en: 'It does, when you encrypt with the recipient’s public key. Its limitation is speed, not capability.',
          fr: 'Elle en apporte, quand on chiffre avec la clé publique du destinataire. Sa limite est la vitesse, pas la capacité.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-010',
    objective: '1.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An internal monitoring tool presents a self-signed certificate and the browser shows a warning. What is actually missing?',
      fr: 'Un outil de supervision interne présente un certificat auto-signé et le navigateur affiche un avertissement. Que manque-t-il réellement ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A trusted third party vouching for the identity',
          fr: 'Un tiers de confiance qui atteste l’identité',
        },
        correct: true,
        explanation: {
          en: 'The cryptography is identical; what is absent is an authority in the browser’s trust store confirming the certificate belongs to that host.',
          fr: 'La cryptographie est identique ; ce qui manque est une autorité présente dans le magasin de confiance du navigateur, confirmant que le certificat appartient bien à cet hôte.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Encryption of the connection',
          fr: 'Le chiffrement de la connexion',
        },
        correct: false,
        explanation: {
          en: 'The connection is encrypted normally. A self-signed certificate carries a real key pair and negotiates real TLS.',
          fr: 'La connexion est chiffrée normalement. Un certificat auto-signé porte une vraie paire de clés et négocie un vrai TLS.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A sufficient key length',
          fr: 'Une longueur de clé suffisante',
        },
        correct: false,
        explanation: {
          en: 'Key length is chosen when the certificate is generated and is unrelated to who signed it. A self-signed certificate can use any length.',
          fr: 'La longueur de clé est choisie à la génération et n’a rien à voir avec le signataire. Un certificat auto-signé peut utiliser n’importe quelle longueur.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A revocation mechanism',
          fr: 'Un mécanisme de révocation',
        },
        correct: false,
        explanation: {
          en: 'A defensible secondary observation — there is no authority to publish revocation — but it is not what triggers the warning the user sees.',
          fr: 'Observation secondaire défendable — aucune autorité ne peut publier de révocation — mais ce n’est pas ce qui déclenche l’avertissement que voit l’utilisateur.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-011',
    objective: '1.4',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What does a blockchain guarantee about the records it holds?',
      fr: 'Que garantit une chaîne de blocs sur les enregistrements qu’elle contient ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'That altering an old record is detectable',
          fr: 'Qu’altérer un ancien enregistrement est détectable',
        },
        correct: true,
        explanation: {
          en: 'Each block carries the hash of the previous one, so changing an old block invalidates every block after it. That is integrity, made verifiable.',
          fr: 'Chaque bloc porte l’empreinte du précédent : modifier un ancien bloc invalide tous les suivants. C’est de l’intégrité, rendue vérifiable.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'That the records are confidential',
          fr: 'Que les enregistrements sont confidentiels',
        },
        correct: false,
        explanation: {
          en: 'An open public ledger is readable by everyone by design. Blockchain provides integrity, not confidentiality, and the exam exploits that confusion.',
          fr: 'Un registre public ouvert est lisible par tous, par conception. La chaîne de blocs apporte l’intégrité, pas la confidentialité, et l’examen exploite cette confusion.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'That the records are always available',
          fr: 'Que les enregistrements sont toujours disponibles',
        },
        correct: false,
        explanation: {
          en: 'Distribution helps availability in practice, but that is a property of the network running it, not of the chained-hash structure.',
          fr: 'La distribution aide la disponibilité en pratique, mais c’est une propriété du réseau qui l’exécute, pas de la structure en chaîne d’empreintes.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'That the records are anonymous',
          fr: 'Que les enregistrements sont anonymes',
        },
        correct: false,
        explanation: {
          en: 'Pseudonymous at best, and often traceable. Anonymity is not a property the structure provides.',
          fr: 'Pseudonymes au mieux, et souvent traçables. L’anonymat n’est pas une propriété apportée par la structure.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-012',
    objective: '1.4',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'A support screen shows `**** **** **** 4242` and the underlying digits are not retrievable from the interface at all. Which technique is in use?',
      fr: 'Un écran de support affiche `**** **** **** 4242` et les chiffres sous-jacents ne sont récupérables d’aucune façon depuis l’interface. Quelle technique est utilisée ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Data masking', fr: 'Le masquage de données (data masking)' },
        correct: true,
        explanation: {
          en: 'Masking replaces part of a value with placeholder characters for display. The hidden portion is simply not available at that layer.',
          fr: 'Le masquage remplace une partie de la valeur par des caractères de remplacement pour l’affichage. La portion cachée n’est tout simplement pas disponible à ce niveau.',
        },
      },
      {
        id: 'b',
        text: { en: 'Tokenization', fr: 'La tokenisation' },
        correct: false,
        explanation: {
          en: 'A token replaces the whole value with an unrelated substitute. It would not preserve the last four digits, which is the point of the display.',
          fr: 'Un jeton remplace la valeur entière par un substitut sans rapport. Il ne conserverait pas les quatre derniers chiffres, qui font tout l’intérêt de l’affichage.',
        },
      },
      {
        id: 'c',
        text: { en: 'Hashing', fr: 'Le hachage' },
        correct: false,
        explanation: {
          en: 'A digest is a fixed-length value that looks nothing like a card number and preserves no recognisable fragment of the input.',
          fr: 'Une empreinte est une valeur de longueur fixe qui ne ressemble en rien à un numéro de carte et ne conserve aucun fragment reconnaissable de l’entrée.',
        },
      },
      {
        id: 'd',
        text: { en: 'Steganography', fr: 'La stéganographie' },
        correct: false,
        explanation: {
          en: 'Steganography conceals data inside a carrier file. Nothing is being hidden inside anything here; part of a value is simply not shown.',
          fr: 'La stéganographie dissimule une donnée dans un fichier porteur. Rien n’est caché dans quoi que ce soit ici : une partie de la valeur n’est simplement pas affichée.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-013',
    objective: '1.4',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A wildcard certificate for `*.example.com` is deployed to eleven servers. One of them is compromised and the private key is stolen. What is the consequence?',
      fr: 'Un certificat générique pour `*.exemple.fr` est déployé sur onze serveurs. L’un d’eux est compromis et la clé privée est volée. Quelle en est la conséquence ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Every subdomain must be re-certified, because one key covered them all',
          fr: 'Tous les sous-domaines doivent être recertifiés, car une seule clé les couvrait tous',
        },
        correct: true,
        explanation: {
          en: 'That is the trade-off of a wildcard: one certificate to manage, and one key whose theft impersonates every host under the domain.',
          fr: 'C’est le compromis du certificat générique : un seul certificat à gérer, et une seule clé dont le vol permet d’usurper tous les hôtes du domaine.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Only the compromised server is affected',
          fr: 'Seul le serveur compromis est affecté',
        },
        correct: false,
        explanation: {
          en: 'That would be true with per-host certificates, which is exactly the argument against wildcards. Here all eleven share one key.',
          fr: 'Ce serait vrai avec des certificats par hôte, et c’est précisément l’argument contre les certificats génériques. Ici les onze partagent une seule clé.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Nothing, provided the certificate has not expired',
          fr: 'Rien, tant que le certificat n’a pas expiré',
        },
        correct: false,
        explanation: {
          en: 'Expiry is unrelated to compromise. A stolen key on a valid certificate is worse than an expired one, not better.',
          fr: 'L’expiration est sans rapport avec la compromission. Une clé volée sur un certificat valide est pire qu’un certificat expiré, pas mieux.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The certificate authority automatically revokes it',
          fr: 'L’autorité de certification le révoque automatiquement',
        },
        correct: false,
        explanation: {
          en: 'An authority cannot detect a theft it was never told about. Revocation has to be requested by whoever owns the certificate.',
          fr: 'Une autorité ne peut pas détecter un vol dont personne ne l’a informée. La révocation doit être demandée par le titulaire du certificat.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-014',
    objective: '1.4',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which statement about key length is correct?',
      fr: 'Quel énoncé sur la longueur de clé est correct ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Lengths compare meaningfully only within the same algorithm family',
          fr: 'Les longueurs ne se comparent utilement qu’au sein d’une même famille d’algorithmes',
        },
        correct: true,
        explanation: {
          en: 'A 256-bit ECC key is roughly comparable to a 3072-bit RSA key. Comparing the raw numbers across families gives an answer that is simply wrong.',
          fr: 'Une clé ECC de 256 bits est à peu près comparable à une clé RSA de 3072 bits. Comparer les nombres bruts entre familles donne une réponse simplement fausse.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A longer key is always more secure, whatever the algorithm',
          fr: 'Une clé plus longue est toujours plus sûre, quel que soit l’algorithme',
        },
        correct: false,
        explanation: {
          en: 'This is the trap. It holds within one algorithm and fails across families, where a shorter key can be substantially stronger.',
          fr: 'C’est le piège. C’est vrai au sein d’un algorithme et faux entre familles, où une clé plus courte peut être nettement plus robuste.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Key length has no effect on security',
          fr: 'La longueur de clé n’a aucun effet sur la sécurité',
        },
        correct: false,
        explanation: {
          en: 'It very much does — it sets the cost of a brute-force search. The nuance is that the mapping differs between algorithms.',
          fr: 'Elle en a un, bien réel : elle fixe le coût d’une recherche exhaustive. La nuance est que la correspondance diffère selon les algorithmes.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Symmetric keys must be longer than asymmetric ones',
          fr: 'Les clés symétriques doivent être plus longues que les asymétriques',
        },
        correct: false,
        explanation: {
          en: 'The opposite in practice: a 256-bit symmetric key is very strong, while asymmetric keys need far more bits for comparable security.',
          fr: 'C’est l’inverse en pratique : une clé symétrique de 256 bits est très robuste, alors que les clés asymétriques exigent bien plus de bits pour une sécurité comparable.',
        },
      },
    ],
  },

  {
    id: 'q-1-4-015',
    objective: '1.4',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A contract must be provably signed by its author, and any later alteration must be detectable. Which properties does a digital signature deliver here? (Select all that apply.)',
      fr: 'Un contrat doit être signé de façon prouvable par son auteur, et toute altération ultérieure doit être détectable. Quelles propriétés une signature numérique apporte-t-elle ici ? (Sélectionne toutes les réponses correctes.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: { en: 'Integrity', fr: 'L’intégrité' },
        correct: true,
        explanation: {
          en: 'The signature is computed over a hash of the document, so any modification breaks verification. Alteration becomes detectable, which is the second requirement.',
          fr: 'La signature est calculée sur une empreinte du document : toute modification casse la vérification. L’altération devient détectable, ce qui répond à la seconde exigence.',
        },
      },
      {
        id: 'b',
        text: { en: 'Non-repudiation', fr: 'La non-répudiation' },
        correct: true,
        explanation: {
          en: 'Only the author holds the private key that produced the signature, so authorship can be proven and cannot credibly be denied later.',
          fr: 'Seul l’auteur détient la clé privée qui a produit la signature : la paternité peut être prouvée et ne peut plus être crédiblement niée.',
        },
      },
      {
        id: 'c',
        text: { en: 'Confidentiality', fr: 'La confidentialité' },
        correct: false,
        explanation: {
          en: 'A signed document is still readable by anyone. Concealing it would require encrypting it as well, which is a separate operation.',
          fr: 'Un document signé reste lisible par tous. Le dissimuler exigerait de le chiffrer en plus, ce qui est une opération distincte.',
        },
      },
      {
        id: 'd',
        text: { en: 'Availability', fr: 'La disponibilité' },
        correct: false,
        explanation: {
          en: 'A signature says nothing about whether the document can be reached. Availability comes from storage and redundancy, not cryptography.',
          fr: 'Une signature ne dit rien de la possibilité d’atteindre le document. La disponibilité vient du stockage et de la redondance, pas de la cryptographie.',
        },
      },
    ],
  },
];
