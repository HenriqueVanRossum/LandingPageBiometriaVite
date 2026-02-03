import React, { useState } from "react";
import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import ApiResultBox from "@/components/demo/ui/ApiResultBox";
import CurlBox from "@/components/demo/ui/CurlBox";

import FlowErrorCard from "@/components/demo/ui/FlowErrorCard";
import FlowSuccessCard from "@/components/demo/ui/FlowSuccessCard";

import { enrollUser } from "../demoApi";
import { useI18n } from "@/i18n/I18nProvider";

const FlowEnroll = ({ onBack }) => {
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const [result, setResult] = useState(null);

  // ✅ erro amigável (UI)
  const [uiError, setUiError] = useState(null);

  // ✅ erro técnico (debug)
  const [debugError, setDebugError] = useState(null);

  const handleEnroll = async () => {
    if (!userId.trim()) return;

    try {
      setLoading(true);

      setResult(null);
      setUiError(null);
      setDebugError(null);

      const data = await enrollUser(userId.trim());

      // ✅ erro lógico esperado
      if (data?.success === false) {
        setUiError(data.error || t("demo.enroll.errors.failed"));
        setResult(data);
        return;
      }

      // ✅ sucesso → redirect
      if (data?.success && data?.biometry_url) {
        setResult(data);

        setTimeout(() => {
          window.location.href = data.biometry_url;
        }, 1200);

        return;
      }

      setUiError(t("demo.enroll.errors.unexpected"));
      setResult(data);
    } catch (err) {
      setUiError(t("demo.enroll.errors.generic"));
      setDebugError(err.message || t("demo.enroll.errors.unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <UserPlus className="mx-auto text-green-400" size={42} />

        <h3 className="text-2xl font-bold text-white">
          {t("demo.enroll.title")}
        </h3>

        <p className="text-gray-400">
          {t("demo.enroll.subtitle")}
        </p>
      </div>

      {/* Input */}
      <div className="max-w-md mx-auto space-y-3">
        <label className="block text-sm text-gray-400">
          {t("demo.enroll.input.label")}
        </label>

        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder={t("demo.enroll.input.placeholder")}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* ✅ Error Card */}
      <FlowErrorCard
        title={t("demo.enroll.error_card.title")}
        error={
          uiError === "external_user_already_exists"
            ? t("demo.enroll.errors.already_exists")
            : uiError
        }
      />

      {/* ✅ Success Card */}
      <FlowSuccessCard
        title={t("demo.enroll.success_card.title")}
        message={t("demo.enroll.success_card.message")}
        data={result}
        redirectLabel={t("demo.enroll.success_card.redirect")}
      />

      {/* Action */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleEnroll}
          disabled={loading || !userId.trim()}
          className="px-8 py-6 text-lg rounded-xl bg-green-600 hover:bg-green-700"
        >
          {loading
            ? t("demo.enroll.buttons.starting")
            : t("demo.enroll.buttons.start")}
        </Button>

        <Button variant="outline" onClick={onBack}>
          {t("demo.enroll.buttons.back")}
        </Button>
      </div>

      {/* Curl */}
      <CurlBox
        title={t("demo.enroll.curl.title")}
        endpointKey="enroll"
        params={[userId || "external_user_id_here"]}
      />

      {/* Debug raw response */}
      <ApiResultBox
        title={t("demo.enroll.debug.title")}
        data={result}
        loading={loading}
        error={debugError}
      />
    </div>
  );
};

export default FlowEnroll;
