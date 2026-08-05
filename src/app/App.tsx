import { Flame, Star, Target } from 'lucide-react';

import { EXAM_META } from '@/content/exam-meta';
import {
  Badge,
  Button,
  Card,
  DOMAIN_IDS,
  domainAccent,
  ProgressBar,
  ProgressRing,
  StatTile,
} from '@/ui';

/**
 * Design-system preview.
 *
 * Routing, the layout shell, i18n and the persisted store land in the `feat/app-shell` pull
 * request. Until then this page renders every primitive at once so a reviewer can see the tokens
 * in both themes and the axe pass has real markup to check.
 */
export function App() {
  const sampleProgress: Record<number, number> = { 1: 0.82, 2: 0.55, 3: 0.31, 4: 0.12, 5: 0 };

  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col gap-8 p-6 sm:p-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Security+ Trainer</h1>
          <p className="text-ink-secondary mt-1">
            Bilingual gamified preparation for the CompTIA Security+ {EXAM_META.code} exam —{' '}
            {String(EXAM_META.domainCount)} domains, {String(EXAM_META.objectiveCount)} objectives.
          </p>
        </div>
        <Badge tone="info">Design system preview</Badge>
      </header>

      <Card raised className="flex flex-wrap items-center gap-x-10 gap-y-5">
        <StatTile
          label="Streak"
          value={<span className="tabular">7 days</span>}
          icon={<Flame aria-hidden className="text-streak size-3.5" />}
          detail="Longest: 12 days"
        />
        <StatTile
          label="XP"
          value={<span className="tabular">1,240</span>}
          icon={<Star aria-hidden className="text-xp size-3.5" />}
          detail="+120 today"
        />
        <StatTile
          label="Daily goal"
          value={<span className="tabular">120 / 150</span>}
          icon={<Target aria-hidden className="text-ink-muted size-3.5" />}
          detail="30 XP to go"
        />
        <div className="min-w-52 flex-1">
          <ProgressBar value={0.8} label="Daily goal progress" />
        </div>
      </Card>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Mastery by domain</h2>
        <p className="text-ink-secondary max-w-2xl text-sm">
          All five rings share one hue on purpose. Progress is magnitude, and magnitude takes a
          single sequential ramp — the domain number inside each ring carries identity, so nothing
          here depends on telling five colours apart.
        </p>
        <Card className="flex flex-wrap justify-around gap-6">
          {DOMAIN_IDS.map((id) => (
            <div key={id} className="flex flex-col items-center gap-2">
              <ProgressRing value={sampleProgress[id] ?? 0} label={`Domain ${String(id)} mastery`}>
                <span className="tabular text-lg font-extrabold">
                  {Math.round((sampleProgress[id] ?? 0) * 100)}
                  <span className="text-ink-secondary text-xs font-bold">%</span>
                </span>
              </ProgressRing>
              <span
                className={`text-sm font-bold ${domainAccent(id).text}`}
              >{`Domain ${String(id)}`}</span>
            </div>
          ))}
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Controls</h2>
        <Card className="flex flex-wrap items-center gap-3">
          <Button>Continue</Button>
          <Button variant="secondary">Review flashcards</Button>
          <Button variant="ghost">Skip</Button>
          <Button variant="danger">End exam</Button>
          <Button disabled>Locked</Button>
          <Button size="sm" variant="secondary">
            Small
          </Button>
          <Button size="lg">Start mock exam</Button>
        </Card>
        <Card className="flex flex-wrap gap-2">
          <Badge>Not started</Badge>
          <Badge tone="info">In progress</Badge>
          <Badge tone="good">Mastered</Badge>
          <Badge tone="warning">Needs review</Badge>
          <Badge tone="critical">Failed</Badge>
        </Card>
      </section>
    </div>
  );
}
