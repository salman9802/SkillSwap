import { redirect } from "react-router";

import { useStore } from "@src/store/appStore";

export async function basicAuthLoader() {
  try {
    await useStore.getState().refreshTokens();
  } catch (error) {
    throw redirect("/login");
  }
}
