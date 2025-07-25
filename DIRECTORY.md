.
|-- app
|   |-- Console
|   |   `-- Commands
|   |       `-- UpdateExpiredPermits.php
|   |-- GraphQL
|   |   |-- Mutations
|   |   |   |-- Login.php
|   |   |   |-- Logout.php
|   |   |   |-- OtpMutator.php
|   |   |   |-- Upload.php
|   |   |   `-- UserMutator.php
|   |   `-- Resolvers
|   |       |-- BlotterResolver.php
|   |       |-- DocumentResolver.php
|   |       `-- UserResolver.php
|   |-- Http
|   |   |-- Controllers
|   |   |   |-- Api
|   |   |   |   |-- AuthController.php
|   |   |   |   `-- UserController.php
|   |   |   `-- Controller.php
|   |   `-- Middleware
|   |       `-- RoleMiddleware.php
|   |-- Mail
|   |   |-- SendOtpMail.php
|   |   `-- UserStatusChanged.php
|   |-- Models
|   |   |-- Blotter.php
|   |   |-- Contact.php
|   |   |-- Document.php
|   |   |-- Household.php
|   |   |-- Message.php
|   |   |-- Official.php
|   |   |-- Permission.php
|   |   |-- Purok.php
|   |   |-- Resident.php
|   |   |-- Role.php
|   |   `-- User.php
|   |-- Providers
|   |   |-- AppServiceProvider.php
|   |   `-- AuthServiceProvider.php
|   |-- Services
|   `-- Traits
|       `-- HasGraphQLScopes.php
|-- artisan
|-- bootstrap
|   |-- app.php
|   |-- cache
|   `-- providers.php
|-- bun.lock
|-- client
|   |-- app.vue
|   |-- assets
|   |   `-- css
|   |       `-- main.css
|   |-- components
|   |   |-- AppHeader.vue
|   |   |-- AppSidebar.vue
|   |   |-- CrudTable.vue
|   |   |-- DatePickerButton.vue
|   |   |-- FluidCursor.vue
|   |   |-- modal
|   |   |   |-- Confirm.vue
|   |   |   |-- Form.vue
|   |   |   |-- Otp.vue
|   |   |   `-- View.vue
|   |   |-- Notification.vue
|   |   |-- table
|   |   |   |-- Data.vue
|   |   |   `-- types.ts
|   |   `-- ui
|   |       |-- DatePicker.vue
|   |       `-- SpinnerLoader.vue
|   |-- composables
|   |   |-- useConstants.ts
|   |   |-- useCopyClipboard.ts
|   |   |-- useLinks.ts
|   |   |-- useSearchQueryOptions.ts
|   |   `-- useTableData.ts
|   |-- graphql
|   |   |-- Auth.ts
|   |   |-- Blotter.ts
|   |   |-- Document.ts
|   |   |-- Fragment.ts
|   |   |-- Household.ts
|   |   |-- Message.ts
|   |   |-- Official.ts
|   |   |-- Permission.ts
|   |   |-- Purok.ts
|   |   |-- Resident.ts
|   |   |-- Role.ts
|   |   `-- User.ts
|   |-- layouts
|   |   |-- app-layout.vue
|   |   `-- default.vue
|   |-- lib
|   |   `-- utils.ts
|   |-- middleware
|   |   `-- auth.global.ts
|   |-- pages
|   |   |-- blotters
|   |   |   |-- components
|   |   |   |   `-- manage-blotter.vue
|   |   |   |-- data
|   |   |   |   |-- columns.ts
|   |   |   |   `-- schema.ts
|   |   |   `-- index.vue
|   |   |-- dashboard
|   |   |   `-- index.vue
|   |   |-- documents
|   |   |   |-- components
|   |   |   |   `-- manage-document.vue
|   |   |   |-- data
|   |   |   |   |-- columns.ts
|   |   |   |   `-- schema.ts
|   |   |   `-- index.vue
|   |   |-- households
|   |   |   |-- components
|   |   |   |   `-- manage-household.vue
|   |   |   |-- data
|   |   |   |   |-- columns.ts
|   |   |   |   `-- schema.ts
|   |   |   `-- index.vue
|   |   |-- index.vue
|   |   |-- Login.vue
|   |   |-- messages
|   |   |   |-- components
|   |   |   |   `-- manage-messages.vue
|   |   |   `-- index.vue
|   |   |-- notfound.vue
|   |   |-- officials
|   |   |   |-- components
|   |   |   |   `-- manage-official.vue
|   |   |   |-- data
|   |   |   |   |-- columns.ts
|   |   |   |   `-- schema.ts
|   |   |   `-- index.vue
|   |   |-- puroks
|   |   |   |-- components
|   |   |   |   `-- manage-purok.vue
|   |   |   |-- data
|   |   |   |   |-- columns.ts
|   |   |   |   `-- schema.ts
|   |   |   `-- index.vue
|   |   |-- Register.vue
|   |   |-- residents
|   |   |   |-- components
|   |   |   |   `-- manage-resident.vue
|   |   |   |-- data
|   |   |   |   |-- columns.ts
|   |   |   |   `-- schema.ts
|   |   |   `-- index.vue
|   |   |-- settings
|   |   |   `-- index.vue
|   |   |-- unauthorized.vue
|   |   `-- users
|   |       |-- components
|   |       |   |-- manage-permission.vue
|   |       |   |-- manage-role.vue
|   |       |   `-- manage-user.vue
|   |       |-- data
|   |       |   |-- permission
|   |       |   |   |-- columns.ts
|   |       |   |   `-- schema.ts
|   |       |   |-- role
|   |       |   |   |-- columns.ts
|   |       |   |   `-- schema.ts
|   |       |   `-- user
|   |       |       |-- columns.ts
|   |       |       `-- schema.ts
|   |       `-- index.vue
|   |-- stores
|   |   `-- authStore.ts
|   |-- types
|   |   |-- codegen
|   |   |   |-- fragment-masking.ts
|   |   |   |-- gql.ts
|   |   |   |-- graphql.ts
|   |   |   `-- index.ts
|   |   |-- fields.ts
|   |   `-- global.ts
|   `-- utils
|       `-- helpers.ts
|-- codegen.ts
|-- composer.json
|-- composer.lock
|-- config
|   |-- app.php
|   |-- auth.php
|   |-- cache.php
|   |-- cors.php
|   |-- database.php
|   |-- filesystems.php
|   |-- lighthouse.php
|   |-- logging.php
|   |-- mail.php
|   |-- octane.php
|   |-- permission.php
|   |-- queue.php
|   |-- sanctum.php
|   |-- services.php
|   `-- session.php
|-- database
|   |-- factories
|   |   `-- UserFactory.php
|   |-- migrations
|   |   |-- 0001_01_01_000000_create_users_table.php
|   |   |-- 0001_01_01_000001_create_cache_table.php
|   |   |-- 0001_01_01_000002_create_jobs_table.php
|   |   |-- 2025_02_28_125236_create_personal_access_tokens_table.php
|   |   |-- 2025_03_08_130917_create_permission_tables.php
|   |   |-- 2025_06_18_212952_create_messages_table.php
|   |   |-- 2025_06_18_213154_create_contacts_table.php
|   |   |-- 2025_06_21_141153_create_puroks_table.php
|   |   |-- 2025_06_21_141154_create_households_table.php
|   |   |-- 2025_06_21_141155_create_residents_table.php
|   |   |-- 2025_06_26_181058_create_blotters_table.php
|   |   |-- 2025_06_30_182649_create_officials_table.php
|   |   `-- 2025_07_12_205508_create_documents_table.php
|   `-- seeders
|       |-- DatabaseSeeder.php
|       |-- HouseholdSeeder.php
|       |-- PurokSeeder.php
|       `-- ResidentSeeder.php
|-- DIRECTORY.md
|-- docker-compose.yml
|-- Dockerfile
|-- eslint.config.mjs
|-- graphql
|   |-- auth.graphql
|   |-- Models
|   |   |-- Blotter.graphql
|   |   |-- Contact.graphql
|   |   |-- Document.graphql
|   |   |-- Household.graphql
|   |   |-- Message.graphql
|   |   |-- Official.graphql
|   |   |-- Permission.graphql
|   |   |-- Purok.graphql
|   |   |-- Resident.graphql
|   |   |-- Role.graphql
|   |   `-- User.graphql
|   `-- schema.graphql
|-- _lighthouse_ide_helper.php
|-- nginx
|   `-- default.conf
|-- nuxt.config.ts
|-- package.json
|-- phpunit.xml
|-- programmatic-types.graphql
|-- public
|   |-- favicon.ico
|   |-- index.php
|   |-- nuxt
|   `-- robots.txt
|-- README.md
|-- resources
|   |-- css
|   |   `-- app.css
|   |-- js
|   |   |-- app.js
|   |   `-- bootstrap.js
|   `-- views
|       |-- emails
|       |   |-- otp.blade.php
|       |   `-- user_status_changed.blade.php
|       `-- welcome.blade.php
|-- routes
|   |-- api.php
|   |-- console.php
|   `-- web.php
|-- schema-directives.graphql
|-- server
|   `-- tsconfig.json
|-- tailwind.config.js
|-- tests
|   |-- Feature
|   |   `-- ExampleTest.php
|   |-- TestCase.php
|   `-- Unit
|       `-- ExampleTest.php
`-- tsconfig.json
