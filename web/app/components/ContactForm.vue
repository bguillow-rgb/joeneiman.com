<template>
  <div class="form-card" v-reveal>
    <AppAlert v-if="sent" theme="success" title="Got it.">
      Thanks, {{ sentName }}. I read everything that comes in here and I'll get back to you if it's a fit.
    </AppAlert>

    <AppForm v-else ref="form" :schema="schema" error-alert="summary" @submit="onSubmit">
      <template #default="{ isSubmitting }">
        <div class="row g-3">
          <div class="col-12 col-md-6">
            <InputText name="name" label="Name" autocomplete="name" required />
          </div>
          <div class="col-12 col-md-6">
            <InputText name="email" label="Email" type="email" autocomplete="email" inputmode="email" required />
          </div>
          <div class="col-12">
            <InputSelect name="topic" label="What is this about?" :options="topics" placeholder="Pick one" required />
          </div>
          <div class="col-12">
            <InputTextarea
              name="message"
              label="The short version"
              :rows="5"
              help="A few sentences is plenty. Links welcome."
              required
            />
          </div>
          <div class="col-12 d-flex flex-wrap align-items-center justify-content-between gap-3 mt-4">
            <span class="small text-body-secondary">No lists, no follow-up sequences. Just a reply if it's a fit.</span>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" aria-hidden="true" />
              Send it
            </button>
          </div>
        </div>
      </template>
    </AppForm>
  </div>
</template>

<script setup>
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

const topics = [
  { value: 'dealership', label: 'A franchise dealership for sale' },
  { value: 'airplane', label: 'An airplane worth a look' },
  { value: 'startup', label: 'An early-stage company' },
  { value: 'speaking', label: 'A speaking invitation' },
  { value: 'merici', label: 'Something Merici-related' },
  { value: 'other', label: 'Something else' },
];

const schema = toTypedSchema(
  object({
    name: string().trim().required('Your name is required.'),
    email: string().trim().required('An email is required.').email("That email doesn't look right."),
    topic: string().required('Pick what this is about.'),
    message: string().trim().required('Tell me a little about it.').min(20, 'A little more detail helps.'),
  }),
);

const form = ref(null);
const sent = ref(false);
const sentName = ref('');

async function onSubmit(values) {
  // TODO: wire to the form backend. Mocked for the review build.
  await new Promise((r) => setTimeout(r, 700));
  sentName.value = values.name.split(' ')[0];
  sent.value = true;
}
</script>

<style scoped lang="scss">
.form-card {
  padding: clamp(1.25rem, 3vw, 2.25rem);
  background: var(--bg-alt);
  border-radius: $radius-tile;
}
</style>
