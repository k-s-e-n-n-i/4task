export class Model {
  width(thisSlider : any, dataSliderID : string) : number{
    return thisSlider.querySelector('.range-slider#'+dataSliderID+' .range-slider__slider').clientWidth;
  }
  sliderBlock(thisSlider : any, dataSliderID : string) : any{
    return thisSlider.querySelector('.range-slider#'+dataSliderID);
  }
  slider(thisSlider : any, dataSliderID : string) : any{ 
    return this.sliderBlock(thisSlider, dataSliderID).querySelector('.range-slider__slider');
  }
  height(thisSlider : any, dataSliderID : string) : number{
    //const h = model.sliderBlock(thisSlider).height();
    const h = this.sliderBlock(thisSlider, dataSliderID).clientHeight;
    return h;
  }
  ind(thisSlider : any, dataSliderID : string) : any{ 
    return this.slider(thisSlider, dataSliderID).querySelector('.range-slider__range');
  }
  indWidth(thisSlider : any, dataSliderID : string) : number{
    return this.ind(thisSlider, dataSliderID).clientWidth;
    //return model.ind(thisSlider).width();
  }
  rangeLeft(thisSlider : any, dataSliderID : string) : any{ 
    return this.slider(thisSlider, dataSliderID).querySelector('.range-slider__left');
  }
  posRangeLeft(thisSlider : any, dataSliderID : string) : number{
    return parseInt(getComputedStyle(this.rangeLeft(thisSlider, dataSliderID)).left);
  }
  rangeRight(thisSlider : any, dataSliderID : string) : any{ 
    return this.slider(thisSlider, dataSliderID).querySelector('.range-slider__right');
  }
  posRangeRight(thisSlider : any, dataSliderID : string) : number{
    return parseInt(getComputedStyle(this.rangeRight(thisSlider, dataSliderID)).left);
  }
  valueMin(thisSlider : any) : any{
    return thisSlider.querySelector('.range-slider__label-min');
  }
  valueMax(thisSlider : any) : any{
    return thisSlider.querySelector('.range-slider__label-max');
  }
      masScaleStep : number[] = []
      configItemMin : string = `.slider-config .slider-config__block .input-text #inputTextmin`
      configItemMax : string = `.slider-config .slider-config__block .input-text #inputTextmax`
      configItemMinStart : string = `.slider-config .slider-config__block .input-text #inputTextminStart`
      configItemMaxStart : string = `.slider-config .slider-config__block .input-text #inputTextmaxStart`
      configItemStep : string = `.slider-config .slider-config__block .input-text #inputTextstep`
      configItemScaleStep : string = `.slider-config .slider-config__block .input-text #inputTextscaleStep`
      configItemRadiobtn : string = `.slider-config .slider-config__block .slider-config__block-items
            .slider-config__option .radiogroup `
      heightBlockSlider : string = '80px'
}

export class View {
  range(thisSlider : any, dataSlider : object, model : any) : void{
    let posLeft : any, posRight : any;
  
    posRight =  ( model.width(thisSlider, dataSlider.idElement) / (dataSlider.max - dataSlider.min) ) * (dataSlider.maxStart - dataSlider.min);//если мин не 0//model.width(thisSlider) * dataSlider.maxStart / dataSlider.max;
    model.rangeRight(thisSlider, dataSlider.idElement).style.left = posRight +'px';

    switch(dataSlider.type) {
      case 'interval' : {
        posLeft = ( model.width(thisSlider, dataSlider.idElement) / (dataSlider.max - dataSlider.min) ) * (dataSlider.minStart - dataSlider.min);//если мин не 0
        model.rangeLeft(thisSlider, dataSlider.idElement).style.left = posLeft+'px';
        model.ind(thisSlider, dataSlider.idElement).style.transform = 'translateX('+posLeft+'px)';// css('transform','translate('+posLeft+'px, 0px)');
        model.ind(thisSlider, dataSlider.idElement).style.left = posLeft+'px';
        model.ind(thisSlider, dataSlider.idElement).style.width = (posRight - posLeft)+'px';
        break;
      }
      case 'from0to' : {
        model.rangeLeft(thisSlider, dataSlider.idElement).style.left = '0px';
        model.ind(thisSlider, dataSlider.idElement).style.transform = 'translateX(-5px)';// css('transform','translate(-5px, 0px)');
        model.ind(thisSlider, dataSlider.idElement).style.left = '0px';
        model.ind(thisSlider, dataSlider.idElement).style.width = posRight+'px';
        break;
      }
      case 'one' : {
        posLeft = ( model.width(thisSlider, dataSlider.idElement) / (dataSlider.max - dataSlider.min) ) * (dataSlider.minStart - dataSlider.min);//если мин не 0
        model.rangeLeft(thisSlider, dataSlider.idElement).style.left = posLeft+'px';
        model.ind(thisSlider, dataSlider.idElement).style.transform = 'translateX('+posLeft+'px)';// css('transform','translate('+posLeft+'px, 0px)');
        model.ind(thisSlider, dataSlider.idElement).style.left = posLeft+'px';
        model.ind(thisSlider, dataSlider.idElement).style.width = (posRight - posLeft)+'px';
        break;
      }
      default : {
        posLeft = ( model.width(thisSlider, dataSlider.idElement) / (dataSlider.max - dataSlider.min) ) * (dataSlider.minStart - dataSlider.min);//если мин не 0
        model.rangeLeft(thisSlider, dataSlider.idElement).style.left = posLeft+'px';
        model.ind(thisSlider, dataSlider.idElement).style.transform = 'translateX('+posLeft+'px)';// css('transform','translate('+posLeft+'px, 0px)');
        model.ind(thisSlider, dataSlider.idElement).style.left = posLeft+'px';
        model.ind(thisSlider, dataSlider.idElement).style.width = (posRight - posLeft)+'px';
        break;
      }
    }
  }
      
