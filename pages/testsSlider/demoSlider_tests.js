import {Model, View, Controller} from '/pages/demoSlider/plugin.demoSlider.MVC.ts';

let obj = {
	element : document.querySelector('.slider1'),
	idElement : 'idPrice1',
	width : 400,
	type : 'interval',
	min : 10,
	max : 200,
	minStart : 50,
	maxStart : 100,
	step : 20,
	orientation : 'horizontal',
	value : 'on',
	scale : 'on',
	scaleStep : 20
};

import {slider} from '/demoSlider/plugin.demoSlider.ts';

const slider_1 = new slider();
slider_1.slider(obj);

//-------------------------------------------Model---'
const modelTest = new Model();

describe("1. Ширина слайдера.", function() {
  it("Model.width: ", function() {
    assert.equal(modelTest.width(obj.element, obj.idElement), 389);//obj.width-11
  });
});
describe("2. Элемент range-sliderX.", function() {
  it("Model.sliderBlock: ", function() {
    assert.equal(modelTest.sliderBlock(obj.element, obj.idElement), document.querySelector('.searchRoom2 .slider1 .range-slider#idPrice1'));
  });
});
describe("3. Элемент range-slider__slider.", function() {
  it("Model.slider: ", function() {
    assert.equal(modelTest.slider(obj.element, obj.idElement), document.querySelector('.searchRoom2 .slider1 .range-slider#idPrice1 .range-slider__slider'));
  });
});
describe("4. Высота блока со слайдером и заголовком. Без развернутых настроек всегда 53px", function() {
  it("Model.height: ", function() {
    assert.equal(modelTest.height(obj.element, obj.idElement), 53);
  });
});
describe("5. Элемент ind.", function() {
  it("Model.ind: ", function() {
    assert.equal(modelTest.ind(obj.element, obj.idElement), document.querySelector('.searchRoom2 .slider1 .range-slider#idPrice1 .range-slider__slider .range-slider__range'));
  });
});
describe("6. Ширина слайдера.", function() {
  it("Model.indWidth: ", function() {
    assert.equal(modelTest.indWidth(obj.element, obj.idElement), Math.round((389/(200-10)*(100-10))-(389/(200-10)*(50-10))) );
  });
});
describe("7. Элемент rangeLeft.", function() {
  it("Model.rangeLeft: ", function() {
    assert.equal(modelTest.rangeLeft(obj.element, obj.idElement), document.querySelector('.searchRoom2 .slider1 .range-slider#idPrice1 .range-slider__slider .range-slider__left'));
  });
});
describe("8. Позиция левого шарика в px.", function() {
  it("Model.posRangeLeft: ", function() {
    assert.equal(modelTest.posRangeLeft(obj.element, obj.idElement), parseInt(389/(200-10)*(50-10)) );
  });
});
describe("9. Элемент rangeRight.", function() {
  it("Model.rangeRight: ", function() {
    assert.equal(modelTest.rangeRight(obj.element, obj.idElement), document.querySelector('.searchRoom2 .slider1 .range-slider#idPrice1 .range-slider__slider .range-slider__right'));
  });
});
describe("10. Позиция правого шарика в px.", function() {
  it("Model.posRangeRight: ", function() {
    assert.equal(modelTest.posRangeRight(obj.element, obj.idElement), parseInt(389/(200-10)*(100-10)) );
  });
});
describe("11. Элемент range-slider__label-min.", function() {
  it("Model.valueMin: ", function() {
    assert.equal(modelTest.valueMin(obj.element, obj.idElement), document.querySelector('.searchRoom2 .slider1 .range-slider__label-min'));
  });
});
describe("12. Элемент range-slider__label-max.", function() {
  it("Model.valueMax: ", function() {
    assert.equal(modelTest.valueMax(obj.element, obj.idElement), document.querySelector('.searchRoom2 .slider1 .range-slider__label-max'));
  });
});

//-------------------------------------------View---
const viewTest = new View();
//не представляю как писать тесты на методы отрисовки, и в целом методы void


//-------------------------------------------Controller---
const contrTest = new Controller();

describe("1. Определение ориентации.", function() {
  it("Controller.defineOrientation: ", function() {
    assert.equal(contrTest.defineOrientation(obj.orientation), 'x' );
  });
});

//3. Controller.moveAt (void)
/*describe("4. Определение позиции элемента.", function() {//что-то не получилось
  it("Controller.getCoords: ", function() {
    assert.equal(contrTest.getCoords(modelTest.rangeLeft(obj.element, obj.idElement)), {
    	top : 1339, 
    	left : parseInt(modelTest.slider(thisSlider, dataSlider.idElement).offsetLeft+parseInt(389/(200-10)*(50-10)),
    });
  });
});
console.log('get', modelTest.posRangeLeft(obj.element, obj.idElement), parseInt(389/(200-10)*(50-10)), contrTest.getCoords(modelTest.rangeLeft(obj.element, obj.idElement)));*/

// 5. Controller.movingRange (void)
// 6. Controller.drawValueMin (void)
// 7. Controller.drawValueMax (void)
// 8. Controller.writeDataSliderMin (void)
// 9. Controller.writeDataSliderMax (void)
// 10. Controller.changeConfigInputMin (void)
// 11. Controller.changeConfigInputMax (void)
// 12. Controller.moveRangeOnclickSlider (void)
// 13. Controller.definePosStepClosestClick (void) // внутри вызывается masScale(), поэтому не могу написать тест

/*describe("14. Массив пикселей, по которым располагаются шаги сладера.", function() {//получаю одинаковые массивы, но не засчитываются за равные
  it("controller.masStepsForMoving: ", function() {
    assert.equal(contrTest.masScale(obj.element, obj, modelTest), [parseInt(389/(200-10)*20*0), parseInt(389/(200-10)*20*1), 81, 122, 163, 204, 245, 286, 327, 368] );
  });
});
console.log('14. Массив пикселей, по которым располагаются шаги сладера.', contrTest.masScale(obj.element, obj, modelTest));
console.log('14. Массив пикселей, по которым располагаются шаги сладера.', [parseInt(389/(200-10)*20*0), parseInt(389/(200-10)*20*1), 81, 122, 163, 204, 245, 286, 327, 368]);
*/
// 15. Controller.configCheck (void)
// 16. Controller.checkMinMaxStart (void)
// 17. Controller.configCheckStar (void)