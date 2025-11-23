# AWS Console Portfolio

An AWS Console-inspired portfolio website with an interactive terminal interface. This project provides a unique way to showcase your skills, projects, and experience in a familiar AWS Console layout.

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-000000?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.16-06B6D4?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.24-0055FF?logo=framer)
![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?logo=node.js)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Features

- **AWS Console-inspired UI**: Complete with sidebar navigation, top nav, and responsive design
- **Interactive Terminal**: CloudShell-like terminal with commands to navigate and explore the portfolio
- **Multi-language Support**: Includes English, Hindi, and Spanish translations
- **Theme Switching**: Light, Dark, and System modes
- **Drag-and-drop Widgets**: Customizable layout with persistent preferences
- **Mobile Responsive**: Optimized for all device sizes

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Terminal Commands

The portfolio includes an interactive terminal with the following commands:

- `help` - Display available commands
- `clear` - Clear the terminal
- `goto [section]` - Navigate to a portfolio section
- `list sections` - List all available portfolio sections
- `list [section]` - Show section data in JSON format
- `region [name]` - Change the current region/language
- `contact` - Show contact information
- `about` - Show information about this portfolio
- `version` - Show terminal version
- `exit` - Close the terminal

## Customization

To customize this portfolio for your own use:

1. Update the data in `app/data/portfolio.ts` with your personal information
2. Modify the theme colors in `tailwind.config.js` if desired
3. Add your own projects, skills, and experiences
4. Customize the terminal commands in `app/components/Terminal.tsx`

## Contributing

Interested in contributing to this project? Check out the [CONTRIBUTING.md](CONTRIBUTING.md) guide for guidelines on how to get started, coding standards, and the pull request process.

## License

This project is open-source and available under the MIT License.
