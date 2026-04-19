export default function DatenschutzPage() {
  const updatedAt = "19.04.2026";

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 px-6 py-16 text-zinc-900 md:px-10">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-white/70 bg-white/85 p-8 shadow-2xl backdrop-blur-md md:p-10">
        <p className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase">
          Rechtliches
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
          Datenschutzerklärung
        </h1>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-zinc-700">
          <section>
            <h2 className="text-base font-black text-zinc-900">1. Verantwortlicher</h2>
            <p className="mt-2">
              Gerhard Bachmann
              <br />
              Heizung &amp; Sanitär
              <br />
              Zugspitzstr. 4
              <br />
              82407 Wielenbach
            </p>
            <p className="mt-2">
              Telefon: 0881 / 92707810
              <br />
              E-Mail: info@bachmann-haustechnik.de
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">2. Allgemeine Hinweise zur Datenverarbeitung</h2>
            <p className="mt-2">
              Wir verarbeiten personenbezogene Daten ausschließlich im Rahmen der geltenden Datenschutzgesetze,
              insbesondere der Datenschutz-Grundverordnung (DSGVO) und des Bundesdatenschutzgesetzes (BDSG).
              Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare
              natürliche Person beziehen.
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">3. Hosting und Server-Logfiles</h2>
            <p className="mt-2">
              Beim Aufruf dieser Website werden technisch notwendige Verbindungsdaten verarbeitet (z. B. IP-Adresse,
              Datum/Uhrzeit, aufgerufene URL, Browser/Version, Betriebssystem, Referrer). Die Verarbeitung erfolgt zur
              sicheren Bereitstellung der Website, zur Fehleranalyse sowie zur Abwehr von Missbrauch.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem und stabilem Betrieb der Website).
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">4. Kontaktaufnahme (Kontaktformular, E-Mail, Telefon)</h2>
            <p className="mt-2">
              Wenn Sie uns kontaktieren, verarbeiten wir die von Ihnen übermittelten Daten (z. B. Name, E-Mail,
              Telefonnummer, Nachricht), um Ihre Anfrage zu bearbeiten und zu beantworten.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen / Vertragserfüllung) sowie
              Art. 6 Abs. 1 lit. f DSGVO (effiziente Bearbeitung von Anfragen).
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">5. Kontaktformular-Dienst (Formspree)</h2>
            <p className="mt-2">
              Für das Kontaktformular nutzen wir den Dienst Formspree. Die im Formular eingegebenen Inhalte werden an
              Formspree übermittelt und von dort zur Bearbeitung an uns weitergeleitet.
            </p>
            <p className="mt-2">
              Dabei kann eine Verarbeitung in Drittländern (z. B. USA) nicht ausgeschlossen werden. Soweit erforderlich,
              erfolgt die Übermittlung auf Grundlage geeigneter Garantien (z. B. Standardvertragsklauseln).
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO und Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">6. Login-/Adminbereich und Supabase</h2>
            <p className="mt-2">
              Für Login, Registrierung (mit Token), Benutzerverwaltung sowie interne Website-Funktionen nutzen wir Supabase
              als technische Plattform (Authentifizierung und Datenbank).
            </p>
            <p className="mt-2">
              Im Rahmen dieser Funktionen können insbesondere folgende Daten verarbeitet werden: E-Mail-Adresse,
              Passwort-Hash (nicht im Klartext), Rolleninformationen, Zeitstempel und technisch erforderliche
              Sicherheits-/Sitzungsdaten.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Bereitstellung geschützter Bereiche) sowie Art. 6 Abs. 1 lit. f DSGVO
              (IT-Sicherheit, Missbrauchsvermeidung, Systemintegrität).
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">7. Cookies und vergleichbare Technologien</h2>
            <p className="mt-2">
              Auf dieser Website wird ein technisch notwendiges Präferenz-Cookie verwendet, um Ihre ausgewählte
              Darstellung (Light/Dark Mode) zu speichern (`theme`). Ohne dieses Cookie kann die gewünschte
              Darstellungseinstellung nicht dauerhaft beibehalten werden.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an nutzerfreundlicher Darstellung)
              bzw. § 25 Abs. 2 TTDSG für technisch notwendige Speicherungen.
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">8. Speicherdauer</h2>
            <p className="mt-2">
              Wir speichern personenbezogene Daten nur so lange, wie dies für den jeweiligen Zweck erforderlich ist oder
              gesetzliche Aufbewahrungspflichten bestehen. Anschließend werden Daten gelöscht oder datenschutzkonform
              anonymisiert.
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">9. Empfänger von Daten</h2>
            <p className="mt-2">
              Daten können an technische Dienstleister übermittelt werden, die wir zur Bereitstellung der Website und
              unserer Funktionen einsetzen (z. B. Hosting, Formspree, Supabase). Diese Dienstleister werden als
              Auftragsverarbeiter gemäß Art. 28 DSGVO eingebunden, soweit erforderlich.
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">10. Ihre Rechte</h2>
            <p className="mt-2">
              Sie haben nach Maßgabe der gesetzlichen Voraussetzungen insbesondere folgende Rechte: Auskunft (Art. 15 DSGVO),
              Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO),
              Datenübertragbarkeit (Art. 20 DSGVO), Widerspruch (Art. 21 DSGVO) sowie Widerruf erteilter Einwilligungen
              mit Wirkung für die Zukunft.
            </p>
            <p className="mt-2">
              Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">11. Datensicherheit</h2>
            <p className="mt-2">
              Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Ihre Daten gegen Verlust,
              Manipulation und unbefugten Zugriff zu schützen. Dazu gehört insbesondere die verschlüsselte Übertragung
              der Websiteinhalte (HTTPS/TLS).
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">12. Aktualität und Änderung dieser Erklärung</h2>
            <p className="mt-2">
              Diese Datenschutzerklärung hat den Stand vom {updatedAt}. Wir behalten uns vor, sie bei rechtlichen,
              technischen oder organisatorischen Änderungen anzupassen.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

