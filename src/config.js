// config.js
const config = {
  API_URL: 'https://social-media-manager-backend-xpkofhnf.fly.dev', // Deployed FastAPI backend URL
  SUPPORTED_LANGUAGES: ['en', 'es', 'fr', 'de', 'zh'], // English, Spanish, French, German, Chinese
  DEFAULT_LANGUAGE: 'en',
  SUPPORTED_CURRENCIES: ['USD', 'EUR', 'GBP', 'JPY', 'CNY'], // US Dollar, Euro, British Pound, Japanese Yen, Chinese Yuan
  DEFAULT_CURRENCY: 'USD',
  STRIPE_PUBLISHABLE_KEY: 'pk_test_your_publishable_key_here', // Replace with your actual Stripe publishable key
};

export default config;
