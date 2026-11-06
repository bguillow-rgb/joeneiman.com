<template>
  <component :is="fieldset ? 'fieldset' : 'div'">
    <!-- Bootstrap 5 floating labels: control first, label after -->
    <div v-if="floating" class="form-floating" :class="{ 'is-invalid': error }">
      <slot />
      <label :for="id">{{ label }}<span v-if="required" class="text-danger" aria-hidden="true"> *</span></label>
    </div>

    <template v-else>
      <component
        :is="fieldset ? 'legend' : 'label'"
        v-if="label"
        :for="fieldset ? null : id"
        class="form-label fw-semibold"
        :class="{ 'mb-2': fieldset, 'visually-hidden': hideLabel }"
      >
        {{ label }}<span v-if="required" class="text-danger" aria-hidden="true"> *</span>
      </component>
      <slot />
    </template>

    <div v-if="help && !error" class="form-text">{{ help }}</div>
    <div v-if="error" class="invalid-feedback d-block">{{ error }}</div>
  </component>
</template>

<script setup>
defineProps({
  label: { type: String, default: '' },
  id: { type: String, default: '' },
  help: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  fieldset: { type: Boolean, default: false },
  floating: { type: Boolean, default: false },
  // Keep the label for screen readers only
  hideLabel: { type: Boolean, default: false },
});
</script>
