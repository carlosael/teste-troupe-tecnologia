async function loadClients(setClientsData,token) {
    try {
      const response = await fetch("http://localhost:5000/clientes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();
      
      setClientsData(data);
    } catch (error) {
      console.log(error);
    }
  }

  export default loadClients;