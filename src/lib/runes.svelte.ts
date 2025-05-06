import type { Placemarker, Category } from "./types/poi-types";
// runes that can by dynamically changed from anywhere

export const subTitle = $state({ text: "" });
export const loggedInUser = $state({ 
    email: "",
    name: "",
    token: "",
    _id: ""
 });

 //These will store the latest donations & candidates fetched from the server.
export const currentPlacemarkers = $state({ placemarkers: [] as Placemarker[] });
export const currentCategories = $state({ categories: [] as Category[] });


