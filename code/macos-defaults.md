```bash
# Remove dock animation. https://www.reddit.com/r/apple/comments/6xg9xq/tip_of_the_day_one_thing_i_cant_live_without_in/
defaults write com.apple.dock autohide-delay -int 0
defaults write com.apple.dock autohide-time-modifier -float 0.4
killall Dock

# Revert
defaults delete com.apple.dock autohide-delay
defaults delete com.apple.dock autohide-time-modifier
killall Dock
```

```bash
# Turn internal keyboard off. https://discussions.apple.com/thread/5044946?answerId=26556362022#26556362022
sudo kextunload /System/Library/Extensions/AppleUSBTopCase.kext/Contents/PlugIns/AppleUSBTCKeyboard.kext/

# Turn internal keyboard on
sudo kextload /System/Library/Extensions/AppleUSBTopCase.kext/Contents/PlugIns/AppleUSBTCKeyboard.kext/
```
