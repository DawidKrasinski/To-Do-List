export function Theme({
  isActive,
  name,
  onChange,
}: {
  isActive: boolean;
  name: "dark" | "light" | "custom";
  onChange: (theme: "light" | "dark" | "custom") => void;
}) {
  return (
    <div
      onClick={() => onChange(name)}
      className={`${
        { light: "light", custom: "custom", dark: "dark" }[name]
      } flex justify-center items-center flex-1 flex-col gap-4`}
    >
      <div
        className={`${
          isActive ? "border-purple-400" : "border-gray-500"
        } border-2 rounded-xl`}
      >
        <div className="w-16 h-16 border-4 border-transparent rounded-xl flex overflow-hidden">
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 bg-background"></div>
            <div className="flex flex-1 bg-navBar"></div>
          </div>
          <div className="flex flex-1 bg-muted"></div>
        </div>
      </div>
      <div className={`${isActive ? "text-purple-400" : ""}`}>{name}</div>
    </div>
  );
}
