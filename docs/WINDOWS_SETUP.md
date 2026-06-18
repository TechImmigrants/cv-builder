# Windows Setup Guide

This guide fills in the Windows-specific details that are easy to miss when
you follow the standard setup steps in [../CONTRIBUTING.md](../CONTRIBUTING.md).

## 1. Install Node.js

This project supports Node.js 20 and newer. The commands below install Node.js
20 to match the minimum supported version:

- `nvm-windows`: install it from the [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases), then run `nvm install 20` and `nvm use 20`
- Direct download: install the latest archived Node.js 20 build from [nodejs.org](https://nodejs.org/dist/latest-v20.x/)

Confirm the version after installation:

```powershell
node --version
```

## 2. Install pnpm

We use `pnpm` for workspace installs and Turbo tasks.

Recommended:

```powershell
corepack enable
pnpm --version
```

Fallback if `corepack` is unavailable:

```powershell
npm install -g pnpm
pnpm --version
```

## 3. Configure Git line endings

Set Git to normalize line endings for Windows checkouts:

```powershell
git config --global core.autocrlf true
```

That prevents accidental line-ending noise in generated diffs.

## 4. Choose your shell

Both PowerShell and Git Bash work. Pick one and stay consistent for a session.

### PowerShell

Use this when you want the most native Windows experience:

```powershell
git clone https://github.com/YOUR-USERNAME/cv-builder.git
cd cv-builder
pnpm install
pnpm build
pnpm test
```

### Git Bash

Use this if you prefer Unix-style shell behavior and command syntax:

```bash
git clone https://github.com/YOUR-USERNAME/cv-builder.git
cd cv-builder
pnpm install
pnpm build
pnpm test
```

## 5. Common gotchas

### Path length limits

If you see checkout or install failures about long paths, enable Windows long
path support in Git:

```powershell
git config --global core.longpaths true
```

### PowerShell execution policy

If PowerShell blocks locally installed scripts, open a new PowerShell window as
your user and run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

If your machine is company-managed and this policy is locked down, use Git Bash
instead of changing the policy.

### Reopen the shell after installs

After installing Node.js, pnpm, or Git, close and reopen your terminal before
retrying `pnpm install` so the updated PATH is available.

## 6. Contributor workflow reminder

Once the environment is ready, return to the standard project workflow in
[../CONTRIBUTING.md](../CONTRIBUTING.md):

```powershell
pnpm install
pnpm build
pnpm test
pnpm format:check
```
