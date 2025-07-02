# NestJS Project Guidelines

## Commands
- Build: `npm run build`
- Lint: `npm run lint` (ESLint with auto-fix)
- Format: `npm run format` (Prettier)
- Test all: `npm test`
- Test single file: `npm test -- songs.service.spec.ts`
- Test watch: `npm run test:watch`
- Test coverage: `npm run test:cov`
- E2E tests: `npm run test:e2e`
- Start dev: `npm run start:dev`

## Architecture
- NestJS REST API with modular structure
- Main entry: `src/main.ts` with ValidationPipe enabled
- Module-based architecture: `src/app.module.ts` imports feature modules
- Features organized in folders: `src/songs/` (controller, service, module, DTOs)
- Common utilities: `src/common/middleware/`
- Unit tests: `*.spec.ts` alongside source files
- E2E tests: `test/` directory

## Code Style
- Use class-validator decorators for DTOs (`@IsNotEmpty`, `@IsString`, etc.)
- readonly properties in DTOs
- Constructor injection for services in controllers
- PascalCase for classes, camelCase for methods/properties
- Single quotes, trailing commas (Prettier config)
- TypeScript with decorators enabled
- Import order: NestJS imports first, then local imports
