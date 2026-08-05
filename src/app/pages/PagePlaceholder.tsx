import { Card } from '@/ui';

export interface PagePlaceholderProps {
  title: string;
  subtitle?: string;
  /** What is not here yet, and which change brings it. Vague "coming soon" helps nobody. */
  body: string;
}

/**
 * The shell renders before the features do, so each route needs something honest to show.
 *
 * This says which change delivers the missing piece rather than "coming soon" — a reviewer opening
 * the preview should be able to tell a stub from a bug.
 */
export function PagePlaceholder({ title, subtitle, body }: PagePlaceholderProps) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
        {subtitle !== undefined && <p className="text-ink-secondary mt-1 text-sm">{subtitle}</p>}
      </div>
      <Card className="text-ink-secondary text-sm">{body}</Card>
    </div>
  );
}
