const app = new Vue({
  el: '#app',
  template: '#app-template',
  mounted,
  data: {
    ip: '',
    ipLocation: null,
    ipPlaceholder: 'IP address'
  },
  computed: {
  },
  methods: {
    getHumanLocation,
    hasIpLocation,
    submit
  }
});

function getHumanLocation() {
  if (!this.ipLocation) {
    return '';
  }

  return _.compact([ this.ipLocation.city, this.ipLocation.region, this.ipLocation.country ]).join(', ');
}

function hasIpLocation() {
  return this.ipLocation && this.ipLocation.country;
}

async function mounted() {
  await fetchLocation.call(this);
}

async function submit(event) {
  event.preventDefault();
  await fetchLocation.call(this, this.ip);
}

async function fetchLocation(ip) {

  const body = ip ? { ip } : undefined;

  const resBody = await fetchJson('/api/locations', {
    method: 'POST',
    body
  });

  this.ipLocation = resBody.location;
  if (this.ipPlaceholder === 'IP address' && resBody.location && resBody.location.ip) {
    this.ipPlaceholder = resBody.location.ip;
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

  if (res.status < 200 || res.status > 299) {
    throw new Error(`Server responded with unexpected status code ${res.status}`);
  }

  return res.json();
}
