<template>
  <form ref="formEl" novalidate @submit="onSubmit">
    <AppAlert
      v-if="errorAlert"
      v-model="showError"
      theme="danger"
      :title="errorTitle"
      :fixed="errorAlert === 'fixed'"
      :placement="errorAlertPlacement"
      :auto-dismiss="errorAlertAutoDismiss"
      dismissible
      :class="errorAlert === 'fixed' ? '' : 'mb-4'"
    >
      <template v-if="errorAlert === 'summary'">
        <p v-if="errorMessage" class="mb-2">{{ errorMessage }}</p>
        <ul class="mb-0 ps-4">
          <li v-for="e in summary" :key="e.name">
            <a v-if="e.id" :href="`#${e.id}`" class="alert-link" @click.prevent="goToField(e.id)">{{ e.message }}</a>
            <template v-else>{{ e.message }}</template>
          </li>
        </ul>
      </template>
      <template v-else>{{ errorMessage }}</template>
    </AppAlert>

    <slot :values="values" :errors="errors" :meta="meta" :is-submitting="isSubmitting" :submitted="submitted" />
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { FORM_INJECTION_KEY } from '~/composables/useFormField';

const props = defineProps({
  validate: { type: Boolean, default: true },
  schema: { type: Object, default: undefined },
  initialValues: { type: Object, default: () => ({}) },
  scrollToError: { type: Boolean, default: true },
  // false | 'summary' | 'inline' | 'fixed'
  errorAlert: { type: [String, Boolean], default: false },
  errorTitle: { type: String, default: "Something isn't right" },
  errorMessage: { type: String, default: 'Please fix the following and try again.' },
  // Fixed variant only: top-center | top-end | top-start | bottom-center | bottom-end | bottom-start
  errorAlertPlacement: { type: String, default: 'top-center' },
  // 0 keeps it until dismissed or the form is valid
  errorAlertAutoDismiss: { type: Number, default: 0 },
});

const emit = defineEmits(['submit', 'invalid']);

const formEl = ref(null);
const submitted = ref(false);
const showError = ref(false);

const { handleSubmit, values, errors, meta, isSubmitting, resetForm, setErrors, setValues } = useForm({
  validationSchema: computed(() => (props.validate ? props.schema : undefined)),
  initialValues: props.initialValues,
});

const fields = reactive(new Map());
function register(name, info) {
  fields.set(name, info);
}
function unregister(name) {
  fields.delete(name);
}

provide(FORM_INJECTION_KEY, { validate: toRef(props, 'validate'), submitted, register, unregister });

const summary = computed(() => {
  const list = [];
  for (const [name, info] of fields) {
    if (errors.value[name]) list.push({ name, id: info.id, label: info.label, message: errors.value[name] });
  }
  for (const [name, message] of Object.entries(errors.value)) {
    if (!fields.has(name)) list.push({ name, id: '', label: name, message });
  }
  return list;
});

watch(
  () => Object.keys(errors.value).length,
  (count) => {
    if (count === 0) showError.value = false;
  },
);

function goToField(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.focus({ preventScroll: true });
}

const submitHandler = handleSubmit(
  (vals, ctx) => {
    showError.value = false;
    emit('submit', vals, ctx);
  },
  async (ctx) => {
    emit('invalid', ctx);
    showError.value = Boolean(props.errorAlert);
    if (!props.scrollToError) return;
    // Wait for fields to render their invalid state
    await nextTick();
    const first = formEl.value?.querySelector('.is-invalid, [aria-invalid="true"]');
    if (!first) return;
    first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const focusable = first.matches('input, select, textarea') ? first : first.querySelector('input, select, textarea');
    focusable?.focus({ preventScroll: true });
  },
);

function onSubmit(e) {
  submitted.value = true;
  return submitHandler(e);
}

function reset(state) {
  submitted.value = false;
  showError.value = false;
  resetForm(state);
}

defineExpose({ values, errors, meta, submitted, resetForm: reset, setErrors, setValues });
</script>
