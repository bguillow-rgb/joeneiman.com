const THEMES = ['primary', 'success', 'danger', 'warning', 'info', 'dark', 'secondary', 'light'];

let nextId = 1;

export function useAlerts() {
  const items = useState('alerts', () => []);

  function push(alert) {
    const id = nextId++;
    items.value.push({
      id,
      theme: 'primary',
      title: '',
      message: '',
      dismissible: true,
      autoDismiss: 6000,
      ...alert,
    });
    return id;
  }

  function dismiss(id) {
    items.value = items.value.filter((a) => a.id !== id);
  }

  function clear() {
    items.value = [];
  }

  const byTheme = Object.fromEntries(
    THEMES.map((theme) => [theme, (message, options = {}) => push({ theme, message, ...options })]),
  );

  return { items, push, dismiss, clear, ...byTheme };
}
