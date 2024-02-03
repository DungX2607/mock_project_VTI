

export type ProductProps = {
  id:any;  
  imgUrl: any;
  productName: string;
  price: number;
  priceSales: number;
  category: string;
  shortDesc?: string;
  description?: string;
  reviews?: {
    reviewId:any;
    username:string;
    rating: Number;
    reviewText: String
  }[];
  avgRating?: number;
  file?:{
    id: any,
    fileName: string,
    fileType: string,
    url: string
  };
  origin?:{
    id: any,
    manufacturer: string,
    madeIn: string,
    guarantee: string

  };
  information?:{
    id: any,
    wattage: string,
    noise: string,
    technology: string,
    level: string,
    mode: string,
    accessory: string,
    size: string,
    weight: string,
    color: string,
    otherFunction: string, 
  }
};
