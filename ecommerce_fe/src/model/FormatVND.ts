const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
};
export const priceFormat = (price:number)=>{
   return new Intl.NumberFormat("vi-Vn", config).format(Number(price));
}