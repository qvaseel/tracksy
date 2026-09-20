const API_URL = import.meta.env.VITE_API_URL;

export async function loginWithTelegram(initData: string) {
  const response = await fetch(`${API_URL}/auth/telegram`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      initData,
    }),
  });

  if (!response.ok) {
    throw new Error("Ошибка авторизации");
  }

  return response.json();
}
