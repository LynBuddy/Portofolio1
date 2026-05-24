// ==================== Sample Data Configuration ==================== 
// You can easily modify these values to personalize your portfolio

const portfolioData = {
    // Student Profile Section
    studentName: "Your Name",
    hometown: "Share your origins and what makes your hometown special. Describe the unique characteristics, culture, traditions, and experiences that have shaped who you are today.",
    inspiration: "Explain what inspired you to become a teacher. Share your goals, aspirations, and the impact you hope to make in education. Discuss the experiences that motivated this career choice.",
    quote: "\"The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.\" - Your Name",
    
    // Learning Artifacts
    obstacles: [
        "Time management challenges",
        "Integrating technology in classroom",
        "Student engagement and motivation",
        "Adapting to different learning styles"
    ],
    theories: [
        "Constructivism - Student-centered learning",
        "Bloom's Taxonomy - Learning objectives",
        "Multiple Intelligences - Diverse learning approaches",
        "Social Learning Theory - Peer collaboration"
    ],
    successFactors: [
        "Clear learning objectives",
        "Active student participation",
        "Regular feedback and assessment",
        "Collaborative classroom environment"
    ],
    adaptations: [
        "Differentiated instruction strategies",
        "Modified materials for diverse learners",
        "Alternative assessment methods",
        "Flexible grouping and pacing"
    ],
    
    // Cycles Data
    cycle1: {
        date: "January - February",
        planFeedback: "Good planning foundation. Consider adding more interactive elements and student participation opportunities.",
        practiceFeedback: "Excellent classroom management. Work on pacing and allowing more time for student discussions."
    },
    cycle2: {
        date: "March - April",
        planFeedback: "Improved lesson structure. Great use of differentiation. Ensure all materials are accessible.",
        practiceFeedback: "Strong implementation. Great rapport with students. Continue developing formative assessment techniques."
    },
    cycle3: {
        date: "May - June",
        planFeedback: "Excellent comprehensive lesson planning. Good integration of technology and resources.",
        practiceFeedback: "Outstanding teaching practice. Strong reflection skills. Ready for independent teaching."
    },
    
    // Assessment
    appendix7: "Your mentor teacher has evaluated your learning tools development positively. Strong pedagogical understanding and creative instructional design.",
    appendix8: "Your teaching practice has shown significant growth across all three cycles. Excellent classroom management and student engagement.",
    
    // Vision/Teacher Model
    mission: "To create an inclusive, engaging learning environment where every student feels valued, challenged, and inspired to achieve their full potential. I aim to foster critical thinking, collaboration, and a lifelong love of learning.",
    competencies: [
        "Pedagogical Knowledge - Understanding of curriculum and teaching methods",
        "Content Expertise - Deep knowledge of subject matter",
        "Classroom Management - Creating positive learning environments",
        "Student Assessment - Evaluating learning outcomes",
        "Technology Integration - Using digital tools effectively",
        "Collaboration - Working with colleagues and families"
    ],
    character: [
        "Patience - Understanding diverse student needs",
        "Empathy - Connecting with students emotionally",
        "Resilience - Overcoming challenges and adapting",
        "Integrity - Modeling ethical behavior",
        "Passion - Enthusiastic about education",
        "Growth Mindset - Continuous professional development"
    ]
};

// ==================== Function to Load Sample Data ==================== 
function loadSampleData() {
    // Load profile data
    document.getElementById('studentName').textContent = portfolioData.studentName;
    document.getElementById('hometown').textContent = portfolioData.hometown;
    document.getElementById('inspiration').textContent = portfolioData.inspiration;
    document.getElementById('quote').textContent = portfolioData.quote;
    
    // Load artifacts lists
    loadList('obstaclesList', portfolioData.obstacles);
    loadList('theoriesList', portfolioData.theories);
    loadList('successList', portfolioData.successFactors);
    loadList('adaptationsList', portfolioData.adaptations);
    
    // Load cycle data
    document.getElementById('cycle1-date').textContent = portfolioData.cycle1.date;
    document.getElementById('cycle1-plan').textContent = portfolioData.cycle1.planFeedback;
    document.getElementById('cycle1-practice').textContent = portfolioData.cycle1.practiceFeedback;
    
    document.getElementById('cycle2-date').textContent = portfolioData.cycle2.date;
    document.getElementById('cycle2-plan').textContent = portfolioData.cycle2.planFeedback;
    document.getElementById('cycle2-practice').textContent = portfolioData.cycle2.practiceFeedback;
    
    document.getElementById('cycle3-date').textContent = portfolioData.cycle3.date;
    document.getElementById('cycle3-plan').textContent = portfolioData.cycle3.planFeedback;
    document.getElementById('cycle3-practice').textContent = portfolioData.cycle3.practiceFeedback;
    
    // Load assessment data
    document.getElementById('appendix7').textContent = portfolioData.appendix7;
    document.getElementById('appendix8').textContent = portfolioData.appendix8;
    
    // Load vision data
    document.getElementById('mission').textContent = portfolioData.mission;
    loadList('competencies', portfolioData.competencies);
    loadList('character', portfolioData.character);
}

function loadList(elementId, dataArray) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
        dataArray.forEach(item => {
            const li = document.createElement('li');
            li.className = 'competency-item';
            li.textContent = item;
            element.appendChild(li);
        });
    }
}

// Load sample data when page loads
window.addEventListener('load', loadSampleData);