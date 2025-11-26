const TOKEN_KEY = "token";

export function setToken(token) {
	try {
		localStorage.setItem(TOKEN_KEY, token);
	} catch (err) {
		console.log(err);		
	}
}

export function getToken() {
	try {
		return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || null;
	} catch (err) {
		console.log(err);
		
		return null;
	}
}

export function removeToken() {
	try {
		sessionStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(TOKEN_KEY);
	} catch (err) {
		console.log(err);
	}
}
