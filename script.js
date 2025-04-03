document.addEventListener("DOMContentLoaded", function () {
    let articleInput = document.getElementById("article-input");
    let analyzeButton = document.getElementById("analyze-button");
    let resultText = document.getElementById("result");
    let analyzeAgainButton = document.getElementById("analyze-again");

    // Analyze Article when button is clicked
    analyzeButton.addEventListener("click", function () {
        let articleTopic = articleInput.value.trim();

        if (articleTopic === "") {
            resultText.textContent = "⚠️ Please enter an article topic!";
            resultText.style.color = "orange";
            return;
        }

        // Show analyzing message
        resultText.textContent = "🔄 Analyzing...";
        resultText.style.color = "#8bd2fc";
        analyzeButton.disabled = true;

        fetch("https://fake-news-detector-3bv4.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: articleTopic })
        })
        .then(response => response.json())
        .then(data => {
            if (data.prediction === "Fake") {
                resultText.textContent = "🛑 Fake News!";
                resultText.style.color = "#ff5454";
            } else if (data.prediction === "Real") {
                resultText.textContent = "✅ Real News!";
                resultText.style.color = "#86d48d";
            } else {
                resultText.textContent = "❌ Error analyzing article.";
                resultText.style.color = "#ff5454";
            }

            analyzeButton.style.display = "none";
            analyzeAgainButton.style.display = "block";
        })
        .catch(error => {
            resultText.textContent = "⚠️ Error: Server might not be running.";
            resultText.style.color = "orange";
        })
        .finally(() => {
            analyzeButton.disabled = false;
        });
    });

    // Analyze another article
    analyzeAgainButton.addEventListener("click", function () {
        location.reload();
    });
});
