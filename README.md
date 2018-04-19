# Node API spike with ES7 async and Express validator

Tried to keep this one simple. It has:

- Express with body-parser and request validator
- ES7 async function

# Dev Environment

`npm run dev`

# Production

Make sure you have a `dist` folder.

`npm run build`

`npm run start`

# Health Endpoints

`localhost:3000/api/health`

# Sample Endpoints

`localhost:3000/api/users` get and post (with request body validator)

`localhost:3000/api/users/[id]`

`localhost:3000/api/users/[id]?include=posts`
