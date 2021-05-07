# H5P Code Editor (Widget)
A widget plugin for the H5P platform designed for use as a code editor.

This project utilises [CodeMirror 6](https://codemirror.net/6/) for its main functionality. CodeMirror 6 is released under a dual [MIT](https://github.com/codemirror/codemirror.next/blob/master/LICENSE-MIT) and [GPL-v3](https://github.com/codemirror/codemirror.next/blob/master/LICENSE2-GPL3) license.

### Options/Config
Options for the code editor widget can be configured in the `codeEditor` section of the `semantics.json` of whichever plugin utilises this widget.

These settings include:
- `language`
  - Choose from `python`, `java`, `c`, or ~~`pseudocode`~~ (currently broken)
  - Defaults to `c`
- `spacing`
  - Number of spaces per indentation 
  - Defaults to 4
- `placeholder`
  - Code to include in the editor by default
  - Defaults to `"\n\n"` (2 newlines)

#### Example `semantics.json` element: 
```json
{
  "label": "Reference Code",
  "name": "refcode",
  "description": "Code displayed as reference.",
  "type": "text",
  "codeEditor": {
    "language": "python",
    "spacing": 4
  },
  "widget": "codeEditor"
}
```

### H5P Dependencies
- `fontawesome 4.5`

### Development Checklist
- [x] incorporate CodeMirror into a H5P plugin
- [x] migrate the plugin to widget format
- [ ] add accessibility (aria label) explaining unique `Tab` context
  - [ ] (fix Tab context (CodeMirror issue))
- [ ] themes (dark theme + toggle)
- [ ] update base CodeMirror syntax-highlighting theme to be more accessible and user-friendly
- [ ] (extra) create/maintain regular version of code editor alongside widget