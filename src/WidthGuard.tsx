import { type PropsWithChildren, useEffect, useRef, useState } from 'react';

const DEBOUNCE_MS = 50;

function WidthGuard(props: PropsWithChildren) {
  const { children } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [settledWidth, setSettledWidth] = useState<number>();

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }

    let timeoutId: number;

    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;

      clearTimeout(timeoutId);
      timeoutId = globalThis.setTimeout(
        () => setSettledWidth(width),
        DEBOUNCE_MS,
      );
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [ref]);

  return (
    <div ref={ref} data-fill-height>
      <div
        data-fill-height
        style={settledWidth ? { width: settledWidth } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

export default WidthGuard;
