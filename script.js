// ========================================
// GAME DATA: Scenarios with Custom Responses
// ========================================

const scenarios = [
    {
        id: 1,
        text: "Your best friend asks you to lie to their parents about where they were last night. They were at a party they weren't supposed to attend. What guides your decision?",
        responses: {
            deontology: "You refuse to lie because honesty is a fundamental principle. Even to help a friend, you believe lying is wrong and violates the duty to tell the truth.",
            consequentialism: "You consider whether lying would produce the best outcome - perhaps protecting your friend from punishment while weighing the potential harm of dishonesty.",
            virtue: "You ask yourself: 'What would an honest, loyal person do?' You consider both truthfulness and friendship as virtues that might be in tension here."
        }
    },
    {
        id: 2,
        text: "You find a wallet with $500 cash and an ID. You could really use the money for bills, and no one would know. What influences your choice?",
        responses: {
            deontology: "You feel obligated to return the wallet because taking what isn't yours violates the principle of respecting others' property, regardless of your circumstances.",
            consequentialism: "You weigh the outcomes: your financial relief versus the owner's loss. You consider whether the owner can afford to lose $500 and what maximizes overall wellbeing.",
            virtue: "You reflect on integrity and honesty. A person of good character returns what isn't theirs, even when no one is watching."
        }
    },
    {
        id: 3,
        text: "You witness a classmate cheating on an important exam. Reporting them could ruin their scholarship, but saying nothing feels wrong. How do you decide?",
        responses: {
            deontology: "You believe there's a duty to uphold academic integrity. Cheating violates rules that exist for good reason, and you have an obligation to report it.",
            consequentialism: "You calculate the consequences: is the harm of one person losing their scholarship worth maintaining the system's integrity? What produces the best overall outcome?",
            virtue: "You consider what a fair and honest person would do. You think about both justice and compassion as virtues, and how to balance them."
        }
    },
    {
        id: 4,
        text: "A charity asks for donations. You can donate $100 to help many strangers, or give it to one neighbor you know who's struggling. What matters most?",
        responses: {
            deontology: "You consider whether you have a special duty to your neighbor versus strangers. Perhaps proximity creates obligations, or perhaps all people deserve equal consideration.",
            consequentialism: "You calculate which option produces more good: helping many people a little bit, or helping one person significantly. You focus purely on maximizing positive outcomes.",
            virtue: "You think about generosity and compassion. Would a good person prioritize personal connections or impartial concern for those in greatest need?"
        }
    },
    {
        id: 5,
        text: "You see someone shoplifting food at a grocery store. They look desperate and hungry. What should you consider?",
        responses: {
            deontology: "Stealing is wrong, regardless of circumstances. You believe rules against theft exist for important reasons and shouldn't be violated, even for sympathetic reasons.",
            consequentialism: "You weigh the outcomes: the store's minor loss versus someone's immediate need for food. Perhaps the consequences justify the action in this case.",
            virtue: "You consider what a compassionate but just person would do. You think about both mercy and respect for law, and how a good person balances these."
        }
    },
    {
        id: 6,
        text: "Your boss asks you to slightly exaggerate numbers in a report to secure funding. It would help the whole team keep their jobs. What principle guides you?",
        responses: {
            deontology: "You refuse to lie or deceive, even for good outcomes. Honesty and integrity are non-negotiable principles that must be upheld regardless of consequences.",
            consequentialism: "You consider whether the good outcome (saving jobs) justifies the slight deception. Perhaps the overall benefit outweighs the harm of minor dishonesty.",
            virtue: "You reflect on what a person of integrity would do. Can you be both loyal to your team and maintain honesty? What does good character require here?"
        }
    },
    {
        id: 7,
        text: "You can break a promise to attend a friend's event in order to help a stranger in genuine need. Which consideration weighs more heavily?",
        responses: {
            deontology: "You feel bound by your promise. You made a commitment, and keeping your word is a fundamental duty that shouldn't be broken, even for good reasons.",
            consequentialism: "You weigh which action produces more good: keeping a promise for a social event versus helping someone in genuine need. The consequences might justify breaking the promise.",
            virtue: "You consider what a loyal and compassionate person would do. You think about both faithfulness and benevolence as virtues, and how to navigate the conflict."
        }
    }
];

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
// SUMMARY MESSAGES FOR RESULTS
// ========================================

const summaryMessages = {
    deontology: "You lean toward <strong>Duty-based ethics (Deontology)</strong>. You care about rules, principles, and doing what's right regardless of the outcome. For you, moral rules are universal and should be followed consistently.",
    consequentialism: "You lean toward <strong>Consequentialism</strong>. You focus on outcomes and try to create the best overall results. You believe the morality of an action depends on its consequences, not just the action itself.",
    virtue: "You lean toward <strong>Virtue Ethics</strong>. You care about what kind of person you are becoming through your actions. You ask 'What would a good person do?' and focus on developing strong character."
};

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
    
    // Get the current scenario
    const currentScenario = scenarios[currentScenarioIndex];
    
    // Show scenario-specific feedback message
    feedbackBox.textContent = currentScenario.responses[frameworkKey];
    feedbackBox.classList.remove('hidden');
    
    // Disable doors temporarily
    doors.forEach(door => door.style.pointerEvents = 'none');
    
    // Wait 3 seconds (increased to give time to read), then move to next scenario or show results
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
    }, 3000); // Increased to 3 seconds so they can read the feedback
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
