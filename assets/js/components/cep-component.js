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
    el: '#app',
    template: Handlebars.compile($('#template').html()),
    events: {
        'keyup [name="cep"]': 'getAddress'
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
        var inputCep = e.target;
        if (inputCep.value.length === 9) {
            inputCep.previousElementSibling.classList.toggle('invisible');

            this.model.cep = inputCep.value;
            this.model.fetch().done(function (result) {
                if (result.erro) this.el.querySelector('p').classList.toggle('invisible');
            }.bind(this));
        }

        if (inputCep.value.length === 0) this.model.clear();
    }
});
