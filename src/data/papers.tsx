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
  /** Lead lab/institution (logo in public/logos, label in PaperCard). */
  org: 'meta' | 'mila';
  /** Hand-written fallback summary, replaced by an on-device AI summary when available. */
  tldr: string;
}

export function arxivIdOf(paper: Paper): string | undefined {
  for (const link of paper.links) {
    const m = link.href.match(/arxiv\.org\/abs\/([0-9.]+)/);
    if (m) return m[1];
  }
  return undefined;
}

const Me = ({ star = false }: { star?: boolean }) => (
  <span className="me">Sharath Chandra Raparthy{star ? '*' : ''}</span>
);

export const papers: Paper[] = [
  {
    title: 'The Llama 3 Herd of Models',
    org: 'meta',
    tldr: 'Open 405B-parameter foundation models with a 128K context window, native tool use, and multilingual support — performance comparable to GPT-4, released openly.',
    titleHref: 'https://ai.meta.com/blog/meta-llama-3/',
    image: '/images/llama3-1.webp',
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
  },
  {
    title: 'Llama-3 Preview Models',
    org: 'meta',
    tldr: '8B and 70B pretrained and instruction-tuned models that set state-of-the-art performance at their scales on release.',
    titleHref: 'https://ai.meta.com/blog/meta-llama-3/',
    image: '/images/llama-3.webp',
    imageAlt: 'Llama 3',
    authors: 'Llama Team',
    links: [{ label: 'Blog', href: 'https://ai.meta.com/blog/meta-llama-3/' }],
  },
  {
    title: 'Rainbow Teaming: Open-Ended Generation of Diverse Adversarial Prompts',
    org: 'meta',
    tldr: 'Quality-diversity search that automatically generates diverse adversarial prompts, exposing LLM vulnerabilities and producing data that measurably improves robustness.',
    titleHref: 'https://arxiv.org/abs/2402.16822',
    image: '/images/rainbow-teaming.webp',
    imageAlt: 'Rainbow Teaming',
    authors: (
      <>
        Mikayel Samvelyan*, <Me star />, Andrei Lupu*, Eric Hambro, Aram H. Markosyan, Manish Bhatt,
        Yuning Mao, Minqi Jiang, Jack Parker-Holder, Jakob Foerster, Tim Rocktäschel, Roberta
        Raileanu
      </>
    ),
    venue: 'Neural Information Processing Systems (NeurIPS), 2024',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2402.16822' },
      { label: 'Website', href: 'https://sites.google.com/view/rainbow-teaming' },
      { label: 'tl;dr', href: 'https://twitter.com/_samvelyan/status/1762519344943104195' },
    ],
  },
  {
    title: 'GLoRe: When, Where, and How to Improve LLM Reasoning via Global and Local Refinements',
    org: 'meta',
    tldr: 'Stepwise reward models decide when, where, and how to refine LLM reasoning, lifting a strong RL-finetuned Llama-2 13B by 12% on GSM8K.',
    titleHref: 'https://arxiv.org/abs/2402.10963',
    image: '/images/galore.webp',
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
  },
  {
    title: 'Teaching Large Language Models to Reason with Reinforcement Learning',
    org: 'meta',
    tldr: 'A systematic comparison of expert iteration, PPO, and return-conditioned RL for reasoning — expert iteration proves surprisingly competitive.',
    titleHref: 'https://arxiv.org/abs/2403.04642',
    image: '/images/gsm8k.webp',
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
  },
  {
    title: 'Generalization to New Sequential Decision Making Tasks with In-Context Learning',
    org: 'meta',
    tldr: 'Transformers trained on diverse offline trajectories learn brand-new sequential decision-making tasks in-context from just a handful of demonstrations.',
    titleHref: 'https://arxiv.org/abs/2312.03801',
    image: '/images/ICL-SDM.webp',
    imageAlt: 'In-Context Learning for SDM',
    authors: (
      <>
        <Me />, Eric Hambro, Robert Kirk, Mikael Henaff, Roberta Raileanu
      </>
    ),
    venue: 'International Conference on Machine Learning (ICML), 2024',
    links: [{ label: 'Paper', href: 'https://arxiv.org/abs/2312.03801' }],
  },
  {
    title: 'Multi-Objective GFlowNets',
    org: 'mila',
    tldr: 'Conditional GFlowNets that sample diverse Pareto-optimal candidates, outperforming prior methods for multi-objective drug and materials design.',
    titleHref: 'https://arxiv.org/abs/2210.12765',
    image: '/images/mogfn.webp',
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
  },
  {
    title: 'Compositional Attention: Disentangling Search and Retrieval',
    org: 'mila',
    tldr: "Disentangles attention's search and retrieval steps and composes them dynamically — a drop-in replacement for multi-head attention.",
    titleHref: 'https://arxiv.org/abs/2110.09419v1',
    image: '/images/comp-atten.webp',
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
  },
  {
    title: 'Continual Learning In Environments With Polynomial Mixing Times',
    org: 'mila',
    tldr: 'Formalizes continual RL as scalable MDPs, proves they exhibit polynomial mixing times, and proposes three sample-efficient algorithms.',
    titleHref: 'https://arxiv.org/abs/2112.07066',
    image: '/images/figure-1-draft-11.webp',
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
  },
  {
    title: 'Curriculum in Gradient-Based Meta-Reinforcement Learning',
    org: 'mila',
    tldr: 'Shows MAML is highly sensitive to task distributions; learning a task curriculum instead of uniform sampling substantially improves adaptation.',
    titleHref: 'https://arxiv.org/abs/2002.07956',
    image: '/images/meta-adr.webp',
    imageAlt: 'Curriculum in Meta-RL',
    authors: (
      <>
        Bhairav Mehta, Tristan Deleu*, <Me star />, Christopher Pal, Liam Paull
      </>
    ),
    venue: 'ICLR BeTR-RL Workshop, 2021',
    links: [{ label: 'Paper', href: 'https://arxiv.org/abs/2002.07956' }],
  },
  {
    title: 'CuNAS — CUriosity-driven Neural-Augmented Simulator',
    org: 'mila',
    tldr: 'Adds curiosity-driven exploration to neural-augmented simulators, improving sim-to-real transfer of robot policies.',
    titleHref:
      'https://docs.google.com/presentation/d/1nVbt0iQKFTOgHEQLLHbn1Wy3bMs_mWpyzfc0aZsN30U/edit?usp=sharing',
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
  },
];
