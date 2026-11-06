/*
  All page content lives here. Edit this file to update the site;
  index.html / script.js only render it.

  Publication fields:
    id         anchor used by [[id]] references in `interests`
    title, authors (HTML; wrap your own name in <strong>; null hides the line)
    venue      e.g. "COLM 2026", "arXiv 2026", "Under review"
    award      optional highlighted note such as "Oral Spotlight"
    thumb      { src, alt, width, height } or null
    tldr       one or two sentences
    paper / website / code / talk   URLs or null
    citation   BibTeX or null
  Entries are shown in this order and numbered 1..n.
*/
window.profileData = {
  basics: {
    name: "Yang Zhang",
    tagline: "M.S. student in Computer Engineering, UC San Diego",
    location: "San Diego, CA",
    email: "yaz124@ucsd.edu",
    emailDisplay: "yaz124 [at] ucsd [dot] edu",
    // Header links. Set a value to null to hide that link.
    scholar: "https://scholar.google.com/citations?user=IVB_6X4AAAAJ&hl=en",
    linkedin: "https://www.linkedin.com/in/yang-zhang-8b2181442/",
    github: null,
    cv: "Yang_Zhang_CV.pdf",
    // Square portrait; the block is hidden automatically if the file is missing.
    portrait: "assets/profile.jpg",
  },

  bio: [
    'I am a master\'s student in Computer Engineering at UC&nbsp;San&nbsp;Diego, studying language models in the <a href="https://lei.ucsd.edu/" target="_blank" rel="noopener">Laboratory for Emerging Intelligence</a>, advised by <a href="https://cseweb.ucsd.edu/~paturi/" target="_blank" rel="noopener">Ramamohan&nbsp;Paturi</a>. I work on reinforcement learning with verifiable rewards for LLM reasoning, the token and compute budgets behind post-training and serving, and contamination-free evaluation.',
    'Before UC San Diego, I received my B.Eng. in Communication Engineering from the University of Electronic Science and Technology of China (UESTC), where I worked on real-time object detection.',
  ],

  /* Education entries: { degree, school, note, when }. */
  education: [
    {
      degree: "M.S. in Computer Engineering",
      school: "University of California San Diego",
      note: "Advisor: Ramamohan Paturi",
      when: "Dec. 2025 – Present",
    },
    {
      degree: "B.Eng. in Communication Engineering",
      school: "University of Electronic Science and Technology of China (UESTC)",
      note: null,
      when: "Sept. 2021 – Jun. 2025",
    },
  ],

  /*
    Each interest is HTML. Write [[id]] or [[id1,id2]] to cite publications
    by their `id`; the script replaces it with numbered links.
  */
  interests: [
    '<b>LLM post-training and reasoning.</b> Reinforcement learning with verifiable rewards on competition mathematics: what the rollout tokens actually buy [[rollout-tokens]], and self-evolving curricula of synthetic problems that break the ceiling of static training [[qbq]].',
    '<b>AI for science.</b> Forecasting clinical trial outcomes before they become public, through a live, uncontaminated benchmark [[ct-open]] and stepwise counterfactual imagination [[deepimagine]].',
    '<b>Efficient LLM serving.</b> KV-cache compression and fused kernels for serving looped transformers, where precision has to be allocated per (loop, layer) cell [[loopkv]].',
    '<b>Interpretability.</b> Decompiling language-model computation into executable operations that can be linked into new programs [[latent-assembly]].',
  ],

  publications: [
    {
      id: "loopkv",
      title: "LoopKV: Loop-Aware KV Cache Compression for Serving Looped Transformers",
      authors: "Tianle&nbsp;Zhou*, <strong>Yang&nbsp;Zhang*</strong>, Tianyu&nbsp;Wu*, Zhuohan&nbsp;Wang*, William&nbsp;Nixon, Juncheng&nbsp;Yang",
      venue: "arXiv 2026",
      award: null,
      thumb: { src: "assets/pubs/loopkv.png", alt: "Diagram: LoopKV profiles each (loop, layer) cell offline, then a fused kernel reads 4-bit, 2-bit or shared KV at attention-aware precision", width: 1200, height: 458 },
      tldr: "Profile each (loop, layer) cell of a looped transformer's KV cache once, let a knapsack planner choose 4-bit, 2-bit or shared storage per cell, and read values at attention-aware precision in one fused vLLM kernel: 35% less KV than uniform INT4 and 1.7–2.2× its goodput on Ouro-1.4B, with no significant accuracy loss on six public benchmarks.",
      paper: "https://arxiv.org/abs/2611.04137",
      website: null,
      code: null,
      talk: null,
      citation: `@misc{zhou2026loopkv,
  title={LoopKV: Loop-Aware KV Cache Compression for Serving Looped Transformers},
  author={Tianle Zhou and Yang Zhang and Tianyu Wu and Zhuohan Wang and William Nixon and Juncheng Yang},
  year={2026},
  eprint={2611.04137},
  archivePrefix={arXiv},
  primaryClass={cs.LG},
  url={https://arxiv.org/abs/2611.04137}}`,
    },
    {
      id: "rollout-tokens",
      title: "What Do Rollout Tokens Buy? Hidden Costs and Budgeted Accuracy in RLVR",
      // Double-blind submission: co-authors withheld until the review ends.
      authors: "<strong>Yang&nbsp;Zhang</strong>, et&nbsp;al. (co-authors withheld during double-blind review)",
      venue: "Under review",
      award: null,
      thumb: { src: "assets/pubs/rollout-tokens.png", alt: "Plots: harder training problems double tokens per response on unchanged problems; halving the training limit of Qwen3.5-9B cuts compute 28% and raises majority-vote accuracy 7.4 points", width: 1200, height: 459 },
      tldr: "In RLVR on competition mathematics, more rollout tokens do not buy more correct answers: harder training problems double the cost of the unchanged problems, halving the training response limit cuts compute by 28% while raising majority-vote accuracy from 36.1% to 43.5%, and coverage and majority vote can rank a base model and its RL-trained version in opposite orders.",
      paper: null,
      website: null,
      code: null,
      talk: null,
      citation: null,
    },
    {
      id: "latent-assembly",
      title: "Latent Assembly: Causal Discovery and Cross-Task Linking of Executable Operations in Language Models",
      authors: "<strong>Yang&nbsp;Zhang</strong>, et&nbsp;al. (co-authors withheld during double-blind review)",
      venue: "Under review",
      award: null,
      thumb: { src: "assets/pubs/latent-assembly.png", alt: "Diagram: discover operations from residual-stream activations, link a producer's return to a consumer, execute an unseen program at 0.84 accuracy versus 0.49 zero-shot", width: 1200, height: 587 },
      tldr: "A causal framework decompiles language-model computation into typed program states, executable operations and the neural interfaces between them; three operations discovered independently on separate tasks link into a chain that executes a new task at 84% accuracy with no target-task fitting, above Qwen 14B's zero-shot answer.",
      paper: null,
      website: null,
      code: null,
      talk: null,
      citation: null,
    },
    {
      id: "deepimagine",
      title: "DeepImagine: Clinical Trial Outcome Prediction via Stepwise Local Counterfactual Imaginations",
      // Double-blind submission: co-authors withheld until the review ends.
      authors: "<strong>Yang&nbsp;Zhang</strong>, et&nbsp;al. (co-authors withheld during double-blind review)",
      venue: "arXiv 2026",
      award: null,
      thumb: { src: "assets/pubs/deepimagine.png", alt: "Diagram: DeepImagine changes one trial factor at a time, from a historical trial with an observed result to the target trial", width: 1200, height: 462 },
      tldr: "Start from a historical trial with an observed result and change one differing factor at a time; this stepwise local counterfactual imagination beats direct and RAG prediction across off-the-shelf LLMs, and per-factor Gemma-3-12B specialists trained on natural counterfactuals reach 78.7 macro-F1 on CT Open, close to GPT-5 in the same framework.",
      paper: "https://arxiv.org/abs/2604.23054",
      website: null,
      code: "https://github.com/deepimagine-counterfactual/DeepImagine",
      talk: null,
      citation: `@misc{zheng2026deepimagine,
  title={DeepImagine: Clinical Trial Outcome Prediction via Stepwise Local Counterfactual Imaginations},
  author={Youze Zheng and Jianyou Wang and Yuhan Chen and Matthew Feng and Longtian Bao and Hanyuan Zhang and Maxim Khan and Aditya K. Sehgal and Christopher D. Rosin and Umber Dube and Ramamohan Paturi},
  year={2026},
  eprint={2604.23054},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2604.23054}}`,
    },
    {
      id: "qbq",
      title: "Question Begets Question: Self-Evolving Curriculum for Reinforcement Fine-Tuning on Competition Mathematics",
      authors: "Longtian&nbsp;Bao*, Jianyou&nbsp;Wang*, <strong>Yang&nbsp;Zhang*</strong>, Youze&nbsp;Zheng*, Ramamohan&nbsp;Paturi",
      venue: "arXiv 2026",
      award: null,
      thumb: { src: "assets/pubs/qbq.png", alt: "Diagram: each round trains the model, groups problems by pass@16, and seeds new QbQ problems from those the model mostly solves", width: 1200, height: 466 },
      tldr: "Train a model with RL on teacher-generated variants of the problems it can mostly solve, re-seeded every round: under a fixed data budget this lifts Qwen2.5-Math-7B from 5.6% to 16.5% AIME pass@1, past the 12.5–14.5% ceiling of static augmentation, with no sign of saturation after 20 rounds.",
      paper: "https://arxiv.org/abs/2608.01522",
      website: null,
      code: null,
      talk: null,
      citation: `@misc{bao2026questionbegetsquestion,
  title={Question Begets Question: Self-Evolving Curriculum for Reinforcement Fine-Tuning on Competition Mathematics},
  author={Longtian Bao and Jianyou Wang and Yang Zhang and Youze Zheng and Ramamohan Paturi},
  year={2026},
  eprint={2608.01522},
  archivePrefix={arXiv},
  primaryClass={cs.LG},
  url={https://arxiv.org/abs/2608.01522}}`,
    },
    {
      id: "ct-open",
      title: "CT Open: An Open-Access, Uncontaminated, Live Platform for the Open Challenge of Clinical Trial Outcome Prediction",
      authors: "Jianyou&nbsp;Wang*, Youze&nbsp;Zheng*, Longtian&nbsp;Bao*, Hanyuan&nbsp;Zhang*, Qirui&nbsp;Zheng, Yuhan&nbsp;Chen, <strong>Yang&nbsp;Zhang</strong>, Matthew&nbsp;Feng, Maxim&nbsp;Khan, Aditya&nbsp;K.&nbsp;Sehgal, Christopher&nbsp;D.&nbsp;Rosin, Ramamohan&nbsp;Paturi, Umber&nbsp;Dube, Leon&nbsp;Bergen",
      venue: "COLM 2026",
      award: null,
      thumb: { src: "assets/pubs/ct-open.png", alt: "Diagram: the agentic LLM workflow that searches the web for the earliest public mention of a trial's outcome", width: 1200, height: 314 },
      tldr: "A live, open-access platform that scores clinical trial outcome predictions only on trials whose results were not yet public at submission time, backed by an automated, expert-validated decontamination pipeline; releases a training set and two time-stamped test benchmarks (Winter 2025, Summer 2025).",
      paper: "https://arxiv.org/abs/2604.16742",
      website: "https://ct-open.net/",
      code: "https://github.com/ClinicalTrial-OpenChallenge/CT_Open",
      talk: null,
      citation: `@inproceedings{wang2026ctopen,
  title={{CT} Open: An Open-Access, Uncontaminated, Live Platform for the Open Challenge of Clinical Trial Outcome Prediction},
  author={Jianyou Wang and Youze Zheng and Longtian Bao and Hanyuan Zhang and Qirui Zheng and Yuhan Chen and Yang Zhang and Matthew Feng and Maxim Khan and Aditya K. Sehgal and Christopher D. Rosin and Ramamohan Paturi and Umber Dube and Leon Bergen},
  booktitle={Third Conference on Language Modeling},
  year={2026},
  url={https://openreview.net/forum?id=pbGCyTrXsl}}`,
    },
    {
      id: "rt-detr",
      title: "Improved RT-DETR Based on MobileNetV4 for Vehicle Detection",
      authors: "<strong>Yang&nbsp;Zhang</strong>",
      venue: "ICAACE 2025",
      award: null,
      thumb: { src: "assets/pubs/rt-detr.jpg", alt: "Diagram: RT-DETR with its backbone replaced by MobileNetV4-Small/Medium, feeding the efficient hybrid encoder, query selection and decoder", width: 1200, height: 386 },
      tldr: "Replacing the RT-DETR backbone with MobileNetV4 gives a real-time vehicle detector for edge devices: the Small variant reaches 97.3 mAP50 with 11M parameters and 27 GFLOPs (65% fewer parameters and 75% less computation than RT-DETR-L), and the Medium variant reaches 98.4 mAP50 / 78.7 mAP50-95, the highest of 23 compared detectors, at 17M parameters and 38 GFLOPs.",
      paper: "https://doi.org/10.1109/ICAACE65325.2025.11019497",
      website: null,
      code: null,
      talk: null,
      citation: `@inproceedings{zhang2025rtdetr,
  title={Improved RT-DETR Based on MobileNetV4 for Vehicle Detection},
  author={Yang Zhang},
  booktitle={2025 8th International Conference on Advanced Algorithms and Control Engineering (ICAACE)},
  pages={901--906},
  year={2025},
  organization={IEEE},
  doi={10.1109/ICAACE65325.2025.11019497}}`,
    },
  ],

  /* Honors: { text, note, when }. */
  honors: [
    { text: "1st Place, UCSD x Medeloop Health Research Competition", note: null, when: "2026" },
    { text: "UESTC Merit Scholarship for Exceptional Student (top 10%)", note: null, when: "2024" },
    { text: "UESTC Merit Scholarship (top 30%)", note: null, when: "2022, 2023" },
    { text: "Hainan Free Trade Port Merit Scholarship (top 10%)", note: null, when: "2022" },
  ],

  /* Service entries: { role, venue, when }. */
  service: [
    { role: "Reviewer", venue: "ICLR 2027", when: "2026" },
    { role: "Reviewer", venue: "AAAI 2027", when: "2026" },
    { role: "Student Volunteer", venue: "ACL 2026, San Diego, CA", when: "July 2026" },
  ],

  footer: {
    updated: "November 2026",
  },
};
