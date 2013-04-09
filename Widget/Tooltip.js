define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/dom-class',
    'bootstrap/Tooltip',
    'dijit/_Widget',
    'dojo/text!./Template/Tooltip.html',
    'dojo/query'
],
        function(
                declare,
                lang,
                on,
                domConstruct,
                domClass,
                Tooltip,
                Widget,
                template
                ) {
            // module:
            //		Sds/Widget/Tooltip

            return declare
                    (
                            [Widget],
                            {
                                selector: 'a[rel=tooltip]',
                                eventShow: 'mouseover',
                                eventHide: 'mouseout',
                                animation: false,
                                nodeClass: null,
                                constructor: function(props) {
                                    lang.mixin(this, props);
                                },
                                buildRendering: function() {
                                    this.inherited(arguments);
                                    var eShow = this.get('eventShow');
                                    var eHide = this.get('eventHide');
                                    var animation = this.get('animation');
                                    var temp = this.get('template');
                                    on(document, this.selector + ':' + eShow, function(e) {
                                        var t = new Tooltip(this, {
                                            trigger: 'manual',
                                            animation: animation,
                                            template: temp
                                        });
                                        t.show();
                                        on(this, eHide, function() {
                                            t.destroy();
                                        });
                                    });
                                },
                                _getTemplateAttr: function() {
                                    if (this.nodeClass !== null) {
                                        var temp = domConstruct.toDom(template);
                                        domClass.add(temp, this.get('nodeClass'));
                                        
                                        //convert dom back to string
                                        var tempNode = domConstruct.create('div');
                                        tempNode.appendChild(temp);
                                        temp = tempNode.innerHTML;
                                    } else {
                                        temp = template;
                                    }
                                    return temp;
                                }
                            });
        });
