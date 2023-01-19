# CRUD Application 

A  convenient system for logging internet protocol address using MySQL and Express.js. The system performs CRUD operations such as Create, Read, Update, and Delete.MySQL is a widely used relational database management system (RDBMS) and is free and open-source making it ideal for both small and large applications.Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.CRUD (Create, Read, Update, Delete) is an acronym for ways one can operate on stored data. It is a mnemonic for the four basic functions of persistent storage. CRUD typically refers to oprations perfomed in a database or datastore, but it can also apply to higher level functions of an application such as soft deletes where data is not actually deleted but marked as deleted via status. Uses ejs as the template engine and Bootstrap 5 for styling.

## System setup and configuration

Go to github and clone/download zip for the repository.
Using bash you can use the following command
```bash 
git clone https://github.com/hartl3y94/CRUD-Application-MYSQL.git
```
Then follow the steps below; 

>  Install Xammp. Open Xampp-Control panel,  start the Apache Server and Start mySQL service.

> The nagivate to your browser the browser, and use the URL and navigate **http://localhost/phpmyadmin/** 

> Now create new database called **IPAddress**, then import the **IPAddress.sql** sql file into it.

> Navigate to the folder and on the terminal type the following command;
```bash
npm install
```
> Confirm all the dependencies are installed on the system, then navigate to the terminal and type the following command;
```bash
npm start
```
This commands starts the server and listens on port 5000.

> Now you can view the system on the browser by navigating to **http://localhost:5000/** 


Thank you 🚀
