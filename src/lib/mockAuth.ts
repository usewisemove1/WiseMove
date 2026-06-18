export const MOCK_AUTH_COOKIE = "wisemove_mock_auth";

export function setMockAuthCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${MOCK_AUTH_COOKIE}=1; path=/; max-age=86400; SameSite=Lax`;
}

export function clearMockAuthCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${MOCK_AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
