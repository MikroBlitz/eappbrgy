<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BarangayConnect - Account Status Update</title>
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
            background-color: #f8fafc;
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
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            overflow: hidden;
        }

        /* Header */
        .header {
            padding: 2rem 2rem 1.5rem;
            text-align: center;
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            position: relative;
        }

        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="%23ffffff" opacity="0.1"/><circle cx="80" cy="40" r="1.5" fill="%23ffffff" opacity="0.1"/><circle cx="40" cy="80" r="1" fill="%23ffffff" opacity="0.1"/></svg>');
            opacity: 0.3;
        }

        .header-content {
            position: relative;
            z-index: 1;
        }

        .logo {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            margin-bottom: 1rem;
            backdrop-filter: blur(10px);
        }

        .logo::before {
            content: '🏘️';
            font-size: 1.5rem;
        }

        .header h1 {
            margin: 0 0 0.5rem 0;
            font-size: 1.875rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.025em;
        }

        .header p {
            margin: 0;
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 400;
        }

        /* Content */
        .content {
            padding: 2.5rem;
        }

        .greeting {
            margin: 0 0 2rem 0;
            font-size: 1rem;
            color: #1e293b;
            font-weight: 500;
        }

        /* Status Card */
        .status-card {
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
            padding: 2rem;
            margin: 2rem 0;
            position: relative;
            overflow: hidden;
        }

        .status-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #60a5fa);
        }

        .status-card.active {
            background: #f0f9ff;
            border-color: #7dd3fc;
        }

        .status-card.active::before {
            background: linear-gradient(90deg, #0ea5e9, #38bdf8);
        }

        .status-card.inactive {
            background: #fef2f2;
            border-color: #fecaca;
        }

        .status-card.inactive::before {
            background: linear-gradient(90deg, #ef4444, #f87171);
        }

        .status-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin: 0 auto 1rem;
            font-size: 1.5rem;
        }

        .status-card.active .status-icon {
            background: #dbeafe;
            color: #1e40af;
        }

        .status-card.inactive .status-icon {
            background: #fee2e2;
            color: #dc2626;
        }

        .status-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 0.75rem 0;
            color: #1e293b;
            text-align: center;
        }

        .status-description {
            font-size: 0.875rem;
            color: #64748b;
            margin: 0;
            text-align: center;
            line-height: 1.6;
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
            padding: 0.75rem 2rem;
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.875rem;
            line-height: 1.25rem;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            cursor: pointer;
            position: relative;
            box-shadow: 0 4px 6px -1px rgba(30, 64, 175, 0.1), 0 2px 4px -1px rgba(30, 64, 175, 0.06);
            overflow: hidden;
        }

        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }

        .cta-button:hover::before {
            left: 100%;
        }

        .cta-button:hover {
            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
            box-shadow: 0 10px 15px -3px rgba(30, 64, 175, 0.2), 0 4px 6px -2px rgba(30, 64, 175, 0.1);
            transform: translateY(-1px);
        }

        .cta-button:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
        }

        .cta-button:active {
            transform: translateY(0);
        }

        /* Footer */
        .footer {
            padding: 2rem 2.5rem;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
        }

        .footer-content {
            text-align: center;
        }

        .footer p {
            margin: 0 0 0.75rem 0;
            font-size: 0.75rem;
            color: #64748b;
            line-height: 1.5;
        }

        .footer p:last-child {
            margin-bottom: 0;
        }

        .contact-info {
            margin: 1.5rem 0 0 0;
        }

        .contact-link {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }

        .contact-link:hover {
            color: #1e40af;
        }

        .divider {
            display: inline-block;
            margin: 0 0.5rem;
            color: #cbd5e1;
        }

        .app-info {
            margin: 1rem 0;
            padding: 1rem;
            background: #dbeafe;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
        }

        .app-info p {
            margin: 0;
            font-size: 0.75rem;
            color: #1e40af;
            font-weight: 500;
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
                padding: 1.5rem 1.5rem 1rem;
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

            .cta-button {
                padding: 0.75rem 1.5rem;
                font-size: 0.8rem;
            }
        }
    </style>
</head>
<body>
<div class="email-wrapper">
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="header-content">
                <h1>BarangayConnect</h1>
                <p>Your Community Connection Platform</p>
            </div>
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
                        Your BarangayConnect account is now active and ready to use. You can access all community features and connect with your barangay services.
                    @else
                        Your BarangayConnect account has been temporarily disabled. Please contact our support team for assistance with reactivation.
                    @endif
                </p>
            </div>

            <!-- CTA Section -->
            @if ($user->is_active)
                <div class="cta-section">
                    <a href="https://barangayconnect.app/login" target="_blank" class="cta-button">
                        Access BarangayConnect
                    </a>
                </div>
            @endif

            <div class="app-info">
                <p>BarangayConnect - Bridging communities through digital innovation</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-content">
                <p>Need assistance? Our community support team is ready to help you.</p>

                <div class="contact-info">
                    <a href="mailto:support@barangayconnect.app" class="contact-link">support@barangayconnect.app</a>
                    <span class="divider">•</span>
                    <a href="tel:+639876543210" class="contact-link">+639876543210</a>
                </div>

                <p style="margin-top: 1.5rem;">
                    This email was sent from BarangayConnect. If you have any questions about your account status,
                    please don't hesitate to reach out to our support team.
                </p>
            </div>
        </div>
    </div>
</div>
</body>
</html>
