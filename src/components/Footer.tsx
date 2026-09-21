export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] py-8 text-center text-sm text-[var(--muted)]">
      <p>
        Roadmap data ©{" "}
        <a
          href="https://www.microsoft.com/microsoft-365/roadmap"
          className="underline underline-offset-2 hover:text-[var(--foreground)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          Microsoft Release Communications
        </a>
        . Not affiliated with Microsoft.
      </p>
      <p className="mt-2">
        Site by{" "}
        <span className="font-medium text-[var(--foreground)]">Proof/Studio</span>
      </p>
    </footer>
  );
}
