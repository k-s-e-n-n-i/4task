//import {Model, View, Controller} from '/pages/demoSlider/plugin.demoSlider.MVC.ts';
import {Model} from '/pages/demoSlider/plugin.demoSlider.model.ts';
import {View} from '/pages/demoSlider/plugin.demoSlider.view.ts';
import {Controller} from '/pages/demoSlider/plugin.demoSlider.controller.ts';


export class slider {
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

  slider(){
    /*let dataSlider = Object.assign({
      element : document.querySelector('.slider0'),
      idElement : 'idSlider0',
      width : 400,
      type : 'interval',
      min : 0,
      max : 1000,
      minStart : 150,
      maxStart : 500,
      step : 1,//шаг
      orientation : 'horizontal',
      value : 'on',
      scale : 'on',
      scaleStep : 10,//12 ??
      settings : 'on',
    }, option);*/


    const model = new Model(this.dataSlider);
    const view = new View(this.dataSlider, model);
    const controller = new Controller(this.dataSlider, model, view);

    model.getRangeSlider().style.width = this.dataSlider.width +'px';
    
    controller.checkMinMaxStart();
  

    
    if (this.settings == 'on'){//?
      console.log('this.settings1',this.settings)
      controller.writeDataInConfig();
      console.log('this.settings2',this.settings)
    }
    view.drawRange();

    controller.moveRangeOnclickSlider();
    if (this.settings == 'on'){
      console.log('this.settings3',this.settings)
      controller.applyConfig();
      console.log('this.settings4',this.settings)
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

    /*let thisSlider = dataSlider.element;
    model.getRangeSlider(thisSlider, dataSlider.idElement).style.width = dataSlider.width;
    controller.checkMinMaxStart(dataSlider);//определили текущие мин и мах
    if (dataSlider.settings == 'on'){
      controller.writeDataInConfig(thisSlider, dataSlider, model, controller);//min-max value
    }
    view.drawRange(thisSlider, dataSlider, model);
    controller.moveRangeOnclickSlider(thisSlider, dataSlider, model, controller);
    if (dataSlider.settings == 'on'){
      controller.applyConfig(thisSlider, dataSlider, model, controller, view);
    }
    model.getRangeLeft(thisSlider, dataSlider.idElement).onmousedown = function(e) {
      controller.moveAt(thisSlider, dataSlider, model.getRangeLeft(thisSlider, dataSlider.idElement), e, 'left', model, controller);
    };
    model.getRangeRight(thisSlider, dataSlider.idElement).onmousedown = function(e) {
      controller.moveAt(thisSlider, dataSlider, model.getRangeRight(thisSlider, dataSlider.idElement), e, 'right', model, controller);
    };

    view.drawType(thisSlider, dataSlider, model);
    view.drawScale(thisSlider, dataSlider, model);
    view.drawOrientation(thisSlider, dataSlider, model);
    view.drawValue(thisSlider, dataSlider, model);*/
  };
}