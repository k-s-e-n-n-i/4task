import { Model } from '../../modules/plugin.slider/plugin.slider.model';
import { View } from '../../modules/plugin.slider/plugin.slider.view';
import { Controller } from '../../modules/plugin.slider/plugin.slider.controller';
import { Options } from '../../modules/plugin.slider/plugin.slider';

//import { assert } from '../../pages/tests-slider/chai.js';

import { testsModel } from '../../pages/tests-slider/tests.model';
import { testsController } from '../../pages/tests-slider/tests.controller';
import { testsControllerStep } from '../../pages/tests-slider/tests.controller.methodsWithStep';

$(function () {
  let obj: Options = {
    element: document.querySelector('.slider1'),
    idElement: 'idSlider1',
    width: 400,
    type: 'interval',
    min: 10,
    max: 200,
    minStart: 50,
    maxStart: 100,
    step: 1,
    orientation: 'horizontal',
    value: 'on',
    scale: 'on',
    scaleStep: 20,
    settings: 'off',
  };

  //-------------------------------------------Model---
  const modelTest = new Model(obj);
  testsModel(modelTest);

  //-------------------------------------------View---
  const viewTest = new View(obj, modelTest);
  //не представляю как писать тесты на методы отрисовки, и в целом методы void

  //-------------------------------------------Controller---
  const contrTest = new Controller(obj, modelTest, viewTest);
  testsController(obj, modelTest, contrTest);

  //-------------------------------------------Controller---слайдер с шагом---
  let objAddStep: object = {
    element: document.querySelector('.slider2'),
    idElement: 'idSlider2',
    step: 20,
  };
  let obj2 = $.extend(obj, objAddStep);

  const modelTest2 = new Model(obj2);
  const viewTest2 = new View(obj2, modelTest2);
  const contrTest2 = new Controller(obj2, modelTest2, viewTest2);

  testsControllerStep(obj2, contrTest2);
});
