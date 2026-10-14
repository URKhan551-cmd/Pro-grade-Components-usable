/ What it does:
// Triggers a browser download. Creates a Blob from your data, creates a temporary object URL for it, 
// creates an invisible <a> link with download attribute, 
// clicks it programmatically, then revokes the URL after 1s to free memory.

export function save(name: string, data: BlobPart, type: string) {
    const blob = new Blob([data], {type});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
