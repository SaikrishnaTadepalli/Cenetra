# Cenetra


## Objective

The Objective of Cenetra is to provide an easy-to-use mobile-first platform with which:
1. Gives preschools an efficient way to update parents about their child's daily progress, milestones and achievements.
2. Parents and teachers have an easy way to communicate with each other

To achieve the above objectives we have the following main screens: <br />
<ul>
<li>Daily Logs screen
<li>Notification screen
<li>Chat screen
<li>Settings screen
</ul>

## Links
<ul>
<li> Download for iOS:
<li> Download for android:
</ul>

## Future features to be added to the app:
<ol>
<li> A registration page that sends an OTP to the registered mobile number allowing parents to stay logged in.
</ol>

## Folder structure for the frontend
<ul>
<li> src
<ul>
<li>components
<li>screens
<li>redux
<li>navigation
<li>constants
<li>hooks
</ul>
</ul>
  
  The components folder has all the different smaller components that are required for each of the screens. <br />
  The screens folder has all the main views that are viewed by the user. <br />
  The redux folder has all the global state management logic. <br />
  The navigation folder houses the logic for the stack navigation and bottom tab navigation. <br />
  The constants folder has all the information that is required to access custom fonts and colors required by the app. <br />
  The hooks folder has custom defined hooks that are required by the app to avoid redundancy in the app. <br />
  
  ## Installation
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
<li>Run the following command ```expo start```
<li>Scan the QR code from your device
</ol>
  
  ## Backend

Download Android: [LINK](https://google.com)\
Download iOS: [LINK](https://google.com)

Note: Download links are temporary placeholders.

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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
Copyright © 2022, Saikrishna Tadepalli. Released under the [MIT](https://choosealicense.com/licenses/mit/) License.

