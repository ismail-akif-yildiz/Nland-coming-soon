"use client";
import React from "react";

type Status = "idle" | "ok" | "already" | "err";

export default function SoonForm() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [botField, setBotField] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (botField) return;

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) return setStatus("err");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 409) {
        setStatus("already");
        return;
      }
      if (!res.ok) {
        setStatus("err");
        return;
      }

      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-xl" noValidate>
      {/* Honeypot */}
      <label className="sr-only" htmlFor="company">
        Company
      </label>
      <input
        id="company"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={botField}
        onChange={(e) => setBotField(e.target.value)}
        className="hidden"
      />

      <div className="flex flex-col items-stretch gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="Your email address"
          className="h-12 w-full rounded-xl border border-slate-300/70 bg-white/85 px-4 text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:border-amber-400 focus:bg-white"
          aria-invalid={status === "err"}
          aria-describedby="form-msg"
        />
        <button
          type="submit"
          className="h-12 shrink-0 rounded-xl bg-[#1B2C5A] px-5 font-semibold text-white shadow-sm transition-colors hover:bg-[#163155] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          Notify me
        </button>
      </div>

      {/* Overlay mesaj — layout'u etkilemez */}
      <div
        id="form-msg"
        role="status"
        aria-live="polite"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2"
      >
        {status === "ok" && (
          <p className="text-sm md:text-base font-medium text-emerald-700 bg-white/90 rounded-lg px-3 py-2 inline-block shadow">
            Thanks! You’re subscribed.
          </p>
        )}
        {status === "already" && (
          <p className="text-sm md:text-base font-medium text-amber-700 bg-white/90 rounded-lg px-3 py-2 inline-block shadow">
            This email is already subscribed.
          </p>
        )}
        {status === "err" && (
          <p className="text-sm md:text-base font-medium text-rose-600 bg-white/90 rounded-lg px-3 py-2 inline-block shadow">
            Please enter a valid email.
          </p>
        )}
      </div>
    </form>
  );
}
