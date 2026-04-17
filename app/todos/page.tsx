import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function TodosPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from("todos").select();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Interne Aufgaben</h1>
      <ul className="mt-6 space-y-2">
        {todos?.map((todo) => (
          <li key={todo.id} className="rounded-lg border border-zinc-200 bg-white p-3">
            {todo.name}
          </li>
        ))}
      </ul>
    </main>
  );
}