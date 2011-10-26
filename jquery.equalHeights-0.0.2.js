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
        
        for (var k in split) {

            var z = 0;
            var el = split[k];

            var paddingTop, paddingBottom, _thisHeight, _thisDiff, _thisTotal, heightAttr, marginTop, marginBottom;
            

            // check heigths
            for (var l in el) {

                el[l].addClass("eqH")
                    .data("eqH-original",{
                        "padding-top": el[l].css("padding-top"),
                        "padding-bottom": el[l].css("padding-bottom"),
                        "margin-top": el[l].css("margin-top"),
                        "margin-bottom": el[l].css("margin-bottom"),
                        "height": el[l].height()
                    });

            	// if padding not to be taken into account
                if (!options.accountForPadding) {
                	if (el[l].height() > z) {
	                    z = el[l].height();
	                }
	            // if padding is to be taken into account	
                } else {
                	paddingTop = parseInt(el[l].css("padding-top").replace("px", ""));
                	paddingBottom = parseInt(el[l].css("padding-bottom").replace("px", ""));
                	if (el[l].height() + paddingTop + paddingBottom > z ) {
                		z = el[l].height() + paddingTop + paddingBottom;
                	}
                } 
            }
            
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
            for (var l in el) {
                //el[l].height(z);
                if (!options.padding && !options.margin) {
                	$.support.minHeight ? heightAttr = "minHeight" : heightAttr = "height";
                    if (!options.animation) {
                        el[l].css(heightAttr, z + 'px');
                        } else {
                            el[l].animate(setupAnimation(heightAttr,z+"px"), options.animation, options.animationCallback(el[l]));
                        }
                } else if (options.padding) {
                    _thisHeight = el[l].height();
                    paddingTop = parseInt(el[l].css("padding-top").replace("px", ""));
                    paddingBottom = parseInt(el[l].css("padding-bottom").replace("px", ""));
                    _thisTotal = _thisHeight + paddingTop + paddingBottom;
                    //console.log("_this: ",z ," dif: ", _thisDiff);

                	if (options.padding == "bottom" || options.padding == "top") {
                		if (!options.animation) {
                            options.padding == "bottom" ? _thisDiff = z - _thisHeight - paddingTop : _thisDiff = z - _thisHeight - paddingBottom; 
                            el[l].css("padding-" + options.padding, _thisDiff.toString() + "px");      
                        } else {
                            options.padding == "bottom" ? _thisDiff = z - _thisHeight - paddingTop : _thisDiff = z - _thisHeight - paddingBottom;
                            el[l].animate(setupAnimation(options.padding,_thisDiff.toString() + "px"), options.animation, options.animationCallback(el[l]));
                        }
                	} else {
                       _thisDiff = ~~((z - _thisHeight - paddingTop - paddingBottom) / 2);
                       if (!options.animation) {                    		
                    		el[l].css("padding-top", _thisDiff.toString() + "px");                		
                    		el[l].css("padding-bottom",_thisDiff.toString() + "px");
                        } else {
                            
                        }
                	}
                } else if (options.margin) {
                    _thisHeight = el[l].height();
                    marginTop = parseInt(el[l].css("margin-top").replace("px", ""));
                    marginBottom = parseInt(el[l].css("margin-bottom").replace("px", ""));
                    _thisTotal = _thisHeight + marginTop + marginBottom;
                    //console.log("_this: ",z ," dif: ", _thisDiff);

                    if (options.margin == "bottom" || options.margin == "top") {
                        if (!options.animation) {
                            options.margin == "bottom" ? _thisDiff = z - _thisHeight - marginTop : _thisDiff = z - _thisHeight - marginBottom; 
                            el[l].css("margin-" + options.margin, _thisDiff.toString() + "px");      
                        } else {
                            options.margin == "bottom" ? _thisDiff = z - _thisHeight - marginTop : _thisDiff = z - _thisHeight - marginBottom;
                            el[l].animate(setupAnimation(options.margin,_thisDiff.toString() + "px"), options.animation, options.animationCallback(el[l]));
                        }
                    } else {
                        _thisDiff = ~~((z - _thisHeight - marginTop - marginBottom) / 2);
                        if (!options.animation) {                            
                            el[l].css("margin-top", _thisDiff.toString() + "px");                      
                            el[l].css("margin-bottom",_thisDiff.toString() + "px");
                        } else {
                            
                        }
                    }
                }
            }

        };
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