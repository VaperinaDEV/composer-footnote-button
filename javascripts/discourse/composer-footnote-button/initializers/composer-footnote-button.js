import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "composer-footnote-button",

  initialize() {
    withPluginApi("0.8", (api) => {
      api.onToolbarCreate(function(toolbar) {
        toolbar.addButton({
          trimLeading: true,
          id: "quick-footnote",
          group: "extras",
          icon: 'superscript',
          title: I18n.t(themePrefix("composer_footnote_button_title")),
          perform: function(e) {
            return e.applySurround(
              '^[',
              "]",
              I18n.t(themePrefix("composer_footnote_button_text"))
            );
          }
        });
      });
    });
  },
};
