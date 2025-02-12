"use client";
import { Priority } from "@/app/types/priorityType";
import { useEffect, useState } from "react";
import { UserPhoto } from "../../components/photo/userPhoto";
import { useToDoList } from "@/app/toDoListProvider";
import { PrioritySection } from "../components/prioritySection/priority";
import { User } from "@/app/types/userType";
import { DragEndEvent } from "@dnd-kit/core";

export default function addPriority() {
  const { getUser } = useToDoList();
  const [user, setUser] = useState<User>({
    name: "",
    theme: "dark",
    photo: "/",
    id: 0,
    localStorageId: "",
    textColor: "",
    backgroundColor: "",
    navBarColor: "",
    fieldColor: "",
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
  const [activePriority, setActivePriority] = useState<Priority>({
    id: 0,
    color: "#ffffff",
    name: "",
    order: 0,
  });
  const { priorityList, taskList, addPriority, editPriority, deletePriority } =
    useToDoList();
  const isEditing = priorityList.find(
    (priority) => priority.id === activePriority.id
  );

  // function handleDragEnd(event: DragEndEvent) {
  //   //!!!!!!!!!!!!!
  //   console.log("event: ", event);
  // }

  function handleActivePriorityChange(priorityId: number) {
    if (activePriority.id === priorityId) {
      setActivePriority({ id: 0, color: "#ffffff", name: "", order: 0 });
    } else {
      const priority = priorityList.find(
        (priority) => priority.id === priorityId
      );
      if (priority) setActivePriority({ ...priority });
    }
  }

  function handlePriorityNameChange(priorityName: string) {
    setActivePriority((priority) => ({ ...priority, name: priorityName }));
  }

  function handlePriorityColorChange(priorityColor: string) {
    setActivePriority((priority) => ({ ...priority, color: priorityColor }));
  }

  function handleAddPriorityButtonClicked(priority: Priority) {
    if (priority.color && priority.name?.trim()) {
      console.log(priority);
      addPriority(priority);
    } else {
      console.log("Priority is invalid");
    }
  }

  function handleEditPriorityButtonClicked(priority: Priority) {
    if (priority.color && priority.name?.trim()) {
      console.log(priority);

      editPriority(priority);
    } else {
      console.log("Priority is invalid");
    }
  }

  function handleDeletePriorityButtonClicked(id: number) {
    if (!taskList.some((task) => task.priority.id === id)) deletePriority(id);
  }

  function handleDrop(newPriorityIndex: number, oldPriorityIndex: number) {
    //!!!!!!!!!!!!
    console.log(newPriorityIndex, oldPriorityIndex);
  }

  return (
    <div className="px-4 pt-16 text-lg flex flex-col gap-8">
      <div className="flex gap-16 justify-between items-center">
        <h1 className="text-2xl">{`Hi ${user.name}, you are in priority section`}</h1>
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <UserPhoto />
        </div>
      </div>

      <PrioritySection
        onChange={handleActivePriorityChange}
        priority={activePriority}
        onDrop={handleDrop}
      />

      <div className="flex flex-col gap-4">
        <h2 className="text-xl">
          {isEditing ? "You are editing priority" : "Create new priority"}
        </h2>
        <div className="flex gap-4">
          <input
            placeholder="name"
            value={activePriority.name}
            type="text"
            onChange={(e) => handlePriorityNameChange(e.target.value)}
            className="bg-muted rounded-lg p-3 flex flex-1"
          />
          <input
            type="color"
            value={activePriority.color}
            onChange={(e) => handlePriorityColorChange(e.target.value)}
            className="bg-muted rounded-lg p-3 w-28"
          />
        </div>
      </div>
      <div className="flex gap-6">
        <button
          onClick={() =>
            isEditing
              ? handleEditPriorityButtonClicked(activePriority)
              : handleAddPriorityButtonClicked(activePriority)
          }
          className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-3 w-full"
        >
          {isEditing ? "Edit Priority" : "Create Priority"}
        </button>
        {isEditing ? (
          <button
            onClick={() => handleDeletePriorityButtonClicked(activePriority.id)}
            className="bg-deleteButton rounded-lg p-3 w-full"
          >
            Delete Priority
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
