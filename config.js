module.exports = {
  port: 3000,
  jwtSecret: '!!CryptoCat@!!',
  jwtExpirationInSeconds: 60 * 60, // 1 hour
  roles: {
    USER: 'user',
    ADMIN: 'admin'
  },
  productPriceUnits: {
    DOLLAR: 'dollar',
    EURO: 'euro',
    INR: 'inr'
  },
  productSize: {
    XS: 'xs',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    XL: 'xl',
    XXL: 'xxl'
  }
}
