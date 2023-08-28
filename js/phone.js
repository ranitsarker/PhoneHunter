const loadPhoneDate = async (searchText='12', isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones, isShowAll);
}
const displayPhone = (phones, isShowAll) =>{
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container'); // step 1
    // clear phn container cards before adding new card
    phoneContainer.innerText ='';
    // display show more button when product will gater then 12
    const showAllProduct = document.getElementById('show-all-product');
    if(phones.length > 12 && !isShowAll){
      showAllProduct.classList.remove('hidden');
    }else{
      showAllProduct.classList.add('hidden');
    }
    // how to make a limit on phn search if not show all
    if(!isShowAll){
      phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        // step 2 create a div
        const phoneCardDiv = document.createElement('div');
        phoneCardDiv.classList = `card w-96 bg-base-100 shadow-xl`;
        // step 3 set innerHTML
        phoneCardDiv.innerHTML = `
        <figure class='pt-8'><img src="${phone.image}" alt="" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <div class="card-actions justify-end">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-neutral">Show Detail</button>
          </div>
        </div>
        `;
        // step 4 append child
        phoneContainer.appendChild(phoneCardDiv);
    });
    // hide loading spinner  
    toggleLoadingSpinner(false);
}
// search
  const searchHandler = (isShowAll) =>{
      toggleLoadingSpinner(true);
      const searchField = document.getElementById('search-field');
      const searchText = searchField.value;
      // console.log(searchText);
      loadPhoneDate(searchText, isShowAll);
} 
// loading spinner
  const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
      loadingSpinner.classList.remove('hidden');
    }else{
      loadingSpinner.classList.add('hidden');
    }
  }

// handle show all
 const handleShowAll = () =>{
  searchHandler(true);
 }
 //Detail button clicked 
 const handleShowDetail = async (id) =>{
  console.log('clicked' , id);
  // single phone detail data
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await response.json();
  const phone = data.data;
  showPhoneDetails(phone);
 }

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneDetailName = document.getElementById('phone-detail-name');
  phoneDetailName.innerText = phone.name;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
    <img src="${phone.image}" />
    <p><b>Storage: </b>${phone.mainFeatures.storage}</p>
    <p><b>Display Size: </b>${phone.mainFeatures.storage}</p>
    <p><b>Chipset: </b>${phone.mainFeatures.chipSet}</p>
    <p><b>Memory: </b>${phone.mainFeatures.memory}</p>
    <p><b>Release Date: </b>${phone.releaseDate}</p>
    <p><b>Brand: </b>${phone.brand}</p>
    <p><b>GPS: </b>${phone.others.GPS}</p>
  `;

// show modal
showDetailsModal.showModal();
}

 loadPhoneDate();