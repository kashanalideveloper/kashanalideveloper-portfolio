// src/app/blog/website-security-checklist/page.jsx
import BlogArticleLayout from "../../Components/BlogArticleLayout";
import { blogMetadata } from "../../lib/seo";

export const metadata = blogMetadata({
  title: "Website Security Checklist: Protect Your Site From Common Attacks",
  description:
    "XSS, CSRF, weak headers and exposed secrets — the practical website security checklist every site owner and developer should run through.",
  slug: "website-security-checklist",
  keywords: [
    "website security checklist",
    "web app security",
    "xss prevention",
    "csrf protection",
    "security headers",
  ],
});

export default function Article() {
  return (
    <BlogArticleLayout
      category="Web Development"
      title="Website Security Checklist: Protect Your Site From Common Attacks"
      date="October 2026"
      readTime="7 min read"
      intro="XSS, CSRF, weak headers and exposed secrets — the practical security checklist every website owner should run through."
      sections={[
        {
          heading: "Why Small Sites Get Hacked",
          body: [
            "Attackers do not hand-pick targets — they scan the whole internet for known vulnerabilities automatically. Small business sites are hit constantly precisely because nobody expects them to be targeted and they are rarely patched.",
            "The good news: the overwhelming majority of attacks are automated and generic. A modest set of defences defeats almost all of them.",
          ],
        },
        {
          heading: "The Headers Checklist",
          body: [
            "HTTPS everywhere (with HSTS), a Content-Security-Policy that controls which scripts can run, X-Content-Type-Options: nosniff, and frame protection so your site cannot be embedded by others. These headers cost nothing and neutralise entire attack classes.",
            "CSP is the highest-value one: it blocks injected scripts even when other defences fail. Start in report-only mode, watch the violations, then enforce.",
          ],
        },
        {
          heading: "Input and Output Discipline",
          body: [
            "XSS: never inject user input into HTML without escaping. React's JSX escapes by default — the danger is dangerouslySetInnerHTML, href attributes with user data, and markdown renderers. Sanitise on output, not just input.",
            "SQL injection is solved by parameterised queries — if you are writing SQL, never concatenate user input into the string. CSRF is handled by SameSite cookies and CSRF tokens on state-changing requests.",
          ],
        },
        {
          heading: "Secrets and Access",
          body: [
            "API keys belong in server-side environment variables — never in client code, never in the repository. Anything in a browser bundle is public, full stop.",
            "Rotate credentials after staff changes. Enable two-factor authentication on your host, registrar and admin panels. The registrar is the crown jewel: lose it and attackers can redirect your whole domain.",
          ],
        },
        {
          heading: "Maintenance Is Security",
          body: [
            "Most breaches happen through known vulnerabilities in outdated dependencies. Automate updates (Dependabot or similar), review and merge the safe ones weekly, and subscribe to security advisories for your stack.",
            "Backups complete the picture: automated, tested, and stored off-site. A backup you have never restored is a hope, not a backup.",
          ],
        },
      ]}
      conclusion={[
        "Security is not a feature you add once — it is a short checklist you run consistently: strong headers, sanitised output, secrets on the server, dependencies current, backups tested. Small sites that do these five things are dramatically safer than the average site on the internet.",
        "I ship every site with hardened headers and security best practices configured from day one. Want an audit of your current site? Let's talk.",
      ]}
    />
  );
}
