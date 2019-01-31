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
        this.initPreviewItems();
        this.hideOrShowNav();
        this.setCounter();
        this.initHammer();

        window.addEventListener('resize', this.calcSliderWidth.bind(this));
    }

    initHammer () {
        const hammertime = new Hammer(this.DOMElement);
        hammertime.on('panstart', this.onPanStart.bind(this));
        hammertime.on('pan', this.onPan.bind(this));
        hammertime.on('panend', this.onPanEnd.bind(this));
    }

    onPanStart () {
        this.DOMElement.classList.add('dragging');
    }

    onPan ({ deltaX }) {
        this.DOMElement.setAttribute('style', 
            `width: ${this.width}px; 
            left: ${this.position + deltaX}px;`
        );

        this.parallaxEffect(deltaX);
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

    calcSliderWidth () {
        let sliderWidth = 0;
        for (let element of Array.from(this.itemsOuter)) {
            sliderWidth += element.offsetWidth;
        }

        this.width = sliderWidth;
        this.DOMElement.style.width = `${sliderWidth}px`;
    }

    moveSlider () {
        this.DOMElement.setAttribute('style', 
            `width: ${this.width}px; 
            left: ${this.position}px;`
        );

        this.hideOrShowNav();
        this.parallaxEffect(null, false);
        this.setCounter();
    }

    setCounter () {
        this.DOMParent
            .querySelector('.counter')
            .innerHTML = `${this.activeItemIndex + 1} / ${this.itemsOuter.length}`;
    }

    positionItems () {
        for (let [i, element] of this.itemsOuter.entries()) {
            element.setAttribute(
                'style', `left: ${i * element.offsetWidth}px;`
            );
            this.initParallax(element);
        }

        this.itemsOuter[0].querySelector('.time').setAttribute('style', 'transform: none');
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

    parallaxEffect (deltaX, isMoving = true) {
        let item = this.itemsOuter[this.activeItemIndex].querySelector('.time');
        if (isMoving) {
            item.classList.add('dragging');
            item.setAttribute('style', `transform: translate(${deltaX / 15}px, ${deltaX / 40}px);`);
        } else {
            item.classList.remove('dragging');
            item.setAttribute('style', `transform: none;`);
        }
    }

    initParallax (item) {
        item.querySelector('.time').setAttribute('style', 'transform: translate(-50px, 50px)');
    }

    updateActivePreview () {
        let activitiesEl = this.DOMParent.querySelector('.items_preview');
        let currentActive = activitiesEl.querySelector('.item_preview.active');
        let nextActive = Array.from(activitiesEl.querySelectorAll('.item_preview')).find(activity => {
            return activity.getAttribute('data-id') == this.getActiveItemId();
        });
        currentActive.classList.remove('active');
        nextActive.classList.add('active');
    }

    initPreviewItems () {
        for (let data of this.data) {
            let element = this.createPreviewItem(data);
            this.DOMParent.querySelector('.items_preview').appendChild(element);
        }

        this.DOMParent.querySelector('.items_preview .item_preview').classList.add('active');
    }

    createPreviewItem (data) {
        let newDiv = document.createElement('div');
        let newH4 = document.createElement('h4');
        newH4.innerHTML = data.title;
        newDiv.setAttribute('data-id', data._id);
        newDiv.appendChild(newH4);
        newDiv.className = 'item_preview out';
        newDiv.addEventListener('click', this.previewItemOnClick.bind(this));
        return newDiv;
    }

    previewItemOnClick ({ srcElement }) {
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