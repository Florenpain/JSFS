let userlogin;
let userpassword;
let username;
let usermoney;


const DELAY_BEFORE_REFRESHING = 3000;

const setup = () => {
  username = document.getElementById('username');
  description = document.getElementById('description');
  prix = document.getElementById('prix');
  message = document.getElementById('message');
  const nomutilisateur = document.getElementById('nomutilisateur');
  getUser();

  updatemoney();
  fillTablebuy();
  userobjet();
  document.getElementById('update').addEventListener('click', update);
  document.getElementById('logout').addEventListener('click', logout);
  document.getElementById('creation').addEventListener('click', creationobjet);
    document.getElementById('updateobjet').addEventListener('click', fillTablebuy);
	document.getElementById('userobjet').addEventListener('click', userobjet);
}
window.addEventListener('DOMContentLoaded', setup);

//create objet
const creationobjet =
  async () => {

    const newObjet = {
                      description : description.value,
                      prix : prix.value,

                      };
    // body is built from created book
    const bodyContent = JSON.stringify(newObjet);
    // options for a POST method that conains json
    const requestOptions = {
                              method :'POST',
                              headers : { "Content-Type": "application/json" },
                              body : bodyContent
                            };
    // send the request to the server to create the entry corresponding to book
    const response = await fetch('/objets/create', requestOptions);
    if (response.ok) {
      const objets = await response.json();
      message.textContent = `objets ${objets.description} created with id ${objets._id} `;
    } else {
       const error = await response.json();
       message.textContent = `error : ${error.message}`;
    }
    clearInputs();
	userobjet();
}

//clear input
const clearInputs = function() {
  description.value = "";
  prix.value = 0;
}

//update
const fillTablebuy = async () => {

  const objetsliste = document.getElementById('objetsliste');
  objetsliste.textContent = '';
  const requestOptions = {
                           method :'GET'
                         };
  const response = await fetch('/objets/update', requestOptions)
  const allobjets = await response.json()
  for (let objet of allobjets) {

    const obje = buildObjetElement(objet);
    objetsliste.appendChild(obje);
  }
}

//user items
const userobjet = async () => {

  const userobjetsliste = document.getElementById('userobjetsliste');
  userobjetsliste.textContent = '';
  const requestOptions = {
                           method :'GET'
                         };
  const response = await fetch('/objets/userobjet', requestOptions)
  const userallobjets = await response.json()
  for (let objet of userallobjets) {

    const uobje = userbuildObjetElement(objet);
    userobjetsliste.appendChild(uobje);
  }
}


const userbuildObjetElement =  objet => {
  const objetElement = document.createElement('tr');
  objetElement.className = 'objet';
  objetElement.appendChild(buildTD(objet.description, 'description'));
  objetElement.appendChild(buildTD(objet.prix, 'prix'));
  const removeButton = buildButton('Remove');
    removeButton.addEventListener('click', () => deleteObjet(objet._id, removeButton));
    objetElement.appendChild(removeButton);
  return objetElement;
}


const updatemoney = async () => {

  const money = document.getElementById('money');
  money.textContent = '';
  const requestOptions = {
                           method :'GET'
                         };
  const response = await fetch('/objets/money', requestOptions)
  const moneyres = await response.json()
  money.textContent = `Argent: ${moneyres[0].number}`;
  usermoney=moneyres[0].number;
}


const buildObjetElement =  objet => {
  const objetElement = document.createElement('tr');
  objetElement.className = 'objet';
  objetElement.appendChild(buildTD(objet.description, 'description'));
  objetElement.appendChild(buildTD(objet.prix, 'prix'));
  const buyButton = buildButton('Buy objet');
    buyButton.addEventListener('click', () => buyobjet(objet._id, buyButton ,objet.prix , objet.userId));
    objetElement.appendChild(buyButton);
  return objetElement;
}

const buildButton = label  => {
  const button = document.createElement('button');
  button.textContent = label;
  return button;
}






const buyobjet =
  async (objetId, button,prix, seller) => {
	  
	
	if(usermoney-prix >= 0){
		  
		const updateData = { number : usermoney-prix };
		usermoney -= prix;
		
		const body = JSON.stringify( updateData );
		// use method PUT for an  update request
		const requestOptions = {
								  method :'PUT',
								  headers : { "Content-Type": "application/json" },
								  body : body
								};
		const response = await fetch(`/user/losemoney`, requestOptions)
		//si réponsse ok on continue (rajouter l argent au vendeur et enlever l objet)
		if (response.ok) {

		 const updateData = { number : +prix };
		  const body = JSON.stringify( updateData );
			 const requestOptions = {
								  method :'PUT',
								  headers : { "Content-Type": "application/json" },
								  body : body 
								};
			 const response = await fetch(`/user/winmoney/${seller}`, requestOptions);
			 
		  if (response.ok) {
			 
			  deleteObjet(objetId, button);
			  updatemoney();
			  
			  
		  }
		  
		}
	}
	else{
		message.textContent="Vous n'avez pas assez d argent";
	}
  }





const deleteObjet =
    async (objetId, button) => {
      const requestOptions = {
                               method :'DELETE'
                             };
      const response = await fetch(`/objets/${objetId}`, requestOptions);
      const received = await response.json();
      button.parentNode.replaceChild( createTmpSpan() , button);
      window.setTimeout( userobjet, DELAY_BEFORE_REFRESHING);
	  window.setTimeout( fillTablebuy, DELAY_BEFORE_REFRESHING);
    }


    const createTmpSpan = () => {
      const span = document.createElement('span');
      span.className = 'deleted';
      span.textContent = 'deleted';
      return span;
    }





const buildTD = (content, className) => {
  const TDelement = document.createElement('td');
  TDelement.textContent = content;
  TDelement.className = className;
  return TDelement;
}








const getUser = async () => {
  const requestOptions = {
                           method :'GET',
                         };
  const response = await fetch('/user/me', requestOptions);
  if (response.ok) {
    const user = await response.json();
    username.value = user.name || '';

  nomutilisateur.textContent=`Bonjour ${user.name}`;
  console.log(user);
  }
  else {
    const error = await response.json();
    handleError(error);
  }
  
  
  
  
}

const update =  async () => {
  const userData = { name : username.value };
  const body = JSON.stringify(userData);
  const requestOptions = {
                         method :'PUT',
                         headers : { "Content-Type": "application/json" },
                         body : body
                       };
  const response = await fetch('/user/me', requestOptions);
  if (response.ok) {
    const updatedUser = await response.json();
	nomutilisateur.textContent=`Bonjour ${username.value}`;
    console.log(`user updated : ${JSON.stringify(updatedUser)}`);
  }
  else {
    const error = await response.json();
    handleError(error);
  }
}

const logout = async () => {
  const requestOptions = {
                         method :'GET',
                       };
  const response = await fetch(`/access/logout`, requestOptions);
  if (response.ok) {
    window.location.href= '/access/login';
  }
}

const handleError = error => {
  if (error.redirectTo)
    window.location.href= error.redirectTo;
  else
    console.log(`erreur : ${error.message}`);
}
