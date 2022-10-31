import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";

export default {
  name: "composer-footnote-button",

  initialize() {
    withPluginApi("0.8", (api) => {
      
      const tooltip = $("#footnote-tooltip");

      // reset state by hidding tooltip, it handles "click outside"
      // allowing to hide the tooltip when you click anywhere else
      tooltip.attr("data-show");

      // if we didn't actually click a footnote button, exit early
      if (!tooltip) {
        return;
      }
      
      const currentLocale = I18n.currentLocale();
      if (!I18n.translations[currentLocale].js.composer) {
        I18n.translations[currentLocale].js.composer = {};
      }
      
      I18n.translations[currentLocale].js.composer.footnote_button_text = settings.composer_footnote_button_text;
      I18n.translations[currentLocale].js.footnote_button_title = settings.composer_footnote_button_title;
      
      api.onToolbarCreate(function(toolbar) {
        toolbar.addButton({
          trimLeading: true,
          id: "quick-footnote",
          group: settings.composer_footnote_button_group,
          icon: settings.composer_footnote_button_icon,
          title: "footnote_button_title",
          perform: function(e) {
            return e.applySurround(
              '^[',
              "]",
              "footnote_button_text"
            );
          }
        });
      });
    });
  },
};
