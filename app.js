// ── State ──

let favorites = JSON.parse(localStorage.getItem('nameforge-favorites') || '[]');
let conversationHistory = [];

// ── DOM ──

const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const saveSettingsBtn = document.getElementById('save-settings');
const closeSettingsBtn = document.getElementById('close-settings');
const apiKeyInput = document.getElementById('api-key');
const modelSelect = document.getElementById('model-select');
const favoritesBar = document.getElementById('favorites-bar');
const favoritesList = document.getElementById('favorites-list');
const favCountEl = document.getElementById('fav-count');
const clearFavBtn = document.getElementById('clear-favorites');
const copyFavBtn = document.getElementById('copy-favorites');

// ── Init ──

// Load saved settings
apiKeyInput.value = localStorage.getItem('nameforge-api-key') || '';
modelSelect.value = localStorage.getItem('nameforge-model') || 'claude-sonnet-4-20250514';

// Show settings modal on first visit if no key
if (!apiKeyInput.value) {
    settingsModal.classList.add('visible');
}

renderFavorites();

// ── Settings Modal ──

settingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('visible');
});

closeSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('visible');
});

saveSettingsBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
        localStorage.setItem('nameforge-api-key', key);
    }
    localStorage.setItem('nameforge-model', modelSelect.value);
    settingsModal.classList.remove('visible');
});

settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.classList.remove('visible');
    }
});

// ── Chat ──

const SYSTEM_PROMPT = `You are NameForge, a creative name generator assistant. Your job is to generate names and labels based on what the user asks for.

Guidelines:
- When the user describes what kind of name they want, generate 5-8 names that fit their request
- Always format your names in a JSON array at the END of your response, wrapped in <names>["Name1", "Name2", ...]</names> tags
- Before the names, give a brief (1-2 sentence) note about the vibe or logic behind your choices
- Draw from the specific universes, genres, tropes, and inspirations the user mentions
- Names should feel authentic to the world/genre — like they could actually exist in that setting
- If the user asks you to tweak, regenerate, or modify names, do so
- If the user just wants to chat or asks something off-topic, be friendly but steer back to name generation
- Be conversational and fun, not robotic
- If the user says they like certain names, acknowledge that and offer variations if appropriate`;

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    const apiKey = localStorage.getItem('nameforge-api-key');
    if (!apiKey) {
        settingsModal.classList.add('visible');
        return;
    }

    // Add user message to UI
    appendMessage('user', text);
    userInput.value = '';
    userInput.style.height = 'auto';
    sendBtn.disabled = true;

    // Add to conversation history
    conversationHistory.push({ role: 'user', content: text });

    // Show typing indicator
    const typingEl = showTyping();

    try {
        const model = localStorage.getItem('nameforge-model') || 'claude-sonnet-4-20250514';

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: model,
                max_tokens: 1024,
                system: SYSTEM_PROMPT,
                messages: conversationHistory
            })
        });

        typingEl.remove();

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            const errMsg = err.error?.message || `API error: ${response.status}`;
            if (response.status === 401) {
                appendMessage('assistant', 'Looks like your API key is invalid. Click the gear icon to update it.');
            } else {
                appendMessage('assistant', `Something went wrong: ${errMsg}`);
            }
            conversationHistory.pop(); // Remove the failed user message
            sendBtn.disabled = false;
            return;
        }

        const data = await response.json();
        const assistantText = data.content[0].text;

        // Add to history
        conversationHistory.push({ role: 'assistant', content: assistantText });

        // Parse and render
        renderAssistantMessage(assistantText);

    } catch (err) {
        typingEl.remove();
        appendMessage('assistant', `Connection error: ${err.message}. Check your network and API key.`);
        conversationHistory.pop();
    }

    sendBtn.disabled = false;
    userInput.focus();
}

