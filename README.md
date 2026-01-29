React Components Library Demo
Overview

This project is a simple React Components Library created for demo and learning purposes.
The main goal of this project is to understand how reusable UI components can be created and used in a React application.

The project contains three main components:

Button

Card

Modal

Each component is kept simple and is controlled using props.

Technologies Used

React.js

JavaScript (ES6)

CSS

Node.js

npm

How to Run the Project

First create the project using:

npx create-react-app react-components-demo


Then move into the folder:

cd react-components-demo


Start the server:

npm start

Folder Structure
react-components-demo/
 ├─ src/
 │   ├─ Button.js
 │   ├─ Card.js
 │   ├─ Modal.js
 │   ├─ styles.css
 │   ├─ App.js
 │   └─ index.js
 ├─ package.json
 └─ README.md

App Logic (Main File)

The main file App.js controls the application flow.

useState is used to manage modal visibility.

When the button is clicked, the modal opens.

When close button is clicked, the modal closes.

This keeps the logic simple and easy to understand.

Button Component

The Button component is a reusable component for user actions.

Features:

Accepts text using props

Supports different styles using type

Handles click events

Example:

<Button text="Open Modal" type="primary" onClick={openModal} />

Card Component

The Card component is used to display information.

Features:

Displays title and description

Can be reused for any data display

Example:

<Card 
  title="Student Card"
  description="This card is coming from my reusable component."
/>

Modal Component

The Modal component is used to show popup content.

Features:

Uses conditional rendering

Controlled by state

Supports custom content

Example:

<Modal show={open} onClose={closeModal}>
  <h2>Hello!</h2>
  <p>This is my custom modal component.</p>
</Modal>

Styling

All styling is done in a single file styles.css.

It includes styles for:

Buttons

Cards

Modal overlay

Modal box

This keeps the project simple and easy to manage.

Learning Outcomes

From this project I learned:

How to create reusable components

How to pass data using props

How to use useState for UI control

How to structure a basic React project

How to separate logic and UI

Problems Faced

Some issues faced during development:

Modal was not closing initially

Forgot to link CSS properly

Button styles were not applying

These problems helped me understand debugging and file structure better.