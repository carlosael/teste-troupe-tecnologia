async function handleEditClient(form,token,id) {
    try {
        const response = await fetch(`http://localhost:5000/clientes/${id}`, {
          method: "PUT",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        });
  
       await response.json();
      } catch (error) {
        console.log(error);
      }
}

export default handleEditClient;