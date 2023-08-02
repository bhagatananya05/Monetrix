
let scannedTransaction;
let extractedDescription;
let extractedExpense;
let extractedDate;

document.getElementById('scanButton').addEventListener('click', function () {
    const fileName = document.getElementById('imageName').textContent;
    extractedDescription = extractDescription(fileName);
    displayExtractedDescription(extractedDescription);
  });
  
  function extractDescription(fileName) {
    // Add your logic to extract the description from the file name
    // For example, if the file name is "receipt.jpg", extract "receipt"
    const regex = /^(.+)\.(?:jpg|jpeg|png)$/i;
    const match = regex.exec(fileName);
    if (match) {
      return match[1];
    }
    return null;
  }
  
  function displayExtractedDescription(description) {
    const scanDescription = document.getElementById('scanDescription').querySelector('span');
    scanDescription.textContent = description || 'N/A';
    document.getElementById('scanDescription').style.display = 'block';
  }
  
  document.getElementById('scanButton').addEventListener('click', async function () {
    console.log('Scan button clicked.');
    const imageUrl = document.getElementById('uploadedImage').src;
    try {
      const extractedText = await performOCR(imageUrl);
      console.log('Extracted Text:', extractedText);
      extractedDate = extractDate(extractedText);
      console.log('Date:', extractedDate);
      extractedExpense = extractExpense(extractedText);

      console.log('Expense:', extractedExpense);
      displayExtractedData(extractedDate, extractedExpense);
      
    } catch (error) {
      console.error('Error performing OCR:', error);
    }
  });
  
  
// Function to perform OCR using Tesseract.js
async function performOCR(imageUrl) {
    try {
      const result = await Tesseract.recognize(
        imageUrl,
        'eng', // Language code for English
        { logger: info => console.log(info) } // Optional logger
      );
      return result.data.text;
    } catch (error) {
      console.error('Error performing OCR:', error);
      return null;
    }
  }
  
  
  function extractDate(extractedText) {
    const dateRegex = /\b(?:\d{1,2}[./-])\d{1,2}[./-]\d{2,4}\b/g;
    const matches = extractedText.match(dateRegex);
    if (matches && matches.length > 0) {
      const formattedDate = formatDate(matches[0]);
      return formattedDate;
    }
    return null;
  }
  
  function formatDate(dateString) {
    const dateParts = dateString.split(/[./-]/);
    const day = dateParts[0].padStart(2, '0');
    const month = dateParts[1].padStart(2, '0');
    const year = dateParts[2].length === 2 ? `20${dateParts[2]}` : dateParts[2];
    return `${day}/${month}/${year}`;
  }
  

  function extractExpense(extractedText) {
    // Regular expression to match numerical values with two decimal places
    const expenseRegex = /(\d+\.\d{2})/g;
    const matches = extractedText.match(expenseRegex);
  
    if (matches) {
      // Convert the matched values to numbers
      const numbers = matches.map(match => parseFloat(match));
  
      // Find the maximum number, which corresponds to the highest amount
      const maxAmount = Math.max(...numbers);
  
      return maxAmount.toFixed(2); // Return the maximum amount rounded to 2 decimal places
    }
  
    return null;
  }
  
  
function displayExtractedData(date, expense) {
    const scanDate = document.getElementById('scanDate').querySelector('span');
    scanDate.textContent = date || 'N/A';
    document.getElementById('scanDate').style.display = 'block';
  
    const scanExpense = document.getElementById('scanExpense').querySelector('span');
    scanExpense.textContent = expense || 'N/A';
    document.getElementById('scanExpense').style.display = 'block';
  }
  
