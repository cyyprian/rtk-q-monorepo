import { useEffect } from "react";

import { updateUserActivity, useSliceDispatch } from "./createAuthSlice";

export default function updateUpdateUserActivity() {
  const dispatch = useSliceDispatch();

  useEffect(() => {
    dispatch(updateUserActivity());
  }, []);
}
