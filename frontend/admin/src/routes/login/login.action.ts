import { redirect } from "react-router";

import { useStore } from "@src/store/appStore";
import { login } from "@src/features/auth/services";

export async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const password = formData.get("password")?.toString();

  const setCredentials = useStore.getState().setCredentials;

  try {
    if (!name || !password) return new Response("Invalid credentials");

    const data = await login({ name, password });
    setCredentials(data);
    return redirect("/");
  } catch (error) {
    return new Response("Invalid credentials");
  }
}
