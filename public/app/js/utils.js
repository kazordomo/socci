export const animateIn = elements => {
    let delay = 75;
    for (let element of elements) {
        setTimeout(() => element.classList.remove('out'), delay);
        delay += 75;
    }
}
export const animateOut = elements => {
    let delay = 75;
    for (let element of elements) {
        setTimeout(() => element.classList.remove('out'), delay);
        delay += 75;
    }
}
export const getLocal = (name = 'user') => JSON.parse(localStorage.getItem(name));
export const storeLocal = (object, name ='user') => localStorage.setItem(name, JSON.stringify(object));
export const getInputValue = (element, name) => element.querySelector(`input[name="${name}"]`).value;
export const getIdFromUrl = () => {
    let id = window.location.hash.substr(1);
    id = id.split('/')[1];
    return id;
}