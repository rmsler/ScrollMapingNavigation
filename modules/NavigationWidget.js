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
            this.navElements.push({
                navReference: domElement,
                top: currentElement.parentElement.getBoundingClientRect().top + $(window).scrollTop(),
                bottom: currentElement.parentElement.getBoundingClientRect().bottom + $(window).scrollTop()
            });
            domElement.addEventListener("click", () => this.moveWindowTo(this.navElements[i].top));
        }
    },
    moveWindowTo: function(top){
        window.scrollTo(0,top);
    },
    checkPosition: function(){ 
        window.setTimeout(function (){
            for(let i = 0; i<this.elements.length; i++){
                if(Number(this.navElements[i].top) <= Number($(window).scrollTop()) &&  Number($(window).scrollTop())<= Number(this.navElements[i].bottom)){
                    this.navElements[i].navReference.classList.add("active");
                }
                else{
                    this.navElements[i].navReference.classList.remove("active");
                }
            }
        }.bind(this), 200)
    }
});

export { NavigationWidget };