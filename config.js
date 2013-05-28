define(
    [],
    function(){
        //This file will merge all the standard Sds configs in one go.
        return {
            mergeConfigs: [
                'Sds/Form/config',
                'Sds/Validator/config',
                'Sds/Filter/config',
                'Sds/Exception/config',
                'Sds/ExceptionClient/config',
                'Sds/Router/config',
                'Sds/Store/config',
                'Sds/IdentityClient/config',
                'Sds/AuthenticationClient/config'
            ]
        }
    }
);


