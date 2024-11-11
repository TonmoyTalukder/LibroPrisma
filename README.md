# LibroPrisma: Library Management System API using PostgreSQL and Prisma ORM

### Author
**[Tonmoy Talukder](https://tonmoytalukder.github.io/dev)** </br>
*Full Stack Developer*

## Project Description
Purpose of this project is developing a backend API for a Library Management System that allows library staff and members to manage books, memberships, and borrowing activities.

## Technology Stack
- Prisma ORM
- Node.js
- PostgreSQL
- Express.js
- TypeScript

## Features
- CRUD Operation for Book
- CRUD Operation for Member
- Borrow Request for a Book
- Return Request for a Book
- Overdue check for the borrowed books

## Installation Steps
1. git clone https://github.com/TonmoyTalukder/LibroPrisma.git
cd /path/to/your/directory
yarn
npx prisma migrate dev --name init
yarn run dev
yarn run build

> **⚠️ Warning:** 
> 
> The postgreSQL database is deployed to supabase in a free plan. Free projects are paused after 1 week of inactivity.
