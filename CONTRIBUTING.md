# Contributing to AWS Console Portfolio

Thank you for considering contributing to the AWS Console Portfolio project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Adding New Features](#adding-new-features)
- [Reporting Bugs](#reporting-bugs)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please be kind and courteous to others, and avoid any form of harassment or discrimination.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment
4. Create a new branch for your changes
5. Make your changes
6. Submit a pull request

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your portfolio data file:
   ```bash
   cp app/data/portfolio.ts.example app/data/portfolio.ts
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to see the application

## Making Changes

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to the codebase
3. Test your changes thoroughly
4. Update documentation as needed
5. Add an entry to the changelog if appropriate

## Pull Request Process

1. Update the README.md or documentation with details of changes if appropriate
2. Update the CHANGELOG.md with details of changes if appropriate
3. The PR should work on the latest main branch
4. Ensure all tests pass and the code follows the project's coding standards
5. Your PR will be reviewed by maintainers, who may request changes

## Coding Standards

- Follow the existing code style and formatting
- Use TypeScript for type safety
- Write clear, descriptive commit messages
- Comment your code when necessary
- Use meaningful variable and function names
- Follow React best practices

## Adding New Features

When adding new features:

1. Discuss major changes in an issue before implementing
2. Ensure the feature is well-tested
3. Update documentation to reflect the new feature
4. Add appropriate entries to the changelog
5. Consider mobile responsiveness and accessibility

### Terminal Commands

When adding new terminal commands:

1. Follow the existing pattern in `app/components/Terminal.tsx`
2. Add comprehensive help text
3. Handle errors gracefully
4. Update the README.md to document the new command

## Reporting Bugs

When reporting bugs:

1. Use the GitHub issue tracker
2. Describe the bug in detail
3. Include steps to reproduce the bug
4. Include information about your environment (browser, OS, etc.)
5. If possible, suggest a fix or workaround

---

Thank you for contributing to AWS Console Portfolio!