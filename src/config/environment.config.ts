export const environment = () => ({
  port: process.env.APP_PORT || 3001,
  farofaApiUrl: process.env.FAROFA_API_URL || 'http://localhost:4000',
  jwtSecretKey: 'default-secret-env',
  viaCepBaseUrl: process.env.VIA_CEP_BASE_URL || 'https://viacep.com.br/ws',
  jwtExpiresIn: '1d',
})
