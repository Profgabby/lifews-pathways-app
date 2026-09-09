"use client";

import { useCallback, useEffect, useState } from "react";
import { listOfflineRecords, type OfflineQueueItem } from "@/lib/offline-queue";

export default function OfflineOperationsPage() {
  const [online, setOnline] = useState(true);
  const [records, setRecords] = useState<OfflineQueueItem[]>([]);

  const refresh = useCallback(async () => {
    try {
      setRecords(await listOfflineRecords());
    } catch {
      setRecords([]);
    }
  }, []);

  useEffect(() => {
    setOnline(navigator.onLine);
    void refresh();
    const handleOnline = () => {
      setOnline(true);
      void refresh();
    };
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [refresh]);

  const grouped = records.reduce<Record<string, number>>((acc, record) => {
    acc[record.type] = (acc[record.type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <main className="main">
      <div className="topbar">
        <div>
          <div className="eyebrow">LIFEWS Pathways™ field operations</div>
          <h1>Offline & synchronization center</h1>
          <p className="subtitle">Local field records remain on this device until secure synchronization is available.</p>
        </div>
        <div className="status-pill">{online ? "ONLINE" : "OFFLINE"}</div>
      </div>

      <section className="grid metrics">
        <div className="card"><div className="metric-label">Connection</div><div className="metric-value" style={{ fontSize: "1.15rem" }}>{online ? "Connected" : "Offline"}</div></div>
        <div className="card"><div className="metric-label">Queued records</div><div className="metric-value">{records.length}</div></div>
        <div className="card"><div className="metric-label">Storage</div><div className="metric-value" style={{ fontSize: "1.15rem" }}>This device</div></div>
        <div className="card"><div className="metric-label">Sync policy</div><div className="metric-value" style={{ fontSize: "1.15rem" }}>Authenticated only</div></div>
      </section>

      <div className="grid section-grid" style={{ marginTop: 16 }}>
        <section className="card">
          <h2>Queue by record type</h2>
          {Object.keys(grouped).length ? Object.entries(grouped).map(([type, count]) => (
            <div key={type} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
              <span>{type.replaceAll("_", " ")}</span><strong>{count}</strong>
            </div>
          )) : <p className="subtitle">No unsynchronized field records on this device.</p>}
        </section>

        <section className="card">
          <h2>Offline operating rules</h2>
          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            <div>• Cached pages may remain available after connectivity is lost.</div>
            <div>• New offline field records are stored locally in IndexedDB.</div>
            <div>• Safeguarding case records are not placed in the general offline queue.</div>
            <div>• Synchronization must occur only after authentication and server-side authorization.</div>
            <div>• A queued record is retained until the server confirms successful persistence.</div>
          </div>
        </section>
      </div>

      <section className="card" style={{ marginTop: 16 }}>
        <h2>Pending records</h2>
        {records.length ? records.slice(0, 50).map((record) => (
          <div key={record.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
            <strong>{record.type.replaceAll("_", " ")}</strong>
            <div className="subtitle">Queued {new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(record.createdAt))} · attempts {record.attempts}</div>
          </div>
        )) : <p className="subtitle">The queue is empty.</p>}
      </section>
    </main>
  );
}
