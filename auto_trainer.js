// ==UserScript==
// @name         Auto Trainer
// @namespace    https://github.com/cstiago
// @version      1.0
// @description  Auto pokémon trainer for DelugeRPG
// @author       Tiago Rocha Cunha
// @match        https://www.delugerpg.com/battle/*
// @icon         https://www.google.com/s2/favicons?domain=delugerpg.com
// @grant        none
// ==/UserScript==

(function() {
    setTimeout(() => {
        if (window.location.href !== "https://www.delugerpg.com/battle/user/u/")
        {
            if (document.querySelector('.btn-battle-action'))
            {
                document.querySelector('.btn-battle-action').click();
            }

            else if (document.querySelector('.btn.btn-primary'))
            {
                document.querySelector('.btn.btn-primary').click();
            }

            else
            {
                alert('Hmmm...');
            }
        }
        else {
            window.location.href = "https://www.delugerpg.com/battle/user/username/S-Normal"; // Set the pokémon's attack type here
        }
    }, 1500); // Delays start
})();