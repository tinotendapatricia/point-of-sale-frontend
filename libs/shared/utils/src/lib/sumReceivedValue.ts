export class SumReceivedValue {
    private _array: { type: string; receivedValue: number }[] = [];
    private _sum = 0;
  
    constructor(array: { type: string; receivedValue: number }[]) {
      this.array = array;
      this.sum = array.reduce((a: any, b: any) => a + b.receivedValue, 0);
    }
  
    get array(): { type: string; receivedValue: number  }[] {
      return this._array;
    }
  
    get sum(): number {
      return this._sum;
    }
  
    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    set array(receivedValue: { type: string; receivedValue: number }[]) {
      this._array = receivedValue;
    }
  
    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    set sum(receivedValue: number) {
      this._sum = receivedValue;
    }
  
    updateArray(index: number, receivedValue: { type: string; receivedValue: number }) {
      this.array[index] = receivedValue;
      this.sum = this.array.reduce((a, b) => a + b.receivedValue, 0);
    }
  }
  