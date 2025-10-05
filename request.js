const requestForm = document.getElementById('requestForm');
const matchingDonors = document.getElementById('matchingDonors');

// Load donors from localStorage
let donors = JSON.parse(localStorage.getItem('donors')) || [];

requestForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const bloodGroupNeeded = requestForm.bloodGroup.value;
    const cityNeeded = requestForm.city.value.toLowerCase();

    const matched = donors.filter(donor =>
        donor.bloodGroup === bloodGroupNeeded && donor.city.toLowerCase() === cityNeeded
    );

    matchingDonors.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Contact</th>
            <th>City</th>
        </tr>`;

    if (matched.length === 0) {
        const row = matchingDonors.insertRow();
        row.insertCell(0).innerText = "No donors found";
        row.insertCell(1).innerText = "-";
        row.insertCell(2).innerText = "-";
        row.insertCell(3).innerText = "-";
    } else {
        matched.forEach(donor => {
            const row = matchingDonors.insertRow();
            row.insertCell(0).innerText = donor.name;
            row.insertCell(1).innerText = donor.bloodGroup;
            row.insertCell(2).innerText = donor.contact;
            row.insertCell(3).innerText = donor.city;
        });
    }
});
