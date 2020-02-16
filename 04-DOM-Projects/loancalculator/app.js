// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide results and sow loading
  showOrHideResultsOrLoading('none', 'block');

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function showOrHideResultsOrLoading(results, loading) {
   // Show or Hide results
   document.getElementById('results').style.display = results;
   document.getElementById('loading').style.display = loading;
}

//Calculate Results
function calculateResults() {
  
  // UI vars
  const amountUI = document.getElementById('amount');
  const interestUI = document.getElementById('interest');
  const yearsUI = document.getElementById('years');
  const monthlyPaymentUI = document.getElementById('monthly-payment');
  const totalPaymentUI = document.getElementById('total-payment');
  const totalInterestUI = document.getElementById('total-interest');

  const principal = parseFloat(amountUI.value);
  const calculatedInterest = parseFloat(interestUI.value) / 100 / 12;
  const calculatedPayments = parseFloat(yearsUI.value) * 12;

  //Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPaymentUI.value = monthly.toFixed(2);
    totalPaymentUI.value = (monthly * calculatedPayments).toFixed(2);
    totalInterestUI.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show results and hide loading
    showOrHideResultsOrLoading('block', 'none'); 
  } else {
    showError('Please check your numbers');
  }
}

function showError(error) {
  // hide results and hide loader
  showOrHideResultsOrLoading('none', 'none');
 
  // Create a div
  const errorDivUI = document.createElement('div');
  // Get elements
  const cardUI = document.querySelector('.card');
  const headingUI = document.querySelector('.heading');

  // Add a class
  errorDivUI.className = 'alert alert-danger';
  // Create text node and append to div
  errorDivUI.appendChild(document.createTextNode(error));

  //Insert error above heading
  cardUI.insertBefore(errorDivUI, headingUI);

  // Remove alert after 3 seconds
  setTimeout(clearError, 2000);
}

function clearError() {
  document.querySelector('.alert').remove();
}