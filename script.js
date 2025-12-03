// ========================================
// GAME DATA: Scenarios
// ========================================

const scenarios = [
    {
        id: 1,
        text: "Your best friend asks you to lie to their parents about where they were last night. They were at a party they weren't supposed to attend. What guides your decision?"
    },
    {
        id: 2,
        text: "You find a wallet with $500 cash and an ID. You could really use the money for bills, and no one would know. What influences your choice?"
    },
    {
        id: 3,
        text: "You witness a classmate cheating on an important exam. Reporting them could ruin their scholarship, but saying nothing feels wrong. How do you decide?"
    },
    {
        id: 4,
        text: "A charity asks for donations. You can donate $100 to help many strangers, or give it to one neighbor you know who's struggling. What matters most?"
    },
    {
        id: 5,
        text: "You see someone shoplifting food at a grocery store. They look desperate and hungry. What should you consider?"
    },
    {
        id: 6,
        text: "Your boss asks you to slightly exaggerate numbers in a report to secure funding. It would help the whole team keep their jobs. What principle guides you?"
    },
    {
        id: 7,
        text: "You can break a promise to attend a friend's event in order to help a stranger in genuine need. Which consideration weighs more heavily?"
    }
];

// Framework explanations shown after each choice
const frameworkExplanations = {
    deontology: "You chose Duty: You believe in following principles and rules, regardless of the consequences.",
    consequentialism: "You chose Outcomes: You focus on which action produces the best overall results.",
    virtue: "You chose Character: You ask what a virtuous person would do in this situation."
};

// Summary messages based on the dominant framework
const summaryMessages = {
    deontology: "You lean toward <strong>Duty-based ethics (Deontology)</strong>. You care about rules, principles, and doing what's right regardless of the outcome. For you, moral rules are universal and should be followed consistently.",
    consequentialism: "You lean toward <strong>Consequentialism</strong>. You focus on outcomes and try to create the best overall results. You believe the morality of an action depends on its consequences, not just the action itself.",
    virtue: "You lean toward <strong>Virtue Ethics</strong>. You care about what kind of person you are becoming through your actions. You ask 'What would a good person do?' and focus on developing strong character."
};

// ========================================
// GAME STATE
// ========================================

let currentScenarioIndex = 0;
let choices = []; // Array to store player choices

// ========================================
// DOM ELEMENTS
// ========================================

const gameScreen = document.getElementById('gameScreen');
const resultsScreen = document.getElementById('resultsScreen');
const scenarioText = document.getElementById('scenarioText');
const feedbackBox = document.getElementById('feedbackBox');
const progressIndicator = document.getElementById('progressIndicator');
const playAgainBtn = document.getElementById('playAgainBtn');

// Door elements
const doors = document.querySelectorAll('.door');

// Results elements
const dutyBar = document.getElementById('dutyBar');
const outcomesBar = document.getElementById('outcomesBar');
const characterBar = document.getElementById('characterBar');
const dutyCount = document.getElementById('dutyCount');
const outcomesCount = document.getElementById('outcomesCount');
const characterCount = document.getElementById('characterCount');
const summaryText = document.getElementById('summaryText');

// ========================================
// GAME FUNCTIONS
// ========================================

/**
 * Initialize the game
 */
function initGame() {
    currentScenarioIndex = 0;
    choices = [];
    showScenario(currentScenarioIndex);
    
    // Add click event listeners to doors
    doors.forEach(door => {
        door.addEventListener('click', () => {
            const framework = door.getAttribute('data-framework');
            handleChoice(framework);
        });
    });

    // Play again button listener
    playAgainBtn.addEventListener('click', resetGame);
}

/**
 * Display the current scenario
 * @param {number} index - Index of scenario to display
 */
function showScenario(index) {
    const scenario = scenarios[index];
    scenarioText.textContent = scenario.text;
    
    // Update progress indicator
    progressIndicator.textContent = `Scenario ${index + 1} of ${scenarios.length}`;
    
    // Hide feedback box
    feedbackBox.classList.add('hidden');
}

/**
 * Handle player's choice of ethical framework
 * @param {string} frameworkKey - The framework chosen (deontology, consequentialism, or virtue)
 */
function handleChoice(frameworkKey) {
    // Save the choice
    choices.push(frameworkKey);
    
    // Show feedback message
    feedbackBox.textContent = frameworkExplanations[frameworkKey];
    feedbackBox.classList.remove('hidden');
    
    // Disable doors temporarily
    doors.forEach(door => door.style.pointerEvents = 'none');
    
    // Wait 2 seconds, then move to next scenario or show results
    setTimeout(() => {
        // Re-enable doors
        doors.forEach(door => door.style.pointerEvents = 'auto');
        
        currentScenarioIndex++;
        
        if (currentScenarioIndex < scenarios.length) {
            // Show next scenario
            showScenario(currentScenarioIndex);
        } else {
            // Game complete - show results
            showResults();
        }
    }, 2000);
}

/**
 * Calculate results and display the results screen
 */
function showResults() {
    // Hide game screen, show results screen
    gameScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    
    // Count each framework choice
    const counts = {
        deontology: 0,
        consequentialism: 0,
        virtue: 0
    };
    
    choices.forEach(choice => {
        counts[choice]++;
    });
    
    // Update count displays
    dutyCount.textContent = counts.deontology;
    outcomesCount.textContent = counts.consequentialism;
    characterCount.textContent = counts.virtue;
    
    // Calculate bar widths (as percentage of total choices)
    const total = choices.length;
    const dutyPercent = (counts.deontology / total) * 100;
    const outcomesPercent = (counts.consequentialism / total) * 100;
    const characterPercent = (counts.virtue / total) * 100;
    
    // Set bar widths with animation
    dutyBar.style.width = dutyPercent + '%';
    outcomesBar.style.width = outcomesPercent + '%';
    characterBar.style.width = characterPercent + '%';
    
    // Determine dominant framework
    let dominant = 'deontology';
    let maxCount = counts.deontology;
    
    if (counts.consequentialism > maxCount) {
        dominant = 'consequentialism';
        maxCount = counts.consequentialism;
    }
    
    if (counts.virtue > maxCount) {
        dominant = 'virtue';
        maxCount = counts.virtue;
    }
    
    // Handle ties - show a combined message
    const topFrameworks = [];
    if (counts.deontology === maxCount) topFrameworks.push('deontology');
    if (counts.consequentialism === maxCount) topFrameworks.push('consequentialism');
    if (counts.virtue === maxCount) topFrameworks.push('virtue');
    
    if (topFrameworks.length > 1) {
        summaryText.innerHTML = "You show a balanced approach to ethics! You draw from multiple frameworks depending on the situation. This flexibility can be valuable in navigating complex moral dilemmas.";
    } else {
        summaryText.innerHTML = summaryMessages[dominant];
    }
}

/**
 * Reset the game to play again
 */
function resetGame() {
    // Reset game state
    currentScenarioIndex = 0;
    choices = [];
    
    // Reset bar widths
    dutyBar.style.width = '0%';
    outcomesBar.style.width = '0%';
    characterBar.style.width = '0%';
    
    // Hide results, show game screen
    resultsScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    // Show first scenario
    showScenario(0);
}

// ========================================
// START THE GAME
// ========================================

// Initialize game when page loads
initGame();