# Open Micro Saas, the Next.js SaaS toolkit

Open Micro SaaS is an open-source, Next.js-based Software as a Service (SaaS) starter kit designed to help you launch your SaaS applications faster and more efficiently. It's packed with essential features like user authentication, a billing system, and an admin dashboard.

---

⚠️ This project is still in progress but **`I'm actively working on it 👨‍💻`**.

---

## Why Open Micro SaaS?

Here are five reasons why Open Micro SaaS stands apart from other SaaS starter kits:

1. Its **exceptional code quality**, adherence to the latest industry best practices, and a user-friendly design for effortless updates, like:

- ✅ Static analysis tools (ESLint and Prettier) are integrated into the project to ensure consistent code quality a format.
- ✅ TypeScript, which provides a better type safety and fewer bugs.
- ✅ Tailwind CSS and DaisyUI, which provides a easier way to customize the UI.
- ✅ Playwright, which provides a better way to write integration tests.
- ✅ Github Actions, which provides a better way to run the tests and deploy the project.

> “Code, without tests, is not clean. No matter how elegant it is, no matter how readable and accessible, if it hath not tests, it be unclean. Dave.”. - Robert C. Martin.

It's crafted to streamline development, ensuring scalable, maintainable, and future-proof SaaS solutions.

Of course, there is always room for improvement, so feel free to open an issue or a pull request if you have any suggestions.

2. Its **open-source license**. You can use this project for free, even in commercial projects. You can also modify it as you wish, and use it as a base for your own projects. Please don't forget to give credit to the original author.

3. Its **extensive documentation**. The project comes with a detailed README file, and the code is thoroughly documented.

4. Its marketing and business focus. The project is designed to help you launch your SaaS application faster and more efficiently. It's packed with essential features like user authentication, a billing system, and an admin dashboard.

5. Its **Analytics and SEO** focus. The project is designed to help you track your users and improve your SEO. It's packed with essential features like Google Analytics.

## Tech Stack

This project uses the next tech stack:

- [Next.js (V.14)](https://nextjs.org/).
- [Next auth](https://next-auth.js.org/).
- [Eslint](https://eslint.org/).
- [Prettier](https://prettier.io/).
- [Prisma](https://www.prisma.io/).
- [Tailwind CSS](https://tailwindcss.com/).
- [PostgreSQL](https://www.postgresql.org/).
- [Stripe](https://stripe.com/).
- [Playwright](https://playwright.dev/).
- [Github Actions](https://github.com/features/actions).

## Features

The Open Micro SaaS starter kit comes with the following features:

- **Authentication System**: Integrated OAuth and traditional email/password sign-up and login methods (Done).
- **User Management**: Admin panel for managing users and roles (Done).
- **Dynamic Configuration**: Configuration files for easy customization of SaaS settings (In progress).
- **Billing and Subscription Management**: Integrated with popular payment gateways for handling different subscription plans (TODO).
- **Landing page**: A landing page for your SaaS application (In progress).
- **Responsive UI**: A modern, mobile-responsive user interface (In proggress).

You want more? Feel free to suggest new features by opening an issue.

### Prerequisites

You will need the following to run this project:

- Node.js (v18 or newer).
- A PostgreSQL database.
- Docker.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/product-makers-hub/open-micro-saas.git
   ```
2. Install dependencies:
   ```bash
   cd open-micro-saas
   npm install
   ```
3. Set up your `.env` file based on the provided `.env.example`.

   ```bash
   copy .env.example .env
   ```

4. Set up your Next auth secret. For more information, see [Next auth's documentation](https://next-auth.js.org/configuration/options#description-1).

   ```bash
   $ openssl rand -base64 32
   ```

5. Set up your database credentials in the `.env` file. Please notice that the `docker-compose.yml` file is configured to use the following credentials, feel free to use the values that makes sense to you:

   ```bash
   POSTGRES_HOST=127.0.0.1
   POSTGRES_PORT=6500
   POSTGRES_USER: your-user-that-you-want
   POSTGRES_PASSWORD: your-password-that-you-want
   POSTGRES_DB: your-db-that-you-want
   DATABASE_URL="postgresql://your-user-that-you-want:your-password-that-you-want@localhost:6500/your-db-that-you-want?schema=public"
   ```

   Notice that the `DATABASE_URL` is the same as the `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST` and `POSTGRES_PORT`, so make sure that you set the same values in all of them.

6. Compose the Docker image for the PostgreSQL database. Install [Docker](https://docs.docker.com/get-docker/) if you haven't already:

   ```bash
   npm run docker:compose
   ```

7. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the development server on port 3000.

### Testing

This project uses [Playwright](https://playwright.dev/) for integration testing.

For more information on how to write tests in Next.js with this tool, see [Next.js' documentation](https://nextjs.org/docs/app/building-your-application/testing/playwright).

The tests are located in the `tests` folder, and are a crucial part of the project. Please make sure that you write tests for any new feature that you add to the project.

You need a test database to run the tests. Follow the next stepts (first time only):

1. Create the test database in Docker:

```bash
npm run test:db:compose
```

2. Run the migrations. You have the database created, but you need to create the tables. For that, you need to run the migrations:

```bash
npm run test:db:prepare
```

3. Run the tests. You can now run the tests with the following command:

```bash
npm run test
```

This will run the tests in the `tests` folder. You can also run the tests in UI mode with the following command:

```bash
npm run test:ui
```

This will open a browser window where you can see the tests running.

Note: If you create a new migration in development, you need to run the migrations in the test database too.

## Usage

TODO.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Make sure that you add tests for your feature. This is required.
4. Commit your Changes (`git commit -m 'feat: add some AmazingFeature'`). Please use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for your commit messages. This is required.
5. Push to the Branch (`git push origin feature/AmazingFeature`).
6. Open a Pull Request.

Any question or suggestion? Feel free to open an issue.

## License

Distributed under the GPL-2.0 License. See `LICENSE` for more information.

## Contact

Juan Correa – [LinkedIn profile](https://www.linkedin.com/in/juancorreaherrera/)
