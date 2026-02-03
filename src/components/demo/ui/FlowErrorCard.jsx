import React from "react";
import { AlertTriangle } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const FlowErrorCard = ({ error, title }) => {
  const { t } = useI18n();

  if (!error) return null;

  // ✅ Default title via i18n
  const finalTitle = title || t("demo.error_card.title");

  return (
    <div className="max-w-md mx-auto mt-4">
      <div className="flex gap-3 items-start p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300">
        <AlertTriangle size={20} className="mt-0.5" />

        <div className="text-sm">
          <p className="font-semibold">{finalTitle}</p>
          <p className="opacity-90">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default FlowErrorCard;
