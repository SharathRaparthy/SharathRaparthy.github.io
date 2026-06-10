import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { arxivIdOf, type Paper } from '../data/papers.tsx';

/** Flattens a ReactNode (e.g. an author list with <Me/>) to plain text. */
function plain(node: ReactNode): string {
  return renderToStaticMarkup(<>{node}</>)
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Builds a citation-ready BibTeX entry from the paper data at build time. */
export function bibtexFor(paper: Paper): string {
  const arxiv = arxivIdOf(paper);
  const authorList = plain(paper.authors).replace(/\*/g, '');
  const authors = authorList
    .replace(/,?\s+and\s+/gi, ', ')
    .split(/,\s*/)
    .filter(Boolean)
    .join(' and ');

  const venue = paper.venue ? plain(paper.venue).replace(/\s*Spotlight\s*$/i, '') : '';
  const year = arxiv ? `20${arxiv.slice(0, 2)}` : (venue.match(/(20\d\d)/)?.[1] ?? '');
  const firstAuthor = authorList.split(',')[0]?.trim().split(' ').pop()?.toLowerCase() ?? 'paper';
  const firstWord = paper.title
    .split(/\s+/)[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  const key = `${firstAuthor}${year}${firstWord}`;

  const isPublished = venue !== '' && !/^arxiv$/i.test(venue);
  const fields: string[] = [`  title  = {${paper.title}}`, `  author = {${authors}}`];
  if (isPublished) fields.push(`  booktitle = {${venue}}`);
  if (year) fields.push(`  year   = {${year}}`);
  if (arxiv) {
    fields.push(`  eprint = {${arxiv}}`, '  archivePrefix = {arXiv}');
  } else {
    fields.push(`  url    = {${paper.titleHref}}`);
  }

  return `@${isPublished ? 'inproceedings' : 'misc'}{${key},\n${fields.join(',\n')}\n}`;
}
