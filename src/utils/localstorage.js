// simple helper for token storage (session-first, fallback to legacy localStorage)
const TOKEN_KEY = "token";

export function setToken(token) {
	// store in session so it expires with the tab
	try {
		sessionStorage.setItem(TOKEN_KEY, token);
		// remove any legacy persistent token
		localStorage.removeItem(TOKEN_KEY);
	} catch (e) {
		// ignore storage errors
	}
}

export function getToken() {
	try {
		// prefer sessionStorage (current session), fallback to legacy localStorage
		return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || null;
	} catch (e) {
		return null;
	}
}

export function removeToken() {
	try {
		sessionStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(TOKEN_KEY);
	} catch (e) {
		// ignore
	}
}
