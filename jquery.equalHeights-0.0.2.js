/**
 * jquery.equalHeights
 *
 */
(function ($) {
    $.fn.equalHeights = function (options) {
        
        options = $.extend({
            cols: 2,                            // any integer > 0
            accountForPadding: true,            // true , false
            padding: false,                     // true / "both", "bottom", "top", false
            margin: false,                      // true / "both", "bottom", "top", false
            animation: false,                   // true / "slow", "normal", "fast", false
            live: false,                        // truem , false
            animationCallback: function(){}     // callback on completion of animation
        }, options);

        var split = {};
        var j = 0;
        if (options.animation === true) {options.animation = "slow";}
        

        this.each(function (i) {
            if (i % options.cols === 0) j++;
            if (!split[j]) split[j] = new Array();
            split[j].push($(this));
        });
        
		$.each(split, function (k, _element) {

            var z = 0;
            var el = _element;

            var paddingTop, paddingBottom, _thisHeight, _thisDiff, _thisTotal, heightAttr, marginTop, marginBottom;
            

            // check heigths
			$.each(el, function (l, _elem) {
			
                _elem.addClass("eqH")
                    .data("eqH-original",{
                        "padding-top": _elem.css("padding-top"),
                        "padding-bottom": _elem.css("padding-bottom"),
                        "margin-top": _elem.css("margin-top"),
                        "margin-bottom": _elem.css("margin-bottom"),
                        "height": _elem.height()
                    });

            	// if padding not to be taken into account
                if (!options.accountForPadding) {
                	if (_elem.height() > z) {
	                    z = _elem.height();
	                }
	            // if padding is to be taken into account	
                } else {
                	paddingTop = parseInt(_elem.css("padding-top").replace("px", ""));
                	paddingBottom = parseInt(_elem.css("padding-bottom").replace("px", ""));
                	if (_elem.height() + paddingTop + paddingBottom > z ) {
                		z = _elem.height() + paddingTop + paddingBottom;
                	}
                } 
            });
            
            //console.log("max: ", z);
            // set animation object if req.

            function setupAnimation (property, value) {
                var animationObject = {};
                
                if (options.padding){
                    if (property == "top") {
                        animationObject = {
                            paddingTop: value
                        }
                    } else if (property == "bottom") {
                        animationObject = {
                            paddingBottom: value
                        }
                    }
                } else if (options.margin) {
                    if (property == "top") {
                        animationObject = {
                            marginTop: value
                        }
                    } else if (property == "bottom") {
                        animationObject = {
                            marginBottom: value
                        }
                    }
                } else if ($.support.minHeight) {
                    animationObject = {
                        minHeight: value
                    }
                } else {
                    animationObject = {
                        height: value
                    }
                }
                return animationObject;
            }


            // set heights
			$.each(el, function (l, _elem) {
                //el[l].height(z);
                if (!options.padding && !options.margin) {
                	$.support.minHeight ? heightAttr = "minHeight" : heightAttr = "height";
                    if (!options.animation) {
                        _elem.css(heightAttr, z + 'px');
                        } else {
                            _elem.animate(setupAnimation(heightAttr,z+"px"), options.animation, options.animationCallback(_elem));
                        }
                } else if (options.padding) {
                    _thisHeight = _elem.height();
                    paddingTop = parseInt(_elem.css("padding-top").replace("px", ""));
                    paddingBottom = parseInt(_elem.css("padding-bottom").replace("px", ""));
                    _thisTotal = _thisHeight + paddingTop + paddingBottom;
                    //console.log("_this: ",z ," dif: ", _thisDiff);

                	if (options.padding == "bottom" || options.padding == "top") {
                		if (!options.animation) {
                            options.padding == "bottom" ? _thisDiff = z - _thisHeight - paddingTop : _thisDiff = z - _thisHeight - paddingBottom; 
                            _elem.css("padding-" + options.padding, _thisDiff.toString() + "px");      
                        } else {
                            options.padding == "bottom" ? _thisDiff = z - _thisHeight - paddingTop : _thisDiff = z - _thisHeight - paddingBottom;
                            _elem.animate(setupAnimation(options.padding,_thisDiff.toString() + "px"), options.animation, options.animationCallback(_elem));
                        }
                	} else {
                       _thisDiff = ~~((z - _thisHeight - paddingTop - paddingBottom) / 2);
                       if (!options.animation) {                    		
                    		_elem.css("padding-top", _thisDiff.toString() + "px");                		
                    		_elem.css("padding-bottom",_thisDiff.toString() + "px");
                        } else {
                            
                        }
                	}
                } else if (options.margin) {
                    _thisHeight = _elem.height();
                    marginTop = parseInt(_elem.css("margin-top").replace("px", ""));
                    marginBottom = parseInt(_elem.css("margin-bottom").replace("px", ""));
                    _thisTotal = _thisHeight + marginTop + marginBottom;
                    //console.log("_this: ",z ," dif: ", _thisDiff);

                    if (options.margin == "bottom" || options.margin == "top") {
                        if (!options.animation) {
                            options.margin == "bottom" ? _thisDiff = z - _thisHeight - marginTop : _thisDiff = z - _thisHeight - marginBottom; 
                            _elem.css("margin-" + options.margin, _thisDiff.toString() + "px");      
                        } else {
                            options.margin == "bottom" ? _thisDiff = z - _thisHeight - marginTop : _thisDiff = z - _thisHeight - marginBottom;
                            _elem.animate(setupAnimation(options.margin,_thisDiff.toString() + "px"), options.animation, options.animationCallback(_elem));
                        }
                    } else {
                        _thisDiff = ~~((z - _thisHeight - marginTop - marginBottom) / 2);
                        if (!options.animation) {                            
                            _elem.css("margin-top", _thisDiff.toString() + "px");                      
                            _elem.css("margin-bottom",_thisDiff.toString() + "px");
                        } else {
                            
                        }
                    }
                }
            });

        });
        $.fn.equalHeights.reset = function () {
            $(".eqH").each(function(i,el){

                var originalStyles;
                if (originalStyles = $(el).data("eqHOriginal")) {

                    $.each(originalStyles, function(key,val) {
                        $(el).css(key,val);
                    });
                    $.removeData(el, "eqHOriginal");

                }               
                    
            });
        }

    }
})(jQuery);