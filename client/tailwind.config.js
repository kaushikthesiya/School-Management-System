/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
            },
            colors: {
                snow: {
                    50: '#F7F9FB',
                    100: '#EEF2F6',
                    200: '#E6E9EF',
                    DEFAULT: '#FFFFFF',
                },
                brand: {
                    50: '#E8EFFF',
                    100: '#D1DFFF',
                    200: '#A3BFFF',
                    500: '#1C1C1C', // Snow UI often uses deep neutrals for primary actions
                    dark: '#000000',
                },
                primary: '#1C1C1C',
                secondary: '#94A3B8',
            },
            boxShadow: {
                'snow': '0px 1px 2px rgba(0, 0, 0, 0.05)',
                'snow-lg': '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            borderRadius: {
                'snow': '12px',
                'snow-lg': '16px',
            }
        },
    },
    plugins: [],
}
