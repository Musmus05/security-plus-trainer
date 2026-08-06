import type { Question } from '@/content/schemas';

/**
 * Objective 2.3 — Explain various types of vulnerabilities.
 *
 * Every question is **original**, written from the published objective. None reproduces,
 * paraphrases, or reconstructs any real exam item — see NOTICE.md.
 *
 * Several families produce the same symptom, so a stem that only described an outcome would have
 * more than one defensible answer. Each stem here fixes **where the defect lives** — who should have
 * prevented it — and the distractors are the families that would produce a similar outcome from a
 * different place. Two questions target the words the exam misuses most: zero-day, and end-of-life
 * against legacy.
 */
export const QUESTIONS_2_3: Question[] = [
  {
    id: 'q-2-3-001',
    objective: '2.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A cloud storage bucket holding customer records is reachable by anyone with the URL. The storage service is fully patched and behaving exactly as designed. Which family of vulnerability?',
      fr: 'Un compartiment de stockage en nuage contenant des dossiers clients est accessible à quiconque connaît l’URL. Le service de stockage est entièrement à jour et se comporte exactement comme prévu. Quelle famille de vulnérabilité ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Misconfiguration', fr: 'Une mauvaise configuration (misconfiguration)' },
        correct: true,
        explanation: {
          en: 'There is nothing to patch: the software works as designed and the setting is wrong. That is the test that separates misconfiguration from every other family.',
          fr: 'Il n’y a rien à corriger : le logiciel fonctionne comme prévu et c’est le réglage qui est faux. C’est le test qui sépare la mauvaise configuration de toutes les autres familles.',
        },
      },
      {
        id: 'b',
        text: { en: 'A cloud-specific vulnerability', fr: 'Une vulnérabilité spécifique au nuage' },
        correct: false,
        explanation: {
          en: 'Tempting because it happened in the cloud, but the defect is a permission somebody set. The same mistake on an on-premises file share is the same vulnerability.',
          fr: 'Tentant parce que cela se produit dans le nuage, mais le défaut est une permission fixée par quelqu’un. La même erreur sur un partage local est la même vulnérabilité.',
        },
      },
      {
        id: 'c',
        text: { en: 'An application vulnerability', fr: 'Une vulnérabilité applicative' },
        correct: false,
        explanation: {
          en: 'That would mean a defect in the code. The stem rules it out explicitly: the service behaves exactly as designed.',
          fr: 'Cela supposerait un défaut dans le code. L’énoncé l’exclut explicitement : le service se comporte exactement comme prévu.',
        },
      },
      {
        id: 'd',
        text: { en: 'A cryptographic vulnerability', fr: 'Une vulnérabilité cryptographique' },
        correct: false,
        explanation: {
          en: 'No cipher failed. The data may even be encrypted at rest; it is being handed to anyone who asks, which is an access decision.',
          fr: 'Aucun chiffrement n’a échoué. Les données peuvent même être chiffrées au repos ; elles sont remises à qui les demande, ce qui est une décision d’accès.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-002',
    objective: '2.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A program verifies that a file belongs to the calling user and then opens it. In the interval between the two operations, an attacker replaces the file with a link to a system file. Which vulnerability?',
      fr: 'Un programme vérifie qu’un fichier appartient à l’utilisateur appelant, puis l’ouvre. Entre les deux opérations, un attaquant remplace le fichier par un lien vers un fichier système. Quelle vulnérabilité ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'TOC/TOU', fr: 'TOC/TOU (time-of-check to time-of-use)' },
        correct: true,
        explanation: {
          en: 'A check and a use, separated in time, with the state changing in between. That gap is precisely what time-of-check to time-of-use names.',
          fr: 'Une vérification et une utilisation, séparées dans le temps, avec un changement d’état entre les deux. Cet intervalle est exactement ce que désigne time-of-check to time-of-use.',
        },
      },
      {
        id: 'b',
        text: { en: 'A buffer overflow', fr: 'Un débordement de tampon (buffer overflow)' },
        correct: false,
        explanation: {
          en: 'Nothing is being written past the end of a region. The flaw is in the ordering of two correct operations, not in a size.',
          fr: 'Rien n’est écrit au-delà d’une zone. Le défaut porte sur l’ordonnancement de deux opérations correctes, pas sur une taille.',
        },
      },
      {
        id: 'c',
        text: { en: 'Memory injection', fr: 'Une injection en mémoire' },
        correct: false,
        explanation: {
          en: 'No code is being placed in the process. The attacker changes something on disk and lets the program act on it.',
          fr: 'Aucun code n’est placé dans le processus. L’attaquant modifie quelque chose sur le disque et laisse le programme agir dessus.',
        },
      },
      {
        id: 'd',
        text: { en: 'A generic race condition', fr: 'Une situation de compétition générique' },
        correct: false,
        explanation: {
          en: 'Defensible — TOC/TOU is a race condition — but the exam lists it separately and the stem gives the check-then-use structure that names it exactly.',
          fr: 'Défendable — TOC/TOU est une situation de compétition — mais l’examen la liste à part, et l’énoncé donne la structure vérification-puis-usage qui la nomme précisément.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-003',
    objective: '2.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which statement correctly describes a zero-day vulnerability?',
      fr: 'Quel énoncé décrit correctement une vulnérabilité jour zéro ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It is unknown to whoever would fix it, so no patch and no signature exist',
          fr: 'Elle est inconnue de qui devrait la corriger, donc ni correctif ni signature n’existent',
        },
        correct: true,
        explanation: {
          en: 'The defining property is the absence of knowledge. That is why the defences are behavioural rather than signature-based.',
          fr: 'La propriété définissante est l’absence de connaissance. C’est pourquoi les défenses sont comportementales plutôt que fondées sur des signatures.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It is a known vulnerability that has not been patched yet',
          fr: 'C’est une vulnérabilité connue qui n’a pas encore été corrigée',
        },
        correct: false,
        explanation: {
          en: 'This is the misuse the word attracts. A flaw known for six months and left open is a patch management failure, not a zero-day.',
          fr: 'C’est l’usage abusif que le terme attire. Une faille connue depuis six mois et laissée ouverte est un défaut de gestion des correctifs, pas un jour zéro.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It only affects software released in the last year',
          fr: 'Elle ne touche que les logiciels publiés dans l’année écoulée',
        },
        correct: false,
        explanation: {
          en: 'Age has nothing to do with it. A zero-day can be found in code that has been running untouched for two decades.',
          fr: 'L’ancienneté n’y est pour rien. Un jour zéro peut être découvert dans du code qui tourne inchangé depuis vingt ans.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It can be mitigated by applying vendor patches promptly',
          fr: 'Elle s’atténue en appliquant rapidement les correctifs de l’éditeur',
        },
        correct: false,
        explanation: {
          en: 'There is no patch to apply — that is the whole problem. Prompt patching is excellent practice and irrelevant to this specific case.',
          fr: 'Il n’y a aucun correctif à appliquer : c’est tout le problème. Corriger vite est une excellente pratique, et sans effet sur ce cas précis.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-004',
    objective: '2.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'How should an organisation reduce its exposure to zero-day exploitation?',
      fr: 'Comment une organisation doit-elle réduire son exposition à l’exploitation d’un jour zéro ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Behavioural detection, segmentation and least privilege',
          fr: 'Détection comportementale, segmentation et moindre privilège',
        },
        correct: true,
        explanation: {
          en: 'None of these needs prior knowledge of the flaw. They limit what an unknown exploit can reach and notice it by what it does rather than by what it is.',
          fr: 'Aucun de ces contrôles n’exige de connaître la faille au préalable. Ils limitent ce qu’une exploitation inconnue peut atteindre et la repèrent par son comportement plutôt que par son identité.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Shorten the patching window',
          fr: 'Raccourcir le délai d’application des correctifs',
        },
        correct: false,
        explanation: {
          en: 'Worth doing for everything else, and useless here: there is no patch. Answering with patching is the reflex this question exists to break.',
          fr: 'Utile pour tout le reste, et sans effet ici : il n’y a pas de correctif. Répondre par les correctifs est le réflexe que cette question cherche à casser.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Update antivirus signatures more often',
          fr: 'Mettre à jour les signatures antivirus plus souvent',
        },
        correct: false,
        explanation: {
          en: 'A signature can only exist for something already seen. Frequency does not help against a thing nobody has described yet.',
          fr: 'Une signature ne peut exister que pour ce qui a déjà été observé. La fréquence n’aide en rien contre ce que personne n’a encore décrit.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Run more frequent vulnerability scans',
          fr: 'Lancer des scans de vulnérabilité plus fréquents',
        },
        correct: false,
        explanation: {
          en: 'Scanners test for known vulnerabilities from a database. They are blind to the one that is not in it.',
          fr: 'Les scanners recherchent des vulnérabilités connues issues d’une base. Ils sont aveugles à celle qui n’y figure pas.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-005',
    objective: '2.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'What is the difference between SQL injection and cross-site scripting?',
      fr: 'Quelle est la différence entre l’injection SQL et le script intersites ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Injection reaches the database; XSS reaches another user’s browser',
          fr: 'L’injection atteint la base de données ; le XSS atteint le navigateur d’un autre utilisateur',
        },
        correct: true,
        explanation: {
          en: 'Both are unvalidated input, and the target is what separates them. One aims at the server’s data, the other at a victim’s session.',
          fr: 'Les deux sont des saisies non validées, et c’est la cible qui les sépare. L’une vise les données du serveur, l’autre la session d’une victime.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Injection is a web vulnerability; XSS is an application vulnerability',
          fr: 'L’injection est une vulnérabilité web ; le XSS une vulnérabilité applicative',
        },
        correct: false,
        explanation: {
          en: 'Both are listed under web-based, and both are also application flaws. The categories do not split along that line.',
          fr: 'Les deux relèvent des vulnérabilités web, et les deux sont aussi des défauts applicatifs. Les catégories ne se séparent pas selon cette ligne.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Injection requires authentication; XSS does not',
          fr: 'L’injection exige une authentification ; le XSS non',
        },
        correct: false,
        explanation: {
          en: 'Neither requires it. Unauthenticated SQL injection on a public search form is among the most common findings there is.',
          fr: 'Aucune des deux ne l’exige. Une injection SQL non authentifiée sur un formulaire de recherche public est l’un des constats les plus fréquents.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Injection is detectable by scanners; XSS is not',
          fr: 'L’injection est détectable par les scanners ; le XSS non',
        },
        correct: false,
        explanation: {
          en: 'Both are routinely found by scanners. Detectability is a property of the tool, not a way to tell two vulnerability classes apart.',
          fr: 'Les deux sont couramment trouvées par les scanners. La détectabilité est une propriété de l’outil, pas un moyen de distinguer deux classes de vulnérabilités.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-006',
    objective: '2.3',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'A manufacturer announces that a router model is end-of-life. Your organisation still runs forty of them. Which statement is accurate?',
      fr: 'Un fabricant annonce qu’un modèle de routeur est en fin de vie. Ton organisation en exploite encore quarante. Quel énoncé est exact ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'They are end-of-life for the manufacturer and legacy for you',
          fr: 'Ils sont en fin de vie pour le fabricant et hérités pour toi',
        },
        correct: true,
        explanation: {
          en: 'The two words describe different parties. End-of-life is the vendor’s position; legacy is yours, and it only applies because you are still running them.',
          fr: 'Les deux termes décrivent des parties différentes. La fin de vie est la position du fournisseur ; « hérité » est la tienne, et ne s’applique que parce que tu les exploites encore.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'They are legacy only once they stop working',
          fr: 'Ils ne deviennent hérités qu’une fois hors service',
        },
        correct: false,
        explanation: {
          en: 'Legacy means unmaintained but in service. A device that has stopped working is decommissioned, not legacy.',
          fr: '« Hérité » signifie non maintenu mais en service. Un équipement hors service est démantelé, pas hérité.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The two terms mean the same thing',
          fr: 'Les deux termes signifient la même chose',
        },
        correct: false,
        explanation: {
          en: 'They are listed separately for a reason. A model can be end-of-life worldwide and legacy nowhere, if nobody kept one.',
          fr: 'Ils sont listés séparément pour une raison. Un modèle peut être en fin de vie partout et hérité nulle part, si personne n’en a conservé.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'End-of-life means a final security patch is guaranteed',
          fr: 'La fin de vie garantit un dernier correctif de sécurité',
        },
        correct: false,
        explanation: {
          en: 'Nothing is guaranteed. End-of-life is precisely the announcement that support, including patches, is ending.',
          fr: 'Rien n’est garanti. La fin de vie est précisément l’annonce que le support, correctifs compris, s’arrête.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-007',
    objective: '2.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A tenant on a shared hypervisor manages to run code on the host and then reach another tenant’s virtual machine. Which vulnerability?',
      fr: 'Un locataire sur un hyperviseur partagé parvient à exécuter du code sur l’hôte puis à atteindre la machine virtuelle d’un autre locataire. Quelle vulnérabilité ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'VM escape', fr: 'Une évasion de machine virtuelle (VM escape)' },
        correct: true,
        explanation: {
          en: 'Breaking out of a guest to the hypervisor is exactly VM escape, and it is the most severe item in this objective because it destroys the boundary multi-tenancy depends on.',
          fr: 'Sortir d’une machine invitée vers l’hyperviseur est exactement l’évasion de machine virtuelle, et c’est l’élément le plus grave de cet objectif : elle détruit la frontière dont dépend la mutualisation.',
        },
      },
      {
        id: 'b',
        text: { en: 'Resource reuse', fr: 'Une réutilisation de ressources (resource reuse)' },
        correct: false,
        explanation: {
          en: 'Resource reuse is passive: memory or disk handed to a new tenant without being wiped. Here the attacker actively broke a boundary.',
          fr: 'La réutilisation de ressources est passive : de la mémoire ou du disque remis à un nouveau locataire sans effacement. Ici l’attaquant a activement franchi une frontière.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A cloud-specific vulnerability',
          fr: 'Une vulnérabilité spécifique au nuage',
        },
        correct: false,
        explanation: {
          en: 'The scenario is virtualization, which exists just as much in a private data centre. The objective names VM escape precisely so this is not answered generically.',
          fr: 'Le scénario relève de la virtualisation, qui existe tout autant dans un centre de données privé. L’objectif nomme l’évasion de machine virtuelle précisément pour éviter une réponse générique.',
        },
      },
      {
        id: 'd',
        text: { en: 'Misconfiguration', fr: 'Une mauvaise configuration' },
        correct: false,
        explanation: {
          en: 'Escaping a hypervisor requires a defect in the hypervisor. A setting alone is not supposed to make that possible.',
          fr: 'S’évader d’un hyperviseur exige un défaut dans l’hyperviseur. Un simple réglage n’est pas censé le rendre possible.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-008',
    objective: '2.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is sideloading, in the mobile device context?',
      fr: 'Qu’est-ce que l’installation hors magasin (sideloading), dans le contexte mobile ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Installing an application from outside the official app store',
          fr: 'Installer une application en dehors du magasin officiel',
        },
        correct: true,
        explanation: {
          en: 'It bypasses the store’s review, which is the control the platform relies on to keep malicious applications out.',
          fr: 'Cela contourne l’examen du magasin, qui est le contrôle sur lequel la plateforme compte pour écarter les applications malveillantes.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Removing the platform’s built-in restrictions',
          fr: 'Retirer les restrictions intégrées de la plateforme',
        },
        correct: false,
        explanation: {
          en: 'That is jailbreaking, the other listed mobile vulnerability. It goes further: it disables protections rather than routing around one of them.',
          fr: 'C’est le débridage, l’autre vulnérabilité mobile listée. Il va plus loin : il désactive des protections au lieu d’en contourner une.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Running an application on an emulator',
          fr: 'Exécuter une application dans un émulateur',
        },
        correct: false,
        explanation: {
          en: 'Emulation is a development and testing technique. It is not one of the vulnerabilities this objective lists.',
          fr: 'L’émulation est une technique de développement et de test. Elle ne figure pas parmi les vulnérabilités listées par cet objectif.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Transferring data between two phones',
          fr: 'Transférer des données entre deux téléphones',
        },
        correct: false,
        explanation: {
          en: 'That is a data transfer, not an installation path. Nothing about it bypasses a review process.',
          fr: 'C’est un transfert de données, pas un canal d’installation. Rien là-dedans ne contourne un processus d’examen.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-009',
    objective: '2.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An audit finds an internal service still negotiating a deprecated protocol version with known weaknesses, despite the software being current. Which family?',
      fr: 'Un audit constate qu’un service interne négocie encore une version de protocole obsolète aux faiblesses connues, alors que le logiciel est à jour. Quelle famille ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Cryptographic', fr: 'Cryptographique (cryptographic)' },
        correct: true,
        explanation: {
          en: 'A weak algorithm or protocol version in use is a cryptographic vulnerability, and it survives patching because the weak option is still offered rather than broken.',
          fr: 'Un algorithme ou une version de protocole faible en usage est une vulnérabilité cryptographique, et elle survit aux correctifs parce que l’option faible reste proposée plutôt que cassée.',
        },
      },
      {
        id: 'b',
        text: { en: 'Operating system-based', fr: 'Liée au système d’exploitation' },
        correct: false,
        explanation: {
          en: 'The stem says the software is current, so there is no unpatched OS defect. What is wrong is which cipher suite is accepted.',
          fr: 'L’énoncé précise que le logiciel est à jour : il n’y a pas de défaut système non corrigé. Ce qui cloche est la suite cryptographique acceptée.',
        },
      },
      {
        id: 'c',
        text: { en: 'Zero-day', fr: 'Jour zéro' },
        correct: false,
        explanation: {
          en: 'The weaknesses are described as known. A zero-day is defined by nobody knowing, which is the opposite of an audit finding.',
          fr: 'Les faiblesses sont décrites comme connues. Un jour zéro se définit par l’ignorance générale, contraire d’un constat d’audit.',
        },
      },
      {
        id: 'd',
        text: { en: 'Supply chain', fr: 'Chaîne d’approvisionnement' },
        correct: false,
        explanation: {
          en: 'Nothing arrived compromised. The vendor shipped a product that supports both strong and weak options, and the weak one is enabled.',
          fr: 'Rien n’est arrivé compromis. L’éditeur a livré un produit qui prend en charge des options fortes et faibles, et la faible est activée.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-010',
    objective: '2.3',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is a buffer overflow?',
      fr: 'Qu’est-ce qu’un débordement de tampon ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Writing more data than the allocated memory region can hold',
          fr: 'Écrire plus de données que la zone mémoire allouée ne peut en contenir',
        },
        correct: true,
        explanation: {
          en: 'The excess spills into adjacent memory, which is what an attacker uses to overwrite something that changes execution.',
          fr: 'L’excédent déborde sur la mémoire adjacente, ce dont l’attaquant se sert pour écraser un élément qui modifie l’exécution.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Sending more requests than a server can process',
          fr: 'Envoyer plus de requêtes qu’un serveur ne peut en traiter',
        },
        correct: false,
        explanation: {
          en: 'That is a denial of service, an availability attack. It exhausts capacity rather than corrupting memory.',
          fr: 'C’est un déni de service, une attaque sur la disponibilité. Il épuise une capacité au lieu de corrompre la mémoire.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Storing more records than a database schema allows',
          fr: 'Stocker plus d’enregistrements que le schéma d’une base ne l’autorise',
        },
        correct: false,
        explanation: {
          en: 'A database would reject or grow. Nothing here concerns a process’s memory layout, which is where the vulnerability lives.',
          fr: 'Une base rejetterait ou s’agrandirait. Rien ici ne concerne l’agencement mémoire d’un processus, où réside la vulnérabilité.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Two processes writing to the same file at once',
          fr: 'Deux processus écrivant simultanément dans le même fichier',
        },
        correct: false,
        explanation: {
          en: 'That is closer to a race condition. Concurrency and memory bounds are two different classes of defect.',
          fr: 'Cela se rapproche d’une situation de compétition. Concurrence et bornes mémoire sont deux classes de défauts distinctes.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-011',
    objective: '2.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A cloud provider reallocates block storage from a terminated instance to a new customer without wiping it, and the new customer recovers readable fragments. Which vulnerability?',
      fr: 'Un fournisseur de nuage réattribue le stockage bloc d’une instance supprimée à un nouveau client sans l’effacer, et ce client récupère des fragments lisibles. Quelle vulnérabilité ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Resource reuse', fr: 'Une réutilisation de ressources (resource reuse)' },
        correct: true,
        explanation: {
          en: 'Memory or storage handed on without being cleared is exactly what resource reuse names, and it is why providers guarantee wiping between tenants.',
          fr: 'De la mémoire ou du stockage transmis sans effacement est exactement ce que désigne la réutilisation de ressources, et c’est pourquoi les fournisseurs garantissent un effacement entre locataires.',
        },
      },
      {
        id: 'b',
        text: { en: 'VM escape', fr: 'Une évasion de machine virtuelle' },
        correct: false,
        explanation: {
          en: 'Nobody broke out of anything. The data was handed over by the platform through a normal allocation.',
          fr: 'Personne ne s’est évadé de quoi que ce soit. Les données ont été remises par la plateforme via une allocation normale.',
        },
      },
      {
        id: 'c',
        text: { en: 'Misconfiguration', fr: 'Une mauvaise configuration' },
        correct: false,
        explanation: {
          en: 'A defensible reading if a wipe setting was disabled, but the objective names this failure mode specifically, which makes the specific term the better answer.',
          fr: 'Lecture défendable si une option d’effacement était désactivée, mais l’objectif nomme spécifiquement ce mode de défaillance, ce qui rend le terme précis meilleur.',
        },
      },
      {
        id: 'd',
        text: { en: 'A cryptographic vulnerability', fr: 'Une vulnérabilité cryptographique' },
        correct: false,
        explanation: {
          en: 'No cipher was broken. Had the volume been encrypted with a key destroyed at termination, the fragments would have been unreadable — which is the mitigation, not the flaw.',
          fr: 'Aucun chiffrement n’a été cassé. Si le volume avait été chiffré avec une clé détruite à la suppression, les fragments seraient illisibles — c’est l’atténuation, pas le défaut.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-012',
    objective: '2.3',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Why is firmware a distinct hardware vulnerability rather than an operating system one?',
      fr: 'Pourquoi le micrologiciel constitue-t-il une vulnérabilité matérielle distincte plutôt que système ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It runs beneath the operating system and is rarely updated',
          fr: 'Il s’exécute sous le système d’exploitation et est rarement mis à jour',
        },
        correct: true,
        explanation: {
          en: 'Compromised firmware survives an OS reinstall and is invisible to tools running above it. Being seldom patched is what makes it stay vulnerable for years.',
          fr: 'Un micrologiciel compromis survit à une réinstallation du système et reste invisible aux outils qui s’exécutent au-dessus. Sa mise à jour rare le laisse vulnérable des années.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It cannot be updated at all',
          fr: 'Il ne peut pas du tout être mis à jour',
        },
        correct: false,
        explanation: {
          en: 'Most firmware can be updated. The problem is that it usually is not, because the process is manual and risky.',
          fr: 'La plupart des micrologiciels peuvent être mis à jour. Le problème est qu’ils ne le sont généralement pas, car l’opération est manuelle et risquée.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It only exists on end-of-life devices',
          fr: 'Il n’existe que sur les équipements en fin de vie',
        },
        correct: false,
        explanation: {
          en: 'Every device with a processor has firmware, including one bought this morning.',
          fr: 'Tout équipement doté d’un processeur possède un micrologiciel, y compris celui acheté ce matin.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It is always written by a third party',
          fr: 'Il est toujours écrit par un tiers',
        },
        correct: false,
        explanation: {
          en: 'Often true, and it is a supply chain concern rather than what puts firmware in the hardware category. Its position in the stack is the reason.',
          fr: 'Souvent vrai, et cela relève de la chaîne d’approvisionnement plutôt que de ce qui range le micrologiciel dans le matériel. La raison est sa position dans la pile.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-013',
    objective: '2.3',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A company assumes its cloud provider backs up the data in a managed database. The provider’s model makes that the customer’s responsibility. Data is lost. Which family?',
      fr: 'Une entreprise suppose que son fournisseur de nuage sauvegarde les données d’une base managée. Le modèle du fournisseur en fait la responsabilité du client. Des données sont perdues. Quelle famille ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A cloud-specific vulnerability',
          fr: 'Une vulnérabilité spécifique au nuage',
        },
        correct: true,
        explanation: {
          en: 'Misunderstanding the shared responsibility model is the cloud-specific failure the objective names. Nothing was misconfigured; a duty was never picked up.',
          fr: 'Mal comprendre le modèle de responsabilité partagée est la défaillance spécifique au nuage que nomme l’objectif. Rien n’était mal configuré ; une obligation n’a jamais été assumée.',
        },
      },
      {
        id: 'b',
        text: { en: 'Misconfiguration', fr: 'Une mauvaise configuration' },
        correct: false,
        explanation: {
          en: 'The closest distractor, and it fails on a detail: no setting was wrong. Nobody set anything, because nobody believed it was theirs to set.',
          fr: 'Le distracteur le plus proche, et il achoppe sur un détail : aucun réglage n’était faux. Personne n’a rien réglé, parce que personne ne croyait devoir le faire.',
        },
      },
      {
        id: 'c',
        text: { en: 'Supply chain', fr: 'Chaîne d’approvisionnement' },
        correct: false,
        explanation: {
          en: 'The provider delivered exactly what it promised. Supply chain means something arrived compromised, which is not what happened.',
          fr: 'Le fournisseur a livré exactement ce qu’il avait promis. La chaîne d’approvisionnement suppose une livraison compromise, ce qui n’est pas le cas.',
        },
      },
      {
        id: 'd',
        text: { en: 'An application vulnerability', fr: 'Une vulnérabilité applicative' },
        correct: false,
        explanation: {
          en: 'No code is defective. The gap is contractual and organisational, sitting between two parties rather than inside a program.',
          fr: 'Aucun code n’est défectueux. L’écart est contractuel et organisationnel, situé entre deux parties plutôt que dans un programme.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-014',
    objective: '2.3',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which single test most reliably separates misconfiguration from the other vulnerability families?',
      fr: 'Quel test unique sépare le plus fiablement la mauvaise configuration des autres familles de vulnérabilités ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Whether a patch could fix it',
          fr: 'La question de savoir si un correctif pourrait la corriger',
        },
        correct: true,
        explanation: {
          en: 'Misconfiguration has no patch because the software is working as designed. The remedy is hardening and configuration enforcement, which is a different activity entirely.',
          fr: 'La mauvaise configuration n’a pas de correctif, car le logiciel fonctionne comme prévu. Le remède est le durcissement et l’application de configuration, une activité tout autre.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Whether it is internet-facing',
          fr: 'La question de savoir si elle est exposée sur Internet',
        },
        correct: false,
        explanation: {
          en: 'Exposure changes severity, not category. An internal misconfiguration is still a misconfiguration.',
          fr: 'L’exposition modifie la gravité, pas la catégorie. Une mauvaise configuration interne reste une mauvaise configuration.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Whether a scanner detects it',
          fr: 'La question de savoir si un scanner la détecte',
        },
        correct: false,
        explanation: {
          en: 'Scanners find both misconfigurations and software vulnerabilities. Detectability does not sort them.',
          fr: 'Les scanners trouvent aussi bien des mauvaises configurations que des vulnérabilités logicielles. La détectabilité ne les trie pas.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Whether it was exploited',
          fr: 'La question de savoir si elle a été exploitée',
        },
        correct: false,
        explanation: {
          en: 'Exploitation is history, not classification. A vulnerability belongs to its family whether or not anyone used it.',
          fr: 'L’exploitation est un fait passé, pas une classification. Une vulnérabilité appartient à sa famille, qu’on s’en soit servi ou non.',
        },
      },
    ],
  },

  {
    id: 'q-2-3-015',
    objective: '2.3',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A web application returns full database error text to the browser, including table names, whenever a query fails. Which families does this finding touch? (Select all that apply.)',
      fr: 'Une application web renvoie au navigateur le texte complet des erreurs de base de données, noms de tables compris, à chaque échec de requête. Quelles familles ce constat touche-t-il ? (Sélectionne toutes les réponses correctes.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: {
          en: 'Misconfiguration — verbose errors are enabled in production',
          fr: 'Mauvaise configuration — les erreurs détaillées sont activées en production',
        },
        correct: true,
        explanation: {
          en: 'Detailed error output is a development setting that was never turned off. Nothing needs patching; a switch is in the wrong position.',
          fr: 'L’affichage détaillé des erreurs est un réglage de développement jamais désactivé. Rien à corriger : un interrupteur est dans la mauvaise position.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Web-based — the leak helps an attacker construct an injection',
          fr: 'Web — la fuite aide un attaquant à construire une injection',
        },
        correct: true,
        explanation: {
          en: 'Returning schema detail to an untrusted client is a web application weakness in its own right, and it is the standard reconnaissance step before SQL injection.',
          fr: 'Renvoyer des détails de schéma à un client non fiable est en soi une faiblesse applicative web, et c’est l’étape de reconnaissance classique avant une injection SQL.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Zero-day — the behaviour was previously unknown',
          fr: 'Jour zéro — le comportement était jusque-là inconnu',
        },
        correct: false,
        explanation: {
          en: 'Being newly noticed by you is not the same as being unknown to the world. Verbose error disclosure is one of the oldest documented weaknesses there is.',
          fr: 'Le fait que tu viennes de le remarquer ne signifie pas que le monde l’ignore. La divulgation d’erreurs détaillées est l’une des faiblesses documentées les plus anciennes.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Hardware — the database server is affected',
          fr: 'Matériel — le serveur de base de données est concerné',
        },
        correct: false,
        explanation: {
          en: 'A server being involved does not make a finding a hardware vulnerability. Hardware means firmware, end-of-life or legacy equipment.',
          fr: 'Qu’un serveur soit impliqué ne fait pas d’un constat une vulnérabilité matérielle. Le matériel désigne le micrologiciel, la fin de vie ou les équipements hérités.',
        },
      },
    ],
  },
];
