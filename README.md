czCheckbox jQuery plugin
===

Introduction
---

czCheckbox is a [jQuery](http://jquery.com) plugin that allows you to turn default browser checkbox into much more attractive.
    
The plugin is usable not only for end users, but also for developers. czCheckbox has a lot of configuration options so you can modify its behaviour and appearance. From this version the core CSS file is separated from the CSS that provides checkbox's appearance, and now you are able to easily create new skins for the plugin.
    
Examples
---

Please view demo page to see the possibilities of *czCheckbox*.
    
Installation
---

Please follow these instructions to install czCheckbox:

Download and unpack the archive.
Include jQuery and plugin files to your web page:

	<script type="text/javascript" src="/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="/js/jquery.czCheckbox.js"></script>
	

Include core or your skin CSS files to your page:

	<link rel="stylesheet" type="text/css" href="images/style.css" />
	<link rel="stylesheet" type="text/css" href="images/skin_name.css" />
	
Done! Now make your checkboxs look and behave sexy!
	
	$("#checkboxlist").czCheckbox();
	$("#checkboxlist").czCheckbox({
        changeCallback: function(){
            alert('changed')
    	}
	});

         
Usage and configuration options
---

*czCheckbox* has a number of configuration options that are passed to the plugin in the form of JavaScript object.
The full list of options is:   

**className** *String, Default: null*  
The class name of checkbox list wrap.  
**inputName** *String, Default: null*  
The name of checkbox you need.  
**initCallback** *Funtion, Default: null*  
function that is called at the end of constrictor.  
**emptyCallback** *Funtion, Default: null*  
function that is called when the checkbox has no choice.  
**forbidCallback** *Funtion, Default: null*  
function that is called when the disabled checkbox is selected.  
**changeCallback** *Funtion, Default: null*  
function that is called when the selection of checkbox is changed.  

In this version I have separated core CSS and presentational CSS, so now it's possible to create new skins for *czCheckbox*. The download package contains one example skin. Feel free to create your own based on it.
    
Browser compatibility
---

*czCheckbox* has been tested and works on the following browsers:

Internet Explorer 6.0 +
Chrome
Firefox
Opera

Support project
---

Every user of *czCheckbox* adds some value to it, so you help me by just using it. However, if you want to help more, you can do the following:

Tell the world about *czCheckbox*. You can write an atricle or a blog post about it or just tell your friends/collegues about it.
Test it on browsers that are not currently supported "officially".
Report a bug.
If you are web designer/developer, I will be glad to collaborate with you. If you have some suggestions on design/programming, feel free to email me at Kadalashvili at Vladimir at gmail dot com.

Please don't donate money, it's needless.
