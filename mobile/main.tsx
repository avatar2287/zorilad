import { createRoot } from 'react-dom/client';
import { NeiDanShell } from '@/components/neidan/shell';
import '@/styles.css';

createRoot(document.getElementById('root')!).render(
  <>
    <NeiDanShell testMode />
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      textAlign: 'center', fontSize: 10, background: '#101820', color: '#e8d9ab',
      pointerEvents: 'none', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      TEST • Демо без оплаты / No real payments
    </div>
  </>,
);
