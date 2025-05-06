import axios from "axios";
import type { Session, User } from "$lib/types/poi-types";
import type { Category, Placemarker } from "$lib/types/poi-types";
import { loggedInUser, currentCategories, currentPlacemarkers } from "$lib/runes.svelte";


// This will make requests to backend API to localhost:4000
export const poiService = {
  baseUrl: "http://localhost:4000",

/* This creates a placemarker, it adds an Authorization header with the token, 
It then send a post to baseUrl/api/:categoryid/placemarkers with the data.
 It then returns true if successful. 
 It calls refreshPoiInfo when a user logs in.*/
  async placemarker(placemarker: Placemarker, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(this.baseUrl + "/api/categories/" + placemarker.categoryid._id+ "/placemarkers", placemarker);
      await this.refreshPoiInfo();
      return response.status >= 200 && response.status < 300;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

/* getCategories adds the token to the header, 
sends a GET request to baseUrl/api/categories and returns an array of categories. 
*/
  async getCategories(token: string): Promise<Category[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/categories");
      return response.data;
    } catch (error) {
    console.log(error);
      return [];
    }
  },

/*  getPlacemarkers works using the token in the header, 
makes a GET request to baseUrl/api/placemarkers and returns the placemarkers.
*/
  async getPlacemarkers(token: string): Promise<Placemarker[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/placemarkers");
      return response.data;
    } catch (error) {
    console.log(error)
      return [];
    }
  } ,

/* deletePlacemarker works by adding the token, and sending a delete request
to baseUrl/api/placemarkers/:id and returns true if successful.
*/
  async deletePlacemarker(placemarkerId: string, token: string): Promise<boolean> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.delete(this.baseUrl + "/api/placemarkers/" + placemarkerId);
      return response.status === 200; 
    } catch (error) {
      console.log(error);
      return false; 
    }
  },


/*signUp sends a POST request to baseUrl/api/users,
it returns true if successful. */
  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

   /* We can call this method whenever we login or make a placemarker.
      It uses the token from the loggedInUser to get the information.
    */
   async refreshPoiInfo() {
    if (loggedInUser.token) {
    currentPlacemarkers.placemarkers = await this.getPlacemarkers(loggedInUser.token);
    currentCategories.categories = await this.getCategories(loggedInUser.token);
    }
  },


/*login works by sending a POST request to baseUrl/api/users/authenticate,
if the login is successful then it takes the token, name and ID from the response.
It will refresh the POI data and then return the session object.
*/
  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        this.saveSession(session, email);
        await this.refreshPoiInfo();
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  /*
     saveSession works by saving a user's session information to both memory and localStorage.
  
   */

  saveSession(session: Session, email: string) {
    loggedInUser.email = email;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;
    localStorage.poi = JSON.stringify(loggedInUser);
  },

   /*
    restoreSession works by restoring a session from localStorage if available.
    It also reloads the loggedInUser store and gets fresh POI information.
   */
  async restoreSession() {
    const savedLoggedInUser = localStorage.poi;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
    }
    await this.refreshPoiInfo();
  },

  /*
    clearSession Clears the current session from memory and local storage.
    Also resets the app state for placemarkers and categories.
   */
  clearSession() {
    currentPlacemarkers.placemarkers = [];
    currentCategories.categories = [];
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("poi");
  },
 
};
