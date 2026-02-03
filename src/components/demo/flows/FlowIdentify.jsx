import React, { useState } from "react";
import { ScanFace } from "lucide-react";

import { Button } from "@/components/ui/button";
import ApiResultBox from "@/components/demo/ui/ApiResultBox";
import CurlBox from "@/components/demo/ui/CurlBox";

import FlowErrorCard from "@/components/demo/ui/FlowErrorCard";
import FlowSuccessCard from "@/components/demo/ui/FlowSuccessCard";

import { identifyUser } from "../demoApi";
import { useI18n } from "@/i18n/I18nProvider";

const FlowIdentify = ({ onBack }) => {
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // ✅ erro amigável UI
  const [uiError, setUiError] = useState(null);

  // ✅ erro técnico debug
  const [debugError, setDebugError] = useState(null);

  const handleIdentify = async () => {
    try {
      setLoading(true);

      setUiError(null);
      setDebugError(null);
      setResult(null);

      const data = await identifyUser();

      // ✅ erro lógico esperado
      if (data?.success === false) {
        setUiError(data.error || t("demo.identify.errors.failed"));
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

      setUiError(t("demo.identify.errors.unexpected"));
      setResult(data);
    } catch (err) {
      setUiError(t("demo.identify.errors.generic"));
      setDebugError(err.message || t("demo.identify.errors.unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <ScanFace className="mx-auto text-blue-400" size={42} />

        <h3 className="text-2xl font-bold text-white">
          {t("demo.identify.title")}
        </h3>

        <p className="text-gray-400">
          {t("demo.identify.subtitle")}
        </p>
      </div>

      {/* ✅ Error Card */}
      <FlowErrorCard
        title={t("demo.identify.error_card.title")}
        error={uiError}
      />

      {/* ✅ Success Card */}
      <FlowSuccessCard
        title={t("demo.identify.success_card.title")}
        message={t("demo.identify.success_card.message")}
        data={result}
        redirectLabel={t("demo.identify.success_card.redirect")}
      />

      {/* Action */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleIdentify}
          disabled={loading}
          className="px-8 py-6 text-lg rounded-xl bg-blue-600 hover:bg-blue-700"
        >
          {loading
            ? t("demo.identify.buttons.loading")
            : t("demo.identify.buttons.start")}
        </Button>

        <Button variant="outline" onClick={onBack}>
          {t("demo.identify.buttons.back")}
        </Button>
      </div>

      {/* Curl */}
      <CurlBox
        title={t("demo.identify.curl.title")}
        endpointKey="identify"
        params={[]}
      />

      {/* Debug raw response */}
      <ApiResultBox
        title={t("demo.identify.debug.title")}
        data={result}
        loading={loading}
        error={debugError}
      />
    </div>
  );
};

export default FlowIdentify;
