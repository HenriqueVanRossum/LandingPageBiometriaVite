export function translateReason(reason, t) {
	if (!reason) return t('demo.reasons.unknown');

	return t(`demo.reasons.${reason}`) || t('demo.reasons.unknown');
}
