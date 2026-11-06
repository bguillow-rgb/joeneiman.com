<template>
  <div class="newsletter" v-reveal>
    <AppAlert v-if="sent" theme="success" title="You're on the list.">
      First essay lands in your inbox when it's ready. No noise in between.
    </AppAlert>

    <AppForm v-else :schema="schema" @submit="onSubmit">
      <template #default="{ isSubmitting }">
        <div class="row g-2 align-items-start">
          <div class="col-12 col-sm">
            <InputText
              name="email"
              label="Email"
              type="email"
              autocomplete="email"
              inputmode="email"
              placeholder="you@example.com"
              floating
              required
            />
          </div>
          <div class="col-12 col-sm-auto">
            <button type="submit" class="btn btn-primary w-100" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" aria-hidden="true" />
              Sign up
            </button>
          </div>
        </div>
        <p class="form-text mt-2 mb-0">One email per essay. Unsubscribe any time.</p>
      </template>
    </AppForm>
  </div>
</template>

<script setup>
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

const schema = toTypedSchema(
  object({
    email: string().trim().required('An email is required.').email("That email doesn't look right."),
  }),
);

const sent = ref(false);

async function onSubmit() {
  // TODO: wire to the newsletter provider. Mocked for the review build.
  await new Promise((r) => setTimeout(r, 700));
  sent.value = true;
}
</script>

<style scoped lang="scss">
.newsletter {
  max-width: 34rem;
}

// Match the 50px floating control
.btn {
  min-height: 50px;
}
</style>
