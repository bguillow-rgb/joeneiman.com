<template>
  <FormGroup :id="id" :label="label" :help="help" :error="errorMessage" :required="required" :floating="floating">
    <textarea
      :id="id"
      :name="name"
      class="form-control"
      :class="{ 'is-invalid': invalid }"
      :rows="floating ? undefined : rows"
      :style="floating ? { height: `${rows * 1.5 + 2.5}rem` } : null"
      :placeholder="placeholder || (floating ? label || ' ' : undefined)"
      :readonly="readonly || undefined"
      :disabled="disabled || undefined"
      :aria-invalid="invalid || undefined"
      :aria-required="required || undefined"
      :value="value ?? ''"
      @input="handleChange"
      @blur="handleBlur"
    />
  </FormGroup>
</template>

<script setup>
import { formFieldProps, useFormField } from '~/composables/useFormField';

const props = defineProps({
  ...formFieldProps,
  rows: { type: Number, default: 4 },
  placeholder: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  floating: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);

const { value, errorMessage, handleChange, handleBlur, id, invalid } = useFormField(props);
</script>
