# AWS Console Portfolio

An AWS Console-inspired portfolio website with an interactive terminal interface. This project provides a unique way to showcase your skills, projects, and experience in a familiar AWS Console layout.

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

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

## License

This project is open-source and available under the MIT License.
