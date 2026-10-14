async function openFile(file?: File) {
    if (!file) return;
    const text = await file.text();
    onOpenFile(text, file.name.replace(/\.(md|markdown|txt)$/i, ''));
  }
