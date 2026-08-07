import type { Question } from '@/content/schemas';

/**
 * Objective 5.2 — Explain elements of the risk management process.
 *
 * Every question is original and based only on the published objective. See NOTICE.md.
 */
export const QUESTIONS_5_2: Question[] = [
  {
    id: 'q-5-2-001',
    objective: '5.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'What is the primary purpose of a risk register?',
      fr: 'Quel est le rôle principal d’un registre des risques ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'To track identified risks, ownership, status, and treatment decisions',
          fr: 'Suivre les risques identifiés, leurs responsables, leur statut et les décisions de traitement',
        },
        correct: true,
        explanation: {
          en: 'A risk register makes exposure visible and assignable. It records the risk and the decision around it, rather than acting as a technical security control.',
          fr: 'Le registre rend l’exposition visible et attribuable. Il consigne le risque et la décision associée, au lieu de constituer un contrôle technique.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'To store logs collected during an incident investigation',
          fr: 'Conserver les journaux collectés lors d’une investigation sur incident',
        },
        correct: false,
        explanation: {
          en: 'Investigation logs are evidence for incident response. They can inform a risk entry, but a register records business risk decisions rather than raw event data.',
          fr: 'Les journaux d’investigation sont des éléments de réponse à incident. Ils peuvent alimenter une entrée de risque, mais le registre consigne des décisions métier.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'To list approved software and hardware assets',
          fr: 'Lister les actifs logiciels et matériels approuvés',
        },
        correct: false,
        explanation: {
          en: 'An asset inventory identifies what the organisation owns. A risk register may reference an asset, but it records exposure, ownership, and treatment instead.',
          fr: 'Un inventaire identifie les actifs détenus par l’organisation. Le registre peut citer un actif, mais il consigne une exposition, un responsable et un traitement.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'To publish mandatory technical configuration standards',
          fr: 'Publier des normes de configuration technique obligatoires',
        },
        correct: false,
        explanation: {
          en: 'Configuration standards prescribe required settings. A risk register documents a condition and the approved response, so it does not replace a standard.',
          fr: 'Les normes de configuration prescrivent des paramètres requis. Le registre documente une situation et une réponse approuvée, il ne remplace donc pas une norme.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-002',
    objective: '5.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which activity is risk identification rather than risk analysis?',
      fr: 'Quelle activité relève de l’identification des risques plutôt que de leur analyse ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Documenting that a public API lacks authentication',
          fr: 'Documenter qu’une API publique ne demande pas d’authentification',
        },
        correct: true,
        explanation: {
          en: 'Finding and stating the condition, asset, and possible exposure creates a candidate risk. Analysis happens later when it is compared and prioritised.',
          fr: 'Constater et formuler la condition, l’actif et l’exposition possible crée un risque candidat. L’analyse intervient ensuite lors de la comparaison et de la priorisation.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Ranking the API risk above a low-impact printer issue',
          fr: 'Classer le risque de l’API avant un problème d’imprimante à faible impact',
        },
        correct: false,
        explanation: {
          en: 'Ranking compares the significance of known risks and is analysis. It assumes that both the API exposure and printer issue have already been identified.',
          fr: 'Classer compare l’importance de risques connus et relève de l’analyse. Cela suppose que l’exposition de l’API et le problème d’imprimante sont déjà identifiés.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Estimating the revenue loss caused by an API outage',
          fr: 'Estimer la perte de revenus causée par une interruption de l’API',
        },
        correct: false,
        explanation: {
          en: 'Estimating a consequence supplies impact evidence for assessment. It does not perform the initial discovery of the exposed API or its weakness.',
          fr: 'Estimer une conséquence fournit un élément d’impact pour l’évaluation. Cela ne réalise pas la découverte initiale de l’API exposée ou de sa faiblesse.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Selecting MFA to reduce unauthorised API use',
          fr: 'Choisir MFA afin de réduire les usages non autorisés de l’API',
        },
        correct: false,
        explanation: {
          en: 'Selecting a control is risk treatment or mitigation. Identification names what could go wrong before the organisation decides how to reduce it.',
          fr: 'Choisir un contrôle relève du traitement ou de l’atténuation. L’identification nomme ce qui peut mal se passer avant de décider comment le réduire.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-003',
    objective: '5.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A company stops processing a category of sensitive data because no available platform meets its requirements. Which risk strategy has it chosen?',
      fr: 'Une entreprise cesse de traiter une catégorie de données sensibles car aucune plateforme disponible ne respecte ses exigences. Quelle stratégie de risque a-t-elle choisie ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Avoidance', fr: 'Évitement' },
        correct: true,
        explanation: {
          en: 'The company changed or stopped the activity that creates the exposure. That removes this risk from the proposed activity rather than merely reducing it.',
          fr: 'L’entreprise a modifié ou arrêté l’activité qui crée l’exposition. Cela retire ce risque de l’activité envisagée plutôt que de seulement le réduire.',
        },
      },
      {
        id: 'b',
        text: { en: 'Mitigation', fr: 'Atténuation' },
        correct: false,
        explanation: {
          en: 'Mitigation keeps the activity and adds controls to lower likelihood or impact. Here the activity itself is stopped, so no control is being used to continue it.',
          fr: 'L’atténuation conserve l’activité et ajoute des contrôles pour réduire probabilité ou impact. Ici, l’activité cesse ; aucun contrôle ne permet donc de la poursuivre.',
        },
      },
      {
        id: 'c',
        text: { en: 'Transfer', fr: 'Transfert' },
        correct: false,
        explanation: {
          en: 'Transfer assigns part of a consequence to another party, such as through insurance or contract. The scenario does not shift liability; it abandons the activity.',
          fr: 'Le transfert attribue une partie de la conséquence à un tiers, par assurance ou contrat. Le scénario ne déplace pas la responsabilité ; il abandonne l’activité.',
        },
      },
      {
        id: 'd',
        text: { en: 'Acceptance', fr: 'Acceptation' },
        correct: false,
        explanation: {
          en: 'Acceptance deliberately retains a known risk within approved bounds. Stopping the data processing avoids exposure instead of retaining residual risk.',
          fr: 'L’acceptation conserve délibérément un risque connu dans des limites approuvées. Arrêter le traitement évite l’exposition au lieu de conserver un risque résiduel.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-004',
    objective: '5.2',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which statement correctly contrasts risk appetite and risk tolerance?',
      fr: 'Quel énoncé oppose correctement l’appétit pour le risque à la tolérance au risque ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Appetite is broad strategic willingness; tolerance is a permitted limit for a situation',
          fr: 'L’appétit est une volonté stratégique globale ; la tolérance est une limite admise pour une situation',
        },
        correct: true,
        explanation: {
          en: 'Leadership expresses appetite as overall direction. Tolerance makes that direction actionable by setting a boundary that can trigger escalation or action.',
          fr: 'La direction exprime l’appétit comme orientation générale. La tolérance rend cette orientation exploitable en fixant une limite qui déclenche une action.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Appetite is the risk left after controls; tolerance is the original exposure',
          fr: 'L’appétit est le risque restant après contrôles ; la tolérance est l’exposition initiale',
        },
        correct: false,
        explanation: {
          en: 'Risk remaining after treatment is residual risk. Appetite and tolerance describe the organisation’s willingness and boundaries, not two chronological risk values.',
          fr: 'Le risque qui demeure après traitement est le risque résiduel. Appétit et tolérance décrivent une volonté et des limites, pas deux valeurs chronologiques.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Appetite is set by engineers; tolerance is set only by external auditors',
          fr: 'L’appétit est fixé par les ingénieurs ; la tolérance est fixée uniquement par des auditeurs externes',
        },
        correct: false,
        explanation: {
          en: 'Both are governance choices aligned to business objectives and leadership direction. Auditors may assess evidence, but they do not define an organisation’s appetite.',
          fr: 'Les deux sont des choix de gouvernance alignés sur les objectifs métier et la direction. Les auditeurs évaluent des éléments, mais ne définissent pas l’appétit.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Appetite applies only to cyberattacks; tolerance applies only to outages',
          fr: 'L’appétit ne concerne que les cyberattaques ; la tolérance ne concerne que les interruptions',
        },
        correct: false,
        explanation: {
          en: 'Risk governance can cover malicious, operational, third-party, and natural-event risks. Neither term is restricted to one source of business loss.',
          fr: 'La gouvernance du risque couvre des risques malveillants, opérationnels, tiers ou naturels. Aucun terme n’est limité à une seule source de perte métier.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-005',
    objective: '5.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A retailer buys cyber insurance to cover part of the financial cost of a breach. What strategy is this?',
      fr: 'Un détaillant souscrit une assurance cyber afin de couvrir une partie du coût financier d’une violation. Quelle stratégie applique-t-il ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Transfer', fr: 'Transfert' },
        correct: true,
        explanation: {
          en: 'Insurance shifts an agreed financial consequence to an insurer. The retailer still owns its systems and response duties, but part of the loss is transferred.',
          fr: 'L’assurance déplace une conséquence financière convenue vers l’assureur. Le détaillant garde ses systèmes et ses obligations de réponse, mais transfère une partie de la perte.',
        },
      },
      {
        id: 'b',
        text: { en: 'Avoidance', fr: 'Évitement' },
        correct: false,
        explanation: {
          en: 'Avoidance changes or ends the risky activity. Buying insurance leaves the retail systems and the possibility of breach in place.',
          fr: 'L’évitement modifie ou arrête l’activité risquée. Souscrire une assurance laisse les systèmes du détaillant et la possibilité d’une violation en place.',
        },
      },
      {
        id: 'c',
        text: { en: 'Mitigation', fr: 'Atténuation' },
        correct: false,
        explanation: {
          en: 'Mitigation uses controls to reduce probability or impact, such as segmentation or MFA. Insurance allocates a financial consequence rather than reducing the compromise path.',
          fr: 'L’atténuation utilise des contrôles, comme segmentation ou MFA, pour réduire probabilité ou impact. L’assurance répartit une conséquence financière sans réduire le chemin de compromission.',
        },
      },
      {
        id: 'd',
        text: { en: 'Acceptance', fr: 'Acceptation' },
        correct: false,
        explanation: {
          en: 'Acceptance retains the risk under an authorised decision. The insurer taking a defined share of cost is a transfer even if residual risk remains.',
          fr: 'L’acceptation conserve le risque par décision autorisée. La part de coût prise par l’assureur constitue un transfert, même si un risque résiduel demeure.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-006',
    objective: '5.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: { en: 'What does residual risk mean?', fr: 'Que signifie le risque résiduel ?' },
    options: [
      {
        id: 'a',
        text: {
          en: 'The exposure that remains after treatment or controls are applied',
          fr: 'L’exposition qui demeure après application du traitement ou des contrôles',
        },
        correct: true,
        explanation: {
          en: 'Controls rarely eliminate every possibility of loss. The remaining exposure is residual risk and may require acceptance, monitoring, or further treatment.',
          fr: 'Les contrôles éliminent rarement toute possibilité de perte. L’exposition restante est le risque résiduel et peut exiger acceptation, surveillance ou traitement supplémentaire.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A risk that has not yet been identified',
          fr: 'Un risque qui n’a pas encore été identifié',
        },
        correct: false,
        explanation: {
          en: 'An unknown risk has not entered the process. Residual risk is known well enough to remain after a documented control or treatment decision.',
          fr: 'Un risque inconnu n’est pas encore entré dans le processus. Le risque résiduel est suffisamment connu pour demeurer après une décision documentée de contrôle ou traitement.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The highest-ranked item in the risk register',
          fr: 'L’élément le mieux classé dans le registre des risques',
        },
        correct: false,
        explanation: {
          en: 'Priority reflects likelihood, impact, and business context. Residual risk describes what remains after action, so it can be low, medium, or high.',
          fr: 'La priorité dépend de la probabilité, de l’impact et du contexte métier. Le risque résiduel décrit ce qui subsiste après action et peut être faible, moyen ou élevé.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A risk that was transferred to an insurer',
          fr: 'Un risque transféré à un assureur',
        },
        correct: false,
        explanation: {
          en: 'Transfer may leave technical and operational exposure with the organisation. Residual risk is broader than an insurance arrangement and can exist after any strategy.',
          fr: 'Le transfert peut laisser une exposition technique et opérationnelle à l’organisation. Le risque résiduel dépasse une assurance et peut exister après toute stratégie.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-007',
    objective: '5.2',
    kind: 'scenario',
    difficulty: 'hard',
    prompt: {
      en: 'A recovery team must decide which services to restore first after a data-centre outage. Which activity provides the business basis for that order?',
      fr: 'Après une interruption du centre de données, une équipe doit choisir les services à restaurer en premier. Quelle activité donne la base métier de cet ordre ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Business impact analysis', fr: 'Analyse d’impact sur l’activité' },
        correct: true,
        explanation: {
          en: 'A BIA identifies critical business processes, dependencies, and outage consequences. That evidence supports recovery priorities when several services are unavailable.',
          fr: 'Une BIA identifie les processus métier critiques, dépendances et conséquences d’interruption. Ces éléments soutiennent les priorités de reprise lorsque plusieurs services sont indisponibles.',
        },
      },
      {
        id: 'b',
        text: { en: 'Vulnerability scanning', fr: 'Scan de vulnérabilités' },
        correct: false,
        explanation: {
          en: 'A vulnerability scan discovers technical weaknesses that attackers might exploit. It does not determine which business service has the greatest operational cost when offline.',
          fr: 'Un scan découvre des faiblesses techniques exploitables. Il ne détermine pas quel service métier a le coût opérationnel le plus élevé lorsqu’il est indisponible.',
        },
      },
      {
        id: 'c',
        text: { en: 'Penetration testing', fr: 'Test d’intrusion' },
        correct: false,
        explanation: {
          en: 'Penetration testing demonstrates exploit paths and control weaknesses. Recovery sequencing depends on business consequence and dependencies, which are BIA concerns.',
          fr: 'Un test d’intrusion démontre des chemins d’exploitation et faiblesses de contrôle. L’ordre de reprise dépend des conséquences métier et dépendances, sujets de la BIA.',
        },
      },
      {
        id: 'd',
        text: { en: 'Risk transfer', fr: 'Transfert de risque' },
        correct: false,
        explanation: {
          en: 'Risk transfer can allocate financial loss to another party, but it does not analyse processes or decide what should return to service first.',
          fr: 'Le transfert peut répartir une perte financière vers un tiers, mais il n’analyse pas les processus et ne décide pas quel service doit être rétabli en premier.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-008',
    objective: '5.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'Which item is most useful in a risk report for executives?',
      fr: 'Quel élément est le plus utile dans un rapport de risque destiné aux dirigeants ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Business impact, residual exposure, and decisions or funding required',
          fr: 'L’impact métier, l’exposition résiduelle et les décisions ou financements requis',
        },
        correct: true,
        explanation: {
          en: 'Executives need information that supports governance choices. Business consequence, remaining exposure, and requested decisions make the report actionable at that level.',
          fr: 'Les dirigeants ont besoin d’éléments qui soutiennent les choix de gouvernance. Conséquence métier, exposition restante et décisions demandées rendent le rapport exploitable.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A complete packet capture from every affected network segment',
          fr: 'Une capture complète de paquets provenant de chaque segment réseau affecté',
        },
        correct: false,
        explanation: {
          en: 'Packet captures can help technical investigation, but their volume and detail do not communicate an ownership or investment decision to an executive audience.',
          fr: 'Les captures aident une investigation technique, mais leur volume et leur détail ne communiquent pas une décision de responsabilité ou investissement à un public dirigeant.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Every raw scanner finding, sorted by IP address',
          fr: 'Chaque constat brut du scanner, classé par adresse IP',
        },
        correct: false,
        explanation: {
          en: 'Raw findings are useful operational input, not an executive risk narrative. They must be connected to business impact, priority, ownership, and response.',
          fr: 'Les constats bruts sont des données opérationnelles, non un récit de risque pour dirigeants. Ils doivent être reliés à impact métier, priorité, responsable et réponse.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Only risks already closed by the security team',
          fr: 'Uniquement les risques déjà fermés par l’équipe de sécurité',
        },
        correct: false,
        explanation: {
          en: 'Closed items may show progress, but reporting only them hides current exposure and decisions that need executive attention. Risk reporting must surface active concerns.',
          fr: 'Les éléments fermés montrent des progrès, mais les seuls présenter masque l’exposition actuelle et les décisions nécessaires. Le signalement doit faire ressortir les préoccupations actives.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-009',
    objective: '5.2',
    kind: 'recall',
    difficulty: 'medium',
    prompt: {
      en: 'In a risk assessment, what does likelihood describe?',
      fr: 'Dans une évaluation des risques, que décrit la probabilité ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'How probable it is that the risk event will occur',
          fr: 'La possibilité que l’événement de risque se produise',
        },
        correct: true,
        explanation: {
          en: 'Likelihood estimates the chance of the event or threat scenario occurring. It is combined with impact to help assess and compare the resulting risk.',
          fr: 'La probabilité estime la chance que l’événement ou scénario de menace se produise. Elle se combine à l’impact pour évaluer et comparer le risque.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'How serious the business consequence would be',
          fr: 'La gravité de la conséquence métier potentielle',
        },
        correct: false,
        explanation: {
          en: 'Seriousness of consequence is impact, not likelihood. Both are assessment inputs, but the first asks how bad and the second asks how probable.',
          fr: 'La gravité de la conséquence correspond à l’impact, non à la probabilité. Les deux alimentent l’évaluation, mais l’un demande combien c’est grave, l’autre combien c’est probable.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'How much money an insurer will reimburse',
          fr: 'La somme qu’un assureur remboursera',
        },
        correct: false,
        explanation: {
          en: 'Insurance coverage is relevant to transfer and financial planning. It does not estimate the frequency or chance of the breach or outage occurring.',
          fr: 'La couverture d’assurance concerne le transfert et la planification financière. Elle n’estime ni la fréquence ni la chance qu’une violation ou interruption survienne.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'How many controls are listed in a standard',
          fr: 'Le nombre de contrôles listés dans une norme',
        },
        correct: false,
        explanation: {
          en: 'Control count says little about event probability because controls differ in coverage and effectiveness. Assessment examines the actual likelihood in context.',
          fr: 'Le nombre de contrôles dit peu sur la probabilité, car leur couverture et efficacité diffèrent. L’évaluation examine la probabilité réelle dans son contexte.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-010',
    objective: '5.2',
    kind: 'scenario',
    difficulty: 'medium',
    prompt: {
      en: 'A system owner signs a documented decision to keep a low-impact risk and review it quarterly. Which strategy is being used?',
      fr: 'Un responsable de système signe une décision documentée de conserver un risque à faible impact et de le revoir chaque trimestre. Quelle stratégie est employée ?',
    },
    options: [
      {
        id: 'a',
        text: { en: 'Acceptance', fr: 'Acceptation' },
        correct: true,
        explanation: {
          en: 'A named owner has consciously retained the known risk within a review process. That is informed acceptance, not an unnoticed control failure.',
          fr: 'Un responsable nommé a consciemment conservé le risque connu dans un processus de revue. C’est une acceptation éclairée, non une défaillance de contrôle inaperçue.',
        },
      },
      {
        id: 'b',
        text: { en: 'Avoidance', fr: 'Évitement' },
        correct: false,
        explanation: {
          en: 'Avoidance would stop or alter the activity creating the risk. The owner keeps the activity and explicitly records the remaining exposure.',
          fr: 'L’évitement arrêterait ou modifierait l’activité créant le risque. Le responsable conserve l’activité et consigne explicitement l’exposition restante.',
        },
      },
      {
        id: 'c',
        text: { en: 'Mitigation', fr: 'Atténuation' },
        correct: false,
        explanation: {
          en: 'Mitigation would describe a new or improved control intended to reduce likelihood or impact. The scenario describes governance approval to retain risk instead.',
          fr: 'L’atténuation décrirait un contrôle nouveau ou amélioré pour réduire probabilité ou impact. Le scénario décrit plutôt une approbation de gouvernance pour conserver le risque.',
        },
      },
      {
        id: 'd',
        text: { en: 'Transfer', fr: 'Transfert' },
        correct: false,
        explanation: {
          en: 'Transfer moves a defined consequence to another party through a contract or insurance. No external party is taking responsibility in this decision.',
          fr: 'Le transfert déplace une conséquence définie vers un tiers par contrat ou assurance. Aucun tiers ne prend de responsabilité dans cette décision.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-011',
    objective: '5.2',
    kind: 'discrimination',
    difficulty: 'hard',
    prompt: {
      en: 'Which statement best describes the relationship between a BIA and risk analysis?',
      fr: 'Quel énoncé décrit le mieux la relation entre une BIA et une analyse des risques ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'A BIA supplies business consequence and dependency information that can inform risk analysis',
          fr: 'Une BIA fournit des conséquences métier et dépendances qui peuvent éclairer l’analyse des risques',
        },
        correct: true,
        explanation: {
          en: 'A BIA starts from processes and disruption consequences, giving risk analysis a grounded view of impact. It complements, rather than replaces, threat and vulnerability evidence.',
          fr: 'Une BIA part des processus et conséquences d’interruption, donnant à l’analyse une vue concrète de l’impact. Elle complète les éléments de menace et vulnérabilité sans les remplacer.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A BIA is a scan that automatically ranks software vulnerabilities',
          fr: 'Une BIA est un scan qui classe automatiquement les vulnérabilités logicielles',
        },
        correct: false,
        explanation: {
          en: 'Automated vulnerability scanning examines systems for weaknesses. A BIA examines business process disruption and dependencies, so it is not a vulnerability-ranking tool.',
          fr: 'Le scan automatisé examine les systèmes à la recherche de faiblesses. La BIA examine interruption des processus métier et dépendances ; ce n’est pas un outil de classement des vulnérabilités.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Risk analysis replaces a BIA once a risk register exists',
          fr: 'L’analyse des risques remplace une BIA dès qu’un registre des risques existe',
        },
        correct: false,
        explanation: {
          en: 'A register records risks, but it does not independently establish business recovery priorities. BIA results remain valuable input as processes and dependencies change.',
          fr: 'Un registre consigne des risques, mais n’établit pas seul les priorités métier de reprise. Les résultats de BIA restent utiles lorsque processus et dépendances changent.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A BIA transfers recovery responsibility to a cloud provider',
          fr: 'Une BIA transfère la responsabilité de reprise à un fournisseur cloud',
        },
        correct: false,
        explanation: {
          en: 'A BIA analyses business effects; it does not transfer liability or operations. Contractual allocation of responsibility is a separate third-party and risk-transfer matter.',
          fr: 'Une BIA analyse les effets métier ; elle ne transfère ni responsabilité ni opérations. L’attribution contractuelle relève séparément du risque tiers et du transfert.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-012',
    objective: '5.2',
    kind: 'scenario',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'Which two actions are examples of risk mitigation? (Select two.)',
      fr: 'Quelles deux actions sont des exemples d’atténuation du risque ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Segmenting a legacy server from user networks',
          fr: 'Segmenter un serveur ancien des réseaux utilisateurs',
        },
        correct: true,
        explanation: {
          en: 'Segmentation reduces the paths that can reach the server and can limit spread after compromise. The system remains in use, so the risk is reduced rather than avoided.',
          fr: 'La segmentation réduit les chemins pouvant atteindre le serveur et limite la propagation après compromission. Le système reste utilisé : le risque est réduit plutôt qu’évité.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Adding stronger authentication to an administrative portal',
          fr: 'Ajouter une authentification renforcée à un portail d’administration',
        },
        correct: true,
        explanation: {
          en: 'Stronger authentication is a control that reduces the likelihood of unauthorised access. It does not stop the business activity or move the consequence to another party.',
          fr: 'Une authentification renforcée est un contrôle qui réduit la probabilité d’accès non autorisé. Elle n’arrête pas l’activité et ne déplace pas la conséquence vers un tiers.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Cancelling the plan to expose the portal to the internet',
          fr: 'Annuler le projet d’exposer le portail à Internet',
        },
        correct: false,
        explanation: {
          en: 'Cancelling the exposure removes the risky activity and is avoidance. Mitigation would retain the portal activity while adding controls around it.',
          fr: 'Annuler l’exposition retire l’activité risquée et constitue un évitement. L’atténuation conserverait l’activité du portail avec des contrôles supplémentaires.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Purchasing a policy that reimburses breach expenses',
          fr: 'Acheter une police qui rembourse les dépenses liées à une violation',
        },
        correct: false,
        explanation: {
          en: 'Insurance can transfer part of a financial consequence, but it does not reduce the likelihood of compromise or technically limit its impact on the portal.',
          fr: 'L’assurance peut transférer une part de conséquence financière, mais ne réduit ni la probabilité de compromission ni techniquement l’impact sur le portail.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-013',
    objective: '5.2',
    kind: 'recall',
    difficulty: 'easy',
    prompt: {
      en: 'Why should an organisation update a risk register after implementing a control?',
      fr: 'Pourquoi une organisation doit-elle mettre à jour le registre des risques après avoir appliqué un contrôle ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The treatment and remaining exposure may have changed',
          fr: 'Le traitement et l’exposition restante peuvent avoir changé',
        },
        correct: true,
        explanation: {
          en: 'A new control can change likelihood, impact, owner actions, status, and residual risk. The register must reflect the current decision instead of a historical snapshot.',
          fr: 'Un nouveau contrôle peut modifier probabilité, impact, actions du responsable, statut et risque résiduel. Le registre doit refléter la décision actuelle, non une photographie passée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Controls automatically eliminate the risk entry',
          fr: 'Les contrôles éliminent automatiquement l’entrée de risque',
        },
        correct: false,
        explanation: {
          en: 'Controls often reduce rather than eliminate risk. The record may need a new residual rating or monitoring plan, even when implementation was successful.',
          fr: 'Les contrôles réduisent souvent le risque sans l’éliminer. L’entrée peut exiger un nouveau niveau résiduel ou un plan de surveillance, même après une mise en œuvre réussie.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The register must be replaced by an asset inventory',
          fr: 'Le registre doit être remplacé par un inventaire des actifs',
        },
        correct: false,
        explanation: {
          en: 'Asset inventory and risk register have different purposes. Assets provide context for risk entries, while the register continues to track exposure and treatment decisions.',
          fr: 'Inventaire des actifs et registre ont des finalités distinctes. Les actifs donnent du contexte aux entrées, tandis que le registre suit l’exposition et les décisions de traitement.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Risk reporting is no longer needed after a control is deployed',
          fr: 'Le signalement des risques n’est plus utile après déploiement d’un contrôle',
        },
        correct: false,
        explanation: {
          en: 'Leadership still needs visibility into changed and residual exposure. A deployed control is evidence of action, not proof that reporting and oversight may stop.',
          fr: 'La direction a toujours besoin de visibilité sur l’exposition modifiée et résiduelle. Un contrôle déployé prouve une action, pas que le signalement et la supervision cessent.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-014',
    objective: '5.2',
    kind: 'discrimination',
    difficulty: 'medium',
    prompt: {
      en: 'A risk exceeds an organisation’s stated tolerance. What should happen next?',
      fr: 'Un risque dépasse la tolérance déclarée de l’organisation. Que doit-il se passer ensuite ?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Escalate it for a decision or treatment consistent with governance',
          fr: 'Le faire remonter pour décision ou traitement conforme à la gouvernance',
        },
        correct: true,
        explanation: {
          en: 'Tolerance is a boundary intended to trigger action. Exceeding it requires visibility and an authorised decision, such as further mitigation, avoidance, or approved exception.',
          fr: 'La tolérance est une limite destinée à déclencher une action. La dépasser exige visibilité et décision autorisée, comme une atténuation, un évitement ou une exception approuvée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Remove it from the register so it cannot affect metrics',
          fr: 'Le retirer du registre afin qu’il ne modifie pas les indicateurs',
        },
        correct: false,
        explanation: {
          en: 'Removing the entry conceals an exposure precisely when governance needs it most. Risk reporting should surface a threshold breach rather than improve a dashboard cosmetically.',
          fr: 'Retirer l’entrée masque une exposition au moment où la gouvernance en a le plus besoin. Le signalement doit faire ressortir le dépassement plutôt qu’améliorer un tableau de bord artificiellement.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Assume it is accepted because tolerance was documented',
          fr: 'Supposer qu’il est accepté puisque la tolérance est documentée',
        },
        correct: false,
        explanation: {
          en: 'Tolerance defines what is permitted, not automatic permission beyond the limit. A risk outside the boundary needs escalation or a specifically authorised exception.',
          fr: 'La tolérance définit ce qui est permis, pas une permission automatique au-delà. Un risque hors limite exige remontée ou exception spécifiquement autorisée.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Reclassify the affected asset as less important',
          fr: 'Reclasser l’actif affecté comme moins important',
        },
        correct: false,
        explanation: {
          en: 'Changing classification to fit the result would distort assessment. Asset importance should follow business need, while the excessive risk receives a real decision or treatment.',
          fr: 'Changer la classification pour correspondre au résultat fausserait l’évaluation. L’importance de l’actif suit le besoin métier, tandis que le risque excessif reçoit une vraie décision ou un traitement.',
        },
      },
    ],
  },
  {
    id: 'q-5-2-015',
    objective: '5.2',
    kind: 'scenario',
    difficulty: 'hard',
    multiSelect: true,
    prompt: {
      en: 'A risk analyst is preparing an assessment for a new payment service. Which two inputs directly help judge its risk? (Select two.)',
      fr: 'Un analyste prépare une évaluation pour un nouveau service de paiement. Quelles deux données aident directement à juger son risque ? (Sélectionnez deux réponses.)',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The likely frequency of fraud attempts against the service',
          fr: 'La fréquence probable des tentatives de fraude visant le service',
        },
        correct: true,
        explanation: {
          en: 'Expected threat-event frequency is likelihood evidence. Together with consequences and existing controls, it supports a reasoned assessment rather than an unsupported label.',
          fr: 'La fréquence attendue des événements de menace constitue une preuve de probabilité. Avec conséquences et contrôles existants, elle permet une évaluation raisonnée.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'The financial and operational effect if the service becomes unavailable',
          fr: 'L’effet financier et opérationnel si le service devient indisponible',
        },
        correct: true,
        explanation: {
          en: 'Business and operational consequences provide impact evidence. A risk assessment needs both the chance of an event and the severity if it occurs.',
          fr: 'Les conséquences métier et opérationnelles apportent une preuve d’impact. Une évaluation a besoin de la chance d’un événement et de sa gravité s’il survient.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'The colour selected for the payment application interface',
          fr: 'La couleur choisie pour l’interface de l’application de paiement',
        },
        correct: false,
        explanation: {
          en: 'Interface colour is not evidence of a threat event’s likelihood or business consequence. It might matter to branding or accessibility, but not this risk judgement.',
          fr: 'La couleur de l’interface ne prouve ni probabilité d’événement de menace ni conséquence métier. Elle peut concerner marque ou accessibilité, pas ce jugement de risque.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'The number of employees who attended last year’s general training',
          fr: 'Le nombre de salariés ayant suivi la formation générale de l’an dernier',
        },
        correct: false,
        explanation: {
          en: 'Training participation can be a broad programme metric, but it does not by itself establish fraud likelihood or payment-service impact. Relevant control effectiveness would need context.',
          fr: 'La participation à une formation est un indicateur général, mais n’établit pas seule la probabilité de fraude ou l’impact du service de paiement. L’efficacité de contrôle exigerait du contexte.',
        },
      },
    ],
  },
];
