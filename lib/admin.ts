const DEFAULT_PASSWORD = 'rawrtigerpetal1020';
const SESSION_KEY = 'edithub_admin_session';
const PASSWORD_KEY = 'edithub_admin_password';
const PASSWORD_VERSION_KEY = 'edithub_admin_password_version';
const PASSWORD_VERSION = '2';

export const ADMIN_DISPLAY_NAME = 'Maya';

export function getExpectedPassword(): string {
  if (typeof window === 'undefined') return DEFAULT_PASSWORD;

  // Reset the old prototype password once so a stale browser value cannot
  // override the current front-end password.
  if (localStorage.getItem(PASSWORD_VERSION_KEY) !== PASSWORD_VERSION) {
    localStorage.setItem(PASSWORD_KEY, DEFAULT_PASSWORD);
    localStorage.setItem(PASSWORD_VERSION_KEY, PASSWORD_VERSION);
  }

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
