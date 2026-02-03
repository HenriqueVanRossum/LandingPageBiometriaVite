import React from "react";
import { Copy, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

import { DEMO_CONFIG } from "../demoConfig";
import { ENDPOINTS } from "../demoApi";
import { useI18n } from "@/i18n/I18nProvider";

const CurlBox = ({ title, endpointKey, params = [] }) => {
  const { t } = useI18n();

  if (!endpointKey) return null;

  const endpoint = ENDPOINTS[endpointKey];
  if (!endpoint) return null;

  const host = DEMO_CONFIG.HOST;

  // ✅ Key mascarada
  const apiKey = DEMO_CONFIG.getApiKey();
  const maskedKey = apiKey
    ? apiKey.slice(0, 6) + "************"
    : "YOUR_API_KEY";

  // ✅ Body do endpoint (dinâmico)
  const bodyExample =
    typeof endpoint.body === "function"
      ? endpoint.body(...params)
      : endpoint.body;

  const jsonBody = JSON.stringify(bodyExample, null, 2);

  // ✅ Curl automático
  const curlCommand = `curl --request POST \\
  --url https://${host}${endpoint.path} \\
  --header 'Content-Type: application/json' \\
  --header 'x-rapidapi-host: ${host}' \\
  --header 'x-rapidapi-key: ${maskedKey}' \\
  --data '${JSON.stringify(bodyExample)}'`;

  // ✅ Copy
  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand);
  };

  // ✅ Default title via i18n
  const finalTitle = title || t("demo.curl_box.title");

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Terminal size={18} className="text-blue-400" />
          {finalTitle}
        </h4>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex gap-2 text-gray-200"
        >
          <Copy size={16} />
          {t("demo.curl_box.copy")}
        </Button>
      </div>

      {/* Curl */}
      <pre className="text-sm text-gray-200 bg-black/50 rounded-xl p-4 overflow-auto whitespace-pre-wrap">
        {curlCommand}
      </pre>

      {/* Body Preview */}
      <div className="text-xs text-gray-500">
        {t("demo.curl_box.body_label")}
        <pre className="mt-2 text-gray-300 bg-black/30 rounded-xl p-3 overflow-auto">
          {jsonBody}
        </pre>
      </div>
    </div>
  );
};

export default CurlBox;
