export default function fetcher(path, opts = {}) {
  opts.credentials = "include";
  return fetch(path, opts).then((res) => res.json());
}
