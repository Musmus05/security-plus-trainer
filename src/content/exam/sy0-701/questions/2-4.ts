import type { Question } from '@/content/schemas';

/**
 * Objective 2.4 — Given a scenario, analyze indicators of malicious activity.
 *
 * Every question is **original**, written from the published objective. None reproduces,
 * paraphrases, or reconstructs any real exam item — see NOTICE.md.
 *
 * This is the one scenario-phrased objective in the domain, so almost every stem here is an
 * observation rather than a definition: a log line, a count, a user complaint. The distractors are
 * attacks that would produce a *similar* observation but not the one described — brute force against
 * spraying, worm against virus — which is the discrimination the analyst actually has to make.
 */
export const QUESTIONS_2_4: Question[] = [
  {
    id: 'q-2-4-001',
    objective: '2.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'Authentication logs show exactly one failed attempt against each of eight hundred different accounts within four minutes. No account was locked out. Which attack?',
      fr: 'Les journaux d’authentification montrent exactement un échec sur chacun de huit cents comptes différents en quatre minutes. Aucun compte n’a été verrouillé. Quelle attaque ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Password spraying',
          fr: 'Une pulvérisation de mots de passe (password spraying)',
        },
        correct: true,
        explanation: {
          en: 'One attempt per account is deliberate: it stays under every lockout threshold. The breadth across accounts, not the depth on one, is the signature.',
          fr: 'Un seul essai par compte est délibéré : cela reste sous tous les seuils de verrouillage. La signature est l’étendue sur les comptes, pas la profondeur sur un seul.',
        },
      },
      {
        id: 'b',
        text: { en: 'A brute force attack', fr: 'Une attaque par force brute' },
        correct: false,
        explanation: {
          en: 'Brute force hammers one account with many guesses and locks it out quickly. Here there is exactly one guess per account and no lockout, which is the opposite shape.',
          fr: 'La force brute matraque un compte avec de nombreux essais et le verrouille vite. Ici il y a exactement un essai par compte et aucun verrouillage : la forme inverse.',
        },
      },
      {
        id: 'c',
        text: { en: 'Credential replay', fr: 'Un rejeu d’identifiants' },
        correct: false,
        explanation: {
          en: 'Replay reuses a captured authentication that already worked, so it produces successes. These are all failures.',
          fr: 'Le rejeu réutilise une authentification capturée qui a déjà fonctionné, donc il produit des succès. Ici tout échoue.',
        },
      },
      {
        id: 'd',
        text: { en: 'A dictionary attack', fr: 'Une attaque par dictionnaire' },
        correct: false,
        explanation: {
          en: 'A dictionary attack describes where the guesses come from, not how they are distributed. Spraying may well use a dictionary word; the distribution is what is being asked about.',
          fr: 'L’attaque par dictionnaire décrit l’origine des essais, pas leur répartition. Une pulvérisation peut employer un mot de dictionnaire ; la question porte sur la répartition.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-002',
    objective: '2.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'Network monitoring shows a host communicating with an external address every ten minutes. On the host itself, no such process appears in the task list and the executable is not visible in the file browser. What is indicated?',
      fr: 'La supervision réseau montre un hôte qui communique avec une adresse externe toutes les dix minutes. Sur l’hôte, aucun processus correspondant n’apparaît dans la liste des tâches et l’exécutable est invisible dans l’explorateur. Qu’est-ce que cela indique ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A rootkit', fr: 'Un rootkit' },
        correct: true,
        explanation: {
          en: 'The inconsistency is the signature: something is running, and the operating system denies it. A rootkit lies to the OS, so every tool that asks the OS gets the lie.',
          fr: 'L’incohérence est la signature : quelque chose s’exécute et le système d’exploitation le nie. Un rootkit ment au système, donc tout outil qui l’interroge reçoit le mensonge.',
        },
      },
      {
        id: 'b',
        text: { en: 'Spyware', fr: 'Un logiciel espion (spyware)' },
        correct: false,
        explanation: {
          en: 'Spyware watches and reports, which fits the beaconing — but ordinary spyware appears in the process list. The concealment is what points somewhere more specific.',
          fr: 'Un logiciel espion observe et transmet, ce qui colle aux balises — mais un logiciel espion ordinaire apparaît dans la liste des processus. C’est la dissimulation qui oriente ailleurs.',
        },
      },
      {
        id: 'c',
        text: { en: 'A logic bomb', fr: 'Une bombe logique (logic bomb)' },
        correct: false,
        explanation: {
          en: 'A logic bomb waits for a condition and then acts once. Regular ten-minute beaconing is continuous behaviour, not a trigger.',
          fr: 'Une bombe logique attend une condition puis agit une fois. Des balises régulières toutes les dix minutes constituent un comportement continu, pas un déclenchement.',
        },
      },
      {
        id: 'd',
        text: { en: 'A worm', fr: 'Un ver (worm)' },
        correct: false,
        explanation: {
          en: 'A worm is defined by spreading to other hosts. Nothing here says anything about propagation.',
          fr: 'Un ver se définit par sa propagation vers d’autres hôtes. Rien ici ne parle de propagation.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-003',
    objective: '2.4',
    kind: 'discrimination',
    difficulty: 'easy',
    prompt: {
      en: 'What distinguishes a worm from a virus?',
      fr: 'Qu’est-ce qui distingue un ver d’un virus ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A worm spreads on its own; a virus needs to be executed',
          fr: 'Un ver se propage seul ; un virus doit être exécuté',
        },
        correct: true,
        explanation: {
          en: 'Autonomous propagation is the whole distinction. It is also why worms produce the "three hundred machines overnight" scenarios and viruses do not.',
          fr: 'La propagation autonome est toute la distinction. C’est aussi pourquoi les vers produisent les scénarios « trois cents postes en une nuit », et pas les virus.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A worm destroys data; a virus only copies it',
          fr: 'Un ver détruit les données ; un virus se contente de les copier',
        },
        correct: false,
        explanation: {
          en: 'Neither is defined by its payload. Both can do anything once running; the category is about how they travel.',
          fr: 'Aucun des deux ne se définit par sa charge utile. Les deux peuvent tout faire une fois actifs ; la catégorie porte sur leur mode de déplacement.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A worm targets networks; a virus targets files',
          fr: 'Un ver vise les réseaux ; un virus vise les fichiers',
        },
        correct: false,
        explanation: {
          en: 'Close enough to sound right, and wrong in a way that matters: a worm can spread by removable media with no network at all. Autonomy is the criterion, not the medium.',
          fr: 'Assez proche pour sembler juste, et faux là où cela compte : un ver peut se propager par support amovible sans réseau. Le critère est l’autonomie, pas le support.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A worm is detectable; a virus is not',
          fr: 'Un ver est détectable ; un virus non',
        },
        correct: false,
        explanation: {
          en: 'Both are detectable, and worms are usually noisier. Detectability is a consequence of behaviour, not part of either definition.',
          fr: 'Les deux sont détectables, et les vers sont généralement plus bruyants. La détectabilité découle du comportement, elle ne fait partie d’aucune des deux définitions.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-004',
    objective: '2.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A user account signs in from Paris at 09:12 and from São Paulo at 09:41 the same morning, both successfully. Which indicator is this, and what does it suggest?',
      fr: 'Un compte se connecte depuis Paris à 9 h 12 et depuis São Paulo à 9 h 41 le même matin, avec succès dans les deux cas. Quel indicateur, et que suggère-t-il ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Impossible travel — the credentials are being used by two parties',
          fr: 'Un voyage impossible — les identifiants sont utilisés par deux parties',
        },
        correct: true,
        explanation: {
          en: 'No physical journey covers that distance in twenty-nine minutes, so one identity is in two places. Both sign-ins succeeded, which means the credential itself is compromised.',
          fr: 'Aucun déplacement physique ne couvre cette distance en vingt-neuf minutes : une identité se trouve en deux endroits. Les deux connexions ont réussi, donc l’identifiant lui-même est compromis.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Account lockout — the account is under attack',
          fr: 'Un verrouillage de compte — le compte est attaqué',
        },
        correct: false,
        explanation: {
          en: 'Nothing was locked out and nothing failed. Lockout is an indicator of repeated failure, and both of these succeeded.',
          fr: 'Rien n’a été verrouillé et rien n’a échoué. Le verrouillage indique des échecs répétés, or les deux connexions ont réussi.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Out-of-cycle logging — the activity is outside working hours',
          fr: 'Une journalisation hors cycle — l’activité est hors des heures ouvrées',
        },
        correct: false,
        explanation: {
          en: 'Both timestamps are in the morning. The anomaly is geographic, not temporal.',
          fr: 'Les deux horodatages sont matinaux. L’anomalie est géographique, pas temporelle.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Resource consumption — an account is being overused',
          fr: 'Une consommation de ressources — un compte est trop sollicité',
        },
        correct: false,
        explanation: {
          en: 'Two sign-ins is not consumption. That indicator is about processing, bandwidth or storage rising without explanation.',
          fr: 'Deux connexions ne constituent pas une consommation. Cet indicateur concerne un calcul, une bande passante ou un stockage qui augmentent sans explication.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-005',
    objective: '2.4',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A SIEM shows a continuous log stream from a server, then nothing for fifty minutes, then the stream resumes normally. The server did not restart. What should this be treated as?',
      fr: 'Un SIEM montre un flux de journaux continu depuis un serveur, puis plus rien pendant cinquante minutes, puis le flux reprend normalement. Le serveur n’a pas redémarré. Comment traiter cela ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Missing logs — an indicator of track covering',
          fr: 'Des journaux manquants — un indicateur d’effacement de traces',
        },
        correct: true,
        explanation: {
          en: 'A gap with no restart to explain it is an indicator in its own right. Somebody with enough privilege to stop logging is somebody worth investigating.',
          fr: 'Un trou qu’aucun redémarrage n’explique est un indicateur à part entière. Qui a le privilège d’arrêter la journalisation mérite qu’on s’y intéresse.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A routine collection outage, to be ignored',
          fr: 'Une panne de collecte de routine, à ignorer',
        },
        correct: false,
        explanation: {
          en: 'It may turn out to be one, but the default assumption cannot be benign — the whole value of logging is that gaps in it are suspicious.',
          fr: 'Cela peut se révéler l’être, mais l’hypothèse par défaut ne peut pas être bénigne : tout l’intérêt de la journalisation est que ses trous soient suspects.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Resource inaccessibility',
          fr: 'Une ressource inaccessible',
        },
        correct: false,
        explanation: {
          en: 'That indicator means users cannot reach something, as with ransomware. The server kept running and only its logs went quiet.',
          fr: 'Cet indicateur signifie que des utilisateurs ne peuvent plus atteindre quelque chose, comme avec un rançongiciel. Ici le serveur a continué et seuls ses journaux se sont tus.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Concurrent session usage',
          fr: 'Un usage de sessions simultanées',
        },
        correct: false,
        explanation: {
          en: 'That indicator is about one identity holding two sessions. Nothing in the stem concerns sessions at all.',
          fr: 'Cet indicateur concerne une identité détenant deux sessions. Rien dans l’énoncé ne porte sur des sessions.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-006',
    objective: '2.4',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What does a downgrade attack achieve?',
      fr: 'Que réalise une attaque par rétrogradation ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It forces both parties to negotiate a weaker protocol version',
          fr: 'Elle force les deux parties à négocier une version de protocole plus faible',
        },
        correct: true,
        explanation: {
          en: 'The strong cipher is never broken; it is simply never used. That is why the defence is refusing weak versions outright rather than merely preferring strong ones.',
          fr: 'Le chiffrement fort n’est jamais cassé : il n’est simplement jamais employé. C’est pourquoi la défense consiste à refuser les versions faibles, et non à préférer les fortes.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It finds two inputs with the same hash',
          fr: 'Elle trouve deux entrées ayant la même empreinte',
        },
        correct: false,
        explanation: {
          en: 'That is a collision attack, and the birthday attack is how one is found efficiently. Neither involves protocol negotiation.',
          fr: 'C’est une attaque par collision, et l’attaque des anniversaires est la façon efficace d’en trouver une. Ni l’une ni l’autre ne touche à la négociation de protocole.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It reduces a user’s privilege level',
          fr: 'Elle abaisse le niveau de privilège d’un utilisateur',
        },
        correct: false,
        explanation: {
          en: 'The word "downgrade" refers to the protocol, not to an account. Attackers escalate privilege; they have no reason to reduce it.',
          fr: 'Le mot « rétrogradation » désigne le protocole, pas un compte. Les attaquants élèvent les privilèges ; ils n’ont aucune raison de les abaisser.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It reverts software to an older version',
          fr: 'Elle ramène un logiciel à une version antérieure',
        },
        correct: false,
        explanation: {
          en: 'A plausible reading of the word, and not what the objective means. It is about the version agreed in a handshake, not the version installed.',
          fr: 'Lecture plausible du mot, mais pas le sens retenu par l’objectif. Il s’agit de la version convenue lors d’une négociation, pas de la version installée.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-007',
    objective: '2.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'Two weeks after an administrator is dismissed, a script runs that deletes archived records. The script had been present, dormant, since before the dismissal. What is it?',
      fr: 'Deux semaines après le licenciement d’un administrateur, un script s’exécute et supprime des archives. Le script était présent, dormant, avant le licenciement. De quoi s’agit-il ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A logic bomb', fr: 'Une bombe logique (logic bomb)' },
        correct: true,
        explanation: {
          en: 'Code planted in advance and waiting for a condition — a date, an account disappearing from the directory. The dormancy is the defining feature.',
          fr: 'Du code déposé à l’avance et attendant une condition — une date, la disparition d’un compte de l’annuaire. La dormance est le trait définissant.',
        },
      },
      {
        id: 'b',
        text: { en: 'Ransomware', fr: 'Un rançongiciel' },
        correct: false,
        explanation: {
          en: 'Ransomware encrypts and demands payment. Here data is destroyed outright and nothing is asked for.',
          fr: 'Un rançongiciel chiffre et réclame un paiement. Ici les données sont détruites purement et simplement, sans aucune demande.',
        },
      },
      {
        id: 'c',
        text: { en: 'A trojan', fr: 'Un cheval de Troie' },
        correct: false,
        explanation: {
          en: 'A trojan is disguised as something useful to get itself installed. This script was placed deliberately by someone who already had access.',
          fr: 'Un cheval de Troie se déguise en programme utile pour se faire installer. Ce script a été placé délibérément par quelqu’un qui avait déjà l’accès.',
        },
      },
      {
        id: 'd',
        text: { en: 'A worm', fr: 'Un ver' },
        correct: false,
        explanation: {
          en: 'Nothing propagated. The script ran once, on one system, exactly where it was put.',
          fr: 'Rien ne s’est propagé. Le script s’est exécuté une fois, sur un système, exactement là où il avait été placé.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-008',
    objective: '2.4',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which term do the current objectives use for what was formerly called a man-in-the-middle attack?',
      fr: 'Quel terme les objectifs actuels emploient-ils pour ce qu’on appelait auparavant une attaque de l’homme du milieu ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'On-path attack', fr: 'Attaque de l’intermédiaire (on-path attack)' },
        correct: true,
        explanation: {
          en: 'Same attack, current wording: the adversary sits on the network path and can read or alter what passes. Expect the newer term in stems.',
          fr: 'Même attaque, formulation actuelle : l’adversaire se place sur le chemin réseau et peut lire ou modifier ce qui transite. Attends-toi au terme récent dans les énoncés.',
        },
      },
      {
        id: 'b',
        text: { en: 'Replay attack', fr: 'Attaque par rejeu (replay attack)' },
        correct: false,
        explanation: {
          en: 'Replay resends a captured message later. Being on the path is often how it is captured, but the two are listed separately.',
          fr: 'Le rejeu renvoie plus tard un message capturé. Être sur le chemin est souvent le moyen de la capture, mais les deux sont listés séparément.',
        },
      },
      {
        id: 'c',
        text: { en: 'Downgrade attack', fr: 'Attaque par rétrogradation' },
        correct: false,
        explanation: {
          en: 'A downgrade is a cryptographic attack, frequently delivered from an on-path position. It names the effect, not the position.',
          fr: 'La rétrogradation est une attaque cryptographique, souvent menée depuis une position d’intermédiaire. Elle nomme l’effet, pas la position.',
        },
      },
      {
        id: 'd',
        text: { en: 'Forgery', fr: 'Falsification (forgery)' },
        correct: false,
        explanation: {
          en: 'Forgery is an application attack: fabricating a request that looks like the user’s. It requires no network position at all.',
          fr: 'La falsification est une attaque applicative : fabriquer une requête qui ressemble à celle de l’utilisateur. Elle n’exige aucune position réseau.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-009',
    objective: '2.4',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A web server’s access log contains repeated requests of the form `/download?file=../../../../etc/passwd`. Which attack?',
      fr: 'Le journal d’accès d’un serveur web contient des requêtes répétées de la forme `/download?file=../../../../etc/passwd`. Quelle attaque ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Directory traversal',
          fr: 'Une traversée de répertoire (directory traversal)',
        },
        correct: true,
        explanation: {
          en: 'The `../` sequences climb out of the folder the application intended to serve from. The literal indicator is right there in the parameter.',
          fr: 'Les séquences `../` remontent hors du dossier depuis lequel l’application entendait servir. L’indicateur littéral est dans le paramètre.',
        },
      },
      {
        id: 'b',
        text: { en: 'SQL injection', fr: 'Une injection SQL' },
        correct: false,
        explanation: {
          en: 'Injection would carry query syntax. This parameter carries a filesystem path, so the target is the file system rather than a database.',
          fr: 'Une injection porterait de la syntaxe de requête. Ce paramètre porte un chemin de fichier : la cible est le système de fichiers, pas une base.',
        },
      },
      {
        id: 'c',
        text: { en: 'A buffer overflow', fr: 'Un débordement de tampon' },
        correct: false,
        explanation: {
          en: 'An overflow attempt would show an abnormally long value designed to exceed a size. This value is short and structurally meaningful.',
          fr: 'Une tentative de débordement montrerait une valeur anormalement longue conçue pour dépasser une taille. Cette valeur est courte et structurellement signifiante.',
        },
      },
      {
        id: 'd',
        text: { en: 'Privilege escalation', fr: 'Une élévation de privilèges' },
        correct: false,
        explanation: {
          en: 'Reading that file might help an attacker escalate later, but the request itself is the traversal. The question asks what the log shows.',
          fr: 'Lire ce fichier pourrait aider une élévation ultérieure, mais la requête elle-même est la traversée. La question porte sur ce que montre le journal.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-010',
    objective: '2.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'Staff in one office report that the corporate wireless network keeps disconnecting them, and afterwards their devices reconnect to a network with the same name but no password. What is happening?',
      fr: 'Les salariés d’un bureau signalent que le réseau sans fil d’entreprise les déconnecte sans cesse, après quoi leurs appareils se reconnectent à un réseau portant le même nom mais sans mot de passe. Que se passe-t-il ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A wireless attack: deauthentication driving clients onto a twin access point',
          fr: 'Une attaque sans fil : désauthentification poussant les clients vers un point d’accès jumeau',
        },
        correct: true,
        explanation: {
          en: 'Repeated disconnection plus a same-named open network is the classic pairing. The disconnections are the tool that makes the twin attractive.',
          fr: 'Des déconnexions répétées accompagnées d’un réseau ouvert de même nom sont l’association classique. Les déconnexions sont l’outil qui rend le jumeau attractif.',
        },
      },
      {
        id: 'b',
        text: { en: 'A distributed denial of service', fr: 'Un déni de service distribué' },
        correct: false,
        explanation: {
          en: 'A DDoS floods a service from many sources. This is local, targeted, and it ends with clients connected somewhere — not with a service down.',
          fr: 'Un DDoS inonde un service depuis de nombreuses sources. Ici c’est local, ciblé, et cela se termine par des clients connectés ailleurs, pas par un service arrêté.',
        },
      },
      {
        id: 'c',
        text: { en: 'A DNS attack', fr: 'Une attaque DNS' },
        correct: false,
        explanation: {
          en: 'A DNS attack redirects a name to a wrong address. What is being manipulated here is the wireless association, before DNS is even reached.',
          fr: 'Une attaque DNS redirige un nom vers une mauvaise adresse. Ici c’est l’association sans fil qui est manipulée, avant même d’atteindre le DNS.',
        },
      },
      {
        id: 'd',
        text: { en: 'Credential replay', fr: 'Un rejeu d’identifiants' },
        correct: false,
        explanation: {
          en: 'Replay reuses a captured authentication. This attack may enable that next, but the observation described is about network association.',
          fr: 'Le rejeu réutilise une authentification capturée. Cette attaque peut y conduire ensuite, mais l’observation décrite porte sur l’association réseau.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-011',
    objective: '2.4',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What does a birthday attack exploit?',
      fr: 'Qu’exploite une attaque des anniversaires ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The probability of finding any two inputs that collide',
          fr: 'La probabilité de trouver deux entrées quelconques qui entrent en collision',
        },
        correct: true,
        explanation: {
          en: 'Finding any colliding pair is far easier than matching one specific digest, which is what makes the attack practical against short hashes.',
          fr: 'Trouver une paire en collision est bien plus facile que d’égaler une empreinte précise, ce qui rend l’attaque praticable contre des empreintes courtes.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Passwords derived from dates of birth',
          fr: 'Les mots de passe dérivés de dates de naissance',
        },
        correct: false,
        explanation: {
          en: 'The name comes from the birthday problem in probability, not from anybody’s birthday. That would be a dictionary attack.',
          fr: 'Le nom vient du paradoxe des anniversaires en probabilités, pas de la date de naissance de quiconque. Cela relèverait d’une attaque par dictionnaire.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A weakness in the key exchange',
          fr: 'Une faiblesse de l’échange de clés',
        },
        correct: false,
        explanation: {
          en: 'Key exchange is a different part of the protocol. The birthday attack targets the hash function’s output space.',
          fr: 'L’échange de clés est une autre partie du protocole. L’attaque des anniversaires vise l’espace de sortie de la fonction de hachage.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Certificates that are about to expire',
          fr: 'Les certificats sur le point d’expirer',
        },
        correct: false,
        explanation: {
          en: 'Expiry is a lifecycle matter with no relation to collisions. An expired certificate is refused rather than exploited.',
          fr: 'L’expiration est une question de cycle de vie, sans rapport avec les collisions. Un certificat expiré est refusé, pas exploité.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-012',
    objective: '2.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A cleaner is observed holding a small device against a staff badge in a corridor. A week later the badge number is used to enter after hours. Which attack?',
      fr: 'Un agent d’entretien est vu approchant un petit appareil d’un badge dans un couloir. Une semaine plus tard, ce numéro de badge sert à entrer en dehors des heures. Quelle attaque ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'RFID cloning', fr: 'Une copie de badge RFID (RFID cloning)' },
        correct: true,
        explanation: {
          en: 'Reading a badge at close range and reproducing it is one of the three physical attacks the objective lists. The delay before use is typical.',
          fr: 'Lire un badge à courte distance et le reproduire est l’une des trois attaques physiques listées par l’objectif. Le délai avant usage est typique.',
        },
      },
      {
        id: 'b',
        text: { en: 'Physical brute force', fr: 'Une force brute physique' },
        correct: false,
        explanation: {
          en: 'Physical brute force means forcing a door or an enclosure. Here entry was granted by a reader that believed the credential.',
          fr: 'La force brute physique consiste à forcer une porte ou un boîtier. Ici l’entrée a été accordée par un lecteur qui a cru l’identifiant.',
        },
      },
      {
        id: 'c',
        text: { en: 'An environmental attack', fr: 'Une attaque environnementale' },
        correct: false,
        explanation: {
          en: 'Environmental attacks target power, cooling or similar conditions. Nothing here affects the building’s services.',
          fr: 'Les attaques environnementales visent l’alimentation, le refroidissement ou des conditions comparables. Rien ici n’affecte les services du bâtiment.',
        },
      },
      {
        id: 'd',
        text: { en: 'Credential replay', fr: 'Un rejeu d’identifiants' },
        correct: false,
        explanation: {
          en: 'Conceptually near — a captured credential is reused — but the objective lists RFID cloning as a physical attack, and the stem is entirely physical.',
          fr: 'Conceptuellement proche — un identifiant capturé est réutilisé — mais l’objectif liste la copie RFID comme attaque physique, et l’énoncé l’est entièrement.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-013',
    objective: '2.4',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Why is password spraying harder to detect than brute force?',
      fr: 'Pourquoi une pulvérisation de mots de passe est-elle plus difficile à détecter qu’une force brute ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'It stays under the lockout threshold on every individual account',
          fr: 'Elle reste sous le seuil de verrouillage sur chaque compte pris isolément',
        },
        correct: true,
        explanation: {
          en: 'Per-account, one failure is unremarkable, so no lockout alert fires anywhere. Seeing it requires correlating across accounts, which not every deployment does.',
          fr: 'Compte par compte, un échec est anodin : aucune alerte de verrouillage ne se déclenche nulle part. La voir exige de corréler entre les comptes, ce que tous les déploiements ne font pas.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'It uses encrypted traffic',
          fr: 'Elle utilise du trafic chiffré',
        },
        correct: false,
        explanation: {
          en: 'Both attacks arrive over the same encrypted authentication channel. Encryption is not what hides one and not the other.',
          fr: 'Les deux attaques arrivent par le même canal d’authentification chiffré. Ce n’est pas le chiffrement qui en dissimule une et pas l’autre.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'It only targets administrator accounts',
          fr: 'Elle ne vise que les comptes administrateurs',
        },
        correct: false,
        explanation: {
          en: 'The reverse: it targets as many accounts as possible, because the whole method depends on breadth.',
          fr: 'C’est l’inverse : elle vise le plus de comptes possible, car toute la méthode repose sur l’étendue.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'It leaves no entry in the authentication log',
          fr: 'Elle ne laisse aucune entrée dans le journal d’authentification',
        },
        correct: false,
        explanation: {
          en: 'Every attempt is logged. The difficulty is that each line looks ordinary in isolation, not that the lines are absent.',
          fr: 'Chaque tentative est journalisée. La difficulté est que chaque ligne paraît ordinaire isolément, pas que les lignes manquent.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-014',
    objective: '2.4',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A finance workstation shows sustained high processor use overnight, and outbound traffic to an unfamiliar address. Files are intact and users report nothing. What are the plausible readings?',
      fr: 'Un poste de la comptabilité présente une forte charge processeur soutenue pendant la nuit et du trafic sortant vers une adresse inconnue. Les fichiers sont intacts et les utilisateurs ne signalent rien. Quelles lectures sont plausibles ?',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: {
          en: 'Resource consumption from unauthorised mining',
          fr: 'Une consommation de ressources due à un minage non autorisé',
        },
        correct: true,
        explanation: {
          en: 'Sustained processor use with nothing else disturbed fits mining well: it needs cycles and stays quiet otherwise.',
          fr: 'Une charge processeur soutenue sans autre perturbation correspond bien au minage : il consomme du calcul et reste discret par ailleurs.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Data exfiltration over the outbound connection',
          fr: 'Une exfiltration de données par la connexion sortante',
        },
        correct: true,
        explanation: {
          en: 'Outbound traffic to an unknown destination, out of hours, from a finance machine is the shape of exfiltration. Both readings must be checked before either is dismissed.',
          fr: 'Un trafic sortant vers une destination inconnue, hors des heures, depuis un poste comptable a la forme d’une exfiltration. Les deux lectures doivent être vérifiées avant d’en écarter une.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Ransomware in progress',
          fr: 'Un rançongiciel en cours',
        },
        correct: false,
        explanation: {
          en: 'The stem says files are intact and nobody is complaining. Ransomware announces itself by making resources inaccessible.',
          fr: 'L’énoncé indique que les fichiers sont intacts et que personne ne se plaint. Un rançongiciel s’annonce en rendant les ressources inaccessibles.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A distributed denial of service against the workstation',
          fr: 'Un déni de service distribué contre le poste',
        },
        correct: false,
        explanation: {
          en: 'The traffic described is outbound, not inbound, and a workstation is not a service anyone would flood.',
          fr: 'Le trafic décrit est sortant et non entrant, et un poste de travail n’est pas un service que l’on inonderait.',
        },
      },
    ],
  },

  {
    id: 'q-2-4-015',
    objective: '2.4',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'Three hundred workstations across four sites are infected within one night. Investigation confirms no user opened an attachment or ran anything. What does this indicate?',
      fr: 'Trois cents postes répartis sur quatre sites sont infectés en une nuit. L’enquête confirme qu’aucun utilisateur n’a ouvert de pièce jointe ni exécuté quoi que ce soit. Qu’est-ce que cela indique ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A worm', fr: 'Un ver (worm)' },
        correct: true,
        explanation: {
          en: 'Spreading at that scale with no user action is the definition. Something is propagating itself, which narrows the response to network containment rather than user education.',
          fr: 'Se propager à cette échelle sans action utilisateur est la définition même. Quelque chose se propage seul, ce qui oriente la réponse vers le confinement réseau plutôt que la sensibilisation.',
        },
      },
      {
        id: 'b',
        text: { en: 'A virus', fr: 'Un virus' },
        correct: false,
        explanation: {
          en: 'A virus needs execution, and the investigation ruled that out at three hundred machines. It is the distractor this whole scenario is built to eliminate.',
          fr: 'Un virus exige une exécution, et l’enquête l’a exclue sur trois cents postes. C’est le distracteur que tout ce scénario est construit pour éliminer.',
        },
      },
      {
        id: 'c',
        text: { en: 'A phishing campaign', fr: 'Une campagne de hameçonnage' },
        correct: false,
        explanation: {
          en: 'Phishing depends on somebody acting on a message. Nobody did, and the simultaneity across four sites does not fit human behaviour anyway.',
          fr: 'Le hameçonnage dépend de quelqu’un qui agit sur un message. Personne ne l’a fait, et la simultanéité sur quatre sites ne correspond de toute façon pas à un comportement humain.',
        },
      },
      {
        id: 'd',
        text: { en: 'A logic bomb', fr: 'Une bombe logique' },
        correct: false,
        explanation: {
          en: 'A logic bomb would have to have been planted on all three hundred machines in advance. Possible in principle, and propagation is by far the simpler explanation.',
          fr: 'Une bombe logique aurait dû être déposée à l’avance sur les trois cents postes. Possible en principe, mais la propagation est de loin l’explication la plus simple.',
        },
      },
    ],
  },
];
