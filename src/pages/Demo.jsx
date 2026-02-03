import React, { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

import DemoHero from "@/components/demo/DemoHero";
import DemoFlow from "@/components/demo/DemoFlow";

import { DEMO_CONFIG } from "@/components/demo/demoConfig";

const Demo = () => {
  const { t } = useI18n();

  // ✅ controla a tela (Hero ou Flow)
  const [started, setStarted] = useState(false);

  // ✅ se já existir key salva, abre direto o Flow
  useEffect(() => {
    const savedKey = DEMO_CONFIG.getApiKey();
    if (savedKey) {
      setStarted(true);
    }
  }, []);

  return (
    <main>
      {!started ? (
        <DemoHero
          onStart={() => setStarted(true)}
          title={t("demo.hero.title")}
          subtitle={t("demo.hero.subtitle")}
          steps={[
            {
              before: t("demo.hero.steps.1.before"),
              link: t("demo.hero.steps.1.link"),
            },
            t("demo.hero.steps.2"),
            t("demo.hero.steps.3"),
          ]}
          labelKey={t("demo.hero.label_key")}
          placeholderKey={t("demo.hero.placeholder_key")}
          hostLabel={t("demo.hero.host_label")}
          redirectLabel={t("demo.hero.redirect_label")}
          buttonText={t("demo.hero.button")}
        />
      ) : (
        <DemoFlow onBackToHero={() => setStarted(false)} />
      )}
    </main>
  );
};

export default Demo;
