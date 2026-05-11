const publications = [
  // 2026
  {
    year: 2026,
    month: "July",
    title:
      "Shape of Thought: Progressive Object Assembly via Visual Chain-of-Thought",
    authors:
      "<b>Yu Huo*</b>, Siyu Zhang*, Kun Zeng*, Haoyue Liu, Owen Lee, Junlin Chen, Yuquan Lu, Yifu Guo, Yaodong Liang, Xiaoying Tang",
    venue: "ICML 2026",
    note: "* Equal contribution",
    description:
      "A visual Chain-of-Thought framework for progressive object assembly with interleaved textual plans and rendered intermediate states",
    image: "./src/img/SoT.png",
    links: [
      { name: "paper", url: "https://arxiv.org/abs/2601.21081" },
      {
        name: "code",
        url: "https://anonymous.4open.science/r/16FE/",
      },
      {
        name: "Dataset",
        url: "https://anonymous.4open.science/r/16FE/",
      },
    ],
    abstract:
      "Multimodal models for text-to-image generation have achieved strong visual fidelity, yet they remain brittle under compositional structural constraints—notably generative numeracy, attribute binding, and part-level relations. To address these challenges, we propose Shape-of-Thought (SoT), a visual CoT framework that enables progressive shape assembly via coherent 2D projections without external engines at inference time. SoT trains a unified multimodal autoregressive model to generate interleaved textual plans and rendered intermediate states, helping the model capture shape-assembly logic without producing explicit geometric representations. To support this paradigm, we introduce SoT-26K, a large-scale dataset of grounded assembly traces derived from part-based CAD hierarchies, and T2S-CompBench, a benchmark for evaluating structural integrity and trace faithfulness. Fine-tuning on SoT-26K achieves 88.4% on component numeracy and 84.8% on structural topology, outperforming text-only baselines by around 20%. SoT establishes a new paradigm for transparent, process-supervised compositional generation.",
    selected: true,
  },
  {
    year: 2026,
    month: "July",
    title:
      "RepoShapley: Shapley-Enhanced Context Filtering for Repository-Level Code Completion",
    authors:
      "<b>Yu Huo*</b>, Kun Zeng, Siyu Zhang*, Yuquan Lu, Cheng Yang, Yifu Guo, Xiaoying Tang",
    venue: "ACL 2026",
    note: "* Equal contribution",
    description:
      "A coalition-aware context filtering framework for repository-level code completion",
    image: "./src/img/RepoShapley.png",
    links: [
      { name: "paper", url: "https://arxiv.org/abs/2601.03378" },
      {
        name: "code",
        url: "https://github.com/yuhuo03/RepoShapley",
        id: "reposhapley-stars",
        repo: "yuhuo03/RepoShapley",
      },
    ],
    abstract:
      "Repository-level code completion benefits from retrieval-augmented generation (RAG). However, controlling cross-file evidence is difficult because chunk utility is often interaction-dependent: some snippets help only when paired with complementary context, while others harm decoding when they conflict. We propose RepoShapley, a coalition-aware context filtering framework supervised by Shapley-style marginal contributions. Our offline labeling module, ChunkShapley, estimates signed per-chunk effects via teacher-forced probing, feeds them into a lightweight surrogate game that captures saturation and interference, computes exact Shapley values for small retrieval sets, and selects a decoding-optimal coalition through bounded post-verification with the frozen generator. The verified keep/drop decisions and retrieval triggers are then distilled into a single model via discrete control tokens. Experiments across benchmarks and backbones show that RepoShapley improves completion quality while reducing harmful context and unnecessary retrieval.",
    selected: true,
  },
  {
    year: 2026,
    month: "May",
    title:
      "Group of Skills: Group-Structured Skill Retrieval for Agent Skill Libraries",
    authors:
      "Kun Zeng*, <b>Yu Huo*</b>, Siyu Zhang, Zi Ye, Yuecheng Zhuo, Haoyue Liu, Yuquan Lu, Junhao Wen, Xiaoying Tang",
    venue: "arXiv preprint 2026",
    note: "* Equal contribution",
    description:
      "A group-structured skill retrieval framework for agent skill libraries",
    image: "./src/img/goskills.png",
    links: [
      { name: "paper", url: "https://arxiv.org/abs/2605.06978" },
      {
        name: "code",
        url: "https://anonymous.4open.science/r/Group-of-Skills-E861",
      },
    ],
    abstract:
      "Skill-augmented agents increasingly rely on large reusable skill libraries, but retrieving relevant skills is not the same as presenting usable context. Existing methods typically return atomic skills or dependency-aware bundles whose internal roles remain implicit, leaving the agent to infer the execution entry point, support skills, visible requirements, and failure-avoidance guidance. We introduce Group of Skills (GoSkills), an inference-time group-structured retrieval method that changes the agent-facing retrieval object from a flat skill list to a compact, role-labeled execution context. GoSkills builds anchor-centered skill groups from a typed skill graph, expands support groups through a group graph, bottlenecks the selected group plan into a bounded set of atomic skill payloads, and renders a fixed execution contract with Start, Support, Check, and Avoid fields, without changing the downstream agent, skill payloads, or execution environment. Experiments on SkillsBench and ALFWorld show that GoSkills preserves visible-requirement coverage under a small skill budget, improves over flat skill-access baselines, and often improves reward and agent-only runtime relative to structural retrieval references.",
    selected: false,
  },
  {
    year: 2026,
    month: "March",
    title:
      "From Brewing to Resolution: Tracing the Internal Lifecycle of Code Reasoning in LLMs",
    authors:
      "Yiyang Guo, Shuai Chen, Yuquan Lu, Jiarui Lin, Zongwei Xu, Jin Lin, Siyu Zhang, Cheng Yang, Jiawei Li, Yiming Li, <b>Yu Huo</b>, Ruicheng Wang",
    venue: "arXiv preprint 2026",
    description:
      "An analysis of the internal lifecycle of code reasoning in large language models",
    image: "./src/img/code_reasoning_lifecycle.png",
    links: [
      {
        name: "paper",
        url: "https://openreview.net/forum?id=N81uoJOEZ0",
      },
    ],
    abstract:
      "Standard accuracy metrics cannot explain why LLMs handle variable tracking but fail on semantically equivalent loops. We reveal a universal internal lifecycle governing how LLMs process code: models first brew the answer—making it linearly recoverable many layers before it becomes self-decodable—then diverge into one of four causally validated resolution outcomes (Resolved, Overprocessed, Misresolved, or Unresolved). Understanding this lifecycle matters because similar task accuracies can mask fundamentally different failure modes that surface-level evaluation cannot detect. We introduce a dual diagnostic framework pairing layer-wise linear probing with Context-Stripped Decoding (CSD) and apply it to six code-reasoning task families across 16 models spanning Qwen, Llama, and DeepSeek architectures. All four outcomes carry substantial mass in every task family—overall Resolved is only 41.5%, with multiple tasks below 30%. Controlled sweeps over structure, depth, and operators expose task-specific failure bottlenecks: Function Call Resolved plunges from 61.1% to 2.5% as call depth increases from one to three. Across architectures and scales, the brewing scaffold remains stable (normalized brewing duration 24–42% across all 16 models) while resolution success varies with capability, indicating that the computational mechanism is architectural while resolution success is parametric.",
    selected: false,
  },
  {
    year: 2026,
    month: "March",
    title:
      "Zero-Forgetting Class-Incremental Semantic Segmentation via Dual-Phase Cognitive Cascades",
    authors:
      "Yuquan Lu*, Yifu Guo*, Zishan Xu, Siyu Zhang, <b>Yu Huo</b>, Siyue Chen, Siyan Wu, Chenghua Zhu, Ruixuan Wang",
    venue: "arXiv preprint 2026",
    description:
      "A dual-phase cognitive cascade framework for class-incremental semantic segmentation",
    image: "./src/img/cogcas.png",
    links: [
      { name: "paper", url: "https://arxiv.org/abs/2603.13874" },
    ],
    abstract:
      "Continual semantic segmentation (CSS) is a cornerstone task in computer vision that enables a wide range of downstream applications, but faces the catastrophic forgetting challenge. In conventional class-incremental semantic segmentation (CISS) frameworks using Softmax-based classification heads, catastrophic forgetting originates from competing logit outputs and task affiliation probability. We formulate these problems and provide a theoretical analysis to more deeply understand the limitations in existing CISS methods, particularly Strict Parameter Isolation (SPI). To address these challenges, we follow a dual-phase intuition from human annotators, and introduce Cognitive Cascade Segmentation (CogCaS), a novel dual-phase cascade formulation for CSS tasks in the CISS setting. By decoupling the task into class-existence detection and class-specific segmentation, CogCaS enables more effective continual learning, preserving previously learned knowledge while incorporating new classes. Using two benchmark datasets PASCAL VOC 2012 and ADE20K, we have shown significant improvements in a variety of challenging scenarios, particularly those with long sequence of incremental tasks, when compared to existing state-of-the-art methods.",
    selected: false,
  },

  
  // {
  //   year: 2026,
  //   month: "April",
  //   title:
  //     "Presenting a Paper is an Art: Self-Improvement Aesthetic Agents for Academic Presentations",
  //   authors:
  //     "Chengzhi Liu*, <b>Yuzhe Yang*</b>, Kaiwen Zhou, Zhen Zhang, Yue Fan, Yannan Xie, Peng Qi, Xin Eric Wang",
  //   venue: "Proceedings of ICLR 2026",
  //   note: "<a><b>Spotlight</b></a>, <em>ICLR 2026 Workshop on AI with Recursive Self-Improvement</em>",
  //   description:
  //     "A self-improvement agent generating presentation videos from academic papers",
  //   image: "./src/img/EvoPresent.png",
  //   links: [
  //     { name: "paper", url: "https://arxiv.org/pdf/2510.05571" },
  //     {
  //       name: "code",
  //       url: "https://github.com/eric-ai-lab/EvoPresent",
  //       id: "evopresent-stars",
  //       repo: "eric-ai-lab/EvoPresent",
  //     },
  //     {
  //       name: "Website",
  //       url: "https://evopresent.github.io/",
  //     },
  //     {
  //       name: "Dataset",
  //       url: "https://huggingface.co/datasets/TobyYang7/EvoPresent",
  //     },
  //   ],
  //   abstract:
  //     "The promotion of academic papers has become an important means of enhancing research visibility. However, existing automated methods struggle limited storytelling, insufficient aesthetic quality, and constrained self-adjustment, making it difficult to achieve efficient and engaging dissemination. At the heart of those challenges is a simple principle: <b>there is no way to improve it when you cannot evaluate it right</b>. To address this, we introduce <b>EvoPresent</b>, a self-improvement agent framework that unifies coherent narratives, aesthetic-aware designs, and realistic presentation delivery via virtual characters. Central to EvoPresent is <b>PresAesth</b>, a multi-task reinforcement learning (RL) aesthetic model that provides reliable aesthetic scoring, defect adjustment, and comparative feedback, enabling iterative self-improvement even under limited aesthetic training data. To systematically evaluate the methods, we introduce <b>EvoPresent Benchmark</b>, a comprehensive benchmark comprising: <i>Presentation Generation Quality</i>, built on 650 top-tier AI conference papers with multimodal resources (slides, videos and scripts) to assess both content and design; and <i>Aesthetic Awareness</i>, consisting of 2,000 slide pairs with varying aesthetic levels, supporting joint training and evaluation on scoring, defect adjustment, and comparison. Our findings highlight that (i) High-quality feedback is essential for agent self-improvement, while initial capability alone does not guarantee effective self-correction. (ii) Automated generation pipelines exhibit a trade-off between visual design and content construction. (iii) Multi-task RL training shows stronger generalization in aesthetic awareness tasks.",
  //   selected: true,
  // },
  
  // 2025
  {
    year: 2025,
    month: "July",
    title:
      "FedGF: Layer-Wise Federated Learning with Group Fairness Guarantees",
    authors:
      "<b>Yu Huo*</b>, Yating Li*, Xiaoying Tang",
    venue: "ICIC 2025 (Oral)",
    note: "* Equal contribution",
    description:
      "A layer-wise federated learning method with both client-level and group-level fairness guarantees",
    image: "./src/img/FedGF.png",
    links: [
      {
        name: "paper",
        url: "https://link.springer.com/chapter/10.1007/978-981-95-0011-6_33",
      },
      {
        name: "code",
        url: "https://github.com/yuhuo03/FedGF",
        id: "fedgf-stars",
        repo: "yuhuo03/FedGF",
      },
    ],
    abstract:
      "Federated Learning (FL) enables collaborative training without sharing raw data but often suffers fairness issues under non-IID distributions. Prior work targets client-level fairness yet overlooks demographic-group biases. We propose FedGF, a layer-wise method that embeds demographic-parity constraints into each layer's descent direction, jointly optimizing accuracy, client fairness, and group fairness. Extensive experiments on benchmark datasets demonstrate that FedGF reduces group accuracy gaps by 78% compared to state-of-the-art methods while maintaining comparable model performance. Our method establishes new benchmarks for both client fairness (0.0862 fairness indicator on FMNIST) and group fairness (0.0002 demographic parity difference on CIFAR-10), highlighting its effectiveness in creating more equitable federated learning systems.",
    selected: true,
  },
  {
    year: 2025,
    month: "August",
    title:
      "Optimal Boost Design for Auto-bidding Mechanism with Publisher Quality Constraints",
    authors:
      "Huanyu Yan*, <b>Yu Huo*</b>, Min Lu, Weitong Ou, Xingyan Shi, Ruihe Shi, Xiaoying Tang",
    venue: "arXiv preprint 2025",
    note: "* Equal contribution",
    description:
      "An optimal boost design framework for auto-bidding mechanisms with publisher quality constraints",
    image: "./src/img/q-Boost.png",
    links: [
      { name: "paper", url: "https://arxiv.org/abs/2508.08772" },
      {
        name: "code",
        url: "https://github.com/yuhuo03/q-Boost",
        id: "qboost-stars",
        repo: "yuhuo03/q-Boost",
      },
    ],
    abstract:
      "Online bidding serves as a fundamental information system in mobile ecosystems, facilitating real-time ad allocation across billions of devices while optimizing both platform performance and user experience. This paper investigates the design of optimal boost factors in online bidding while incorporating quality value (the impact of displayed ads on publishers' long-term benefits). To address the divergent interests on quality, we establish a three-party auction framework with a unified welfare metric of advertiser and publisher. Within this framework, we derive the theoretical efficiency lower bound for C-competitive boost in second-price single-slot auctions, then design a novel Quality-involved Boosting (q-Boost) algorithm for computing the optimal boost factor. Experimental validation on Alibaba's AuctionNet dataset demonstrates 2%-6% welfare improvements over conventional approaches.",
    selected: false,
  },
];
