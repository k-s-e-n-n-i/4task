import $ from "jquery"

export class View {
  model : any;
  dataSlider : object;
  thisSlider : any;
  idElement : string;
  min: number;
  max : number;
  minStart: number;
  maxStart : number;
  type : string;
  orientation : string;
  scale : string;
  scaleStep : number;
  value : string;

  constructor(option, model){
    this.model = model;
    this.dataSlider = option;
    this.thisSlider = option.element;
    this.idElement = option.idElement;
    this.min = option.min;
    this.max = option.max;
    this.minStart = option.minStart;
    this.maxStart = option.maxStart;
    this.type = option.type;
    this.orientation = option.orientation;
    this.scale = option.scale;
    this.scaleStep = option.scaleStep;
    this.value = option.value;
  }

  drawRange() : void{
    let posLeft : number, 
      posRight : number;
  
    posRight = ( this.model.getWidth() / (this.max - this.min) ) * (this.maxStart - this.min);
    this.model.getRangeRight().style.left = posRight +'px';

    switch(this.type) {
      case 'interval' : {
        posLeft = ( this.model.getWidth() / (this.max - this.min) ) * (this.minStart - this.min);
        this.model.getRangeLeft().style.left = posLeft+'px';
        this.model.getRange().style.transform = 'translateX('+posLeft+'px)';
        this.model.getRange().style.left = posLeft+'px';
        this.model.getRange().style.width = (posRight - posLeft)+'px';
        break;
      }
      case 'from0to' : {
        this.model.getRangeLeft().style.left = '0px';
        this.model.getRange().style.transform = 'translateX(-5px)';
        this.model.getRange().style.left = '0px';
        this.model.getRange().style.width = posRight+'px';
        break;
      }
      case 'one' : {
        posLeft = ( this.model.getWidth() / (this.max - this.min) ) * (this.minStart - this.min);
        this.model.getRangeLeft().style.left = posLeft+'px';
        this.model.getRange().style.transform = 'translateX('+posLeft+'px)';
        this.model.getRange().style.left = posLeft+'px';
        this.model.getRange().style.width = (posRight - posLeft)+'px';
        break;
      }
      default : {
        posLeft = ( this.model.getWidth() / (this.max - this.min) ) * (this.minStart - this.min);//если мин не 0
        this.model.getRangeLeft().style.left = posLeft+'px';
        this.model.getRange().style.transform = 'translateX('+posLeft+'px)';
        this.model.getRange().style.left = posLeft+'px';
        this.model.getRange().style.width = (posRight - posLeft)+'px';
        break;
      }
    }
  }
        
  drawType() : void{
    let blockLabelVal : any;
    switch(this.type) {
      case 'interval' : break;
        this.model.getRangeLeft().style.display = 'block';
        this.model.getRangeLeft().style.transform = 'translate('+this.model.getPosRangeLeft()+'px, 0px)';
        this.model.getRange().style.display = 'block';
        this.model.getRange().style.transform = 'translate('+this.model.getPosRangeLeft()+'px, 0px)';
        this.model.getRange().style.width = this.model.getPosRangeRight() - this.model.getPosRangeLeft();
        blockLabelVal = this.model.getRangeSlider().querySelector('.range-slider__label-block');
        blockLabelVal.querySelector('span.range-slider__label-min').style.display = 'block';
        blockLabelVal.querySelector('span.range-slider__label-dash').style.display = 'block';
        break;
      case 'from0to' : {
        this.model.getRangeLeft().style.display = 'none';
        this.model.getRange().style.transform = 'translate('+(-5)+'px, 0px)';
        this.model.getRange().style.width = this.model.getPosRangeRight();
        break;
      }
      case 'one' : {
        this.model.getRangeLeft().style.display = 'none';
        this.model.getRange().style.display = 'none';
        blockLabelVal = this.model.getRangeSlider().querySelector('.range-slider__label-block');
        blockLabelVal.querySelector('span.range-slider__label-min').style.display = 'none';
        blockLabelVal.querySelector('span.range-slider__label-dash').style.display = 'none';
        break;
      }
      default : break;
    }
  }
  
