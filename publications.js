/* Publication data. To add a paper, append an object; the page renders from this list.
   topic: 'libraries' | 'models' | 'llm' | 'efficient'   type: 'article' | 'inproceedings' | 'preprint'
   ccf: CCF recommended list (2022) rank; core: CORE 2023 conference rank. Omit when unranked.
   Preprint example:
   { key: 'duan2026x', type: 'preprint', year: 2026, topic: 'models', tool: 'X', title: '...',
     authors: ['Bin Duan', ...], venue: 'arXiv', fullVenue: 'arXiv preprint', arxiv: '2601.00000', code: '...' } */
window.PUBLICATIONS = Object.freeze([
  {
    key: 'duan2026bayeswarp', ccf: 'A', type: 'article', year: 2026, topic: 'models', tool: 'BayesWarp',
    title: 'Testing Neural Networks via Bayesian-Guided Exploration of Decision Landscapes',
    authors: ['Bin Duan', 'Meiru Che', 'Guowei Yang'],
    venue: 'IEEE TSE', fullVenue: 'IEEE Transactions on Software Engineering',
    doi: '10.1109/TSE.2026.3752325', arxiv: '2606.04314', code: 'https://github.com/beanduan22/BayesWarp_',
    abstract: 'As neural networks are increasingly deployed in safety-critical domains, testing is essential to evaluate and improve their reliability. Existing testing methods, whether black-box or white-box, primarily use global mutation or coverage-guided strategies, both of which struggle to efficiently uncover diverse model failures while remaining proximate to the original data distribution and semantics. We propose BayesWarp, a testing framework that mutates decision-critical input regions identified via interpretable saliency techniques and adaptively guides the testing process using an uncertainty-aware Bayesian Optimization strategy, enabling the discovery of diverse failures while preserving distributional and semantic proximity to the original data. Evaluation on MNIST, CIFAR-10, and ImageNet across six neural network models shows that BayesWarp improves failure discovery, failure diversity, test case quality, and critical neuron coverage under a fixed mutation budget. Moreover, fine-tuning with the generated failure cases leads to improvements in model performance.'
  },
  {
    key: 'duan2026pardef', ccf: 'A', type: 'article', year: 2026, topic: 'models', tool: 'ParDef',
    title: 'Toward a Generalized Defense Across Sparse, Continuous, and Structured Parameter Attacks',
    authors: ['Bin Duan', 'Zeyu Bai', 'Guowei Yang'],
    venue: 'IEEE TDSC', fullVenue: 'IEEE Transactions on Dependable and Secure Computing',
    doi: '10.1109/TDSC.2026.3713473', arxiv: '2606.04317', code: 'https://github.com/beanduan22/ParDef',
    abstract: 'Deep neural networks are increasingly deployed across heterogeneous and partially untrusted environments, exposing model parameters to integrity risks. Unlike input-space adversarial attacks, parameter attacks directly tamper with the model’s internal parameters and persist across all subsequent inferences. Existing defenses either require retraining, incur significant accuracy degradation, or are limited to specific attack classes. We present ParDef, a generalized defense against diverse types of parameter attacks. ParDef integrates keyed channel reparameterization, which obscures sensitive parameter directions, QC-LDPC quantization, which embeds redundancy and supports error correction, and adaptive robust inference, which stabilizes predictions under uncertainty. Evaluation on CIFAR-10, CIFAR-100, and Tiny-ImageNet using ResNet and VGG models shows that ParDef consistently reduces attack success rates while maintaining high model performance and incurring only moderate deployment overhead.'
  },
  {
    key: 'mahmud2026enhancing', ccf: 'A', core: 'A*', type: 'inproceedings', year: 2026, topic: 'llm', tool: 'EnsLLM',
    title: 'Enhancing LLM Code Generation with Ensembles: A Similarity-based Selection Approach',
    authors: ['Tarek Mahmud', 'Bin Duan', 'Corina Pasareanu', 'Guowei Yang'],
    venue: 'ICSE', fullVenue: 'IEEE/ACM International Conference on Software Engineering',
    doi: '10.1145/3744916.3773143', arxiv: '2503.15838', code: 'https://github.com/TSUMahmud/EnsLLM',
    abstract: 'Ensemble learning has been widely used to improve robustness, accuracy, and generalization, but had not been applied to code generation with large language models. Instead of relying on a single model, we generate candidate programs from different LLMs and apply a structured voting mechanism to select the most reliable solution, computing syntactic and semantic similarity with CodeBLEU and behavioral equivalence with CrossHair’s differential behavior analysis. The ensemble consistently outperforms standalone LLMs on HumanEval and LiveCodeBench, reaching 90.2% and 50.2% accuracy, compared with 83.5% and 43.4% for the best single model (GPT-4o). Restricted to free open-source models, it still reaches 80.5% and 41.6%.'
  },
  {
    key: 'mahmud2025guppy', ccf: 'A', type: 'article', year: 2025, topic: 'llm', tool: 'GUPPY',
    title: 'Automated Update of Android Deprecated API Usages with Large Language Models',
    authors: ['Tarek Mahmud', 'Bin Duan', 'Meiru Che', 'Awatif Yasmin', 'Anne HH Ngu', 'Guowei Yang'],
    venue: 'IEEE TSE', fullVenue: 'IEEE Transactions on Software Engineering',
    doi: '10.1109/TSE.2025.3627897', arxiv: '2411.04387',
    abstract: 'Android APIs are regularly updated while old APIs get deprecated, and deprecated usages linger in apps and cause compatibility issues. GUPPY uses carefully crafted prompts to have GPT-4 update deprecated-API usages so that they remain compatible with both old and new API levels. It also uses GPT-4 to generate tests, identify incorrect updates, and refine the usage iteratively until the tests pass. Evaluated on 360 benchmark usages of 20 deprecated APIs and 156 further usages from API levels 33 and 34, GUPPY outperforms state-of-the-art techniques.'
  },
  {
    key: 'duan2025vistafuzz', ccf: 'B', core: 'A', type: 'inproceedings', year: 2025, topic: 'libraries', tool: 'VistaFuzz',
    title: 'Harnessing LLMs for Document-Guided Fuzzing of OpenCV Library',
    authors: ['Bin Duan', 'Tarek Mahmud', 'Meiru Che', 'Yan Yan', 'Naipeng Dong', 'Dan Kim', 'Guowei Yang'],
    venue: 'ICSME', fullVenue: 'IEEE International Conference on Software Maintenance and Evolution',
    doi: '10.1109/ICSME64153.2025.00017', arxiv: '2507.14558', code: 'https://github.com/beanduan22/VistaFuzz',
    abstract: 'OpenCV is the largest and most popular open-source computer vision library, and its bugs propagate to downstream applications. VistaFuzz uses LLMs to parse API documentation into standardized API information, extracts constraints on individual input parameters and the dependencies between them, and uses these to generate inputs that systematically test each target API. Testing 330 OpenCV APIs, VistaFuzz detected 17 new bugs; 10 have been confirmed and 5 fixed.'
  },
  {
    key: 'duan2025xamt', ccf: 'B', core: 'A', type: 'inproceedings', year: 2025, topic: 'libraries', tool: 'XAMT',
    title: 'XAMT: Cross-Framework API Matching for Testing Deep Learning Libraries',
    authors: ['Bin Duan', 'Ruican Dong', 'Dan Dongseong Kim', 'Naipeng Dong', 'Guowei Yang'],
    venue: 'ISSRE', fullVenue: 'IEEE International Symposium on Software Reliability Engineering',
    doi: '10.1109/ISSRE66568.2025.00030', arxiv: '2508.12546', code: 'https://github.com/beanduan22/Xamt',
    abstract: 'Fuzzers that compare CPU and GPU backends within one framework miss bugs that manifest identically across backends. XAMT instead matches functionally equivalent APIs across different frameworks using similarity rules over names, descriptions, and parameter structures, aligns their inputs, and applies variance-guided differential testing. Across PyTorch, TensorFlow, Keras, Chainer, and JAX, XAMT matched 839 APIs into 238 groups and detected 17 bugs, 12 of them confirmed, including bugs undetectable by intra-framework testing.'
  },
  {
    key: 'mahmud2025forge', type: 'inproceedings', year: 2025, topic: 'llm',
    title: 'Testing Android Third Party Libraries with LLMs to Detect Incompatible APIs',
    authors: ['Tarek Mahmud', 'Bin Duan', 'Meiru Che', 'Anne Ngu', 'Guowei Yang'],
    venue: 'FORGE', fullVenue: 'IEEE/ACM International Conference on AI Foundation Models and Software Engineering',
    doi: '10.1109/FORGE66646.2025.00039'
  },
  {
    key: 'chen2021sharing', ccf: 'B', type: 'article', year: 2021, topic: 'efficient',
    title: 'An Efficient Sharing Grouped Convolution via Bayesian Learning',
    authors: ['Tinghuan Chen', 'Bin Duan', 'Qi Sun', 'Meng Zhang', 'Guoqing Li', 'Hao Geng', 'Qianru Zhang', 'Bei Yu'],
    venue: 'IEEE TNNLS', fullVenue: 'IEEE Transactions on Neural Networks and Learning Systems'
  },
  {
    key: 'li2019kernel', type: 'inproceedings', year: 2019, topic: 'efficient',
    title: 'Kernel Sharing in the Channel Dimension to Improve Parameters Efficiency',
    authors: ['Guoqing Li', 'Meng Zhang', 'Bin Duan', 'Qianru Zhang', 'Guodong Tong'],
    venue: 'ICCECE', fullVenue: 'International Conference on Computing, Electronics & Communications Engineering'
  }
  ,
  /* ---- arXiv preprints: shown under Research and on the Publications page ---- */
  { key: 'duan2026vltest', type: 'preprint', year: 2026, topic: 'models',
    title: 'VLTest: Finding Joint Image-Text Failures in Vision-Language Models',
    authors: ['Bin Duan', 'Jintao Lin', 'Guowei Yang'], venue: 'arXiv', fullVenue: 'arXiv preprint', arxiv: '2610.30794',
    abstract: "Vision-language models (VLMs) are increasingly embedded in software systems. Testing them raises two problems. Mutating either input can change the expected answer, so an output change is not by itself a failure. Some failures appear only when both inputs are mutated; attributing them to the combination requires testing each mutation alone. We present VLTest, a black-box VLM testing approach. It generates image variants by editing VQGAN latent codes and text variants with a rewrite-expand-prune pipeline, filters variants likely to change the expected answer, and tests each variant alone before testing combinations, so every joint failure has four matched cells. A VLM judge confirms a failure only after checking that the input keeps the expected answer. On three tasks with eight VLMs, including two commercial API models, the oracle confirms 81.7% of the candidates, with 88.8% to 94.6% precision against human labels, and four-cell confirmation rejects 22.5% of joint candidates. Under the same budget, VLTest's generators find 1.8 to 2.5 times as many confirmed failures as SINVAD and TextFooler, and its joint tests find 91 to 197 attributed joint failures per 1,000 joint calls, 1.3 times as many as the same pairing applied to the baselines' variants." },
  { key: 'duan2026codeattack', type: 'preprint', year: 2026, topic: 'models',
    title: 'Towards Effective Black-Box Adversarial Attacks on Deep Code Models via Structural and Identifier Perturbations',
    authors: ['Bin Duan', 'Jintao Lin', 'Dan Dongseong Kim', 'Guowei Yang'], venue: 'arXiv', fullVenue: 'arXiv preprint', arxiv: '2609.26234',
    abstract: "Deep code models (DCMs) are increasingly embedded in code intelligence tasks. However, their robustness under adversarial attacks remains insufficiently understood. Prior black-box attacks mainly rely on identifier- only substitutions or structural edits transferred from reference samples, yielding perturbation spaces defined largely independently of the attacked input. We introduce Strike, an input-conditioned black-box adversarial robustness-testing framework that constructs and searches a hierarchical perturbation space for each input. Strike first partitions code into blocks and uses an LLM to generate context-specific structural candidates, filtered for syntactic validity, ranked by similarity, and adaptively combined. It then refines the best structural variant through similarity-guided identifier substitutions drawn from dynamically constructed candidate pools. Evaluations across representative code intelligence tasks, including clone detection, vulnerability detection, and code summarization, demonstrate that Strike achieves higher attack success rates with competitive target- model query overhead. Strategy-specific static checks across all three tasks and execution-based validation on the executable Juliet vulnerability-detection subset provide complementary, task-bounded evidence regarding the validity of the generated variants. Representation similarity and human evaluation further indicate that the variants remain highly similar to the original code and contextually natural. Fine-tuning with Strike- generated samples improves cross-attack performance on fixed perturbed evaluation sets while preserving clean performance." },
  { key: 'duan2026xfuzz', type: 'preprint', year: 2026, topic: 'libraries',
    title: 'Testing Deep Learning Library APIs via Cross-Framework Differential Fuzzing',
    authors: ['Bin Duan', 'Ruican Dong', 'Naipeng Dong', 'Dan Dongseong Kim', 'Guowei Yang'], venue: 'arXiv', fullVenue: 'arXiv preprint', arxiv: '2608.11886',
    abstract: "Deep learning libraries underpin many safety- and reliability-critical applications, yet existing API-level testing techniques often rely on intra-library properties or CPU--GPU differential oracles and may miss defects that behave consistently across hardware backends. We present Xamt, a cross-framework differential fuzzing approach for deep learning library APIs. Xamt constructs and tests execution-validated groups of APIs intended to implement equivalent operations across seven libraries. It uses explicit API aliases and parameter-role normalization to construct candidate correspondences and validates them through pairwise execution and a group-level behavioral check on canonical ordinary inputs. The resulting groups are explored using variance-guided differential fuzzing with ordinary, boundary, and non-finite inputs. Crash and inconsistency oracles flag executions exhibiting abnormal termination or inconsistent outputs for subsequent reproduction and analysis. Across the seven libraries, Xamt constructs 676 execution-validated groups containing 2,563 matched APIs. Among these, Xamt identifies 72 independently reproduced discrepancy cases, including 4 crash cases and 68 output inconsistencies. Among the 72 developer reports, 25 have been confirmed, including 23 that have been fixed." },
  { key: 'duan2026pyfuzz', type: 'preprint', year: 2026, topic: 'libraries',
    title: 'Harnessing LLMs for Document-Guided Fuzzing of Python Libraries',
    authors: ['Bin Duan', 'Tarek Mahmud', 'Meiru Che', 'Yan Yan', 'Naipeng Dong', 'Dan Dongseong Kim', 'Guowei Yang'], venue: 'arXiv', fullVenue: 'arXiv preprint', arxiv: '2608.11744',
    abstract: "Python libraries underpin deep learning, scientific computing, data analysis, and computer vision, making their reliability critical to downstream applications. Testing their APIs requires inputs that satisfy both per-parameter constraints and dependencies among parameters. Existing approaches either leave such constraints implicit in generated programs or rely on library-specific parsing rules. This paper introduces VistaFuzz, a document-guided fuzzing technique that uses a locally served open-sourced LLM to extract parameter specifications from API documents and generate inputs that satisfy both parameter constraints and inter-parameter dependencies. We evaluate VistaFuzz on 7,718 APIs across twelve Python libraries. Inter-parameter relationships occur in 40.1\\% of tested APIs, and disabling their resolution reduces the valid generation rate on those APIs from above 95\\% to 31.6\\%--52.8\\%. VistaFuzz reports 74 issues, of which 43 have been confirmed by developers and 29 have been fixed." },
  { key: 'duan2026latent', type: 'preprint', year: 2026, topic: 'models',
    title: 'Latent Anchor-Driven Test Generation for Deep Neural Networks',
    authors: ['Bin Duan', 'Matthew B. Dwyer', 'Guowei Yang'], venue: 'arXiv', fullVenue: 'arXiv preprint', arxiv: '2606.04310',
    abstract: "Deep Neural Networks (DNNs) are increasingly being deployed in security-critical and safety-sensitive applications, which makes rigorous testing essential to identify and mitigate model weaknesses. Existing DNN testing approaches explore either the input space or a learned latent space. While latent-space generation can better maintain plausibility than direct input-space mutation, current methods still face a trade-off among exploration controllability, failure diversity, and seed-relative semantic drift. To overcome these limitations, we propose Latte, a black-box testing framework that generates semantically proximate, diverse, and fault-revealing test cases by leveraging the latent space. Specifically, Latte encodes each input seed with a pre-trained VQ-VAE and performs a seed-centered, one-step latent mutation along directions defined by anchors sampled from alternative classes, followed by quantization and decoding back to the input space. This explores local neighborhoods around each seed within the learned latent manifold, resulting in a larger number and broader diversity of oracle-triggering prediction discrepancies under the same budget. We evaluated Latte on 5 datasets and 10 DNN models in single-model and multi-model testing scenarios. Across the evaluated datasets and models, Latte improves fault exposure and behavioral diversity under matched testing budgets. Under the single-model setting, it also maintains low seed-relative semantic drift with respect to the source seeds." },
  { key: 'duan2025interp', type: 'preprint', year: 2025, topic: 'models',
    title: 'Generating Realistic, Diverse, and Fault-Revealing Inputs with Latent Space Interpolation for Testing Deep Neural Networks',
    authors: ['Bin Duan', 'Matthew B. Dwyer', 'Guowei Yang'], venue: 'arXiv', fullVenue: 'arXiv preprint', arxiv: '2503.17630',
    abstract: "Deep Neural Networks (DNNs) have been widely employed across various domains, including safety-critical systems, necessitating comprehensive testing to ensure their reliability. Although numerous DNN model testing methods have been proposed to generate adversarial samples that are capable of revealing faults, existing methods typically perturb samples in the input space and then mutate these based on feedback from the DNN model. These methods often result in test samples that are not realistic and with low-probability reveal faults. To address these limitations, we propose a black-box DNN test input generation method, ARGUS, to generate realistic, diverse, and fault-revealing test inputs. ARGUS first compresses samples into a continuous latent space and then perturbs the original samples by interpolating these with samples of different classes. Subsequently, we employ a vector quantizer and decoder to reconstruct adversarial samples back into the input space. Additionally, we employ discriminators both in the latent space and in the input space to ensure the realism of the generated samples. Evaluation of ARGUS in comparison with state-of-the-art black-box testing and white-box testing methods, shows that ARGUS excels in generating realistic and diverse adversarial samples relative to the target dataset, and ARGUS successfully perturbs all original samples and achieves up to 4 times higher error rate than the best baseline method. Furthermore, using these adversarial samples for model retraining can improve model classification accuracy." }
]);
