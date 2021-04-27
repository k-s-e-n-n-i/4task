import "/project/jquery.global.js";
import $ from 'jquery'
import '/pages/demoSlider/plugin.demoSlider.ts';
import '/pages/testsSlider/tests.ts'

$(function() {
  let obj = {
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
  $('.slider').slider(obj);

  let obj2 = $.extend(obj,{
    element : object = document.querySelector('.slider2'),
    idElement : string = 'idSlider2',
    step : number = 20,
  });
  $('.slider').slider(obj2);

  mocha.run();
});