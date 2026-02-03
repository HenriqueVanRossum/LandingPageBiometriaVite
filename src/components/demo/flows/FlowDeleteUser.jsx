import React, { useState } from "react";
import { Trash2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import ApiResultBox from "@/components/demo/ui/ApiResultBox";
import CurlBox from "@/components/demo/ui/CurlBox";

import FlowErrorCard from "@/components/demo/ui/FlowErrorCard";
import FlowSuccessCard from "@/components/demo/ui/FlowSuccessCard";

import { listUsers, deleteUser } from "../demoApi";
import { useI18n } from "@/i18n/I18nProvider";

const FlowDeleteUser = ({ onBack }) => {
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const [result, setResult] = useState(null);

  // ✅ UI Errors
  const [uiError, setUiError] = useState(null);

  // ✅ Debug Errors
  const [debugError, setDebugError] = useState(null);

  // ✅ Step 1: Fetch all users
  const handleFetchUsers = async () => {
    try {
      setLoading(true);

      setUiError(null);
      setDebugError(null);
      setResult(null);
      setUsers([]);
      setSelectedUser("");

      const data = await listUsers();

      if (data?.success === false) {
        setUiError(data.error || t("demo.delete_user.errors.list_failed"));
        setResult(data);
        return;
      }

      if (data?.success && Array.isArray(data.users)) {
        setUsers(data.users);
        setResult(data);
        return;
      }

      setUiError(t("demo.delete_user.errors.unexpected"));
      setResult(data);
    } catch (err) {
      setUiError(t("demo.delete_user.errors.generic"));
      setDebugError(err.message || t("demo.delete_user.errors.unknown"));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Delete selected user
  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);

      setUiError(null);
      setDebugError(null);
      setResult(null);

      const data = await deleteUser(selectedUser);

      if (data?.success === false) {
        setUiError(data.error || t("demo.delete_user.errors.delete_failed"));
        setResult(data);
        return;
      }

      if (data?.success) {
        setResult(data);

        // ✅ Remove deleted user from dropdown
        setUsers((prev) =>
          prev.filter((u) => u.external_user_id !== selectedUser)
        );

        setSelectedUser("");
        return;
      }

      setUiError(t("demo.delete_user.errors.unexpected"));
      setResult(data);
    } catch (err) {
      setUiError(t("demo.delete_user.errors.generic"));
      setDebugError(err.message || t("demo.delete_user.errors.unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <Trash2 className="mx-auto text-red-400" size={42} />

        <h3 className="text-2xl font-bold text-white">
          {t("demo.delete_user.title")}
        </h3>

        <p className="text-gray-400">{t("demo.delete_user.subtitle")}</p>
      </div>

      {/* ✅ Error Card */}
      <FlowErrorCard
        title={t("demo.delete_user.error_card.title")}
        error={uiError}
      />

      {/* ✅ Step 1 Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleFetchUsers}
          disabled={loading}
          className="px-8 py-6 text-lg rounded-xl flex gap-2"
        >
          <Users size={18} />
          {loading
            ? t("demo.delete_user.buttons.loading_users")
            : t("demo.delete_user.buttons.fetch_users")}
        </Button>
      </div>

      {/* ✅ Dropdown after listing */}
      {users.length > 0 && (
        <div className="max-w-xl mx-auto space-y-3">
          <label className="text-sm text-gray-300 font-medium">
            {t("demo.delete_user.select.label")}
          </label>

          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white"
          >
            <option value="">
              {t("demo.delete_user.select.placeholder")}
            </option>

            {users.map((u) => (
              <option key={u.external_user_id} value={u.external_user_id}>
                {u.external_user_id}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ✅ Delete Button */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleDelete}
          disabled={loading || !selectedUser}
          className="px-8 py-6 text-lg rounded-xl bg-red-600 hover:bg-red-700"
        >
          {loading
            ? t("demo.delete_user.buttons.deleting")
            : t("demo.delete_user.buttons.delete")}
        </Button>

        <Button variant="outline" onClick={onBack}>
          {t("demo.delete_user.buttons.back")}
        </Button>
      </div>

      {/* Curl */}
      <CurlBox title={t("demo.delete_user.curl.title")} endpointKey="deleteUser" />

      {/* Debug */}
      <ApiResultBox
        title={t("demo.delete_user.debug.title")}
        data={result}
        loading={loading}
        error={debugError}
      />
    </div>
  );
};

export default FlowDeleteUser;
