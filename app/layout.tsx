import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans-custom' })
const serif = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-serif-custom', weight: ['400', '500', '600'] })

export const metadata: Metadata = { title: 'A little story about us', description: 'Two years of choosing each other, in all the beautiful ordinary ways.' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f5f1ea' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className="bg-background"><body className={`${sans.variable} ${serif.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
