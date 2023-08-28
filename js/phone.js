const loadPhoneDate = async (searchText) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones);
}
const displayPhone = phones =>{
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container'); // step 1
    // clear phn container cards before adding new card
    phoneContainer.innerText ='';
    // display show more button when product will gater then 12
    const showAllProduct = document.getElementById('show-all-product');
    if(phones.length > 12){
      showAllProduct.classList.remove('hidden');
    }else{
      showAllProduct.classList.add('hidden');
    }
    // how to make a limit on phn search
    phones = phones.slice(0, 12);
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
// search
const searchHandler = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhoneDate(searchText);

} 