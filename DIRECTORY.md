.
|-- DIRECTORY.md
|-- Dockerfile
|-- README.md
|-- _lighthouse_ide_helper.php
|-- app
|   |-- Console
|   |   `-- Commands
|   |       |-- DeleteOldTasks.php
|   |       |-- GenerateOtpSecretKey.php
|   |       `-- UpdateExpiredPermits.php
|   |-- Events
|   |   `-- TaskUpdated.php
|   |-- GraphQL
|   |   |-- Mutations
|   |   |   |-- Login.php
|   |   |   |-- Logout.php
|   |   |   |-- OtpMutator.php
|   |   |   |-- Upload.php
|   |   |   `-- UserMutator.php
|   |   |-- Queries
|   |   |   `-- AttendanceQuery.php
|   |   `-- Resolvers
|   |       |-- BlotterResolver.php
|   |       |-- DocumentResolver.php
|   |       |-- FaceResolver.php
|   |       |-- TaskResolver.php
|   |       `-- UserResolver.php
|   |-- Http
|   |   |-- Controllers
|   |   |   |-- Api
|   |   |   |   |-- AuthController.php
|   |   |   |   |-- UserAvatarController.php
|   |   |   |   `-- UserController.php
|   |   |   `-- Controller.php
|   |   |-- Middleware
|   |   |   `-- RoleMiddleware.php
|   |   `-- Requests
|   |       `-- AvatarUploadRequest.php
|   |-- Mail
|   |   |-- SendOtpMail.php
|   |   `-- UserStatusChanged.php
|   |-- Models
|   |   |-- Attendance.php
|   |   |-- Barangay.php
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
|   |   |-- Task.php
|   |   `-- User.php
|   |-- Providers
|   |   `-- AppServiceProvider.php
|   `-- Traits
|       `-- HasGraphQLScopes.php
|-- artisan
|-- bootstrap
|   |-- app.php
|   |-- cache
|   |   |-- packages.php
|   |   `-- services.php
|   `-- providers.php
|-- bun.lock
|-- client
|   |-- Dockerfile
|   |-- app.vue
|   |-- assets
|   |   `-- css
|   |       `-- main.css
|   |-- components
|   |   |-- AppHeader.vue
|   |   |-- AppSidebar.vue
|   |   |-- AvatarUpload.vue
|   |   |-- BiometricComp.vue
|   |   |-- CrudTable.vue
|   |   |-- DatePickerButton.vue
|   |   |-- FluidCursor.vue
|   |   |-- Notification.vue
|   |   |-- TimePickerButton.vue
|   |   |-- modal
|   |   |   |-- Confirm.vue
|   |   |   |-- Form.vue
|   |   |   |-- Otp.vue
|   |   |   `-- View.vue
|   |   |-- table
|   |   |   |-- Data.vue
|   |   |   `-- types.ts
|   |   `-- ui
|   |       |-- DatePicker.vue
|   |       |-- SpinnerLoader.vue
|   |       `-- TimePicker.vue
|   |-- composables
|   |   |-- useConstants.ts
|   |   |-- useCopyClipboard.ts
|   |   |-- useLinks.ts
|   |   |-- useSearchQueryOptions.ts
|   |   `-- useTableData.ts
|   |-- graphql
|   |   |-- Attendance.ts
|   |   |-- Auth.ts
|   |   |-- Barangay.ts
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
|   |   |-- Task.ts
|   |   `-- User.ts
|   |-- layouts
|   |   |-- app-layout.vue
|   |   `-- default.vue
|   |-- lib
|   |   `-- utils.ts
|   |-- middleware
|   |   `-- auth.global.ts
|   |-- pages
|   |   |-- Login.vue
|   |   |-- Register.vue
|   |   |-- barangays
|   |   |   |-- components
|   |   |   |   `-- manage-barangay.vue
|   |   |   |-- data
|   |   |   |   |-- columns.ts
|   |   |   |   `-- schema.ts
|   |   |   `-- index.vue
|   |   |-- biometrics
|   |   |   |-- components
|   |   |   |   |-- clock-display.vue
|   |   |   |   |-- manage-attendance.vue
|   |   |   |   |-- manage-biometric.vue
|   |   |   |   |-- manage-dtr.vue
|   |   |   |   `-- modal
|   |   |   |       `-- AttendanceDetail.vue
|   |   |   |-- data
|   |   |   |   |-- columns.ts
|   |   |   |   |-- dtr_columns.ts
|   |   |   |   `-- schema.ts
|   |   |   |-- index.vue
|   |   |   `-- utils
|   |   |       `-- helpers.ts
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
|   |   |-- residents
|   |   |   |-- components
|   |   |   |   `-- manage-resident.vue
|   |   |   |-- data
|   |   |   |   |-- columns.ts
|   |   |   |   `-- schema.ts
|   |   |   `-- index.vue
|   |   |-- settings
|   |   |   `-- index.vue
|   |   |-- tasks
|   |   |   |-- components
|   |   |   |   |-- kanban-board.vue
|   |   |   |   |-- manage-task.vue
|   |   |   |   `-- ui
|   |   |   |       `-- KanbanCard.vue
|   |   |   |-- composables
|   |   |   |   `-- useBoardActions.ts
|   |   |   |-- data
|   |   |   |   |-- columns.ts
|   |   |   |   |-- schema.ts
|   |   |   |   `-- types.ts
|   |   |   |-- index.vue
|   |   |   `-- utils
|   |   |       `-- helper.ts
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
|   |       |       |-- authSchema.ts
|   |       |       |-- columns.ts
|   |       |       `-- schema.ts
|   |       `-- index.vue
|   |-- plugins
|   |   `-- echo.client.js
|   |-- stores
|   |   |-- authStore.ts
|   |   `-- taskStore.ts
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
|   |-- broadcasting.php
|   |-- cache.php
|   |-- cors.php
|   |-- database.php
|   |-- filesystems.php
|   |-- lighthouse.php
|   |-- logging.php
|   |-- mail.php
|   |-- media-library.php
|   |-- octane.php
|   |-- permission.php
|   |-- queue.php
|   |-- reverb.php
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
|   |   |-- 2025_06_21_141151_create_barangays_table.php
|   |   |-- 2025_06_21_141153_create_puroks_table.php
|   |   |-- 2025_06_21_141154_create_households_table.php
|   |   |-- 2025_06_21_141155_create_residents_table.php
|   |   |-- 2025_06_26_181058_create_blotters_table.php
|   |   |-- 2025_06_30_182649_create_officials_table.php
|   |   |-- 2025_06_30_182650_add_captain_to_barangays_table.php
|   |   |-- 2025_07_12_205508_create_documents_table.php
|   |   |-- 2025_08_04_102115_create_tasks_table.php
|   |   |-- 2025_08_07_142843_create_attendances_table.php
|   |   `-- 2025_08_31_101754_create_media_table.php
|   `-- seeders
|       |-- AttendanceSeeder.php
|       |-- DatabaseSeeder.php
|       |-- HouseholdSeeder.php
|       |-- PurokSeeder.php
|       |-- ResidentSeeder.php
|       `-- TaskSeeder.php
|-- docker-compose.yml
|-- eslint.config.mjs
|-- graphql
|   |-- Models
|   |   |-- Attendance.graphql
|   |   |-- Barangay.graphql
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
|   |   |-- Task.graphql
|   |   `-- User.graphql
|   |-- auth.graphql
|   `-- schema.graphql
|-- nginx
|   `-- default.conf
|-- nuxt.config.ts
|-- package.json
|-- phpunit.xml
|-- programmatic-types.graphql
|-- public
|   |-- client
|   |   |-- images
|   |   |   `-- avatar.png
|   |   `-- models
|   |       |-- age_gender_model
|   |       |   |-- age_gender_model-shard1
|   |       |   `-- age_gender_model-weights_manifest.json
|   |       |-- face_expression
|   |       |   |-- face_expression_model-shard1
|   |       |   `-- face_expression_model-weights_manifest.json
|   |       |-- face_landmark_68
|   |       |   |-- face_landmark_68_model-shard1
|   |       |   `-- face_landmark_68_model-weights_manifest.json
|   |       |-- face_recognition
|   |       |   |-- face_recognition_model-shard1
|   |       |   |-- face_recognition_model-shard2
|   |       |   `-- face_recognition_model-weights_manifest.json
|   |       `-- tiny_face_detector
|   |           |-- tiny_face_detector_model-shard1
|   |           `-- tiny_face_detector_model-weights_manifest.json
|   |-- favicon.ico
|   |-- index.php
|   `-- robots.txt
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
|   |-- channels.php
|   |-- console.php
|   `-- web.php
|-- rr
|-- run_server.sh
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
