module.exports = {
    apps: [
        {
            name: "getFirekirin",

            // Use Next binary directly
            script: "node_modules/next/dist/bin/next",
            args: "start -p 3000",

            cwd: "/home/1522942.cloudwaysapps.com/segekvheuz",

            // Process Management
            instances: 1, // increase only if server has enough RAM
            exec_mode: "cluster",

            autorestart: true,
            watch: false,

            max_memory_restart: "1G",
            max_restarts: 10,
            min_uptime: "10s",

            // Environment
            env: {
                NODE_ENV: "production",
                PORT: 3000
            },

            // Logging
            error_file: "/home/1522942.cloudwaysapps.com/segekvheuz/logs/pm2-error.log",
            out_file: "/home/1522942.cloudwaysapps.com/segekvheuz/logs/pm2-out.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",
            merge_logs: true
        }
    ]
};
