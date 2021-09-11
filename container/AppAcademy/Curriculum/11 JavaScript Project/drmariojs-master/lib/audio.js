class Audio {

  toggleMute() {
    const sounds = document.getElementsByTagName("audio");
    for (let i = 0; i < sounds.length; i++) {
      sounds[i].muted = !sounds[i].muted;
    }
    const muteButton = document.getElementById("muteicon");
    if (sounds[0].muted) {
      muteButton.classList.remove("fa-volume-up");
      muteButton.classList.add("fa-volume-off");
    } else {
      muteButton.classList.remove("fa-volume-off");
      muteButton.classList.add("fa-volume-up");
    }
  }
  startGame() {
    const sounds = document.getElementsByTagName("audio");
    for (let i = 0; i < sounds.length; i++) {
      sounds[i].pause();
      sounds.currentTime = 0;
    }
    const sound = document.getElementById("bgm");
    sound.play();
  }

  bgmStop() {
    const sound = document.getElementById("bgm");
    sound.pause();
    sound.currentTime = 0;
  }

  pausebgm() {
    const sound = document.getElementById("bgm");
    sound.pause();
  }

  playbgm() {
    const sound = document.getElementById("bgm");
    sound.play();
  }

  movePill() {
    const sound = document.getElementById("movepill");
    sound.currentTime = 0;
    sound.play();
  }

  rotatePill() {
    const sound = document.getElementById("rotatepill");
    sound.currentTime = 0;
    sound.play();
  }

  eatBlocks() {
    const sound = document.getElementById("eatblocks");
    sound.currentTime = 0;
    sound.play();
  }

  levelClear() {
    const bgm = document.getElementById("bgm");
    const sound = document.getElementById("levelclear");
    bgm.pause();
    bgm.currentTime = 0;
    sound.play();
    setTimeout(() => {
      bgm.play();
    }, 2500);
  }

  gameOver() {
    const sound = document.getElementById("gameover");
    sound.play();
  }

}

export default Audio;
