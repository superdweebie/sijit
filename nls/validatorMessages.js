define({ root:
({
    alpha: 'Must contain only the characters a-z, or A-Z.',
    cvv: 'Must be a valid ccv card number.',
    credentialLength: 'Must be between 6 and 40 characters long.',
    credentialAlpha: 'Must contain at least one alpha character (a-z, A-Z)',
    credentialNum: 'Must contain at least one numeric character (0-9)',
    currency: 'Must be currency format.',
    creditCardExpiry: 'Must be a valid credit card expiry date.',
    creditCard: 'Must be a valid credit card number.',
    email: 'Must be a valid email address.',
    hexColor: 'Must be a valid RGB color hex.',
    identifierArray: '${name} not valid. ${message}',
    identifierChars: 'Must contain only the characters a-z, A-Z, 0-9, _, or -.',
    inequalityLessThan: 'Must be less than ${compareValue}.',
    inequalityLessThanOrEqual: 'Must be less than or equal to ${compareValue}.',
    inequalityGreaterThan: 'Must be greater than ${compareValue}.',
    inequalityGreaterThanOrEqual: 'Must be greater than or equal to ${compareValue}.',
    inequalityNotEqual: 'Must not be equal to ${compareValue}.',
    is: 'Value must be a ${type}.',
    length: 'Must be between ${min} and ${max} characters long.',
    required: 'This value is required.'
})
});
