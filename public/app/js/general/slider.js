class Slider {
    constructor() {
        this.DOMElement = document.querySelector('.slider');
        this.itemsOuter = this.DOMElement.querySelectorAll('.item_outer');
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
    }

    calcSliderWidth () {
        for (let element of Array.from(this.itemsOuter)) {
            this.width += element.offsetWidth;
        }

        this.DOMElement.style.width = `${this.width}px`;
    }

    positionItems () {
        for (let [i, element] of this.itemsOuter.entries()) {
            element.setAttribute('style', `left: ${i * element.offsetWidth}px`);
        }
    }

    initNavigators () {
        for (let item of Array.from(this.itemsOuter)) {
            item
                .querySelector('.navigator.next')
                .addEventListener('click', () => {
                    this.activeItemIndex++;
                    this.navigatorOnClick.bind(this)(true);
                });
            item
                .querySelector('.navigator.prev')
                .addEventListener('click', () => {
                    this.activeItemIndex--;
                    this.navigatorOnClick.bind(this)(false);
                });
        }
    }

    navigatorOnClick (isNext) {
        this.position += isNext ? -this.itemWidth : this.itemWidth;
        this.DOMElement.setAttribute('style', 
            `width: ${this.width}px; 
            left: ${this.position}px;`
        );

        this.updateActivePreview();
    }

    getActiveItemId () {
        return this.itemsOuter[this.activeItemIndex].getAttribute('data-id');
    }

    // TODO: Should not be here.
    updateActivePreview () {
        let activitiesEl = document.querySelector('section#home .activities');
        let currentActive = activitiesEl.querySelector('.activity.active');
        let nextActive = Array.from(activitiesEl.querySelectorAll('.activity')).find(activity => {
            return activity.getAttribute('data-id') == this.getActiveItemId();
        });
        console.log(nextActive.innerHTML);
        currentActive.classList.remove('active');
        nextActive.classList.add('active');
    }
}

export default Slider;