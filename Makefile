.PHONY: help install dev build test lint lint-fix format format-check clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	pnpm install

dev: ## Start the dev server
	pnpm dev

build: ## Build all packages
	pnpm build

test: ## Run tests
	pnpm test

lint: ## Check for lint issues
	pnpm lint

lint-fix: ## Fix lint issues
	pnpm lint:fix

format: ## Format the codebase
	pnpm format

format-check: ## Check formatting
	pnpm format:check

clean: ## Remove build artifacts and caches
	rm -rf .turbo node_modules apps/*/.next apps/*/.turbo packages/*/.turbo packages/*/dist
