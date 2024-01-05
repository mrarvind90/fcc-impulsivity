[![freeCodeCamp Social Banner](https://s3.amazonaws.com/freecodecamp/wide-social-banner.png)](https://www.freecodecamp.org/)

<p style="text-align: center">
    <a href="https://vercel.com"><img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript"/></a>
    <a href="https://nodejs.org/en"><img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS" /></a>
    <a href="https://npmjs.com"><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" /></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="NextJS" /></a>
    <a href="https://www.w3.org/Style/CSS/Overview.en.html"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://daisyui.com"><img src="https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white" alt="daisyUI" /></a>
    <a href="https://www.mongodb.com"><img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" /></a>
    <a href="https://www.prisma.io"><img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
    <a href="https://eslint.org"><img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" /></a>
    <a href="https://prettier.io"><img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" alt="Prettier" /></a>
</p>

# Impulsivity

A full-stack reactive e-commerce web application built with Next.js, Tailwind CSS, Prisma, DaisyUI and MongoDB

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Libraries / Frameworks / Databases Used

- **Application**
    - Next.JS
    - next-auth
- **Component Library**
    - daisyUI
- **CSS**
    - CSS 3
    - Tailwind CSS
- **Database**
    - MongoDB
    - Prisma
- **Formatting & Linting**
    - Prettier
    - ESLint

## Pre-requisite

This project relies on MongoDB Atlas cloud instances for managing resources such as `products` and `carts`. If you
intend to clone this repository and run it locally, please follow these steps:

1. Create a MongoDB Atlas Account: To get started, you'll need to create an account on MongoDB Atlas, and the good news
   is, it's absolutely free! You can follow the step-by-step instructions in the
   [MongoDB Atlas Tutorial – How to Get Started](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)
   provided by freeCodeCamp to set up your own cluster.
2. Configure Your Environment Variables: After setting up your MongoDB Atlas cluster, you'll need to configure your
   environment variables. To do this, rename the `.env.sample` file in your project directory to `.env`. Then, open the
   `.env` file and insert the MongoDB URI from your Atlas cluster.

Here's what it should look like:

```dotenv
# Database variables
MONGODB_ATLAS_URI=mongodb+srv://<MONGODB_USER>:<MONGODB_PASSWORD>@<MONGODB_CLUSTER_HOST>/<MONGODB_DB_NAME>?retryWrites=true&w=majority
```

Note: In the example snippet above, you'll notice that the URI includes a database name. While this field is technically
optional, it's highly recommended that you create your own database instance on your MongoDB Atlas cluster. This
practice helps maintain organization and clarity in your project.

## Getting Started

1. Clone the repo:
   ```git
   git clone git@github.com:mrarvind90/fcc-impulsivity.git
   ```
2. Navigate to the repository:
    ```shell
    cd <repository_directory>
    ```
   Change <repository_directory> to the name of the cloned directory.
3. Install Dependencies:
    ```shell
    npm install
    ```
   This command will install all the necessary dependencies for the application.
4. Configure Environment Variables: Rename the `.env.sample` file in your project directory to `.env` and update
   it with the
   relevant credentials:
    ```shell
     cp .env.sample .env
    ```
5. Run the application:
    ```shell
     npm run dev
    ```
6. Launch the application on http://localhost:3000/

## Future Improvements

While developing this project, there are several areas I plan to focus on for enhancements and refinements
which can be found on [GitHub](https://github.com/mrarvind90/fcc-impulsivity/issues).