  drawScale() : void{
    switch(this.scale) {
      case 'on' : {
        let qtyDivision : number,
        valDivision : number = this.min,
        posDivision : number,
        stepWidth : number, 
        elemDivision : any,
        blockScale : any;

        if (this.scaleStep > 0){
          qtyDivision = this.scaleStep;
        }else{
          qtyDivision = Math.floor(this.model.getWidth()/45);
          this.scaleStep = qtyDivision;
        }

        stepWidth = this.model.getWidth()/qtyDivision;
        
        for(let i = 0; i <= this.model.getWidth();){
          posDivision = Math.floor(i);
          blockScale = `<div class="range-slider__scale">
            <div class="range-slider__scale-line" id="scale${posDivision}"></div>
            </div>`;
          this.model.getSlider().insertAdjacentHTML('beforeend', blockScale);
          elemDivision = this.model.getSlider().querySelector('.range-slider__scale-line#scale'+posDivision).closest('.range-slider__scale');
          elemDivision.style.left =posDivision+'px';
          this.model.getRangeSlider().style.marginBottom = '35px';
          i = i + stepWidth;
          elemDivision.insertAdjacentHTML('beforeend', 
                '<div class="range-slider__scale-val">'+Math.floor(valDivision)+'</div>');
          valDivision = valDivision + (this.max-this.min)/qtyDivision;
        }
        break;
      }
      case 'off' : break;
      default : break;
    }		
  }
  
  drawOrientation() : void{
    let blockVals : any;
    switch(this.orientation) {
      case 'horizontal': {
        this.model.getSlider().style.transform = 'translate(5px, 0) rotate(0deg)';
        this.model.getRangeSlider().style.height = this.model.heightBlockSlider;
        break;
      }
      case 'vertical': {
        this.model.getSlider().style.transform = 'translate(5px, 0) rotate(90deg) translateX(50%)';
        this.model.getRangeSlider().style.height = this.model.getWidth()+75+'px';
        
        blockVals = this.model.getSlider().querySelectorAll('.range-slider__scale-val');
        for (let i = 0; i < blockVals.length; i++){
          blockVals[i].style.transform = 'translate(5px, 0) rotate(-90deg)';
        }
        break;
      }
      default : {
        this.model.getSlider().style.transform = 'translate(5px, 0) rotate(0deg)';
        this.model.getRangeSlider().style.height = this.model.heightBlockSlider;
        break;
      }
    }
  }
  
  drawValue() : void{
    let blockLabelVal : any;
    switch(this.value) {
      case 'on' : {
        this.model.getRangeSlider().querySelector('.range-slider__label-block').style.display = 'flex';
        this.model.getRangeSlider().querySelector('.range-slider__label-max').innerHTML = this.maxStart;
        blockLabelVal = this.model.getRangeSlider().querySelector('.range-slider__label-block');

        switch(this.type) {
          case 'interval' : {
            this.model.getRangeSlider().querySelector('.range-slider__label-min').innerHTML = this.minStart;
            blockLabelVal.querySelector('span.range-slider__label-min').style.display = 'block';
            blockLabelVal.querySelector('span.range-slider__label-dash').style.display = 'block';
            break;
          }
          case 'from0to' : {
            this.model.getRangeSlider().querySelector('.range-slider__label-min').innerHTML = this.min;
            blockLabelVal.querySelector('span.range-slider__label-min').style.display = 'block';
            blockLabelVal.querySelector('span.range-slider__label-dash').style.display = 'block';
            break;
          }
          case 'one' : {
            this.model.getRangeSlider().querySelector('.range-slider__label-min').innerHTML = this.minStart;
            blockLabelVal.querySelector('span.range-slider__label-min').style.display = 'none';
            blockLabelVal.querySelector('span.range-slider__label-dash').style.display = 'none';
            break;
          }
          default : {//interval
            this.model.getRangeSlider().querySelector('.range-slider__label-min').innerHTML = this.minStart;
            blockLabelVal.querySelector('span.range-slider__label-min').style.display = 'block';
            blockLabelVal.querySelector('span.range-slider__label-dash').style.display = 'block';
            break;
          }
        }
        break;
      }
      case 'off' : {
        this.model.getRangeSlider().querySelector('.range-slider__label-block').style.display = 'none';
        break;
      }
      default : break;
    }
  }
}