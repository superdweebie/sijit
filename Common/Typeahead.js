define([
    'dojo/_base/declare',
    'dojo/_base/sniff',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/query',
    'dojo/dom-attr',
    'dojo/_base/array',
    'bootstrap/Typeahead',
    'Sds/Common/TypeaheadItem',
    'dojo/Evented'
    ],
    function (
        declare,
        sniff,
        lang,
        on,
        query,
        domAttr,
        array,
        Typeahead,
        TypeaheadItem,
        Evented
        ){
        // module:
        //		Sds/Common/Typeahead

        return declare(
            'Sds/Common/Typeahead',
            [Typeahead, Evented],
            {
                sourceItems: [],
                listen: function () {
                    on(this.domNode, 'blur', lang.hitch(this, 'blur'));
                    on(this.domNode, 'keypress', lang.hitch(this, 'keypress'));
                    on(this.domNode, 'keyup', lang.hitch(this, 'keyup'));
                    if(sniff('webkit') || sniff('ie')) {
                        on(this.domNode, 'keydown', lang.hitch(this, 'keydown'));
                    }
                    on(this.menuNode, on.selector('li', 'mouseover'), lang.hitch(this, 'mouseenter'));
                },
                
                process: function (items) {
                    items = array.filter(items, function (item) {
                        return this.matcher(item.value);
                    }, this);
                    items = this.sorter(items);
                    if (!items.length) {
                        return this.shown ? this.hide() : this;
                    }
                    this.render(items.slice(0, this.options.items)).show();
                },
                
                select: function (node) {
                    if(node.value) {
                        console.log(node.value);
                        this.domNode.value = node.value;
                        this.emit('changed', node);
                    }
                    return this.hide();
                },
                
                sorter: function (items) {
                    var beginswith = [],
                    caseSensitive = [],
                    caseInsensitive = [],
                    item;

                    while (item = items.shift()) {
                        if (!item.value.toString().toLowerCase().indexOf(this.query.toString().toLowerCase())) {
                            beginswith.push(item);
                        } else if (item.value.toString().indexOf(this.query) >= 0) {
                            caseSensitive.push(item);
                        } else {
                            caseInsensitive.push(item);
                        }
                    }
                    return beginswith.concat(caseSensitive, caseInsensitive);
                },
                
                render: function (items) {
                    this._reset();
                    array.forEach(items, lang.hitch(this, function(item){
                        var i = new TypeaheadItem({
                            label: this.highlighter(item.label),
                            value: item.value,
                            data: item.data
                        })
                        this.sourceItems.push(i);
                        this.menuNode.appendChild(i.domNode);
                        i.on('clicked', lang.hitch(this, this.select));
                    }));
                    
                    return this;
                },
                
                _reset: function() {
                    array.forEach(this.sourceItems, lang.hitch(this, function(item){
                        item.destroy();
                    }));
                    this.sourceItems = new Array();
                },
                
                click: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                },
                
                get: function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if (this.shown) {
                        return;
                    }
                    this.lookup();
                }
            }
            );
    });