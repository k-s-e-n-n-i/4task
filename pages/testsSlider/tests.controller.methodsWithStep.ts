import "/project/jquery.global.js";
import $ from "jquery"
import '/pages/demoSlider/plugin.demoSlider.ts';


export function testsControllerStep(obj, modelTest, contrTest, assert){
  describe("12. Ближайшая к клику позиция.", function() {
    it("controller.definePosStepClosestClick: ", function() {
      assert.equal(contrTest.definePosStepClosestClick(200), 204.73684210526315);
    });
  });

  let widthStep = (obj.width-11) / (obj.max - obj.min) * obj.step, //389/(200-10)*20,
    masPosStep = [widthStep*0, widthStep*1, widthStep*2, widthStep*3, widthStep*4, widthStep*5, widthStep*6, widthStep*7, widthStep*8, widthStep*9];

  describe("13. Массив пикселей, по которым располагаются шаги сладера. [? получаю одинаковые массивы, но не засчитываются за равные ? (в консоли)]", function() {
    it("controller.masStepsForMoving: ", function() {
      assert.equal(contrTest.masStepsForMoving(), masPosStep);
    });
  });
  console.log('13. Массив пикселей, по которым располагаются шаги сладера.', contrTest.masStepsForMoving());
  console.log('13. Массив пикселей, по которым располагаются шаги сладера.', masPosStep);
}