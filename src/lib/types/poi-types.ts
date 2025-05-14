// These are the interfaces that describe the data used in the poi app.
export interface Session {
    name: string;
    _id: string;
    token: string;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
  }
  
  export interface Category {
    title: string;
    userid: string;
    _id: string;
    img: string;
    
    
  }

  export interface Placemarker{

    categoryid: Category;
    title: string;
    description: string;
    lat: number;
    long: number;
    difficulty: string;

    _id?: string;
  }


  export interface DataSet {
    labels: string[];
    datasets: [{ values: number[]}];
}