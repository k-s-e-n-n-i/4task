import '@/modules/plugin.slider/plugin.slider.ts';
let describe = require('mocha').describe;
let assert = require('chai').assert;

export function testsController(obj: any, modelTest: any, contrTest: any) {
  describe('1. Определение ориентации.', function () {
    it('Controller.defineOrientation: ', function () {
      assert.equal(contrTest.defineOrientation(obj.orientation), 'x');
    });
  });

  //2. Controller.moveAt (void)

  describe('3. Определение позиции элемента. [? получаю одинаковые массивы, но не засчитываются за равные ? (в консоли)]', function () {
    it('Controller.getCoords: ', function () {
      assert.equal(contrTest.getCoords(modelTest.rangeLeft), {
        top:
          document
            .querySelector('.slider1 .range-slider#idSlider1 .range-slider__slider .range-slider__left')
            .getBoundingClientRect().top + pageYOffset,
        left: document
          .querySelector('.slider1 .range-slider#idSlider1 .range-slider__slider .range-slider__left')
          .getBoundingClientRect().left,
      });
    });
  });

  // 4. Controller.movingRange (void)
  // 5. Controller.drawValueMin (void)
  // 6. Controller.drawValueMax (void)
  // 7. Controller.writeDataSliderMin (void)
  // 8. Controller.writeDataSliderMax (void)
  // 9. Controller.changeConfigInputMin (void)
  // 10. Controller.changeConfigInputMax (void)
  // 11. Controller.moveRangeOnclickSlider (void)

  // 14. Controller.applyConfig (void)
  // 15. Controller.checkMinMaxStart (void)
  // 16. Controller.writeDataInConfig (void)
}
