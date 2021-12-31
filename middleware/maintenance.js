export default function ({ store, redirect, error }) {
  const isMaintan = store.state.app.maintenance;
  if (isMaintan) {
    error({ message: '', statusCode: 503 });
  }
}
