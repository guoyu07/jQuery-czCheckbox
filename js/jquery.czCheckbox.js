/**
 * $.czCheckedbox
 * @extends jquery.1.4.2
 * @fileOverview Make checkboxs more beautiful and functional
 * @author Lancer
 * @email lancer.he@gmail.com
 * @site crackedzone.com
 * @version 2.0
 * @date 2012-07-05
 * Copyright (c) 2011-2012 Lancer
 * @example
 *    $("#list").czCheckbox();
 */


(function($){
    //set Namespace.
    var czUI = czUI || {};

    $.fn.czCheckbox = function( options ) {

        var PNAME   = "czCheckbox";
        var objData = $( this ).data(PNAME);

        //get instance object
        if( typeof options == 'string' && options == 'instance' ){
            return objData;
        }

        var options = $.extend( {}, czUI.czCheckbox.defaults, options || {} );

        return $( this ).each(function(){
            var czCheckbox = new czUI.czCheckbox( options );
            czCheckbox.$elements = $(this);
            czCheckbox._init();
            $(this).data( PNAME, czCheckbox );
        });
    }

    czUI.czCheckbox = function( options ) {
        this.NAME      = 'czCheckbox';
        this.VERSION   = '2.0';
        this.options   = options;
        this.$elements = null;
        this.$active   = null;
        this._$checkboxs = Array();  //real checkboxs
        this._$labels    = Array();  //checkbox labels
        this._$wraps     = Array();  //new checkboxs
    };

    czUI.czCheckbox.defaults = {
        inputName      : '',
        className      : '',
        initCallback   : null,
        changeCallback : null,
        emptyCallback  : null,
        forbidCallback : null
    }

    czUI.czCheckbox.prototype = {

        _init : function() {
            var _that = this;
            this.$elements.addClass('czCheckbox').addClass( _that.options.className );
            //initialize $elements.
            if ( this.options.inputName ) {
                this.$elements = $(':checkbox[name=' + this.options.inputName + ']', this.$elements[0]);
            } else {
                this.$elements = $(':checkbox', this.$elements[0]);
            }

            this.$elements.each(function(item) {
                //set real checkboxs.
                _that._$checkboxs[item] = $( this ).hide();
                _that._$wraps[item]     = $( this ).wrap('<span></span>').parent();
                _that._$wraps[item].css({
                    "display"  : "inline-block",
                    "overflow" : "hidden",
                    "cursor"   : "pointer"}).addClass( 'default' );

                //Add new checkbox checked style and disabled style.
                if( _that._$checkboxs[item].is(':disabled') == false ) {
                    if( _that._$checkboxs[item].is(':checked')) _that._setCheckedClass(item);
                } else {
                    _that._setDisabledClass(item);
                }

                //set label which checkbox has.
                $label = $("label[for='" + _that._$checkboxs[item].attr('id') + "']");
                if ( typeof $label == 'object' && $label.attr('tagName') == 'LABEL') {
                    _that._$labels[item] = $label.removeAttr('for').css('cursor', 'pointer');
                } else {
                    _that._$labels[item] = null;
                }

                //bind click event for $wrap and $label
                _that._$wraps[item].add( _that._$labels[item] ).bind('click', function(){
                    _that._clickEvent(item);
                });
            });

            this._callback('init');
        },

        _clickEvent : function(item) {
            this.$active  = item;

            if( this._$checkboxs[item].is(':disabled') == false ) {
                if( ! this._$checkboxs[item].is(':checked') ) {
                    this.setChecked(item);
                } else {
                    this.setUnChecked(item);
                    if ( this.getCheckedCounts() == 0 )
                        this._callback('empty');
                }
                this._callback('change');
            } else {
                this._callback('forbid');
            }
        },

        _getObjectIndex: function( item ) {
            for ( i in this._$checkboxs ) {
                if( typeof item == 'object' && this._$checkboxs[i].val() == item.val() ) {
                    return i;
                } else if( this._$checkboxs[i].val() == item ) {
                    return i;
                }
            }
            return false;
        },

        setAbled: function(item) {
            if ( typeof item == 'undefined') return;
            if ( typeof item != 'number' ) {
                var item = this._getObjectIndex(item);
            }
            if ( item == false) return;
            this._setAbledClass(item);
            this._$checkboxs[item].removeAttr('disabled');
        },

        _setCheckedClass: function(item) {
            if( this._$checkboxs[item].is( ':disabled' ) == false )
                this._$wraps[item].attr( 'class', 'default default_checked' );
            else
                this._$wraps[item].attr( 'class', 'default disabled_checked' );
        },

        _setUnCheckedClass: function(item) {
            if( this._$checkboxs[item].is( ':disabled' ) == false )
                this._$wraps[item].attr( 'class', 'default' );
            else
                this._$wraps[item].attr( 'class', 'default disabled' );
        },

        _setDisabledClass: function(item) {
            if( this._$checkboxs[item].is( ':checked' ) == false )
                this._$wraps[item].attr( 'class', 'default disabled' );
            else
                this._$wraps[item].attr( 'class', 'default disabled_checked' );
        },

        _setAbledClass: function(item) {
            if( this._$checkboxs[item].is( ':checked' ) == false )
                this._$wraps[item].attr( 'class', 'default' );
            else
                this._$wraps[item].attr( 'class', 'default default_checked' );
        },

        _callback: function(evt) {
            if ( ! $.isFunction(this.options[evt + "Callback"]))
                return;

            this.options[evt + "Callback"].call(this);
        },

        setChecked: function(item) {
            if ( typeof item == 'undefined') return;
            if ( typeof item != 'number' ) {
                var item = this._getObjectIndex(item);
            }
            if ( item === false ) return;

            this._setCheckedClass(item);
            this._$checkboxs[item].attr('checked', true);
        },

        setUnChecked: function(item) {
            if ( typeof item == 'undefined') return;
            if ( typeof item != 'number' ) {
                var item = this._getObjectIndex(item);
            }
            if ( item === false ) return;
            this._setUnCheckedClass(item);
            this._$checkboxs[item].removeAttr('checked');
        },

        setDisabled: function(item) {
            if ( typeof item == 'undefined') return;
            if ( typeof item != 'number' ) {
                var item = this._getObjectIndex(item);
            }
            if ( item == false ) return;
            this._setDisabledClass(item);
            this._$checkboxs[item].attr('disabled', true);
        },

        getCheckedValue : function() {
            var checked = new Array();
            for ( i in this._$checkboxs ) {
                if( this._$checkboxs[i].is(':checked') == true ) {
                    checked.push( this._$checkboxs[i].val() );
                }
            }
            return checked;
        },

        getCheckedText : function() {
            var checked = new Array();
            for ( i in this._$checkboxs ) {
                if( this._$checkboxs[i].is(':checked') == true ) {
                    checked.push( this._$labels[i].text() );
                }
            }
            return checked;
        },

        getCheckedCounts : function() {
            return this.getCheckedValue().length;
        },

        getObject : function() {
            if ( this.$active == null ) return false;
            return this._$checkboxs[this.$active];
        },

        getValue : function() {
            if ( this.getObject() == false ) return null;
            return this.getObject().val();
        },

        isCheck : function() {
            if ( this.getObject() == false ) return null;
            return this.getObject().is(':checked');
        }
    }
})(jQuery);
