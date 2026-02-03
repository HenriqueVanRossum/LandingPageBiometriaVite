import {DEMO_CONFIG} from './demoConfig';

function generateClientState() {
	if (crypto?.randomUUID) {
		return crypto.randomUUID();
	}

	// ✅ fallback seguro
	return 'state_' + Date.now() + '_' + Math.random().toString(16).slice(2);
}

/* ✅ Registry central de endpoints */
export const ENDPOINTS = {
	/* ✅ List All Users */
	listUsers: {
		path: '/wp-json/biometry/v1/users/list',
		body: {},
	},

	/* ✅ Get One Enrolled User (NEW) */
	getUser: {
		path: '/wp-json/biometry/v1/users/get',
		body: (external_user_id) => ({
			external_user_id,
		}),
	},

	/* ✅ Enroll */
	enroll: {
		path: '/wp-json/biometry/v1/enroll',
		body: (external_user_id) => ({
			external_user_id,
			redirect_url: DEMO_CONFIG.getRedirectUrl(),
			client_state: generateClientState(),
		}),
	},

	/* ✅ Identify */
	identify: {
		path: '/wp-json/biometry/v1/identify',
		body: () => ({
			redirect_url: DEMO_CONFIG.getRedirectUrl(),
			client_state: generateClientState(),
		}),
	},

	/* ✅ Verify */
	verify: {
		path: '/wp-json/biometry/v1/verify',
		body: (external_user_id) => ({
			external_user_id,
			redirect_url: DEMO_CONFIG.getRedirectUrl(),
			client_state: generateClientState(),
		}),
	},

	/* ✅ Update Biometry */
	updateBiometry: {
		path: '/wp-json/biometry/v1/update-embedding',
		body: (external_user_id) => ({
			external_user_id,
			redirect_url: DEMO_CONFIG.getRedirectUrl(),
			client_state: generateClientState(), // ✅ faltava
		}),
	},

	/* ✅ Result */
	result: {
		path: '/wp-json/biometry/v1/result',
		body: (client_state) => ({
			client_state,
		}),
	},

	/* ✅ Delete User */
	deleteUser: {
		path: '/wp-json/biometry/v1/user/delete',
		body: (external_user_id) => ({
			external_user_id,
		}),
	},
};



/* ✅ Função base única */
async function request(path, body = {}) {
	const apiKey = DEMO_CONFIG.getApiKey();

	if (!apiKey) {
		throw new Error('Missing RapidAPI Key');
	}

	const res = await fetch(`https://${DEMO_CONFIG.HOST}${path}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-rapidapi-key': apiKey,
			'x-rapidapi-host': DEMO_CONFIG.HOST,
		},
		body: JSON.stringify(body),
	});

	const data = await res.json().catch(() => null);

	// ✅ Retorna o JSON mesmo quando HTTP não é 200 (ex: 409, 400)
	if (!res.ok) {
		return (
			data || {
				success: false,
				error: `http_error_${res.status}`,
			}
		);
	}

	return data;
}

/* ✅ Helper genérico */
export function callEndpoint(endpointKey, ...args) {
	const endpoint = ENDPOINTS[endpointKey];

	if (!endpoint) {
		throw new Error(`Unknown endpoint: ${endpointKey}`);
	}

	const body = typeof endpoint.body === 'function' ? endpoint.body(...args) : endpoint.body;

	return request(endpoint.path, body);
}

/* ✅ Wrappers opcionais (mais legível nos flows) */

/* List All Users */
export function listUsers() {
	return callEndpoint('listUsers');
}

/* ✅ Get One User */
export function getUser(external_user_id) {
	return callEndpoint('getUser', external_user_id);
}

/* ✅ Enroll */
export function enrollUser(external_user_id) {
	return callEndpoint('enroll', external_user_id);
}

/* ✅ Verify */
export function verifyUser(external_user_id) {
	return callEndpoint('verify', external_user_id);
}

/* ✅ Identify */
export function identifyUser() {
	return callEndpoint('identify');
}

export function updateBiometryUser(external_user_id) {
	return callEndpoint('updateBiometry', external_user_id);
}

export function getResult(client_state) {
	return callEndpoint('result', client_state);
}

/* ✅ Delete User */
export function deleteUser(external_user_id) {
	return callEndpoint("deleteUser", external_user_id);
}
