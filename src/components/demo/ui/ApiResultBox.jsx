import React from "react";
import { Copy, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";

const ApiResultBox = ({
  title,
  data,
  loading = false,
  error = null,
}) => {
  const { t } = useI18n();

  // ✅ Default title via i18n
  const finalTitle = title || t("demo.api_box.title");

  // ✅ Copy JSON helper
  const handleCopy = () => {
    if (!data) return;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  };

  // ✅ Format error nicely (JSON or plain text)
  let formattedError = null;

  if (error) {
    try {
      formattedError = JSON.stringify(JSON.parse(error), null, 2);
    } catch {
      formattedError = error;
    }
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-white">
          {finalTitle}
        </h4>

        {data && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex gap-2 text-gray-200"
          >
            <Copy size={16} />
            {t("demo.api_box.copy")}
          </Button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-gray-400 text-sm">
          {t("demo.api_box.loading")}
        </p>
      )}

      {/* ✅ Error */}
      {formattedError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200 space-y-2">
          <div className="flex items-center gap-2 text-red-300 font-medium">
            <AlertTriangle size={16} />

            {(() => {
              // ✅ Se veio tipo "HTTP Error (404)"
              const match = error?.match(/\((\d+)\)/);
              if (match) return `HTTP ${match[1]}`;

              return t("demo.api_box.request_failed");
            })()}
          </div>

          <pre className="whitespace-pre-wrap overflow-auto max-h-[220px] text-red-100">
            {formattedError}
          </pre>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && !data && (
        <p className="text-gray-500 text-sm">
          {t("demo.api_box.empty")}
        </p>
      )}

      {/* JSON Viewer */}
      {data && (
        <pre className="text-sm text-gray-200 bg-black/40 rounded-xl p-4 overflow-auto max-h-[320px]">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

      {/* Success */}
      {data && !error && (
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <CheckCircle size={16} />
          {t("demo.api_box.success")}
        </div>
      )}
    </div>
  );
};

export default ApiResultBox;
