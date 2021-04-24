import $ from "jquery"

export class Controller {
  model : any;
  view : any;
  thisSlider : any;
  idElement : string;
  min: number;
  max : number;
  minStart: number;
  maxStart : number;
  step : number;
  type : string;
  orientation : string;
  scale : string;
  scaleStep : number;
  value : string;
  settings : string;

  constructor(option, model, view){
    this.model = model;
    this.view = view;
    this.thisSlider = option.element;
    this.idElement = option.idElement;
    this.min = option.min;
    this.max = option.max;
    this.minStart = option.minStart;
    this.maxStart = option.maxStart;
    this.step = option.step;
    this.type = option.type;
    this.orientation = option.orientation;
    this.scale = option.scale;
    this.scaleStep = option.scaleStep;
    this.value = option.value;
    this.settings = option.settings;
  }


  defineOrientation(dataSliderOrientation : string) : string{
    if (dataSliderOrientation == 'horizontal') {
      return 'x';
    }
    return 'y';
  }
  
  moveAt(range, e, lr : string) : void{
    let startPos = parseInt(range.style.left);
    let indWidth = this.model.getWidthRange();
    switch(lr){//чтобы сверху был ползунок, который перемещали последним (если друг на друга наедут)
      case 'left' : {
        this.model.getRangeLeft().style.zindex = 15;
        this.model.getRangeRight().style.zindex = 10;
        break;
      }
      case 'right' : {
        this.model.getRangeRight().style.zindex = 15;
        this.model.getRangeLeft().style.zindex = 10;
        break;
      }
    }
    let thisClick = this.thisSlider, contr = this;
    thisClick.onmousemove = function(e) {
      let pos, p;
      switch(contr.defineOrientation(contr.orientation)) {
        case 'x': {
          if (contr.step == 1){
            pos = e.pageX - parseInt(contr.model.getSlider().offsetLeft);
            contr.movingRange(lr, startPos, pos, indWidth);
          }else{
            let masScale = contr.masStepsForMoving();
            
            p = e.pageX - parseInt(contr.model.getSlider().offsetLeft);
  
            if (masScale.indexOf(p) != -1){
              pos = p;
              contr.movingRange(lr, startPos, pos, indWidth);
            }else{
              pos = startPos;
            }
          }
          break;
        }
        case 'y': {
          if (contr.step == 1){
            pos = e.pageY - contr.getCoords(contr.model.getSlider()).top;
            contr.movingRange(lr, startPos, pos, indWidth);
          }else{
            let masScale = contr.masStepsForMoving();
  
            p = e.pageY - contr.getCoords(contr.model.getSlider()).top;
            
            if (masScale.indexOf(p) != -1){
              pos = p;
              contr.movingRange(lr, startPos, pos, indWidth);
            }else{
              pos = startPos;
            }
          }
          break;
        }
        default : break;
      }
    };

    thisClick.onmouseup = function(e) {
        thisClick.onmousemove = null;
        thisClick.onmouseup = null;
    }; 
  }
  getCoords(elem : any) : object { // https://learn.javascript.ru/coordinates-document
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
  
  movingRange(lr : string, startPos : number, pos : number, indWidth : number) : void{
    let price, step = 0;
    if ((pos >= 0) && (pos <= this.model.getWidth())){
      if (lr == 'left'){	
        if ((this.model.getPosRangeRight() >= pos)&&(this.type != 'from0to')){
          step = startPos - pos;//длина перемещения левого указателя	
          price = calcValue(pos, this);
          this.model.getRangeLeft().style.left = pos+'px';//позиция указателей
          this.model.getRange().style.transform = 'translate('+pos+'px, 0px)';
          startPos = pos;
          this.drawValueMin(price);
          if (this.settings == 'on'){
            this.changeConfigInputMin(price);
          }
          this.writeDataSliderMin(price);
          this.model.getRange().style.width = indWidth+step+'px';
        }
      }

      if (lr == 'right'){
        if (this.model.getPosRangeLeft() <= pos){
          step = pos - startPos;//длина перемещения правого указателя
          price = calcValue(pos, this);
          this.model.getRangeRight().style.left = pos+'px';//позиция указателей
          this.drawValueMax(price);
          if (this.settings == 'on'){
            this.changeConfigInputMax(price);
          }
          this.writeDataSliderMax(price);
          this.model.getRange().style.width = indWidth+step+'px';
        }
      }
    }
    function calcValue(pos : number, conrtThis : any) : number{
      let pr = pos / conrtThis.model.getWidth(),
        price = ((conrtThis.max - conrtThis.min) * pr + conrtThis.min).toFixed();
      return price;
    }
  }

  drawValueMin(val : number) : void{
    this.model.getElemValueMin(this.thisSlider).innerHTML = val;
  }
  drawValueMax(val : number) : void{
    this.model.getElemValueMax(this.thisSlider).innerHTML = val;
  }

  writeDataSliderMin(val : number) : void{
    this.minStart = val;
    this.view.minStart = val;
  }
  writeDataSliderMax(val : number) : void{
    this.maxStart = val;
    this.view.maxStart = val;
  }

  changeConfigInputMin(val : number) : void{
    if (val < this.min){val = this.min;}
    this.thisSlider.querySelector(`.slider-config .slider-config__block .input-text #inputTextminStart`+this.idElement.substr(-1)).value = val;
  }
  changeConfigInputMax(val : number) : void{
    if (val > this.max){val = this.max;}
    this.thisSlider.querySelector(`.slider-config .slider-config__block .input-text #inputTextmaxStart`+this.idElement.substr(-1)).value = val;
  }
        
  moveRangeOnclickSlider() : void{
    let thisClick = this.thisSlider.querySelector('.range-slider__slider'), contr = this;
    thisClick.onmousedown = function(e) {	
      thisClick.onmouseup = function(e) {
        let pos, startPos;

        switch(contr.defineOrientation(contr.orientation)) {
          case 'x': {
            pos = e.pageX - parseInt(contr.model.getSlider().offsetLeft);
            if (contr.step != 1){
              pos = contr.definePosStepClosestClick(pos);
            }
            break;
          }
          case 'y': {
            pos = e.pageY - contr.getCoords(contr.model.getSlider()).top;
            if (contr.step != 1){
              pos = contr.definePosStepClosestClick(pos);
            }
            break;
          }
        }
        switch(contr.type) {
          case 'interval' : {
            let posL = contr.model.getPosRangeLeft(),
              posR = contr.model.getPosRangeRight();
            if (Math.abs(posL - pos) < Math.abs(posR - pos)) {
              startPos = contr.model.getPosRangeLeft();
              contr.movingRange('left', contr.model.getPosRangeLeft(), 
                pos, contr.model.getWidthRange());
            }else{
              startPos = contr.model.getPosRangeRight();
              contr.movingRange('right', contr.model.getPosRangeRight(),
                pos, contr.model.getWidthRange());
            }
            break;
          }
          case 'from0to' : {
            startPos = contr.model.getPosRangeRight();
            contr.movingRange('right', contr.model.getPosRangeRight(),
              pos, contr.model.getWidthRange());
            break;
          }
          case 'one' : {
            startPos = contr.model.getPosRangeRight();
            contr.movingRange('right', contr.model.getPosRangeRight(),
              pos, contr.model.getWidthRange());
            break;
          }
        }
      }
    }
  }
  definePosStepClosestClick(pos : number) : number{
    let p = 0, 
      masScale,
      len = this.model.getWidth();

    masScale = this.masStepsForMoving();
    for (let i = 0; i < masScale.length; i++){
      let lenL = Math.abs(masScale[i] - pos),
        lenR = Math.abs(masScale[i+1] - pos);
      
      if (lenL < len) {
        p = masScale[i];
        len = lenL;
      }else if (lenR < len){
        p = masScale[i+1];
        len = lenR;
      }
    }

    return p;
  }
  masStepsForMoving() : number[]{
    let sumSegments = (this.max - this.min) / this.step,
      w1 = this.model.getWidth() / (this.max - this.min),//одно деление
      w = w1 * this.step, //длина шага
      masScale=[];
    
    for (let i = 0; i <= sumSegments; i++) {
      masScale[i] = w*i;//parseInt(w*i); //без parseInt, чтобы точность стоимости была выше
    }

    return masScale;
  }
  
  applyConfig() : void{
    let thisClick = this.thisSlider.querySelector('.slider-config .checkbox-list__input'), contr = this;

    thisClick.onclick = function(e) {
      if (thisClick.checked == true){
        contr.thisSlider.querySelector('.slider-config .slider-config__block').style.display = 'block';
      }else{
        contr.thisSlider.querySelector('.slider-config .slider-config__block').style.display = 'none';
      }

      let inputS = contr.thisSlider.getElementsByClassName('input-text__input');
      for(var i = 0; i < inputS.length; i++) {
        inputS[i].onblur = function (){
          let idInput = this.id,
            id = contr.idElement.substr(-1),
            min,
            max,
            minStart,
            maxStart,
            step,
            scaleStep;

          if ( (idInput.indexOf('min',0) != -1) && (idInput.indexOf('minStart',0) == -1)){
            min = Number.parseInt(this.value);
            clear(contr.thisSlider, id);
            contr.min = min;
            contr.view.min = min;
          }
          if ( (idInput.indexOf('max',0) != -1) && (idInput.indexOf('maxStart',0) == -1)){
            max = Number.parseInt(this.value);
            clear(contr.thisSlider, id);
            contr.max = max;
            contr.view.max = max;
          }
          if (idInput.indexOf('minStart',0) != -1){
            minStart = Number.parseInt(this.value);
            clear(contr.thisSlider, id);
            if (minStart <= contr.maxStart){
              contr.minStart = minStart;
              contr.view.minStart = minStart;
            }
          }
          if (idInput.indexOf('maxStart',0) != -1){
            maxStart = Number.parseInt(this.value);
            clear(contr.thisSlider, id);
            if (maxStart >= contr.minStart){
              contr.maxStart = maxStart;
              contr.view.maxStart = maxStart;
            }
          }
          if (idInput.indexOf('scaleStep',0) != -1){
            scaleStep = Number.parseInt(this.value);
            clear(contr.thisSlider, id);
            contr.scaleStep = scaleStep;
            contr.view.scaleStep = scaleStep;
          }
          if (idInput.indexOf('step',0) != -1){
            step = Number.parseInt(this.value);
            clear(contr.thisSlider, id);
            contr.step = step;
            contr.view.step = step;
          }
          
          contr.checkMinMaxStart();
          contr.view.drawType();
          contr.view.drawScale();
          contr.view.drawRange();
          contr.view.drawValue();
          if (contr.settings == 'on'){
            contr.writeDataInConfig();
          }
        }
      }

      let radioS = contr.thisSlider.getElementsByClassName('radiogroup__input');
      for(var i = 0; i < radioS.length; i++) {
        radioS[i].onclick = function (){
          let id = contr.idElement.substr(-1),
            idStr = this.name,
            type, orientation, value, scale,
            typeId, orientationID, valueID, scaleID;
          if (idStr.indexOf('Type',0) != -1){
            typeId = this.id.substr(-1);
            switch(typeId) {
              case '1': type = 'interval'; break;
                case '2': {
                  type = 'from0to';
                  contr.minStart = contr.min;
                  break;
                }
                case '3': type = 'one'; break;
                default : type = 'interval';
              }
            clear(contr.thisSlider, id);
            contr.type = type;
            contr.view.type = type;
          }
          if (idStr.indexOf('Orientation',0) != -1){
            orientationID = this.id.substr(-1);
            switch(orientationID) {
              case '1': orientation = 'horizontal'; break;
                case '2': orientation = 'vertical'; break;
                default : orientation = 'horizontal';
              }
            clear(contr.thisSlider, id);
            contr.orientation = orientation;
            contr.view.orientation = orientation;
          }
          if (idStr.indexOf('Value',0) != -1){
            valueID = this.id.substr(-1);
            switch(valueID) {
              case '1': value = 'on'; break;
                case '2': value = 'off'; break;
                default : value = 'on';
              }
            clear(contr.thisSlider, id);
            contr.value = value;
            contr.view.value = value;
          }
          if (idStr.indexOf('Scale',0) != -1){
            scaleID = this.id.substr(-1);
            switch(scaleID) {
              case '1': scale = 'on'; break;
                case '2': scale = 'off'; break;
                default : scale = 'on';
              }
            clear(contr.thisSlider, id);
            contr.scale = scale;
            contr.view.scale = scale;
          }
          
          contr.checkMinMaxStart();
          contr.view.drawType();
          contr.view.drawScale();
          contr.view.drawOrientation();
          contr.view.drawValue();
          contr.view.drawRange();
          if (contr.settings == 'on'){
            contr.writeDataInConfig();
          }
        }
      };
    };	

    function clear(thisSlider : any, id : number){
      let x = thisSlider.querySelectorAll('.range-slider#idSlider'+id+' .range-slider__slider .range-slider__scale');
      for (let i=0; i<x.length; i++){
        x[i].remove();
      }	

      thisSlider.querySelector('.range-slider#idSlider'+id+' .range-slider__left').style.display = 'inline-block';
      thisSlider.querySelector('.range-slider#idSlider'+id+' .range-slider__range').style.display = 'inline-block';
    }
  }
  
  checkMinMaxStart() : void{
    if (this.minStart < this.min){this.minStart = this.min; this.view.minStart = this.min;}
    if (this.maxStart > this.max){this.maxStart = this.max; this.view.maxStart = this.max;}
    if (this.minStart > this.max){this.minStart = this.max; this.view.minStart = this.max;}
  }

  writeDataInConfig() : void{
    this.model.getRangeSlider().querySelector('.range-slider__label-min').innerHTML = this.minStart;
    this.model.getRangeSlider().querySelector('.range-slider__label-max').innerHTML = this.maxStart;
    
    let typeID, orientationID, valueID, scaleID,
      id = this.idElement.substr(-1);

    switch(this.type) {
      case 'interval'	: typeID = '1'; break;
      case 'from0to'	: {
        typeID = '2'; 
        this.writeDataSliderMin(this.min);
        break;
      }
      case 'one'		: typeID = '3'; break;
      default 		: typeID = '1';
    }
    switch(this.orientation) {
      case 'horizontal': orientationID = '1'; break;
      case 'vertical': orientationID = '2'; break;
      default : orientationID = '1';
    }
    switch(this.value) {
      case 'on': valueID = '1'; break;
      case 'off': valueID = '2'; break;
      default : valueID = '1';
    }
    switch(this.scale) {
      case 'on': scaleID = '1'; break;
      case 'off': scaleID = '2'; break;
      default : scaleID = '1';
    }

    this.thisSlider.querySelector(this.model.configItemMin+id).value = this.min;
    this.thisSlider.querySelector(this.model.configItemMax+id).value = this.max;
    this.thisSlider.querySelector(this.model.configItemMinStart+id).value = this.minStart;
    this.thisSlider.querySelector(this.model.configItemMaxStart+id).value = this.maxStart;
    this.thisSlider.querySelector(this.model.configItemStep +id).value = this.step;
    this.thisSlider.querySelector(this.model.configItemScaleStep +id).value = this.scaleStep;
    this.thisSlider.querySelector(`.radiogroup__input[name=rbGroopType${id}]#rbrbGroopType${id}${id}${typeID}`).checked = true;
    this.thisSlider.querySelector(`.radiogroup__input[name=rbGroopOrientation${id}]#rbrbGroopOrientation${id}${id}${orientationID}`).checked = true;
    this.thisSlider.querySelector(`.radiogroup__input[name=rbGroopValue${id}]#rbrbGroopValue${id}${id}${valueID}`).checked = true;
    this.thisSlider.querySelector(`.radiogroup__input[name=rbGroopScale${id}]#rbrbGroopScale${id}${id}${scaleID}`).checked = true;
  }
}