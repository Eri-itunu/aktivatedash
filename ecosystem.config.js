module.exports = {
  apps: [
    {
      name: 'api',
      script: 'yarn',
      args : 'build',
      out_file: "out.log",
      error_file: "error.log",
      merge_logs: true,
      log_date_format: "DD-MM HH:mm:ss Z",
      log_type: "json",
    },
  ],
}