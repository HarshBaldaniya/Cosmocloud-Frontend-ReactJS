
# Cosmocloud Frontend ReactJS

This is a simple React frontend project that allows users to create and manage a dynamic form with various input fields. Users can save the form data, reset the form, and download the form data in JSON format. The project uses Ant Design for UI components and stores the form data in both cookies and local storage.






## Demo

To see a demo of this project, check out this [Live](https://cosmocloud-frontend-react-js.vercel.app/). 

## Features

1. Dynamic Form Creation
Users can create a dynamic form by adding items with a name and category. The category can be "String," "Number," or "Nested." The "Nested" category allows users to create nested sub-items within an item.

2. Save Form Data
Users can save the form data by clicking the "Save Form Data" button. The form data is validated, and if it passes validation, it is stored both in cookies and local storage. This allows users to persist their form data even after refreshing or closing the browser.

3. Reset Form
The "Reset Form" button allows users to clear all the form data. It resets the form to its initial state and removes the saved form data from cookies and local storage.

4. Download Form Data
Users can download the form data in JSON format by clicking the "Download JSON" button. This feature allows users to export their form data for further use or analysis.

## Implementation Details
Form Data Storage

Cookies: The form data is stored in cookies with a one-day expiration. This allows the data to persist even if the user closes the browser and returns later.

Local Storage: The visibility of nested sub-items is stored in local storage. This ensures that the state of the "Add Sub Item" button for each item is retained when the page is refreshed.








## Installation

- Clone this repository to your local machine.
- Open a terminal and navigate to the project directory.
- Run the following commands:

```bash
  npm install
  npm start
```
- Open your web browser and visit http://localhost:3000 to view and interact with the form.
    
## Dependencies
This project relies on the following dependencies:

- React: A JavaScript library for building user interfaces.
- Ant Design: A popular UI framework for React applications.
- js-cookie: A library for handling cookies in JavaScript.


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://www.harshbaldaniya.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hb134/)

