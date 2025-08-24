import { render } from "@testing-library/react";

import RegisterPage from "@/pages/user/RegisterPage";

describe("<RegisterPage />", () => {
  const { debug } = render(<RegisterPage />);
  debug();
});
