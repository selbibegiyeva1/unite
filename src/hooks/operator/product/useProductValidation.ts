import { useRef, useCallback } from 'react';
import { type ProductGroupForm } from '../../../services/authService';

interface ValidationErrors {
  formFields: Record<string, boolean>;
  checkbox: boolean;
}

interface UseProductValidationOptions {
  productForm: ProductGroupForm | undefined;
  activeTab: 'popolnenie' | 'voucher';
  formValues: Record<string, string>;
  isCheckboxChecked: boolean;
}

export function useProductValidation({
  productForm,
  activeTab,
  formValues,
  isCheckboxChecked,
}: UseProductValidationOptions) {
  const formRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({});
  const checkboxRef = useRef<HTMLDivElement>(null);

  const validate = useCallback((): { isValid: boolean; errors: ValidationErrors } => {
    const errors: ValidationErrors = {
      formFields: {},
      checkbox: false,
    };

    if (!productForm) {
      return { isValid: false, errors };
    }

    // Get the appropriate fields based on active tab
    const fields = activeTab === 'voucher'
      ? productForm.forms?.voucher_fields
      : productForm.forms?.topup_fields;

    // Check if product is Steam - use static fields
    const isSteam = productForm.group === 'Steam';
    const isSteamPopolnenie = isSteam && activeTab === 'popolnenie';

    if (isSteamPopolnenie) {
      // Validate Steam static fields
      if (!formValues.login || formValues.login.trim() === '') {
        errors.formFields['login'] = true;
      }
      if (!formValues.email || formValues.email.trim() === '') {
        errors.formFields['email'] = true;
      }
      if (!formValues.amount || formValues.amount.trim() === '') {
        errors.formFields['amount'] = true;
      }
    } else {
      // Validate dynamic fields (excluding region and product_id)
      const formFields = fields?.filter(field =>
        field.name !== 'region' && field.name !== 'product_id'
      ) || [];

      formFields.forEach((field) => {
        const value = formValues[field.name] || '';
        if (!value || value.trim() === '') {
          errors.formFields[field.name] = true;
        }
      });
    }

    // Validate checkbox
    if (!isCheckboxChecked) {
      errors.checkbox = true;
    }

    const isValid = Object.keys(errors.formFields).length === 0 && !errors.checkbox;

    return { isValid, errors };
  }, [productForm, activeTab, formValues, isCheckboxChecked]);

  const scrollToFirstError = useCallback((errors: ValidationErrors) => {
    // First check form fields
    const fieldNames = Object.keys(errors.formFields);
    if (fieldNames.length > 0) {
      const firstFieldName = fieldNames[0];
      const fieldRef = formRefs.current[firstFieldName];
      if (fieldRef) {
        fieldRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
        fieldRef.focus();
        return;
      }
    }

    // Then check checkbox
    if (errors.checkbox && checkboxRef.current) {
      checkboxRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  }, []);

  const validateAndScroll = useCallback(() => {
    const { isValid, errors } = validate();
    if (!isValid) {
      scrollToFirstError(errors);
    }
    return { isValid, errors };
  }, [validate, scrollToFirstError]);

  return {
    validate,
    validateAndScroll,
    formRefs,
    checkboxRef: checkboxRef as React.RefObject<HTMLDivElement | null>,
  };
}
