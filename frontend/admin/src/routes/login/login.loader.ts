import { useStore } from "@src/store/appStore";
import { redirect } from "react-router";

export async function loginLoader() {
  const { accessToken } = useStore.getState();
  if (accessToken == null) return null;
  else return redirect("/");
}
