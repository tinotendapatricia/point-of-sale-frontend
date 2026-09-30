export class SumArray {
  private _array: { type: string; value: number }[] = [];
  private _sum = 0;

  constructor(array: { type: string; value: number }[]) {
    this.array = array;
    this.sum = array.reduce((a: number, b) => a + b.value, 0);
  }

  get array(): { type: string; value: number }[] {
    return this._array;
  }

  get sum(): number {
    return this._sum;
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  set array(value: { type: string; value: number }[]) {
    this._array = value;
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  set sum(value: number) {
    this._sum = value;
  }

  updateArray(index: number, value: { type: string; value: number }) {
    this.array[index] = value;
    this.sum = this.array.reduce((a, b) => a + b.value, 0);
  }
}
