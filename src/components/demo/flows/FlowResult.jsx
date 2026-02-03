import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import ApiResultBox from "@/components/demo/ui/ApiResultBox";
import FlowErrorCard from "@/components/demo/ui/FlowErrorCard";
import FlowSuccessCard from "@/components/demo/ui/FlowSuccessCard";

import { getResult } from "../demoApi";
import { useI18n } from "@/i18n/I18nProvider";

// ✅ NEW: Translator de erro técnico do endpoint
import { translateResultError } from "@/components/demo/utils/resultErrorTranslator";

const FlowResult = () => {
  const { t } = useI18n();

  const [loading, setLoading] = useState(true);

  const [result, setResult] = useState(null);
  const [uiError, setUiError] = useState(null);
  const [debugError, setDebugError] = useState(null);

  // ✅ botão para sair do modo returned
  const handleBackToMenu = () => {
    window.location.href = "/demo";
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clientState = params.get("state");

    if (!clientState) {
      setUiError(t("demo.result.errors.missing_state"));
      setLoading(false);
      return;
    }

    async function fetchResult() {
      try {
        setLoading(true);

        setUiError(null);
        setDebugError(null);

        const data = await getResult(clientState);

        // ❌ erro técnico do endpoint (/result)
        if (data?.success === false) {
          setUiError(translateResultError(data.error, t));
          setResult(data);
          return;
        }

        // ✅ resposta recebida corretamente
        if (data?.success === true) {
          setResult(data);
          return;
        }

        // fallback inesperado
        setUiError(t("demo.result.errors.unexpected"));
        setResult(data);
      } catch (err) {
        setUiError(t("demo.result.errors.failed"));
        setDebugError(err.message || t("demo.result.errors.unknown"));
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [t]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <CheckCircle className="mx-auto text-green-400" size={46} />

        <h3 className="text-2xl font-bold text-white">
          {t("demo.result.title")}
        </h3>

        <p className="text-gray-400">{t("demo.result.subtitle")}</p>
      </div>

      {/* Back Button */}
      <div className="flex justify-center">
        <Button variant="outline" onClick={handleBackToMenu}>
          {t("demo.result.buttons.back_menu")}
        </Button>
      </div>

      {/* ❌ Error */}
      <FlowErrorCard
        title={t("demo.result.error_card.title")}
        error={uiError}
      />

      {/* ✅ Success (agora é biométrico real via status/reason) */}
      <FlowSuccessCard
        title={t("demo.result.success_card.title")}
        message={t("demo.result.success_card.message")}
        data={result}
        redirectLabel={null}
      />

      {/* Debug */}
      <ApiResultBox
        title={t("demo.result.debug.title")}
        data={result}
        loading={loading}
        error={debugError}
      />
    </div>
  );
};

export default FlowResult;
