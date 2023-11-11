# ScottyLabs Full-Stack Application Template

- [Next-Auth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Eslint](https://eslint.org/docs/latest/)
- [Prettier](https://prettier.io/docs/en/)
- [Husky](https://typicode.github.io/husky/#/)

# How to Run:

Populate `.env`. Then run

```
 yarn
 npx prisma db push
 yarn dev
```

If `yarn` doesn't work

```
For Windows: `npm install --global yarn`
For Mac:
 - Install brew: https://brew.sh/
 - Install yarn: `brew install yarn` in terminal
```

If you encounter linting errors when building the project, run
```
yarn lint -- --fix
```
