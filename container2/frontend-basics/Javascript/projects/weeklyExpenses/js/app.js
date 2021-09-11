/* Vars */
const userBudget = prompt("Cual es tu prespuesto semanal?");
let budgetAmount;

const form = document.getElementById('agregar-gasto');

/* Classes */

class Budget {
    constructor(budget){
        this.budget = Number(budget);
        this.remains = Number(budget);
    }
    remainingBudget(spending = 0){
        return this.remains -= Number(spending);
    }
}

class Interface {

    insertBudget(amount){

        console.log('Loaded budget ok! ', budgetAmount);
        const budgetSpan = document.querySelector('span#total');
        const remainsSpan = document.querySelector('span#restante');

        // Insert to HTML
        budgetSpan.innerHTML = `${amount}`;
        remainsSpan.innerHTML = `${amount}`;

    }

    printMessage(message, type){
        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center', 'alert');

        if (type === 'error'){
            divMessage.classList.add('alert-danger');
        } else {
            divMessage.classList.add('alert-success');
        }

        divMessage.appendChild(document.createTextNode(message));
        document.querySelector('.primario').insertBefore(divMessage, form);
        form.reset();

        setTimeout(function() {
            document.querySelector('.primario .alert').remove();
        }, 3000);
    }

    addExpenditureToList(name, amount){
        const list = document.querySelector("#gastos ul");
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `${name}:
                        <span class="badge badge-primary badge-pill">$${amount}</span>
                        `;
        list.appendChild(li);
    }

    refreshRemainingBudget(expenditure){
        const remaining = document.querySelector('span#restante');
        const remainingBudgetUser = budgetAmount.remainingBudget(expenditure);

        remaining.innerHTML = `${remainingBudgetUser}`;

        this.checkBudgetColor();
    }
    checkBudgetColor(){
        const remaining = document.querySelector('.restante');

        // Check 25%
        if(budgetAmount.budget / 4 > budgetAmount.remains){
            console.log('Remainins less than 25%');
            remaining.classList.remove('alert-success', 'alert-warning');
            remaining.classList.add('alert-danger');
        }
        // Check 50%
        else if(budgetAmount.budget / 2 > budgetAmount.remains) {
            console.log('Remainins less than 50%');
            remaining.classList.remove('alert-success');
            remaining.classList.add('alert-warning');
        }
    }
}

/* Event Listeners */

document.addEventListener('DOMContentLoaded', function() {

    if(userBudget === null || userBudget === '') {
        window.location.reload();

    } else {

        // Initialize budget
        budgetAmount = new Budget(userBudget);

        // Initiliaze interface
        const ui = new Interface();
        ui.insertBudget(budgetAmount.budget);
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Read form
    const expenditureName = document.querySelector('#gasto').value;
    const expenditureAmount = document.querySelector('#cantidad').value;

    // Initialize interface
    const ui = new Interface();

    // Check for empty fields
    if(expenditureName === '' || expenditureAmount === ''){
        ui.printMessage('Error, faltan datos.', 'error')
    } else {
        ui.printMessage('Se agrego un nuevo gasto.', 'correcto');
        ui.addExpenditureToList(expenditureName, expenditureAmount);
        ui.refreshRemainingBudget(expenditureAmount);
    }

});
