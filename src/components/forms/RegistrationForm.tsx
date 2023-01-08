import React from "react"
import {Button, Form, FormControl, FormGroup} from "react-bootstrap"

export default class RegistrationForm extends React.Component<{}, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            registered: false,
            error: '',
            name: '',
            lastName: '',
            password: '',
            confirmation: '',
            email: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // @ts-ignore
    handleChange(event: any) {
        console.log(event)
        this.setState({error: null, [event.target.name]: event.target.value})
    }

    handleSubmit(event: React.FormEvent<object>) {
        event.preventDefault()
        if (!this.validateEmail(this.state.email)) {
            return
        }
        if (!this.validatePassword(this.state.password, this.state.confirmation)) {
            return
        }
        window.fetch('/registration', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                name: this.state.name,
                last_name: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                confirmation: this.state.confirmation
            })
        }).then(
            (res: any) => {
                if (!res.ok) {
                    this.setState({
                        error: "При відправці запиту сталася помилка. Спробуйте пізніше."
                    })
                } else {
                    this.setState({
                        registered: true
                    });
                }
            }
        )
    }

    validateEmail(email: string): boolean {
        if (!email.match(/\w+(\.\w+)*@+\w+(\.\w+){1,2}/)) {
            this.setState({
                error: 'Невірна адреса електронної пошти'
            })
            return false
        }
        return true
    }

    validatePassword(password: string, confirmation: string): boolean {

        if (!(
            password.length >= 8 &&
            password.length >= 8 &&
            password.match(/[0-9]/) &&
            password.match(/[a-z]/) &&
            password.match(/[A-Z]/) &&
            password.match(/[!"#$%&'()*+,./:;<=>?@[\]^_`{|}-]/)
        )) {
            this.setState({
                error: 'Пароль повинен містити від 8 до 32 символів, серед яких букви верхнього та нижнього регістрів, цифри та спеціальні символи.'
            });
            return false
        }
        if (password !== confirmation) {
            this.setState({
                error: 'Введені паролі не співпадають!'
            })
            return false
        }
        return true
    }

    render() {
        if (this.state.registered) {
            return (
                <div className="alert alert-success">Реєстрація пройшла успішно.</div>
            )
        }
        const error = this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : null
        return (
            <div className="mt-5">
                {error}
                <Form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <FormGroup className="row mb-3">
                            <label htmlFor="user-name"
                                   className="col-sm-2 col-form-label"
                            >Ім'я</label>
                            <div className="col-sm-10">
                                <FormControl type="text"
                                             className="form-control"
                                             id="user-name"
                                             placeholder="Ім'я"
                                             required
                                             name="name"
                                             value={this.state.name}
                                             onChange={this.handleChange}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup className="row mb-3">
                            <label htmlFor="user-last-name"
                                   className="col-sm-2 col-form-label"
                            >Прізвище</label>
                            <div className="col-sm-10">
                                <FormControl type="text"
                                             className="form-control"
                                             id="user-last-name"
                                             placeholder="Прізвище"
                                             required
                                             name="lastName"
                                             value={this.state.lastName}
                                             onChange={this.handleChange}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup className="row mb-3">
                            <label htmlFor="user-email"
                                   className="col-sm-2 col-form-label"
                            >Пошта</label>
                            <div className="col-sm-10">
                                <FormControl type="email"
                                             className="form-control"
                                             id="user-email"
                                             placeholder="Пошта"
                                             required
                                             name="email"
                                             value={this.state.email}
                                             onChange={this.handleChange}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup className="row mb-3">
                            <label htmlFor="user-password"
                                   className="col-sm-2 col-form-label"
                            >Пароль</label>
                            <div className="col-sm-10">
                                <FormControl type="password"
                                             className="form-control"
                                             id="user-password"
                                             placeholder="Пароль"
                                             required
                                             name="password"
                                             value={this.state.password}
                                             onChange={this.handleChange}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup className="row mb-3">
                            <label htmlFor="user-password-confirmation"
                                   className="col-sm-2 col-form-label"
                            >Повтор пароля</label>
                            <div className="col-sm-10">
                                <FormControl type="password"
                                             className="form-control"
                                             id="user-password-confirmation"
                                             placeholder="Повтор пароля"
                                             required
                                             name="confirmation"
                                             value={this.state.confirmation}
                                             onChange={this.handleChange}
                                />
                            </div>
                        </FormGroup>
                        <Button type="submit">Register</Button>
                    </fieldset>
                </Form>
            </div>
        )
    }
}
