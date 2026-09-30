export class SumQuantity {
  private _array: { type: string; quantity: number }[] = [];
  private _sum = 0;

  constructor(array: { type: string; quantity: number }[]) {
    this.array = array;
    this.sum = array.reduce((a: number, b) => a + b.quantity, 0);
  }

  get array(): { type: string; quantity: number  }[] {
    return this._array;
  }

  get sum(): number {
    return this._sum;
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  set array(quantity: { type: string; quantity: number }[]) {
    this._array = quantity;
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  set sum(quantity: number) {
    this._sum = quantity;
  }

  updateArray(index: number, quantity: { type: string; quantity: number }) {
    this.array[index] = quantity;
    this.sum = this.array.reduce((a, b) => a + b.quantity, 0);
  }
}
