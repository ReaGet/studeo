export default {
  methods: {
    formatTime(date) {
      if (!date) {
        return '';
      }
      let delta = Math.abs(new Date(date) - new Date()) / 1000;
      const days = Math.floor(delta / 86400);
      delta -= days * 86400;
      const hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;
      const minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;
      const seconds = delta % 60;
      if (days > 0) {
        return `${Math.round(days)} дней назад`;
      }
      if (hours > 0) {
        return `${Math.round(hours)} часов назад`;
      }
      if (minutes > 0) {
        return `${Math.round(minutes)} минут назад`;
      }
      return `${Math.round(seconds)} секунд назад`;
    },
  },
};
