const DEFAULT_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'edithub-demo';
const SESSION_KEY = 'edithub_admin_session';
const PASSWORD_KEY = 'edithub_admin_password';

export const ADMIN_DISPLAY_NAME = 'Maya';

export function getExpectedPassword(): string {
  if (typeof window === 'undefined') return DEFAULT_PASSWORD;
  return localStorage.getItem(PASSWORD_KEY) ?? DEFAULT_PASSWORD;
}

export function adminSignIn(password: string): boolean {
  if (password === getExpectedPassword()) {
    localStorage.setItem(SESSION_KEY, 'true');
    return true;
  }
  return false;
}

export function setAdminPassword(newPassword: string) {
  localStorage.setItem(PASSWORD_KEY, newPassword);
}

export function adminSignOut() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAdminAuthed(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(SESSION_KEY) === 'true';
}
