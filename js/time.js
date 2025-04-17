document.addEventListener('DOMContentLoaded', function() {
    // Create time pickers
    createTimePicker('start', '3', '31', 'PM');
    createTimePicker('end', '4', '32', 'PM');
    
    // Close dropdowns when clicking outside 
    document.addEventListener('click', function(event) {
        const startTimeInput = document.getElementById('startTimeInput');
        const startTimeDropdown = document.getElementById('startTimeDropdown');
        const endTimeInput = document.getElementById('endTimeInput');
        const endTimeDropdown = document.getElementById('endTimeDropdown');
        
        if (!startTimeInput.contains(event.target) && !startTimeDropdown.contains(event.target)) {
            startTimeDropdown.classList.remove('show');
            startTimeInput.querySelector('.y_dropdown-icon').classList.remove('open');
        }
        
        if (!endTimeInput.contains(event.target) && !endTimeDropdown.contains(event.target)) {
            endTimeDropdown.classList.remove('show');
            endTimeInput.querySelector('.y_dropdown-icon').classList.remove('open');
        }
    });
});

function createTimePicker(prefix, defaultHour, defaultMinute, defaultPeriod) {
    const timeInput = document.getElementById(`${prefix}TimeInput`);
    const timeDropdown = document.getElementById(`${prefix}TimeDropdown`);
    const dropdownIcon = timeInput.querySelector('.y_dropdown-icon');
    const cancelBtn = document.getElementById(`${prefix}CancelBtn`);
    const okBtn = document.getElementById(`${prefix}OkBtn`);
    const timeInputText = document.getElementById(`${prefix}TimeText`);
    
    const hourScroll = document.getElementById(`${prefix}HourScroll`);
    const minuteScroll = document.getElementById(`${prefix}MinuteScroll`);
    const periodScroll = document.getElementById(`${prefix}PeriodScroll`);
    
    let selectedHour = defaultHour;
    let selectedMinute = defaultMinute;
    let selectedPeriod = defaultPeriod;
    
    // Toggle dropdown visibility
    timeInput.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Close all other dropdowns first
        document.querySelectorAll('.y_time-dropdown').forEach(dropdown => {
            if (dropdown !== timeDropdown) {
                dropdown.classList.remove('show');
                dropdown.previousElementSibling.querySelector('.y_dropdown-icon').classList.remove('open');
            }
        });
        
        // Toggle this dropdown
        timeDropdown.classList.toggle('show');
        dropdownIcon.classList.toggle('open');
        
        // Scroll to selected values
        scrollToSelected();
    });
    
    // Handle option selection
    const timeOptions = timeDropdown.querySelectorAll('.y_time-option');
    timeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const parent = this.parentElement;
            
            // Update selected values
            if (parent.id === `${prefix}HourScroll`) {
                selectedHour = this.dataset.value;
            } else if (parent.id === `${prefix}MinuteScroll`) {
                selectedMinute = this.dataset.value;
            } else if (parent.id === `${prefix}PeriodScroll`) {
                selectedPeriod = this.dataset.value;
            }
            
            updateSelection();
        });
    });
    
    // Handle navigation arrows
    const navArrows = timeDropdown.querySelectorAll('.y_column-nav');
    navArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            if (this.dataset.picker !== prefix) return;
            
            const column = this.dataset.column;
            const direction = this.classList.contains('y_up') ? -1 : 1;
            
            navigateColumn(column, direction);
        });
    });
    
    function navigateColumn(column, direction) {
        let scrollElement, options, currentIndex = -1;
        
        if (column === 'hour') {
            scrollElement = hourScroll;
            options = Array.from(hourScroll.querySelectorAll('.y_time-option'));
            currentIndex = options.findIndex(opt => opt.dataset.value === selectedHour);
        } else if (column === 'minute') {
            scrollElement = minuteScroll;
            options = Array.from(minuteScroll.querySelectorAll('.y_time-option'));
            currentIndex = options.findIndex(opt => opt.dataset.value === selectedMinute);
        } else if (column === 'period') {
            scrollElement = periodScroll;
            options = Array.from(periodScroll.querySelectorAll('.y_time-option'));
            currentIndex = options.findIndex(opt => opt.dataset.value === selectedPeriod);
        }
        
        if (currentIndex !== -1) {
            const newIndex = (currentIndex + direction + options.length) % options.length;
            const newOption = options[newIndex];
            
            if (column === 'hour') {
                selectedHour = newOption.dataset.value;
            } else if (column === 'minute') {
                selectedMinute = newOption.dataset.value;
            } else if (column === 'period') {
                selectedPeriod = newOption.dataset.value;
            }
            
            updateSelection();
            
            // Smooth scroll to the selected option
            newOption.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    function updateSelection() {
        // Remove all selected classes
        timeOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to current selections
        hourScroll.querySelector(`.y_time-option[data-value="${selectedHour}"]`).classList.add('selected');
        minuteScroll.querySelector(`.y_time-option[data-value="${selectedMinute}"]`).classList.add('selected');
        periodScroll.querySelector(`.y_time-option[data-value="${selectedPeriod}"]`).classList.add('selected');
    }
    
    function scrollToSelected() {
        // Scroll each column to show selected value
        hourScroll.querySelector('.y_time-option.selected').scrollIntoView({ block: 'center' });
        minuteScroll.querySelector('.y_time-option.selected').scrollIntoView({ block: 'center' });
        periodScroll.querySelector('.y_time-option.selected').scrollIntoView({ block: 'center' });
    }
    
    // Handle Cancel button
    cancelBtn.addEventListener('click', function() {
        timeDropdown.classList.remove('show');
        dropdownIcon.classList.remove('open');
    });
    
    // Handle OK button
    okBtn.addEventListener('click', function() {
        timeInputText.textContent = `${prefix === 'start' ? 'Start' : 'End'} Time: ${selectedHour}:${selectedMinute} ${selectedPeriod}`;
        timeDropdown.classList.remove('show');
        dropdownIcon.classList.remove('open');
    });
}