"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function TimestampGeneratorPage() {
  const [timestamp, setTimestamp] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [blink, setBlink] = useState<boolean>(true);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const datePart = now
        .toISOString()
        .replace(/[-:T.Z]/g, "")
        .slice(0, 14);
      const milliseconds = String(now.getMilliseconds())
        .padStart(3, "0")
        .slice(0, 4);
      setTimestamp(datePart + milliseconds);
    };

    tick();
    const interval = setInterval(tick, 47);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = async () => {
    if (!timestamp) return;
    await navigator.clipboard.writeText(timestamp);
    setCopied(true);
    toast.success("COPIED TO BUFFER");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(52,211,153,0.3) 0px, rgba(52,211,153,0.3) 1px, transparent 1px, transparent 3px)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

        <div className="w-full max-w-sm relative font-mono">
          <div className="mb-4 text-emerald-400">
            <p className="text-xs tracking-widest opacity-70">
              [ SYSTEM UTILITY ]
            </p>
            <h1 className="text-xl font-bold tracking-wide mt-1">
              &gt; TIMESTAMP_GEN.EXE
            </h1>
          </div>

          <div className="border border-emerald-400/40 bg-black shadow-[0_0_20px_rgba(52,211,153,0.15)]">
            <div className="border-b border-emerald-400/40 px-4 py-1.5 flex items-center justify-between">
              <span className="text-[10px] text-emerald-400/60 tracking-widest">
                OUTPUT
              </span>
              <span className="text-[10px] text-emerald-400 tracking-widest flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${
                    blink ? "opacity-100" : "opacity-30"
                  }`}
                />
                LIVE
              </span>
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full text-left group cursor-pointer p-5"
            >
              <div className="text-2xl font-bold text-emerald-400 tracking-wider break-all leading-tight drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]">
                {timestamp}
              </div>
              <p className="text-[10px] text-emerald-400/50 mt-3 tracking-wide group-hover:text-emerald-400/80 transition-colors">
                {copied ? "✓ COPIED" : "> CLICK TO COPY"}
              </p>
            </button>
          </div>

          <p className="text-[10px] text-emerald-400/30 mt-3 tracking-wide text-center">
            FORMAT: YYYYMMDDHHMMSSmmm
          </p>
        </div>
      </div>

      <footer className="py-4 text-center border-t border-emerald-400/20 font-mono">
        <p className="text-[10px] text-emerald-400/40 tracking-widest">
          &gt; BUILT_BY{" "}
          <Link
            href="https://itsmeprince.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400/70 hover:text-emerald-400 transition-colors underline underline-offset-2 decoration-emerald-400/30 hover:decoration-emerald-400/70"
          >
            ITSME_PRINCE
          </Link>
        </p>
      </footer>
    </div>
  );
}
