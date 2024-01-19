# Tabswiper

A Firefox extension that enhances tab switching and closing through fuzzy search.

## How to Use It

1. Open the search page using the extension icon or by pressing `F2`.
You can customize the keyboard shortcut by accessing the `Manage Extension Shortcuts` in Firefox settings.

1. Filter the list of open tabs with the searchbox.

1. If there is one tab left in the list, navigate to it by pressing `Enter`.

1. Otherwise, navigate to or close the desired tab using the commandbox.

## Development

### Adding an Unpacked Extension to Firefox

1. In the Firefox address bar, type `about:debugging` and press Enter.

1. Click on `This Firefox`, then select `Load Temporary Add-on...`.

1. Choose the `manifest.json` file.

### Build the Package

To generate the XPI file, just use the `make package` command.
The output file will be stored in the `dist` directory.
