async function handleLogin() {
    try {
        const response = await fetch("http://localhost:5000/usuarios", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
  
        const data = await response.json();

        return data[0].token;
      } catch (error) {
        console.log(error);
      }
}

export default handleLogin;