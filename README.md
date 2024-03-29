# Tabswitcher

The must-have extension for a mouse-free Firefox experience.
<br>Switch between tabs and manage them with a fuzzy search and basic command toolset.

Availible on [addons.mozilla.org](https://addons.mozilla.org/addon/tabswitcher/).

![Search Window](/screenshots/Screenshot_1.png?raw=true)

## How to Use It

1. Open the search page using the extension icon or by pressing `F2`.
<br>You can customize the keyboard shortcut by accessing the `Manage Extension Shortcuts` in Firefox settings.

1. Filter the list of open tabs with the searchbox.

1. Switch to the top tab in search results with the `Enter` key, choose any other tab with `Arrow Keys` or press the `Tab` key to activate the actionbox.

1. Press the `Esc` key to activate the searchbox or close the page if the searchbox is focused.

## Availible Commands

To invoke any of the commands, enter the command symbol and tab label, if
required, in the actionbox.
<br>For example: `fjk`, `dlum` or `S`.

- `d`: close (**delete**) the labeled tab.
- `D`: Close the first search results tab.
- `c`: Copy (or **clone**) the labeled tab.
- `C`: Duplicate the first search results tab.
- `s`: **Suspend** the labeled tab.
- `S`: Suspend all search results tabs.
- `e`: Move (**extract**) the tab to a popup window.
- `p`: **Pin** or unpin the labeled tab.
- `f`: Navigate to the labeled tab.
- `F`: Jump to the first tab in search results.
- `q`: **Quit** the search page.
- `?`: Navigate to this page.

## Keyboard Shortcut Conflict

If the default `F2` key does not work, check for conflicts on the "Manage Extension Shortcuts" page in the drop-down menu with "Gear" icon on the "Manage Your Extensions" page (`Ctrl + Shift + A`).

## Development

### Adding an Unpacked Extension to Firefox

1. In the Firefox address bar, type `about:debugging` and press Enter.

1. Click on `This Firefox`, then select `Load Temporary Add-on...`.

1. Choose the `manifest.json` file.

### Build the Package

To generate the XPI file, just use the `make package` command.
The output file will be stored in the `dist` directory.
