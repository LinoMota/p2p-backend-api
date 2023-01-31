export const environment = () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  farofaApiUrl: process.env.FAROFA_API_URL || 'http://localhost:4000',
  jwtSecretKey: process.env.JSON_WEB_TOKEN_SECRET || 'secretKey',
  viaCepBaseUrl: process.env.VIA_CEP_BASE_URL || 'https://viacep.com.br/ws',
  jwtExpiresIn: '1d',
})
