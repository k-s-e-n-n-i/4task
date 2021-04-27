import "/project/jquery.global.js";
import $ from "jquery"
import {Model} from '/pages/demoSlider/plugin.demoSlider.model.ts';
import {View} from '/pages/demoSlider/plugin.demoSlider.view.ts';
import {Controller} from '/pages/demoSlider/plugin.demoSlider.controller.ts';
import '/pages/demoSlider/plugin.demoSlider.ts';

import {assert} from '/pages/testsSlider/chai.js'

import {testsModel} from '/pages/testsSlider/tests.model.ts'
import {testsController} from '/pages/testsSlider/tests.controller.ts'
import {testsControllerStep} from '/pages/testsSlider/tests.controller.methodsWithStep.ts'

$(function() {
  let obj : object = {
    element : object = document.querySelector('.slider1'),
    idElement : string = 'idSlider1',
    width : number = 400,
    type : string = 'interval',
    min : number = 10,
    max : number = 200,
    minStart : number = 50,
    maxStart : number = 100,
    step : number = 1,
    orientation : string = 'horizontal',
    value : string = 'on',
    scale : string = 'on',
    scaleStep : number = 20
  };

  //-------------------------------------------Model---
  const modelTest = new Model(obj);
  testsModel(modelTest, assert);

  //-------------------------------------------View---
  const viewTest = new View(obj, modelTest);
  //не представляю как писать тесты на методы отрисовки, и в целом методы void

  //-------------------------------------------Controller---
  const contrTest = new Controller(obj, modelTest, viewTest);
  testsController(obj, modelTest, contrTest, assert);

  //-------------------------------------------Controller---слайдер с шагом---
  let obj2 = Object.assign({}, obj, {
    element : object = document.querySelector('.slider2'),
    idElement : string = 'idSlider2',
    step : number = 20,
  });

  const modelTest2 = new Model(obj2);
  const viewTest2 = new View(obj2, modelTest2);
  const contrTest2 = new Controller(obj2, modelTest2, viewTest2);

  testsControllerStep(obj2, modelTest2, contrTest2, assert);
});