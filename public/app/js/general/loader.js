// TODO: the loader should be baked in to the router and called BEFORE the initial html is rendered out.

class Loader {

    static in () {
        document.querySelector('loader').classList.add('active');
    }

    static out () {
        document.querySelector('loader').classList.remove('active');
    }

}

export default Loader;