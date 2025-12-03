import axios from "axios";

const axiosConfig = axios.create({

  baseURL: 'https://manage.athaararabia.com/api'
});

export default axiosConfig;

// 'https://phpstack-876914-3037838.cloudwaysapps.com/api'