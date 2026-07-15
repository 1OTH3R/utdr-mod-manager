const modJsonPath = path.join(modFolder, 'mods.json');

function giveAssetDir(id) {
    let ze_path = path.join(modFolder, `mod${id}`, "[UTDRMM] Assets");
    return ze_path;
}

function giveSaveDir(id) {
    let ze_path = path.join(modFolder, `mod${id}`, "[UTDRMM] Saves");
    return ze_path;
}

function frogFiles(source, dest) {
    try {
        fs.rmSync(dest, { recursive: true, force: true });
    } catch (error) {
        console.error("Error nuking destination directory:", error);
        return 1; // pain
    }

    try {
        fs.renameSync(source, dest);
    } catch (renameError) {
        console.log("Rename failed (likely cross-device), trying backup copy...", renameError.message);
        
        try {
            fs.cpSync(source, dest, { recursive: true });
            fs.rmSync(source, { recursive: true, force: true });
        } catch (fallbackError) {
            console.error("Backup copy also failed! Attempting to restore empty dest...", fallbackError);
            try {
                fs.mkdirSync(dest, { recursive: true });
            } catch (destErr) {
                console.error("Could not even recreate dest folder 😭:", destErr);
            }
            return 1; // i tried so hard, and got so far... but in the end, it doesn't even matter!
        }
    }

    try {
        fs.mkdirSync(source, { recursive: true });
    } catch (mkdirError) {
        console.error("Failed to recreate source folder. Rolling back files...", mkdirError);
        
        try {
            fs.renameSync(dest, source);
            fs.mkdirSync(dest, { recursive: true });
        } catch (rollbackError) {
            console.error("CRITICAL: Rollback failed! Files may be stuck in dest.", rollbackError);
        }
        return 1; // dude if we seriously hit this thats just sad
    }
    
    console.log(`FrogFiles successfully hopped the files! (${source} ~> ${dest})`);
}


function showMod(name, creator, icon, desc, path, img, info, exe, id, click) {
    const modsContainer = document.getElementById("mods");
    document.getElementById("mods").insertAdjacentHTML("beforeend", `
    <div tabindex="0" role="button" class="mod clickableItem" onclick="clickMod(this)" onfocus="playSound('hover');" onmouseenter="playSound('hover');" data-title="${name}" data-creator="${creator}" data-desc="${desc}" data-path="${path}" data-img="${img}" data-info="${info}" data-exe="${exe}" data-id="${id}">
        <img tabindex="-1" src="${icon}" class="no-interact">
        <p tabindex="-1" style="flex: 1;" class="no-interact">${name}</p>
        <p tabindex="-1" style="text-align: right; flex: 0.7;" class="no-interact">${creator}</p></div>`);
     const newElement = modsContainer.lastElementChild;
     if (newElement && click) {
        newElement.click();
    }
}

let foldPath = null;

let m_scan = null;

function addMod() {
    const folderInput = document.createElement('input');
    folderInput.type = 'file';
    folderInput.nwdirectory = true;
    folderInput.addEventListener('change', function() {
        let foldPath = path.join(modFolder, `mod${getCritNum()}`);
        fs.cp(folderInput.value, foldPath, { recursive: true }, function(err) {
            if (err) {
                console.log('Error:', err.message);
                setLoading(false);
                setError(true, err);
                return;
            }
            console.log('Mod folder added:', folderInput.value);
            folderInput.remove();
            fs.mkdirSync(path.join(foldPath, "[UTDRMM] Assets"), { recursive: true });
            fs.mkdirSync(path.join(foldPath, "[UTDRMM] Saves"), { recursive: true });
            try {
                let files = fs.readdirSync(foldPath, { recursive: true });
                let steamDlls = files.filter(file => path.basename(file).toLowerCase() === 'steam_api.dll');
                
                if (steamDlls.length > 0) {
                    for (let dll of steamDlls) {
                        fs.rmSync(path.join(foldPath, dll));
                    }
                    console.log(`Removed ${steamDlls.length} Steam API file(s). Thank goodness.`);
                } else console.log("No Steam interference found. Thank goodness.");
            } catch (err) { console.log("Failed to scan/remove Steam files:", err.message); }
            m_scan = { "path": foldPath }
            m_scan = scan_exe(m_scan);
            setLoading(false);
            if (m_scan === 1) {
                fs.rmSync(foldPath, { recursive: true, force: true });
                return;
            } else setInput(true);
        });
    });
    folderInput.addEventListener('cancel', function() {
        console.log('Folder selection canceled.');
        folderInput.remove();
        setLoading(false);
    });
    folderInput.click();
}

