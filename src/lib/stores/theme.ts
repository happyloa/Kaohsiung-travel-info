import { writable } from 'svelte/store';

const initial = typeof localStorage !== 'undefined'
  ? localStorage.getItem('theme') === 'dark'
  : false;

export const isDark = writable(initial);

isDark.subscribe((value) => {
  if (typeof document !== 'undefined') {
    document.body.classList.toggle('dark', value);
    document.body.classList.toggle('bg-gray-100', !value);
    document.body.classList.toggle('bg-gray-900', value);
    try {
      localStorage.setItem('theme', value ? 'dark' : 'light');
    } catch {}
  }
});
