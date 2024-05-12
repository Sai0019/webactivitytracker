fetch('http://localhost:3000/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password'
  })
})
  .then(response => {
    if (response.ok) {
      // User created successfully
    } else {
      // Handle error
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
