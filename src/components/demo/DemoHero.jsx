import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { KeyRound, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

import demo480 from "@/assets/images/demo-480.webp";
import demo960 from "@/assets/images/demo-960.webp";
import demo1920 from "@/assets/images/demo-1920.webp";

import { DEMO_CONFIG } from "./demoConfig";

const DemoHero = ({
  onStart,
  title,
  subtitle,
  steps,
  labelKey,
  placeholderKey,
  buttonText,
  hostLabel,
  redirectLabel,
}) => {
  const reduceMotion = useReducedMotion();
  const [animate, setAnimate] = useState(false);

  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  // ✅ Load saved key
  useEffect(() => {
    const saved = DEMO_CONFIG.getApiKey();
    if (saved) setApiKey(saved);
  }, []);

  // ✅ Animate after idle
  useEffect(() => {
    let idleId;

    if ("requestIdleCallback" in window) {
      idleId = requestIdleCallback(() => setAnimate(true));
    } else {
      idleId = setTimeout(() => setAnimate(true), 250);
    }

    return () => {
      if ("cancelIdleCallback" in window) cancelIdleCallback(idleId);
      else clearTimeout(idleId);
    };
  }, []);

  // ✅ Save key
  const handleSaveKey = () => {
    if (!apiKey.trim()) return;
    localStorage.setItem("RAPIDAPI_KEY", apiKey.trim());
    onStart?.();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src={demo960}
        srcSet={`
          ${demo480} 480w,
          ${demo960} 960w,
          ${demo1920} 1920w
        `}
        sizes="100vw"
        alt=""
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-slate-900/70 to-black/90" />

      {/* Floating Icon */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-blue-500/20"
        initial={false}
        animate={animate && !reduceMotion ? { y: [0, -16, 0] } : false}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShieldCheck size={80} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-10 border border-white/10 shadow-2xl">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              {title}
            </span>
            <br />
            <span className="text-white">{subtitle}</span>
          </h1>

        {/* Steps */}
          <div className="text-gray-300 text-lg max-w-3xl mx-auto space-y-4 mb-10">
            <ol className="list-decimal list-inside space-y-3 text-gray-200">
              {/* Step 1 com link */}
              <li>
                {steps?.[0]?.before}{" "}
                <a
                  href="https://rapidapi.com/lenzid-lenzid-default/api/auth-face-biometric-authentication-api/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  {steps?.[0]?.link}
                </a>
                .
              </li>

              {/* Steps normais */}
              <li>{steps?.[1]}</li>
              <li>{steps?.[2]}</li>
            </ol>
          </div>


          {/* Key Input */}
          <div className="max-w-xl mx-auto space-y-4">
            <label className="block text-sm text-gray-400">{labelKey}</label>

            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="flex items-center px-3 rounded-xl bg-white/10 border border-white/10">
                <KeyRound className="text-gray-400" size={18} />
              </div>

              {/* Input */}
              <input
                type={showKey ? "text" : "password"}
                autoComplete="new-password"
                placeholder={placeholderKey}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white"
              />

              {/* Toggle */}
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                className="text-gray-400 hover:text-white transition"
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Host */}
            <div className="text-sm text-gray-500">
              {hostLabel}{" "}
              <span className="text-gray-300">{DEMO_CONFIG.HOST}</span>
            </div>

            {/* CTA */}
            <Button
              onClick={handleSaveKey}
              disabled={!apiKey.trim()}
              className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-blue-500"
            >
              {buttonText}
            </Button>
          </div>

          {/* Redirect */}
          <p className="text-center text-gray-500 text-sm mt-8">
            {redirectLabel}{" "}
            <span className="text-gray-300">
              {DEMO_CONFIG.getRedirectUrl()}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoHero;