function renderAssistantMessage(text) {
    // Extract names if present
    const namesMatch = text.match(/<names>\s*(\[[\s\S]*?\])\s*<\/names>/);
    let names = [];
    let displayText = text;

    if (namesMatch) {
        try {
            names = JSON.parse(namesMatch[1]);
        } catch (e) {
            // If JSON parse fails, try to extract names manually
            names = [];
        }
        // Remove the names tag from display text
        displayText = text.replace(/<names>[\s\S]*?<\/names>/, '').trim();
    }

    const msgEl = document.createElement('div');
    msgEl.className = 'message assistant';

    const contentEl = document.createElement('div');
    contentEl.className = 'message-content';

    // Render text with basic formatting
    const paragraphs = displayText.split('\n\n').filter(Boolean);
    for (const p of paragraphs) {
        const pEl = document.createElement('p');
        pEl.textContent = p;
        contentEl.appendChild(pEl);
    }

    // Render name chips
    if (names.length > 0) {
        const grid = document.createElement('div');
        grid.className = 'name-results';

        for (const name of names) {
            const chip = createNameChip(name);
            grid.appendChild(chip);
        }

        contentEl.appendChild(grid);
    }

    msgEl.appendChild(contentEl);
    chatContainer.appendChild(msgEl);
    scrollToBottom();
}

function createNameChip(name) {
    const chip = document.createElement('div');
    chip.className = 'name-chip';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'name-text';
    nameSpan.textContent = name;

    const copyBtn = document.createElement('button');
    copyBtn.title = 'Copy';
    copyBtn.innerHTML = '&#128203;';
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(name);
        copyBtn.textContent = '\u2713';
        setTimeout(() => copyBtn.innerHTML = '&#128203;', 1000);
    });

    const favBtn = document.createElement('button');
    favBtn.title = 'Save';
    const isFav = favorites.includes(name);
    favBtn.textContent = isFav ? '\u2605' : '\u2606';
    if (isFav) favBtn.classList.add('fav-active');

    favBtn.addEventListener('click', () => {
        toggleFavorite(name);
        const nowFav = favorites.includes(name);
        favBtn.textContent = nowFav ? '\u2605' : '\u2606';
        favBtn.classList.toggle('fav-active', nowFav);
    });

    chip.appendChild(nameSpan);
    chip.appendChild(copyBtn);
    chip.appendChild(favBtn);

    return chip;
}

function appendMessage(role, text) {
    const msgEl = document.createElement('div');
    msgEl.className = `message ${role}`;

    const contentEl = document.createElement('div');
    contentEl.className = 'message-content';

    const p = document.createElement('p');
    p.textContent = text;
    contentEl.appendChild(p);

    msgEl.appendChild(contentEl);
    chatContainer.appendChild(msgEl);
    scrollToBottom();
}

function showTyping() {
    const el = document.createElement('div');
    el.className = 'message assistant';
    el.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    chatContainer.appendChild(el);
    scrollToBottom();
    return el;
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// ── Input handling ──

sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Auto-resize textarea
userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
});

// ── Favorites ──

function toggleFavorite(name) {
    const idx = favorites.indexOf(name);
    if (idx >= 0) {
        favorites.splice(idx, 1);
    } else {
        favorites.push(name);
    }
    localStorage.setItem('nameforge-favorites', JSON.stringify(favorites));
    renderFavorites();
}

function renderFavorites() {
    favoritesList.innerHTML = '';
    const hasFavs = favorites.length > 0;

    favoritesBar.classList.toggle('visible', hasFavs);
    favCountEl.textContent = hasFavs ? `(${favorites.length})` : '';
    clearFavBtn.style.display = hasFavs ? 'inline-block' : 'none';
    copyFavBtn.style.display = hasFavs ? 'inline-block' : 'none';

    for (const name of favorites) {
        const tag = document.createElement('span');
        tag.className = 'fav-tag';
        tag.innerHTML = `${escapeHtml(name)} <span class="remove-fav">\u2715</span>`;
        tag.querySelector('.remove-fav').addEventListener('click', () => {
            toggleFavorite(name);
            // Update any visible star buttons
            document.querySelectorAll('.name-chip').forEach(chip => {
                if (chip.querySelector('.name-text').textContent === name) {
                    const btn = chip.querySelector('.fav-active, button:last-child');
                    if (btn) {
                        btn.textContent = '\u2606';
                        btn.classList.remove('fav-active');
                    }
                }
            });
        });
        favoritesList.appendChild(tag);
    }
}

clearFavBtn.addEventListener('click', () => {
    favorites = [];
    localStorage.setItem('nameforge-favorites', JSON.stringify(favorites));
    renderFavorites();
    document.querySelectorAll('.fav-active').forEach(btn => {
        btn.textContent = '\u2606';
        btn.classList.remove('fav-active');
    });
});

copyFavBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(favorites.join('\n'));
    copyFavBtn.textContent = 'Copied!';
    setTimeout(() => copyFavBtn.textContent = 'Copy All', 1500);
});

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
