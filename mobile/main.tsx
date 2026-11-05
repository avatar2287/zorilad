import { createRoot } from 'react-dom/client';
import { NeiDanShell } from '@/components/neidan/shell';
import '@/styles.css';

createRoot(document.getElementById('root')!).render(
  <div className="mobile-shell">
    <NeiDanShell testMode />
    <div className="mobile-test-banner" role="status" aria-label="Тестовая версия без оплаты">
      TEST • Демо без оплаты / No real payments
    </div>
  </div>,
);
