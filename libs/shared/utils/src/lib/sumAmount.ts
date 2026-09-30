export class SumAmount {
    private _array: { type: string; amount: number }[] = [];
    private _sum = 0;
  
    constructor(array: { type: string; amount: number }[]) {
      this.array = array;
      this.sum = array.reduce((a: number, b) => a + b.amount, 0);
    }
  
    get array(): { type: string; amount: number }[] {
      return this._array;
    }
  
    get sum(): number {
      return this._sum;
    }
  
    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    set array(amount: { type: string; amount: number }[]) {
      this._array = amount;
    }
  
    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    set sum(amount: number) {
      this._sum = amount;
    }
  
    updateArray(index: number, amount: { type: string; amount: number }) {
      this.array[index] = amount;
      this.sum = this.array.reduce((a, b) => a + b.amount, 0);
    }
  }
  