let imgPath = null;
let trueImgPath = null;

function addImg() {
    const imgInput = document.createElement('input');
    imgInput.type = 'file';
    imgInput.accept = '.jpg,.jpeg,.png,.gif,.webp';
    imgInput.nwdirectory = false;
    imgInput.addEventListener('change', function() {
        setLoading(true);
        critNum = getCritNum();
        fs.cp(imgInput.files[0].path, path.join(giveAssetDir(critNum), `mod${critNum}${path.extname(imgInput.files[0].path)}`), function(err) {
            if (err) {
                console.log('Error:', err.message);
                setLoading(false);
                setError(true, err);
                return;
            }
            console.log('Mod img added:', imgInput.files[0].path);
            imgInput.remove();
            setLoading(false);
            if (imgInput.files[0].path) { imgPath = path.join(giveAssetDir(critNum), `mod${critNum}${path.extname(imgInput.files[0].path)}`); }
        });
    });
    imgInput.click();
}

function addTrueImg() {
    const imgInput = document.createElement('input');
    imgInput.type = 'file';
    imgInput.accept = '.jpg,.jpeg,.png,.gif,.webp';
    imgInput.nwdirectory = false;
    imgInput.addEventListener('change', function() {
        setLoading(true);
        critNum = getCritNum();
        fs.cp(imgInput.files[0].path, path.join(giveAssetDir(critNum), `mod${critNum}-cover${path.extname(imgInput.files[0].path)}`), function(err) {
            if (err) {
                console.log('Error:', err.message);
                setLoading(false);
                setError(true, err);
                return;
            }
            console.log('Mod img added:', imgInput.files[0].path);
            imgInput.remove();
            setLoading(false);
            if (imgInput.files[0].path) { trueImgPath = path.join(giveAssetDir(critNum), `mod${critNum}-cover${path.extname(imgInput.files[0].path)}`); }
        });
    });
    imgInput.click();
}


function submitMod() {
    const mname = document.getElementById('DEVICE_NAME').value || "Unnamed Mod";
    const mcreator = document.getElementById('DEVICE_CREATOR').value || "Unknown Creator";
    const mdesc = document.getElementById('DEVICE_DESC').value || "No mod description provided. I'm sure the mod is epic though!";
    const minfo = document.getElementById('DEVICE_INFO').value || "No version data provided.";
    const micon = imgPath || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAXCAYAAAAV1F8QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGHaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj48dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9J3cnPz4slJgLAAABRklEQVRIS61VWw7DMAizc/87sw8g4ZVOm2ppyyBgA+lSEhDAvgCAatjSoH6CkL5PAnK8zkGq3eJfBylbNAkSwN76AXMeAcjKtkEAbv2AYk4g5+KCkAcoW7bC4XS5Y0s6ooS1T8qgnZxsey7cfcIOcutxJ3BrnWedcCfNOcZBgNJOPIyuwcc0kCXbYf4kAlhQFoppBxN5tSOqDWlCkmIq2Tc7rE0La+z+97EV9Nmt5syYyB8TbliXup7IpwxpfvpQdHfl+lJsJb910kUAQCT9J8vjXWeb7pNO9gWeLF1oQ0n1Prl14mgFqOO4CWCVG8hRxnG5KWdY7EkRAOt2CdoLkcC+si6RAftQevVtdB4SywrFPImJ9y3iNR7BJgQA9Ip2ZVaoJsr5UFfrxKP042FqusfXF7Ep94+XBUaEF/w/vZUDbdivJuID6Zx3MI+W1iUAAAAASUVORK5CYII=";
    const mimg = trueImgPath || "data:image/png;base64,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";
    
    const newMod = {
        "name": mname,
        "creator": mcreator,
        "icon": micon,
        "desc": mdesc,
        "path": path.join(modFolder, `mod${getCritNum()}`),
        "img": mimg,
        "info": minfo,
        "exe": m_scan[0]
    }
    newMod.icon = newMod.icon.startsWith('data:') ? newMod.icon : 'file:///' + newMod.icon.replace(/\\/g, '/').replace(/ /g, '%20');
    newMod.img = newMod.icon.startsWith('data:') ? newMod.img  : 'file:///' + newMod.img.replace(/\\/g, '/').replace(/ /g, '%20');
    const data = JSON.parse(fs.readFileSync(modJsonPath, 'utf8'));
    data.mods.push(newMod);
    fs.writeFileSync(modJsonPath, JSON.stringify(data, null, 2), 'utf8');
    showMod(newMod.name, newMod.creator, newMod.icon, newMod.desc, newMod.path, newMod.img, newMod.info, newMod.exe, parseInt(newMod.path?.match(/\d+$/)?.[0]), true);
    addCritNum();
    setInput(false);
    imgPath = null;
    trueImgPath = null;
}

