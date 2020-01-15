function NavigationWidget() {
    if (!(this instanceof NavigationWidget)) {
        return new NavigationWidget(imagesArray);
      }
}

Object.assign(NavigationWidget.prototype, {
    init: function(node) {
        //init and construct model
    },

    render: function() {
        // render elements
    }
});

export { NavigationWidget };