# simple-typescript-template

To be used as a template project to bootstrap other projects

This template project itself was bootstrapped from the command `npx @temporalio/create@latest --sample empty`

## Run Worker
```bash
npm install
npm run start.watch
```

## Start Workflow
```bash
temporal workflow start --type simple --task-queue simple-task-queue --input '{"val":"foo"}'
```

## Other Commands
1. `npm run format` to format your code according to the rules in `.prettierrc`.
1. `npm run lint` to lint your code according to the rules in `eslintrc.js`.
