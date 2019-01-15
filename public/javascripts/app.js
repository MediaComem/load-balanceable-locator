const app = new Vue({
  el: '#app',
  template: '#app-template',
  mounted,
  data: {
    ip: '',
    ipPlaceholder: 'IP address'
  },
  computed: {
  },
  methods: {
    submit
  }
});

async function mounted() {
  await fetchLocation();
}

async function submit(event) {
  event.preventDefault();
  await fetchLocation(ip);
}

async function fetchLocation(ip) {

  const body = ip ? { ip } : undefined;

  const resBody = await fetchJson('/api/locations', {
    method: 'POST',
    body
  });

  if (this.ipPlaceholder === 'IP address') {
    this.ipPlaceholder = resBody.ip;
  }
}

async function fetchJson(url, options = {}) {

  const defaultHeaders = {};
  if (options.body) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    ...options,
    body: options.body ? JSON.stringify(options.body) : options.body,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  });

  return res.json();
}
