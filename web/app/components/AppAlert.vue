<template>
  <Teleport to="body" :disabled="!fixed">
    <div v-if="show" v-bind="$attrs" :class="fixed ? ['position-fixed z-3 p-4 app-alert-fixed', placementClass] : ''">
      <div
        class="alert d-flex gap-3 align-items-start mb-0"
        :class="[`alert-${theme}`, { 'shadow-lg': fixed }]"
        :role="theme === 'danger' || theme === 'warning' ? 'alert' : 'status'"
        :aria-live="theme === 'danger' || theme === 'warning' ? 'assertive' : 'polite'"
      >
        <i v-if="iconName" :class="['fa-solid', `fa-${iconName}`, 'fa-fw', 'mt-1', 'flex-shrink-0']" aria-hidden="true" />
        <div class="flex-grow-1">
          <h2 v-if="title" class="alert-heading mb-1">{{ title }}</h2>
          <div>
            <slot>{{ message }}</slot>
          </div>
        </div>
        <button v-if="dismissible" type="button" class="btn-close btn-close-white flex-shrink-0" aria-label="Close" @click="close" />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
// Teleport roots can't inherit attrs automatically; see v-bind="$attrs" in the template.
defineOptions({ inheritAttrs: false });

const props = defineProps({
  // primary | secondary | success | danger | warning | info | light | dark
  theme: { type: String, default: 'primary' },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  dismissible: { type: Boolean, default: false },
  // Milliseconds before auto-hiding; 0 disables.
  autoDismiss: { type: Number, default: 0 },
  fixed: { type: Boolean, default: false },
  // top-end | top-start | top-center | bottom-end | bottom-start | bottom-center
  placement: { type: String, default: 'top-end' },
  icon: { type: [String, Boolean], default: undefined },
});

const emit = defineEmits(['dismiss']);

const show = defineModel({ type: Boolean, default: true });

const THEME_ICONS = {
  success: 'circle-check',
  danger: 'circle-exclamation',
  warning: 'circle-exclamation',
};

const iconName = computed(() => {
  if (props.icon === false) return null;
  if (typeof props.icon === 'string') return props.icon;
  return THEME_ICONS[props.theme] || 'circle-info';
});

const placementClass = computed(() => {
  const [v, h] = props.placement.split('-');
  const vertical = v === 'bottom' ? 'bottom-0' : 'top-0';
  const horizontal = h === 'start' ? 'start-0' : h === 'center' ? 'start-50 translate-middle-x' : 'end-0';
  return `${vertical} ${horizontal}`;
});

function close() {
  show.value = false;
  emit('dismiss');
}

let timer = null;
watch(
  () => [show.value, props.autoDismiss],
  ([visible, ms]) => {
    clearTimeout(timer);
    if (visible && ms > 0) timer = setTimeout(close, ms);
  },
  { immediate: true },
);
onBeforeUnmount(() => clearTimeout(timer));
</script>

<style scoped lang="scss">
.app-alert-fixed {
  max-width: min(28rem, calc(100vw - 2rem));
  width: 100%;
}

.alert-heading {
  @include type('body');
  font-weight: 600;
  margin-top: 0;
}
</style>
