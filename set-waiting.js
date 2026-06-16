function sleep(ms) {
    // Source - https://stackoverflow.com/a/39914235
    // Posted by Dan Dascalescu, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-06-09, License - CC BY-SA 4.0
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setLoading(val) {
    if (val) {
        document.getElementById("loading").style.opacity = "1";
        document.getElementById("loading").style.pointerEvents = "auto";
        document.getElementById("loading").style.backdropFilter= "blur(1vw)";
    }
    else {
        document.getElementById("loading").style.opacity = "0";
        document.getElementById("loading").style.pointerEvents = "none";
        document.getElementById("loading").style.backdropFilter= "none";
    }
}

const errorDiv = `<div id="close-error" onclick="setError(false, 0);">X</div>`;

function setError(val, error) {
    if (val) {
        document.getElementById("error").style.opacity = "1";
        document.getElementById("error").style.pointerEvents = "auto";
        document.getElementById("error").style.backdropFilter= "blur(1vw)";
        document.getElementById("error").innerHTML = `${errorDiv} <h1 color="var(--red)">Oh no!</h1><p>Aw, shucks! It seems like something went wrong in the upload process.<br>Try moving the mod folder to your Downloads (or another, less restricted place)!</p><p>${error}</p>`;
    }
    else {
        document.getElementById("error").style.opacity = "0";
        document.getElementById("error").style.pointerEvents = "none";
        document.getElementById("error").style.backdropFilter= "none";
        document.getElementById("error").innerHTML = `${errorDiv}`;
    }
}

const inputDiv = `<div id="close-input" onclick="submitMod(); setInput(false);">SUBMIT</div>`;

function setInput(val) {
    if (val) {
        document.getElementById("input").style.opacity = "1";
        document.getElementById("input").style.pointerEvents = "auto";
        document.getElementById("input").style.backdropFilter= "blur(1vw)";
        document.getElementById("input").innerHTML = `${inputDiv} <p style="letter-spacing: 0.1rem; font-size: calc(4vw + 4vh);">PLEASE ENTER THE FOLLOWING:</p><input id="DEVICE_NAME" type="text" placeholder="THE WORLD'S NAME"><input id="DEVICE_CREATOR" type="text" placeholder="THE WORLD'S MAKER"><textarea id="DEVICE_DESC" style="overflow-y: scroll;" type="text" placeholder="THE WORLD'S SUMMARY"></textarea><input id="DEVICE_INFO" type="text" placeholder="VERSION DATA"><span style="display: inline-flex; gap: calc(1vw + 1vh);"><div onclick="addImg()" style="cursor: pointer;">THE WORLD'S ICON</div><div onclick="addTrueImg()" style="cursor: pointer;">THE PREVIEW IMAGE</div></span>`;
    }
    else {
        document.getElementById("input").style.opacity = "0";
        document.getElementById("input").style.pointerEvents = "none";
        document.getElementById("input").style.backdropFilter= "none";
        document.getElementById("input").innerHTML = `${inputDiv}`;
    }
}