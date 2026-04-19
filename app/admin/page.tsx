"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type DashboardPayload = {
  auth: {
    userId: string;
    email: string | null;
    fullName: string;
    role: "administrator" | "intern";
  };
  metrics: {
    registeredUsers: number;
    maintenanceActive: boolean;
  };
  systemStatus: {
    database: string;
    websiteStability: string;
  };
  announcements: Array<{
    id: string;
    title: string;
    message: string;
    active: boolean;
    created_at: string;
    expires_at: string | null;
  }>;
  users: Array<{
    id: string;
    full_name: string;
    role: "administrator" | "intern";
    created_at: string;
  }>;
};

const toGermanDate = (value: Date) => {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
};

const greetingForHour = (hour: number, name: string) => {
  if (hour < 11) {
    return `Guten Morgen, ${name}`;
  }

  if (hour < 18) {
    return `Hallo, ${name}`;
  }

  return `Guten Abend, ${name}`;
};

export default function AdminPage() {
  const supabase = useMemo(() => createClient(), []);
  const [dashboard, setDashboard] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [panelVersion, setPanelVersion] = useState(0);
  const [error, setError] = useState("");
  const [tokenInfo, setTokenInfo] = useState("");
  const [tokenRole, setTokenRole] = useState<"intern" | "administrator">("intern");
  const [announceTitle, setAnnounceTitle] = useState("");
  const [announceMessage, setAnnounceMessage] = useState("");
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingMessage, setEditingMessage] = useState("");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingUserName, setEditingUserName] = useState("");

  const now = new Date();
  const dateLabel = toGermanDate(now);
  const greeting = greetingForHour(now.getHours(), dashboard?.auth.fullName ?? "Nutzer");

  const loadDashboard = async (options?: { soft?: boolean }) => {
    const softRefresh = options?.soft === true;

    if (softRefresh) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    const response = await fetch("/api/admin/dashboard", {
      method: "GET",
      cache: "no-store",
    });

    const payload = await response.json();

    if (response.status === 401) {
      window.location.href = "/login";
      return;
    }

    if (!response.ok) {
      setError(payload?.error ?? "Dashboard konnte nicht geladen werden.");
      setLoading(false);
      setIsRefreshing(false);
      return;
    }

    setDashboard(payload as DashboardPayload);
    setPanelVersion((value) => value + 1);
    setLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    void loadDashboard();
  }, []);

  const handleLogout = async () => {
    if (!supabase) {
      setError("Supabase ist nicht konfiguriert.");
      return;
    }

    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleCreateToken = async () => {
    setError("");
    setTokenInfo("");

    const response = await fetch("/api/admin/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: tokenRole,
        expiresInDays: 7,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload?.error ?? "Token konnte nicht erstellt werden.");
      return;
    }

    setTokenInfo(`Token (${payload.role}, gültig bis ${new Date(payload.expiresAt).toLocaleString("de-DE")}): ${payload.token}`);
  };

  const handleToggleMaintenance = async (active: boolean) => {
    const response = await fetch("/api/admin/maintenance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ active }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload?.error ?? "Wartungsmodus konnte nicht aktualisiert werden.");
      return;
    }

    await loadDashboard({ soft: true });
  };

  const handleCreateAnnouncement = async () => {
    const response = await fetch("/api/admin/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: announceTitle,
        message: announceMessage,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload?.error ?? "Meldung konnte nicht erstellt werden.");
      return;
    }

    setAnnounceTitle("");
    setAnnounceMessage("");
    await loadDashboard({ soft: true });
  };

  const beginEditAnnouncement = (id: string, title: string, message: string) => {
    setEditingAnnouncementId(id);
    setEditingTitle(title);
    setEditingMessage(message);
  };

  const cancelEditAnnouncement = () => {
    setEditingAnnouncementId(null);
    setEditingTitle("");
    setEditingMessage("");
  };

  const handleUpdateAnnouncement = async () => {
    if (!editingAnnouncementId) {
      return;
    }

    const response = await fetch("/api/admin/announcements", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingAnnouncementId,
        title: editingTitle,
        message: editingMessage,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload?.error ?? "Meldung konnte nicht aktualisiert werden.");
      return;
    }

    cancelEditAnnouncement();
    await loadDashboard({ soft: true });
  };

  const handleDeleteAnnouncement = async (id: string) => {
    const response = await fetch("/api/admin/announcements", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload?.error ?? "Meldung konnte nicht gelöscht werden.");
      return;
    }

    if (editingAnnouncementId === id) {
      cancelEditAnnouncement();
    }

    await loadDashboard({ soft: true });
  };

  const handleRoleChange = async (userId: string, role: "administrator" | "intern") => {
    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, role }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload?.error ?? "Rolle konnte nicht aktualisiert werden.");
      return;
    }

    await loadDashboard({ soft: true });
  };

  const beginEditUser = (userId: string, fullName: string) => {
    setEditingUserId(userId);
    setEditingUserName(fullName);
  };

  const cancelEditUser = () => {
    setEditingUserId(null);
    setEditingUserName("");
  };

  const handleSaveUser = async () => {
    if (!editingUserId) {
      return;
    }

    const nextName = editingUserName.trim();

    if (!nextName) {
      setError("Bitte einen gültigen Namen eingeben.");
      return;
    }

    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: editingUserId,
        fullName: nextName,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload?.error ?? "Benutzer konnte nicht aktualisiert werden.");
      return;
    }

    cancelEditUser();
    await loadDashboard({ soft: true });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 px-6 py-16 text-zinc-900 md:px-10">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center">
          <section className="anim-soft-enter w-full max-w-md rounded-3xl border border-white/80 bg-white/82 p-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-md md:p-10">
            <Image
              src="/bachmann-logo.png"
              alt="Bachmann Haustechnik"
              width={180}
              height={69}
              className="mx-auto h-auto w-[130px]"
              priority
            />
            <h1 className="anim-text-enter mt-6 text-3xl font-black tracking-tight text-zinc-900">
              Dashboard wird geladen
            </h1>
            <p className="anim-text-enter anim-delay-2 mt-3 text-sm text-zinc-600">
              Daten werden synchronisiert. Einen Moment bitte.
            </p>

            <div className="mt-8 flex items-center justify-center">
              <span className="intro-bar-loader" aria-hidden="true" />
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (error && !dashboard) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 pb-12 pt-32 md:px-10">
        <p className="admin-fade-in rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
      </main>
    );
  }

  const role = dashboard?.auth.role;
  const isAdmin = role === "administrator";

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 px-6 pb-12 pt-28 text-zinc-900 md:px-10">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-300/25 blur-3xl" />

      <section key={panelVersion} className="admin-refresh-enter admin-ambient-pulse relative mx-auto w-full max-w-6xl rounded-3xl border border-white/80 bg-white/78 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-md md:p-10" style={{ animationDelay: "40ms" }}>
        {isRefreshing && (
          <div className="admin-refresh-strip" aria-hidden="true">
            <span className="admin-refresh-strip-bar" />
          </div>
        )}
        <p className="admin-fade-in text-xs font-semibold tracking-[0.14em] text-zinc-500 uppercase" style={{ animationDelay: "100ms" }}>{dateLabel}</p>
        <div className="admin-fade-in mt-2 flex flex-wrap items-center justify-between gap-4" style={{ animationDelay: "150ms" }}>
          <div className="flex items-center gap-4">
            <Image
              src="/bachmann-logo.png"
              alt="Bachmann Haustechnik"
              width={140}
              height={53}
              className="h-auto w-[96px] md:w-[120px]"
            />
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">{greeting}</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="admin-button-motion inline-flex h-10 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Logout
          </button>
        </div>

        {error && (
          <p className="admin-fade-in mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" style={{ animationDelay: "180ms" }}>{error}</p>
        )}
        {tokenInfo && (
          <p className="admin-fade-in mt-4 break-all rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" style={{ animationDelay: "190ms" }}>
            {tokenInfo}
          </p>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="admin-fade-in admin-card-motion rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-5 shadow-sm" style={{ animationDelay: "220ms" }}>
            <p className="text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">Registrierte Nutzer</p>
            <p className="mt-3 text-3xl font-black">{dashboard?.metrics.registeredUsers ?? 0}</p>
          </article>

          <article className="admin-fade-in admin-card-motion rounded-2xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50 p-5 shadow-sm" style={{ animationDelay: "280ms" }}>
            <p className="text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">Wartungsmodus</p>
            <p className="mt-3 text-lg font-bold">
              {dashboard?.metrics.maintenanceActive ? "Aktiv" : "Inaktiv"}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                disabled={!isAdmin}
                onClick={() => handleToggleMaintenance(true)}
                className="admin-button-motion rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Aktivieren
              </button>
              <button
                type="button"
                disabled={!isAdmin}
                onClick={() => handleToggleMaintenance(false)}
                className="admin-button-motion rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Deaktivieren
              </button>
            </div>
          </article>

          <article className="admin-fade-in admin-card-motion rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-5 shadow-sm" style={{ animationDelay: "340ms" }}>
            <p className="text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">Database</p>
            <p className="mt-3 text-lg font-bold">{dashboard?.systemStatus.database}</p>
          </article>

          <article className="admin-fade-in admin-card-motion rounded-2xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50 p-5 shadow-sm" style={{ animationDelay: "400ms" }}>
            <p className="text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">Website-Stabilität</p>
            <p className="mt-3 text-lg font-bold">{dashboard?.systemStatus.websiteStability}</p>
          </article>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="admin-fade-in admin-card-motion rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-5 shadow-sm" style={{ animationDelay: "460ms" }}>
            <h2 className="text-xl font-black tracking-tight">Meldungen</h2>
            <div className="mt-4 grid gap-3">
              <input
                value={announceTitle}
                onChange={(event) => setAnnounceTitle(event.target.value)}
                placeholder="Titel"
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-blue-400"
              />
              <textarea
                value={announceMessage}
                onChange={(event) => setAnnounceMessage(event.target.value)}
                placeholder="Nachricht"
                rows={4}
                className="resize-y rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-blue-400"
              />
              <button
                type="button"
                onClick={handleCreateAnnouncement}
                className="admin-button-motion inline-flex w-fit rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
              >
                Meldung veröffentlichen
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {(dashboard?.announcements ?? []).map((entry, index) => (
                <article key={entry.id} className="admin-fade-in admin-card-motion min-w-0 rounded-xl border border-zinc-200 bg-zinc-50 p-3" style={{ animationDelay: `${540 + index * 50}ms` }}>
                  {editingAnnouncementId === entry.id ? (
                    <div className="grid gap-2">
                      <input
                        value={editingTitle}
                        onChange={(event) => setEditingTitle(event.target.value)}
                        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400"
                      />
                      <textarea
                        value={editingMessage}
                        onChange={(event) => setEditingMessage(event.target.value)}
                        rows={3}
                        className="resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400"
                      />
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={handleUpdateAnnouncement}
                          className="admin-button-motion rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white"
                        >
                          Speichern
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditAnnouncement}
                          className="admin-button-motion rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700"
                        >
                          Abbrechen
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-zinc-900 break-words [overflow-wrap:anywhere]">{entry.title}</p>
                      <p className="mt-1 text-sm text-zinc-700 break-words [overflow-wrap:anywhere] whitespace-pre-wrap">{entry.message}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => beginEditAnnouncement(entry.id, entry.title, entry.message)}
                          className="admin-button-motion rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700"
                        >
                          Bearbeiten
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAnnouncement(entry.id)}
                          className="admin-button-motion rounded-md border border-rose-300 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700"
                        >
                          Löschen
                        </button>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="admin-fade-in admin-card-motion rounded-2xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50 p-5 shadow-sm" style={{ animationDelay: "520ms" }}>
            <h2 className="text-xl font-black tracking-tight">Registrierungs-Tokens</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Nur Administratoren dürfen neue Token erzeugen.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <select
                value={tokenRole}
                onChange={(event) => setTokenRole(event.target.value === "administrator" ? "administrator" : "intern")}
                disabled={!isAdmin}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                <option value="intern">Rolle intern</option>
                <option value="administrator">Rolle Administrator</option>
              </select>

              <button
                type="button"
                disabled={!isAdmin}
                onClick={handleCreateToken}
                className="admin-button-motion rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Token erstellen
              </button>
            </div>
          </section>
        </div>

        <section className="admin-fade-in admin-card-motion mt-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-sky-50 p-5 shadow-sm" style={{ animationDelay: "580ms" }}>
          <h2 className="text-xl font-black tracking-tight">Benutzerverwaltung</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Rollen und Benutzerdaten können nur Administratoren bearbeiten. Administrator-Konten sind geschützt.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-[0.12em] text-zinc-500">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Rolle</th>
                  <th className="px-3 py-2">Erstellt</th>
                  <th className="px-3 py-2">Aktion</th>
                </tr>
              </thead>
              <tbody>
                {(dashboard?.users ?? []).map((user, index) => (
                  <tr key={user.id} className="admin-fade-in border-b border-zinc-100" style={{ animationDelay: `${660 + index * 26}ms` }}>
                    <td className="px-3 py-2">
                      {editingUserId === user.id ? (
                        <input
                          value={editingUserName}
                          onChange={(event) => setEditingUserName(event.target.value)}
                          className="w-full min-w-[180px] rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm outline-none transition focus:border-blue-400"
                        />
                      ) : (
                        user.full_name
                      )}
                    </td>
                    <td className="px-3 py-2">{user.role}</td>
                    <td className="px-3 py-2">{new Date(user.created_at).toLocaleDateString("de-DE")}</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-2">
                        {editingUserId === user.id ? (
                          <>
                            <button
                              type="button"
                              onClick={handleSaveUser}
                              className="admin-button-motion rounded-md bg-zinc-900 px-2 py-1 text-xs font-semibold text-white"
                            >
                              Speichern
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditUser}
                              className="admin-button-motion rounded-md border border-zinc-300 px-2 py-1 text-xs font-semibold"
                            >
                              Abbrechen
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            disabled={!isAdmin || user.role === "administrator"}
                            onClick={() => beginEditUser(user.id, user.full_name)}
                            className="admin-button-motion rounded-md border border-zinc-300 px-2 py-1 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Benutzer bearbeiten
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={!isAdmin || user.role === "intern" || user.role === "administrator"}
                          onClick={() => handleRoleChange(user.id, "intern")}
                          className="admin-button-motion rounded-md border border-zinc-300 px-2 py-1 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Auf intern setzen
                        </button>
                        <button
                          type="button"
                          disabled={!isAdmin || user.role === "administrator"}
                          onClick={() => handleRoleChange(user.id, "administrator")}
                          className="admin-button-motion rounded-md border border-zinc-300 px-2 py-1 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Auf administrator setzen
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

