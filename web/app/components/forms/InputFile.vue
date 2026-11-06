<template>
  <FormGroup :id="id" :label="label" :help="help" :error="errorMessage" :required="required">
    <label
      :for="id"
      class="dropzone d-flex flex-column align-items-center text-center gap-1 p-5"
      :class="{ 'is-invalid border-danger': invalid }"
    >
      <i class="fa-solid fa-cloud-arrow-up fs-2 text-primary mb-1" aria-hidden="true" />
      <b>{{ prompt }}</b>
      <span class="small text-body-secondary">{{ hint }}</span>
      <input
        :id="id"
        :name="name"
        type="file"
        class="visually-hidden"
        :accept="accept || undefined"
        :multiple="multiple || undefined"
        :disabled="disabled || undefined"
        :aria-invalid="invalid || undefined"
        :aria-required="required || undefined"
        @change="onChange"
        @blur="handleBlur"
      >
      <ul v-if="fileNames.length" class="list-unstyled small mb-0 mt-2">
        <li v-for="n in fileNames" :key="n">
          <i class="fa-solid fa-file-lines me-1 text-body-secondary" aria-hidden="true" />{{ n }}
        </li>
      </ul>
    </label>
  </FormGroup>
</template>

<script setup>
import { formFieldProps, useFormField } from '~/composables/useFormField';

const props = defineProps({
  ...formFieldProps,
  accept: { type: String, default: '.pdf,.jpg,.jpeg,.png' },
  multiple: { type: Boolean, default: false },
  prompt: { type: String, default: 'Upload or take a photo' },
  hint: { type: String, default: 'PDF, JPG or PNG · up to 10 MB each' },
});

defineEmits(['update:modelValue']);

const { value, errorMessage, handleChange, handleBlur, id, invalid } = useFormField(props);

function onChange(e) {
  const files = Array.from(e.target.files || []);
  handleChange(props.multiple ? files : files[0] || null);
}

const fileNames = computed(() => {
  const v = value.value;
  if (!v) return [];
  return (Array.isArray(v) ? v : [v]).map((f) => f.name).filter(Boolean);
});
</script>

<style scoped lang="scss">
.dropzone {
  border: 1.5px dashed rgba(255, 255, 255, 0.3);
  border-radius: var(--bs-border-radius-lg);
  background: var(--bg-alt);
  color: var(--fg);
  cursor: pointer;

  &:hover {
    border-color: var(--bs-primary);
  }
}
</style>
