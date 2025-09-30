// pages/_app.js (or app/layout.js for App Router)
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}