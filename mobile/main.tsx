import { createRoot } from 'react-dom/client';
import { NeiDanShell } from '@/components/neidan/shell';
import '@/styles.css';

// Compile-time flag for the owner's separate review build only.
const ownerReview = import.meta.env.VITE_OWNER_REVIEW === 'true';
createRoot(document.getElementById('root')!).render(
  <div className="mobile-shell">
    <NeiDanShell ownerReview={ownerReview} />
  </div>,
);
