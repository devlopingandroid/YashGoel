import { NextResponse } from "next/server";
import { personalInfo } from "@/data/portfolio-data";

export async function POST(req: Request) {
  const timestamp = new Date().toISOString();

  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is required.",
          timestamp,
        },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is required.",
          timestamp,
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email address format.",
          timestamp,
        },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Subject is required.",
          timestamp,
        },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required.",
          timestamp,
        },
        { status: 400 }
      );
    }

    const recipientEmail = personalInfo.email || "yashgoel15119@gmail.com";

    // 1. Resend Provider (if RESEND_API_KEY is configured in env)
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
          to: [recipientEmail],
          reply_to: email.trim(),
          subject: `[Portfolio] ${subject.trim()} - from ${name.trim()}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name.trim()}</p>
            <p><strong>Email:</strong> ${email.trim()}</p>
            <p><strong>Subject:</strong> ${subject.trim()}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message.trim()}</p>
          `,
        }),
      });

      const resendData = await resendRes.json();

      if (!resendRes.ok) {
        return NextResponse.json(
          {
            success: false,
            provider: "Resend",
            status: resendRes.status,
            error: resendData.message || "Resend API rejected the email delivery.",
            providerResponse: resendData,
            recipient: recipientEmail,
            sender: email.trim(),
            timestamp,
          },
          { status: resendRes.status }
        );
      }

      return NextResponse.json({
        success: true,
        provider: "Resend",
        status: resendRes.status,
        messageId: resendData.id,
        providerResponse: resendData,
        recipient: recipientEmail,
        sender: email.trim(),
        timestamp,
      });
    }

    // 2. Web3Forms Provider (if WEB3FORMS_ACCESS_KEY is configured in env)
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name: name.trim(),
          email: email.trim(),
          subject: `[Portfolio] ${subject.trim()}`,
          message: message.trim(),
          to: recipientEmail,
        }),
      });

      const web3Data = await web3Res.json();

      if (!web3Res.ok || !web3Data.success) {
        return NextResponse.json(
          {
            success: false,
            provider: "Web3Forms",
            status: web3Res.status,
            error: web3Data.message || "Web3Forms submission failed.",
            providerResponse: web3Data,
            recipient: recipientEmail,
            sender: email.trim(),
            timestamp,
          },
          { status: web3Res.status || 400 }
        );
      }

      return NextResponse.json({
        success: true,
        provider: "Web3Forms",
        status: web3Res.status,
        messageId: web3Data.id || "web3forms-accepted",
        providerResponse: web3Data,
        recipient: recipientEmail,
        sender: email.trim(),
        timestamp,
      });
    }

    // 3. FormSubmit Relay (Default direct relay)
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: "http://localhost:3000",
        Origin: "http://localhost:3000",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        _replyto: email.trim(),
        _subject: `[Portfolio Contact] ${subject.trim()} - from ${name.trim()}`,
        message: message.trim(),
        _template: "table",
        _captcha: "false",
      }),
    });

    const formSubmitData = await formSubmitRes.json().catch(() => null);

    // Check if FormSubmit returned an error or requires one-time activation
    const isSuccess =
      formSubmitRes.ok &&
      (formSubmitData?.success === "true" || formSubmitData?.success === true);

    const isActivationRequired =
      formSubmitData?.message?.toLowerCase().includes("activation") ||
      formSubmitData?.message?.toLowerCase().includes("activate") ||
      formSubmitData?.message?.toLowerCase().includes("confirm");

    if (!isSuccess) {
      const errorMsg = isActivationRequired
        ? `Action Required: FormSubmit sent an 'Activate Form' confirmation email to ${recipientEmail}. Please open your inbox or spam folder and click the link to activate delivery.`
        : formSubmitData?.message || `FormSubmit returned status ${formSubmitRes.status}`;

      return NextResponse.json(
        {
          success: false,
          provider: "FormSubmit",
          status: formSubmitRes.status,
          error: errorMsg,
          isActivationRequired: Boolean(isActivationRequired),
          providerResponse: formSubmitData,
          recipient: recipientEmail,
          sender: email.trim(),
          timestamp,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      provider: "FormSubmit",
      status: formSubmitRes.status,
      messageId: `fs-${Date.now()}`,
      providerResponse: formSubmitData,
      recipient: recipientEmail,
      sender: email.trim(),
      timestamp,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
        timestamp,
      },
      { status: 500 }
    );
  }
}
