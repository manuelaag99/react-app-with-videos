import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './utils/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'CAI Bakery',
	description: 'La repostería para ti.',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="./public/images/favicon.ico" type="" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
				<link href="https://fonts.googleapis.com/css2?family=Amatic+SC&family=Rubik&display=swap" rel="stylesheet" />
			</head>
			<body className={inter.className}>
				<AuthProvider>
					{children}
				</AuthProvider>
			</body>
		</html>
	)
}
