import { ColorInput } from "./color-input";

export function CustomTheme({
  isCustom,
  customColors,
  onChange,
  onBlur,
}: {
  isCustom: boolean;
  customColors?: {
    textColor: string;
    backgroundColor: string;
    navBarColor: string;
    fieldColor: string;
  };
  onChange: (value: string, field: string) => void;
  onBlur: () => void;
}) {
  return isCustom && customColors ? (
    <div className="flex flex-col gap-8">
      <ColorInput
        text="background:"
        name={"backgroundColor"}
        customColor={customColors.backgroundColor}
        onChange={onChange}
        onBlur={onBlur}
      />
      <ColorInput
        text="text:"
        name={"textColor"}
        customColor={customColors.textColor}
        onChange={onChange}
        onBlur={onBlur}
      />
      <ColorInput
        text="navigation bar:"
        name={"navBarColor"}
        customColor={customColors.navBarColor}
        onChange={onChange}
        onBlur={onBlur}
      />
      <ColorInput
        text="field:"
        name={"fieldColor"}
        customColor={customColors.fieldColor}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  ) : (
    ""
  );
}
