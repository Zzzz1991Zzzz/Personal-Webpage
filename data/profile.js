/*
  All page content lives here. Edit this file to update the site;
  index.html / script.js only render it.

  TODO markers below are fields that could not be verified from the
  papers or arXiv and should be filled in by hand.
*/
window.profileData = {
  basics: {
    name: "Yang Zhang",
    degrees: "M.S. student in Computer Engineering",
    affiliation: "University of California San Diego",
    email: "yaz124 [at] ucsd [dot] edu",
    emailHref: "mailto:yaz124@ucsd.edu",
    // Header links. Set a value to null to hide that link.
    scholar: null, // TODO: Google Scholar profile URL
    linkedin: null, // TODO: LinkedIn profile URL
    github: "https://github.com/Zzzz1991Zzzz",
    cv: "Yang_Zhang_CV.pdf",
    // Optional portrait. Drop a square photo at assets/profile.jpg;
    // the block is hidden automatically if the file is missing.
    portrait: "assets/profile.jpg",
  },

  bio: [
    'I am a master\'s student in Computer Engineering at UC San Diego, where I work with <a href="https://cseweb.ucsd.edu/~paturi/" target="_blank" rel="noopener">Ramamohan Paturi</a> and Leon Bergen at the Laboratory for Emerging Intelligence. My research interests are in natural language processing, large language models, and reinforcement learning. I am particularly interested in reinforcement learning with verifiable rewards for LLM reasoning, the data and compute budgets behind post-training, and rigorous, contamination-free evaluation of language models.',
    'Recent work includes <a href="https://arxiv.org/abs/2608.01522" target="_blank" rel="noopener">Question Begets Question</a>, a self-evolving curriculum for reinforcement fine-tuning on competition mathematics; <a href="https://arxiv.org/abs/2604.16742" target="_blank" rel="noopener">CT Open</a> (COLM 2026), a live, uncontaminated benchmark for clinical trial outcome prediction; and ongoing projects on what rollout tokens buy in RLVR and on discovering executable operations inside language models.',
    'Before UC San Diego, I received my B.Eng. in Communication Engineering from the University of Electronic Science and Technology of China (UESTC), where I worked on efficient real-time object detection.',
  ],

  news: [
    { date: "Sep 2026", text: 'Submitted three papers to <strong>ICLR 2027</strong>: <em>What Do Rollout Tokens Buy?</em>, <em>Latent Assembly</em>, and <em>DeepImagine</em>.' },
    { date: "Aug 2026", text: '<em>Question Begets Question</em> is now on <a href="https://arxiv.org/abs/2608.01522" target="_blank" rel="noopener">arXiv</a> and under review at <strong>AAAI 2027</strong>.' },
    { date: "Jul 2026", text: 'CT Open is accepted to <strong>COLM 2026</strong>!' },
    { date: "Jul 2026", text: 'Served as a student volunteer (session monitor) at <strong>ACL 2026</strong> in San Diego.' },
    { date: "Apr 2026", text: 'The CT Open preprint is on <a href="https://arxiv.org/abs/2604.16742" target="_blank" rel="noopener">arXiv</a> and the <a href="https://ct-open.net/" target="_blank" rel="noopener">CT Open platform</a> is live.' },
    { date: "Dec 2025", text: 'Started my M.S. in Computer Engineering at UC San Diego.' },
    { date: "Mar 2025", text: '<em>Improved RT-DETR Based on MobileNetV4 for Vehicle Detection</em> appears at ICAACE 2025.' },
  ],

  /*
    Publication fields:
      title, authors (HTML; wrap your own name in <strong>), venue,
      status (e.g. "Under review"; null when accepted/published),
      venueNote (highlighted note such as "Oral"), tldr,
      paper / website / code (URLs or null), citation (BibTeX or null).
    Entries are shown in this order.
  */
  publications: [
    {
      title: "What Do Rollout Tokens Buy? Hidden Costs and Budgeted Accuracy in RLVR",
      // TODO: author list (the submission PDF is anonymized).
      authors: null,
      venue: "ICLR 2027",
      status: "Under review",
      venueNote: null,
      tldr: "In reinforcement learning with verifiable rewards on competition mathematics, more rollout tokens do not mean more correct answers. Replacing a third of a SmolLM3-3B training set with harder problems doubles response length on the unchanged problems at a similar training reward; halving the training response limit of Qwen3.5-9B cuts training compute by 28% while raising majority-vote accuracy from 36.1% to 43.5%; and counting problems with any correct sample versus the answer a model actually returns can rank a base model and its RL-trained version in opposite orders. We suggest judging RLVR training choices by the tokens they add on unchanged problems and by the answers returned under a fixed token budget.",
      paper: null,
      website: null,
      code: null,
      citation: null,
    },
    {
      title: "Latent Assembly: Causal Discovery and Cross-Task Linking of Executable Operations in Language Models",
      // TODO: author list (the submission PDF is anonymized).
      authors: null,
      venue: "ICLR 2027",
      status: "Under review",
      venueNote: null,
      tldr: "A causal framework that decompiles language-model computation into typed program states, state-dependent operations, and the neural interfaces through which one operation's output becomes another's input. It recovers ground-truth operation classes in controlled transformers and discovers SELECT and LOAD operations in pretrained Qwen, Gemma, and Llama models. Three operations discovered independently on separate tasks can be linked into a chain that executes a new task at 84% accuracy with no target-task fitting, exceeding Qwen 14B's zero-shot performance.",
      paper: null,
      website: null,
      code: null,
      citation: null,
    },
    {
      title: "DeepImagine: Clinical Trial Outcome Prediction via Stepwise Local Counterfactual Imaginations",
      // TODO: the arXiv v2 author list (below) does not include Yang Zhang;
      // insert your name at the correct position for the ICLR version.
      authors: "Youze Zheng*, Jianyou Wang*, Yuhan Chen*, Matthew Feng, Longtian Bao, Hanyuan Zhang, Maxim Khan, Aditya K. Sehgal, Christopher D. Rosin, Umber Dube, Ramamohan Paturi",
      venue: "ICLR 2027",
      status: "Under review",
      venueNote: null,
      tldr: "Predicts the outcome of a target clinical trial by starting from a historical trial with observed results and asking a language model, one differing factor at a time, how the imagined outcome changes. This stepwise local counterfactual imagination beats direct one-step prediction and traditional outcome predictors across off-the-shelf LLMs, improves further when multiple imagination pathways from different anchors are aggregated, and improves again when specialized per-factor models trained on natural counterfactuals with synthetic reasoning traces replace the general-purpose LLM.",
      paper: "https://arxiv.org/abs/2604.23054",
      website: null,
      code: "https://github.com/deepimagine-counterfactual/DeepImagine",
      citation: `@misc{zheng2026deepimagine,
  title={DeepImagine: Clinical Trial Outcome Prediction via Stepwise Local Counterfactual Imaginations},
  author={Youze Zheng and Jianyou Wang and Yuhan Chen and Matthew Feng and Longtian Bao and Hanyuan Zhang and Maxim Khan and Aditya K. Sehgal and Christopher D. Rosin and Umber Dube and Ramamohan Paturi},
  year={2026},
  eprint={2604.23054},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2604.23054}
}`,
    },
    {
      title: "Question Begets Question: Self-Evolving Curriculum for Reinforcement Fine-Tuning on Competition Mathematics",
      authors: "Longtian Bao*, Jianyou Wang*, <strong>Yang Zhang*</strong>, Youze Zheng*, Ramamohan Paturi",
      venue: "AAAI 2027",
      status: "Under review",
      venueNote: null,
      tldr: "Fine-tuning Qwen2.5-Math-7B on AIME (initially 5.6% pass@1) with reinforcement learning on problem statements and final answers only, never on teacher reasoning traces. Question-begets-Question (QbQ) has a teacher rewrite existing problems into diverse variants that probe the same skills; static training on such data plateaus at 12.5-14.5%. A self-evolving curriculum that each round seeds QbQ from the problems the current checkpoint can mostly solve breaks this ceiling and reaches 16.5% pass@1 under an identical data budget, with no sign of saturation after 20 rounds, and the model goes on to solve harder problems never seen in training.",
      paper: "https://arxiv.org/abs/2608.01522",
      website: null,
      code: null,
      citation: `@misc{bao2026questionbegetsquestion,
  title={Question Begets Question: Self-Evolving Curriculum for Reinforcement Fine-Tuning on Competition Mathematics},
  author={Longtian Bao and Jianyou Wang and Yang Zhang and Youze Zheng and Ramamohan Paturi},
  year={2026},
  eprint={2608.01522},
  archivePrefix={arXiv},
  primaryClass={cs.LG},
  url={https://arxiv.org/abs/2608.01522}
}`,
    },
    {
      title: "CT Open: An Open-Access, Uncontaminated, Live Platform for the Open Challenge of Clinical Trial Outcome Prediction",
      authors: "Jianyou Wang*, Youze Zheng*, Longtian Bao*, Hanyuan Zhang*, Qirui Zheng, Yuhan Chen, <strong>Yang Zhang</strong>, Matthew Feng, Maxim Khan, Aditya K. Sehgal, Christopher D. Rosin, Ramamohan Paturi, Umber Dube, Leon Bergen",
      venue: "COLM 2026",
      status: null,
      venueNote: null,
      tldr: "A live, open-access platform that runs four clinical trial outcome prediction challenges a year and scores submissions on trials whose outcomes were not yet public at submission time. A fully automated decontamination pipeline uses iterative LLM-powered web search to find the earliest public mention of each trial's outcome, validated against expert annotations, so participants may use any method and any data source. The paper releases a training set and two time-stamped test benchmarks (Winter 2025 and Summer 2025).",
      paper: "https://arxiv.org/abs/2604.16742",
      website: "https://ct-open.net/",
      code: "https://github.com/ClinicalTrial-OpenChallenge/CT_Open",
      citation: `@inproceedings{wang2026ctopen,
  title={{CT} Open: An Open-Access, Uncontaminated, Live Platform for the Open Challenge of Clinical Trial Outcome Prediction},
  author={Jianyou Wang and Youze Zheng and Longtian Bao and Hanyuan Zhang and Qirui Zheng and Yuhan Chen and Yang Zhang and Matthew Feng and Maxim Khan and Aditya K. Sehgal and Christopher D. Rosin and Ramamohan Paturi and Umber Dube and Leon Bergen},
  booktitle={Third Conference on Language Modeling},
  year={2026},
  url={https://openreview.net/forum?id=pbGCyTrXsl}
}`,
    },
    {
      title: "Improved RT-DETR Based on MobileNetV4 for Vehicle Detection",
      authors: "<strong>Yang Zhang</strong>",
      venue: "ICAACE 2025",
      status: null,
      venueNote: null,
      tldr: "Replaces the RT-DETR backbone with MobileNetV4 for real-time vehicle detection on mobile and edge devices. RT-DETR-MobileNetV4-Small matches, and in some cases exceeds, the accuracy of other RT-DETR variants on a COCO-format vehicle dataset with only 11M parameters and 38 GFLOPs: 65% fewer parameters and 75% less computation than RT-DETR-L, and 45% / 54% less than RT-DETR-R18.",
      paper: "https://doi.org/10.1109/ICAACE65325.2025.11019497",
      website: null,
      code: null,
      citation: `@inproceedings{zhang2025rtdetr,
  title={Improved RT-DETR Based on MobileNetV4 for Vehicle Detection},
  author={Yang Zhang},
  booktitle={2025 8th International Conference on Advanced Algorithms and Control Engineering (ICAACE)},
  year={2025},
  organization={IEEE},
  doi={10.1109/ICAACE65325.2025.11019497}
}`,
    },
  ],

  /*
    Service entries: { role, venue, meta }.
  */
  service: [
    {
      role: "Student Volunteer (session monitor)",
      venue: "ACL 2026",
      meta: "San Diego, CA, July 2026",
    },
  ],

  footer: {
    updated: "September 2026",
  },
};
