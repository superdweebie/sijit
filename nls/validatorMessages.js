define({ root:
({
    alphaMessage: 'Must contain only the characters a-z, or A-Z.',
    cvvMessage: 'Must be a valid ccv card number.',
    credentialLengthMessage: 'Must be between 6 and 40 characters long.',
    credentialAlphaMessage: 'Must contain at least one alpha character (a-z, A-Z)',
    credentialNumMessage: 'Must contain at least one numeric character (0-9)',
    currencyMessage: 'Must be currency format.',
    creditCardExpiryMessage: 'Must be a valid credit card expiry date.',
    creditCardMessage: 'Must be a valid credit card number.',
    dataTypeMessage: 'Value must be a ${requiredType}.',
    emailMessage: 'Must be a valid email address.',
    identifierArrayMessage: '${name} not valid. ${message}',
    identifierCharsMessage: 'Must contain only the characters a-z, A-Z, 0-9, _, or -.',
    inequalityLessThanMessage: 'Must be less than ${compareValue}.',
    inequalityLessThanOrEqualMessage: 'Must be less than or equal to ${compareValue}.',
    inequalityGreaterThanMessage: 'Must be greater than ${compareValue}.',
    inequalityGreaterThanOrEqualMessage: 'Must be greater than or equal to ${compareValue}.',
    inequalityNotEqualMessage: 'Must not be equal to ${compareValue}.',
    lengthMessage: 'Must be between ${min} and ${max} characters long.',
    requiredMessage: 'This value is required.'
})
});
