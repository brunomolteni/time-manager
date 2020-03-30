# Task Manager

This is a simple app to manage hours worked on different tasks.

it is divided into 2 different servers:

- The UI server, using Next.js for routing and server-side rendering
- The API server, which uses Strapi as a headless CMS

PM2 is used to manage both servers both for local development and the live production enviroment.

## Running the app

Both of these commands should start both servers, the UI on [http://localhost:1337](http://localhost:1337) and the API on [http://localhost:3000](http://localhost:3000)

### Local Development

```
npm run dev
```

### Production Enviroment

```
npm start
```

## API documentation

You can access the API documentation on [http://localhost:1337/documentation](http://localhost:1337/documentation)
