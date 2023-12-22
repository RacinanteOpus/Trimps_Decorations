// ==UserScript==
// @name         Map Decorations part Deux
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://trimps.github.io/
// @match        http://trimps.github.io/
// @match        https://trimpstest58.netlify.app/
// @icon         https://www.google.com/s2/favicons?domain=netlify.app
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

setInterval(guiLoop, 500);
var MODULES = {};

function guiLoop(){
	MODULES.fightinfo.Update();
        easterEggClicked();}

(function(M)
{
	M.fightinfo = {};
	M.fightinfo.$worldGrid = document.getElementById('grid');
	M.fightinfo.$mapGrid = document.getElementById('mapGrid');

	function checkMap (cell) {
        let elem = document.getElementById(cell);
        try {
            let processed = elem.dataset.processed;
            if (processed == "true") {
                return true;
            } else {
                elem.setAttribute("data-processed","true");
                return false;
            }
        }
        catch {
            elem.setAttribute("data-processed","true");
            return false;
        }
	}

	function isMapFast(mapId) {
		if (mapId == "") return;
		// getMapIndex is a trimp function
		var map = game.global.mapsOwnedArray[getMapIndex(mapId)];
		// is the void deadly
		if (map.location.toLowerCase() == "void")
			{return (map.name.toLowerCase().indexOf("deadly") > -1);}
		return false;
	}

	function isImpFast(imp) {
		var a = (game.badGuys[imp].fast
				|| game.global.voidBuff == "doubleAttack")
				? true : false;
		return a;
	}

	function isImpExotic(imp) {
		var a = game.unlocks.imps.hasOwnProperty(imp);
		//alert(imp+" "+a);
		return game.unlocks.imps.hasOwnProperty(imp);
	}
	//console.log(testMe(0) + " " + testMe(1));

	function classifyImp(imp) {
		var a =
		    (isImpExotic(imp)) ? "Exotic" :
				(imp.toLowerCase().indexOf("turk") > -1) ? "Turk":
				(imp.toLowerCase().indexOf("hulk") > -1) ? "Hulk" :
				(imp.toLowerCase().indexOf("megaskele") > -1) ? "MSkele" :
				(imp.toLowerCase().indexOf("skele") > -1) ? "Skele":
				(imp.toLowerCase().indexOf("presi") > -1) ? "Pres" :
				(imp.toLowerCase().indexOf("voidsnimp") > -1) ? "VSnimp" :
				(isImpFast(imp)) ? "Fast" :
				(isMapFast(game.global.currentMapId)) ? "Deadly" : "Base";
		return a;
	}

		function UpdateCell (cell, imp) {
			var impType = classifyImp(imp);
			if (impType == "Base") return;

			 // size options x-large, medium, xx-small, larger, smaller
			var glyphData = {"Fast":["glyphicon-forward", "Maroon", "small"],
							 "Turk":["icon-spoon-knife", "SaddleBrown", "small"],
							 "Skele":["glyphicon-italic", "Goldenrod", "small"],
							 "MSkele":["glyphicon-bold", "DarkGoldenrod", "small"],
							 "Exotic":["glyphicon-sunglasses", "DarkOrange", "small"],
                             "VSnimp":["glyphicon-fast-forward", "Magenta", "small"],
							 "Pres":["icon-gift", "Black", "small"],
                             "Deadly":["glyphicon-pushpin", "Pink", "small"],
                             "Hulk":["glyphicon-alert", "Lime", "small"]}[impType];

            var myElement = document.createElement("SPAN");
            var target = document.getElementById(cell);
            if (target.children.length == 1) {
                myElement.appendChild(document.createTextNode(" "));
                target.appendChild(myElement);
                myElement = document.createElement("SPAN");
            }

			//if (glyph > "h") {myType = "icomoon";} else {myType = "glyphicon";}
			myElement.classList.add((glyphData[0] > "h") ? "icomoon" : "glyphicon");
			myElement.classList.add(glyphData[0]);
			myElement.style.color = glyphData[1];
//			myElement.style.fontSize = glyphData[2];
			document.getElementById(cell).appendChild(myElement);
		}
/**
	function UpdateCell (cell, glyph, repeats=1) {
        var target = document.getElementById(cell);
        var myElement;
		var myType = "";
		for (var i = 0; i < repeats; i++) {
            myElement = document.createElement("SPAN");
            if (target.children.length == 1 && i==0) {
                myElement.appendChild(document.createTextNode(" "));
                target.appendChild(myElement);
                myElement = document.createElement("SPAN");
            }
            if (glyph > "h") {myType = "icomoon";} else {myType = "glyphicon";}
            myElement.classList.add(myType);
            myElement.classList.add(glyph);
            switch (glyph) {
                case 'icon-gift':
                    myElement.style.color = "DeepSkyBlue";
                    myElement.style.fontweight = "bold";
                    break;
                case 'glyphicon-star':
                    myElement.style.color = "Aqua";
                    break;
                case 'glyphicon-italic':
                    myElement.style.color = "GoldenRod";
                    break;
                case 'icomoon-spoon-knife':
                    myElement.style.color = "SaddleBrown";
                    break;
                default:
                    myElement.style.color = "maroon";
            }
            target.appendChild(myElement)

        }
	}
**/
	function Update()
	{
        var cells = {};
        var $rows = {};

		// Check if we should update world or map info
		if(game.global.mapsActive) {
			cells = game.global.mapGridArray;
			$rows = Array.prototype.slice.call(M.fightinfo.$mapGrid.children);
		}
		else
		{
			cells = game.global.gridArray;
			$rows = Array.prototype.slice.call(M.fightinfo.$worldGrid.children);
		}

		// Rows are in inverse order somewhy
		$rows = $rows.reverse();

		// DOM cells
		var $cells = [];

		// Loop through DOM rows and concat each row's cell-element into $cells
		$rows.forEach(function(x)
		{
			$cells = $cells.concat(Array.prototype.slice.call(x.children));
		});

	    console.log($cells[0].id);
        var processed = checkMap($cells[0].id);

        if (processed) {return;}

        var mut = "";

		var mutationData = {"RGE":["Raging", "Rag", "", ""],
					        "NVA":["Novad", "Nov", "ova", "vad"],
							"NVX":["Novad", "Nov", "ova", "vad"],
							"CSP":["Randomized", "Rand", "dom", "ized"],
							"CSX":["Randomized", "Rand", "dom", "ized"],
                            "CMP":["Compressed", "", "pressed", "pressed"],
							"CMX":["Compressed", "", "pressed", "pressed"]};

		// Process all cells
		for(var i = 0; i < $cells.length; i++)
		{
			// DOM cell
			var $cell = $cells[i];
			var $cellID = $cell.id;

			// Cell data
			var cell = cells[i];
            var mutation = "";
            var mutName=cell.name;
            if (cell.u2Mutation && cell.u2Mutation.length) {
                console.log(cell.u2Mutation.length);
                switch (cell.u2Mutation.length-1) {
                    case 0:
                        mutation = mutationData[cell.u2Mutation[0]][0];
                        break;
                    case 1:
                        mutation = mutationData[cell.u2Mutation[0]][1];
                        mutation += mutationData[cell.u2Mutation[1]][3];
                        break;
                    case 2:
                        mutation = mutationData[cell.u2Mutation[0]][1];
                        mutation += mutationData[cell.u2Mutation[1]][2];
                        mutation += mutationData[cell.u2Mutation[2]][3];
                        break;
                    default:
                        mutation = "";
                }
                mutName = mutation + " " + cell.name;
            }
            $cell.title = mutName;
            //Provides mouse over text that reveals the imp in the cell.
            UpdateCell($cellID,cell.name);
		}
	}

	M.fightinfo.Update = Update;
})(MODULES);
})();
