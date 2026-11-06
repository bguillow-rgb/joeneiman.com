<template>
  <FormGroup
    :id="id"
    :label="grouped && floating ? '' : label"
    :help="help"
    :error="errorMessage"
    :required="required"
    :floating="floating && !grouped"
  >
    <div v-if="grouped" class="input-group" :class="{ 'is-invalid': invalid }">
      <span v-if="prefix" class="input-group-text">{{ prefix }}</span>
      <div v-if="floating" class="form-floating" :class="{ 'is-invalid': invalid }">
        <input v-bind="inputAttrs" :value="value ?? ''" @input="handleChange" @blur="handleBlur">
        <label :for="id">{{ label }}<span v-if="required" class="text-danger" aria-hidden="true"> *</span></label>
      </div>
      <input v-else v-bind="inputAttrs" :value="value ?? ''" @input="handleChange" @blur="handleBlur">
      <span v-if="suffix" class="input-group-text">{{ suffix }}</span>
    </div>
    <input v-else v-bind="inputAttrs" :value="value ?? ''" @input="handleChange" @blur="handleBlur">
  </FormGroup>
</template>

<script setup>
import { formFieldProps, useFormField } from '~/composables/useFormField';

const props = defineProps({
  ...formFieldProps,
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  autocomplete: { type: String, default: undefined },
  inputmode: { type: String, default: undefined },
  // 'sm' | 'lg'
  size: { type: String, default: '' },
  floating: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);

const { value, errorMessage, handleChange, handleBlur, id, invalid } = useFormField(props);

const grouped = computed(() => Boolean(props.prefix || props.suffix));

const inputAttrs = computed(() => ({
  id: id.value,
  name: props.name,
  type: props.type,
  class: [
    'form-control',
    { 'is-invalid': invalid.value, 'form-control-sm': props.size === 'sm', 'form-control-lg': props.size === 'lg' },
  ],
  // Floating labels rely on :placeholder-shown, so a placeholder is required.
  placeholder: props.placeholder || (props.floating ? props.label || ' ' : undefined),
  readonly: props.readonly || undefined,
  disabled: props.disabled || undefined,
  autocomplete: props.autocomplete,
  inputmode: props.inputmode,
  'aria-invalid': invalid.value || undefined,
  'aria-required': props.required || undefined,
}));
</script>

<style scoped>
/* Controls are 50px tall, so a one-character addon is square */
.input-group-text {
  min-width: 50px;
  justify-content: center;
}
</style>
