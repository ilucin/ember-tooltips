import Ember from 'ember';
import layout from '../templates/components/tooltip-on-parent';

const { computed, run, get } = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  layout,

  style: computed(function() {
    return Ember.String.htmlSafe('display:none;');
  }),

  init(...args) {
    this._super(args);

    run.schedule('afterRender', () => {
      const parentView = this.get('parentView');

      if (!parentView) {
        console.warn('No parentView found');
      } else if (parentView.renderTooltip) {
        parentView.renderTooltip(this);
      } else {
        console.warn('No renderTooltip method found on the parent view of the {{tooltip-on-parent}} component');
      }

      if (!this.isDestroying) {
        this.destroySelf();
      }
    });
  },

  destroySelf() {
    if (this.remove) {
      this.destroy();
    } else {
      this.element.remove();
    }
  }
});
