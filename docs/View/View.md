View
====

#View


#ViewModel


#FormFactory

This is a factory for generating form inputs and whole forms from metadata. In particular,
it can consume the metadata produced by Sds\DoctrineExtensions\Dojo. However, DoctrineExtensions
are not necissary for it's use.

Metadata takes the following form:

    {
        containerNode: domNode //optional,
        css-classes: [array of strings], //optional
        validatorGroup: [array of validator definitions], //optional
        fields: [
             field1:
             {
                id       : 'identityNameField',
                property : 'identityName',
                label    : 'Username:',
                dataType : 'string',
                dijit    : 'dijit/form/TextBox',
                validatorGroup: []
             }
        ]
    }

##createForm

This will return a complete form from the supplied metadata.

##appendToForm

This will attach inputs to the supplied form from the supplied metadata.

##createInput

This will create an individual form input form the supplied metadata.