export interface CashupEntity{
    code:string;
    denominations:deno[]
}

interface deno{
    type:string;
    value:number
}