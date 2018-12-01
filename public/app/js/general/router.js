class Router {

    constructor(routes, element) {
        this.routes = routes;
        this.element = element;

        window.onhashchange = this.hashChanged.bind(this);
        this.hashChanged();
    }

    async hashChanged (event) {
        if (window.location.hash.length) {

            // Get the new page and render it.
            let pageName = window.location.hash.substr(1);

            // If the url contains a parameter, remove it from pageName.
            if(pageName.indexOf('/') !== -1) {
                pageName = pageName.split('/')[0];
            }

            this.render(pageName);
        } else {
            // If no path - render default
            this.render('#default');
        }
    }

    async render (pageName) {
        let page = this.routes[pageName];
        
        if(!page)
            page = this.routes['notFound'];

        await page.load();
        this.element.innerHTML = '';
        page.render(this.element);
    }
}

export default Router;