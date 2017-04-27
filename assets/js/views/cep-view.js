var Cep = Backbone.Model.extend({
    url: function () {
        return 'http://viacep.com.br/ws/'+this.cep+'/json/';
    },
    defaults: {
        cep: ''
    }
});

var CepView = Backbone.View.extend({
    el: $('form'),
    template: Handlebars.compile($("#template").html()),
    events: {
        'keyup [name="cep"]': 'getAddress',
        'blur [name="cep"]': 'getAddress'
    },

    initialize: function() {
        this.model = new Cep();
        this.model.on('change', this.render.bind(this));
    },

    render: function() {
        var viewContent = this.template(this.model.toJSON());
        this.$el.html(viewContent);
    },
    getAddress: function(e) {
        var cep = e.target;

        if (cep.value.length === 9) {
            this.model.cep = cep.value;
            this.model.fetch();

            return;
        }

        this.model.clear();
    }
});
