// ==UserScript==
// @name         Auto Catcher
// @namespace    https://github.com/cstiago
// @version      1.0
// @description  Auto retro and legendary pokémon hunter for DelugeRPG
// @author       Tiago Rocha Cunha
// @match        https://www.delugerpg.com/map/*
// @match        https://www.delugerpg.com/catch/*
// @match        https://www.delugerpg.com/catch
// @icon         https://www.google.com/s2/favicons?domain=delugerpg.com
// @grant        none
// ==/UserScript==

(function() {
    "use strict";

    /* Auxiliary Functions */

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function backToMap() {
        window.location.href = localStorage.getItem("map");
    }

    /* Core Function */

    var count = 0; // Counts seen pokémons

    async function delugeFinder() {
        let showing = document.querySelector("#showpoke").textContent;

        while (showing.indexOf("Searching...") !== -1) {
            await sleep(100);
        }

        if (showing.indexOf("Couldn't find anything.") === -1) {
            let pokemon = document.querySelector("#dexy").textContent;
            let icon = document.querySelector("#spicons").innerHTML;

            let isRetro = (pokemon.indexOf("Retro") !== -1) ? true : false;
            let isLegend = (icon.indexOf("fa-star") !== -1) ? true : false;

            if (pokemon.charAt(0) === " ") {
                pokemon = pokemon.substring(1);
            }

            count++;

            let message = count + " - " + pokemon;

            if (count < 10) {
                message = "0" + message;
            }

            console.log(message);

            if (isRetro || isLegend) {
                (isRetro) ? localStorage.setItem("retro", true) : localStorage.setItem("retro", false);
                (isLegend) ? localStorage.setItem("legend", true) : localStorage.setItem("legend", false);

                document.querySelector("#catch").click(); // Redirects to capture homepage
            }
        }
    }

    /* Program Execution */

    setTimeout(async () => {

        let interval = 600;

        if (window.location.href.indexOf("/map/") !== -1) { // On map

            localStorage.clear();
            localStorage.setItem("map", window.location.href);

            while (true) {
                document.querySelector("#dr-e").click(); // Moves to east direction
                await sleep(interval);

                delugeFinder();
                await sleep(interval);

                document.querySelector("#dr-w").click(); // Moves to west direction
                await sleep(interval);

                delugeFinder();
                await sleep(interval);
            }
        }

        else if (window.location.href.indexOf("/catch/") !== -1) { // Capture homepage

            await sleep(3000);

            document.querySelector("[value='Start Battle']").click(); // Redirects to battle page
        }

        else if (window.location.href === "https://www.delugerpg.com/catch") { // Battle page

            let isRetro = JSON.parse(localStorage.getItem("retro"));
            let isLegend = JSON.parse(localStorage.getItem("legend"));

            if (!document.querySelector(".notify_warning")) {

                if (!document.querySelector(".btn-default")) {

                    if (isLegend) {
                        document.querySelector("#item-masterball").click(); // Selects Master Ball
                    }
                    else {
                        document.querySelector("#item-ultraball").click(); // Selects Ultra Ball
                    }

                    await sleep(interval);
                    document.querySelector("[value='Throw Pokeball']").click(); // Throws Poke Ball
                }
                else {
                    if (!isRetro) {
                        document.querySelector(".btn-default").click(); // Redirects caught pokemon to trade page
                    }

                    backToMap();
                }
            }
            else {
                backToMap();
            }
        }

        else if (window.location.href.indexOf("refmap") !== -1) {
            backToMap();
        }
    }, 1500); // Delays start
})();