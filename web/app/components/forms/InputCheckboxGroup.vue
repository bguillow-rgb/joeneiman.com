<template>
  <FormGroup :id="id" :label="label" :help="help" :error="errorMessage" :required="required" fieldset>
    <div v-if="variant === 'buttons'" class="row g-2" role="group" :aria-label="label || name">
      <div v-for="o in normalized" :key="o.value" class="col-12" :class="`col-sm-${12 / columns}`">
        <button
          type="button"
          role="checkbox"
          :aria-checked="selected.includes(o.value)"
          class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-between gap-3"
          :class="{ active: selected.includes(o.value) }"
          :disabled="disabled || o.disabled || undefined"
          @click="toggle(o.value, !selected.includes(o.value))"
        >
          {{ o.label }}
          <!-- Always rendered so the button doesn't change width when toggled -->
          <i class="fa-solid fa-check" :class="{ invisible: !selected.includes(o.value) }" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div v-else :class="inline ? 'd-flex flex-wrap gap-4' : 'vstack gap-3'">
      <div v-for="o in normalized" :key="o.value" class="form-check">
        <input
          :id="`${id}-${o.value}`"
          type="checkbox"
          class="form-check-input"
          :class="{ 'is-invalid': invalid }"
          :name="name"
          :value="o.value"
          :checked="selected.includes(o.value)"
          :disabled="disabled || o.disabled || undefined"
          @change="toggle(o.value, $event.target.checked)"
          @blur="handleBlur"
        >
        <label :for="`${id}-${o.value}`" class="form-check-label">
          <slot name="option" :option="o" :checked="selected.includes(o.value)">
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
  // '' | 'buttons'
  variant: { type: String, default: '' },
  inline: { type: Boolean, default: false },
  // Buttons per row from the sm breakpoint up (stacked below it); must divide 12
  columns: { type: Number, default: 3 },
});

defineEmits(['update:modelValue']);

const { value, errorMessage, handleChange, handleBlur, id, invalid } = useFormField(props);

const normalized = computed(() =>
  props.options.map((o) => (o && typeof o === 'object' ? o : { value: o, label: String(o) })),
);

const selected = computed(() => (Array.isArray(value.value) ? value.value : []));

function toggle(v, checked) {
  const next = selected.value.filter((x) => x !== v);
  if (checked) next.push(v);
  handleChange(next);
}
</script>
