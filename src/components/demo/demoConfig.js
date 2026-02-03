export const DEMO_CONFIG = {
	HOST: 'auth-face-biometric-authentication-api.p.rapidapi.com',

	getRedirectUrl() {
		return window.location.origin + '/demo/result';
	},

	getApiKey() {
		return localStorage.getItem('RAPIDAPI_KEY');
	},
};
