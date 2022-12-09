# Ts.ED App
Here an example project using Ts.ED framework with Passport.js and Prisma

## Prepare
- MySQL Database


## Install
> **Important!** Ts.ED requires Node >= 8, Express >= 4 and TypeScript >= 3.

**Install dependencies**
```batch
npm install
```

**Migrate database**
> **Important!** Setup `DATABASE_URL` in `src/.env` for your database connection.


```
npm run prisma:migrate
```

## Run
```
npm start
```

Visit http://localhost:8083 using Postman.

## Endpoints
|  Method | Endpoint  | Description  |
| :------------ | :------------ | :------------ |
| POST  | `/auth/register`  |  Register a user (name, email, password)  |
|  POST  | ` /auth/login`  | Login a user using email and password  |
| GET  | `/rest/posts`  | Returns all posts that belongs to user |
| POST  | `/rest/posts`  | Create a post  |
| GET  | `/rest/posts/:id`  | Returns a post by ID  |
| PUT  |  `/rest/posts/:id` |  Update a post  |
| DELETE | `/rest/posts/:id` | Delete a post |

## Authentication
All endpoints in `/rest/*` are protected using Passport JWT authentication.
Once registered a user, you can now login using it's email and password.
### Successful login response:
```
{
    "id": 1,
    "email": "trd.warren@gmail.com",
    "name": "Warren Clarin",
    "token": "xxxxxxxxxxxxx"
}
```

### Use acquired token as request header to access protected routes
```
`Authorization: Bearer ${token}`
```