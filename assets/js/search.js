let loadProducts = (search = "") => {
  let request = async (search) => {
    
    let myurl =
      "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json";
    try {
      let responde = await fetch(myurl);
      let result = await responde.json();
      console.log("Este es el search", search);
      if (search) {
        result = result.filter((item) => {
          return item.name.includes(search.toLowerCase()) || 
          item.type.includes(search.toLowerCase());
        });

        if (result.length==0){
          let templateHtml = document.getElementById("result");
          templateHtml.innerHTML = 'No hay datos';
        }

        console.log('Elemen', result)
      }

      for (let i = 0; i < result.length; i++) {
        let { src, name, type, price } = result[i];

        let template = `
            <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
            <div class="card card-blog card-plain">
              <div class="card-header p-0 mt-n4 mx-3">
                <a class="d-block shadow-xl border-radius-xl">
                  <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                </a>
              </div>
              <div class="card-body p-3">
                <p class="mb-0 text-sm">${type}</p>
                <a href="javascript:;">
                  <h5>
                    ${name}
                  </h5>
                </a>
                <p class="mb-4 text-sm">
                  <b>Price: </b> $ ${price}
                </p>
              </div>
            </div>
            </div>`;
        let templateHtml = document.getElementById("result");
        templateHtml.innerHTML += template;
      }
    } catch (error) {
      console.log(error);
    }
  };
  let request_xml = (search) => {
    let myurl =
      "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml";
    try {
      fetch(myurl)
        .then((response) => response.text())
        .then((result) => {
          let xml = new DOMParser().parseFromString(result, "application/xml");

          let arrElement = xml.getElementsByTagName("products");
          let element = arrElement[0].children;
          console.log('Eslen',element)
          if (search) {
            element = Array.from(element).filter((item) => {
              return (
                item.getElementsByTagName("name")[0].textContent.includes(search.toLowerCase()) ||
                item.getElementsByTagName("type")[0].textContent.includes(search.toLowerCase())
              );
            });
            if (element.length==0){
            let templateHtml = document.getElementById("result");
            if (!templateHtml){
              templateHtml.innerHTML ='No hay datos';
            }
            
           
          }
          }
          console.log(' de element' ,element);
          console.log('cantida de element' ,element.length);

          for (let i = 0; i < element.length; i++) {
            
            const product = element[i];

            let { textContent: name } = product.getElementsByTagName("name")[0];
            let { textContent: price } =
              product.getElementsByTagName("price")[0];
            let { textContent: src } = product.getElementsByTagName("src")[0];
            let { textContent: type } = product.getElementsByTagName("type")[0];

            let template = `
          <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
          <div class="card card-blog card-plain">
            <div class="card-header p-0 mt-n4 mx-3">
              <a class="d-block shadow-xl border-radius-xl">
                <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
              </a>
            </div>
            <div class="card-body p-3">
              <p class="mb-0 text-sm">${type}</p>
              <a href="javascript:;">
                <h5>
                  ${name}
                </h5>
              </a>
              <p class="mb-4 text-sm">
                <b>Price: </b> $ ${price}
              </p>
            </div>
          </div>
          </div>`;
            let templateHtml = document.getElementById("result");
            templateHtml.innerHTML += template;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  request(search);
  request_xml(search);
};

loadProducts();

document.addEventListener("DOMContentLoaded", function () {
  let button = document.getElementById("filter");
  if (button) {
    button.addEventListener("click", function () {
      let templateHtml = document.getElementById("result");
      templateHtml.innerHTML = '';
      const filterText = document.getElementById("text").value;
      loadProducts(filterText);
    });
  }
});
