import React from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";

// ✅ NEW: Translator biométrico
import { translateReason } from "@/components/demo/utils/reasonTranslator";

const FlowSuccessCard = ({ title, message, data, redirectLabel }) => {
  const { t } = useI18n();

  if (!data?.success) return null;

  // ✅ Status biométrico real
  const biometricFail =
    data.status === "fail" || data.result === "fail";

  const biometricWarning =
    data.status === "warning" || data.result === "warning";

  // ✅ Default style (verde)
  let icon = <CheckCircle size={22} className="text-green-400" />;
  let border = "border-green-500/30";
  let bg = "bg-green-500/10";
  let text = "text-green-200";

  let finalMessage = message;

  // ❌ Fail biométrico real
  if (biometricFail) {
    icon = <XCircle size={22} className="text-red-400" />;
    border = "border-red-500/30";
    bg = "bg-red-500/10";
    text = "text-red-200";

    finalMessage = t("demo.result_card.failed", {
      reason: translateReason(data.reason, t),
    });
  }

  // ⚠️ Warning biométrico
  if (biometricWarning) {
    icon = <AlertTriangle size={22} className="text-yellow-400" />;
    border = "border-yellow-500/30";
    bg = "bg-yellow-500/10";
    text = "text-yellow-200";

    finalMessage = t("demo.result_card.warning");
  }

  // ✅ Lista usuários
  const users = Array.isArray(data?.users) ? data.users : null;

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <div
        className={`p-6 rounded-2xl border ${border} ${bg} ${text} space-y-5`}
      >
        {/* Header */}
        <div className="flex gap-3 items-start">
          {icon}

          <div>
            <p className="font-semibold text-white">
              {title || t("demo.success_card.title")}
            </p>

            {finalMessage && (
              <p className="text-sm opacity-90">{finalMessage}</p>
            )}
          </div>
        </div>

        {/* ✅ Outcome */}
        {data.status && (
          <p className="text-sm">
            <span className="font-semibold">
              {t("demo.result_card.status")}:
            </span>{" "}
            <span className="font-bold">{data.status}</span>
          </p>
        )}

        {data.external_user_id && (
          <p className="text-sm">
            <span className="font-semibold">
              {t("demo.result_card.user")}:
            </span>{" "}
            {data.external_user_id}
          </p>
        )}

        {data.score !== undefined && (
          <p className="text-sm">
            <span className="font-semibold">
              {t("demo.result_card.score")}:
            </span>{" "}
            {data.score}
          </p>
        )}

        {/* ✅ Users Table */}
        {users && users.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-gray-300">
                <tr>
                  <th className="text-left px-4 py-3">
                    {t("demo.success_card.users.id")}
                  </th>
                  <th className="text-left px-4 py-3">
                    {t("demo.success_card.users.status")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.slice(0, 10).map((u) => (
                  <tr
                    key={u.external_user_id}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-3 font-medium text-white">
                      {u.external_user_id}
                    </td>

                    <td className="px-4 py-3">
                      {u.status || "enrolled"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Redirect */}
        {data.biometry_url && (
          <Button
            className="w-full rounded-xl"
            onClick={() => (window.location.href = data.biometry_url)}
          >
            {redirectLabel || t("demo.success_card.continue")}
            <ExternalLink size={16} className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FlowSuccessCard;
