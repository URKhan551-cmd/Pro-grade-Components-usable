<button
         onClick={async () => {
         if (!sheetRef.current || busy) return;
    setBusy(true);
    try {
      await exportPdf(sheetRef.current, title);
    } catch (e) {
      console.error(e);
      alert('PDF export failed');
    } finally {
      setBusy(false);
    }
  }}
  disabled={busy}
  className="rounded-lg bg-white px-4 py-1.5 text-sm font-bold text-ink-900 transition hover:bg-ink-100 disabled:opacity-60"
>
  {busy ? 'Building PDF…' : 'Download PDF'}
</button>
