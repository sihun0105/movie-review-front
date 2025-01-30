/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	container: {
  		width: '100%',
  		center: true,
  		padding: 'var(--page-padding-x)',
  		screens: {}
  	},
  	extend: {
  		height: {
  			page: 'var(--page-h)'
  		},
  		minHeight: {
  			page: 'var(--page-h)'
  		},
  		fontFamily: {
  			sans: [
  				'var(--app-font)',
  				'sans-serif'
  			]
  		},
  		colors: {
  			'app-purple': {
  				'001': 'var(--purple-001)',
  				'002': 'var(--purple-002)'
  			},
  			'app-gray': {
  				'001': 'var(--gray-001)',
  				'002': 'var(--gray-002)',
  				'003': 'var(--gray-003)',
  				'004': 'var(--gray-004)',
  				'005': 'var(--gray-005)',
  				'006': 'var(--gray-006)',
  				'007': 'var(--gray-007)',
  				'010': 'var(--gray-010)'
  			},
  			'app-yellow': {
  				'001': 'var(--yellow-001)',
  				'002': 'var(--yellow-002)',
  				'003': 'var(--yellow-003)'
  			},
  			'app-pink': {
  				'001': 'var(--pink-001)',
  				'002': 'var(--pink-002)',
  				'003': 'var(--pink-003)'
  			},
  			'app-red': {
  				'001': 'var(--red-001)'
  			},
  			'app-blue': {
  				'001': 'var(--blue-001)'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
