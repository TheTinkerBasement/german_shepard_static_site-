// Smooth scrolling navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Add click handlers for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
});

// Contact form handling
document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Hide form and show success message
        document.getElementById('inquiryForm').style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        
        // In a real implementation, you would send this data to your backend
        console.log('Form data to be sent:', data);
        
        // For GitHub Pages, you could integrate with:
        // - Formspree (https://formspree.io/)
        // - Netlify Forms
        // - EmailJS (https://www.emailjs.com/)
        
        // Example EmailJS integration (you would need to add their script):
        // emailjs.send('service_id', 'template_id', data)
        //   .then(() => console.log('Email sent successfully'));
        
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Chatbot functionality
const chatbot = document.getElementById('chatbot');
const chatToggle = document.getElementById('chatToggle');
const closeChatbot = document.getElementById('closeChatbot');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

// Predefined responses for the chatbot
const botResponses = {
    'hello': 'Hello! How can I assist you today?',
    'hi': 'Hi there! What can I help you with?',
    'services': 'We offer Contract Management, Procurement, Supply Management, Finance, Recruitment, and Audit services. Which one interests you?',
    'contract': 'Our Contract Management service helps you digitize and automate your contract lifecycle. Would you like to know more?',
    'procurement': 'Our Procurement solutions optimize your purchasing processes and vendor management. Interested in learning more?',
    'finance': 'Our Finance tools provide comprehensive budget planning and expense management. Would you like details?',
    'pricing': 'For pricing information, please fill out our inquiry form and we\'ll provide a custom quote based on your needs.',
    'contact': 'You can reach us through the inquiry form on this page, or continue chatting here for quick questions!',
    'help': 'I can help you with information about our services, pricing, or general questions. What would you like to know?',
    'default': 'I\'m here to help! You can ask me about our services, pricing, or how to get started. For detailed inquiries, please use our contact form.'
};

// Keywords for matching user input
const keywords = {
    'services': ['service', 'services', 'what do you do', 'offerings'],
    'contract': ['contract', 'contracts', 'agreement', 'agreements'],
    'procurement': ['procurement', 'purchasing', 'buying', 'vendor'],
    'finance': ['finance', 'financial', 'budget', 'money', 'cost'],
    'pricing': ['price', 'pricing', 'cost', 'how much', 'quote'],
    'contact': ['contact', 'reach', 'phone', 'email', 'address'],
    'help': ['help', 'support', 'assist', 'question']
};

function toggleChatbot() {
    if (chatbot.style.display === 'flex') {
        chatbot.style.display = 'none';
    } else {
        chatbot.style.display = 'flex';
        chatInput.focus();
    }
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Generate bot response
    setTimeout(() => {
        const response = generateBotResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for greeting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return botResponses.hello;
    }
    
    // Check for keywords
    for (const [key, keywordList] of Object.entries(keywords)) {
        for (const keyword of keywordList) {
            if (lowerMessage.includes(keyword)) {
                return botResponses[key];
            }
        }
    }
    
    return botResponses.default;
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Event listeners for chatbot
chatToggle.addEventListener('click', toggleChatbot);
closeChatbot.addEventListener('click', () => {
    chatbot.style.display = 'none';
});

// Add some animation to feature cards
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add floating animation to section icons
document.addEventListener('DOMContentLoaded', function() {
    const sectionIcons = document.querySelectorAll('.section-icon svg');
    
    sectionIcons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Add CSS animation for floating effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
});