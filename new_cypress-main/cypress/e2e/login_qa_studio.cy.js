import * as data from "../helpers/qa_studio/default_data.json"
import * as main_page from "../locators/qa_studio/main_page.json";
import * as recovery_password_page from "../locators/qa_studio/recovery_password_page.json"
import * as result_page from "../locators/qa_studio/result_page.json"

describe('Проверка авторизации https://login.qa.studio/', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // открытие сайта
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // проверка цвета кнопки Забыли пароль
    });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // кнопка закрытия видна пользователю
    });

    it('Верный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login); // ввод верного мейла
        cy.get(main_page.password).type(data.password); //ввод верного пароля
        cy.get(main_page.login_button).click(); // клик по кнопке войти

        cy.get(result_page.title).contains('Авторизация прошла успешно').should('be.visible'); // проверка видимости текста успешной авторизации
    })

    it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // клик по кнопке восстановления пароля

        cy.get(recovery_password_page.email).type('german@dolnikov.ru'); // ввод почты для восстановления пароля
        cy.get(recovery_password_page.send_button).click(); // клик по кнопке отправки кода для восстановления

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail').should('be.visible'); // проверка видимости текста отправленного кода на мейл
    })

    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // ввод верного мейла
        cy.get(main_page.password).type('iLoveqastudio7'); //ввод неверного пароля
        cy.get(main_page.login_button).click(); // клик по кнопке войти

        cy.get(result_page.title).contains('Такого логина или пароля нет').should('be.visible'); // проверка видимости текста неверных авторизационных данных
    })

    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('test@mail.ru'); // ввод неверного логина
        cy.get(main_page.password).type(data.password); //ввод верного пароля
        cy.get(main_page.login_button).click(); // клик по кнопке войти

        cy.get(result_page.title).contains('Такого логина или пароля нет').should('be.visible'); // проверка видимости текста неверных авторизационных данных
    })

    it('Невалидный логин и верный пароль', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // логин без собачки
        cy.get(main_page.password).type(data.password); //ввод верного пароля
        cy.get(main_page.login_button).click(); // клик по кнопке войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации').should('be.visible'); // проверка видимости текста ошибки валидации мейла
    })

    it('Разный регистр букв в верном логине и верный пароль', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // логин в разном регистре
        cy.get(main_page.password).type(data.password); //ввод верного пароля
        cy.get(main_page.login_button).click(); // клик по кнопке войти

        cy.get(result_page.title).contains('Авторизация прошла успешно').should('be.visible'); // проверка видимости текста ошибки валидации мейла
    })
})


// запуск через теринал: npx cypress run --spec cypress/e2e/login_qa_studio.cy.js --browser chrome
// npx cypress open открытие сайпресса
