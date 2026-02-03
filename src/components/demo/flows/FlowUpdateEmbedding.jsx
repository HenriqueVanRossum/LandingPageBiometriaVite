import React, { useState } from "react";
import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import ApiResultBox from "@/components/demo/ui/ApiResultBox";
import CurlBox from "@/components/demo/ui/CurlBox";

import FlowErrorCard from "@/components/demo/ui/FlowErrorCard";
import FlowSuccessCard from "@/components/demo/ui/FlowSuccessCard";

import { updateBiometryUser } from "../demoApi";
import { useI18n } from "@/i18n/I18nProvider";

const FlowUpdateEmbedding = ({ onBack }) => {
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const [result, setResult] = useState(null);

  // ✅ erro amigável UI
  const [uiError, setUiError] = useState(null);

  // ✅ erro técnico debug
  const [debugError, setDebugError] = useState(null);

  const handleUpdate = async () => {
    if (!userId.trim()) return;

    try {
      setLoading(true);

      setUiError(null);
      setDebugError(null);
      setResult(null);

      const data = await updateBiometryUser(userId.trim());

      // ✅ erro lógico esperado
      if (data?.success === false) {
        setUiError(data.error || t("demo.update.errors.failed"));
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

      setUiError(t("demo.update.errors.unexpected"));
      setResult(data);
    } catch (err) {
      setUiError(t("demo.update.errors.generic"));
      setDebugError(err.message || t("demo.update.errors.unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <RefreshCcw className="mx-auto text-orange-400" size={42} />

        <h3 className="text-2xl font-bold text-white">
          {t("demo.update.title")}
        </h3>

        <p className="text-gray-400">
          {t("demo.update.subtitle")}
        </p>
      </div>

      {/* Input */}
      <div className="max-w-md mx-auto space-y-3">
        <label className="block text-sm text-gray-400">
          {t("demo.update.input.label")}
        </label>

        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder={t("demo.update.input.placeholder")}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* ✅ Error Card */}
      <FlowErrorCard
        title={t("demo.update.error_card.title")}
        error={
          uiError === "external_user_not_found"
            ? t("demo.update.errors.not_enrolled")
            : uiError
        }
      />

      {/* ✅ Success Card */}
      <FlowSuccessCard
        title={t("demo.update.success_card.title")}
        message={t("demo.update.success_card.message")}
        data={result}
        redirectLabel={t("demo.update.success_card.redirect")}
      />

      {/* Action */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleUpdate}
          disabled={loading || !userId.trim()}
          className="px-8 py-6 text-lg rounded-xl bg-orange-600 hover:bg-orange-700"
        >
          {loading
            ? t("demo.update.buttons.loading")
            : t("demo.update.buttons.start")}
        </Button>

        <Button variant="outline" onClick={onBack}>
          {t("demo.update.buttons.back")}
        </Button>
      </div>

      {/* Curl */}
      <CurlBox
        title={t("demo.update.curl.title")}
        endpointKey="updateBiometry"
        params={[userId || "external_user_id_here"]}
      />

      {/* Debug raw response */}
      <ApiResultBox
        title={t("demo.update.debug.title")}
        data={result}
        loading={loading}
        error={debugError}
      />
    </div>
  );
};

export default FlowUpdateEmbedding;
