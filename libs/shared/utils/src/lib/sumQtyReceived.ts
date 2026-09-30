export class sumQtyReceived {
    private _array: { type: string; qtyReceived: number }[] = [];
    private _sum = 0;
  
    constructor(array: { type: string; qtyReceived: number }[]) {
      this.array = array;
      this.sum = array.reduce((a: number, b) => a + b.qtyReceived, 0);
    }
  
    get array(): { type: string; qtyReceived: number }[] {
      return this._array;
    }
  
    get sum(): number {
      return this._sum;
    }
  
    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    set array(qtyReceived: { type: string; qtyReceived: number }[]) {
      this._array = qtyReceived;
    }
  
    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    set sum(qtyReceived: number) {
      this._sum = qtyReceived;
    }
  
    updateArray(index: number, qtyReceived: { type: string; qtyReceived: number }) {
      this.array[index] = qtyReceived;
      this.sum = this.array.reduce((a, b) => a + b.qtyReceived, 0);
    }
  }
  