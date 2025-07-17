import "server-only";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  fi: () => import("./fi.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "fi") =>
  dictionaries[locale]();
