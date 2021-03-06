# Plank Dock as a Service

Adding Plank dock to startup via the desktop GUI doesn't govern it if the dock crashes or gets killed.

With a systemd user service, systemd can restart it without any user intervention.

## Setup the systemd User Environment

If you aren't already using _user_ systemd services, create the necessary directory schema (as your **user**, _not_ root/sudo):

```bash
mkdir -p ~/.config/systemd/user/
```

Make the systemd unit file:

```bash
pico ~/.config/systemd/user/plank.service
```

Put the following in the unit file:

```bash
[Unit]
Description=Plank background service
ConditionPathExists=/usr/bin/plank
After=gdm.service

[Service]
Restart=on-failure
RestartSec=5s
TasksMax=18402
ExecStart=/usr/bin/plank

[Install]
WantedBy=default.target
```

(If you don't use Gnome, replace `After=gdm.service` with a desktop service relevant to your desktop environment.)

That's it!

Now, enable the new service to auto-start on boot (after the desktop environment):

```bash
systemctl enable --user plank
```

Start it for this session (without needing to logout):

```bash
systemctl --user start plank
```

Done!

### Test the service

To see what will occur if something happens to the user service; figure out what the process ID is:

```bash
ps aux | egrep [p]lank
```

- The process ID will be the numeric value in the second column:
  ```text
  angela     85037  0.1  0.9 431204 73144 ?        Ssl  23:25   0:01 /usr/bin/plank
  ```
- Kill it:
  ```bash
  kill -9 85037
  ```
  - 5 seconds after the process kill, Plank should re-appear

### Worth Noting

From `/var/log/syslog`:

```text
[WARN 13:02:59.300958] [Preferences:192] '/usr/share/plank/themes/Transparent/dock.theme' is read-only!
```

Easy enough:

```bash
mkdir p ~/.local/share/plank/themes && touch ~/.local/share/plank/themes/Transparent/dock.theme
```

A theme config generated by Plank should auto appear after (re)starting it, you can adjust it to your liking and the changes live commit:

```yaml
#This file auto-generated by Plank.
#2021-03-10T01:17:10+0000

[PlankTheme]
#The roundness of the top corners.
TopRoundness=0
#The roundness of the bottom corners.
BottomRoundness=0
#The thickness (in pixels) of lines drawn.
LineWidth=0
#The color (RGBA) of the outer stroke.
OuterStrokeColor=41;;41;;41;;255
#The starting color (RGBA) of the fill gradient.
FillStartColor=41;;41;;41;;255
#The ending color (RGBA) of the fill gradient.
FillEndColor=80;;80;;80;;255
#The color (RGBA) of the inner stroke.
InnerStrokeColor=255;;255;;255;;255

[PlankDockTheme]
#The padding on the left/right dock edges, in tenths of a percent of IconSize.
HorizPadding=0
#The padding on the top dock edge, in tenths of a percent of IconSize.
TopPadding=-13
#The padding on the bottom dock edge, in tenths of a percent of IconSize.
BottomPadding=1.3
#The padding between items on the dock, in tenths of a percent of IconSize.
ItemPadding=2.5
#The size of item indicators, in tenths of a percent of IconSize.
IndicatorSize=5
#The size of the icon-shadow behind every item, in tenths of a percent of IconSize.
IconShadowSize=1
#The height (in percent of IconSize) to bounce an icon when the application sets urgent.
UrgentBounceHeight=1.6666666666666667
#The height (in percent of IconSize) to bounce an icon when launching an application.
LaunchBounceHeight=0.625
#The opacity value (0 to 1) to fade the dock to when hiding it.
FadeOpacity=1
#The amount of time (in ms) for click animations.
ClickTime=300
#The amount of time (in ms) to bounce an urgent icon.
UrgentBounceTime=600
#The amount of time (in ms) to bounce an icon when launching an application.
LaunchBounceTime=600
#The amount of time (in ms) for active window indicator animations.
ActiveTime=300
#The amount of time (in ms) to slide icons into/out of the dock.
SlideTime=300
#The time (in ms) to fade the dock in/out on a hide (if FadeOpacity is < 1).
FadeTime=250
#The time (in ms) to slide the dock in/out on a hide (if FadeOpacity is 1).
HideTime=250
#The size of the urgent glow (shown when dock is hidden), in tenths of a percent of IconSize.
GlowSize=30
#The total time (in ms) to show the hidden-dock urgent glow.
GlowTime=10000
#The time (in ms) of each pulse of the hidden-dock urgent glow.
GlowPulseTime=2000
#The hue-shift (-180 to 180) of the urgent indicator color.
UrgentHueShift=150
#The time (in ms) to move an item to its new position or its addition/removal to/from the dock.
ItemMoveTime=450
#Whether background and icons will unhide/hide with different speeds. The top-border of both will leave/hit the screen-edge at the same time.
CascadeHide=true
#The color (RGBA) of the badge displaying urgent count
BadgeColor=0;;0;;0;;0
```

---

:warning: **Segfault in Gnome 3.38.3 in Debian Testing**

At the time of writing I haven't been able to reliably reproduce a segfault to the point it could be reportable to Plank devs, the segfaults appear to be intermittent and/or only while resource-heavy applications may be _idle_ (active, but no direct interaction).

Most commonly, the fault occurs during video meetings in both Vivaldi and Firefox. I have made it through a few sessions on Firefox without a segfault, but it seems after Gnome updates most recently, the segfaults returned for both browsers.

Because of the segfaults, I had to disable the Plank service and run it as a background script until the bug is able to be tracked or fixed. While as a service, when Plank crashes, it takes the subapplications with it.

```
plank[44787]: segfault at 70 ip 00007f943e5e4403 sp 00007ffc4406a580 error 4 in libplank.so.1.0.0[7f943e5ce000+62000]
```
