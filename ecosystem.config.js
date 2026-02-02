module.exports = {
    apps: [{
        name: 'getFirekirin',
        script: 'node_modules/next/dist/bin/next',
        args: 'start',
        cwd: '/home/1522942.cloudwaysapps.com/abcdxyz123',
        instances: 1,
        exec_mode: 'cluster',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env_production: {
            NODE_ENV: 'production',
            PORT: 3000
        },
        error_file: '/home/1522942.cloudwaysapps.com/abcdxyz123/logs/pm2-error.log',
        out_file: '/home/1522942.cloudwaysapps.com/abcdxyz123/logs/pm2-out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        merge_logs: true,
        max_restarts: 10,
        min_uptime: '10s'
    }]
}