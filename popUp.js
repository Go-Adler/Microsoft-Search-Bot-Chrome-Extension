// popup.js

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.querySelector('#startt');
  const stopButton = document.querySelector('#sttop');
  const countArea = document.querySelector('#count');

  let stopExecution = false;
  let count = 0
  const startFn = () => {
    stopExecution = false;
    let iteration = 0;
  
    const loop = () => {
      if (iteration < 150 && !stopExecution) {
        count++
        countArea.innerHTML = `${count}/150`
        callF()
        console.log('worked');
  
        // Generate a random delay between 4 and 5 seconds
        const delay = Math.floor(Math.random() * (5000 - 4000 + 1)) + 4000;
  
        // Increment the iteration counter
        iteration++;
  
        // Call loop function recursively after the delay
        setTimeout(loop, delay);
      }
    };
  
    // Start the loop
    loop();
  };
  
  const stopFn = () => {
    stopExecution = true;
  };
  
  startButton.addEventListener('click', startFn);
  stopButton.addEventListener('click', stopFn);
  
  

  function callF() {
    console.log(42);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0]
      if (activeTab) {
        chrome.tabs.executeScript(activeTab.id, {
          code: `
            const form = document.querySelector('#sb_form');
            let formq = document.querySelector('#sb_form_q');
            
            function generateFiveLetterString() {
              const alphabet = 'abcdefghijklmnopqrstuvwxyz';
              let result = '';
            
              for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * alphabet.length);
                result += alphabet.charAt(randomIndex);
              }
            
              return result;
            }
            
              const fiveLetterString = generateFiveLetterString();
              console.log(fiveLetterString);
              formq.value = fiveLetterString;
              form.submit();
          `,
        })
      }
    })
  }
})
