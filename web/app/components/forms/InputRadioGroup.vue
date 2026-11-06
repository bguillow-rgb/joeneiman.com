<template>
  <FormGroup :id="id" :label="label" :help="help" :error="errorMessage" :required="required" fieldset>
    <div v-if="variant === 'buttons'" class="tiles" role="radiogroup" :aria-label="label || name">
      <button
        v-for="o in normalized"
        :key="o.value"
        type="button"
        role="radio"
        :aria-checked="value === o.value"
        class="tile"
        :class="{ selected: value === o.value }"
        :disabled="disabled || o.disabled || undefined"
        @click="handleChange(o.value)"
      >
        {{ o.label }}
      </button>
    </div>

    <div v-else-if="variant === 'cards'" class="vstack gap-3" role="radiogroup" :aria-label="label || name">
      <label
        v-for="o in normalized"
        :key="o.value"
        class="option-card d-flex align-items-stretch"
        :class="{ selected: value === o.value, 'is-invalid': invalid }"
      >
        <slot name="media" :option="o" :checked="value === o.value" />
        <span class="option-body flex-grow-1 d-flex align-items-center gap-3">
          <slot name="option" :option="o" :checked="value === o.value">
            <span class="d-flex flex-column">
              <b>{{ o.label }}</b>
              <span v-if="o.note" class="small text-body-secondary">{{ o.note }}</span>
            </span>
          </slot>
        </span>
        <span class="option-control d-flex align-items-center">
          <input
            type="radio"
            class="form-check-input m-0"
            :class="{ 'is-invalid': invalid }"
            :name="name"
            :value="o.value"
            :checked="value === o.value"
            :disabled="disabled || o.disabled || undefined"
            @change="handleChange(o.value)"
            @blur="handleBlur"
          >
        </span>
      </label>
    </div>

    <div
      v-else
      :class="inline ? 'd-flex flex-wrap gap-4' : 'vstack gap-3'"
      role="radiogroup"
      :aria-label="label || name"
    >
      <div v-for="o in normalized" :key="o.value" class="form-check">
        <input
          :id="`${id}-${o.value}`"
          type="radio"
          class="form-check-input"
          :class="{ 'is-invalid': invalid }"
          :name="name"
          :value="o.value"
          :checked="value === o.value"
          :disabled="disabled || o.disabled || undefined"
          @change="handleChange(o.value)"
          @blur="handleBlur"
        >
        <label :for="`${id}-${o.value}`" class="form-check-label d-flex gap-3 align-items-start">
          <slot name="option" :option="o" :checked="value === o.value">
            <span class="d-flex flex-column">
              <b v-if="o.note">{{ o.label }}</b>
              <span v-else>{{ o.label }}</span>
              <span v-if="o.note" class="small text-body-secondary">{{ o.note }}</span>
            </span>
          </slot>
        </label>
      </div>
    </div>
  </FormGroup>
</template>

<script setup>
import { formFieldProps, useFormField } from '~/composables/useFormField';

const props = defineProps({
  ...formFieldProps,
  options: { type: Array, default: () => [] },
  // '' | 'buttons' | 'cards'
  variant: { type: String, default: '' },
  inline: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);

const { value, errorMessage, handleChange, handleBlur, id, invalid } = useFormField(props);

const normalized = computed(() =>
  props.options.map((o) => (o && typeof o === 'object' ? o : { value: o, label: String(o) })),
);
</script>

<style scoped lang="scss">
// Equal-width tiles with a plain ring; the selected one fills like btn-primary
.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
  gap: 5px;

  // Phones get a 2-up grid rather than three across and an orphan
  @media (max-width: $sm-max) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.tile {
  min-height: 50px;
  padding: 0.5rem 1rem;
  line-height: 1.2;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--bs-border-radius-lg);
  background: var(--bg-alt);
  color: var(--fg);
  font-weight: 600;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }

  &:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.35);
  }

  &.selected {
    background: var(--bs-primary);
    border-color: var(--bs-primary);
    color: #fff;
  }

  &:disabled {
    opacity: 0.65;
  }
}

// Option cards: a ringed row with the control on the right; a `media` slot can fill the left edge
.option-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--bs-border-radius-lg);
  background: var(--bg-alt);
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }

  &.selected {
    border-color: var(--bs-primary);
    box-shadow: inset 0 0 0 1px var(--bs-primary);
  }

  &.is-invalid {
    border-color: var(--bs-form-invalid-border-color);
  }
}

.option-body {
  padding: 1.25rem 1.5rem;
}

.option-control {
  padding-right: 1.5rem;

  .form-check-input {
    width: 1.5em;
    height: 1.5em;
  }
}
</style>
