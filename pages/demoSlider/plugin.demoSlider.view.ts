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
    //console.log('drawRange():',this.dataSlider)
    let posLeft : any, posRight : any;
  
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
        this.model.getRange().style.transform = 'translateX('+posLeft+'px)';// css('transform','translate('+posLeft+'px, 0px)');
        this.model.getRange().style.left = posLeft+'px';
        this.model.getRange().style.width = (posRight - posLeft)+'px';
        break;
      }
    }
  }
        
  drawType() : void{
    switch(this.type) {
      case 'interval' : break;
        this.model.getRangeLeft().style.display = 'block';
        this.model.getRangeLeft().style.transform = 'translate('+this.model.getPosRangeLeft()+'px, 0px)';
        this.model.getRange().style.display = 'block';
        this.model.getRange().style.transform = 'translate('+this.model.getPosRangeLeft()+'px, 0px)';
        this.model.getRange().style.width = this.model.getPosRangeRight() - this.model.getPosRangeLeft();
        let spans = this.model.getRangeSlider().querySelector('.range-slider__label-block');
        spans.querySelector('span.range-slider__label-min').style.display = 'block';
        spans.querySelector('span.range-slider__label-dash').style.display = 'block';
        break;
      case 'from0to' : {
        this.model.getRangeLeft().style.display = 'none';
        this.model.getRange().style.transform = 'translate('+(-5)+'px, 0px)';
        this.model.getRange().style.width = this.model.getPosRangeRight();
        let spans = this.model.getRangeSlider().querySelector('.range-slider__label-block');
        //spans.querySelector('span.range-slider__label-min').style.display = 'block';
        //spans.querySelector('span.range-slider__label-dash').style.display = 'block';
        break;
      }
      case 'one' : {
        this.model.getRangeLeft().style.display = 'none';
        this.model.getRange().style.display = 'none';
        let spans = this.model.getRangeSlider().querySelector('.range-slider__label-block');
        spans.querySelector('span.range-slider__label-min').style.display = 'none';
        spans.querySelector('span.range-slider__label-dash').style.display = 'none';
        break;
      }
      default : break;
    }
  }
  
  drawScale() : void{
    console.log('scale min',this.min)
    switch(this.scale) {
      case 'on' : {
        let scaleKol,
        ch = this.min,
        ii, shBlock, divBlock;
        if (this.scaleStep > 0){
          scaleKol = this.scaleStep;
        }else{
          scaleKol = Math.floor(this.model.getWidth()/45);
          this.scaleStep = scaleKol;
        }

        let scaleWidth = this.model.getWidth()/scaleKol;
        
        for(let i = 0; i <= this.model.getWidth();){
          ii = Math.floor(i);
          divBlock = `<div class="range-slider__scale">
            <div class="range-slider__scale-line" id="scale${ii}"></div>
            </div>`;
          this.model.getSlider().insertAdjacentHTML('beforeend', divBlock);
          shBlock = this.model.getSlider().querySelector('.range-slider__scale-line#scale'+ii).closest('.range-slider__scale');
          shBlock.style.left =ii+'px';
          this.model.getRangeSlider().style.marginBottom = '35px';
          i = i + scaleWidth;
          shBlock.insertAdjacentHTML('beforeend', 
                '<div class="range-slider__scale-val">'+Math.floor(ch)+'</div>');
          ch = ch + (this.max-this.min)/scaleKol;
        }
        break;
      }
      case 'off' : break;
      default : break;
    }		
  }
  
  drawOrientation() : void{
    switch(this.orientation) {
      case 'horizontal': {
        this.model.getSlider().style.transform = 'translate(5px, 0) rotate(0deg)';
        this.model.getRangeSlider().style.height = this.model.heightBlockSlider;
        break;
      }
      case 'vertical': {
        this.model.getSlider().style.transform = 'translate(5px, 0) rotate(90deg) translateX(50%)';
        this.model.getRangeSlider().style.height = this.model.getWidth()+75+'px';
        
        let vals = this.model.getSlider().querySelectorAll('.range-slider__scale-val');
        for (let i = 0; i < vals.length; i++){
          vals[i].style.transform = 'translate(5px, 0) rotate(-90deg)';
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
    switch(this.value) {
      case 'on' : {
        this.model.getRangeSlider().querySelector('.range-slider__label-block').style.display = 'flex';
        this.model.getRangeSlider().querySelector('.range-slider__label-max').innerHTML = this.maxStart;
        let spans = this.model.getRangeSlider().querySelector('.range-slider__label-block');

        switch(this.type) {
          case 'interval' : {
            this.model.getRangeSlider().querySelector('.range-slider__label-min').innerHTML = this.minStart;
            spans.querySelector('span.range-slider__label-min').style.display = 'block';
            spans.querySelector('span.range-slider__label-dash').style.display = 'block';
            break;
          }
          case 'from0to' : {
            this.model.getRangeSlider().querySelector('.range-slider__label-min').innerHTML = this.min;
            spans.querySelector('span.range-slider__label-min').style.display = 'block';
            spans.querySelector('span.range-slider__label-dash').style.display = 'block';
            break;
          }
          case 'one' : {
            this.model.getRangeSlider().querySelector('.range-slider__label-min').innerHTML = this.minStart;
            spans.querySelector('span.range-slider__label-min').style.display = 'none';
            spans.querySelector('span.range-slider__label-dash').style.display = 'none';
            break;
          }
          default : {//interval
            this.model.getRangeSlider().querySelector('.range-slider__label-min').innerHTML = this.minStart;
            spans.querySelector('span.range-slider__label-min').style.display = 'block';
            spans.querySelector('span.range-slider__label-dash').style.display = 'block';
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
  
  /*drawRange(thisSlider : any, dataSlider : object, model : any) : void{
    let posLeft : any, posRight : any;
  
    posRight =  ( model.getWidth(thisSlider, dataSlider.idElement) / (dataSlider.max - dataSlider.min) ) * (dataSlider.maxStart - dataSlider.min);//если мин не 0//model.getWidth(thisSlider) * dataSlider.maxStart / dataSlider.max;
    model.getRangeRight(thisSlider, dataSlider.idElement).style.left = posRight +'px';

    switch(dataSlider.type) {
      case 'interval' : {
        posLeft = ( model.getWidth(thisSlider, dataSlider.idElement) / (dataSlider.max - dataSlider.min) ) * (dataSlider.minStart - dataSlider.min);//если мин не 0
        model.getRangeLeft(thisSlider, dataSlider.idElement).style.left = posLeft+'px';
        model.getRange(thisSlider, dataSlider.idElement).style.transform = 'translateX('+posLeft+'px)';// css('transform','translate('+posLeft+'px, 0px)');
        model.getRange(thisSlider, dataSlider.idElement).style.left = posLeft+'px';
        model.getRange(thisSlider, dataSlider.idElement).style.width = (posRight - posLeft)+'px';
        break;
      }
      case 'from0to' : {
        model.getRangeLeft(thisSlider, dataSlider.idElement).style.left = '0px';
        model.getRange(thisSlider, dataSlider.idElement).style.transform = 'translateX(-5px)';// css('transform','translate(-5px, 0px)');
        model.getRange(thisSlider, dataSlider.idElement).style.left = '0px';
        model.getRange(thisSlider, dataSlider.idElement).style.width = posRight+'px';
        break;
      }
      case 'one' : {
        posLeft = ( model.getWidth(thisSlider, dataSlider.idElement) / (dataSlider.max - dataSlider.min) ) * (dataSlider.minStart - dataSlider.min);//если мин не 0
        model.getRangeLeft(thisSlider, dataSlider.idElement).style.left = posLeft+'px';
        model.getRange(thisSlider, dataSlider.idElement).style.transform = 'translateX('+posLeft+'px)';// css('transform','translate('+posLeft+'px, 0px)');
        model.getRange(thisSlider, dataSlider.idElement).style.left = posLeft+'px';
        model.getRange(thisSlider, dataSlider.idElement).style.width = (posRight - posLeft)+'px';
        break;
      }
      default : {
        posLeft = ( model.getWidth(thisSlider, dataSlider.idElement) / (dataSlider.max - dataSlider.min) ) * (dataSlider.minStart - dataSlider.min);//если мин не 0
        model.getRangeLeft(thisSlider, dataSlider.idElement).style.left = posLeft+'px';
        model.getRange(thisSlider, dataSlider.idElement).style.transform = 'translateX('+posLeft+'px)';// css('transform','translate('+posLeft+'px, 0px)');
        model.getRange(thisSlider, dataSlider.idElement).style.left = posLeft+'px';
        model.getRange(thisSlider, dataSlider.idElement).style.width = (posRight - posLeft)+'px';
        break;
      }
    }
  }
        
  drawType(thisSlider : any, dataSlider : object, model : any) : void{
    switch(dataSlider.type) {
      case 'interval' : break;
        model.getRangeLeft(thisSlider, dataSlider.idElement).style.display = 'block';
        model.getRangeLeft(thisSlider, dataSlider.idElement).style.transform = 'translate('+model.getPosRangeLeft(thisSlider, dataSlider.idElement)+'px, 0px)';
        model.getRange(thisSlider, dataSlider.idElement).style.display = 'block';
        model.getRange(thisSlider, dataSlider.idElement).style.transform = 'translate('+model.getPosRangeLeft(thisSlider, dataSlider.idElement)+'px, 0px)';
        model.getRange(thisSlider, dataSlider.idElement).style.width = model.getPosRangeRight(thisSlider, dataSlider.idElement) - model.getPosRangeLeft(thisSlider, dataSlider.idElement);
        let spans = model.getRangeSlider(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-block');
        spans.querySelector('span.range-slider__label-min').style.display = 'block';
        spans.querySelector('span.range-slider__label-dash').style.display = 'block';
        break;
      case 'from0to' : {
        model.getRangeLeft(thisSlider, dataSlider.idElement).style.display = 'none';
        model.getRange(thisSlider, dataSlider.idElement).style.transform = 'translate('+(-5)+'px, 0px)';
        model.getRange(thisSlider, dataSlider.idElement).style.width = model.getPosRangeRight(thisSlider, dataSlider.idElement);
        let spans = model.getRangeSlider(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-block');
        //spans.querySelector('span.range-slider__label-min').style.display = 'block';
        //spans.querySelector('span.range-slider__label-dash').style.display = 'block';
        break;
      }
      case 'one' : {
        model.getRangeLeft(thisSlider, dataSlider.idElement).style.display = 'none';
        model.getRange(thisSlider, dataSlider.idElement).style.display = 'none';
        let spans = model.getRangeSlider(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-block');
        spans.querySelector('span.range-slider__label-min').style.display = 'none';
        spans.querySelector('span.range-slider__label-dash').style.display = 'none';
        break;
      }
      default : break;
    }
  }
  
  drawScale(thisSlider : any, dataSlider : object, model : any) : void{
    switch(dataSlider.scale) {
      case 'on' : {
        let scaleKol,
        ch = dataSlider.min,
        ii, shBlock, divBlock;
        if (dataSlider.scaleStep > 0){
          scaleKol = dataSlider.scaleStep;
        }else{
          scaleKol = Math.floor(model.getWidth(thisSlider, dataSlider.idElement)/45);
          dataSlider.scaleStep = scaleKol;
        }

        let scaleWidth = model.getWidth(thisSlider, dataSlider.idElement)/scaleKol;
        
        for(let i = 0; i <= model.getWidth(thisSlider, dataSlider.idElement);){
          ii = Math.floor(i);
          divBlock = `<div class="range-slider__scale">
            <div class="range-slider__scale-line" id="scale${ii}"></div>
            </div>`;
          model.getSlider(thisSlider, dataSlider.idElement).insertAdjacentHTML('beforeend', divBlock);
          shBlock = model.getSlider(thisSlider, dataSlider.idElement).querySelector('.range-slider__scale-line#scale'+ii).closest('.range-slider__scale');
          shBlock.style.left =ii+'px';
          model.getRangeSlider(thisSlider, dataSlider.idElement).style.marginBottom = '35px';
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
  
  drawOrientation(thisSlider : any, dataSlider : object, model : any) : void{
    switch(dataSlider.orientation) {
      case 'horizontal': {
        model.getSlider(thisSlider, dataSlider.idElement).style.transform = 'translate(5px, 0) rotate(0deg)';
        model.getRangeSlider(thisSlider, dataSlider.idElement).style.height = model.heightBlockSlider;
        break;
      }
      case 'vertical': {
        model.getSlider(thisSlider, dataSlider.idElement).style.transform = 'translate(5px, 0) rotate(90deg) translateX(50%)';
        model.getRangeSlider(thisSlider, dataSlider.idElement).style.height = model.getWidth(thisSlider, dataSlider.idElement)+75+'px';
        
        let vals = model.getSlider(thisSlider, dataSlider.idElement).querySelectorAll('.range-slider__scale-val');
        for (let i = 0; i < vals.length; i++){
          vals[i].style.transform = 'translate(5px, 0) rotate(-90deg)';
        }
        break;
      }
      default : {
        model.getSlider(thisSlider, dataSlider.idElement).style.transform = 'translate(5px, 0) rotate(0deg)';
        model.getRangeSlider(thisSlider, dataSlider.idElement).style.height = model.heightBlockSlider;
        break;
      }
    }
  }
  
  drawValue(thisSlider : any, dataSlider : object, model : any) : void{
    switch(dataSlider.value) {
      case 'on' : {
        model.getRangeSlider(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-block').style.display = 'flex';
        model.getRangeSlider(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-max').innerHTML = dataSlider.maxStart;
        let spans = model.getRangeSlider(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-block');

        switch(dataSlider.type) {
          case 'interval' : {
            model.getRangeSlider(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-min').innerHTML = dataSlider.minStart;
            spans.querySelector('span.range-slider__label-min').style.display = 'block';
            spans.querySelector('span.range-slider__label-dash').style.display = 'block';
            break;
          }
          case 'from0to' : {
            model.getRangeSlider(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-min').innerHTML = dataSlider.min;
            spans.querySelector('span.range-slider__label-min').style.display = 'block';
            spans.querySelector('span.range-slider__label-dash').style.display = 'block';
            break;
          }
          case 'one' : {
            model.getRangeSlider(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-min').innerHTML = dataSlider.minStart;
            spans.querySelector('span.range-slider__label-min').style.display = 'none';
            spans.querySelector('span.range-slider__label-dash').style.display = 'none';
            break;
          }
          default : {//interval
            model.getRangeSlider(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-min').innerHTML = dataSlider.minStart;
            spans.querySelector('span.range-slider__label-min').style.display = 'block';
            spans.querySelector('span.range-slider__label-dash').style.display = 'block';
            break;
          }
        }
        break;
      }
      case 'off' : {
        model.getRangeSlider(thisSlider, dataSlider.idElement).querySelector('.range-slider__label-block').style.display = 'none';
        break;
      }
      default : break;
    }
  }
  }*/