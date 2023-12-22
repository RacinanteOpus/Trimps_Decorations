// ==UserScript==
// @name         Always Christmas, except during Easter and Halloween
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://trimps.github.io/
// @match        https://trimps.github.io/
// @match        https://trimpstest56.netlify.app/
// @icon         https://www.google.com/s2/favicons?domain=github.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    delete dailyModifiers.hemmorrhage;
    delete dailyModifiers.mirrored;
    delete dailyModifiers.empowered;

    // Your code here...
    //return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
    do {} while (typeof holidayObj == "undefined");
    holidayObj.holidays.Snowy.check = function(day, month) { return true;};
    holidayObj.holiday = "Snowy";
    holidayObj.checkActive("Snowy");
})();
