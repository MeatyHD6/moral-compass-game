// ========================================
// GAME DATA: Scenarios with Engaging Responses
// ========================================

const scenarios = [
    {
        id: 1,
        text: "Your best friend asks you to lie to their parents about where they were last night. They were at a party they weren't supposed to attend. What guides your decision?",
        responses: {
            deontology: "You tell your friend you can't lie. 'I'm sorry, but I won't compromise my integrity - even for you.' Your friendship might be strained, but you can look yourself in the mirror. Some lines shouldn't be crossed.",
            consequentialism: "You weigh the options: a small lie prevents major family conflict and keeps your friendship intact. Nobody gets hurt. Sometimes the right answer isn't the honest one - it's the one that causes the least damage.",
            virtue: "You think: 'What kind of friend am I? What kind of person do I want to be?' Real friendship means both loyalty AND honesty. You decide to talk to your friend about facing the consequences with integrity."
        }
    },
    {
        id: 2,
        text: "You find a wallet with $500 cash and an ID. You could really use the money for bills, and no one would know. What influences your choice?",
        responses: {
            deontology: "The money isn't yours. End of story. You immediately look up the address and plan to return it. Your bank account might be empty, but theft is theft - desperate circumstances don't change that fundamental truth.",
            consequentialism: "You calculate: maybe this person is rich and won't miss it. But you'd be devastated if you lost $500. The pain they'd feel outweighs your gain. You return it, knowing the overall suffering is minimized.",
            virtue: "You ask: 'Who am I when nobody's watching?' The answer matters more than the money. You return the wallet because that's what honest people do - and that's who you want to be."
        }
    },
    {
        id: 3,
        text: "You witness a classmate cheating on an important exam. Reporting them could ruin their scholarship, but saying nothing feels wrong. How do you decide?",
        responses: {
            deontology: "Academic integrity isn't negotiable. You report it. The rules exist to protect everyone, and you have a duty to uphold them - even when it costs someone dearly. Fair is fair.",
            consequentialism: "One person's scholarship versus the integrity of the whole system. If cheaters succeed, honest students suffer. You report it, knowing that protecting the system helps more people in the long run, even if it destroys one person's future.",
            virtue: "This tears you apart. You decide to confront the cheater first - giving them a chance to confess. A person of character seeks justice, but also shows mercy. Maybe there's a way to be both fair and compassionate."
        }
    },
    {
        id: 4,
        text: "A charity asks for donations. You can donate $100 to help many strangers, or give it to one neighbor you know who's struggling. What matters most?",
        responses: {
            deontology: "You have a special responsibility to your neighbor - proximity creates obligation. You can't save everyone, but you CAN help the person right in front of you. That's your duty.",
            consequentialism: "The math is brutal: $100 helps 50 people a little, or 1 person a lot. You donate to the charity. Maximum impact matters more than personal connection. Your neighbor is one person; those strangers are fifty.",
            virtue: "You think about what generosity really means. You split the money - $50 to the charity, $50 to your neighbor. A good person doesn't choose between compassion for strangers and care for neighbors. Both matter."
        }
    },
    {
        id: 5,
        text: "You see someone shoplifting food at a grocery store. They look desperate and hungry. What should you consider?",
        responses: {
            deontology: "Theft is theft, regardless of need. You alert the staff. The law exists for a reason, and you won't condone breaking it. If you let this slide, where do you draw the line?",
            consequentialism: "The store loses $20 of food it would've thrown away. The person gets a meal they desperately need. You pretend you didn't see anything. The total suffering in the world just decreased.",
            virtue: "You approach them directly and offer to buy the food yourself. A compassionate person helps those in need - but a person of integrity doesn't ignore theft. You find the third option: direct action."
        }
    },
    {
        id: 6,
        text: "Your boss asks you to slightly exaggerate numbers in a report to secure funding. It would help the whole team keep their jobs. What principle guides you?",
        responses: {
            deontology: "You refuse. 'I won't falsify data, even to save jobs.' Integrity isn't situational. You might lose your job for this, but you'll keep your self-respect. Some things aren't negotiable.",
            consequentialism: "Tiny exaggeration, major benefit: the entire team stays employed. You adjust the numbers. The greater good sometimes requires bending the rules. Real-world ethics isn't always black and white.",
            virtue: "You counter-propose: 'Let me present the honest numbers, but I'll make the strongest case possible.' A person of integrity finds creative solutions that don't require lying. Honor AND pragmatism."
        }
    },
    {
        id: 7,
        text: "You can break a promise to attend a friend's event in order to help a stranger in genuine need. Which consideration weighs more heavily?",
        responses: {
            deontology: "You keep your promise. You gave your word, and that means something. You apologize to the stranger and suggest other resources. A promise is a sacred commitment that shouldn't be broken.",
            consequentialism: "Your friend will be disappointed for one evening. The stranger needs immediate help. You break the promise, knowing this creates more overall good. Your friend will understand eventually.",
            virtue: "You call your friend, explain the situation honestly, and ask if they'd understand. A person of character honors commitments, but also responds to urgent need. Transparency makes all the difference."
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

