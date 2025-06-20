<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Status Update</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .email-wrapper {
            padding: 2rem 1rem;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .email-container {
            max-width: 600px;
            width: 100%;
            background: #ffffff;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            overflow: hidden;
        }

        /* Header */
        .header {
            padding: 1rem 1rem 1rem;
            text-align: center;
            border-bottom: 1px solid #f3f4f6;
        }

        .header h1 {
            margin: 0 0 0.5rem 0;
            font-size: 1.875rem;
            font-weight: 700;
            color: #111827;
            letter-spacing: -0.025em;
        }

        .header p {
            margin: 0;
            font-size: 1rem;
            color: #6b7280;
            font-weight: 400;
        }

        /* Content */
        .content {
            padding: 2.5rem;
        }

        .greeting {
            margin: 0 0 2rem 0;
            font-size: 1rem;
            color: #111827;
            font-weight: 500;
        }

        /* Status Card */
        .status-card {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 2rem;
            margin: 2rem 0;
            position: relative;
        }

        .status-card.active {
            background: #f0fdf4;
            border-color: #bbf7d0;
        }

        .status-card.inactive {
            background: #fef2f2;
            border-color: #fecaca;
        }

        .status-card.active {
            background: #dcfce7;
            color: #166534;
        }

        .status-card.inactive {
            background: #fee2e2;
            color: #dc2626;
        }

        .status-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 0.75rem 0;
            color: #111827;
            text-align: center;
        }

        .status-description {
            font-size: 0.875rem;
            color: #6b7280;
            margin: 0;
            text-align: center;
            line-height: 1.5;
        }

        /* CTA Section */
        .cta-section {
            text-align: center;
            margin: 2.5rem 0;
        }

        .cta-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem 1rem;
            background: #a8d5ba;
            color: #000000;
            text-decoration: none;
            border-radius: 0.375rem;
            font-weight: 500;
            font-size: 0.875rem;
            line-height: 1.25rem;
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid transparent;
            cursor: pointer;
            position: relative;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .cta-button:hover {
            background: #81bca4;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .cta-button:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(166, 219, 178, 0.7); /* light green focus ring */
        }

        .cta-button:active {
            background: #69987e;
            transform: translateY(1px);
        }

        /* Footer */
        .footer {
            padding: 2rem 2.5rem;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
        }

        .footer-content {
            text-align: center;
        }

        .footer p {
            margin: 0 0 0.75rem 0;
            font-size: 0.75rem;
            color: #6b7280;
            line-height: 1.5;
        }

        .footer p:last-child {
            margin-bottom: 0;
        }

        .contact-info {
            margin: 1.5rem 0 0 0;
        }

        .contact-link {
            color: #4b5563;
            text-decoration: none;
            font-weight: 500;
        }

        .contact-link:hover {
            color: #111827;
        }

        .divider {
            display: inline-block;
            margin: 0 0.5rem;
            color: #d1d5db;
        }

        /* Social Links */
        .social-links {
            margin: 1.5rem 0 0 0;
            display: flex;
            justify-content: center;
            gap: 0.5rem;
        }

        .social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem 0.75rem;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            text-decoration: none;
            color: #6b7280;
            font-size: 0.75rem;
            font-weight: 500;
            transition: all 0.2s ease;
        }

        .social-link:hover {
            background: #f3f4f6;
            color: #374151;
            border-color: #d1d5db;
        }

        /* Responsive Design */
        @media (max-width: 640px) {
            .email-wrapper {
                padding: 1rem 0.5rem;
            }

            .email-container {
                border-radius: 8px;
            }

            .header {
                padding: 2rem 1.5rem 1.5rem;
            }

            .header h1 {
                font-size: 1.5rem;
            }

            .content {
                padding: 1.5rem;
            }

            .status-card {
                padding: 1.5rem;
            }

            .footer {
                padding: 1.5rem;
            }

            .social-links {
                flex-wrap: wrap;
                gap: 0.375rem;
            }
        }
    </style>
</head>
<body>
<div class="email-wrapper">
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h2>Account Status Update</h2>
            <p>Important notification about your account</p>
        </div>

        <!-- Content -->
        <div class="content">
            <p class="greeting">Hello {{ $user->name }} ({{ $user->getRoleNames()->join(', ') }})</p>

            <!-- Status Card -->
            <div class="status-card {{ $user->is_active ? 'active' : 'inactive' }}">
                <h2 class="status-title">
                    Account {{ $user->is_active ? 'Activated' : 'Disabled' }}
                </h2>
                <p class="status-description">
                    @if ($user->is_active)
                        Your account is now active and ready to use. You can access all features and services.
                    @else
                        Your account has been temporarily disabled. Please contact support for assistance.
                    @endif
                </p>
            </div>

            <!-- CTA Section -->
            @if ($user->is_active)
                <div class="cta-section">
                    <a href="http://dev-market-hub.vercel.app/login" target="_blank" class="cta-button">
                        Sign In to Your Account
                    </a>
                </div>
            @endif
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-content">
                <p>Need help? Our support team is here to assist you.</p>

                <div class="contact-info">
                    <a href="mailto:mlcnierras@gmail.com" class="contact-link">mlcnierras@gmail.com</a>
                    <span class="divider">•</span>
                    <a href="phone:+639683373329" class="contact-link">+639683373329</a>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
