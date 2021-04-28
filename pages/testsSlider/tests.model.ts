import "/project/jquery.global.js";
import $ from "jquery"
import '/pages/demoSlider/plugin.demoSlider.ts';


export function testsModel(modelTest : object, assert : object){
  describe("1. Ширина слайдера.", function() {
    it("Model.getWidth: ", function() {
      assert.equal(modelTest.getWidth(), 389);//obj.getWidth-11
    });
  });
  describe("2. Элемент range-sliderX.", function() {
    it("Model.getRangeSlider: ", function() {
      assert.equal(modelTest.rangeSlider, document.querySelector('.slider1 .range-slider#idSlider1'));
    });
  });
  describe("3. Элемент range-slider__slider.", function() {
    it("Model.getSlider: ", function() {
      assert.equal(modelTest.slider, document.querySelector('.slider1 .range-slider#idSlider1 .range-slider__slider'));
    });
  });
  describe("4. Элемент range-slider__range.", function() {
    it("Model.getRange: ", function() {
      assert.equal(modelTest.range, document.querySelector('.slider1 .range-slider#idSlider1 .range-slider__slider .range-slider__range'));
    });
  });
  describe("5. Ширина активного диапазона.", function() {
    it("Model.getWidthRange: ", function() {
      assert.equal(modelTest.getWidthRange(), Math.round((389/(200-10)*(100-10))-(389/(200-10)*(50-10))) );
    });
  });
  describe("6. Элемент getRangeLeft.", function() {
    it("Model.getRangeLeft: ", function() {
      assert.equal(modelTest.rangeLeft, document.querySelector('.slider1 .range-slider#idSlider1 .range-slider__slider .range-slider__left'));
    });
  });
  describe("7. Позиция левого шарика (range-slider__left) в px.", function() {
    it("Model.getPosRangeLeft: ", function() {
      assert.equal(modelTest.getPosRangeLeft(), parseInt(389/(200-10)*(50-10)) );
    });
  });
  describe("8. Элемент getRangeRight.", function() {
    it("Model.getRangeRight: ", function() {
      assert.equal(modelTest.rangeRight, document.querySelector('.slider1 .range-slider#idSlider1 .range-slider__slider .range-slider__right'));
    });
  });
  describe("9. Позиция правого шарика (range-slider__right) в px.", function() {
    it("Model.getPosRangeRight: ", function() {
      assert.equal(modelTest.getPosRangeRight(), parseInt(389/(200-10)*(100-10)) );
    });
  });
  describe("10. Элемент range-slider__label-min.", function() {
    it("Model.getElemValueMin: ", function() {
      assert.equal(modelTest.elemValueMin, document.querySelector('.slider1 .range-slider__label-min'));
    });
  });
  describe("11. Элемент range-slider__label-max.", function() {
    it("Model.getElemValueMax: ", function() {
      assert.equal(modelTest.elemValueMax, document.querySelector('.slider1 .range-slider__label-max'));
    });
  });
}