var H5P = H5P || {};

H5PEditor.widgets.codeEditor = H5PEditor.CodeEditor = (function ($) {
    
    /**
     * Creates code editor.
     *
     * @class H5PEditor.CodeEditor
     *
     * @param {Object} parent
     * @param {Object} field
     * @param {string} params
     * @param {H5PEditor.SetParameters} setValue
     */
    function CodeEditor(parent, field, params, setValue) {
        this.parent = parent;
        this.field = field;
        this.params = params;
        this.setValue = setValue;
        this.config = this.field.codeEditor;
    };

    /**
     * Append the field to the wrapper.
     *
     * @param {H5P.jQuery} $wrapper
     */
    CodeEditor.prototype.appendTo = function ($wrapper) {
        var self = this;

        // set up default parameters in case config was not provided
        var set_if_undef = (x, value) => (typeof x === 'undefined') ? value : x;
        if(this.config === undefined) this.config = {};
        this.config.language = set_if_undef(this.config.language, "c");
        this.config.spacing = set_if_undef(this.config.spacing, 4);
        this.config.placeholder = set_if_undef(this.config.placeholder, "\n\n");

        // container element
        this.$container = $("<div>", {
            'class': "field text h5p-codeeditor"
        });
        // Add header:
        $('<span>', { 'class': 'h5peditor-label', html: this.field.label}).appendTo(this.$container);
        // Add description:
        $('<div>', { 'class': 'h5peditor-field-description', html: this.field.description}).appendTo(this.$container);

        //config
        var config = $("<aside>", {'class':'h5p-codeeditor code-settings'});
        
        $(`<label for="h5pce-spacing">Indent Spacing  </label>`).appendTo(config);
        var spacingsel = $(`<input type="number" min="1" id="h5pce-spacing" value="${this.config.spacing}" />`);
        spacingsel.on("change", function() { self.updateSpacing(this);});
        spacingsel.appendTo(config);
        
        $(`<br />`).appendTo(config);
        
        $(`<label for="h5pce-language">Language  </label>`).appendTo(config);
        var langselect = $(`<select id="h5pce-language"></select>`);
        langselect.on("change", function() { self.updateLanguage(this);});
        var languages = ['c','python','java']; //,'pseudocode'];
        for(var i = 0; i < languages.length; i++)
        {
            var opt = $(`<option value="${languages[i]}">${languages[i].charAt(0).toUpperCase() + languages[i].slice(1)}</option>`);
            if(languages[i] == this.config.language) opt.attr("selected",true);
            langselect.append(opt);
        }
        langselect.appendTo(config);

        // top bar
        var topbar = $("<header class='h5p-codeeditor code-header'>")
        var settings_button = $('<button class="h5p-codeeditor fa4icon settings" aria-label="Code Editor Settings" />');
        settings_button.on("click", function() {
           config.toggle();
        });
        settings_button.appendTo(topbar);
        topbar.append('<div aria-hidden="true" class="h5p-codeeditor fa4icon lang" />');
        this.langtext = $('<h3 class="language-text">' + this.config.language + '</h3>');
        topbar.append(this.langtext);
        config.appendTo(topbar);
        
        config.toggle(false);
        topbar.appendTo(this.$container);


        var editor_text = set_if_undef(this.params, this.config.placeholder);
        this.setCode(editor_text, this.config.spacing);

        // the editor
        var editor_div = $('<div class="h5p-code-editor style-three" id="h5p-code-editor' + '"></div>');
        this.editor = window.H5P_code_editor_make(editor_div[0], this.config.language, this.config.spacing, editor_text, this.setCode.bind(this));
        this.$container.append(editor_div);

        this.$container.appendTo($wrapper);
    };

    /**
     * Sets the params code based on current editor state
     */
    CodeEditor.prototype.setCode = function(code, spacing) {
        this.params = code;
        this.setValue(this.field.codeEditor, this.config);
        this.setValue(this.field, this.params);
    }
    
    CodeEditor.prototype.updateLanguage = function(language) {
        this.config.language = $(language).val();
        this.langtext.html(this.config.language);
        this.field.codeEditor.language = this.config.language;

        window.H5P_code_editor_changelang(this.editor, $(language).val());
    }

    CodeEditor.prototype.updateSpacing = function(spacing) {
        this.config.spacing = $(spacing).val();
        window.H5P_code_editor_changespacing(this.editor, Number($(spacing).val()));
    }

    /**
     * Validate the current values.
     *
     * @returns {boolean}
     */
    CodeEditor.prototype.validate = function () {
        //this.setCode(this.editor.state.doc.toString(), this.config.spacing);
        return this.params.length >= 0;
    };
    
    /**
     * Remove the current field
     */
    CodeEditor.prototype.remove = function () {};

    return CodeEditor;
})(H5P.jQuery);