# avtaar-assignment-5-7-mohd-shadab

### NOTE :
As the assignments 1 and 2 were part of each other and mentor suggested to do both the assignments simultaneously so both the assignments are submitted in form of one repo. The github repo link provided in assignment 2 and 3 are same. It is done to ensure that both the assignments will be marked as done without any confusion.


##  Steps to run the code (Windows OS)

You'll need to have node.js installed in the machine. Git Bash is suggested as a terminal

- After clonning the repository, Navigate to the project folder by running following command in terminal:
```sh
 cd avtaar-assignment-5-7-mohd-shadab/
```

- Run the following command to install the all the node.js packages that are used in the code.
```sh
npm install
```

- Run the server by running following command:
```sh
npm run start
```

- The ouput in the termnal will be :
>Listening Server over port 4000 in DEVELOPMENT mode.
>
>Database connected to mongodb://localhost:27017/avtaar-mohd-shadab-4


# REST API

The REST API used in the code is described below.

## Insert into User table

### Request

`POST /api/v1/user/new`

     http://localhost:4000/api/v1/user/new

#### Sample Request (JSON)
  
    {
    "name" : "Mohd Shadab",   
    "email" : "shaad82663@gmail.com"
    }
    
### Response
  
    HTTP/1.1 200 OK
    success : true
    user : {...user}
    
    
## Insert into Item table

### Request

`POST /api/v1/item/new`

     http://localhost:4000/api/v1/item/new  


#### Sample Request (JSON)
  
    {
    "name" : "Mobile",
    "uid" : "oih123o210921904u329a"
    }

### Response
  
        HTTP/1.1 200 OK
        success : true,
        item : {...item}
    
## Book item for users

### Request

`POST /api/v1/booking/new`

     http://localhost:4000/api/v1/booking/new  
     
#### Sample Request (JSON)
  
    {
    "uid" : ["a1kj2b1iu3290209hboasa", "a1kj2b1iu3290209hboa5k"],
    "id" : ["q429083hoifb90hsofisona", "adasj2b1iu3290209hboda1"]
    }       

### Response
  
        HTTP/1.1 200 OK
        success : true,
        bookings : [...bookings]
    

### NOTE :
Some error habdling functions/modules will be added later while working on front-end because those are PRODUCTION based errors which will seen by end user. For now all errors are DEVELOPMENT based i.e. in most of the cases, only a programmer can understand the errors.

## Installation

Web App requires [Node.js](https://nodejs.org/) to run.
[Git Bash](https://git-scm.com/) is suggested as a terminal.

Install the dependencies and devDependencies and start the server.

```sh
cd <foler path>
npm install
npm run start
```

## Output
### Assignment-5
[Output-1](https://res.cloudinary.com/shaad82663/image/upload/v1637521517/Avtaar-Internship-Assisnments/slast-1-user_fy2uqp.png)
[Output-2](https://res.cloudinary.com/shaad82663/image/upload/v1637521517/Avtaar-Internship-Assisnments/slast-2-item_gresfg.png)

### Assignment-7
[Output-1: 5 bookingss-screenshot](https://res.cloudinary.com/shaad82663/image/upload/v1637521517/Avtaar-Internship-Assisnments/Last-out_gzah3d.png)
[Output-1: 5 bookings-txt-file](https://res.cloudinary.com/shaad82663/raw/upload/v1637521640/Avtaar-Internship-Assisnments/last-out_kz8omn.txt)





