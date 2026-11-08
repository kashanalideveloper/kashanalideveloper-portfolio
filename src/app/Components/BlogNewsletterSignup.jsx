"use client";

import { useState } from "react";

const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

const emailjsEnabled =
  emailjsConfig.serviceId &&
  emailjsConfig.templateId &&
  emailjsConfig.publicKey &&
  !emailjsConfig.publicKey.startsWith("YOUR_");

export default function BlogNewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailjsEnabled) {
      setErrorMessage(
        "Newsletter email is not configured. Please contact me directly.",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          name: "Blog Newsletter Signup",
          email,
          company: "",
          service: "Blog newsletter",
          budget: "",
          message: `Please add ${email} to the blog newsletter.`,
          website: "",
        },
        { publicKey: emailjsConfig.publicKey },
      );
      setEmail("");
      setStatus("success");
    } catch (error) {
      console.error("Blog newsletter signup failed:", error);
      setErrorMessage(
        /no records found/i.test(error?.text || error?.message || "")
          ? "EmailJS can’t find newsletter template template_9r0n90c for the configured service. In EmailJS, confirm this exact template ID exists and is connected to the same service used by the contact form."
          : error?.text ||
              error?.message ||
              "EmailJS could not deliver your signup. Please try again later.",
      );
      setStatus("error");
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-brandPrimary/20 bg-brandPrimary/5 p-6">
      <div
        className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brandPrimary/10 blur-2xl"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-brandPrimary/20 bg-brandPrimary/10 text-brandPrimary">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-brandInk">
          Get new articles in your inbox
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-brandMuted">
          Practical web development tips, delivered when there is something
          worth sharing.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <label htmlFor="blog-newsletter-email" className="sr-only">
            Your email address
          </label>
          <input
            id="blog-newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "sending") {
                setStatus("idle");
                setErrorMessage("");
              }
            }}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-brandLine bg-white px-3.5 py-3 text-xs text-brandInk placeholder:text-brandMuted/60 focus:border-brandPrimary focus:outline-none focus:ring-2 focus:ring-brandPrimary/20 dark:bg-brandSoft"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full cursor-pointer rounded-xl bg-brandPrimary px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-brandSecondary disabled:cursor-wait disabled:opacity-60 dark:text-brandBg"
          >
            {status === "sending" ? "Sending..." : "Subscribe"}
          </button>
        </form>

        <p
          className="mt-3 min-h-8 text-[11px] leading-relaxed text-brandMuted"
          role="status"
          aria-live="polite"
        >
          {status === "success" &&
            "Thanks! Your email has been sent for the newsletter list."}
          {status === "error" && errorMessage}
        </p>
      </div>
    </section>
  );
}
