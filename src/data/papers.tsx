import type { ReactNode } from 'react';

export interface PaperLink {
  label: string;
  href: string;
}

export interface Paper {
  title: string;
  titleHref: string;
  image: string;
  imageAlt: string;
  authors: ReactNode;
  venue?: ReactNode;
  links: PaperLink[];
  description: string;
}

const Me = ({ star = false }: { star?: boolean }) => (
  <span className="me">Sharath Chandra Raparthy{star ? '*' : ''}</span>
);

export const papers: Paper[] = [
  {
    title: 'The Llama 3 Herd of Models',
    titleHref: 'https://ai.meta.com/blog/meta-llama-3/',
    image: '/images/llama3-1.png',
    imageAlt: 'Llama 3.1',
    authors: 'Llama Team',
    links: [
      { label: 'Blog', href: 'https://ai.meta.com/blog/meta-llama-3-1/' },
      { label: 'Arxiv', href: 'https://arxiv.org/abs/2407.21783' },
      {
        label: 'Model Card',
        href: 'https://huggingface.co/collections/meta-llama/llama-31-669fc079a0c406a149a5738f',
      },
    ],
    description:
      'We open-source Llama 3.1, a new family of foundation models with native support for ' +
      'multilinguality, coding, reasoning, and tool usage, featuring a 405B-parameter architecture ' +
      'with 128K context window. The models show comparable performance to GPT-4 across various ' +
      'tasks, and include Llama Guard 3 for safety.',
  },
  {
    title: 'Llama-3 Preview Models',
    titleHref: 'https://ai.meta.com/blog/meta-llama-3/',
    image: '/images/llama-3.png',
    imageAlt: 'Llama 3',
    authors: 'Llama Team',
    links: [{ label: 'Blog', href: 'https://ai.meta.com/blog/meta-llama-3/' }],
    description:
      'We introduce Llama 3 family of large language models (LLMs), a collection of pretrained ' +
      'and instruction tuned generative text models in 8 and 70B sizes. We achieve SOTA ' +
      'performance for LLM models at these scales.',
  },
  {
    title: 'Rainbow Teaming: Open-Ended Generation of Diverse Adversarial Prompts',
    titleHref: 'https://arxiv.org/abs/2402.16822',
    image: '/images/rainbow-teaming.png',
    imageAlt: 'Rainbow Teaming',
    authors: (
      <>
        Mikayel Samvelyan*, <Me star />, Andrei Lupu*, Eric Hambro, Aram H. Markosyan, Manish
        Bhatt, Yuning Mao, Minqi Jiang, Jack Parker-Holder, Jakob Foerster, Tim Rocktäschel,
        Roberta Raileanu
      </>
    ),
    venue: 'Neural Information Processing Systems (NeurIPS), 2024',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2402.16822' },
      { label: 'Website', href: 'https://sites.google.com/view/rainbow-teaming' },
      { label: 'tl;dr', href: 'https://twitter.com/_samvelyan/status/1762519344943104195' },
    ],
    description:
      "Introducing Rainbow Teaming, a new method for generating diverse adversarial prompts for " +
      "LLMs via LLMs. It's a versatile tool for diagnosing model vulnerabilities across domains " +
      'and creating data to enhance robustness & safety.',
  },
  {
    title: 'GLoRe: When, Where, and How to Improve LLM Reasoning via Global and Local Refinements',
    titleHref: 'https://arxiv.org/abs/2402.10963',
    image: '/images/galore.png',
    imageAlt: 'GLoRe',
    authors: (
      <>
        Alex Havrilla, <Me />, Christoforus Nalmpantis, Jane Dwivedi-Yu, Maksym Zhuravinskyi, Eric
        Hambro, Roberta Raileanu
      </>
    ),
    venue: 'International Conference on Machine Learning (ICML), 2024',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2402.10963' },
      { label: 'tl;dr', href: 'https://twitter.com/Dahoas1/status/1760021603105288550' },
    ],
    description:
      'How to bootstrap the reasoning refinement capabilities of LLMs using synthetic data? We ' +
      'introduce GLoRe — applied on GSM8K, we can improve a strong RL finetuned Llama-2 13B by 12%.',
  },
  {
    title: 'Teaching Large Language Models to Reason with Reinforcement Learning',
    titleHref: 'https://arxiv.org/abs/2403.04642',
    image: '/images/gsm8k.png',
    imageAlt: 'Teaching LLMs to Reason',
    authors: (
      <>
        Alex Havrilla, Yuqing Du, <Me />, Christoforos Nalmpantis, Jane Dwivedi-Yu, Maksym
        Zhuravinskyi, Eric Hambro, Sainbayar Sukhbaatar, Roberta Raileanu
      </>
    ),
    venue: 'Arxiv',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2403.04642' },
      { label: 'tl;dr', href: 'https://twitter.com/Dahoas1/status/1766120506028359853' },
    ],
    description:
      'In this work, we set out to understand how different algorithms fare at improving LLM ' +
      'reasoning from feedback. We compare expert iteration, PPO, and return-conditioned RL using ' +
      'Llama-2 as the base model.',
  },
  {
    title: 'Generalization to New Sequential Decision Making Tasks with In-Context Learning',
    titleHref: 'https://arxiv.org/abs/2312.03801',
    image: '/images/ICL-SDM.gif',
    imageAlt: 'In-Context Learning for SDM',
    authors: (
      <>
        <Me />, Eric Hambro, Robert Kirk, Mikael Henaff, Roberta Raileanu
      </>
    ),
    venue: 'International Conference on Machine Learning (ICML), 2024',
    links: [{ label: 'Paper', href: 'https://arxiv.org/abs/2312.03801' }],
    description:
      'Training autonomous agents to learn new tasks from few demonstrations is challenging, ' +
      'especially for sequential decision making which is sensitive to errors. We show that ' +
      'training transformers on diverse offline datasets of trajectories enables in-context ' +
      'learning of out-of-distribution sequential decision tasks from just a handful of ' +
      'demonstrations.',
  },
  {
    title: 'Multi-Objective GFlowNets',
    titleHref: 'https://arxiv.org/abs/2210.12765',
    image: '/images/mogfn.png',
    imageAlt: 'Multi-Objective GFlowNets',
    authors: (
      <>
        Moksh Jain, <Me />, Alex Hernandez-Garcia, Jarrid Rector-Brooks, Yoshua Bengio, Santiago
        Miret, Emmanuel Bengio
      </>
    ),
    venue: 'International Conference on Machine Learning (ICML), 2023',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2210.12765' },
      { label: 'Code', href: 'https://github.com/sarthmit/Compositional-Attention' },
    ],
    description:
      'We examine multi-objective optimization in applications like drug discovery and material ' +
      'design, noting the failure of existing methods to achieve diverse Pareto-optimal ' +
      'candidates. We introduce Multi-Objective GFlowNets (MOGFNs), featuring a novel Conditional ' +
      'GFlowNet that outperforms existing methods in Hypervolume, R2-distance, and candidate ' +
      'diversity.',
  },
  {
    title: 'Compositional Attention: Disentangling Search and Retrieval',
    titleHref: 'https://arxiv.org/abs/2110.09419v1',
    image: '/images/comp-atten.png',
    imageAlt: 'Compositional Attention',
    authors: (
      <>
        Sarthak Mittal, <Me />, Irina Rish, Yoshua Bengio and Guillaume Lajoie
      </>
    ),
    venue: (
      <>
        International Conference for Learning Representations (ICLR), 2022{' '}
        <span className="paper-venue-spotlight">Spotlight</span>
      </>
    ),
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2110.09419v1' },
      { label: 'Code', href: 'https://github.com/sarthmit/Compositional-Attention' },
    ],
    description:
      'We view the standard Multi-Head attention mechanism from the "Search-Retrieval" ' +
      'perspective and highlight the rigid associations of keys and values. We propose ' +
      'Compositional Attention, a drop-in replacement where redundancies are addressed by ' +
      'disentangling Searches and Retrievals and composing them dynamically in a ' +
      'context-dependent way.',
  },
  {
    title: 'Continual Learning In Environments With Polynomial Mixing Times',
    titleHref: 'https://arxiv.org/abs/2112.07066',
    image: '/images/figure-1-draft-11.png',
    imageAlt: 'Continual Learning',
    authors: (
      <>
        Matthew Riemer*, <Me star />, Ignacio Cases, Gopeshh Subbaraj, Maximilian Puelma Touzel and
        Irina Rish
      </>
    ),
    venue: 'Neural Information Processing Systems (NeurIPS), 2022',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2112.07066' },
      { label: 'Code', href: 'https://github.com/sharathraparthy/polynomial-mixing-times' },
    ],
    description:
      'We concentrate on "Mixing time" of a Markov chain induced by a policy as a major ' +
      'contributor to poor scaling. We categorize continual RL problems as Scalable MDPs, ' +
      'formally demonstrate that these exhibit polynomial mixing times, and propose three ' +
      'algorithms which clearly demonstrate sample efficiency.',
  },
  {
    title: 'Curriculum in Gradient-Based Meta-Reinforcement Learning',
    titleHref: 'https://arxiv.org/abs/2002.07956',
    image: '/images/meta-adr.png',
    imageAlt: 'Curriculum in Meta-RL',
    authors: (
      <>
        Bhairav Mehta, Tristan Deleu*, <Me star />, Christopher Pal, Liam Paull
      </>
    ),
    venue: 'ICLR BeTR-RL Workshop, 2021',
    links: [{ label: 'Paper', href: 'https://arxiv.org/abs/2002.07956' }],
    description:
      'In this work we study the under-studied parameter in meta learning, "Task Distributions". ' +
      'We show that MAML is sensitive to task distributions, and learning a curriculum of tasks ' +
      'instead of uniformly sampling helps the adaptation performance substantially.',
  },
  {
    title: 'CuNAS — CUriosity-driven Neural-Augmented Simulator',
    titleHref: 'https://arxiv.org/abs/2112.07066',
    image: '/images/r-ss.png',
    imageAlt: 'CuNAS',
    authors: (
      <>
        <Me />, Melissa Mozifian, Liam Paull and Florian Golemo
      </>
    ),
    venue: 'RSS Sim2Real Workshop, 2021',
    links: [
      {
        label: 'Slides',
        href: 'https://docs.google.com/presentation/d/1nVbt0iQKFTOgHEQLLHbn1Wy3bMs_mWpyzfc0aZsN30U/edit?usp=sharing',
      },
      {
        label: 'Talk',
        href: 'https://www.youtube.com/watch?v=Tlf5RG3OPF8&list=PL4BpvvbNDc3SxmswMbOljlUcCQJQ6eFDL&index=6',
      },
    ],
    description:
      'Transfer of policies from simulation to physical robots is an important open problem in ' +
      'deep RL. We propose a simple extension to Neural-Augmented Simulators based on artificial ' +
      'curiosity, leading to better exploration and consequently better sim-to-real transfer ' +
      'performance.',
  },
];