clicked_mod = "";

function updateSidebar() {
    const id = parseInt(clicked_mod.dataset.id, 10);
    // console.log("Clicked Mod ID:", id);
    if (isNaN(id)) {
        document.getElementById("imgHolder").setAttribute("src", "data:image/png;base64,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");
        document.getElementById("titleHolder").textContent = `Hey there!`;
        document.getElementById("authorHolder").textContent = `1OTH3R`;
        document.getElementById("descHolder").textContent = `Welcome to the Mod Manager! If you get curious about icons or covers, refer to the image above; it has the dimensions! To add or play mods, click the floppy disk or the arrow; to go to your mod's files or delete a mod, click the file or bomb icon! Thanks for using this manager, and have fun with your Deltarune(s)!`;        
        document.getElementById("dataHolder").textContent = `Mod Manager v${nw.App.manifest.version} (Out of beta!)`;
        return;
    }
    
    document.getElementById("imgHolder").src = clicked_mod.dataset.img;
    document.getElementById("titleHolder").textContent = clicked_mod.dataset.title;
    document.getElementById("authorHolder").textContent = clicked_mod.dataset.creator;
    document.getElementById("descHolder").textContent = clicked_mod.dataset.desc;
    document.getElementById("dataHolder").textContent = clicked_mod.dataset.info;
}

function clickMod(thisMod) {
    let allMods = document.getElementsByClassName("mod");
    let modCount = allMods.length;
    for (let step = 0; step < modCount; step++) {
        if (allMods[step].classList.contains('focusedElem')) allMods[step].classList.remove('focusedElem');
        allMods[step].querySelectorAll("*").forEach(child => {
            child.style.setProperty("color", "var(--grey)");
            if (child.tagName === "IMG") {
                child.style.filter = "invert(70%) sepia(8%) saturate(0%) hue-rotate(153deg) brightness(85%) contrast(94%)";
            }
        });
    }
    thisMod.classList.add('focusedElem');
    thisMod.querySelectorAll("*").forEach(child => {
        child.style.setProperty("color", "var(--white)");
        if (child.tagName === "IMG") {
            child.style.filter = "invert(100%)";
        }
    });
    
    let hasStartHide = document.querySelectorAll(".startHide").length > 0;

    if (!clicked_mod || clicked_mod !== thisMod || hasStartHide) {
        playSound('click');
        clicked_mod = thisMod;
        document.querySelectorAll(".startHide").forEach(element => {
            element.classList.remove("startHide");
        });
        
        updateSidebar();
    }
}

function stopSidebar() {
    const contentSection = document.getElementById('content');
    for (const little_guy of contentSection.children) {
        little_guy.classList.add('startHide');
    }
}

function removeMod() {
    if (clicked_mod != "") {
        setLoading(true);
        const data = JSON.parse(fs.readFileSync(modJsonPath, 'utf8'));
        let id = parseInt(clicked_mod.dataset.id);
        if (isNaN(id)) {
            data.mods = data.mods.filter(mod => mod.path);
        } else {
            data.mods = data.mods.filter(mod => mod.path !== path.join(modFolder, `mod${id}`));
        }
        fs.writeFileSync(modJsonPath, JSON.stringify(data, null, 2), 'utf8');
        clicked_mod.remove();
        if (!isNaN(id)) {
            fs.rm(path.join(modFolder, `mod${id}`), { recursive: true }, function(err) {
                if (err) {
                    console.log('Error:', err.message);
                    setLoading(false);
                    setError(true, err);
                    return;
                }
                console.log('Mod folder removed:', `mod${id}`);
            });
        }
        setLoading(false);
        clicked_mod = "";
        stopSidebar();
    }
}

