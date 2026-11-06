import { useField } from 'vee-validate';

export const formFieldProps = {
  name: { type: String, required: true },
  modelValue: { type: null, default: undefined },
  label: { type: String, default: '' },
  help: { type: String, default: '' },
  required: { type: Boolean, default: false },
  rules: { type: [Function, Object], default: undefined },
  // Tri-state: true/false overrides the parent AppForm; unset inherits it.
  validate: { type: null, default: undefined },
  id: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
};

export const FORM_INJECTION_KEY = Symbol('AppForm');

const isEmpty = (v) => v === undefined || v === null || v === '' || v === false || (Array.isArray(v) && v.length === 0);

export function useFormField(props, fieldOptions = {}) {
  const form = inject(FORM_INJECTION_KEY, null);

  const enabled = computed(() => {
    const own = props.validate;
    if (own === undefined || own === null) return form?.validate.value ?? true;
    if (typeof own === 'string') return own !== 'false';
    return Boolean(own);
  });

  const rules = computed(() => {
    if (!enabled.value) return undefined;
    if (props.rules && typeof props.rules === 'object') return props.rules;

    const checks = [];
    if (props.required) {
      checks.push((v) => (isEmpty(v) ? `${props.label || 'This field'} is required.` : true));
    }
    if (typeof props.rules === 'function') checks.push(props.rules);
    if (!checks.length) return undefined;

    return (v) => {
      for (const check of checks) {
        const result = check(v);
        if (result !== true) return result;
      }
      return true;
    };
  });

  const uid = useId();
  const id = computed(() => props.id || `field-${uid}`);

  const field = useField(() => props.name, rules, {
    label: () => props.label || props.name,
    syncVModel: true,
    // Validation is deferred until the first submit; standalone fields (no AppForm) validate live.
    validateOnValueUpdate: false,
    validateOnMount: false,
    ...fieldOptions,
  });

  const live = computed(() => !form || form.submitted.value);
  const handleChange = (valueOrEvent) => field.handleChange(valueOrEvent, live.value);

  const invalid = computed(() => Boolean(field.errorMessage.value));

  if (form?.register) {
    onMounted(() => form.register(props.name, { id: id.value, label: props.label || props.name }));
    onBeforeUnmount(() => form.unregister(props.name));
  }

  return { ...field, handleChange, id, invalid, enabled };
}
