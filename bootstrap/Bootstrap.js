define ([
        'dojo/_base/declare',
        'dojo/_base/connect',
        'sijit/service/ServiceManagerAwareMixin',
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
                    authService: {
                        moduleName: 'sijit/service/authService/AuthService',
                        vars: {
                            authApiMap: undefined,
                            loginPostBootstrap: undefined,
                            pageRefreshTarget: undefined,
                            activeUser: undefined
                        },
                        asyncObj: {
                            status: 'status',
                            objectService: 'objectService',
                            pageLoaderService: 'pageLoaderService',
                            errorService: 'errorService',
                            recoverPasswordDialog: 'sijit/service/authService/RecoverPasswordDialog',
                            registerDialog: 'sijit/service/authService/RegisterDialog',
                            loginDialog: 'sijit/service/authService/LoginDialog'
                        }
                    },
                    objectService: {
                        moduleName: 'sijit/service/objectService/ObjectService'
                    },
                    errorService: {
                        moduleName: 'sijit/service/errorService/ErrorService',
                        asyncObj: {
                            status: 'status',
                            errorDialog: 'sijit/service/errorService/ErrorDialog'
                        }
                    },
                    activeUser: {
                        dijitId: undefined,
                        asyncObj: {
                            authService: 'authService'
                        }
                    }
                },


                postCreate: function() {
                    // summary:
                    //		Configures the serviceManager

                    var serviceManager = this.serviceManager();
                    serviceManager.config = this.serviceManagerDefaultConfig;
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