const donorForm = document.getElementById('donorForm');
const donorTable = document.getElementById('donorTable');

let donors = [];

donorForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = donorForm.name.value;
    const bloodGroup = donorForm.bloodGroup.value;
    const contact = donorForm.contact.value;
    const city = donorForm.city.value;

    // Save donor in array
    donors.push({name, bloodGroup, contact, city});

    // Display donor
    const row = donorTable.insertRow();
    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = bloodGroup;
    row.insertCell(2).innerText = contact;
    row.insertCell(3).innerText = city;

    // Reset form
    donorForm.reset();
});
