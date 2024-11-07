const rooms = {
    single: { available: 5, price: 50 },
    double: { available: 3, price: 80 },
    suite: { available: 2, price: 120 }
    };
    
    const bookings = [];
    const users = [];
    
    document.getElementById('register').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    users.push({ username, password });
    alert('Registration successful! Please log in.');
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    });
    
    document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('booking-form').style.display = 'block';
    } else {
    alert('Invalid login credentials.');
    }
    });
    
    document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const roomType = document.getElementById('room-type').value;
    const checkIn = new Date(document.getElementById('check-in').value);
    const checkOut = new Date(document.getElementById('check-out').value);
    const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    
    if (rooms[roomType].available > 0 && nights > 0) {
    rooms[roomType].available--;
    const totalPrice = rooms[roomType].price * nights;
    const booking = { name, roomType, checkIn, checkOut, totalPrice };
    bookings.push(booking);
    addRoom(booking);
    updateAvailableRooms();
    showConfirmation(booking);
    updateBookingHistory();
    } else {
    alert('Invalid booking details or no rooms available.');
    }
    });
    
    function addRoom(booking) {
    const roomsList = document.getElementById('rooms-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${booking.name} booked a ${booking.roomType} room from ${booking.checkIn.toDateString()} to ${booking.checkOut.toDateString()} for $${booking.totalPrice}.`;
    roomsList.appendChild(listItem);
    }
    
    function updateAvailableRooms() {
    const roomsList = document.getElementById('rooms-list');
    roomsList.innerHTML = '';
    for (const type in rooms) {
    const listItem = document.createElement('li');
    listItem.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} rooms available: ${rooms[type].available}`;
    roomsList.appendChild(listItem);
    }
    }
    
    function showConfirmation(booking) {
    const confirmationDetails = document.getElementById('confirmation-details');
    confirmationDetails.innerHTML = `
    <p>Thank you, ${booking.name}!</p>
    <p>You have booked a ${booking.roomType} room from ${booking.checkIn.toDateString()} to ${booking.checkOut.toDateString()}.</p>
    <p>Total Price: $${booking.totalPrice}</p>
    `;
    }
    
    function updateBookingHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    bookings.forEach(booking => {
    const listItem = document.createElement('li');
    listItem.textContent = `${booking.name} booked a ${booking.roomType} room from ${booking.checkIn.toDateString()} to ${booking.checkOut.toDateString()} for $${booking.totalPrice}.`;
    historyList.appendChild(listItem);
    });
    }
    
    updateAvailableRooms();