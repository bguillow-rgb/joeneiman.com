<template>
  <div class="form-card" v-reveal>
    <AppAlert v-if="sent" theme="success" title="Got it.">
      Thanks, {{ sentName }}. I read everything that comes in here and I'll get back to you if it's a fit.
    </AppAlert>

    <AppForm v-else ref="form" :schema="schema" error-alert="summary" @submit="onSubmit">
      <template #default="{ isSubmitting }">
        <div class="row g-3">
          <div class="col-12">
            <InputText name="name" label="Name" autocomplete="name" floating :asterisk="false" required />
          </div>
          <div class="col-12">
            <InputText name="email" label="Email address" type="email" autocomplete="email" inputmode="email" floating :asterisk="false" required />
          </div>
          <div class="col-12">
            <InputTextarea
              name="message"
              label="Message"
              :rows="5"
              floating
              :asterisk="false"
              required
            />
          </div>
          <div class="col-12 d-flex justify-content-end mt-4">
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

const schema = toTypedSchema(
  object({
    name: string().trim().required('Your name is required.'),
    email: string().trim().required('An email is required.').email("That email doesn't look right."),
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
  padding: clamp(1.5rem, 5vw, 4rem);
  background: var(--bg-alt);
  border-radius: $radius-tile;
}
</style>
