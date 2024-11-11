module.exports = {
    apps : [
        {
            name: 'app.useaktivate.com',
            script:'.output/server/index.mjs',
            out_file: "out.log",
            error_file: "error.log",
            merge_logs: true,
            log_date_format: "DD-MM HH:mm:ss Z",
            log_type: "json",
        },
        {
            name: 'demo-app.useaktivate.com',
            script:'.output/server/index.mjs',
            out_file: "out.log",
            error_file: "error.log",
            merge_logs: true,
            port:'49200',
            exec_mode:'cluster',
            instances : '1',
            log_date_format: "DD-MM HH:mm:ss Z",
            log_type: "json",
        },
        {
            name: 'dev-app.useaktivate.com',
            script:'.output/server/index.mjs',
            out_file: "out.log",
            error_file: "error.log",
            merge_logs: true,
            port:'49300',
            exec_mode:'cluster',
            instances : '1',
            log_date_format: "DD-MM HH:mm:ss Z",
            log_type: "json",
        }
    ]
};