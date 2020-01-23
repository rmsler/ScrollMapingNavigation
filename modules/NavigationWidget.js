function NavigationWidget(dataAttribute) {
    if (!(this instanceof NavigationWidget)) {
        return new NavigationWidget(dataAttribute);
    }
    this.elements = [];
    this.dataAttribute = dataAttribute;
    this.elements = document.querySelectorAll('[' + this.dataAttribute + ']');
    this.navElements = [];
    // console.log(this.elements);
    // console.log(this.dataAttribute);
    window.addEventListener("load", this.checkPosition.bind(this));
    $(window).scroll(this.checkPosition.bind(this));
}

Object.assign(NavigationWidget.prototype, {
    
    addActiveClass: function(element){
        element.classList.add("active");
    },
    render: function(wrapper) {
        // render elements
        for(let i = 0; i<this.elements.length; i++){
            let currentElement = this.elements[i];
            let domElement = document.createElement("li");
            domElement.classList.add("parent");
            let name = document.createElement("a");
            let textchild = document.createTextNode(currentElement.innerText);
            name.appendChild(textchild);
            domElement.appendChild(name);
            $(wrapper).append(domElement);
            let crtElRect = currentElement.parentElement.getBoundingClientRect();
            let windowScrollTop = $(window).scrollTop();
            this.navElements.push({
                navReference: domElement,
                top: Number(crtElRect.top + windowScrollTop),
                bottom: Number(crtElRect.bottom + windowScrollTop)
            });
            domElement.addEventListener("click", () => this.moveWindowTo(this.navElements[i].top));
        }
    },
    moveWindowTo: function(top){
        window.scrollTo(0,top);
    },
    checkPosition: function(){ 
        window.setTimeout(function (){
            let crtScrollTop = Number($(window).scrollTop())
            for(let i = 0; i<this.navElements.length; i++) {
                if (this.navElements[i].top <= crtScrollTop && crtScrollTop <= this.navElements[i].bottom) {
                    this.navElements[i].navReference.classList.add("active");
                } else {
                    this.navElements[i].navReference.classList.remove("active");
                }
            }
        }.bind(this), 200)
    }
});

export { NavigationWidget };