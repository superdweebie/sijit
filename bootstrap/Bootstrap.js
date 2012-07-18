define ([
        'dojo/_base/declare',
        'dojo/_base/connect',
        'sijit/serviceManager/ServiceManagerAwareMixin',
        'dijit/_Widget'
    ],
    function (
        declare,
        connect,
        ServiceManagerAwareMixin,
        _Widget
    ) {
        // module:
        //		sijit/bootstrap/Bootstrap

        return declare (
            'sijit.bootstrap.Bootstrap',
            [_Widget, ServiceManagerAwareMixin],
            {
                // summary:
                //		Widget for bootstrapping other sijit modules, in particular
                //      the serviceManager

                // serviceManagerConfig: object
                //		User defined serviceManagerConfig
                //		This config will be merged with serviceManagerDefaultConfig
                serviceManagerConfig: undefined,

                // serviceManagerDefaultConfig: object
                //		Default config to define injections in to object
                serviceManagerDefaultConfig: {
                    authController: {
                        moduleName: 'sijit/authController/AuthController',
                        vars: {
                            authApiMap: undefined,
                            loginPostBootstrap: undefined,
                            pageRefreshTarget: undefined,
                            activeUser: undefined
                        },
                        asyncObj: {
                            status: 'status',
                            errorService: 'errorController',
                            recoverPasswordDialog: 'sijit/authController/RecoverPasswordDialog',
                            registerDialog: 'sijit/service/authController/RegisterDialog',
                            loginDialog: 'sijit/service/authController/LoginDialog'
                        }
                    },
                    errorController: {
                        moduleName: 'sijit/errorController/ErrorController',
                        asyncObj: {
                            status: 'status',
                            errorDialog: 'sijit/errorController/ErrorDialog'
                        }
                    },
                    activeUser: {
                        dijitId: undefined,
                        asyncObj: {
                            authController: 'authController'
                        }
                    }
                },
                postCreate: function() {
                    // summary:
                    //		Configures the serviceManager

                    var serviceManager = this.serviceManager();
                    serviceManager.setConfig(this.serviceManagerDefaultConfig);
                    serviceManager.mergeConfig(this.serviceManagerConfig);
                },
                startup: function() {
                    this._postBootstrap();
                },
                _postBootstrap: function() {
                    // tags:
                    //		protected
                    connect.publish("postBootstrap", [{}]);
                }
            }
        );
    }
);