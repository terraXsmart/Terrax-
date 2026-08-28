// ================================
// TERRAX — VERSION 1
// SIMPLE DELIVERY
// ================================

function startDelivery() {
    const input = document.getElementById("deliveryInput");

    if (!input) return;

    const request = input.value.trim();

    if (request === "") {
        alert("Décris d'abord ce que tu veux livrer.");
        input.focus();
        return;
    }

    const result = document.getElementById("deliveryResult");

    result.innerHTML = `
        <div class="result-card">
            <div class="result-icon">🚀</div>

            <h2>Demande reçue</h2>

            <p>
                TerraX a bien enregistré ta demande :
            </p>

            <strong>${request}</strong>

            <div class="status">
                🟢 Recherche d'un partenaire...
            </div>
        </div>
    `;

    // Simulation temporaire.
    // Plus tard, nous connecterons cette partie
    // à notre véritable système de partenaires.
    setTimeout(() => {
        result.innerHTML = `
            <div class="result-card">
                <div class="result-icon">📦</div>

                <h2>Partenaire trouvé</h2>

                <p>
                    Un partenaire TerraX est disponible
                    pour effectuer ta livraison.
                </p>

                <div class="partner">
                    👨🏾‍💼 Partenaire TerraX
                    <br>
                    ⭐ 4.8
                </div>

                <button onclick="confirmDelivery()">
                    Confirmer la livraison
                </button>
            </div>
        `;
    }, 2000);
}


function confirmDelivery() {
    const result = document.getElementById("deliveryResult");

    result.innerHTML = `
        <div class="result-card">
            <div class="result-icon">✅</div>

            <h2>Livraison confirmée</h2>

            <p>
                Ton partenaire TerraX a reçu la mission.
            </p>

            <div class="status">
                🟢 Partenaire en route
            </div>
        `;
}


function useLocation() {
    if (!navigator.geolocation) {
        alert("La localisation n'est pas disponible sur cet appareil.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            alert(
                "📍 Position détectée !\n\n" +
                "Latitude : " + latitude.toFixed(4) +
                "\nLongitude : " + longitude.toFixed(4)
            );
        },

        function() {
            alert(
                "Impossible d'obtenir ta position. " +
                "Vérifie les autorisations de localisation."
            );
        }
    );
}


// Permet d'utiliser Enter pour lancer une demande
document.addEventListener("DOMContentLoaded", function() {

    const input = document.getElementById("deliveryInput");

    if (input) {
        input.addEventListener("keydown", function(event) {

            if (event.key === "Enter") {
                event.preventDefault();
                startDelivery();
            }

        });
    }

});
