class Slider {
    constructor(data, DOMParent) {
        this.DOMElement = document.querySelector('.slider');
        this.DOMParent = DOMParent;
        this.navigators = document.querySelector('.navigators');
        this.itemsOuter = this.DOMElement.querySelectorAll('.item_outer');
        this.data = data;
        this.width = 0;
        this.itemWidth = this.itemsOuter[0].offsetWidth;
        this.position = 0;
        this.activeItemIndex = 0;

        this.init();
    }

    init () {
        this.calcSliderWidth();
        this.positionItems();
        this.initNavigators();
        this.initPreviewActivites();
        this.hideOrShowNav();

        const hammertime = new Hammer(this.DOMElement);
        hammertime.on('panstart', this.onPanStart.bind(this));
        hammertime.on('pan', this.onPan.bind(this));
        hammertime.on('panend', this.onPanEnd.bind(this));
    }

    onPanStart ({ deltaX }) {
        this.DOMElement.classList.add('dragging');
    }

    onPan ({ deltaX }) {
        this.DOMElement.setAttribute('style', 
            `width: ${this.width}px; 
            left: ${this.position + deltaX}px;`
        );
    }

    onPanEnd ({ deltaX }) {
        this.DOMElement.classList.remove('dragging');

        if(deltaX < 200 && deltaX > -200 ) {
            return this.moveSlider();
        }

        if (deltaX < 0 && (this.activeItemIndex !== this.itemsOuter.length - 1)) {
            this.navigators.querySelector('.next').click();
        } else if (deltaX > 0 && (this.activeItemIndex !== 0)) {
            this.navigators.querySelector('.prev').click();
        } else {
            this.moveSlider();
        }
    }

    // TODO: This needs to be run on window.resize
    calcSliderWidth () {
        for (let element of Array.from(this.itemsOuter)) {
            this.width += element.offsetWidth;
        }

        this.DOMElement.style.width = `${this.width}px`;
    }

    moveSlider () {
        this.DOMElement.setAttribute('style', 
            `width: ${this.width}px; 
            left: ${this.position}px;`
        );

        this.hideOrShowNav();
    }

    positionItems () {
        for (let [i, element] of this.itemsOuter.entries()) {
            element.setAttribute('style', `left: ${i * element.offsetWidth}px`);
        }
    }

    initNavigators () {
        let navNext = this.navigators.querySelector('.next');
        let navPrev = this.navigators.querySelector('.prev');

        navNext
            .addEventListener('click', () => {
                this.activeItemIndex++;
                this.navigatorOnClick(true);
            });

        navPrev
            .addEventListener('click', () => {
                this.activeItemIndex--;
                this.navigatorOnClick(false);
            });
    }

    hideOrShowNav () {
        let navNext = this.navigators.querySelector('.next');
        let navPrev = this.navigators.querySelector('.prev');

        if(this.navigators.querySelector('.inactive')) {
            this.navigators.querySelector('.inactive').classList.remove('inactive');
        }

        if (this.activeItemIndex === 0) {
            navPrev.classList.add('inactive');
        } else if(this.activeItemIndex === this.itemsOuter.length - 1) {
            navNext.classList.add('inactive');
        }
    }

    navigatorOnClick (isNext) {
        this.position += isNext ? -this.itemWidth : this.itemWidth;
        this.moveSlider();
        this.updateActivePreview();
    }

    getActiveItemId () {
        return this.itemsOuter[this.activeItemIndex].getAttribute('data-id');
    }

    // TODO: Should not be here.
    // ACTIVITIE SPECIFICS SECTION
    updateActivePreview () {
        let activitiesEl = this.DOMParent.querySelector('.activities');
        let currentActive = activitiesEl.querySelector('.activity.active');
        let nextActive = Array.from(activitiesEl.querySelectorAll('.activity')).find(activity => {
            return activity.getAttribute('data-id') == this.getActiveItemId();
        });
        currentActive.classList.remove('active');
        nextActive.classList.add('active');
    }

    initPreviewActivites () {
        for (let data of this.data) {
            let element = this.createPreviewActivity(data);
            this.DOMParent.querySelector('.activities').appendChild(element);
        }

        this.DOMParent.querySelector('.activities .activity').classList.add('active');
    }

    createPreviewActivity (data) {
        let newDiv = document.createElement('div');
        let newH4 = document.createElement('h4');
        newH4.innerHTML = data.title;
        newDiv.setAttribute('data-id', data._id);
        newDiv.appendChild(newH4);
        newDiv.className = 'activity out';
        newDiv.addEventListener('click', this.previewActivityOnClick.bind(this));
        return newDiv;
    }

    previewActivityOnClick ({ srcElement }) {
        let clickedItem = Array.from(this.itemsOuter).find(item => {
            return item.getAttribute('data-id') === srcElement.getAttribute('data-id');
        });
        this.position = parseInt(`-${clickedItem.style.left}`, 10);
        this.activeItemIndex = Array.from(this.itemsOuter).indexOf(clickedItem);
        this.moveSlider();
        this.updateActivePreview();
    }
}

export default Slider;