"use client";

import Link from "next/link";
import { useLocation } from "react-router-dom";

interface NavBarProps {
  activeIcon: "Home" | "Calendar" | "Priorities" | "Groups";
}

function Icon({ href, icon }: { href: string; icon: string }) {
  return (
    <div className="flex-1 flex justify-center items-center">
      <Link href={href}>
        <i
          className={`fa-solid ${icon} text-2xl text-purple-400 text-unactiveIcon`} //!!!!!!
        ></i>
      </Link>
    </div>
  );
}

export function NavBar({ activeIcon }: NavBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-navBar rounded-t-2xl py-1 px-4">
      <div className="flex gap-8">
        <Icon href="/calendar" icon="fa-calendar-days" />
        <Icon href="/" icon="fa-house" />

        <div className="flex-1 flex justify-center items-center">
          <Link
            href="/addTask"
            className="w-12 h-12 rounded-full bg-purple-400 cursor-pointer flex justify-center items-center -translate-y-6"
          >
            <i className="fa-solid fa-plus text-black text-2xl"></i>
          </Link>
        </div>

        <Icon href="/priorities" icon="fa-clipboard-list" />
        <Icon href="/group" icon="fa-user-group" />
      </div>
    </nav>
  );
}
