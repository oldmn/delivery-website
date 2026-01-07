import { useState } from 'react';

export default function TrackingPage() {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);

  const handleTrack = () => {
    // Placeholder: call backend /api/deliveries/:id
    setResult({ status: 'Pending', trackingId: id });
  };

  return (
    <main>
      <h2>Track a Package</h2>
      <input value={id} onChange={e => setId(e.target.value)} placeholder="Enter tracking ID" />
      <button onClick={handleTrack}>Track</button>
      {result && (
        <div>
          <p>Tracking ID: {result.trackingId}</p>
          <p>Status: {result.status}</p>
        </div>
      )}
    </main>
  );
}
