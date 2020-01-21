function NavigationWidget(dataAttribute) {
    if (!(this instanceof NavigationWidget)) {
        return new NavigationWidget(dataAttribute);
    }
    this.elements = [];
    this.dataAttribute = dataAttribute;
    this.elements = document.querySelectorAll('[' + this.dataAttribute + ']');
    console.log(this.elements);
    console.log(this.dataAttribute);
}

Object.assign(NavigationWidget.prototype, {
    render: function(wrapper) {
        // render elements
        this.elements.forEach(e => {
            let domElement = document.createElement("li");
            domElement.classList.add("parent");
            let name = document.createElement("a");
            name.href = "#" + e.id;
            let textchild = document.createTextNode(e.innerText);
            name.appendChild(textchild);
            domElement.appendChild(name);
            $(wrapper).append(domElement);
        });   
    }
});

export { NavigationWidget };