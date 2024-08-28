export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0, 'never', ['sentence-case', 'pascal-case', 'upper-case']],
    'header-max-length': [0, 'always', 200],
  },
};
