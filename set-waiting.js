let menuIsUp = false
function showUI(id) {
    menuIsUp = true;
    disableOutsideTabbing(id);
    document.getElementById(id).style.opacity = "1";
    document.getElementById(id).style.pointerEvents = "auto";
    document.getElementById(id).style.backdropFilter= "blur(1vw)";
    
    let items = document.getElementById(id).querySelectorAll('.notClickableItem');
    let items2 = document.getElementById(id).querySelectorAll('.notClickableItemP2');
    
    for (const item of items) {
        item.classList.remove('notClickableItem');
        item.classList.add('clickableItem');
    }
    for (const item of items2) {
        item.classList.remove('notClickableItemP2');
        item.classList.add('clickableItemP2');
    }

}

function hideUI(id, removeInner = false) {
    menuIsUp = false;
    makeAllTabbable();
    document.getElementById(id).style.opacity = "0";
    document.getElementById(id).style.pointerEvents = "none";
    document.getElementById(id).style.backdropFilter= "none";
    customDir = false;
    if (removeInner) document.getElementById(id).innerHTML = ``;
}

function disableOutsideTabbing(id) {
    const focusedElement = document.activeElement;
    if (focusedElement) {
        focusedElement.blur();
    }
    
    const container = document.getElementById(id);
    if (!container) {
        console.warn(`Element with id "${id}" not found.`);
        return;
    }

    const list = document.querySelectorAll('.clickableItem');
    list.forEach(item => {
        if (!container.contains(item)) {
            item.classList.remove('clickableItem');
            item.classList.add('notClickableItem');
            item.setAttribute('tabindex', '-1');
        }
    });
    
    const listP2 = document.querySelectorAll('.clickableItemP2');
    listP2.forEach(item => {
        if (!container.contains(item)) {
            item.classList.remove('clickableItemP2');
            item.classList.add('notClickableItemP2');
            item.setAttribute('tabindex', '-1');
        }
    });
}

function makeAllTabbable() {
    const list = document.querySelectorAll('.notClickableItem');

    list.forEach(item => {
        item.classList.remove('notClickableItem');
        item.classList.add('clickableItem');
        item.setAttribute('tabindex', '0');
    });
    
    const listP2 = document.querySelectorAll('.notClickableItemP2');

    listP2.forEach(item => {
        item.classList.remove('notClickableItemP2');
        item.classList.add('clickableItemP2');
        item.setAttribute('tabindex', '0');
    });
}

function sleep(ms) {
    // Source - https://stackoverflow.com/a/39914235
    // Posted by Dan Dascalescu, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-06-09, License - CC BY-SA 4.0
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setLoading(val) {
    if (val) showUI('loading');
    else hideUI('loading');
}

const errorDiv = `<div tabindex="0" role="button" class="clickableItem clickableItemP2" id="close-error" onclick="setError(false, 0);">X</div>`;

function setError(val, error) {
    if (val) {
        showUI('error');
        
        document.getElementById("error").innerHTML = `
        <h1 color="var(--red)">Oh no!</h1>
        <p>Aw, shucks! It seems like something went wrong in the upload process.
        <br>Try moving the mod folder to your Downloads (or another, less restricted place)!</p>
        <p>${error}</p>
        ${errorDiv}`;
    } else hideUI('error', true);
}

const inputDiv = `<div tabindex="0" role="button" class="clickableItem clickableItemP2" id="close-input" onclick="submitMod(); setInput(false);">SUBMIT</div>`;

function setInput(val) {
    if (val) {
        showUI('input');
        
        for (exe of m_scan) {
            document.getElementById("exeClickMenu").insertAdjacentHTML("beforeend", `
            <button onclick="m_scan = ['${exe[1].replace(/\\/g, '/')}']; document.getElementById('chooseExe')?.remove();">
                <img src="rcm_saves.png">
                <figcaption>${exe[0]}</figcaption>
            </button>`);
        }
        
        
        let scanButton = ""
        
        if (m_scan.length > 1) {
            scanButton = `
                <div tabindex="0"
                id="chooseExe"
                role="button"
                class="clickableItem clickableItemP2 red-button red-buttonNoAction"
                onclick="document.getElementById('exeClickMenu').showModal(); chooseTheExe(event);"
                style="cursor: pointer;">
                CHOOSE EXECUTABLE
                </div>
            `;
        }
        
        document.getElementById("input").innerHTML = `
        <p style="letter-spacing: 0.1rem; font-size: calc(4vw + 4vh);">PLEASE ENTER THE FOLLOWING:</p>
        <span style="display: inline-flex; margin: 0; gap: calc(1vw + 1vh);">
            <span style="display: inline-flex; gap: calc(1vw + 1vh); flex-direction: column;">
                <input tabindex="0" role="textbox" class="clickableItem clickableItemP2" id="DEVICE_NAME" type="text" placeholder="THE WORLD'S NAME">
                <input tabindex="0" role="textbox" class="clickableItem clickableItemP2" id="DEVICE_CREATOR" type="text" placeholder="THE WORLD'S MAKER">
                <input tabindex="0" role="textbox" class="clickableItem clickableItemP2" id="DEVICE_INFO" type="text" placeholder="VERSION DATA">
            </span>
            <textarea tabindex="0" role="textbox" class="clickableItem clickableItemP2" id="DEVICE_DESC" style="overflow-y: scroll; width: calc(30vw + 30vh);" type="text" placeholder="THE WORLD'S SUMMARY"></textarea>
        </span>
        <span style="display: inline-flex; margin: 0; gap: calc(1vw + 1vh);">
            <div tabindex="0" role="button" class="clickableItem clickableItemP2" onclick="addImg()" style="cursor: pointer;">THE WORLD'S ICON</div>
            <div tabindex="0" role="button" class="clickableItem clickableItemP2" onclick="addTrueImg()" style="cursor: pointer;">THE PREVIEW IMAGE</div>
            ${scanButton}
        </span>${inputDiv}`;
    } else hideUI('input', true);
}