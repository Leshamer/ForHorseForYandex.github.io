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

function moveElements() {
    const plane = document.querySelector('.plane');
    const stage1 = document.querySelector('.stage_1');
    const stage7 = document.querySelector('.stage_7');
    const switcher = document.querySelector('.participants_switcher');
    const participantsBox = document.querySelector('.participants_box')
    const participantsTitleBox = document.querySelector('.participants_title_box')

    if (window.innerWidth <= 600) {
        if (stage1.contains(plane)) return;
        stage1.appendChild(plane);
        if (participantsTitleBox.contains(switcher)) {
            participantsBox.appendChild(switcher);
        }
    } else {
        if (stage7.contains(plane)) return;
        stage7.appendChild(plane);
        if (participantsBox.contains(switcher)) {
            participantsTitleBox.appendChild(switcher);
        }
    }
}

window.addEventListener('resize', moveElements);
document.addEventListener('DOMContentLoaded', moveElements);


document.addEventListener('DOMContentLoaded', function() {
    const stagesField = document.querySelector('.stages_field');
    const prevStageButton = document.getElementById('prevStageButton');
    const nextStageButton = document.getElementById('nextStageButton');
    const participants = document.getElementById('participants');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const participantsNumber = document.querySelector('.participants_number');
    const totalParticipants = 6;
    let currentIndex = 0;
    let visibleCount = 3;

    const totalStages = 5;
    let activeIndex = 1;

    circlesChangerUpdate(activeIndex)

    function StageToIndex(index) {
        const participantElement = document.getElementById(`stage_${index}`);
        stagesField.scrollTo({
            left: participantElement.offsetLeft,
            behavior: 'smooth'
        });
    }
    function circlesChangerUpdate(index) {
        const switcherCircle = document.getElementById(`switcher_circle${index}`)
        prevStageButton.disabled = activeIndex === 1;
        nextStageButton.disabled = activeIndex >= totalStages;
        switcherCircle.classList.add('active');
    }
    function circlesChangeRemover(prev) {
        const prevSwitcherCircle = document.getElementById(`switcher_circle${prev}`)
        prevSwitcherCircle.classList.remove('active');
    }

    nextStageButton.addEventListener('click', function() {
        if(activeIndex < totalStages){
            activeIndex += 1;
            StageToIndex(activeIndex)
            circlesChangeRemover(activeIndex-1)
            circlesChangerUpdate(activeIndex)
        } 
    })
    prevStageButton.addEventListener('click', function() {
        if(activeIndex <= totalStages && activeIndex != 1){
            activeIndex -= 1;
            StageToIndex(activeIndex)
            circlesChangeRemover(activeIndex+1)
            circlesChangerUpdate(activeIndex)

        } 
    })



    function updateParticipantsNumber() {
        participantsNumber.innerHTML = `${Math.min(currentIndex + visibleCount, totalParticipants)}<span>/6</span>`;
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= totalParticipants - visibleCount;
    }

    function scrollToIndex(index) {
        const participantElement = document.getElementById(`participant${index}`);
        participants.scrollTo({
            left: participantElement.offsetLeft,
            behavior: 'smooth'
        });
    }
    function autoScroll() {
        if (currentIndex < totalParticipants - visibleCount) {
            currentIndex += visibleCount;
        } else {
            currentIndex = 0;
        }
        scrollToIndex(currentIndex + 1);
        updateParticipantsNumber();
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
    setInterval(autoScroll, 4000);

    
});
