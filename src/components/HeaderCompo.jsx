import React, { useEffect, useState } from "react";
import { GlobalOutlined, CustomerServiceFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import i18n from "./i18n.js";

const HeaderCompo = () => {
  const { t } = useTranslation();

  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("lang");
    return saved || i18n.language?.toUpperCase() || "EN";
  });

  const ChangeLanguage = () => {
    const newLang = lang === "EN" ? "AR" : "EN";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.body.dir = newLang === "AR" ? "rtl" : "ltr";
    setLang(newLang);
  };

  useEffect(() => {
    const handleLangChange = (lng) => {
      document.body.dir = lng === "AR" ? "rtl" : "ltr";
      setLang(lng.toUpperCase());
    };
    i18n.on("languageChanged", handleLangChange);
    return () => i18n.off("languageChanged", handleLangChange);
  }, []);

  return (
    <div className="flex p-5 justify-between items-center">
      <div className="flex items-center gap-3">
        <CustomerServiceFilled style={{ fontSize: 40, color: "#1d4ed8" }} />
        <div className="font-bold text-2xl text-blue-700">{t("User_Info")}</div>
      </div>

      <button
        onClick={ChangeLanguage}
        className="flex gap-2 font-bold items-center border-2 text-blue-700 border-blue-700 px-3 py-1 rounded-lg"
      >
        <GlobalOutlined style={{ fontSize: 25 }} />
        <div>{lang}</div>
      </button>
    </div>
  );
};

export default HeaderCompo;
