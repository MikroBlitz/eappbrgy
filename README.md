## Project Overview
This project is a **full-stack monolithic application** that seamlessly integrates **Nuxt.js** for the frontend with a **Laravel-powered API** on the backend. It provides a unified, efficient, and maintainable development workflow within a single codebase.

### Tech Stack
![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00C58E?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Apollo GraphQL](https://img.shields.io/badge/Apollo%20GraphQL-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-2C3E50?style=for-the-badge&logo=pinia&logoColor=yellow)
![Lighthouse](https://img.shields.io/badge/Laravel%20Lighthouse-10B981?style=for-the-badge&logo=graphql&logoColor=white)
![Sanctum](https://img.shields.io/badge/Sanctum-3498DB?style=for-the-badge&logo=laravel&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

## Setup Instructions

### Prerequisites
Make sure you have the following software installed on your system:
- [Composer](https://getcomposer.org/) – PHP dependency manager
- [Node.js](https://nodejs.org/) – JavaScript runtime environment
- [XAMPP](https://www.apachefriends.org/index.html) or another local server environment
- [PHP 8.2](https://www.php.net/) or a compatible version
- [PHP Redis Extension](https://pecl.php.net/package/redis) – Required for PHP to communicate with Redis
- [GitHub CLI](https://cli.github.com/) *(optional)*
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) *(optional)*

---

### Docker Setup *(Optional)*
If you prefer using Docker:

1. Clone the repository:
    ```bash
    git clone https://github.com/MikroBlitz/govana.git
   
    cd govana
    ```
2. Copy the `.env.example` file and generate the application key and OTP key:
    ```bash
    composer install && cp .env.example .env && php artisan key:generate && php artisan otp:generate-key
    ```

3. Build and start the Docker containers:
    ```bash
    docker compose up -d --build
    ```

4. Run database migrations and seeders:
    ```bash
    docker compose exec backend php artisan migrate:fresh --seed
    ```

5. Access the frontend at `http://localhost:3000` and the backend at `http://localhost:8000`.

---

### Manual Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/MikroBlitz/govana.git
   
    cd govana
    ```

2. Install the backend dependencies:
    ```bash
    composer install
    ```

3. Copy the example environment file and set up environment variables:
    ```bash
    cp .env.example .env && php artisan key:generate && php artisan otp:generate-key
    ```

4. Set up the database configuration in the `.env` file and run migration and seeders:
    ```bash
    php artisan migrate:fresh --seed
    ```

5. Install the frontend dependencies:
    ```bash
    bun install
    ```

6. Start the Nuxt.js development server and Laravel server:
    ```bash
    bun start
    ```

7. Open your browser and navigate to `http://localhost:3000` & `http://localhost:8000` for the front-end and back-end respectively

8. To run cron job:
    ```bash
    php artisan schedule:run
    ```
   For production, add the following to your system's crontab to run the scheduler every minute:
    ```bash
    * * * * * cd /path-to-app && php artisan schedule:run >> /dev/null 2>&1
    ```
   This ensures all scheduled tasks (e.g., auto-expiring permits) run automatically based on their defined schedule.

### Testing API performance

```bash
bun octane
```

```bash
bun api:test
```

## GraphQL API

GraphQL queries and mutations are handled by **Laravel Lighthouse**. You can explore and test the GraphQL API through the GraphQL Playground available at:
```bash
http://localhost:8000/graphiql
```

## Generating GraphQL Types
To generate the GraphQL types, run the following command:

```bash
bun codegen
```

## Clear backend cache
This will clear all the cache files in the backend.

```bash
bun clear
```

## Contributing
Contributions are welcome! Please follow the guidelines outlined in the [contributing guidelines](CONTRIBUTING.md).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
