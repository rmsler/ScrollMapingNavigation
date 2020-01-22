function NavigationWidget(dataAttribute) {
    if (!(this instanceof NavigationWidget)) {
        return new NavigationWidget(dataAttribute);
    }
    this.elements = [];
    this.dataAttribute = dataAttribute;
    this.elements = document.querySelectorAll('[' + this.dataAttribute + ']');
    this.navElements = [];
    console.log(this.elements);
    console.log(this.dataAttribute);
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
            this.navElements.push({
                navReference: domElement,
                top: currentElement.parentElement.getBoundingClientRect().top + $(window).scrollTop(),
                bottom: currentElement.parentElement.getBoundingClientRect().bottom
            });
            domElement.addEventListener("click", () => this.moveWindowTo(this.navElements[i].top));
        }
        console.log(this.navElements);
        $(window).scroll(this.checkPosition.bind(this));
    },
    moveWindowTo: function(top){
        window.scrollTo(0,top);
    },
    checkPosition: function(){
        $(window).scrollTop();
        console.log("top is: "+$(window).scrollTop());
        for(let i = 0; i<this.elements.length; i++){
            console.log("top "+this.navElements[i].top);
            if($(window).scrollTop() < 0){

            }
        }
        
    }
});

export { NavigationWidget };