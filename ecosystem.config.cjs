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
            node_args: '--no-deprecation',
            instances: "3",
            exec_mode: "cluster",
        }
    ]
};
