module.exports = {
  apps: [
    {
      name: "MOYU_Admin_1_15",
      env: {
        // PROJECT_ENV: "HK_DEV",
        PROJECT_ENV: "LOCAL",
        PORT: "5058",
      },
      exec_mode: "cluster",
      instances: "2",
      script: ".output/server/index.mjs",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      args: "",
      watch: true,
      ignore_watch: ["node_modules", "public", "logs"],
      autostart: true,
      max_memory_restart: "1G",
      merge_logs: true,
      restart_delay: 60,
    },
  ],
};
