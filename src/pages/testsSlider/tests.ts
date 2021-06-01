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
  interface dataSlider{
    element : object,
    idElement : string,
    width : number,
    type : string,
    min : number,
    max : number,
    minStart : number,
    maxStart : number,
    step : number,
    orientation : string,
    value : string,
    scale : string,
    scaleStep : number,
  };
  let obj : dataSlider = {
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
  let objAddStep : dataSlider = {
    element : document.querySelector('.slider2'),
    idElement : 'idSlider2',
    step : 20,
  }
  let obj2 = $.extend(obj, objAddStep);

  const modelTest2 = new Model(obj2);
  const viewTest2 = new View(obj2, modelTest2);
  const contrTest2 = new Controller(obj2, modelTest2, viewTest2);

  testsControllerStep(obj2, contrTest2, assert);
});