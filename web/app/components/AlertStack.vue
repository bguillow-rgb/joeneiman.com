<template>
  <Teleport to="body">
    <div class="position-fixed z-3 p-4 vstack gap-3 alert-stack" :class="placementClass" aria-live="polite">
      <AppAlert
        v-for="a in alerts.items.value"
        :key="a.id"
        :theme="a.theme"
        :title="a.title"
        :message="a.message"
        :dismissible="a.dismissible"
        :auto-dismiss="a.autoDismiss"
        class="shadow-lg"
        @dismiss="alerts.dismiss(a.id)"
      />
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  // top-end | top-start | top-center | bottom-end | bottom-start | bottom-center
  placement: { type: String, default: 'top-end' },
});

const alerts = useAlerts();

const placementClass = computed(() => {
  const [v, h] = props.placement.split('-');
  const vertical = v === 'bottom' ? 'bottom-0' : 'top-0';
  const horizontal = h === 'start' ? 'start-0' : h === 'center' ? 'start-50 translate-middle-x' : 'end-0';
  return `${vertical} ${horizontal}`;
});
</script>

<style scoped lang="scss">
.alert-stack {
  max-width: min(28rem, calc(100vw - 2rem));
  width: 100%;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}
</style>
