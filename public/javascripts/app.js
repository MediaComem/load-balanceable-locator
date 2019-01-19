const DEFAULT_IP_PLACEHOLDER = 'Enter an IP address';

const app = new Vue({
  el: '#app',
  template: '#app-template',
  mounted,
  data: {
    currentIp: null,
    ip: '',
    ipLocation: null
  },
  computed: {
    ipPlaceholder
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

function ipPlaceholder() {
  if (!this.currentIp || this.currentIp === '127.0.0.1' || this.currentIp === '::1') {
    return DEFAULT_IP_PLACEHOLDER;
  } else {
    return this.currentIp;
  }
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
  if (!ip) {
    this.currentIp = resBody.ip;
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
