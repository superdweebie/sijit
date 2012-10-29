define({ root:
({
	alphaValidatorMessage: 'Must contain only the characters a-z, or A-Z.',
    credentialValidatorLengthMessage: 'Must be between 6 and 40 characters long.',
    credentialValidatorAlphaMessage: 'Must contain at least one alpha character (a-z, A-Z)',
    credentialValidatorNumMessage: 'Must contain at least one numeric character (0-9)',
    currencyValidatorMessage: 'Must be currency format.',
    dataTypeValidatorMessage: 'Value must be a ${requiredType}.',
    emailValidatorMessage: 'Must be a valid email address.',
    identifierArrayValidatorMessage: '${name} not valid. ${message}',
    identifierCharsValidatorMessage: 'Must contain only the characters a-z, A-Z, 0-9, _, or -.',
    inequalityValidatorLessThanMessage: 'Must be less than ${compareValue}.',
    inequalityValidatorLessThanOrEqualMessage: 'Must be less than or equal to ${compareValue}.',
    inequalityValidatorGreaterThanMessage: 'Must be greater than ${compareValue}.',
    inequalityValidatorGreaterThanOrEqualMessage: 'Must be greater than or equal to ${compareValue}.',
    inequalityValidatorNotEqualMessage: 'Must not be equal to ${compareValue}.',
    lengthValidatorMessage: 'Must be between ${min} and ${max} characters long.',
    requiredValidatorMessage: 'This value is required.'
})
});
