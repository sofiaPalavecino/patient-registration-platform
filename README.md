# Patient Registration Platform

A patient registration system built with Laravel, React (TypeScript), and PostgreSQL. The platform provides an interface for registering patients with document image upload capabilities and automated email notifications.

## 🏗️ Tech Stack

- **Backend**: Laravel 12 with PHP 8.4
- **Frontend**: React 18 + TypeScript with Inertia.js
- **Database**: PostgreSQL 16
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Containerization**: Docker & Docker Compose
- **Queue System**: Laravel Queues for background jobs

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose installed on your system
- Git

### Development Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd patient-registration-platform
   ```

2. **Set up environment variables**
   
   Copy the `.env.example` file to `.env` and configure the following settings:

   ```bash
   cp .env.example .env
   ```

   **DEV Database Configuration:**
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=db
   DB_PORT=5432
   DB_DATABASE=patients
   DB_USERNAME=admin
   DB_PASSWORD=password
   ```

   **Mail Configuration (Mailtrap for development):**
   ```env
   MAIL_MAILER=smtp
   MAIL_HOST=sandbox.smtp.mailtrap.io
   MAIL_PORT=2525
   MAIL_USERNAME=<your-mailtrap-username>
   MAIL_PASSWORD=<your-mailtrap-password>
   ```

3. **Build and start the Docker containers**
   ```bash
   docker compose build
   docker compose up -d
   ```

4. **Access the application**
   - **Laravel Application**: http://localhost:8080
   - **Vite Dev Server**: http://localhost:5173 (for hot reloading)

### Admin Credentials

The application includes authentication. Use the following credentials to access the admin area:

```
Email: admin@example.com
Password: password
```

*Note: These credentials where made using Laravel's built-in seeder.*

## 🔧 Key Features

### Patient Registration
- **Form Validation**: Comprehensive validation for all patient data
- **File Upload**: Secure document upload with drag-and-drop support
- **Email Validation**: Only Gmail addresses accepted

### File Management
- **Document Storage**: Secure file storage in `storage/app/public/patients/documents`
- **File Validation**: JPG/JPEG only, max 2MB
- **Preview Functionality**: Image preview before submission

## 📧 Email Notifications

### PatientRegisteredNotification

The system implements a notification system through the `PatientRegisteredNotification` class:

```php
class PatientRegisteredNotification extends Notification implements ShouldQueue
{
    // Current implementation supports email notifications
    // Designed for easy SMS integration in the future
}
```

**Current Features:**
- Automatic email notifications when patients are registered
- Queued processing for better performance
- Mailable class integration for customizable email templates

**Future Expansion:**
The notification class is designed to easily support SMS notifications.

### Queue System

Email notifications are processed asynchronously using Laravel's queue system:

**How it works:**
1. When a patient is registered, a notification job is dispatched to the queue
2. The `laravel_queue` container processes jobs in the background
3. Emails are sent without blocking the user registration flow

**Queue Worker:**
The Docker setup includes a dedicated queue worker container that automatically:
- Processes queued jobs
- Retries failed jobs (up to 3 attempts)
- Logs job execution for debugging

**Monitoring Queues:**
```bash
# View queue status
docker exec laravel_app php artisan queue:work --verbose

# Clear failed jobs
docker exec laravel_app php artisan queue:flush
```

## 🧪 Testing

The project includes comprehensive tests for the API endpoints:

```bash
# Run all tests
docker exec laravel_app php artisan test

# Run specific test class
docker exec laravel_app php artisan test --filter PatientApiTest
```

**Test Coverage:**
- Patient creation validation
- File upload functionality
- Email format and uniqueness validation
- Phone number and country code validation
- Required field validation

### Docker Development Workflow

The development environment is fully containerized:

```bash
# View logs
docker compose logs -f

# Access Laravel container
docker exec -it laravel_app bash

# Access database
docker exec -it laravel_db psql -U admin -d patients

# Rebuild containers
docker compose down
docker compose build --no-cache
docker compose up -d
```

## 📊 Database Schema

**Patients Table:**
- `id`: Primary key
- `first_name`: Patient's first name (letters and spaces only)
- `last_name`: Patient's last name (letters and spaces only)
- `email`: Email address (Gmail only, unique)
- `phone`: Phone number (digits only, min 10 chars)
- `country_code`: International country code (1-3 digits)
- `document_image_path`: Path to uploaded document
- `created_at/updated_at`: Timestamps

## 🔒 Security Features

- **File Upload Security**: Strict file type and size validation
- **Input Sanitization**: All inputs validated and sanitized
- **Authentication**: Laravel Sanctum for API authentication
- **CSRF Protection**: Built-in CSRF protection for forms
- **SQL Injection Prevention**: Eloquent ORM with parameter binding
