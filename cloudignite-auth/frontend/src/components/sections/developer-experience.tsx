import { CheckCircle2 } from "lucide-react";

const features = [
  "Git-friendly workflows",
  "CLI-first design",
  "Production-ready APIs",
  "Observability built in",
];

const codeSnippet = `
// Deploy a serverless function
cloudignite deploy --function hello-world

// Connect to your storage bucket
const { data, error } = await storage
  .from('avatars')
  .upload('public/avatar.png', file)

// Secure your app with Auth
const { user, session, error } = await auth
  .signIn({ email, password })

// Send a transactional email
await smtp.send({
  to: 'user@example.com',
  from: 'noreply@yourdomain.com',
  subject: 'Welcome to CloudIgnite!',
  html: '<strong>Thanks for joining!</strong>'
})
`.trim();

export default function DeveloperExperience() {
  return (
    <section className="relative w-full overflow-hidden bg-secondary/30 py-20 lg:py-32">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col justify-center">
          <div className="relative rounded-xl border bg-card p-2 shadow-2xl">
            <div className="absolute left-4 top-4 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
            </div>
            <pre className="mt-8 overflow-x-auto rounded-lg bg-background p-6">
              <code className="font-code text-sm text-muted-foreground">
                {codeSnippet}
              </code>
            </pre>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Built by engineers, for engineers.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We obsess over developer experience. Our entire platform is designed
            to be intuitive, powerful, and a joy to use.
          </p>
          <ul className="mt-8 space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <span className="text-lg text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
