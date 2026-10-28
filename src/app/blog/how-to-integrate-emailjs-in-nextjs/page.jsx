// src/app/blog/how-to-integrate-emailjs-in-nextjs/page.jsx
import BlogArticleLayout from "../../Components/BlogArticleLayout";
import { blogMetadata } from "../../lib/seo";

export const metadata = blogMetadata({
  title: "How to Integrate EmailJS in Next.js (Complete 2026 Guide)",
  description:
    "Add a working contact form to Next.js with EmailJS — setup, environment variables, fixing the 404 error, and the Vercel deployment gotchas most guides skip.",
  slug: "how-to-integrate-emailjs-in-nextjs",
  keywords: [
    "how to integrate emailjs in next.js",
    "emailjs next.js contact form",
    "fix emailjs status 404 error next.js",
    "emailjs vercel environment variables",
    "next.js contact form tutorial",
  ],
});

export default function Article() {
  return (
    <BlogArticleLayout
      category="Next.js"
      title="How to Integrate EmailJS in Next.js (Complete 2026 Guide)"
      date="October 2026"
      readTime="6 min read"
      intro="Add a working contact form to Next.js with EmailJS — setup, environment variables, the 404 error fix, and Vercel deployment gotchas."
      sections={[
        {
          heading: "Why EmailJS for a Portfolio Contact Form",
          body: [
            "A contact form needs a server to send email from — but a static portfolio hosted on Vercel has no mail server. EmailJS solves this by sending the email from the browser through their API: no backend, no SMTP credentials on your server, free tier covers most portfolios.",
            "The trade-off: your EmailJS keys are public in the browser bundle. That is by design and acceptable for contact forms, but lock down your EmailJS dashboard with domain restrictions and rate limits so spammers cannot burn your quota.",
          ],
        },
        {
          heading: "Step-by-Step Setup",
          body: [
            "1. Create an EmailJS account and add an Email Service (Gmail, Outlook or SMTP). 2. Create an Email Template with variables like {{name}}, {{email}}, {{message}}. 3. Copy your Service ID, Template ID and Public Key from the dashboard. 4. Install the SDK: npm install @emailjs/browser.",
            "In your component: import emailjs from '@emailjs/browser', then await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey }). Pass every form field explicitly as params — the template variables must match your param names exactly or you will email yourself empty templates.",
          ],
        },
        {
          heading: "Environment Variables (The Part Everyone Gets Wrong)",
          body: [
            "Never hardcode the keys. Put them in .env.local locally and in Vercel's Project Settings → Environment Variables in production. In Next.js, only variables prefixed with NEXT_PUBLIC_ are exposed to the browser: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.",
            "Critical gotcha: NEXT_PUBLIC_ variables are baked in at build time. Adding them to Vercel does nothing until you redeploy. If your form works locally but fails on Vercel with undefined keys — this is why. Redeploy after adding the variables.",
          ],
        },
        {
          heading: "Fixing the Common Errors",
          body: [
            "Status 404 from EmailJS usually means the Service ID or Template ID is wrong, or the service is not connected to a working email account. Double-check the IDs character by character — they look similar. A 401 means the public key is wrong or missing.",
            "A 403 means you hit the free-tier limit or the domain is not in your allowed list. Add your production domain in EmailJS dashboard → Account → Security. If the form silently does nothing, check the browser console: the error is almost always there.",
          ],
        },
        {
          heading: "UX Details That Make It Professional",
          body: [
            "Disable the submit button while sending, show distinct success and error states, and reset the form only on success. Add a hidden honeypot field to catch bots, and basic client-side validation before calling EmailJS so you do not waste your monthly quota on empty submissions.",
            "Finally, test the full flow in production — not just localhost. Local testing can mask environment variable problems that only appear on the deployed site.",
          ],
        },
      ]}
      conclusion={[
        "EmailJS is the fastest path to a working contact form on a serverless Next.js site. Get the environment variables right, understand the error codes, and protect your quota — and it runs reliably for years.",
        "I build contact forms and full lead-capture flows for client sites that just work. Need help with yours? Let's talk.",
      ]}
    />
  );
}
