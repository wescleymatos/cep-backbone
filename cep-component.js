var Cep = Backbone.Model.extend({
    url: function () {
        return 'http://viacep.com.br/ws/'+this.cep+'/json/';
    },
    defaults: {
        cep: '',
        numero: '',
        localidade: '',
        uf: '',
        bairro: '',
        logradouro: '',
        complemento: ''
    }
});

var CepView = Backbone.View.extend({
    el: $('#app'),

    template: Handlebars.compile($('#template').html()),
    events: {
        'keyup [name="cep"]': 'getAddress',
        //'blur [name="cep"]': 'getAddress'
    },
    initialize: function() {
        this.model = new Cep();
        this.listenTo(this.model, 'change', this.render.bind(this));
    },
    render: function() {
        var endereco = this.model.toJSON();
        if (endereco.erro) {
            this.model.unset('erro', {silent: true});
            endereco = this.model.defaults;
            endereco.cep = this.model.cep;
        }
        
        this.$el.html(this.template(endereco));
    },
    getAddress: function(e) {
        var cep = e.target;
        if (cep.value.length === 9) {
            this.model.cep = cep.value;
            this.model.fetch();
        }

        if (cep.value.length === 0) this.model.clear();
    }
});