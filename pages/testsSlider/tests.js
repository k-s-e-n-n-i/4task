import "/project/jquery.global.js";
import $ from "jquery"
import {Model} from '/pages/demoSlider/plugin.demoSlider.model.ts';
import {View} from '/pages/demoSlider/plugin.demoSlider.view.ts';
import {Controller} from '/pages/demoSlider/plugin.demoSlider.controller.ts';
import '/pages/demoSlider/plugin.demoSlider.ts';
import 'chai';
import {assert} from '/pages/testsSlider/chai.js'


let obj = {
  element : document.querySelector('.slider1'),
  idElement : 'idSlider1',
  width : 400,
  type : 'interval',
  min : 10,
  max : 200,
  minStart : 50,
  maxStart : 100,
  step : 1,
  orientation : 'horizontal',
  value : 'on',
  scale : 'on',
  scaleStep : 20
};


//-------------------------------------------Model---'
const modelTest = new Model(obj);

describe("1. Ширина слайдера.", function() {
  it("Model.getWidth: ", function() {
    assert.equal(modelTest.getWidth(), 389);//obj.getWidth-11
  });
});
describe("2. Элемент range-sliderX.", function() {
  it("Model.getRangeSlider: ", function() {
    assert.equal(modelTest.getRangeSlider(), document.querySelector('.slider1 .range-slider#idSlider1'));
  });
});
describe("3. Элемент range-slider__slider.", function() {
  it("Model.getSlider: ", function() {
    assert.equal(modelTest.getSlider(), document.querySelector('.slider1 .range-slider#idSlider1 .range-slider__slider'));
  });
});
describe("4. Элемент range-slider__range.", function() {
  it("Model.getRange: ", function() {
    assert.equal(modelTest.getRange(), document.querySelector('.slider1 .range-slider#idSlider1 .range-slider__slider .range-slider__range'));
  });
});
describe("5. Ширина активного диапазона.", function() {
  it("Model.getWidthRange: ", function() {
    assert.equal(modelTest.getWidthRange(), Math.round((389/(200-10)*(100-10))-(389/(200-10)*(50-10))) );
  });
});
describe("6. Элемент getRangeLeft.", function() {
  it("Model.getRangeLeft: ", function() {
    assert.equal(modelTest.getRangeLeft(), document.querySelector('.slider1 .range-slider#idSlider1 .range-slider__slider .range-slider__left'));
  });
});
describe("7. Позиция левого шарика (range-slider__left) в px.", function() {
  it("Model.getPosRangeLeft: ", function() {
    assert.equal(modelTest.getPosRangeLeft(), parseInt(389/(200-10)*(50-10)) );
  });
});
describe("8. Элемент getRangeRight.", function() {
  it("Model.getRangeRight: ", function() {
    assert.equal(modelTest.getRangeRight(), document.querySelector('.slider1 .range-slider#idSlider1 .range-slider__slider .range-slider__right'));
  });
});
describe("9. Позиция правого шарика (range-slider__right) в px.", function() {
  it("Model.getPosRangeRight: ", function() {
    assert.equal(modelTest.getPosRangeRight(), parseInt(389/(200-10)*(100-10)) );
  });
});
describe("10. Элемент range-slider__label-min.", function() {
  it("Model.getElemValueMin: ", function() {
    assert.equal(modelTest.getElemValueMin(), document.querySelector('.slider1 .range-slider__label-min'));
  });
});
describe("11. Элемент range-slider__label-max.", function() {
  it("Model.getElemValueMax: ", function() {
    assert.equal(modelTest.getElemValueMax(), document.querySelector('.slider1 .range-slider__label-max'));
  });
});

//-------------------------------------------View---
const viewTest = new View(obj, modelTest);
//не представляю как писать тесты на методы отрисовки, и в целом методы void

//-------------------------------------------Controller---
const contrTest = new Controller(obj, modelTest, viewTest);

describe("1. Определение ориентации.", function() {
  it("Controller.defineOrientation: ", function() {
    assert.equal(contrTest.defineOrientation(obj.orientation), 'x' );
  });
});

//2. Controller.moveAt (void)
describe("3. Определение позиции элемента. [? получаю одинаковые массивы, но не засчитываются за равные ? (в консоли)]", function() {
  it("Controller.getCoords: ", function() {
    assert.equal(contrTest.getCoords(modelTest.getRangeLeft()), {
    	top : document.querySelector('.slider1 .range-slider#idSlider1 .range-slider__slider .range-slider__left').getBoundingClientRect().top +pageYOffset, 
    	left : document.querySelector('.slider1 .range-slider#idSlider1 .range-slider__slider .range-slider__left').getBoundingClientRect().left,
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


//--------------------------------------------------------------
//для проверки методов для слайдера "с шагом" (step != 1)
let obj2 = Object.assign({}, obj, {
  element : document.querySelector('.slider2'),
  idElement : 'idSlider2',
  step : 20,
});

const modelTest2 = new Model(obj2);
const viewTest2 = new View(obj2, modelTest);
const contrTest2 = new Controller(obj2, modelTest2, viewTest2);
describe("12. Ближайшая к клику позиция.", function() {
  it("controller.definePosStepClosestClick: ", function() {
    assert.equal(contrTest2.definePosStepClosestClick(200), 204.73684210526315);
  });
});

let widthStep = (obj2.width-11) / (obj2.max - obj2.min) * obj2.step, //389/(200-10)*20,
  masPosStep = [widthStep*0, widthStep*1, widthStep*2, widthStep*3, widthStep*4, widthStep*5, widthStep*6, widthStep*7, widthStep*8, widthStep*9];

describe("13. Массив пикселей, по которым располагаются шаги сладера. [? получаю одинаковые массивы, но не засчитываются за равные ? (в консоли)]", function() {
  it("controller.masStepsForMoving: ", function() {
    assert.equal(contrTest2.masStepsForMoving(), masPosStep);
  });
});
console.log('13. Массив пикселей, по которым располагаются шаги сладера.', contrTest2.masStepsForMoving());
console.log('13. Массив пикселей, по которым располагаются шаги сладера.', masPosStep);

// 14. Controller.applyConfig (void)
// 15. Controller.checkMinMaxStart (void)
// 16. Controller.writeDataInConfig (void)