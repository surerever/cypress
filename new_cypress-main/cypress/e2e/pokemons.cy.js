import * as data from "../helpers/pokemons/default_data.json"

describe('e2e https://pokemonbattle.ru/', function () {

    it('Покупка аватара', function () {

        cy.visit('https://pokemonbattle.ru/'); // открытие сайта
        cy.get(':nth-child(1) > .auth__input').type(data.login); //ввод логина
        cy.get('#password').type(data.password); // ввод пароля
        cy.get('.auth__button').click(); // клик по кнопке войти
        cy.intercept('GET', 'https://api.pokemonbattle.ru/v2/pokemons*').as('http-request'); // перехват гет запроса
        cy.wait('@http-request'); // ожидание получения ответа от запроса 
        cy.get('.header__container > .header__id').click({ force: true }); // клик по кнопке профиля
        cy.get('[href="/shop"]').click(); // клик по кнопке магазина
        cy.get('.available > .shop__button').first().click(); // клик по кнопке покупки аватара
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type("4620869113632996"); // ввод номера карты
        cy.get(':nth-child(1) > .pay_base-input-v2').type("1225"); // ввод срока
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type("125"); // ввод CVV
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type("firstname lastname"); // ввод имени
        cy.get('.pay-btn').click(); // клик по кнопке оплаты
        cy.get('#cardnumber').type("56456"); // код подтверждения
        cy.get('.payment__submit-button').click(); // клик подверждение оплаты
        cy.get('.payment__font-for-success').should('be.visible').contains("Покупка прошла успешно"); // успешность оплаты
    })
}) 