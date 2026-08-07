import type { Question } from '@/content/schemas';

/**
 * Objective 2.2 — Explain common threat vectors and attack surfaces.
 *
 * Every question is **original**, written from the published objective. None reproduces,
 * paraphrases, or reconstructs any real exam item — see NOTICE.md.
 *
 * Two failure modes drive the distractor design. Answering with the payload instead of the path
 * ("ransomware" for "how did it get in"), and collapsing the three levels of phishing targeting into
 * one. Both appear as plausible options rather than as absent ones, because recognising them is the
 * skill being tested.
 */
export const QUESTIONS_2_2: Question[] = [
  {
    id: 'q-2-2-001',
    objective: '2.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An air-gapped industrial system is infected. It has no network connection of any kind. Which vector is most likely?',
      fr: 'Un système industriel isolé du réseau est infecté. Il n’a aucune connexion réseau. Quel vecteur est le plus probable ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A removable device', fr: 'Un support amovible (removable device)' },
        correct: true,
        explanation: {
          en: 'With no network, a physical carrier is the only path in. This is exactly why removable media is the vector of choice against isolated systems.',
          fr: 'Sans réseau, un support physique est le seul chemin d’entrée. C’est précisément pourquoi le support amovible est le vecteur de choix contre les systèmes isolés.',
        },
      },
      {
        id: 'b',
        text: { en: 'A message-based vector', fr: 'Un vecteur par message' },
        correct: false,
        explanation: {
          en: 'Email and messaging need a network. An air-gapped system by definition has none, so no message can reach it.',
          fr: 'Le courriel et la messagerie exigent un réseau. Un système isolé n’en a par définition aucun : aucun message ne peut l’atteindre.',
        },
      },
      {
        id: 'c',
        text: { en: 'An open service port', fr: 'Un port de service ouvert' },
        correct: false,
        explanation: {
          en: 'A listening port is only reachable over a network. On an air-gapped machine it is a door onto nothing.',
          fr: 'Un port à l’écoute n’est atteignable que par le réseau. Sur une machine isolée, c’est une porte qui ne donne sur rien.',
        },
      },
      {
        id: 'd',
        text: { en: 'An unsecure wireless network', fr: 'Un réseau sans fil non sécurisé' },
        correct: false,
        explanation: {
          en: 'This is the closest distractor, because wireless is easy to forget when auditing an air gap — but the stem says no connection of any kind.',
          fr: 'C’est le distracteur le plus proche, car le sans-fil s’oublie facilement lors de l’audit d’une isolation — mais l’énoncé précise aucune connexion d’aucune sorte.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-002',
    objective: '2.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'What is the difference between an attack surface and a threat vector?',
      fr: 'Quelle est la différence entre une surface d’attaque et un vecteur de menace ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The surface is every available path; the vector is the one that was used',
          fr: 'La surface est l’ensemble des chemins disponibles ; le vecteur est celui qui a été emprunté',
        },
        correct: true,
        explanation: {
          en: 'The distinction drives the response: closing a port removes a path from the surface, while filtering traffic defends a vector and leaves the path in place.',
          fr: 'La distinction commande la réponse : fermer un port retire un chemin de la surface, alors que filtrer le trafic défend un vecteur en laissant le chemin en place.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The surface is external; the vector is internal',
          fr: 'La surface est externe ; le vecteur est interne',
        },
        correct: false,
        explanation: {
          en: 'Neither term has a position. An internal system has an attack surface, and an insider uses a vector like anyone else.',
          fr: 'Aucun des deux termes n’implique une position. Un système interne a une surface d’attaque, et un interne emprunte un vecteur comme tout le monde.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The surface is technical; the vector is human',
          fr: 'La surface est technique ; le vecteur est humain',
        },
        correct: false,
        explanation: {
          en: 'Human vectors are one category among twelve, and people are part of the attack surface too. The split is not technical versus human.',
          fr: 'Les vecteurs humains sont une catégorie parmi douze, et les personnes font aussi partie de la surface d’attaque. La distinction n’est pas technique contre humain.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'They are two names for the same idea',
          fr: 'Ce sont deux noms pour la même idée',
        },
        correct: false,
        explanation: {
          en: 'If they were, "reduce the attack surface" and "defend the vector" would be the same advice, and they lead to opposite engineering decisions.',
          fr: 'Si c’était le cas, « réduire la surface d’attaque » et « défendre le vecteur » seraient le même conseil, alors qu’ils mènent à des décisions techniques opposées.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-003',
    objective: '2.2',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A monitoring agent, correctly signed by its vendor and installed through the normal update channel, turns out to contain a backdoor. Which vector?',
      fr: 'Un agent de supervision, correctement signé par son éditeur et installé par le canal de mise à jour normal, s’avère contenir une porte dérobée. Quel vecteur ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'The supply chain', fr: 'La chaîne d’approvisionnement (supply chain)' },
        correct: true,
        explanation: {
          en: 'The compromise happened upstream, before delivery. The signature is genuine and every control says yes, which is exactly what makes this vector so hard to stop.',
          fr: 'La compromission a eu lieu en amont, avant la livraison. La signature est authentique et tous les contrôles disent oui : c’est précisément ce qui rend ce vecteur si difficile à arrêter.',
        },
      },
      {
        id: 'b',
        text: { en: 'Vulnerable software', fr: 'Un logiciel vulnérable' },
        correct: false,
        explanation: {
          en: 'A vulnerability is an accidental flaw. A backdoor placed before shipping is deliberate, and patching the vendor’s next release would not have prevented it.',
          fr: 'Une vulnérabilité est un défaut accidentel. Une porte dérobée placée avant l’expédition est délibérée, et corriger la version suivante de l’éditeur ne l’aurait pas empêchée.',
        },
      },
      {
        id: 'c',
        text: { en: 'A file-based vector', fr: 'Un vecteur par fichier' },
        correct: false,
        explanation: {
          en: 'Technically a file arrived, but this describes any software installation. The category that captures what actually failed is trust in the supplier.',
          fr: 'Techniquement un fichier est arrivé, mais cela décrit toute installation logicielle. La catégorie qui capture ce qui a réellement échoué est la confiance dans le fournisseur.',
        },
      },
      {
        id: 'd',
        text: { en: 'Default credentials', fr: 'Des identifiants par défaut' },
        correct: false,
        explanation: {
          en: 'No credential is involved. The attacker did not authenticate to anything; the code was already inside.',
          fr: 'Aucun identifiant n’intervient. L’attaquant ne s’est authentifié nulle part : le code était déjà à l’intérieur.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-004',
    objective: '2.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'An email addresses the recipient by name, references a real project they lead and a colleague they work with. Which technique?',
      fr: 'Un courriel s’adresse au destinataire par son nom, cite un projet réel qu’il dirige et un collègue avec qui il travaille. Quelle technique ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Spear phishing', fr: 'Le harponnage (spear phishing)' },
        correct: true,
        explanation: {
          en: 'The research is the distinguishing feature. Spear phishing targets one person and invests in knowing them, which is what makes it credible.',
          fr: 'Le travail de renseignement est le trait distinctif. Le harponnage vise une personne et investit pour la connaître, ce qui le rend crédible.',
        },
      },
      {
        id: 'b',
        text: { en: 'Phishing', fr: 'Le hameçonnage (phishing)' },
        correct: false,
        explanation: {
          en: 'Plain phishing is a mass message that cannot afford per-recipient detail. Personal specifics are precisely what separates the two.',
          fr: 'Le hameçonnage simple est un message de masse qui ne peut pas se permettre de détail par destinataire. Les précisions personnelles sont justement ce qui les distingue.',
        },
      },
      {
        id: 'c',
        text: { en: 'Whaling', fr: 'La chasse à la baleine (whaling)' },
        correct: false,
        explanation: {
          en: 'Whaling is spear phishing aimed at an executive. Leading a project does not make someone an executive, so the stem does not support it.',
          fr: 'La chasse à la baleine est un harponnage visant un dirigeant. Diriger un projet ne fait pas de quelqu’un un dirigeant : l’énoncé ne le permet pas.',
        },
      },
      {
        id: 'd',
        text: { en: 'A watering hole attack', fr: 'Une attaque par point d’eau' },
        correct: false,
        explanation: {
          en: 'A watering hole compromises a site the target visits. Nothing here involves a website; the message comes directly to them.',
          fr: 'Une attaque par point d’eau compromet un site que la cible visite. Rien ici ne concerne un site web : le message lui parvient directement.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-005',
    objective: '2.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which action reduces the attack surface rather than defending a vector?',
      fr: 'Quelle action réduit la surface d’attaque plutôt que de défendre un vecteur ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Disabling an unused network service',
          fr: 'Désactiver un service réseau inutilisé',
        },
        correct: true,
        explanation: {
          en: 'The listening port stops existing, so there is nothing left to attack or to maintain a defence for. Surface reduction is structural and permanent.',
          fr: 'Le port à l’écoute cesse d’exister : il n’y a plus rien à attaquer ni de défense à maintenir. La réduction de surface est structurelle et durable.',
        },
      },
      {
        id: 'b',
        text: { en: 'Adding a spam filter', fr: 'Ajouter un filtre antipourriel' },
        correct: false,
        explanation: {
          en: 'Email still arrives; a guard has been placed on an open door. That is vector defence, and it has to be maintained indefinitely.',
          fr: 'Le courriel continue d’arriver ; on a posté un garde devant une porte ouverte. C’est de la défense de vecteur, à maintenir indéfiniment.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Training staff to recognise phishing',
          fr: 'Former le personnel à reconnaître le hameçonnage',
        },
        correct: false,
        explanation: {
          en: 'Valuable, and still vector defence: the human vector remains open and the training has to be repeated as people join and forget.',
          fr: 'Utile, et cela reste de la défense de vecteur : le vecteur humain reste ouvert et la formation doit être répétée au fil des arrivées et des oublis.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Monitoring outbound traffic',
          fr: 'Surveiller le trafic sortant',
        },
        correct: false,
        explanation: {
          en: 'Monitoring detects use of a path without removing it. It is a detective control, not a reduction of anything.',
          fr: 'La surveillance détecte l’usage d’un chemin sans le supprimer. C’est un contrôle détectif, pas une réduction.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-006',
    objective: '2.2',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A well-defended engineering firm is breached after several of its staff visit a small industry forum they read daily, which had been compromised weeks earlier. Which technique?',
      fr: 'Un bureau d’études bien défendu est compromis après que plusieurs de ses salariés ont consulté un petit forum métier qu’ils lisent quotidiennement et qui avait été compromis des semaines plus tôt. Quelle technique ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A watering hole attack', fr: 'Une attaque par point d’eau (watering hole)' },
        correct: true,
        explanation: {
          en: 'The attacker never approached the target. They compromised somewhere the target goes and waited — the standard answer when the target itself is too well defended.',
          fr: 'L’attaquant n’a jamais approché la cible. Il a compromis un lieu que la cible fréquente et a attendu : la réponse type quand la cible elle-même est trop bien défendue.',
        },
      },
      {
        id: 'b',
        text: { en: 'Typosquatting', fr: 'Le typosquattage (typosquatting)' },
        correct: false,
        explanation: {
          en: 'Typosquatting relies on the victim mistyping a domain. Here they reached the site they meant to reach; the site itself was compromised.',
          fr: 'Le typosquattage repose sur une faute de frappe de la victime. Ici elle a bien atteint le site voulu ; c’est le site lui-même qui était compromis.',
        },
      },
      {
        id: 'c',
        text: { en: 'Brand impersonation', fr: 'L’usurpation de marque' },
        correct: false,
        explanation: {
          en: 'Nobody is pretending to be anyone. The forum is genuinely the forum — it is simply serving malicious content now.',
          fr: 'Personne ne se fait passer pour quelqu’un. Le forum est réellement le forum : il sert simplement du contenu malveillant désormais.',
        },
      },
      {
        id: 'd',
        text: { en: 'A supply chain attack', fr: 'Une attaque de la chaîne d’approvisionnement' },
        correct: false,
        explanation: {
          en: 'The forum supplies the firm with nothing. Supply chain means a compromised product or provider you depend on, not a site you happen to read.',
          fr: 'Le forum ne fournit rien à l’entreprise. La chaîne d’approvisionnement suppose un produit ou un prestataire dont on dépend, pas un site que l’on consulte.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-007',
    objective: '2.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which threat vector requires no technical skill at all and is among the most common?',
      fr: 'Quel vecteur de menace n’exige aucune compétence technique et compte parmi les plus fréquents ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Default credentials',
          fr: 'Les identifiants par défaut (default credentials)',
        },
        correct: true,
        explanation: {
          en: 'Typing the documented factory password is not an exploit. It stays common because devices ship with it and installation checklists rarely include changing it.',
          fr: 'Saisir le mot de passe d’usine documenté n’est pas une exploitation. Cela reste fréquent parce que les équipements sont livrés ainsi et que les procédures d’installation prévoient rarement de le changer.',
        },
      },
      {
        id: 'b',
        text: { en: 'A supply chain attack', fr: 'Une attaque de la chaîne d’approvisionnement' },
        correct: false,
        explanation: {
          en: 'Compromising a vendor’s build pipeline is one of the most demanding operations there is, which is why it is associated with well-resourced actors.',
          fr: 'Compromettre la chaîne de compilation d’un éditeur est l’une des opérations les plus exigeantes qui soient, d’où son association à des acteurs bien dotés.',
        },
      },
      {
        id: 'c',
        text: { en: 'An image-based vector', fr: 'Un vecteur par image' },
        correct: false,
        explanation: {
          en: 'Hiding an executable payload in an image and having it run requires real understanding of how the file is parsed.',
          fr: 'Dissimuler une charge exécutable dans une image et la faire s’exécuter demande une réelle compréhension de la façon dont le fichier est analysé.',
        },
      },
      {
        id: 'd',
        text: { en: 'Unsupported systems', fr: 'Les systèmes non pris en charge' },
        correct: false,
        explanation: {
          en: 'Exploiting one still means finding and weaponising a vulnerability. The system being unpatchable makes it worthwhile, not effortless.',
          fr: 'En exploiter un suppose encore de trouver et d’armer une vulnérabilité. L’impossibilité de corriger le système rend l’effort rentable, pas inutile.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-008',
    objective: '2.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A finance clerk receives an urgent call from someone claiming to be the chief financial officer, asking for an immediate transfer. Which vector, and which technique?',
      fr: 'Un comptable reçoit un appel urgent d’une personne se présentant comme le directeur financier, demandant un virement immédiat. Quel vecteur, et quelle technique ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A voice call vector, using impersonation',
          fr: 'Un vecteur par appel vocal, avec usurpation d’identité',
        },
        correct: true,
        explanation: {
          en: 'The channel is the vector and the pretence of being an authorised person is the technique. Voice adds pressure a written message cannot.',
          fr: 'Le canal est le vecteur et le fait de se faire passer pour une personne autorisée est la technique. La voix ajoute une pression qu’un message écrit ne produit pas.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A message-based vector, using phishing',
          fr: 'Un vecteur par message, avec hameçonnage',
        },
        correct: false,
        explanation: {
          en: 'No message was sent. The objective lists voice call as its own vector precisely because the channel changes the dynamics.',
          fr: 'Aucun message n’a été envoyé. L’objectif liste l’appel vocal comme vecteur distinct précisément parce que le canal change la dynamique.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A supply chain vector, using pretexting',
          fr: 'Un vecteur de chaîne d’approvisionnement, avec prétexte',
        },
        correct: false,
        explanation: {
          en: 'No supplier is involved. Pretexting is a defensible reading of the technique, but the vector named is simply wrong.',
          fr: 'Aucun fournisseur n’intervient. Le prétexte est une lecture défendable de la technique, mais le vecteur nommé est simplement faux.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A human vector, using typosquatting',
          fr: 'Un vecteur humain, avec typosquattage',
        },
        correct: false,
        explanation: {
          en: 'Typosquatting needs a domain name to be mistyped. There is no domain and no typing anywhere in this scenario.',
          fr: 'Le typosquattage suppose un nom de domaine mal saisi. Il n’y a ni domaine ni saisie dans ce scénario.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-009',
    objective: '2.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'What distinguishes an unsupported system from merely vulnerable software?',
      fr: 'Qu’est-ce qui distingue un système non pris en charge d’un simple logiciel vulnérable ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'No patch will ever exist for it',
          fr: 'Aucun correctif n’existera jamais pour lui',
        },
        correct: true,
        explanation: {
          en: 'Vulnerable software can be patched; unsupported software cannot, so the only responses left are isolation and compensating controls.',
          fr: 'Un logiciel vulnérable peut être corrigé ; un logiciel non pris en charge ne le peut pas, et il ne reste que l’isolation et les contrôles compensatoires.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It has more vulnerabilities',
          fr: 'Il comporte davantage de vulnérabilités',
        },
        correct: false,
        explanation: {
          en: 'Usually true over time, but it is a consequence rather than the definition. A system unsupported since yesterday has the same flaws it had yesterday.',
          fr: 'Généralement vrai avec le temps, mais c’est une conséquence, pas la définition. Un système non pris en charge depuis hier a les mêmes défauts qu’hier.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It is always internet-facing',
          fr: 'Il est toujours exposé sur Internet',
        },
        correct: false,
        explanation: {
          en: 'Exposure is a separate property. Most unsupported systems in practice are internal, which is what allows isolation to work.',
          fr: 'L’exposition est une propriété distincte. En pratique, la plupart des systèmes non pris en charge sont internes, ce qui rend l’isolation efficace.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It uses default credentials',
          fr: 'Il utilise des identifiants par défaut',
        },
        correct: false,
        explanation: {
          en: 'Unrelated. Default credentials are their own listed vector and can appear on a fully supported system.',
          fr: 'Sans rapport. Les identifiants par défaut constituent un vecteur listé à part et peuvent se trouver sur un système parfaitement pris en charge.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-010',
    objective: '2.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An attacker registers a domain differing from a bank’s by one transposed letter and hosts a copy of its login page. Which technique?',
      fr: 'Un attaquant enregistre un domaine qui ne diffère de celui d’une banque que par deux lettres inversées et y héberge une copie de sa page de connexion. Quelle technique ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Typosquatting', fr: 'Le typosquattage (typosquatting)' },
        correct: true,
        explanation: {
          en: 'It exploits a typing mistake in the domain name. The victim reaches the wrong site while believing they typed the right one.',
          fr: 'Il exploite une faute de frappe dans le nom de domaine. La victime atteint le mauvais site en croyant avoir saisi le bon.',
        },
      },
      {
        id: 'b',
        text: { en: 'A watering hole attack', fr: 'Une attaque par point d’eau' },
        correct: false,
        explanation: {
          en: 'A watering hole compromises a legitimate site. Here a new, illegitimate site was created; nothing of the bank’s was touched.',
          fr: 'Une attaque par point d’eau compromet un site légitime. Ici un site nouveau et illégitime a été créé ; rien appartenant à la banque n’a été touché.',
        },
      },
      {
        id: 'c',
        text: { en: 'Pretexting', fr: 'Le prétexte (pretexting)' },
        correct: false,
        explanation: {
          en: 'Pretexting is an invented story told to justify a request. No story is being told; a domain is simply waiting to be mistyped.',
          fr: 'Le prétexte est une histoire inventée pour justifier une demande. Aucune histoire n’est racontée : un domaine attend simplement une faute de frappe.',
        },
      },
      {
        id: 'd',
        text: { en: 'A supply chain attack', fr: 'Une attaque de la chaîne d’approvisionnement' },
        correct: false,
        explanation: {
          en: 'No supplier or product is compromised. This sits entirely between the victim and a domain name.',
          fr: 'Aucun fournisseur ni produit n’est compromis. Tout se joue entre la victime et un nom de domaine.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-011',
    objective: '2.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Whaling is best described as which of the following?',
      fr: 'Comment décrire au mieux la chasse à la baleine (whaling) ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Spear phishing aimed at a senior executive',
          fr: 'Un harponnage visant un cadre dirigeant',
        },
        correct: true,
        explanation: {
          en: 'Same technique, highest-value target. Executives are worth the research because they can authorise things nobody else can.',
          fr: 'Même technique, cible de plus grande valeur. Les dirigeants valent l’investissement en renseignement, car ils peuvent autoriser ce que personne d’autre ne peut.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Phishing sent to the largest possible number of recipients',
          fr: 'Un hameçonnage envoyé au plus grand nombre possible de destinataires',
        },
        correct: false,
        explanation: {
          en: 'That is ordinary phishing. Whaling is the opposite end of the scale: one carefully chosen person.',
          fr: 'C’est le hameçonnage ordinaire. La chasse à la baleine est à l’autre extrémité de l’échelle : une seule personne soigneusement choisie.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Phishing carried out over a voice call',
          fr: 'Un hameçonnage mené par appel vocal',
        },
        correct: false,
        explanation: {
          en: 'That is vishing, which names the channel. Whaling names who the target is, not how they are reached.',
          fr: 'C’est le vishing, qui désigne le canal. La chasse à la baleine désigne la cible, pas le moyen de l’atteindre.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Phishing that impersonates a well-known brand',
          fr: 'Un hameçonnage qui usurpe une marque connue',
        },
        correct: false,
        explanation: {
          en: 'That is brand impersonation, a separate listed technique. It describes what the message pretends to be, not who receives it.',
          fr: 'C’est l’usurpation de marque, une technique listée à part. Elle décrit ce que le message prétend être, pas qui le reçoit.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-012',
    objective: '2.2',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'An organisation asks how ransomware entered its network. Which of these is an acceptable answer?',
      fr: 'Une organisation demande par où un rançongiciel est entré dans son réseau. Laquelle de ces réponses est recevable ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Through an emailed attachment a user opened',
          fr: 'Par une pièce jointe reçue par courriel et ouverte par un utilisateur',
        },
        correct: true,
        explanation: {
          en: 'This names a path: a message-based vector carrying a file. "How did it get in" is answered by the door, not by what walked through it.',
          fr: 'Cela nomme un chemin : un vecteur par message transportant un fichier. « Par où est-ce entré » se répond par la porte, pas par ce qui l’a franchie.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Through ransomware',
          fr: 'Par un rançongiciel',
        },
        correct: false,
        explanation: {
          en: 'This restates the payload as if it were the path. It is the single most common error on this objective, which is why it appears here as an option.',
          fr: 'Cela reformule la charge utile comme si elle était le chemin. C’est l’erreur la plus fréquente de cet objectif, d’où sa présence comme option.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Through encryption of the file server',
          fr: 'Par le chiffrement du serveur de fichiers',
        },
        correct: false,
        explanation: {
          en: 'That is the impact, later still in the chain than the payload. It describes what happened after the attacker was already inside.',
          fr: 'C’est l’impact, encore plus tardif que la charge utile dans la chaîne. Cela décrit ce qui s’est produit une fois l’attaquant déjà à l’intérieur.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Through an organized crime group',
          fr: 'Par un groupe de crime organisé',
        },
        correct: false,
        explanation: {
          en: 'That names the actor, which is objective 2.1. Who did it and how they got in are different questions with different answers.',
          fr: 'Cela nomme l’acteur, ce qui relève de l’objectif 2.1. Qui l’a fait et par où il est entré sont deux questions distinctes.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-013',
    objective: '2.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Why is a compromised managed service provider particularly dangerous as a vector?',
      fr: 'Pourquoi un prestataire infogéré compromis est-il un vecteur particulièrement dangereux ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It already holds legitimate administrative access to your systems',
          fr: 'Il détient déjà un accès administrateur légitime à tes systèmes',
        },
        correct: true,
        explanation: {
          en: 'The attacker inherits privilege that was granted deliberately, so nothing looks anomalous. No perimeter is crossed and no exploit is needed.',
          fr: 'L’attaquant hérite d’un privilège accordé délibérément : rien ne paraît anormal. Aucun périmètre n’est franchi et aucune exploitation n’est nécessaire.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Providers use weaker encryption',
          fr: 'Les prestataires utilisent un chiffrement plus faible',
        },
        correct: false,
        explanation: {
          en: 'There is no such general rule, and it is not what the objective identifies as the risk. The risk is the access, not the cryptography.',
          fr: 'Aucune règle générale de ce type n’existe, et ce n’est pas le risque identifié par l’objectif. Le risque est l’accès, pas la cryptographie.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'They are always located abroad',
          fr: 'Ils sont toujours situés à l’étranger',
        },
        correct: false,
        explanation: {
          en: 'Location is a compliance question, not a security mechanism. A provider next door with the same access carries the same risk.',
          fr: 'La localisation est une question de conformité, pas un mécanisme de sécurité. Un prestataire voisin avec le même accès porte le même risque.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'They cannot be covered by a contract',
          fr: 'Ils ne peuvent pas être couverts par un contrat',
        },
        correct: false,
        explanation: {
          en: 'They routinely are, and contractual security requirements are a standard control. A contract simply does not stop a compromise that has already happened.',
          fr: 'Ils le sont couramment, et les exigences contractuelles de sécurité sont un contrôle standard. Un contrat n’arrête simplement pas une compromission déjà survenue.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-014',
    objective: '2.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A false claim about a company’s solvency is spread on social media to push its share price down. Which human vector does the objective name?',
      fr: 'Une fausse affirmation sur la solvabilité d’une entreprise est diffusée sur les réseaux sociaux pour faire chuter son cours de bourse. Quel vecteur humain l’objectif retient-il ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Misinformation and disinformation',
          fr: 'La mésinformation et la désinformation',
        },
        correct: true,
        explanation: {
          en: 'False information spread to steer a decision is listed as a human vector in its own right. Deliberate falsehood is disinformation specifically.',
          fr: 'Une fausse information diffusée pour orienter une décision est listée comme vecteur humain à part entière. Le mensonge délibéré relève spécifiquement de la désinformation.',
        },
      },
      {
        id: 'b',
        text: { en: 'Brand impersonation', fr: 'L’usurpation de marque' },
        correct: false,
        explanation: {
          en: 'Nobody is pretending to be the company. They are talking about it, which is a different relationship to the brand.',
          fr: 'Personne ne se fait passer pour l’entreprise. On parle d’elle, ce qui est une relation différente à la marque.',
        },
      },
      {
        id: 'c',
        text: { en: 'Pretexting', fr: 'Le prétexte (pretexting)' },
        correct: false,
        explanation: {
          en: 'Pretexting invents a story to justify a request made to a specific person. There is no request and no individual target here.',
          fr: 'Le prétexte invente une histoire pour justifier une demande adressée à une personne précise. Ici il n’y a ni demande ni cible individuelle.',
        },
      },
      {
        id: 'd',
        text: { en: 'Business email compromise', fr: 'La fraude au président' },
        correct: false,
        explanation: {
          en: 'That requires an email pretending to come from an authority figure inside the organisation. This is public, and it is not email.',
          fr: 'Cela suppose un courriel prétendant provenir d’une figure d’autorité interne. Ici c’est public, et ce n’est pas un courriel.',
        },
      },
    ],
  },

  {
    id: 'q-2-2-015',
    objective: '2.2',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A newly acquired subsidiary is being assessed. Which findings enlarge its attack surface? (Select all that apply.)',
      fr: 'Une filiale nouvellement acquise est en cours d’évaluation. Quels constats élargissent sa surface d’attaque ? (Sélectionne toutes les réponses correctes.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: {
          en: 'Forty listening ports open on internet-facing hosts',
          fr: 'Quarante ports à l’écoute ouverts sur des hôtes exposés à Internet',
        },
        correct: true,
        explanation: {
          en: 'Every listening port is a reachable path. This is the most literal enlargement of an attack surface there is.',
          fr: 'Chaque port à l’écoute est un chemin atteignable. C’est l’élargissement le plus littéral qui soit d’une surface d’attaque.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Two applications whose vendors stopped issuing patches',
          fr: 'Deux applications dont les éditeurs ne publient plus de correctifs',
        },
        correct: true,
        explanation: {
          en: 'Unsupported software is a permanent path that can never be closed by patching, only isolated. It is a listed vector for exactly that reason.',
          fr: 'Un logiciel non pris en charge est un chemin permanent qu’aucun correctif ne fermera jamais, seulement l’isolation. C’est précisément pourquoi il est listé comme vecteur.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A spam filter with an out-of-date rule set',
          fr: 'Un filtre antipourriel dont les règles ne sont plus à jour',
        },
        correct: false,
        explanation: {
          en: 'A weak defence on an existing vector, but the email path existed before and after. The surface is unchanged; only how well it is guarded changed.',
          fr: 'Une défense affaiblie sur un vecteur existant, mais le chemin du courriel existait avant comme après. La surface est inchangée ; seule la qualité de la garde a changé.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'No security awareness training in the last two years',
          fr: 'Aucune sensibilisation à la sécurité depuis deux ans',
        },
        correct: false,
        explanation: {
          en: 'The human vector is open whether or not training happened. Training changes the likelihood of it being used, not the existence of the path.',
          fr: 'Le vecteur humain est ouvert, formation ou non. La formation modifie la probabilité qu’il soit emprunté, pas l’existence du chemin.',
        },
      },
    ],
  },
];
