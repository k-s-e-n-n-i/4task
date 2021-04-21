Верстка страниц по макету (задание №2) и Слайдер (задание №4)

$ git clone https://github.com/KsuVla/2task

Запустить проект: npm run start

-----Структура проекта Слайдер->>------------------------------------------------------------------------------------------------

Объявление сладеров находится в blocks/demoSlider/
	demoSlider.pug (html-элементы)
	demoSlider.ts (объекты с данными)
		структура объектов с примерами значений:
		{
			element : document.querySelector('.searchRoom2 .slider1'), //html-элемент
			idElement : 'idPrice',// id элемента в строковом виде
			width : 400,//ширина слайдера в пикселях
			type : 'interval',//три типа: 'interval' (выбирается диапазон), 'from0to' (от 0 до выбранного), 'one' (вибирается одно значение)
			min : 0, //задается числовой минимум
			max : 500000, //задается числовой максимум
			minStart : 50, //текущее чистовое значение крайней левой границы
			maxStart : 100, //текущее чистовое значение крайней правой границы
			step : 'no', //задается числовой шаг; если 1, то ползунок перемещается без препятсвий/шагов
			orientation : 'horizontal', //два типа: 'horizontal', 'vertical'
			value : 'on', // отображать числовой диапазон над слайдером - 'on', не отображать - 'off'
			scale : 'on', // отображать шкалу - 'on', не отображать - 'off'
			scaleStep : 10 // задается числовое количество делений на шкале, если значение меньше 1, то плагин расчитывает свое кол-во делений, с шагом примерно в 45 пикселя
		}//при type : 'one' нет минимального значения, работает по максимальному

	demoSlider.ts объявляет слайдеры как экземпляры класса slider, находящегося в plugin.demoSlider.ts
	plugin.demoSlider.ts - сам плагин, вызывает методы других классов (MVC), находящихся в plugin.demoSlider.MVC.ts
	plugin.demoSlider.MVC.ts - файл с тремя классами, постаралась разбить в сответствии с концепцией MVC



