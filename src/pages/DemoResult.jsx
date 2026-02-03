import React from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, Link } from "react-router-dom";

import FlowResult from "@/components/demo/flows/FlowResult";
import { Button } from "@/components/ui/button";

import { useI18n } from "@/i18n/I18nProvider";

export default function DemoResult() {
  const { t } = useI18n();

  const [params] = useSearchParams();
  const state = params.get("state");

  if (!state) {
    return (
      <>
        <Helmet>
          <title>{t("demo.result_page.meta.title")}</title>
        </Helmet>

        <div className="text-center text-white mt-20 space-y-4">
          <h2 className="text-2xl font-bold">
            {t("demo.result_page.missing_state.title")}
          </h2>

          <p className="text-gray-400">
            {t("demo.result_page.missing_state.subtitle")}
          </p>

          <Link to="/demo">
            <Button className="mt-4">
              {t("demo.result_page.missing_state.back")}
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("demo.result_page.meta.title")}</title>
      </Helmet>

      <FlowResult state={state} />
    </>
  );
}