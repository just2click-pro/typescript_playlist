import { FormController } from "./form.controller";
import { ListController } from "./list.controller";
import { FormUtils } from "./form.util";

class App { 
        
    constructor (private _fromController: FormController,
        private _listController: ListController) {

        _listController.getList();
        _listController.renderList();
    }
}

let listController = new ListController();
let formUtils = new FormUtils();
let formController = new FormController(formUtils, listController);

let myApp = new App(formController, listController);

