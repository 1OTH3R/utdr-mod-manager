## okay so gimme a minute I'm rebuilding this after I rebuild it on GameBanana

# UTDR Mod Manager

**A simple yet effective mod manager for UNDERTALE and DELTARUNE mods, as well as fangames!**  
Built for flexibility, style, and ease of use.

---

## ⚡ Quick Start
1. Install [Python](https://www.python.org/downloads/)
2. Run: `python -m pip install psutil`
3. Edit `mods.json` to add your mods (see below)
4. Launch `mod_server.py`
5. You're done!

---

## 🚀 Features

* Launch UNDERTALE/DELTARUNE mods and fangames from a single hub
* Display custom icons, descriptions, and images for each mod
* Supports different game types (All UT/DR versions & fangames)
* Hand-made custom UI by a cool guy (not to be confused with [Papyrus](https://undertale.fandom.com/wiki/Papyrus))
* Clean, DELTARUNE-style UI using Determination Mono (credit to [Nisha Wolfe](https://saveeditor.spamton.com/), maker of the Spamton Save Editor)

---

## 🛠️ Requirements/Setup

* Latest version of [Python](https://www.python.org/downloads/) (See below for more info)
* Python module: `psutil` (Install it by running `python -m pip install psutil`)

### 💡 During Python installation, make sure to:
* Check "Add Python to PATH"
* Check "Run with administrative privilages"
* Check "Disable path length limit" (found after install)
* Check "Install pip"

*If you've already installed Python for other projects, press Windows+R and type `sysdm.cpl`. From there, go to Advanced > Environment Variables > System Variables and verify that `C:\Users\_YOUR_USERNAME_HERE_\AppData\Local\Programs\Python\Python###\` has the variable `PATH` attached to it (name may vary based off of what version you got; ie: Python313). If it still doesn't work, then you might just want to reinstall the latest version of Python.*

From there, just open up mod_server.py or make a shortcut that does it for you (to help make it look more like an app).

---

## 💻 How to Add Mods

I have included some examples of base mods in there, but chances are, they will not work if you try to load them up. This is because the actual data that gets stored is only the location of the folder containing the `.exe` file, so **no actual game data gets saved through this launcher**.

It is recommended to move the UTDR Launcher folder somewhere you won't forget it and/or to add the UTDR Launcher folder to your Quick Access when setting up mods.
To add a mod
* Start by locating the file called *`mods.json`* and take note of the way that the data is structured. If you have 3 or less mods, you can go ahead and replace the current, already existing example mods and delete the data for the ones you aren't using.
* Take note of the data and its format. It is important that you do not leave out any parts of the data, as all of it is required and you may recieve unknown or undocumented errors.
* If you want to add in a mod, copy this below, and make sure to place them inside (and don't forget the commas if you are adding mutiple):
```json
  {
    "name": "RIBBIT",
    "creator": "BeholdMaxine",
    "image": "mod%20images/ribbit-large.png",
    "hoverImage": "mod%20images/ribbit-large-sel.png",
    "mainImage": "mod%20images/ribbit-main.png",
    "description": "Leap into a surreal journey through YOU’s world in RIBBIT, a bizarre and stylish DELTARUNE mod packed with weird humor, striking visuals, and unpredictable twists.",
    "ageRating": "Teen (13+)",
    "difficulty": "Medium to hard",
    "hasDifficultySelect": true,
    "folderPath": "C:/Program Files (x86)/Steam/steamapps/common/DELTARUNE Mods/RIBBIT",
    "exeName": "DELTARUNE.exe",
    "gameType": "DELTARUNE (2018)"
  }
```
___TIP:___ *If it crashes or says, "Failed to load mods" after you modify mods.json, check the Troubleshooting section below.*

---

## 🔧 Troubleshooting/Q&A

### Q: Whenever I try to install `psutil`, my CMD gives an error message saying that `pip` doesn't exist! Can you help? (`psutil won't install`)
A: Make sure that `pip` is added to your path, and try using `python -m pip install psutil` instead of just `pip install psutil`. If the issue persists, try reinstalling Python with the rules above.
<br/>
<br/>
### Q: I just deleted/replaced an image from the `mod images` tab, but every time I boot up the mod manager, the image still shows! Can you fix it? (`image not updating`)
A: This issue occurs due to the way that the app runs, as it's actually just a Chrome webpage. To fix it, press `Crtl+H` while in Chrome, then click `Delete browsing data` and make sure that `Cached images and files` is selected.
<br/>
<br/>
### Q: My mods aren't loading at all, and I spent a lot of time on adding the information! How can I fix this? (`mods not showing`)
A: Oftentimes, this is due to either of these issues:
<br/>
<br/>1) When inputting the folder's path, you used a backslash (`\`), which breaks due to the way json formatting works. Instead, use forward slashes (`/`) or two backslashes (`\\`) to fix the issue.
<br/>
<br/>2) You accidentally messed up the formatting of the file. If this is the case, then look through the file and make sure everything is in the right place, and that the square brackets are outside of the curly ones*. And finally, don't forget about the commas.
<br/>
<br/>If you're still encountering this issue, then try temporarily using a new, unchanged `mods.json` and see if that works. If it still doesn't, then you can put your original `mods.json` back into a fresh install of everything else.
<br/>
<br/>
### Q: Will you ever add in the UNDERTALE/DELTARUNE games to make it easier to make mods? (`will you add piracy`)
A: No. To respect copyright and avoid piracy issues, this launcher **does not include any official UNDERTALE or DELTARUNE game files.** Users must provide their own legally obtained game copies. 
### Q: I want to make custom art for the icons and main image! How do I do that? (`make custom art`)
A: For the icons specifically, you can technically use any image, but I have a base image (`base.png`) that you can use for a more DELTARUNE-style icon. For any of the images, though, you can just draw it and set it as that mod's image through `mods.json`.
<br/>
<br/>
### Q: This has a bunch of different file types, and all of them look sketchy! Is this safe to use? (`safe to use`)
A: I know it's really weird, but I didn't include any malware or ransomware. A lot of the backend of this was just me working with ChatGPT, so I just kinda went with whatever.
<br/>
<br/>
### Q: Why did you make this? Why should I even use this over Luigi (UTMC)'s UT/DR Mod Manager? (`tell me why`)
A: Despite the fact that I found it to be a fun project to make, the main reason to use it over Luigi's was that *when I put the Undertale/Deltarune Mod Manager by Luigi (UTMC) through VirusTotal, it said it had a Trojan virus in it.* **This does not mean you should hate or slander Luigi (UTMC), as there is also the potential for the virus checker to have been "sipping too much free pool water", if you will.
<br/>
<br/>Once again, do _NOT_ hate, slander, cyberbully, or perform any other rude actions towards Luigi (UTMC) for this, as that will NOT help the cause and is unacceptable. Instead, if you so wish, you can try to contact Luigi (UTMC) about this issue politely to help resolve the conflict faster.**
<br/>
<br/>
### Q: I have another issue that isn't on this list! What do I do? (`other issue`)
A: The most simple thing you can do is try a fresh install again and re-write your `mods.json` for all of your mods. If it still persists, add an issue in `Issues` on this GitHub page with the `bug` tag.
<br/>
<br/>
### I have a suggestion for this mod manager! Where do I put that? (`suggestion`)
A: If you have any suggestions, place them under the `Issues` tab in GitHub for now, and just make sure to add the `enhancement/suggestion` tag.
