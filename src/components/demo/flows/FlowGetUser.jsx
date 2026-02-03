import React, { useState } from "react";
import { User } from "lucide-react";

import { Button } from "@/components/ui/button";
import ApiResultBox from "@/components/demo/ui/ApiResultBox";
import CurlBox from "@/components/demo/ui/CurlBox";

import FlowErrorCard from "@/components/demo/ui/FlowErrorCard";
import FlowSuccessCard from "@/components/demo/ui/FlowSuccessCard";

import { getUser } from "../demoApi";
import { useI18n } from "@/i18n/I18nProvider";

const FlowGetUser = ({ onBack }) => {
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const [result, setResult] = useState(null);

  // ✅ erro amigável
  const [uiError, setUiError] = useState(null);

  // ✅ erro técnico debug
  const [debugError, setDebugError] = useState(null);

  const handleFetch = async () => {
    if (!userId.trim()) return;

    try {
      setLoading(true);

      setUiError(null);
      setDebugError(null);
      setResult(null);

      const data = await getUser(userId.trim());

      // ✅ erro lógico esperado
      if (data?.success === false) {
        setUiError(data.error || t("demo.get_user.errors.not_found"));
        setResult(data);
        return;
      }

      // ✅ sucesso
      if (data?.success) {
        setResult(data);
        return;
      }

      setUiError(t("demo.get_user.errors.unexpected"));
      setResult(data);
    } catch (err) {
      setUiError(t("demo.get_user.errors.generic"));
      setDebugError(err.message || t("demo.get_user.errors.unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <User className="mx-auto text-blue-400" size={42} />

        <h3 className="text-2xl font-bold text-white">
          {t("demo.get_user.title")}
        </h3>

        <p className="text-gray-400">
          {t("demo.get_user.subtitle")}
        </p>
      </div>

      {/* Input */}
      <div className="max-w-md mx-auto space-y-3">
        <label className="block text-sm text-gray-400">
          {t("demo.get_user.input.label")}
        </label>

        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder={t("demo.get_user.input.placeholder")}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ✅ Error Card */}
      <FlowErrorCard
        title={t("demo.get_user.error_card.title")}
        error={
          uiError === "external_user_not_found"
            ? t("demo.get_user.errors.external_not_found")
            : uiError
        }
      />

      {/* ✅ Success Card */}
      <FlowSuccessCard
        title={t("demo.get_user.success_card.title")}
        message={t("demo.get_user.success_card.message")}
        data={result}
        redirectLabel={null}
      />

      {/* Action */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleFetch}
          disabled={loading || !userId.trim()}
          className="px-8 py-6 text-lg rounded-xl"
        >
          {loading
            ? t("demo.get_user.buttons.loading")
            : t("demo.get_user.buttons.fetch")}
        </Button>

        <Button variant="outline" onClick={onBack}>
          {t("demo.get_user.buttons.back")}
        </Button>
      </div>

      {/* Curl */}
      <CurlBox
        title={t("demo.get_user.curl.title")}
        endpointKey="getUser"
        params={[userId || "external_user_id_here"]}
      />

      {/* Debug raw response */}
      <ApiResultBox
        title={t("demo.get_user.debug.title")}
        data={result}
        loading={loading}
        error={debugError}
      />
    </div>
  );
};

export default FlowGetUser;
