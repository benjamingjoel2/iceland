"use client";

import { useState } from "react";

/** Newsletter tile that opens into an inline email field. TODO: connect to the mailing list provider. */
export function NewsletterButton() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="col-span-2 flex h-[88px] items-center justify-center rounded-[2px] bg-glacier text-sm font-medium transition-colors hover:bg-aurora hover:text-white"
      >
        Newsletter signup
      </button>
    );
  }

  return (
    <form
      className="col-span-2 flex h-[88px] items-center gap-2 rounded-[2px] bg-glacier px-4"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: POST to the newsletter provider once chosen.
        setDone(true);
      }}
    >
      {done ? (
        <p className="w-full text-center text-sm">Thank you. We&rsquo;ll write rarely, and only when it matters.</p>
      ) : (
        <>
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            required
            autoFocus
            placeholder="Your email address"
            className="h-11 flex-1 rounded-[2px] border border-atlantic/15 bg-white px-3 text-sm outline-none focus:border-aurora"
          />
          <button type="submit" className="h-11 rounded-[2px] bg-atlantic px-5 text-sm text-white transition-colors hover:bg-aurora">
            Sign up
          </button>
        </>
      )}
    </form>
  );
}
