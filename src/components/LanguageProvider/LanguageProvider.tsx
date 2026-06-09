import { type ReactNode, useState } from "react";
import { IntlProvider } from "react-intl";
import enMessages from "../../i18n/en.json";

interface LanguageProviderProps {
  children: ReactNode;
}

const messages: Record<string, Record<string, string>> = {
  en: enMessages,
};

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [locale] = useState("en");

  return (
    <IntlProvider
      messages={messages[locale]}
      locale={locale}
      defaultLocale="en"
    >
      {children}
    </IntlProvider>
  );
};

export { LanguageProvider };
