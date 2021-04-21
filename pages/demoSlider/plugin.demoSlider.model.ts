export class Model {
  thisSlider : any;
  idElement : string;

  constructor(option){
    this.thisSlider = option.element;
    this.idElement = option.idElement;
  }

  getWidth() : number{
    return this.thisSlider.querySelector('.range-slider#'+this.idElement+' .range-slider__slider').clientWidth;
  }
  getRangeSlider() : any{
    return this.thisSlider.querySelector('.range-slider#'+this.idElement);
  }
  getSlider() : any{ 
    return this.getRangeSlider().querySelector('.range-slider__slider');
  }
  getRange() : any{ 
    return this.getSlider().querySelector('.range-slider__range');
  }
  getWidthRange() : number{
    return this.getRange().clientWidth;
  }
  getRangeLeft() : any{ 
    return this.getSlider().querySelector('.range-slider__left');
  }
  getPosRangeLeft() : number{
    return parseInt(getComputedStyle(this.getRangeLeft()).left);
  }
  getRangeRight() : any{ 
    return this.getSlider().querySelector('.range-slider__right');
  }
  getPosRangeRight() : number{
    return parseInt(getComputedStyle(this.getRangeRight()).left);
  }
  getElemValueMin() : any{
    return this.thisSlider.querySelector('.range-slider__label-min');
  }
  getElemValueMax() : any{
    return this.thisSlider.querySelector('.range-slider__label-max');
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

  /*getWidth(thisSlider : any, dataSliderID : string) : number{
    return thisSlider.querySelector('.range-slider#'+dataSliderID+' .range-slider__slider').clientWidth;
  }
  getRangeSlider(thisSlider : any, dataSliderID : string) : any{
    return thisSlider.querySelector('.range-slider#'+dataSliderID);
  }
  getSlider(thisSlider : any, dataSliderID : string) : any{ 
    return this.getRangeSlider(thisSlider, dataSliderID).querySelector('.range-slider__slider');
  }
  getRange(thisSlider : any, dataSliderID : string) : any{ 
    return this.getSlider(thisSlider, dataSliderID).querySelector('.range-slider__range');
  }
  getWidthRange(thisSlider : any, dataSliderID : string) : number{
    return this.getRange(thisSlider, dataSliderID).clientWidth;
  }
  getRangeLeft(thisSlider : any, dataSliderID : string) : any{ 
    return this.getSlider(thisSlider, dataSliderID).querySelector('.range-slider__left');
  }
  getPosRangeLeft(thisSlider : any, dataSliderID : string) : number{
    return parseInt(getComputedStyle(this.getRangeLeft(thisSlider, dataSliderID)).left);
  }
  getRangeRight(thisSlider : any, dataSliderID : string) : any{ 
    return this.getSlider(thisSlider, dataSliderID).querySelector('.range-slider__right');
  }
  getPosRangeRight(thisSlider : any, dataSliderID : string) : number{
    return parseInt(getComputedStyle(this.getRangeRight(thisSlider, dataSliderID)).left);
  }
  getElemValueMin(thisSlider : any) : any{
    return thisSlider.querySelector('.range-slider__label-min');
  }
  getElemValueMax(thisSlider : any) : any{
    return thisSlider.querySelector('.range-slider__label-max');
  }*/
}