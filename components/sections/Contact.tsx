"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
  Mail,
  RefreshCw,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.subject.trim()) {
      setErrorMessage("Please enter a subject.");
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage("Please enter your message.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if ((response.status === 200 || response.status === 201) && data?.success === true) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrorMessage("");
      } else {
        const errorReason =
          data?.error || `Server responded with status code ${response.status}. Please try emailing directly.`;
        setErrorMessage(errorReason);
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Network error occurred while delivering email. You can also contact directly via " + personalInfo.email;
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialCards = [
    {
      id: "github",
      name: "GitHub",
      handle: "@devlopingandroid",
      url: personalInfo.socialLinks.github,
      icon: <FaGithub className="w-5 h-5 text-primary group-hover:text-accent-teal transition-colors" />,
      badgeColor: "border-accent-teal/30 hover:border-accent-teal/60",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      handle: "in/yash-goelcs",
      url: personalInfo.socialLinks.linkedin,
      icon: <FaLinkedin className="w-5 h-5 text-[#0A66C2]" />,
      badgeColor: "border-[#0A66C2]/30 hover:border-[#0A66C2]/60",
    },
    {
      id: "leetcode",
      name: "LeetCode",
      handle: "yashgoel01",
      url: personalInfo.socialLinks.leetcode || "https://leetcode.com/u/yashgoel01/",
      icon: <SiLeetcode className="w-5 h-5 text-[#FFA116]" />,
      badgeColor: "border-[#FFA116]/30 hover:border-[#FFA116]/60",
    },
    {
      id: "twitter",
      name: "Twitter / X",
      handle: "@yashbuilds_",
      url: personalInfo.socialLinks.twitter,
      icon: <FaXTwitter className="w-5 h-5 text-primary group-hover:text-cyan-400 transition-colors" />,
      badgeColor: "border-cyan-500/30 hover:border-cyan-500/60",
    },
  ];

  return (
    <section id="contact" className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40">
      <SectionBadge title="Get In Touch" className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Social Gateway & Direct Info (~45% width) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div>
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent-teal/15 text-accent-teal border border-accent-teal/30 mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-accent-teal animate-ping" />
              <span>Available for New Roles & Projects</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight mb-3">
              Let&apos;s Build Something <span className="text-accent-teal">Great Together</span>
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Click any of my social handles below to connect directly, or send me a message through the contact form!
            </p>
          </div>

          {/* Interactive Social Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {socialCards.map((card) => (
              <a
                key={card.id}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-2xl bg-dark-surface/90 border ${card.badgeColor} hover:-translate-y-1 hover:shadow-teal-glow transition-all flex items-center justify-between group cursor-pointer`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-dark-bg border border-dark-border group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary group-hover:text-accent-teal transition-colors">
                      {card.name}
                    </h4>
                    <span className="text-[11px] font-mono text-muted">
                      {card.handle}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted group-hover:text-accent-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>

          {/* Direct Quick Email Action Box */}
          <div className="p-5 rounded-2xl bg-dark-surface/90 border border-accent-teal/30 hover:border-accent-teal/60 transition-colors space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-accent-teal font-semibold">
                <Mail className="w-4 h-4" />
                <span>Direct Email Address</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-bg border border-dark-border hover:border-accent-teal text-[11px] font-mono text-muted hover:text-accent-teal transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-accent-teal" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <a
              href={`mailto:${personalInfo.email}`}
              className="block font-mono text-sm sm:text-base font-bold text-primary hover:text-accent-teal transition-colors truncate"
            >
              {personalInfo.email}
            </a>
          </div>
        </motion.div>

        {/* Right Column: Contact Form Card (~55% width) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 w-full"
        >
          <Card className="p-6 sm:p-8 bg-dark-surface/90 border-dark-border">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Success Message State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 text-center flex flex-col items-center justify-center space-y-4 my-6"
                >
                  <div className="p-4 rounded-full bg-accent-teal/15 text-accent-teal border border-accent-teal/30 shadow-teal-glow">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>

                  <h4 className="text-2xl font-bold text-primary">
                    Message Sent Successfully!
                  </h4>

                  <p className="text-sm text-muted max-w-md leading-relaxed">
                    Thank you for reaching out. I have received your message and will get back to you as soon as possible.
                  </p>

                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setErrorMessage("");
                    }}
                    variant="outline"
                    size="md"
                    className="mt-4"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                /* Contact Form */
                <form key="form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 mb-2 pb-3 border-b border-dark-border/60">
                    <MessageSquare className="w-5 h-5 text-accent-teal" />
                    <h4 className="text-lg font-bold text-primary">
                      Send a Message
                    </h4>
                  </div>

                  {/* Inline Error Banner */}
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold">Delivery Notice:</p>
                        <p className="text-[12px] leading-relaxed text-red-300">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  {/* Name & Email Inputs (2 Column on Desktop) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-muted mb-2">
                        Your Name <span className="text-accent-teal">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/50 transition-all disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-muted mb-2">
                        Your Email <span className="text-accent-teal">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/50 transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="block text-xs font-mono text-muted mb-2">
                      Subject <span className="text-accent-teal">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      disabled={isSubmitting}
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Opportunity / Collaboration / Hello"
                      className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/50 transition-all disabled:opacity-50"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label className="block text-xs font-mono text-muted mb-2">
                      Your Message <span className="text-accent-teal">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Yash, I'd like to discuss a project..."
                      className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/50 transition-all resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Full Width Submit Button with Loading State */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full justify-center text-base py-3.5 mt-2 font-bold"
                    icon={
                      isSubmitting ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )
                    }
                  >
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
