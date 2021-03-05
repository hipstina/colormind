export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `${window.location.origin}`
    : 'http://localhost:3001'

export const WEBAIM = `https://webaim.org/resources/contrastchecker`
