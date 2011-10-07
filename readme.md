jQuery.equalHeights-0.0.2.js
===============================

The equal heights script to end all equal heights scripts. The plan is, once this one is done, I will never need to write another, as all the use cases should already be accounted for.

Usage
-------


    $(".equalHeights").equalHeights(options);

Defaults & Options
------------------


    $("ul li").equalHeights({
      cols: 2,			// any integer > 0
      accountForPadding: false,	// true , false
      padding: false,		// true / "both", "bottom", "top", false
      margin: false,		// true / "both", "bottom", "top", false
      animation: false,		// true / "slow", "normal", "fast", false
      animationCallback: undefined	// callback on completion of animation
    });

Examples
--------

To view the examples view the gh-pages url: [http://christopherdebeer.github.com/jquery.equalHeights.js](http://christopherdebeer.github.com/jquery.equalHeights.js)



Still to do
-------------

 * padding: "both"
 * margin: "both"
 * accountForPadding: true
 * combinations of paddings and margins
 * live mode to continually update heights on change
