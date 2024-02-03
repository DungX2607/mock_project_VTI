export type userPops = {
    id:number,
    accountId:string,  
    username:string,
    email: string,
    fullName: string,
    avatar?: any,
    phone: string,
    address: string,
    role?: string,
    createDate?: number,
    file?:{
      fileId:string,
      url:string
    }
  };
  