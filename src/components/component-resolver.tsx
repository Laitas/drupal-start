const widgetModules = import.meta.glob("./ui/*.tsx", {eager: true});

const preloadedComponents: Record<string, React.FC<any>> = {};

for (const path in widgetModules) {
	const componentName = path.replace("./ui/", "").replace(".tsx", "");
	preloadedComponents[componentName] = (widgetModules[path] as any).default;
}

type Widget = {
	uuid: string;
	name:string;
	type: string;
	fields: {
		[key: string]: any;
	};
};

export function ComponentResolver(widget:Widget) {
	const componentName = widget.name.replaceAll("_", "-");
	const Component = preloadedComponents[componentName];
	if (Component) {
		return <Component {...widget.fields} />;
	}
	return null;
}

export default ComponentResolver;