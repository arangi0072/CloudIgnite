import CodeBlock from "@/components/code-block";
import PageHeader from "@/components/docs/page-header";

const installCode = `npm install @cloudignite/auth`;

const usageCode = `import { CloudIgniteAuth } from '@cloudignite/auth';

const auth = new CloudIgniteAuth({
  secretKey: process.env.CLOUDIGNITE_SECRET_KEY,
});

// Create a new user
const user = await auth.users.create({
  email: 'user@example.com',
});

// Generate a sign-in link
const { url } = await auth.signIn.create({
    email: 'user@example.com',
    options: {
        redirectTo: 'http://localhost:3000/welcome',
    },
});`;

export default function AuthenticationDocsPage() {
  return (
    <article className="prose mx-auto max-w-3xl">
      <PageHeader 
        title="Authentication"
        description="Secure identity in minutes — not weeks. Add secure, passwordless login to your application with just a few lines of code."
      />
      
      <h2>Overview</h2>
      <p>
        CloudIgnite Authentication provides a complete solution for user identity and access management. It is designed to be flexible, secure, and easy to integrate, whether you're building a new application or adding authentication to an existing one. Our library supports JWT-based sessions, OAuth providers, and enterprise-ready features like multi-tenancy.
      </p>

      <h2>Installation</h2>
      <p>
        To get started, install the CloudIgnite Auth library using your favorite package manager.
      </p>
      <CodeBlock code={installCode} language="bash" />

      <h2>Basic Usage</h2>
      <p>
        Initialize the client with your secret key, which can be found in your project settings in the CloudIgnite dashboard. It's recommended to store this key in an environment variable.
      </p>
      <CodeBlock code={usageCode} language="javascript" />

      <h2>Core Concepts</h2>
      
      <h3>Users</h3>
      <p>The User object is the central piece of the authentication system. It contains information about the user such as their email, ID, and any associated metadata.</p>
      
      <h3>Sessions</h3>
      <p>Sessions are managed using JSON Web Tokens (JWTs). Our client libraries handle token refreshing automatically, providing a seamless and secure experience for your users.</p>

      <h3>Providers</h3>
      <p>In addition to email-based passwordless login, CloudIgnite supports a variety of OAuth providers, including:</p>
      <ul>
        <li>Google</li>
        <li>GitHub</li>
        <li>Twitter (X)</li>
        <li>SAML 2.0 (Enterprise)</li>
      </ul>
      <p>Enabling a provider is as simple as toggling it on in your dashboard and adding the required client IDs and secrets.</p>

    </article>
  );
}
