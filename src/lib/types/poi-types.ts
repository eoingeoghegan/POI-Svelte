// These are the interfaces that describe the data used in the poi app.

/* 
This provides the name of loggedInUser, 
the id for the user and authentication token
*/
export interface Session {
    name: string;
    _id: string;
    token: string;
  }
  
/*
This is for the users credentials and id.
*/
  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
  }
  
  /*
  Category has the title of the category, the userid related to the category,
  the id for the. Img is added to recives and displays the images from the backend. 
  */
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


 
