import "/project/jquery.global.js";
import $ from 'jquery'
import '/pages/demoSlider/plugin.demoSlider.ts';


$(function() {
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
  $('.slider').slider(obj);

  let obj2 = $.extend(obj,{
    element : document.querySelector('.slider2'),
    idElement : 'idSlider2',
    step : 20,
  });
  $('.slider').slider(obj2);

  mocha.run();
});


import '/pages/testsSlider/tests.js'