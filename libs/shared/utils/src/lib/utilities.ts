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
}
