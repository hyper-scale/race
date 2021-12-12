import Link from 'next/link'
import { Fragment, Component } from 'react'
import Meta from '../components/Meta'
import { Popover, Transition } from '@headlessui/react'
import HyperscaleMark from '../components/HyperscaleMark'
import { MenuIcon, XIcon, MapIcon, LightningBoltIcon, UserGroupIcon } from '@heroicons/react/outline'
import Leaderboard from '../components/LeaderboardHome/Leaderboard';

const navigation = [
	{ name: 'Discord', href: 'https://discord.com/invite/pVSbzYny2c' },
	{ name: 'Twitter', href: 'https://twitter.com/HyperscaleFund' },
]

const airtableUrl = 'https://airtable.com/shrLFCXD7BQXUg97K'

class ApplyButtonNav extends Component {
	render() {
		return (
			<a
				href={airtableUrl}
				className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Connect Discord
			</a>
		)
	}
}

const features = [
	{
		name: 'Step 1',
		icon: LightningBoltIcon,
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
	},
	{
		name: 'Step 2',
		icon: UserGroupIcon,
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
	},
	{
		name: 'Step 3',
		icon: MapIcon,
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
	},
]

const Landing = () => (
	<div>
		<Meta />
		<div
			className="relative bg-white overflow-hidden"
			style={{
				background:
					"url('/bg-patterns.svg') left top no-repeat, linear-gradient(244.75deg, #D1D5FC -10.92%, #F3F3FA 30.96%, #FFFFFF 110.9%) center center",
			}}
		>
			<div className="pointer-events-none">
				<div
					className="absolute top-[-667px] left-[626px] w-[1185px] h-[1186px] opacity-20"
					style={{
						background: 'radial-gradient(50% 50% at 50% 50%, #4FFEFE 0%, rgba(93, 186, 239, 0) 100%)',
					}}
				/>
				<div
					className="absolute top-[-463px] left-[-682px] w-[931px] h-[931px] opacity-20"
					style={{
						background: 'radial-gradient(50% 50% at 50% 50%, #ED008E 0%, rgba(239, 93, 146, 0) 100%)',
					}}
				/>
				<div
					className="absolute top-[-779px] left-[-82px] w-[1287px] h-[1287px] opacity-30"
					style={{
						background: 'radial-gradient(50% 50% at 50% 50%, #5D5FEF 0%, rgba(93, 95, 239, 0) 100%)',
					}}
				/>
			</div>
			<div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
				<Popover>
					<nav
						className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
						aria-label="Global"
					>
						<div className="flex items-center flex-1">
							<div className="flex items-center justify-between w-full md:w-auto">
								<a className="flex items-center space-x-4" href="#">
									<HyperscaleMark className="h-12 w-auto sm:h-12" />
									<span className="text-indigo-500 text-4xl text-sans-og font-bold">Hyperscale</span>
								</a>
								<div className="-mr-2 flex items-center md:hidden">
									<Popover.Button className="bg-white bg-opacity-30 rounded-md p-2 inline-flex items-center justify-center text-gray-600 hover:text-gray-500 hover:bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span className="sr-only">Open main menu</span>
										<MenuIcon className="h-6 w-6" aria-hidden="true" />
									</Popover.Button>
								</div>
							</div>
							<div className="hidden md:block md:mr-10 md:space-x-10 md:ml-auto">
								{navigation.map(item => (
									<a
										key={item.name}
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-white hover:bg-opacity-30"
									>
										{item.name}
									</a>
								))}
							</div>
						</div>
						<div className="hidden md:block text-right">
							<ApplyButtonNav />
						</div>
					</nav>
					<Transition
						as={Fragment}
						enter="duration-150 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Popover.Panel
							focus
							className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
						>
							<div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
								<div className="px-5 pt-4 flex items-center justify-between">
									<div>
										<HyperscaleMark className="h-8 w-auto" />
									</div>
									<div className="-mr-2">
										<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
											<span className="sr-only">Close main menu</span>
											<XIcon className="h-6 w-6" aria-hidden="true" />
										</Popover.Button>
									</div>
								</div>
								<div className="px-2 pt-2 pb-3 space-y-1">
									{navigation.map(item => (
										<a
											key={item.name}
											href={item.href}
											className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
										>
											{item.name}
										</a>
									))}
								</div>
								<a
									href={airtableUrl}
									className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
								>
									Apply
								</a>
							</div>
						</Popover.Panel>
					</Transition>
				</Popover>
				<main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
					<div className="lg:grid lg:grid-cols-12 lg:gap-8">
						<div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
							<h1>
								<span className="mt-1 block text-gray-900 text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl redrose">
                  DAO Race
								</span>
							</h1>
							<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl ">
								<span>DAO race explainedDAO race explainedDAO race explainedDAO race explainedDAO race </span>{' '}
								<span>explainedDAO race explainedDAO race explained</span>
							</p>
							<div className="mt-8 sm:max-w-lg sm:mx-auto text-center lg:text-left lg:mx-0">
								<a
									href={airtableUrl}
									className="inline-flex items-center px-8 py-2 mr-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 redrose"
								>
									Connect Discord
								</a>
                <a
									href={airtableUrl}
									className="inline-flex items-center px-8 py-2 ml-2 my-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-neutral-800 hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 redrose"
								>
									Leader Board
								</a>
							</div>
              
						</div>
					</div>
				</main>
			</div>
		</div>
		<div className="flex justify-center">
        <div className="w-screen max-w-7xl">
          <Leaderboard />
        </div>
		
      </div>

	  <div className="flex justify-center">
		<a 
		  		href={airtableUrl} 
		  		className="inline-flex items-center px-8 py-2 ml-2 my-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-neutral-800 hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 redrose">
				Leader Board
			</a>
			</div>

			<br/>
			<br/>

			<Meta />
		<div
			className="relative bg-white overflow-hidden"
			style={{
				background:
					"url('/bg-patterns.svg') left top no-repeat, linear-gradient(244.75deg, #D1D5FC -10.92%, #F3F3FA 30.96%, #FFFFFF 110.9%) center center",
			}}
		>
			<div className="pointer-events-none">
				<div
					className="absolute top-[-667px] left-[626px] w-[1185px] h-[1186px] opacity-20"
					style={{
						background: 'radial-gradient(50% 50% at 50% 50%, #4FFEFE 0%, rgba(93, 186, 239, 0) 100%)',
					}}
				/>
				<div
					className="absolute top-[-463px] left-[-682px] w-[931px] h-[931px] opacity-20"
					style={{
						background: 'radial-gradient(50% 50% at 50% 50%, #ED008E 0%, rgba(239, 93, 146, 0) 100%)',
					}}
				/>
				<div
					className="absolute top-[-779px] left-[-82px] w-[1287px] h-[1287px] opacity-30"
					style={{
						background: 'radial-gradient(50% 50% at 50% 50%, #5D5FEF 0%, rgba(93, 95, 239, 0) 100%)',
					}}
				/>
			</div>
			<div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
				
				<main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32 " style={{textAlign:'center'}}>
							<h1>
								<span className="mt-1 block text-gray-900 text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl redrose" >
								Join the Race!
								</span>
							</h1>
							<p className="mt-3 text-base text-neutral-900 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl ">
								<span>HyperscaleDAO has a strong community of contributors & advisors.</span>
								<br/>
								<span>The winning DAO gets funding and joins the HyperscaleDAO.</span>
							</p>

<br/>								<span className="text-gray-500">Recieve $200k for 5% by filling out a simple application. <br/> You’ll recieve a decision within 1 week. <a href="#" style={{textDecoration:'underline'}}>Learn More</a></span>
<br/>
<br/>
	
								<div className="">
									<a
										href={airtableUrl}
										className="inline-flex items-center px-8 py-2 mr-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 redrose">
										Apply
									</a>
                					
								</div>
				</main>
			</div>
		</div>
		
		<footer className="flex items-center justify-between bg-indigo-50 py-8 px-4 md:px-40" >
			<div className="flex items-center space-x-6 md:space-x-10">
				
				{navigation.map(item => (
					<a
						key={item.name}
						className="font-medium"
						href={item.href}
						target="_blank"
						rel="noopener noreferrer"
					>
						{item.name} 
					</a> 

				))}

			</div>

      <Link href="/">
					<a
						className="font-bold text-lg text-transparent"
						style={{
							background: 'linear-gradient(87.28deg, #9048CD 4.68%, #7461E4 49.76%, #59A9F4 106.52%)',
							backgroundClip: 'text',
							WebkitBackgroundClip: 'text',
						}}
					>
						Hyperscale
					</a>
				</Link>

			<div>
			</div>
		</footer>
	</div>
)

export default Landing