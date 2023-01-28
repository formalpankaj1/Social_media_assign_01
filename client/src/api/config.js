// export const apiUrl = "http://localhost:9000";
export const apiUrl = document.location.href.startsWith('http://localhost')
   ? 'http://localhost:9000/api'
   : 'https://erin-filthy-lovebird.cyclic.app/api';
   