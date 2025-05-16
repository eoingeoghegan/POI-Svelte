
# Placemark Svelte Front End 
- Student Name: Eoin Geoghegan
- Student ID: 20036009

# Github

- Back End: https://github.com/eoingeoghegan/POI 
- Front End: https://github.com/eoingeoghegan/POI-Svelte


# Project:
- "A point of interest (POI) is a location for which information is available. A POI can be as simple as a set of coordinates, a name, and a unique identifier, or more complex, such as a three-dimensional model of a building with names in multiple languages, information about opening and closing hours, and a civic address. POI data has many applications, including augmented reality browsers, location-based social networking games, geocaching, mapping, and navigation systems." Source.

- This application allows users to register, sign in, and manage points of interest (POI) in various categories (walks). After logging in, users can create and view their walking categories and add placemarkers. 

# Technologies Used
- Svelte
- SvelteKit
- Apache Echarts
- Leaflet Maps
- Typescript
- MongoDB
- Axios


# Usage
- Sign Up / Log In: Create an account or log into an existing account using your email and password.
- User Dashboard: After login, you’ll be directed to your personal dashboard where you can add placemrkers by difficulty and category. The user will see the displayed information after submitting a placemarker and the data can be seen on the Echarts and Map.


# API Documentation
Here are the available API endpoints for interacting with the user data:

- This app uses Axios to  make requests to backend API to localhost:4000.

Known Issues
Issue 1: After adding a placemarker to the list when the user presses the delete button, the page needs to be refefreshed for the placemarker to be deleted.

Issue 2: When submitting a placemarker the page needs to be reloaded to see the data on the Charts

# ScreenShots

![Dashboard Screenshot](static\map+chart.png) 


C:\Users\egghe\OneDrive\Desktop\SvelteAssignment-POI-EoinGeoghegan-20036009\POI-svelte\static\map+chart.png
