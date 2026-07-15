const audioFiles = {
    click: Object.assign(new Audio('snd_click.wav'), { preload: 'auto' }),
    hover: Object.assign(new Audio('snd_hover.wav'), { preload: 'auto' }),
    slash: Object.assign(new Audio('snd_slash.wav'), { preload: 'auto' })
};

function playSound(snd_name) {
    const theSound = audioFiles[snd_name];
    if (!theSound || theSound.readyState < 2) return;
    
    // 1. Snap the audio back to the very beginning (cuts off current playback)
    theSound.currentTime = 0; 
    
    // 2. Play the original asset directly—no copies, no garbage collection needed!
    theSound.play().catch(err => {
        console.warn(`Audio [${snd_name}] playback safely intercepted:`, err.message);
    });
}