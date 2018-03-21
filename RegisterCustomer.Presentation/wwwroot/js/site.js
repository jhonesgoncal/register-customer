(function ($, doc) {
    'use strict';

    var app = (function () {
        var $name = $('[data-js="name"]').get();
        var $lastName = $('[data-js="lastName"]').get();
        var $age = $('[data-js="age"]').get();

        var $tableCustomers = $('[data-js="table-customers"]').get();
        var errors = [];

        return {
            init: function init() {
               this.onloadCustomers();
               this.initEvents();
            },

            initEvents: function initEvents() {
                $('[data-js="form-customer"]').on('submit', this.handleRegister);
            },

            onloadCustomers: function onloadCustomers() {
                var ajax = new XMLHttpRequest();
                ajax.open('GET', 'http://localhost:15698/api/customer');
                ajax.send();
                ajax.onreadystatechange = function (e) {
                    if (app.isRequestOK.call(this)) {
                        var customers = JSON.parse(ajax.responseText);
                        $tableCustomers.innerHTML = '';
                        customers.forEach(function (customer) {
                            $tableCustomers.appendChild(app.renderCustomer(customer.id, customer.name, customer.lastName, customer.age, ));
                        });
                    }
                }
            },

            handleRegister: function handleRegister(event) {
                event.preventDefault();

                var $listErrors = app.viewErrors();
                app.clearErrors($listErrors);
                if (app.validationForm()) {
                    app.submitNewCustomer();
                } else {
                    app.renderToastr('error', 'Erro ao cadastrar')
                    app.viewErrors();
                }
            },

            renderCustomer: function renderCustomer(id, name, lastName, age) {
                var $fragament = doc.createDocumentFragment();
                var $tr = doc.createElement('tr');
                var $tdName = doc.createElement('td');
                var $tdLastName = doc.createElement('td');
                var $tdAge = doc.createElement('td');

                $tr.setAttribute('data-js', id);

                $tdName.textContent = name;
                $tdLastName.textContent = lastName;
                $tdAge.textContent = age;
                
                $tr.appendChild($tdName);
                $tr.appendChild($tdLastName);
                $tr.appendChild($tdAge);;


                return $fragament.appendChild($tr);

            },

            renderToastr: function renderToastr(type, message) {
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }

                toastr[type](message)
            },

            submitNewCustomer: function submitNewCustomer() {
                var ajax = new XMLHttpRequest();
                ajax.open('POST', 'http://localhost:15698/api/customer');
                ajax.setRequestHeader(
                    'Content-Type',
                    'application/json;charset=UTF-8'
                );
                var customer = {
                    name: $name.value,
                    lastName: $lastName.value,
                    age: $age.value
                };
                ajax.send(JSON.stringify(customer));
                ajax.onreadystatechange = function (e) {

                    if (app.isRequestOK.call(this)) {
                        var customer = JSON.parse(ajax.responseText);
                        app.renderToastr('success', 'Cliente adicionado!')
                        app.onloadCustomers();
                        app.clearForm();
                    }

                };
                return customer;
            },

            validationForm: function validationForm() {

                if ($name.value === '')
                    this.messageError('Precisa preencher o nome');

                if ($lastName.value === '')
                    this.messageError('Precisa preencher o sobrenome');

                if ($age.value === '')
                    this.messageError('Precisa preencher a idade');

                if (errors.length > 0)
                    return false;

                return true;
            },

            clearForm: function clearForm() {
                $name.value = '';
                $lastName.value = '';
                $age.value = '';
            },

            messageError: function messageError(msg) {
                errors.push(msg);
            },

            viewErrors: function viewErrors() {
                var $listErrors = $('[data-js="list-errors"]').get(); 
                if (!$listErrors) {
                    var $errors = $('[data-js="errors"]').get();
                    var $ulErrors = document.createElement('ul');
                    $ulErrors.setAttribute('data-js', 'list-errors');
                    $errors.appendChild($ulErrors);
                }
                $listErrors = $('[data-js="list-errors"]').get(); 
                var $button = document.createElement('button');
                $button.setAttribute('class', 'close');
                $button.setAttribute('data-dismiss', 'alert');
                $button.setAttribute('aria-label', 'Close');
                var $span = document.createElement('span');
                $span.setAttribute('aria-hidden', 'true');
                $span.innerHTML = '&times;';

                $button.appendChild($span);
                $listErrors.appendChild($button);

                errors.map(function (element) {
                    var $li = doc.createElement('li');
                    $li.setAttribute('class', 'error');
                    $li.setAttribute('style', 'margin-left:10px');
                    $li.textContent = element;
                    $listErrors.appendChild($li);
                    $listErrors.setAttribute('class', 'alert alert-danger alert-dismissible fade in');
                });

                return $listErrors;
            },

            clearErrors: function clearErrors($listErrors) {
                errors = [];
                $listErrors.innerHTML = '';
                $listErrors.classList.remove('alert');
            },

            isRequestOK: function isRequestOK() {
                return this.readyState === 4 && this.status === 200;
            }
        }
    })();

    app.init();

})(window.DOM, document);
