import "/project/jquery.global.js";
import $ from 'jquery'
import '/pages/demoSlider/plugin.demoSlider.ts';
import '/pages/testsSlider/tests.ts'


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
  $('.slider').slider(obj);

  let objAddStep : dataSlider = {
    element : document.querySelector('.slider2'),
    idElement : 'idSlider2',
    step : 20,
  }
  let obj2 = $.extend(obj, objAddStep);
  $('.slider').slider(obj2);

  mocha.run();
});