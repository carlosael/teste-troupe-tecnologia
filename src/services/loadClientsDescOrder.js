async function loadClientsDescOrder(token) {
    try {
      const response = await fetch("http://localhost:5000/clientes?_sort=nome&_order=desc", {
        method: "GET",
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

  export default loadClientsDescOrder;