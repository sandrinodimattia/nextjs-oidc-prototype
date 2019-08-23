module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on Node.js module
    if (!isServer) {
      config.node = {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
      }
    }

    return config;
  }
}
