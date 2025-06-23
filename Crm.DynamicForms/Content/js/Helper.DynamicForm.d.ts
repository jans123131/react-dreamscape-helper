declare class HelperDynamicForm {
    static getChoicesArray(dynamicFormElement: any): any;
    static getCssFromLayout(layout: any): "col-md-12" | "col-md-6" | "col-md-4" | "side-by-side";
    static getDynamicFormLocalization(dynamicForm: any, localizations: any, language: any): any;
    static getDynamicFormVisitReportFilter(query: any, term: any): any;
    static getDescription(dynamicForm: any, localizations: any, language: any): any;
    static getTitle(dynamicForm: any, localizations: any, language: any): any;
    static mapForSelect2Display(dynamicForm: any): {
        id: any;
        item: any;
        text: any;
    };
    static scrollToError(viewModel: any, page: any, errorIndex: any): void;
}
