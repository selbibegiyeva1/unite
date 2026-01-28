import { useRef, useCallback } from 'react';

interface ValidationErrors {
  formFields: Record<string, boolean>;
  checkbox: boolean;
}

interface UseEsimValidationOptions {
  formValues: Record<string, string>;
  isCheckboxChecked: boolean;
}

export function useEsimValidation({
  formValues,
  isCheckboxChecked,
}: UseEsimValidationOptions) {
  const formRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const checkboxRef = useRef<HTMLDivElement>(null);

  const validate = useCallback((): { isValid: boolean; errors: ValidationErrors } => {
    const errors: ValidationErrors = {
      formFields: {},
      checkbox: false,
    };

    // Validate email field
    const email = formValues['email'] || '';
    if (!email || email.trim() === '') {
      errors.formFields['email'] = true;
    }

    // Validate phone field
    const phone = formValues['phone'] || '';
    if (!phone || phone.trim() === '') {
      errors.formFields['phone'] = true;
    }

    // Validate checkbox
    if (!isCheckboxChecked) {
      errors.checkbox = true;
    }

    const isValid = Object.keys(errors.formFields).length === 0 && !errors.checkbox;

    return { isValid, errors };
  }, [formValues, isCheckboxChecked]);

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
