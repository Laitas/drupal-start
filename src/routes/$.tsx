import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react';
import ComponentResolver from '~/components/component-resolver';

export const Route = createFileRoute('/$')({
  component: RouteComponent,
  loader: async (a) => {
    console.log('Loader for /$ route', a.location.pathname);
    if(a.cause === 'stay') return;

		const data = await fetch(`https://simple-go-server-laitas7136-btvvcgis.leapcell.dev${a.location.pathname}`);
        const res = await data.json();
		return res;
	},
})

function RouteComponent() {
   const data = Route.useLoaderData();
	console.log("data", data);
  return <div>
			<section>Hello {data.url_alias["en-ee"]}</section>
			
			<section>
				<Suspense fallback={<div>Loading...</div>}>
					{data.containers[0].widgets.map((widget: any, index: number) => (
						<ComponentResolver key={index} {...widget} />
					))}
				</Suspense>
			</section>
			
		</div>
}
