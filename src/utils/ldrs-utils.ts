let registered = false;

export const registerQuantum = () => {
  if (typeof window !== "undefined" && !registered) {
    import("ldrs").then(({ quantum }) => {
      quantum.register();
      registered = true;
    });
  }
};
