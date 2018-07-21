# Current State of App
We currently have the boilerplate of the entire project implemented. Our application is a eBay style marketplace application with in-app cryptocurrency support with the Ethereum Blockchain. We are using React for the front end, and Express/Nodejs for the backend. We are using PostgreSQL as our database with Sequelize as our ORM. 

Here is how the app currently looks like on the landing page.
![App Screenshot](https://i.snag.gy/Hg4Dep.jpg)


# Contribution Guide
1. Clone the repo
```
git@csil-git1.cs.surrey.sfu.ca:tamkylet/CMPT470-project-application.git
```

2.  Make sure you have yarn installed on your computer, check by executing:
```
yarn --version
```
The current latest yarn version as of June 9, 2018 is 1.7.0
If you do not have yarn installed, follow the steps found here: [Yarn installation guide](https://yarnpkg.com/lang/en/docs/install/#debian-stable)

3. When in the root directory of the project, install dependencies for server
```
sudo yarn install
```
4. cd to /client and install dependencies
```
sudo yarn install
```

5. cd to root dir of the project and start the project
```
cd ..
sudo yarn dev
```
6. View the app at [localhost:3000](http://localhost:3000/);
7. To access the app from another LAN, port the app over to ngrok
   - Follow the steps here: [ngrok installation guide](https://ngrok.com/download)
   - Start the http tunnel on the correct port (default is 3000)

# Code Deployment Guide

- Please visit the [Code Deployment Wiki](https://csil-git1.cs.surrey.sfu.ca/vinsonl/CMPT470-ReduxDemoSite/wikis/Code-Deployment/Code-Deployment-Guide)

# Boilerplate Code
- Boilerplate Code from: [How to get create-react-app to work with a Node.js back-end API](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)
