// Simple Login & Sign Up (localStorage for demo)
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

if(loginForm) {
    loginForm.addEventListener('submit', function(e){
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const storedPassword = localStorage.getItem(username);
        if(storedPassword && storedPassword === password){
            localStorage.setItem('loggedInUser', username);
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials!');
        }
    });
}

if(signupForm) {
    signupForm.addEventListener('submit', function(e){
        e.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;
        localStorage.setItem(username, password);
        alert('Sign Up Successful! Please Login.');
        signupForm.reset();
    });
}

// Display username in profile
const usernameDisplay = document.getElementById('usernameDisplay');
if(usernameDisplay){
    const user = localStorage.getItem('loggedInUser');
    if(user){
        usernameDisplay.textContent = user;
    }
}

// Log out
function logout(){
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

// Booking System with multiple bookings
let bookings = [];

if(bookingForm){
    bookingForm.addEventListener('submit', function(e){
        e.preventDefault();

        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const time = document.getElementById('time').value;
        const seatType = document.getElementById('seatType').value;
        const seatNumber = parseInt(document.getElementById('seatNumber').value);
        const discount = document.getElementById('discount').value;

        const prices = {
            "Cebu-Manila": {"Business":[2500,2345], "Economy":[1500,1325]},
            "Cebu-Davao": {"Business":[3500,3345], "Economy":[2500,2325]},
            "Manila-Hongkong": {"Business":[12500,12345], "Economy":[10500,10345]}
        };

        let routeKey = `${from}-${to}`;
        if(!prices[routeKey]){
            routeKey = `${to}-${from}`;
        }

        let price = 0;
        if(seatType === "Business"){
            price = seatNumber <=5 ? prices[routeKey]["Business"][0] : prices[routeKey]["Business"][1];
        } else {
            price = seatNumber <=15 ? prices[routeKey]["Economy"][0] : prices[routeKey]["Economy"][1];
        }

        // Apply discount
        let finalPrice = price;
        if(discount === "student" || discount === "senior" || discount === "pwd"){
            finalPrice = price * 0.9;
        } else if(discount === "child"){
            finalPrice = 0;
        }

        // Add booking to array
        bookings.push({
            from, to, time, seatType, seatNumber, discount, finalPrice
        });

        displayBookings();
        bookingForm.reset();
    });
}

function displayBookings(){
    const bookingItems = document.getElementById('bookingItems');
    const totalAmount = document.getElementById('totalAmount');
    bookingItems.innerHTML = "";
    let total = 0;

    bookings.forEach((b, index) => {
        bookingItems.innerHTML += `<li>
            ${index+1}. ${b.from} → ${b.to} at ${b.time} | ${b.seatType} | Seat ${b.seatNumber} | ${b.discount} | ₱${b.finalPrice.toLocaleString()}
        </li>`;
        total += b.finalPrice;
    });

    totalAmount.textContent = `Total Amount: ₱${total.toLocaleString()}`;
}

// Print Itinerary
function printItinerary(){
    let printContent = "RYS Air Itinerary\n\n";
    bookings.forEach((b, index) => {
        printContent += `${index+1}. ${b.from} → ${b.to}\nTime: ${b.time}\nSeat: ${b.seatType} ${b.seatNumber}\nDiscount: ${b.discount}\nAmount: ₱${b.finalPrice.toLocaleString()}\n\n`;
    });
    const total = bookings.reduce((acc, b) => acc + b.finalPrice, 0);
    printContent += `Total Amount: ₱${total.toLocaleString()}`;

    const newWin = window.open("");
    newWin.document.write("<pre>" + printContent + "</pre>");
    newWin.print();
}

