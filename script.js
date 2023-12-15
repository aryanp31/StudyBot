document.addEventListener('DOMContentLoaded', function () {
  const chatForm = document.getElementById('chatForm');
  const userInput = document.getElementById('userInput');
  const responseDiv = document.getElementById('response');

  // Listener for submitted user input
  chatForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const userMessage = userInput.value;

    // POST Request with JSON Payload
    fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: userMessage }),
    })
      .then(response => response.json())
      .then(data => {
        responseDiv.innerText = data.output;
      })
      .catch(error => {
        console.error('Error:', error);
        responseDiv.innerText = 'An error occurred. Please try again.';
      });
  });
});