  type(thisSlider : any, dataSlider : object, model : any) : void{
    switch(dataSlider.type) {
      case 'interval' : break;
        model.rangeLeft(thisSlider, dataSlider.idElement).style.display = 'block';
        model.rangeLeft(thisSlider, dataSlider.idElement).style.transform = 'translate('+model.posRangeLeft(thisSlider, dataSlider.idElement)+'px, 0px)';
        model.ind(thisSlider, dataSlider.idElement).style.display = 'block';
        model.ind(thisSlider, dataSlider.idElement).style.transform = 'translate('+model.posRangeLeft(thisSlider, dataSlider.idElement)+'px, 0px)';
        model.ind(thisSlider, dataSlider.idElement).style.width = model.posRangeRight(thisSlider, dataSlider.idElement) - model.posRangeLeft(thisSlider, dataSlider.idElement);
        let spans = model.sliderBlock(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-block');
        spans.querySelector('span.range-slider__label-min').style.display = 'block';
        spans.querySelector('span.range-slider__label-dash').style.display = 'block';
        break;
      case 'from0to' : {
        model.rangeLeft(thisSlider, dataSlider.idElement).style.display = 'none';
        model.ind(thisSlider, dataSlider.idElement).style.transform = 'translate('+(-5)+'px, 0px)';
        model.ind(thisSlider, dataSlider.idElement).style.width = model.posRangeRight(thisSlider, dataSlider.idElement);
        let spans = model.sliderBlock(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-block');
        //spans.querySelector('span.range-slider__label-min').style.display = 'block';
        //spans.querySelector('span.range-slider__label-dash').style.display = 'block';
        break;
      }
      case 'one' : {
        model.rangeLeft(thisSlider, dataSlider.idElement).style.display = 'none';
        model.ind(thisSlider, dataSlider.idElement).style.display = 'none';
        let spans = model.sliderBlock(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-block');
        spans.querySelector('span.range-slider__label-min').style.display = 'none';
        spans.querySelector('span.range-slider__label-dash').style.display = 'none';
        break;
      }
      default : break;
    }
  }

  scale(thisSlider : any, dataSlider : object, model : any) : void{
    switch(dataSlider.scale) {
      case 'on' : {
        let scaleKol,
        ch = dataSlider.min,
        ii, shBlock, divBlock;
        if (dataSlider.scaleStep > 0){
          scaleKol = dataSlider.scaleStep;
        }else{
          scaleKol = Math.floor(model.width(thisSlider, dataSlider.idElement)/45);
          dataSlider.scaleStep = scaleKol;
        }

        let scaleWidth = model.width(thisSlider, dataSlider.idElement)/scaleKol;
        
        for(let i = 0; i <= model.width(thisSlider, dataSlider.idElement);){
          ii = Math.floor(i);
          divBlock = `<div class="range-slider__scale">
            <div class="range-slider__scale-line" id="scale${ii}"></div>
            </div>`;
          model.slider(thisSlider, dataSlider.idElement).insertAdjacentHTML('beforeend', divBlock);
          shBlock = model.slider(thisSlider, dataSlider.idElement).querySelector('.range-slider__scale-line#scale'+ii).closest('.range-slider__scale');
          shBlock.style.left =ii+'px';
          model.sliderBlock(thisSlider, dataSlider.idElement).style.marginBottom = '35px';
          i = i + scaleWidth;
          shBlock.insertAdjacentHTML('beforeend', 
                '<div class="range-slider__scale-val">'+Math.floor(ch)+'</div>');
          ch = ch + (dataSlider.max-dataSlider.min)/scaleKol;
        }
        break;
      }
      case 'off' : break;
      default : break;
    }		
  }

  orientation(thisSlider : any, dataSlider : object, model : any) : void{
    switch(dataSlider.orientation) {
      case 'horizontal': {
        model.slider(thisSlider, dataSlider.idElement).style.transform = 'translate(5px, 0) rotate(0deg)';
        model.sliderBlock(thisSlider, dataSlider.idElement).style.height = model.heightBlockSlider;
        break;
      }
      case 'vertical': {
        model.slider(thisSlider, dataSlider.idElement).style.transform = 'translate(5px, 0) rotate(90deg) translateX(50%)';
        model.sliderBlock(thisSlider, dataSlider.idElement).style.height = model.width(thisSlider, dataSlider.idElement)+75+'px';
        
        let vals = model.slider(thisSlider, dataSlider.idElement).querySelectorAll('.range-slider__scale-val');
        for (let i = 0; i < vals.length; i++){
          vals[i].style.transform = 'translate(5px, 0) rotate(-90deg)';
        }
        break;
      }
      default : {
        model.slider(thisSlider, dataSlider.idElement).style.transform = 'translate(5px, 0) rotate(0deg)';
        model.sliderBlock(thisSlider, dataSlider.idElement).style.height = model.heightBlockSlider;
        break;
      }
    }
  }

  value(thisSlider : any, dataSlider : object, model : any) : void{
    switch(dataSlider.value) {
      case 'on' : {
        model.sliderBlock(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-block').style.display = 'flex';
        model.sliderBlock(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-max').innerHTML = dataSlider.maxStart;
        let spans = model.sliderBlock(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-block');

        switch(dataSlider.type) {
          case 'interval' : {
            model.sliderBlock(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-min').innerHTML = dataSlider.minStart;
            spans.querySelector('span.range-slider__label-min').style.display = 'block';
            spans.querySelector('span.range-slider__label-dash').style.display = 'block';
            break;
          }
          case 'from0to' : {
            model.sliderBlock(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-min').innerHTML = dataSlider.min;
            spans.querySelector('span.range-slider__label-min').style.display = 'block';
            spans.querySelector('span.range-slider__label-dash').style.display = 'block';
            break;
          }
          case 'one' : {
            model.sliderBlock(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-min').innerHTML = dataSlider.minStart;
            spans.querySelector('span.range-slider__label-min').style.display = 'none';
            spans.querySelector('span.range-slider__label-dash').style.display = 'none';
            break;
          }
          default : {//interval
            model.sliderBlock(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-min').innerHTML = dataSlider.minStart;
            spans.querySelector('span.range-slider__label-min').style.display = 'block';
            spans.querySelector('span.range-slider__label-dash').style.display = 'block';
            break;
          }
        }
        break;
      }
      case 'off' : {
        model.sliderBlock(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-block').style.display = 'none';
        break;
      }
      default : break;
    }
  }
}

export class Controller {
  checkOrientation(dataSliderOrientation : string) : string{
    if (dataSliderOrientation == 'horizontal') {
      return 'x';
    }
    return 'y';
  }

  
  movie(thisSlider : any, dataSlider : object, range, e, lr : string, model : any, controller : any) : void{
    let startPos = parseInt(range.style.left);
    let indWidth = model.indWidth(thisSlider, dataSlider.idElement);
    switch(lr){//чтобы сверху был ползунок, который перемещали последним (если друг на друга наедут)
      case 'left' : {
        model.rangeLeft(thisSlider, dataSlider.idElement).style.zindex = 15;
        model.rangeRight(thisSlider, dataSlider.idElement).style.zindex = 10;
        break;
      }
      case 'right' : {
        model.rangeRight(thisSlider, dataSlider.idElement).style.zindex = 15;
        model.rangeLeft(thisSlider, dataSlider.idElement).style.zindex = 10;
        break;
      }
    }
    controller.moveAt(thisSlider, dataSlider, startPos, lr, e, indWidth, model, controller);
    thisSlider.onmousemove = function(e) {
        controller.moveAt(thisSlider, dataSlider, startPos, lr, e, indWidth, model, controller);	
    };

    thisSlider.onmouseup = function(e) {
        thisSlider.onmousemove = null;
        thisSlider.onmouseup = null;
    };
  }
  moveAt(thisSlider : any, dataSlider : object, startPos : number, lr : string, e, indWidth : number, model : any, controller : any) : void{
    let pos, p;
    switch(controller.checkOrientation(dataSlider.orientation)) {
      case 'x': {
        if (dataSlider.step == 1){
          pos = e.pageX - parseInt(model.slider(thisSlider, dataSlider.idElement).offsetLeft);//позиция бегунка
          controller.movingRange(thisSlider, dataSlider, lr, startPos, pos, indWidth, model, controller);
        }else{
          let masScale = controller.masScale(thisSlider, dataSlider, model);
          
          p = e.pageX - parseInt(model.slider(thisSlider, dataSlider.idElement).offsetLeft);//позиция бегунка

          if (masScale.indexOf(p) != -1){
            pos = p;
            controller.movingRange(thisSlider, dataSlider, lr, startPos, pos, indWidth, model, controller);
          }else{
            pos = startPos;
          }
        }
        break;
      }
      case 'y': {
        if (dataSlider.step == 1){
          pos = e.pageY - controller.getCoords(model.slider(thisSlider, dataSlider.idElement)).top;
          controller.movingRange(thisSlider, dataSlider, lr, startPos, pos, indWidth, model, controller);
        }else{
          let masScale = controller.masScale(thisSlider, dataSlider, model);

          p = e.pageY - controller.getCoords(model.slider(thisSlider, dataSlider.idElement)).top;
          
          if (masScale.indexOf(p) != -1){
            pos = p;
            controller.movingRange(thisSlider, dataSlider, lr, startPos, pos, indWidth, model, controller);
          }else{
            pos = startPos;
          }
        }
        break;
      }
      default : break;
    }
  }
  getCoords(elem : any) : object { // https://learn.javascript.ru/coordinates-document
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  movingRange(thisSlider : any, dataSlider : object, lr : string, startPos : number, pos : number, indWidth : number, model : any, controller : any) : void{
    let price, step = 0;
    if ((pos >= 0) && (pos <= model.width(thisSlider, dataSlider.idElement))){
      if (lr == 'left'){							
        if ((model.posRangeRight(thisSlider, dataSlider.idElement) >= pos)&&(dataSlider.type != 'from0to')){
          step = startPos - pos;//длина перемещения левого указателя	
          price = calc(thisSlider, dataSlider, pos);
          model.rangeLeft(thisSlider, dataSlider.idElement).style.left = pos+'px';//позиция указателей
          model.ind(thisSlider, dataSlider.idElement).style.transform = 'translate('+pos+'px, 0px)';
          startPos = pos;
          controller.writeValueMin(thisSlider, price, model);
          if (dataSlider.settings == 'on'){
            controller.configMinChange(thisSlider, dataSlider, price);
          }
          controller.checkDataSliderMin(dataSlider, price);
          model.ind(thisSlider, dataSlider.idElement).style.width = indWidth+step+'px';
        }
      }

      if (lr == 'right'){
        if (model.posRangeLeft(thisSlider, dataSlider.idElement) <= pos){
          step = pos - startPos;//длина перемещения правого указателя
          price = calc(thisSlider, dataSlider, pos);
          model.rangeRight(thisSlider, dataSlider.idElement).style.left = pos+'px';//позиция указателей
          controller.writeValueMax(thisSlider, price, model);
          if (dataSlider.settings == 'on'){
            controller.configMaxChange(thisSlider, dataSlider, price);
          }
          controller.checkDataSliderMax(dataSlider, price);
          model.ind(thisSlider, dataSlider.idElement).style.width = indWidth+step+'px';
        }
      }
    }
    function calc(thisSlider : any, dataSlider : object, pos : number) : number{
      let pr = pos / model.width(thisSlider, dataSlider.idElement),
        price = ((dataSlider.max - dataSlider.min) * pr + dataSlider.min).toFixed();
      return price;
    }
  }
  writeValueMin(thisSlider : any, val : number, model : any) : void{
    model.valueMin(thisSlider).innerHTML = val;
  }
  writeValueMax(thisSlider : any, val : number, model : any) : void{
    model.valueMax(thisSlider).innerHTML = val;
  }
  checkDataSliderMin(dataSlider : object, val : number) : void{
    dataSlider.minStart = val;
  }
  checkDataSliderMax(dataSlider : object, val : number) : void{
    dataSlider.maxStart = val;
  }
  configMinChange(thisSlider : any, dataSlider : object, val : number) : void{
    if (val < dataSlider.min){val = dataSlider.min;}
    thisSlider.querySelector(`.slider-config .slider-config__block .input-text #inputTextminStart`+dataSlider.idElement.substr(-1)).value = val;
    //thisSlider.querySelector(`.slider-config .slider-config__block .input-text #inputTextminStart`).value = val;
  }
  configMaxChange(thisSlider : any, dataSlider : object, val : number) : void{
    if (val > dataSlider.max){val = dataSlider.max;}
    thisSlider.querySelector(`.slider-config .slider-config__block .input-text #inputTextmaxStart`+dataSlider.idElement.substr(-1)).value = val;
    //thisSlider.querySelector(`.slider-config .slider-config__block .input-text #inputTextmaxStart`).value = val;
  }
      
  clickSlider(thisSlider : any, dataSlider : object, model : any, controller : any) : void{
    thisSlider.querySelector('.range-slider__slider').onmousedown = function(e) {	
      thisSlider.querySelector('.range-slider__slider').onmouseup = function(e) {
        let pos, startPos;

        switch(controller.checkOrientation(dataSlider.orientation)) {
          case 'x': {
            pos = e.pageX - parseInt(model.slider(thisSlider, dataSlider.idElement).offsetLeft);
              if (dataSlider.step != 1){
                pos = controller.checkRangeThisStep(thisSlider, dataSlider, pos, model, controller);
              }
            break;
          }
          case 'y': {
            pos = e.pageY - controller.getCoords(model.slider(thisSlider, dataSlider.idElement)).top;
              if (dataSlider.step != 1){
                pos = controller.checkRangeThisStep(thisSlider, dataSlider, pos, model, controller);
              }
            break;
          }
        }

          switch(dataSlider.type) {
            case 'interval' : {
              let posL = model.posRangeLeft(thisSlider, dataSlider.idElement),
                posR = model.posRangeRight(thisSlider, dataSlider.idElement);
              if (Math.abs(posL - pos) < Math.abs(posR - pos)) {
                startPos = model.posRangeLeft(thisSlider, dataSlider.idElement);
                controller.movingRange(thisSlider, dataSlider, 'left', 
                  model.posRangeLeft(thisSlider, dataSlider.idElement), pos, 
                  model.indWidth(thisSlider, dataSlider.idElement), model, controller);
              }else{
                startPos = model.posRangeRight(thisSlider, dataSlider.idElement);
                controller.movingRange(thisSlider, dataSlider, 'right', 
                  model.posRangeRight(thisSlider, dataSlider.idElement), pos, 
                  model.indWidth(thisSlider, dataSlider.idElement), model, controller);
              }
              break;
            }
             case 'from0to' : {
               startPos = model.posRangeRight(thisSlider, dataSlider.idElement);
               controller.movingRange(thisSlider, dataSlider, 'right', 
                 model.posRangeRight(thisSlider, dataSlider.idElement), pos, 
                 model.indWidth(thisSlider, dataSlider.idElement), model, controller);
            break;
          }
             case 'one' : {
               startPos = model.posRangeRight(thisSlider, dataSlider.idElement);
               controller.movingRange(thisSlider, dataSlider, 'right', 
                 model.posRangeRight(thisSlider, dataSlider.idElement), pos, 
                 model.indWidth(thisSlider, dataSlider.idElement), model, controller);
               break;
             }
           }
        }
    }
  }
  checkRangeThisStep(thisSlider : any, dataSlider : object, pos : number, model : any, controller : any) : number{
    let p = 0, masScale,
      len = model.width(thisSlider, dataSlider.idElement);
    masScale = controller.masScale(thisSlider, dataSlider, model);
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
  masScale(thisSlider : any, dataSlider : object, model : any) : number[]{
    let sumSegments = (dataSlider.max - dataSlider.min) / dataSlider.step,
      w1 = model.width(thisSlider, dataSlider.idElement) / (dataSlider.max - dataSlider.min),//одно деление
      w = w1 * dataSlider.step, //длина шага
      masScale=[];
    
    for (let i = 0; i <= sumSegments; i++) {
      masScale[i] = w*i;//parseInt(w*i); //без parseInt, чтобы точность стоимости была выше
    }

    return masScale;
  }

  configCheck(thisSlider : any, dataSlider : object, model : any, controller : any, view : any) : void{
    thisSlider.querySelector('.slider-config .checkbox-list__input').onclick = function(e) {
      if (this.checked == true){
        thisSlider.querySelector('.slider-config .slider-config__block').style.display = 'block';
      }else{
        thisSlider.querySelector('.slider-config .slider-config__block').style.display = 'none';
      }

      let inputS = thisSlider.getElementsByClassName('input-text__input');
      for(var i = 0; i < inputS.length; i++) {
        inputS[i].onblur = function (){
          let idStr = this.id,
            id = dataSlider.idElement.substr(-1),
            min,
            max,
            minStart,
            maxStart,
            step,
            scaleStep;

          if (idStr.indexOf('min',0) != -1){
            min = Number.parseInt(thisSlider.querySelector(model.configItemMin+id).value);
            clear(thisSlider, id);
            dataSlider.min = min;
          }
          if (idStr.indexOf('max',0) != -1){
            max = Number.parseInt(thisSlider.querySelector(model.configItemMax+id).value);
            clear(thisSlider, id);
            dataSlider.max = max;
          }
          if (idStr.indexOf('minStart',0) != -1){
            minStart = Number.parseInt(thisSlider.querySelector(model.configItemMinStart+id).value);
            clear(thisSlider, id);
            dataSlider.minStart = minStart;
          }
          if (idStr.indexOf('maxStart',0) != -1){
            maxStart = Number.parseInt(thisSlider.querySelector(model.configItemMaxStart+id).value);
            clear(thisSlider, id);
            dataSlider.maxStart = maxStart;
          }
          if (idStr.indexOf('scaleStep',0) != -1){
            scaleStep = Number.parseInt(thisSlider.querySelector(model.configItemScaleStep+id).value);
            clear(thisSlider, id);
            dataSlider.scaleStep = scaleStep;
          }
          if (idStr.indexOf('step',0) != -1){
            step = Number.parseInt(thisSlider.querySelector(model.configItemStep+id).value);
            clear(thisSlider, id);
            dataSlider.step = step;
          }

          controller.checkMinMaxStart(dataSlider);
          view.type(thisSlider, dataSlider, model);
          view.scale(thisSlider, dataSlider, model);
          view.range(thisSlider, dataSlider, model);
          view.value(thisSlider, dataSlider, model);
          if (dataSlider.settings == 'on'){
            controller.configCheckStart(thisSlider, dataSlider, model, controller);
          }
        }
      }

      let radioS = thisSlider.getElementsByClassName('radiogroup__input');

      for(var i = 0; i < radioS.length; i++) {
        radioS[i].onclick = function (){
          let id = dataSlider.idElement.substr(-1);

          let configItemType = model.configItemRadiobtn+`.radiogroup__input[name=rbGroopType${id}]:checked`,
            configItemOrientation = model.configItemRadiobtn+`.radiogroup__input[name=rbGroopOrientation${id}]:checked`,
            configItemValue = model.configItemRadiobtn+`.radiogroup__input[name=rbGroopValue${id}]:checked`,
            configItemScale = model.configItemRadiobtn+`.radiogroup__input[name=rbGroopScale${id}]:checked`;

          let	idStr = this.name,
            type, orientation, value, scale,
            typeId, orientationID, valueID, scaleID;
          
          if (idStr.indexOf('Type',0) != -1){
            typeId = thisSlider.querySelector(configItemType).id.substr(-1);

            switch(typeId) {
                case '1': type = 'interval'; break;
                 case '2': {
                   type = 'from0to'; 
                   dataSlider.minStart = dataSlider.min;
                   break;
                 }
                 case '3': type = 'one'; break;
                 default : type = 'interval';
               }
            clear(thisSlider, id);
            dataSlider.type = type;
          }
          if (idStr.indexOf('Orientation',0) != -1){
            orientationID = thisSlider.querySelector(configItemOrientation).id.substr(-1);

            switch(orientationID) {
                case '1': orientation = 'horizontal'; break;
                 case '2': orientation = 'vertical'; break;
                 default : orientation = 'horizontal';
               }
            clear(thisSlider, id);
            dataSlider.orientation = orientation;
          }
          if (idStr.indexOf('Value',0) != -1){
            valueID = thisSlider.querySelector(configItemValue).id.substr(-1);

            switch(valueID) {
                case '1': value = 'on'; break;
                 case '2': value = 'off'; break;
                 default : value = 'on';
               }
            clear(thisSlider, id);
            dataSlider.value = value;
          }
          if (idStr.indexOf('Scale',0) != -1){
            scaleID = thisSlider.querySelector(configItemScale).id.substr(-1);

            switch(scaleID) {
                case '1': scale = 'on'; break;
                 case '2': scale = 'off'; break;
                 default : scale = 'on';
               }
            clear(thisSlider, id);
            dataSlider.scale = scale;
          }

          controller.checkMinMaxStart(dataSlider);
          view.type(thisSlider, dataSlider, model);
          view.scale(thisSlider, dataSlider, model);
          view.orientation(thisSlider, dataSlider, model);
          view.value(thisSlider, dataSlider, model);
          view.range(thisSlider, dataSlider, model);
          if (dataSlider.settings == 'on'){
            controller.configCheckStart(thisSlider, dataSlider, model, controller);
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

  checkMinMaxStart(dataSlider : object) : void{
    if (dataSlider.minStart < dataSlider.min){dataSlider.minStart = dataSlider.min;}
    if (dataSlider.maxStart > dataSlider.max){dataSlider.maxStart = dataSlider.max;}
    if (dataSlider.minStart > dataSlider.max){dataSlider.minStart = dataSlider.max;}
    if (dataSlider.maxStart < dataSlider.min){dataSlider.maxStart = dataSlider.min;}
  }
  configCheckStart(thisSlider : any, dataSlider : object, model : any, controller : any) : void{
    model.sliderBlock(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-min').innerHTML = dataSlider.minStart;
    model.sliderBlock(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-max').innerHTML = dataSlider.maxStart;

    let typeID, orientationID, valueID, scaleID,
      id = dataSlider.idElement.substr(-1);

    switch(dataSlider.type) {
      case 'interval'	: typeID = '1'; break;
      case 'from0to'	: {
        typeID = '2'; 
        controller.checkDataSliderMin(dataSlider, dataSlider.min);
        break;
      }
      case 'one'		: typeID = '3'; break;
      default 		: typeID = '1';
    }
    switch(dataSlider.orientation) {
      case 'horizontal': orientationID = '1'; break;
      case 'vertical': orientationID = '2'; break;
      default : orientationID = '1';
    }
    switch(dataSlider.value) {
      case 'on': valueID = '1'; break;
      case 'off': valueID = '2'; break;
      default : valueID = '1';
    }
    switch(dataSlider.scale) {
      case 'on': scaleID = '1'; break;
      case 'off': scaleID = '2'; break;
      default : scaleID = '1';
    }

    thisSlider.querySelector(model.configItemMin+id).value = dataSlider.min;
    thisSlider.querySelector(model.configItemMax+id).value = dataSlider.max;
    thisSlider.querySelector(model.configItemMinStart+id).value = dataSlider.minStart;
    thisSlider.querySelector(model.configItemMaxStart+id).value = dataSlider.maxStart;
    thisSlider.querySelector(model.configItemStep +id).value = dataSlider.step;
    thisSlider.querySelector(model.configItemScaleStep +id).value = dataSlider.scaleStep;
    thisSlider.querySelector(`.radiogroup__input[name=rbGroopType${id}]#rbrbGroopType${id}${id}${typeID}`).checked = true;
    thisSlider.querySelector(`.radiogroup__input[name=rbGroopOrientation${id}]#rbrbGroopOrientation${id}${id}${orientationID}`).checked = true;
    thisSlider.querySelector(`.radiogroup__input[name=rbGroopValue${id}]#rbrbGroopValue${id}${id}${valueID}`).checked = true;
    thisSlider.querySelector(`.radiogroup__input[name=rbGroopScale${id}]#rbrbGroopScale${id}${id}${scaleID}`).checked = true;
  }
}