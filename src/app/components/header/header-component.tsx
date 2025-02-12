import Link from "next/link";

interface HeaderProps {
  header: string;
}

export function Header({ header }: HeaderProps) {
  return (
    <div className="flex pr-8">
      <Link
        href="/"
        className="w-8 h-8 border-2 border-muted-foreground text-muted-foreground rounded-full flex justify-center items-center"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <span className="text-2xl flex flex-1 justify-center">{header}</span>
    </div>
  );
}
