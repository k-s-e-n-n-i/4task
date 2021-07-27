import '@Blocks/checkbox-list/checkbox-list.scss';
import '@Blocks/input-text/input-text.scss';
import '@Blocks/radiogroup/radiogroup.scss';
import '@Blocks/range-slider/range-slider.scss';
import '@Blocks/topic-label/topic-label.scss';
import '@/page-demo-sliders/page-demo-sliders.scss';

import '@/modules/plugin.slider/plugin.slider.ts';

$(function () {
  $('.slider').slider({
    element: document.querySelector('.slider .slider1'),
    idElement: 'idSlider1',
    settings: 'on',
    minStart: 200,
  });

  $('.slider').slider({
    element: document.querySelector('.slider .slider2'),
    idElement: 'idSlider2',
    width: 400,
    type: 'from0to',
    min: 0,
    max: 10,
    minStart: 5,
    maxStart: 7,
    step: 5,
    orientation: 'horizontal',
    value: 'on',
    scale: 'off',
    scaleStep: 10,
    settings: 'on',
  });

  $('.slider').slider({
    element: document.querySelector('.slider .slider3'),
    idElement: 'idSlider3',
    type: 'one',
    min: 0,
    max: 5000,
    maxStart: 2000,
    scaleStep: 5,
    settings: 'on',
  });

  $('.slider').slider({
    element: document.querySelector('.slider .slider4'),
    idElement: 'idSlider4',
    width: 400,
    type: 'interval',
    min: 10,
    max: 200,
    minStart: 0,
    maxStart: 100,
    step: 20,
    orientation: 'horizontal',
    value: 'on',
    scale: 'on',
    scaleStep: 10,
    settings: 'on',
  });

  $('.slider').slider({
    element: document.querySelector('.slider .slider5'),
    idElement: 'idSlider5',
    width: 600,
    type: 'from0to',
    min: 100,
    max: 40000,
    maxStart: 8000,
    value: 'off',
    scale: 'on',
    settings: 'on',
  });
});
