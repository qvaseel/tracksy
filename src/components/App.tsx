// @ts-nocheck
import { Navigate, Route, Routes, HashRouter } from "react-router-dom";
import { useLaunchParams, useSignal, miniApp } from "@tma.js/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { routes } from "@/navigation/routes.tsx";
import { useEffect } from "react";
import { loginWithTelegram } from "@/shared/api/auth";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  useEffect(() => {
    const initData = window.Telegram?.WebApp?.initData;

    if (!initData) {
      console.error("Telegram initData отсутствует");
      return;
    }

    loginWithTelegram(initData)
      .then((data) => {
        console.log("Авторизация успешна:", data);

        localStorage.setItem("accessToken", data.accessToken);
      })
      .catch((error) => {
        console.error("Ошибка авторизации:", error);
      });
  }, []);

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"}
    >
      <HashRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AppRoot>
  );
}
