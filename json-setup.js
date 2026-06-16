if (!fs.existsSync(modJsonPath)) {
    const defaultData = {
        "mods": [
        {
            "name": "This is the Mod Manager!",
            "creator": "1OTH3R",
            "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAXCAYAAAAV1F8QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGHaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj48dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9J3cnPz4slJgLAAABRklEQVRIS61VWw7DMAizc/87sw8g4ZVOm2ppyyBgA+lSEhDAvgCAatjSoH6CkL5PAnK8zkGq3eJfBylbNAkSwN76AXMeAcjKtkEAbv2AYk4g5+KCkAcoW7bC4XS5Y0s6ooS1T8qgnZxsey7cfcIOcutxJ3BrnWedcCfNOcZBgNJOPIyuwcc0kCXbYf4kAlhQFoppBxN5tSOqDWlCkmIq2Tc7rE0La+z+97EV9Nmt5syYyB8TbliXup7IpwxpfvpQdHfl+lJsJb910kUAQCT9J8vjXWeb7pNO9gWeLF1oQ0n1Prl14mgFqOO4CWCVG8hRxnG5KWdY7EkRAOt2CdoLkcC+si6RAftQevVtdB4SywrFPImJ9y3iNR7BJgQA9Ip2ZVaoJsr5UFfrxKP042FqusfXF7Ep94+XBUaEF/w/vZUDbdivJuID6Zx3MI+W1iUAAAAASUVORK5CYII=",
            "desc": "This is a mod!",
            "path": undefined,
            "img": "data:image/png;base64,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",
            "info": "Yolo!!",
            "exe": undefined
        }
        ]
    };
    fs.writeFileSync(modJsonPath, JSON.stringify(defaultData, null, 2), 'utf8');
}

function scan_exe(the_mod) {
    if (the_mod.path) {
        let files = fs.readdirSync(the_mod.path);
        let exe = files.find(filename => path.extname(filename) === '.exe');
        if (exe) {
            the_mod.exe = path.join(the_mod.path, exe);
        }
        else {
            console.log(`Ruh roh! I couldn't find any exe in here, but I did find a path! (Path: ${the_mod.path})`);
        }
    }
}

const data = JSON.parse(fs.readFileSync(modJsonPath, 'utf8'));
them_mods = ``;
data.mods.forEach(mod => {
    them_mods += ` '${mod.name}'`;
    let iconUrl = mod.icon.startsWith('data:') ? mod.icon : 'file:///' + mod.icon.replace(/\\/g, '/').replace(/ /g, '%20');
    let imgUrl = mod.img.startsWith('data:') ? mod.img : 'file:///' + mod.img.replace(/\\/g, '/').replace(/ /g, '%20');
    scan_exe(mod);
    showMod(mod.name, iconUrl, mod.creator, parseInt(mod.path?.match(/\d+$/)?.[0])); // okay this is rlly complex but like basically that last one just returns the path number or NaN if there isn't one
});
console.log("Mod(s) detected:", them_mods);