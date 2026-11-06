<template>
  <FormGroup :id="`dp-input-${id}`" :label="label" :help="help" :error="errorMessage" :required="required">
    <ClientOnly>
      <VueDatePicker
        :uid="id"
        :model-value="value ?? null"
        model-type="yyyy-MM-dd"
        :range="mode === 'range'"
        :multi-dates="mode === 'multiple'"
        :min-date="min || undefined"
        :max-date="max || undefined"
        :enable-time-picker="false"
        :formats="{ input: format }"
        :text-input="{ format: [format, 'MM/dd/yyyy', 'M/d/yyyy', 'yyyy-MM-dd'] }"
        :placeholder="placeholder"
        :disabled="disabled"
        :ui="{ input: ['form-control', invalid ? 'is-invalid' : ''] }"
        :teleport="true"
        dark
        auto-apply
        @update:model-value="handleChange"
        @blur="handleBlur"
      />
      <template #fallback>
        <input :id="`dp-input-${id}`" type="date" class="form-control" :value="value ?? ''" disabled>
      </template>
    </ClientOnly>
  </FormGroup>
</template>

<script setup>
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { formFieldProps, useFormField } from '~/composables/useFormField';

const props = defineProps({
  ...formFieldProps,
  // 'single' | 'multiple' | 'range' — value is 'YYYY-MM-DD', or an array of them
  mode: { type: String, default: 'single' },
  min: { type: String, default: '' },
  max: { type: String, default: '' },
  // date-fns tokens for the text shown in the input; typed dates also accept MM/DD/YYYY
  format: { type: String, default: 'MMM d, yyyy' },
  placeholder: { type: String, default: 'MM/DD/YYYY' },
});

defineEmits(['update:modelValue']);

const { value, errorMessage, handleChange, handleBlur, id, invalid } = useFormField(props);
</script>

<style lang="scss">
.dp__theme_dark {
  --dp-background-color: #{$bg-alt};
  --dp-text-color: #{$fg};
  --dp-hover-color: #{$surface};
  --dp-hover-text-color: #{$fg};
  --dp-primary-color: var(--bs-primary);
  --dp-secondary-color: #{$muted};
  --dp-border-color: #{$line};
  --dp-menu-border-color: #{$line};
  --dp-border-color-hover: #{$accent};
  --dp-border-radius: #{$radius-button};
  --dp-font-family: var(--bs-body-font-family);
  --dp-input-padding: 12px 30px 12px 12px;
}
</style>
