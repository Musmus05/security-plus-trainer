import type { Question } from '@/content/schemas';

/**
 * Objective 2.1 — Compare and contrast common threat actors and motivations.
 *
 * Every question is **original**, written from the published objective. None reproduces,
 * paraphrases, or reconstructs any real exam item — see NOTICE.md.
 *
 * The objective has no techniques in it, so a question that names a technique would be testing the
 * wrong thing. Each stem here gives one clue about means and one about ends, and the distractors
 * are the actors who satisfy one but not the other — organized crime against a nation-state
 * (resources, differing tempo), hacktivist against unskilled attacker (noise, differing purpose).
 */
export const QUESTIONS_2_1: Question[] = [
  {
    id: 'q-2-1-001',
    objective: '2.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An intrusion is discovered fourteen months after it began. Nothing was destroyed or encrypted; only long-term research documents were copied. Which actor is most likely?',
      fr: 'Une intrusion est découverte quatorze mois après son début. Rien n’a été détruit ni chiffré ; seuls des documents de recherche au long cours ont été copiés. Quel acteur est le plus probable ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A nation-state', fr: 'Un État-nation (nation-state)' },
        correct: true,
        explanation: {
          en: 'Fourteen months of undetected access is expensive and disciplined, and quietly taking research rather than monetising it is espionage. Only a state funds that much patience.',
          fr: 'Quatorze mois d’accès non détecté supposent un financement et une discipline considérables, et prendre discrètement de la recherche plutôt que la monnayer relève de l’espionnage. Seul un État finance une telle patience.',
        },
      },
      {
        id: 'b',
        text: { en: 'Organized crime', fr: 'Le crime organisé (organized crime)' },
        correct: false,
        explanation: {
          en: 'Organized crime has the resources but not the tempo: its model is yield, so it monetises quickly. Fourteen months without a payday is not its behaviour.',
          fr: 'Le crime organisé a les moyens mais pas le rythme : son modèle est le rendement, donc il monnaye vite. Quatorze mois sans encaissement n’est pas son comportement.',
        },
      },
      {
        id: 'c',
        text: { en: 'A hacktivist', fr: 'Un hacktiviste (hacktivist)' },
        correct: false,
        explanation: {
          en: 'A hacktivist wants the act to be seen — that is the point of it. Fourteen months of silence defeats the purpose entirely.',
          fr: 'Un hacktiviste veut que son acte soit vu : c’est tout son objet. Quatorze mois de silence en annulent complètement l’intérêt.',
        },
      },
      {
        id: 'd',
        text: { en: 'An unskilled attacker', fr: 'Un attaquant non qualifié (unskilled attacker)' },
        correct: false,
        explanation: {
          en: 'An unskilled attacker runs borrowed tools and is noisy by nature. Staying hidden for over a year is precisely the capability they lack.',
          fr: 'Un attaquant non qualifié exécute des outils empruntés et est bruyant par nature. Rester caché plus d’un an est exactement la capacité qui lui manque.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-002',
    objective: '2.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which listed threat actor typically has no malicious intent?',
      fr: 'Quel acteur de la menace listé n’a généralement aucune intention malveillante ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Shadow IT', fr: 'L’informatique fantôme (shadow IT)' },
        correct: true,
        explanation: {
          en: 'Shadow IT is colleagues routing around official IT to work faster. It creates real unmanaged risk, but nobody involved is trying to cause harm.',
          fr: 'L’informatique fantôme, ce sont des collègues qui contournent l’informatique officielle pour aller plus vite. Elle crée un risque réel non maîtrisé, mais personne n’y cherche à nuire.',
        },
      },
      {
        id: 'b',
        text: { en: 'An insider threat', fr: 'Une menace interne (insider threat)' },
        correct: false,
        explanation: {
          en: 'An insider threat may be accidental, but the category covers deliberate grievance and theft too. It is not defined by the absence of intent.',
          fr: 'Une menace interne peut être accidentelle, mais la catégorie couvre aussi la rancune et le vol délibérés. Elle ne se définit pas par l’absence d’intention.',
        },
      },
      {
        id: 'c',
        text: { en: 'A hacktivist', fr: 'Un hacktiviste (hacktivist)' },
        correct: false,
        explanation: {
          en: 'A hacktivist believes they are right, which is not the same as meaning no harm. The intent to disrupt is entirely deliberate.',
          fr: 'Un hacktiviste pense avoir raison, ce qui n’est pas la même chose que ne pas vouloir nuire. L’intention de perturber est parfaitement délibérée.',
        },
      },
      {
        id: 'd',
        text: { en: 'An unskilled attacker', fr: 'Un attaquant non qualifié (unskilled attacker)' },
        correct: false,
        explanation: {
          en: 'Lacking skill is not lacking intent. They are attacking on purpose; they simply do not understand the tool they are pointing at you.',
          fr: 'Manquer de compétence n’est pas manquer d’intention. Il attaque volontairement ; il ne comprend simplement pas l’outil qu’il pointe sur toi.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-003',
    objective: '2.1',
    kind: 'scenario',
    difficulty: 'easy',
    prompt: {
      en: 'A government agency website is defaced in the middle of the day with a political slogan. No data is taken. Which actor?',
      fr: 'Le site d’une agence gouvernementale est défiguré en pleine journée avec un slogan politique. Aucune donnée n’est dérobée. Quel acteur ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'A hacktivist', fr: 'Un hacktiviste (hacktivist)' },
        correct: true,
        explanation: {
          en: 'Visibility is the objective, not a side effect, and the motivation is a political belief rather than money. Both signals point the same way.',
          fr: 'La visibilité est l’objectif et non un effet secondaire, et la motivation est une conviction politique plutôt que l’argent. Les deux signaux convergent.',
        },
      },
      {
        id: 'b',
        text: { en: 'Organized crime', fr: 'Le crime organisé (organized crime)' },
        correct: false,
        explanation: {
          en: 'There is no revenue in a defacement, and drawing attention destroys the access that would produce revenue later.',
          fr: 'Une défiguration ne rapporte rien, et attirer l’attention détruit l’accès qui aurait pu rapporter plus tard.',
        },
      },
      {
        id: 'c',
        text: { en: 'A nation-state', fr: 'Un État-nation (nation-state)' },
        correct: false,
        explanation: {
          en: 'A state would keep the access and use it. Burning it for a slogan wastes an asset it spent real money to obtain.',
          fr: 'Un État conserverait l’accès et l’utiliserait. Le griller pour un slogan gaspille un actif qu’il a payé cher.',
        },
      },
      {
        id: 'd',
        text: { en: 'Shadow IT', fr: 'L’informatique fantôme (shadow IT)' },
        correct: false,
        explanation: {
          en: 'Shadow IT is unsanctioned internal tooling. It is not an attacker and it defaces nothing.',
          fr: 'L’informatique fantôme, ce sont des outils internes non validés. Ce n’est pas un attaquant et elle ne défigure rien.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-004',
    objective: '2.1',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Organized crime and nation-states both have deep resources. Which signal in a scenario best separates them?',
      fr: 'Le crime organisé et les États-nations disposent tous deux de gros moyens. Quel indice dans un scénario les sépare le mieux ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'How quickly the access is turned into value',
          fr: 'La rapidité avec laquelle l’accès est transformé en valeur',
        },
        correct: true,
        explanation: {
          en: 'Crime monetises fast because time costs money; a state can hold access for years. Tempo, not capability, is the discriminator.',
          fr: 'Le crime monnaye vite parce que le temps coûte de l’argent ; un État peut conserver un accès des années. C’est le rythme, pas la capacité, qui discrimine.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The sophistication of the tooling',
          fr: 'La sophistication de l’outillage',
        },
        correct: false,
        explanation: {
          en: 'Both build custom tools, and criminal groups now buy capability that used to be state-only. Tooling no longer tells them apart.',
          fr: 'Les deux développent des outils sur mesure, et les groupes criminels achètent désormais des capacités autrefois réservées aux États. L’outillage ne les distingue plus.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Whether the actor is internal or external',
          fr: 'Le caractère interne ou externe de l’acteur',
        },
        correct: false,
        explanation: {
          en: 'Both are external by definition. That attribute separates insiders from everyone else, not these two from each other.',
          fr: 'Les deux sont externes par définition. Cet attribut sépare les internes de tous les autres, pas ces deux-là entre eux.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The number of systems compromised',
          fr: 'Le nombre de systèmes compromis',
        },
        correct: false,
        explanation: {
          en: 'Scale follows the objective, not the actor. A targeted state operation may touch two machines; a criminal campaign may touch thousands, or the reverse.',
          fr: 'L’échelle découle de l’objectif, pas de l’acteur. Une opération étatique ciblée peut toucher deux machines, une campagne criminelle des milliers — ou l’inverse.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-005',
    objective: '2.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which attribute makes an insider threat hard to detect with network controls?',
      fr: 'Quel attribut rend une menace interne difficile à détecter par des contrôles réseau ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'They already hold legitimate access',
          fr: 'Elle dispose déjà d’un accès légitime',
        },
        correct: true,
        explanation: {
          en: 'There is no perimeter crossing to observe, so controls built to spot intrusion see normal authorised activity. That is why the countermeasures are least privilege and access review instead.',
          fr: 'Aucun franchissement de périmètre n’est observable : les contrôles conçus pour repérer une intrusion voient une activité autorisée normale. D’où des contre-mesures fondées sur le moindre privilège et la revue d’accès.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'They are highly sophisticated',
          fr: 'Elle est très sophistiquée',
        },
        correct: false,
        explanation: {
          en: 'Insider sophistication varies enormously, and many insider incidents involve no technique at all — copying a file to a USB stick is not sophisticated.',
          fr: 'La sophistication d’un interne varie énormément, et beaucoup d’incidents internes n’impliquent aucune technique : copier un fichier sur une clé USB n’a rien de sophistiqué.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'They are well funded',
          fr: 'Elle est bien financée',
        },
        correct: false,
        explanation: {
          en: 'Funding is what characterises states and organized crime. An insider is defined by position, not by budget.',
          fr: 'Le financement caractérise les États et le crime organisé. Un interne se définit par sa position, pas par son budget.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'They always act deliberately',
          fr: 'Elle agit toujours délibérément',
        },
        correct: false,
        explanation: {
          en: 'Many insider incidents are accidental. And deliberateness would not affect whether a network control can see the activity.',
          fr: 'Beaucoup d’incidents internes sont accidentels. Et le caractère délibéré ne changerait rien à la capacité d’un contrôle réseau à voir l’activité.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-006',
    objective: '2.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A security researcher gains unauthorised access to a company system, takes nothing, and sends a detailed report of the flaw to the company. Which motivation does the objective assign to this?',
      fr: 'Un chercheur en sécurité obtient un accès non autorisé à un système d’entreprise, ne prend rien, et envoie à l’entreprise un rapport détaillé sur la faille. Quelle motivation l’objectif attribue-t-il à cela ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Ethical', fr: 'Éthique (ethical)' },
        correct: true,
        explanation: {
          en: 'Ethical motivation is explicitly on the official list. The access was unauthorised, so it counts as an actor, but the purpose was to have the flaw fixed.',
          fr: 'La motivation éthique figure explicitement sur la liste officielle. L’accès était non autorisé, donc il s’agit bien d’un acteur, mais le but était de faire corriger la faille.',
        },
      },
      {
        id: 'b',
        text: { en: 'Blackmail', fr: 'Chantage (blackmail)' },
        correct: false,
        explanation: {
          en: 'Blackmail requires a threat attached to a demand. A report with no demand is the opposite of that.',
          fr: 'Le chantage suppose une menace assortie d’une exigence. Un rapport sans exigence en est l’exact contraire.',
        },
      },
      {
        id: 'c',
        text: { en: 'Espionage', fr: 'Espionnage (espionage)' },
        correct: false,
        explanation: {
          en: 'Espionage means taking information for someone else’s benefit. Nothing was taken and the finding went back to the owner.',
          fr: 'L’espionnage consiste à prélever de l’information au profit d’un tiers. Rien n’a été prélevé et le constat est revenu au propriétaire.',
        },
      },
      {
        id: 'd',
        text: { en: 'Disruption or chaos', fr: 'Perturbation ou chaos (disruption/chaos)' },
        correct: false,
        explanation: {
          en: 'Nothing was disrupted. This is the motivation of someone who destroys without gaining anything, which is not what happened.',
          fr: 'Rien n’a été perturbé. C’est la motivation de qui détruit sans rien y gagner, ce qui n’est pas le cas ici.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-007',
    objective: '2.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A marketing team, tired of waiting for IT, signs up for a cloud file-sharing service with a corporate card and starts putting customer lists in it. What is this?',
      fr: 'Une équipe marketing, lassée d’attendre l’informatique, souscrit à un service de partage de fichiers en ligne avec une carte d’entreprise et y dépose des listes clients. De quoi s’agit-il ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Shadow IT', fr: 'De l’informatique fantôme (shadow IT)' },
        correct: true,
        explanation: {
          en: 'Unsanctioned technology adopted to get work done. Nobody intends harm, and yet customer data now sits outside every control the organisation has.',
          fr: 'Une technologie non validée adoptée pour travailler. Personne ne veut nuire, et pourtant des données clients se trouvent désormais hors de tous les contrôles de l’organisation.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A malicious insider threat',
          fr: 'Une menace interne malveillante',
        },
        correct: false,
        explanation: {
          en: 'Malice is the missing ingredient. The team is trying to do its job, which is exactly why shadow IT is listed separately.',
          fr: 'La malveillance est l’ingrédient manquant. L’équipe cherche à faire son travail, et c’est précisément pourquoi l’informatique fantôme est listée à part.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A supply chain attack',
          fr: 'Une attaque de la chaîne d’approvisionnement',
        },
        correct: false,
        explanation: {
          en: 'A supply chain attack means an adversary compromises a supplier to reach you. Here the organisation chose the service itself, and no adversary is involved.',
          fr: 'Une attaque de la chaîne d’approvisionnement suppose qu’un adversaire compromette un fournisseur pour t’atteindre. Ici l’organisation a choisi elle-même le service, et aucun adversaire n’intervient.',
        },
      },
      {
        id: 'd',
        text: { en: 'Hacktivism', fr: 'De l’hacktivisme' },
        correct: false,
        explanation: {
          en: 'There is no cause and no message. Hacktivism is defined by a belief being asserted, which is absent here.',
          fr: 'Il n’y a ni cause ni message. L’hacktivisme se définit par l’affirmation d’une conviction, absente ici.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-008',
    objective: '2.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the dominant motivation of organized crime as a threat actor?',
      fr: 'Quelle est la motivation dominante du crime organisé en tant qu’acteur de la menace ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Financial gain', fr: 'Le gain financier (financial gain)' },
        correct: true,
        explanation: {
          en: 'Organized crime is a business. Ransomware, fraud and data resale are all revenue models, and its behaviour follows from wanting a return.',
          fr: 'Le crime organisé est une entreprise. Rançongiciel, fraude et revente de données sont des modèles de revenus, et son comportement découle de la recherche d’un rendement.',
        },
      },
      {
        id: 'b',
        text: { en: 'Espionage', fr: 'L’espionnage (espionage)' },
        correct: false,
        explanation: {
          en: 'Espionage is the state motivation. Criminals will sell stolen secrets, but gathering intelligence for its own sake pays nothing.',
          fr: 'L’espionnage est la motivation étatique. Des criminels revendront des secrets volés, mais recueillir du renseignement pour lui-même ne rapporte rien.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Political belief',
          fr: 'La conviction politique',
        },
        correct: false,
        explanation: {
          en: 'That is the hacktivist. A criminal group with a political position still needs the operation to pay.',
          fr: 'C’est l’hacktiviste. Un groupe criminel ayant une position politique a tout de même besoin que l’opération rapporte.',
        },
      },
      {
        id: 'd',
        text: { en: 'Notoriety', fr: 'La notoriété' },
        correct: false,
        explanation: {
          en: 'Notoriety motivates the unskilled attacker. For organized crime, attention is a cost — it brings law enforcement.',
          fr: 'La notoriété motive l’attaquant non qualifié. Pour le crime organisé, l’attention est un coût : elle attire les forces de l’ordre.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-009',
    objective: '2.1',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A database administrator, three weeks after being told they would not be promoted, adds a scheduled job that will delete backups in ninety days. Which motivation and which actor?',
      fr: 'Un administrateur de base de données, trois semaines après avoir appris qu’il ne serait pas promu, ajoute une tâche planifiée qui supprimera les sauvegardes dans quatre-vingt-dix jours. Quelle motivation et quel acteur ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Revenge, by an insider threat',
          fr: 'La vengeance, par une menace interne',
        },
        correct: true,
        explanation: {
          en: 'A grievance followed by targeted sabotage using existing legitimate access. The delay is characteristic: it puts distance between the grievance and the damage.',
          fr: 'Une rancune suivie d’un sabotage ciblé au moyen d’un accès légitime existant. Le délai est caractéristique : il éloigne la rancune du dommage.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Financial gain, by an insider threat',
          fr: 'Le gain financier, par une menace interne',
        },
        correct: false,
        explanation: {
          en: 'The actor is right and the motivation is wrong. Deleting backups earns nothing; there is no buyer for destruction.',
          fr: 'L’acteur est le bon, la motivation non. Supprimer des sauvegardes ne rapporte rien : la destruction n’a pas d’acheteur.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Disruption, by an unskilled attacker',
          fr: 'La perturbation, par un attaquant non qualifié',
        },
        correct: false,
        explanation: {
          en: 'The person is a database administrator with legitimate privileged access — the definition of an insider, and not unskilled.',
          fr: 'La personne est administrateur de base de données, avec un accès privilégié légitime : c’est la définition d’un interne, et il n’est pas non qualifié.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Espionage, by a nation-state',
          fr: 'L’espionnage, par un État-nation',
        },
        correct: false,
        explanation: {
          en: 'Nothing is being taken and no third party benefits. Espionage collects; this destroys.',
          fr: 'Rien n’est prélevé et aucun tiers n’en profite. L’espionnage collecte ; ici on détruit.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-010',
    objective: '2.1',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which attribute best explains why an attack could be sustained quietly for two years?',
      fr: 'Quel attribut explique le mieux qu’une attaque ait pu être menée discrètement pendant deux ans ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Resources and funding', fr: 'Les ressources et le financement' },
        correct: true,
        explanation: {
          en: 'Patience is expensive. Paying people to maintain quiet access for two years without a return requires a backer who is not measuring quarterly profit.',
          fr: 'La patience coûte cher. Payer des gens pour maintenir un accès discret deux ans sans retour exige un commanditaire qui ne mesure pas un profit trimestriel.',
        },
      },
      {
        id: 'b',
        text: { en: 'Internal or external position', fr: 'La position interne ou externe' },
        correct: false,
        explanation: {
          en: 'Position explains ease of initial access, not endurance. An insider can also be caught in a week.',
          fr: 'La position explique la facilité de l’accès initial, pas la durée. Un interne peut aussi être découvert en une semaine.',
        },
      },
      {
        id: 'c',
        text: { en: 'Motivation', fr: 'La motivation' },
        correct: false,
        explanation: {
          en: 'Motivation explains why they wanted to, not how they could afford to. Plenty of motivated actors run out of money first.',
          fr: 'La motivation explique pourquoi ils le voulaient, pas comment ils ont pu se le permettre. Beaucoup d’acteurs motivés manquent d’abord d’argent.',
        },
      },
      {
        id: 'd',
        text: { en: 'The tools used', fr: 'Les outils utilisés' },
        correct: false,
        explanation: {
          en: 'Tools are downstream of funding: an actor with money commissions the tool it needs. The attribute the objective names is the money.',
          fr: 'Les outils découlent du financement : un acteur qui a de l’argent commande l’outil dont il a besoin. L’attribut nommé par l’objectif est l’argent.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-011',
    objective: '2.1',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Which term has replaced "script kiddie" in the current objectives?',
      fr: 'Quel terme a remplacé « script kiddie » dans les objectifs actuels ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Unskilled attacker', fr: 'Attaquant non qualifié (unskilled attacker)' },
        correct: true,
        explanation: {
          en: 'Same meaning — someone running tools they do not understand — in neutral wording. Noisy and easy to detect, but still capable of damage with a borrowed tool.',
          fr: 'Même sens — quelqu’un qui exécute des outils qu’il ne comprend pas — dans une formulation neutre. Bruyant et facile à détecter, mais capable de dégâts avec un outil emprunté.',
        },
      },
      {
        id: 'b',
        text: { en: 'Hacktivist', fr: 'Hacktiviste (hacktivist)' },
        correct: false,
        explanation: {
          en: 'A hacktivist is defined by a political cause, not by a lack of skill. Many are technically capable.',
          fr: 'Un hacktiviste se définit par une cause politique, pas par un manque de compétence. Beaucoup sont techniquement capables.',
        },
      },
      {
        id: 'c',
        text: { en: 'Insider threat', fr: 'Menace interne (insider threat)' },
        correct: false,
        explanation: {
          en: 'That is a position inside the organisation, an entirely different axis from skill level.',
          fr: 'C’est une position au sein de l’organisation, un axe totalement distinct du niveau de compétence.',
        },
      },
      {
        id: 'd',
        text: { en: 'Shadow IT', fr: 'Informatique fantôme (shadow IT)' },
        correct: false,
        explanation: {
          en: 'Shadow IT is unsanctioned internal technology, and its people are not attacking anyone.',
          fr: 'L’informatique fantôme désigne des technologies internes non validées, et ceux qui y recourent n’attaquent personne.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-012',
    objective: '2.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'An attacker exfiltrates a customer database and then contacts the company demanding payment to keep the breach quiet. Which motivation is this?',
      fr: 'Un attaquant exfiltre une base clients puis contacte l’entreprise en exigeant un paiement pour ne pas divulguer la fuite. De quelle motivation s’agit-il ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Blackmail', fr: 'Le chantage (blackmail)' },
        correct: true,
        explanation: {
          en: 'A threat of disclosure attached to a demand for payment is blackmail precisely. The leverage is the reputational damage, not the loss of the data.',
          fr: 'Une menace de divulgation assortie d’une demande de paiement, c’est exactement le chantage. Le levier est l’atteinte à la réputation, pas la perte des données.',
        },
      },
      {
        id: 'b',
        text: { en: 'Data exfiltration', fr: 'L’exfiltration de données' },
        correct: false,
        explanation: {
          en: 'Exfiltration happened, but it is the method here rather than the motivation. Pure exfiltration would be silent, with no contact made.',
          fr: 'L’exfiltration a bien eu lieu, mais elle est ici le moyen et non la motivation. Une exfiltration pure serait silencieuse, sans aucun contact.',
        },
      },
      {
        id: 'c',
        text: { en: 'Service disruption', fr: 'La perturbation de service' },
        correct: false,
        explanation: {
          en: 'Nothing was taken offline. The company keeps working throughout; what is threatened is its reputation.',
          fr: 'Rien n’a été mis hors service. L’entreprise continue de fonctionner ; ce qui est menacé est sa réputation.',
        },
      },
      {
        id: 'd',
        text: { en: 'Espionage', fr: 'L’espionnage' },
        correct: false,
        explanation: {
          en: 'Espionage would never announce itself. Making contact destroys the access, which only makes sense if payment is the goal.',
          fr: 'L’espionnage ne s’annoncerait jamais. Prendre contact détruit l’accès, ce qui n’a de sens que si le paiement est le but.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-013',
    objective: '2.1',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Why is the technique used in an attack a poor basis for identifying the actor?',
      fr: 'Pourquoi la technique employée dans une attaque est-elle un mauvais critère pour identifier l’acteur ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Different actors use the same techniques; resources and motivation are what differ',
          fr: 'Des acteurs différents emploient les mêmes techniques ; ce sont les ressources et la motivation qui diffèrent',
        },
        correct: true,
        explanation: {
          en: 'Phishing is used by a lone amateur and by a state programme alike. The objective classifies actors by capability and purpose, which is why the stems give clues about both.',
          fr: 'Le hameçonnage est employé aussi bien par un amateur isolé que par un programme étatique. L’objectif classe les acteurs par capacité et finalité, d’où les indices donnés sur les deux.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Techniques are never recorded in logs',
          fr: 'Les techniques ne sont jamais enregistrées dans les journaux',
        },
        correct: false,
        explanation: {
          en: 'They very often are, and that is how incidents get reconstructed. Observability is not the problem; ambiguity of meaning is.',
          fr: 'Elles le sont très souvent, et c’est ainsi que les incidents sont reconstitués. Le problème n’est pas l’observabilité mais l’ambiguïté de ce qu’elles signifient.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Only nation-states use advanced techniques',
          fr: 'Seuls les États-nations emploient des techniques avancées',
        },
        correct: false,
        explanation: {
          en: 'This used to be a rough heuristic and is no longer true: criminal groups now buy capability that was once state-only.',
          fr: 'C’était autrefois une heuristique approximative, et ce ne l’est plus : les groupes criminels achètent désormais des capacités jadis réservées aux États.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Techniques change too slowly to be informative',
          fr: 'Les techniques évoluent trop lentement pour être informatives',
        },
        correct: false,
        explanation: {
          en: 'The rate of change is not the issue. Even a perfectly current technique is used by several kinds of actor at once.',
          fr: 'Le rythme d’évolution n’est pas en cause. Même une technique parfaitement à jour est employée simultanément par plusieurs types d’acteurs.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-014',
    objective: '2.1',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A regional power distribution network is attacked during an escalating international dispute, with the apparent aim of cutting supply. Which motivation does the objective name for this?',
      fr: 'Un réseau régional de distribution électrique est attaqué pendant une crise internationale qui s’aggrave, avec pour but apparent de couper l’alimentation. Quelle motivation l’objectif retient-il ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'War', fr: 'La guerre (war)' },
        correct: true,
        explanation: {
          en: 'War is on the official motivation list, and attacking critical infrastructure during a state conflict is what it describes.',
          fr: 'La guerre figure sur la liste officielle des motivations, et attaquer une infrastructure critique pendant un conflit entre États correspond exactement à ce qu’elle décrit.',
        },
      },
      {
        id: 'b',
        text: { en: 'Chaos', fr: 'Le chaos (disruption/chaos)' },
        correct: false,
        explanation: {
          en: 'Chaos means destruction with no benefit to the author. Here the disruption serves a state objective in a specific conflict, which is a purpose.',
          fr: 'Le chaos désigne une destruction sans bénéfice pour l’auteur. Ici la perturbation sert un objectif étatique dans un conflit précis : c’est une finalité.',
        },
      },
      {
        id: 'c',
        text: { en: 'Financial gain', fr: 'Le gain financier' },
        correct: false,
        explanation: {
          en: 'No payment is sought and nothing is sold. Cutting a region’s power produces no revenue for the attacker.',
          fr: 'Aucun paiement n’est demandé et rien n’est vendu. Couper l’électricité d’une région ne rapporte rien à l’attaquant.',
        },
      },
      {
        id: 'd',
        text: { en: 'Ethical', fr: 'L’éthique' },
        correct: false,
        explanation: {
          en: 'Ethical motivation means disclosing a flaw so it gets fixed. Cutting power to a population is its opposite.',
          fr: 'La motivation éthique consiste à signaler une faille pour qu’elle soit corrigée. Couper le courant à une population en est l’exact opposé.',
        },
      },
    ],
  },

  {
    id: 'q-2-1-015',
    objective: '2.1',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'Which controls are the appropriate response to insider threat specifically? (Select all that apply.)',
      fr: 'Quels contrôles constituent la réponse appropriée spécifiquement à la menace interne ? (Sélectionne toutes les réponses correctes.)',
    },
    multiSelect: true,
    options: [
      {
        id: 'a',
        text: { en: 'Least privilege', fr: 'Le moindre privilège (least privilege)' },
        correct: true,
        explanation: {
          en: 'An insider already has access, so the question is how much. Reducing it bounds what a grievance or a mistake can reach.',
          fr: 'Un interne a déjà l’accès ; la question est de savoir jusqu’où. Le réduire borne ce qu’une rancune ou une erreur peut atteindre.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Separation of duties',
          fr: 'La séparation des tâches (separation of duties)',
        },
        correct: true,
        explanation: {
          en: 'Requiring two people for a sensitive action means one insider acting alone cannot complete it. It is the classic structural answer.',
          fr: 'Exiger deux personnes pour une action sensible fait qu’un interne isolé ne peut pas la mener à bien. C’est la réponse structurelle classique.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'A stronger perimeter firewall',
          fr: 'Un pare-feu périmétrique renforcé',
        },
        correct: false,
        explanation: {
          en: 'The insider is already inside the perimeter, so the firewall never sees the activity. This is exactly the control that does not help.',
          fr: 'L’interne est déjà dans le périmètre : le pare-feu ne voit jamais l’activité. C’est précisément le contrôle qui n’aide pas.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Blocking external threat actor IP ranges',
          fr: 'Bloquer les plages d’adresses IP des acteurs externes',
        },
        correct: false,
        explanation: {
          en: 'An insider connects from an ordinary corporate address. Blocking external ranges has no bearing on them at all.',
          fr: 'Un interne se connecte depuis une adresse d’entreprise ordinaire. Bloquer des plages externes n’a strictement aucun effet sur lui.',
        },
      },
    ],
  },
];
