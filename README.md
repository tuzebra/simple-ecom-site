# A Simple Web shop build with React + TypeScript + Vite

## To run at local

**Requisite: NodeJS version 18+**

From the _root_ for this project, run the following command:

```bash
# using npm
npm install
npm run dev
```

then the command line will show something like this
```bash
 ➜  Local:   http://localhost:5173/
 ➜  Network: use --host to expose
 ➜  press h + enter to show help
```

You can open that link with browser to explore the website.

## Project Structure

This project follows a specific structure to organize the codebase. Here is a brief explanation of the directories inside the `/src` folder:

- `apis/`: This directory contains all the API calls used in the application. Each file corresponds to a specific domain, such as `cart.ts`, `category.ts`, `common.ts`, and `product.ts`.

- `components/`: This directory contains all the React components used throughout the application. Each component has its own file, such as `add-to-cart.tsx`, `cart-badge.tsx`, `link.tsx`, etc.

- `css/`: This directory contains all the SCSS files for styling the application. The `_variable.scss` file is used to define common variables that can be used in other SCSS files.

- `fetch-middlewares/`: This directory is used to setup fetch middlewares for the application. Middleware is a function we used to "hook" between the fetch API calls. In this project, it is mostly used for simulating the "cart" API, instead of calling the real "cart" endpoint, all the get & set operations will forward to "localStorage".

- `global-state/`: This directory is used to define the global state of the application.

- `hooks/`: This directory contains all the custom React hooks used in the application. For example, `compute.ts` contains hooks that compute values based on other values.

- `page-elements/`: This directory contains elements that are used to build up the pages of the application.

- `utils/`: This directory contains utility functions that are used throughout the application.

- `const.ts`: This file contains all the constants used in the application.

