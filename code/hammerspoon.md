```lua
-- Call Hammerspoon functions from AppleScript

-- First activate applescript support:
hs.allowAppleScript(true)

-- Then you can call functions from your lua code like this:
tell application "Hammerspoon"
execute lua code "showClipBoardContent()"
end tell

-- In the above case it would call showClipBoardContent() function
```

```lua
-- Bind function to hotkey
hs.hotkey.bind("ctrl", "return", function()
  hs.notify.new({title="Hammerspoon", informativeText="Hello World"}):send()
end)
```

```lua
-- URL handler alert

hs.urlevent.bind("someAlert", function(eventName, params)
    hs.alert.show("Hey there alert")
end)

-- After having this line in init.lua
-- you can then call it from the shell like so
open -g hammerspoon://someAlert
```
