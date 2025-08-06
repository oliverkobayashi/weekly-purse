# Configuration Files

This directory contains all configuration files for the Weekly Purse project:

## Files Structure

- **`eslint.config.js`** - ESLint configuration for code linting
- **`postcss.config.js`** - PostCSS configuration for CSS processing
- **`tailwind.config.ts`** - Tailwind CSS configuration
- **`components.json`** - shadcn/ui components configuration
- **`tsconfig.json`** - Main TypeScript configuration
- **`tsconfig.app.json`** - TypeScript configuration for the app
- **`tsconfig.node.json`** - TypeScript configuration for Node.js environment

## References

The following files in the root directory reference these configurations:

- `vite.config.ts` - References PostCSS config
- `package.json` - References ESLint config in lint script
- `components.json` - References Tailwind config

All paths have been updated to work correctly with this new structure.