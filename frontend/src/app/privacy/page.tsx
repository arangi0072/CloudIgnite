import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Privacy Policy - CloudIgnite',
};

export default function PrivacyPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow container mx-auto max-w-3xl px-4 py-16 sm:py-24">
                <article className="prose">
                    <h1>Privacy Policy</h1>
                    <p><strong>Effective Date:</strong> [Insert Date]</p>
                    <p>CloudIgnite respects your privacy and is committed to protecting your data.</p>
                    <p>This Privacy Policy explains how we collect, use, and safeguard information.</p>

                    <h2>1. Information We Collect</h2>
                    <h3>Information You Provide</h3>
                    <ul>
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Billing details</li>
                        <li>Company information</li>
                    </ul>
                    <h3>Automatically Collected</h3>
                    <ul>
                        <li>IP address</li>
                        <li>Device information</li>
                        <li>Log data</li>
                        <li>Usage metrics</li>
                    </ul>

                    <h2>2. How We Use Information</h2>
                    <p>We use data to:</p>
                    <ul>
                        <li>Provide and maintain services</li>
                        <li>Improve platform reliability</li>
                        <li>Prevent fraud and abuse</li>
                        <li>Process payments</li>
                        <li>Communicate important updates</li>
                    </ul>
                    <p>We do NOT sell your personal data.</p>

                    <h2>3. Customer Data</h2>
                    <p>You retain full ownership of data stored on CloudIgnite.</p>
                    <p>We process customer data only to deliver the requested services.</p>

                    <h2>4. Security</h2>
                    <p>We employ administrative, technical, and physical safeguards designed to protect your information.</p>
                    <p>Despite this, no method of transmission over the internet is 100% secure.</p>
                    
                    <h2>5. Data Retention</h2>
                    <p>We retain personal data only as long as necessary to:</p>
                    <ul>
                        <li>Provide services</li>
                        <li>Meet legal obligations</li>
                        <li>Resolve disputes</li>
                    </ul>
                    <p>You may request deletion where applicable.</p>
                    
                    <h2>6. Third-Party Services</h2>
                    <p>We may rely on trusted third-party providers for:</p>
                    <ul>
                        <li>Payment processing</li>
                        <li>Infrastructure</li>
                        <li>Analytics</li>
                    </ul>
                    <p>These providers are obligated to protect your data.</p>
                    
                    <h2>7. Cookies</h2>
                    <p>CloudIgnite uses cookies to enhance user experience and analyze platform usage.</p>
                    <p>You may disable cookies via browser settings.</p>
                    
                    <h2>8. International Users</h2>
                    <p>By using CloudIgnite, you understand that data may be processed in regions where we operate.</p>
                    
                    <h2>9. Your Rights</h2>
                    <p>Depending on your jurisdiction, you may have the right to:</p>
                    <ul>
                        <li>Access your data</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion</li>
                        <li>Object to processing</li>
                    </ul>
                    <p>Contact us to exercise these rights.</p>
                    
                    <h2>10. Policy Updates</h2>
                    <p>We may revise this Privacy Policy periodically.</p>
                    <p>Significant changes will be communicated through the platform.</p>

                    <h2>11. Contact</h2>
                    <p>
                        <strong>Email:</strong> <Link href="mailto:privacy@cloudignite.in">privacy@cloudignite.in</Link><br />
                        <strong>Address:</strong> [Insert Business Address]
                    </p>
                    <p>CloudIgnite is committed to transparency, security, and responsible data practices.</p>
                </article>
            </main>
            <Footer />
        </div>
    );
}
