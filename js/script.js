function adaptationLecture() {
    const container = document.querySelector('.first_part');
    const lecture = container.querySelector('.lecture');
    const part2 = document.getElementById('part2');
    const img = container.querySelector('.rounded_img');

    if (window.innerWidth <= 600) {
        lecture.insertBefore(img, part2);
    } else {
        container.appendChild(img);
    }
}

window.addEventListener('resize', adaptationLecture);
document.addEventListener('DOMContentLoaded', adaptationLecture);

document.addEventListener('DOMContentLoaded', function() {
    const participants = document.getElementById('participants');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const participantsNumber = document.querySelector('.participants_number');
    const totalParticipants = 6;
    let currentIndex = 0;
    let visibleCount = 3;

    function updateParticipantsNumber() {
        participantsNumber.innerHTML = `${Math.min(currentIndex + visibleCount, totalParticipants)}<span>/6</span>`;
    }

    function scrollToIndex(index) {
        const participantElement = document.getElementById(`participant${index}`);
        participants.scrollTo({
            left: participantElement.offsetLeft,
            behavior: 'smooth'
        });
    }

    nextButton.addEventListener('click', function() {
        if (currentIndex < totalParticipants - visibleCount) {
            currentIndex += visibleCount;
            scrollToIndex(currentIndex + 1);
            updateParticipantsNumber();
        }
    });

    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex -= visibleCount;
            scrollToIndex(currentIndex + 1);
            updateParticipantsNumber();
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 600) {
            visibleCount = 1; 
        } else {
            visibleCount = 3; 
        }
        currentIndex = 0;
        updateParticipantsNumber();
    });

    participants.addEventListener('scroll', function() {
        if (window.innerWidth <= 600) {
            const itemWidth = participants.scrollWidth / totalParticipants;
            const index = Math.floor(participants.scrollLeft / itemWidth);
            currentIndex = index * visibleCount;
            updateParticipantsNumber();
        }
    });

    if (window.innerWidth <= 600) {
        visibleCount = 1;
    }
    updateParticipantsNumber();
});

