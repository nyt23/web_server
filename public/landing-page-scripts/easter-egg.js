function triggerEmoji(){
    emojis = ["☀️", "❄️️", "🌧️", "🌩️", "☁️", "⚡️", "🌬️", "🌥️"]
    const emoji = document.getElementById("weather-emoji")
    const index_emoji = (emojis.indexOf(emoji.textContent) + 1)%emojis.length
    emoji.textContent = emojis[index_emoji]
}
