// ================================
// TERRAX — VERSION 1
// SIMPLE DELIVERY
// ================================

async function processMission() {
    const text = document.getElementById('missionInput').value.trim();

    if (!text) {
        alert('Veuillez décrire votre mission.');
        return;
    }

    // Afficher l'écran de chargement
    showScreen('loadingScreen');

    document.getElementById('progressFill').style.width = '0%';

    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });

    // Déterminer le type de livraison
    const types = {
        'récupérer': 'pickup',
        'prendre': 'pickup',
        'chercher': 'pickup',
        'envoyer': 'delivery',
        'livrer': 'delivery',
        'apporter': 'delivery',
        'acheter': 'purchase',
        'commander': 'purchase',
        'achat': 'purchase'
    };

    let type = 'default';

    for (const [key, value] of Object.entries(types)) {
        if (text.toLowerCase().includes(key)) {
            type = value;
            break;
        }
    }

    const price = prices[type] || prices.default;
    const time = times[type] || times.default;

    // Animation TerraMind
    const steps = [
        { id: 'step1', progress: 25 },
        { id: 'step2', progress: 50 },
        { id: 'step3', progress: 75 }
    ];

    let stepIndex = 0;

    const interval = setInterval(() => {
        if (stepIndex < steps.length) {
            const step = steps[stepIndex];

            document.getElementById(step.id).classList.add('active');
            document.getElementById(step.id).textContent =
                document.getElementById(step.id).textContent.replace('🔍', '✅');

            document.getElementById('progressFill').style.width =
                step.progress + '%';

            stepIndex++;
        } else {
            clearInterval(interval);
            createRealMission(text, type, price, time);
        }
    }, 600);
}async function createRealMission(text, type, price, time) {

    try {

        const estimatedMinutes = parseInt(time.match(/\d+/)?.[0] || 15);

        const { data, error } = await supabaseClient
            .from('missions')
            .insert([
                {
                    mission_text: text,
                    delivery_type: type,
                    status: 'pending',
                    price: price,
                    estimated_minutes: estimatedMinutes
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Erreur Supabase:', error);

            alert(
                'Impossible de créer la mission pour le moment.\n\n' +
                'Erreur : ' + error.message
            );

            goHome();
            return;
        }

        console.log('🚀 Mission TerraX créée:', data);

        // Mettre à jour l'écran de confirmation
        document.getElementById('missionText').textContent =
            data.mission_text;

        document.getElementById('price').textContent =
            data.price + ' FCFA';

        document.getElementById('estimatedTime').textContent =
            time;

        document.getElementById('step4').classList.add('active');
        document.getElementById('step4').textContent =
            '✅ Mission créée avec succès';

        document.getElementById('progressFill').style.width = '100%';

        setTimeout(() => {
            showScreen('confirmationScreen');
        }, 500);

    } catch (error) {

        console.error(error);

        alert(
            'Une erreur est survenue lors de la création de la mission.'
        );

        goHome();
    }
}
