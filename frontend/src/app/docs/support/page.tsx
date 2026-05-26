import PageHeader from "@/components/docs/page-header";

export default function SupportDocsPage() {
  return (
    <article className="prose">
      <PageHeader 
        title="Support"
        description="Get help from our team of experts."
      />
      <p>
        If you're running into issues or have questions, we're here to help.
      </p>
      <h2>Contact Us</h2>
      <p>The best way to get support is to email us directly. We aim to respond to all inquiries within 24 hours.</p>
      <ul>
        <li>For general support: <a href="mailto:support@cloudignite.dev">support@cloudignite.dev</a></li>
        <li>For billing inquiries: <a href="mailto:billing@cloudignite.dev">billing@cloudignite.dev</a></li>
      </ul>
      <h2>Community</h2>
      <p>Join our community forum to ask questions, share your projects, and connect with other CloudIgnite developers.</p>
    </article>
  );
}
