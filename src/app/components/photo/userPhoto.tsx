import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useToDoList } from "@/app/toDoListProvider";
import { User } from "@/app/types/userType";

export function UserPhoto() {
  const { getUser } = useToDoList();
  const [user, setUser] = useState<User>({
    name: "",
    theme: "dark",
    photo: "/",
    id: 0,
    localStorageId: "",
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

  return (
    <Link href="/menu" className="rounded-full">
      <Image src={user.photo} alt={""} width={200} height={200} />
    </Link>
  );
}
