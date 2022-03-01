async function loadCEP(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await response.json();
      console.log(data)

      return data;
      
    } catch (error) {
      console.log(error);
    }
  }

  export default loadCEP;