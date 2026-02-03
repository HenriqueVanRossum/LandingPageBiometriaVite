import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import ApiResultBox from "@/components/demo/ui/ApiResultBox";
import CurlBox from "@/components/demo/ui/CurlBox";

import FlowErrorCard from "@/components/demo/ui/FlowErrorCard";
import FlowSuccessCard from "@/components/demo/ui/FlowSuccessCard";

import { verifyUser } from "../demoApi";
import { useI18n } from "@/i18n/I18nProvider";

const FlowVerify = ({ onBack }) => {
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const [result, setResult] = useState(null);

  // ✅ erro amigável UI
  const [uiError, setUiError] = useState(null);

  // ✅ erro técnico debug
  const [debugError, setDebugError] = useState(null);

  const handleVerify = async () => {
    if (!userId.trim()) return;

    try {
      setLoading(true);

      setUiError(null);
      setDebugError(null);
      setResult(null);

      const data = await verifyUser(userId.trim());

      // ✅ erro lógico esperado
      if (data?.success === false) {
        setUiError(data.error || t("demo.verify.errors.failed"));
        setResult(data);
        return;
      }

      // ✅ sucesso → redirect para captura facial
      if (data?.success && data?.biometry_url) {
        setResult(data);

        setTimeout(() => {
          window.location.href = data.biometry_url;
        }, 1200);

        return;
      }

      setUiError(t("demo.verify.errors.unexpected"));
      setResult(data);
    } catch (err) {
      setUiError(t("demo.verify.errors.generic"));
      setDebugError(err.message || t("demo.verify.errors.unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <ShieldCheck className="mx-auto text-purple-400" size={42} />

        <h3 className="text-2xl font-bold text-white">
          {t("demo.verify.title")}
        </h3>

        <p className="text-gray-400">
          {t("demo.verify.subtitle")}
        </p>
      </div>

      {/* Input */}
      <div className="max-w-md mx-auto space-y-3">
        <label className="block text-sm text-gray-400">
          {t("demo.verify.input.label")}
        </label>

        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder={t("demo.verify.input.placeholder")}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* ✅ Error Card */}
      <FlowErrorCard
        title={t("demo.verify.error_card.title")}
        error={
          uiError === "external_user_not_found"
            ? t("demo.verify.errors.not_enrolled")
            : uiError
        }
      />

      {/* ✅ Success Card */}
      <FlowSuccessCard
        title={t("demo.verify.success_card.title")}
        message={t("demo.verify.success_card.message")}
        data={result}
        redirectLabel={t("demo.verify.success_card.redirect")}
      />

      {/* Action */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleVerify}
          disabled={loading || !userId.trim()}
          className="px-8 py-6 text-lg rounded-xl bg-purple-600 hover:bg-purple-700"
        >
          {loading
            ? t("demo.verify.buttons.loading")
            : t("demo.verify.buttons.start")}
        </Button>

        <Button variant="outline" onClick={onBack}>
          {t("demo.verify.buttons.back")}
        </Button>
      </div>

      {/* Curl */}
      <CurlBox
        title={t("demo.verify.curl.title")}
        endpointKey="verify"
        params={[userId || "external_user_id_here"]}
      />

      {/* Debug raw response */}
      <ApiResultBox
        title={t("demo.verify.debug.title")}
        data={result}
        loading={loading}
        error={debugError}
      />
    </div>
  );
};

export default FlowVerify;
