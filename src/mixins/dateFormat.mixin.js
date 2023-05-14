export default {
  methods: {
    formatDate(date) {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
      return new Intl.DateTimeFormat('ru-RU', options).format(
        new Date(date),
      );
    },
  },
};
