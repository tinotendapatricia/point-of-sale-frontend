export class Utilities {
  static decamelize(str: string | null | undefined): string {
    return str
      ? str
          .replace(/([a-z\d])([A-Z])/g, '$1 ' + '$2')
          .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 ' + '$2')
          .replace(/(_)/g, ' ')
          .toLowerCase()
      : '--';
  }

  static displayFile(data: Blob) {
    const blob = new Blob([data], {
      type: data?.type,
    });
    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

  /** Saves a file to disk; the extension is taken from the blob's MIME type. */
  static downloadFile(data: Blob, baseName: string) {
    const extensions: Record<string, string> = {
      'application/pdf': 'pdf',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    };
    const extension = extensions[data?.type];
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = extension ? `${baseName}.${extension}` : baseName;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
