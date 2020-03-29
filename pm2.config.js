module.exports = {
  apps: [
    {
      name: "api",
      cwd: "./task-manager-backend",
      script: "npm",
      args: "run dev",
      error_file: "../.logs/api.error.log",
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        watch: false,
        args: "start",
        NODE_ENV: "production",
        out_file: "../.logs/api.out.log"
      }
    },
    {
      name: "ui",
      cwd: "./task-manager-frontend",
      script: "npm",
      args: "run dev",
      error_file: "../.logs/ui.error.log",
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        watch: false,
        args: "start",
        NODE_ENV: "production",
        out_file: "../.logs/ui.out.log"
      }
    }
  ]
};
