module.exports = {
     apps : [
         {
          name: 'dev-app.useaktivate.com',
          script: "node_modules/nuxt/bin/nuxt",
          args: "dev",
          port:'8080',
          out_file: "out.log",
          error_file: "error.log",
          merge_logs: true,
          log_date_format: "DD-MM HH:mm:ss Z",
          log_type: "json",
          env: {

            NODE_ENV: "development"

        },

        watch: true  // Optionally enable file watching for automatic reloads

      }
     ]
 };
