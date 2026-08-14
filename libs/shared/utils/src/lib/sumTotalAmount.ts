export class SumTotalAmount {
    private _array: { type: string; totalAmt: number }[] = [];
    private _sum = 0;
  
    constructor(array: { type: string; totalAmt: number }[]) {
      this.array = array;
      this.sum = array.reduce((a: any, b: any) => a + b.totalAmt, 0);
    }
  
    get array(): { type: string; totalAmt: number }[] {
      return this._array;
    }
  
    get sum(): number {
      return this._sum;
    }
  
    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    set array(totalAmt: { type: string; totalAmt: number }[]) {
      this._array = totalAmt;
    }
  
    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    set sum(totalAmt: number) {
      this._sum = totalAmt;
    }
  
    updateArray(index: number, totalAmt: { type: string; totalAmt: number }) {
      this.array[index] = totalAmt;
      this.sum = this.array.reduce((a, b) => a + b.totalAmt, 0);
    }
  }
  