import React, { useState } from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useAuth } from "@/store/auth.store";
import { notify } from "@/utils/notify";

const LoginForm = () => {
  const { isLoading, login } = useAuth();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const onValueChange = <Q extends typeof value, T extends keyof Q>(
    key: T,
    value: Q[T]
  ) => {
    setValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onFormSubmit = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    try {
      await login(value);
    } catch (e) {
      notify({
        message: "Erreur lors de l'authentification",
        type: "error",
      });
    }
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-col gap-y-2 w-full max-w-xs"
    >
      <TextInput
        placeholder="Email"
        type="email"
        value={value.email}
        onChange={(evt) => onValueChange("email", evt.target.value)}
      />
      <PasswordInput
        placeholder="Password"
        value={value.password}
        onChange={(evt) => onValueChange("password", evt.target.value)}
      />
      <Button loading={isLoading} type="submit">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
