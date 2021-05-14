# H5P Code Editor (Widget)
A widget plugin for the H5P platform designed for use as a code editor.

This project utilises [CodeMirror 6](https://codemirror.net/6/) for its main functionality. CodeMirror 6 is released under a dual [MIT](https://github.com/codemirror/codemirror.next/blob/master/LICENSE-MIT) and [GPL-v3](https://github.com/codemirror/codemirror.next/blob/master/LICENSE2-GPL3) license.

### Options/Config
Options for the code editor widget can be configured in the `fields` section of the `semantics.json` of whichever plugin utilises this widget. The `default` field can optionally change the default values of the editor. 

These settings include:
- `language`
  - Choose from `python`, `java`, `c`, ~~or `pseudocode`~~ (currently broken)
  - Defaults to `c`
- `spacing`
  - Number of spaces per indentation 
  - Defaults to 4
- `code`
  - Code the editor includes
  - Defaults to `"\n\n"` (2 newlines)

#### Example `semantics.json` element: 
```json
{
  "label": "Code Demonstration",
  "name": "democode",
  "description": "Code to display to the user.",
  "type": "group",
  "widget": "codeEditor",
  "fields": [
    {
      "name": "code",
      "type": "text",
      "default": ""
    },
    {
      "name": "language",
      "type": "text",
      "default": "python"
    },
    {
      "name": "spacing",
      "type": "number",
      "default": 4
    }
  ]
}
```

### H5P Dependencies
- `fontawesome 4.5`

### Development Checklist
- [x] incorporate CodeMirror into a H5P plugin
- [x] migrate the plugin to widget format
  - [x] migrate all the old semantics into the output alongside the input
- [ ] add accessibility (aria label) explaining unique `Tab` context
  - [ ] (fix Tab context (CodeMirror issue))
- [ ] themes (dark theme + toggle)
- [ ] update base CodeMirror syntax-highlighting theme to be more accessible and user-friendly
- [ ] (extra) create/maintain regular version of code editor alongside widget