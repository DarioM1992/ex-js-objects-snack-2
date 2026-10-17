//SNACK-1
const hamburger = { name: "Cheese Burger", weight: 250 };
const secondBurger = hamburger;
secondBurger.name = 'Double Cheese Burger';
secondBurger.weight = 500;
​
console.log(hamburger.name); // ? Double Cheese Burger
console.log(secondBurger.name ); // ? Double Cheese Burger

// Quanti oggetti sono stati creati in memoria durante l'esecuzione di questo codice?
// uno solo, una reference sola quindi al cambio del nome e del peso di secondburger il riferimento di hamburger cambia


//SNACK-2
const hamburger = { 
    name: "Cheese Burger", 
    weight: 250,
    ingredients: ["Cheese", "Meat", "Bread", "Tomato"]
};
​
const secondBurger = {...hamburger};
secondBurger.ingredients[0] = "Salad";
​
console.log(hamburger.ingredients[0]); // ? salad
console.log(secondBurger.ingredients[0]); // ? salad

// P.S.: Ricordati che gli Array, come gli oggetti, sono dei Reference Type (Tipi di Riferimento)!
// Senza lanciare il codice, riesci a prevedere cosa viene stampato in console? 
// Quanti oggetti sono stati creati in memoria durante l'esecuzione di questo codice? tre , un oggetto di hamburger, un secondo di secondBurger e il terzo l'array degli ingredienti. La shallowcopy non copia oggetti o array annidati ma solo il primo livello perciò l'array in questione rimane con un solo riferimento ed è per questo che vedremo salad in entrambi i casi

// SNACK-3
const hamburger = { 
    name: "Cheese Burger", 
    weight: 250,
    maker: {
        name: "Anonymous Chef",
        restaurant: {
            name: "Hyur's Burgers",
            address: "Main Street, 123",
            isOpen: true,
        },
        age: 29
    }
};
​
const secondBurger = structuredClone(hamburger); //
const thirdBurger = structuredClone(hamburger); //

// Quanti oggetti sono stati creati in memoria durante l'esecuzione di questo codice? Nove, l'oggetto hamburger e i suoi 2 corrispettivi oggetti annidati che sono 2 perciò in totale 3! Alla creazione di 2 structuredClone() avrò perciò 3 oggetti ciascuno più i 3 iniziali di hamburger = totale 9

//SNACK-4

const chef = {
    name: "Chef Hyur",
    age: 29,
    makeBurger: (num = 1) => {
        console.log(`Ecco ${num} hamburger per te!`);
    },
}
​
const restaurant = {
    name: "Hyur's Burgers",
    address: {
        street: 'Main Street',
        number: 123,
    },
    openingDate: new Date(2025, 3, 11),
    isOpen: false,
};

// Qual è il metodo migliore per clonare l’oggetto chef, e perché? Direi che il metodo migliore in questo caso è lo spread operator perchè l'oggetto contiene una funzione.Quindi direi const secondChef = {...chef, chef.makeBurger}
// Qual è il metodo migliore per clonare l’oggetto restaurant, e perché? Invece in questo caso userei un structuredClone(restaurant) per la complessità di oggetti annidati ma sopratutto per la data (che nel cado di JSON.stringify avrebbe dato un risultato/valore diverso espresso appunto in stringa )

//SNACK-5 

const hamburger = { 
    name: "Cheese Burger", 
    weight: 250,
    maker: {
        name: "Anonymous Chef",
        restaurant: {
            name: "Hyur's Burgers",
            address: "Main Street, 123",
            isOpen: true,
        },
        age: 29
    }
};
​
const newRestaurant = {...hamburger.maker.restaurant};
newRestaurant.name = "Hyur's II";
newRestaurant.address = "Second Street, 12";
const secondBurger = {...hamburger};
secondBurger.maker.restaurant = newRestaurant;
secondBurger.maker.name = "Chef Hyur";
​
console.log(hamburger.maker.name); // ? "Chef Hyur"
console.log(secondBurger.maker.name); // ? "Chef Hyur"
console.log(hamburger.maker.restaurant.name); // "Hyur's Burgers"
console.log(secondBurger.maker.restaurant.name); // "Hyur's II"
// Senza lanciare il codice, riesci a prevedere cosa viene stampato in console?
// Quanti oggetti sono stati creati in memoria durante l'esecuzione di questo codice? direi solo 2 , hamburger e secondBurger perchè newRestaurant è solo un oggetto annidato cambiato

// SNACK-6

const chef = {
    name: "Chef Hyur",
    age: 29,
    makeBurger: (num = 1) => {
        console.log(`Ecco ${num} hamburger per te!`);
    },
    restaurant: {
        name: "Hyur's Burgers",
        welcomeClient: () => {
            console.log("Benvenuto!");
        },
        address: {
            street: 'Main Street',
            number: 123,
            showAddress: () => {
                console.log("Main Street 123");
            }
        },
        isOpen: true,
    }
}
// Qual è il metodo migliore per clonare l’oggetto chef, e perché? direi che il modo migliore è una deep copy, nessuno di quelli affrontati insieme nelle videolezioni. lo spread operator darebbe problemi con gli oggetti annidati , il json.stringify e la shallowcopy comporterebbero problematiche per la funzione all'interno dell'oggetto stesso!

//SNACK-BONUS

// Crea una funzione che permette la copia profonda (deep copy) di un oggetto, che copia anche i suoi metodi (proprietà che contengono funzioni). Usa l’oggetto di Code Question 6 come test.

// ⚠️ Serve usare una funzione ricorsiva! (fai un po’ di ricerca).

// Creazione deep copy
const chefCopy = deepCopy(chef);

// Testiamo i metodi
chefCopy.makeBurger(2);
chefCopy.restaurant.welcomeClient();
chefCopy.restaurant.address.showAddress();

// Verifichiamo che gli oggetti siano indipendenti
console.log(chefCopy !== chef); // true
console.log(chefCopy.restaurant !== chef.restaurant); // true
console.log(chefCopy.restaurant.address !== chef.restaurant.address); // true