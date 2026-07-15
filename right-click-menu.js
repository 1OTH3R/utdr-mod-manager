let lastMenuIndex = 0;
let lastModsIndex = 0;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        return;
    }

    const navKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    const enterKeys = ['Enter', 'z', 'Z'];
    const backKeys = ['Shift', 'x', 'X'];
    let currentElem = document.activeElement;
    
    if (navKeys.includes(event.key)) {
        event.preventDefault();
        
        const modsItems = Array.from(document.querySelectorAll('.clickableItem'));
        const menuItems = Array.from(document.querySelectorAll('.clickableItemP2'));
        
        if (lastMenuIndex >= menuItems.length) {
            lastMenuIndex = Math.max(0, menuItems.length - 1);
        }
        if (lastModsIndex >= modsItems.length) {
            lastModsIndex = Math.max(0, modsItems.length - 1);
        }

        const isMenuFocused = menuItems.includes(currentElem);
        const isModsFocused = modsItems.includes(currentElem);

        if (isMenuFocused) lastMenuIndex = menuItems.indexOf(currentElem);
        if (isModsFocused) lastModsIndex = modsItems.indexOf(currentElem);

        if (event.key === 'ArrowRight') {
            if (menuItems.length > 0) {
                if (!isMenuFocused) {
                    menuItems[lastMenuIndex].focus();
                } else {
                    lastMenuIndex = (lastMenuIndex + 1) % menuItems.length;
                    menuItems[lastMenuIndex].focus();
                }
            }
        } else if (event.key === 'ArrowLeft') {
            if (menuItems.length > 0) {
                if (!isMenuFocused) {
                    menuItems[lastMenuIndex].focus();
                } else {
                    lastMenuIndex = (lastMenuIndex - 1 + menuItems.length) % menuItems.length;
                    menuItems[lastMenuIndex].focus();
                }
            }
            
        } else if (event.key === 'ArrowUp') {
            if (modsItems.length > 0) {
                if (!isModsFocused) {
                    modsItems[lastModsIndex].focus();
                } else {
                    lastModsIndex = (lastModsIndex - 1 + modsItems.length) % modsItems.length;
                    modsItems[lastModsIndex].focus();
                }
            }
        } else if (event.key === 'ArrowDown') {
            if (modsItems.length > 0) {
                if (!isModsFocused) {
                    modsItems[lastModsIndex].focus();
                } else {
                    lastModsIndex = (lastModsIndex + 1) % modsItems.length;
                    modsItems[lastModsIndex].focus();
                }
            }
        }
    } else {
        const isClickable = currentElem.classList.contains('clickableItem') || currentElem.classList.contains('clickableItemP2');
        if (!isClickable) return;
        
        if (enterKeys.includes(event.key)) {
            if (!(currentElem.tagName === 'TEXTAREA' || currentElem.tagName === 'INPUT')) {
                event.preventDefault();
            }
            currentElem.click();
        }
        else if (backKeys.includes(event.key)) {
            if (!(currentElem.tagName === 'TEXTAREA' || currentElem.tagName === 'INPUT')) {
                event.preventDefault();
            }
            if (typeof clicked_mod !== 'undefined' && currentElem === clicked_mod) {
                if (typeof stopSidebar === 'function') stopSidebar();
            }
        }
    }
});


window.oncontextmenu = (e) => {
    if (!menuIsUp) {
        e.preventDefault();
        rightClickMenu.style.left = e.pageX + 'px';
        rightClickMenu.style.top = e.pageY + 'px';
        rightClickMenu.style.opacity = 1;
        rightClickMenu.style.pointerEvents = 'auto';
    } else e.preventDefault();
};
window.onclick = () => {
    rightClickMenu.style.opacity = 0;
    rightClickMenu.style.pointerEvents = 'none';
    exeClickMenu.close();
    exeClickMenu.style.opacity = 0;
    exeClickMenu.style.pointerEvents = 'none';
}

function chooseTheExe(e) {
    e.preventDefault();
    e.stopPropagation();
    
    exeClickMenu.style.opacity = 1;
    exeClickMenu.style.pointerEvents = 'auto';
}

document.querySelectorAll('*').forEach((element) => {
    if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
    }
});