async function handleAddClients(form,token) {
    try {
        const response = await fetch("http://localhost:5000/clientes", {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        });
  
        const data = await response.json();

        return data;
      } catch (error) {
        console.log(error);
      }
}

export default handleAddClients;