function openFiles() {
    if (clicked_mod != "") {
        nw.Shell.openItem(path.join(modFolder, `mod${parseInt(clicked_mod.dataset.id)}`));
    }
}

function getSaveFiles(folder) {
    return fs.readdirSync(folder, { withFileTypes: true }).filter(save => save.isFile() && !save.name.toLowerCase().endsWith('.vdf')).map(file => file.name);
}

let save_fail = false;

function runGame(id, notFangame, type) {
    const mod = clicked_mod.dataset;
    
    if (mod && mod.exe) {
        playSound(`sounds/${Math.floor(Math.random() * 66)}.wav`);
        win.hide();
        setLoading(false);
        
        const child = spawn(mod.exe, [], {
            detached: false,
            cwd: path.dirname(mod.exe),
            shell: true
        });
        
        child.on('close', async (code) => {
            setLoading(true);
            if (notFangame) {
                console.log(`Game closed with the code '${code}'`);
                let appdataSavePath = path.join(appData, type);
                
                // Part 1: Game --> Mod
                
                if (save_fail === false) {
                    source = appdataSavePath;
                    dest = giveSaveDir(id);
                    if (frogFiles(source, dest) === 1) save_fail = true;
                }
                                
                // Part 2: Storage --> Game
                
                
                if (save_fail === false) {
                    source = type === 'DELTARUNE' ? drSaves : utSaves;
                    dest = appdataSavePath;
                    if (frogFiles(source, dest) === 1) save_fail = true;
                }                
            }
            setLoading(false);
            win.show();
        });
    
    } else {
        console.log(`Mod ID: ${id} - No exe or mod found!`);
    }
}

function getType(id) {
    let ze_dir = fs.readdirSync(path.join(modFolder, `mod${id}`), { recursive: true });
    let exes = ze_dir.filter(file => file.endsWith('.exe'));
    for (let exe of exes) {
        const filename = path.basename(exe).toLowerCase();
        if (filename === 'deltarune.exe' || filename === 'survey_program.exe') {
            console.log('We be playing DELTARUNE!');
            return 'DELTARUNE';
        } else if (filename === 'undertale.exe') {
            console.log('We be playing UNDERTALE!');
            return 'UNDERTALE';
        }
    }
    console.log("Hell if I know what we're playing! :P");
    return false; // guess you could say it's UNRELATED! HAHAHAha i'm so funny
}


function prepGame() {
    if (!clicked_mod) return;
    const id = parseInt(clicked_mod.dataset.id);
    if (!isNaN(id)) {
        setLoading(true);
        const type = getType(id);
        if (type === false) {
            runGame(id, false, type);
            return;
        }
        
        // Move Part 1: Game --> storage
        
        let appdataSavePath = path.join(appData, type);
        
        if (save_fail === false) {
            let source = appdataSavePath;
            let dest = type === 'DELTARUNE' ? drSaves : utSaves;
            if (frogFiles(source, dest) === 1) return;
        }
        
        /* 
        let appdataSavePath = path.join(appData, type);
        let saves = getSaveFiles(appdataSavePath);
        
        if (saves.length !== 0) {
            for (let save of saves) {
                let source = path.join(appData, type);
                let destination = type === 'DELTARUNE' ? drSaves : utSaves;
                
                fs.renameSync(path.join(appdataSavePath, save), type === 'DELTARUNE' ? path.join(drSaves, save) : path.join(utSaves, save));
            }
            console.log("Moved them files from AppData to the storage!");
        } else { console.log("No game saves detected! Moving onwards..."); }
        */
            
        // Move Part 2: Mod --> Game
        
        if (save_fail === false) {
            source = giveSaveDir(id);
            dest = appdataSavePath;
            if (frogFiles(source, dest) === 1) save_fail = true;
        }
        
        /*
        let modSavePath = giveSaveDir(id);
        saves = fs.readdirSync(modSavePath);
        
        if (saves.length !== 0) {
            for (let save of saves) {
                let source = path.join(modSavePath, save);
                let destination = path.join(appdataSavePath, save);
                
                fs.renameSync(path.join(modSavePath, save), path.join(appdataSavePath, save));
            }
            console.log("Moved them files from the mod to the game!");
        } else { console.log("No modded saves detected! Moving onwards..."); }
        */
        
        runGame(id, true, type);
        return;
    }
}