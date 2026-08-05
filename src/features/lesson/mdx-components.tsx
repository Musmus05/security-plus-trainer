import type { MDXComponents } from 'mdx/types';

import { ExamTrap, InPractice, KeyPoint, Mnemonic, Term } from './callouts';

/**
 * Styling for the plain markdown a lesson is mostly made of, plus the callout components.
 *
 * Written as component overrides rather than a `prose` utility class so the type scale and rhythm
 * come from the same tokens as the rest of the app. A lesson that looks like a different product is
 * disorienting when you move between reading it and taking its quiz.
 *
 * Children are destructured explicitly rather than spread: with `{...props}` alone, `jsx-a11y`
 * cannot see that a heading has content and flags every one of them — and it is right to, because
 * the rule cannot know what the spread contains.
 */
export const lessonComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="border-edge mt-9 mb-3 border-b pb-2 text-xl font-extrabold tracking-tight first:mt-0"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} className="mt-6 mb-2 text-base font-bold">
      {children}
    </h3>
  ),
  p: (props) => <p {...props} className="my-3 text-[0.9375rem] leading-relaxed" />,
  ul: (props) => <ul {...props} className="my-3 ml-5 list-disc space-y-1.5 text-[0.9375rem]" />,
  ol: (props) => <ol {...props} className="my-3 ml-5 list-decimal space-y-1.5 text-[0.9375rem]" />,
  li: (props) => <li {...props} className="leading-relaxed" />,
  strong: (props) => <strong {...props} className="text-ink font-bold" />,
  code: (props) => (
    <code
      {...props}
      className="bg-sunken text-ink rounded-md px-1.5 py-0.5 font-mono text-[0.85em]"
    />
  ),
  hr: (props) => <hr {...props} className="border-edge my-8" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-action bg-info-wash text-ink my-4 rounded-r-xl border-l-4 py-3 pr-3 pl-4 text-[0.9375rem] italic"
    />
  ),
  /*
   * Tables carry most of the comparative content, and the exam tests distinctions far more than
   * definitions — so they get real styling, and their own horizontal scroll rather than pushing the
   * page sideways on a phone.
   */
  table: (props) => (
    <div className="border-edge my-5 overflow-x-auto rounded-2xl border">
      <table {...props} className="w-full border-collapse text-left text-sm" />
    </div>
  ),
  thead: (props) => <thead {...props} className="bg-sunken" />,
  th: (props) => (
    <th {...props} className="border-edge border-b px-3.5 py-2.5 font-bold whitespace-nowrap" />
  ),
  td: (props) => <td {...props} className="border-edge border-b px-3.5 py-2.5 align-top" />,
  tbody: (props) => <tbody {...props} className="[&>tr:last-child>td]:border-b-0" />,
  Term,
  ExamTrap,
  Mnemonic,
  KeyPoint,
  InPractice,
};
