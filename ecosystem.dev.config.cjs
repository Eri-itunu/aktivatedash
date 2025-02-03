module.exports = {
     apps : [
         {
             name: 'dev-app.useaktivate.com',
             script: 'yarn',
             args: 'dev',
             port:'8080',
             out_file: "out.log",
             error_file: "error.log",
             merge_logs: true,
             log_date_format: "DD-MM HH:mm:ss Z",
             log_type: "json",
         }
     ]
 };
