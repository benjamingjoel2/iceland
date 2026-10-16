import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }

  // Honeypot filled: pretend success, drop silently.
  if (parsed.data.company) return NextResponse.json({ ok: true });

  const enquiry = { ...parsed.data, receivedAt: new Date().toISOString() };
  console.log("[enquiry]", JSON.stringify(enquiry));

  // TODO: forward to email (e.g. transactional email provider) and CRM (create contact + deal),
  // then send the guest an acknowledgement. Keep secrets in environment variables.

  return NextResponse.json({ ok: true });
}
