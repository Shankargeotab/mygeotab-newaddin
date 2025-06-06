# Plow Status Add-in for MyGeotab

This add-in displays the plow status of vehicles by reading the Aux 6 diagnostic in MyGeotab.

## Features
- Shows when the plow is active or inactive
- Retrieves real-time data from MyGeotab
- Checks plow status for the last five minutes only

## Installation
1. Log in to **MyGeotab** and open **Administration > System Settings > Add-Ins**.
2. Choose **Add** and supply the manifest URL:
   `https://shankargeotab.github.io/mygeotab-newaddin/manifest.json`
3. Save your changes and log out/in to load the add-in.

### Permissions
The add-in calls the `StatusData` API to read diagnostic data. Users must have permission to view engine data (for example, the built-in **View engine data** security clearance or higher).

## Using the Add-in
After installation, open **Plow Status** from the main navigation. A panel appears showing current plow activity along with a **Refresh Status** button.

### Map Button
When viewing the map, the add-in adds a **Show Plow Status** button to the map toolbar. Selecting it opens the Plow Status page so you can check status without leaving the map.
