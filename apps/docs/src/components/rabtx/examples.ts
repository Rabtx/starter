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
import CardDefault from "./examples/card/default";
import CardExpandable from "./examples/card/expandable";
import CardLink from "./examples/card/link";
import CardMedia from "./examples/card/media";
import CardModes from "./examples/card/modes";
import CardSelectable from "./examples/card/selectable";
import CardSizes from "./examples/card/sizes";
import CardSpotlight from "./examples/card/spotlight";
import CardStackExample from "./examples/card/stack";
import CardTilt from "./examples/card/tilt";
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
	"select/default": SelectDefault,
	"select/sizes": SelectSizes,
	"select/icons": SelectIcons,
	"select/groups": SelectGroups,
	"select/states": SelectStates,
	"select/controlled": SelectControlled,
	"select/native": SelectNative,
	"select/placement": SelectPlacement,
	"card/default": CardDefault,
	"card/sizes": CardSizes,
	"card/media": CardMedia,
	"card/link": CardLink,
	"card/selectable": CardSelectable,
	"card/tilt": CardTilt,
	"card/spotlight": CardSpotlight,
	"card/expandable": CardExpandable,
	"card/stack": CardStackExample,
	"card/modes": CardModes,
} satisfies Record<string, ComponentType>;

export type ExampleName = keyof typeof examples;