plugin.demoSlider.MVC.ts
	Настройки - "панель конфигурирования"
	check - меняет значения в объекте с данными
	config - производятся действия с панелью Настроек
	-----------------------------------------------------------

	class Model
		во все методы передаются html-элемент слайдер (thisSlider) и объект с данными-параметрами (dataSlider), возвращаются number или any
		(thisSlider : any, dataSlider : object, model : any)

		1. getWidth - определяет ширину слайдера в пикселях
		2. getRangeSlider - ищет блок со слайдером и заголовком ('.range-slider), без настроек ('.sliderConf')
		3. getSlider - ищет именно блок со слайдером/шкалой ('.range-slider__slider')
		//	4. height - определяет высоту блока со слайдером и заголовком ('.range-slider)
		5. getRange - ищет элемент, отображающий активный диапазон значений, индикатор, зеланая линия
		6. getWidthRange - определяет ширину активного диапазона в пикселях
		7. getRangeLeft - ищет элемент левой границы диапазона, шарик ('.range-slider__left')
		8. getPosRangeLeft - определяет позицию левой границы диапазона относительно начала шкалы в пикселях
		9. getRangeRight - ищет элемент правой границы диапазона, шарик ('.range-slider__right')
		10. getPosRangeRight - определяет позицию правой границы диапазона относительно начала шкалы в пикселях
		11. getElemValueMin - ищет элемент, отображающий значение левой границы диапазона ('.range-slider__label-min')
		12. getElemValueMax - ищет элемент, отображающий значение правой границы диапазона ('.range-slider__label-max')

		переменные
		masScaleStep  - массив, используется для хранения значений пикселей соответсвующих позициям, где расположены "шаги". Применяется, когда задан шаг у слайдера, то есть бегунок перемещается по точкам, перескакивая промежуточные значения.
		configItemMin - строка, содержащая в себе "путь" до элемента-поля в Настройках ('.sliderConf') для ввода минимума
		configItemMax - строка, содержащая в себе "путь" до элемента-поля в Настройках ('.sliderConf') для ввода максимума
		configItemMinStart - строка, содержащая в себе "путь" до элемента-поля в Настройках ('.sliderConf') для ввода текущего значения левой границы
		configItemMaxStart - строка, содержащая в себе "путь" до элемента-поля в Настройках ('.sliderConf') для ввода текущего значения правой границы
		configItemStep - строка, содержащая в себе "путь" до элемента-поля в Настройках ('.sliderConf') для ввода шага (если задана 1, то ...)
		configItemScaleStep - строка, содержащая в себе "путь" до элемента-поля в Настройках ('.sliderConf') для ввода количества делений на шкале
		configItemRadiobtn - строка, содержащая в себе "путь" до любого элемента-радиокнопки в Настройках ('.sliderConf')
		heightBlockSlider - строка = '80px', чтобы задавать высоту блока со слайдером при вертикальной ориентации

	class View
		во все методы передаются html-элемент слайдер (thisSlider) и объект с данными-параметрами (dataSlider), ничего не возвращают
		(thisSlider : any, dataSlider : object, model : any) : void

		1. drawRange - отрисовывает позиции границ бегунка и саму линию значений
		2. drawType - в зависимости от заданного типа слайдера (type), отрисовывает/скрывает элементы 
		3. drawScale - в зависимости от заданных в scale и scaleStep отрисовывает или скрывает шкалу делений
		4. drawOrientation - в зависимости от заданной ориентации меняет положение самого блока со слайдером, а также корректирует отображение значений около делений шкалы
		5. drawValue - в зависимости от заданного value отрисовывает/скрывает элементы, отображающие значения текущего выбранного диапазона значений ('.range-slider__label-block')

	class Controller
		встречающиеся переменные:
		dataSliderOrientation - значение ориентации из объекта с данными о слайдере

		thisSlider - html-элемент слайдер
		dataSlider - объект с данными-параметрами сладера
		range - html-элемент левый или правый шарик
		e 
		lr - строковое значение 'left' или 'right', соответсвует тому, какую границу диапазона двигают
		model - экземпляр класса Model
		controller - экземпляр класса Controller 

		startPos - стартовая позиция шарика, с которой началось движение, в пикселях

		indWidth - расчитанная итоговая (после перемещения) длина активного диапазона (зеленой линии) в пикселях

		pos - итоговая позиция шарика, на которой закончено движение, в пикселях
		--------------------------------------------------------------------------------------------------------

		1. defineOrientation(dataSliderOrientation : string) : string - определяет ориентацию, возвращает значение 'x' или 'y'

		//	2. movie(thisSlider : any, dataSlider : object, range, e, lr : string, model : any, controller : any) : void - метод запускается при зажиме левого или правого шарика ползунка, сам запускает другой метод - moveAt

		2. moveAt(thisSlider : any, dataSlider : object, range, e, lr : string, model : any, controller : any) : void - метод запускается при зажиме левого или правого шарика ползунка. В зависимости от заданной ориентации вычисляет и перемещает крайние значения бегунка. За перемещение отвечает следующий метод - movingRange.
		//	3. moveAt(thisSlider : any, dataSlider : object, startPos : number, lr : string, e, indWidth : number, model : any, controller : any) : void - в зависимости от заданной ориентации вычисляет и перемещает крайние значения бегунка. За перемещение отвечает следующий метод - movingRange.

		4. getCoords(elem : any) : object - определяет позицию шарика по х и у относительно страницы (используется при вертикальной ориентации), взято с https://learn.javascript.ru/coordinates-document
			elem - html-элемент, позиция которого определяется. В данном случае позиция шарика (правого/левого).

		5. movingRange(thisSlider : any, dataSlider : object, lr : string, startPos : number, pos : number, indWidth : number) - перемещает левую или правую границу ползунка
			 function calcValue(thisSlider : any, dataSlider : object, pos : number) - функция рассчета стоимости в точке итогового расположения перемещаемой границы, возвращает значение суммы, которое выводится в '.range-slider__label-min' или '.range-slider__label-max'

		6. drawValueMin(thisSlider : any, val : number) - прописывает значение val(текущее) в элемент '.range-slider__label-max'
		7. drawValueMax(thisSlider : any, val : number) - прописывает значение val(текущее) в элемент '.range-slider__label-max'
		8. writeDataSliderMin(dataSlider : object, val : number) - обновляет текущее минимальное значение (minStart) в объекте с данными о слайдере
		9. writeDataSliderMax(dataSlider : object, val : number) - обновляет текущее максимальное значение (maxStart) в объекте с данными о слайдере
		10. changeConfigInputMin(thisSlider : any, dataSlider : object, val : number) : void - прописывает значение min в соответсвующее поле в Настройках 
		11. changeConfigInputMax(thisSlider : any, dataSlider : object, val : number) : void - прописывает значение max в соответсвующее поле в Настройках

		12. moveRangeOnclickSlider(thisSlider : any, dataSlider : object, model : any, controller : any) : void - перемещает ближайшую к месту клика границу диапазона в точку щелчка
		13. definePosStepClosestClick(thisSlider : any, dataSlider : object, pos : number, model : any, controller : any) : number - определяет позицию, которая ближе всего к точке клика; вызывается в moveRangeOnclickSlider()
		14. masStepsForMoving(thisSlider : any, dataSlider : object, model : any) : number[] - вычисляет точки-пиксели (массив), по которым бегунок может "шагать", если задан шаг; возвращае массив значений пикселей; вызывается в definePosStepClosestClick()

		15. applyConfig(thisSlider : any, dataSlider : object, model : any, controller : any, view : any) : void - отрабатывает клики по радиокнопка и полям в Настройках (минимум, максимум, тип, ориентация, шкала и т.д.). Введеные в поля значения сразу отображаются на слайдере. Выбранные радиокнопки сразу перерисовывоют слайдер в соответсвии с выбранными значениями. А также все выбранные/введенные значения прописываются в объект с данными о слайдере.

		16. checkMinMaxStart(dataSlider : object) : void - прогоняет текущие значения minStart и maxStart, сравнивает с min и max, если текущиеслучайно вышли на пределы возможных значений, то ему присваивается крайнее возможное значение

		17. writeDataInConfig(thisSlider : any, dataSlider : object, model : any, controller : any) : void - прописывает все значения из объекта с данными о слайдере в поля Настроек и устанавливает соответсвующие радиокнопки (checked)

-----Тесты->>------------------------------------------------------------------------------------------------
Запустить страницу со слайдером и тестами: npm run test

Необходимые файлы для тестов: 
index.pug : include blocks/demoSlider/demoSlider.pug
index.js : import '/blocks/demoSlider/demoSlider.scss'
import '/blocks/demoSlider/demoSlider_tests.js'
mocha.run();//вместе с demoSlider_tests.js

-----UML->>------------------------------------------------------------------------------------------------

Не знала как лучше изобразить, показалось наиболее понятной диаграма Деятельности.
Ее подобие размещено по адресам:

https://app.diagrams.net/#G1VwTz2cK7QZN_417_Y1b9WzFS6AWQ9DQW
https://drive.google.com/file/d/1VwTz2cK7QZN_417_Y1b9WzFS6AWQ9DQW/view?usp=sharing

Блоки, размещенные в области классов Model, View и Controller - это методы классов.
В Пользователе указаны возможные действия, которые может выполнять пользователь.
В классе slider указаны действия, которые выполняются при объявлении экземпляра класса.