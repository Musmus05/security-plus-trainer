import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, useRouteError } from 'react-router';

import { Card } from '@/ui';

/**
 * Route-level error boundary.
 *
 * It says explicitly that progress is untouched, because the first thing a learner fears when a
 * study app breaks is losing their streak — and here that fear is unfounded: the store is written
 * on every change, and a render failure cannot roll it back.
 */
export function RouteError() {
  const { t } = useTranslation();
  const error = useRouteError();

  const detail = isRouteErrorResponse(error)
    ? `${String(error.status)} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : String(error);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 py-12">
      <h1 className="text-2xl font-extrabold tracking-tight">{t('error.title')}</h1>
      <p className="text-ink-secondary">{t('error.description')}</p>
      <Card padding="sm">
        <details>
          <summary className="text-ink-secondary cursor-pointer text-sm font-semibold">
            {t('error.details')}
          </summary>
          <pre className="text-ink-secondary mt-2 overflow-x-auto text-xs">{detail}</pre>
        </details>
      </Card>
    </div>
  );
}
