import type { ComponentType } from "react";
import ButtonDisabled from "./examples/button/disabled";
import ButtonIcons from "./examples/button/icons";
import ButtonLinkExample from "./examples/button/link";
import ButtonMagnetic from "./examples/button/magnetic";
import ButtonMetallic from "./examples/button/metallic";
import ButtonModes from "./examples/button/modes";
import ButtonRipple from "./examples/button/ripple";
import ButtonSizes from "./examples/button/sizes";
import ButtonStates from "./examples/button/states";
import ButtonVariants from "./examples/button/variants";
import CheckboxControlled from "./examples/checkbox/controlled";
import CheckboxDefault from "./examples/checkbox/default";
import CheckboxDescription from "./examples/checkbox/description";
import CheckboxIndeterminate from "./examples/checkbox/indeterminate";
import CheckboxModes from "./examples/checkbox/modes";
import CheckboxSizes from "./examples/checkbox/sizes";
import CheckboxStates from "./examples/checkbox/states";
import SelectControlled from "./examples/select/controlled";
import SelectDefault from "./examples/select/default";
import SelectGroups from "./examples/select/groups";
import SelectIcons from "./examples/select/icons";
import SelectNative from "./examples/select/native";
import SelectPlacement from "./examples/select/placement";
import SelectSizes from "./examples/select/sizes";
import SelectStates from "./examples/select/states";

/** Every live example, by the path of its file under `examples/` without the extension. */
export const examples = {
	"button/variants": ButtonVariants,
	"button/sizes": ButtonSizes,
	"button/icons": ButtonIcons,
	"button/states": ButtonStates,
	"button/disabled": ButtonDisabled,
	"button/ripple": ButtonRipple,
	"button/link": ButtonLinkExample,
	"button/magnetic": ButtonMagnetic,
	"button/metallic": ButtonMetallic,
	"button/modes": ButtonModes,
	"checkbox/default": CheckboxDefault,
	"checkbox/sizes": CheckboxSizes,
	"checkbox/description": CheckboxDescription,
	"checkbox/indeterminate": CheckboxIndeterminate,
	"checkbox/states": CheckboxStates,
	"checkbox/controlled": CheckboxControlled,
	"checkbox/modes": CheckboxModes,
	"select/default": SelectDefault,
	"select/sizes": SelectSizes,
	"select/icons": SelectIcons,
	"select/groups": SelectGroups,
	"select/states": SelectStates,
	"select/controlled": SelectControlled,
	"select/native": SelectNative,
	"select/placement": SelectPlacement,
} satisfies Record<string, ComponentType>;

export type ExampleName = keyof typeof examples;
