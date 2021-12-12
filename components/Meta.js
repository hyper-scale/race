import Head from 'next/head'
const Meta = ({ title, desc }) => {
	title = title ?? 'Hyperscale - Fast Funding'
	desc = desc ?? "Receive up to 1 mill by filling out a simple application. You'll receive a decision within 1 week."
	return (
		<Head>
			<title>{title}</title>
			<meta name="title" content={title} />
			<meta name="description" content={desc} />
			<link rel="icon" href="logo.svg" />
			<script defer data-domain="hyperscalefund.com" src="https://plausible.io/js/plausible.js"></script>
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://hyperscalefund.com" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={desc} />
			<meta property="og:image" content="https://hyperscalefund.com/opengraph.png" />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://hyperscalefund.com/" />
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={desc} />
			<meta property="twitter:image" content="https://hyperscalefund.com/opengraph.png" />
		</Head>
	)
}

export default Meta