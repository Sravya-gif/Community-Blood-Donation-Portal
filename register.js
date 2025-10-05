const donorForm = document.getElementById('donorForm');
const donorTable = document.getElementById('donorTable');

// Load existing donors from localStorage
let donors = JSON.parse(localStorage.getItem('donors')) || [];
let editIndex = null; // Track which donor is being edited

// Display donors in table
function displayDonors() {
    donorTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Contact</th>
            <th>City</th>
            <th>Action</th>
        </tr>`;

    donors.forEach((donor, index) => {
        const row = donorTable.insertRow();
        row.insertCell(0).innerText = donor.name;
        row.insertCell(1).innerText = donor.bloodGroup;
        row.insertCell(2).innerText = donor.contact;
        row.insertCell(3).innerText = donor.city;

        // Action cell
        const actionCell = row.insertCell(4);

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.innerText = "Edit";
        editBtn.style.backgroundColor = "#4CAF50";
        editBtn.style.color = "white";
        editBtn.style.border = "none";
        editBtn.style.padding = "5px 10px";
        editBtn.style.borderRadius = "5px";
        editBtn.style.cursor = "pointer";
        editBtn.style.marginRight = "5px";

        editBtn.addEventListener('click', () => {
            donorForm.name.value = donor.name;
            donorForm.bloodGroup.value = donor.bloodGroup;
            donorForm.contact.value = donor.contact;
            donorForm.city.value = donor.city;
            donorForm.age.value = donor.age;
            editIndex = index; // Set current index to edit
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "Delete";
        deleteBtn.style.backgroundColor = "#f44336";
        deleteBtn.style.color = "white";
        deleteBtn.style.border = "none";
        deleteBtn.style.padding = "5px 10px";
        deleteBtn.style.borderRadius = "5px";
        deleteBtn.style.cursor = "pointer";

        deleteBtn.addEventListener('click', () => {
            donors.splice(index, 1);
            localStorage.setItem('donors', JSON.stringify(donors));
            displayDonors();
        });

        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);
    });
}

// Display donors on page load
displayDonors();

// On form submit
donorForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const donorData = {
        name: donorForm.name.value,
        age: donorForm.age.value,
        bloodGroup: donorForm.bloodGroup.value,
        contact: donorForm.contact.value,
        city: donorForm.city.value
    };

    if (editIndex !== null) {
        // Update existing donor
        donors[editIndex] = donorData;
        editIndex = null;
    } else {
        // Add new donor
        donors.push(donorData);
    }

    localStorage.setItem('donors', JSON.stringify(donors));
    displayDonors();
    donorForm.reset();
});
