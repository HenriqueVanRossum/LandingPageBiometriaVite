import React, { useState } from "react";
import { Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import ApiResultBox from "@/components/demo/ui/ApiResultBox";
import CurlBox from "@/components/demo/ui/CurlBox";

import FlowErrorCard from "@/components/demo/ui/FlowErrorCard";
import FlowSuccessCard from "@/components/demo/ui/FlowSuccessCard";

import { listUsers } from "../demoApi";
import { useI18n } from "@/i18n/I18nProvider";

const FlowListUsers = ({ onBack }) => {
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // ✅ erro amigável
  const [uiError, setUiError] = useState(null);

  // ✅ erro técnico debug
  const [debugError, setDebugError] = useState(null);

  const handleFetch = async () => {
    try {
      setLoading(true);

      setUiError(null);
      setDebugError(null);
      setResult(null);

      const data = await listUsers();

      // ✅ erro lógico esperado
      if (data?.success === false) {
        setUiError(data.error || t("demo.list_users.errors.failed"));
        setResult(data);
        return;
      }

      // ✅ sucesso
      if (data?.success) {
        setResult(data);
        return;
      }

      setUiError(t("demo.list_users.errors.unexpected"));
      setResult(data);
    } catch (err) {
      setUiError(t("demo.list_users.errors.generic"));
      setDebugError(err.message || t("demo.list_users.errors.unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <Users className="mx-auto text-blue-400" size={42} />

        <h3 className="text-2xl font-bold text-white">
          {t("demo.list_users.title")}
        </h3>

        <p className="text-gray-400">
          {t("demo.list_users.subtitle")}
        </p>
      </div>

      {/* ✅ Error Card */}
      <FlowErrorCard
        title={t("demo.list_users.error_card.title")}
        error={uiError}
      />

      {/* ✅ Success Card */}
      <FlowSuccessCard
        title={t("demo.list_users.success_card.title")}
        message={t("demo.list_users.success_card.message")}
        data={result}
        redirectLabel={null}
      />

      {/* Action */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleFetch}
          disabled={loading}
          className="px-8 py-6 text-lg rounded-xl"
        >
          {loading
            ? t("demo.list_users.buttons.loading")
            : t("demo.list_users.buttons.fetch")}
        </Button>

        <Button variant="outline" onClick={onBack}>
          {t("demo.list_users.buttons.back")}
        </Button>
      </div>

      {/* Curl */}
      <CurlBox
        title={t("demo.list_users.curl.title")}
        endpointKey="listUsers"
      />

      {/* Debug raw response */}
      <ApiResultBox
        title={t("demo.list_users.debug.title")}
        data={result}
        loading={loading}
        error={debugError}
      />
    </div>
  );
};

export default FlowListUsers;
