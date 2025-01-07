# Task app

## Description

This is a backend and frontend for task app. It is built with the next libs:

- #### [Nx](https://nx.dev/)
  - Nx is a set of extensible dev tools for monorepos, which helps you develop like Google, Facebook, and Microsoft.
- #### [NestJS](https://nestjs.com/)
  - NestJS is a framework for building efficient, reliable and scalable server-side applications. It uses modern JavaScript, is built with TypeScript and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).
- #### [ReactJS](https://react.dev/)
  - React lets you build user interfaces out of individual pieces called components. Create your own React component.

## Installation

```bash
$ npm install
```

## Project structure

    ├── apps                   # 🚀 JS Apps
    │   ├── backend            # 🌐 Task Backend in nestjs
    │   └── frontend           # 🙎 User app
    └── README.md              # 📚 Project documentation

## Running the app

Finally, you can run the apps with the followings commands:

```bash
# This command will run all the apps in the workspace
$ npm run start:all

# To run an specific app use this
$ npm run <app-name>
```

Where `<app-name>` is the name of the app to run, it can be `backend` or `frontend`.

When the `backend` and `frontend` is running, you can access the app in the browser at `http://localhost:3000/api` to see the swagger documentation and `http://localhost:4200` to see the app.

Example:

```
http://localhost:3000/api ---> Swagger documentation
http://localhost:4200 -------> User app
```
