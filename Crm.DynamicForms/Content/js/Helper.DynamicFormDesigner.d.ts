declare class HelperDynamicFormDesigner {
    static addChoice(dynamicFormElement: any, index: any): void;
    static displayAboutToBeReleasedWarning(dynamicForm: any, alreadySavedDynamicForm: any): any;
    static displayAlreadyReleasedWarning(alreadySavedDynamicForm: any): any;
    static reducedFunctionalityModeActive(): any;
    static getCondition(form: any, rules: any, conditions: any, dynamicFormElementRuleCondition: any): any;
    static getLocalization(form: any, dynamicFormElement: any, choiceIndex: any, language: any, localizations: any): any;
    static getLocalizationText(dynamicFormElement: any, choiceIndex: any, hint: any, localizations: any, language: any): any;
    static getReferencingElements(dynamicFormElement: any, conditions: any, rules: any, formElements: any): any;
    static getRule(dynamicForm: any, dynamicFormElement: any, dynamicFormElementRule: any, rules: any): any;
    static hasRules(dynamicFormElement: any, rules: any): boolean;
    static getSizeOptionList(): KnockoutObservableArray<{
        Id: number;
        Name: any;
    }>;
    static getRowSizeOptionList(): KnockoutObservableArray<{
        Id: number;
        Name: any;
    }>;
    static getLayoutOptionList(): KnockoutObservableArray<{
        Id: number;
        Name: any;
    }>;
    static getSortableOptions(): {
        connectWith: string;
        items: string;
        handle: string;
        tolerance: string;
        placeholder: string;
        start: (e: any, ui: any) => void;
    };
    static groupFormElements(elements: any): any[][][];
    static removeChoice(dynamicFormElement: any, index: any): void;
    static removeFormElement(formElement: any, formElements: any, rules: any, conditions: any): void;
}
