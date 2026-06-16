const fs = require('fs');
const path = require('path');
const win = nw.Window.get();
const { spawn } = require('child_process');

win.show();

const appData = process.env.LOCALAPPDATA;

const undertale = path.join(appData, 'UNDERTALE');
const deltarune = path.join(appData, 'DELTARUNE');

if (!fs.existsSync(undertale)) { fs.mkdirSync(undertale, { recursive: true }); }
if (!fs.existsSync(deltarune)) { fs.mkdirSync(deltarune, { recursive: true }); }

const mainFolder = path.join(appData, 'utdr-mod-manager');

const modFolder = path.join(mainFolder, 'Mods');
if (!fs.existsSync(modFolder)) { fs.mkdirSync(modFolder, { recursive: true }); }

const savesFolder = path.join(mainFolder, 'vanillaSaves');

const utSaves = path.join(savesFolder, 'undertaleSaves');
if (!fs.existsSync(utSaves)) { fs.mkdirSync(utSaves, { recursive: true }); }

const drSaves = path.join(savesFolder, 'deltaruneSaves');
if (!fs.existsSync(drSaves)) { fs.mkdirSync(drSaves, { recursive: true }); }

const templateFolder = path.join(mainFolder, 'Templates');
if (!fs.existsSync(templateFolder)) { fs.mkdirSync(templateFolder, { recursive: true }); }

const critNumberPath = path.join(mainFolder, 'critically-needed-number.txt');
if (!fs.existsSync(critNumberPath)) { fs.writeFileSync(critNumberPath, '0', 'utf8'); }

function getCritNum() {
    return parseInt(fs.readFileSync(critNumberPath, 'utf8'), 10);
}

function addCritNum() {
    let num = getCritNum();
    num++;
    fs.writeFileSync(critNumberPath, String(num), 'utf8');
}	