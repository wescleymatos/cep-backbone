var CepView = Backbone.View.extend({
    el: $('form'),
    //tagName: 'form',
    //className: 'page-posts',
    //template: _.template('<a href="#" id="add-button">Add Post</a><h2><%= title %></h2><p><%= content %></p><h3>Comments</h3><label>Username: <input id="username" type="text" /></label>'),
    events: {
        'click #enviar' : 'setForm',
        'blur #cep' : 'showCep'
    },

    initialize: function() {
        this.model = new CepModel();
    },

    render: function() {
        //this.$el.html(this.template({title: "Nome do Post", content: "Conteúdo do Post"}));
    },

    setForm: function() {
        this.$el[0]['cep'].value = this.model.get('cep');
    },

    showCep: function() {
        this.model.set('cep', '60080150')
        console.log(this.model.get('cep'));
    }
});


var CepModel = Backbone.Model.extend({
    defaults: {
        cep: '59080100',
        endereco: 'av. airton senna'
    }
});
