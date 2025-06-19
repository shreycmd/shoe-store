export type Cart ={
    userId:string,
    item:Array<{ id:string;
        name:string;
        price:number;
        quantity:number;
        imageString:string;
    }>
}