# Fullstack APP

## Project Overview
This project is a full stack monolith built using **Nuxt.js** on the frontend and **Laravel** on the backend, with **Apollo GraphQL** for data fetching and **Laravel Lighthouse** handling GraphQL on the server. The state management is handled by **Pinia**, and **Sanctum** provides secure authentication. The platform facilitates the buying and selling of a wide range of items. It is a community-driven marketplace that connects buyers and sellers, making it easy for users to discover listings, communicate, and complete transactions efficiently.

### Features
- **Nuxt.js**: A Vue.js framework that supports SSR (Server Side Rendering) and static site generation.
- **Laravel**: A powerful PHP framework for backend logic and API handling.
- **Apollo GraphQL**: Frontend data management using GraphQL queries and mutations.
- **Laravel Lighthouse**: Integrates GraphQL API into Laravel.
- **Pinia**: Provides an intuitive and powerful state management solution.
- **Sanctum**: Implements secure authentication for API access.
- **ShadCn-Vue**: A lightweight and customizable UI library for Vue.js.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Vite**: A fast and lightweight build tool for modern web development.
- **Codegen**: Automatically generates GraphQL types from your Laravel models.

## Tech Stack
![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00C58E?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Apollo GraphQL](https://img.shields.io/badge/Apollo%20GraphQL-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-2C3E50?style=for-the-badge&logo=pinia&logoColor=yellow)
![Lighthouse](https://img.shields.io/badge/Laravel%20Lighthouse-10B981?style=for-the-badge&logo=graphql&logoColor=white)
![Sanctum](https://img.shields.io/badge/Sanctum-3498DB?style=for-the-badge&logo=laravel&logoColor=white)

### Frontend:
- [Nuxt.js](https://nuxtjs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Apollo GraphQL](https://www.apollographql.com/)

### Backend:
- [Laravel](https://laravel.com/)
- [Laravel Lighthouse](https://lighthouse-php.com/)
- [Sanctum](https://laravel.com/docs/sanctum)

## Setup Instructions

### Prerequisites

Make sure you have the following software installed on your system:
- [Composer](https://getcomposer.org/) - PHP dependency manager
- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [XAMPP](https://www.apachefriends.org/index.html) or another local server environment
- [PHP 8.2](https://www.php.net/) or a compatible version
- [GitHub CLI](https://cli.github.com/) (optional)
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) (optional)

### Backend (Laravel + Lighthouse), Frontend (Nuxt.js)

1. Clone the repository:

    ```bash
    git clone https://github.com/MikroBlitz/markethub.git
    cd markethub
    ```

2. Install the backend dependencies:

    ```bash
    composer install
    ```

3. Copy the example environment file and set up environment variables:

    ```bash
    cp .env.example .env && php artisan key:generate
    ```

4. Set up the database configuration in the `.env` file and run migration and seeders:

    ```bash
    php artisan migrate:fresh --seed
    ```

5. Install Laravel Lighthouse for GraphQL:

    ```bash
    composer require nuwave/lighthouse
    ```

6. Install the frontend dependencies:

    ```bash
    bun install
    ```

7. Start the Nuxt.js development server and Laravel server:

    ```bash
    bun start
    ```

8. Open your browser and navigate to `http://localhost:3000` & `http://localhost:8000` for the front-end and back-end respectively

9. Docker (Optional) Build/Run
   ```bash
    docker compose down
    docker compose up -d --build
    docker-compose up -d
    ```

## Resetting Docker Desktop on Debian

#### 1. Quit Docker Desktop
Stop Docker Desktop and terminate any running processes:
```sh
  systemctl --user stop docker-desktop
  pkill Docker
```

#### 2. Remove Docker Desktop Configurations
```sh
  rm -rf ~/.docker ~/.config/Docker ~/.local/share/docker
```

#### 3. Clear Docker Socket & Data (If Needed)
```sh
  sudo rm -rf /var/lib/docker /etc/docker
```

#### 4. Restart Docker Desktop
```sh
  systemctl --user start docker-desktop
```

### Testing API performance

```bash
bun octane
```

```bash
bun api:test
```

## Authentication

This application uses **Laravel Sanctum** for API authentication. To authenticate a user, make a POST request to `/api/login` with the necessary credentials, and use the generated token for authenticated API requests.

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
