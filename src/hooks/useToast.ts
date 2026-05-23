import { useCallback, useState } from 'react';

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const show = useCallback((text: string, durationMs = 2500) => {
    setMessage(text);
    setVisible(true);
    setTimeout(() => setVisible(false), durationMs);
  }, []);

  const hide = useCallback(() => setVisible(false), []);

  return { message, visible, show, hide };
}
