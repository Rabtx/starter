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
import SwitchControlled from "./examples/switch/controlled";
import SwitchDefault from "./examples/switch/default";
import SwitchField from "./examples/switch/field";
import SwitchModes from "./examples/switch/modes";
import SwitchRows from "./examples/switch/rows";
import SwitchRtl from "./examples/switch/rtl";
import SwitchSizes from "./examples/switch/sizes";
import SwitchStates from "./examples/switch/states";

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
	"switch/default": SwitchDefault,
	"switch/sizes": SwitchSizes,
	"switch/states": SwitchStates,
	"switch/field": SwitchField,
	"switch/controlled": SwitchControlled,
	"switch/rows": SwitchRows,
	"switch/rtl": SwitchRtl,
	"switch/modes": SwitchModes,
} satisfies Record<string, ComponentType>;

export type ExampleName = keyof typeof examples;
