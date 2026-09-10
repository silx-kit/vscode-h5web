import { type FallbackProps } from 'react-error-boundary';

import styles from './ErrorFallback.module.css';
import { FetchError } from './utils';

interface Props extends FallbackProps {
  error: unknown;
}

function ErrorFallback(props: Props) {
  const { error } = props;

  if (error instanceof FetchError) {
    if (error.status === 404) {
      return (
        <div className={styles.error}>
          <p>File not found</p>
          <p>The file may have been moved or deleted.</p>
        </div>
      );
    }

    return (
      <div className={styles.error}>
        <p>
          File failed to load: {error.status} {error.statusText}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.error}>
      <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
    </div>
  );
}

export default ErrorFallback;
