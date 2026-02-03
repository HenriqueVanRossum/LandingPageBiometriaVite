import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  Users,
  ScanFace,
  UserPlus,
  ShieldCheck,
  RefreshCcw,
  Settings,
  User,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DEMO_CONFIG } from "./demoConfig";

import FlowListUsers from "@/components/demo/flows/FlowListUsers";
import FlowGetUser from "@/components/demo/flows/FlowGetUser";
import FlowEnroll from "@/components/demo/flows/FlowEnroll";
import FlowVerify from "@/components/demo/flows/FlowVerify";
import FlowIdentify from "@/components/demo/flows/FlowIdentify";
import FlowUpdateEmbedding from "@/components/demo/flows/FlowUpdateEmbedding";
import FlowDeleteUser from "@/components/demo/flows/FlowDeleteUser";

import InfoTip from "@/components/demo/ui/InfoTip";

import { useI18n } from "@/i18n/I18nProvider";

const DemoFlow = ({ onBackToHero }) => {

  const { t } = useI18n();

  const apiKey = DEMO_CONFIG.getApiKey();
  const [mode, setMode] = useState("menu");

  const handleChangeSettings = () => {
    onBackToHero(); // ✅ volta pro Hero sem apagar a chave
  };


  // ✅ Missing API Key
  if (!apiKey) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">
          {t("demo.flow.missing_key.title")}
        </h2>

        <Button onClick={() => window.location.reload()}>
          {t("demo.flow.missing_key.button")}
        </Button>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl w-full bg-white/5 border border-white/10 rounded-3xl p-10 shadow-xl"
      >
        {/* Top Bar */}
        <div className="flex justify-end mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleChangeSettings}
            className="flex gap-2"
          >
            <Settings size={16} />
            {t("demo.flow.change_key")}
          </Button>
        </div>

        {/* HEADER */}
        {mode === "menu" && (
          <>
            <h2 className="text-3xl font-bold text-white text-center mb-2">
              {t("demo.flow.title")}
            </h2>

            <p className="text-gray-400 text-center mb-10">
              {t("demo.flow.subtitle")}
            </p>
          </>
        )}

        {/* ✅ MAIN MENU */}
        {mode === "menu" && (
          <div className="grid gap-6 sm:grid-cols-2">
            <EndpointCard
              icon={<Users size={28} />}
              title={t("demo.flow.cards.list.title")}
              desc={t("demo.flow.cards.list.desc")}
              info={t("demo.flow.cards.list.info")}
              onClick={() => setMode("list")}
            />

            <EndpointCard
              icon={<User size={28} />}
              title={t("demo.flow.cards.getUser.title")}
              desc={t("demo.flow.cards.getUser.desc")}
              info={t("demo.flow.cards.getUser.info")}
              onClick={() => setMode("getUser")}
            />

            <EndpointCard
              icon={<UserPlus size={28} />}
              title={t("demo.flow.cards.enroll.title")}
              desc={t("demo.flow.cards.enroll.desc")}
              info={t("demo.flow.cards.enroll.info")}
              onClick={() => setMode("enroll")}
            />

            <EndpointCard
              icon={<ScanFace size={28} />}
              title={t("demo.flow.cards.identify.title")}
              desc={t("demo.flow.cards.identify.desc")}
              info={t("demo.flow.cards.identify.info")}
              onClick={() => setMode("identify")}
            />

            <EndpointCard
              icon={<ShieldCheck size={28} />}
              title={t("demo.flow.cards.verify.title")}
              desc={t("demo.flow.cards.verify.desc")}
              info={t("demo.flow.cards.verify.info")}
              onClick={() => setMode("verify")}
            />

            <EndpointCard
              icon={<RefreshCcw size={28} />}
              title={t("demo.flow.cards.update.title")}
              desc={t("demo.flow.cards.update.desc")}
              info={t("demo.flow.cards.update.info")}
              onClick={() => setMode("update")}
            />
            <EndpointCard
              icon={<Trash2 size={28} />}
              title={t("demo.flow.cards.delete.title")}
              desc={t("demo.flow.cards.delete.desc")}
              info={t("demo.flow.cards.delete.info")}
              onClick={() => setMode("deleteUser")}
            />

          </div>
        )}

        {/* ✅ FLOWS */}
        {mode === "list" && <FlowListUsers onBack={() => setMode("menu")} />}
        {mode === "getUser" && <FlowGetUser onBack={() => setMode("menu")} />}
        {mode === "enroll" && <FlowEnroll onBack={() => setMode("menu")} />}
        {mode === "verify" && <FlowVerify onBack={() => setMode("menu")} />}
        {mode === "identify" && <FlowIdentify onBack={() => setMode("menu")} />}
        {mode === "update" && (
          <FlowUpdateEmbedding onBack={() => setMode("menu")} />
        )}

        {mode === "deleteUser" && (
          <FlowDeleteUser onBack={() => setMode("menu")} />
        )}

        {/* Placeholder futuro */}
        {mode !== "menu" &&
          ![
              "list",
              "getUser",
              "deleteUser",
              "enroll",
              "verify",
              "identify",
              "update",
            ].includes(mode) && (
            <div className="text-center mt-10 space-y-6">
              <h3 className="text-2xl font-bold text-white">
                {t("demo.flow.placeholder")} {mode.toUpperCase()}
              </h3>

              <Button variant="outline" onClick={() => setMode("menu")}>
                {t("demo.flow.back")}
              </Button>
            </div>
          )}
      </motion.div>
    </section>
  );
};

/* ✅ Endpoint Card */
const EndpointCard = ({ icon, title, desc, info, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-left space-y-3"
    >
      {/* Tooltip */}
      <div className="absolute top-4 right-4">
        <InfoTip text={info} />
      </div>

      <div className="text-blue-400">{icon}</div>

      <h4 className="text-lg font-semibold text-white">{title}</h4>

      <p className="text-sm text-gray-400">{desc}</p>
    </button>
  );
};

export default DemoFlow;
