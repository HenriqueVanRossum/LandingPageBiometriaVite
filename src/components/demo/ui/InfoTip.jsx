import React from "react";
import { Info } from "lucide-react";

const InfoTip = ({ text }) => {
  if (!text) return null;

  return (
    <div className="relative group isolate">
      {/* Icon */}
      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-gray-300 hover:text-white transition">
        <Info size={16} />
      </div>

      {/* Tooltip */}
      <div className="absolute right-0 top-9 w-72 hidden group-hover:block z-50">
        <div
          className="
            rounded-xl
            bg-slate-950
            opacity-100
            backdrop-blur-none
            border border-slate-700
            p-4
            text-sm
            text-white
            shadow-2xl
          "
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default InfoTip;
