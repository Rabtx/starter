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
import InputAddons from "./examples/input/addons";
import InputAlignment from "./examples/input/alignment";
import InputDefault from "./examples/input/default";
import InputFloating from "./examples/input/floating";
import InputIcons from "./examples/input/icons";
import InputOtp from "./examples/input/otp";
import InputPassword from "./examples/input/password";
import InputSearch from "./examples/input/search";
import InputSizes from "./examples/input/sizes";
import InputStates from "./examples/input/states";
import InputVariants from "./examples/input/variants";
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
	"input/default": InputDefault,
	"input/sizes": InputSizes,
	"input/alignment": InputAlignment,
	"input/variants": InputVariants,
	"input/icons": InputIcons,
	"input/addons": InputAddons,
	"input/search": InputSearch,
	"input/password": InputPassword,
	"input/floating": InputFloating,
	"input/states": InputStates,
	"input/otp": InputOtp,
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
