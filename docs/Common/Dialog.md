Dialog
======

A widget similar to dijit/Dialog, but using twitter/bootstrap styling.

Creates a modal dialog box. Use the show() and hide() methods to iniitate and cancel.

#show

Display the dialog. Optionally pass this method a value object that can be used to
initate the form.

returns a Deferred that will resolve to the dialog value when the
dialog is hidden.

#hide

Hide the dialog. Will resolve the Deferred returned by the show() method.

#value

The Deferred returned by show() will resolve to the following object:

{
    state: Form state,
    button: Which button was pressed, if any
    value: The form value
}