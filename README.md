# Cenetra

## Objective

Cenetra is a mobile-first application designed to facilitate communication between preschools, parents, and teachers. It enables preschools to update parents about their child's daily activities and milestones, and allows teachers to send important notices and updates. The parent platform is a mobile app, while the teacher platform is a website.



## Getting Started

To access the app, both parents and teachers must go through a verification process. They need to enter a unique code provided to them, which will be sent to their verified phone number. This ensures secure access to the app.

## Screenshots for parents app
<img src="https://github.com/SaikrishnaTadepalli/Cenetra/assets/66628544/97078cf2-7e4c-47ff-9e47-c54542bf6d19" width="20%">
<img src="https://github.com/SaikrishnaTadepalli/Cenetra/assets/66628544/1638649d-fd39-46dc-8483-4091ab8641b4" width="20%">
<img src="https://github.com/SaikrishnaTadepalli/Cenetra/assets/66628544/df69262a-e76a-4606-914e-04492337ef4e" width="20%">
<img src="https://github.com/SaikrishnaTadepalli/Cenetra/assets/66628544/0891d25e-f3a2-4b6f-a421-2a0fa0ea14b0" width="20%">
<img src="https://github.com/SaikrishnaTadepalli/Cenetra/assets/66628544/fa4a2f47-7a5a-4bc7-ac04-1350b60defb7" width="20%">
<img src="https://github.com/SaikrishnaTadepalli/Cenetra/assets/66628544/6b894927-292f-4786-9835-eda80839695f" width="20%">
<img src="https://github.com/SaikrishnaTadepalli/Cenetra/assets/66628544/428cc6a1-a04e-4298-b253-0ad6f884a0e3" width="20%">
<img src="https://github.com/SaikrishnaTadepalli/Cenetra/assets/66628544/cf70092b-aa83-47a4-b1ac-cae6607f4196" width="20%">
<img src="https://github.com/SaikrishnaTadepalli/Cenetra/assets/66628544/1d33dad4-0d51-4e61-8387-4c5fe07ad9b7" width="20%">

## App Demo
[![Watch the video](https://img.youtube.com/vi/cAcdjRRDfCk/default.jpg)](https://youtu.be/cAcdjRRDfCk)

## Parent Features

### Daily Logs

Parents can access the "Daily Logs" page from the bottom tab navigator. Here, they can view all the logs and images posted for their child. Clicking on an image expands it for a closer look. Each log contains details such as open-ended questions, checklist questions, and radio button questions.

### Notices

The "Notices" screen displays different types of notices, such as "urgent" or "serious". Clicking on a notice card expands it to reveal the subject, message details, and posting time.

### Chat

Parents can communicate with their child's primary teacher through the "Chat" screen. This feature facilitates direct and efficient communication regarding their child's progress and any concerns they may have.

### Settings

The "Settings" screen allows parents to view and edit their profile information, including primary and emergency contact details, allergies, medications, and blood group. Changes to this information need approval from an admin before they are confirmed. Parents can also manage privacy and notification settings, leave feedback, and contact the school via email, phone, or address.

## Future Enhancements for Parent App

- Ability to edit profile details, including allergies, medications, and primary/emergency contact information, pending admin approval.
- Chat feature for enhanced communication with teachers.
- Download option for media files.
- Support for video files and zooming into pictures.

## Teacher Features

### Home Screen

Teachers are presented with a home screen that displays a list of all the students in their class. Clicking on a student's name allows teachers to view the student's profile but does not provide editing access.

### Daily Logs

Teachers can access the "Daily Logs" screen to view all the students in their class. Clicking on a student's name provides access to all the logs associated with that student. Clicking on a specific log reveals detailed information about the log. If it is today's log, teachers have the ability to edit it. Additionally, there is an "Add New Log" button that is enabled only if a log has not been created for the current day. The log creation process includes pre-filled questions with options for open-ended, radio button, and checkbox responses. Teachers can provide answers and rate the student's overall performance for the day.

### Notices

The "Notices" screen displays all the notices posted by the teacher. Clicking on a notice allows teachers to view the notice type, subject, and details.

### Create Notice

Teachers can utilize the "Create Notice" screen to send information to specific students. They can select the students to receive the notice, add a subject, and provide details. 

### Log Out

The "Log Out" button in the header acts as a navigation bar, allowing teachers to move between pages and exit the app.


## Repository Structure

The Cenetra repository follows a specific structure to organize the backend, frontend, and web components. Here's a breakdown of the repository structure:

- backend
  - graphql: Contains the GraphQL schema, resolvers, and related files for defining and implementing the APIs.
  - models: Includes the database models and schemas used in the backend.
  - utils: Contains utility functions, helpers, or other miscellaneous files used in the backend.
- frontend
  - src (Mobile App)
    - components: Contains smaller reusable components used in different screens.
    - screens: Includes the main views or screens that users interact with.
    - redux: Holds the logic for global state management using Redux.
    - navigation: Contains the navigation logic, such as stack navigation and bottom tab navigation.
    - constants: Provides custom fonts and colors used in the app.
    - hooks: Includes custom defined hooks to avoid redundancy and promote code reuse.
- web
  - src (Web App)
    - components: Contains reusable components used in the web app.
    - redux: Holds the logic for global state management using Redux.
    - constants: Provides custom constants, such as fonts and colors.
    - hooks: Includes custom defined hooks for code reusability.



  
## Installation
### Frontend
  Clone the repository cd into the frontend directory the and use the node-package-manager to install all the relevant packages.

```bash
cd frontend
npm install
```

## Running the application:

For android: ```npm run android``` <br />
For iOS: ```npm run ios``` <br />

To run the application on your device:
<ol>
<li>Run the following command `expo start`
<li>Scan the QR code from your device
</ol>

### Web
Clone the repository cd into the web directory the and use the node-package-manager to install all the relevant packages.

```bash
cd web
npm install
```

## Running the application:

For web: `npm run start`
Then click w to start it on the web

  ## Backend
## Installation

Similar to frontend, clone the repository(if not done already) cd to backend and then use npm to install node_modules.

```bash
cd backend
npm install
```

Add a `.env` file to the root folder. Follow the below template:


```python
MOBGODB_URI=[YOUR_ACTIVE_MONGO_DB_URI_HERE]
TEST_MONGODB_URI=[YOUR_TEST_MONGO_DB_URI_HERE]

NODE_ENV=[PICK ONE: active OR test]

PORT=3001

JWT_SECRET =[YOUR_JWT_SECRET_KEY_HERE]
JWT_EXPIRY = [YOUR_EXPIRY_TIME_HERE_IN_SECONDS]
```



## How to Contribute

If you would like to contribute to the development of Cenetra, please follow these guidelines:
- Submit bug reports or feature requests.
- Propose code contributions through pull requests.
- Adhere to the specified coding style.
- Include clear descriptions and instructions for your contributions.

## License

Copyright © 2022, Saikrishna Tadepalli. Released under the [MIT](https://choosealicense.com/licenses/mit/) License.

## Contact Information

We appreciate your interest and contribution to Cenetra!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.



