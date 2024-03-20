export const Button = () => {
  function load() {
    fetch("/api/build", {
      method: "POST",
    })
      .then((data) => data.json())
      .then(console.log);
  }

  return <button onClick={load}>Deploy</button>;
};
