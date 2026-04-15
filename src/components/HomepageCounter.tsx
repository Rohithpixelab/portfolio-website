'use client';
import { useEffect, useState } from 'react';
import { usePayloadAPI } from '@payloadcms/ui';

export default function HomepageCounter() {
  const [count, setCount] = useState(0);

  // We can't easily fetch and subscribe to the total count from a field component without a custom hook or effect
  // But we can do a one-time fetch or use the payload API if available.
  
  useEffect(() => {
    async function fetchCount() {
        try {
            const res = await fetch('/api/projects?where[showOnHome][equals]=true&limit=0');
            const data = await res.json();
            setCount(data.totalDocs || 0);
        } catch (e) {
            console.error(e);
        }
    }
    fetchCount();
  }, []);

  return (
    <div style={{ 
        marginBottom: '10px', 
        fontSize: '12px', 
        color: count >= 4 ? 'var(--theme-error-500)' : 'var(--theme-success-500)',
        fontWeight: 600
    }}>
      Homepage Selection: {count}/4 Used
    </div>
  );
}
