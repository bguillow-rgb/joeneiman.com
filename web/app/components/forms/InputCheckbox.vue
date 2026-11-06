<template>
  <FormGroup :id="id" :help="help" :error="errorMessage">
    <div class="form-check" :class="{ 'check-card': variant === 'card' }">
      <input
        :id="id"
        :name="name"
        type="checkbox"
        class="form-check-input"
        :class="{ 'is-invalid': invalid }"
        :checked="Boolean(value)"
        :disabled="disabled || undefined"
        :aria-invalid="invalid || undefined"
        :aria-required="required || undefined"
        @change="handleChange($event.target.checked)"
        @blur="handleBlur"
      >
      <label :for="id" class="form-check-label" :class="{ small: small }">
        <slot>{{ label }}</slot
        ><span v-if="required && showAsterisk" class="text-danger" aria-hidden="true"> *</span>
      </label>
    </div>
  </FormGroup>
</template>

<script setup>
import { formFieldProps, useFormField } from '~/composables/useFormField';

const props = defineProps({
  ...formFieldProps,
  // '' | 'card'
  variant: { type: String, default: '' },
  small: { type: Boolean, default: false },
  showAsterisk: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);

const { value, errorMessage, handleChange, handleBlur, id, invalid } = useFormField(props);
</script>

<style scoped lang="scss">
// A ringed box like the tile buttons. Left padding keeps room for the input, which Bootstrap pulls 1.5em
// outside the label.
.check-card {
  padding: 1rem 1.25rem 1rem calc(1.25rem + 1.5em);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--bs-border-radius-lg);
  background: var(--bg-alt);
}
</style>
