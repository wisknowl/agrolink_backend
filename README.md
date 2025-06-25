# AgroLink Backend

This is the backend for the AgroLink app, built with Node.js, Express, TypeScript, PostgreSQL, and JWT authentication.

## Getting Started

1. Copy `.env.example` to `.env` and fill in your environment variables.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npx ts-node-dev src/app.ts
   ```

## Project Structure
- `src/controllers` - Route controllers
- `src/models` - Database models
- `src/routes` - Express routes
- `src/middleware` - Custom middleware
- `src/utils` - Utility functions
- `src/services` - Business logic/services

## License
MIT
