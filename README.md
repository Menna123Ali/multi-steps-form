# Multi-Step Form Application

This application demonstrates how to implement a multi-step form using React Native and Formik.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Explanation](#Explanation)
  
## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/Menna123Ali/multi-steps-form.git
2. Install dependencies with `npm install`.
3. Configure the environment variables.
4. Run using `npm start`.

## Usage

Once the application is running, follow these steps to use the multi-step form:

1. **Step 1**: Enter personal information.
2. **Step 2**: Enter income information.
3. **Step 3**: Enter possessions information and submit the form.
   
Only the current question is enabled and upcoming questions are considered "locked".

## Folder Structure

project-directory/

│

├── src/

│ ├── assets/

│ │ ├── images/

│ │ │ └── icons/

│ ├── components/

│ ├── navigation/

│ ├── screens/

│ │ └── formScreen/

│ │ │ ├── index.js

│ │ │ ├── constants.js

│ │ │ └── components/

│ ├── store/

│ │ ├── FormContext.js

│ │ └── reducer.js

│ ├── styles/

│ │ └── colors.js

│ ├── App.js

│

├── README.md

└── package.json

### Explanation:

- **src/**: Contains all the source code of your application.
  - **assets/**: Images, fonts, and other static assets used in your application.

  - **components/**: Reusable UI components used across different pages or sections of your app.
  - 
  - **navigation/**: Navigation setup using React Navigation.

  - **screens/**: Components representing different screens or views of your application..

  - **store/**: Global data shared during the entire application.

  - **styles/**: Global styles.
  - 
  - **App.js** and **index.js**: Entry points of your application where you initialize your app and render components.

