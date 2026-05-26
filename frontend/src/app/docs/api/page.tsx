import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CodeBlock from "@/components/code-block";
import PageHeader from "@/components/docs/page-header";
import Link from "next/link";

const curlRequest = `curl --request POST \\
  --url https://api.cloudignite.com/v1/users \\
  --header 'Authorization: Bearer YOUR_API_KEY' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "email": "user@example.com",
    "fullName": "John Doe"
  }'`;

const jsRequest = `import { CloudIgnite } from 'cloudignite';

const cloudignite = new CloudIgnite('YOUR_API_KEY');

const user = await cloudignite.users.create({
  email: 'user@example.com',
  fullName: 'John Doe',
});

console.log(user);`;

const goRequest = `package main

import (
	"fmt"
	"github.com/cloudignite/cloudignite-go/v1"
	"github.com/cloudignite/cloudignite-go/v1/user"
)

func main() {
	client := cloudignite.NewClient("YOUR_API_KEY")

	params := &cloudignite.UserParams{
		Email:    cloudignite.String("user@example.com"),
		FullName: cloudignite.String("John Doe"),
	}
	
	result, err := user.New(client, params)

	if err != nil {
		panic(err)
	}
	fmt.Printf("Successfully created user: %v\\n", result)
}`;

const pythonRequest = `import cloudignite
cloudignite.api_key = "YOUR_API_KEY"

user = cloudignite.User.create(
  email="user@example.com",
  full_name="John Doe",
)

print(user)`;

const successResponse = `{
  "id": "usr_2s5g5d6g7h8j9k0l",
  "object": "user",
  "email": "user@example.com",
  "full_name": "John Doe",
  "created_at": 1672531200
}`;


export default function ApiReferencePage() {
  return (
    <div>
      <PageHeader
        title="API Reference"
        description="Explore the building blocks of the CloudIgnite platform. Our API is designed to be predictable, powerful, and easy to use."
      />
      <div className="mb-12 flex justify-start">
        <Badge
          variant="outline"
          className="border-green-400/50 text-green-300"
        >
          Production Ready APIs
        </Badge>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-16">
        <article className="prose w-full max-w-none">
          <section id="introduction">
            <h2>Introduction</h2>
            <p>
              The CloudIgnite API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.
            </p>
          </section>

          <section id="authentication">
            <h2>Authentication</h2>
            <p>
              Authenticate your API requests by including your secret key in the Authorization header. All API requests must be made over HTTPS.
            </p>
            <p>
              Your API keys carry many privileges; be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
            </p>
            <CodeBlock code={'Authorization: Bearer YOUR_API_KEY'} language="bash" />
          </section>

          <section id="users" className="scroll-mt-20">
            <h2>Users</h2>
            <p>
              The User object represents an end-user in your application. It is the core of the Authentication product.
            </p>

            <div id="create-user" className="scroll-mt-20 border-t border-border pt-8">
              <h3>Create a user</h3>
              <div className="not-prose my-4 flex items-center gap-2">
                <Badge className="bg-green-600/20 text-green-300 hover:bg-green-600/30">POST</Badge>
                <code className="text-sm font-semibold">/v1/users</code>
              </div>
              <p>
                Creates a new user in your project. This is the programmatic equivalent of a user signing up.
              </p>

              <h4>Body Parameters</h4>
              <div className="not-prose my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell><code className="font-mono">email</code></TableCell>
                      <TableCell>string</TableCell>
                      <TableCell>The user's unique email address.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code className="font-mono">full_name</code></TableCell>
                      <TableCell>string</TableCell>
                      <TableCell>(Optional) The user's full name.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <h4>Returns</h4>
              <p>
                Returns a <Link href="#user-object">user object</Link> if the request was successful.
              </p>
            </div>

            <div id="user-object" className="scroll-mt-20 border-t border-border pt-8">
              <h3>The User object</h3>
              <p>
                The User object contains all relevant information about a user.
              </p>
              <div className="not-prose my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Attribute</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                        <TableCell><code className="font-mono">id</code></TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>Unique identifier for the user.</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><code className="font-mono">object</code></TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>Value is "user".</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><code className="font-mono">email</code></TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>The user's email address.</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><code className="font-mono">full_name</code></TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>The user's full name.</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell><code className="font-mono">created_at</code></TableCell>
                        <TableCell>timestamp</TableCell>
                        <TableCell>Time at which the object was created.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Tabs defaultValue="curl" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="js">Node.js</TabsTrigger>
                <TabsTrigger value="go">Go</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
              </TabsList>
              <TabsContent value="curl">
                <CodeBlock code={curlRequest} language="bash" />
              </TabsContent>
              <TabsContent value="js">
                <CodeBlock code={jsRequest} language="javascript" />
              </TabsContent>
              <TabsContent value="go">
                <CodeBlock code={goRequest} language="go" />
              </TabsContent>
              <TabsContent value="python">
                <CodeBlock code={pythonRequest} language="python" />
              </TabsContent>
            </Tabs>
            
            <h4 className="mt-8 mb-2 font-headline text-lg text-foreground">
              Example Response
            </h4>
            <CodeBlock code={successResponse} language="json" />
          </div>
        </aside>
      </div>
    </div>
  );
}
