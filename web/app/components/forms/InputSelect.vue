<template>
  <FormGroup :id="id" :label="label" :help="help" :error="errorMessage" :required="required" :floating="floating">
    <select
      :id="id"
      :name="name"
      class="form-select"
      :class="{ 'is-invalid': invalid }"
      :disabled="disabled || undefined"
      :aria-invalid="invalid || undefined"
      :aria-required="required || undefined"
      :value="value ?? ''"
      @change="handleChange"
      @blur="handleBlur"
    >
      <!-- Without this, an empty value would visually show the first option while the model stays empty;
           `selected` keeps the server-rendered markup right before hydration -->
      <option v-if="placeholder || isEmpty" value="" disabled :selected="isEmpty">
        {{ placeholder || 'Select…' }}
      </option>
      <option v-for="o in normalized" :key="o.value" :value="o.value" :disabled="o.disabled">{{ o.label }}</option>
    </select>
  </FormGroup>
</template>

<script setup>
import { formFieldProps, useFormField } from '~/composables/useFormField';

const props = defineProps({
  ...formFieldProps,
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: '' },
  floating: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);

const { value, errorMessage, handleChange, handleBlur, id, invalid } = useFormField(props);

const normalized = computed(() =>
  props.options.map((o) => (o && typeof o === 'object' ? o : { value: o, label: String(o) })),
);

const isEmpty = computed(() => value.value === undefined || value.value === null || value.value === '');
</script>
