export const authenticate = async () => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const login = async (email, password) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return await response.json();
};

export const demoLogin = async () => {
  const response = await fetch("/api/auth/demo-login");
  return await response.json();
};

export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const signUp = async (username, email, password) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  return await response.json();
};

export const resumeManagement = async (resumes) => {
  const response = await fetch("/api/resumes", {
    method: "GET",
    body: JSON.stringify({
      resumes,
    }),
  });
  return await response.json();
};
