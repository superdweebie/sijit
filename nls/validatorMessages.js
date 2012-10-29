define({ root:
({
	alphaValidatorMessage: 'Must contain only the characters a-z, or A-Z.',
    credentialValidatorLengthMessage: 'Must be between 6 and 40 characters long.',
    credentialValidatorAlphaMessage: 'Must contain at least one alpha character (a-z, A-Z)',
    credentialValidatorNumMessage: 'Must contain at least one numeric character (0-9)',
    dataTypeValidatorMessage: 'Value must be a ${requiredType}.',
    emailValidatorMessage: 'Must be a valid email address.',
    identifierArrayValidatorMessage: '${name} not valid. ${message}',
    IdentifierCharsValidatorMessage: 'Must contain only the characters a-z, A-Z, 0-9, _, or -.',
    lengthValidatorMessage: 'Must be between ${min} and ${max} characters long.',
    requiredValidatorMessage: 'This value is required.'
})
});
