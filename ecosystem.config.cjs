module.exports = {
  apps: [
    {
      name: "MonoShare",
      script: "built/server.js",
      cwd: "/home/deploy/MonoShare/backend",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "350M",
      error_file: "/home/deploy/logs/error.log",
      out_file: "/home/deploy/logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
