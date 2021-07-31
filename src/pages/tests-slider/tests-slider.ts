let mocha = require('mocha');
import '@/modules/plugin.slider/plugin.slider.ts';
import { Options } from '../../modules/plugin.slider/plugin.slider';

import '@Pages/tests-slider/tests.ts';

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
  ($('.slider') as any).slider(obj);

  let objAddStep: object = {
    element: document.querySelector('.slider2'),
    idElement: 'idSlider2',
    step: 20,
  };
  let obj2 = $.extend(obj, objAddStep);
  ($('.slider') as any).slider(obj2);

  //mocha.setup('bdd');
  mocha.run();
});
