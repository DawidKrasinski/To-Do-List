"use client";

import { Header } from "../components/header/header-component";
import { useEffect, useRef, useState } from "react";
import { useToDoList } from "../toDoListProvider";
import { User } from "../types/userType";
import { UserPhoto } from "../components/photo/userPhoto";
import { useRouter } from "next/navigation";
import { Theme } from "../components/theme/theme";
import { CustomTheme } from "../components/theme/custom-theme";
import { flushSync } from "react-dom";

export default function Menu() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { editUser, getUser, editCustomTheme } = useToDoList();
  const [user, setUser] = useState<User>({
    name: "",
    theme: "dark",
    photo: "",
    id: 0,
    localStorageId: "",
    textColor: "#ffffff",
    fieldColor: "#ffffff",
    navBarColor: "#ffffff",
    backgroundColor: "#ffffff",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const localStorageId = localStorage.getItem("userId");
      if (!localStorageId) return;
      const user = await getUser(localStorageId);
      setUser(user);
    };
    fetchUser();
  }, []);

  function handleThemeChange(theme: "light" | "dark" | "custom") {
    setUser((user) => ({ ...user, theme }));
  }

  function handleNameChange(name: string) {
    setUser((user) => ({ ...user, name }));
  }

  function handlePhotoChange(photo: string) {
    setUser((user) => ({ ...user, photo }));
  }

  function handleImageClick() {
    inputRef.current?.click();
  }

  function handleCustomColorChange(value: string, field: string) {
    setUser((user) => ({ ...user, [field]: value }));
  }

  function handleBlur() {
    console.log("Handle blur", user);
    flushSync(() => {
      editCustomTheme(user);
    });
  }

  return (
    <div className="flex flex-col gap-16 pt-16 px-4">
      <div className="flex flex-col gap-8">
        <Header header="Settings" />
        <div onClick={handleImageClick} className="flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <UserPhoto />
          </div>

          <input
            onChange={(e) => handlePhotoChange(e.target.value)}
            type="file"
            ref={inputRef}
            className="hidden"
          />
        </div>

        <input
          onChange={(e) => handleNameChange(e.target.value)}
          value={user.name}
          type="text"
          placeholder="Name"
          className="bg-muted p-3 rounded-lg"
        ></input>
      </div>
      <div className="flex gap-8">
        <Theme
          name="light"
          isActive={user.theme === "light"}
          onChange={handleThemeChange}
        />
        <Theme
          name="dark"
          isActive={user.theme === "dark"}
          onChange={handleThemeChange}
        />
        <Theme
          name="custom"
          isActive={user.theme === "custom"}
          onChange={handleThemeChange}
        />
      </div>
      <CustomTheme
        isCustom={user.theme === "custom"}
        customColors={{
          textColor: user.textColor,
          backgroundColor: user.backgroundColor,
          fieldColor: user.fieldColor,
          navBarColor: user.navBarColor,
        }}
        onChange={handleCustomColorChange}
        onBlur={handleBlur}
      />
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <button
          onClick={() => {
            editUser(user);
            router.push("/");
          }}
          className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-3 w-full"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
