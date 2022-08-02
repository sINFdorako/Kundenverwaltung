module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1bc4c20ca70a1f7ec37eb448bf1a4a52'),
  },
});
