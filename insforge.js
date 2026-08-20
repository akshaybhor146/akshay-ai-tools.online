/* ═══════════════════════════════════
   INSFORGE.JS — REST API Client
   Lightweight wrapper for Insforge Auth & DB
   ═══════════════════════════════════ */

const INSFORGE_CONFIG = {
  baseUrl: 'https://ky872wnv.ap-southeast.insforge.app',
  // Keep the raw anon token; it is a bearer token, not a base64 string.
  // Decoding it with atob() breaks in the browser because JWT uses base64url.
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0ODYyNjd9.z0khb0xdaA6Vj5JXyR_7FohH8DqjUmdCsOWNxpT_YA0'
};

// ── Session Storage ──
const SESSION = {
  getToken: () => localStorage.getItem('insforge_token'),
  setToken: (t) => localStorage.setItem('insforge_token', t),
  getCsrf: () => localStorage.getItem('insforge_csrf'),
  setCsrf: (t) => localStorage.setItem('insforge_csrf', t),
  getUser: () => JSON.parse(localStorage.getItem('insforge_user') || 'null'),
  setUser: (u) => localStorage.setItem('insforge_user', JSON.stringify(u)),
  clear: () => {
    localStorage.removeItem('insforge_token');
    localStorage.removeItem('insforge_csrf');
    localStorage.removeItem('insforge_user');
  },
  isLoggedIn: () => !!SESSION.getToken() && !!SESSION.getUser()
};

// ── Helper: API call ──
async function insforgeAPI(endpoint, options = {}) {
  const url = INSFORGE_CONFIG.baseUrl + endpoint;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  // Add auth header
  const token = SESSION.getToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = 'Bearer ' + token;
  } else if (!headers['Authorization']) {
    headers['Authorization'] = 'Bearer ' + INSFORGE_CONFIG.anonKey;
  }

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: 'include' // for httpOnly cookies
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = data?.message || data?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

// ── Auth Methods ──
const INSFORGE = {
  auth: {
    // Sign up with email/password
    async signUp({ email, password, name }) {
      const data = await insforgeAPI('/api/auth/users', {
        method: 'POST',
        body: { email, password, name }
      });

      // If email verification required, don't save session yet
      if (data.requireEmailVerification) {
        return { requireVerification: true, user: data.user };
      }

      // If no verification needed, save session
      if (data.accessToken) {
        SESSION.setToken(data.accessToken);
        if (data.csrfToken) SESSION.setCsrf(data.csrfToken);
        SESSION.setUser(data.user);
      }
      return { requireVerification: false, user: data.user };
    },

    // Verify email with 6-digit code
    async verifyEmail({ email, otp }) {
      const data = await insforgeAPI('/api/auth/email/verify', {
        method: 'POST',
        body: { email, otp }
      });

      if (data.accessToken) {
        SESSION.setToken(data.accessToken);
        if (data.csrfToken) SESSION.setCsrf(data.csrfToken);
        SESSION.setUser(data.user);
      }
      return data;
    },

    // Resend verification email
    async resendVerification({ email }) {
      return await insforgeAPI('/api/auth/email/send-verification', {
        method: 'POST',
        body: { email }
      });
    },

    // Sign in with email/password
    async signIn({ email, password }) {
      const data = await insforgeAPI('/api/auth/sessions', {
        method: 'POST',
        body: { email, password }
      });

      SESSION.setToken(data.accessToken);
      if (data.csrfToken) SESSION.setCsrf(data.csrfToken);
      SESSION.setUser(data.user);
      return data;
    },

    // Sign out
    async signOut() {
      try {
        await insforgeAPI('/api/auth/logout', { method: 'POST' });
      } catch (e) { /* ignore logout errors */ }
      SESSION.clear();
    },

    // Refresh session
    async refreshSession() {
      const csrf = SESSION.getCsrf();
      const headers = {};
      if (csrf) headers['X-CSRF-Token'] = csrf;

      try {
        const data = await insforgeAPI('/api/auth/refresh', {
          method: 'POST',
          headers
        });

        SESSION.setToken(data.accessToken);
        if (data.csrfToken) SESSION.setCsrf(data.csrfToken);
        SESSION.setUser(data.user);
        return data;
      } catch (e) {
        SESSION.clear();
        return null;
      }
    },

    // Get current user from local store
    getUser() {
      return SESSION.getUser();
    },

    // Check if logged in
    isLoggedIn() {
      return SESSION.isLoggedIn();
    },

    // Get current session info from server
    async getCurrentUser() {
      if (!SESSION.getToken()) return null;
      try {
        const data = await insforgeAPI('/api/auth/sessions/current');
        return data.user;
      } catch (e) {
        return null;
      }
    }
  },

  // ── Database Methods ──
  db: {
    async insert(table, records) {
      const arr = Array.isArray(records) ? records : [records];
      return await insforgeAPI(`/api/database/records/${table}`, {
        method: 'POST',
        headers: { 'Prefer': 'return=representation' },
        body: arr
      });
    },

    async select(table, params = '') {
      return await insforgeAPI(`/api/database/records/${table}${params ? '?' + params : ''}`);
    },

    async update(table, filter, data) {
      return await insforgeAPI(`/api/database/records/${table}?${filter}`, {
        method: 'PATCH',
        headers: { 'Prefer': 'return=representation' },
        body: data
      });
    },

    async remove(table, filter) {
      return await insforgeAPI(`/api/database/records/${table}?${filter}`, {
        method: 'DELETE'
      });
    }
  }
};
