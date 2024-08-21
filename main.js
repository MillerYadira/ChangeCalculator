var denominations = [
    ['twentyDollar', 2000],
    ['tenDollar', 1000],
    ['fiveDollar', 500],
    ['twoDollar', 200],
    ['oneDollar', 100],
    ['quarters', 25],
    ['dimes', 10],
    ['nickels', 5],
    ['pennies', 1]
];

function calculateChange(amountDue, amountReceived) {
    let amountDueCents = Math.round(amountDue * 100);
    let amountReceivedCents = Math.round(amountReceived * 100);
    let totalChange = amountReceivedCents - amountDueCents;

    if (totalChange < 0) {
        return null;
    }

    let results = {};

    denominations.forEach(function(denomination) {
        let name = denomination[0];
        let value = denomination[1];
        let count = Math.floor(totalChange / value);
        results[name] = count;
        totalChange -= (count * value);
    });

    return results;
}

function handleClickEvent(e) {
    let amountDue = document.getElementById('amount-due').value;
    let amountReceived = document.getElementById('amount-received').value;

    if (!amountDue || !amountReceived) {
        alert('Please enter valid amounts for both fields.');
        return;
    }

    let change = calculateChange(amountDue, amountReceived);

    if (change === null) {
        alert('The amount received must be greater than or equal to the amount due.');
        return;
    }

    document.getElementById('total-change').textContent = (amountReceived - amountDue).toFixed(2);

    Object.keys(change).forEach(function(denomination) {
        let outputElement = document.getElementById(`${denomination}-output`);
        if (outputElement) {
            outputElement.textContent = change[denomination];
            let billElement = document.getElementById(`${denomination}`);
            if (change[denomination] > 0) {
                billElement.classList.remove('hidden');
                billElement.classList.add('animate');
            } else {
                billElement.classList.add('hidden');
            }
        }
    });

    document.getElementById('output').classList.remove('hidden');
}

document.getElementById('calculate-change').addEventListener('click', handleClickEvent);
