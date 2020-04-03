const app_base = name => ({
  name: name,
  script: "npm",
  args: "run dev",
  error_file: `../.logs/${name}.error.log`,
  out_file: `../.logs/${name}.out.log`,
  ignore_watch: ["node_modules"],
  env: {
    NODE_ENV: "development"
  },
  env_production: {
    watch: false,
    args: "start",
    NODE_ENV: "production"
  }
});

module.exports = {
  apps: [
    {
      ...app_base("api"),
      cwd: "./task-manager-backend"
    },
    {
      ...app_base("ui"),
      cwd: "./task-manager-frontend"
    }
  ]
};
