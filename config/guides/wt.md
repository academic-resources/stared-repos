# wt.md

## Windows Terminal – a `profiles.json` (settings) file

Location path:

```text
%userprofile%\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState
```

`profiles.json`

```text
{
    // Startup as Ubuntu profile {guid}.
    "defaultProfile": "{2c4de342-38b7-51cf-b940-2309a097f518}",
    "profiles":
    {
        "defaults":
        {
            // Put settings here that you want to apply to all profiles.
            "colorScheme": "One Half Dark"
        },
        "list":
        [
            {
                // Make changes here to the Ubuntu WSL profile.
                "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
                "hidden": false,
                "name": "Ubuntu",
                "source": "Windows.Terminal.Wsl",
                "colorScheme": "One Half Dark",
                "startingDirectory": "\\\\wsl$\\Ubuntu\\home\\milan"
            },
            {
                // Make changes here to the Debian WSL profile.
                "guid": "{58ad8b0c-3ef8-5f4d-bc6f-13e4c00f2530}",
                "hidden": false,
                "name": "Debian",
                "source": "Windows.Terminal.Wsl",
                "colorScheme": "Solarized Dark",
                "startingDirectory" : "\\\\wsl$\\Debian\\home\\milan"
            }
        ]
    }
}
```

Note: `"startingDirectory": "\\\\wsl$\\[distro-name]\\home\\[linux-user]"` or non-escaped also works `"startingDirectory" : "//wsl$/<distro>/home/<user>"`

Learn more about:

- [documentation on settings](https://aka.ms/terminal-documentation)
- [profiles schema](https://aka.ms/terminal-profiles-schema)
- [adding custom color schemes](https://aka.ms/terminal-color-schemes)
