// TODO: How should we fix this?

export default (data, rowEl, DOMElement) => {
    
    function createAttendButton (id, rowEl) {
        let element = document.createElement('button');
    
        element.className = 'button success';
        element.innerHTML = 'Attend';
    
        element.addEventListener('click', async () => {
    
            if(!rowEl.classList.contains('attending')) {
                await ActivityCtrl.attendActivity({id: 999, name: 'Dummyname'}, id);
                element.innerHTML = 'Attend';
            } else {
                await ActivityCtrl.declineActivity({id: 999, name: 'Dummyname'}, id);
                element.innerHTML = 'Do Not Attend';
            }
    
            rowEl.classList.toggle('attending');
    
        });
    
        return element;
    }
    
    function createDeleteButton (id, rowEl) {
        let element = document.createElement('button');
    
        element.className = 'button danger';
        element.innerHTML = 'Delete';
    
        element.addEventListener('click', () => {
    
            DOMElement.querySelector('.wrapper').removeChild(rowEl);
            ActivityCtrl.deleteActivity(id);
    
        });
    
        return element;
    }

    function toggleActive () {
        console.log('HEJ');
        rowEl.classList.toggle('active')

        return true;
    }
    
    return (
        `<div class="row">
            <div class="top" onclick="${toggleActive}">
                <h2>${data.title}</h2>
                <span>${data.time}</span>
            </div>
            <div class="container">
                <div class="attendees">
                    ${data.attendees.map(attendee => `<span>${attendee.name}</span>`)}
                </div>
                <div class="button_group">
                    <button class="button success" onclick="${createAttendButton}"></button>
                    <button class="button danger" onclick="${createDeleteButton}"></button>
                </div>
            </div>
        </div>`
    ) 

} 