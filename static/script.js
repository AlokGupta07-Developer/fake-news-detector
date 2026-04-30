function switchTab(tabType) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('.input-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(`${tabType}-section`).classList.add('active');
    
    document.getElementById('result-card').classList.add('hidden');
}

async function analyze(type) {
    const dataInput = type === 'text' 
        ? document.getElementById('news-text').value 
        : document.getElementById('news-url').value;

    if (!dataInput.trim()) {
        alert(`Please enter some ${type} to analyze.`);
        return;
    }

    const endpoint = type === 'text' ? '/analyze_text' : '/analyze_url';
    const payload = type === 'text' ? { text: dataInput } : { url: dataInput };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        if (response.ok) {
            displayResults(result);
        } else {
            alert(result.message || "An error occurred during analysis.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to the server.");
    }
}

function displayResults(data) {
    const resultCard = document.getElementById('result-card');
    const badge = document.getElementById('result-badge');
    const progressBar = document.getElementById('progress-bar');
    const confidenceText = document.getElementById('confidence-text');
    const fakeCount = document.getElementById('fake-count');
    const realCount = document.getElementById('real-count');
    const messageBox = document.getElementById('result-message');

    resultCard.classList.remove('hidden');

    badge.className = 'badge';
    progressBar.className = 'progress-bar';
    messageBox.className = 'message-box';

    const isReal = data.prediction === 'REAL';
    
    badge.textContent = data.prediction;
    badge.classList.add(isReal ? 'real' : 'fake');
    
    progressBar.style.width = `${data.confidence}%`;
    progressBar.classList.add(isReal ? 'real' : 'fake');
    
    confidenceText.textContent = `${data.confidence}%`;
    
    fakeCount.textContent = data.fake_indicators;
    realCount.textContent = data.real_indicators;
    
    messageBox.textContent = data.message;
    messageBox.classList.add(isReal ? 'real' : 'fake');
}
