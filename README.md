sijit (dojo/Sds)
================

[![Build Status](https://secure.travis-ci.org/superdweebie/sijit.png)](http://travis-ci.org/superdweebie/sijit)

A collection of extensions for dojo javascript framework.

#Install

Using git:
    git clone http://github.com/superdweebie/sijit dojo/Sds

Using composer, add this to your root composer.json:
    "repositories": [{ "type": "composer", "url": "https://raw.github.com/superdweebie/dojo/master" }],
    "require": {
        "dojo/Sds": "dev-master"
    }

Some UI compoents also require dojo/bootstrap, which can be installed the same way:

    git clone http://github.com/xsokev/Dojo-Bootstrap dojo/bootstrap

or
    "repositories": [{ "type": "composer", "url": "https://raw.github.com/superdweebie/dojo/master" }],
    "require": {
        "dojo/bootstrap": "dev-master"
    }

#Components

For more information on how to use each of the components listed below, see the docs folder.

##ConfigManager

A module to allow multiple config objects to be merged into dojo config. Allows
distributed config definition.

##ModuleManager

A module to handle dependency injection.

##Validator

A group of modules that provide a standardised validation interface.

##View

A group of modules to abstract ui handling from application controllers. Includes
a FormFactory to generate forms from metadata.