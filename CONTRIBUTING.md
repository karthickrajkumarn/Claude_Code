# Contributing to Claude Code Projects

Thank you for your interest in contributing to this repository! This document provides guidelines for contributing to the projects here.

## 🤝 How to Contribute

### Reporting Issues

If you find a bug or have a feature request:

1. **Check existing issues** first
2. **Create a new issue** with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Screenshots if applicable

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/Claude_Code.git
   cd Claude_Code
   ```

2. **Choose a project**
   ```bash
   # For GitHub MCP Server
   cd github-mcp
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Run tests**
   ```bash
   npm test
   # or
   node demo-operations.mjs
   ```

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Follow the project's coding conventions
   - Add tests for new features
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm test
   npm run lint  # if available
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve bug description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Provide a clear description of your changes

## 📝 Coding Standards

### General Guidelines

- **Follow existing code style**
- **Write clear, self-documenting code**
- **Add comments for complex logic**
- **Keep functions small and focused**
- **Use meaningful variable and function names**

### TypeScript Specific

- **Use strict mode**
- **Provide type annotations**
- **Avoid `any` types**
- **Use interfaces for data shapes**
- **Enable all compiler checks**

### Documentation

- **Update README.md** for user-facing changes
- **Update CLAUDE.md** for development changes
- **Add JSDoc comments** for public APIs
- **Keep examples up to date**

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test
npm test -- --grep "test name"
```

### Writing Tests

- **Test public APIs**
- **Cover edge cases**
- **Test error handling**
- **Use descriptive test names**

## 📋 Commit Message Format

Follow conventional commits:

```
type(scope): subject

body

footer
```

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples**:
```bash
feat(github-mcp): add webhook support
fix(github-mcp): resolve retry logic issue
docs(github-mcp): update installation instructions
```

## 🎯 Project-Specific Guidelines

### GitHub MCP Server

- **Tools must be added to `src/tools/github.ts`**
- **Service methods in `src/services/github/index.ts`**
- **Types in `src/types/github.ts`**
- **Update tool count in documentation**
- **Test with real GitHub API** (use test token)

## 📧 Getting Help

- **Open an issue** for bugs or questions
- **Check existing documentation** first
- **Be patient** - this is a personal project

## 🌟 Recognition

Contributors will be acknowledged in the project documentation.

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT for most projects).

## 🙏 Thank You

Every contribution helps make these projects better! Whether it's a bug fix, new feature, documentation improvement, or just reporting an issue - it's all appreciated.

---

**Questions?** Feel free to open an issue or start a discussion!
