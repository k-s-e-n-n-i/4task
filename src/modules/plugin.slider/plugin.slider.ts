import { Model } from '../../modules/plugin.slider/plugin.slider.model';
import { View } from '../../modules/plugin.slider/plugin.slider.view';
import { Controller } from '../../modules/plugin.slider/plugin.slider.controller';

export interface Options {
  element: HTMLElement;
  idElement: string;
  width: number;
  type: string;
  min: number;
  max: number;
  minStart: number;
  maxStart: number;
  step: number;
  orientation: string;
  value: string;
  scale: string;
  scaleStep: number;
  settings: string;
}

(function ($) {
  $.fn.extend({
    slider: function (options: Options) {
      class Slider {
        public element: HTMLElement;
        public idElement: string;
        public width: number;
        public type: string = 'interval';
        public min: number;
        public max: number;
        public minStart: number;
        public maxStart: number;
        public step: number;
        public orientation: string = 'horizontal';
        public value: string = 'on';
        public scale: string = 'on';
        public scaleStep: number;
        public settings: string = 'on';
        public dataSlider: Options;

        constructor(option: Options) {
          this.dataSlider = {
            element: option.element,
            idElement: option.idElement,
            width: option.width || 400,
            type: option.type || 'interval',
            min: option.min || 0,
            max: option.max || 1000,
            minStart: option.minStart || 0,
            maxStart: option.maxStart || 500,
            step: option.step || 1,
            orientation: option.orientation || 'horizontal',
            value: option.value || 'on',
            scale: option.scale || 'on',
            scaleStep: option.scaleStep || 10,
            settings: option.settings || 'on',
          };
        }

        runSlider() {
          const model = new Model(this.dataSlider);
          const view = new View(this.dataSlider, model);
          const controller = new Controller(this.dataSlider, model, view);
          let settings = this.dataSlider.settings;

          model.rangeSlider.style.width = this.dataSlider.width + 'px';

          controller.checkMinMaxStart();
          if (settings == 'on') {
            controller.writeDataInConfig();
          }
          view.drawRange();

          controller.moveRangeOnclickSlider();
          if (settings == 'on') {
            controller.applyConfig();
          }

          model.rangeLeft.addEventListener('mousedown', function () {
            controller.moveAt(model.rangeLeft, 'left');
          });
          model.rangeRight.addEventListener('mousedown', function () {
            controller.moveAt(model.rangeRight, 'right');
          });

          view.drawType();
          view.drawScale();
          view.drawOrientation();
          view.drawValue();
        }
      }

      const slider = new Slider(options);
      slider.runSlider();
    },
  });
})(jQuery);
