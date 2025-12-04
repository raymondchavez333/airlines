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

// Booking System
const bookingForm = document.getElementById('bookingForm');
if(bookingForm){
    bookingForm.addEventListener('submit', function(e){
        e.preventDefault();

        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const seatType = document.getElementById('seatType').value;
        const seatNumber = parseInt(document.getElementById('seatNumber').value);
        const discount = document.getElementById('discount').value;

        // Prices Table
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
            if(seatNumber <=5){
                price = prices[routeKey]["Business"][0];
            } else {
                price = prices[routeKey]["Business"][1];
            }
        } else {
            if(seatNumber <=15){
                price = prices[routeKey]["Economy"][0];
            } else {
                price = prices[routeKey]["Economy"][1];
            }
        }

        // Apply discount
        let finalPrice = price;
        if(discount === "student" || discount === "senior" || discount === "pwd"){
            finalPrice = price * 0.9;
        } else if(discount === "child"){
            finalPrice = 0;
        }

        document.getElementById('result').innerHTML = `
            <h3>Booking Summary</h3>
            <p>Route: ${from} to ${to}</p>
            <p>Seat Type: ${seatType}</p>
            <p>Seat Number: ${seatNumber}</p>
            <p>Discount: ${discount}</p>
            <p>Total Amount: ₱${finalPrice.toLocaleString()}</p>
        `;
    });
}
