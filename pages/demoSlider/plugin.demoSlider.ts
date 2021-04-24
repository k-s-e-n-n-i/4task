import $ from "jquery"
import {Model} from '/pages/demoSlider/plugin.demoSlider.model.ts';
import {View} from '/pages/demoSlider/plugin.demoSlider.view.ts';
import {Controller} from '/pages/demoSlider/plugin.demoSlider.controller.ts';


(function( $ ) {
	$.fn.slider = function(options) {

    class Slider {
      public element : any;
      public idElement : string;
      public width : number;
      public type : string = 'interval';
      public min : number;
      public max : number;
      public minStart : number;
      public maxStart : number;
      public step : number;
      public orientation : string = 'horizontal';
      public value : string = 'on';
      public scale : string = 'on';
      public scaleStep : number;
      public settings : string = 'on';
      public dataSlider : object = {};
      
      constructor(option){
        this.dataSlider = {
          element : option.element,
          idElement : option.idElement,
          width : option.width || 400,
          type : option.type || 'interval',
          min : option.min || 0,
          max : option.max || 1000,
          minStart : option.minStart || 0,
          maxStart : option.maxStart || 500,
          step : option.step || 1,
          orientation : option.orientation || 'horizontal',
          value : option.value || 'on',
          scale : option.scale || 'on',
          scaleStep : option.scaleStep ||10,
          settings : option.settings || 'on',
        };
      }
    
      runSlider(){
        const model = new Model(this.dataSlider);
        const view = new View(this.dataSlider, model);
        const controller = new Controller(this.dataSlider, model, view);
    
        model.getRangeSlider().style.width = this.dataSlider.width +'px';
        
        controller.checkMinMaxStart();
        if (this.settings == 'on'){
          controller.writeDataInConfig();
        }
        view.drawRange();
    
        controller.moveRangeOnclickSlider();
        if (this.settings == 'on'){
          controller.applyConfig();
        }
    
        model.getRangeLeft().onmousedown = function(e) {
          controller.moveAt(model.getRangeLeft(), e, 'left');
        };
        model.getRangeRight().onmousedown = function(e) {
          controller.moveAt(model.getRangeRight(), e, 'right');
        };
    
        view.drawType();
        view.drawScale();
        view.drawOrientation();
        view.drawValue();
      };
    }

    const slider = new Slider(options);
    slider.runSlider();
  }
})(jQuery)