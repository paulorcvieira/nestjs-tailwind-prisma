import { Task } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { signOut, useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import prisma from "../../lib/prisma";
import DateUtils from "../../utils/date";

const App = ({ serverLoadedTasks }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data } = useSession();
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>(serverLoadedTasks);

  function logout() {
    signOut({
      callbackUrl: "/",
    });
  }

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    await fetch("http://localhost:3000/api/tasks/create", {
      method: "POST",
      body: JSON.stringify({ title: newTask }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    handleFetchTasks();
  }

  async function handleFetchTasks() {
    const response = await fetch("http://localhost:3000/api/tasks/fetch");
    const data = await response.json();
    setTasks(data.tasks);
  }

  return (
    <>
      <div>
        <button
          className="bg-gray-300 px-2 py-2 rounded-sm shadow-sm"
          onClick={logout}
        >
          DESLOGAR
        </button>
      </div>
      <h1>Tasks do {data?.user?.name}</h1>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
        <button type="submit">CADASTRAR</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await prisma.task.findMany(
    // {
    //   where: {
    //     title: {
    //       contains: 'task'
    //     }
    //   }
    // }
  );

  const data = tasks.map((task: Task) => ({
    id: task.id,
    title: task.title,
    isDone: task.isDone,
    createdAt: DateUtils.formatDateTimeToString(task.createdAt),
    updatedAt: DateUtils.formatDateTimeToString(task.createdAt),
  }));

  return {
    props: {
      serverLoadedTasks: data,
    },
  };
};
export default App;