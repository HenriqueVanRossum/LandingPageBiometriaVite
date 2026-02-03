export function translateResultError(error, t) {
	if (!error) return null;

	return t(`demo.result_api_errors.${error}`) || t('demo.result_api_errors.unknown');
}
