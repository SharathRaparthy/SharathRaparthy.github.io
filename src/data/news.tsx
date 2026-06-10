import type { ReactNode } from 'react';

import type { NewsIcon } from './icons.ts';

export interface NewsItem {
  date: string;
  icon: NewsIcon;
  content: ReactNode;
}

export const newsItems: NewsItem[] = [
  {
    date: 'Nov 2025:',
    icon: 'deepmind',
    content: (
      <>
        Joined <a href="https://deepmind.google/">Google DeepMind</a> as a Research Engineer in the
        open-endedness team.
      </>
    ),
  },
  {
    date: 'Oct 2024:',
    icon: 'work',
    content: (
      <>
        Joined <a href="https://www.reka.ai/">Reka AI</a> as a Member of Technical Staff.
      </>
    ),
  },
  {
    date: 'Sep 2024:',
    icon: 'trophy',
    content: (
      <>
        <a href="https://arxiv.org/abs/2402.16822">Rainbow Teaming</a> got accepted into{' '}
        <a href="https://neurips.cc">NeurIPS 2024</a>.
      </>
    ),
  },
  {
    date: 'Jul 2024:',
    icon: 'meta',
    content: (
      <>
        Excited to share that I&apos;m a core contributor to{' '}
        <a href="https://arxiv.org/abs/2407.21783">The Llama 3 Herd of Models</a> paper, now
        available on arXiv.
      </>
    ),
  },
  {
    date: 'Jun 2024:',
    icon: 'trophy',
    content: (
      <>
        <a href="https://arxiv.org/abs/2403.04642">GLoRe</a> and{' '}
        <a href="https://arxiv.org/abs/2312.03801">In-context RL</a> papers got accepted to{' '}
        <a href="https://icml.cc">ICML 2024</a>.
      </>
    ),
  },
  {
    date: 'Apr 2024:',
    icon: 'meta',
    content: (
      <>
        Super happy to release{' '}
        <a href="https://ai.meta.com/blog/meta-llama-3/">Llama-3 preview models</a>.
      </>
    ),
  },
  {
    date: 'Mar 2024:',
    icon: 'arxiv',
    content: (
      <>
        New preprint on{' '}
        <a href="https://arxiv.org/abs/2402.16822">
          Rainbow Teaming: Open-Ended Generation of Diverse Adversarial Prompts
        </a>
        .
      </>
    ),
  },
  {
    date: 'Mar 2024:',
    icon: 'arxiv',
    content: (
      <>
        New preprint on{' '}
        <a href="https://arxiv.org/abs/2403.04642">
          GLoRe: When, Where, and How to Improve LLM Reasoning via Global and Local Refinements
        </a>
        .
      </>
    ),
  },
  {
    date: 'Mar 2024:',
    icon: 'arxiv',
    content: (
      <>
        New preprint on{' '}
        <a href="https://arxiv.org/abs/2312.03801">
          Teaching Large Language Models to Reason with Reinforcement Learning
        </a>
        .
      </>
    ),
  },
  {
    date: 'Feb 2024:',
    icon: 'mic',
    content: (
      <>
        Featured on{' '}
        <a href="https://www.talkrl.com/episodes/sharath-chandra-raparthy">TalkRL podcast</a> to
        discuss our work on In-context Learning for Sequential Decision Making.
      </>
    ),
  },
  {
    date: 'Dec 2023:',
    icon: 'arxiv',
    content: (
      <>
        New preprint on{' '}
        <a href="https://arxiv.org/abs/2312.03801">
          Generalization to New Sequential Decision Making Tasks with In-Context Learning
        </a>
        .
      </>
    ),
  },
  {
    date: 'Oct 2022:',
    icon: 'trophy',
    content: (
      <>
        Our work <a href="https://arxiv.org/abs/2210.12765">Multi-Objective GFlowNets</a> got
        accepted at ICML 2023.
      </>
    ),
  },
  {
    date: 'Aug 2022:',
    icon: 'trophy',
    content: (
      <>
        Our work{' '}
        <a href="https://arxiv.org/abs/2110.09419">
          Continual Learning In Environments With Polynomial Mixing Times
        </a>{' '}
        got accepted at NeurIPS 2022.
      </>
    ),
  },
  {
    date: 'Aug 2022:',
    icon: 'people',
    content: (
      <>
        Co-organizing{' '}
        <a href="https://paperswithcode.com/rc2022">
          Machine Learning Reproducibility Challenge — 2022
        </a>
        .
      </>
    ),
  },
  {
    date: 'Aug 2022:',
    icon: 'meta',
    content: (
      <>
        Joining <a href="https://ai.facebook.com/">MetaAI</a> as an AI Resident.
      </>
    ),
  },
  {
    date: 'Apr 2022:',
    icon: 'work',
    content: (
      <>
        Joining <a href="https://www.recursion.com/">Recursion</a> as a research intern.
      </>
    ),
  },
  {
    date: 'Oct 2021:',
    icon: 'people',
    content: (
      <>
        Co-organizing{' '}
        <a href="https://paperswithcode.com/rc2021">
          Machine Learning Reproducibility Challenge — 2021
        </a>
        .
      </>
    ),
  },
  {
    date: 'Oct 2021:',
    icon: 'trophy',
    content: (
      <>
        Our work on <a href="https://arxiv.org/abs/2110.09419">compositional attention</a> got
        accepted at ICLR 2022 as a <span className="paper-venue-spotlight">Spotlight</span>.
      </>
    ),
  },
  {
    date: 'Oct 2021:',
    icon: 'arxiv',
    content: (
      <>
        New preprint:{' '}
        <a href="https://arxiv.org/abs/2110.09419">
          Continual Learning In Environments With Polynomial Mixing Times
        </a>
        .
      </>
    ),
  },
  {
    date: 'Sep 2020:',
    icon: 'school',
    content: (
      <>
        Started my masters at <a href="https://mila.quebec/">Mila</a>.
      </>
    ),
  },
];
