const loadPhoneDate = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await response.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones);
}
loadPhoneDate();

const displayPhone = phones =>{
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container'); // step 1
    phones.forEach(phone => {
        console.log(phone);
        // step 2 create a div
        const phoneCardDiv = document.createElement('div');
        phoneCardDiv.classList = `card w-96 bg-base-100 shadow-xl`;
        // step 3 set innerHTML
        phoneCardDiv.innerHTML = `
        <figure class='pt-8'><img src="${phone.image}" alt="" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        `;
        // step 4 append child
        phoneContainer.appendChild(phoneCardDiv);
    });
}