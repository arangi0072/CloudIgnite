import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Terms of Service - CloudIgnite',
};

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow container mx-auto max-w-3xl px-4 py-16 sm:py-24">
                <article className="prose">
                    <h1>Terms of Service</h1>
                    <p><strong>Effective Date:</strong> [Insert Date]</p>
                    <p>Welcome to CloudIgnite. These Terms of Service (“Terms”) govern your access to and use of CloudIgnite’s infrastructure platform, including authentication services, SMTP email infrastructure, object storage, and serverless computing.</p>
                    <p>By creating an account or using our services, you agree to these Terms.</p>

                    <h2>1. Eligibility</h2>
                    <p>You must be at least 18 years old and capable of entering a legally binding agreement to use CloudIgnite.</p>
                    <p>If you use the platform on behalf of an organization, you confirm that you have authority to bind that organization to these Terms.</p>

                    <h2>2. Services Provided</h2>
                    <p>CloudIgnite provides developer infrastructure tools including but not limited to:</p>
                    <ul>
                        <li>Authentication services</li>
                        <li>Email (SMTP) infrastructure</li>
                        <li>Object storage</li>
                        <li>Serverless compute</li>
                    </ul>
                    <p>We reserve the right to improve, modify, or discontinue features at any time.</p>

                    <h2>3. Account Responsibilities</h2>
                    <p>You are responsible for:</p>
                    <ul>
                        <li>Maintaining account security</li>
                        <li>Protecting your credentials</li>
                        <li>All activity under your account</li>
                    </ul>
                    <p>You must notify us immediately of any unauthorized access.</p>
                    <p>CloudIgnite is not liable for losses resulting from compromised credentials.</p>

                    <h2>4. Acceptable Use</h2>
                    <p>You agree NOT to use CloudIgnite for:</p>
                    <ul>
                        <li>Illegal activities</li>
                        <li>Malware distribution</li>
                        <li>Phishing or fraud</li>
                        <li>Spam or abusive email practices</li>
                        <li>Hosting harmful or infringing content</li>
                        <li>Unauthorized access attempts</li>
                        <li>Activities that disrupt platform stability</li>
                    </ul>
                    <p>We reserve the right to suspend or terminate accounts violating these rules.</p>

                    <h2>5. Email & Anti-Spam Policy</h2>
                    <p>When using our SMTP infrastructure:</p>
                    <ul>
                        <li>You must comply with anti-spam laws.</li>
                        <li>You may only send emails to users who have consented.</li>
                        <li>Purchased email lists are strictly prohibited.</li>
                    </ul>
                    <p>Violation may result in immediate suspension without notice.</p>

                    <h2>6. Data & Security</h2>
                    <p>We implement industry-standard safeguards to protect customer data.</p>
                    <p>However, no system is completely secure, and you acknowledge the inherent risks of cloud infrastructure.</p>
                    <p>You retain ownership of your data.</p>

                    <h2>7. Usage Limits & Fair Use</h2>
                    <p>Certain features may be subject to usage limits to maintain platform reliability.</p>
                    <p>Excessive abuse of shared resources may result in throttling or suspension.</p>

                    <h2>8. Fees & Payments</h2>
                    <p>Paid services are billed according to the pricing published on our website.</p>
                    <p>Failure to pay may result in service interruption.</p>
                    <p>All fees are non-refundable unless required by law.</p>

                    <h2>9. Service Availability</h2>
                    <p>While we strive for high availability, CloudIgnite does not guarantee uninterrupted service.</p>
                    <p>We are not responsible for downtime caused by:</p>
                    <ul>
                        <li>Force majeure events</li>
                        <li>Internet disruptions</li>
                        <li>Third-party failures</li>
                    </ul>

                    <h2>10. Termination</h2>
                    <p>We may suspend or terminate your account if:</p>
                    <ul>
                        <li>You violate these Terms</li>
                        <li>You create risk for the platform</li>
                        <li>Required by law</li>
                    </ul>
                    <p>You may stop using the services at any time.</p>

                    <h2>11. Limitation of Liability</h2>
                    <p>To the maximum extent permitted by law, CloudIgnite shall not be liable for:</p>
                    <ul>
                        <li>Indirect damages</li>
                        <li>Lost profits</li>
                        <li>Data loss</li>
                        <li>Business interruption</li>
                    </ul>
                    <p>Our total liability shall not exceed the amount paid by you in the preceding 12 months.</p>

                    <h2>12. Changes to Terms</h2>
                    <p>We may update these Terms periodically.</p>
                    <p>Continued use of the platform constitutes acceptance of the revised Terms.</p>

                    <h2>13. Governing Law</h2>
                    <p>These Terms shall be governed by the laws of <strong>India</strong>, without regard to conflict-of-law principles.</p>

                    <h2>14. Contact</h2>
                    <p>For legal inquiries:</p>
                    <p>
                        <strong>Email:</strong> <Link href="mailto:legal@cloudignite.in">legal@cloudignite.in</Link><br />
                        <strong>Address:</strong> [Insert Business Address]
                    </p>
                </article>
            </main>
            <Footer />
        </div>
    );
}
