import { lazy, Suspense } from "react";

type Widget = {
	uuid: string;
	name: string;
	type: string;
	fields: {
		[key: string]: any;
	};
};

const Component = (name: string) =>
	lazy(() =>
		import(`./ui/${name.replaceAll("_", "-")}.tsx`).catch(() => ({
			default: () => null,
		})),
	);

const Loader = () => {
	return (
		<div className="border-2 border-red-500 border-b-0 rounded-full animate-spin size-8"></div>
	);
};

const ComponentResolver = (widget: Widget) => {
	const ResolvedComponent = Component(widget.name);

	if (!ResolvedComponent) {
		return null;
	}

	return (
		<Suspense fallback={<Loader />}>
			<ResolvedComponent {...widget.fields} />
		</Suspense>
	);
};

export default ComponentResolver;
