import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App.tsx';
import { initSite } from './site.ts';
import { newsItems } from './data/news.tsx';
import { papers } from './data/papers.tsx';

function renderApp() {
  const { container } = render(<App />);
  const section = (selector: string) => {
    const el = container.querySelector(selector);
    if (!el) throw new Error(`Missing section: ${selector}`);
    return within(el as HTMLElement);
  };
  return { container, section };
}

describe('App', () => {
  it('renders the hero with name and bio links', () => {
    const { section } = renderApp();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sharath Chandra Raparthy');
    expect(section('.hero-text').getByRole('link', { name: 'Google DeepMind' })).toHaveAttribute(
      'href',
      'https://deepmind.google/',
    );
  });

  it('renders all social links', () => {
    const { section } = renderApp();
    const social = section('.social-links');
    expect(social.getByRole('link', { name: /email/i })).toHaveAttribute(
      'href',
      'mailto:sharathraparthy@gmail.com',
    );
    expect(social.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/SharathRaparthy',
    );
    expect(social.getByRole('link', { name: /google scholar/i })).toBeInTheDocument();
  });

  it('renders every news item', () => {
    const { section } = renderApp();
    expect(section('.news-list').getAllByRole('listitem')).toHaveLength(newsItems.length);
  });

  it('renders every paper with title link and image', () => {
    const { container } = renderApp();
    const titleLinks = [...container.querySelectorAll('.paper-title')];
    expect(titleLinks.map((a) => a.textContent)).toEqual(papers.map((p) => p.title));
    titleLinks.forEach((link, i) => {
      expect(link).toHaveAttribute('href', papers[i].titleHref);
    });
    expect(screen.getByAltText('Rainbow Teaming')).toHaveAttribute(
      'src',
      '/images/rainbow-teaming.png',
    );
  });

  it('renders header navigation to all sections', () => {
    const { section } = renderApp();
    const nav = section('.header-nav');
    expect(nav.getByRole('link', { name: 'about' })).toHaveAttribute('href', '#about');
    expect(nav.getByRole('link', { name: 'news' })).toHaveAttribute('href', '#news');
    expect(nav.getByRole('link', { name: 'research' })).toHaveAttribute('href', '#research');
  });

  it('toggles between dark and light theme', () => {
    const { section } = renderApp();
    initSite();
    const toggle = section('.header-nav').getByRole('button', { name: /toggle color theme/i });
    fireEvent.click(toggle);
    expect(document.documentElement.dataset.theme).toBe('dark');
    fireEvent.click(toggle);
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('external social links open safely in a new tab', () => {
    const { section } = renderApp();
    const gh = section('.social-links').getByRole('link', { name: /github/i });
    expect(gh).toHaveAttribute('target', '_blank');
    expect(gh).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
