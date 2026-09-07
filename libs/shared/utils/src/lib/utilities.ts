declare const iziToast: any;


export class Utilities {
  static displayToast(type: string, message?: string) {
    switch (type) {
      case 'success':
        iziToast.success({
          title: 'Success',
          message:
            message === undefined
              ? 'Operation completed successfully'
              : message,
          position: 'center',
          zindex: '99999',
          maxWidth: '450',
          timeout: 2000,
        });
        break;

      case 'error':
        iziToast.error({
          title: 'Error',
          message:
            message === undefined
              ? 'Something went wrong. Please try again'
              : message,
          position: 'center',
          zindex: '99999',
          maxWidth: '450',
          timeout: 2000,
        });
        break;

      case 'warning':
        iziToast.warning({
          title: 'Caution',
          message:
            message === undefined ? 'You forgot important data' : message,
          position: 'center',
          zindex: '99999',
          maxWidth: '450',
          timeout: 2000,
        });
        break;

      case 'info':
        iziToast.info({
          title: 'Info',
          message: message === undefined ? '' : message,
          position: 'center',
          zindex: '99999',
          maxWidth: '450',
          timeout: 2000,
        });
        break;
    }
  }


  static decamelize(str: any) {
    return str
      ? str
          .replace(/([a-z\d])([A-Z])/g, '$1 ' + '$2')
          .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 ' + '$2')
          .replace(/(_)/g, ' ')
          .toLowerCase()
      : '--';
  }

  static displayFile(data: any) {
    const blob = new Blob([data], {
      type: data?.type,
    });
    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }
}
