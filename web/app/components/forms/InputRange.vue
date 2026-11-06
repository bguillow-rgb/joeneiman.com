<template>
  <FormGroup :id="id" :label="label" :help="help" :error="errorMessage" :required="required">
    <div class="d-flex align-items-center gap-3">
      <input
        :id="id"
        :name="name"
        type="range"
        class="form-range flex-grow-1"
        :class="{ 'is-invalid': invalid }"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled || undefined"
        :value="value ?? min"
        @input="handleChange(Number($event.target.value))"
        @blur="handleBlur"
      >
      <output v-if="showValue" :for="id" class="small fw-semibold text-nowrap">{{ format(value ?? min) }}</output>
    </div>
  </FormGroup>
</template>

<script setup>
import { formFieldProps, useFormField } from '~/composables/useFormField';

const props = defineProps({
  ...formFieldProps,
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  showValue: { type: Boolean, default: true },
  format: { type: Function, default: (v) => String(v) },
});

defineEmits(['update:modelValue']);

const { value, errorMessage, handleChange, handleBlur, id, invalid } = useFormField(props);
</script>
