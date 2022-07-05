import * as React from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement, FieldRenderProps } from "@progress/kendo-react-form";
import { Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Error } from "@progress/kendo-react-labels";
import categories from "./categories.json";
import { Product } from "./interfaces";

interface EditFormProps {
    onSubmit: (event: any) => void,
    item: Product
}

const minValueValidator = (value: number) =>
    value >= 0 ? "" : "The value must be 0 or higher";
const NonNegativeNumericInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
        <div>
            <NumericTextBox {...others} />
            {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
    );
};

const EditForm = (props: EditFormProps) => {
    return (
        <Form
            onSubmit={props.onSubmit}
            initialValues={props.item}
            render={formRenderProps => (
                <FormElement style={{ maxWidth: 650 }}>
                    <div className="k-form-buttons">
                        <button
                            type={"submit"}
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                            disabled={!formRenderProps.allowSubmit}
                        >
                            Update
                        </button>
                    </div>
                    <fieldset className={"k-form-fieldset"}>
                        <div className="mb-3">
                            <Field
                                name={"ProductName"}
                                component={Input}
                                label={"Product Name"}
                            />
                        </div>
                        <div className="mb-3">
                            <Field
                                name={"Category"}
                                component={DropDownList}
                                data={categories}
                                textField={"CategoryName"}
                                label={"Category"}
                            />
                        </div>
                        <div className="mb-3">
                            <Field
                                name={"UnitPrice"}
                                component={NonNegativeNumericInput}
                                label={"Price"}
                                validator={minValueValidator}
                            />
                        </div>
                        <div className="mb-3">
                            <Field
                                name={"UnitsInStock"}
                                component={NonNegativeNumericInput}
                                label={"In stock"}
                                validator={minValueValidator}
                            />
                        </div>
                    </fieldset>
                </FormElement>
            )}
        />
    );
};

export default EditForm;