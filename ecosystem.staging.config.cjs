module.exports = {
     apps : [
         {
             name: 'staging-app.useaktivate.com',
             script:'.output/server/index.mjs',
             port:'8082',
             out_file: "out.log",
             error_file: "error.log",
             merge_logs: true,

             log_date_format: "DD-MM HH:mm:ss Z",
             log_type: "json",
             node_args: '--no-deprecation',
         }
     ]
 };
