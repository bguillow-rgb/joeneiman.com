<template>
  <FormGroup :id="id" :help="help" :error="errorMessage">
    <div class="form-check form-switch" :class="{ 'form-switch-lg': size === 'lg', 'form-switch-sm': size === 'sm' }">
      <input
        :id="id"
        :name="name"
        type="checkbox"
        role="switch"
        class="form-check-input"
        :class="{ 'is-invalid': invalid }"
        :checked="Boolean(value)"
        :disabled="disabled || undefined"
        :aria-invalid="invalid || undefined"
        :aria-required="required || undefined"
        @change="handleChange($event.target.checked)"
        @blur="handleBlur"
      >
      <label :for="id" class="form-check-label">
        <slot>{{ label }}</slot
        ><span v-if="required" class="text-danger" aria-hidden="true"> *</span>
      </label>
    </div>
  </FormGroup>
</template>

<script setup>
import { formFieldProps, useFormField } from '~/composables/useFormField';

const props = defineProps({
  ...formFieldProps,
  // '' | 'sm' | 'lg'
  size: { type: String, default: '' },
});

defineEmits(['update:modelValue']);

const { value, errorMessage, handleChange, handleBlur, id, invalid } = useFormField(props);
</script>

<style scoped lang="scss">
// Bootstrap 5 switches have one size.
.form-switch-lg .form-check-input {
  width: 3em;
  height: 1.5em;
  margin-top: 0.1em;
}

.form-switch-sm .form-check-input {
  width: 1.75em;
  height: 0.9em;
  margin-top: 0.3em;
}
</style>
